from __future__ import annotations

import logging
from datetime import timedelta

from celery.exceptions import Retry as CeleryRetry
from kombu.exceptions import KombuError
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db import OperationalError as DjangoOperationalError
from django.db import close_old_connections, connection, transaction
from django.utils import timezone

from core.models import OutboundEmail

logger = logging.getLogger(__name__)


def _row_lock_supported() -> bool:
    # SQLite has no SELECT ... FOR UPDATE; calling .select_for_update() against
    # it raises NotSupportedError. Skip row-locking on engines that don't
    # support it — single-writer SQLite serializes naturally.
    return connection.features.has_select_for_update


def process_pending_outbound_emails(*, limit: int = 100) -> int:
    sent = 0
    close_old_connections()
    try:
        while sent < limit:
            with transaction.atomic():
                qs = OutboundEmail.objects.filter(
                    sent_at__isnull=True, available_at__lte=timezone.now()
                ).order_by("created_at", "id")
                if _row_lock_supported():
                    qs = qs.select_for_update(skip_locked=True)
                email = qs.first()
                if email is None:
                    break

                email.mark_attempt()
                try:
                    msg = EmailMultiAlternatives(
                        subject=email.subject,
                        body=email.body,
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        to=email.recipients,
                    )
                    if email.html_body:
                        msg.attach_alternative(email.html_body, "text/html")
                    msg.send(fail_silently=False)
                except Exception as exc:  # pragma: no cover
                    email.last_error = str(exc)
                    email.available_at = timezone.now() + timedelta(minutes=1)
                    email.save(update_fields=["last_error", "available_at"])
                    logger.warning("email.delivery_failed", extra={"email_id": email.id, "error": str(exc)})
                    continue

                email.sent_at = timezone.now()
                email.last_error = ""
                email.save(update_fields=["sent_at", "last_error"])
                sent += 1
    finally:
        close_old_connections()
    return sent


def trigger_outbound_email_delivery() -> None:
    from core.tasks import deliver_outbound_emails_task

    try:
        deliver_outbound_emails_task.delay(limit=100)
    except (ConnectionError, OSError, KombuError) as exc:
        logger.warning("email.delivery_dispatch_failed", extra={"error": str(exc)})
        # Fall back to in-process delivery when the broker is unavailable so
        # registration and reset emails are still sent in degraded mode.
        process_pending_outbound_emails(limit=100)
    except (DjangoOperationalError, CeleryRetry) as exc:
        logger.warning("email.delivery_deferred", extra={"error": str(exc)})
        # SQLite can transiently lock during on_commit hooks in local/fullstack
        # runs. Leave the email queued instead of failing the originating request.
