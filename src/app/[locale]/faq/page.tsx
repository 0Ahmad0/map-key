'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { ChevronDown } from 'lucide-react'

export default function FaqPage() {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const faqs = [
    {
      q: isRTL ? 'كيف أضيف عقاري على المنصة؟' : 'How do I list my property?',
      a: isRTL
        ? 'من صفحة "أضف عقارك" أدخل بيانات العقار ورقم جوالك، وسيتواصل معك فريقنا خلال 24 ساعة للتوثيق والنشر.'
        : 'From the "Add Property" page, enter your property details and phone number. Our team will contact you within 24 hours to verify and publish.',
    },
    {
      q: isRTL ? 'هل الإعلانات موثقة؟' : 'Are the listings verified?',
      a: isRTL
        ? 'نعم، كل إعلان يمر بمراجعة يدوية وتوثيق ملكية قبل ظهوره على المنصة.'
        : 'Yes. Every listing goes through manual review and ownership verification before it appears on the platform.',
    },
    {
      q: isRTL ? 'هل الخدمة مجانية؟' : 'Is the service free?',
      a: isRTL
        ? 'التصفح والبحث وطلب عقار مجاني بالكامل. رسوم رمزية تطبق فقط عند إتمام صفقة عبر المنصة.'
        : 'Browsing, searching, and requesting a property is completely free. A small fee applies only when a deal is completed through the platform.',
    },
    {
      q: isRTL ? 'كيف تحمون بياناتي الشخصية؟' : 'How is my personal data protected?',
      a: isRTL
        ? 'نطبق بنية انعدام الثقة وتشفير كامل للبيانات، ولا نشارك بياناتك مع أي طرف ثالث دون موافقتك الصريحة.'
        : 'We apply zero-trust architecture and full data encryption. Your data is never shared with third parties without your explicit consent.',
    },
    {
      q: isRTL ? 'ما هي شروط الاستخدام؟' : 'What are the terms of use?',
      a: isRTL
        ? 'باستخدامك المنصة فأنت توافق على تقديم معلومات صحيحة، واحترام حقوق الملكية، واستخدام المنصة للأغراض العقارية المشروعة فقط.'
        : 'By using the platform you agree to provide accurate information, respect ownership rights, and use the platform for legitimate real estate purposes only.',
    },
    {
      q: isRTL ? 'هل يمكن للمقيمين والأجانب الشراء؟' : 'Can residents and foreigners buy?',
      a: isRTL
        ? 'نعم في المناطق المخصصة وفق الأنظمة الجديدة. راجع مقالاتنا القانونية لمزيد من التفاصيل.'
        : 'Yes, in designated zones under the new regulations. See our legal articles for details.',
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="h-0.5 w-12 bg-gradient-to-r from-accent-gold to-amber-400 mb-6" />
          <h1 className="text-h1 font-bold text-text-primary mb-3">
            {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-body text-text-secondary mb-10">
            {isRTL ? 'كل ما تحتاج معرفته عن ماب كي، الخصوصية، وشروط الاستخدام.' : 'Everything you need to know about Map-Key, privacy, and terms of use.'}
          </p>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.details
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="glass-card rounded-2xl group"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="w-5 h-5 text-accent-gold shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
