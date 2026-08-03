'use client'

import Image from 'next/image'
import { useParams, notFound } from 'next/navigation'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { CalendarDays, ChevronDown, MapPin, Phone, Tag } from 'lucide-react'
import { getProject, type Unit } from '@/lib/demo-projects'
import { formatPrice } from '@/lib/utils'

const PHONE = '+966541646755'
const WHATSAPP = '966541646755'

function SectionHead({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-2.5 w-10 rounded-full bg-[#b99750]" />
      <h2 className="text-2xl font-black text-neutral-950 md:text-3xl">{title}</h2>
    </div>
  )
}

function UnitRow({ unit, isRTL, locale, waLink }: { unit: Unit; isRTL: boolean; locale: string; waLink: (u: Unit) => string }) {
  const t = (ar: string, en: string) => (isRTL ? ar : en)
  const total = unit.area + unit.privateArea
  // ponytail: سعر 0 = لسه ما تحدد
  const price = unit.price ? formatPrice(unit.price, 'SAR', locale) : t('قريباً', 'Soon')

  return (
    <details className="group border-b border-neutral-200 last:border-0 open:bg-[#fbfaf7]">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 transition hover:bg-[#f5f0e6] md:px-6 [&::-webkit-details-marker]:hidden">
        <span className="grid h-11 w-14 shrink-0 place-items-center rounded-xl bg-neutral-950 text-sm font-black text-white">
          {unit.code}
        </span>
        <span className="min-w-0 flex-1 text-sm font-bold text-neutral-950 md:text-base">
          {isRTL ? unit.floorAr : unit.floor}
        </span>
        <span className="hidden w-28 shrink-0 text-sm text-neutral-500 sm:block">
          {unit.area} {t('م²', 'm²')}
        </span>
        <span className="hidden w-24 shrink-0 text-sm text-neutral-500 sm:block">
          {unit.rooms} {t('غرف', 'rooms')}
        </span>
        <span className="shrink-0 text-sm font-black text-[#8a6a2e] md:text-base">
          {unit.priceFrom && unit.price > 0 && (
            <span className="me-1 text-xs font-normal text-neutral-400">{t('تبدأ من', 'from')}</span>
          )}
          {price}
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-neutral-400 transition group-open:rotate-180" />
      </summary>

      <div className="grid gap-4 px-4 pb-6 md:grid-cols-[1.6fr_1fr] md:px-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-neutral-200 bg-white p-5 text-sm">
          {[
            [t('الدور', 'Floor'), isRTL ? unit.floorAr : unit.floor],
            [t('المساحة', 'Area'), `${unit.area} ${t('م²', 'm²')}`],
            [t('المساحة الخاصة', 'Private area'), `${unit.privateArea} ${t('م²', 'm²')}`],
            [t('إجمالي المساحة', 'Total area'), `${total.toFixed(2)} ${t('م²', 'm²')}`],
            [t('الغرف', 'Rooms'), String(unit.rooms)],
            [
              t('السعر', 'Price'),
              `${unit.priceFrom && unit.price > 0 ? t('تبدأ من ', 'from ') : ''}${price}`,
            ],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-2">
              <dt className="text-neutral-500">{label}</dt>
              <dd className="font-bold text-neutral-950">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5">
          <p className="text-sm leading-7 text-neutral-500">
            {t('عندك اهتمام بالوحدة؟ تواصل مع أحد مسؤولي المبيعات', 'Interested in this unit? Talk to a sales agent')}
          </p>
          <a
            href={waLink(unit)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#25a35a] px-5 text-sm font-bold text-white transition hover:bg-[#1f8c4d]"
          >
            {t('واتساب', 'WhatsApp')}
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-neutral-200 px-5 text-sm font-bold text-neutral-950 transition hover:border-[#b99750]"
          >
            <Phone className="h-4 w-4 text-[#b99750]" />
            {t('مكالمة هاتفية', 'Call us')}
          </a>
        </div>
      </div>
    </details>
  )
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'
  const t = (ar: string, en: string) => (isRTL ? ar : en)
  const project = getProject(id)

  if (!project) notFound()

  const title = isRTL ? project.titleAr : project.title
  const waLink = (unit: Unit) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      isRTL
        ? `مرحباً، مهتم بالوحدة ${unit.code} في مشروع ${project.titleAr}`
        : `Hello, I'm interested in unit ${unit.code} at ${project.title}`
    )}`

  return (
    <div className="min-h-screen bg-[#f8f7f4] pb-20 text-neutral-950">
      <section className="relative min-h-[520px] overflow-hidden bg-neutral-950 pt-32 text-white md:min-h-[600px] md:pt-40">
        <Image src={project.image} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/90" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="container relative z-10 mx-auto px-4 pb-12"
        >
          <span className="inline-flex rounded-full bg-[#b99750] px-4 py-1.5 text-xs font-bold">
            {isRTL ? project.typeAr : project.type}
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{title}</h1>
          <p className="mt-4 flex items-center gap-2 text-lg text-white/85">
            <MapPin className="h-5 w-5 text-[#d1ad63]" />
            {isRTL ? project.locationAr : project.location}
          </p>

          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl">
              <CalendarDays className="h-5 w-5 shrink-0 text-[#d1ad63]" />
              <span className="text-white/70">{t('موعد التسليم', 'Delivery')}</span>
              <strong className="ms-auto">{isRTL ? project.deliveryDateAr : project.deliveryDate}</strong>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl">
              <Tag className="h-5 w-5 shrink-0 text-[#d1ad63]" />
              <span className="text-white/70">{t('تبدأ الأسعار', 'Starting from')}</span>
              <strong className="ms-auto text-[#d1ad63]">
                {project.startingPrice ? formatPrice(project.startingPrice, 'SAR', locale) : t('قريباً', 'Soon')}
              </strong>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t(`مرحباً، أرغب بملف مشروع ${project.titleAr}`, `Hello, I'd like the ${project.title} project file`))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#25a35a] px-7 text-sm font-bold text-white transition hover:bg-[#1f8c4d]"
            >
              {t('استلم ملف المشروع', 'Get project file')}
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/20"
            >
              <Phone className="h-4 w-4" />
              {t('مكالمة هاتفية', 'Call us')}
            </a>
          </div>
        </motion.div>
      </section>

      {project.units.length > 0 && (
        <section className="container mx-auto px-4 py-14 md:py-20">
          <SectionHead title={t('جدول الوحدات', 'Units')} />
          <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
            <div className="hidden items-center gap-3 border-b border-neutral-200 bg-[#fbfaf7] px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-400 sm:flex">
              <span className="w-14 shrink-0">{t('الوحدة', 'Unit')}</span>
              <span className="flex-1">{t('الدور', 'Floor')}</span>
              <span className="w-28 shrink-0">{t('المساحة', 'Area')}</span>
              <span className="w-24 shrink-0">{t('الغرف', 'Rooms')}</span>
              <span className="shrink-0">{t('السعر', 'Price')}</span>
              <span className="w-5 shrink-0" />
            </div>
            {project.units.map((unit) => (
              <UnitRow key={`${unit.floor}-${unit.code}`} unit={unit} isRTL={isRTL} locale={locale} waLink={waLink} />
            ))}
          </div>
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="container mx-auto px-4 pb-14 md:pb-20">
          <SectionHead title={t('صور المشروع', 'Project gallery')} />
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {project.gallery.map((src, index) => (
              <div
                key={src + index}
                className="relative h-64 w-[85%] shrink-0 snap-center overflow-hidden rounded-[24px] md:h-[460px] md:w-[70%]"
              >
                <Image src={src} alt={`${title} ${index + 1}`} fill sizes="80vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {project.plans.length > 0 && (
        <section className="container mx-auto px-4 pb-14 md:pb-20">
          <SectionHead title={t('مخططات المشروع', 'Project plans')} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {project.plans.map((src, index) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-56 overflow-hidden rounded-[20px] border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Image src={src} alt={`${t('مخطط', 'Plan')} ${index + 1}`} fill sizes="25vw" className="object-contain p-3" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
