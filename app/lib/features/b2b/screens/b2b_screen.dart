import 'package:flutter/material.dart';
import '../../../core/theme/colors.dart';
import '../../../shared/widgets/paatbari_app_bar.dart';
import '../../../shared/widgets/bottom_nav_bar.dart';
import '../../../shared/widgets/price_tag.dart';

class B2BScreen extends StatefulWidget {
  const B2BScreen({super.key});

  @override
  State<B2BScreen> createState() => _B2BScreenState();
}

class _B2BScreenState extends State<B2BScreen> {
  final _companyController = TextEditingController();
  final _contactPersonController = TextEditingController();
  final _phoneController = TextEditingController();
  final _emailController = TextEditingController();
  final _notesController = TextEditingController();

  String _selectedProduct = 'টোট ব্যাগ (Classic Tote)';
  int _quantity = 100;
  bool _customLogo = true;
  bool _isSubmitted = false;

  final Map<String, int> _basePrices = {
    'টোট ব্যাগ (Classic Tote)': 450,
    'ল্যাপটপ ব্যাগ (Laptop Bag)': 1450,
    'ফাইল ফোল্ডার (File Folder)': 320,
    'গিফট হ্যাম্পার বক্স (Gift Box)': 650,
    'টেবিল রানার ও প্লেসম্যাট সেট': 900,
  };

  int get _calculatedUnitPrice {
    final base = _basePrices[_selectedProduct] ?? 450;
    // Volume discounts: 50+ => 15%, 200+ => 25%, 500+ => 35%
    double discountPct = 0.15;
    if (_quantity >= 500) {
      discountPct = 0.35;
    } else if (_quantity >= 200) {
      discountPct = 0.25;
    }
    int discounted = (base * (1 - discountPct)).round();
    if (_customLogo) discounted += 15; // +৳15 screen printing
    return discounted;
  }

  int get _calculatedTotal => _calculatedUnitPrice * _quantity;

  int get _discountPercentage {
    if (_quantity >= 500) return 35;
    if (_quantity >= 200) return 25;
    return 15;
  }

  @override
  void dispose() {
    _companyController.dispose();
    _contactPersonController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  void _submitQuoteRequest() {
    if (_companyController.text.trim().isEmpty || _phoneController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('অনুগ্রহ করে প্রতিষ্ঠানের নাম ও মোবাইল নম্বর প্রদান করুন'),
          backgroundColor: Colors.redAccent,
        ),
      );
      return;
    }

    setState(() => _isSubmitted = true);

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.check_circle, color: AppColors.leaf, size: 54),
            const SizedBox(height: 12),
            const Text(
              'কোটেশন রিকোয়েস্ট গৃহীত হয়েছে!',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.ink),
            ),
            const SizedBox(height: 8),
            Text(
              '${_companyController.text.trim()} প্রতিষ্ঠানের জন্য আমাদের কর্পোরেট সেলস টিম দ্রুত যোগাযোগ করবে।',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.cream,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Text(
                'সরাসরি যোগাযোগের জন্য কল বা হোয়াটসঅ্যাপ করুন:\nSifat Phychee: 01793648214',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.ink),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => Navigator.of(ctx).pop(),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.leaf,
                foregroundColor: AppColors.white,
              ),
              child: const Text('ঠিক আছে'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const PaatbariAppBar(title: 'কর্পোরেট ও বাল্ক অর্ডার'),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // B2B Hero Banner
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppColors.leaf, Color(0xFF1B4D3E)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.jute,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      '🏢 B2B ও পাইকারি সাপ্লাই',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.ink),
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'কর্পোরেট গিফটিং ও এক্সপোর্ট কোয়ালিটি পাটপণ্য',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'লোগো কাস্টমাইজেশন, কালার ডাইং এবং বিশেষ ইভেন্ট প্যাকেজিং সুবিধা। সরাসরি মানিকগঞ্জের উৎপাদন কেন্দ্র থেকে।',
                    style: TextStyle(fontSize: 12, color: Color(0xFFE2E8F0)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Wholesale Price Estimator
            const Text(
              'বাল্ক প্রাইজ ক্যালকুলেটর (স্বয়ংক্রিয় হিসাব)',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.ink),
            ),
            const SizedBox(height: 12),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.sand),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.03),
                    blurRadius: 10,
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Product Picker
                  const Text('পণ্য নির্বাচন করুন:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    decoration: BoxDecoration(
                      color: AppColors.cream,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppColors.sand),
                    ),
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: _selectedProduct,
                        isExpanded: true,
                        items: _basePrices.keys.map((p) {
                          return DropdownMenuItem(value: p, child: Text(p, style: const TextStyle(fontSize: 12)));
                        }).toList(),
                        onChanged: (val) {
                          if (val != null) setState(() => _selectedProduct = val);
                        },
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Quantity Slider
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('পরিমাণ (পিস):', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                      Text(
                        '$_quantity পিস (${_discountPercentage}% বিশেষ ছাড়)',
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.leaf),
                      ),
                    ],
                  ),
                  Slider(
                    value: _quantity.toDouble(),
                    min: 50,
                    max: 1000,
                    divisions: 19,
                    activeColor: AppColors.leaf,
                    inactiveColor: AppColors.sand,
                    label: '$_quantity পিস',
                    onChanged: (val) => setState(() => _quantity = val.round()),
                  ),
                  const SizedBox(height: 8),

                  // Custom logo toggle
                  CheckboxListTile(
                    value: _customLogo,
                    contentPadding: EdgeInsets.zero,
                    activeColor: AppColors.leaf,
                    title: const Text(
                      'কোম্পানি লোগো স্ক্রিন প্রিন্টিং (+৳১৫/পিস)',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
                    ),
                    onChanged: (val) => setState(() => _customLogo = val ?? false),
                  ),
                  const Divider(height: 20),

                  // Calculated results
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('প্রতি পিস আনুমানিক মূল্য:', style: TextStyle(fontSize: 13, color: Colors.grey)),
                      Text('৳$_calculatedUnitPrice', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.ink)),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('সর্বমোট আনুমানিক প্রাক্কলন:', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.ink)),
                      PriceTag(amount: _calculatedTotal, fontSize: 20),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // RFQ Form
            const Text(
              'কোটেশনের জন্য তথ্য জমা দিন',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.ink),
            ),
            const SizedBox(height: 12),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.sand),
              ),
              child: Column(
                children: [
                  TextField(
                    controller: _companyController,
                    decoration: _inputDecoration('প্রতিষ্ঠানের নাম (যেমন: গ্রামীণফোন, ব্র্যাক)*', Icons.business_outlined),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _contactPersonController,
                    decoration: _inputDecoration('যোগাযোগকারী ব্যক্তির নাম*', Icons.person_outline),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _phoneController,
                    keyboardType: TextInputType.phone,
                    decoration: _inputDecoration('মোবাইল নম্বর (017xxxxxxxx)*', Icons.phone_outlined),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: _inputDecoration('ইমেইল অ্যাড্রেস (ঐচ্ছিক)', Icons.email_outlined),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _notesController,
                    maxLines: 2,
                    decoration: _inputDecoration('বিশেষ নির্দেশনা বা কালার স্পেসিফিকেশন...', Icons.note_alt_outlined),
                  ),
                  const SizedBox(height: 16),

                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: _submitQuoteRequest,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.leaf,
                        foregroundColor: AppColors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                      child: const Text('অফিসিয়াল কোটেশন চান', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Direct Contact Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.cream,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.sand),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'সরাসরি কর্পোরেট ডেস্ক (B2B Helpline)',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.leaf),
                  ),
                  SizedBox(height: 6),
                  Text(
                    'স্বত্বাধিকারী: Sifat Phychee\nহোয়াটসঅ্যাপ ও মোবাইল: 01793648214\nইমেইল: sifatphychee@gmail.com\nঠিকানা: মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০, বাংলাদেশ',
                    style: TextStyle(fontSize: 12, color: AppColors.ink, height: 1.5),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
      bottomNavigationBar: const PaatbariBottomNav(currentIndex: 2),
    );
  }

  InputDecoration _inputDecoration(String hint, IconData icon) {
    return InputDecoration(
      hintText: hint,
      hintStyle: const TextStyle(fontSize: 12, color: Colors.grey),
      prefixIcon: Icon(icon, size: 18, color: AppColors.leaf),
      filled: true,
      fillColor: AppColors.cream.withOpacity(0.3),
      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: AppColors.sand),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: const BorderSide(color: AppColors.sand),
      ),
    );
  }
}
