export type Locale = 'ar' | 'en'

export type Theme = 'light' | 'dark'

export interface Property {
  id: string
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
  price: number
  currency: string
  location: string
  locationAr?: string
  lat: number
  lng: number
  area: number
  bedrooms: number
  bathrooms: number
  images: string[]
  type: 'sale' | 'rent'
  status: 'available' | 'sold' | 'rented' | 'pending'
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'user' | 'agent' | 'admin'
  emailVerified: boolean
  createdAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
