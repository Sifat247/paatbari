"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BookOpen, Calendar, Clock, ArrowRight, Tag, User } from "lucide-react";

export default function BlogIndexPage() {
  const { locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", labelBn: "সকল পোস্ট", labelEn: "All Posts" },
    { id: "ঐতিহ্য ও ইতিহাস", labelBn: "ঐতিহ্য ও ইতিহাস", labelEn: "Heritage" },
    { id: "পরিবেশ ও সাসটেইনেবিলিটি", labelBn: "সাসটেইনেবিলিটি", labelEn: "Sustainability" },
    { id: "হোম ডেকর ও লিভিং", labelBn: "হোম ডেকর", labelEn: "Home Decor" },
    { id: "যত্ন ও টিপস", labelBn: "যত্ন ও টিপস", labelEn: "Care Guide" },
    { id: "কর্পোরেট সলিউশন", labelBn: "কর্পোরেট সলিউশন", labelEn: "Corporate & B2B" },
  ];

  const filteredPosts = selectedCategory === "all"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.categoryBn === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 pb-24">
      {/* Title */}
      <div className="border-b border-sand pb-6">
        <div className="flex items-center gap-2 text-xs text-ink/60 mb-2">
          <Link href="/" className="hover:text-leaf">
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-leaf font-medium">
            {locale === "bn" ? "ব্লগ ও টিপস" : "Blog"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          {locale === "bn" ? "সোনালি আঁশের জার্নাল ও জীবনধারা" : "The Golden Fibre Journal"}
        </h1>
        <p className="text-sm text-ink/75 mt-2 font-bn max-w-2xl leading-relaxed">
          {locale === "bn"
            ? "পরিবেশবান্ধব টেকসই জীবনযাপন, পাটপণ্যের সঠিক যত্ন, ঐতিহ্য এবং আধুনিক কর্পোরেট গিফটিং সম্পর্কিত প্রামাণ্য আর্টিকেলের সংগ্রহ।"
            : "Practical guides, environmental insights, and design inspiration celebrating natural living and handcrafted jute."}
        </p>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-forest text-sand shadow-sm"
                  : "bg-sand/30 hover:bg-sand/60 text-ink/70"
              }`}
            >
              {locale === "bn" ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white border border-sand hover:border-leaf/50 rounded-2xl p-6 shadow-card hover:shadow-pop transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-ink/60">
                <span className="bg-sand/40 text-forest font-semibold px-2.5 py-1 rounded-full text-[11px]">
                  {locale === "bn" ? post.categoryBn : post.categoryEn}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{locale === "bn" ? post.readTimeBn : post.readTimeEn}</span>
                </span>
              </div>

              <div>
                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="text-xl font-bold font-bn-display text-forest group-hover:text-leaf transition-colors leading-snug line-clamp-2">
                    {locale === "bn" ? post.titleBn : post.titleEn}
                  </h2>
                </Link>
                <p className="text-xs text-ink/75 mt-2.5 font-bn leading-relaxed line-clamp-3">
                  {locale === "bn" ? post.excerptBn : post.excerptEn}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-ink/60">
                  <User className="w-3.5 h-3.5 text-leaf flex-shrink-0" />
                  <span className="line-clamp-1">{post.author}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-sand/60 mt-6 flex items-center justify-between">
              <span className="text-[11px] text-ink/50 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{locale === "bn" ? post.dateBn : post.dateEn}</span>
              </span>

              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-leaf group-hover:text-leaf/80 flex items-center gap-1"
              >
                <span>{locale === "bn" ? "বিস্তারিত পড়ুন" : "Read More"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
