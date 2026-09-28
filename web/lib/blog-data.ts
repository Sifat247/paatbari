export interface BlogPost {
  slug: string;
  titleBn: string;
  titleEn: string;
  excerptBn: string;
  excerptEn: string;
  categoryBn: string;
  categoryEn: string;
  readTimeBn: string;
  readTimeEn: string;
  dateBn: string;
  dateEn: string;
  author: string;
  contentBn: string[];
  contentEn: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "paat-ponner-jotno",
    titleBn: "পাটের পণ্যের সঠিক যত্ন ও সংরক্ষণের উপায়",
    titleEn: "How to Care for and Clean Your Handcrafted Jute Products",
    excerptBn:
      "পাটের ব্যাগ ও হোম ডেকর দীর্ঘদিন নতুনের মতো উজ্জ্বল ও মজবুত রাখতে সহজ কিছু নিয়ম মেনে চলুন।",
    excerptEn:
      "Simple, practical guidelines to keep your natural jute bags, baskets, and mats looking pristine for years.",
    categoryBn: "যত্ন ও টিপস",
    categoryEn: "Care Guide",
    readTimeBn: "৪ মিনিট পাঠ",
    readTimeEn: "4 min read",
    dateBn: "২৭ সেপ্টেম্বর ২০২৬",
    dateEn: "27 Sep 2026",
    author: "সিফাত (Sifat), পাটবাড়ি",
    contentBn: [
      "পাট শতভাগ প্রাকৃতিক ও বায়োডিগ্রেডেবল আঁশ। সঠিক যত্ন নিলে একটি পাটের ব্যাগ বা ঝুড়ি বছরের পর বছর স্বাভাবিক আকৃতি ও সৌন্দর্য বজায় রাখে। নিচে কিছু জরুরি পরামর্শ দেওয়া হলো:",
      "১. সরাসরি পানি দিয়ে ধোবেন না: পাটের প্রাকৃতিক তন্তু বেশি পানিতে ভেজালে তা ফুলে ওঠে এবং ফিনিশিং নষ্ট হতে পারে। দাগ লাগলে হালকা ভেজা নরম সুতি কাপড় ও মৃদু সাবান দিয়ে আলতোভাবে মুছে নিন।",
      "২. ছায়াযুক্ত স্থানে শুকান: পানি লাগলে কড়া প্রখর রোদে না ফেলে ছায়ায় বা ফ্যানের বাতাসে শুকাতে দিন। অতিরিক্ত তাপে পাটের সুতা ভঙ্গুর হতে পারে।",
      "৩. ভ্যাকুয়াম বা ব্রাশ করুন: ফ্লোর রাগ ও স্টোরেজ ঝুড়িতে জমে থাকা ধূলো পরিষ্কার করতে সপ্তাহে একবার নরম ব্রাশ দিয়ে ঝেড়ে নিন অথবা কম শক্তিতে ভ্যাকুয়াম ক্লিনার ব্যবহার করুন।",
      "৪. স্যাঁতসেঁতে স্থানে রাখবেন না: বর্ষাকালে বদ্ধ জায়গায় না রেখে বাতাস চলাচল করে এমন শুকনো জায়গায় সংরক্ষণ করুন। প্রয়োজনে মাঝে মাঝে হালকা বাতাসে রাখুন।",
      "প্রাকৃতিক পাটের টেকসই জীবনযাত্রাকে ভালোবেসে এই যত্নটুকু নিলে আপনার পছন্দের পণ্যটি থাকবে চিরসবুজ।"
    ],
    contentEn: [
      "Jute is a 100% natural, biodegradable vegetal fibre. With basic mindful care, your handcrafted jute totes, storage baskets, and rugs will endure for years while retaining their organic charm.",
      "1. Spot clean, never submerge: Excessive water causes raw jute fibers to swell and distort. If soiled, spot clean gently with a damp cotton cloth and mild detergent.",
      "2. Dry in shaded breeze: Avoid intense scorching sun, which can make natural golden fibres brittle. Air-dry in shaded, ventilated spaces.",
      "3. Gentle brushing for rugs and baskets: To remove household dust from rugs and storage baskets, gently use a soft-bristled brush or low-suction vacuum once a week.",
      "4. Store in dry ventilated areas: Keep away from damp or humid corners during monsoons to preserve the fiber integrity.",
      "Caring for natural artisanal goods is an investment in mindful, plastic-free living."
    ]
  },
  {
    slug: "keno-paat",
    titleBn: "কেন পাট? প্লাস্টিকের সেরা পরিবেশবান্ধব বিকল্প",
    titleEn: "Why Jute? The Ultimate Sustainable Alternative to Plastic",
    excerptBn:
      "পরিবেশের ভারসাম্য রক্ষা এবং টেকসই জীবনযাত্রায় সোনালি আঁশ কেন বিশ্বজুড়ে শ্রেষ্ঠ হিসেবে সমাদৃত।",
    excerptEn:
      "Discover why the world is turning back to Bengal's golden fibre as the most powerful antidote to plastic pollution.",
    categoryBn: "পরিবেশ ও সাসটেইনেবিলিটি",
    categoryEn: "Sustainability",
    readTimeBn: "৫ মিনিট পাঠ",
    readTimeEn: "5 min read",
    dateBn: "২৫ সেপ্টেম্বর ২০২৬",
    dateEn: "25 Sep 2026",
    author: "পাটবাড়ি রিসার্চ টিম",
    contentBn: [
      "প্রতি বছর বিশ্বে লাখ লাখ টন একবার ব্যবহার্য প্লাস্টিক নদী, নালা ও সমুদ্রকে বিষাক্ত করে তুলছে। এই সংকটময় সময়ে প্রকৃতির সবচেয়ে বড় আশীর্বাদ হলো বাংলাদেশের সোনালি আঁশ — পাট।",
      "১. শতভাগ বায়োডিগ্রেডেবল ও কম্পোস্টেবল: যেখানে একটি প্লাস্টিক ব্যাগ মাটিতে মিশে যেতে ৪০০-৫০০ বছর সময় নেয়, সেখানে একটি পাটের ব্যাগ মাত্র কয়েক মাসের মধ্যে মাটিতে মিশে জৈব সারে পরিণত হয়।",
      "২. কার্বন শোষণ ও মাটির উর্বরতা: পাট চাষের সময় এক হেক্টর পাট গাছ বাতাস থেকে প্রায় ১৫ টন কার্বন ডাই অক্সাইড শোষণ করে এবং ১১ টন অক্সিজেন নির্গমন করে। এছাড়া পাটের ঝরে পড়া পাতা মাটির উর্বরতা বাড়ায়।",
      "৩. দীর্ঘস্থায়িত্ব ও শক্তি: পাটের তন্তুর টেনসাইল শক্তি সিন্থেটিক ফাইবারের চেয়েও অনেক বেশি। একটি পাটের টোট ব্যাগ অনায়াসে ১০-১৫ কেজি ভার বহন করতে পারে এবং বছরের পর বছর বারবার ব্যবহার করা যায়।",
      "৪. দেশীয় ঐতিহ্যের গৌরব: পাট ব্যবহার মানে কেবল পরিবেশ রক্ষা নয়, বরং বাংলাদেশের লক্ষাধিক কৃষক ও নারী তাঁতিদের অর্থনৈতিক স্বাবলম্বী করা।",
      "তাই আজই প্লাস্টিককে না বলুন, পাটবাড়ি-র সাথে সোনালি আঁশকে আপন করে নিন।"
    ],
    contentEn: [
      "Millions of tons of non-recyclable synthetic plastics enter our ecosystems each year. Bengal's golden jute offers the most elegant, circular antidote to this crisis.",
      "1. Rapid Biodegradability: While synthetic polymers linger for five centuries, raw jute returns to the soil as organic compost within 3 to 6 months.",
      "2. High Carbon Sequestration: During its 100-day rapid growth cycle, one hectare of jute plants consumes roughly 15 tons of carbon dioxide and yields 11 tons of clean oxygen.",
      "3. Superior Tensile Strength: Jute fibers have incredible weight-bearing capacity. A standard Paatbari tote comfortably supports 12–15 kg without tearing.",
      "4. Socio-economic Empowerment: Choosing jute directly sustains Bangladeshi farming households and rural craftswomen who preserve heritage handloom arts.",
      "Join the movement: step away from single-use plastics and embrace durable, natural golden fibers."
    ]
  },
  {
    slug: "corporate-gift-ideas",
    titleBn: "কর্পোরেট গিফট আইডিয়া: টেকসই, প্রিমিয়াম ও রুচিশীল",
    titleEn: "Corporate Gifting Redefined: Sustainable, Premium, and Memorable",
    excerptBn:
      "কনফারেন্স, সেমিনার ও উৎসবের গিফটিংয়ে প্লাস্টিক বা কৃত্রিম পণ্যের বদলে পরিবেশবান্ধব পাটের উপহার কেন এগিয়ে।",
    excerptEn:
      "Elevate your brand with customized eco-friendly jute promotional bags, conference folios, and hamper boxes.",
    categoryBn: "কর্পোরেট সলিউশন",
    categoryEn: "Corporate & B2B",
    readTimeBn: "৪ মিনিট পাঠ",
    readTimeEn: "4 min read",
    dateBn: "২২ সেপ্টেম্বর ২০২৬",
    dateEn: "22 Sep 2026",
    author: "পাটবাড়ি B2B টিম",
    contentBn: [
      "আধুনিক কর্পোরেট ব্র্যান্ডিংয়ে পরিবেশ সচেতনতা বা ESG কমপ্লায়েন্স এখন অত্যন্ত গুরুত্বপূর্ণ। সস্তা চায়নিজ প্লাস্টিক উপহারের বদলে পরিবেশবান্ধব হস্তনির্মিত পাটপণ্য উপহার দেওয়া এখন আভিজাত্যের প্রতীক।",
      "১. কাস্টম লোগো প্রিন্টেড টোট ব্যাগ: কনফারেন্স, এজিএম কিংবা ওয়ার্কশপে অংশগ্রহণকারীদের হাতে যখন আপনার ব্র্যান্ড লোগো সংবলিত ক্লাসিক পাটের টোট ব্যাগ থাকবে, তা ইভেন্টের পরেও প্রতিদিন ব্যবহৃত হবে।",
      "২. প্রিমিয়াম অফিস ফোল্ডার ও নোটবুক কাভার: প্লাস্টিক ফাইলের বদলে পাটের ফাইল ফোল্ডার অফিসের যে কারও টেবিলে আধুনিক রুচির সাক্ষ্য বহন করে।",
      "৩. এক্সক্লুসিভ গিফট হ্যাম্পার বক্স: উৎসব বা ক্লায়েন্ট এপ্রিসিয়েশনে পাটের তৈরি হ্যাম্পার বক্সে মিষ্টি, ড্রাইড ফ্রুটস বা উপহার পরিবেশন করা রুচিশীল পছন্দের বহিঃপ্রকাশ।",
      "৪. বাল্ক কোটেশন ও কাস্টমাইজেশন: পাটবাড়িতে ৫০ পিস থেকে শুরু করে বাল্ক কোটেশন ক্যালকুলেট করা যায় এবং নিজস্ব লোগো স্ক্রিন বা ডিজিটাল প্রিন্ট করে কারখানা থেকে দ্রুত সরবরাহ করা হয়।",
      "আপনার পরবর্তী ব্র্যান্ড ক্যাম্পেইনকে টেকসই করতে আজই পাটবাড়ির কর্পোরেট টিমের সাথে যোগাযোগ করুন।"
    ],
    contentEn: [
      "Modern corporate gifting has shifted from disposable knick-knacks to purposeful, sustainable items reflecting brand environmental consciousness (ESG).",
      "1. Branded Event & Tote Bags: Ideal for AGMs, international symposiums, and expos. Your screen-printed logo remains visible on durable totes for daily commutes.",
      "2. Artisanal Document Portfolios: Replace synthetic vinyl folders with hand-woven jute document holders for boardrooms and executive desks.",
      "3. Handcrafted Festive Hamper Boxes: Luxurious woven hamper boxes convey genuine warmth for Eid, Diwali, or year-end client appreciation.",
      "4. Streamlined B2B Volume Pricing: From 50 units upwards, Paatbari provides instant tier pricing, proof approvals, and direct-from-factory dispatch.",
      "Elevate your corporate brand presence with sustainable Bangladeshi heritage."
    ]
  }
];
