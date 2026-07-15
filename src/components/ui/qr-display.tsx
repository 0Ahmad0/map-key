'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

interface QRDisplayProps {
  value: string
  className?: string
}

export function QRDisplay({ value, className }: QRDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState(280)

  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const maxSize = Math.min(vw * 0.8, vh * 0.45, 400)
      setSize(Math.max(200, maxSize))
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !value) return

    const canvas = canvasRef.current
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)

    QRCode.toCanvas(
      canvas,
      value,
      {
        width: size,
        margin: 0,
        color: {
          dark: '#C9A84C',
          light: '#00000000',
        },
      },
      (err) => {
        if (err) console.error(err)
      }
    )
  }, [value, size])

  return (
    <div className={className}>
      <div
        className="relative inline-flex items-center justify-center rounded-2xl border-2 border-accent-gold/30 bg-bg-card/50 p-4"
        style={{ boxShadow: '0 0 40px rgba(201, 168, 76, 0.1)' }}
      >
        <canvas ref={canvasRef} />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-accent-gold/10 pointer-events-none" />
      </div>
    </div>
  )
}
