'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { AuthGuard } from '@/components/ui/auth-guard'
import { QRDisplay } from '@/components/ui/qr-display'
import { useAuthStore } from '@/lib/auth-store'

export default function DashboardPage() {
  const t = useTranslations('nav')
  const { user } = useAuthStore()

  return (
    <AuthGuard>
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-text-primary mb-8">
          {t('dashboard')}
        </h1>

        <div className="grid grid-auto-fit-sm gap-6 mb-8">
          {[
            { label: 'Total Properties', value: '0', className: 'text-accent-gold' },
            { label: 'Active Listings', value: '0', className: 'text-accent-cyan' },
            { label: 'Inquiries', value: '0', className: 'text-accent-gold' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-bg-card/85 rounded-2xl border border-border/10 p-6"
            >
              <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.className}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-bg-card/85 rounded-2xl border border-border/10 p-8 pt-12 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">رمز الدعوة</h2>
          <p className="text-text-secondary text-sm mb-8 max-w-md mx-auto">
            امسح الرمز للوصول السريع إلى حسابك
          </p>
          <div className="flex justify-center">
            <QRDisplay
              value={JSON.stringify({ userId: user?.id, timestamp: Date.now() })}
              className="flex justify-center"
            />
          </div>
          <p className="mt-6 text-xs text-text-muted">رمز مميز للدخول السريع</p>
        </div>
      </motion.div>
    </div>
    </AuthGuard>
  )
}
