export interface District {
  en: string;
  bn: string;
}

export interface Division {
  en: string;
  bn: string;
  districts: District[];
}

export const DIVISIONS: Record<string, Division> = {
  Dhaka: {
    en: "Dhaka",
    bn: "ঢাকা",
    districts: [
      { en: "Dhaka", bn: "ঢাকা" },
      { en: "Gazipur", bn: "গাজীপুর" },
      { en: "Narayanganj", bn: "নারায়ণগঞ্জ" },
      { en: "Tangail", bn: "টাঙ্গাইল" },
      { en: "Faridpur", bn: "ফরিদপুর" },
      { en: "Manikganj", bn: "মানিকগঞ্জ" },
      { en: "Munshiganj", bn: "মুন্সীগঞ্জ" },
      { en: "Narsingdi", bn: "নরসিংদী" },
      { en: "Gopalganj", bn: "গোপালগঞ্জ" },
      { en: "Kishoreganj", bn: "কিশোরগঞ্জ" },
      { en: "Madaripur", bn: "মাদারীপুর" },
      { en: "Rajbari", bn: "রাজবাড়ী" },
      { en: "Shariatpur", bn: "শরীয়তপুর" },
    ],
  },
  Chattogram: {
    en: "Chattogram",
    bn: "চট্টগ্রাম",
    districts: [
      { en: "Chattogram", bn: "চট্টগ্রাম" },
      { en: "Cox's Bazar", bn: "কক্সবাজার" },
      { en: "Cumilla", bn: "কুমিল্লা" },
      { en: "Feni", bn: "ফেনী" },
      { en: "Brahmanbaria", bn: "ব্রাহ্মণবাড়িয়া" },
      { en: "Chandpur", bn: "চাঁদপুর" },
      { en: "Noakhali", bn: "নোয়াখালী" },
      { en: "Lakshmipur", bn: "লক্ষ্মীপুর" },
      { en: "Bandarban", bn: "বান্দরবান" },
      { en: "Khagrachhari", bn: "খাগড়াছড়ি" },
      { en: "Rangamati", bn: "রাঙ্গামাটি" },
    ],
  },
  Rajshahi: {
    en: "Rajshahi",
    bn: "রাজশাহী",
    districts: [
      { en: "Rajshahi", bn: "রাজশাহী" },
      { en: "Bogura", bn: "বগুড়া" },
      { en: "Pabna", bn: "পাবনা" },
      { en: "Sirajganj", bn: "সিরাজগঞ্জ" },
      { en: "Naogaon", bn: "নওগাঁ" },
      { en: "Natore", bn: "নাটোর" },
      { en: "Chapai Nawabganj", bn: "চাঁপাইনবাবগঞ্জ" },
      { en: "Joypurhat", bn: "জয়পুরহাট" },
    ],
  },
  Khulna: {
    en: "Khulna",
    bn: "খুলনা",
    districts: [
      { en: "Khulna", bn: "খুলনা" },
      { en: "Jashore", bn: "যশোর" },
      { en: "Kushtia", bn: "কুষ্টিয়া" },
      { en: "Satkhira", bn: "সাতক্ষীরা" },
      { en: "Bagerhat", bn: "বাগেরহাট" },
      { en: "Chuadanga", bn: "চুয়াডাঙ্গা" },
      { en: "Jhenaidah", bn: "ঝিনাইদহ" },
      { en: "Magura", bn: "মাগুরা" },
      { en: "Meherpur", bn: "মেহেরপুর" },
      { en: "Narail", bn: "নড়াইল" },
    ],
  },
  Barishal: {
    en: "Barishal",
    bn: "বরিশাল",
    districts: [
      { en: "Barishal", bn: "বরিশাল" },
      { en: "Barguna", bn: "বরগুনা" },
      { en: "Bhola", bn: "ভোলা" },
      { en: "Jhalokati", bn: "ঝালকাঠি" },
      { en: "Patuakhali", bn: "পটুয়াখালী" },
      { en: "Pirojpur", bn: "পিরোজপুর" },
    ],
  },
  Sylhet: {
    en: "Sylhet",
    bn: "সিলেট",
    districts: [
      { en: "Sylhet", bn: "সিলেট" },
      { en: "Moulvibazar", bn: "মৌলভীবাজার" },
      { en: "Habiganj", bn: "হবিগঞ্জ" },
      { en: "Sunamganj", bn: "সুনামগঞ্জ" },
    ],
  },
  Rangpur: {
    en: "Rangpur",
    bn: "রংপুর",
    districts: [
      { en: "Rangpur", bn: "রংপুর" },
      { en: "Dinajpur", bn: "দিনাজপুর" },
      { en: "Gaibandha", bn: "গাইবান্ধা" },
      { en: "Kurigram", bn: "কুড়িগ্রাম" },
      { en: "Lalmonirhat", bn: "লালমনিরহাট" },
      { en: "Nilphamari", bn: "নীলফামারী" },
      { en: "Panchagarh", bn: "পঞ্চগড়" },
      { en: "Thakurgaon", bn: "ঠাকুরগাঁও" },
    ],
  },
  Mymensingh: {
    en: "Mymensingh",
    bn: "ময়মনসিংহ",
    districts: [
      { en: "Mymensingh", bn: "ময়মনসিংহ" },
      { en: "Jamalpur", bn: "জামালপুর" },
      { en: "Netrokona", bn: "নেত্রকোণা" },
      { en: "Sherpur", bn: "শেরপুর" },
    ],
  },
};

export const PHONE_REGEX = /^01[3-9]\d{8}$/;

export function isValidBDPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return PHONE_REGEX.test(cleaned);
}

export function determineZone(
  districtEn: string,
  isDhakaCity: boolean = true
): "dhaka_city" | "dhaka_sub" | "outside" {
  if (districtEn === "Dhaka") {
    return isDhakaCity ? "dhaka_city" : "dhaka_sub";
  }
  if (districtEn === "Gazipur" || districtEn === "Narayanganj") {
    return "dhaka_sub";
  }
  return "outside";
}
