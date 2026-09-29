"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/catalog";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { useLanguage } from "@/lib/i18n-context";
import { useCart } from "@/lib/cart-context";
import { ProductArt } from "@/components/ui/ProductArt";
import { PriceTag } from "@/components/ui/PriceTag";
import {
  Search,
  X,
  ArrowRight,
  ShoppingBag,
  BookOpen,
  Sparkles,
  Tag,
  TrendingUp,
  Clock,
} from "lucide-react";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { locale, formatPrice, toLocaleDigits } = useLanguage();
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Search logic across products and blogs
  const searchResults = useMemo(() => {
    const cleanQ = query.trim().toLowerCase();
    if (!cleanQ) return { products: [], blogs: [] };

    const matchedProducts = PRODUCTS.filter((p) => {
      const text = `${p.bn} ${p.en} ${p.taglineBn} ${p.taglineEn} ${p.cat} ${p.descriptionBn} ${p.descriptionEn}`.toLowerCase();
      return text.includes(cleanQ);
    }).slice(0, 6);

    const matchedBlogs = BLOG_POSTS.filter((b) => {
      const text = `${b.titleBn} ${b.titleEn} ${b.excerptBn} ${b.excerptEn} ${b.categoryBn} ${b.categoryEn}`.toLowerCase();
      return text.includes(cleanQ);
    }).slice(0, 3);

    return { products: matchedProducts, blogs: matchedBlogs };
  }, [query]);

  const trendingQueries = [
    { labelBn: "নীলপদ্ম কানের দুল", labelEn: "Floral Earrings", q: "দুল" },
    { labelBn: "ক্লাসিক টোট ব্যাগ", labelEn: "Tote Bag", q: "টোট" },
    { labelBn: "ল্যাপটপ ব্যাগ", labelEn: "Laptop Bag", q: "ল্যাপটপ" },
    { labelBn: "ফ্লোর রাগ ও ম্যাট", labelEn: "Floor Rug", q: "রাগ" },
    { labelBn: "টেবিল রানার", labelEn: "Table Runner", q: "রানার" },
    { labelBn: "কর্পোরেট গিফট বক্স", labelEn: "Gift Box", q: "গিফট" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-150">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 py-8 sm:py-16 flex items-start justify-center">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-sand/80 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-sand/80 flex items-center gap-3 bg-cream/30">
            <Search className="w-5 h-5 text-forest/70 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === "bn"
                  ? "পণ্য বা ব্লগের নাম লিখুন (যেমন: টোট ব্যাগ, কানের দুল, রাগ)..."
                  : "Search jute products or articles (e.g. tote bag, earrings, rug)..."
              }
              className="w-full bg-transparent text-sm sm:text-base font-medium text-ink placeholder:text-ink/40 outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 text-ink/40 hover:text-ink rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sand/40 hover:bg-sand/80 text-ink/75"
            >
              Esc
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* If query is empty: show trending searches & quick categories */}
            {!query.trim() && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-forest mb-3 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-leaf" />
                    <span>{locale === "bn" ? "জনপ্রিয় অনুসন্ধানসমূহ" : "Popular Searches"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingQueries.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuery(t.q)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-cream border border-sand hover:border-leaf hover:bg-leaf/10 hover:text-leaf transition-all text-ink"
                      >
                        {locale === "bn" ? t.labelBn : t.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured New Products Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-forest/5 via-leaf/10 to-jute/10 border border-leaf/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-leaf text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Sparkles className="w-5 h-5 text-jute" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-forest">
                        {locale === "bn" ? "নতুন জুট জুয়েলারি কালেকশন" : "New Jute Jewelry Collection"}
                      </h4>
                      <p className="text-[11px] text-ink/70">
                        {locale === "bn" ? "হাতে বোনা কানের দুল মাত্র ৳৩৫০ থেকে" : "Handcrafted earrings starting at ৳350"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push("/shop?category=jewelry");
                    }}
                    className="px-3 py-1.5 rounded-xl bg-leaf text-white text-xs font-semibold hover:bg-forest transition-colors whitespace-nowrap"
                  >
                    {locale === "bn" ? "দেখুন" : "Browse"} →
                  </button>
                </div>
              </div>
            )}

            {/* If query has no results */}
            {query.trim() && searchResults.products.length === 0 && searchResults.blogs.length === 0 && (
              <div className="py-12 text-center space-y-3">
                <Search className="w-10 h-10 text-ink/30 mx-auto" />
                <h4 className="font-bold text-forest text-base">
                  {locale === "bn" ? "কোনো ফলাফল পাওয়া যায়নি" : "No results found"}
                </h4>
                <p className="text-xs text-ink/60 max-w-sm mx-auto">
                  {locale === "bn"
                    ? `"${query}" এর সাথে মিলে এমন কোনো পণ্য বা ব্লগ আর্টিকেল মেলেনি। বানান চেক করে পুনরায় চেষ্টা করুন।`
                    : `We couldn't find any products or articles matching "${query}". Please check spelling and try again.`}
                </p>
              </div>
            )}

            {/* Products Results */}
            {searchResults.products.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-forest border-b border-sand pb-1.5">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <ShoppingBag className="w-3.5 h-3.5 text-leaf" />
                    <span>
                      {locale === "bn"
                        ? `পণ্যসমূহ (${toLocaleDigits(searchResults.products.length)})`
                        : `Products (${searchResults.products.length})`}
                    </span>
                  </span>
                  <Link
                    href={`/shop?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-leaf hover:underline text-[11px]"
                  >
                    {locale === "bn" ? "সবগুলো দেখুন" : "View all"} →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {searchResults.products.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 bg-cream/30 hover:bg-cream border border-sand/80 hover:border-leaf/40 rounded-2xl flex items-center justify-between gap-3 transition-all group"
                    >
                      <Link
                        href={`/p/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        <div className="w-14 h-14 rounded-xl bg-white border border-sand p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          {product.primaryImage ? (
                            <img
                              src={product.primaryImage}
                              alt={product.en}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ProductArt slug={product.slug} className="w-full h-full object-contain" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs sm:text-sm font-bold text-forest truncate group-hover:text-leaf transition-colors">
                            {locale === "bn" ? product.bn : product.en}
                          </h5>
                          <span className="text-[11px] text-ink/60 block truncate">
                            {locale === "bn" ? product.taglineBn : product.taglineEn}
                          </span>
                          <PriceTag price={product.variants[0].price} locale={locale} size="sm" />
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product, product.variants[0], 1);
                        }}
                        className="p-2 rounded-xl bg-leaf/10 text-leaf hover:bg-leaf hover:text-white transition-colors flex-shrink-0 shadow-2xs"
                        title={locale === "bn" ? "ব্যাগে যোগ করুন" : "Add to Bag"}
                        aria-label="Add to bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Articles Results */}
            {searchResults.blogs.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-forest border-b border-sand pb-1.5">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-leaf" />
                    <span>
                      {locale === "bn"
                        ? `ব্লগ ও জার্নাল (${toLocaleDigits(searchResults.blogs.length)})`
                        : `Journal Articles (${searchResults.blogs.length})`}
                    </span>
                  </span>
                </div>

                <div className="space-y-2">
                  {searchResults.blogs.map((blog) => (
                    <Link
                      key={blog.slug}
                      href={`/blog/${blog.slug}`}
                      onClick={onClose}
                      className="p-3 bg-cream/20 hover:bg-sand/30 border border-sand/60 rounded-xl flex items-center justify-between gap-3 transition-colors group block"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold text-leaf bg-leaf/10 px-2 py-0.5 rounded-full inline-block mb-1">
                          {locale === "bn" ? blog.categoryBn : blog.categoryEn}
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold text-forest truncate group-hover:text-leaf transition-colors">
                          {locale === "bn" ? blog.titleBn : blog.titleEn}
                        </h5>
                        <p className="text-[11px] text-ink/60 truncate">
                          {locale === "bn" ? blog.excerptBn : blog.excerptEn}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-leaf group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Quick Tip */}
          <div className="p-3 bg-sand/30 border-t border-sand/80 text-[11px] text-ink/60 flex items-center justify-between px-5">
            <span>
              {locale === "bn" ? "💡 বাংলা বা ইংরেজিতে যেকোনো শব্দ লিখুন" : "💡 Type in English or Bengali"}
            </span>
            <span className="hidden sm:inline text-[10px] bg-sand/60 px-2 py-0.5 rounded font-mono">
              ESC to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
