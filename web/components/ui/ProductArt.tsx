"use client";

import React, { useState } from "react";

export interface ProductArtProps {
  slug?: string;
  category?: string;
  image?: string;
  className?: string;
}

const PRODUCT_PHOTOS: Record<string, string> = {
  clutch: "/images/products/jute-clutch-wallet-studio.jpg",
  pearl_clutch: "/images/products/pearl-elegance-clutch-flat.jpg",
  boho_clutch: "/images/products/boho-fringed-clutch-close.jpg",
  pastel_clutch: "/images/products/pastel-blossom-clutch-flat.jpg",
  painted_clutch: "/images/products/hand-painted-clutch-flat.jpg",
  crescent_pouch: "/images/products/crescent-braided-pouch-model.jpg",
  marigold_tote: "/images/products/marigold-crochet-tote-stand.jpg",
  macrame_crossbody: "/images/products/beaded-macrame-crossbody-close.jpg",
  royal_blue_tote: "/images/products/royal-blue-tote-model-front.jpg",
  bumblebee_tote: "/images/products/bumblebee-tote-flat.jpg",
  nakshi_tapestry: "/images/products/nakshi-tapestry-artisan-full.jpg",
  pastel_earrings: "/images/products/pastel-floral-earrings-model.jpg",
  tote: "/images/products/classic-tote.jpg",
  laptop: "/images/products/laptop-bag.jpg",
  handbag: "/images/products/ladies-handbag.jpg",
  shopping: "/images/products/shopping-bag.jpg",
  backpack: "/images/products/travel-backpack.jpg",
  basket: "/images/products/storage-basket.jpg",
  hamper: "/images/products/laundry-hamper.jpg",
  rug: "/images/products/floor-rug.jpg",
  cushion: "/images/products/cushion-cover.jpg",
  tapestry: "/images/products/macrame-tapestry.jpg",
  runner: "/images/products/table-runner.jpg",
  placemat: "/images/products/placemat-set.jpg",
  bottle: "/images/products/bottle-carrier.jpg",
  plant: "/images/products/plant-hanger.jpg",
  folder: "/images/products/file-folder.jpg",
  gift: "/images/products/gift-box.jpg",
  slippers: "/images/products/jute-slippers.jpg",
  earrings_blue: "/images/products/jute-floral-earrings-blue.jpg",
  earrings_cyan: "/images/products/jute-drop-earrings-cyan.jpg",
};

export function ProductArt({ slug = "", category = "bags", image, className = "" }: ProductArtProps) {
  const [imgError, setImgError] = useState(false);

  // If explicit image is passed and hasn't errored, render it directly
  if (image && !imgError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-sand/10">
        <img
          src={image}
          alt={slug || "পাটবাড়ি পাটপণ্য"}
          className={`${className} w-full h-full object-cover transition-transform duration-500 group-hover:scale-105`}
          onError={() => setImgError(true)}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  // Select illustration or photo based on slug, category, product ID, or Bengali keywords
  const s = `${slug} ${category}`.toLowerCase();

  const isPearlClutch = s.includes("pearl-elegance") || s.includes("p21") || s.includes("পার্ল");
  const isBohoClutch = s.includes("boho-fringed") || s.includes("p22") || s.includes("বোহো");
  const isPastelClutch = s.includes("pastel-blossom") || s.includes("p23") || s.includes("ব্লসম");
  const isPaintedClutch = s.includes("hand-painted-botanical") || s.includes("p24") || s.includes("হাতে আঁকা");
  const isCrescentPouch = s.includes("crescent-braided") || s.includes("p25") || s.includes("ক্রিসেন্ট");
  const isMarigoldTote = s.includes("marigold-crochet") || s.includes("p26") || s.includes("ম্যারিগোল্ড") || s.includes("ক্রোশে");
  const isMacrameCrossbody = s.includes("multicolor-beaded-macrame") || s.includes("p27") || s.includes("ম্যাক্রামে");
  const isRoyalBlueTote = s.includes("royal-blue-jute") || s.includes("p28") || s.includes("রয়্যাল ব্লু");
  const isBumblebeeTote = s.includes("bumblebee") || s.includes("p29") || s.includes("বাম্বলবি");
  const isNakshiTapestry = s.includes("heritage-nakshi") || s.includes("p30") || s.includes("নকশি");
  const isPastelEarrings = s.includes("pastel-5color") || s.includes("p31") || s.includes("প্যাস্টেল");
  const isClutch = s.includes("clutch") || s.includes("p00") || s.includes("ক্ল্যাচ");

  const isTote = s.includes("tote") || s.includes("p01") || s.includes("b01") || s.includes("টোট");
  const isLaptop = s.includes("laptop") || s.includes("p02") || s.includes("ল্যাপটপ");
  const isHandbag = s.includes("handbag") || s.includes("p03") || s.includes("হ্যান্ডব্যাগ");
  const isShopping = s.includes("shopping") || s.includes("market") || s.includes("p04") || s.includes("b03") || s.includes("বাজার") || s.includes("শপিং");
  const isBackpack = s.includes("backpack") || s.includes("travel") || s.includes("p05") || s.includes("ব্যাকপ্যাক");
  const isLaundry = s.includes("laundry") || s.includes("p07") || s.includes("লন্ড্রি");
  const isBasket = s.includes("basket") || s.includes("p06") || s.includes("bn3") || s.includes("ঝুড়ি") || s.includes("ঝুড়ি") || s.includes("স্টোরেজ");
  const isRug = s.includes("rug") || s.includes("mat") || s.includes("p08") || s.includes("ম্যাট") || s.includes("কার্পেট");
  const isCushion = s.includes("cushion") || s.includes("p09") || s.includes("bn1") || s.includes("কুশন");
  const isTapestry = s.includes("tapestry") || s.includes("macrame") || s.includes("p10") || s.includes("ট্যাপেস্ট্রি");
  const isPlant = s.includes("plant") || s.includes("shika") || s.includes("hanger") || s.includes("p11") || s.includes("শিকা") || s.includes("প্ল্যান্ট");
  const isRunner = s.includes("runner") || s.includes("p12") || s.includes("bn2") || s.includes("রানার");
  const isPlacemat = s.includes("placemat") || s.includes("coaster") || s.includes("p13") || s.includes("প্লেসম্যাট") || s.includes("কোস্টার");
  const isBottle = s.includes("bottle") || s.includes("carrier") || s.includes("p14") || s.includes("বোতল");
  const isFolder = s.includes("file") || s.includes("folder") || s.includes("office") || s.includes("p15") || s.includes("b02") || s.includes("ফোল্ডার") || s.includes("ফাইল");
  const isGift = s.includes("gift") || s.includes("hamper-box") || s.includes("p16") || s.includes("গিফট") || s.includes("হ্যাম্পার");
  const isSlippers = s.includes("slipper") || s.includes("shoe") || s.includes("footwear") || s.includes("p17") || s.includes("জুতো") || s.includes("স্লিপার");
  const isBlueEarrings = s.includes("floral-earrings-royal-blue") || s.includes("p18") || s.includes("নীলপদ্ম");
  const isCyanEarrings = s.includes("drop-earrings-crystal-cyan") || s.includes("p19") || s.includes("আকাশি") || s.includes("ঝুমকা");

  let photoKey: string | null = null;
  if (isPearlClutch) photoKey = "pearl_clutch";
  else if (isBohoClutch) photoKey = "boho_clutch";
  else if (isPastelClutch) photoKey = "pastel_clutch";
  else if (isPaintedClutch) photoKey = "painted_clutch";
  else if (isCrescentPouch) photoKey = "crescent_pouch";
  else if (isMarigoldTote) photoKey = "marigold_tote";
  else if (isMacrameCrossbody) photoKey = "macrame_crossbody";
  else if (isRoyalBlueTote) photoKey = "royal_blue_tote";
  else if (isBumblebeeTote) photoKey = "bumblebee_tote";
  else if (isNakshiTapestry) photoKey = "nakshi_tapestry";
  else if (isPastelEarrings) photoKey = "pastel_earrings";
  else if (isClutch) photoKey = "clutch";
  else if (isTote) photoKey = "tote";
  else if (isLaptop) photoKey = "laptop";
  else if (isHandbag) photoKey = "handbag";
  else if (isShopping) photoKey = "shopping";
  else if (isBackpack) photoKey = "backpack";
  else if (isLaundry) photoKey = "hamper";
  else if (isBasket) photoKey = "basket";
  else if (isRug) photoKey = "rug";
  else if (isCushion) photoKey = "cushion";
  else if (isTapestry) photoKey = "tapestry";
  else if (isPlant) photoKey = "plant";
  else if (isRunner) photoKey = "runner";
  else if (isPlacemat) photoKey = "placemat";
  else if (isBottle) photoKey = "bottle";
  else if (isFolder) photoKey = "folder";
  else if (isGift) photoKey = "gift";
  else if (isSlippers) photoKey = "slippers";
  else if (isBlueEarrings) photoKey = "earrings_blue";
  else if (isCyanEarrings) photoKey = "earrings_cyan";

  if (photoKey && PRODUCT_PHOTOS[photoKey] && !imgError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-sand/10">
        <img
          src={PRODUCT_PHOTOS[photoKey]}
          alt={slug || "পাটবাড়ি পাটপণ্য"}
          className={`${className} w-full h-full object-cover transition-transform duration-500 group-hover:scale-105`}
          onError={() => setImgError(true)}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  if (isTote) {
    return (
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Handles */}
        <path d="M75 110 V50 C75 35 125 35 125 50 V110" stroke="#8A6A35" strokeWidth="8" strokeLinecap="round" />
        <path d="M80 110 V55 C80 42 120 42 120 55 V110" stroke="#C8A165" strokeWidth="3" strokeLinecap="round" />
        {/* Bag Body */}
        <path d="M45 105 L55 210 Q55 218 65 218 H135 Q145 218 145 210 L155 105 Z" fill="#E2CCA6" stroke="#8A6A35" strokeWidth="4" />
        {/* Jute Texture Pattern */}
        <path d="M50 135 H150 M52 160 H148 M54 185 H146" stroke="#C8A165" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M75 110 V215 M100 110 V215 M125 110 V215" stroke="#C8A165" strokeWidth="2" strokeDasharray="3 3" />
        {/* Bottom Accent / Front pocket */}
        <rect x="68" y="140" width="64" height="48" rx="6" fill="#D4B787" stroke="#8A6A35" strokeWidth="2" />
        {/* Green Leaf Tag */}
        <circle cx="132" cy="115" r="7" fill="#1F4D3A" />
      </svg>
    );
  }

  if (isLaptop) {
    return (
      <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Strap */}
        <path d="M40 90 C40 30 200 30 200 90" stroke="#8A6A35" strokeWidth="6" strokeDasharray="6 3" strokeLinecap="round" />
        {/* Handle */}
        <rect x="95" y="60" width="50" height="22" rx="10" stroke="#5C4520" strokeWidth="6" />
        {/* Main Body */}
        <rect x="35" y="80" width="170" height="100" rx="12" fill="#D9BC8F" stroke="#5C4520" strokeWidth="4" />
        {/* Front Zip Pocket */}
        <rect x="45" y="115" width="150" height="55" rx="6" fill="#C9A670" stroke="#8A6A35" strokeWidth="2.5" />
        <line x1="50" y1="122" x2="190" y2="122" stroke="#5C4520" strokeWidth="2.5" />
        <circle cx="65" cy="122" r="3.5" fill="#2B2A26" />
        {/* Jute Weave Overlay */}
        <line x1="45" y1="145" x2="195" y2="145" stroke="#E5D1B0" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    );
  }

  if (isHandbag) {
    return (
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Curved Handles */}
        <circle cx="100" cy="85" r="40" stroke="#8A6A35" strokeWidth="7" fill="none" />
        {/* Handbag curved body */}
        <path d="M40 100 C40 95 65 90 100 90 C135 90 160 95 160 100 L168 185 C168 198 152 202 100 202 C48 202 32 198 32 185 Z" fill="#E6D3B1" stroke="#8A6A35" strokeWidth="4" />
        {/* Decorative Embroidery / Terracotta Accent */}
        <path d="M48 135 Q100 150 152 135" stroke="#B5543C" strokeWidth="5" strokeLinecap="round" />
        <circle cx="100" cy="142" r="5" fill="#1F4D3A" />
        {/* Base weave */}
        <line x1="50" y1="170" x2="150" y2="170" stroke="#C8A165" strokeWidth="2" strokeDasharray="3 3" />
      </svg>
    );
  }

  if (isShopping) {
    return (
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Sturdy rope handles */}
        <path d="M70 100 V40 C70 28 130 28 130 40 V100" stroke="#1F4D3A" strokeWidth="7" strokeLinecap="round" />
        {/* Broad shopping bag */}
        <path d="M35 95 L45 215 H155 L165 95 Z" fill="#DFC79E" stroke="#8A6A35" strokeWidth="4" />
        {/* Side gusset crease */}
        <line x1="60" y1="95" x2="65" y2="215" stroke="#C8A165" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="140" y1="95" x2="135" y2="215" stroke="#C8A165" strokeWidth="2" strokeDasharray="4 2" />
        {/* Big Eco Leaf Motif */}
        <path d="M100 130 C90 145 90 165 100 175 C110 165 110 145 100 130 Z" fill="#1F4D3A" />
        <line x1="100" y1="140" x2="100" y2="185" stroke="#1F4D3A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (isBasket) {
    return (
      <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Top rim */}
        <ellipse cx="110" cy="70" rx="75" ry="18" fill="#EFE3CC" stroke="#8A6A35" strokeWidth="4" />
        {/* Basket sides */}
        <path d="M35 70 C40 145 60 175 110 175 C160 175 180 145 185 70" fill="#DFC294" stroke="#8A6A35" strokeWidth="4" />
        {/* Woven coils */}
        <ellipse cx="110" cy="95" rx="73" ry="16" stroke="#C8A165" strokeWidth="2.5" fill="none" />
        <ellipse cx="110" cy="120" rx="68" ry="15" stroke="#C8A165" strokeWidth="2.5" fill="none" />
        <ellipse cx="110" cy="145" rx="60" ry="13" stroke="#8A6A35" strokeWidth="2" fill="none" />
        {/* Rope side handles */}
        <path d="M30 80 Q20 95 35 105" stroke="#8A6A35" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M190 80 Q200 95 185 105" stroke="#8A6A35" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (isRug) {
    return (
      <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Concentric oval braided jute rug */}
        <ellipse cx="120" cy="100" rx="95" ry="58" fill="#D8BC8C" stroke="#8A6A35" strokeWidth="4" />
        <ellipse cx="120" cy="100" rx="80" ry="48" fill="#E8D5B7" stroke="#C8A165" strokeWidth="3" />
        <ellipse cx="120" cy="100" rx="62" ry="36" fill="#1F4D3A" opacity="0.15" stroke="#8A6A35" strokeWidth="2.5" />
        <ellipse cx="120" cy="100" rx="45" ry="26" fill="#D8BC8C" stroke="#C8A165" strokeWidth="2.5" />
        <ellipse cx="120" cy="100" rx="28" ry="16" fill="#8A6A35" opacity="0.25" stroke="#8A6A35" strokeWidth="2" />
        <circle cx="120" cy="100" r="8" fill="#8A6A35" />
      </svg>
    );
  }

  if (isCushion) {
    return (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Square plush cushion */}
        <rect x="35" y="35" width="130" height="130" rx="20" fill="#E6D2B0" stroke="#8A6A35" strokeWidth="4" />
        {/* Geometric tribal pattern */}
        <path d="M100 50 L150 100 L100 150 L50 100 Z" stroke="#B5543C" strokeWidth="3" fill="none" />
        <circle cx="100" cy="100" r="14" fill="#1F4D3A" />
        {/* Fringe tufts at 4 corners */}
        <line x1="30" y1="30" x2="40" y2="40" stroke="#8A6A35" strokeWidth="4" strokeLinecap="round" />
        <line x1="170" y1="30" x2="160" y2="40" stroke="#8A6A35" strokeWidth="4" strokeLinecap="round" />
        <line x1="30" y1="170" x2="40" y2="160" stroke="#8A6A35" strokeWidth="4" strokeLinecap="round" />
        <line x1="170" y1="170" x2="160" y2="160" stroke="#8A6A35" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (isRunner) {
    return (
      <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Long woven table runner with chevron */}
        <rect x="25" y="60" width="190" height="60" rx="4" fill="#DFC59B" stroke="#8A6A35" strokeWidth="3.5" />
        <path d="M45 60 L60 90 L45 120 M75 60 L90 90 L75 120 M105 60 L120 90 L105 120 M135 60 L150 90 L135 120 M165 60 L180 90 L165 120" stroke="#1F4D3A" strokeWidth="3" strokeLinecap="round" />
        {/* Tassels at both ends */}
        <line x1="20" y1="70" x2="25" y2="70" stroke="#8A6A35" strokeWidth="3" />
        <line x1="20" y1="90" x2="25" y2="90" stroke="#8A6A35" strokeWidth="3" />
        <line x1="20" y1="110" x2="25" y2="110" stroke="#8A6A35" strokeWidth="3" />
        <line x1="215" y1="70" x2="220" y2="70" stroke="#8A6A35" strokeWidth="3" />
        <line x1="215" y1="90" x2="220" y2="90" stroke="#8A6A35" strokeWidth="3" />
        <line x1="215" y1="110" x2="220" y2="110" stroke="#8A6A35" strokeWidth="3" />
      </svg>
    );
  }

  if (isPlacemat) {
    return (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Stack of braided coasters/placemats */}
        <circle cx="100" cy="115" r="65" fill="#D6BA8B" stroke="#8A6A35" strokeWidth="3" />
        <circle cx="95" cy="100" r="65" fill="#E2CCA6" stroke="#8A6A35" strokeWidth="3" />
        <circle cx="90" cy="85" r="65" fill="#EEDDBE" stroke="#8A6A35" strokeWidth="3.5" />
        {/* Spiral weave */}
        <circle cx="90" cy="85" r="48" stroke="#C8A165" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
        <circle cx="90" cy="85" r="30" stroke="#8A6A35" strokeWidth="2" fill="none" />
        <circle cx="90" cy="85" r="10" fill="#1F4D3A" />
      </svg>
    );
  }

  if (isTapestry) {
    return (
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Wooden dowel rod */}
        <rect x="35" y="45" width="130" height="8" rx="4" fill="#6B4F2A" />
        <path d="M50 45 L100 20 L150 45" stroke="#C8A165" strokeWidth="3" fill="none" />
        {/* Macrame knotted body */}
        <path d="M55 53 L100 130 L145 53" fill="#E8D7B8" stroke="#8A6A35" strokeWidth="3" />
        <line x1="75" y1="53" x2="100" y2="100" stroke="#B5543C" strokeWidth="3" />
        <line x1="125" y1="53" x2="100" y2="100" stroke="#B5543C" strokeWidth="3" />
        {/* Hanging fringe */}
        <line x1="75" y1="130" x2="75" y2="185" stroke="#8A6A35" strokeWidth="3" strokeLinecap="round" />
        <line x1="90" y1="130" x2="90" y2="195" stroke="#C8A165" strokeWidth="3" strokeLinecap="round" />
        <line x1="100" y1="130" x2="100" y2="205" stroke="#8A6A35" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="110" y1="130" x2="110" y2="195" stroke="#C8A165" strokeWidth="3" strokeLinecap="round" />
        <line x1="125" y1="130" x2="125" y2="185" stroke="#8A6A35" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (isPlant) {
    return (
      <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Top ring */}
        <circle cx="100" cy="25" r="9" stroke="#8A6A35" strokeWidth="4" />
        {/* Braided ropes descending */}
        <path d="M100 35 L70 120" stroke="#8A6A35" strokeWidth="3" />
        <path d="M100 35 L130 120" stroke="#8A6A35" strokeWidth="3" />
        <path d="M100 35 L100 120" stroke="#C8A165" strokeWidth="2.5" />
        {/* Macrame net holding pot */}
        <path d="M70 120 L100 155 L130 120" stroke="#8A6A35" strokeWidth="3" fill="#D9BC8F" />
        {/* Terracotta Plant Pot */}
        <path d="M75 110 L82 145 H118 L125 110 Z" fill="#B5543C" stroke="#7A3220" strokeWidth="2.5" />
        {/* Green Plant Foliage */}
        <path d="M85 108 C80 90 95 85 98 105 C100 80 115 85 112 108 Z" fill="#1F4D3A" />
        {/* Bottom tassel */}
        <path d="M100 155 V195" stroke="#8A6A35" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  if (isFolder) {
    return (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Jute Document Folder with tab */}
        <path d="M40 50 H90 L105 65 H160 V160 H40 Z" fill="#E2CFA8" stroke="#8A6A35" strokeWidth="3.5" />
        <line x1="55" y1="85" x2="145" y2="85" stroke="#C8A165" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="55" y1="105" x2="145" y2="105" stroke="#C8A165" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="55" y1="125" x2="115" y2="125" stroke="#C8A165" strokeWidth="2" strokeDasharray="3 3" />
        {/* Brass Button Closure & String */}
        <circle cx="100" cy="140" r="5" fill="#8A6A35" />
      </svg>
    );
  }

  // Default: Artisanal Gift Box / Hamper
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Gift Hamper Box */}
      <rect x="45" y="70" width="110" height="90" rx="8" fill="#DFC498" stroke="#8A6A35" strokeWidth="4" />
      {/* Box Lid */}
      <rect x="40" y="55" width="120" height="20" rx="5" fill="#CEAF7F" stroke="#8A6A35" strokeWidth="3.5" />
      {/* Green Ribbon */}
      <rect x="94" y="55" width="12" height="105" fill="#1F4D3A" />
      {/* Ribbon Bow on top */}
      <circle cx="90" cy="48" r="9" stroke="#1F4D3A" strokeWidth="3.5" fill="none" />
      <circle cx="110" cy="48" r="9" stroke="#1F4D3A" strokeWidth="3.5" fill="none" />
      <circle cx="100" cy="52" r="4" fill="#1F4D3A" />
    </svg>
  );
}
