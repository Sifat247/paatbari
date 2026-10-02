import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/product.dart';
import '../../../core/supabase/supabase_service.dart';

class ProductCategory {
  final String key;
  final String titleBn;
  final String titleEn;

  const ProductCategory({
    required this.key,
    required this.titleBn,
    required this.titleEn,
  });
}

const defaultCategories = [
  ProductCategory(key: 'all', titleBn: 'সকল পণ্য', titleEn: 'All Items'),
  ProductCategory(key: 'bags', titleBn: 'ব্যাগ ও পার্স', titleEn: 'Bags & Totes'),
  ProductCategory(key: 'home', titleBn: 'হোম ডেকোর', titleEn: 'Home & Living'),
  ProductCategory(key: 'table', titleBn: 'টেবিল ও কিচেন', titleEn: 'Kitchen & Dining'),
  ProductCategory(key: 'office', titleBn: 'অফিস ও কনফারেন্স', titleEn: 'Office & Stationery'),
  ProductCategory(key: 'gifts', titleBn: 'গিফট হ্যাম্পার', titleEn: 'Gift Boxes'),
  ProductCategory(key: 'jewelry', titleBn: 'গহনা ও অলঙ্কার', titleEn: 'Jewelry'),
];

/// Bundled Rich Product Catalog (100% parity with web/lib/catalog.ts and paatbari.vercel.app)
const initialProductList = [
  ProductModel(
    id: 'P00',
    category: 'bags',
    slug: 'handcrafted-jute-clutch-wallet',
    titleEn: 'Handcrafted Jute Clutch Wallet & Pouch',
    titleBn: 'হাতে বোনা পাটের ক্ল্যাচ ওয়ালেট ও ছোট পার্স',
    taglineEn: 'Pocket-friendly artisanal elegance in pure mustard jute canvas',
    taglineBn: 'সরিষা-হলুদ পাটের আভিজাত্য · ওয়াটারপ্রুফ ফিনিশিং ও ভ্যালক্রো ফ্ল্যাপ',
    badgeText: 'স্বচ্ছ কস্টিং ৳৫৫',
    isBestseller: true,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/jute-clutch-wallet-studio.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/jute-clutch-wallet-studio.jpg',
      'https://paatbari.vercel.app/images/products/jute-clutch-wallet-lifestyle.jpg',
      'https://paatbari.vercel.app/images/products/pearl-elegance-clutch-flat.jpg',
    ],
    descriptionBn: 'মানিকগঞ্জের নারী কারিগরদের হাতে তৈরি প্রিমিয়াম সরিষা-হলুদ রঙের পাটের ক্ল্যাচ ওয়ালেট। ভেতরে ওয়াটারপ্রুফ রাবার স্তর ও ভ্যালক্রো ফ্ল্যাপ থাকায় টাকা-পয়সা নিরাপদ থাকে।',
    descriptionEn: 'Charming, ultra-lightweight women’s clutch wallet crafted from pure mustard jute canvas with water-repellent lining.',
    dimensionsBn: '৯" চওড়া × ৪.৫" উচ্চতা',
    dimensionsEn: '9" W x 4.5" H',
    materialBn: 'প্রাকৃতিক সরিষা-হলুদ জুট ক্যানভাস ও চারকোল পাইপিং',
    materialEn: 'Natural Mustard Jute Canvas & Charcoal Piping',
    rating: 4.9,
    reviewsCount: 38,
    variants: [
      ProductVariantModel(key: 'mustard', titleEn: 'Mustard Ochre', titleBn: 'সরিষা হলুদ', price: 55),
      ProductVariantModel(key: 'trio', titleEn: 'Set of 3 (Gift Pack)', titleBn: '৩টির গিফট সেট', price: 150),
    ],
  ),
  ProductModel(
    id: 'P01',
    category: 'bags',
    slug: 'classic-jute-tote-bag',
    titleEn: 'Classic Jute Tote Bag',
    titleBn: 'ক্লাসিক পাটের টোট ব্যাগ',
    taglineEn: 'Timeless style meets 100% natural golden fibre durability',
    taglineBn: 'প্রকৃতি ও আভিজাত্যের অপূর্ব মেলবন্ধন · ১০০% খাঁটি পাট',
    badgeText: 'বেস্টসেলার',
    isBestseller: true,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/classic-tote.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/classic-tote.jpg',
      'https://paatbari.vercel.app/images/products/marigold-crochet-tote-stand.jpg',
      'https://paatbari.vercel.app/images/products/shopping-bag.jpg',
    ],
    descriptionBn: 'পাটবাড়ির সিগনেচার ক্লাসিক টোট ব্যাগটি ১০০% গ্রেড-এ প্রাকৃতিক সোনালি পাটের সুতোয় হাতে বোনা। আরামদায়ক ডাবল-রিইনফোর্সড কটন রোপ হ্যান্ডেল সহ ১০ কেজি পর্যন্ত ভার বহনে সক্ষম।',
    descriptionEn: 'Flagship handcrafted jute tote bag woven from Grade-A premium natural golden fibers with reinforced cotton rope handles.',
    dimensionsBn: '১৫" চওড়া × ১৪" উচ্চতা × ৫" গভীরতা',
    dimensionsEn: '15" W x 14" H x 5" D',
    materialBn: '১০০% প্রাকৃতিক সোনালি পাট ও জৈব সুতি রোপ হ্যান্ডেল',
    materialEn: '100% Natural Golden Jute with Organic Cotton Rope Handles',
    rating: 4.9,
    reviewsCount: 128,
    variants: [
      ProductVariantModel(key: 'natural', titleEn: 'Natural Golden', titleBn: 'ন্যাচারাল সোনালি', price: 450),
      ProductVariantModel(key: 'dyed', titleEn: 'Dyed Forest Green', titleBn: 'রঙিন (গাঢ় সবুজ)', price: 480),
    ],
  ),
  ProductModel(
    id: 'P02',
    category: 'bags',
    slug: 'jute-laptop-bag',
    titleEn: 'Executive Padded Jute Laptop Bag 15.6"',
    titleBn: 'পাটের ল্যাপটপ ব্যাগ ১৫.৬"',
    taglineEn: 'Sustainable executive messenger with shockproof fleece cushioning',
    taglineBn: '১৫.৬ ইঞ্চি ল্যাপটপের শকপ্রুফ প্যাডেড এক্সিকিউটিভ ব্যাগ',
    badgeText: 'প্রিমিয়াম',
    isBestseller: true,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/laptop-bag.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/laptop-bag.jpg',
      'https://paatbari.vercel.app/images/products/file-folder.jpg',
    ],
    descriptionBn: 'আধুনিক পেশাদারদের জন্য তৈরি এক্সিকিউটিভ পাটের ল্যাপটপ ব্যাগ। ঘন জুট ক্যানভাস ও ন্যাচারাল স্যাডেল লেদার ট্রিম। ভেতরে ১৫.৬ ইঞ্চি শকপ্রুফ প্যাডেড কুশনিং।',
    descriptionEn: 'Executive laptop bag designed for modern professionals, combining tight-weave jute canvas with vegetable-tanned leather trim.',
    dimensionsBn: '১৬.৫" চওড়া × ১২" উচ্চতা × ৩.৫" গভীরতা',
    dimensionsEn: '16.5" W x 12" H x 3.5" D',
    materialBn: 'প্রিমিয়াম জুট ক্যানভাস, জেনুইন স্যাডেল লেদার ট্রিম, মেটালিক ব্রাস',
    materialEn: 'Premium Jute Canvas, Saddle Leather, Brass Hardware',
    rating: 4.8,
    reviewsCount: 84,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard 15.6"', titleBn: 'স্ট্যান্ডার্ড ১৫.৬ ইঞ্চি', price: 1450),
    ],
  ),
  ProductModel(
    id: 'P03',
    category: 'bags',
    slug: 'ladies-jute-handbag',
    titleEn: 'Artisanal Ladies Jute Shoulder Handbag',
    titleBn: 'লেডিস পাটের হ্যান্ডব্যাগ',
    taglineEn: 'Sophisticated everyday luxury woven from pure artisanal jute',
    taglineBn: 'আভিজাত্য ও প্রকৃতির অপূর্ব মেলবন্ধন · ফ্যাশনেবল শোল্ডার ব্যাগ',
    badgeText: 'নতুন ডিজাইন',
    isBestseller: true,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/ladies-handbag.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/ladies-handbag.jpg',
      'https://paatbari.vercel.app/images/products/classic-tote.jpg',
    ],
    descriptionBn: 'নারীদের রুচিশীল ব্যক্তিত্বের সাথে মানানসই আধুনিক পাটের শোল্ডার হ্যান্ডব্যাগ। খাঁটি পাটের সূক্ষ্ম বুনন এবং বাদামি লেদার হ্যান্ডেলের অপূর্ব যুগলবন্দি।',
    descriptionEn: 'An epitome of understated luxury, featuring a structured silhouette hand-woven from fine golden jute with smooth tan handles.',
    dimensionsBn: '১৩.৫" চওড়া × ১০.৫" উচ্চতা × ৪.৫" গভীরতা',
    dimensionsEn: '13.5" W x 10.5" H x 4.5" D',
    materialBn: 'সূক্ষ্ম বুননের খাঁটি সোনালি পাট ও স্যাডেল লেদার ট্রিম',
    materialEn: 'Fine-Woven Jute Fibres with Tan Saddle Trims',
    rating: 4.9,
    reviewsCount: 92,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Classic Tan', titleBn: 'ক্লাসিক ট্যান', price: 950),
    ],
  ),
  ProductModel(
    id: 'P04',
    category: 'bags',
    slug: 'large-jute-shopping-bag',
    titleEn: 'Heavy-Duty Large Jute Market Shopper',
    titleBn: 'বড় পাটের বাজারের ব্যাগ',
    taglineEn: 'Replace 1,000+ plastic bags with reinforced bamboo cane handles',
    taglineBn: 'বাঁশের হাতলযুক্ত মজবুত বাজারের ব্যাগ · প্লাস্টিকের সেরা বিকল্প',
    badgeText: 'টেকসই',
    isBestseller: false,
    imageUrl: 'https://paatbari.vercel.app/images/products/shopping-bag.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/shopping-bag.jpg',
      'https://paatbari.vercel.app/images/products/classic-tote.jpg',
    ],
    descriptionBn: 'দৈনন্দিন বাজার ও গ্রোসারি শপিংয়ের জন্য তৈরি হেভি-ডিউটি পাটের ব্যাগ। মজবুত গোলাকার বাঁশের হাতল এবং ১৫ কেজি পর্যন্ত ভার বহনে সক্ষম।',
    descriptionEn: 'Built for heavy market days, this shopper features polished round bamboo cane handles and cross-stitched gussets.',
    dimensionsBn: '১৭" চওড়া × ১৫" উচ্চতা × ৭" তলা',
    dimensionsEn: '17" W x 15" H x 7" Gusset',
    materialBn: 'খাঁটি সোনালি পাট ও প্রাকৃতিক বাঁশের হাতল',
    materialEn: 'Raw Golden Jute & Natural Treated Bamboo Cane',
    rating: 4.8,
    reviewsCount: 71,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Large (17x15")', titleBn: 'বড় সাইজ (১৭×১৫ ইঞ্চি)', price: 380),
    ],
  ),
  ProductModel(
    id: 'P05',
    category: 'bags',
    slug: 'travel-backpack',
    titleEn: 'Handcrafted Jute Heritage Travel Backpack',
    titleBn: 'পাটের ট্রাভেল ও ডেপ্যাক ব্যাকপ্যাক',
    taglineEn: 'Rustic wanderlust meets ergonomic functionality and leather buckles',
    taglineBn: 'লেদার বাকলযুক্ত বিলাসবহুল পাটের ট্রাভেল ব্যাকপ্যাক',
    badgeText: 'নতুন কালেকশন',
    isBestseller: false,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/travel-backpack.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/travel-backpack.jpg',
      'https://paatbari.vercel.app/images/products/laptop-bag.jpg',
    ],
    descriptionBn: 'পরিবেশসচেতন ভ্রমণপিপাসুদের জন্য তৈরি বিলাসবহুল পাটের ব্যাকপ্যাক। ঘন বুননের জুট ক্যানভাস, অ্যান্টিক লেদার স্ট্র্যাপ ও ব্রাস বাকল সহ ১৪ ইঞ্চি ল্যাপটপ স্লট।',
    descriptionEn: 'The ultimate backpack for conscious explorers, crafted from tight-weave golden jute canvas and antique-finish leather strapping.',
    dimensionsBn: '১৩" চওড়া × ১৬" উচ্চতা × ৬" গভীরতা',
    dimensionsEn: '13" W x 16" H x 6" D',
    materialBn: 'ঘন বুননের জুট ক্যানভাস ও জেনুইন ডিসট্রেসড লেদার',
    materialEn: 'Heavy-Woven Jute Canvas & Genuine Distressed Leather',
    rating: 5.0,
    reviewsCount: 39,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Classic Canvas', titleBn: 'ক্লাসিক ক্যানভাস', price: 1850),
    ],
  ),
  ProductModel(
    id: 'P06',
    category: 'home',
    slug: 'jute-storage-basket',
    titleEn: 'Braided Spiral Jute Storage Basket',
    titleBn: 'পাটের স্টোরেজ ঝুড়ি',
    taglineEn: 'Coiled Scandinavian warmth for clutter-free living rooms and closets',
    taglineBn: 'হাতে বোনা স্পাইরাল ব্রেইডেড ঝুড়ি · পরিপাটি ঘরের নান্দনিক সঙ্গী',
    badgeText: '১৫% ছাড়',
    isBestseller: true,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/storage-basket.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/storage-basket.jpg',
      'https://paatbari.vercel.app/images/products/laundry-hamper.jpg',
    ],
    descriptionBn: 'মোটা ব্রেইডেড পাটের দড়ির স্পাইরাল বুননে হাতে তৈরি স্টোরেজ বাস্কেট। ভেতরের সফট সুতি লিনেন লাইনিং জিনিসপত্রকে সুরক্ষিত রাখে।',
    descriptionEn: 'Hand-coiled by skilled artisans using thick braided jute rope with a soft natural cotton linen inner lining.',
    dimensionsBn: 'ছোট: ৮×৮", মাঝারি: ১০×১০", বড়: ১২×১২"',
    dimensionsEn: 'Small: 8x8", Medium: 10x10", Large: 12x12"',
    materialBn: '১০০% স্পাইরাল ব্রেইডেড সোনালি পাট ও সুতি লিনেন লাইনার',
    materialEn: '100% Concentric Braided Jute with Linen Liner',
    rating: 4.9,
    reviewsCount: 115,
    variants: [
      ProductVariantModel(key: 'S', titleEn: 'Small (8x8")', titleBn: 'ছোট (৮×৮ ইঞ্চি)', price: 450),
      ProductVariantModel(key: 'M', titleEn: 'Medium (10x10")', titleBn: 'মাঝারি (১০×১০ ইঞ্চি)', price: 650),
      ProductVariantModel(key: 'L', titleEn: 'Large (12x12")', titleBn: 'বড় (১২×১২ ইঞ্চি)', price: 850),
    ],
  ),
  ProductModel(
    id: 'P07',
    category: 'home',
    slug: 'laundry-hamper',
    titleEn: 'Tall Cylindrical Jute Laundry Hamper with Lid',
    titleBn: 'ঢাকনাযুক্ত পাটের লন্ড্রি বাস্কেট',
    taglineEn: 'Freestanding Japandi hamper basket with fitted lid and rope handles',
    taglineBn: 'জাপান্দি ডিজাইনের লম্বা সিলিন্ডার লন্ড্রি ঝুড়ি ও ঢাকনা',
    badgeText: 'প্রিমিয়াম',
    isBestseller: false,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/laundry-hamper.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/laundry-hamper.jpg',
      'https://paatbari.vercel.app/images/products/storage-basket.jpg',
    ],
    descriptionBn: 'বাথরুম বা বেডরুমের আভিজাত্য বাড়াতে তৈরি লম্বা সিলিন্ডার লন্ড্রি বাস্কেট। ঘন ব্রেইডেড খাঁটি পাটের বুনন ও ম্যাচিং ঢাকনা।',
    descriptionEn: 'Elevate your bathroom or master suite with this tall cylindrical hamper featuring an all-natural coiled jute construction.',
    dimensionsBn: '১৫" ব্যাস × ২২" উচ্চতা',
    dimensionsEn: '15" Diameter x 22" Height',
    materialBn: 'স্পাইরাল ব্রেইডেড খাঁটি পাট ও টুইস্টেড কটন রোপ',
    materialEn: 'Coiled Natural Jute & Twisted Cotton Rope',
    rating: 4.9,
    reviewsCount: 52,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Tall Cylinder (15x22")', titleBn: 'লম্বা সিলিন্ডার (১৫×২২ ইঞ্চি)', price: 1650),
    ],
  ),
  ProductModel(
    id: 'P08',
    category: 'home',
    slug: 'jute-floor-rug',
    titleEn: 'Mandala Spiral Braided Jute Floor Rug',
    titleBn: 'পাটের ফ্লোর ম্যাট / কার্পেট',
    taglineEn: 'Concentric circular mandala braiding bringing organic warmth to floors',
    taglineBn: 'বৃত্তাকার মান্দালা নকশার হ্যান্ড-ব্রেইডেড পাটের ফ্লোর রাগ',
    badgeText: '১০০% প্রাকৃতিক',
    isBestseller: true,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/floor-rug.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/floor-rug.jpg',
      'https://paatbari.vercel.app/images/products/cushion-cover.jpg',
    ],
    descriptionBn: 'লিভিং রুম বা বেডরুমে প্রাকৃতিক উষ্ণতা ও আভিজাত্য এনে দেওয়ার জন্য বৃত্তাকার মান্দালা ডিজাইনের ফ্লোর রাগ। উভয় পিঠ সমানভাবে ব্যবহারযোগ্য।',
    descriptionEn: 'Make an architectural statement with this concentric mandala floor rug, hand-plaited from 100% high-tensile golden jute braids.',
    dimensionsBn: '২×৩ ফুট (বেডসাইড) এবং ৩×৫ ফুট (লিভিং লাউঞ্জ)',
    dimensionsEn: '2x3 ft (Bedside) & 3x5 ft (Living Lounge)',
    materialBn: '১০০% প্রাকৃতিক হাই-টেনসিল সোনালি আঁশ',
    materialEn: '100% Unbleached High-Tensile Golden Jute',
    rating: 4.8,
    reviewsCount: 88,
    variants: [
      ProductVariantModel(key: '2x3', titleEn: '2x3 Feet (Bedside)', titleBn: '২×৩ ফুট (বেডসাইড)', price: 1200),
      ProductVariantModel(key: '3x5', titleEn: '3x5 Feet (Living Lounge)', titleBn: '৩×৫ ফুট (লিভিং লাউঞ্জ)', price: 2400),
    ],
  ),
  ProductModel(
    id: 'P09',
    category: 'home',
    slug: 'jute-cushion-cover',
    titleEn: 'Luxury Textured Jute Cushion Cover with Fringed Border',
    titleBn: 'পাটের কুশন কভার ১৬×১৬',
    taglineEn: 'Scandinavian bohemian sofa accent with delicate frayed tassel fringe',
    taglineBn: 'ফ্রিঞ্জ ট্যাসেল বর্ডারসহ স্ক্যান্ডিনেভিয়ান লিভিং রুম কুশন কভার',
    badgeText: 'বোহো স্টাইল',
    imageUrl: 'https://paatbari.vercel.app/images/products/cushion-cover.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/cushion-cover.jpg',
      'https://paatbari.vercel.app/images/products/floor-rug.jpg',
    ],
    descriptionBn: 'সোফা বা বেডরুমে স্ক্যান্ডিনেভিয়ান বোহো লুক এনে দিতে সূক্ষ্ম বুননের পাটের কুশন কভার। চারপাশের নান্দনিক ফ্রিঞ্জ ট্যাসেল বর্ডার ও লুকানো জিপার।',
    descriptionEn: 'Infuse modern organic texture into your sofa with this raw jute cushion cover accented by artisanal frayed fringe borders.',
    dimensionsBn: '১৬×১৬ ইঞ্চি',
    dimensionsEn: '16" x 16"',
    materialBn: 'কোমল পাটের সম্মুখভাগ ও সফট কটন পেছনের স্তর',
    materialEn: 'Combed Natural Jute Face with Soft Cotton Backing',
    rating: 4.7,
    reviewsCount: 64,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Square 16x16"', titleBn: 'বর্গাকার ১৬×১৬ ইঞ্চি', price: 350),
    ],
  ),
  ProductModel(
    id: 'P10',
    category: 'home',
    slug: 'macrame-tapestry',
    titleEn: 'Boho Macrame Jute Wall Hanging Tapestry on Driftwood',
    titleBn: 'পাটের মেক্রামে ওয়াল হ্যাঙ্গিং ট্যাপেস্ট্রি',
    taglineEn: 'Intricate geometric knotting suspended from natural driftwood',
    taglineBn: 'প্রাকৃতিক ড্রিফটউডে ঝুলানো নিখুঁত বোহো মেক্রামে ওয়াল আর্ট',
    badgeText: 'হস্তশিল্প',
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/macrame-tapestry.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/macrame-tapestry.jpg',
      'https://paatbari.vercel.app/images/products/plant-hanger.jpg',
    ],
    descriptionBn: 'দেয়ালের সৌন্দর্য দ্বিগুণ করতে তৈরি পাটের মেক্রামে ওয়াল আর্ট। মসৃণ প্রাকৃতিক কাঠের ডালে ঝুলানো খাঁটি পাটের সুতোর নিখুঁত জ্যামিতিক নট ও ফ্রিঞ্জ বুনন।',
    descriptionEn: 'Turn blank walls into an architectural gallery with this bohemian tapestry hand-knotted from unbleached jute twine on driftwood.',
    dimensionsBn: '২৪" কাঠের চওড়া × ৩২" ঝুলন্ত দৈর্ঘ্য',
    dimensionsEn: '24" Branch Width x 32" Hanging Length',
    materialBn: '১০০% টুইস্টেড সোনালি পাট ও প্রাকৃতিক কাঠ',
    materialEn: '100% Hand-Twisted Golden Jute Twine & Natural Branch',
    rating: 5.0,
    reviewsCount: 45,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Large (24x32")', titleBn: 'বড় সাইজ (২৪×৩২ ইঞ্চি)', price: 1450),
    ],
  ),
  ProductModel(
    id: 'P11',
    category: 'home',
    slug: 'jute-plant-hanger',
    titleEn: 'Traditional Macrame Jute Plant Hanger (Shika)',
    titleBn: 'ঐতিহ্যবাহী পাটের শিকা (প্ল্যান্ট হ্যাঙ্গার)',
    taglineEn: 'Authentic Bengal shika knotting bringing hanging greenery indoors',
    taglineBn: 'বাংলার গ্রামীণ ঐতিহ্যের মেক্রামে শিকা · ইনডোর টবের সেরা সঙ্গী',
    badgeText: 'ঐতিহ্যবাহী',
    imageUrl: 'https://paatbari.vercel.app/images/products/plant-hanger.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/plant-hanger.jpg',
      'https://paatbari.vercel.app/images/products/macrame-tapestry.jpg',
    ],
    descriptionBn: 'বাংলার হাজার বছরের ঐতিহ্যের প্রতীক শিকা। বারান্দা, জানালা বা ড্রয়িংরুমে ইনডোর টব ঝুলিয়ে রাখার জন্য নিখুঁত মেক্রামে নট দিয়ে বোনা।',
    descriptionEn: 'Celebrate timeless rural heritage. Holds plant pots from 5 to 10 inches securely with a braided hanging loop and flowing tassel.',
    dimensionsBn: '৩৬" মোট ঝুলন্ত দৈর্ঘ্য',
    dimensionsEn: '36" Total Hanging Length',
    materialBn: 'খাঁটি ৪-প্লাই টুইস্টেড সোনালি পাটের দড়ি',
    materialEn: 'Natural 4-Ply Twisted Golden Jute Cord',
    rating: 4.8,
    reviewsCount: 96,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard 36"', titleBn: 'স্ট্যান্ডার্ড ৩৬ ইঞ্চি ঝুল', price: 400),
    ],
  ),
  ProductModel(
    id: 'P12',
    category: 'table',
    slug: 'jute-table-runner',
    titleEn: 'Artisanal Hand-Woven Jute Dining Table Runner',
    titleBn: 'পাটের ডাইনিং টেবিল রানার',
    taglineEn: 'Organic warmth for dinner parties, festive tables, and ceramic ware',
    taglineBn: 'হাতে বোনা সোনালি পাটের ডাইনিং টেবিল রানার · আভিজাত্যের স্পর্শ',
    badgeText: 'বেস্টসেলার',
    isBestseller: true,
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/table-runner.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/table-runner.jpg',
      'https://paatbari.vercel.app/images/products/placemat-set.jpg',
    ],
    descriptionBn: 'ডাইনিং টেবিলকে আরও আকর্ষণীয় ও রুচিশীল করে তোলার জন্য খাঁটি পাটের ডাইনিং রানার। প্রাকৃতিক তাপ-প্রতিরোধক গুণ টেবিলকে গরম পাত্র থেকে সুরক্ষিত রাখে।',
    descriptionEn: 'Transform meals into an artisanal dining experience. Hand-woven on pit looms using combed golden jute yarns with end fringe tassels.',
    dimensionsBn: '১৪" চওড়া × ৭২" দৈর্ঘ্য (ট্যাসেল সহ)',
    dimensionsEn: '14" Width x 72" Length',
    materialBn: '১০০% হ্যান্ডলুম সোনালি পাট',
    materialEn: '100% Handloom Combed Golden Jute',
    rating: 4.9,
    reviewsCount: 104,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard (14x72")', titleBn: 'স্ট্যান্ডার্ড (১৪×৭২ ইঞ্চি)', price: 550),
    ],
  ),
  ProductModel(
    id: 'P13',
    category: 'table',
    slug: 'jute-placemat-set',
    titleEn: 'Circular Braided Jute Placemats & Coasters (Set of 6)',
    titleBn: 'পাটের প্লেসম্যাট সেট (৬টি)',
    taglineEn: 'Heat-resistant braided charger mats protecting table finishes',
    taglineBn: 'বৃত্তাকার ব্রেইডেড ৬ পিস ডাইনিং প্লেসম্যাট ও কোস্টার সেট',
    badgeText: 'টেকসই',
    imageUrl: 'https://paatbari.vercel.app/images/products/placemat-set.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/placemat-set.jpg',
      'https://paatbari.vercel.app/images/products/table-runner.jpg',
    ],
    descriptionBn: 'ডাইনিং টেবিল সাজানোর পূর্ণাঙ্গ ৬ পিস প্লেসম্যাট সেট। ঘন ব্রেইডেড সোনালি পাটের বৃত্তাকার বুনন যা টেবিলকে স্ক্র্যাচ ও গরম পাত্র থেকে রক্ষা করে।',
    descriptionEn: 'Complete your tablescape with this 6-piece dining placemat set crafted from concentric tightly-coiled jute braids.',
    dimensionsBn: 'প্রতিটি ১৪" ব্যাস (৬টির সেট)',
    dimensionsEn: '14" Diameter Each (Set of 6)',
    materialBn: '১০০% ব্রেইডেড প্রাকৃতিক সোনালি পাট',
    materialEn: '100% Braided Natural Jute Fibre',
    rating: 4.8,
    reviewsCount: 78,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Set of 6 (14" Mats)', titleBn: '৬টির সেট (১৪ ইঞ্চি)', price: 900),
    ],
  ),
  ProductModel(
    id: 'P14',
    category: 'table',
    slug: 'bottle-carrier',
    titleEn: 'Luxury Dual-Bottle Jute Carrier with Bamboo Handle',
    titleBn: 'পাটের বোতল ও বেভারেজ ক্যারিয়ার ব্যাগ',
    taglineEn: 'Artisanal twin bottle carrier with reinforced divider and cane arch',
    taglineBn: 'বাঁশের হাতলযুক্ত ২টি বোতল বহনের প্রিমিয়াম পাটের ব্যাগ',
    badgeText: 'উপহার স্পেশাল',
    imageUrl: 'https://paatbari.vercel.app/images/products/bottle-carrier.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/bottle-carrier.jpg',
      'https://paatbari.vercel.app/images/products/shopping-bag.jpg',
    ],
    descriptionBn: 'পিকনিক, দাওয়াত বা গিফট দেওয়ার জন্য তৈরি ২টি বোতল বহনের এক্সক্লুসিভ পাটের ক্যারিয়ার। ভেতরের প্যাডেড পার্টিশন দুটি বোতলকে নিরাপদ রাখে।',
    descriptionEn: 'Handcrafted tote carrying two bottles of beverage safely separated by a padded center divider with solid arched bamboo handle.',
    dimensionsBn: '৯" চওড়া × ১৪" উচ্চতা × ৪.৫" গভীরতা',
    dimensionsEn: '9" W x 14" H x 4.5" D',
    materialBn: 'টেক্সচার্ড হেভি জুট ও পালিশ করা বাঁশ',
    materialEn: 'Textured Heavy Jute Weave & Solid Polished Bamboo',
    rating: 4.9,
    reviewsCount: 36,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Dual Bottle Carrier', titleBn: '২টি বোতল ক্যারিয়ার', price: 580),
    ],
  ),
  ProductModel(
    id: 'P15',
    category: 'office',
    slug: 'jute-file-folder',
    titleEn: 'Executive Conference Jute Document Portfolio & Folder',
    titleBn: 'এক্সিকিউটিভ পাটের ফাইল ফোল্ডার',
    taglineEn: 'Impress clients at summits, meetings, and boardrooms with eco-luxury',
    taglineBn: 'লেদার বাটন ক্লিপযুক্ত কর্পোরেট কনফারেন্স ডকু ফোল্ডার',
    badgeText: 'কর্পোরেট সেরা',
    imageUrl: 'https://paatbari.vercel.app/images/products/file-folder.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/file-folder.jpg',
      'https://paatbari.vercel.app/images/products/laptop-bag.jpg',
    ],
    descriptionBn: 'কর্পোরেট মিটিং ও সেমিনারে প্লাস্টিক ফোল্ডারের বিকল্প হিসেবে অনন্য পাটের এক্সিকিউটিভ ফোল্ডার। এ৪ সাইজের ডকুমেন্ট ও ভিজিটিং কার্ড রাখার জন্য উপযুক্ত।',
    descriptionEn: 'Replace synthetic portfolios with this distinguished executive folder, handcrafted from laminated jute canvas with leather button closure.',
    dimensionsBn: '১৩.৫" চওড়া × ১০" উচ্চতা (এ৪ সাইজ)',
    dimensionsEn: '13.5" W x 10" H (A4 Profile)',
    materialBn: 'ফাইন-লুম পাটের কাপড়, স্যাডেল লেদার, ব্রাস বাটন',
    materialEn: 'Fine-Loom Jute Fabric, Saddle Leather, Brass Button',
    rating: 4.9,
    reviewsCount: 112,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'A4 Executive Size', titleBn: 'এ৪ এক্সিকিউটিভ সাইজ', price: 320),
    ],
  ),
  ProductModel(
    id: 'P16',
    category: 'gifts',
    slug: 'jute-gift-hamper-box',
    titleEn: 'Luxury Woven Jute Gift Box with Ribbon Lid',
    titleBn: 'পাটের গিফট হ্যাম্পার বক্স',
    taglineEn: 'Eco-conscious gift packaging for weddings, festivals, and VIP tokens',
    taglineBn: 'রিবন ঢাকনাযুক্ত বিলাসবহুল পাটের গিফট হ্যাম্পার বক্স',
    badgeText: 'উপহার বক্স',
    isFeatured: true,
    imageUrl: 'https://paatbari.vercel.app/images/products/gift-box.jpg',
    images: [
      'https://paatbari.vercel.app/images/products/gift-box.jpg',
      'https://paatbari.vercel.app/images/products/storage-basket.jpg',
    ],
    descriptionBn: 'বিয়ে, ঈদ, পূজা বা উৎসবের উপহার দেওয়ার জন্য তৈরি প্রিমিয়াম পাটের গিফট বক্স। সুদৃশ্য রিবন ঢাকনা ও মসৃণ ফিনিশিং উপহারের মান দ্বিগুণ বাড়িয়ে দেয়।',
    descriptionEn: 'Eco-conscious rigid gift box woven from golden jute with fitted ribbon closure lid. Reusable for keepsakes and luxury packaging.',
    dimensionsBn: '১০" × ১০" × ৫" ইঞ্চি',
    dimensionsEn: '10" x 10" x 5" Inches',
    materialBn: 'রিইনফোর্সড জুট ক্যানভাস ও কটন রিবন',
    materialEn: 'Reinforced Jute Canvas & Cotton Ribbon',
    rating: 5.0,
    reviewsCount: 65,
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Square 10x10x5"', titleBn: 'বর্গাকার ১০×১০×৫ ইঞ্চি', price: 650),
    ],
  ),
];

/// Products Notifier with Supabase live fetch and bundled fallback
class ProductsNotifier extends StateNotifier<List<ProductModel>> {
  ProductsNotifier() : super(initialProductList) {
    loadLiveProducts();
  }

  Future<void> loadLiveProducts() async {
    try {
      final liveProducts = await SupabaseService.instance.fetchProducts();
      if (liveProducts != null && liveProducts.isNotEmpty) {
        state = liveProducts;
      }
    } catch (_) {
      // Keep bundled state on error
    }
  }

  void refresh() => loadLiveProducts();
}

final allProductsProvider = StateNotifierProvider<ProductsNotifier, List<ProductModel>>((ref) {
  return ProductsNotifier();
});

final selectedCategoryProvider = StateProvider<String>((ref) => 'all');
final searchQueryProvider = StateProvider<String>((ref) => '');

final filteredProductsProvider = Provider<List<ProductModel>>((ref) {
  final allProducts = ref.watch(allProductsProvider);
  final category = ref.watch(selectedCategoryProvider);
  final query = ref.watch(searchQueryProvider).trim().toLowerCase();

  return allProducts.where((product) {
    final matchesCategory = category == 'all' || product.category == category;
    final matchesQuery = query.isEmpty ||
        product.titleBn.toLowerCase().contains(query) ||
        product.titleEn.toLowerCase().contains(query) ||
        (product.descriptionBn?.toLowerCase().contains(query) ?? false) ||
        (product.descriptionEn?.toLowerCase().contains(query) ?? false) ||
        product.category.toLowerCase().contains(query);

    return matchesCategory && matchesQuery;
  }).toList();
});
