# Backend

API Express TypeScript complète pour DZM Finance Platform.

## Structure
- `routes/`
- `controllers/`
- `services/`
- `repositories/`
- `middleware/`
- `validators/`
- `modules/v2/`

## Run
```bash
npm install
npm run dev
```

## Seed in-memory
```bash
npm run seed
```

## Tests
```bash
npm run test
```

## Data seed (in-memory)
- Au boot du backend, les données de démo sont chargées automatiquement.
- Désactivation: `AUTO_SEED_IN_MEMORY=false`.
- Re-seed manuel: `npm run seed`.
