'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import Image from 'next/image'

/* ═══════════════════════════════════════════════════════
   SOCIAL ICONS — Inline SVGs with hover effects
   ═══════════════════════════════════════════════════════ */
const socials = [
  {
    name: 'X',
    href: '#',
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

/* ═══════════════════════════════════════════════════════
   CONTACT ITEM — Reusable contact row
   ═══════════════════════════════════════════════════════ */
function ContactItem({
  icon: Icon,
  children,
  href,
  dir,
}: {
  icon: typeof Mail
  children: React.ReactNode
  href?: string
  dir?: string
}) {
  const content = (
    <span className="text-sm text-text-secondary group-hover:text-accent-gold transition-colors duration-300">
      {children}
    </span>
  )

  return (
    <li className="flex items-center gap-3 group">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-gold/8 group-hover:bg-accent-gold/15 transition-all duration-300">
        <Icon className="w-4 h-4 text-accent-gold" />
      </span>
      {href ? (
        <a
          href={href}
          dir={dir}
          className="text-sm text-text-secondary hover:text-accent-gold transition-colors duration-300"
        >
          {children}
        </a>
      ) : (
        content
      )}
    </li>
  )
}

/* ═══════════════════════════════════════════════════════
   FOOTER LINK — With gold underline reveal
   ═══════════════════════════════════════════════════════ */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="relative inline-block text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 group py-0.5"
      >
        {label}
        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent-gold rounded-full transition-all duration-300 ease-out group-hover:w-full" />
      </Link>
    </li>
  )
}

/* ═══════════════════════════════════════════════════════
   STAGGER ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

/* ═══════════════════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════════════════ */
export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { href: '/about', label: t('about') },
    { href: '/faq', label: t('faq') },
    // ponytail: privacy & terms live as FAQ entries until dedicated legal pages exist
    { href: '/faq', label: t('privacy') },
    { href: '/faq', label: t('terms') },
  ]

  return (
    <>
      {/* ── Back to Top Button ── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={scrollToTop}
            className={cn(
              'fixed bottom-8 z-40 group',
              isRTL ? 'left-8' : 'right-8'
            )}
            aria-label={t('backToTop')}
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-gold text-white shadow-gold-lg animate-pulse-gold transition-all duration-300 group-hover:shadow-gold-xl group-hover:scale-110">
              <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Footer ── */}
      <footer className="relative bg-bg-secondary overflow-hidden">
        {/* Gold gradient divider at top */}
        <div className="divider-gold h-[2px]" />

        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gold opacity-30 pointer-events-none" />

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="container mx-auto px-4 py-16 lg:py-20 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* ── Column 1: Brand ── */}
            <motion.div variants={itemVariants} className={cn(isRTL ? 'lg:order-1' : '')}>
              <Link href="/" className="inline-block mb-6 group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Image
                    src="/logo.png"
                    alt="MAP KEY"
                    width={130}
                    height={38}
                    className="h-9 w-auto object-contain"
                  />
                </motion.div>
              </Link>

              <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-6">
                {t('description')}
              </p>

              {/* Mini gold accent line */}
              <div className="w-12 h-[2px] bg-gold-gradient rounded-full opacity-60" />
            </motion.div>

            {/* ── Column 2: Quick Links ── */}
            <motion.div variants={itemVariants} className={cn(isRTL ? 'lg:order-2' : '')}>
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-5 h-[2px] bg-accent-gold rounded-full" />
                {t('quickLinks')}
              </h3>

              <ul className="space-y-3.5">
                {quickLinks.map((link) => (
                  <FooterLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                  />
                ))}
              </ul>
            </motion.div>

            {/* ── Column 3: Contact ── */}
            <motion.div variants={itemVariants} className={cn(isRTL ? 'lg:order-3' : '')}>
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-5 h-[2px] bg-accent-gold rounded-full" />
                {t('contactUs')}
              </h3>

              <ul className="space-y-4">
                <ContactItem icon={Mail} href="mailto:info@map-key.com">
                  {t('email')}
                </ContactItem>

                <ContactItem icon={Phone} href="tel:+966550000000" dir="ltr">
                  {t('phone')}
                </ContactItem>

                <ContactItem icon={MapPin}>
                  {t('address')}
                </ContactItem>
              </ul>
            </motion.div>

            {/* ── Column 4: Social ── */}
            <motion.div variants={itemVariants} className={cn(isRTL ? 'lg:order-4' : '')}>
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-5 h-[2px] bg-accent-gold rounded-full" />
                Social
              </h3>

              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 15,
                    }}
                    className={cn(
                      'relative flex items-center justify-center w-10 h-10 rounded-xl',
                      'bg-surface-1 border border-border/40',
                      'text-text-muted',
                      'hover:text-accent-gold hover:border-accent-gold/30 hover:bg-accent-gold/10',
                      'hover:shadow-gold-sm',
                      'transition-all duration-300'
                    )}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Small trust badge */}
              <div className="mt-8 flex items-center gap-2 text-text-muted">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold/10">
                  <svg className="w-3 h-3 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xs">Verified by REGA</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-border/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-start">
                <p className="text-xs text-text-muted">
                  &copy; {new Date().getFullYear()}{' '}
                  <span className="text-gold-gradient font-semibold">Map-Key</span>.{' '}
                  {t('rights')}.
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {isRTL ? (
                    <>طُوّر بواسطة <span className="text-accent-gold font-semibold">المهندس أحمد الحريري</span></>
                  ) : (
                    <>Developed by <span className="text-accent-gold font-semibold">Eng. Ahmad Al-Hariri</span></>
                  )}
                </p>
              </div>

              {/* Decorative element */}
              <div className="flex items-center gap-3 text-text-muted/40">
                <span className="w-1 h-1 rounded-full bg-accent-gold/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/30" />
                <span className="w-1 h-1 rounded-full bg-accent-gold/40" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
