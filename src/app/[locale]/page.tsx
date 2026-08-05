'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { demoProjects } from '@/lib/demo-projects'
import { ProjectCard } from '@/components/properties/project-card'
import { demoProperties, propertyTypes } from '@/lib/demo-properties'
import { cn, formatPrice } from '@/lib/utils'
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Expand,
  HelpCircle,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  Sparkles,
  Clapperboard,
  Megaphone,
  Target,
  Infinity as InfinityIcon,
} from 'lucide-react'

const copy = {
  ar: {
    badge: 'بوابتك للخدمات العقارية',
    heroTitle: 'منظومة متكاملة في القطاع العقاري',
    sale: 'للبيع',
    rent: 'للإيجار',
    projects: 'المشاريع',
    commercial: 'تجاري',
    city: 'المدينة أو المنطقة',
    type: 'نوع العقار',
    rooms: 'الغرف',
    price: 'السعر',
    min: 'الأقل:',
    max: 'الأعلى:',
    reset: 'إعادة تعيين',
    bathrooms: 'دورات المياه',
    area: 'المساحة',
    sqm: 'sqm',
    projectStatus: 'حالة المشروع',
    offPlan: 'مشاريع على الخريطة',
    readyProjects: 'مشاريع جاهزة',
    search: 'بحث',
    whyTitle: 'خدماتنا التسويقية',
    whyLead: 'شركة متخصصة في التسويق العقاري، نقدم حلولًا تسويقية احترافية تساعد المشاريع العقارية على تحقيق مبيعات حقيقية عبر استراتيجيات مدروسة وإعلانات فعّالة.',
    whyText: '',
    exclusive: 'مشاريعنا',
    exclusiveText: 'لا نعرض كل ما هو موجود. نعرض فقط ما يستحق الظهور.',
    all: 'الكل',
    readyOffPlan: 'جاهز على الخارطة',
    rentalUnits: 'وحدات تأجير',
    residential: 'سكني',
    neighborhoods: 'ليه تختار ماب كي Map Key?',
    neighborhoodsText: 'نحدد لك الخيار المثالي بعد اخذ احتياجاتك ونجيب لك العروض',
    priceMap: 'أسعار العقارات في المملكة العربية السعودية بالموقع',
    sellBuy: 'هل تبيع أم تشتري؟',
    sellBuyText: 'كل الاتجاهات تبدأ من Map Key. أضف عقارك أو أخبرنا بما تبحث عنه، وسنتولى الباقي.',
    request: 'اطلب عقار',
    add: 'أضف عقارك',
    popular: 'عمليات البحث الشائعة عن العقارات',
    newsletter: 'ابقَ قريباً من الفرص الجديدة',
    email: 'بريدك الإلكتروني',
    subscribe: 'اشترك',
    subscribed: 'تم تسجيل بريدك في نموذج الواجهة.',
    viewAll: 'عرض الكل',
    readMore: 'اقرأ المزيد',
    start: 'السعر المبدئي',
    delivery: 'موعد التسليم',
    available: 'متاح',
    ask: 'اسألنا',
    whatsapp: 'واتساب',
  },
  en: {
    badge: 'Your gateway to real estate services',
    heroTitle: 'An integrated system in the real estate sector',
    sale: 'For sale',
    rent: 'For rent',
    projects: 'Projects',
    commercial: 'Commercial',
    city: 'City or district',
    type: 'Property type',
    rooms: 'Rooms',
    price: 'Price',
    min: 'Min:',
    max: 'Max:',
    reset: 'Reset',
    bathrooms: 'Bathrooms',
    area: 'Area',
    sqm: 'sqm',
    projectStatus: 'Project status',
    offPlan: 'Off-plan projects',
    readyProjects: 'Ready projects',
    search: 'Search',
    whyTitle: 'Marketing Services',
    whyLead: 'A company specialized in real estate marketing, providing professional marketing solutions that help real estate projects achieve real sales through well-studied strategies and effective advertising.',
    whyText: '',
    exclusive: 'Our Projects',
    exclusiveText: 'We do not show everything on the market. We show what deserves attention.',
    all: 'All',
    readyOffPlan: 'Ready off-plan',
    rentalUnits: 'Rental units',
    residential: 'Residential',
    neighborhoods: 'Why choose Map Key?',
    neighborhoodsText: 'We define the ideal option after understanding your needs, then bring you the offers.',
    priceMap: 'Property prices in Saudi Arabia by location',
    sellBuy: 'Selling or buying?',
    sellBuyText: 'Every direction starts with Map Key. Add your property or tell us what you need, and we handle the rest.',
    request: 'Request property',
    add: 'Add property',
    popular: 'Popular property searches',
    newsletter: 'Stay close to new opportunities',
    email: 'Your email address',
    subscribe: 'Subscribe',
    subscribed: 'Your email was captured in the UI demo.',
    viewAll: 'View all',
    readMore: 'Read more',
    start: 'Starting price',
    delivery: 'Delivery',
    available: 'Available',
    ask: 'Ask us',
    whatsapp: 'WhatsApp',
  },
}

const popularLinks = {
  ar: {
    projects: ['مشاريع على الخريطة في الرياض', 'مشاريع جاهزة في الرياض', 'شقق للبيع في الرياض', 'مشاريع حصرية للبيع في الرياض', 'تجاري للإيجار في الرياض', 'تجاري للبيع في الرياض'],
    properties: ['وحدات رخيصة للبيع', 'وحدات تجارية للإيجار في الرياض', 'مكاتب للإيجار في الرياض', 'محلات للإيجار في الرياض', 'فلل فاخرة للبيع', 'دوبلكس للبيع'],
    other: ['مدونات الخبراء', 'الأسئلة الشائعة', 'مجتمعات الرياض', 'خبراء مبيعات العقارات في الرياض', 'رؤى السوق ذات الصلة', 'الجوائز والتكريم'],
  },
  en: {
    projects: ['Off-plan projects in Riyadh', 'Ready projects in Riyadh', 'Apartments for sale in Riyadh', 'Exclusive projects in Riyadh', 'Commercial for rent in Riyadh', 'Commercial for sale in Riyadh'],
    properties: ['Affordable units for sale', 'Commercial units for rent', 'Offices for rent in Riyadh', 'Retail shops for rent', 'Luxury villas for sale', 'Duplexes for sale'],
    other: ['Expert blog', 'Frequently asked questions', 'Riyadh communities', 'Riyadh sales experts', 'Related market insights', 'Awards and recognition'],
  },
}

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
}

function SectionTitle({ title, text, align = 'center' }: { title: string; text?: string; align?: 'center' | 'start' }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
      className={cn('mb-10', align === 'center' ? 'text-center' : 'text-start')}
    >
      <div className={cn('mb-5 h-1 w-16 rounded-full bg-[#b99750]', align === 'center' && 'mx-auto')} />
      <h2 className="text-3xl font-black leading-tight text-neutral-950 md:text-5xl">{title}</h2>
      {text && <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-neutral-500 md:text-lg">{text}</p>}
    </motion.div>
  )
}

function GoldButton({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold transition hover:-translate-y-0.5',
        light
          ? 'border border-neutral-200 bg-white text-neutral-950 hover:border-[#b99750]'
          : 'bg-[#b99750] text-white shadow-[0_18px_50px_rgba(185,151,80,.28)] hover:bg-[#a58742]'
      )}
    >
      {children}
    </Link>
  )
}

function PropertyCard({ property, index, isRTL, locale }: { property: (typeof demoProperties)[number]; index: number; isRTL: boolean; locale: string }) {
  return (
    <motion.article
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group overflow-hidden rounded-[26px] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image src={property.images[0]} alt={isRTL ? property.titleAr ?? property.title : property.title} fill sizes="(max-width: 1024px) 90vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute start-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#8a6a2e]">{copy[locale as 'ar' | 'en'].available}</span>
          <strong className="absolute bottom-4 start-4 text-xl text-white">{formatPrice(property.price, property.currency, locale)}</strong>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-black text-neutral-950">{isRTL ? property.titleAr : property.title}</h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
            <MapPin className="h-4 w-4 text-[#b99750]" />
            {isRTL ? property.locationAr : property.location}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {property.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms}</span>
            <span className="flex items-center gap-1"><Maximize2 className="h-4 w-4" /> {property.area}m²</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function HomePage() {
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'
  const t = copy[locale]
  const [subscribed, setSubscribed] = useState(false)
  const [mapMode, setMapMode] = useState('villa')
  const [projectFilter, setProjectFilter] = useState('all')

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return demoProjects.slice(0, 3)
    if (projectFilter === 'commercial') return demoProjects.filter((p) => p.type === 'commercial').slice(0, 3)
    return demoProjects.slice(0, 3)
  }, [projectFilter])

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-neutral-950">
      <section className="relative min-h-[720px] overflow-hidden bg-neutral-950 pt-24 text-white md:min-h-[820px]">
        <video autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover opacity-55">
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(185,151,80,.22),transparent_32%),linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.82))]" />
        <motion.div
          className="container relative z-10 mx-auto flex min-h-[620px] flex-col items-center justify-center px-4 py-12 text-center md:min-h-[720px] md:py-0"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={reveal} className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs backdrop-blur-xl sm:text-sm md:mb-8">
            <Sparkles className="h-4 w-4 text-[#d1ad63]" />
            {t.badge}
          </motion.div>
          <motion.h1 variants={reveal} className="max-w-5xl text-4xl font-black leading-[1.12] sm:text-5xl md:text-7xl">
            {t.heroTitle}
          </motion.h1>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-10 md:py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-black text-neutral-950 md:text-5xl">{isRTL ? 'من نحن' : 'About Us'}</h2>
          <p className="text-lg leading-9 text-neutral-600 md:text-xl md:leading-10">{t.whyLead}</p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-32 pt-0">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-[36px] bg-white p-8 shadow-xl shadow-black/5 md:p-12">
            <h2 className="mb-8 text-3xl font-black leading-tight text-neutral-950 md:text-5xl">{t.whyTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {[
                [Building2, isRTL ? 'التسويق العقاري المتكامل' : 'Integrated real estate marketing'],
                [Clapperboard, isRTL ? 'إنتاج المحتوى العقاري' : 'Real estate content production'],
                [Target, isRTL ? 'استشارات تسويقية عقارية' : 'Real estate marketing consulting'],
                [InfinityIcon, isRTL ? 'إدارة حسابات السوشيال ميديا' : 'Social media account management'],
                [Megaphone, isRTL ? 'إدارة الحملات الإعلانية' : 'Ad campaign management'],
              ].map(([Icon, label], index) => (
                <motion.div
                  key={label as string}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                  className="flex min-h-24 items-center gap-4 rounded-2xl border border-neutral-100 bg-[#fbfaf7] p-5 text-start transition hover:-translate-y-0.5 hover:border-[#d1ad63]/50"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[#b99750] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </span>
                  <strong className="text-base leading-7 text-neutral-950">{label as string}</strong>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative min-h-[320px] overflow-hidden rounded-[28px] md:min-h-[430px] lg:h-full md:rounded-[36px]">
            <Image src="/images/map-key-office.png" alt="Map Key office" fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-8 start-8 text-white">
              <p className="text-5xl font-black text-[#d1ad63]">+12K</p>
              <p className="mt-2 text-white/80">{isRTL ? 'فرصة عقارية محللة' : 'analyzed property opportunities'}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle title={t.exclusive} text={t.exclusiveText} align="start" />
            <div className="flex flex-wrap gap-2">
              {[
                ['all', t.all],
                ['ready-off-plan', t.readyOffPlan],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setProjectFilter(value)}
                  className={cn('rounded-full border px-5 py-3 text-sm font-bold transition', projectFilter === value ? 'border-[#b99750] bg-[#b99750] text-white' : 'border-neutral-200 hover:border-[#b99750]')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <GoldButton href="/projects" light>
              {t.viewAll}
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </GoldButton>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-32">
        <SectionTitle title={isRTL ? 'عقارات للتأجير' : 'Properties for rent'} text={isRTL ? 'واجهات بطاقات فاخرة، واضحة، ومهيأة للبحث والتصفية.' : 'Premium property cards ready for search and filtering.'} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {demoProperties.slice(0, 3).map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} isRTL={isRTL} locale={locale} />
          ))}
        </div>
      </section>

      <section className="bg-neutral-950 py-16 text-white md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-[#b99750]" />
          <h2 className="text-3xl font-black leading-tight md:text-5xl">{t.neighborhoods}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-white/70">{t.neighborhoodsText}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-32">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 lg:flex-row">
          <SectionTitle title={t.priceMap} align="start" />
          <div className="flex max-w-full flex-wrap justify-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm lg:max-w-[680px] lg:justify-end">
            {propertyTypes.filter((type) => type.value !== 'all').map((type) => (
              <button
                key={type.value}
                onClick={() => setMapMode(type.value)}
                className={cn('min-h-11 rounded-full px-4 py-2 text-sm font-bold transition whitespace-nowrap', mapMode === type.value ? 'bg-[#b99750] text-white' : 'text-neutral-600 hover:bg-neutral-100')}
              >
                {isRTL ? type.labelAr : type.label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[560px] overflow-hidden rounded-[34px] bg-[#e8e1d2] shadow-2xl shadow-black/5">
          <div className="absolute inset-0 opacity-90 [background-image:linear-gradient(28deg,transparent_0_46%,#f3a247_47%_49%,transparent_50%),linear-gradient(115deg,transparent_0_48%,#e4c356_49%_50%,transparent_51%),linear-gradient(#d9d4c9_1px,transparent_1px),linear-gradient(90deg,#d9d4c9_1px,transparent_1px)] [background-size:420px_240px,360px_300px,46px_46px,46px_46px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_55%,rgba(142,198,74,.28),transparent_15%),radial-gradient(circle_at_34%_42%,rgba(142,198,74,.18),transparent_13%)]" />
          <div className="absolute bottom-10 left-1/2 text-4xl font-black text-neutral-950/80">الرياض</div>
          <div className="absolute left-[48%] top-[22%] h-28 w-20 -translate-x-1/2 rotate-[-18deg] rounded-[55%_55%_45%_45%] border-4 border-neutral-950 bg-[#8fc64a]/70 shadow-xl" />
          <button className="absolute start-6 top-6 inline-flex items-center gap-3 rounded-full border border-[#8fc64a] bg-white px-6 py-4 text-lg font-bold shadow-sm">
            {isRTL ? 'الخريطة الكاملة' : 'Full map'}
            <Expand className="h-5 w-5" />
          </button>
          <div className="absolute bottom-8 start-6 overflow-hidden rounded-lg bg-white shadow-md">
            {['+', '−', '▲'].map((item) => (
              <button key={item} className="grid h-10 w-10 place-items-center border-b border-neutral-200 text-xl font-bold last:border-b-0">
                {item}
              </button>
            ))}
          </div>

          <aside className="absolute inset-x-5 bottom-5 rounded-[28px] bg-white p-6 shadow-2xl lg:inset-x-auto lg:bottom-8 lg:end-8 lg:top-8 lg:w-[360px]">
            <button className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
              {isRTL ? 'عودة' : 'Back'}
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-2xl font-black">{isRTL ? 'حي الصحافة' : 'Al Sahafa District'}</h3>
              <p className="mt-1 text-neutral-400">{(isRTL ? propertyTypes.find((type) => type.value === mapMode)?.labelAr : propertyTypes.find((type) => type.value === mapMode)?.label) ?? ''}</p>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl">
              {[
                [isRTL ? 'الأعلى' : 'High', '2,305,000+'],
                [isRTL ? 'المتوسط' : 'Average', '1,691,859'],
                [isRTL ? 'الأدنى' : 'Low', '995,000'],
              ].map(([label, value], index) => (
                <div key={label} className={cn('flex items-center justify-between p-4 text-white', index === 0 ? 'bg-[#8fc64a]' : index === 1 ? 'bg-[#b6da89]' : 'bg-[#d5eabd]')}>
                  <span className="font-bold">{label}</span>
                  <strong>{value}</strong>
                  <span>﷼</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-400">
              {isRTL ? 'يتم حساب البيانات باستخدام القوائم المنشورة خلال آخر 90 يوماً.' : 'Data is calculated from listings published during the last 90 days.'}
            </p>
            <div className="mt-5 space-y-3">
              <button className="h-12 w-full rounded-full border border-neutral-200 font-bold">
                {isRTL ? 'عرض المجتمع' : 'View community'}
              </button>
              <button className="h-12 w-full rounded-full bg-[#8fc64a] font-bold text-white">
                {isRTL ? 'تصفح 17 عقارات' : 'Browse 17 properties'}
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24 md:pb-32">
        <div className="grid items-center gap-8 rounded-[34px] bg-white p-8 shadow-xl shadow-black/5 md:grid-cols-2 md:p-14">
          <div className="relative h-80 overflow-hidden rounded-[28px]">
            <Image src="/images/prop-1.jpg" alt="" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
          </div>
          <div>
            <h2 className="text-4xl font-black">{t.sellBuy}</h2>
            <p className="mt-5 max-w-xl text-lg leading-9 text-neutral-500">{t.sellBuyText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`https://wa.me/966541646755?text=${encodeURIComponent(isRTL ? 'مرحباً ماب كي، أرغب بطلب عقار مناسب لاحتياجي. أرجو التواصل معي.' : 'Hello Map Key, I would like to request a property that fits my needs. Please contact me.')}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#b99750] px-7 text-sm font-bold text-white shadow-[0_18px_50px_rgba(185,151,80,.28)] transition hover:-translate-y-0.5 hover:bg-[#a58742]">
                {t.request}
              </a>
              <a href={`https://wa.me/966541646755?text=${encodeURIComponent(isRTL ? 'مرحباً ماب كي، لدي عقار وأرغب بعرضه أو تسويقه عبركم. أرجو التواصل معي.' : 'Hello Map Key, I have a property and would like to list or market it with you. Please contact me.')}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-7 text-sm font-bold text-neutral-950 transition hover:-translate-y-0.5 hover:border-[#b99750]">
                {t.add}
              </a>
            </div>
          </div>
        </div>
      </section>



      <section className="container mx-auto px-4 py-16 md:py-32">
        <div className="overflow-hidden rounded-[34px] bg-neutral-950 text-white shadow-2xl shadow-black/10 lg:grid lg:grid-cols-[1.6fr_1fr]">
          <div className="relative min-h-[260px] md:min-h-[360px]">
            <Image src="/images/map-key-showroom.png" alt="" fill sizes="(max-width: 1024px) 90vw, 60vw" className="object-cover opacity-80" />
          </div>
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <Image src="/new_logo_dark.svg" alt="Map Key" width={210} height={124} className="h-auto w-52" />
            <p className="mt-8 text-lg leading-8 text-white/70">{isRTL ? 'تجربة عقارية مصممة لتختصر الطريق إلى القرار.' : 'A real estate experience designed to shorten the path to a decision.'}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-32">
        <div className="container mx-auto px-4">
          <SectionTitle title={t.popular} text={isRTL ? 'استكشف أكثر الروابط رواجاً وابدأ الآن.' : 'Explore the most visited searches and start now.'} />
          <div className="grid gap-10 text-center md:grid-cols-3">
            {[
              [t.projects, popularLinks[locale].projects],
              [isRTL ? 'عقارات' : 'Properties', popularLinks[locale].properties],
              [isRTL ? 'روابط أخرى' : 'Other links', popularLinks[locale].other],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h3 className="mb-6 text-2xl font-black">{title as string}</h3>
                <ul className="space-y-4 text-neutral-600">
                  {(links as string[]).map((link) => (
                    <li key={link}>
                      <Link href="/properties" className="transition hover:text-[#b99750]">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSubscribed(true)
            }}
            className="mx-auto mt-16 flex max-w-xl flex-col gap-3 rounded-[28px] border border-neutral-200 bg-[#fbfaf7] p-3 sm:flex-row"
          >
            <label className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl bg-white px-4">
              <Mail className="h-5 w-5 text-[#b99750]" />
              <input type="email" required placeholder={t.email} className="w-full bg-transparent outline-none" />
            </label>
            <button className="rounded-2xl bg-[#b99750] px-7 font-bold text-white">{t.subscribe}</button>
          </form>
          {subscribed && <p className="mt-4 text-center text-sm font-bold text-[#8a6a2e]">{t.subscribed}</p>}
        </div>
      </section>

      <div className="fixed bottom-6 end-5 z-40 flex flex-col gap-3">
        <a href="tel:+966541646755" className="grid h-14 w-14 place-items-center rounded-full bg-neutral-950 text-white shadow-2xl md:h-16 md:w-16" aria-label={t.ask}>
          <HelpCircle className="h-6 w-6 md:h-7 md:w-7" />
        </a>
        <a href="https://wa.me/966541646755" className="grid h-14 w-14 place-items-center rounded-full bg-[#21c769] text-white shadow-2xl md:h-16 md:w-16" aria-label={t.whatsapp}>
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
        </a>
      </div>
    </div>
  )
}
