import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/colors.dart';
import '../../../shared/widgets/paatbari_app_bar.dart';
import '../../../shared/widgets/bottom_nav_bar.dart';
import '../../../shared/widgets/product_card.dart';
import '../providers/product_provider.dart';

class ShopScreen extends ConsumerWidget {
  const ShopScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final products = ref.watch(filteredProductsProvider);
    final selectedCategory = ref.watch(selectedCategoryProvider);
    final searchQuery = ref.watch(searchQueryProvider);

    return Scaffold(
      appBar: const PaatbariAppBar(title: 'পাটবাড়ি শপ'),
      body: Column(
        children: [
          // Search & Filter Header
          Container(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            color: AppColors.white,
            child: Column(
              children: [
                // Search Input
                Container(
                  height: 44,
                  decoration: BoxDecoration(
                    color: AppColors.cream,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.sand),
                  ),
                  child: TextField(
                    onChanged: (val) => ref.read(searchQueryProvider.notifier).state = val,
                    decoration: InputDecoration(
                      hintText: 'পাটপণ্য খুঁজুন (যেমন: টোট ব্যাগ, ঝুড়ি, রানার)...',
                      hintStyle: const TextStyle(fontSize: 12, color: Colors.grey),
                      prefixIcon: const Icon(Icons.search, size: 20, color: AppColors.leaf),
                      suffixIcon: searchQuery.isNotEmpty
                          ? IconButton(
                              icon: const Icon(Icons.clear, size: 16, color: Colors.grey),
                              onPressed: () => ref.read(searchQueryProvider.notifier).state = '',
                            )
                          : null,
                      border: InputBorder.none,
                      contentPadding: const EdgeInsets.symmetric(vertical: 10),
                    ),
                  ),
                ),
                const SizedBox(height: 10),

                // Category Chips List
                SizedBox(
                  height: 38,
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: defaultCategories.length,
                    separatorBuilder: (_, __) => const SizedBox(width: 8),
                    itemBuilder: (context, idx) {
                      final cat = defaultCategories[idx];
                      final isSelected = selectedCategory == cat.key;
                      return ChoiceChip(
                        label: Text(cat.titleBn),
                        selected: isSelected,
                        onSelected: (selected) {
                          if (selected) {
                            ref.read(selectedCategoryProvider.notifier).state = cat.key;
                          }
                        },
                        selectedColor: AppColors.leaf,
                        backgroundColor: AppColors.white,
                        labelStyle: TextStyle(
                          fontSize: 12,
                          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                          color: isSelected ? AppColors.white : AppColors.ink,
                        ),
                        side: BorderSide(
                          color: isSelected ? AppColors.leaf : AppColors.sand,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),

          // Result Count Banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: AppColors.cream.withOpacity(0.5),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${products.length}টি হস্তশিল্প পণ্য পাওয়া গেছে',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: AppColors.leaf,
                  ),
                ),
                if (searchQuery.isNotEmpty || selectedCategory != 'all')
                  GestureDetector(
                    onTap: () {
                      ref.read(selectedCategoryProvider.notifier).state = 'all';
                      ref.read(searchQueryProvider.notifier).state = '';
                    },
                    child: const Text(
                      'রিসেট করুন',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.redAccent,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
              ],
            ),
          ),

          // Product Grid
          Expanded(
            child: products.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.search_off, size: 64, color: AppColors.sand),
                        const SizedBox(height: 12),
                        const Text(
                          'কোনো পণ্য খুঁজে পাওয়া যায়নি',
                          style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.ink),
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'অন্য কোনো নাম দিয়ে অনুসন্ধান করুন',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {
                            ref.read(selectedCategoryProvider.notifier).state = 'all';
                            ref.read(searchQueryProvider.notifier).state = '';
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.leaf,
                            foregroundColor: AppColors.white,
                          ),
                          child: const Text('সব পণ্য দেখুন'),
                        ),
                      ],
                    ),
                  )
                : GridView.builder(
                    padding: const EdgeInsets.all(16),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.68,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 14,
                    ),
                    itemCount: products.length,
                    itemBuilder: (context, index) {
                      return ProductCard(product: products[index]);
                    },
                  ),
          ),
        ],
      ),
      bottomNavigationBar: const PaatbariBottomNav(currentIndex: 1),
    );
  }
}
