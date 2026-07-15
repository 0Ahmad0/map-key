'use client'

import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ChevronDown, Eye, EyeOff, Globe2, Headphones, Loader2, LogIn, Menu, Phone, X } from 'lucide-react'
import { useAuthStore } from '@/lib/auth-store'
import { toast } from '@/components/ui/toast-provider'

const labels = {
  ar: {
    home: 'الرئيسية',
    sale: 'للبيع',
    commercial: 'تجاري',
    projects: 'المشاريع',
    signature: 'سيجنتشر',
    more: 'المزيد',
    login: 'تسجيل دخول',
    lang: 'EN',
    arabic: 'ع',
    currency: 'SAR',
    phone: '+966 55 000 0000',
  },
  en: {
    home: 'Home',
    sale: 'For Sale',
    commercial: 'Commercial',
    projects: 'Projects',
    signature: 'Signature',
    more: 'More',
    login: 'Sign in',
    lang: 'AR',
    arabic: 'EN',
    currency: 'SAR',
    phone: '+966 55 000 0000',
  },
}

function LoginDialog({ trigger, locale }: { trigger: React.ReactNode; locale: 'ar' | 'en' }) {
  const router = useRouter()
  const { setAuth, deviceId } = useAuthStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const isRTL = locale === 'ar'
  const text = {
    ar: {
      title: 'تسجيل الدخول',
      subtitle: 'أدخل بيانات حسابك للوصول إلى لوحة التحكم.',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      remember: 'تذكرني',
      forgot: 'نسيت كلمة المرور؟',
      submit: 'تسجيل الدخول',
      noAccount: 'لا تملك حساباً؟',
      create: 'إنشاء حساب جديد',
      demo: 'تجريبي: admin@map-key.com / Admin@123',
      fail: 'تعذر تسجيل الدخول',
    },
    en: {
      title: 'Sign in',
      subtitle: 'Enter your account details to access the dashboard.',
      email: 'Email address',
      password: 'Password',
      remember: 'Remember me',
      forgot: 'Forgot password?',
      submit: 'Sign in',
      noAccount: 'No account?',
      create: 'Create a new account',
      demo: 'Demo: admin@map-key.com / Admin@123',
      fail: 'Unable to sign in',
    },
  }[locale]

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': deviceId },
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
          deviceId,
        }),
      })
      const json = await response.json()
      if (!response.ok) {
        setError(json.message || text.fail)
        return
      }
      setAuth(json.data.user, json.data.tokens)
      toast.success(isRTL ? 'تم تسجيل الدخول بنجاح' : 'Signed in successfully')
      setOpen(false)
      router.push('/dashboard')
    } catch {
      setError(text.fail)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-md" />
        <Dialog.Content className="fixed inset-0 z-[80] grid place-items-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-[min(92vw,520px)] overflow-hidden rounded-[32px] bg-white p-6 shadow-2xl md:p-9"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <Dialog.Close className="absolute start-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200">
              <X className="h-5 w-5" />
            </Dialog.Close>
            <div className="text-center">
              <Image src="/new_logo.svg" alt="Map Key" width={180} height={106} className="mx-auto h-16 w-auto" />
              <Dialog.Title className="mt-7 text-3xl font-black text-neutral-950">{text.title}</Dialog.Title>
              <Dialog.Description className="mt-3 text-neutral-500">{text.subtitle}</Dialog.Description>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-neutral-700">{text.email}</span>
                <input
                  name="email"
                  type="email"
                  defaultValue="admin@map-key.com"
                  autoComplete="email"
                  required
                  className="h-14 w-full rounded-2xl border border-neutral-200 px-5 outline-none transition focus:border-[#b99750] focus:ring-4 focus:ring-[#b99750]/10"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-neutral-700">{text.password}</span>
                <span className="flex h-14 items-center rounded-2xl border border-neutral-200 px-5 transition focus-within:border-[#b99750] focus-within:ring-4 focus-within:ring-[#b99750]/10">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue="Admin@123"
                    autoComplete="current-password"
                    required
                    className="min-w-0 flex-1 bg-transparent outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-neutral-400 hover:text-[#b99750]" aria-label="Toggle password visibility">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </span>
              </label>

              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 text-neutral-500">
                  <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 accent-[#b99750]" />
                  {text.remember}
                </label>
                <button type="button" className="font-bold text-[#a58742]">{text.forgot}</button>
              </div>

              {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}

              <button disabled={loading} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#b99750] font-bold text-white shadow-lg shadow-[#b99750]/25 transition hover:bg-[#a58742] disabled:opacity-70">
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                {text.submit}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-500">
              {text.noAccount}{' '}
              <Link href="/auth/register" onClick={() => setOpen(false)} className="font-bold text-[#a58742] underline">
                {text.create}
              </Link>
            </p>
            <p className="mt-3 text-center text-xs text-neutral-400">{text.demo}</p>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
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
    { href: '/properties?purpose=sale', label: t.sale },
    { href: '/properties?purpose=commercial', label: t.commercial },
    { href: '/properties?type=projects', label: t.projects },
    { href: '/properties?signature=1', label: t.signature, accent: true },
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
        scrolled ? 'border-neutral-200 bg-white/95 shadow-lg shadow-black/5 backdrop-blur-xl' : 'border-white/10 bg-white/90 backdrop-blur-md'
      )}
    >
      <div className="container mx-auto flex h-[108px] items-center justify-between gap-6 px-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image src="/new_logo.svg" alt="Map Key" width={210} height={124} priority className="h-16 w-auto" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'text-lg font-medium text-neutral-950 transition hover:text-[#b99750]',
                item.accent && 'text-[#d1ad63]',
                pathname === item.href && 'text-[#b99750]'
              )}
            >
              {item.label}
            </Link>
          ))}
          <button className="inline-flex items-center gap-2 text-lg font-medium text-neutral-950 transition hover:text-[#b99750]">
            <ChevronDown className="h-4 w-4 text-neutral-500" />
            {t.more}
          </button>
        </nav>

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <LoginDialog
            locale={locale}
            trigger={
              <button className="inline-flex h-14 items-center gap-2 rounded-full border border-neutral-200 bg-white px-7 text-lg font-medium text-neutral-950 transition hover:border-[#b99750]">
                {t.login}
              </button>
            }
          />
          <span className="inline-flex h-11 items-center gap-3 text-lg font-medium text-neutral-950">
            {locale === 'ar' ? 'السعودية' : 'Saudi'}
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-[#245d31] text-sm leading-none">🇸🇦</span>
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
                initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
                className={cn('fixed top-0 z-50 flex h-full w-[340px] max-w-[88vw] flex-col bg-white p-6 shadow-2xl', locale === 'ar' ? 'left-0' : 'right-0')}
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
                  <a href="tel:+966550000000" className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 px-5 py-4 font-bold">
                    <Phone className="h-4 w-4 text-[#b99750]" />
                    {t.phone}
                  </a>
                  <LoginDialog
                    locale={locale}
                    trigger={
                      <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 px-5 py-4 font-bold">
                        <LogIn className="h-4 w-4" />
                        {t.login}
                      </button>
                    }
                  />
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
