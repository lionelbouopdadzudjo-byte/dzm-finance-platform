#!/usr/bin/env bash
set -euo pipefail
cp -n .env.example .env || true
echo "[info] Start OCR service in another terminal: cd ocr-service && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000"
npm install
npm run dev
