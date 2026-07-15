'use client'

import { FormEvent, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import { demoArticles } from '@/lib/demo-articles'
import { demoProjects } from '@/lib/demo-projects'
import { demoProperties } from '@/lib/demo-properties'
import { cn, formatDate, formatPrice } from '@/lib/utils'
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  ChevronDown,
  Expand,
  Heart,
  HelpCircle,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

const copy = {
  ar: {
    badge: 'بوابة عقارية سعودية بخبرة سوق حقيقية',
    heroTitle: 'نعرف السوق قبل أن يشرح نفسه',
    heroText:
      'نقرأ المدن والأحياء والمشاريع بعين خبيرة، ونحوّل البحث العقاري إلى قرار واضح ومطمئن.',
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
    whyTitle: 'لماذا Map Key؟',
    whyLead: 'لسنا وسيطاً عابراً. نحن شريك يقرأ القيمة، يختار بعناية، ويعرض الفرص التي تستحق الظهور.',
    whyText:
      'من السكن الراقي إلى التجاري النابض، نوصل العميل إلى فرصة تناسب احتياجه اليوم وتحافظ على قيمتها غداً.',
    exclusive: 'مشاريع حصرية',
    exclusiveText: 'لا نعرض كل ما هو موجود. نعرض فقط ما يستحق الظهور.',
    all: 'الكل',
    onMap: 'على الخريطة',
    ready: 'جاهزة',
    residential: 'سكني',
    neighborhoods: 'اختر الحي الأنسب',
    neighborhoodsText: 'نرشّح الأحياء وفق الموقع والخدمات ونمط الحياة والأسعار.',
    priceMap: 'أسعار العقارات في المملكة العربية السعودية بالموقع',
    sellBuy: 'هل تبيع أم تشتري؟',
    sellBuyText: 'كل الاتجاهات تبدأ من Map Key. أضف عقارك أو أخبرنا بما تبحث عنه، وسنتولى الباقي.',
    request: 'اطلب عقار',
    add: 'أضف عقارك',
    articles: 'لا نكتب محتوى، بل نشارك المعرفة.',
    articlesText: 'مقالات توضّح وتحذّر وتقرأ السوق السعودي بعين خبيرة.',
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
    badge: 'A Saudi real estate gateway with market judgment',
    heroTitle: 'We read the market before it explains itself',
    heroText:
      'We understand cities, districts, and projects with a sharper eye, turning property search into a clear decision.',
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
    whyTitle: 'Why Map Key?',
    whyLead: 'We are not a passing broker. We are a partner that reads value and presents opportunities worth seeing.',
    whyText:
      'From refined residences to active commercial assets, we match each client with a property that fits today and holds value tomorrow.',
    exclusive: 'Exclusive Projects',
    exclusiveText: 'We do not show everything on the market. We show what deserves attention.',
    all: 'All',
    onMap: 'On map',
    ready: 'Ready',
    residential: 'Residential',
    neighborhoods: 'Choose the right district',
    neighborhoodsText: 'Districts are curated by location, services, lifestyle, and price movement.',
    priceMap: 'Property prices in Saudi Arabia by location',
    sellBuy: 'Selling or buying?',
    sellBuyText: 'Every direction starts with Map Key. Add your property or tell us what you need, and we handle the rest.',
    request: 'Request property',
    add: 'Add property',
    articles: 'We do not publish filler. We share market knowledge.',
    articlesText: 'Clear articles that explain, warn, and read the Saudi market with an expert eye.',
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

const neighborhoods = [
  { image: '/images/art-3.jpg', ar: 'الملز', en: 'Al Malaz', metaAr: 'قلب الرياض التاريخي بروح عصرية', metaEn: 'Historic Riyadh with a modern pulse' },
  { image: '/images/proj-4.jpg', ar: 'الياسمين', en: 'Al Yasmin', metaAr: 'أبراج حديثة وخدمات مكتملة', metaEn: 'Modern towers and complete services' },
  { image: '/images/prop-7.jpg', ar: 'العقيق', en: 'Al Aqiq', metaAr: 'قريب من المراكز المالية', metaEn: 'Close to major business districts' },
]

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

type SearchTab = 'sale' | 'projects' | 'commercial'
type FilterKey = 'type' | 'rooms' | 'price' | 'status' | 'area'

const propertyOptions = {
  ar: ['شقة', 'تاون هاوس', 'دور', 'إستراحة', 'فيلا', 'شقة صغيرة (استوديو)', 'أرض', 'بنتهاوس'],
  en: ['Apartment', 'Townhouse', 'Floor', 'Rest house', 'Villa', 'Studio apartment', 'Land', 'Penthouse'],
}

const commercialOptions = {
  ar: ['مكتب', 'معرض', 'محل', 'مستودع', 'عمارة تجارية', 'أرض تجارية'],
  en: ['Office', 'Showroom', 'Retail', 'Warehouse', 'Commercial building', 'Commercial land'],
}

const roomOptions = ['الكل', 'استوديو', '2', '3', '4', '5', '6', '+7']
const roomOptionsEn = ['All', 'Studio', '2', '3', '4', '5', '6', '+7']
const bathOptions = ['الكل', '1', '2', '3', '4', '5', '6', '+7']
const bathOptionsEn = ['All', '1', '2', '3', '4', '5', '6', '+7']

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

function ProjectCard({ project, index, isRTL, locale }: { project: (typeof demoProjects)[number]; index: number; isRTL: boolean; locale: string }) {
  const [liked, setLiked] = useState(false)

  return (
    <motion.article
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group overflow-hidden rounded-[28px] bg-neutral-950 text-white shadow-2xl shadow-black/10"
    >
      <div className="relative h-[360px] md:h-[420px]">
        <Image src={project.image} alt={isRTL ? project.titleAr : project.title} fill sizes="(max-width: 1024px) 90vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/80" />
        <button
          type="button"
          onClick={() => setLiked((value) => !value)}
          className="absolute end-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur-xl transition hover:bg-white/25"
          aria-label="favorite"
        >
          <Heart className={cn('h-5 w-5', liked && 'fill-[#b99750] text-[#b99750]')} />
        </button>
        <div className="absolute start-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-black px-3 py-1 text-xs font-bold">{isRTL ? project.typeAr : project.type}</span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#8a6a2e]">{isRTL ? project.statusAr : project.status.replace('-', ' ')}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-black md:text-3xl">{isRTL ? project.titleAr : project.title}</h3>
          <p className="mt-2 flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4 text-[#d1ad63]" />
            {isRTL ? project.locationAr : project.location}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 text-sm">
            <span className="text-white/65">{copy[locale as 'ar' | 'en'].delivery}</span>
            <span className="font-bold">{isRTL ? project.deliveryDateAr : project.deliveryDate}</span>
            <span className="text-white/65">{copy[locale as 'ar' | 'en'].start}</span>
            <span className="font-bold text-[#d1ad63]">{formatPrice(project.startingPrice, 'SAR', locale)}</span>
          </div>
        </div>
      </div>
    </motion.article>
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
  const router = useRouter()
  const [tab, setTab] = useState<SearchTab>('sale')
  const [city, setCity] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null)
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    type: '',
    rooms: '',
    price: '',
    status: '',
    area: '',
  })
  const [subscribed, setSubscribed] = useState(false)
  const [mapMode, setMapMode] = useState<'residential' | 'commercial'>('residential')
  const [projectFilter, setProjectFilter] = useState('all')

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return demoProjects.slice(0, 3)
    if (projectFilter === 'commercial') return demoProjects.filter((p) => p.type === 'commercial').slice(0, 3)
    return demoProjects.slice(0, 3)
  }, [projectFilter])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const params = new URLSearchParams({ purpose: tab, city: city || 'all', ...filters })
    router.push(`/properties?${params.toString()}`)
  }

  const fieldLabels: Record<FilterKey, string> = {
    type: filters.type || t.type,
    rooms: filters.rooms || (isRTL ? 'غرف وحمامات' : 'Beds & baths'),
    price: filters.price || t.price,
    status: filters.status || t.projectStatus,
    area: filters.area || t.area,
  }

  const fieldsByTab: Record<SearchTab, FilterKey[]> = {
    sale: ['type', 'rooms', 'price'],
    projects: ['status', 'type', 'price'],
    commercial: ['type', 'area', 'price'],
  }

  const setFilter = (key: FilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const resetFilter = (key: FilterKey) => {
    setFilters((current) => ({ ...current, [key]: '' }))
  }

  const renderFilterPanel = () => {
    if (!activeFilter) return null

    if (activeFilter === 'price' || activeFilter === 'area') {
      const unit = activeFilter === 'price' ? '﷼' : t.sqm
      return (
        <div className="absolute inset-x-2 top-[calc(100%-4px)] z-30 rounded-b-3xl bg-white p-5 text-neutral-950 shadow-2xl md:inset-x-auto md:end-24 md:top-auto md:bottom-20 md:w-[530px] md:rounded-2xl">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <label className="flex h-16 items-center justify-between rounded-md border border-neutral-200 px-5 text-neutral-400">
              <span>{t.max}</span>
              <span className="text-neutral-500">{unit}</span>
            </label>
            <span className="h-px w-5 bg-neutral-200" />
            <label className="flex h-16 items-center justify-between rounded-md border border-neutral-200 px-5 text-neutral-400">
              <span>{t.min}</span>
              <span className="text-neutral-500">{unit}</span>
            </label>
          </div>
          <div className="mt-5 flex justify-end border-t border-neutral-200 pt-4">
            <button type="button" onClick={() => resetFilter(activeFilter)} className="rounded-full border border-neutral-200 px-7 py-3 font-bold">
              {t.reset}
            </button>
          </div>
        </div>
      )
    }

    if (activeFilter === 'rooms') {
      const rooms = isRTL ? roomOptions : roomOptionsEn
      const baths = isRTL ? bathOptions : bathOptionsEn
      return (
        <div className="absolute inset-x-2 top-[calc(100%-4px)] z-30 rounded-b-3xl bg-white p-5 text-neutral-950 shadow-2xl md:inset-x-0 md:top-auto md:bottom-20 md:rounded-2xl">
          <div className="text-start">
            <h3 className="mb-4 text-lg font-black">{isRTL ? 'الغرف' : 'Bedrooms'}</h3>
            <div className="flex flex-wrap gap-3">
              {rooms.map((item) => (
                <button key={item} type="button" onClick={() => setFilter('rooms', item)} className={cn('h-14 min-w-14 rounded-full border px-5 font-bold', filters.rooms === item || (!filters.rooms && item === rooms[0]) ? 'border-[#8fc64a] text-neutral-950' : 'border-neutral-200')}>
                  {item}
                </button>
              ))}
            </div>
            <h3 className="mb-4 mt-8 text-lg font-black">{t.bathrooms}</h3>
            <div className="flex flex-wrap gap-3">
              {baths.map((item) => (
                <button key={item} type="button" onClick={() => setFilter('rooms', `${filters.rooms || rooms[0]} / ${item}`)} className="h-14 min-w-14 rounded-full border border-neutral-200 px-5 font-bold">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    const options =
      activeFilter === 'status'
        ? [t.all, t.offPlan, t.readyProjects]
        : tab === 'commercial'
          ? commercialOptions[locale]
          : propertyOptions[locale]

    return (
      <div className="absolute inset-x-2 top-[calc(100%-4px)] z-30 max-h-72 overflow-y-auto rounded-b-3xl bg-white py-3 text-neutral-950 shadow-2xl md:inset-x-auto md:end-40 md:top-auto md:bottom-20 md:w-[270px] md:rounded-2xl">
        {options.map((item) => (
          <button key={item} type="button" onClick={() => setFilter(activeFilter, item)} className="block w-full px-7 py-3 text-start text-base transition hover:bg-[#f5f0e6]">
            {item}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-neutral-950">
      <section className="relative min-h-[720px] overflow-hidden bg-neutral-950 pt-24 text-white md:min-h-[820px]">
        <Image src="/images/proj-5.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
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
          <motion.p variants={reveal} className="mt-5 max-w-3xl text-base leading-8 text-white/75 sm:text-lg md:mt-7 md:text-2xl">
            {t.heroText}
          </motion.p>

          <motion.form
            variants={reveal}
            onSubmit={submitSearch}
            className="relative mt-10 w-full max-w-6xl rounded-[24px] bg-black/45 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-3 md:mt-14 md:rounded-[32px]"
          >
            <div className="grid grid-cols-3 overflow-hidden rounded-[18px] bg-white text-neutral-950 md:rounded-[24px]">
              {[
                ['sale', t.sale],
                ['projects', t.projects],
                ['commercial', t.commercial],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setTab(value as SearchTab)
                    setActiveFilter(null)
                  }}
                  className={cn('h-12 text-xs font-bold transition sm:h-14 sm:text-sm', tab === value ? 'bg-[#b99750] text-white' : 'hover:bg-neutral-100')}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-2 grid gap-px overflow-hidden rounded-[18px] bg-neutral-200 md:mt-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:rounded-[24px]">
              <label className="flex h-14 items-center gap-3 bg-white px-4 text-neutral-400 md:h-16 md:px-5">
                <Search className="h-5 w-5 text-neutral-950" />
                <input
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder={t.city}
                  className="w-full bg-transparent text-neutral-950 outline-none placeholder:text-neutral-400"
                />
              </label>
              {fieldsByTab[tab].map((field) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => setActiveFilter((current) => (current === field ? null : field))}
                  className="flex h-14 items-center justify-between bg-white px-4 text-sm text-neutral-400 md:h-16 md:px-5 md:text-base"
                >
                  <span>{fieldLabels[field]}</span>
                  <ChevronDown className={cn('h-4 w-4 transition', activeFilter === field && 'rotate-180')} />
                </button>
              ))}
              <button type="submit" className="h-14 bg-[#b99750] px-8 font-bold text-white transition hover:bg-[#a58742] md:h-16 md:px-10">
                {t.search}
              </button>
            </div>
            {renderFilterPanel()}
          </motion.form>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-32">
        <SectionTitle title={t.whyTitle} text={t.whyLead} />
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-[36px] bg-white p-8 shadow-xl shadow-black/5 md:p-12">
            <p className="text-xl leading-10 text-neutral-600">{t.whyText}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                [TrendingUp, isRTL ? 'قراءة سوق دقيقة' : 'Market insight'],
                [ShieldCheck, isRTL ? 'اختيار موثوق' : 'Trusted selection'],
                [Building2, isRTL ? 'مشاريع منتقاة' : 'Curated projects'],
              ].map(([Icon, label]) => (
                <div key={label as string} className="rounded-2xl border border-neutral-100 bg-[#fbfaf7] p-5">
                  <Icon className="mb-4 h-7 w-7 text-[#b99750]" />
                  <strong>{label as string}</strong>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative h-[320px] overflow-hidden rounded-[28px] md:h-[430px] md:rounded-[36px]">
            <Image src="/images/proj-1.jpg" alt="" fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
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
                ['map', t.onMap],
                ['ready', t.ready],
                ['residential', t.residential],
                ['commercial', t.commercial],
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
              <ProjectCard key={project.id} project={project} index={index} isRTL={isRTL} locale={locale} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <GoldButton href="/properties" light>
              {t.viewAll}
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </GoldButton>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-32">
        <SectionTitle title={isRTL ? 'عقارات مختارة' : 'Selected Properties'} text={isRTL ? 'واجهات بطاقات فاخرة، واضحة، ومهيأة للبحث والتصفية.' : 'Premium property cards ready for search and filtering.'} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {demoProperties.slice(0, 6).map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} isRTL={isRTL} locale={locale} />
          ))}
        </div>
      </section>

      <section className="bg-neutral-950 py-16 text-white md:py-32">
        <div className="container mx-auto px-4">
          <SectionTitle title={t.neighborhoods} text={t.neighborhoodsText} />
          <div className="grid gap-7 lg:grid-cols-3">
            {neighborhoods.map((item, index) => (
              <motion.article key={item.en} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group relative h-[360px] overflow-hidden rounded-[30px]">
                <Image src={item.image} alt={isRTL ? item.ar : item.en} fill sizes="(max-width: 1024px) 90vw, 33vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-7">
                  <h3 className="text-2xl font-black md:text-3xl">{isRTL ? item.ar : item.en}</h3>
                  <p className="mt-2 text-white/75">{isRTL ? item.metaAr : item.metaEn}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-32">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 lg:flex-row">
          <SectionTitle title={t.priceMap} align="start" />
          <div className="rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
            {[
              ['residential', t.residential],
              ['commercial', t.commercial],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setMapMode(value as typeof mapMode)}
                className={cn('rounded-full px-6 py-3 text-sm font-bold transition', mapMode === value ? 'bg-[#b99750] text-white' : 'text-neutral-600')}
              >
                {label}
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
              <p className="mt-1 text-neutral-400">{mapMode === 'residential' ? t.residential : t.commercial}</p>
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
              <GoldButton href="/properties/request">{t.request}</GoldButton>
              <GoldButton href="/properties/add" light>{t.add}</GoldButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle title={t.articles} text={t.articlesText} align="start" />
            <GoldButton href="/faq" light>
              {t.readMore}
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </GoldButton>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {demoArticles.slice(0, 3).map((article, index) => (
              <motion.article key={article.id} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[28px] border border-neutral-200 bg-white p-4">
                <div className="relative h-56 overflow-hidden rounded-[22px]">
                  <Image src={article.image} alt={isRTL ? article.titleAr : article.title} fill sizes="(max-width: 1024px) 90vw, 33vw" className="object-cover" />
                  <span className="absolute end-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold">{formatDate(article.date, locale)}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-black leading-8">{isRTL ? article.titleAr : article.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-neutral-500">{isRTL ? article.excerptAr : article.excerpt}</p>
                  <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f5f0e6] px-5 py-3 text-sm font-bold">
                    {t.readMore}
                    {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-32">
        <div className="overflow-hidden rounded-[34px] bg-neutral-950 text-white shadow-2xl shadow-black/10 lg:grid lg:grid-cols-[1.6fr_1fr]">
          <div className="relative min-h-[260px] md:min-h-[360px]">
            <Image src="/images/art-5.jpg" alt="" fill sizes="(max-width: 1024px) 90vw, 60vw" className="object-cover opacity-80" />
          </div>
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <Image src="/new_logo.svg" alt="Map Key" width={210} height={124} className="h-auto w-52" />
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
        <a href="tel:+966550000000" className="grid h-14 w-14 place-items-center rounded-full bg-neutral-950 text-white shadow-2xl md:h-16 md:w-16" aria-label={t.ask}>
          <HelpCircle className="h-6 w-6 md:h-7 md:w-7" />
        </a>
        <a href="https://wa.me/966550000000" className="grid h-14 w-14 place-items-center rounded-full bg-[#21c769] text-white shadow-2xl md:h-16 md:w-16" aria-label={t.whatsapp}>
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
        </a>
      </div>
    </div>
  )
}
