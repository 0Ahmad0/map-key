'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { PropertyFilters } from '@/components/properties/property-filters'
import { PropertyResultCard } from '@/components/properties/property-result-card'
import { cn } from '@/lib/utils'
import { demoProperties, cities, propertyTypes, roomOptions, priceRanges } from '@/lib/demo-properties'

const PropertyMap = dynamic(
  () => import('@/components/properties/property-map').then((m) => m.PropertyMap),
  { ssr: false, loading: () => <div className="w-full h-full rounded-2xl bg-bg-secondary animate-pulse" /> }
)

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function PropertiesPage() {
  const t = useTranslations('properties')
  const [filters, setFilters] = useState({ city: 'all', type: 'all', rooms: '0', price: 'all' })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return demoProperties.filter((p) => {
      if (filters.city !== 'all') {
        const cityMap: Record<string, string[]> = {
          riyadh: ['Riyadh'],
          jeddah: ['Jeddah'],
          dubai: ['Dubai'],
        }
        const match = cityMap[filters.city]?.some((c) => p.location.includes(c))
        if (!match) return false
      }
      if (filters.type !== 'all') {
        const typeMap: Record<string, string[]> = {
          villa: ['Villa', 'villa'],
          apartment: ['Apartment', 'apartment'],
          commercial: ['Commercial', 'Office', 'Retail'],
          penthouse: ['Penthouse'],
        }
        const match = typeMap[filters.type]?.some((t) => p.title.includes(t))
        if (!match) return false
      }
      if (filters.rooms !== '0' && p.bedrooms < parseInt(filters.rooms)) return false
      if (filters.price !== 'all') {
        const [min, max] = filters.price.split('-')
        if (max && max.endsWith('+')) {
          if (p.price < parseInt(min) * 1000000) return false
        } else if (min && max) {
          const minVal = parseInt(min)
          const maxVal = parseInt(max.replace(/[mk]/g, (m) => m === 'm' ? '000000' : m === 'k' ? '000' : ''))
          if (p.price < minVal || p.price > maxVal) return false
        }
      }
      return true
    })
  }, [filters])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <h1 className="text-h2 font-bold text-text-primary mb-2">
            {t('title')}
          </h1>
          <p className="text-body text-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="mb-6">
          <PropertyFilters
            cities={cities}
            propertyTypes={propertyTypes}
            roomOptions={roomOptions}
            priceRanges={priceRanges}
            filters={filters}
            onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-secondary">
                <span className="text-accent-gold font-semibold">{filtered.length}</span> properties found
              </p>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-bg-primary border border/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    viewMode === 'grid'
                      ? 'bg-accent-gold/10 text-accent-gold shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    viewMode === 'list'
                      ? 'bg-accent-gold/10 text-accent-gold shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 text-text-secondary"
                >
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>No properties match your filters.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    viewMode === 'grid'
                      ? 'grid grid-auto-fit gap-4'
                      : 'flex flex-col gap-3'
                  )}
                >
                  {filtered.map((property) => (
                    <PropertyResultCard
                      key={property.id}
                      property={property}
                      viewMode={viewMode}
                      isFavorite={favorites.has(property.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelect={setSelectedId}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 max-lg:h-[300px] lg:h-auto">
            <div className="sticky top-24 h-full max-lg:h-full rounded-2xl overflow-hidden border border/10">
              <PropertyMap
                properties={filtered}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
