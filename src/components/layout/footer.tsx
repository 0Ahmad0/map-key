'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Mail, MapPin, Phone, Send } from 'lucide-react'

const phone = '+966 54 164 6755'
const phoneHref = 'tel:+966541646755'
const extraPhone = '+966 50 181 0061'
const extraPhoneHref = 'tel:+966501810061'
const email = 'mapkey.sa@outlook.com'

const content = {
  ar: {
    summary: 'منصة عقارية سعودية تقرأ السوق بعين خبيرة، وتعرض فرصاً مختارة للسكن والاستثمار.',
    address: 'طريق الإمام سعود بن فيصل، حي الصحافة، الرياض',
    quick: 'روابط أخرى',
    projects: 'المشاريع',
    properties: 'عقارات',
    rights: 'جميع الحقوق محفوظة',
    links: ['تواصل معنا', 'الاقتراحات والشكاوى', 'الأسئلة الشائعة', 'الشروط والأحكام', 'سياسة الخصوصية', 'المدونة'],
    projectLinks: ['مشاريع على الخريطة في الرياض', 'مشاريع جاهزة في الرياض', 'شقق للبيع في الرياض', 'مشاريع حصرية للبيع في الرياض', 'تجاري للبيع في الرياض'],
    propertyLinks: ['وحدات رخيصة للبيع', 'وحدات تجارية للإيجار', 'مكاتب للإيجار', 'محلات للإيجار', 'فلل فاخرة للبيع'],
  },
  en: {
    summary: 'A Saudi real estate platform that reads the market with expert judgment and presents curated opportunities.',
    address: 'Imam Saud Bin Faisal Road, Al Sahafa, Riyadh',
    quick: 'Other Links',
    projects: 'Projects',
    properties: 'Properties',
    rights: 'All rights reserved',
    links: ['Contact us', 'Suggestions and complaints', 'FAQ', 'Terms and conditions', 'Privacy policy', 'Blog'],
    projectLinks: ['Projects on map in Riyadh', 'Ready projects in Riyadh', 'Apartments for sale in Riyadh', 'Exclusive projects in Riyadh', 'Commercial for sale in Riyadh'],
    propertyLinks: ['Affordable units for sale', 'Commercial units for rent', 'Offices for rent', 'Retail shops for rent', 'Luxury villas for sale'],
  },
}

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-6 text-xl font-black text-neutral-950">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item}>
            <Link href="/properties" className="text-neutral-600 transition hover:text-[#a58742]">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const locale = useLocale() as 'ar' | 'en'
  const t = content[locale]

  return (
    <footer className="bg-white">
      <div className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-[1.1fr_1.4fr_.8fr]">
        <div>
          <Image src="/new_logo.svg" alt="Map Key" width={220} height={130} className="h-auto w-52" />
          <p className="mt-6 max-w-sm text-lg leading-8 text-neutral-600">{t.summary}</p>
          <div className="mt-8 space-y-4 text-neutral-700">
            <a href={phoneHref} className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#b99750]" />
              {phone}
            </a>
            <a href={extraPhoneHref} className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#b99750]" />
              {extraPhone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#b99750]" />
              {email}
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#b99750]" />
              {t.address}
            </p>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-1">
          <Column title={t.quick} items={t.links} />
        </div>

        <div className="rounded-[28px] bg-neutral-950 p-7 text-white">
          <h3 className="text-2xl font-black">{locale === 'ar' ? 'ابقَ على اطلاع' : 'Stay updated'}</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            {locale === 'ar' ? 'استقبل أحدث الفرص والتحليلات العقارية.' : 'Receive new opportunities and market notes.'}
          </p>
          <form className="mt-6 flex overflow-hidden rounded-2xl bg-white">
            <input type="email" required placeholder="email@example.com" className="min-w-0 flex-1 px-4 text-neutral-950 outline-none" />
            <button className="grid h-14 w-14 place-items-center bg-[#b99750]" aria-label="Subscribe">
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="bg-neutral-950">
        <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-4 py-6 text-white md:flex-row">
          <p className="text-sm">
            {t.rights} © {new Date().getFullYear()} Map Key
          </p>
          <div className="flex gap-3">
            {[
              ['X', 'https://x.com/MapkeySa'],
              ['TT', 'https://www.tiktok.com/@mapkeysa'],
              ['@', `mailto:${email}`],
            ].map(([label, href]) => (
              <a key={label} href={href} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-sm font-bold transition hover:border-[#b99750] hover:text-[#d1ad63]">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
