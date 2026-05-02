# Job Portal Server

Run the server locally for development.

Prerequisites:
- Node.js (LTS)
- If you want DB functionality: a MongoDB URI

Quick start:

1. Copy env file:

```powershell
cd job-portal-server
copy .env.example .env
# edit .env to set MONGO_URI and JWT_SECRET
```

2. Install and run:

```powershell
npm install
# dev (uses nodemon)
npm run dev
```

If `MONGO_URI` is not set the server will still start but endpoints that require the DB will return a 503 or empty responses.
