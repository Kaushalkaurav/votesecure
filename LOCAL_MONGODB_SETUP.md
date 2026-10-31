# VoteSecure: one-command local MongoDB replica set setup (Windows)

Election creation, one-vote enforcement, and results use MongoDB multi-document transactions. **Do not remove those transactions** to make a standalone database work.

## Prerequisites
- Existing working MongoDB Windows service named `MongoDB`, bound locally (127.0.0.1:27017).
- Node.js and VoteSecure backend dependencies installed with `npm install`.
- MongoDB Database Tools (`mongodump.exe`) installed or extracted under Downloads. **MongoDB Shell (`mongosh`) is not needed.**
- Enough free disk space for a verified database backup. The script automatically creates a timestamped backup.
- This script targets an **unauthenticated local development MongoDB only**; do not use it on hosted/shared/production MongoDB.

## Run
Open **PowerShell as Administrator**, then:

```powershell
cd "C:\Users\kaura\Desktop\VoteSecure-Integrated\VoteSecure-Integrated"
npm install --prefix backend
powershell -NoProfile -ExecutionPolicy Bypass -File ".\scripts\setup-local-mongodb.ps1"
```

The script locates `mongodump.exe`, backs up the `votesecure` database and confirms BSON files, backs up `mongod.cfg`, adds `replication.replSetName: rs0` only if missing, restarts the local Windows service, initializes it through Node.js (no mongosh), and checks it became PRIMARY. It stops instead of overwriting an unexpected existing replication configuration.

Then in `backend/.env`, use:
```dotenv
MONGO_URI=mongodb://localhost:27017/votesecure?replicaSet=rs0
```

Start VoteSecure with `npm run dev` from the repository root. Backend should print `MongoDB replica set ready: rs0`.

## Safety / troubleshooting
- The script does **not** delete the database, reset admin passwords, or modify election records.
- If it stops after backup, inspect the printed reason. Do not run `rs.initiate()` repeatedly.
- If the Windows service fails to restart, restore the saved `mongod.cfg.votesecure-*.bak` file before retrying.
- Keep backups private. They contain student records and password hashes; never commit them.
- On machines where MongoDB is manually launched, uses authentication, or is not service-based, configuration requires a separate approach.
- This is local academic development; a one-node replica set does not provide production resilience, secrecy or election-system certification.
