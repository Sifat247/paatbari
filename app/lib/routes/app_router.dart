import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../shared/widgets/paatbari_app_bar.dart';
import '../shared/widgets/bottom_nav_bar.dart';
import '../shared/widgets/price_tag.dart';
import '../core/theme/colors.dart';

// Screens
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const PaatbariAppBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero Banner
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppColors.leaf, Color(0xFF16382A)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
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
                      '🌿 সোনালি আঁশের বাড়ি',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: AppColors.ink,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'হাতে বোনা প্রাকৃতিক\nপাটপণ্য',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: AppColors.white,
                      height: 1.25,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি। পরিবেশ সুরক্ষায় টেকসই জীবনের সঙ্গী।',
                    style: TextStyle(
                      fontSize: 12,
                      color: Color(0xFFE8DEC8),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Highlights
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildFeatureBadge('৬৪ জেলায় COD'),
                _buildFeatureBadge('৳২,৫০০+ ফ্রি ডেলিভারি'),
                _buildFeatureBadge('১০০% প্রাকৃতিক পাট'),
              ],
            ),
            const SizedBox(height: 24),

            // Section: Categories
            const Text(
              'পণ্য বিভাগ',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.leaf,
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 90,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _buildCategoryChip('ব্যাগ', Icons.shopping_bag_outlined),
                  _buildCategoryChip('হোম ডেকোর', Icons.home_outlined),
                  _buildCategoryChip('টেবিল ও কিচেন', Icons.table_restaurant_outlined),
                  _buildCategoryChip('অফিস', Icons.folder_open_outlined),
                  _buildCategoryChip('বান্ডেল', Icons.card_giftcard_outlined),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const PaatbariBottomNav(currentIndex: 0),
    );
  }

  Widget _buildFeatureBadge(String title) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.sand),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.check_circle, size: 14, color: AppColors.leaf),
          const SizedBox(width: 4),
          Text(title, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.ink)),
        ],
      ),
    );
  }

  Widget _buildCategoryChip(String label, IconData icon) {
    return Container(
      width: 80,
      margin: const EdgeInsets.only(right: 12),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.sand),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 28, color: AppColors.leaf),
          const SizedBox(height: 6),
          Text(
            label,
            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.ink),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class ShopScreen extends StatelessWidget {
  const ShopScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: PaatbariAppBar(title: 'সকল পণ্য'),
      body: Center(
        child: Text('শপ ক্যাটালগ স্ক্রিন'),
      ),
      bottomNavigationBar: PaatbariBottomNav(currentIndex: 1),
    );
  }
}

class B2BScreen extends StatelessWidget {
  const B2BScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: PaatbariAppBar(title: 'কর্পোরেট ও বাল্ক অর্ডার'),
      body: Center(
        child: Text('কর্পোরেট কোটেশন ও এস্টিমেট স্ক্রিন'),
      ),
      bottomNavigationBar: PaatbariBottomNav(currentIndex: 2),
    );
  }
}

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: PaatbariAppBar(title: 'আপনার শপিং ব্যাগ'),
      body: Center(
        child: Text('ব্যাগ বর্তমানে খালি রয়েছে'),
      ),
      bottomNavigationBar: PaatbariBottomNav(currentIndex: 3),
    );
  }
}

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: PaatbariAppBar(title: 'কাস্টমার প্রোফাইল'),
      body: Center(
        child: Text('লগইন ও অর্ডার ট্র্যাকিং'),
      ),
      bottomNavigationBar: PaatbariBottomNav(currentIndex: 4),
    );
  }
}

final appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/shop',
      builder: (context, state) => const ShopScreen(),
    ),
    GoRoute(
      path: '/b2b',
      builder: (context, state) => const B2BScreen(),
    ),
    GoRoute(
      path: '/cart',
      builder: (context, state) => const CartScreen(),
    ),
    GoRoute(
      path: '/account',
      builder: (context, state) => const AccountScreen(),
    ),
  ],
);
