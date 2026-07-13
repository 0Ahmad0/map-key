'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('errors')

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-8xl font-bold text-accent-gold mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-8">{t('notFound')}</p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 text-sm font-semibold text-white bg-accent-gold hover:bg-accent-gold-hover rounded-xl transition-all"
        >
          {t('backHome')}
        </Link>
      </motion.div>
    </div>
  )
}
