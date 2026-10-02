import '../../catalog/models/product.dart';

class CartItemModel {
  final ProductModel product;
  final ProductVariantModel variant;
  final int qty;

  const CartItemModel({
    required this.product,
    required this.variant,
    this.qty = 1,
  });

  CartItemModel copyWith({int? qty}) {
    return CartItemModel(
      product: product,
      variant: variant,
      qty: qty ?? this.qty,
    );
  }

  Map<String, dynamic> toQuoteLine() => {
    'variantId': '${product.id}-${variant.key}',
    'qty': qty,
    'productName': product.titleBn,
    'variantName': variant.titleBn,
  };
}

class CartQuoteResult {
  final int subtotal;
  final int discount;
  final int delivery;
  final int total;
  final List<String> calc;

  const CartQuoteResult({
    required this.subtotal,
    required this.discount,
    required this.delivery,
    required this.total,
    required this.calc,
  });

  factory CartQuoteResult.empty() => const CartQuoteResult(
    subtotal: 0,
    discount: 0,
    delivery: 0,
    total: 0,
    calc: [],
  );

  factory CartQuoteResult.fromJson(Map<String, dynamic> json) {
    return CartQuoteResult(
      subtotal: json['subtotal'] ?? 0,
      discount: json['discount'] ?? 0,
      delivery: json['delivery'] ?? 0,
      total: json['total'] ?? 0,
      calc: (json['calc'] as List<dynamic>? ?? []).map((e) => e.toString()).toList(),
    );
  }
}
