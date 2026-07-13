'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
}

export function HoverCard({ children, className, as: Tag = 'div' }: HoverCardProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as React.ElementType

  return (
    <MotionTag
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgb(0 0 0 / 0.12)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border/10 bg-bg-card/85 card-gradient',
        'transition-colors duration-300',
        className
      )}
    >
      {children}
    </MotionTag>
  )
}
