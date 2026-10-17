# GMJ. — Living Dossier / CV Studio

An interactive online CV for **Gilbert Michael Jay Silmaro** — Technical Lead Consultant & Software Engineer.

## Live

- Site: [https://gmjsilmaro.dev](https://gmjsilmaro.dev)
- GitHub Pages: [https://gmjsilmaro.github.io/portfolio/](https://gmjsilmaro.github.io/portfolio/)

## Experience

This is not a stacked marketing page. It is a **CV Studio**:

1. **Cover** — cinematic full-bleed entrance
2. **Identity rail** — portrait, contacts, CV download (desktop)
3. **Chapters** — Profile · Career · Work · Stack (mode views, not cloned sections)

Tech stack icons remain in the Stack chapter with favourites filtering.

## Tech

- Next.js 15 (static export)
- React 19
- Tailwind CSS
- TypeScript
- react-icons
- GitHub Actions

## Private admin (separate deploy)

Owner-only login activity lives in [`admin/`](./admin/) as a **separate** Next.js app for Vercel (Auth.js + Postgres). The public site on GitHub Pages stays a static export — UI, chapters, and navigation are unchanged, and the admin URL is not linked from the public nav or sitemap.

See [admin/README.md](./admin/README.md) for setup, env vars, Neon/Postgres, and Vercel cron.

## Local development

```bash
pnpm install
pnpm dev
```

Admin app (separate):

```bash
cd admin && pnpm install && pnpm dev
```

## Usage rights

Personal work — permission required for use, reproduction, or modification. No commercial use or redistribution without permission.

## Contact

- GitHub: [@gmjsilmaro](https://github.com/gmjsilmaro)
- Email: gmjsilmaro03@gmail.com

## License

All Rights Reserved — Gilbert Michael Jay Silmaro
