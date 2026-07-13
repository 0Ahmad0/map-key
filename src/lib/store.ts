'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Filters {
  city: string
  type: string
  rooms: string
  price: string
}

interface AppState {
  theme: 'light' | 'dark' | 'system'
  locale: 'ar' | 'en'
  favorites: string[]
  filters: Filters
  sidebarOpen: boolean
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLocale: (locale: 'ar' | 'en') => void
  toggleFavorite: (id: string) => void
  setFilters: (filters: Partial<Filters>) => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      locale: 'ar',
      favorites: [],
      filters: { city: 'all', type: 'all', rooms: '0', price: 'all' },
      sidebarOpen: false,
      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fid) => fid !== id)
            : [...state.favorites, id],
        })),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    { name: 'map-key-store' }
  )
)
