'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { propertyTypes } from '@/lib/demo-properties'
import { Home, CheckCircle2 } from 'lucide-react'

const inputCls =
  'w-full px-4 py-3 rounded-xl bg-surface-1 border border-border/60 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-gold/60 focus:outline-none transition-colors'

export default function AddPropertyPage() {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="min-h-screen pt-32 pb-16 text-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 className="w-16 h-16 text-accent-gold mx-auto mb-6" />
          <h1 className="text-h3 font-bold text-text-primary mb-3">
            {isRTL ? 'تم استلام عقارك!' : 'Your property was received!'}
          </h1>
          <p className="text-body text-text-secondary mb-8">
            {isRTL ? 'سيتواصل معك فريقنا خلال 24 ساعة لتوثيق الإعلان.' : 'Our team will contact you within 24 hours to verify the listing.'}
          </p>
          <Link href="/properties" className="btn-gold px-8 py-3 rounded-xl">
            {isRTL ? 'تصفح العقارات' : 'Browse properties'}
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-14 h-14 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mb-6 text-accent-gold">
            <Home className="w-7 h-7" />
          </div>
          <h1 className="text-h2 font-bold text-text-primary mb-2">
            {isRTL ? 'أضف عقارك' : 'Add Your Property'}
          </h1>
          <p className="text-body text-text-secondary mb-8">
            {isRTL ? 'أدخل بيانات عقارك ووصل لآلاف المشترين.' : 'Enter your property details and reach thousands of buyers.'}
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <input required className={inputCls} placeholder={isRTL ? 'عنوان الإعلان' : 'Listing title'} />
            <div className="grid grid-cols-2 gap-4">
              <select required className={inputCls} defaultValue="">
                <option value="" disabled>{isRTL ? 'نوع العقار' : 'Property type'}</option>
                {propertyTypes.filter((type) => type.value !== 'all').map((type) => (
                  <option key={type.value} value={type.value}>{isRTL ? type.labelAr : type.label}</option>
                ))}
              </select>
              <select required className={inputCls} defaultValue="">
                <option value="" disabled>{isRTL ? 'المدينة' : 'City'}</option>
                <option value="riyadh">{isRTL ? 'الرياض' : 'Riyadh'}</option>
                <option value="jeddah">{isRTL ? 'جدة' : 'Jeddah'}</option>
                <option value="dammam">{isRTL ? 'الدمام' : 'Dammam'}</option>
              </select>
            </div>
            <input required type="number" min="1" className={inputCls} placeholder={isRTL ? 'السعر المطلوب (ريال)' : 'Asking price (SAR)'} />
            <input required type="tel" dir="ltr" className={inputCls} placeholder={isRTL ? 'رقم الجوال' : 'Phone number'} />
            <textarea rows={4} className={inputCls} placeholder={isRTL ? 'وصف العقار (اختياري)' : 'Property description (optional)'} />
            <button type="submit" className="btn-gold w-full rounded-xl">
              {isRTL ? 'إرسال العقار' : 'Submit property'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
