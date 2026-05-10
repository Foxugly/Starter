#!/usr/bin/env bash
set -euo pipefail
python manage.py spectacular --file openapi.yaml
cp openapi.yaml ../starter-frontend/openapi.yaml
