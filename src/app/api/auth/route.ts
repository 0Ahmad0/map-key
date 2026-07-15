import { NextRequest } from 'next/server'
import { createApiResponse, createApiError, checkRateLimit, getClientIp } from '@/lib/security'

interface LoginBody {
  email: string
  password: string
  deviceId?: string
}

const MOCK_USER = {
  id: 'usr_001',
  name: 'أحمد محمد',
  email: 'admin@map-key.com',
  phone: '+966551234567',
  role: 'admin' as const,
  emailVerified: true,
  createdAt: new Date().toISOString(),
}

export async function POST(request: NextRequest) {
  const ip = getClientIp()
  if (!checkRateLimit(`auth:${ip}`, 5, 60000)) {
    return createApiError(429, 'طلبات كثيرة جداً. حاول مرة أخرى لاحقاً.')
  }

  try {
    const body: LoginBody = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return createApiError(400, 'البريد الإلكتروني وكلمة المرور مطلوبان')
    }

    if (email !== 'admin@map-key.com' || password !== 'Admin@123') {
      return createApiError(401, 'البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }

    const tokens = {
      accessToken: `mk_access_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      refreshToken: `mk_refresh_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }

    return createApiResponse({ user: MOCK_USER, tokens })
  } catch {
    return createApiError(400, 'بيانات الطلب غير صالحة')
  }
}

export async function GET() {
  return createApiResponse({ message: 'Auth API ready' })
}
