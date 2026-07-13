'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function DashboardPage() {
  const t = useTranslations('nav')

  return (
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
              className="bg-bg-card/85 card-gradient rounded-2xl border border/10 p-6"
            >
              <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.className}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-bg-card/85 card-gradient rounded-2xl border border/10 p-8 text-center text-text-secondary">
          Dashboard features coming soon.
        </div>
      </motion.div>
    </div>
  )
}
