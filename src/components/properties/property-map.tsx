'use client'

import type { Property } from '@/types'

interface PropertyMapProps {
  properties: Property[]
  selectedId: string | null
}

export function PropertyMap({ properties, selectedId }: PropertyMapProps) {
  const property = properties.find((item) => item.id === selectedId) ?? properties[0]
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!property || !apiKey) {
    return <div className="grid h-full min-h-[300px] place-items-center bg-neutral-100 text-sm text-neutral-500">Google Maps</div>
  }

  const query = property.mapLocation || property.locationAr || property.location

  return (
    <iframe
      key={property.id}
      title={`موقع ${property.titleAr || property.title}`}
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}&zoom=15`}
      className="h-full min-h-[300px] w-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
