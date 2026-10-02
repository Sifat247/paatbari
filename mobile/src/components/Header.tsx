import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ShoppingBag, Globe, Search } from "lucide-react-native";
import { COLORS, SPACING, RADIUS } from "../constants/theme";
import { useLanguage, toBanglaDigits } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onSearchPress?: () => void;
  onCartPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchPress, onCartPress }) => {
  const { isBn, toggleLanguage } = useLanguage();
  const { totalCount } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.brandRow}>
          <Text style={styles.brandTitle}>{isBn ? "পাটবাড়ি" : "Paatbari"}</Text>
          <View style={styles.brandDot} />
        </View>
        <Text style={styles.brandSub}>
          {isBn ? "হাতে বোনা সোনালী আঁশের কারুকাজ" : "Handcrafted Golden Jute"}
        </Text>
      </View>

      <View style={styles.actions}>
        {/* Language switch */}
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={toggleLanguage}
          activeOpacity={0.7}
        >
          <Globe size={18} color={COLORS.forest} />
          <Text style={styles.langText}>{isBn ? "EN" : "বাং"}</Text>
        </TouchableOpacity>

        {/* Search */}
        {onSearchPress && (
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <Search size={20} color={COLORS.forest} />
          </TouchableOpacity>
        )}

        {/* Cart */}
        {onCartPress && (
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={onCartPress}
            activeOpacity={0.7}
          >
            <ShoppingBag size={20} color={COLORS.forest} />
            {totalCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {isBn ? toBanglaDigits(totalCount) : totalCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cream,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand,
  },
  left: {
    flex: 1,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.forest,
    letterSpacing: -0.5,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.jute,
    marginLeft: 4,
    marginBottom: 2,
  },
  brandSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 1,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
    backgroundColor: "#EFE8DA",
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  langText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.forest,
  },
  iconBtn: {
    padding: 7,
    borderRadius: RADIUS.pill,
    backgroundColor: "#EFE8DA",
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  cartBtn: {
    padding: 7,
    borderRadius: RADIUS.pill,
    backgroundColor: "#EFE8DA",
    borderWidth: 1,
    borderColor: COLORS.sand,
    position: "relative",
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: COLORS.leaf,
    borderRadius: RADIUS.pill,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: COLORS.cream,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
  },
});
