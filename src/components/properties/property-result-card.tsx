'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn, formatPrice } from '@/lib/utils'
import { MapPin, BedDouble, Bath, Maximize, Heart, Sparkles } from 'lucide-react'
import type { Property } from '@/types'

interface PropertyResultCardProps {
  property: Property
  viewMode: 'grid' | 'list'
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onSelect: (id: string) => void
}

// Unique gradient combos for each property card to make them visually distinct
const gradientPalettes = [
  'from-accent-gold/20 via-amber-900/10 to-bg-card',
  'from-blue-900/20 via-accent-gold/10 to-bg-card',
  'from-emerald-900/20 via-accent-gold/10 to-bg-card',
  'from-purple-900/20 via-accent-gold/10 to-bg-card',
  'from-accent-gold/15 via-rose-900/10 to-bg-card',
  'from-cyan-900/20 via-accent-gold/10 to-bg-card',
  'from-amber-800/20 via-orange-900/10 to-bg-card',
  'from-indigo-900/20 via-accent-gold/10 to-bg-card',
]

// Decorative pattern overlay for image area
function GradientPlaceholder({ index, className }: { index: number; className?: string }) {
  const palette = gradientPalettes[index % gradientPalettes.length]
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Base gradient */}
      <div className={cn('absolute inset-0 bg-gradient-to-br', palette)} />

      {/* Shimmer overlay */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            backgroundImage:
              'linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.08) 45%, rgba(201,168,76,0.15) 50%, rgba(201,168,76,0.08) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* Decorative geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 right-4 w-20 h-20 border border-accent-gold/10 rounded-full" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border border-accent-gold/5 rounded-lg rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-gold/5 rounded-full blur-xl" />
      </div>

      {/* Building icon watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-accent-gold/10" />
      </div>

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 via-transparent to-transparent" />
    </div>
  )
}

export function PropertyResultCard({
  property,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: PropertyResultCardProps) {
  const locale = useLocale() as 'ar' | 'en'
  const t = useTranslations('properties')
  const isRTL = locale === 'ar'
  const cardIndex = parseInt(property.id, 10) || 0

  const isGrid = viewMode === 'grid'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(property.id)}
      className={cn(
        'glass-card-hover group relative overflow-hidden rounded-2xl cursor-pointer',
        isGrid ? 'flex flex-col' : 'flex flex-row',
        isRTL && !isGrid && 'flex-row-reverse'
      )}
    >
      {/* Image / Gradient Area */}
      <div className={cn(
        'relative overflow-hidden shrink-0',
        isGrid ? 'w-full' : 'w-52'
      )}>
        <GradientPlaceholder
          index={cardIndex}
          className={cn(isGrid ? 'h-52' : 'h-full min-h-[180px]')}
        />
        {property.images[0] && (
          <Image
            src={property.images[0]}
            alt={isRTL && property.titleAr ? property.titleAr : property.title}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 pointer-events-none" />

        {/* Type badge */}
        <div className={cn(
          'absolute top-3 z-10',
          isRTL ? 'right-3' : 'left-3'
        )}>
          <span
            className={cn(
              'px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md',
              property.type === 'sale'
                ? 'tag-gold'
                : 'tag-emerald'
            )}
          >
            {property.type === 'sale' ? t('forSale') : t('forRent')}
          </span>
        </div>

        {/* Featured badge */}
        {property.featured && (
          <div className={cn(
            'absolute z-10',
            isGrid ? 'top-3' : 'bottom-3',
            isRTL ? 'left-3' : 'right-3'
          )}>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest bg-accent-gold/90 text-white backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              {isRTL ? 'مميز' : 'Featured'}
            </span>
          </div>
        )}

        {/* Favorite button */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(property.id) }}
          whileTap={{ scale: 0.85 }}
          className={cn(
            'absolute z-10 p-2.5 rounded-xl transition-all duration-300 backdrop-blur-md',
            isGrid ? 'top-3' : 'top-3',
            isRTL ? 'left-3' : 'right-3',
            isFavorite
              ? 'bg-accent-gold/20 text-accent-gold shadow-gold-sm'
              : 'bg-black/20 text-white/70 hover:bg-accent-gold/20 hover:text-accent-gold',
            property.featured && isGrid && (isRTL ? 'left-auto right-3' : 'right-auto left-3')
          )}
        >
          <Heart className={cn('w-4 h-4 transition-transform duration-300', isFavorite && 'scale-110')} fill={isFavorite ? 'currentColor' : 'none'} />
        </motion.button>
      </div>

      {/* Content */}
      <div className={cn('flex-1 p-4 flex flex-col', isRTL && 'text-right')}>
        {/* Title & Location */}
        <div className="mb-3">
          <h3 className="font-bold text-text-primary mb-1 line-clamp-1 text-[15px] group-hover:text-accent-gold transition-colors duration-300">
            {isRTL && property.titleAr ? property.titleAr : property.title}
          </h3>
          <div className={cn(
            'flex items-center gap-1.5 text-text-muted',
            isRTL && 'flex-row-reverse'
          )}>
            <MapPin className="w-3 h-3 text-accent-gold/60 shrink-0" />
            <p className="text-xs line-clamp-1">
              {isRTL && property.locationAr ? property.locationAr : property.location}
            </p>
          </div>
        </div>

        {/* Specs */}
        <div className={cn(
          'flex items-center gap-4 mb-4',
          isRTL && 'flex-row-reverse'
        )}>
          {property.bedrooms > 0 && (
            <div className={cn('flex items-center gap-1.5 text-xs text-text-secondary', isRTL && 'flex-row-reverse')}>
              <BedDouble className="w-3.5 h-3.5 text-text-muted" />
              <span>{property.bedrooms} {t('bedrooms')}</span>
            </div>
          )}
          <div className={cn('flex items-center gap-1.5 text-xs text-text-secondary', isRTL && 'flex-row-reverse')}>
            <Bath className="w-3.5 h-3.5 text-text-muted" />
            <span>{property.bathrooms} {t('bathrooms')}</span>
          </div>
          <div className={cn('flex items-center gap-1.5 text-xs text-text-secondary', isRTL && 'flex-row-reverse')}>
            <Maximize className="w-3.5 h-3.5 text-text-muted" />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-border/10">
          <div className={cn('flex items-center justify-between', isRTL && 'flex-row-reverse')}>
            <span className="text-lg font-bold text-gold-gradient text-accent-gold">
              {formatPrice(property.price, property.currency, locale)}
              {property.type === 'rent' && (
                <span className="text-[11px] text-text-muted font-normal ml-1">
                  /{isRTL ? 'سنوي' : 'yr'}
                </span>
              )}
            </span>
            <Link
              href={`/properties/${property.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-medium text-accent-gold/70 group-hover:text-accent-gold hover:underline transition-colors duration-300"
            >
              {isRTL ? 'عرض التفاصيل ←' : 'View Details →'}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
