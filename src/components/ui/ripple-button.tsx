'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface Ripple {
  x: number
  y: number
  id: number
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
}

export function RippleButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setRipples((prev) => [...prev, { x, y, id }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
      onClick?.(e)
    },
    [onClick]
  )

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl overflow-hidden transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-sm',
        size === 'lg' && 'px-8 py-4 text-base',
        variant === 'primary' &&
          'text-white bg-accent-gold hover:bg-accent-gold-hover shadow-lg shadow-accent-gold/20',
        variant === 'secondary' &&
          'text-accent-gold border border-accent-gold/30 hover:bg-accent-gold/10',
        variant === 'ghost' &&
          'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50',
        className
      )}
      {...props}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute pointer-events-none rounded-full bg-white/30 animate-ripple"
          style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
        />
      ))}
    </button>
  )
}

export function RippleLink({
  children,
  className,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [mounted, setMounted] = useState(false)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      if (!mounted) setMounted(true)
      setRipples((prev) => [...prev, { x, y, id }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
    },
    [mounted]
  )

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl overflow-hidden transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute pointer-events-none rounded-full bg-white/30 animate-ripple"
          style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
        />
      ))}
    </a>
  )
}
