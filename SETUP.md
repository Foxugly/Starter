# Setup — Starter

How to bootstrap a new project from this skeleton.

## 0. Copy the starter

```bash
cp -r starter ~/projects/MY-APP
cd ~/projects/MY-APP
git init
git add .
git commit -m "chore: initial commit from starter"
```

The starter is **not git-tracked itself** — clone it into a new repo before
making project-specific commits.

## 1. Rename to the new project name

Pick a project slug (e.g. `acme`) and rename:

```bash
# Folders
mv starter-server acme-server
mv starter-frontend acme-frontend

# Service files
for f in deploy/starter-*.service; do
  mv "$f" "${f/starter-/acme-}"
done
```

Then update references inside files:

- `acme-server/config/settings_base.py` → `NAME_APP=Acme`
- `acme-frontend/package.json` → `"name": "acme-frontend"`
- `acme-frontend/angular.json` → project key + `buildTarget` references
- `deploy/redeploy.sh` → repo path, domain, service names
- `.github/workflows/{ci.yml,deploy.yml}` → paths and SSH/SCP targets
- `deploy/*.service` → ExecStart paths, ExecStartPre, WorkingDirectory

## 2. Finalise the strip-down

The starter ships generic placeholder content for marketing-style pages.
Customise per project:

- `acme-frontend/src/app/shared/contact.ts` → real company contact info
- `acme-frontend/src/app/pages/public/about/about.i18n.ts` → company GDPR text
- `acme-frontend/src/app/pages/public/donate/donate.i18n.ts` → keep, drop, or
  replace with sponsor/CTA page
- `acme-frontend/src/app/pages/public/features/features.i18n.ts` → list the
  new project's actual capabilities
- `acme-frontend/src/app/pages/public/about/about.ts` → `repositoryUrl`

## 3. Backend dev setup

```bash
cd acme-server
python -m venv .venv
# Linux/macOS:
source .venv/bin/activate
# Windows:
.venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env if needed (defaults work for local dev with SQLite + console email)

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The dev server runs at `http://127.0.0.1:8000/`.

- API root: `http://127.0.0.1:8000/api/`
- OpenAPI schema: `http://127.0.0.1:8000/api/schema/`
- Swagger UI: `http://127.0.0.1:8000/api/docs/`
- Django admin: `http://127.0.0.1:8000/admin/`
- Health check: `http://127.0.0.1:8000/health/`

## 4. Frontend dev setup

```bash
cd acme-frontend
npm ci
```

Generate the API client from the running backend:

```powershell
# from project root, with the backend running
powershell -ExecutionPolicy Bypass -File .\scripts\sync-openapi.ps1
```

Then start the dev server:

```bash
npm run start
# → http://localhost:4200/
```

## 5. Verify the smoke path

End-to-end manual smoke test:

1. Open `http://localhost:4200/` — landing page renders.
2. `/register` — create an account; check the terminal where the backend is
   running for the confirmation email link.
3. Open the link in the email — `/user/confirm-email/...` should activate.
4. `/login` — sign in.
5. `/preferences` — language and profile fields are editable.
6. `/about` — three tabs render.
7. `/user/list` (logged in as superuser) — admin CRUD works.

## 6. First production deploy

See `deploy/setup.sh` for the server-side bootstrap, and `ARCHITECTURE.md`
for the deploy pipeline. Required configuration:

- Adjust `deploy/env.production.example` → copy to `.env` on the server
- Configure `/etc/sudoers.d/django-deploy` for NOPASSWD systemctl restart
- Set up nginx (or apache) reverse proxy with TLS
- Configure GitHub Actions secrets (see `.github/workflows/deploy.yml`)

## 7. Optional: pre-commit hooks

```bash
pip install pre-commit
pre-commit install
```

The `.pre-commit-config.yaml` runs ruff + format checks on the backend and
blocks accidental introduction of carryover business names.
