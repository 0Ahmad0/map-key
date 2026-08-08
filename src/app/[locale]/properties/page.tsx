'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { MapPin, X } from 'lucide-react'
import { PropertyFilters } from '@/components/properties/property-filters'
import { PropertyResultCard } from '@/components/properties/property-result-card'
import { PropertyMap } from '@/components/properties/property-map'
import { cn } from '@/lib/utils'
import { demoProperties, cities, propertyTypes, roomOptions, priceRanges } from '@/lib/demo-properties'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function PropertiesPage() {
  const t = useTranslations('properties')
  const locale = useLocale() as 'ar' | 'en'
  const purpose = useSearchParams().get('purpose')
  const [filters, setFilters] = useState({ city: 'all', type: 'all', rooms: '0', price: 'all' })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 8

  const filtered = useMemo(() => {
    return demoProperties.filter((p) => {
      if ((purpose === 'rent' || purpose === 'sale') && p.type !== purpose) return false
      if (filters.city !== 'all') {
        const cityMap: Record<string, string[]> = {
          riyadh: ['Riyadh'],
          eastern: ['Eastern Province'],
        }
        const match = cityMap[filters.city]?.some((c) => p.location.includes(c))
        if (!match) return false
      }
      if (filters.type !== 'all') {
        const typeMap: Record<string, string[]> = {
          villa: ['Villa', 'villa'],
          apartment: ['Apartment', 'apartment'],
          townhouse: ['Townhouse'],
          penthouse: ['Penthouse'],
          'ground-house': ['Ground House'],
          office: ['Office', 'Commercial', 'Retail'],
          land: ['Land'],
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
  }, [filters, purpose])

  const pageCount = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)
  const selectedProperty = filtered.find((property) => property.id === selectedId)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  return (
    <div className="min-h-screen pb-12 pt-36 md:pt-40">
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
            onFilterChange={(key, value) => {
              setFilters((prev) => ({ ...prev, [key]: value }))
              setPage(1)
            }}
          />
        </div>

        <div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-secondary">
                <span className="text-accent-gold font-semibold">{filtered.length}</span> properties found
              </p>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-bg-primary border border-border/10">
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
                  {paginated.map((property) => (
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
            {pageCount > 1 && (
              <nav className="mt-8 flex justify-center gap-2" aria-label={locale === 'ar' ? 'صفحات العقارات' : 'Property pages'}>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                  <button key={number} onClick={() => setPage(number)} className={cn('grid h-11 w-11 place-items-center rounded-full border font-bold transition', page === number ? 'border-[#b99750] bg-[#b99750] text-white' : 'border-neutral-200 bg-white hover:border-[#b99750]')} aria-current={page === number ? 'page' : undefined}>{number}</button>
                ))}
              </nav>
            )}
          </div>
        </div>

        <Dialog.Root open={Boolean(selectedProperty)} onOpenChange={(open) => !open && setSelectedId(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(920px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] bg-white shadow-2xl">
              {selectedProperty && (
                <>
                  <div className="flex items-center justify-between gap-4 border-b border-neutral-100 p-5">
                    <div>
                      <Dialog.Title className="text-xl font-black text-neutral-950">{locale === 'ar' ? selectedProperty.titleAr : selectedProperty.title}</Dialog.Title>
                      <Dialog.Description className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500"><MapPin className="h-4 w-4 text-[#b99750]" />{locale === 'ar' ? selectedProperty.locationAr : selectedProperty.location}</Dialog.Description>
                    </div>
                    <Dialog.Close className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-neutral-100" aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}><X className="h-5 w-5" /></Dialog.Close>
                  </div>
                  <div className="h-[65vh] min-h-[360px]">
                    <PropertyMap properties={[selectedProperty]} selectedId={selectedProperty.id} />
                  </div>
                </>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  )
}
