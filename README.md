# dzm-finance-platform

Plateforme finance DZM (propriétaire unique) avec deux structures `DZM A` et `DZM B`, et fournisseur exclusif `DT AZIMUT`.

## Monorepo
- `frontend`: React/Vite/TS/Tailwind/Framer/TanStack Query/RHF/Zod/Recharts/Lucide
- `backend`: Node/Express/TS/Zod/Supabase SDK/Cloudinary/JWT
- `ocr-service`: FastAPI/OpenCV/PaddleOCR-ready
- `shared`: types/schemas partagés
- `supabase`: schéma SQL + RLS + seeds
- `docs`: docs API, exemples OCR, Postman, roadmap V2

## Setup local
```bash
cp .env.example .env
npm install
```

### 1) Démarrer backend + frontend
```bash
npm run dev
```

### 2) Démarrer OCR Python (terminal séparé)
```bash
cd ocr-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Scripts
- `bash scripts/start-local.sh`
- `bash scripts/test-telegram-webhook.sh`
- `npm run dev:all` (si uvicorn est disponible dans le PATH)

## Livrables inclus
- API REST complète
- upload + OCR + review
- factures / paiements / matching
- anomalies / dashboard
- assistant IA hybride web + telegram
- exports PDF/Excel
- SQL schema + RLS + seed
- collection Postman
- tests minimaux backend/frontend/ocr
- structure modulaire V2
