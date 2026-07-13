'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn, formatPrice } from '@/lib/utils'
import type { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  index?: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const locale = useLocale() as 'ar' | 'en'
  const t = useTranslations('properties')
  const isRTL = locale === 'ar'

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border/10 transition-all duration-300',
        'bg-bg-card/85 card-gradient',
        'shadow-card hover:shadow-lg hover:-translate-y-1'
      )}
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent z-10" />
        <div className="w-full h-full bg-gradient-to-br from-text-secondary/20 to-text-secondary/10" />
        <span
          className={cn(
            'absolute top-4 z-20 px-3 py-1 rounded-full text-xs font-medium',
            property.type === 'sale'
              ? 'bg-accent-gold text-white'
              : 'bg-accent-cyan text-white',
            isRTL ? 'right-4' : 'left-4'
          )}
        >
          {property.type === 'sale' ? t('forSale') : t('forRent')}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-text-primary mb-2 line-clamp-1">
          {isRTL && property.titleAr ? property.titleAr : property.title}
        </h3>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {isRTL && property.locationAr ? property.locationAr : property.location}
        </p>

        <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
          <span>{property.bedrooms} {t('bedrooms')}</span>
          <span>{property.bathrooms} {t('bathrooms')}</span>
          <span>{property.area} m²</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-accent-gold">
            {formatPrice(property.price, property.currency, locale)}
          </span>
          <Link
            href={`/properties/${property.id}`}
            className="px-4 py-2 text-sm font-medium text-accent-cyan border border-accent-cyan/30 rounded-lg hover:bg-accent-cyan/10 transition-colors"
          >
            {t('details')}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
