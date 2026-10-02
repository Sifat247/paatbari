/// Bangladesh 64 Districts Data
/// Includes English, Bengali, Division, and delivery zone classification.

class DistrictData {
  final String nameEn;
  final String nameBn;
  final String division;
  final bool isDhakaCity;

  const DistrictData({
    required this.nameEn,
    required this.nameBn,
    required this.division,
    this.isDhakaCity = false,
  });
}

const List<DistrictData> bangladeshDistricts = [
  // Dhaka Division
  DistrictData(nameEn: "Dhaka (City)", nameBn: "ঢাকা (সিটি কর্পোরেশন)", division: "Dhaka", isDhakaCity: true),
  DistrictData(nameEn: "Dhaka (Suburbs/Savar/Keraniganj)", nameBn: "ঢাকা (সাভার/কেরানীগঞ্জ/ধামরাই)", division: "Dhaka"),
  DistrictData(nameEn: "Gazipur", nameBn: "গাজীপুর", division: "Dhaka"),
  DistrictData(nameEn: "Narayanganj", nameBn: "নারায়ণগঞ্জ", division: "Dhaka"),
  DistrictData(nameEn: "Manikganj", nameBn: "মানিকগঞ্জ (আমাদের মূল কারুপল্লী)", division: "Dhaka"),
  DistrictData(nameEn: "Munshiganj", nameBn: "মুন্সীগঞ্জ", division: "Dhaka"),
  DistrictData(nameEn: "Narsingdi", nameBn: "নরসিংদী", division: "Dhaka"),
  DistrictData(nameEn: "Tangail", nameBn: "টাঙ্গাইল", division: "Dhaka"),
  DistrictData(nameEn: "Kishoreganj", nameBn: "কিশোরগঞ্জ", division: "Dhaka"),
  DistrictData(nameEn: "Faridpur", nameBn: "ফরিদপুর", division: "Dhaka"),
  DistrictData(nameEn: "Gopalganj", nameBn: "গোপালগঞ্জ", division: "Dhaka"),
  DistrictData(nameEn: "Madaripur", nameBn: "মাদারীপুর", division: "Dhaka"),
  DistrictData(nameEn: "Rajbari", nameBn: "রাজবাড়ী", division: "Dhaka"),
  DistrictData(nameEn: "Shariatpur", nameBn: "শরীয়তপুর", division: "Dhaka"),

  // Chattogram Division
  DistrictData(nameEn: "Chattogram", nameBn: "চট্টগ্রাম", division: "Chattogram"),
  DistrictData(nameEn: "Cox's Bazar", nameBn: "কক্সবাজার", division: "Chattogram"),
  DistrictData(nameEn: "Cumilla", nameBn: "কুমিল্লা", division: "Chattogram"),
  DistrictData(nameEn: "Feni", nameBn: "ফেনী", division: "Chattogram"),
  DistrictData(nameEn: "Brahmanbaria", nameBn: "ব্রাহ্মণবাড়িয়া", division: "Chattogram"),
  DistrictData(nameEn: "Noakhali", nameBn: "নোয়াখালী", division: "Chattogram"),
  DistrictData(nameEn: "Chandpur", nameBn: "চাঁদপুর", division: "Chattogram"),
  DistrictData(nameEn: "Lakshmipur", nameBn: "লক্ষ্মীপুর", division: "Chattogram"),
  DistrictData(nameEn: "Khagrachhari", nameBn: "খাগড়াছড়ি", division: "Chattogram"),
  DistrictData(nameEn: "Rangamati", nameBn: "রাঙ্গামাটি", division: "Chattogram"),
  DistrictData(nameEn: "Bandarban", nameBn: "বান্দরবান", division: "Chattogram"),

  // Rajshahi Division
  DistrictData(nameEn: "Rajshahi", nameBn: "রাজশাহী", division: "Rajshahi"),
  DistrictData(nameEn: "Bogura", nameBn: "বগুড়া", division: "Rajshahi"),
  DistrictData(nameEn: "Pabna", nameBn: "পাবনা", division: "Rajshahi"),
  DistrictData(nameEn: "Sirajganj", nameBn: "সিরাজগঞ্জ", division: "Rajshahi"),
  DistrictData(nameEn: "Naogaon", nameBn: "নওগাঁ", division: "Rajshahi"),
  DistrictData(nameEn: "Natore", nameBn: "নাটোর", division: "Rajshahi"),
  DistrictData(nameEn: "Chapai Nawabganj", nameBn: "চাঁপাইনবাবগঞ্জ", division: "Rajshahi"),
  DistrictData(nameEn: "Joypurhat", nameBn: "জয়পুরহাট", division: "Rajshahi"),

  // Khulna Division
  DistrictData(nameEn: "Khulna", nameBn: "খুলনা", division: "Khulna"),
  DistrictData(nameEn: "Jashore", nameBn: "যশোর", division: "Khulna"),
  DistrictData(nameEn: "Kushtia", nameBn: "কুষ্টিয়া", division: "Khulna"),
  DistrictData(nameEn: "Satkhira", nameBn: "সাতক্ষীরা", division: "Khulna"),
  DistrictData(nameEn: "Bagerhat", nameBn: "বাগেরহাট", division: "Khulna"),
  DistrictData(nameEn: "Jhenaidah", nameBn: "ঝিনাইদহ", division: "Khulna"),
  DistrictData(nameEn: "Chuadanga", nameBn: "চুয়াডাঙ্গা", division: "Khulna"),
  DistrictData(nameEn: "Magura", nameBn: "মাগুরা", division: "Khulna"),
  DistrictData(nameEn: "Meherpur", nameBn: "মেহেরপুর", division: "Khulna"),
  DistrictData(nameEn: "Narail", nameBn: "নড়াইল", division: "Khulna"),

  // Barishal Division
  DistrictData(nameEn: "Barishal", nameBn: "বরিশাল", division: "Barishal"),
  DistrictData(nameEn: "Bhola", nameBn: "ভোলা", division: "Barishal"),
  DistrictData(nameEn: "Patuakhali", nameBn: "পটুয়াখালী", division: "Barishal"),
  DistrictData(nameEn: "Pirojpur", nameBn: "পিরোজপুর", division: "Barishal"),
  DistrictData(nameEn: "Barguna", nameBn: "বরগুনা", division: "Barishal"),
  DistrictData(nameEn: "Jhalokati", nameBn: "ঝালকাঠি", division: "Barishal"),

  // Sylhet Division
  DistrictData(nameEn: "Sylhet", nameBn: "সিলেট", division: "Sylhet"),
  DistrictData(nameEn: "Moulvibazar", nameBn: "মৌলভীবাজার", division: "Sylhet"),
  DistrictData(nameEn: "Habiganj", nameBn: "হবিগঞ্জ", division: "Sylhet"),
  DistrictData(nameEn: "Sunamganj", nameBn: "সুনামগঞ্জ", division: "Sylhet"),

  // Rangpur Division
  DistrictData(nameEn: "Rangpur", nameBn: "রংপুর", division: "Rangpur"),
  DistrictData(nameEn: "Dinajpur", nameBn: "দিনাজপুর", division: "Rangpur"),
  DistrictData(nameEn: "Gaibandha", nameBn: "গাইবান্ধা", division: "Rangpur"),
  DistrictData(nameEn: "Kurigram", nameBn: "কুড়িগ্রাম", division: "Rangpur"),
  DistrictData(nameEn: "Lalmonirhat", nameBn: "লালমনিরহাট", division: "Rangpur"),
  DistrictData(nameEn: "Nilphamari", nameBn: "নীলফামারী", division: "Rangpur"),
  DistrictData(nameEn: "Panchagarh", nameBn: "পঞ্চগড়", division: "Rangpur"),
  DistrictData(nameEn: "Thakurgaon", nameBn: "ঠাকুরগাঁও", division: "Rangpur"),

  // Mymensingh Division
  DistrictData(nameEn: "Mymensingh", nameBn: "ময়মনসিংহ", division: "Mymensingh"),
  DistrictData(nameEn: "Jamalpur", nameBn: "জামালপুর", division: "Mymensingh"),
  DistrictData(nameEn: "Netrokona", nameBn: "নেত্রকোণা", division: "Mymensingh"),
  DistrictData(nameEn: "Sherpur", nameBn: "শেরপুর", division: "Mymensingh"),
];
