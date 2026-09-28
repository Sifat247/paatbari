import { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/catalog";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://paatbari.com";
  const now = new Date();

  // Core static pages
  const staticRoutes = [
    "",
    "/shop",
    "/bundles",
    "/b2b",
    "/about",
    "/blog",
    "/faq",
    "/contact",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
    "/track",
    "/account",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: (route === "" || route === "/shop" ? "daily" : "weekly") as
      | "daily"
      | "weekly",
    priority: route === "" ? 1.0 : route === "/shop" || route === "/b2b" ? 0.9 : 0.7,
  }));

  // Dynamic Product routes
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/p/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic Blog routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
