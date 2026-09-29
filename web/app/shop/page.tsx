"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, Product } from "@/lib/catalog";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/i18n-context";
import { Filter, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";

function ShopContent() {
  const { locale, t, toLocaleDigits } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<"all" | "under500" | "500to1000" | "over1000">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { addToCart } = useCart();

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.cat === selectedCategory);
    }

    if (priceRange === "under500") {
      result = result.filter((p) => p.variants[0].price < 500);
    } else if (priceRange === "500to1000") {
      result = result.filter((p) => p.variants[0].price >= 500 && p.variants[0].price <= 1000);
    } else if (priceRange === "over1000") {
      result = result.filter((p) => p.variants[0].price > 1000);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.variants[0].price - a.variants[0].price);
    }

    return result;
  }, [selectedCategory, priceRange, sortBy]);

  const handleQuickAdd = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addToCart(product, product.variants[0], 1);
    }
  };

  const priceRangeOptions = [
    { id: "all", label: locale === "bn" ? "সকল মূল্য" : "All Prices" },
    { id: "under500", label: locale === "bn" ? "৳৫০০ এর নিচে" : "Under ৳500" },
    { id: "500to1000", label: locale === "bn" ? "৳৫০০ – ৳১,০০০" : "৳500 – ৳1,000" },
    { id: "over1000", label: locale === "bn" ? "৳১,০০০ এর বেশি" : "Above ৳1,000" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Page Title & Breadcrumbs */}
      <div className="border-b border-sand pb-6">
        <div className="flex items-center gap-2 text-xs text-ink/60 mb-2">
          <Link href="/" className="hover:text-leaf">
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-leaf font-medium">
            {locale === "bn" ? "শপ" : "Shop"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "সকল পণ্য কালেকশন" : "All Products Collection"}
        </h1>
        <p className="text-sm text-ink/70 mt-1 font-bn">
          {locale === "bn"
            ? "বাংলার ঐতিহ্যবাহী সোনালি আঁশ দিয়ে তৈরি পরিবেশবান্ধব ব্যাগ, ঝুড়ি ও হোম ডেকর।"
            : "Handcrafted sustainable jute bags, home living decor, and natural living essentials."}
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-sand p-4 rounded-xl shadow-xs">
        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-md border border-sand bg-cream hover:border-jute text-ink"
        >
          <Filter className="w-4 h-4 text-leaf" />
          <span>{locale === "bn" ? "ফিল্টার" : "Filters"}</span>
        </button>

        {/* Product Count */}
        <div className="text-sm font-medium text-ink/75">
          {locale === "bn" ? (
            <>
              মোট <strong className="text-forest font-bold">{toLocaleDigits(filteredProducts.length)}</strong> টি পণ্য পাওয়া গেছে
            </>
          ) : (
            <>
              Found <strong className="text-forest font-bold">{filteredProducts.length}</strong> products
            </>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-ink/60 hidden sm:inline" />
          <span className="text-xs text-ink/60 hidden sm:inline">
            {locale === "bn" ? "সর্ট করুন:" : "Sort by:"}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs sm:text-sm font-medium border border-sand rounded-md px-3 py-2 bg-cream text-ink focus:outline-none focus:ring-1 focus:ring-jute cursor-pointer"
          >
            <option value="featured">
              {locale === "bn" ? "ফিচার্ড / বেস্টসেলার" : "Featured / Bestselling"}
            </option>
            <option value="price-asc">
              {locale === "bn" ? "দাম: কম থেকে বেশি" : "Price: Low to High"}
            </option>
            <option value="price-desc">
              {locale === "bn" ? "দাম: বেশি থেকে কম" : "Price: High to Low"}
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          {/* Category Filter */}
          <div className="bg-white border border-sand p-5 rounded-xl space-y-3 shadow-xs">
            <h3 className="font-bold text-sm text-forest border-b border-sand/60 pb-2">
              {locale === "bn" ? "ক্যাটাগরি" : "Categories"}
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left py-1.5 px-2.5 rounded-md transition-colors ${
                    selectedCategory === "all"
                      ? "bg-leaf text-white font-semibold"
                      : "text-ink hover:bg-cream"
                  }`}
                >
                  {locale === "bn"
                    ? `সকল বিভাগ (${toLocaleDigits(PRODUCTS.length)})`
                    : `All Categories (${PRODUCTS.length})`}
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.key}>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-md transition-colors ${
                      selectedCategory === cat.key
                        ? "bg-leaf text-white font-semibold"
                        : "text-ink hover:bg-cream"
                    }`}
                  >
                    {locale === "bn" ? cat.bn : cat.en} ({locale === "bn" ? toLocaleDigits(cat.count || 0) : cat.count})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Filter */}
          <div className="bg-white border border-sand p-5 rounded-xl space-y-3 shadow-xs">
            <h3 className="font-bold text-sm text-forest border-b border-sand/60 pb-2">
              {locale === "bn" ? "মূল্য পরিসীমা" : "Price Range"}
            </h3>
            <div className="space-y-2 text-xs">
              {priceRangeOptions.map((range) => (
                <label key={range.id} className="flex items-center gap-2 cursor-pointer text-ink hover:text-leaf">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === range.id}
                    onChange={() => setPriceRange(range.id as any)}
                    className="accent-leaf"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-sand rounded-xl p-8 space-y-4">
              <h3 className="font-bold text-lg text-forest">
                {locale === "bn" ? "কোনো পণ্য পাওয়া যায়নি" : "No Products Found"}
              </h3>
              <p className="text-xs text-ink/60">
                {locale === "bn"
                  ? "আপনার নির্বাচিত ফিল্টারের সাথে কোনো পণ্য মেলেনি। অনুগ্রহ করে ফিল্টার পরিবর্তন করুন।"
                  : "No products matched your selected criteria. Try adjusting or resetting filters."}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange("all");
                }}
              >
                {locale === "bn" ? "ফিল্টার রিসেট করুন" : "Reset Filters"}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={locale === "bn" ? p.bn : p.en}
                  slug={p.slug}
                  price={p.variants[0].price}
                  compareAtPrice={p.badge?.variant === "sale" ? p.variants[0].price + 150 : undefined}
                  hasVariants={p.variants.length > 1}
                  badge={p.badge}
                  locale={locale}
                  onQuickAdd={(id) => handleQuickAdd(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between">
              <div className="space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-sand pb-4">
                  <h3 className="font-bold text-base text-forest flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-leaf" />
                    <span>{locale === "bn" ? "ফিল্টার" : "Filters"}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-ink/60 hover:text-ink"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-ink/80 uppercase">
                    {locale === "bn" ? "বিভাগ" : "Categories"}
                  </h4>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("all");
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 rounded text-xs ${
                        selectedCategory === "all" ? "bg-leaf text-white font-bold" : "text-ink hover:bg-cream"
                      }`}
                    >
                      {locale === "bn" ? "সকল বিভাগ" : "All Categories"}
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.key);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full text-left py-2 px-3 rounded text-xs ${
                          selectedCategory === cat.key ? "bg-leaf text-white font-bold" : "text-ink hover:bg-cream"
                        }`}
                      >
                        {locale === "bn" ? cat.bn : cat.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-ink/80 uppercase">
                    {locale === "bn" ? "মূল্য" : "Price"}
                  </h4>
                  <div className="space-y-1 text-xs">
                    {priceRangeOptions.map((range) => (
                      <label key={range.id} className="flex items-center gap-2 py-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="mobilePrice"
                          checked={priceRange === range.id}
                          onChange={() => {
                            setPriceRange(range.id as any);
                            setMobileFilterOpen(false);
                          }}
                          className="accent-leaf"
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6"
              >
                {locale === "bn" ? "ফিল্টার প্রয়োগ করুন" : "Apply Filters"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  const { locale } = useLanguage();
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-16 text-center text-sm font-bn">{locale === "bn" ? "পণ্যসমূহ লোড হচ্ছে..." : "Loading products..."}</div>}>
      <ShopContent />
    </Suspense>
  );
}
