'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn, formatPrice, formatDate } from '@/lib/utils'
import { demoProjects } from '@/lib/demo-projects'
import { demoArticles, articleCategories } from '@/lib/demo-articles'
import { demoProperties } from '@/lib/demo-properties'
import type { Property } from '@/types'
import Image from 'next/image'
import {
  Search, MapPin, BedDouble, Bath, Maximize, ArrowRight, ArrowLeft,
  ChevronRight, ChevronLeft, Building2, TrendingUp, Users, Globe2,
  Shield, Sparkles, Clock, Star, Check,
  Home as HomeIcon, Eye, Calendar, ArrowUpRight,
} from 'lucide-react'

// ─── Gradient palettes for property cards ───
const cardGradients = [
  'from-amber-900/40 via-stone-900/60 to-neutral-900/80',
  'from-emerald-900/40 via-stone-900/60 to-neutral-900/80',
  'from-blue-900/40 via-stone-900/60 to-neutral-900/80',
  'from-rose-900/40 via-stone-900/60 to-neutral-900/80',
  'from-violet-900/40 via-stone-900/60 to-neutral-900/80',
  'from-cyan-900/40 via-stone-900/60 to-neutral-900/80',
]

const projectGradients = [
  'from-amber-800/30 via-amber-900/50 to-neutral-950',
  'from-sky-800/30 via-sky-900/50 to-neutral-950',
  'from-emerald-800/30 via-emerald-900/50 to-neutral-950',
  'from-rose-800/30 via-rose-900/50 to-neutral-950',
  'from-violet-800/30 via-violet-900/50 to-neutral-950',
  'from-teal-800/30 via-teal-900/50 to-neutral-950',
]

const articleGradients = [
  'from-amber-900/50 to-stone-900/80',
  'from-indigo-900/50 to-stone-900/80',
  'from-emerald-900/50 to-stone-900/80',
  'from-rose-900/50 to-stone-900/80',
  'from-cyan-900/50 to-stone-900/80',
]

// ─── Feature icons ───
const featureIcons = [TrendingUp, Sparkles, Shield, Globe2]

// ─── Fixed sparkle positions (deterministic → no hydration mismatch) ───
const sparkles = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  duration: 2 + (i % 3),
  delay: (i * 0.7) % 5,
}))

// ─── Floating Particle ───
function FloatingOrb({ delay, size, x, y, duration }: { delay: number; size: number; x: string; y: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)`,
      }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 20, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

// ─── Section Header ───
function SectionHeader({ title, subtitle, className }: { title: string; subtitle: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn('text-center mb-16', className)}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-0.5 bg-gradient-to-r from-accent-gold to-amber-400 mx-auto mb-6"
      />
      <h2 className="text-h2 font-bold text-text-primary mb-4">
        {title}
      </h2>
      <p className="text-body text-text-secondary max-w-xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  )
}

// ─── Stat Counter with animated number ───
function StatCounter({
  stat,
  index,
  isRTL,
}: {
  stat: { value: string; suffix: string; label: string; labelAr: string }
  index: number
  isRTL: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const target = parseInt(stat.value)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  const statIcons = [TrendingUp, Building2, Users, Globe2]
  const Icon = statIcons[index] || TrendingUp

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative text-center group"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ filter: 'blur(40px)' }}
      />
      <div className="relative p-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: index * 0.15 + 0.2, damping: 12 }}
          className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center"
        >
          <Icon className="w-7 h-7 text-accent-gold" />
        </motion.div>
        <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-accent-gold via-amber-400 to-accent-gold bg-clip-text text-transparent mb-2">
          {count}{stat.suffix}
        </p>
        <p className="text-sm text-text-secondary font-medium tracking-wide uppercase">
          {isRTL ? stat.labelAr : stat.label}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Feature Card with 3D tilt ───
function FeatureCard({
  item,
  index,
}: {
  item: { title: string; desc: string }
  index: number
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const Icon = featureIcons[index] || TrendingUp

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rotateX: -y * 12, rotateY: x * 12 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="glass-card-hover relative overflow-hidden rounded-2xl p-8 h-full group cursor-default"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-14 h-14 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mb-6"
        >
          <Icon className="w-7 h-7 text-accent-gold" />
        </motion.div>

        <h3 className="relative z-10 text-h3 font-bold text-text-primary mb-3">
          {item.title}
        </h3>
        <p className="relative z-10 text-body-sm text-text-secondary leading-relaxed">
          {item.desc}
        </p>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-accent-gold/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  )
}

// ─── Property Card (inline) ───
function InlinePropertyCard({
  property,
  index,
  locale,
  isRTL,
}: {
  property: Property
  index: number
  locale: string
  isRTL: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="glass-card-hover rounded-2xl overflow-hidden h-full">
          {/* Image area */}
          <div className={cn('relative h-56 bg-gradient-to-br', cardGradients[index % cardGradients.length])}>
            {property.images[0] && (
              <Image
                src={property.images[0]}
                alt={isRTL && property.titleAr ? property.titleAr : property.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            {/* Readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

            {/* Price badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-accent-gold text-sm font-bold border border-accent-gold/20">
                {formatPrice(property.price, property.currency, locale)}
              </span>
            </div>

            {/* Type badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border',
                property.type === 'sale'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
              )}>
                {property.type === 'sale' ? (isRTL ? 'للبيع' : 'For Sale') : (isRTL ? 'للإيجار' : 'For Rent')}
              </span>
            </div>

            {/* Hover overlay with eye icon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-5"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: isHovered ? 1 : 0.5 }}
                className="w-14 h-14 rounded-full bg-accent-gold/20 backdrop-blur-md border border-accent-gold/40 flex items-center justify-center"
              >
                <Eye className="w-6 h-6 text-accent-gold" />
              </motion.div>
            </motion.div>
          </div>

          {/* Card content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-1 group-hover:text-accent-gold transition-colors">
              {isRTL && property.titleAr ? property.titleAr : property.title}
            </h3>

            <div className="flex items-center gap-1.5 text-text-secondary mb-4">
              <MapPin className="w-3.5 h-3.5 text-accent-gold shrink-0" />
              <span className="text-sm line-clamp-1">
                {isRTL && property.locationAr ? property.locationAr : property.location}
              </span>
            </div>

            {/* Specs row */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <BedDouble className="w-4 h-4 text-accent-gold/60" />
                  <span className="text-sm">{property.bedrooms}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Bath className="w-4 h-4 text-accent-gold/60" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Maximize className="w-4 h-4 text-accent-gold/60" />
                <span className="text-sm">{property.area} m²</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Project Card (inline) ───
function InlineProjectCard({
  project,
  index,
  locale,
  isRTL,
}: {
  project: typeof demoProjects[0]
  index: number
  locale: string
  isRTL: boolean
}) {
  const statusStyles: Record<string, string> = {
    'selling-fast': 'tag-rose',
    'available': 'tag-emerald',
    'coming-soon': 'tag-gold',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="min-w-[320px] md:min-w-[380px] snap-start"
    >
      <div className="glass-card-hover rounded-2xl overflow-hidden h-full group">
        {/* Image header */}
        <div className={cn('relative h-44 bg-gradient-to-br', projectGradients[index % projectGradients.length])}>
          <Image
            src={project.image}
            alt={isRTL ? project.titleAr : project.title}
            fill
            sizes="(max-width: 768px) 90vw, 380px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Status badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold', statusStyles[project.status] || 'tag-gold')}>
              {isRTL ? project.statusAr : project.status.replace('-', ' ')}
            </span>
          </div>

          {/* Type badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-3 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white/80 text-xs font-medium border border-white/10">
              {isRTL ? project.typeAr : project.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-gold transition-colors">
            {isRTL ? project.titleAr : project.title}
          </h3>

          <div className="flex items-center gap-1.5 text-text-secondary mb-4">
            <MapPin className="w-3.5 h-3.5 text-accent-gold shrink-0" />
            <span className="text-sm">{isRTL ? project.locationAr : project.location}</span>
          </div>

          {/* Info grid */}
          <div className="space-y-2.5 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent-gold/60" />
                {isRTL ? 'التسليم' : 'Delivery'}
              </span>
              <span className="text-text-primary font-medium">
                {isRTL ? project.deliveryDateAr : project.deliveryDate}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-accent-gold/60" />
                {isRTL ? 'بواسطة' : 'by'}
              </span>
              <span className="text-text-primary font-medium">
                {isRTL ? project.developerAr : project.developer}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <p className="text-xs text-text-secondary mb-1">
              {isRTL ? 'يبدأ من' : 'Starting from'}
            </p>
            <p className="text-lg font-bold text-accent-gold">
              {formatPrice(project.startingPrice, 'SAR', locale)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Article Card (inline) ───
function InlineArticleCard({
  article,
  featured,
  index,
  locale,
  isRTL,
}: {
  article: typeof demoArticles[0]
  featured?: boolean
  index: number
  locale: string
  isRTL: boolean
}) {
  const categoryColors: Record<string, string> = {
    market: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    legal: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    investment: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    tech: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  }

  if (featured) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="lg:col-span-2 lg:row-span-2 group cursor-pointer"
      >
        <div className="glass-card-hover rounded-2xl overflow-hidden h-full">
          <div className={cn('relative h-64 lg:h-80 bg-gradient-to-br', articleGradients[0])}>
            <Image
              src={article.image}
              alt={isRTL ? article.titleAr : article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute top-4 left-4 z-10">
              <span className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold border', categoryColors[article.category])}>
                {isRTL ? article.categoryAr : article.category}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
              <Star className="w-4 h-4 text-accent-gold" />
              <span className="text-xs text-accent-gold font-semibold">Featured</span>
            </div>
          </div>
          <div className="p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-gold transition-colors line-clamp-2">
              {isRTL ? article.titleAr : article.title}
            </h3>
            <p className="text-body-sm text-text-secondary mb-5 line-clamp-3 leading-relaxed">
              {isRTL ? article.excerptAr : article.excerpt}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent-gold/15 border border-accent-gold/20 flex items-center justify-center text-accent-gold text-xs font-bold">
                  {article.authorAvatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {isRTL ? article.authorAr : article.author}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatDate(article.date, locale)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">{article.readTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer"
    >
      <div className="glass-card-hover rounded-2xl overflow-hidden h-full">
        <div className={cn('relative h-40 bg-gradient-to-br', articleGradients[index % articleGradients.length])}>
          <Image
            src={article.image}
            alt={isRTL ? article.titleAr : article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
          <div className="absolute top-3 left-3 z-10">
            <span className={cn('px-2.5 py-1 rounded-md text-[11px] font-semibold border', categoryColors[article.category])}>
              {isRTL ? article.categoryAr : article.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-accent-gold transition-colors line-clamp-2">
            {isRTL ? article.titleAr : article.title}
          </h3>
          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
            {isRTL ? article.excerptAr : article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent-gold/15 border border-accent-gold/20 flex items-center justify-center text-accent-gold text-[10px] font-bold">
                {article.authorAvatar}
              </div>
              <span className="text-xs text-text-secondary">
                {isRTL ? article.authorAr : article.author}
              </span>
            </div>
            <div className="flex items-center gap-1 text-text-secondary">
              <Clock className="w-3 h-3" />
              <span className="text-[11px]">{article.readTime} min</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Action Card ───
function ActionCard({
  icon,
  title,
  desc,
  cta,
  href,
  gradient,
  isRTL,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  cta: string
  href: string
  gradient: string
  isRTL: boolean
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rotateX: -y * 10, rotateY: x * 10 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: 'spring', damping: 15 }}
        className="relative overflow-hidden rounded-2xl border border-white/5 p-8 h-full group"
        style={{
          background: `linear-gradient(135deg, ${gradient})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated shine */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12"
        />

        <div className="relative z-10">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mb-6 text-accent-gold"
          >
            {icon}
          </motion.div>

          <h3 className="text-h3 font-bold text-text-primary mb-3">{title}</h3>
          <p className="text-body text-text-secondary mb-6">{desc}</p>

          <Link
            href={href}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent-gold hover:bg-accent-gold-hover rounded-xl transition-all shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30 hover:-translate-y-0.5"
          >
            {cta}
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}


// ═══════════════════════════════════════════
// ║         MAIN HOMEPAGE COMPONENT        ║
// ═══════════════════════════════════════════

export default function HomePage() {
  const t = useTranslations()
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  const titleWords = t('hero.title').split(' ')
  const emphasisIndex = isRTL ? 1 : 2

  const [articleCategory, setArticleCategory] = useState('all')
  const filteredArticles = useMemo(() => {
    if (articleCategory === 'all') return demoArticles
    return demoArticles.filter((a) => a.category === articleCategory)
  }, [articleCategory])

  // Projects horizontal scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollProjects = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 400
    scrollContainerRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }, [])

  // Properties to display (first 6 from demoProperties)
  const displayProperties = useMemo(() => demoProperties.slice(0, 6), [])

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════════════════════════════ */}
      {/* ║     SECTION 1: HERO                 ║ */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-primary/95 to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/[0.08] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary" />

        {/* Gold radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] rounded-full bg-accent-gold/[0.03] blur-[120px]" />

        {/* Floating particles/orbs — ponytail: fewer, deterministic positions (Math.random() in render caused hydration mismatch + jank) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <FloatingOrb delay={0} size={120} x="10%" y="15%" duration={8} />
          <FloatingOrb delay={1.5} size={80} x="75%" y="20%" duration={10} />
          <FloatingOrb delay={2.2} size={100} x="20%" y="70%" duration={9} />
          <FloatingOrb delay={1} size={50} x="60%" y="80%" duration={11} />

          {/* Tiny sparkle particles */}
          {sparkles.map((s, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-accent-gold/30"
              style={{ left: s.left, top: s.top }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                delay: s.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-20 flex flex-col items-center justify-center h-full px-4"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Title with animated words */}
            <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-6">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    type: 'spring',
                    damping: 12,
                    stiffness: 100,
                    delay: i * 0.12,
                  }}
                  className={cn(
                    'inline-block text-display font-black',
                    i === emphasisIndex
                      ? 'text-gold-gradient'
                      : 'text-text-primary'
                  )}
                >
                  {word}
                  {i === emphasisIndex && (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                      className="block h-1 bg-gold-gradient rounded-full mt-1"
                    />
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Premium Search Bar (visual/decorative) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="max-w-3xl mx-auto mb-10"
            >
              <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row items-stretch gap-2 border border-white/10">
                {/* City */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 flex-1">
                  <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                  <span className="text-sm text-text-secondary">{isRTL ? 'الرياض' : 'Riyadh'}</span>
                </div>
                {/* Type */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 flex-1">
                  <HomeIcon className="w-4 h-4 text-accent-gold shrink-0" />
                  <span className="text-sm text-text-secondary">{isRTL ? 'فيلا' : 'Villa'}</span>
                </div>
                {/* Price */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 flex-1">
                  <TrendingUp className="w-4 h-4 text-accent-gold shrink-0" />
                  <span className="text-sm text-text-secondary">{isRTL ? 'أي سعر' : 'Any Price'}</span>
                </div>
                {/* Search button */}
                <Link
                  href="/properties"
                  className="btn-gold flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">{isRTL ? 'بحث' : 'Search'}</span>
                </Link>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/properties"
                className="btn-gold px-8 py-4 text-base font-semibold rounded-xl shadow-gold-lg"
              >
                {t('hero.cta')}
              </Link>
              <Link
                href="/properties?search=true"
                className="btn-outline-gold px-8 py-4 text-base font-semibold rounded-xl"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-text-secondary"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent-gold/60">
                {isRTL ? 'اكتشف' : 'Discover'}
              </span>
              <div className="w-5 h-8 rounded-full border border-accent-gold/30 flex items-start justify-center p-1">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-accent-gold/60"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ║     SECTION 2: FEATURES / WHY US    ║ */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-gold/[0.02] to-bg-primary pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title={t('features.title')}
            subtitle={t('features.subtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t.raw('features.items') as { title: string; desc: string }[]).map((item, i) => (
              <FeatureCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ║  SECTION 3: FEATURED PROPERTIES     ║ */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-gold/[0.01] to-bg-primary pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title={t('properties.title')}
            subtitle={t('properties.subtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property, index) => (
              <InlinePropertyCard
                key={property.id}
                property={property}
                index={index}
                locale={locale}
                isRTL={isRTL}
              />
            ))}
          </div>

          {/* View All link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-gold-hover font-semibold transition-colors group"
            >
              {isRTL ? 'عرض الكل' : 'View All Properties'}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ║  SECTION 4: PROJECTS SHOWCASE       ║ */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-gold/[0.02] to-bg-primary pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="h-0.5 bg-gradient-to-r from-accent-gold to-amber-400 mb-6"
              />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-h2 font-bold text-text-primary mb-3"
              >
                {t('projects.title')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-body text-text-secondary"
              >
                {t('projects.subtitle')}
              </motion.p>
            </div>

            {/* Scroll controls */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollProjects(isRTL ? 'right' : 'left')}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent-gold hover:border-accent-gold/30 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollProjects(isRTL ? 'left' : 'right')}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent-gold hover:border-accent-gold/30 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin snap-x snap-mandatory -mx-4 px-4"
            style={{ scrollbarWidth: 'thin' }}
          >
            {demoProjects.map((project, i) => (
              <InlineProjectCard
                key={project.id}
                project={project}
                index={i}
                locale={locale}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ║  SECTION 5: STATS COUNTER           ║ */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Dark gradient background with gold overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-gold/[0.03] to-bg-primary" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title={t('stats.title')}
            subtitle={t('stats.subtitle')}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(t.raw('stats.items') as { value: string; suffix: string; label: string; labelAr: string }[]).map((stat, i) => (
              <StatCounter key={i} stat={stat} index={i} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ║  SECTION 6: ARTICLES / INSIGHTS     ║ */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-gold/[0.015] to-bg-primary pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title={t('articles.title')}
            subtitle={t('articles.subtitle')}
          />

          {/* Category filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-thin justify-center flex-wrap"
          >
            {articleCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setArticleCategory(cat.value)}
                className={cn(
                  'shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                  articleCategory === cat.value
                    ? 'bg-accent-gold text-white shadow-lg shadow-accent-gold/20'
                    : 'border border-white/10 text-text-secondary hover:bg-accent-gold/10 hover:text-accent-gold hover:border-accent-gold/30'
                )}
              >
                {isRTL ? cat.labelAr : cat.label}
              </button>
            ))}
          </motion.div>

          {/* Articles grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={articleCategory}
              layout
              className="grid grid-cols-1 lg:grid-cols-3 auto-rows-auto gap-6"
            >
              {filteredArticles.map((article, i) => (
                <InlineArticleCard
                  key={article.id}
                  article={article}
                  featured={article.featured && i === 0}
                  index={i}
                  locale={locale}
                  isRTL={isRTL}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ║  SECTION 7: ACTION CARDS            ║ */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ActionCard
              icon={<HomeIcon className="w-7 h-7" />}
              title={isRTL ? t('actions.ownPropertyAr') : t('actions.ownProperty')}
              desc={isRTL ? t('actions.ownPropertyDescAr') : t('actions.ownPropertyDesc')}
              cta={isRTL ? t('actions.addPropertyAr') : t('actions.addProperty')}
              href="/properties/add"
              gradient="rgba(201,168,76,0.08), rgba(201,168,76,0.02), transparent"
              isRTL={isRTL}
            />
            <ActionCard
              icon={<Search className="w-7 h-7" />}
              title={isRTL ? t('actions.lookingAr') : t('actions.looking')}
              desc={isRTL ? t('actions.lookingDescAr') : t('actions.lookingDesc')}
              cta={isRTL ? t('actions.requestPropertyAr') : t('actions.requestProperty')}
              href="/properties/request"
              gradient="rgba(59,130,246,0.08), rgba(59,130,246,0.02), transparent"
              isRTL={isRTL}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ║  SECTION 8: APP DOWNLOAD            ║ */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-gold/[0.015] to-bg-primary" />

        {/* Decorative blurs */}
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-accent-gold/5 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={isRTL ? 'lg:order-2' : ''}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="h-0.5 bg-gradient-to-r from-accent-gold to-amber-400 mb-6"
              />
              <h2 className="text-h2 font-bold text-text-primary mb-4">
                {t('app.title')}
              </h2>
              <p className="text-body text-text-secondary mb-8 max-w-md">
                {t('app.subtitle')}
              </p>

              {/* Feature list */}
              <ul className="space-y-4 mb-10">
                {(isRTL ? (t.raw('app.featuresAr') as string[]) : (t.raw('app.features') as string[])).map((feature: string, i: number) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-text-primary"
                  >
                    <span className="w-6 h-6 rounded-full bg-accent-gold/15 border border-accent-gold/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent-gold" />
                    </span>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Store buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl glass-card border border-white/10 hover:border-accent-gold/30 transition-all group"
                >
                  <svg className="w-6 h-6 text-text-primary group-hover:text-accent-gold transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider">Google Play</p>
                    <p className="text-sm font-semibold text-text-primary">{t('app.playStore')}</p>
                  </div>
                </motion.a>

                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl glass-card border border-white/10 hover:border-accent-gold/30 transition-all group"
                >
                  <svg className="w-6 h-6 text-text-primary group-hover:text-accent-gold transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.67-.81 1.1-1.92.94-3.04-.9.04-1.98.57-2.62 1.36-.6.74-.99 1.87-.83 2.97.96.06 1.93-.52 2.51-1.29z"/>
                  </svg>
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider">App Store</p>
                    <p className="text-sm font-semibold text-text-primary">{t('app.appStore')}</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={cn('flex justify-center', isRTL ? 'lg:order-1' : '')}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Phone glow */}
                <div className="absolute inset-0 bg-accent-gold/5 rounded-[3rem] blur-3xl scale-110" />

                {/* Phone frame */}
                <div className="relative w-64 h-[520px] rounded-[2.5rem] border-2 border-white/10 bg-bg-primary shadow-2xl shadow-accent-gold/5 overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-bg-primary rounded-b-2xl z-10 border-b border-x border-white/10" />

                  {/* Screen content */}
                  <div className="relative h-full pt-8 overflow-hidden">
                    {/* Status bar mockup */}
                    <div className="px-6 pb-3 flex items-center justify-between">
                      <span className="text-[10px] text-text-secondary font-medium">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 rounded-sm border border-text-secondary/40" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="px-4 pb-3 border-b border-white/5">
                      <p className="text-xs font-bold text-accent-gold">MAP KEY</p>
                    </div>

                    {/* Scrolling property cards */}
                    <motion.div
                      animate={{ y: [0, -250, -500, -250, 0] }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="space-y-3 p-3"
                    >
                      {demoProperties.slice(0, 5).map((p, i) => (
                        <div key={p.id} className="rounded-xl bg-white/[0.03] border border-white/5 p-3 space-y-2">
                          <div className={cn('relative h-20 rounded-lg overflow-hidden bg-gradient-to-br', cardGradients[i % cardGradients.length])}>
                            {p.images[0] && (
                              <Image src={p.images[0]} alt="" fill sizes="240px" className="object-cover" />
                            )}
                          </div>
                          <p className="text-xs font-semibold text-text-primary truncate">
                            {isRTL && p.titleAr ? p.titleAr : p.title}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] text-accent-gold font-bold">
                              {formatPrice(p.price, p.currency, locale)}
                            </p>
                            <div className="flex items-center gap-1 text-text-secondary">
                              <MapPin className="w-2.5 h-2.5" />
                              <span className="text-[9px] truncate max-w-[60px]">
                                {isRTL && p.locationAr ? p.locationAr.split('،')[0] : p.location.split(',')[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
