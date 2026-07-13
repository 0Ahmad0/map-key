export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-accent-gold/30 border-t-accent-gold animate-spin" />
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    </div>
  )
}
