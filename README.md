# Starter — Django + Angular + PrimeNG skeleton

Production-ready skeleton for new projects.

```
starter/
├── starter-server/    Django 6 + DRF + drf-spectacular + Celery + parler
├── starter-frontend/  Angular 21 + PrimeNG 21 + signals + 5-language i18n
├── deploy/            systemd units, nginx/apache templates, redeploy.sh
├── scripts/           sync-openapi.ps1, run-fullstack-backend.ps1
├── .github/workflows/ CI + deploy pipelines
└── .pre-commit-config.yaml
```

**Not git-tracked itself** — copy into a new repo to start a project.

## Quick start

See [SETUP.md](./SETUP.md) for the step-by-step bootstrap (clone → rename
→ first run → first deploy).

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the layout, auth flow, email
outbox, OpenAPI sync, and deploy pipeline.

## What's included

### Backend
- Django 6 + DRF
- SimpleJWT (access + refresh + blacklist + rotation)
- drf-spectacular (OpenAPI auto-schema)
- django-environ (env-driven config, split base/dev/prod/test)
- Celery + Redis (worker + beat)
- django-parler (translatable model fields)
- Email outbox pattern (async, resilient)
- SMTP and Microsoft Graph backends
- ScopedRateThrottle on sensitive endpoints
- Health check endpoint
- Structured logging with request_id + user_id

### Frontend
- Angular 21 (`OnPush`, signals, no `standalone: true`)
- PrimeNG 21 (Select, Table, Dialog, Toast, Datepicker, Editor, ...)
- 5 UI languages (FR, EN, NL, IT, ES) as typed dictionaries
- JWT auth interceptor with refresh-on-401 and concurrent-refresh dedup
- Custom `AppToastService` (decoupled from PrimeNG)
- Reusable bulk-actions component
- Anti-spam contact helper
- Sticky responsive top bar with hamburger ≤960px

### Devops
- `redeploy.sh` with nginx/apache auto-detection, sudoers-friendly
- GitHub Actions: CI (lint, tests, contract) + Deploy (scp + ssh)
- Pre-commit hooks: ruff + format + carryover-name guard

## Stack choices

- **Single-tenant** — multi-org/Domain scoping has been intentionally
  removed. Reintroduce per project if needed.
- **django-parler kept** — translatable content is common and the
  integration is non-trivial to wire later.
- **5 UI languages** — FR/EN/NL/IT/ES, easy to reduce per project.
- **Email confirmation required** — login refused for unconfirmed emails.
