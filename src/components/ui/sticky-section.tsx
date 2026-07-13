'use client'

import { cn } from '@/lib/utils'

interface StickySectionProps {
  children: React.ReactNode
  className?: string
  offset?: number
}

export function StickySection({ children, className, offset = 0 }: StickySectionProps) {
  return (
    <div
      className={cn(
        'sticky z-10',
        'backdrop-blur-xl bg-bg-secondary/80',
        'border-b border-border/10',
        className
      )}
      style={{ top: offset }}
    >
      {children}
    </div>
  )
}
