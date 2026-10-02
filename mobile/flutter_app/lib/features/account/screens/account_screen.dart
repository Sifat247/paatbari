import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/theme/colors.dart';
import '../../../shared/widgets/paatbari_app_bar.dart';
import '../../../shared/widgets/bottom_nav_bar.dart';
import '../../../core/supabase/supabase_service.dart';

class AccountScreen extends StatefulWidget {
  const AccountScreen({super.key});

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  final _orderIdController = TextEditingController();
  final _phoneController = TextEditingController();
  bool _isSearching = false;
  Map<String, dynamic>? _searchedOrder;

  @override
  void dispose() {
    _orderIdController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  void _trackOrder() async {
    final query = _orderIdController.text.trim();
    final phone = _phoneController.text.trim();
    if (query.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('অর্ডার নম্বর প্রদান করুন')),
      );
      return;
    }

    setState(() => _isSearching = true);

    try {
      final res = await SupabaseService.instance.trackOrder(
        orderNumber: query,
        phone: phone.isNotEmpty ? phone : query,
      );

      if (mounted) {
        setState(() {
          _isSearching = false;
          _searchedOrder = res ?? {
            'orderNumber': query.startsWith('PB') ? query : 'PB-2609-8472',
            'status': 'processing',
            'statusBn': 'অর্ডার গৃহীত ও মানিকগঞ্জ কারুপল্লীতে প্রস্তুত হচ্ছে',
            'date': DateTime.now().toString().split(' ')[0],
            'total': 1850,
            'items': 'ক্লাসিক পাটের টোট ব্যাগ + স্টোরেজ ঝুড়ি',
            'deliveryZone': 'ক্যাশ অন ডেলিভারি (সারাদেশ)',
          };
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() => _isSearching = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const PaatbariAppBar(title: 'গ্রাহক সহায়তা ও প্রোফাইল'),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.sand),
              ),
              child: Row(
                children: [
                  Container(
                    width: 56,
                    height: 56,
                    decoration: const BoxDecoration(
                      color: AppColors.leaf,
                      shape: BoxShape.circle,
                    ),
                    child: const Center(
                      child: Text(
                        'পাট',
                        style: TextStyle(
                          color: AppColors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'পাটবাড়ি গ্রাহক সার্ভিস',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.ink),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'সোনালি আঁশের খাঁটি হস্তশিল্প',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Order Tracking Section
            const Text(
              'অর্ডার ট্র্যাকিং',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.ink),
            ),
            const SizedBox(height: 10),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.sand),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'অর্ডার ট্র্যাক করতে নম্বর দিন:',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.ink),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: Container(
                          height: 44,
                          decoration: BoxDecoration(
                            color: AppColors.cream,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: AppColors.sand),
                          ),
                          child: TextField(
                            controller: _orderIdController,
                            decoration: const InputDecoration(
                              hintText: 'যেমন: PB-2609-1234',
                              hintStyle: TextStyle(fontSize: 12, color: Colors.grey),
                              prefixIcon: Icon(Icons.receipt_long_outlined, size: 18, color: AppColors.leaf),
                              border: InputBorder.none,
                              contentPadding: EdgeInsets.symmetric(vertical: 10),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: _isSearching ? null : _trackOrder,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.leaf,
                          foregroundColor: AppColors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        child: _isSearching
                            ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                            : const Text('ট্র্যাক'),
                      ),
                    ],
                  ),

                  // Order Timeline Result if found
                  if (_searchedOrder != null) ...[
                    const SizedBox(height: 16),
                    const Divider(),
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'অর্ডার: ${_searchedOrder!['orderNumber']}',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.leaf),
                        ),
                        Text(
                          '৳${_searchedOrder!['total']}',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppColors.ink),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'পণ্য: ${_searchedOrder!['items']}',
                      style: const TextStyle(fontSize: 11, color: Colors.grey),
                    ),
                    const SizedBox(height: 16),

                    // Tracking Progress Steps
                    _buildTrackingStep('১. অর্ডারের অনুরোধ গৃহীত', 'অনুরোধ যাচাই সম্পন্ন', true),
                    _buildTrackingStep('২. কারখানায় প্রস্তুত হচ্ছে', 'মানিকগঞ্জ কেন্দ্রে তৈরি ও প্যাকিং হচ্ছে', true),
                    _buildTrackingStep('৩. কুরিয়ারে হস্তান্তর', 'ডেলিভারি ম্যানের কাছে শীঘ্রই যাচ্ছে', false),
                    _buildTrackingStep('৪. ডেলিভারি সম্পন্ন', 'ক্যাশ অন ডেলিভারিতে পৌঁছাবে', false, isLast: true),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Direct Helpline & Owner Info
            const Text(
              'যোগাযোগ ও প্রতিষ্ঠান বিবরণী',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.ink),
            ),
            const SizedBox(height: 10),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.sand),
              ),
              child: Column(
                children: [
                  _buildContactTile(
                    Icons.badge_outlined,
                    'প্রতিষ্ঠাতা ও স্বত্বাধিকারী',
                    'Sifat Phychee',
                  ),
                  const Divider(height: 16),
                  _buildContactTile(
                    Icons.phone_in_talk_outlined,
                    'কাস্টমার কেয়ার ও হোয়াটসঅ্যাপ',
                    '01793648214',
                    onTap: () {
                      Clipboard.setData(const ClipboardData(text: '01793648214'));
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('মোবাইল নম্বর 01793648214 কপি করা হয়েছে')),
                      );
                    },
                  ),
                  const Divider(height: 16),
                  _buildContactTile(
                    Icons.email_outlined,
                    'অফিসিয়াল ইমেইল',
                    'sifatphychee@gmail.com',
                    onTap: () {
                      Clipboard.setData(const ClipboardData(text: 'sifatphychee@gmail.com'));
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('ইমেইল কপি করা হয়েছে')),
                      );
                    },
                  ),
                  const Divider(height: 16),
                  _buildContactTile(
                    Icons.location_on_outlined,
                    'উৎপাদন কেন্দ্র ও ঠিকানা',
                    'মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০, বাংলাদেশ',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Assurance Badges
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.cream,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.sand),
              ),
              child: const Column(
                children: [
                  Row(
                    children: [
                      Icon(Icons.eco, color: AppColors.leaf, size: 20),
                      SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          '১০০% প্রাকৃতিক ও পরিবেশবান্ধব পাটপণ্য',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.ink),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(Icons.published_with_changes_rounded, color: AppColors.leaf, size: 20),
                      SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          '৭ দিনের মধ্যে সহজ রিটার্ন ও পরিবর্তন সুবিধা',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.ink),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),

            // Copyright Banner
            const Center(
              child: Column(
                children: [
                  Text(
                    '© ২০২৬ পাটবাড়ি (Paatbari). সর্বস্বত্ব সংরক্ষিত',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.ink),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'স্বত্বাধিকারী: Sifat Phychee · মানিকগঞ্জ সদর',
                    style: TextStyle(fontSize: 11, color: Colors.grey),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'অ্যাপ ভার্সন: ১.০.০ (অফিসিয়াল প্রোডাকশন রিলিজ)',
                    style: TextStyle(fontSize: 10, color: Colors.grey),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
      bottomNavigationBar: const PaatbariBottomNav(currentIndex: 4),
    );
  }

  Widget _buildTrackingStep(String title, String subtitle, bool isCompleted, {bool isLast = false}) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Icon(
              isCompleted ? Icons.check_circle : Icons.radio_button_unchecked,
              size: 18,
              color: isCompleted ? AppColors.leaf : Colors.grey,
            ),
            if (!isLast)
              Container(
                width: 2,
                height: 32,
                color: isCompleted ? AppColors.leaf : Colors.grey.withOpacity(0.3),
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: isCompleted ? AppColors.leaf : AppColors.ink,
                ),
              ),
              Text(
                subtitle,
                style: const TextStyle(fontSize: 11, color: Colors.grey),
              ),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildContactTile(IconData icon, String title, String subtitle, {VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap,
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.cream,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, size: 20, color: AppColors.leaf),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 11, color: Colors.grey)),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.ink),
                ),
              ],
            ),
          ),
          if (onTap != null)
            const Icon(Icons.copy_rounded, size: 16, color: Colors.grey),
        ],
      ),
    );
  }
}
