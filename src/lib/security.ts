import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const RATE_LIMIT_WINDOW = 60 * 1000
const RATE_LIMIT_MAX = 100
const requestCounts = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = RATE_LIMIT_MAX,
  windowMs: number = RATE_LIMIT_WINDOW
): boolean {
  const now = Date.now()
  const record = requestCounts.get(identifier)

  if (!record || now > record.resetAt) {
    requestCounts.set(identifier, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = typeof value === 'string'
      ? value
          .replace(/[<>]/g, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+=/gi, '')
          .trim()
      : value
  }
  return sanitized as T
}

export function validateInput(
  value: string,
  type: 'email' | 'phone' | 'name' | 'text'
): { valid: boolean; error?: string } {
  switch (type) {
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return { valid: false, error: 'Invalid email address' }
      }
      break
    case 'phone':
      if (!/^(?:\+966|00966|0)?5[0-9]{8}$/.test(value.replace(/\s/g, ''))) {
        return { valid: false, error: 'Invalid Saudi phone number' }
      }
      break
    case 'name':
      if (value.length < 2 || value.length > 100) {
        return { valid: false, error: 'Name must be between 2-100 characters' }
      }
      if (!/^[\p{L}\s'-]+$/u.test(value)) {
        return { valid: false, error: 'Name contains invalid characters' }
      }
      break
    case 'text':
      if (value.length > 5000) {
        return { valid: false, error: 'Text exceeds maximum length' }
      }
      break
  }
  return { valid: true }
}

export function createApiResponse<T>(
  data: T,
  status: number = 200,
  message?: string
): NextResponse {
  const body = {
    success: status >= 200 && status < 300,
    data,
    ...(message && { message }),
  }
  return NextResponse.json(body, { status })
}

export function createApiError(
  status: number,
  message: string,
  errors?: Record<string, string[]>
): NextResponse {
  const body = {
    success: false,
    message,
    ...(errors && { errors }),
  }
  return NextResponse.json(body, { status })
}

export function getClientIp(): string {
  const headersList = headers()
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return headersList.get('x-real-ip') ?? 'unknown'
}

export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) errors.push('At least 8 characters')
  if (!/[A-Z]/.test(password)) errors.push('One uppercase letter')
  if (!/[a-z]/.test(password)) errors.push('One lowercase letter')
  if (!/[0-9]/.test(password)) errors.push('One number')
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('One special character')
  }

  return { valid: errors.length === 0, errors }
}

export function csrfProtection(): NextResponse | null {
  const headersList = headers()
  const origin = headersList.get('origin')
  const host = headersList.get('host')

  if (!origin || !host) {
    return createApiError(403, 'Access denied')
  }

  try {
    const originUrl = new URL(origin)
    if (originUrl.host !== host && !originUrl.host.endsWith(`.${host}`)) {
      return createApiError(403, 'Cross-origin request denied')
    }
  } catch {
    return createApiError(403, 'Invalid origin')
  }

  return null
}

// Cleanup stale rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of requestCounts.entries()) {
    if (now > record.resetAt) {
      requestCounts.delete(key)
    }
  }
}, 5 * 60 * 1000)
