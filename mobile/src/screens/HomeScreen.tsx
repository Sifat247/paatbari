import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
} from "lucide-react-native";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../constants/theme";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { useLanguage } from "../context/LanguageContext";
import { PRODUCTS, CATEGORIES } from "../data/catalog";
import { Product } from "../types";

const { width } = Dimensions.get("window");

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isBn, t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 6);
  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetail", { product });
  };

  const handleCategoryPress = (catKey: string) => {
    navigation.navigate("ShopTab", { category: catKey });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        onSearchPress={() => navigation.navigate("ShopTab")}
        onCartPress={() => navigation.navigate("CartTab")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroBadge}>
            <Sparkles size={13} color={COLORS.juteDark} />
            <Text style={styles.heroBadgeText}>
              {t("১০০% খাঁটি ও পরিবেশবান্ধব", "100% Pure Eco-Friendly")}
            </Text>
          </View>
          <Text style={styles.heroTitle}>
            {t("সোনালী আঁশের আভিজাত্য,\nহাতে বোনা পরম মমতায়", "Golden Jute Elegance,\nHandcrafted with Care")}
          </Text>
          <Text style={styles.heroSub}>
            {t(
              "মানিকগঞ্জের পল্লী নারী কারিগরদের তৈরি প্রিমিয়াম ব্যাগ, হোম ডেকর ও উপহার সামগ্রী।",
              "Artisanal jute bags, home decor & eco lifestyle essentials from rural Bangladesh."
            )}
          </Text>

          <TouchableOpacity
            style={styles.heroCta}
            onPress={() => navigation.navigate("ShopTab")}
            activeOpacity={0.85}
          >
            <Text style={styles.heroCtaText}>
              {t("সকল পণ্য দেখুন", "Explore Collection")}
            </Text>
            <ArrowRight size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Value Propositions / Trust Pills */}
        <View style={styles.trustGrid}>
          <View style={styles.trustItem}>
            <HeartHandshake size={20} color={COLORS.leaf} />
            <Text style={styles.trustTitle}>
              {t("সরাসরি কারিগর", "Artisan Direct")}
            </Text>
            <Text style={styles.trustSub}>
              {t("শতভাগ ন্যায্য মজুরি", "100% Fair Trade")}
            </Text>
          </View>
          <View style={styles.trustItem}>
            <Truck size={20} color={COLORS.forest} />
            <Text style={styles.trustTitle}>
              {t("সারাদেশে ডেলিভারি", "Fast Delivery")}
            </Text>
            <Text style={styles.trustSub}>
              {t("৬৪ জেলায় হোম ডেলিভারি", "All 64 Districts")}
            </Text>
          </View>
          <View style={styles.trustItem}>
            <ShieldCheck size={20} color={COLORS.juteDark} />
            <Text style={styles.trustTitle}>
              {t("ক্যাশ অন ডেলিভারি", "Cash on Delivery")}
            </Text>
            <Text style={styles.trustSub}>
              {t("পণ্য পেয়ে মূল্য দিন", "Inspect Before Pay")}
            </Text>
          </View>
        </View>

        {/* Categories Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t("ক্যাটাগরি সমূহ", "Shop by Category")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ShopTab")}>
            <Text style={styles.viewAllText}>
              {t("সবগুলো দেখুন →", "View All →")}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(cat.key)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryIconCircle}>
                <Text style={styles.categoryEmoji}>
                  {cat.key === "bags"
                    ? "👜"
                    : cat.key === "jewelry"
                    ? "📿"
                    : cat.key === "home"
                    ? "🪴"
                    : cat.key === "table"
                    ? "🍽️"
                    : cat.key === "office"
                    ? "📁"
                    : "🎁"}
                </Text>
              </View>
              <Text style={styles.categoryName}>
                {isBn ? cat.bn : cat.en}
              </Text>
              <Text style={styles.categoryCount}>
                {cat.count ? `${cat.count} ${t("পণ্য", "items")}` : ""}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bestsellers Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.titleWithIcon}>
            <TrendingUp size={20} color={COLORS.leaf} />
            <Text style={styles.sectionTitle}>
              {t("সর্বোচ্চ বিক্রিত পণ্য", "Best Selling Products")}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ShopTab")}>
            <Text style={styles.viewAllText}>
              {t("আরও দেখুন →", "More →")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product)}
            />
          ))}
        </View>

        {/* Artisan Heritage Highlight Banner */}
        <View style={styles.artisanCard}>
          <View style={styles.artisanTextContainer}>
            <Text style={styles.artisanBadge}>
              {t("আমাদের কারুশিল্পী পরিবার", "Our Artisan Heritage")}
            </Text>
            <Text style={styles.artisanTitle}>
              {t(
                "মানিকগঞ্জের নারী কারিগরদের হাতের জাদুতে বাংলার সোনালী ঐতিহ্য",
                "Reviving Bangladesh's Golden Fiber Through Rural Women Artisans"
              )}
            </Text>
            <Text style={styles.artisanDesc}>
              {t(
                "পাটবাড়ির প্রতিটি পণ্যে জড়িয়ে আছে পল্লী নারীর পরম যত্ন, ন্যায্য পারিশ্রমিক ও পরিবেশের প্রতি ভালোবাসা।",
                "Every stitch represents fair wages, eco-preservation, and empowered rural livelihoods."
              )}
            </Text>
            <TouchableOpacity
              style={styles.artisanBtn}
              onPress={() => navigation.navigate("ArtisanStory")}
              activeOpacity={0.8}
            >
              <Text style={styles.artisanBtnText}>
                {t("কারিগরদের গল্প পড়ুন", "Read Artisan Story")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t("বিশেষ সংগ্রহ", "Featured Collection")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ShopTab")}>
            <Text style={styles.viewAllText}>
              {t("সব দেখুন →", "View All →")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product)}
            />
          ))}
        </View>

        {/* Bottom space */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  heroBanner: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    backgroundColor: COLORS.forest,
    borderRadius: RADIUS.xl,
    ...SHADOWS.md,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(200, 161, 101, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(200, 161, 101, 0.4)",
  },
  heroBadgeText: {
    color: COLORS.jute,
    fontSize: 11,
    fontWeight: "700",
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
    lineHeight: 30,
    marginBottom: SPACING.sm,
  },
  heroSub: {
    fontSize: 13,
    color: "#CFDDD7",
    lineHeight: 19,
    marginBottom: SPACING.lg,
  },
  heroCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.leaf,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
    alignSelf: "flex-start",
  },
  heroCtaText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  trustGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.sand,
    ...SHADOWS.sm,
  },
  trustItem: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 2,
  },
  trustTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.forest,
    marginTop: 6,
    textAlign: "center",
  },
  trustSub: {
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 2,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  titleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.forest,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.leaf,
  },
  categoryScroll: {
    paddingHorizontal: SPACING.lg,
    gap: 12,
  },
  categoryCard: {
    width: 100,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.sand,
    ...SHADOWS.sm,
  },
  categoryIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FBF7EF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  categoryEmoji: {
    fontSize: 22,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
  },
  artisanCard: {
    margin: SPACING.lg,
    backgroundColor: "#F2EADB",
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: "#DFCFAF",
    ...SHADOWS.sm,
  },
  artisanTextContainer: {
    gap: 8,
  },
  artisanBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.juteDark,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  artisanTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.forest,
    lineHeight: 23,
  },
  artisanDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  artisanBtn: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.forest,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    marginTop: 4,
  },
  artisanBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
});
