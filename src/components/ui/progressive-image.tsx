'use client'

/* eslint-disable @next/next/no-img-element */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressiveImageProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  width?: number
  height?: number
}

export function ProgressiveImage({
  src,
  alt,
  className,
  wrapperClassName,
  width,
  height,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden bg-text-secondary/10', wrapperClassName)}
      style={{ width, height }}
    >
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-105',
            className
          )}
        />
      )}
      <AnimatePresence>
        {!loaded && inView && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-text-secondary/10 to-text-secondary/5 animate-pulse"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
