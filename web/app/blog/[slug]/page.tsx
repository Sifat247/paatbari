"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLanguage();

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-10 pb-24">
      {/* Back button and breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-ink/60 border-b border-sand pb-4">
        <Link href="/blog" className="flex items-center gap-1.5 text-leaf font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "bn" ? "সকল ব্লগে ফিরে যান" : "Back to Blog"}</span>
        </Link>
        <span className="bg-sand/40 text-forest px-3 py-1 rounded-full font-medium">
          {locale === "bn" ? post.categoryBn : post.categoryEn}
        </span>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-bn-display text-forest leading-tight">
          {locale === "bn" ? post.titleBn : post.titleEn}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-ink/60 pt-2">
          <span className="flex items-center gap-1.5">
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
      </div>

      {/* Excerpt Lead */}
      <div className="bg-sand/20 border-l-4 border-leaf p-5 rounded-r-xl text-base text-forest font-medium font-bn leading-relaxed italic">
        {locale === "bn" ? post.excerptBn : post.excerptEn}
      </div>

      {/* Article Body */}
      <div className="bg-white border border-sand rounded-2xl p-6 sm:p-10 shadow-card space-y-6 text-sm sm:text-base text-ink/80 font-bn leading-relaxed">
        {(locale === "bn" ? post.contentBn : post.contentEn).map((paragraph, idx) => (
          <p key={idx} className="first-of-type:font-medium">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Author & Footer Banner */}
      <div className="bg-cream border border-sand rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="text-xs text-ink/60 block">
            {locale === "bn" ? "লেখক:" : "Author:"}
          </span>
          <h4 className="font-bold text-forest text-sm">{post.author}</h4>
          <p className="text-xs text-ink/70 mt-0.5 font-bn">
            {locale === "bn"
              ? "পাটবাড়ি — সোনালি আঁশের পুনর্জাগরণ ও আধুনিক টেকসই জীবনযাত্রার পথিকৃৎ।"
              : "Paatbari — Pioneering sustainable handcrafted jute lifestyle."}
          </p>
        </div>

        <Link href="/shop">
          <Button variant="primary" size="sm">
            {locale === "bn" ? "পাটবাড়ি শপ দেখুন →" : "Explore Paatbari Shop →"}
          </Button>
        </Link>
      </div>
    </article>
  );
}
