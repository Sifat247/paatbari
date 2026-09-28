export interface PresentationStat {
  label: string;
  value: string;
  desc?: string;
}

export interface PresentationHighlight {
  title: string;
  desc: string;
  badge?: string;
}

export interface SlideItem {
  id: number;
  tag: string;
  titleBn: string;
  titleEn: string;
  subtitleBn?: string;
  subtitleEn?: string;
  theme: "forest" | "cream" | "gold" | "dark";
  layout: "cover" | "split" | "grid" | "stats" | "portfolio" | "timeline" | "contact";
  bulletsBn: string[];
  bulletsEn: string[];
  image?: string;
  imageCaption?: string;
  stats?: PresentationStat[];
  highlights?: PresentationHighlight[];
  quoteText?: string;
  quoteAuthor?: string;
  speakerNotesBn: string;
}

export const PRESENTATION_METADATA = {
  title: "পাটবাড়ি (Paatbari) — বিজনেস প্রেজেন্টেশন ও পিচ ডেক",
  presenter: "Sifat Phychee",
  designation: "প্রতিষ্ঠাতা ও স্বত্বাধিকারী",
  company: "পাটবাড়ি · Paatbari",
  location: "মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০, বাংলাদেশ",
  phone: "01793648214",
  email: "sifatphychee@gmail.com",
  website: "paatbari.vercel.app",
  version: "২.০ (বিজনেস ও কর্পোরেট পিচ)",
  date: "২০২৬",
};

export const INITIAL_SLIDES: SlideItem[] = [
  {
    id: 1,
    tag: "বিজনেস পিচ ডেক · ২০২৬",
    titleBn: "পাটবাড়ি (Paatbari)",
    titleEn: "Paatbari · Home of the Golden Fibre",
    subtitleBn: "সোনালি আঁশের আধুনিক পুনর্জাগরণ ও পরিবেশবান্ধব লাইফস্টাইল",
    subtitleEn: "Reviving Bangladesh's Golden Fibre into Modern Eco-Luxury",
    theme: "forest",
    layout: "cover",
    bulletsBn: [
      "১০০% খাঁটি ও বায়োডিগ্রেডেবল প্রাকৃতিক পাটপণ্য",
      "মানিকগঞ্জ সদরের স্থানীয় তাঁতি ও নারী কারিগরদের ভালোবাসা ও দক্ষতায় প্রস্তুত",
      "কর্পোরেট গিফটিং, লাইফস্টাইল ফ্যাশন ও হোম ডেকর সল্যুশন",
      "৬৪ জেলায় হোম ডেলিভারি ও আন্তর্জাতিক রপ্তানি সক্ষমতা",
    ],
    bulletsEn: [
      "100% biodegradable natural golden jute products",
      "Handcrafted by rural master weavers in Manikganj, Bangladesh",
      "Tailored for corporate gifting, modern living, and eco-exports",
    ],
    image: "/images/products/classic-tote.jpg",
    imageCaption: "পাটবাড়ি ক্লাসিক টোট ব্যাগ — আভিজাত্য ও প্রকৃতির অপূর্ব মেলবন্ধন",
    speakerNotesBn:
      "ভূমিকা: আসসালামু আলাইকুম এবং সবাইকে শুভেচ্ছা। আমি Sifat Phychee, পাটবাড়ি-র প্রতিষ্ঠাতা। আজ আপনাদের সামনে উপস্থাপন করছি বাংলাদেশের ঐতিহ্যবাহী সোনালি আঁশের এক আধুনিক ও বাণিজ্যিক সম্ভাবনা।",
  },
  {
    id: 2,
    tag: "বাজার প্রেক্ষাপট ও পরিবেশ সংকট",
    titleBn: "প্লাস্টিক নিষিদ্ধকরণ ও টেকসই প্যাকেজিং বিপ্লব",
    titleEn: "The Global Shift Away From Single-Use Plastics",
    subtitleBn: "পরিবেশ রক্ষার তাগিদ এবং বিশ্ববাজারে প্রাকৃতিক পাটের ক্রমবর্ধমান চাহিদা",
    subtitleEn: "Environmental urgency creating a multibillion-dollar natural fiber market",
    theme: "dark",
    layout: "stats",
    bulletsBn: [
      "বিশ্বব্যাপী পলিথিন ও একবার ব্যবহার্য প্লাস্টিক নিষিদ্ধকরণ আইন কঠোর হচ্ছে (EU, USA, Asia)",
      "কর্পোরেট প্রতিষ্ঠানগুলোর ESG এবং কার্বন নিঃসরণ হ্রাসে পরিবেশবান্ধব প্যাকেজিং গ্রহণ বাধ্যতামূলক",
      "বিশ্ববাজারে কৃত্রিম ফাইবারের বিকল্প হিসেবে খাঁটি পাটের চাহিদা বছরে ১২.৮% হারে বৃদ্ধি পাচ্ছে",
      "বাংলাদেশ বিশ্বের সেরা মানের সোনালি পাটের প্রধান প্রাকৃতিক উৎপাদক",
    ],
    bulletsEn: [
      "Worldwide bans on single-use plastics driving demand for natural alternatives",
      "Corporate ESG commitments mandating green supply chains and zero-plastic policies",
      "Global jute product market projected to exceed $3.8 Billion by 2029",
    ],
    stats: [
      { label: "বৈশ্বিক মার্কেট সাইজ", value: "$৩.৮B+", desc: "২০২৯ সাল নাগাদ প্রত্যাশিত বাজার" },
      { label: "বার্ষিক প্রবৃদ্ধি", value: "১২.৮%", desc: "টেকসই ফাইবারের বার্ষিক চাহিদা বৃদ্ধি" },
      { label: "প্লাস্টিক বর্জন", value: "০%", desc: "আমাদের প্রতিটি পণ্যে শূন্য প্লাস্টিক" },
      { label: "কার্বন ইম্প্যাক্ট", value: "-১৫ টন", desc: "প্রতি হেক্টর পাটে CO2 শোষণ" },
    ],
    speakerNotesBn:
      "বাজারের প্রয়োজনীয়তা: প্লাস্টিকের বিকল্প হিসেবে পাট কেবল পরিবেশবান্ধবই নয়, বরং এটি একটি বৈশ্বিক অর্থনৈতিক ট্রেন্ড। প্রতিষ্ঠানগুলো এখন প্লাস্টিক ও নন-ওভেন ব্যাগ বাদ দিয়ে পাটের দিকে ঝুঁকছে।",
  },
  {
    id: 3,
    tag: "সোনালি আঁশের শ্রেষ্ঠত্ব",
    titleBn: "কেন বাংলাদেশের পাট বিশ্বসেরা?",
    titleEn: "The Unique Competitive Advantage of Bangladesh Jute",
    subtitleBn: "বিজ্ঞানসম্মত বৈশিষ্ট্য যা পাটকে অন্যান্য ফাইবারের চেয়ে অনন্য করে তোলে",
    subtitleEn: "Tensile strength, zero carbon footprint, and complete biodegradability",
    theme: "cream",
    layout: "split",
    bulletsBn: [
      "শতভাগ বায়োডিগ্রেডেবল: ব্যবহারের পর মাটিতে ফেললে মাত্র ৬০–৯০ দিনে সম্পূর্ণ জৈব সারে পরিণত হয়",
      "উচ্চ ভারবহন ক্ষমতা: তুলার চেয়ে ৪ গুণ শক্ত এবং শতভাগ প্রসার্য শক্তি সম্পন্ন",
      "কার্বন নেগেটিভ ফসল: ১ হেক্টর পাট চাষ মাত্র ১০০ দিনে ১৫ টন ক্ষতিকর CO2 শোষণ করে ও ১১ টন বিশুদ্ধ অক্সিজেন ছড়ায়",
      "থার্মাল ইনসুলেশন: তাপ সহনশীল ও অ্যান্টি-স্ট্যাটিক গুণের কারণে টেকসই ও দীর্ঘস্থায়ী",
    ],
    bulletsEn: [
      "Completely compostable: decomposes into organic soil nutrients within 60 to 90 days",
      "Superior tensile strength: 4x stronger load-bearing capacity compared to cotton",
      "Carbon negative: 1 hectare of jute consumes 15 tons of CO2 in just 100 days",
      "Natural thermal and acoustic insulation properties",
    ],
    image: "/images/products/storage-basket.jpg",
    imageCaption: "হাতে বোনা প্রাকৃতিক স্পাইরাল পাটের স্টোরেজ ঝুড়ি",
    speakerNotesBn:
      "পণ্যের গুণমান: কেন পাট? কারণ তুলা উৎপাদনে প্রচুর পানি ও কীটনাশক লাগে, কিন্তু পাট প্রাকৃতিকভাবেই বৃষ্টিজলে বৃদ্ধি পায় এবং পরিবেশের কার্বন শুষে নেয়। এটি সত্যিকারের 'সবুজ বিপ্লব'।",
  },
  {
    id: 4,
    tag: "পণ্য পোর্টফোলিও",
    titleBn: "আমাদের ৪টি মূল প্রডাক্ট উইং",
    titleEn: "Comprehensive Product Portfolio",
    subtitleBn: "প্রাত্যহিক লাইফস্টাইল থেকে প্রিমিয়াম লিভিং ও অফিস সল্যুশন",
    subtitleEn: "Four specialized categories serving diverse commercial and residential demands",
    theme: "forest",
    layout: "portfolio",
    bulletsBn: [
      "১. ফ্যাশন ও লাইফস্টাইল ব্যাগ: ক্লাসিক টোট, এক্সিকিউটিভ ল্যাপটপ ব্যাগ, লেডিস হ্যান্ডব্যাগ, বাজারের ব্যাগ",
      "২. হোম ও ইন্টেরিয়র ডেকর: বৃত্তাকার ফ্লোর রাগ, স্পাইরাল স্টোরেজ ঝুড়ি, স্ক্যান্ডিনেভিয়ান কুশন কভার",
      "৩. কিচেন ও ডাইনিংওয়্যার: হস্তশিল্প ডাইনিং টেবিল রানার, তাপ-প্রতিরোধক প্লেসম্যাট ও কোস্টার সেট",
      "৪. কর্পোরেট ও অফিস সামগ্রী: লেদার ফিনিশ ফাইল ফোল্ডার, কনফারেন্স ডকু হোল্ডার, লাক্সারি গিফট হ্যাম্পার",
    ],
    bulletsEn: [
      "1. Fashion & Lifestyle: Classic Totes, Padded Laptop Sleeves, Elegant Handbags",
      "2. Home & Living: Braided Mandala Floor Rugs, Coiled Baskets, Textured Cushion Covers",
      "3. Kitchen & Table: Artisanal Table Runners, Heat-Resistant Placemats & Drink Coasters",
      "4. Corporate Stationery: Luxury File Folders, Conference Portfolios, Gift Hamper Sets",
    ],
    highlights: [
      { title: "ব্যাগ কালেকশন", desc: "টোট ব্যাগ, ল্যাপটপ ব্যাগ ও হ্যান্ডব্যাগ", badge: "বেস্টসেলার" },
      { title: "হোম ডেকোর", desc: "ফ্লোর রাগ, স্টোরেজ বাস্কেট, কুশন", badge: "প্রিমিয়াম" },
      { title: "টেবিল ও ডাইনিং", desc: "টেবিল রানার ও প্লেসম্যাট সেট", badge: "হস্তশিল্প" },
      { title: "কর্পোরেট গিফট", desc: "ফাইল ফোল্ডার ও লাক্সারি হ্যাম্পার বক্স", badge: "B2B বাল্ক" },
    ],
    speakerNotesBn:
      "পোর্টফোলিও: আমরা শুধু সাধারণ পাটের বস্তা বানাচ্ছি না; আমরা পাটকে আধুনিক ডিজাইন, নান্দনিকতা এবং প্রিমিয়াম লাইফস্টাইলে রূপান্তর করেছি যাতে দেশি ও বিদেশি উভয় গ্রাহক এটি সানন্দে ব্যবহার করে।",
  },
  {
    id: 5,
    tag: "সামাজিক দায়বদ্ধতা ও প্রভাব",
    titleBn: "মানিকগঞ্জের তাঁতের ঐতিহ্য ও গ্রামীণ কারিগর",
    titleEn: "Artisan Empowerment & Rural Heritage at Manikganj",
    subtitleBn: "মধ্যস্বত্বভোগীহীন ন্যায্য মজুরি এবং দেশীয় তাঁতশিল্পের পুনর্জাগরণ",
    subtitleEn: "Fair wages, ethical employment, and preserving age-old Bangladeshi loom crafts",
    theme: "cream",
    layout: "split",
    bulletsBn: [
      "উৎপাদন কেন্দ্র: মানিকগঞ্জ সদর ও এর প্রত্যন্ত অঞ্চলের অভিজ্ঞ তাঁতিদের নিয়ে গড়ে তোলা নিবেদিত ওয়ার্কশপ",
      "৫০+ গ্রামীণ কারিগর ও নারী উদ্যোক্তার নিয়মিত কর্মসংস্থান ও আর্থিক স্বনির্ভরতা নিশ্চিতকরণ",
      "কোনো কৃত্রিম রাসায়নিক বা টক্সিক ডাই ব্যবহার করা হয় না — সম্পূর্ণ স্বাস্থ্যসম্মত হস্তশিল্প",
      "ঐতিহ্যবাহী মেক্রামে ও হ্যান্ডলুম বুনন কৌশল প্রজন্ম থেকে প্রজন্মান্তরে টিকিয়ে রাখার উদ্যোগ",
    ],
    bulletsEn: [
      "Production Hub: Dedicated artisan workshop in Manikganj Sadar, Bangladesh",
      "Direct livelihood for 50+ rural master weavers and marginalized women artisans",
      "Strict zero-chemical, non-toxic manufacturing processes",
      "Preserving traditional handloom and macrame knotting crafts for future generations",
    ],
    image: "/images/artisan/artisan-loom.jpg",
    imageCaption: "মানিকগঞ্জের তাঁতে পরম যত্নে বোনা হচ্ছে প্রতিটি পাটপণ্যের সুতো",
    speakerNotesBn:
      "সামাজিক প্রভাব: পাটবাড়ি কেবল একটি ব্র্যান্ড নয়, এটি মানিকগঞ্জের গ্রামীণ তাঁতিদের মর্যাদার প্ল্যাটফর্ম। প্রতিটি ক্রয়ের মাধ্যমে সরাসরি কারিগরদের ঘরে স্বচ্ছলতা পৌঁছায়।",
  },
  {
    id: 6,
    tag: "কর্পোরেট ও রপ্তানি সুবিধা",
    titleBn: "B2B বাল্ক অর্ডার ও ব্র্যান্ড কাস্টমাইজেশন",
    titleEn: "Corporate Customization & High-Volume B2B Supply",
    subtitleBn: "যেকোনো কনফারেন্স, বার্ষিক সাধারণ সভা বা ক্লায়েন্ট গিফটিংয়ের জন্য পূর্ণাঙ্গ সমাধান",
    subtitleEn: "End-to-end bespoke branding, screen-printing, and volume delivery",
    theme: "gold",
    layout: "grid",
    bulletsBn: [
      "কাস্টম লোগো ব্র্যান্ডিং: স্ক্রিন প্রিন্টিং, ডিজিটাল প্রিন্ট বা লেদার ব্যাজ সংযোজন সুবিধা",
      "নমনীয় ন্যূনতম অর্ডার: সর্বনিম্ন ৫০ পিস থেকে শুরু করে ৫০,০০০+ পিস সরবরাহ সক্ষমতা",
      "টায়ারভিত্তিক ভলিউম ডিসকাউন্ট: ৫০+ পিসে ১৫%, ২০০+ পিসে ২৫% এবং ৫০০+ পিসে ৩৫% পর্যন্ত ছাড়",
      "টাইমলি ডেলিভারি গ্যারান্টি: মানিকগঞ্জ প্রোডাকশন হাব থেকে দেশজুড়ে এবং আন্তর্জাতিক পোর্টে দ্রুত ডেলিভারি",
    ],
    bulletsEn: [
      "Custom Corporate Branding: Screen printing, foil stamping, or embossed leather tags",
      "Flexible Minimum Order Quantity (MOQ): Starts at only 50 pieces up to 50,000+ units",
      "Tiered Volume Pricing: 15% discount for 50+, 25% for 200+, 35% for 500+ pieces",
      "Punctual Dispatch: Direct factory-to-doorstep logistics with end-to-end tracking",
    ],
    highlights: [
      { title: "MOQ: মাত্র ৫০ পিস", desc: "ছোট-বড় যেকোনো ইভেন্টের জন্য উপযুক্ত", badge: "নমনীয়" },
      { title: "লোগো প্রিন্টিং", desc: "হাই-ডেফিনিশন ব্র্যান্ড লোগো ও মেসেজিং", badge: "কাস্টম" },
      { title: "৩৫% ভলিউম সেভিং", desc: "বাল্ক অর্ডারে সর্বোচ্চ পাইকারি সাশ্রয়", badge: "সাশ্রয়ী" },
      { title: "রপ্তানি প্যাকেজিং", desc: "আন্তর্জাতিক স্ট্যান্ডার্ড আর্দ্রতারোধী প্যাকিং", badge: "মানসম্মত" },
    ],
    speakerNotesBn:
      "কর্পোরেট সুবিধা: আমাদের B2B ক্লায়েন্টরা যেমন ব্যাংক, বিশ্ববিদ্যালয়, টেলিকম বা এনজিও—তাদের নির্দিষ্ট কালার ও লোগো দিয়ে আমরা নিখুঁত পণ্য তৈরি করে দেই।",
  },
  {
    id: 7,
    tag: "মান নিয়ন্ত্রণ ও নিশ্চয়তা",
    titleBn: "আন্তর্জাতিক গুণগত মান ও প্রতিশ্রুতি",
    titleEn: "Strict Quality Control & Ecological Standards",
    subtitleBn: "প্রতিটি পণ্যের দীর্ঘস্থায়িত্ব ও ফিনিশিং নিশ্চিত করার প্রক্রিয়া",
    subtitleEn: "Triple-stage quality auditing, zero microplastics, and exceptional load resilience",
    theme: "dark",
    layout: "stats",
    bulletsBn: [
      "৩ স্তরের কোয়ালিটি চেকিং: সুতো নির্বাচন, বুনন পর্যবেক্ষণ এবং ফিনিশিং অডিট",
      "হেভি-ডিউটি রিইনফোর্সমেন্ট: ব্যাগের হাতল ও তলায় বিশেষ সেলাই যা ৭-১০ কেজি পর্যন্ত ভার বহন করে",
      "৭ দিনের সহজ রিপ্লেসমেন্ট পলিসি: উৎপাদনে কোনো ত্রুটি থাকলে বিনা খরচে পরিবর্তন সুবিধা",
      "জিরো মাইক্রোপ্লাস্টিক: সমুদ্র ও মাটিতে কোনো ক্ষতিকর কণা ছড়ায় না",
    ],
    bulletsEn: [
      "3-Stage Quality Audit: Raw fiber grading, weaving density check, and stress tests",
      "Reinforced heavy-duty stitching: Totes easily handle 7 to 10 kg everyday load",
      "Zero Microplastics Guarantee: Certified 100% natural, healthy, and circular",
      "7-Day replacement assurance for any manufacturing discrepancies",
    ],
    stats: [
      { label: "ভারবহন ক্ষমতা", value: "১০+ কেজি", desc: "রিইনফোর্সড হ্যান্ডেল" },
      { label: "লাইফস্প্যান", value: "৫–৭ বছর", desc: "দৈনন্দিন সাধারণ ব্যবহারে" },
      { label: "বায়োডিগ্রেডেবল", value: "১০০%", desc: "মাটিতে সম্পূর্ণ পচনশীল" },
      { label: "রিপ্লেসমেন্ট পলিসি", value: "৭ দিন", desc: "শতভাগ গ্রাহক সন্তুষ্টি" },
    ],
    speakerNotesBn:
      "কোয়ালিটি কন্ট্রোল: পাটের পণ্যে অনেকের অভিযোগ থাকে ফিনিশিং বা লোম ওঠার। পাটবাড়িতে আমরা রিফাইন্ড ওয়াশ ও স্পেশাল শিয়ারিং ব্যবহার করি, ফলে পণ্য মসৃণ ও প্রিমিয়াম থাকে।",
  },
  {
    id: 8,
    tag: "বাণিজ্যিক ক্লায়েন্ট ও সাফল্য",
    titleBn: "যাদের সাথে আমরা কাজ করছি",
    titleEn: "Commercial Traction & Strategic Use Cases",
    subtitleBn: "দেশীয় ও আন্তর্জাতিক বাজারে পাটপণ্যের সফল প্রয়োগ ক্ষেত্র",
    subtitleEn: "Proven adoption across corporate gifts, hospitality, and retail",
    theme: "cream",
    layout: "grid",
    bulletsBn: [
      "কর্পোরেট কনফারেন্স ও সেমিনার কিটস: এনজিও, বহুজাতিক প্রতিষ্ঠান ও ব্যাংকের পরিবেশবান্ধব ব্যাগ",
      "হসপিটালিটি ও রিসোর্ট ডেকর: ফাইভ স্টার রিসোর্ট ও ইকো-হোটেলে পাটবাড়ি টেবিল রানার ও ম্যাট",
      "উৎসব ও উপহার হ্যাম্পার: ঈদ, নববর্ষ ও কর্পোরেট উপহার হিসেবে লাক্সারি জুট গিফট বক্স",
      "ডিজিটাল ডিট্যুসি (D2C) প্ল্যাটফর্ম: paatbari.vercel.app এবং ফ্লটার অ্যাপের মাধ্যমে সারাদেশে সরাসরি বিক্রি",
    ],
    bulletsEn: [
      "Conference & Summit Kits: Custom branded tote kits for multilateral forums and banks",
      "Luxury Eco-Resorts & Cafes: Table runners, floor rugs, and hanging shika planters",
      "Festive Hampers: Premium covered gift boxes for Eid, New Year, and celebrations",
      "Direct-to-Consumer (D2C): Nationwide reach via web and mobile application",
    ],
    highlights: [
      { title: "কর্পোরেট কিট", desc: "কনফারেন্স ফাইল ও ল্যাপটপ ব্যাগ", badge: "B2B" },
      { title: "ইকো রিসোর্ট", desc: "ডাইনিং প্লেসম্যাট ও ফ্লোর রাগ", badge: "হসপিটালিটি" },
      { title: "উৎসবে উপহার", desc: "গিফট হ্যাম্পার ও কুশন সেট", badge: "গিফটিং" },
      { title: "অনলাইন স্টোর", desc: "সারা দেশে ক্যাশ অন ডেলিভারি", badge: "D2C" },
    ],
    speakerNotesBn:
      "ক্লায়েন্ট ও ট্র্যাকশন: আমাদের মার্কেট মাল্টি-চ্যানেল। একদিকে কর্পোরেট বড় অর্ডার, অন্যদিকে ওয়েবসাইটের মাধ্যমে সরাসরি সচেতন ভোক্তাদের ঘরে পৌঁছানো।",
  },
  {
    id: 9,
    tag: "ভবিষ্যৎ রূপরেখা ও অংশীদারিত্ব",
    titleBn: "পাটবাড়ি-র টেকসই আগামীর ভিশন",
    titleEn: "Roadmap: Scaling Global Jute Innovation",
    subtitleBn: "উৎপাদন সক্ষমতা বৃদ্ধি, রপ্তানি সম্প্রসারণ ও টেকসই গবেষণার লক্ষ্য",
    subtitleEn: "Scaling monthly production, green export certification, and design labs",
    theme: "forest",
    layout: "timeline",
    bulletsBn: [
      "২০২৬: মানিকগঞ্জ উৎপাদন হাব সম্প্রসারণ এবং মাসিক উৎপাদন ক্ষমতা ২৫,০০০ ইউনিটে উন্নীতকরণ",
      "২০২৬-২৭: ইউরোপ, উত্তর আমেরিকা ও মধ্যপ্রাচ্যের পরিবেশবান্ধব বাজারে সরাসরি রপ্তানি শুরু",
      "ডিজাইন ইনোভেশন ল্যাব: পাটের সাথে অর্গানিক কটন ও ন্যাচারাল ডাই সংমিশ্রণে নতুন উদ্ভাবনী টেক্সটাইল",
      "১০০+ গ্রামীণ নারী তাঁতি ও কারিগরের সরাসরি স্থায়ী কর্মসংস্থান সৃষ্টির লক্ষ্যমাত্রা",
    ],
    bulletsEn: [
      "2026: Scaling Manikganj hub capacity to 25,000 units monthly output",
      "2026-27: Securing green export channels across Europe, North America & GCC",
      "Design Innovation Lab: Blended natural jute-linen fabrics and organic earth dyes",
      "Targeting sustainable livelihoods for 100+ rural women weavers",
    ],
    quoteText: "প্রকৃতিকে বাঁচানোর সবচেয়ে কার্যকর পথ হলো আমাদের শিকড়ে ফিরে যাওয়া — সোনালি আঁশই আমাদের ভবিষ্যতের সবুজ অর্থনীতি।",
    quoteAuthor: "Sifat Phychee · প্রতিষ্ঠাতা, পাটবাড়ি",
    speakerNotesBn:
      "ভবিষ্যৎ রূপরেখা: আমরা শুধু একটি লোকাল ব্র্যান্ড হয়ে থাকতে চাই না। মানিকগঞ্জ থেকে বিশ্ববাজারে বাংলাদেশের পাটকে এক নাম্বার পরিবেশবান্ধব ব্র্যান্ড হিসেবে প্রতিষ্ঠিত করাই আমাদের চূড়ান্ত লক্ষ্য।",
  },
  {
    id: 10,
    tag: "প্রশ্নোত্তর ও আনুষ্ঠানিক সমাপ্তি",
    titleBn: "আসুন, একসাথে টেকসই ভবিষ্যৎ গড়ি",
    titleEn: "Join Us in Building a Plastic-Free Sustainable World",
    subtitleBn: "আপনার প্রতিষ্ঠানের সাথে যৌথ উদ্যোগ ও ব্যবসায়িক অংশীদারিত্বের প্রত্যাশায়",
    subtitleEn: "Thank you for your valuable time. Let's partner for greener tomorrow.",
    theme: "forest",
    layout: "contact",
    bulletsBn: [
      "স্বত্বাধিকারী ও প্রতিষ্ঠাতা: Sifat Phychee",
      "হোয়াটসঅ্যাপ ও মোবাইল: 01793648214 (+880 1793-648214)",
      "অফিসিয়াল ইমেইল: sifatphychee@gmail.com",
      "প্রধান কার্যালয় ও উৎপাদন কেন্দ্র: মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০, বাংলাদেশ",
      "লাইভ ওয়েব পোর্টাল: paatbari.vercel.app",
    ],
    bulletsEn: [
      "Founder & Owner: Sifat Phychee",
      "Direct Helpline / WhatsApp: +880 1793-648214 (01793648214)",
      "Official Email: sifatphychee@gmail.com",
      "Headquarters & Hub: Manikganj Sadar, Manikganj 1800, Bangladesh",
      "Live Web Portal: paatbari.vercel.app",
    ],
    image: "/images/products/gift-box.jpg",
    imageCaption: "পাটবাড়ি — প্রকৃতির পরম স্পর্শে আপনার সাথে",
    speakerNotesBn:
      "সমাপ্তি ও ধন্যবাদ: আপনাদের মূল্যবান সময়ের জন্য আন্তরিক ধন্যবাদ। আপনাদের যেকোনো প্রশ্ন বা স্পেসিফিক রিকোয়ারমেন্ট থাকলে আমি সানন্দে উত্তর দেব। ধন্যবাদ।",
  },
];
