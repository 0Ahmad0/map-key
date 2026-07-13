import { NextRequest } from 'next/server'
import { createApiResponse, createApiError } from '@/lib/security'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '12'), 50)

  return createApiResponse({
    properties: [],
    pagination: {
      page,
      limit,
      total: 0,
      totalPages: 0,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, price, location } = body

    if (!title || !price || !location) {
      return createApiError(400, 'Missing required fields')
    }

    return createApiResponse({ message: 'Property created' }, 201)
  } catch {
    return createApiError(400, 'Invalid request body')
  }
}
