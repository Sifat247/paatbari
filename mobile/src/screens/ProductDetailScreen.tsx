import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Linking,
  Share,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Share2,
  Heart,
  Sparkles,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  Maximize2,
  X,
  Info,
} from "lucide-react-native";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../constants/theme";
import { Product, ProductVariant } from "../types";
import { useLanguage, toBanglaDigits } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { Badge } from "../components/Badge";

const { width, height } = Dimensions.get("window");

export const ProductDetailScreen: React.FC<{
  route: any;
  navigation: any;
}> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { product } = route.params as { product: Product };
  const { isBn, t, formatPrice } = useLanguage();
  const { addToCart } = useCart();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const images = product.images?.length > 0 ? product.images : [product.primaryImage];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${isBn ? product.bn : product.en} - ${formatPrice(
          selectedVariant.price
        )} | পাটবাড়ি (Paatbari) https://paatbari.vercel.app/p/${product.slug}`,
      });
    } catch (e) {}
  };

  const handleWhatsAppOrder = () => {
    const text = isBn
      ? `হ্যালো পাটবাড়ি! আমি "${product.bn}" (ভ্যারিয়েন্ট: ${selectedVariant.bn}, পরিমাণ: ${quantity}টি) অর্ডার করতে চাই। দাম: ${formatPrice(
          selectedVariant.price * quantity
        )}। বিস্তারিত জানতে চাই।`
      : `Hello Paatbari! I want to order "${product.en}" (Variant: ${selectedVariant.en}, Qty: ${quantity}). Total: ${formatPrice(
          selectedVariant.price * quantity
        )}. Please confirm.`;

    const url = `whatsapp://send?phone=8801793648214&text=${encodeURIComponent(text)}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://wa.me/8801793648214?text=${encodeURIComponent(text)}`);
      }
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.forest} />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          {isBn ? product.bn : product.en}
        </Text>
        <View style={styles.navRight}>
          <TouchableOpacity style={styles.navBtn} onPress={handleShare}>
            <Share2 size={18} color={COLORS.forest} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate("CartTab")}
          >
            <ShoppingBag size={18} color={COLORS.forest} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Showcase Image Frame (with Full Lightbox Zoom Support) */}
        <View style={styles.imageShowcaseContainer}>
          <TouchableOpacity
            style={styles.mainImageTouch}
            onPress={() => setLightboxVisible(true)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: images[activeImageIdx] }}
              style={styles.mainImage}
              resizeMode="contain"
            />
            <View style={styles.zoomHint}>
              <Maximize2 size={14} color={COLORS.forest} />
              <Text style={styles.zoomHintText}>
                {t("জুম করে দেখুন", "Tap to Zoom")}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Badge */}
          {product.badge && (
            <View style={styles.badgeTopLeft}>
              <Badge
                text={isBn ? product.badge.text : product.badge.textEn}
                variant={product.badge.variant}
                size="md"
              />
            </View>
          )}
        </View>

        {/* Thumbnail Carousel */}
        {images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailScroll}
          >
            {images.map((imgUri, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.thumbCard,
                  activeImageIdx === idx && styles.activeThumbCard,
                ]}
                onPress={() => setActiveImageIdx(idx)}
              >
                <Image
                  source={{ uri: imgUri }}
                  style={styles.thumbImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Product Meta Card */}
        <View style={styles.metaCard}>
          <Text style={styles.productTitle}>
            {isBn ? product.bn : product.en}
          </Text>
          <Text style={styles.tagline}>
            {isBn ? product.taglineBn : product.taglineEn}
          </Text>

          {/* Price & Rating Row */}
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>
                {formatPrice(selectedVariant.price)}
              </Text>
              <Text style={styles.mrpText}>
                {t("ভ্যাট অন্তর্ভুক্ত · সরাসরি কারখানা মূল্য", "Includes VAT · Factory Direct Price")}
              </Text>
            </View>

            <View style={styles.stockBadge}>
              <View style={styles.stockDot} />
              <Text style={styles.stockText}>
                {t("স্টকে রয়েছে", "In Stock")}
              </Text>
            </View>
          </View>
        </View>

        {/* Variant Picker */}
        {product.variants.length > 1 && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionCardTitle}>
              {t("ভ্যারিয়েন্ট নির্বাচন করুন:", "Select Variant:")}
            </Text>
            <View style={styles.variantOptions}>
              {product.variants.map((v) => {
                const isSelected = selectedVariant.k === v.k;
                return (
                  <TouchableOpacity
                    key={v.k}
                    style={[
                      styles.variantBtn,
                      isSelected && styles.activeVariantBtn,
                    ]}
                    onPress={() => setSelectedVariant(v)}
                  >
                    <Text
                      style={[
                        styles.variantBtnText,
                        isSelected && styles.activeVariantBtnText,
                      ]}
                    >
                      {isBn ? v.bn : v.en}
                    </Text>
                    <Text
                      style={[
                        styles.variantPriceText,
                        isSelected && styles.activeVariantPriceText,
                      ]}
                    >
                      {formatPrice(v.price)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Artisan Heritage Trust Tag */}
        <View style={styles.artisanOriginCard}>
          <Sparkles size={18} color={COLORS.juteDark} />
          <View style={{ flex: 1 }}>
            <Text style={styles.artisanOriginTitle}>
              {t(
                "হাতে বোনা প্রাকৃতিক পাট · মানিকগঞ্জ সদর",
                "Handwoven Natural Jute · Manikganj Hub"
              )}
            </Text>
            <Text style={styles.artisanOriginSub}>
              {t(
                "১০০% বায়োডিগ্রেডেবল সোনালী আঁশ এবং গ্রামীণ নারী কারিগরদের ন্যায্য পারিশ্রমিক নিশ্চিত করে তৈরি।",
                "100% biodegradable golden fiber ensuring fair-wage employment for rural women artisans."
              )}
            </Text>
          </View>
        </View>

        {/* Description & Story */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionCardTitle}>
            {t("পণ্যের বিস্তারিত", "Product Description")}
          </Text>
          <Text style={styles.bodyText}>
            {isBn ? product.descriptionBn : product.descriptionEn}
          </Text>

          {/* Key Features Bullet List */}
          <Text style={[styles.sectionCardTitle, { marginTop: SPACING.md }]}>
            {t("মূল বৈশিষ্ট্যসমূহ", "Key Features")}
          </Text>
          {(isBn ? product.featuresBn : product.featuresEn).map(
            (feature, i) => (
              <View key={i} style={styles.bulletRow}>
                <Check size={14} color={COLORS.leaf} />
                <Text style={styles.bulletText}>{feature}</Text>
              </View>
            )
          )}
        </View>

        {/* Specifications */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionCardTitle}>
            {t("সাইজ ও উপাদান বিবরণ", "Specifications")}
          </Text>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>{t("সাইজ/আকার:", "Dimensions:")}</Text>
            <Text style={styles.specVal}>
              {isBn ? product.dimensionsBn : product.dimensionsEn}
            </Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>{t("উপাদান:", "Material:")}</Text>
            <Text style={styles.specVal}>
              {isBn ? product.materialBn : product.materialEn}
            </Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>{t("যত্ন প্রণালী:", "Care:")}</Text>
            <Text style={styles.specVal}>
              {isBn ? product.careBn.join(", ") : product.careEn.join(", ")}
            </Text>
          </View>
        </View>

        {/* Transparent Costing Model (ELI5 Pricing) */}
        <View style={styles.costingCard}>
          <View style={styles.costingHeader}>
            <Info size={16} color={COLORS.juteDark} />
            <Text style={styles.costingTitle}>
              {t("স্বচ্ছ মূল্য নীতি (ELI5 Costing)", "Transparent Pricing Model")}
            </Text>
          </View>
          <Text style={styles.costingDesc}>
            {t(
              "পাটবাড়িতে কোনো মধ্যস্বত্বভোগী নেই। আপনার প্রদত্ত মূল্যের সিংহভাগ সরাসরি মানিকগঞ্জের গ্রামীণ নারী কারিগর ও পাটচাষীদের কাছে পৌঁছায়।",
              "Zero middlemen. Direct artisan pricing empowering women makers in Manikganj."
            )}
          </Text>
        </View>

        {/* Bottom padding for sticky bottom bar */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 12 }]}>
        {/* Quantity Stepper */}
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={16} color={COLORS.forest} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>
            {isBn ? toBanglaDigits(quantity) : quantity}
          </Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Plus size={16} color={COLORS.forest} />
          </TouchableOpacity>
        </View>

        {/* Add to Bag Button */}
        <TouchableOpacity
          style={[styles.addToCartBtn, isAdded && styles.addedBtn]}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          {isAdded ? (
            <>
              <Check size={18} color={COLORS.white} />
              <Text style={styles.btnText}>
                {t("ব্যাগ-এ যোগ হয়েছে", "Added to Bag")}
              </Text>
            </>
          ) : (
            <>
              <ShoppingBag size={18} color={COLORS.white} />
              <Text style={styles.btnText}>
                {t("ব্যাগে যোগ করুন", "Add to Bag")}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* WhatsApp 1-tap Direct Order */}
        <TouchableOpacity
          style={styles.whatsappBtn}
          onPress={handleWhatsAppOrder}
          activeOpacity={0.85}
        >
          <MessageCircle size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Lightbox Zoom Modal */}
      <Modal
        visible={lightboxVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLightboxVisible(false)}
      >
        <View style={styles.lightboxModal}>
          <TouchableOpacity
            style={styles.lightboxCloseBtn}
            onPress={() => setLightboxVisible(false)}
          >
            <X size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Image
            source={{ uri: images[activeImageIdx] }}
            style={styles.lightboxImage}
            resizeMode="contain"
          />
          <Text style={styles.lightboxFooter}>
            {isBn ? product.bn : product.en} ({activeImageIdx + 1} / {images.length})
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.cream,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand,
  },
  navBtn: {
    padding: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: "#EFE8DA",
  },
  navTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.forest,
    marginHorizontal: SPACING.sm,
  },
  navRight: {
    flexDirection: "row",
    gap: 8,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  imageShowcaseContainer: {
    width: "100%",
    height: width * 0.9,
    backgroundColor: "#FBF8F2",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand,
  },
  mainImageTouch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  badgeTopLeft: {
    position: "absolute",
    top: SPACING.md,
    left: SPACING.md,
  },
  zoomHint: {
    position: "absolute",
    bottom: SPACING.md,
    right: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  zoomHintText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.forest,
  },
  thumbnailScroll: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: 10,
  },
  thumbCard: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.sand,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  activeThumbCard: {
    borderColor: COLORS.leaf,
    borderWidth: 2,
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },
  metaCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.sand,
    ...SHADOWS.sm,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.forest,
    lineHeight: 24,
  },
  tagline: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.sandLight,
    paddingTop: SPACING.md,
  },
  price: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.forest,
  },
  mrpText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  stockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.leafLight,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.leaf,
  },
  stockText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.leaf,
  },
  sectionCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.sand,
    ...SHADOWS.sm,
  },
  sectionCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.forest,
    marginBottom: SPACING.sm,
  },
  variantOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  variantBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  activeVariantBtn: {
    backgroundColor: COLORS.forest,
    borderColor: COLORS.forest,
  },
  variantBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  activeVariantBtnText: {
    color: COLORS.white,
  },
  variantPriceText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  activeVariantPriceText: {
    color: COLORS.juteLight,
  },
  artisanOriginCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: "#F4EDE1",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  artisanOriginTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.forest,
  },
  artisanOriginSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },
  bodyText: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 18,
  },
  specRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sandLight,
  },
  specLabel: {
    width: 100,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  specVal: {
    flex: 1,
    fontSize: 12,
    color: COLORS.text,
  },
  costingCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: "#FBF7EF",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: "#E5D8C3",
  },
  costingHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  costingTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.juteDark,
  },
  costingDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.sand,
    gap: 10,
    ...SHADOWS.lg,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.sand,
    height: 48,
  },
  qtyBtn: {
    paddingHorizontal: 12,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.forest,
    minWidth: 20,
    textAlign: "center",
  },
  addToCartBtn: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.forest,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addedBtn: {
    backgroundColor: COLORS.leaf,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  whatsappBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#25D366",
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  lightboxModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  lightboxCloseBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  lightboxImage: {
    width: width * 0.95,
    height: height * 0.75,
  },
  lightboxFooter: {
    position: "absolute",
    bottom: 40,
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "600",
  },
});
