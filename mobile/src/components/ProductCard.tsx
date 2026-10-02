import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Plus, Check } from "lucide-react-native";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../constants/theme";
import { Product } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { Badge } from "./Badge";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - SPACING.lg * 2 - SPACING.md) / 2;

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { isBn, formatPrice } = useLanguage();
  const { addToCart, items } = useCart();

  const title = isBn ? product.bn : product.en;
  const firstVariant = product.variants[0];
  const price = firstVariant?.price || 0;

  const isAlreadyInCart = items.some(
    (item) => item.product.id === product.id
  );

  const handleAdd = (e: any) => {
    e.stopPropagation?.();
    addToCart(product, firstVariant, 1);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Image Showcase Frame (Clean aspect ratio, contain, no corner clipping!) */}
      <View style={styles.imageFrame}>
        <Image
          source={{ uri: product.primaryImage }}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Badge Overlay */}
        {product.badge && (
          <View style={styles.badgeTopLeft}>
            <Badge
              text={isBn ? product.badge.text : product.badge.textEn}
              variant={product.badge.variant}
              size="sm"
            />
          </View>
        )}
      </View>

      {/* Info Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>{formatPrice(price)}</Text>
            {product.variants.length > 1 && (
              <Text style={styles.variantHint}>
                {isBn
                  ? `${product.variants.length}টি ভ্যারিয়েন্ট`
                  : `${product.variants.length} options`}
              </Text>
            )}
          </View>

          {/* Quick Add Button */}
          <TouchableOpacity
            style={[styles.addBtn, isAlreadyInCart && styles.addedBtn]}
            onPress={handleAdd}
            activeOpacity={0.7}
          >
            {isAlreadyInCart ? (
              <Check size={16} color={COLORS.white} />
            ) : (
              <Plus size={16} color={COLORS.forest} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.sand,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  imageFrame: {
    width: "100%",
    height: CARD_WIDTH * 0.95,
    backgroundColor: "#FBF8F2",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.sm,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badgeTopLeft: {
    position: "absolute",
    top: SPACING.sm,
    left: SPACING.sm,
    zIndex: 2,
  },
  content: {
    padding: SPACING.md,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    lineHeight: 18,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.forest,
  },
  variantHint: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.sand,
    alignItems: "center",
    justifyContent: "center",
  },
  addedBtn: {
    backgroundColor: COLORS.leaf,
    borderColor: COLORS.leaf,
  },
});
