'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthTokens } from '@/types'

interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  deviceId: string
  isAuthenticated: boolean
  setAuth: (user: User, tokens: AuthTokens) => void
  logout: () => void
}

function generateDeviceId(): string {
  if (typeof window === 'undefined') return ''
  const existing = localStorage.getItem('mk-device-id')
  if (existing) return existing
  const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
  localStorage.setItem('mk-device-id', id)
  return id
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      deviceId: typeof window !== 'undefined' ? generateDeviceId() : '',
      isAuthenticated: false,
      setAuth: (user, tokens) => set({ user, tokens, isAuthenticated: true }),
      logout: () => set({ user: null, tokens: null, isAuthenticated: false }),
    }),
    {
      name: 'mk-auth',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
