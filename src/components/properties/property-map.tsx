'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { formatPrice } from '@/lib/utils'
import type { Property } from '@/types'

interface PropertyMapProps {
  properties: Property[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}

const GOLD = '#C9A84C'
const GOLD_GLOW = 'rgba(201,168,76,0.4)'

function createMarkerIcon(isSelected: boolean) {
  const size = isSelected ? 28 : 20
  const color = GOLD
  const borderWidth = isSelected ? 3 : 2
  const glowSize = isSelected ? 12 : 6

  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          position: absolute;
          inset: -${glowSize}px;
          border-radius: 50%;
          background: radial-gradient(circle, ${GOLD_GLOW} 0%, transparent 70%);
          ${isSelected ? 'animation: pulse 2s ease-in-out infinite;' : ''}
        "></div>
        <div style="
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          border: ${borderWidth}px solid rgba(255,255,255,0.9);
          box-shadow: 0 2px 12px ${GOLD_GLOW}, 0 0 0 ${isSelected ? 4 : 2}px ${GOLD_GLOW};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        ">
          <div style="
            width: ${size / 3}px;
            height: ${size / 3}px;
            border-radius: 50%;
            background: white;
          "></div>
        </div>
      </div>
    `,
    className: 'mapkey-marker',
    iconSize: [size + glowSize * 2, size + glowSize * 2],
    iconAnchor: [(size + glowSize * 2) / 2, (size + glowSize * 2) / 2],
    popupAnchor: [0, -(size / 2 + glowSize)],
  })
}

function createPopupContent(property: Property): string {
  const price = formatPrice(property.price, property.currency, 'en')
  return `
    <div style="
      font-family: system-ui, -apple-system, sans-serif;
      min-width: 220px;
      padding: 0;
      background: #0e0e14;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(201,168,76,0.2);
    ">
      <div style="
        height: 6px;
        background: linear-gradient(90deg, ${GOLD}, rgba(201,168,76,0.3));
      "></div>
      <div style="padding: 14px 16px;">
        <h4 style="
          margin: 0 0 6px 0;
          font-size: 13px;
          font-weight: 700;
          color: #f5f5fa;
          line-height: 1.3;
        ">${property.title}</h4>
        <p style="
          margin: 0 0 10px 0;
          font-size: 11px;
          color: #a0a5b4;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${GOLD}" stroke-width="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          ${property.location}
        </p>
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
        ">
          <span style="
            font-size: 15px;
            font-weight: 800;
            color: ${GOLD};
          ">${price}</span>
          <div style="
            display: flex;
            gap: 12px;
            font-size: 10px;
            color: #a0a5b4;
          ">
            ${property.bedrooms > 0 ? `<span>${property.bedrooms} BD</span>` : ''}
            <span>${property.area} m²</span>
          </div>
        </div>
      </div>
    </div>
  `
}

export function PropertyMap({ properties, selectedId, onSelect }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const [mapReady, setMapReady] = useState(false)

  // Inject pulse animation style
  useEffect(() => {
    const styleId = 'mapkey-marker-pulse'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        .mapkey-marker { background: none !important; border: none !important; }
        .leaflet-popup-content-wrapper {
          background: #0e0e14 !important;
          border-radius: 12px !important;
          padding: 0 !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.15) !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-tip {
          background: #0e0e14 !important;
          border: 1px solid rgba(201,168,76,0.1) !important;
          box-shadow: none !important;
        }
        .leaflet-popup-close-button {
          color: #a0a5b4 !important;
          font-size: 18px !important;
          right: 8px !important;
          top: 8px !important;
        }
        .leaflet-popup-close-button:hover { color: ${GOLD} !important; }
      `
      document.head.appendChild(style)
    }
  }, [])

  // Init map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [24.7136, 46.6753],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: true,
      attributionControl: false,
    })

    // Dark-themed tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    // Attribution in bottom left
    L.control.attribution({ position: 'bottomleft', prefix: false })
      .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" style="color:#666">OSM</a>')
      .addTo(map)

    // Zoom control position
    map.zoomControl.setPosition('bottomright')

    mapInstanceRef.current = map
    setMapReady(true)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Sync markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return
    const map = mapInstanceRef.current

    // Clear old markers
    markersRef.current.forEach((m) => map.removeLayer(m))
    markersRef.current.clear()

    const bounds: L.LatLngExpression[] = []

    properties.forEach((property) => {
      const isSelected = property.id === selectedId
      const icon = createMarkerIcon(isSelected)

      const marker = L.marker([property.lat, property.lng], { icon })
        .addTo(map)
        .bindPopup(createPopupContent(property), {
          maxWidth: 280,
          minWidth: 220,
          closeButton: true,
          className: 'mapkey-popup',
        })

      marker.on('click', () => {
        onSelect(property.id)
      })

      markersRef.current.set(property.id, marker)
      bounds.push([property.lat, property.lng])
    })

    if (bounds.length > 0) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [60, 60], maxZoom: 12 })
    }
  }, [properties, mapReady, onSelect, selectedId])

  // Highlight selected
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return

    markersRef.current.forEach((marker, id) => {
      const isSelected = id === selectedId
      marker.setIcon(createMarkerIcon(isSelected))

      if (isSelected) {
        marker.openPopup()
        mapInstanceRef.current?.setView(marker.getLatLng(), 10, { animate: true, duration: 0.5 })
      }
    })
  }, [selectedId, mapReady])

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Map container */}
      <div ref={mapRef} className="w-full h-full z-0" style={{ minHeight: 300 }} />

      {/* Premium gold border overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-accent-gold/15" />

      {/* Top-left legend */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <div className="glass-card rounded-xl px-3 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-gold shadow-gold-sm" />
          <span className="text-[10px] font-medium text-text-secondary tracking-wide uppercase">
            {properties.length} Properties
          </span>
        </div>
      </div>
    </div>
  )
}
