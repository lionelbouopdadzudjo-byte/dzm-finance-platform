# API Documentation

Base URL: `http://localhost:4000`

## Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`

## Documents
- POST `/api/documents/upload`
- GET `/api/documents`
- GET `/api/documents/:id`
- POST `/api/documents/:id/reprocess`
- PATCH `/api/documents/:id/review`

## Invoices
- GET `/api/invoices`
- GET `/api/invoices/:id`
- POST `/api/invoices`
- PATCH `/api/invoices/:id`
- DELETE `/api/invoices/:id`
- POST `/api/invoices/:id/mark-paid`

## Payments
- GET `/api/payments`
- GET `/api/payments/:id`
- POST `/api/payments`
- PATCH `/api/payments/:id`
- DELETE `/api/payments/:id`

## Matching
- GET `/api/matches`
- POST `/api/matches/suggest/:documentId`
- POST `/api/matches/:id/confirm`
- POST `/api/matches/:id/reject`

## Dashboard
- GET `/api/dashboard/summary`
- GET `/api/dashboard/kpis`
- GET `/api/dashboard/timeline`
- GET `/api/dashboard/cashflow`
- GET `/api/dashboard/anomalies`

## Search / AI
- GET `/api/search?q=...`
- POST `/api/search/natural-language`
- POST `/api/ai/assistant`
- POST `/api/ai/forecast`
- POST `/api/voice/stt`
- POST `/api/voice/tts`

## Reports / Alerts / Comments / Telegram
- GET `/api/reports/pdf`
- GET `/api/reports/excel`
- POST `/api/reports/generate`
- GET `/api/alerts`
- POST `/api/alerts/:id/read`
- GET `/api/comments`
- POST `/api/comments`
- POST `/api/telegram/webhook`
