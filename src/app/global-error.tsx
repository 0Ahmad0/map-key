'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-accent-gold mb-4">500</h1>
            <p className="text-xl text-text-secondary mb-8">
              Critical error. Please try again later.
            </p>
            <button
              onClick={reset}
              className="inline-flex px-6 py-3 text-sm font-semibold text-white bg-accent-gold hover:bg-accent-gold-hover rounded-xl transition-all"
            >
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
