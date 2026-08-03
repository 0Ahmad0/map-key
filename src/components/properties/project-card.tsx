'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Heart, MapPin } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn, formatPrice } from '@/lib/utils'
import type { Project } from '@/lib/demo-projects'

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'
  const [liked, setLiked] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group overflow-hidden rounded-[28px] bg-neutral-950 text-white shadow-2xl shadow-black/10"
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative h-[360px] md:h-[420px]">
          <Image
            src={project.image}
            alt={isRTL ? project.titleAr : project.title}
            fill
            sizes="(max-width: 1024px) 90vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/80" />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setLiked((value) => !value)
            }}
            className="absolute end-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur-xl transition hover:bg-white/25"
            aria-label="favorite"
          >
            <Heart className={cn('h-5 w-5', liked && 'fill-[#b99750] text-[#b99750]')} />
          </button>
          <span className="absolute start-5 top-5 rounded-full bg-black px-3 py-1 text-xs font-bold">
            {isRTL ? project.typeAr : project.type}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-black md:text-3xl">{isRTL ? project.titleAr : project.title}</h3>
            <p className="mt-2 flex items-center gap-2 text-white/80">
              <MapPin className="h-4 w-4 text-[#d1ad63]" />
              {isRTL ? project.locationAr : project.location}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 text-sm">
              <span className="text-white/65">{isRTL ? 'موعد التسليم' : 'Delivery'}</span>
              <span className="font-bold">{isRTL ? project.deliveryDateAr : project.deliveryDate}</span>
              <span className="text-white/65">{isRTL ? 'تبدأ الأسعار' : 'Starting from'}</span>
              <span className="font-bold text-[#d1ad63]">
                {project.startingPrice ? formatPrice(project.startingPrice, 'SAR', locale) : isRTL ? 'قريباً' : 'Soon'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
