import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { BottomNav } from "@/components/shared/BottomNav";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { MiniCart } from "@/components/shared/MiniCart";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/i18n-context";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--pk-font-bn",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["600", "700"],
  variable: "--pk-font-bn-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--pk-font-en",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--pk-font-en-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "পাটবাড়ি (Paatbari) — সোনালি আঁশের বাড়ি",
  description:
    "হাতে বোনা আধুনিক পাটজাত পণ্য — শপিং ও টোট ব্যাগ, ঝুড়ি, ফ্লোর রাগ ও হোম ডেকর। সারা দেশে ক্যাশ অন ডেলিভারি।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${notoSerifBengali.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen flex flex-col font-bn bg-cream text-ink antialiased">
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
            <WhatsAppButton />
            <MiniCart />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
