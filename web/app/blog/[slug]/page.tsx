"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  Globe2,
  Mail,
  MessageCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLanguage();
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const contentParagraphs = locale === "bn" ? post.contentBn : post.contentEn;
  const keyTakeaways = locale === "bn" ? post.keyTakeawaysBn : post.keyTakeawaysEn;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-10 pb-24 font-bn">
      {/* Back button and breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-ink/60 border-b border-sand pb-4">
        <Link href="/blog" className="flex items-center gap-1.5 text-leaf font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "bn" ? "সকল ব্লগে ফিরে যান" : "Back to Journal"}</span>
        </Link>
        <div className="flex items-center gap-2">
          {post.isInternational && (
            <span className="bg-leaf/10 text-leaf border border-leaf/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
              <Globe2 className="w-3 h-3" />
              <span>{locale === "bn" ? "গ্লোবাল বায়ার্স গাইড" : "Global Buyer Sourcing"}</span>
            </span>
          )}
          <span className="bg-sand/40 text-forest px-3 py-1 rounded-full font-medium text-[11px]">
            {locale === "bn" ? post.categoryBn : post.categoryEn}
          </span>
        </div>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-bn-display text-forest leading-tight">
          {locale === "bn" ? post.titleBn : post.titleEn}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-ink/60 pt-2 border-b border-sand/50 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-forest">
              <User className="w-4 h-4 text-leaf" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-leaf" />
              <span>{locale === "bn" ? post.dateBn : post.dateEn}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-leaf" />
              <span>{locale === "bn" ? post.readTimeBn : post.readTimeEn}</span>
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-sand bg-cream/40 hover:bg-cream text-forest transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>
              {copied
                ? locale === "bn"
                  ? "লিংক কপি হয়েছে!"
                  : "Link Copied!"
                : locale === "bn"
                ? "শেয়ার করুন"
                : "Share"}
            </span>
          </button>
        </div>
      </div>

      {/* Excerpt Lead */}
      <div className="bg-sand/20 border-l-4 border-leaf p-5 sm:p-6 rounded-r-2xl text-base sm:text-lg text-forest font-medium leading-relaxed italic">
        {locale === "bn" ? post.excerptBn : post.excerptEn}
      </div>

      {/* Key Takeaways Box (if present) */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <div className="bg-cream border border-sand rounded-2xl p-6 sm:p-7 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-forest font-bold text-sm sm:text-base border-b border-sand/60 pb-2">
            <Sparkles className="w-4 h-4 text-leaf" />
            <span>{locale === "bn" ? "মূল সারসংক্ষেপ ও গুরুত্বপূর্ণ তথ্য" : "Key Takeaways & Executive Summary"}</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-ink/85">
            {keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-leaf flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Body with rich formatting */}
      <div className="bg-white border border-sand rounded-2xl p-6 sm:p-10 shadow-card space-y-5 text-sm sm:text-base text-ink/85 leading-relaxed">
        {contentParagraphs.map((paragraph, idx) => {
          if (paragraph.startsWith("### ")) {
            return (
              <h3
                key={idx}
                className="text-xl sm:text-2xl font-bold font-bn-display text-forest pt-6 pb-1 border-b border-sand/50"
              >
                {paragraph.replace("### ", "")}
              </h3>
            );
          }

          if (paragraph.startsWith("• ")) {
            return (
              <div key={idx} className="flex items-start gap-3 pl-2 sm:pl-4 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-leaf flex-shrink-0 mt-2.5" />
                <p className="text-xs sm:text-sm leading-relaxed">{paragraph.replace("• ", "")}</p>
              </div>
            );
          }

          return (
            <p key={idx} className={idx === 0 ? "text-base sm:text-lg text-forest font-medium" : ""}>
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* International B2B Inquiries Callout */}
      {post.isInternational && (
        <div className="bg-gradient-to-br from-forest to-forest/95 text-sand rounded-2xl p-6 sm:p-8 space-y-4 shadow-pop">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-jute font-bold">
            <Globe2 className="w-4 h-4" />
            <span>{locale === "bn" ? "আন্তর্জাতিক বাল্ক সোর্সিং ও রপ্তানি" : "Global OEM Sourcing & Wholesale"}</span>
          </div>
          <h3 className="text-2xl font-bold font-bn-display text-white">
            {locale === "bn"
              ? "আপনার আন্তর্জাতিক ব্র্যান্ডের জন্য কাস্টম পাটপণ্য আমদানি করতে চান?"
              : "Looking to Import Custom Export-Quality Jute for Your Brand?"}
          </h3>
          <p className="text-xs sm:text-sm text-sand/80 max-w-2xl leading-relaxed">
            {locale === "bn"
              ? "পাটবাড়ি বিশ্বের যেকোনো দেশে এফওবি (FOB Chittagong) বা সিআইএফ (CIF) সুবিধায় ৫০ পিস থেকে ৫০,০০০ পিস পর্যন্ত কাস্টম ব্র্যান্ডেড ও অ্যাজো-ফ্রি ডাই করা পাটপণ্য রপ্তানি সেবা দিয়ে থাকে। সরাসরি আমাদের প্রতিষ্ঠাতা ও এক্সপোর্ট টিমের সাথে কথা বলুন।"
              : "Paatbari provides turnkey private labeling, Pantone-matched Azo-free dyeing, and sea/air container freight from Bangladesh to the EU, North America, and Middle East. Speak directly with our export desk."}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/b2b">
              <Button variant="secondary" size="md">
                {locale === "bn" ? "B2B বাল্ক ক্যালকুলেটর দেখুন →" : "View B2B Volume Calculator →"}
              </Button>
            </Link>
            <a
              href="https://wa.me/8801793648214"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#20b858] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{locale === "bn" ? "হোয়াটসঅ্যাপে এক্সপোর্ট ডেস্কে কথা বলুন" : "WhatsApp Export Desk"}</span>
            </a>
          </div>
        </div>
      )}

      {/* Author & Footer Banner */}
      <div className="bg-cream border border-sand rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[11px] text-ink/50 uppercase tracking-wider block font-bold">
            {locale === "bn" ? "লেখক পরিচিতি" : "About the Author"}
          </span>
          <h4 className="font-bold text-forest text-base sm:text-lg">{post.author}</h4>
          <p className="text-xs sm:text-sm text-ink/75 max-w-md font-bn leading-relaxed">
            {locale === "bn"
              ? "মানিকগঞ্জের গ্রামীণ কারুশিল্পীদের সাথে আধুনিক বৈশ্বিক ডিজাইনের সেতুবন্ধন তৈরিতে নিবেদিত। সোনালি আঁশের পুনর্জাগরণ ও টেকসই জীবনযাত্রার একজন সক্রিয় উদ্যোক্তা।"
              : "Dedicated to reviving Bengal's golden jute through fair-trade artisan hubs and sustainable contemporary lifestyle products."}
          </p>
        </div>

        <Link href="/shop" className="flex-shrink-0">
          <Button variant="primary" size="md">
            {locale === "bn" ? "পাটবাড়ি শপ ব্রাউজ করুন →" : "Explore Paatbari Shop →"}
          </Button>
        </Link>
      </div>

      {/* Related Posts */}
      <div className="pt-8 border-t border-sand space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold font-bn-display text-forest flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-leaf" />
            <span>{locale === "bn" ? "সম্পর্কিত অন্যান্য আর্টিকেল" : "Related Articles from the Journal"}</span>
          </h3>
          <Link href="/blog" className="text-xs font-bold text-leaf hover:underline flex items-center gap-1">
            <span>{locale === "bn" ? "সকল ব্লগ →" : "View All →"}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedPosts.map((rel) => (
            <Link
              key={rel.slug}
              href={`/blog/${rel.slug}`}
              className="group bg-white border border-sand hover:border-leaf/50 rounded-xl p-5 shadow-card hover:shadow-pop transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="bg-sand/40 text-forest text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                  {locale === "bn" ? rel.categoryBn : rel.categoryEn}
                </span>
                <h4 className="text-sm font-bold font-bn-display text-forest group-hover:text-leaf transition-colors line-clamp-2 leading-snug">
                  {locale === "bn" ? rel.titleBn : rel.titleEn}
                </h4>
              </div>
              <div className="flex items-center justify-between text-[11px] text-ink/50 pt-2 border-t border-sand/40">
                <span>{locale === "bn" ? rel.readTimeBn : rel.readTimeEn}</span>
                <span className="text-leaf font-bold group-hover:translate-x-1 transition-transform flex items-center">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
