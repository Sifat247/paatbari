import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Truck,
  Sparkles,
  ShieldCheck,
} from "lucide-react-native";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../constants/theme";
import { useLanguage, toBanglaDigits } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_LIMIT = 2500;

export const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isBn, t, formatPrice } = useLanguage();
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryCharge,
    grandTotal,
  } = useCart();

  const neededForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);
  const freeProgress = Math.min(1, subtotal / FREE_SHIPPING_LIMIT);

  if (items.length === 0) {
    return (
      <View style={[styles.emptyContainer, { paddingTop: insets.top }]}>
        <View style={styles.emptyCircle}>
          <ShoppingBag size={48} color={COLORS.juteDark} />
        </View>
        <Text style={styles.emptyTitle}>
          {t("আপনার শপিং ব্যাগ খালি", "Your Cart is Empty")}
        </Text>
        <Text style={styles.emptySub}>
          {t(
            "আমাদের কারিগরদের তৈরি নান্দনিক পরিবেশবান্ধব পাটজাত পণ্যগুলো ঘুরে দেখুন।",
            "Explore handcrafted eco-friendly jute essentials from our rural artisans."
          )}
        </Text>
        <TouchableOpacity
          style={styles.shopNowBtn}
          onPress={() => navigation.navigate("ShopTab")}
          activeOpacity={0.85}
        >
          <Text style={styles.shopNowText}>
            {t("পণ্য দেখুন", "Shop Collections")}
          </Text>
          <ArrowRight size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t("শপিং ব্যাগ", "Shopping Bag")}
        </Text>
        <Text style={styles.headerCount}>
          {isBn
            ? `${items.reduce((s, i) => s + i.quantity, 0)}টি পণ্য`
            : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Free Shipping Meter */}
        <View style={styles.freeShippingCard}>
          <View style={styles.freeShippingHeader}>
            <Sparkles size={16} color={COLORS.leaf} />
            <Text style={styles.freeShippingText}>
              {neededForFreeShipping > 0
                ? t(
                    `আর ${formatPrice(neededForFreeShipping)} টাকার অর্ডার করলে ফ্রি ডেলিভারি!`,
                    `Add ${formatPrice(neededForFreeShipping)} more for FREE Delivery!`
                  )
                : t("🎉 আপনি ফ্রি ডেলিভারি পেয়েছেন!", "🎉 You unlocked FREE Delivery!")}
            </Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${freeProgress * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Cart Item Cards */}
        {items.map((item) => (
          <View key={item.variant.k} style={styles.itemCard}>
            <Image
              source={{ uri: item.product.primaryImage }}
              style={styles.itemImage}
              resizeMode="contain"
            />
            <View style={styles.itemDetails}>
              <View style={styles.itemTitleRow}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                  {isBn ? item.product.bn : item.product.en}
                </Text>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFromCart(item.variant.k)}
                >
                  <Trash2 size={16} color={COLORS.danger} />
                </TouchableOpacity>
              </View>

              <Text style={styles.variantLabel}>
                {isBn ? item.variant.bn : item.variant.en}
              </Text>

              <View style={styles.itemBottomRow}>
                <Text style={styles.itemPrice}>
                  {formatPrice(item.variant.price * item.quantity)}
                </Text>

                {/* Stepper */}
                <View style={styles.stepper}>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() =>
                      updateQuantity(item.variant.k, item.quantity - 1)
                    }
                  >
                    <Minus size={14} color={COLORS.forest} />
                  </TouchableOpacity>
                  <Text style={styles.stepQty}>
                    {isBn ? toBanglaDigits(item.quantity) : item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() =>
                      updateQuantity(item.variant.k, item.quantity + 1)
                    }
                  >
                    <Plus size={14} color={COLORS.forest} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Delivery Zone Selector */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryTitleRow}>
            <Truck size={18} color={COLORS.forest} />
            <Text style={styles.deliveryCardTitle}>
              {t("ডেলিভারি লোকেশন নির্বাচন করুন", "Select Delivery Location")}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.zoneOption,
              deliveryZone === "dhaka_city" && styles.activeZoneOption,
            ]}
            onPress={() => setDeliveryZone("dhaka_city")}
          >
            <View style={styles.radioOuter}>
              {deliveryZone === "dhaka_city" && <View style={styles.radioInner} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.zoneName}>
                {t("ঢাকা সিটির ভেতরে", "Inside Dhaka City")}
              </Text>
              <Text style={styles.zoneEta}>
                {t("১-২ কার্যদিবস · হোম ডেলিভারি", "1-2 Business Days")}
              </Text>
            </View>
            <Text style={styles.zoneFee}>৳৭০</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.zoneOption,
              deliveryZone === "outside" && styles.activeZoneOption,
            ]}
            onPress={() => setDeliveryZone("outside")}
          >
            <View style={styles.radioOuter}>
              {deliveryZone === "outside" && <View style={styles.radioInner} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.zoneName}>
                {t("ঢাকা সিটির বাইরে / সারাদেশ", "Outside Dhaka / All Bangladesh")}
              </Text>
              <Text style={styles.zoneEta}>
                {t("২-৪ কার্যদিবস · ৬৪ জেলায়", "2-4 Business Days")}
              </Text>
            </View>
            <Text style={styles.zoneFee}>৳১৩০</Text>
          </TouchableOpacity>
        </View>

        {/* Pricing Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            {t("মূল্য বিবরণী", "Order Summary")}
          </Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {t("পণ্যগুলোর মোট মূল্য", "Subtotal")}
            </Text>
            <Text style={styles.summaryVal}>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {t("ডেলিভারি চার্জ", "Delivery Charge")}
            </Text>
            <Text style={[styles.summaryVal, deliveryCharge === 0 && { color: COLORS.leaf }]}>
              {deliveryCharge === 0
                ? t("ফ্রি (বিনামূল্যে)", "FREE")
                : formatPrice(deliveryCharge)}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalLabel}>
              {t("সর্বমোট প্রদেয়", "Grand Total")}
            </Text>
            <Text style={styles.grandTotalVal}>{formatPrice(grandTotal)}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Sticky Checkout CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 12 }]}>
        <View>
          <Text style={styles.bottomTotalLabel}>
            {t("মোট মূল্য", "Total")}
          </Text>
          <Text style={styles.bottomTotalVal}>{formatPrice(grandTotal)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate("Checkout")}
          activeOpacity={0.88}
        >
          <Text style={styles.checkoutBtnText}>
            {t("অর্ডার করতে এগিয়ে যান", "Proceed to Checkout")}
          </Text>
          <ArrowRight size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.cream,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.forest,
  },
  headerCount: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: "600",
  },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  freeShippingCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "#CDE3D5",
    ...SHADOWS.sm,
  },
  freeShippingHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  freeShippingText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.forest,
    flex: 1,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: COLORS.cream,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.leaf,
    borderRadius: 3,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.sand,
    gap: 12,
    ...SHADOWS.sm,
  },
  itemImage: {
    width: 76,
    height: 76,
    borderRadius: RADIUS.md,
    backgroundColor: "#FAF6EF",
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.forest,
    marginRight: 6,
  },
  removeBtn: {
    padding: 4,
  },
  variantLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  itemBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.forest,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  stepBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stepQty: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.forest,
    minWidth: 18,
    textAlign: "center",
  },
  deliveryCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.sand,
    ...SHADOWS.sm,
  },
  deliveryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: SPACING.md,
  },
  deliveryCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.forest,
  },
  zoneOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.sand,
    marginBottom: 8,
    gap: 12,
  },
  activeZoneOption: {
    borderColor: COLORS.leaf,
    backgroundColor: "#F2F9F5",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.leaf,
  },
  zoneName: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.forest,
  },
  zoneEta: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  zoneFee: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.forest,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.sand,
    ...SHADOWS.sm,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.forest,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.sand,
    paddingTop: 10,
    marginTop: 5,
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.forest,
  },
  grandTotalVal: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.forest,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.sand,
    ...SHADOWS.lg,
  },
  bottomTotalLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  bottomTotalVal: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.forest,
  },
  checkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.forest,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.cream,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xxl,
  },
  emptyCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F2E8D8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.forest,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: SPACING.xxl,
  },
  shopNowBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.leaf,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: RADIUS.md,
  },
  shopNowText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
});
