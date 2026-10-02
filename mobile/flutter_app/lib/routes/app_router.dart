import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../shared/widgets/paatbari_app_bar.dart';
import '../shared/widgets/bottom_nav_bar.dart';
import '../shared/widgets/product_card.dart';
import '../core/theme/colors.dart';
import '../features/catalog/providers/product_provider.dart';
import '../features/catalog/screens/shop_screen.dart';
import '../features/catalog/screens/product_details_screen.dart';
import '../features/cart/screens/cart_screen.dart';
import '../features/b2b/screens/b2b_screen.dart';
import '../features/account/screens/account_screen.dart';

// Home Screen
class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final allProducts = ref.watch(allProductsProvider);
    final bestsellers = allProducts.where((p) => p.isBestseller).toList();

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
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => context.go('/shop'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.jute,
                      foregroundColor: AppColors.ink,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    ),
                    child: const Text('কালেকশন এক্সপ্লোর করুন', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Highlights
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildFeatureBadge('৬৪ জেলায় COD'),
                _buildFeatureBadge('৳২,৫০০+ ফ্রি ডেলিভারি'),
                _buildFeatureBadge('১০০% খাঁটি পাট'),
              ],
            ),
            const SizedBox(height: 24),

            // Section: Categories
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'পণ্য বিভাগ',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.leaf,
                  ),
                ),
                TextButton(
                  onPressed: () => context.go('/shop'),
                  child: const Text('সব দেখুন', style: TextStyle(color: AppColors.leaf, fontSize: 13, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 90,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _buildCategoryChip(context, ref, 'ব্যাগ', 'bags', Icons.shopping_bag_outlined),
                  _buildCategoryChip(context, ref, 'হোম ডেকোর', 'home', Icons.home_outlined),
                  _buildCategoryChip(context, ref, 'টেবিল ও কিচেন', 'table', Icons.table_restaurant_outlined),
                  _buildCategoryChip(context, ref, 'অফিস', 'office', Icons.folder_open_outlined),
                  _buildCategoryChip(context, ref, 'উপহার', 'gifts', Icons.card_giftcard_outlined),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Section: Bestsellers
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'সেরা বিক্রিত পাটপণ্য',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.ink,
                  ),
                ),
                TextButton(
                  onPressed: () => context.go('/shop'),
                  child: const Text('সব দেখুন', style: TextStyle(color: AppColors.leaf, fontSize: 13, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 8),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.68,
                crossAxisSpacing: 12,
                mainAxisSpacing: 14,
              ),
              itemCount: bestsellers.take(4).length,
              itemBuilder: (context, index) {
                return ProductCard(product: bestsellers[index]);
              },
            ),
            const SizedBox(height: 28),

            // Artisan & Founder Heritage Section
            Container(
              width: double.infinity,
              decoration: BoxDecoration(
                color: AppColors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.sand),
              ),
              clipBehavior: Clip.antiAlias,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: 160,
                    child: Image.asset(
                      'assets/images/artisan-loom.jpg',
                      fit: BoxFit.cover,
                      errorBuilder: (ctx, err, stack) => Container(color: AppColors.cream),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppColors.leaf.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text(
                            'ঐতিহ্য ও স্বত্বাধিকারীর গল্প',
                            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.leaf),
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'মানিকগঞ্জের তাঁতের বুনন থেকে বিশ্বমানের পাটপণ্য',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.ink),
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'পাটবাড়ি-র প্রতিষ্ঠাতা ও স্বত্বাধিকারী Sifat Phychee-র মূল লক্ষ্য হলো পরিবেশবান্ধব সোনালি আঁশের পুনর্জাগরণ ঘটানো। মানিকগঞ্জ সদরের দক্ষ তাঁতি ও কারিগরদের সাথে অংশীদারিত্বের মাধ্যমে প্রতিটি পণ্য প্রস্তুত হয় শতভাগ ভালোবাসা ও আন্তরিকতায়।',
                          style: TextStyle(fontSize: 12, color: Color(0xFF555555), height: 1.5),
                        ),
                        const SizedBox(height: 12),
                        const Row(
                          children: [
                            Icon(Icons.location_on, size: 16, color: AppColors.leaf),
                            SizedBox(width: 4),
                            Text(
                              'মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০ · helpline: 01793648214',
                              style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.ink),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
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

  Widget _buildCategoryChip(BuildContext context, WidgetRef ref, String label, String catKey, IconData icon) {
    return GestureDetector(
      onTap: () {
        ref.read(selectedCategoryProvider.notifier).state = catKey;
        context.go('/shop');
      },
      child: Container(
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
      ),
    );
  }
}

// Router configuration
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
      path: '/p/:slug',
      builder: (context, state) {
        final slug = state.pathParameters['slug'] ?? '';
        return ProductDetailsScreen(slug: slug);
      },
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
