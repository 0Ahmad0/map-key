'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { MapPin, Building2, BedDouble, TrendingUp, SlidersHorizontal, ChevronDown } from 'lucide-react'

interface FilterOption {
  value: string
  label: string
  labelAr: string
}

interface PropertyFiltersProps {
  cities: FilterOption[]
  propertyTypes: FilterOption[]
  roomOptions: FilterOption[]
  priceRanges: FilterOption[]
  filters: {
    city: string
    type: string
    rooms: string
    price: string
  }
  onFilterChange: (key: string, value: string) => void
}

const containerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.1, duration: 0.4 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 22, stiffness: 250 },
  },
}

const filterConfig = [
  { key: 'city' as const, icon: MapPin, labelEn: 'City', labelAr: 'المدينة' },
  { key: 'type' as const, icon: Building2, labelEn: 'Type', labelAr: 'النوع' },
  { key: 'rooms' as const, icon: BedDouble, labelEn: 'Rooms', labelAr: 'الغرف' },
  { key: 'price' as const, icon: TrendingUp, labelEn: 'Price', labelAr: 'السعر' },
]

export function PropertyFilters({
  cities,
  propertyTypes,
  roomOptions,
  priceRanges,
  filters,
  onFilterChange,
}: PropertyFiltersProps) {
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'

  const optionsMap: Record<string, FilterOption[]> = {
    city: cities,
    type: propertyTypes,
    rooms: roomOptions,
    price: priceRanges,
  }

  const valueMap: Record<string, string> = {
    city: filters.city,
    type: filters.type,
    rooms: filters.rooms,
    price: filters.price,
  }

  const defaultValues = ['all', 'all', '0', 'all']

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'glass-card rounded-2xl p-2',
        isRTL ? 'direction-rtl' : ''
      )}
    >
      <div className={cn(
        'flex items-center gap-2 flex-wrap',
        isRTL ? 'flex-row-reverse' : ''
      )}>
        {/* Filter icon label */}
        <motion.div
          variants={itemVariants}
          className={cn(
            'hidden md:flex items-center gap-2 px-4 py-3',
            isRTL ? 'flex-row-reverse' : ''
          )}
        >
          <div className="w-9 h-9 rounded-xl bg-accent-gold/10 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-accent-gold" />
          </div>
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest">
            {isRTL ? 'تصفية' : 'Filters'}
          </span>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-border/30" />

        {/* Filter selects */}
        {filterConfig.map((filter, idx) => {
          const Icon = filter.icon
          const options = optionsMap[filter.key]
          const value = valueMap[filter.key]
          const isActive = value !== defaultValues[idx]

          return (
            <motion.div
              key={filter.key}
              variants={itemVariants}
              className="flex-1 min-w-[150px]"
            >
              <div
                className={cn(
                  'relative group flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer',
                  isActive
                    ? 'bg-accent-gold/10 border border-accent-gold/20'
                    : 'hover:bg-surface-1 border border-transparent hover:border-border/20',
                  isRTL ? 'flex-row-reverse' : ''
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300',
                  isActive
                    ? 'bg-accent-gold/20 text-accent-gold'
                    : 'bg-surface-2 text-text-muted group-hover:text-accent-gold group-hover:bg-accent-gold/10'
                )}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className={cn('flex-1 min-w-0', isRTL ? 'text-right' : 'text-left')}>
                  <label className="block text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-0.5">
                    {isRTL ? filter.labelAr : filter.labelEn}
                  </label>
                  <div className="relative">
                    <select
                      value={value}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className={cn(
                        'w-full text-sm font-medium transition-colors duration-300',
                        'bg-transparent text-text-primary',
                        'focus:outline-none cursor-pointer appearance-none',
                        isRTL ? 'pr-0 pl-5 text-right' : 'pl-0 pr-5 text-left',
                        isActive && 'text-accent-gold'
                      )}
                    >
                      {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isRTL ? opt.labelAr : opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className={cn(
                      'absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none transition-colors duration-300',
                      isRTL ? 'left-0' : 'right-0',
                      isActive && 'text-accent-gold'
                    )} />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
