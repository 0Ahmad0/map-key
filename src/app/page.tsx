import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

// ponytail: middleware normally redirects "/" before this renders; this is the fallback
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`)
}
