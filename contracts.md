# API Contracts — Portfolio de Louis

## Overview
Backend FastAPI pour le portfolio de Louis. Principalement utilisé pour :
1. Sauvegarder les messages de contact en MongoDB
2. Servir les données du portfolio (optionnel, si on veut les rendre dynamiques plus tard)

---

## Endpoints

### POST /api/contact
Sauvegarde un message de contact en base de données.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "message": "string",
  "created_at": "datetime",
  "read": false
}
```

**Validation:**
- name: min 2 chars
- email: valid email format
- message: min 10 chars

---

### GET /api/contact
Liste tous les messages reçus (pour Louis).

**Response 200:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "message": "string",
    "created_at": "datetime",
    "read": false
  }
]
```

---

## MongoDB Collections

### `contacts`
Champs: id, name, email, message, created_at, read

---

## Frontend Integration

- `Contact.jsx` → POST /api/contact au submit du formulaire
- Fallback mock si le backend est indisponible
- Variable d'env: `REACT_APP_BACKEND_URL` (déjà configuré)

---

## Data mocked in mock.js (pas besoin de backend pour ces données)
- personal info
- about paragraphs & stats
- skills (frontend/backend/database/tools)
- parcours timeline
- projects list
