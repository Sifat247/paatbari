class ProductVariantModel {
  final String key;
  final String titleEn;
  final String titleBn;
  final int price;

  const ProductVariantModel({
    required this.key,
    required this.titleEn,
    required this.titleBn,
    required this.price,
  });

  factory ProductVariantModel.fromJson(Map<String, dynamic> json) {
    return ProductVariantModel(
      key: json['k'] ?? '',
      titleEn: json['en'] ?? '',
      titleBn: json['bn'] ?? '',
      price: json['price'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
    'k': key,
    'en': titleEn,
    'bn': titleBn,
    'price': price,
  };
}

class ProductModel {
  final String id;
  final String category;
  final String slug;
  final String titleEn;
  final String titleBn;
  final List<ProductVariantModel> variants;
  final String? badgeText;
  final bool isBestseller;
  final bool inStock;
  final String? imageAsset;
  final String? imageUrl;
  final String? descriptionBn;
  final String? descriptionEn;

  const ProductModel({
    required this.id,
    required this.category,
    required this.slug,
    required this.titleEn,
    required this.titleBn,
    required this.variants,
    this.badgeText,
    this.isBestseller = false,
    this.inStock = true,
    this.imageAsset,
    this.imageUrl,
    this.descriptionBn,
    this.descriptionEn,
  });

  int get basePrice => variants.isNotEmpty ? variants.first.price : 0;

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'] ?? '',
      category: json['cat'] ?? '',
      slug: json['slug'] ?? '',
      titleEn: json['en'] ?? '',
      titleBn: json['bn'] ?? '',
      variants: (json['variants'] as List<dynamic>? ?? [])
          .map((v) => ProductVariantModel.fromJson(v as Map<String, dynamic>))
          .toList(),
      badgeText: json['badge']?['text'],
      isBestseller: json['isBestseller'] ?? false,
      inStock: json['inStock'] ?? true,
      imageAsset: json['imageAsset'],
      imageUrl: json['imageUrl'],
      descriptionBn: json['descriptionBn'],
      descriptionEn: json['descriptionEn'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'cat': category,
    'slug': slug,
    'en': titleEn,
    'bn': titleBn,
    'variants': variants.map((v) => v.toJson()).toList(),
    if (badgeText != null) 'badge': {'text': badgeText},
    'isBestseller': isBestseller,
    'inStock': inStock,
    if (imageAsset != null) 'imageAsset': imageAsset,
    if (imageUrl != null) 'imageUrl': imageUrl,
    if (descriptionBn != null) 'descriptionBn': descriptionBn,
    if (descriptionEn != null) 'descriptionEn': descriptionEn,
  };
}
