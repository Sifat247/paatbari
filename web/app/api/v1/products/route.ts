import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/catalog";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gtwzurvaryvwwebasydo.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_CH5PZ50JlXIO0WoDtFXuhQ_vEvW0XBN";

export async function GET() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=id.asc`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      next: { revalidate: 30 }, // Cache for 30s
    });

    if (res.ok) {
      const dbProducts = await res.json();
      if (Array.isArray(dbProducts) && dbProducts.length > 0) {
        // Map db products with catalog details
        const merged = PRODUCTS.map((localP) => {
          const remote = dbProducts.find((r) => r.id === localP.id);
          if (remote) {
            return {
              ...localP,
              bn: remote.bn || localP.bn,
              en: remote.en || localP.en,
              isBestseller: remote.is_bestseller ?? localP.isBestseller,
              isFeatured: remote.is_featured ?? localP.isFeatured,
              primaryImage: remote.primary_image || localP.primaryImage,
            };
          }
          return localP;
        });

        return NextResponse.json({
          success: true,
          count: merged.length,
          products: merged,
        });
      }
    }
  } catch (err) {
    console.error("Supabase products fetch fallback to local:", err);
  }

  // Fallback to local catalog
  return NextResponse.json({
    success: true,
    count: PRODUCTS.length,
    products: PRODUCTS,
  });
}
