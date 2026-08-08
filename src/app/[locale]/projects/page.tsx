'use client'

import { useLocale } from 'next-intl'
import { ProjectCard } from '@/components/properties/project-card'
import { demoProjects } from '@/lib/demo-projects'

export default function ProjectsPage() {
  const locale = useLocale() as 'ar' | 'en'
  const isRTL = locale === 'ar'

  return (
    <div className="min-h-screen bg-[#f8f7f4] pb-20 pt-40 text-neutral-950 md:pt-44">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-[#b99750]" />
          <h1 className="text-3xl font-black md:text-5xl">{isRTL ? 'مشاريعنا' : 'Our Projects'}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-neutral-500 md:text-lg">
            {isRTL
              ? 'مشاريع سكنية مختارة في الرياض، تصفح الوحدات والمخططات والأسعار.'
              : 'Selected residential projects in Riyadh — browse units, plans and prices.'}
          </p>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {demoProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
