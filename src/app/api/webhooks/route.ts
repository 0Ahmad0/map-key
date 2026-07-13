import { NextRequest } from 'next/server'
import { createApiResponse, createApiError, checkRateLimit, getClientIp } from '@/lib/security'

export async function POST(request: NextRequest) {
  const ip = getClientIp()
  if (!checkRateLimit(`webhook:${ip}`, 20, 60000)) {
    return createApiError(429, 'Rate limit exceeded')
  }

  const signature = request.headers.get('x-webhook-signature')
  if (!signature) {
    return createApiError(401, 'Missing webhook signature')
  }

  // TODO: Verify webhook signature
  return createApiResponse({ received: true })
}
