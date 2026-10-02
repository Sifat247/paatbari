import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Sparkles, Heart, Award, Users } from "lucide-react-native";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../constants/theme";
import { useLanguage } from "../context/LanguageContext";

const { width } = Dimensions.get("window");

export const ArtisanStoryScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { isBn, t } = useLanguage();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.forest} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t("কারিগরদের গল্প ও ঐতিহ্য", "Artisan Heritage")}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cover Photo */}
        <View style={styles.coverFrame}>
          <Image
            source={{
              uri: "https://paatbari.vercel.app/images/products/nakshi-tapestry-artisan-full.jpg",
            }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <View style={styles.coverOverlay}>
            <View style={styles.badgePill}>
              <Sparkles size={13} color={COLORS.juteDark} />
              <Text style={styles.badgeText}>
                {t("মানিকগঞ্জ কারুপল্লী", "Manikganj Artisan Hub")}
              </Text>
            </View>
            <Text style={styles.coverTitle}>
              {t(
                "সোনালী আঁশে রচিত গ্রামীণ নারীর আত্মনির্ভরতার জয়গাথা",
                "Crafting Independence with Bangladesh's Golden Fiber"
              )}
            </Text>
          </View>
        </View>

        {/* Impact Numbers */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <Text style={styles.statNum}>৫০+</Text>
            <Text style={styles.statLabel}>
              {t("নারী কারিগর", "Women Makers")}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={styles.statNum}>১০০%</Text>
            <Text style={styles.statLabel}>
              {t("ন্যায্য মজুরি", "Fair Wage")}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={styles.statNum}>০%</Text>
            <Text style={styles.statLabel}>
              {t("প্লাস্টিক ব্যবহার", "Zero Plastic")}
            </Text>
          </View>
        </View>

        {/* Narrative Article */}
        <View style={styles.articleCard}>
          <Text style={styles.paragraph}>
            {t(
              "পাট শুধু আমাদের জাতীয় ঐতিহ্য নয়, এটি প্রকৃতির এক অনন্য আশীর্বাদ। পাটবাড়ির প্রতিটি ব্যাগ, ওয়ালেট এবং হোম ডেকর তৈরি হয় মানিকগঞ্জের নিভৃত পল্লীর মমতাময়ী নারী কারিগরদের হাতে।",
              "Jute is more than a fiber; it is Bangladesh's living heritage. Every tote, wallet, and home accent from Paatbari is individually hand-woven by passionate women artisans in rural Manikganj."
            )}
          </Text>

          <Text style={styles.paragraph}>
            {t(
              "আমাদের মূল উদ্দেশ্য হলো গ্রামীণ নারীদের আর্থিক সক্ষমতা বৃদ্ধি এবং মধ্যস্বত্বভোগীদের হস্তক্ষেপ ছাড়াই সরাসরি তাদের হাতে পণ্যের ন্যায্য মূল্য নিশ্চিত করা। প্রতিটি ক্রয়ের মাধ্যমে আপনি একজন সংগ্রামী নারীর পরিবারের পাশে দাঁড়াচ্ছেন।",
              "Our mission is simple: eliminate predatory middlemen and channel fair wages directly into artisan hands, fostering sustainable rural economies."
            )}
          </Text>
        </View>

        {/* Mission Pillars */}
        <View style={styles.pillarCard}>
          <View style={styles.pillarRow}>
            <Heart size={20} color={COLORS.leaf} />
            <View style={{ flex: 1 }}>
              <Text style={styles.pillarTitle}>
                {t("ভালোবাসা ও সততা", "Crafted with Devotion")}
              </Text>
              <Text style={styles.pillarDesc}>
                {t(
                  "যন্ত্রের কৃত্রিমতা নয়, প্রতিটি সুতা বোনা হয় নিখুঁত হাতের স্পর্শে।",
                  "Free from mass-machined uniformity; each knot holds human touch."
                )}
              </Text>
            </View>
          </View>

          <View style={styles.pillarRow}>
            <Award size={20} color={COLORS.juteDark} />
            <View style={{ flex: 1 }}>
              <Text style={styles.pillarTitle}>
                {t("টেকসই ভবিষ্যৎ", "Sustainable Future")}
              </Text>
              <Text style={styles.pillarDesc}>
                {t(
                  "পরিবেশ ধ্বংসকারী পলিথিন ও প্লাস্টিকের বিপরীতে সম্পূর্ণ প্রাকৃতিক বিকল্প।",
                  "A 100% biodegradable alternative replacing destructive synthetic plastics."
                )}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => navigation.navigate("ShopTab")}
          activeOpacity={0.88}
        >
          <Text style={styles.exploreBtnText}>
            {t("কারিগরদের তৈরি পণ্য দেখুন", "Explore Artisan Products")}
          </Text>
        </TouchableOpacity>

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
  navBtn: {
    padding: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: "#EFE8DA",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.forest,
  },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  coverFrame: {
    width: "100%",
    height: 220,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    position: "relative",
    ...SHADOWS.md,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(20, 53, 40, 0.65)",
    padding: SPACING.lg,
    justifyContent: "flex-end",
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  badgeText: {
    color: COLORS.jute,
    fontSize: 11,
    fontWeight: "700",
  },
  coverTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.white,
    lineHeight: 25,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.sand,
    alignItems: "center",
    justifyContent: "space-around",
    ...SHADOWS.sm,
  },
  statCol: {
    alignItems: "center",
  },
  statNum: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.forest,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.sand,
  },
  articleCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.sand,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  paragraph: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 21,
  },
  pillarCard: {
    backgroundColor: "#F2EADB",
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.sand,
    gap: SPACING.md,
  },
  pillarRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  pillarTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.forest,
    marginBottom: 2,
  },
  pillarDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 17,
  },
  exploreBtn: {
    backgroundColor: COLORS.forest,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
  },
  exploreBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
});
