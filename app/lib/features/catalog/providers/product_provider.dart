import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/product.dart';

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
  ProductCategory(key: 'bags', titleBn: 'ব্যাগ', titleEn: 'Bags'),
  ProductCategory(key: 'home', titleBn: 'হোম ডেকোর', titleEn: 'Home Decor'),
  ProductCategory(key: 'table', titleBn: 'টেবিল ও কিচেন', titleEn: 'Kitchen & Table'),
  ProductCategory(key: 'office', titleBn: 'অফিস', titleEn: 'Office'),
  ProductCategory(key: 'gifts', titleBn: 'উপহার', titleEn: 'Gifts'),
];

const initialProductList = [
  ProductModel(
    id: 'P01',
    category: 'bags',
    slug: 'classic-jute-tote-bag',
    titleEn: 'Classic Jute Tote Bag',
    titleBn: 'ক্লাসিক পাটের টোট ব্যাগ',
    badgeText: 'বেস্টসেলার',
    isBestseller: true,
    imageAsset: 'assets/images/products/classic-tote.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/classic-tote.jpg',
    descriptionBn: 'প্রিমিয়াম কোয়ালিটির ১০০% বায়োডিগ্রেডেবল সোনালি পাটে তৈরি পরিবেশবান্ধব টোট ব্যাগ। দৈনন্দিন অফিস, বিশ্ববিদ্যালয় বা কেনাকাটার জন্য অত্যন্ত স্টাইলিশ ও মজবুত।',
    descriptionEn: 'Premium quality 100% biodegradable golden jute tote bag. Eco-friendly, durable, and stylish for daily commute.',
    variants: [
      ProductVariantModel(key: 'natural', titleEn: 'Natural', titleBn: 'ন্যাচারাল সোনালি', price: 450),
      ProductVariantModel(key: 'dyed', titleEn: 'Dyed (Green)', titleBn: 'রঙিন (গাঢ় সবুজ)', price: 450),
    ],
  ),
  ProductModel(
    id: 'P02',
    category: 'bags',
    slug: 'jute-laptop-bag',
    titleEn: 'Jute Laptop Bag 15.6"',
    titleBn: 'পাটের ল্যাপটপ ব্যাগ ১৫.৬"',
    badgeText: 'প্রিমিয়াম',
    imageAsset: 'assets/images/products/laptop-bag.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/laptop-bag.jpg',
    descriptionBn: '১৫.৬ ইঞ্চি ল্যাপটপের জন্য শক-প্রটেক্টিভ প্যাডেড কম্পার্টমেন্ট সহ এক্সিকিউটিভ পাটের ল্যাপটপ ব্যাগ। রিয়েল লেদার ট্রিম এবং প্রিমিয়াম মেটালিক জিপার।',
    descriptionEn: 'Executive jute laptop bag with shock-protective padded compartment, leather trim and heavy-duty zippers.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard 15.6"', titleBn: 'স্ট্যান্ডার্ড ১৫.৬"', price: 1450),
    ],
  ),
  ProductModel(
    id: 'P03',
    category: 'bags',
    slug: 'ladies-jute-handbag',
    titleEn: 'Ladies Jute Handbag',
    titleBn: 'লেডিস পাটের হ্যান্ডব্যাগ',
    badgeText: 'নতুন ডিজাইন',
    isBestseller: true,
    imageAsset: 'assets/images/products/ladies-handbag.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/ladies-handbag.jpg',
    descriptionBn: 'আভিজাত্য ও পরিবেশ সুরক্ষার অপূর্ব মেলবন্ধন। খাঁটি পাটের সূক্ষ্ম বুনন এবং স্যাডেল লেদার ফিনিশিং সহ আধুনিক ডিজাইনার হ্যান্ডব্যাগ।',
    descriptionEn: 'Elegant designer handbag hand-woven from fine jute fibers with saddle leather finish.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard', titleBn: 'স্ট্যান্ডার্ড', price: 950),
    ],
  ),
  ProductModel(
    id: 'P04',
    category: 'bags',
    slug: 'large-jute-shopping-bag',
    titleEn: 'Large Jute Shopping Bag',
    titleBn: 'বড় পাটের বাজারের ব্যাগ',
    badgeText: 'টেকসই',
    imageAsset: 'assets/images/products/shopping-bag.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/shopping-bag.jpg',
    descriptionBn: 'শক্তিশালী বাঁশের হাতল এবং অতিরিক্ত লোড ধারণক্ষমতা সম্পন্ন পরিবেশবান্ধব বাজারের ব্যাগ। প্লাস্টিক ব্যাগের সেরা বিকল্প।',
    descriptionEn: 'Heavy-duty eco-friendly market shopper with reinforced bamboo handles. The perfect alternative to single-use plastics.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard', titleBn: 'স্ট্যান্ডার্ড', price: 380),
    ],
  ),
  ProductModel(
    id: 'P05',
    category: 'home',
    slug: 'jute-storage-basket',
    titleEn: 'Jute Storage Basket',
    titleBn: 'পাটের স্টোরেজ ঝুড়ি',
    badgeText: '১৫% ছাড়',
    isBestseller: true,
    imageAsset: 'assets/images/products/storage-basket.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/storage-basket.jpg',
    descriptionBn: 'হাতে বোনা স্পাইরাল ব্রেইডেড পাটের ঝুড়ি। ভেতরের সফট লিনেন লাইনিং সহ কাপড়, খেলনা বা কিচেন সামগ্রী সাজিয়ে রাখার উপযুক্ত।',
    descriptionEn: 'Hand-coiled braided jute storage basket with natural cotton linen lining. Organizes laundry, toys and home items.',
    variants: [
      ProductVariantModel(key: 'S', titleEn: 'Small (8x8")', titleBn: 'ছোট (৮×৮")', price: 450),
      ProductVariantModel(key: 'M', titleEn: 'Medium (10x10")', titleBn: 'মাঝারি (১০×১০")', price: 650),
      ProductVariantModel(key: 'L', titleEn: 'Large (12x12")', titleBn: 'বড় (১২×১২")', price: 850),
    ],
  ),
  ProductModel(
    id: 'P06',
    category: 'home',
    slug: 'jute-floor-rug',
    titleEn: 'Jute Floor Rug',
    titleBn: 'পাটের ফ্লোর ম্যাট / কার্পেট',
    badgeText: '১০০% প্রাকৃতিক',
    isBestseller: true,
    imageAsset: 'assets/images/products/floor-rug.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/floor-rug.jpg',
    descriptionBn: 'ঐতিহ্যবাহী নকশার বৃত্তাকার হ্যান্ড-ব্রেইডেড পাটের ফ্লোর রাগ। লিভিং রুম বা বেডরুমে প্রাকৃতিক উষ্ণতা ও আভিজাত্য এনে দেয়।',
    descriptionEn: 'Traditional mandala spiral braided round jute rug. Adds organic warmth and elegance to living spaces.',
    variants: [
      ProductVariantModel(key: '2x3', titleEn: '2x3 Feet', titleBn: '২×৩ ফুট', price: 1200),
      ProductVariantModel(key: '3x5', titleEn: '3x5 Feet', titleBn: '৩×৫ ফুট', price: 2400),
    ],
  ),
  ProductModel(
    id: 'P07',
    category: 'home',
    slug: 'jute-cushion-cover',
    titleEn: 'Jute Cushion Cover 16x16',
    titleBn: 'পাটের কুশন কভার ১৬×১৬',
    imageAsset: 'assets/images/products/cushion-cover.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/cushion-cover.jpg',
    descriptionBn: 'প্রাকৃতিক টেক্সচার ও ফ্রিঞ্জ ট্যাসেল বর্ডার সহ বিলাসবহুল কুশন কভার। আপনার ড্রয়িংরুমের সোফায় স্ক্যান্ডিনেভিয়ান লুক সৃষ্টি করবে।',
    descriptionEn: 'Luxury textured natural jute square cushion cover with frayed tassel border.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard 16x16"', titleBn: '১৬×১৬ ইঞ্চি', price: 350),
    ],
  ),
  ProductModel(
    id: 'P08',
    category: 'table',
    slug: 'jute-table-runner',
    titleEn: 'Jute Table Runner',
    titleBn: 'পাটের ডাইনিং টেবিল রানার',
    imageAsset: 'assets/images/products/table-runner.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/table-runner.jpg',
    descriptionBn: 'হাতে বোনা দীর্ঘস্থায়ী সোনালি পাটের টেবিল রানার। ডাইনিং টেবিলে মাটির পাত্র ও সিরামিক ক্রকারিজের সাথে অসাধারণ মানিয়ে যায়।',
    descriptionEn: 'Handcrafted natural golden jute table runner for rustic and elegant dining tables.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard (14x72")', titleBn: '১৪×৭২ ইঞ্চি', price: 550),
    ],
  ),
  ProductModel(
    id: 'P09',
    category: 'table',
    slug: 'jute-placemat-set',
    titleEn: 'Jute Placemat (Set of 6)',
    titleBn: 'পাটের প্লেসম্যাট সেট (৬টি)',
    imageAsset: 'assets/images/products/placemat-set.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/placemat-set.jpg',
    descriptionBn: 'বৃত্তাকার ব্রেইডেড ৬ পিস ডাইনিং প্লেসম্যাট সেট। তাপ প্রতিরোধক এবং সহজে পরিষ্কারযোগ্য।',
    descriptionEn: 'Circular braided heat-resistant dining table placemats, set of 6.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Set of 6', titleBn: '৬টির সেট', price: 900),
    ],
  ),
  ProductModel(
    id: 'P10',
    category: 'table',
    slug: 'jute-coaster-set',
    titleEn: 'Jute Coasters (Set of 6)',
    titleBn: 'পাটের কোস্টার সেট (৬টি)',
    imageAsset: 'assets/images/products/placemat-set.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/placemat-set.jpg',
    descriptionBn: 'চা, কফি ও পানির গ্লাসের নিচে রাখার জন্য টেকসই ও নান্দনিক ছোট ব্রেইডেড কোস্টার সেট।',
    descriptionEn: 'Set of 6 absorbent circular braided jute drink coasters.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Set of 6', titleBn: '৬টির সেট', price: 250),
    ],
  ),
  ProductModel(
    id: 'P12',
    category: 'home',
    slug: 'jute-plant-hanger',
    titleEn: 'Jute Plant Hanger (Shika)',
    titleBn: 'ঐতিহ্যবাহী পাটের শিকা (প্ল্যান্ট হ্যাঙ্গার)',
    badgeText: 'ঐতিহ্যবাহী',
    imageAsset: 'assets/images/products/plant-hanger.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/plant-hanger.jpg',
    descriptionBn: 'বাংলার গ্রামীণ ঐতিহ্যের মেক্রামে শিকা। বারান্দা বা ঘরের ভেতরে মানিপ্ল্যান্ট ও ইনডোর টব ঝুলিয়ে রাখার উপযুক্ত।',
    descriptionEn: 'Authentic traditional macrame jute shika plant hanger for indoor and balcony greenery.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard 36"', titleBn: '৩৬ ইঞ্চি ঝুল', price: 400),
    ],
  ),
  ProductModel(
    id: 'P13',
    category: 'office',
    slug: 'jute-file-folder',
    titleEn: 'Jute Executive File Folder',
    titleBn: 'এক্সিকিউটিভ পাটের ফাইল ফোল্ডার',
    imageAsset: 'assets/images/products/file-folder.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/file-folder.jpg',
    descriptionBn: 'লেদার বাটন ক্লিপ এবং অফিস ডকুমেন্ট রাখার জন্য কর্পোরেট এক্সিকিউটিভ পাটের ফোল্ডার। কনফারেন্স ও সেমিনারে বিশেষ সমাদৃত।',
    descriptionEn: 'Corporate conference document folder crafted from refined jute with leather button fastener.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'A4 Size', titleBn: 'এ৪ সাইজ', price: 320),
    ],
  ),
  ProductModel(
    id: 'P14',
    category: 'gifts',
    slug: 'jute-gift-hamper-box',
    titleEn: 'Jute Gift Hamper Box',
    titleBn: 'পাটের গিফট হ্যাম্পার বক্স',
    badgeText: 'গিফট প্যাক',
    imageAsset: 'assets/images/products/gift-box.jpg',
    imageUrl: 'https://paatbari.vercel.app/images/products/gift-box.jpg',
    descriptionBn: 'উৎসব, বিয়ে ও কর্পোরেট গিফটিং এর জন্য ঢাকনাসহ বিলাসবহুল পাটের গিফট বক্স। পরিবেশবান্ধব ও চিরস্থায়ী স্মারক।',
    descriptionEn: 'Luxury covered woven jute gift hamper box with ribbon accents for festive and corporate packaging.',
    variants: [
      ProductVariantModel(key: 'std', titleEn: 'Standard', titleBn: 'স্ট্যান্ডার্ড', price: 650),
    ],
  ),
];

final allProductsProvider = Provider<List<ProductModel>>((ref) {
  return initialProductList;
});

final selectedCategoryProvider = StateProvider<String>((ref) => 'all');
final searchQueryProvider = StateProvider<String>((ref) => '');

final filteredProductsProvider = Provider<List<ProductModel>>((ref) {
  final category = ref.watch(selectedCategoryProvider);
  final query = ref.watch(searchQueryProvider).trim().toLowerCase();
  final all = ref.watch(allProductsProvider);

  return all.where((product) {
    final matchesCategory = category == 'all' || product.category == category;
    final matchesQuery = query.isEmpty ||
        product.titleBn.toLowerCase().contains(query) ||
        product.titleEn.toLowerCase().contains(query) ||
        product.slug.toLowerCase().contains(query);
    return matchesCategory && matchesQuery;
  }).toList();
});
