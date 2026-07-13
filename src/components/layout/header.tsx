'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronRight,
  Home,
  Building2,
  LayoutDashboard,
  LogIn,
} from 'lucide-react'
import Image from 'next/image'

/* ═══════════════════════════════════════════════════════
   NAV LINK — Desktop underline animation
   ═══════════════════════════════════════════════════════ */
function NavLink({
  href,
  label,
  isActive,
}: {
  href: string
  label: string
  isActive: boolean
}) {
  return (
    <Link href={href} className="relative group py-2 px-1">
      <span
        className={cn(
          'text-sm font-medium tracking-wide transition-colors duration-300',
          isActive
            ? 'text-accent-gold'
            : 'text-text-secondary group-hover:text-text-primary'
        )}
      >
        {label}
      </span>

      {/* Gold underline indicator */}
      <motion.span
        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gold-gradient origin-left"
        initial={false}
        animate={{
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Hover underline (only when NOT active) */}
      {!isActive && (
        <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-accent-gold/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      )}
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════
   MOBILE NAV LINK — Drawer link with icon + chevron
   ═══════════════════════════════════════════════════════ */
const navIcons = {
  '/': Home,
  '/properties': Building2,
  '/dashboard': LayoutDashboard,
} as const

function MobileNavLink({
  href,
  label,
  isActive,
  index,
  isRTL,
  onClose,
}: {
  href: string
  label: string
  isActive: boolean
  index: number
  isRTL: boolean
  onClose: () => void
}) {
  const Icon = navIcons[href as keyof typeof navIcons] || Home

  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        href={href}
        onClick={onClose}
        className={cn(
          'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 group',
          isActive
            ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20'
            : 'text-text-secondary hover:bg-surface-1 hover:text-text-primary'
        )}
      >
        <Icon
          className={cn(
            'w-[18px] h-[18px] transition-colors',
            isActive ? 'text-accent-gold' : 'text-text-muted group-hover:text-accent-gold'
          )}
        />
        <span className="flex-1">{label}</span>
        <ChevronRight
          className={cn(
            'w-4 h-4 text-text-muted/50 transition-transform duration-300',
            isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
          )}
        />
      </Link>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   HEADER COMPONENT
   ═══════════════════════════════════════════════════════ */
export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale() as 'ar' | 'en'
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isRTL = locale === 'ar'

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/properties', label: t('properties') },
    { href: '/dashboard', label: t('dashboard') },
  ]

  const toggleLocale = () => {
    // ponytail: hard navigation — <html dir/lang> lives in the root layout which
    // never re-renders on soft navigation, so a full load is the reliable switch
    const next = isRTL ? 'en' : 'ar'
    window.location.assign(`/${next}${pathname === '/' ? '' : pathname}`)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-2 backdrop-blur-2xl bg-bg-primary/80 shadow-lg shadow-black/[0.03] dark:shadow-black/20 border-b border-border/50'
          : 'py-3 backdrop-blur-md bg-transparent border-b border-transparent'
      )}
    >
      {/* Subtle gold accent line at the very top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gold-gradient opacity-0"
        animate={{ opacity: scrolled ? 0.4 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <Link href="/" className="relative flex items-center group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Image
                src="/logo.png"
                alt="MAP KEY"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </motion.div>

            {/* Soft glow behind logo on hover */}
            <div className="absolute -inset-3 rounded-2xl bg-accent-gold/0 group-hover:bg-accent-gold/5 transition-colors duration-500 -z-10" />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav
            className={cn(
              'hidden lg:flex items-center gap-8',
              isRTL ? 'mr-auto ml-8' : 'ml-auto mr-8'
            )}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className={cn(
                'relative p-2.5 rounded-xl transition-all duration-300',
                'text-text-secondary hover:text-accent-gold',
                'hover:bg-accent-gold/8 active:bg-accent-gold/12'
              )}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && (
                  <motion.div
                    key={resolvedTheme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {resolvedTheme === 'dark' ? (
                      <Sun className="w-[18px] h-[18px]" />
                    ) : (
                      <Moon className="w-[18px] h-[18px]" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.04 }}
              onClick={toggleLocale}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold',
                'border border-border/60 text-text-secondary',
                'hover:border-accent-gold/40 hover:text-accent-gold hover:bg-accent-gold/5',
                'transition-all duration-300'
              )}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t('language')}</span>
            </motion.button>

            {/* Login Button — Desktop only */}
            <Link
              href="/auth/login"
              className={cn(
                'hidden lg:inline-flex items-center gap-2',
                'btn-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl',
                'gold-shimmer'
              )}
            >
              <LogIn className="w-3.5 h-3.5" />
              {t('login')}
            </Link>

            {/* Mobile Menu Trigger */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  whileHover={{ scale: 1.08 }}
                  className={cn(
                    'lg:hidden p-2.5 rounded-xl transition-all duration-300',
                    'text-text-secondary hover:text-accent-gold',
                    'hover:bg-accent-gold/8'
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </motion.button>
              </Dialog.Trigger>

              <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay asChild>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                  />
                </Dialog.Overlay>

                {/* Drawer Panel */}
                <Dialog.Content asChild>
                  <motion.aside
                    initial={{ x: isRTL ? '-100%' : '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: isRTL ? '-100%' : '100%' }}
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 300,
                      mass: 0.8,
                    }}
                    className={cn(
                      'fixed top-0 z-50 h-full w-[300px] max-w-[85vw]',
                      'bg-bg-secondary/95 backdrop-blur-2xl',
                      'border-border/20 shadow-2xl',
                      isRTL
                        ? 'left-0 border-r'
                        : 'right-0 border-l'
                    )}
                  >
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-5 border-b border-border/20">
                      <Image
                        src="/logo.png"
                        alt="MAP KEY"
                        width={110}
                        height={32}
                        className="h-8 w-auto object-contain"
                      />

                      <Dialog.Close asChild>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          whileHover={{ rotate: 90 }}
                          transition={{ duration: 0.2 }}
                          className="p-2 rounded-xl text-text-secondary hover:text-accent-gold hover:bg-accent-gold/10 transition-all"
                          aria-label="Close menu"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </Dialog.Close>
                    </div>

                    {/* Drawer Navigation */}
                    <nav className="p-5 space-y-1.5">
                      {navLinks.map((link, i) => (
                        <Dialog.Close key={link.href} asChild>
                          <div>
                            <MobileNavLink
                              href={link.href}
                              label={link.label}
                              isActive={pathname === link.href}
                              index={i}
                              isRTL={isRTL}
                              onClose={() => {}}
                            />
                          </div>
                        </Dialog.Close>
                      ))}
                    </nav>

                    {/* Drawer Bottom Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="absolute bottom-0 left-0 right-0 p-5 border-t border-border/20 space-y-3 bg-bg-secondary/80 backdrop-blur-xl"
                    >
                      {/* Login */}
                      <Dialog.Close asChild>
                        <Link
                          href="/auth/login"
                          className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold text-white rounded-xl btn-gold gold-shimmer"
                        >
                          <LogIn className="w-4 h-4" />
                          {t('login')}
                        </Link>
                      </Dialog.Close>

                      {/* Language Toggle */}
                      <Dialog.Close asChild>
                        <button
                          onClick={toggleLocale}
                          className={cn(
                            'flex items-center justify-center gap-2 w-full px-5 py-3',
                            'text-sm font-semibold rounded-xl',
                            'border border-border/40 text-text-secondary',
                            'hover:border-accent-gold/40 hover:text-accent-gold hover:bg-accent-gold/5',
                            'transition-all duration-300'
                          )}
                        >
                          <Globe className="w-4 h-4" />
                          {t('language')}
                        </button>
                      </Dialog.Close>
                    </motion.div>
                  </motion.aside>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
