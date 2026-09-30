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

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: locale === "bn" ? post.titleBn : post.titleEn,
            text: locale === "bn" ? post.excerptBn : post.excerptEn,
            url: window.location.href,
          });
        } catch {
          // User dismissed or share failed, fallback to copy
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          }
        }
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const contentParagraphs = locale === "bn" ? post.contentBn : post.contentEn;
  const keyTakeaways = locale === "bn" ? post.keyTakeawaysBn : post.keyTakeawaysEn;

  return (
    <article className="w-full max-w-4xl mx-auto px-3.5 sm:px-6 py-6 sm:py-16 space-y-8 sm:space-y-10 pb-24 font-bn overflow-hidden break-words">
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
      <div className="bg-white border border-sand rounded-2xl p-4 sm:p-10 shadow-card space-y-6 text-sm sm:text-base text-ink/85 leading-relaxed w-full overflow-hidden break-words">
        {contentParagraphs.map((paragraph, idx) => {
          const trimmed = paragraph.trim();

          // Markdown Image: ![alt](url)
          const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch) {
            const alt = imgMatch[1];
            const src = imgMatch[2];
            return (
              <figure key={idx} className="my-6 sm:my-8 rounded-2xl overflow-hidden border border-sand bg-cream/40 shadow-card max-w-full">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-auto object-contain max-h-[520px] mx-auto bg-sand/10 block"
                  loading="lazy"
                />
                {alt && (
                  <figcaption className="p-3 sm:p-3.5 text-center text-xs sm:text-sm text-forest font-semibold border-t border-sand/50 bg-sand/20 font-bn flex items-center justify-center gap-2">
                    <span>📷</span>
                    <span>{alt}</span>
                  </figcaption>
                )}
              </figure>
            );
          }

          // Markdown Table: lines starting with |
          if (trimmed.startsWith("|") && trimmed.includes("\n")) {
            const rows = trimmed.split("\n").filter((r) => r.trim().startsWith("|"));
            if (rows.length >= 2) {
              const headerRow = rows[0].split("|").slice(1, -1).map((c) => c.trim());
              const bodyRows = rows.slice(2).map((r) => r.split("|").slice(1, -1).map((c) => c.trim()));
              return (
                <div key={idx} className="my-6 space-y-2 max-w-full">
                  <div className="flex items-center justify-between text-[11px] text-ink/60 px-1 font-sans">
                    <span className="flex items-center gap-1.5 font-medium text-forest/80">
                      <span>📊</span>
                      <span>{locale === "bn" ? "টেবিলটি সম্পূর্ণ দেখতে স্ক্রল করুন" : "Swipe horizontally to view full table"}</span>
                    </span>
                    <span className="text-[10px] font-bold text-leaf bg-leaf/10 px-2 py-0.5 rounded-full border border-leaf/20 sm:hidden">
                      Swipe ➔
                    </span>
                  </div>
                  <div className="overflow-x-auto w-full rounded-xl border border-sand shadow-sm bg-cream/20 scrollbar-thin">
                    <table className="min-w-[520px] sm:min-w-full w-full text-left text-xs sm:text-sm border-collapse font-bn">
                      <thead className="bg-sand/35 border-b border-sand text-forest font-bold">
                        <tr>
                          {headerRow.map((h, i) => (
                            <th key={i} className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold tracking-wide whitespace-nowrap sm:whitespace-normal">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sand/40">
                        {bodyRows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 1 ? "bg-sand/10 hover:bg-sand/20 transition-colors" : "hover:bg-sand/20 transition-colors"}
                          >
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2.5 px-3 sm:px-4 font-medium text-ink/90">
                                {cell.startsWith("**") && cell.endsWith("**") ? (
                                  <span className="font-bold text-forest">{cell.slice(2, -2)}</span>
                                ) : (
                                  cell
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            }
          }

          // Section Heading (H3)
          if (paragraph.startsWith("### ")) {
            return (
              <h3
                key={idx}
                className="text-xl sm:text-2xl font-bold font-bn-display text-forest pt-6 pb-2 border-b border-sand/50"
              >
                {paragraph.replace("### ", "")}
              </h3>
            );
          }

          // Callout / Blockquote
          if (paragraph.startsWith("> ")) {
            return (
              <div
                key={idx}
                className="my-5 p-4 sm:p-5 rounded-xl bg-forest/5 border-l-4 border-leaf text-forest font-bn text-sm sm:text-base leading-relaxed flex items-start gap-3 shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-leaf mt-2 flex-shrink-0" />
                <p className="font-medium">{paragraph.replace(/^>\s*/, "")}</p>
              </div>
            );
          }

          // Important Highlight Cards
          if (paragraph.startsWith("👉 ") || paragraph.startsWith("💡 ") || paragraph.startsWith("🪄 ") || paragraph.startsWith("⚡ ")) {
            const icon = paragraph.slice(0, 2);
            const text = paragraph.slice(2).trim();
            return (
              <div
                key={idx}
                className="my-4 p-4 rounded-xl bg-sand/25 border border-sand/60 text-forest font-semibold text-sm sm:text-base flex items-center gap-3 shadow-xs"
              >
                <span className="text-xl flex-shrink-0">{icon}</span>
                <span className="font-bn">{text}</span>
              </div>
            );
          }

          // Numbered Point Cards (e.g. "১. ...", "1. ...")
          const numMatch = trimmed.match(/^([০-৯\d]+)[\.\)]\s+([\s\S]+)$/);
          if (numMatch) {
            const num = numMatch[1];
            const body = numMatch[2];
            return (
              <div
                key={idx}
                className="my-3 p-3.5 sm:p-4 rounded-xl bg-cream/70 border border-sand/70 hover:bg-cream hover:border-sand transition-all flex items-start gap-3 sm:gap-4 shadow-xs"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-forest text-sand flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm font-bn shadow-xs">
                  {num}
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-ink/90 leading-relaxed font-bn">
                  {body.split("\n").map((line, lIdx) => (
                    <p key={lIdx} className={lIdx === 0 ? "font-bold text-forest text-sm sm:text-base" : "text-ink/80"}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          }

          // Bullet Items (with leaf icon badge)
          if (paragraph.startsWith("• ")) {
            return (
              <div
                key={idx}
                className="my-2 p-3 sm:p-3.5 rounded-xl bg-sand/15 border border-sand/50 hover:bg-sand/25 transition-all flex items-start gap-3 shadow-xs"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-leaf/20 text-leaf flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </div>
                <p className="text-xs sm:text-sm font-medium text-ink/90 leading-relaxed font-bn">
                  {paragraph.replace("• ", "")}
                </p>
              </div>
            );
          }

          // Standard Paragraphs with multi-line support
          return (
            <div
              key={idx}
              className={`space-y-2 ${idx === 0 ? "text-base sm:text-lg text-forest font-medium" : ""}`}
            >
              {paragraph.split("\n").map((subLine, sIdx) => (
                <p key={sIdx}>{subLine}</p>
              ))}
            </div>
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
            <Button href="/b2b" variant="secondary" size="md">
              {locale === "bn" ? "B2B বাল্ক ক্যালকুলেটর দেখুন →" : "View B2B Volume Calculator →"}
            </Button>
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

        <div className="flex-shrink-0">
          <Button href="/shop" variant="primary" size="md">
            {locale === "bn" ? "পাটবাড়ি শপ ব্রাউজ করুন →" : "Explore Paatbari Shop →"}
          </Button>
        </div>
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
