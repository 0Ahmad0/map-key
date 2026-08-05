# Performance audit

Date: 2026-08-05

## Project detected

- Next.js 14.2 App Router, React 18, TypeScript, Tailwind CSS.
- Internationalized routes use `next-intl` (`/ar`, `/en`).
- Hybrid deployment: Middleware, route handlers under `/api`, and dynamic routes.
- Deployment target in the repository is Netlify/OpenNext, not Vite, CRA, or a static Apache/Hostinger build.

## Test method

`npm run build` followed by `next start -p 3002`. Lighthouse was run against `http://localhost:3002/ar` using Microsoft Edge. The Lighthouse CLI completed its reports but returned a Windows temporary-directory cleanup warning (`EPERM`) after each run; the JSON reports were created successfully.

## Measured results

| Metric | Mobile before | Mobile after | Desktop before | Desktop after |
|---|---:|---:|---:|---:|
| Performance | 89 | 88 | 99 | 99 |
| Accessibility | 96 | 96 | 96 | 96 |
| SEO | 92 | 92 | 92 | 92 |
| FCP | 1.84 s | 1.83 s | 0.48 s | 0.47 s |
| LCP | 3.44 s | 3.59 s | 0.94 s | 0.76 s |
| CLS | 0.0000 | 0.0000 | 0.0114 | 0.0000 |
| TBT | 96 ms | 100 ms | 0 ms | 0 ms |
| Speed Index | 3.24 s | 2.82 s | 1.03 s | 0.95 s |
| Transfer size | 11,653,394 B | 11,631,371 B | 11,776,590 B | 11,753,582 B |
| Requests | 35 | 32 | 44 | 41 |
| JavaScript transfer | 229,115 B | 210,558 B | 229,115 B | 210,558 B |
| CSS transfer | 15,627 B | 12,400 B | 15,627 B | 12,400 B |

Mobile performance varies between runs; the one-point score change is not evidence of a regression. The repeatable improvements are fewer requests, 18,557 B less JavaScript, 3,227 B less CSS, and improved desktop LCP/CLS.

## Findings and changes

1. `public/hero_video.mp4` is 11,164,486 B and accounts for almost the entire initial payload. It remains the primary performance ceiling. The video keeps autoplay to preserve the design; `preload="metadata"` was added. Re-encoding was not performed because FFmpeg installation was unavailable in the environment. Recommended target: H.264/WebM at the displayed resolution, ideally below 2–3 MB, checked visually before replacement.
2. `QueryProvider` was mounted globally although no component uses React Query. It was removed from the root render path.
3. `react-toastify` was loaded for every route although only authentication uses it. `ToastProvider` now lives in the auth layout.
4. Added `prefers-reduced-motion` behavior for accessibility and to avoid expensive animations for users requesting reduced motion.
5. Added explicit cache policy for public images/video (one day plus stale revalidation) and immutable one-year caching for the stable WOFF2 font. Next.js hashed static assets retain framework-managed caching.
6. The Leaflet map was already loaded with `next/dynamic` and SSR disabled, so no extra map splitting was needed.
7. Images rendered by the application primarily use `next/image` with `sizes`; the hero/detail LCP images use `priority`. No source image was deleted or recompressed because Netlify Image CDN performs responsive delivery and visual verification of replacements was unavailable.

## Largest source assets

| Asset | Source size | Treatment |
|---|---:|---|
| `public/hero_video.mp4` | 11,164,486 B | Main remaining issue; re-encode manually |
| `public/images/map-key-office.png` | 1,013,468 B | Served through `next/image`; retain original |
| `public/images/map-key-showroom.png` | 890,207 B | Served through `next/image`; retain original |
| `public/images/proj-6.jpg` | 394,036 B | Served responsively through `next/image` |
| `public/images/projects/sukoon-10-11/gallery-03.jpg` | 307,302 B | Served responsively through `next/image` |

## Bundle observations

- Shared first-load JavaScript reported by Next.js: 87.8 kB.
- Home route first-load JavaScript: 179 kB.
- Largest emitted raw chunks include Next/React framework chunks; no single application page chunk exceeds 43 kB raw.
- Removed 12 unused dependencies (unused Radix primitives, Embla, and React Query) plus 15 dead component/store files. This reduces install size and maintenance surface; runtime route sizes are unchanged because the dead code was already excluded from production bundles.
- No service worker or PWA cache is present; none was added.

## Verification

- `npm run build`: passed.
- Arabic and English project detail routes: HTTP 200.
- `sitemap.xml`: HTTP 200.
- Cache headers verified for images, fonts, and video.
- No `.htaccess` was added: Netlify/Next.js does not read Apache configuration.

## Remaining work

- Re-encode the hero video and rerun Lighthouse. This is the only change likely to materially reduce the 11.6 MB initial payload.
- Check contrast findings visually before changing brand colors; Lighthouse reports one contrast issue, but automated changes could alter the identity.
- Run Lighthouse against `https://mapkey.sa` after the Netlify deployment and DNS are stable; local scores exclude real CDN/network latency.
