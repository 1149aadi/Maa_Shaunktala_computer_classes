# Maa Shakuntala Computer Classes

This project now includes a complete Node.js backend for handling:

- Admission form submissions (`POST /api/admissions`)
- Contact form submissions (`POST /api/contact`)
- Health check (`GET /api/health`)

## Run locally

```bash
npm install
npm start
```

Open: `http://localhost:3000`

## Data storage

Submitted form data is saved as JSON files inside:

- `data/admissions.json`
- `data/contacts.json`
