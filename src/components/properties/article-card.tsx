'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import type { Article } from '@/lib/demo-articles'

interface ArticleCardProps {
  article: Article
  featured?: boolean
  index: number
}

export function ArticleCard({ article, featured, index }: ArticleCardProps) {
  const t = useTranslations('articles')
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: featured ? 0 : index * 0.1 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/10 bg-bg-card/50',
        featured ? 'lg:col-span-2 lg:row-span-1' : ''
      )}
    >
      <div className={cn('relative overflow-hidden', featured ? 'h-72' : 'h-48')}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full bg-gradient-to-br from-accent-gold/10 via-accent-cyan/5 to-bg-primary"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/10 to-transparent" />

        <div className={cn('absolute top-4 z-10', isRTL ? 'right-4' : 'left-4')}>
          <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-accent-gold/90 text-white rounded-lg">
            {isRTL ? article.categoryAr : article.category}
          </span>
        </div>

        {featured && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-4 right-4 z-10"
          >
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-accent-gold/20 text-accent-gold border border-accent-gold/30 rounded">
              Featured
            </span>
          </motion.div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className={cn(
          'font-bold text-text-primary leading-tight',
          featured ? 'text-h3' : 'text-lg'
        )}>
          {isRTL ? article.titleAr : article.title}
        </h3>

        <p className="text-sm text-text-secondary line-clamp-2">
          {isRTL ? article.excerptAr : article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-xs font-bold text-accent-gold">
              {article.authorAvatar}
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">
                {isRTL ? article.authorAr : article.author}
              </p>
              <p className="text-[10px] text-text-secondary">
                {article.readTime} {t('readTime')}
              </p>
            </div>
          </div>

          <div className="relative">
            <motion.span
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-px bg-accent-gold"
            />
            <span className="text-xs font-medium text-accent-gold cursor-pointer">
              {t('readMore')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
