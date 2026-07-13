'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full rounded-xl border border/20 bg-bg-primary px-4 py-3 text-sm text-text-primary',
              'placeholder:text-text-secondary/50',
              'transition-all duration-300',
              'focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/20 focus:shadow-[0_0_20px_rgb(var(--accent-gold)/0.15)]',
              'hover:border-accent-gold/30',
              icon && 'pl-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20 focus:shadow-[0_0_20px_rgb(239_68_68/0.15)]',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-xl border border/20 bg-bg-primary px-4 py-3 text-sm text-text-primary',
            'placeholder:text-text-secondary/50',
            'transition-all duration-300',
            'focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/20 focus:shadow-[0_0_20px_rgb(var(--accent-gold)/0.15)]',
            'hover:border-accent-gold/30',
            'resize-y min-h-[100px]',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
