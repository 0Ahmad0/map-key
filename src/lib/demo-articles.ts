export interface Article {
  id: string
  image: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  category: 'market' | 'legal' | 'investment' | 'tech'
  categoryAr: string
  readTime: number
  author: string
  authorAr: string
  authorAvatar: string
  featured: boolean
  date: string
}

export const demoArticles: Article[] = [
  {
    id: 'a1',
    image: '/images/art-1.jpg',
    title: 'Saudi Real Estate Market Hits Record SAR 150B in Q2 2026',
    titleAr: 'سوق العقارات السعودي يسجل 150 مليار ريال في الربع الثاني 2026',
    excerpt: 'The Saudi real estate market continues its unprecedented growth trajectory, driven by Vision 2030 mega-projects and rising foreign investment.',
    excerptAr: 'يواصل سوق العقارات السعودي مساره النمو غير المسبوق، مدفوعاً بمشاريع رؤية 2030 العملاقة وزيادة الاستثمار الأجنبي.',
    category: 'market',
    categoryAr: 'السوق',
    readTime: 4,
    author: 'Sarah Al-Otaibi',
    authorAr: 'سارة العتيبي',
    authorAvatar: 'SA',
    featured: true,
    date: '2026-07-08',
  },
  {
    id: 'a2',
    image: '/images/art-2.jpg',
    title: 'New Real Estate Law: What Investors Need to Know',
    titleAr: 'قانون العقارات الجديد: ما يحتاج المستثمرون معرفته',
    excerpt: 'Recent regulatory changes introduce stronger protection for buyers and streamlined processes for foreign ownership in designated zones.',
    excerptAr: 'تغييرات تنظيمية حديثة تقدم حماية أقوى للمشترين وتبسيط الإجراءات للملكية الأجنبية في المناطق المخصصة.',
    category: 'legal',
    categoryAr: 'قانوني',
    readTime: 6,
    author: 'Khalid Al-Rashid',
    authorAr: 'خالد الراشد',
    authorAvatar: 'KR',
    featured: true,
    date: '2026-07-05',
  },
  {
    id: 'a3',
    image: '/images/art-3.jpg',
    title: 'Top 5 Emerging Neighborhoods for Investment in Riyadh',
    titleAr: 'أفضل 5 أحياء ناشئة للاستثمار في الرياض',
    excerpt: 'Analysis of the most promising districts showing highest ROI potential based on infrastructure development and population growth.',
    excerptAr: 'تحليل لأكثر الأحياء الواعدة التي تظهر أعلى عائد استثماري بناءً على تطور البنية التحتية والنمو السكاني.',
    category: 'investment',
    categoryAr: 'استثمار',
    readTime: 5,
    author: 'Noura Al-Saud',
    authorAr: 'نورة آل سعود',
    authorAvatar: 'NS',
    featured: true,
    date: '2026-07-01',
  },
  {
    id: 'a4',
    image: '/images/art-4.jpg',
    title: 'PropTech: How AI is Transforming Property Management',
    titleAr: 'التكنولوجيا العقارية: كيف يحول الذكاء الاصطناعي إدارة العقارات',
    excerpt: 'From smart contracts to predictive maintenance, discover how technology is revolutionizing the real estate landscape.',
    excerptAr: 'من العقود الذكية إلى الصيانة التنبؤية، اكتشف كيف تغير التكنولوجيا مشهد العقارات.',
    category: 'tech',
    categoryAr: 'تقنية',
    readTime: 3,
    author: 'Faisal Al-Harbi',
    authorAr: 'فيصل الحربي',
    authorAvatar: 'FH',
    featured: false,
    date: '2026-06-28',
  },
  {
    id: 'a5',
    image: '/images/art-5.jpg',
    title: 'NEOM Project Update: Residential Phase Now Open for Investment',
    titleAr: 'تحديث مشروع نيوم: المرحلة السكنية مفتوحة الآن للاستثمار',
    excerpt: 'NEOM announces the launch of its first residential district, offering exclusive investment opportunities in the $500B mega-city.',
    excerptAr: 'نيوم تعلن إطلاق أول منطقة سكنية، مما يتيح فرص استثمارية حصرية في المدينة العملاقة.',
    category: 'market',
    categoryAr: 'السوق',
    readTime: 7,
    author: 'Sarah Al-Otaibi',
    authorAr: 'سارة العتيبي',
    authorAvatar: 'SA',
    featured: false,
    date: '2026-06-25',
  },
]

export const articleCategories = [
  { value: 'all', label: 'All', labelAr: 'الكل' },
  { value: 'market', label: 'Market', labelAr: 'السوق' },
  { value: 'legal', label: 'Legal', labelAr: 'قانوني' },
  { value: 'investment', label: 'Investment', labelAr: 'استثمار' },
  { value: 'tech', label: 'Technology', labelAr: 'تقنية' },
]
