# GMJ. private admin (login activity)

Owner-only admin app for reviewing successful portfolio admin logins. Deployed **separately on Vercel** so the public portfolio can stay on GitHub Pages as a static export.

Public portfolio UI and navigation are unchanged. This app is unlisted (`robots` disallow-all, `noindex` metadata) and protected by server-side Auth.js sessions plus owner email checks on every page and API.

## Routes

| Path | Purpose |
|------|---------|
| `/private/login` | Owner sign-in (no public registration) |
| `/private/login-activity` | Login activity dashboard |
| `/api/login-activity` | List / delete history (owner session required) |
| `/api/login-activity/[id]/device-location` | Optional device geolocation (owner session) |
| `/api/cron/cleanup-login-activity` | 30-day retention purge (`CRON_SECRET`) |

## Stack

- Next.js 15 (App Router, server)
- Auth.js (NextAuth v5) Credentials — single owner from env
- Prisma + PostgreSQL (Neon recommended)
- Vercel trusted proxy IP + geolocation headers (`@vercel/functions`)

## Environment

Copy `.env.example` to `.env.local` and fill in values (no real secrets in git).

```bash
pnpm install
pnpm hash-password   # prints bcrypt hash for OWNER_PASSWORD_HASH
pnpm prisma migrate deploy
pnpm dev
```

### Variables

| Name | Purpose |
|------|---------|
| `DATABASE_URL` | Postgres connection (Neon pooled URL on Vercel) |
| `AUTH_SECRET` | Auth.js session secret |
| `OWNER_EMAIL` | Sole allowed account email |
| `OWNER_PASSWORD_HASH` | bcrypt hash of owner password |
| `CRON_SECRET` | Bearer token for cleanup cron |
| `AUTH_TRUST_HOST` | Set `true` on Vercel if needed |

## Geolocation (no third-party IP API required)

On Vercel, client IP and approximate city/region/country come from Vercel’s documented request headers / `@vercel/functions` (`ipAddress`, `geolocation`). Vercel overwrites `X-Forwarded-For` at the edge to reduce spoofing — do not trust raw client forwarding headers outside that platform.

IP location is **approximate**. VPNs, mobile networks, and proxies can affect it. It is never presented as an exact address or proof of identity.

Optional **device** coordinates use the browser Geolocation API only after an explicit click and permission prompt (HTTPS required).

## Deploy on Vercel

1. Create a Vercel project with **Root Directory** = `admin`.
2. Attach a Neon (or other Postgres) database; set env vars from `.env.example`.
3. Build command: `pnpm install && pnpm prisma generate && pnpm build` (or rely on `postinstall`).
4. Run migrations: `pnpm prisma migrate deploy` (CI or `vercel` build step).
5. Point a private subdomain (e.g. `admin.gmjsilmaro.dev`) at the project. Do not link it from the public site nav or sitemap.
6. Cron in `vercel.json` hits `/api/cron/cleanup-login-activity` daily; set `CRON_SECRET` in the Vercel project.

## Security notes

- Unlisted URL ≠ access control — middleware + `requireOwner()` gate pages and APIs.
- Public registration disabled; only `OWNER_EMAIL` can authenticate.
- Login attempts are rate-limited per IP (failed attempts stored without credentials).
- Application logs must not include passwords, session tokens, or raw device coordinates.
- No tracking of public portfolio visits.

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Local admin app |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm hash-password` | bcrypt hash helper |
| `pnpm test:auth-guards` | Unauthenticated API/page guard checks |
