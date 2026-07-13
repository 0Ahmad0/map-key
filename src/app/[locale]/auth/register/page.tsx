'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@/i18n/navigation'
import { Input } from '@/components/ui/input'
import { RippleButton } from '@/components/ui/ripple-button'
import { registerSchema, type RegisterFormData } from '@/lib/schemas'

export default function RegisterPage() {
  const t = useTranslations('auth')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (_data: RegisterFormData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
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
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {t('createAccount')}
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="name"
              type="text"
              label={t('name')}
              required
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              id="reg-email"
              type="email"
              label={t('email')}
              required
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="phone"
              type="tel"
              label={t('phone')}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              id="reg-password"
              type="password"
              label={t('password')}
              required
              minLength={8}
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              id="confirm-password"
              type="password"
              label={t('confirmPassword')}
              required
              minLength={8}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <label className="flex items-start gap-2 text-sm text-text-secondary">
              <input type="checkbox" required className="mt-1 rounded border/30" />
              {t('agreeTerms')}
            </label>

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
                t('signUp')
              )}
            </RippleButton>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            {t('haveAccount')}{' '}
            <Link href="/auth/login" className="text-accent-gold font-medium hover:underline">
              {t('signIn')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
