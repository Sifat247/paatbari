import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';
import '../../../core/constants/api_endpoints.dart';
import '../../catalog/models/product.dart';
import '../models/cart_item.dart';

final apiClientProvider = Provider<ApiClient>((ref) => ApiClient());

class CartState {
  final List<CartItemModel> items;
  final CartQuoteResult quote;
  final bool isLoading;
  final String? error;
  final String selectedZone;
  final String? couponCode;

  const CartState({
    this.items = const [],
    required this.quote,
    this.isLoading = false,
    this.error,
    this.selectedZone = 'dhaka_city',
    this.couponCode,
  });

  CartState copyWith({
    List<CartItemModel>? items,
    CartQuoteResult? quote,
    bool? isLoading,
    String? error,
    String? selectedZone,
    String? couponCode,
  }) {
    return CartState(
      items: items ?? this.items,
      quote: quote ?? this.quote,
      isLoading: isLoading ?? this.isLoading,
      error: error,
      selectedZone: selectedZone ?? this.selectedZone,
      couponCode: couponCode ?? this.couponCode,
    );
  }

  int get itemCount => items.fold(0, (sum, i) => sum + i.qty);
}

class CartNotifier extends StateNotifier<CartState> {
  final ApiClient _apiClient;

  CartNotifier(this._apiClient)
      : super(CartState(quote: CartQuoteResult.empty()));

  void addItem(ProductModel product, ProductVariantModel variant, {int qty = 1}) {
    final existingIndex = state.items.indexWhere(
      (item) => item.product.id == product.id && item.variant.key == variant.key,
    );

    List<CartItemModel> updated;
    if (existingIndex >= 0) {
      updated = [...state.items];
      final current = updated[existingIndex];
      updated[existingIndex] = current.copyWith(qty: current.qty + qty);
    } else {
      updated = [...state.items, CartItemModel(product: product, variant: variant, qty: qty)];
    }

    state = state.copyWith(items: updated);
    refreshServerQuote();
  }

  void updateQuantity(String productId, String variantKey, int qty) {
    if (qty <= 0) {
      removeItem(productId, variantKey);
      return;
    }

    final updated = state.items.map((item) {
      if (item.product.id == productId && item.variant.key == variantKey) {
        return item.copyWith(qty: qty);
      }
      return item;
    }).toList();

    state = state.copyWith(items: updated);
    refreshServerQuote();
  }

  void removeItem(String productId, String variantKey) {
    final updated = state.items.where(
      (item) => !(item.product.id == productId && item.variant.key == variantKey),
    ).toList();

    state = state.copyWith(items: updated);
    refreshServerQuote();
  }

  void setZone(String zone) {
    state = state.copyWith(selectedZone: zone);
    refreshServerQuote();
  }

  void applyCoupon(String code) {
    state = state.copyWith(couponCode: code.trim());
    refreshServerQuote();
  }

  /// Strict rule: App NEVER calculates total price client-side.
  /// Always fetches server-authoritative quote from POST /api/v1/cart/quote
  Future<void> refreshServerQuote() async {
    if (state.items.isEmpty) {
      state = state.copyWith(quote: CartQuoteResult.empty(), error: null);
      return;
    }

    state = state.copyWith(isLoading: true, error: null);

    try {
      final lines = state.items.map((i) => i.toQuoteLine()).toList();
      final response = await _apiClient.dio.post(
        ApiEndpoints.cartQuote,
        data: {
          'lines': lines,
          'zone': state.selectedZone,
          'coupon': state.couponCode,
        },
      );

      if (response.statusCode == 200 && response.data != null) {
        final quote = CartQuoteResult.fromJson(response.data);
        state = state.copyWith(quote: quote, isLoading: false);
      } else {
        state = state.copyWith(
          error: 'Failed to calculate quote',
          isLoading: false,
        );
      }
    } catch (e) {
      state = state.copyWith(
        error: 'Network connection error',
        isLoading: false,
      );
    }
  }

  void clearCart() {
    state = CartState(quote: CartQuoteResult.empty());
  }
}

final cartProvider = StateNotifierProvider<CartNotifier, CartState>((ref) {
  final client = ref.watch(apiClientProvider);
  return CartNotifier(client);
});
