export interface Project {
  id: string
  image: string
  title: string
  titleAr: string
  location: string
  locationAr: string
  type: 'residential' | 'commercial' | 'mixed'
  typeAr: string
  deliveryDate: string
  deliveryDateAr: string
  startingPrice: number
  developer: string
  developerAr: string
  status: 'available' | 'selling-fast' | 'coming-soon'
  statusAr: string
}

export const demoProjects: Project[] = [
  {
    id: 'p1',
    image: '/images/proj-1.jpg',
    title: 'The Oasis Residences',
    titleAr: 'واحة السكن',
    location: 'Riyadh, North Ring Road',
    locationAr: 'الرياض، طريق الدائري الشمالي',
    type: 'residential',
    typeAr: 'شقق',
    deliveryDate: 'Q1 2027',
    deliveryDateAr: 'الربع الأول 2027',
    startingPrice: 850000,
    developer: 'Dar Al Arkan',
    developerAr: 'دار الأركان',
    status: 'selling-fast',
    statusAr: 'ينفد بسرعة',
  },
  {
    id: 'p2',
    image: '/images/proj-2.jpg',
    title: 'Jeddah Tower View',
    titleAr: 'إطلالة برج جدة',
    location: 'Jeddah, Corniche',
    locationAr: 'جدة، الكورنيش',
    type: 'mixed',
    typeAr: 'استخدامات متعددة',
    deliveryDate: 'Q3 2026',
    deliveryDateAr: 'الربع الثالث 2026',
    startingPrice: 1200000,
    developer: 'Emaar The Economic City',
    developerAr: 'إعمار المدينة الاقتصادية',
    status: 'available',
    statusAr: 'متاح',
  },
  {
    id: 'p3',
    image: '/images/proj-3.jpg',
    title: 'Al Yasmin Office Park',
    titleAr: 'ياسين بارك للمكاتب',
    location: 'Riyadh, Al Yasmin District',
    locationAr: 'الرياض، حي الياسمين',
    type: 'commercial',
    typeAr: 'مكاتب',
    deliveryDate: 'Q2 2027',
    deliveryDateAr: 'الربع الثاني 2027',
    startingPrice: 2200000,
    developer: 'Roshn Group',
    developerAr: 'مجموعة روشن',
    status: 'coming-soon',
    statusAr: 'قريباً',
  },
  {
    id: 'p4',
    image: '/images/proj-4.jpg',
    title: 'Red Sea Luxury Resorts',
    titleAr: 'منتجعات البحر الأحمر الفاخرة',
    location: 'Umluj, Red Sea Coast',
    locationAr: 'أملج، ساحل البحر الأحمر',
    type: 'residential',
    typeAr: 'شقق',
    deliveryDate: 'Q4 2028',
    deliveryDateAr: 'الربع الرابع 2028',
    startingPrice: 3500000,
    developer: 'Red Sea Global',
    developerAr: 'البحر الأحمر العالمية',
    status: 'available',
    statusAr: 'متاح',
  },
  {
    id: 'p5',
    image: '/images/proj-5.jpg',
    title: 'KAFD Business Hub',
    titleAr: 'مركز الأعمال في كافد',
    location: 'Riyadh, KAFD',
    locationAr: 'الرياض، مركز الملك عبد الله المالي',
    type: 'commercial',
    typeAr: 'مكاتب',
    deliveryDate: 'Q1 2026',
    deliveryDateAr: 'الربع الأول 2026',
    startingPrice: 5000000,
    developer: 'KAFD DMC',
    developerAr: 'كافد لإدارة المراكز',
    status: 'selling-fast',
    statusAr: 'ينفد بسرعة',
  },
  {
    id: 'p6',
    image: '/images/proj-6.jpg',
    title: 'Diriyah Gate Village',
    titleAr: 'قرية بوابة الدرعية',
    location: 'Riyadh, Diriyah',
    locationAr: 'الرياض، الدرعية',
    type: 'mixed',
    typeAr: 'استخدامات متعددة',
    deliveryDate: 'Q3 2027',
    deliveryDateAr: 'الربع الثالث 2027',
    startingPrice: 1800000,
    developer: 'Diriyah Company',
    developerAr: 'شركة الدرعية',
    status: 'coming-soon',
    statusAr: 'قريباً',
  },
]
