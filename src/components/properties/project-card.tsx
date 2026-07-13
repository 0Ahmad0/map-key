'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { cn, formatPrice } from '@/lib/utils'
import type { Project } from '@/lib/demo-projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('projects')
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const row = Math.floor(index / 3)
  const delay = row * 0.15 + (index % 3) * 0.08

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl border border-border/10 bg-bg-card/50 cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full bg-gradient-to-br from-accent-gold/10 via-accent-cyan/5 to-bg-primary"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, type: 'spring' as const }}
          className={cn(
            'absolute top-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider',
            project.status === 'selling-fast'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : project.status === 'coming-soon'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
            isRTL ? 'left-4' : 'right-4'
          )}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
                project.status === 'selling-fast' ? 'bg-red-400' : project.status === 'coming-soon' ? 'bg-amber-400' : 'bg-emerald-400'
              )}
            />
            <span
              className={cn(
                'relative inline-flex h-2 w-2 rounded-full',
                project.status === 'selling-fast' ? 'bg-red-400' : project.status === 'coming-soon' ? 'bg-amber-400' : 'bg-emerald-400'
              )}
            />
          </span>
          {isRTL ? project.statusAr : project.status}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute bottom-4 z-10',
            isRTL ? 'right-4' : 'left-4'
          )}
        >
          <span className="inline-flex px-3 py-1 text-xs font-medium bg-accent-gold/90 text-white rounded-lg">
            {isRTL ? project.typeAr : project.type}
          </span>
        </motion.div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-text-primary leading-tight">
            {isRTL ? project.titleAr : project.title}
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            {isRTL ? project.locationAr : project.location}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{t('delivery')}: {isRTL ? project.deliveryDateAr : project.deliveryDate}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{t('startingFrom')} <span className="text-accent-gold font-semibold">{formatPrice(project.startingPrice, 'SAR', locale)}</span></span>
        </div>

        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>{t('by')} <span className="text-text-primary font-medium">{isRTL ? project.developerAr : project.developer}</span></span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-2 py-2.5 text-sm font-semibold text-accent-gold border border-accent-gold/30 rounded-xl hover:bg-accent-gold/10 transition-all"
        >
          {t('discoverMore')}
        </motion.button>
      </div>
    </motion.div>
  )
}
