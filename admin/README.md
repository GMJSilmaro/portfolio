# GMJ. private admin — URL location tool

Owner-only cybersecurity helper: paste a URL, extract location clues already in the string, and resolve approximate host IP geolocation. Deployed **separately on Vercel** so the public portfolio stays on GitHub Pages as a static export.

No login-activity logging. No public visit tracking. Analyzed URLs are not written to a database.

## Routes

| Path | Purpose |
|------|---------|
| `/private/login` | Owner sign-in (no public registration) |
| `/private/url-location` | Paste-a-URL location analysis UI |
| `/api/analyze-url` | Analyze endpoint (owner session required) |

## What analysis does

1. **URL-embedded clues** — coordinates and place/query hints already present in the URL (Maps `@lat,lng`, `ll=`, `lat`/`lng` params, `geo:` URIs, textual `q=` / path heuristics). No request is made to the target host for this step.
2. **Approximate host IP location** — DNS lookup of the hostname, then local GeoLite data via `geoip-lite`. Distinct from URL-embedded coordinates.

IP / GeoLite location is **approximate**. CDNs, anycast, VPNs, and hosting regions can differ from the real operator. Never treat results as an exact address or proof of identity.

## Stack

- Next.js 15 (App Router, server)
- Auth.js (NextAuth v5) Credentials — single owner from env
- `geoip-lite` (local MaxMind GeoLite snapshot — no third-party IP API key required)

## Environment

Copy `.env.example` to `.env.local`:

```bash
pnpm install
pnpm hash-password
pnpm dev
```

| Name | Purpose |
|------|---------|
| `AUTH_SECRET` | Auth.js session secret |
| `OWNER_EMAIL` | Sole allowed account email |
| `OWNER_PASSWORD_HASH` | bcrypt hash of owner password |

No database required.

## Deploy on Vercel

1. Create a Vercel project with **Root Directory** = `admin`.
2. Set env vars from `.env.example`.
3. Point a private subdomain (e.g. `admin.gmjsilmaro.dev`). Do not link it from the public site nav or sitemap.

## Security notes

- Unlisted URL ≠ access control — middleware + `requireOwner()` gate pages and APIs.
- Public registration disabled; only `OWNER_EMAIL` can authenticate.
- Analyze API is rate-limited per owner session.
- Do not log credentials, session tokens, or paste contents to application logs.
- Tooling aid for your own cybersecurity review only — not for unauthorized access to third-party systems.

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Local admin app |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm hash-password` | bcrypt hash helper |
| `pnpm test:auth-guards` | Unauthenticated API/page guard checks |
| `pnpm test:url-parse` | URL location parser smoke checks |
