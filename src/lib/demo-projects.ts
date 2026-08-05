export interface Unit {
  code: string
  floorAr: string
  floor: string
  /** م² */
  area: number
  /** المساحة الخاصة م² */
  privateArea: number
  rooms: number
  price: number
  /** السعر "يبدأ من" بدل سعر ثابت */
  priceFrom?: boolean
  status: 'available' | 'reserved' | 'sold'
}

export interface Project {
  id: string
  image: string
  gallery: string[]
  /** مخططات المشروع - ضع ملفات الصور في public/images ثم أضف مساراتها هنا */
  plans: string[]
  title: string
  titleAr: string
  location: string
  locationAr: string
  type: string
  typeAr: string
  deliveryDate: string
  deliveryDateAr: string
  startingPrice: number
  descriptionAr?: string
  description?: string
  units: Unit[]
}

// ponytail: الوحدات المتكررة تعيد استخدام نفس المواصفات بدل تكرار الكتابة
const spec = (
  floorAr: string,
  floor: string,
  area: number,
  rooms: number,
  price: number
) => ({ floorAr, floor, area, privateArea: 0, rooms, price, status: 'available' as const })

const A_GROUND = spec('أرضي + قبو', 'Ground + Basement', 301.43, 4, 1_099_000)
const A_GROUND_2 = spec('أرضي + قبو', 'Ground + Basement', 301.43, 4, 1_149_000)
const B_FIRST = spec('دور أول', 'First floor', 169.27, 4, 849_000)
const B_FIRST_2 = spec('دور أول', 'First floor', 169.27, 4, 889_000)
const C_ROOF = spec('ملحق علوي', 'Rooftop annex', 161.33, 1, 689_000)
const C_ROOF_2 = spec('ملحق علوي', 'Rooftop annex', 161.33, 1, 889_000)

const doraSafaUnits: Unit[] = [
  { code: '1B', ...spec('دور أول (زاوية)', 'First floor (corner)', 171.69, 4, 989_000) },
  { code: '1C', ...spec('ملحق علوي (زاوية)', 'Rooftop annex (corner)', 161.45, 1, 790_000) },
  { code: '2A', ...A_GROUND },
  { code: '2C', ...C_ROOF },
  { code: '3A', ...A_GROUND },
  { code: '3B', ...B_FIRST },
  { code: '3C', ...B_FIRST },
  { code: '4A', ...A_GROUND_2 },
  { code: '4B', ...B_FIRST_2 },
  { code: '4C', ...C_ROOF_2 },
  { code: '5A', ...A_GROUND_2 },
  { code: '5B', ...B_FIRST_2 },
  { code: '6B', ...B_FIRST },
  { code: '7A', ...A_GROUND },
  { code: '8A', ...A_GROUND },
  { code: '8B', ...B_FIRST },
]

// سكون 10، 11 - حي العارض: كل الشقق غرفتين والسعر يبدأ من 999,000
const sukoonUnit = (code: string, floorAr: string, floor: string, area: number): Unit => ({
  code,
  floorAr,
  floor,
  area,
  privateArea: 0,
  rooms: 2,
  price: 999_000,
  priceFrom: true,
  status: 'available',
})

const sukoonUnits: Unit[] = [
  ...([
    ['A01-G', 147],
    ['A02-G', 140],
    ['A03-G', 149],
    ['A04-G', 146],
    ['A05-G', 140],
    ['A06-G', 170],
    ['A07-G', 150],
  ] as const).map(([code, area]) => sukoonUnit(code, 'الدور الأول', 'First floor', area)),
  ...([
    ['B01', 150],
    ['B02', 155],
    ['CB2', 162],
    ['B03', 156],
    ['CB4', 202],
    ['B05', 190],
  ] as const).map(([code, area]) => sukoonUnit(code, 'الدور الثاني', 'Second floor', area)),
  ...([
    ['C1', 149],
    ['C2', 170],
    ['C3', 184],
  ] as const).map(([code, area]) => sukoonUnit(code, 'الدور الثاني', 'Second floor', area)),
  ...([
    ['D1', 167],
    ['D2', 154],
    ['D3', 198],
  ] as const).map(([code, area]) => sukoonUnit(code, 'الملحق', 'Annex', area)),
]

// سكون 12 - حي بريدة: 5 أدوار × 5 وحدات + الملحق، غرفتين، السعر غير محدد بعد
const sukoon12Unit = (code: string, floorAr: string, floor: string, area: number): Unit => ({
  code,
  floorAr,
  floor,
  area,
  privateArea: 0,
  rooms: 2,
  price: 0,
  status: 'available',
})

const SUKOON12_FLOOR_UNITS = [
  ['B01', 160],
  ['B02', 142],
  ['B03', 109],
  ['B04', 123],
  ['B05', 168],
] as const

const sukoon12Units: Unit[] = [
  ...([
    ['الدور الأول', 'First floor'],
    ['الدور الثاني', 'Second floor'],
    ['الدور الثالث', 'Third floor'],
    ['الدور الرابع', 'Fourth floor'],
    ['الدور الخامس', 'Fifth floor'],
  ] as const).flatMap(([floorAr, floor]) =>
    SUKOON12_FLOOR_UNITS.map(([code, area]) => sukoon12Unit(code, floorAr, floor, area))
  ),
  // ponytail: الملحق - الملف يذكر 4 وحدات لكن B07 مكرر فيه، فالمتوفر 3 بمساحاتها
  ...([
    ['B06', 157],
    ['B07', 165],
    ['B08', 134],
  ] as const).map(([code, area]) => sukoon12Unit(code, 'الملحق', 'Annex', area)),
]

export const demoProjects: Project[] = [
  {
    id: 'dora-safa',
    image: '/images/projects/dora-safa/gallery-01.jpg',
    gallery: [
      '/images/projects/dora-safa/gallery-01.jpg',
      '/images/projects/dora-safa/gallery-02.jpg',
      '/images/projects/dora-safa/gallery-03.jpg',
    ],
    plans: [
      '/images/projects/dora-safa/plan-01.jpg',
      '/images/projects/dora-safa/plan-02.jpg',
      '/images/projects/dora-safa/plan-03.jpg',
    ],
    title: 'Dora - Al Safa District',
    titleAr: 'دورا - حي الصفا',
    location: 'Riyadh - Al Safa District',
    locationAr: 'الرياض - حي الصفا',
    type: 'Floors',
    typeAr: 'أدوار',
    deliveryDate: '07-2027',
    deliveryDateAr: '7-2027م',
    startingPrice: 689000,
    units: doraSafaUnits,
  },
  {
    id: 'sukoon-arid',
    image: '/images/proj-2.jpg',
    gallery: ['/images/proj-2.jpg'],
    plans: [],
    title: 'Sukoon 10, 11 - Al Arid District',
    titleAr: 'سكون 10، 11 - حي العارض',
    location: 'Riyadh - Al Arid District',
    locationAr: 'الرياض - حي العارض',
    type: 'Apartments',
    typeAr: 'شقق',
    deliveryDate: 'Ready',
    deliveryDateAr: 'جاهز',
    startingPrice: 999000,
    units: sukoonUnits,
  },
  {
    id: 'sukoon-buraydah',
    image: '/images/projects/sukoon-12/gallery-01.jpg',
    gallery: [
      '/images/projects/sukoon-12/gallery-01.jpg',
      '/images/projects/sukoon-12/gallery-02.jpg',
      '/images/projects/sukoon-12/gallery-03.jpg',
    ],
    plans: Array.from({ length: 8 }, (_, index) =>
      `/images/projects/sukoon-12/plan-${String(index + 1).padStart(2, '0')}.jpg`
    ),
    title: 'Sukoon 12 - Buraydah District',
    titleAr: 'سكون 12 - حي بريدة بالقصيم',
    location: 'Buraydah - Al Qassim',
    locationAr: 'بريدة - القصيم',
    type: 'Apartments',
    typeAr: 'شقق',
    deliveryDate: 'Ready',
    deliveryDateAr: 'جاهز',
    startingPrice: 0,
    units: sukoon12Units,
  },
  {
    id: 'project-4',
    image: '/images/proj-4.jpg',
    gallery: ['/images/proj-4.jpg'],
    plans: [],
    title: 'Project 4',
    titleAr: 'المشروع الرابع',
    location: 'Riyadh',
    locationAr: 'الرياض',
    type: 'Floors',
    typeAr: 'أدوار',
    deliveryDate: 'Soon',
    deliveryDateAr: 'قريباً',
    startingPrice: 0,
    units: [],
  },
]

export const getProject = (id: string) => demoProjects.find((p) => p.id === id)
