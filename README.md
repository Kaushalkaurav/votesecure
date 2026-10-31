# VoteSecure — MITS Gwalior academic voting system

**Status: integrated source release, not production-certified.** This implementation was prepared using the stated project requirements. The GitHub repository contained only the older frontend; the newer local Sprint 5 backend was not accessible. Do **not** deploy for a real election without the integration/security checks below.

## Stack
React 19, Vite, Tailwind CSS v4, Redux Toolkit, React Router (`react-router`), React Hook Form (installed), Axios, Lucide, React Toastify, Recharts; Node, Express, MongoDB/Mongoose, JWT, bcryptjs, Nodemailer, express-rate-limit.

## Install
1. Install Node 22+, npm, and MongoDB **replica set** (even locally; transactions require it).
2. `cd backend && npm install && cp .env.example .env` (Windows: `copy .env.example .env`).
3. Edit `backend/.env`: MongoDB URI, JWT_SECRET, BALLOT_KEY_HEX, RECEIPT_SECRET, SMTP credentials, CORS_ORIGIN. Create secrets with a CSPRNG; `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
4. Set `ADMIN_INITIAL_PASSWORD` to a strong one-time password of at least 16 characters, then `npm run seed:admin`. Remove the password from `.env` afterwards.
5. `cd ../frontend && npm install && cp .env.example .env` and update `VITE_API_URL` if necessary.
6. Launch backend (`cd ../backend && npm run dev`) and frontend (`cd ../frontend && npm run dev`) in separate terminals. Visit http://localhost:5173.
7. Verify backend `/health`; run `cd backend && npm test`.

## Key API (JSON)
All `/api/*` other than `/auth/register`, `/auth/resend`, `/auth/verify`, `/auth/login` require `Authorization: Bearer <JWT>`.

| Method | Path | Purpose / role |
|---|---|---|
| POST | /api/auth/register | Register email/password (12+ chars) |
| POST | /api/auth/verify | Verify email + 6-digit code |
| POST | /api/auth/resend | Resend OTP (60s cooldown) |
| POST | /api/auth/login | Get JWT + profile |
| GET | /api/auth/me | Current profile |
| PUT | /api/auth/profile | Complete profile |
| GET | /api/elections | Scheduled elections |
| GET | /api/elections/:id | Election + approved candidates |
| POST | /api/elections/:id/apply | Candidate application |
| POST | /api/elections/:id/vote | Cast vote, `{candidateId}` |
| GET | /api/elections/:id/my-vote | Personal participation status |
| GET | /api/elections/:id/results | Published results only |
| GET | /api/notifications | User notification feed |
| PATCH | /api/notifications/:id/read | Mark notification read |
| GET | /api/admin/overview | Global metrics, admin |
| GET | /api/admin/users | Users, admin/volunteers (branch-scoped) |
| PATCH | /api/admin/users/:id/approval | Approve/revoke in scope |
| PATCH | /api/admin/users/:id/role | Assign volunteer roles, admin |
| GET/POST | /api/admin/elections | List/create election, admin |
| GET | /api/admin/elections/:id | Turnout, audit, results if published |
| PATCH | /api/admin/elections/:id/schedule | Schedule draft |
| GET | /api/admin/elections/:id/applications | Review candidates |
| PATCH | /api/admin/elections/:id/applications/:candidateId | `{status:'approved'|'rejected'}` |
| POST | /api/admin/elections/:id/publish | Publish closed results + notifications |

## Acceptance test checklist
- [ ] Invalid-domain email rejected on frontend and backend
- [ ] Valid email registered, real SMTP OTP delivered and verified; resend cooldown and attempt lockout enforced
- [ ] Login wrong password denied; JWT tampering/expiry denied
- [ ] Ordinary student cannot call admin API; volunteer role respects branch
- [ ] Profile completion and voter approval required
- [ ] Admin creates/schedules future election, approves candidate
- [ ] Candidate and voter may be same student, self-vote rule enforced
- [ ] Election activates/closes based on wall clock; vote accepted only while open
- [ ] Two simultaneous votes from same student: exactly one committed (replica set required)
- [ ] Ballot documents have no user ID; participation ledger has no candidate ID
- [ ] Results blocked before publication; after close admin publishes, users receive unread notification
- [ ] Unpublished candidate totals inaccessible via ordinary APIs
- [ ] Restart processes and confirm durable records

## Security limitations / deployment gates
This is an academic **prototype**; do not claim full ballot anonymity, end-to-end verifiability, or election certification. DB operators with sufficient visibility into event ordering may correlate participation and ballots. Secrets must never be published. Harden against DoS, build retention/backup and monitoring policy, add CSRF measures if moving JWT to cookies, require HTTPS, consider external penetration testing. Automated integration tests require a MongoDB replica set and real SMTP testing; neither was available in this build environment. Election creation is draft-first; only admin can schedule and publish.

**Do not upload node_modules or `.env` to GitHub.** The old repository previously tracked `node_modules`; its history needs cleanup separately.
