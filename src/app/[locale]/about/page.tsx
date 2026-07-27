'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ShieldCheck, Building2, Users, Globe2 } from 'lucide-react'

export default function AboutPage() {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const values = [
    {
      icon: ShieldCheck,
      title: isRTL ? 'أمان مؤسسي' : 'Enterprise Security',
      desc: isRTL
        ? 'بنية انعدام الثقة وتوافق مع أعلى معايير حماية البيانات.'
        : 'Zero-trust architecture and compliance with the highest data protection standards.',
    },
    {
      icon: Building2,
      title: isRTL ? 'عقارات موثقة' : 'Verified Properties',
      desc: isRTL
        ? 'كل إعلان يمر بمراجعة وتوثيق قبل النشر.'
        : 'Every listing is reviewed and verified before publication.',
    },
    {
      icon: Users,
      title: isRTL ? 'أكثر من 1000 عميل' : '1000+ Clients',
      desc: isRTL
        ? 'ثقة متنامية من الأفراد والمستثمرين والمطورين.'
        : 'Growing trust from individuals, investors, and developers.',
    },
    {
      icon: Globe2,
      title: isRTL ? 'تغطية واسعة' : 'Wide Coverage',
      desc: isRTL
        ? 'حضور في أكثر من 10 مدن في المملكة والخليج.'
        : 'Present in 10+ cities across the Kingdom and the Gulf.',
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="h-0.5 w-12 bg-gradient-to-r from-accent-gold to-amber-400 mb-6" />
          <h1 className="text-h1 font-black text-text-primary mb-4">
            {isRTL ? 'من نحن' : 'About Us'}
          </h1>
          <p className="text-body text-text-secondary leading-relaxed mb-8">
            {isRTL
              ? 'شركة متخصصة في التسويق العقاري، نقدم حلولًا تسويقية احترافية تساعد المشاريع العقارية على تحقيق مبيعات حقيقية عبر استراتيجيات مدروسة وإعلانات فعّالة.'
              : 'A company specialized in real estate marketing, providing professional marketing solutions that help real estate projects achieve real sales through well-studied strategies and effective advertising.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="glass-card rounded-2xl p-6"
              >
                <v.icon className="w-7 h-7 text-accent-gold mb-4" />
                <h3 className="font-bold text-text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/properties" className="btn-gold px-8 py-4 rounded-xl inline-block">
              {isRTL ? 'استكشف عقاراتنا' : 'Explore our properties'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
