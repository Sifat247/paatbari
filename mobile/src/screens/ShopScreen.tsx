import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react-native";
import { COLORS, SPACING, RADIUS } from "../constants/theme";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { useLanguage } from "../context/LanguageContext";
import { CATEGORIES } from "../data/catalog";
import { fetchProducts } from "../services/api";
import { Product } from "../types";

export const ShopScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { isBn, t } = useLanguage();

  const initialCat = route.params?.category || "all";
  const [selectedCat, setSelectedCat] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "low" | "high">("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (route.params?.category) {
      setSelectedCat(route.params.category);
    }
  }, [route.params?.category]);

  const loadProducts = async () => {
    const list = await fetchProducts();
    setProducts(list);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCat !== "all") {
      result = result.filter((p) => p.cat === selectedCat);
    }

    // Filter by search query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.bn.toLowerCase().includes(q) ||
          p.en.toLowerCase().includes(q) ||
          p.descriptionBn.toLowerCase().includes(q) ||
          p.descriptionEn.toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "low") {
      result.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === "high") {
      result.sort((a, b) => b.variants[0].price - a.variants[0].price);
    }

    return result;
  }, [products, selectedCat, searchQuery, sortBy]);

  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetail", { product });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header onCartPress={() => navigation.navigate("CartTab")} />

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBox}>
          <Search size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t("ব্যাগ, ওয়ালেট, বা হোম ডেকর খুঁজুন...", "Search bags, wallets, rugs...")}
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <X size={16} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Pills Filter */}
      <View style={styles.categoryBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryPills}
        >
          <TouchableOpacity
            style={[
              styles.pill,
              selectedCat === "all" && styles.activePill,
            ]}
            onPress={() => setSelectedCat("all")}
          >
            <Text
              style={[
                styles.pillText,
                selectedCat === "all" && styles.activePillText,
              ]}
            >
              {t("সকল পণ্য", "All Items")}
            </Text>
          </TouchableOpacity>

          {CATEGORIES.map((cat) => {
            const isActive = selectedCat === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[styles.pill, isActive && styles.activePill]}
                onPress={() => setSelectedCat(cat.key)}
              >
                <Text
                  style={[
                    styles.pillText,
                    isActive && styles.activePillText,
                  ]}
                >
                  {isBn ? cat.bn : cat.en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Header with Sorting Toggle */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {isBn
            ? `${filteredProducts.length}টি পণ্য পাওয়া গেছে`
            : `${filteredProducts.length} products found`}
        </Text>

        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === "featured" && styles.activeSortBtn]}
            onPress={() => setSortBy("featured")}
          >
            <Text
              style={[
                styles.sortBtnText,
                sortBy === "featured" && styles.activeSortBtnText,
              ]}
            >
              {t("জনপ্রিয়", "Popular")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === "low" && styles.activeSortBtn]}
            onPress={() => setSortBy("low")}
          >
            <Text
              style={[
                styles.sortBtnText,
                sortBy === "low" && styles.activeSortBtnText,
              ]}
            >
              {t("দাম: কম", "Low")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === "high" && styles.activeSortBtn]}
            onPress={() => setSortBy("high")}
          >
            <Text
              style={[
                styles.sortBtnText,
                sortBy === "high" && styles.activeSortBtnText,
              ]}
            >
              {t("দাম: বেশি", "High")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => handleProductPress(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🌾</Text>
            <Text style={styles.emptyTitle}>
              {t("কোনো পণ্য পাওয়া যায়নি", "No products found")}
            </Text>
            <Text style={styles.emptySub}>
              {t(
                "অন্য কোনো নাম অথবা ক্যাটাগরি দিয়ে চেষ্টা করুন।",
                "Try searching with different keywords or reset filters."
              )}
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSearchQuery("");
                setSelectedCat("all");
              }}
            >
              <Text style={styles.resetBtnText}>
                {t("ফিল্টার রিসেট করুন", "Reset Filters")}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  searchBarContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.cream,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.sand,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  categoryBar: {
    paddingVertical: 4,
  },
  categoryPills: {
    paddingHorizontal: SPACING.lg,
    gap: 8,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  activePill: {
    backgroundColor: COLORS.forest,
    borderColor: COLORS.forest,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.forest,
  },
  activePillText: {
    color: COLORS.white,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  sortContainer: {
    flexDirection: "row",
    gap: 4,
  },
  sortBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: "transparent",
  },
  activeSortBtn: {
    backgroundColor: "#EBE3D3",
  },
  sortBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  activeSortBtnText: {
    color: COLORS.forest,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: SPACING.xl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.forest,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  resetBtn: {
    backgroundColor: COLORS.leaf,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
  },
  resetBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
  },
});
