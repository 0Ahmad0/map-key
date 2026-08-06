# Deployment

## Hostinger Node.js Web App

This repository is a Next.js 14 hybrid application, not a static Vite/CRA site. It contains Middleware and `/api` route handlers, so it must be deployed as a Hostinger Node.js Web App rather than copied to `public_html`.

## Requirements

- Node.js 20
- npm

## Build

```bash
npm ci
npm run build
```

In hPanel, use **Websites → Add website → Node.js Web App**, then import the GitHub repository and select branch `main`.

- Node.js: `20.x`
- Package manager: `npm`
- Install: `npm ci`
- Build: `npm run build`
- Start: `npm start`
- Domain: `mapkey.sa`
- Environment variable: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (use the restricted Google Maps key)

Hostinger installs dependencies, creates `.next`, runs the Node.js process, and manages HTTPS. Future pushes to `main` can trigger automatic redeployment.

## Verification after deployment

Check:

- `https://mapkey.sa/ar`
- `https://mapkey.sa/en`
- `https://mapkey.sa/ar/projects`
- `https://mapkey.sa/sitemap.xml`
- `https://mapkey.sa/robots.txt`

Confirm that the latest Hostinger deployment is published, the custom domain is assigned to that app, HTTPS is active, and both apex and `www` DNS records use the values shown by hPanel.

## Static hosting note

A `public_html` deployment would require a separate static migration: remove or replace Middleware and API routes, pre-generate every dynamic locale/project/property route, enable `output: 'export'`, and publish the resulting `out` directory. That migration was not performed because it would remove working server features. `.htaccess` is therefore not applicable.
