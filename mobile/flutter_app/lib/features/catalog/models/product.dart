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
      key: json['k'] ?? json['key'] ?? '',
      titleEn: json['en'] ?? json['titleEn'] ?? '',
      titleBn: json['bn'] ?? json['titleBn'] ?? '',
      price: (json['price'] as num?)?.toInt() ?? 0,
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
  final bool isFeatured;
  final bool inStock;
  final String? imageAsset;
  final String? imageUrl;
  final List<String> images;
  final String? taglineBn;
  final String? taglineEn;
  final String? descriptionBn;
  final String? descriptionEn;
  final List<String> featuresBn;
  final List<String> featuresEn;
  final String? dimensionsBn;
  final String? dimensionsEn;
  final String? materialBn;
  final String? materialEn;
  final double rating;
  final int reviewsCount;

  const ProductModel({
    required this.id,
    required this.category,
    required this.slug,
    required this.titleEn,
    required this.titleBn,
    required this.variants,
    this.badgeText,
    this.isBestseller = false,
    this.isFeatured = false,
    this.inStock = true,
    this.imageAsset,
    this.imageUrl,
    this.images = const [],
    this.taglineBn,
    this.taglineEn,
    this.descriptionBn,
    this.descriptionEn,
    this.featuresBn = const [],
    this.featuresEn = const [],
    this.dimensionsBn,
    this.dimensionsEn,
    this.materialBn,
    this.materialEn,
    this.rating = 4.9,
    this.reviewsCount = 42,
  });

  int get basePrice => variants.isNotEmpty ? variants.first.price : 0;

  String get displayImageUrl =>
      imageUrl ?? (images.isNotEmpty ? images.first : 'https://paatbari.vercel.app/images/products/classic-tote.jpg');

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'] ?? '',
      category: json['cat'] ?? json['category'] ?? '',
      slug: json['slug'] ?? '',
      titleEn: json['en'] ?? json['titleEn'] ?? '',
      titleBn: json['bn'] ?? json['titleBn'] ?? '',
      variants: (json['variants'] as List<dynamic>? ?? [])
          .map((v) => ProductVariantModel.fromJson(v as Map<String, dynamic>))
          .toList(),
      badgeText: json['badge']?['text'] ?? json['badgeText'],
      isBestseller: json['isBestseller'] ?? false,
      isFeatured: json['isFeatured'] ?? false,
      inStock: json['inStock'] ?? true,
      imageAsset: json['imageAsset'],
      imageUrl: json['imageUrl'] ?? json['primaryImage'],
      images: (json['images'] as List<dynamic>? ?? [])
          .map((e) => e.toString())
          .toList(),
      taglineBn: json['taglineBn'],
      taglineEn: json['taglineEn'],
      descriptionBn: json['descriptionBn'],
      descriptionEn: json['descriptionEn'],
      featuresBn: (json['featuresBn'] as List<dynamic>? ?? [])
          .map((e) => e.toString())
          .toList(),
      featuresEn: (json['featuresEn'] as List<dynamic>? ?? [])
          .map((e) => e.toString())
          .toList(),
      dimensionsBn: json['dimensionsBn'],
      dimensionsEn: json['dimensionsEn'],
      materialBn: json['materialBn'],
      materialEn: json['materialEn'],
      rating: (json['rating'] as num?)?.toDouble() ?? 4.9,
      reviewsCount: (json['reviewsCount'] as num?)?.toInt() ?? 42,
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
    'isFeatured': isFeatured,
    'inStock': inStock,
    if (imageAsset != null) 'imageAsset': imageAsset,
    if (imageUrl != null) 'imageUrl': imageUrl,
    'images': images,
    if (taglineBn != null) 'taglineBn': taglineBn,
    if (taglineEn != null) 'taglineEn': taglineEn,
    if (descriptionBn != null) 'descriptionBn': descriptionBn,
    if (descriptionEn != null) 'descriptionEn': descriptionEn,
    'featuresBn': featuresBn,
    'featuresEn': featuresEn,
    if (dimensionsBn != null) 'dimensionsBn': dimensionsBn,
    if (dimensionsEn != null) 'dimensionsEn': dimensionsEn,
    if (materialBn != null) 'materialBn': materialBn,
    if (materialEn != null) 'materialEn': materialEn,
    'rating': rating,
    'reviewsCount': reviewsCount,
  };
}
