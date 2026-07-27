'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn, formatPrice, formatDate } from '@/lib/utils'
import { demoProperties } from '@/lib/demo-properties'
import {
  MapPin, BedDouble, Bath, Maximize, ArrowLeft, ArrowRight,
  Phone, Mail, Calendar, ShieldCheck, Sparkles,
} from 'lucide-react'

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const t = useTranslations('properties')
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'
  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  const property = demoProperties.find((p) => p.id === id)

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-16 text-center">
        <p className="text-h3 text-text-primary mb-6">
          {isRTL ? 'العقار غير موجود' : 'Property not found'}
        </p>
        <Link href="/properties" className="btn-gold px-8 py-3 rounded-xl inline-flex items-center gap-2">
          <BackArrow className="w-4 h-4" />
          {isRTL ? 'العودة إلى العقارات' : 'Back to properties'}
        </Link>
      </div>
    )
  }

  const title = isRTL && property.titleAr ? property.titleAr : property.title
  const specs = [
    ...(property.bedrooms > 0 ? [{ icon: BedDouble, label: t('bedrooms'), value: property.bedrooms }] : []),
    { icon: Bath, label: t('bathrooms'), value: property.bathrooms },
    { icon: Maximize, label: t('area'), value: `${property.area} m²` },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back link */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition-colors mb-6"
        >
          <BackArrow className="w-4 h-4" />
          {isRTL ? 'كل العقارات' : 'All properties'}
        </Link>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[300px] md:h-[440px] rounded-3xl overflow-hidden mb-8"
        >
          {property.images[0] && (
            <Image src={property.images[0]} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          <div className="absolute top-5 start-5 flex gap-2">
            <span className={cn('px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md', property.type === 'sale' ? 'tag-gold' : 'tag-emerald')}>
              {property.type === 'sale' ? t('forSale') : t('forRent')}
            </span>
            {property.featured && (
              <span className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-accent-gold/90 text-white backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                {isRTL ? 'مميز' : 'Featured'}
              </span>
            )}
          </div>

          <div className="absolute bottom-5 start-5 end-5">
            <h1 className="text-2xl md:text-4xl font-black text-white mb-2">{title}</h1>
            <div className="flex items-center gap-2 text-white/85">
              <MapPin className="w-4 h-4 text-accent-gold" />
              <span className="text-sm">{isRTL && property.locationAr ? property.locationAr : property.location}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Specs */}
            <div className="glass-card rounded-2xl p-6 grid grid-cols-3 gap-4">
              {specs.map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-6 h-6 text-accent-gold mx-auto mb-2" />
                  <p className="text-lg font-bold text-text-primary">{s.value}</p>
                  <p className="text-xs text-text-secondary">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-h3 font-bold text-text-primary mb-3">{t('details')}</h2>
              <p className="text-body text-text-secondary leading-relaxed">
                {isRTL && property.descriptionAr ? property.descriptionAr : property.description}
              </p>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-gold/70" />
                {isRTL ? 'أضيف في' : 'Listed'}: {formatDate(property.createdAt, locale)}
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent-gold/70" />
                {isRTL ? 'إعلان موثق' : 'Verified listing'}
              </span>
            </div>
          </motion.div>

          {/* Price + contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <p className="text-sm text-text-secondary mb-1">{t('price')}</p>
              <p className="text-3xl font-black text-gold-gradient mb-6">
                {formatPrice(property.price, property.currency, locale)}
                {property.type === 'rent' && (
                  <span className="text-sm font-normal text-text-muted"> /{isRTL ? 'سنوي' : 'yr'}</span>
                )}
              </p>

              <div className="space-y-3">
                <a href="tel:+966541646755" className="btn-gold w-full flex items-center justify-center gap-2 rounded-xl">
                  <Phone className="w-4 h-4" />
                  {t('contact')}
                </a>
                <a href="mailto:mapkey.sa@outlook.com" className="btn-outline-gold w-full flex items-center justify-center gap-2 rounded-xl">
                  <Mail className="w-4 h-4" />
                  {isRTL ? 'راسلنا' : 'Email us'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
