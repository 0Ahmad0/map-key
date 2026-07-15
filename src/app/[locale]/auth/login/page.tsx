'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useRouter } from '@/i18n/navigation'
import { Input } from '@/components/ui/input'
import { RippleButton } from '@/components/ui/ripple-button'
import { loginSchema, type LoginFormData } from '@/lib/schemas'
import { useAuthStore } from '@/lib/auth-store'
import { toast } from '@/components/ui/toast-provider'

export default function LoginPage() {
  const t = useTranslations('auth')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { setAuth, deviceId } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Device-Id': deviceId },
        body: JSON.stringify({ email: data.email, password: data.password, deviceId }),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.message || 'حدث خطأ في تسجيل الدخول')
        return
      }

      setAuth(json.data.user, json.data.tokens)
      toast.success('تم تسجيل الدخول بنجاح')
      router.push('/dashboard')
    } catch {
      toast.error('حدث خطأ في الاتصال بالخادم')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-bg-card/85 rounded-2xl border border-border/10 p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-h2 font-bold text-text-primary mb-2">
              {t('welcome')}
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="email"
              type="email"
              label={t('email')}
              required
              autoComplete="email"
              placeholder="name@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="password"
              type="password"
              label={t('password')}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" className="rounded border/30" />
                {t('remember')}
              </label>
              <button type="button" className="text-sm text-accent-gold hover:underline">
                {t('forgotPassword')}
              </button>
            </div>

            <RippleButton type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                t('signIn')
              )}
            </RippleButton>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            {t('noAccount')}{' '}
            <Link href="/auth/register" className="text-accent-gold font-medium hover:underline">
              {t('createAccount')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
