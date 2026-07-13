import type { MetadataRoute } from 'next'

const locales = ['ar', 'en'] as const

const staticRoutes = [
  '',
  '/properties',
  '/dashboard',
  '/auth/login',
  '/auth/register',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `https://map-key.com/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ar: `https://map-key.com/ar${route}`,
            en: `https://map-key.com/en${route}`,
          },
        },
      })
    }
  }

  return entries
}
