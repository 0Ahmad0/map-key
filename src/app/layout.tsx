import type { Metadata } from 'next'
import { Inter, Poppins, Tajawal } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import { ThemeProvider } from '@/providers/theme-provider'
import { QueryProvider } from '@/lib/query-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-arabic',
  display: 'swap',
})

// El Messiri (Arabic headings) is self-hosted in public/fonts via @font-face in globals.css
// ponytail: the local network kept aborting Google Fonts downloads mid-build, so it lives locally like the images

export const metadata: Metadata = {
  title: {
    default: 'Map-Key | The Secure Real Estate Gateway',
    template: '%s | Map-Key',
  },
  description:
    'A secure and trusted digital real estate platform with enterprise-grade security and zero-trust architecture. Find your perfect property in Saudi Arabia.',
  keywords: [
    'real estate',
    'property',
    'Saudi Arabia',
    'buy',
    'rent',
    'Riyadh',
    'Jeddah',
    'Dammam',
    'Map-Key',
  ],
  authors: [{ name: 'Map-Key', url: 'https://map-key.com' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'Map-Key',
    title: 'Map-Key | The Secure Real Estate Gateway',
    description:
      'A secure and trusted digital real estate platform with enterprise-grade security and zero-trust architecture.',
    url: 'https://map-key.com',
    images: [
      {
        url: 'https://map-key.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Map-Key - Real Estate Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Map-Key | The Secure Real Estate Gateway',
    description:
      'A secure and trusted digital real estate platform with enterprise-grade security and zero-trust architecture.',
    images: ['https://map-key.com/og-image.png'],
  },
  alternates: {
    languages: {
      ar: 'https://map-key.com/ar',
      en: 'https://map-key.com/en',
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ponytail: root layout sits above [locale], so params.locale never existed here — resolve from the request instead
  const locale = await getLocale()
  const messages = await getMessages()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Map-Key',
    description:
      'A secure and trusted digital real estate platform with enterprise-grade security and zero-trust architecture.',
    url: 'https://map-key.com',
    foundingDate: '2024',
    areaServed: [
      { '@type': 'City', name: 'Riyadh' },
      { '@type': 'City', name: 'Jeddah' },
      { '@type': 'City', name: 'Dammam' },
    ],
    availableLanguage: [
      { '@type': 'Language', name: 'Arabic' },
      { '@type': 'Language', name: 'English' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
    },
  }

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${tajawal.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="transition-colors duration-500">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
