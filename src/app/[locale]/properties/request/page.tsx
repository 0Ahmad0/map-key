'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Search, CheckCircle2 } from 'lucide-react'

const inputCls =
  'w-full px-4 py-3 rounded-xl bg-surface-1 border border-border/60 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-gold/60 focus:outline-none transition-colors'

export default function RequestPropertyPage() {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="min-h-screen pt-32 pb-16 text-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 className="w-16 h-16 text-accent-gold mx-auto mb-6" />
          <h1 className="text-h3 font-bold text-text-primary mb-3">
            {isRTL ? 'تم تسجيل طلبك!' : 'Your request was registered!'}
          </h1>
          <p className="text-body text-text-secondary mb-8">
            {isRTL ? 'سنرسل لك أفضل العروض المطابقة لطلبك فور توفرها.' : 'We will send you the best matching offers as soon as they are available.'}
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
            <Search className="w-7 h-7" />
          </div>
          <h1 className="text-h2 font-bold text-text-primary mb-2">
            {isRTL ? 'اطلب عقاراً' : 'Request a Property'}
          </h1>
          <p className="text-body text-text-secondary mb-8">
            {isRTL ? 'أخبرنا ماذا تريد وسنجده لك.' : 'Tell us what you are looking for and we will find it.'}
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <input required className={inputCls} placeholder={isRTL ? 'الاسم الكامل' : 'Full name'} />
            <input required type="tel" dir="ltr" className={inputCls} placeholder={isRTL ? 'رقم الجوال' : 'Phone number'} />
            <div className="grid grid-cols-2 gap-4">
              <select required className={inputCls} defaultValue="">
                <option value="" disabled>{isRTL ? 'نوع العقار' : 'Property type'}</option>
                <option value="villa">{isRTL ? 'فيلا' : 'Villa'}</option>
                <option value="apartment">{isRTL ? 'شقة' : 'Apartment'}</option>
                <option value="commercial">{isRTL ? 'تجاري' : 'Commercial'}</option>
              </select>
              <select required className={inputCls} defaultValue="">
                <option value="" disabled>{isRTL ? 'المدينة' : 'City'}</option>
                <option value="riyadh">{isRTL ? 'الرياض' : 'Riyadh'}</option>
                <option value="jeddah">{isRTL ? 'جدة' : 'Jeddah'}</option>
                <option value="dammam">{isRTL ? 'الدمام' : 'Dammam'}</option>
              </select>
            </div>
            <select required className={inputCls} defaultValue="">
              <option value="" disabled>{isRTL ? 'الميزانية' : 'Budget'}</option>
              <option value="lt500k">{isRTL ? 'أقل من 500 ألف' : 'Under 500K'}</option>
              <option value="500k-2m">{isRTL ? '500 ألف – 2 مليون' : '500K – 2M'}</option>
              <option value="2m-5m">{isRTL ? '2 – 5 مليون' : '2M – 5M'}</option>
              <option value="gt5m">{isRTL ? 'أكثر من 5 مليون' : '5M+'}</option>
            </select>
            <textarea rows={3} className={inputCls} placeholder={isRTL ? 'تفاصيل إضافية (اختياري)' : 'Extra details (optional)'} />
            <button type="submit" className="btn-gold w-full rounded-xl">
              {isRTL ? 'إرسال الطلب' : 'Submit request'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
