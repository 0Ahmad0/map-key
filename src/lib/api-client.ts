'use client'

import { useAuthStore } from './auth-store'

interface ApiError {
  success: false
  error: string
  status?: number
}

interface ApiSuccess<T> {
  success: true
  data: T
}

type ApiResult<T> = ApiSuccess<T> | ApiError

interface ApiOptions extends RequestInit {
  skipAuth?: boolean
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResult<T>> {
  const { skipAuth, ...fetchOptions } = options
  const state = useAuthStore.getState()
  const { tokens, deviceId, logout } = state

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  }

  if (!skipAuth && tokens?.accessToken) {
    headers['Authorization'] = `Bearer ${tokens.accessToken}`
  }

  if (deviceId) {
    headers['X-Device-Id'] = deviceId
  }

  try {
    const res = await fetch(endpoint, { ...fetchOptions, headers })

    if (res.status === 401) {
      logout()
      if (typeof window !== 'undefined') {
        window.location.href = '/ar/auth/login'
      }
      return { success: false, error: 'Unauthorized', status: 401 }
    }

    const data = await res.json()

    if (!res.ok) {
      return { success: false, error: data.message || 'Something went wrong', status: res.status }
    }

    return { success: true, data: data as T }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}
