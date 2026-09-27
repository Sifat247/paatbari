"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { FreeDeliveryProgress } from "@/components/ui/FreeDeliveryProgress";
import { VariantPicker } from "@/components/ui/VariantPicker";
import { ProductCard } from "@/components/ui/ProductCard";

export default function StyleguidePage() {
  const [qty, setQty] = useState(2);
  const [selectedVariant, setSelectedVariant] = useState("P05-M");

  const variantOptions = [
    { id: "P05-S", name: "ছোট (S)", price: 450, inStock: true },
    { id: "P05-M", name: "মাঝারি (M)", price: 650, inStock: true },
    { id: "P05-L", name: "বড় (L)", price: 850, inStock: false },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Title */}
      <div className="border-b border-sand pb-6">
        <div className="inline-block px-3 py-1 bg-leaf/10 text-leaf text-xs font-semibold rounded-full mb-3">
          Design System & Specification
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-bn-display text-forest">
          পাটকথা (PaatKotha) স্টাইলগাইড
        </h1>
        <p className="text-sm text-ink/70 mt-2">
          SPEC.json ভিত্তিক কালার টোকেন, টাইপোগ্রাফি, এবং রিইউজেবল UI কম্পোনেন্টস।
        </p>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-bn-display text-forest">
          ১. কালার টোকেন (Brand Color Tokens)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-leaf p-4 rounded-lg text-white shadow-card">
            <span className="text-xs uppercase tracking-wider opacity-80">Primary</span>
            <h3 className="font-bold text-base mt-1">Leaf Green</h3>
            <p className="text-xs opacity-90">#1F4D3A</p>
          </div>

          <div className="bg-forest p-4 rounded-lg text-white shadow-card">
            <span className="text-xs uppercase tracking-wider opacity-80">Footer / Headings</span>
            <h3 className="font-bold text-base mt-1">Forest Green</h3>
            <p className="text-xs opacity-90">#143528</p>
          </div>

          <div className="bg-jute p-4 rounded-lg text-ink shadow-card">
            <span className="text-xs uppercase tracking-wider opacity-80">Accent</span>
            <h3 className="font-bold text-base mt-1">Jute Gold</h3>
            <p className="text-xs opacity-90">#C8A165</p>
          </div>

          <div className="bg-clay p-4 rounded-lg text-white shadow-card">
            <span className="text-xs uppercase tracking-wider opacity-80">Quote CTA / Sale</span>
            <h3 className="font-bold text-base mt-1">Terracotta</h3>
            <p className="text-xs opacity-90">#B5543C</p>
          </div>

          <div className="bg-cream border border-sand p-4 rounded-lg text-ink shadow-card">
            <span className="text-xs uppercase tracking-wider opacity-80">Page Background</span>
            <h3 className="font-bold text-base mt-1">Cream</h3>
            <p className="text-xs opacity-90">#F7F1E3</p>
          </div>

          <div className="bg-sand p-4 rounded-lg text-ink shadow-card">
            <span className="text-xs uppercase tracking-wider opacity-80">Border / Bands</span>
            <h3 className="font-bold text-base mt-1">Sand</h3>
            <p className="text-xs opacity-90">#EADFC8</p>
          </div>

          <div className="bg-ink p-4 rounded-lg text-white shadow-card">
            <span className="text-xs uppercase tracking-wider opacity-80">Text Primary</span>
            <h3 className="font-bold text-base mt-1">Ink</h3>
            <p className="text-xs opacity-90">#2B2A26</p>
          </div>

          <div className="bg-white border border-sand p-4 rounded-lg text-ink shadow-card">
            <span className="text-xs uppercase tracking-wider opacity-80">Cards / Inputs</span>
            <h3 className="font-bold text-base mt-1">Pure White</h3>
            <p className="text-xs opacity-90">#FFFFFF</p>
          </div>
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-bn-display text-forest">
          ২. টাইপোগ্রাফি স্কেল (Typography Scale)
        </h2>
        <div className="bg-white border border-sand p-6 rounded-xl space-y-4 shadow-card">
          <div>
            <span className="text-xs text-ink/50 uppercase">Noto Serif Bengali (Display / Headings)</span>
            <h1 className="text-4xl font-bold font-bn-display text-forest mt-1">
              সোনালি আঁশের গল্প, আপনার ঘরে (4xl - 36px)
            </h1>
          </div>
          <div>
            <span className="text-xs text-ink/50 uppercase">Noto Serif Bengali (H2)</span>
            <h2 className="text-2xl font-bold font-bn-display text-forest mt-1">
              প্রকৃতির ছোঁয়ায় তৈরি প্রিমিয়াম পাটপণ্য (2xl - 24px)
            </h2>
          </div>
          <div>
            <span className="text-xs text-ink/50 uppercase">Hind Siliguri (Body Text - Line Height ≥ 1.6)</span>
            <p className="text-base font-bn text-ink mt-1 max-w-2xl leading-relaxed">
              হাতে বোনা, মন দিয়ে তৈরি — প্রতিটি ব্যাগে আছে বাংলার সোনালি আঁশ। আমাদের প্রতিটি পণ্য পরিবেশবান্ধব, টেকসই এবং দেশীয় কারিগরদের পরম মমতায় তৈরি।
            </p>
          </div>
        </div>
      </section>

      {/* 3. Buttons & States */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-bn-display text-forest">
          ৩. বাটন ভ্যারিয়েন্ট ও স্টেট (Buttons & States)
        </h2>
        <div className="bg-white border border-sand p-6 rounded-xl space-y-6 shadow-card">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-ink/60">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">প্রাইমারি বাটন (Leaf)</Button>
              <Button variant="secondary">সেকেন্ডারি বাটন (Outline)</Button>
              <Button variant="quote">কোট রিকোয়েস্ট (Terracotta)</Button>
              <Button variant="jute">গোল্ড পিল (Jute)</Button>
              <Button variant="ghost">ঘোস্ট বাটন</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-ink/60">States (Loading & Disabled)</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" isLoading>
                অর্ডার প্রসেসিং...
              </Button>
              <Button variant="secondary" disabled>
                স্টক আউট (Disabled)
              </Button>
              <Button variant="quote" disabled>
                কোট জমা হয়েছে
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Badges & Price Tags */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-bn-display text-forest">
          ৪. ব্যাজ ও প্রাইস ডিসপ্লে (Badges & Price Tags)
        </h2>
        <div className="bg-white border border-sand p-6 rounded-xl space-y-6 shadow-card">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="eco">🌿 ১০০% পরিবেশবান্ধব</Badge>
            <Badge variant="handmade">হাতে বোনা পাট</Badge>
            <Badge variant="sale">১৫% বিশেষ ছাড়</Badge>
            <Badge variant="neutral">নতুন আগমন</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-2">
            <div>
              <span className="block text-xs text-ink/50 mb-1">রেগুলার প্রাইস</span>
              <PriceTag price={450} locale="bn" size="lg" />
            </div>
            <div>
              <span className="block text-xs text-ink/50 mb-1">অফার প্রাইস (Compare-at)</span>
              <PriceTag price={650} compareAtPrice={850} locale="bn" size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Variant Picker */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-bn-display text-forest">
          ৫. ভ্যারিয়েন্ট সিলেক্টর (Variant Picker)
        </h2>
        <div className="bg-white border border-sand p-6 rounded-xl space-y-4 shadow-card">
          <VariantPicker
            label="সাইজ নির্বাচন করুন:"
            options={variantOptions}
            selectedId={selectedVariant}
            onSelect={setSelectedVariant}
            locale="bn"
          />
        </div>
      </section>

      {/* 6. Free Delivery Progress & Stepper */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-bn-display text-forest">
          ৬. ফ্রি ডেলিভারি প্রোগ্রেস ও কোয়ান্টিটি স্টেপার
        </h2>
        <div className="bg-white border border-sand p-6 rounded-xl space-y-6 shadow-card">
          <div className="max-w-md space-y-4">
            <span className="block text-xs font-semibold uppercase text-ink/60">
              Free Delivery Progress (Threshold: ৳২,৫০০)
            </span>
            <FreeDeliveryProgress currentAmount={1620} threshold={2500} locale="bn" />
            <FreeDeliveryProgress currentAmount={2550} threshold={2500} locale="bn" />
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-semibold uppercase text-ink/60">
              Quantity Stepper (১–২০ লিমিট)
            </span>
            <QtyStepper value={qty} onChange={setQty} locale="bn" />
          </div>
        </div>
      </section>

      {/* 7. Product Card Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-bn-display text-forest">
          ৭. প্রোডাক্ট কার্ড কম্পোনেন্ট (Product Card Grid Preview)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ProductCard
            id="P01"
            name="ক্লাসিক পাটের শপিং টোট ব্যাগ"
            slug="classic-jute-tote"
            price={450}
            badge={{ text: "বেস্টসেলার", variant: "handmade" }}
            locale="bn"
            onQuickAdd={(id) => alert(`Added ${id} to cart`)}
          />

          <ProductCard
            id="P05"
            name="হ্যান্ডমেড রাউন্ড স্টোরেজ বাস্কেট"
            slug="handmade-storage-basket"
            price={450}
            hasVariants={true}
            compareAtPrice={600}
            badge={{ text: "১৫% ছাড়", variant: "sale" }}
            locale="bn"
            onQuickAdd={(id) => alert(`Added ${id} to cart`)}
          />

          <ProductCard
            id="P06"
            name="ন্যাচারাল জুয়েলারি ও ফ্লোর রাগ (২×৩ ফুট)"
            slug="jute-floor-rug"
            price={1200}
            badge={{ text: "১০০% প্রাকৃতিক", variant: "eco" }}
            locale="bn"
            onQuickAdd={(id) => alert(`Added ${id} to cart`)}
          />
        </div>
      </section>
    </div>
  );
}
