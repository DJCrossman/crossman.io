# crossman.io

Personal portfolio of [David Crossman](https://www.crossman.io) — rebuilt from
Squarespace as a self-owned [Next.js](https://nextjs.org) app.

## Stack

- **Next.js 16** (App Router, all routes statically generated)
- **Tailwind CSS v4** — design tokens live in [`src/app/globals.css`](src/app/globals.css)
- **shadcn/ui on [Base UI](https://base-ui.com) primitives** — components in [`src/components/ui`](src/components/ui)
- **Resend** for the contact form (server action, zod-validated, honeypot spam guard)
- **GitHub Actions** CI: ESLint + `tsc`, production build, and Lighthouse
  assertions (performance ≥ 0.9; accessibility, best practices, SEO ≥ 0.95)
  against all three routes

## Editing content

All copy lives in typed data files — no CMS:

| File | Contents |
| --- | --- |
| [`src/content/home.ts`](src/content/home.ts) | Hero, intro, home sections, contact copy |
| [`src/content/work.ts`](src/content/work.ts) | Work history entries |
| [`src/content/community.ts`](src/content/community.ts) | Community involvement entries |
| [`src/content/site.ts`](src/content/site.ts) | Nav + social links, site name/URL |

Edit a string, commit, and CI + Vercel take it from there. The shared shapes
are in [`src/content/types.ts`](src/content/types.ts).

## Development

```bash
npm install
npm run dev
```

The contact form works without a key in development (submissions are logged to
the console). To send real email, copy `.env.example` to `.env.local` and set
`RESEND_API_KEY`.

```bash
npm run build   # production build — all routes should show ○ (Static)
npm run lint
```

## Videos

Two self-hosted videos are referenced but not committed — see
[`public/videos/README.md`](public/videos/README.md) for the ffmpeg compression
recipe. Video sections render only when the files exist.
