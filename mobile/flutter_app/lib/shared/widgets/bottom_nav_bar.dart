import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/colors.dart';
import '../../features/cart/providers/cart_provider.dart';

class PaatbariBottomNav extends ConsumerWidget {
  final int currentIndex;

  const PaatbariBottomNav({
    super.key,
    required this.currentIndex,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartCount = ref.watch(cartProvider.select((s) => s.itemCount));

    return NavigationBar(
      selectedIndex: currentIndex,
      onDestinationSelected: (index) {
        switch (index) {
          case 0:
            context.go('/');
            break;
          case 1:
            context.go('/shop');
            break;
          case 2:
            context.go('/b2b');
            break;
          case 3:
            context.go('/cart');
            break;
          case 4:
            context.go('/account');
            break;
        }
      },
      backgroundColor: AppColors.white,
      indicatorColor: AppColors.leaf.withOpacity(0.12),
      destinations: [
        const NavigationDestination(
          icon: Icon(Icons.home_outlined),
          selectedIcon: Icon(Icons.home, color: AppColors.leaf),
          label: 'হোম',
        ),
        const NavigationDestination(
          icon: Icon(Icons.storefront_outlined),
          selectedIcon: Icon(Icons.storefront, color: AppColors.leaf),
          label: 'শপ',
        ),
        const NavigationDestination(
          icon: Icon(Icons.business_center_outlined),
          selectedIcon: Icon(Icons.business_center, color: AppColors.leaf),
          label: 'কর্পোরেট',
        ),
        NavigationDestination(
          icon: Badge(
            isLabelVisible: cartCount > 0,
            label: Text('$cartCount'),
            backgroundColor: AppColors.clay,
            child: const Icon(Icons.shopping_bag_outlined),
          ),
          selectedIcon: Badge(
            isLabelVisible: cartCount > 0,
            label: Text('$cartCount'),
            backgroundColor: AppColors.clay,
            child: const Icon(Icons.shopping_bag, color: AppColors.leaf),
          ),
          label: 'ব্যাগ',
        ),
        const NavigationDestination(
          icon: Icon(Icons.person_outline),
          selectedIcon: Icon(Icons.person, color: AppColors.leaf),
          label: 'অ্যাকাউন্ট',
        ),
      ],
    );
  }
}
