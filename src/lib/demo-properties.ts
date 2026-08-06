import type { Property } from '@/types'

const rent = (
  id: string,
  titleAr: string,
  title: string,
  price: number,
  locationAr: string,
  location: string,
  area = 0,
  bedrooms = 0,
  bathrooms = 0,
  priceNoteAr = '/سنوي',
  priceNote = '/yr'
): Property => ({
  id,
  title,
  titleAr,
  description: `Rental opportunity in ${location}.`,
  descriptionAr: `فرصة تأجير في ${locationAr}.`,
  price,
  currency: 'SAR',
  location,
  locationAr,
  lat: 24.7136,
  lng: 46.6753,
  area,
  bedrooms,
  bathrooms,
  images: [],
  priceNoteAr,
  priceNote,
  type: 'rent',
  status: 'available',
  featured: false,
  createdAt: '2026-08-07',
  updatedAt: '2026-08-07',
})

// بيانات مبسطة من مشاريع وإعلانات التأجير العامة المنشورة على منصة عقار.
export const demoProperties: Property[] = [
  rent('hayat-khurais', 'كمباوند حياة خريص', 'Hayat Khurais Compound', 42_240, 'شارع أحمد بن الحسن الأنصاري، حي النسيم الغربي، الرياض', 'Ahmed Bin Al Hassan Al Ansari St, Al Naseem Al Gharbi, Riyadh', 0, 1, 1),
  rent('office-peace', 'السلام المكتبي', 'Office Peace', 2_200, 'طريق الإمام سعود بن فيصل، حي العقيق، الرياض', 'Imam Saud Bin Faisal Rd, Al Aqiq, Riyadh', 370, 0, 0, '/م² سنوي', '/m² yr'),
  rent('zaki-offices', 'ذكي مكاتب للإيجار', 'Zaki Offices', 1_350, 'شارع السويدي العام، حي السويدي، الرياض', 'Al Suwaidi Al Am St, Al Suwaidi, Riyadh', 10, 0, 0, '/شهري', '/mo'),
  rent('alpha-business', 'ALPHA BUSINESS', 'ALPHA BUSINESS', 2_000, 'طريق الأمير تركي بن عبدالعزيز الأول، حي الملقا، الرياض', 'Prince Turki Bin Abdulaziz I Rd, Al Malqa, Riyadh', 78, 0, 0, '/م² سنوي', '/m² yr'),
  rent('core-commercial', 'برج كور التجاري', 'Core Commercial Tower', 20_000_000, 'شارع العليا، حي الصحافة، الرياض', 'Olaya St, Al Sahafah, Riyadh'),
  rent('agate-191', 'العقيق 191', 'Al Aqiq 191', 4_000, 'شارع التحلية، حي العقيق، الرياض', 'Tahlia St, Al Aqiq, Riyadh', 0, 1, 1, '/شهري', '/mo'),
  rent('drive-through', 'درايف ثرو وفلل مكتبية', 'Drive-through & Office Villas', 550_000, 'طريق الإمام سعود بن فيصل الفرعي، حي الملقا، الرياض', 'Imam Saud Bin Faisal Branch Rd, Al Malqa, Riyadh'),
  rent('tahlia-vintage', 'التحلية فنتج', 'Tahlia Vintage', 1_500, 'شارع الأمير محمد بن عبدالعزيز، حي السليمانية، الرياض', 'Prince Mohammed Bin Abdulaziz St, Al Sulimaniyah, Riyadh', 0, 0, 0, '/م² سنوي', '/m² yr'),
  rent('waref-offices', 'وارف مكاتب للإيجار', 'Waref Offices', 330_000, 'طريق الثمامة، حي الياسمين، الرياض', 'Thumamah Rd, Al Yasmin, Riyadh'),
  rent('ready-offices', 'مكاتب جاهزة للإيجار', 'Ready Offices', 1_000, 'شارع الحديقة، حي الدريهمية، الرياض', 'Al Hadiqah St, Al Duraihimiyah, Riyadh', 0, 0, 0, '/شهري', '/mo'),
  rent('taawun-3', 'عمارة التعاون 3', 'Al Taawun 3', 48_000, 'شارع الحسن بن علي، حي التعاون، الرياض', 'Al Hassan Bin Ali St, Al Taawun, Riyadh', 122, 1, 1),
  rent('dubbat-2', 'الضباط 2', 'Al Dubbat 2', 36_000, 'شارع الأميرة سارة بنت أحمد السديري، حي الضباط، الرياض', 'Princess Sarah Bint Ahmed Al Sudairi St, Al Dubbat, Riyadh', 130, 1, 1),
  rent('mohammadiyah-building', 'عمارة المحمدية', 'Al Mohammadiyah Building', 36_000, 'شارع سعود بن عبدالعزيز بن محمد الفرعي، حي المحمدية، الرياض', 'Saud Bin Abdulaziz Bin Mohammed Branch St, Al Mohammadiyah, Riyadh', 100, 1, 1),
  rent('worood-building', 'عمارة الورود', 'Al Worood Building', 34_000, 'شارع الأمير سلطان بن سلمان، حي الورود، الرياض', 'Prince Sultan Bin Salman St, Al Worood, Riyadh', 100, 1, 1),
  rent('rawas-30', 'مشروع رواس 30', 'Rawas 30', 63_000, 'شارع سعيد بن المسيب، حي الجامعة، الظهران', 'Saeed Bin Al Musayyib St, Al Jamiah, Dhahran', 154, 3, 3),
  rent('az-arabia-safa', 'عز العربية - حي الصفا', 'Ezz Al Arabia - Al Safa', 2_500, 'شارع عبدالله الشربتلي، حي الصفا، جدة', 'Abdullah Al Sharbatli St, Al Safa, Jeddah', 50, 1, 1, '/شهري', '/mo'),
  rent('marwah-apartments', 'شقق حي المروة', 'Al Marwah Apartments', 42_000, 'شارع أبو قتادة الأنصاري، حي المروة، جدة', 'Abu Qatadah Al Ansari St, Al Marwah, Jeddah', 80, 2, 1),
  rent('safwa-homes', 'مجمع منازل الصفوة', 'Al Safwa Homes', 70_000, 'حي الصفا، جدة', 'Al Safa, Jeddah', 194, 4, 4),
  rent('sawari-roof', 'روف حي الصواري', 'Al Sawari Rooftop', 45_000, 'شارع قتادة بن إدريس، حي الصواري، جدة', 'Qatadah Bin Idris St, Al Sawari, Jeddah', 152, 4, 3),
  rent('rayyan-smart', 'شقة ذكية - حي الريان', 'Smart Apartment - Al Rayyan', 80_000, 'شارع وادي الرمة، حي الريان، الرياض', 'Wadi Al Rumah St, Al Rayyan, Riyadh', 88, 2, 3),
]

export const cities = [
  { value: 'all', label: 'All Cities', labelAr: 'جميع المدن' },
  { value: 'riyadh', label: 'Riyadh', labelAr: 'الرياض' },
  { value: 'jeddah', label: 'Jeddah', labelAr: 'جدة' },
  { value: 'dhahran', label: 'Dhahran', labelAr: 'الظهران' },
]

export const propertyTypes = [
  { value: 'all', label: 'All Types', labelAr: 'جميع الأنواع' },
  { value: 'apartment', label: 'Apartment', labelAr: 'شقة' },
  { value: 'office', label: 'Office', labelAr: 'مكتب' },
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
