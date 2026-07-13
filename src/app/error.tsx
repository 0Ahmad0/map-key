'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold text-accent-gold mb-4">500</h1>
        <p className="text-xl text-text-secondary mb-8">
          Something went wrong. Our team has been notified.
        </p>
        <button
          onClick={reset}
          className="inline-flex px-6 py-3 text-sm font-semibold text-white bg-accent-gold hover:bg-accent-gold-hover rounded-xl transition-all"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  )
}
