import type { MetadataRoute } from 'next'

const locales = ['ar', 'en'] as const

const staticRoutes = [
  '',
  '/about',
  '/faq',
  '/projects',
  '/properties',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `https://mapkey.sa/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ar: `https://mapkey.sa/ar${route}`,
            en: `https://mapkey.sa/en${route}`,
          },
        },
      })
    }
  }

  return entries
}
