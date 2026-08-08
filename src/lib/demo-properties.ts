import type { Property } from '@/types'

const listing = (data: Omit<Property, 'currency' | 'status' | 'featured' | 'createdAt' | 'updatedAt'>): Property => ({ ...data, currency: 'SAR', status: 'available', featured: false, createdAt: '2026-08-09', updatedAt: '2026-08-09' })
const images = (folder: number, count: number) => Array.from({ length: count }, (_, i) => `/images/listings/${folder}-${String(i + 1).padStart(2, '0')}.jpeg`)

export const demoProperties: Property[] = [
  listing({ id: 'al-majdiah-109', title: 'Luxury Apartment - Al Majdiah 109', titleAr: 'شقة فاخرة في حي الريان – مشروع الماجدية 109', description: 'Move-in-ready premium apartment with 3 bedrooms, 4 bathrooms, an ALBA-equipped kitchen, a maid’s room and 6 installed air conditioners.', descriptionAr: 'شقة راقية بتشطيبات فاخرة، جاهزة للسكن، تجمع بين الأناقة والعملية في عمارة هادئة. تضم 3 غرف، و4 حمامات، وصالة واسعة، ومطبخاً مجهزاً بالكامل بأجهزة ALBA، وغرفة خادمة بحمام خاص، و6 مكيفات راكبة.', price: 87_000, location: 'Al Rayyan, Riyadh', locationAr: 'حي الريان، الرياض', mapLocation: '24.708697,46.768366', lat: 24.708697, lng: 46.768366, area: 0, bedrooms: 3, bathrooms: 4, images: images(1, 5), priceNoteAr: '/سنوي', priceNote: '/yr', type: 'rent' }),
  listing({ id: 'al-nakheel-apartment', title: 'Premium Apartment in Al Nakheel', titleAr: 'شقة مميزة للإيجار في حي النخيل', description: 'Premium apartment with concealed and split air conditioning, a fitted kitchen and private parking.', descriptionAr: 'شقة مميزة للإيجار في حي النخيل الشرقي، بها مكيفات مخفية وسبليت، ومطبخ راكب، وموقف خاص، في موقع مميز لعشاق التميز.', price: 150_000, location: 'Prince Abdulilah Bin Abdulaziz St, Al Nakheel, Riyadh', locationAr: 'شارع الأمير عبدالإله بن عبدالعزيز، حي النخيل، الرياض', mapLocation: '24.743984,46.650038', lat: 24.743984, lng: 46.650038, area: 0, bedrooms: 3, bathrooms: 0, images: images(2, 3), priceNoteAr: '/سنوي', priceNote: '/yr', type: 'rent' }),
  listing({ id: 'offices-zone', title: 'First Projects - Offices Zone', titleAr: 'مشروع المشاريع الأولى – Offices Zone', description: 'Offices 206 and 207 on the second floor, with a combined area of 575 m², directly on King Abdullah Road.', descriptionAr: 'مكتبان رقم 206 و207 في الدور الثاني، بمساحة إجمالية 575 م²، على طريق الملك عبدالله مباشرة.', price: 2_000, location: 'King Abdullah Rd, Al Nuzha, Riyadh', locationAr: 'طريق الملك عبدالله، حي النزهة، الرياض', mapLocation: '24.746551,46.706826', lat: 24.746551, lng: 46.706826, area: 575, bedrooms: 0, bathrooms: 0, images: images(3, 5), priceNoteAr: '/م² سنوي', priceNote: '/m² yr', type: 'rent' }),
  listing({ id: 'adal-apartment', title: 'Residential Apartment - Adal Project', titleAr: 'شقة سكنية في مشروع أدل', description: 'Seventh-floor apartment with a direct lake view, 3 bedrooms, a majlis, an American kitchen and 2 bathrooms.', descriptionAr: 'شقة سكنية في الدور السابع بإطلالة مباشرة على البحيرة، تتكون من 3 غرف نوم، ومجلس، ومطبخ أمريكي، ودورتي مياه.', price: 90_000, location: 'Adal Project, Eastern Province', locationAr: 'مشروع أدل، المنطقة الشرقية', mapLocation: '26.22519874572754,50.21672058105469', lat: 26.22519874572754, lng: 50.21672058105469, area: 168.21, bedrooms: 3, bathrooms: 2, images: images(4, 7), priceNoteAr: '/سنوي', priceNote: '/yr', type: 'rent' }),
  listing({ id: 'al-rawdah-villa', title: 'Villa for Sale in Al Rawdah', titleAr: 'فيلا للبيع في حي الروضة', description: 'A 900 m² south-facing villa on a 15 m street, with generous reception and living spaces across three levels.', descriptionAr: 'فيلا بمساحة 900 م² وواجهة جنوبية على شارع بعرض 15م. الدور الأرضي: صالة واسعة، مجلسان، ديوانية، مقلط، مطبخان، ملحق، مستودع، 4 دورات مياه وغرفة سائق بدورة مياه مستقلة. الدور العلوي: 5 غرف نوم، صالة و3 دورات مياه. السطح: غرفة عاملة ودورة مياه.', price: 7_000_000, location: 'Al Rawdah, Riyadh', locationAr: 'حي الروضة، الرياض', mapLocation: '24.737349,46.752254', lat: 24.737349, lng: 46.752254, area: 900, bedrooms: 5, bathrooms: 9, images: images(5, 9), type: 'sale' }),
]

export const cities = [
  { value: 'all', label: 'All Cities', labelAr: 'جميع المدن' },
  { value: 'riyadh', label: 'Riyadh', labelAr: 'الرياض' },
  { value: 'eastern', label: 'Eastern Province', labelAr: 'المنطقة الشرقية' },
]

export const propertyTypes = [
  { value: 'all', label: 'All Types', labelAr: 'جميع الأنواع' },
  { value: 'apartment', label: 'Apartment', labelAr: 'شقة' },
  { value: 'office', label: 'Office', labelAr: 'مكتب' },
  { value: 'villa', label: 'Villa', labelAr: 'فيلا' },
]

export const roomOptions = [
  { value: '0', label: 'Any', labelAr: 'أي' },
  { value: '1', label: '1+', labelAr: '1+' },
  { value: '2', label: '2+', labelAr: '2+' },
  { value: '3', label: '3+', labelAr: '3+' },
  { value: '4', label: '4+', labelAr: '4+' },
]

export const priceRanges = [
  { value: 'all', label: 'Any Price', labelAr: 'أي سعر' },
  { value: '0-500k', label: 'Under 500K', labelAr: 'أقل من 500 ألف' },
  { value: '500k-2m', label: '500K – 2M', labelAr: '500 ألف – 2 مليون' },
  { value: '2m-5m', label: '2M – 5M', labelAr: '2 – 5 مليون' },
  { value: '5m+', label: '5M+', labelAr: '5 مليون+' },
]
