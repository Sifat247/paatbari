import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/colors.dart';
import '../../../shared/widgets/price_tag.dart';
import '../../cart/providers/cart_provider.dart';
import '../models/product.dart';
import '../providers/product_provider.dart';

class ProductDetailsScreen extends ConsumerStatefulWidget {
  final String slug;

  const ProductDetailsScreen({
    super.key,
    required this.slug,
  });

  @override
  ConsumerState<ProductDetailsScreen> createState() => _ProductDetailsScreenState();
}

class _ProductDetailsScreenState extends ConsumerState<ProductDetailsScreen> {
  late ProductVariantModel _selectedVariant;
  int _qty = 1;
  bool _initialized = false;

  void _initVariant(ProductModel product) {
    if (!_initialized && product.variants.isNotEmpty) {
      _selectedVariant = product.variants.first;
      _initialized = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    final allProducts = ref.watch(allProductsProvider);
    final product = allProducts.firstWhere(
      (p) => p.slug == widget.slug,
      orElse: () => allProducts.first,
    );

    _initVariant(product);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          product.titleBn,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        backgroundColor: AppColors.white,
        foregroundColor: AppColors.leaf,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('লিঙ্ক কপি করা হয়েছে!'),
                  duration: Duration(seconds: 1),
                ),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.shopping_bag_outlined),
            onPressed: () => context.push('/cart'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Product Hero Image
            Container(
              width: double.infinity,
              height: 320,
              decoration: const BoxDecoration(
                color: AppColors.cream,
              ),
              child: Stack(
                fit: StackFit.expand,
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: double.infinity,
                    child: product.imageUrl != null
                        ? Image.network(
                            product.imageUrl!,
                            fit: BoxFit.contain,
                            errorBuilder: (ctx, err, stack) {
                              if (product.imageAsset != null) {
                                return Image.asset(
                                  product.imageAsset!,
                                  fit: BoxFit.contain,
                                  errorBuilder: (c, e, s) => _buildPlaceholder(),
                                );
                              }
                              return _buildPlaceholder();
                            },
                          )
                        : (product.imageAsset != null
                            ? Image.asset(
                                product.imageAsset!,
                                fit: BoxFit.contain,
                                errorBuilder: (c, e, s) => _buildPlaceholder(),
                              )
                            : _buildPlaceholder()),
                  ),

                  // Badge
                  if (product.badgeText != null)
                    Positioned(
                      top: 16,
                      left: 16,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: AppColors.leaf,
                          borderRadius: BorderRadius.circular(8),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.2),
                              blurRadius: 4,
                            ),
                          ],
                        ),
                        child: Text(
                          product.badgeText!,
                          style: const TextStyle(
                            color: AppColors.white,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),

            // Product Details Padding
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Bengali & English Titles
                  Text(
                    product.titleBn,
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: AppColors.ink,
                      height: 1.25,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    product.titleEn,
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.ink.withOpacity(0.6),
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Price Tag
                  Row(
                    children: [
                      PriceTag(
                        amount: _selectedVariant.price,
                        fontSize: 26,
                      ),
                      const SizedBox(width: 10),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.leaf.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Text(
                          'ভ্যাট অন্তর্ভুক্ত',
                          style: TextStyle(fontSize: 11, color: AppColors.leaf, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Variants Section (if multiple variants exist)
                  if (product.variants.length > 1) ...[
                    const Text(
                      'ভেরিয়েন্ট / সাইজ নির্বাচন করুন:',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: AppColors.ink,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Wrap(
                      spacing: 8,
                      children: product.variants.map((v) {
                        final isSelected = v.key == _selectedVariant.key;
                        return ChoiceChip(
                          label: Text('${v.titleBn} (৳${v.price})'),
                          selected: isSelected,
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
                          onSelected: (selected) {
                            if (selected) {
                              setState(() {
                                _selectedVariant = v;
                              });
                            }
                          },
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 20),
                  ],

                  // Quantity Stepper
                  Row(
                    children: [
                      const Text(
                        'পরিমাণ:',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: AppColors.ink,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Container(
                        decoration: BoxDecoration(
                          border: Border.all(color: AppColors.sand),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.remove, size: 18),
                              onPressed: _qty > 1
                                  ? () => setState(() => _qty--)
                                  : null,
                            ),
                            Container(
                              constraints: const BoxConstraints(minWidth: 36),
                              alignment: Alignment.center,
                              child: Text(
                                '$_qty',
                                style: const TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            IconButton(
                              icon: const Icon(Icons.add, size: 18),
                              onPressed: () => setState(() => _qty++),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Delivery Rates Box
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.cream,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.sand),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(Icons.local_shipping_outlined, size: 20, color: AppColors.leaf),
                            SizedBox(width: 8),
                            Text(
                              'ডেলিভারি তথ্য ও চার্জ',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: AppColors.leaf,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        _buildDeliveryRow('ঢাকা সিটি (২৪–৪৮ ঘণ্টা)', '৳৭০'),
                        _buildDeliveryRow('ঢাকা উপশহর (২–৩ দিন)', '৳১০০'),
                        _buildDeliveryRow('ঢাকার বাইরে সারা বাংলাদেশ (৩–৫ দিন)', '৳১৩০'),
                        const Divider(height: 16),
                        const Row(
                          children: [
                            Icon(Icons.stars_rounded, size: 16, color: Colors.amber),
                            SizedBox(width: 6),
                            Expanded(
                              child: Text(
                                '৳২,৫০০ বা তদূর্ধ্ব কেনাকাটায় দেশজুড়ে ডেলিভারি ফ্রি!',
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.ink,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Description
                  const Text(
                    'পণ্যের বিবরণ ও বৈশিষ্ট্য',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    product.descriptionBn ?? 'প্রিমিয়াম কোয়ালিটির হস্তশিল্প পাটপণ্য।',
                    style: const TextStyle(
                      fontSize: 13,
                      height: 1.6,
                      color: Color(0xFF4A4A4A),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Artisan story badge
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppColors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.sand),
                    ),
                    child: Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: AppColors.leaf.withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.volunteer_activism, size: 20, color: AppColors.leaf),
                        ),
                        const SizedBox(width: 12),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'হাতে বোনা স্থানীয় কারিগর দ্বারা',
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.ink,
                                ),
                              ),
                              SizedBox(height: 2),
                              Text(
                                'মানিকগঞ্জ সদর ও তৎসংলগ্ন এলাকার তাঁতিদের দক্ষ হাতের তৈরি খাঁটি পাটপণ্য।',
                                style: TextStyle(
                                  fontSize: 11,
                                  color: Colors.grey,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 80), // spacing for bottom bar
                ],
              ),
            ),
          ],
        ),
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: AppColors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 10,
              offset: const Offset(0, -4),
            ),
          ],
        ),
        child: Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: () {
                  ref.read(cartProvider.notifier).addItem(
                    product,
                    _selectedVariant,
                    qty: _qty,
                  );
                  ScaffoldMessenger.of(context).hideCurrentSnackBar();
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('${product.titleBn} ব্যাগে যোগ হয়েছে'),
                      duration: const Duration(seconds: 2),
                      backgroundColor: AppColors.leaf,
                      action: SnackBarAction(
                        label: 'ব্যাগে যান',
                        textColor: AppColors.jute,
                        onPressed: () => context.push('/cart'),
                      ),
                    ),
                  );
                },
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.leaf,
                  side: const BorderSide(color: AppColors.leaf, width: 1.5),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: const Text(
                  'ব্যাগে যোগ করুন',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  ref.read(cartProvider.notifier).addItem(
                    product,
                    _selectedVariant,
                    qty: _qty,
                  );
                  context.push('/cart');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.leaf,
                  foregroundColor: AppColors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: const Text(
                  'এখনই কিনুন',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDeliveryRow(String title, String price) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(fontSize: 12, color: AppColors.ink)),
          Text(price, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.leaf)),
        ],
      ),
    );
  }

  Widget _buildPlaceholder() {
    return Container(
      color: AppColors.cream,
      child: const Center(
        child: Icon(
          Icons.image_outlined,
          size: 64,
          color: AppColors.sand,
        ),
      ),
    );
  }
}
