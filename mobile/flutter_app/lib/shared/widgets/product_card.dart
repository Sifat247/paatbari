import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../features/catalog/models/product.dart';
import '../../features/cart/providers/cart_provider.dart';
import 'price_tag.dart';

class ProductCard extends ConsumerWidget {
  final ProductModel product;

  const ProductCard({
    super.key,
    required this.product,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () => context.push('/p/${product.slug}'),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.sand, width: 1),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Artwork / Image Frame
            Expanded(
              child: Stack(
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
                  if (product.badgeText != null)
                    Positioned(
                      top: 8,
                      left: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.leaf,
                          borderRadius: BorderRadius.circular(6),
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
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),

            // Product Details
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.titleBn,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      PriceTag(
                        amount: product.basePrice,
                        fontSize: 14,
                      ),
                      InkWell(
                        onTap: () {
                          if (product.variants.isNotEmpty) {
                            ref.read(cartProvider.notifier).addItem(
                              product,
                              product.variants.first,
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
                          }
                        },
                        borderRadius: BorderRadius.circular(8),
                        child: Container(
                          padding: const EdgeInsets.all(7),
                          decoration: BoxDecoration(
                            color: AppColors.leaf.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(
                            Icons.add_shopping_cart,
                            size: 16,
                            color: AppColors.leaf,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlaceholder() {
    return Container(
      color: AppColors.cream,
      child: Center(
        child: Icon(
          Icons.eco_outlined,
          size: 44,
          color: AppColors.juteDeep.withOpacity(0.6),
        ),
      ),
    );
  }
}
