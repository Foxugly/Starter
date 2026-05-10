#!/usr/bin/env bash
#
# Starter — server bootstrap (Ubuntu 22.04+)
#
# Installs system deps, creates the `django` runtime user, lays out the app
# under /var/www/django_websites/Starter, installs the 3 systemd units used
# by redeploy.sh (starter-gunicorn, starter-celery, starter-celery-beat),
# then runs Apache + certbot.
#
# Usage: ssh into the server, clone the repo to /var/www/django_websites/Starter,
# then run:
#   bash deploy/setup.sh YOUR_DOMAIN
#
# Prerequisites:
#   - Ubuntu 22.04+ with at least 1 GB RAM
#   - Inbound 80 and 443 open
#   - A DNS A record pointing YOUR_DOMAIN to the server's public IP
#
set -euo pipefail

DOMAIN="${1:?Usage: $0 YOUR_DOMAIN}"
APP_USER="${APP_USER:-django}"
APP_DIR="${APP_DIR:-/var/www/django_websites/Starter}"
BACKEND_DIR="$APP_DIR/starter-server"
FRONTEND_DIR="$APP_DIR/starter-frontend"
VENV_DIR="$BACKEND_DIR/.venv"
LOG_DIR="/var/log/starter"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== Starter setup for $DOMAIN ==="
echo "  App dir:  $APP_DIR"
echo "  App user: $APP_USER"
echo ""

# --- System packages ---
echo "[1/9] Installing system packages..."
sudo apt-get update -qq
sudo apt-get install -y -qq \
    python3 python3-venv python3-pip \
    redis-server \
    apache2 certbot python3-certbot-apache \
    nodejs npm \
    git rsync curl

# --- Node.js 22 (if not already installed) ---
NODE_MAJOR=$(node -v 2>/dev/null | grep -oP '(?<=v)\d+' || echo 0)
if [ "$NODE_MAJOR" -lt 20 ]; then
    echo "[1b] Installing Node.js 22..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y -qq nodejs
fi

# --- Runtime user ---
echo "[2/9] Ensuring '$APP_USER' system user exists..."
if ! id "$APP_USER" >/dev/null 2>&1; then
    sudo useradd --system --gid www-data --shell /usr/sbin/nologin \
        --home-dir "$APP_DIR" "$APP_USER"
fi

# --- Directory structure ---
echo "[3/9] Setting up directories..."
sudo mkdir -p "$APP_DIR" "$LOG_DIR" "$BACKEND_DIR/run"
# If the repo was cloned elsewhere, sync it into APP_DIR
if [ "$REPO_DIR" != "$APP_DIR" ]; then
    sudo rsync -a --delete \
        --exclude='.venv' --exclude='node_modules' --exclude='dist' \
        "$REPO_DIR/" "$APP_DIR/"
fi
sudo chown -R "$APP_USER":www-data "$APP_DIR" "$LOG_DIR"

# --- Backend venv + deps ---
echo "[4/9] Creating venv + installing backend dependencies..."
sudo -u "$APP_USER" python3 -m venv "$VENV_DIR"
sudo -u "$APP_USER" "$VENV_DIR/bin/pip" install --upgrade pip
sudo -u "$APP_USER" "$VENV_DIR/bin/pip" install -r "$BACKEND_DIR/requirements.txt"

# --- Backend .env ---
if [ ! -f "$BACKEND_DIR/.env" ]; then
    echo "[4b] Creating .env from template..."
    sudo cp "$REPO_DIR/deploy/env.production.example" "$BACKEND_DIR/.env"
    sudo sed -i "s/YOUR_DOMAIN/$DOMAIN/g" "$BACKEND_DIR/.env"
    SECRET_KEY=$("$VENV_DIR/bin/python" -c "import secrets; print(secrets.token_hex(32))")
    JWT_KEY=$("$VENV_DIR/bin/python" -c "import secrets; print(secrets.token_hex(32))")
    sudo sed -i "s/CHANGE_ME_generate_with_python_c_import_secrets_print_secrets_token_hex_32/$SECRET_KEY/" "$BACKEND_DIR/.env"
    sudo sed -i "s/CHANGE_ME_different_from_SECRET_KEY/$JWT_KEY/" "$BACKEND_DIR/.env"
    sudo chown "$APP_USER":www-data "$BACKEND_DIR/.env"
    sudo chmod 640 "$BACKEND_DIR/.env"
    echo "    >>> Edit $BACKEND_DIR/.env to set EMAIL_HOST_USER and EMAIL_HOST_PASSWORD"
fi

# --- Django setup ---
echo "[5/9] Running Django migrations + collectstatic..."
cd "$BACKEND_DIR"
sudo -u "$APP_USER" "$VENV_DIR/bin/python" manage.py migrate --noinput
sudo -u "$APP_USER" "$VENV_DIR/bin/python" manage.py collectstatic --noinput

# --- Frontend build ---
echo "[6/9] Building Angular frontend..."
cd "$FRONTEND_DIR"
sudo -u "$APP_USER" npm ci
sudo -u "$APP_USER" npx ng build --configuration=production

# --- Redis ---
echo "[7/9] Enabling Redis..."
sudo systemctl enable --now redis-server

# --- Apache ---
echo "[8/9] Configuring Apache..."
sudo a2enmod rewrite proxy proxy_http ssl headers
sudo cp "$REPO_DIR/deploy/apache.conf" "/etc/apache2/sites-available/starter.conf"
sudo sed -i "s/YOUR_DOMAIN/$DOMAIN/g" "/etc/apache2/sites-available/starter.conf"
sudo a2dissite 000-default.conf 2>/dev/null || true
sudo a2ensite starter.conf
sudo apachectl configtest
sudo systemctl reload apache2

# --- Systemd units (gunicorn + celery + celery-beat) ---
echo "[9/9] Installing systemd units..."
for svc in starter-gunicorn starter-celery starter-celery-beat; do
    sudo cp "$REPO_DIR/deploy/$svc.service" "/etc/systemd/system/$svc.service"
done
sudo systemctl daemon-reload
sudo systemctl enable --now starter-gunicorn starter-celery starter-celery-beat

# --- HTTPS (Let's Encrypt) ---
echo "[+] Setting up HTTPS with Let's Encrypt..."
sudo certbot --apache -d "$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN" || {
    echo "    >>> Certbot failed. Run manually: sudo certbot --apache -d $DOMAIN"
}

echo ""
echo "=== Deployment complete ==="
echo ""
echo "Backend:  https://$DOMAIN/api/docs/"
echo "Frontend: https://$DOMAIN/"
echo "Admin:    https://$DOMAIN/admin/"
echo ""
echo "Service commands:"
echo "  sudo systemctl status starter-gunicorn starter-celery starter-celery-beat"
echo "  sudo systemctl restart starter-gunicorn"
echo "  sudo journalctl -u starter-gunicorn -f"
echo ""
echo "Create a superuser:"
echo "  cd $BACKEND_DIR && sudo -u $APP_USER $VENV_DIR/bin/python manage.py createsuperuser"
echo ""
echo "IMPORTANT: Edit $BACKEND_DIR/.env to configure email settings!"
