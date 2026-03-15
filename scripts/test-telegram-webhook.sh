#!/usr/bin/env bash
set -euo pipefail
BASE_URL=${1:-http://localhost:4000}
SECRET=${TELEGRAM_WEBHOOK_SECRET:-dev-secret}
curl -X POST "$BASE_URL/api/telegram/webhook"   -H "Content-Type: application/json"   -H "x-telegram-bot-api-secret-token: $SECRET"   -d '{"message":{"message_id":1,"text":"Combien de factures impayées pour DZM A ?","chat":{"id":"12345"}}}'
