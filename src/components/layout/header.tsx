'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { Globe2, Headphones, Menu, Phone, X } from 'lucide-react'

const labels = {
  ar: {
    home: 'الرئيسية',
    projects: 'مشاريعنا',
    about: 'من نحن',
    rent: 'للتأجير',
    lang: 'EN',
    arabic: 'ع',
    currency: 'SAR',
    phone: '+966 54 164 6755',
  },
  en: {
    home: 'Home',
    projects: 'Our Projects',
    about: 'About Us',
    rent: 'For Rent',
    lang: 'AR',
    arabic: 'EN',
    currency: 'SAR',
    phone: '+966 54 164 6755',
  },
}

export function Header() {
  const locale = useLocale() as 'ar' | 'en'
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const t = labels[locale]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { href: '/', label: t.home },
    { href: '/projects', label: t.projects },
    { href: '/about', label: t.about },
    { href: '/properties?purpose=rent', label: t.rent },
  ]

  const switchLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar'
    window.location.assign(`/${next}${pathname === '/' ? '' : pathname}`)
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled ? 'border-neutral-200 bg-[#f8f7f4]/95 shadow-lg shadow-black/5 backdrop-blur-xl' : 'border-white/10 bg-[#f8f7f4]/90 backdrop-blur-md'
      )}
    >
      <div className="container mx-auto flex h-[108px] items-center justify-between gap-6 px-4">
        <Link href="/" className="relative flex shrink-0 items-center pb-2 after:absolute after:inset-x-[8%] after:bottom-0 after:h-1 after:rounded-full after:bg-[#b99750]">
          <Image src="/new_logo.svg" alt="Map Key" width={280} height={165} priority className="h-24 w-auto" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'text-lg font-medium text-neutral-950 transition hover:text-[#b99750]',
                pathname === item.href && 'text-[#b99750]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <span className="inline-flex h-11 items-center gap-2 rounded-full border border-[#b99750]/25 bg-white/75 px-3 text-base font-semibold text-neutral-950 shadow-sm">
            <span className="text-xl leading-none" aria-hidden="true">🇸🇦</span>
            {locale === 'ar' ? 'السعودية' : 'Saudi'}
          </span>
          <button onClick={switchLocale} className="inline-flex h-11 items-center gap-2 text-lg font-medium text-neutral-950">
            <span>{t.arabic}</span>
            <Globe2 className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium text-neutral-950">{t.currency}</span>
          <Headphones className="h-7 w-7 text-neutral-700" />
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="grid h-12 w-12 place-items-center rounded-full bg-neutral-950 text-white lg:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: locale === 'ar' ? '100%' : '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: locale === 'ar' ? '100%' : '-100%' }}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                className={cn('fixed top-0 z-50 flex h-full w-[340px] max-w-[88vw] flex-col bg-white p-6 text-start shadow-2xl', locale === 'ar' ? 'right-0' : 'left-0')}
              >
                <div className="mb-6 flex shrink-0 items-center justify-between">
                  <Image src="/new_logo.svg" alt="Map Key" width={140} height={84} className="h-12 w-auto" />
                  <Dialog.Close className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100">
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </div>
                <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto pb-4">
                  {nav.map((item) => (
                    <Dialog.Close asChild key={item.label}>
                      <Link href={item.href} className="block rounded-2xl px-4 py-4 text-base font-bold text-neutral-800 hover:bg-[#f5f0e6]">
                        {item.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </nav>
                <div className="shrink-0 space-y-3 border-t border-neutral-100 pt-4">
                  <a href="tel:+966541646755" className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 px-5 py-4 font-bold text-neutral-950">
                    <Phone className="h-4 w-4 text-[#b99750]" />
                    <span dir="ltr" className="[unicode-bidi:isolate]">{t.phone}</span>
                  </a>
                  <button onClick={switchLocale} className="w-full rounded-2xl bg-neutral-950 px-5 py-4 font-bold text-white">
                    🇸🇦 {t.lang} / {t.currency}
                  </button>
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </motion.header>
  )
}
