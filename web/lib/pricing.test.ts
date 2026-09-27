import { describe, it, expect } from "vitest";
import { quoteB2C, quoteB2B } from "./pricing";

// Fixture = seed data (PLACEHOLDER prices). Expected values are the PRD §6 worked examples.
const db = {"variants":[{"id":"P01-natural","price":450},{"id":"P01-dyed","price":450},{"id":"P02-std","price":1450},{"id":"P03-std","price":950},{"id":"P04-std","price":380},{"id":"P05-S","price":450},{"id":"P05-M","price":650},{"id":"P05-L","price":850},{"id":"P06-2x3","price":1200},{"id":"P06-3x5","price":2400},{"id":"P07-std","price":350},{"id":"P08-std","price":550},{"id":"P09-std","price":900},{"id":"P10-std","price":250},{"id":"P11-std","price":750},{"id":"P12-std","price":400},{"id":"P13-std","price":300},{"id":"P14-std","price":1500}],"bundles":[{"id":"BN1","discountPct":10,"items":[{"variantId":"P07-std","qty":2},{"variantId":"P08-std","qty":1},{"variantId":"P10-std","qty":1}]}],"coupons":[{"code":"JUTE10","type":"percent","value":10,"active":true}],"settings":{"zones":[{"key":"dhaka_city","fee":70},{"key":"dhaka_sub","fee":100},{"key":"outside","fee":130}],"freeThreshold":2500}};
const cfg = {"moq":50,"tiers":[{"min":50,"max":199,"unit":180},{"min":200,"max":499,"unit":160},{"min":500,"max":null,"unit":140}],"logoFee":25,"setupFee":1500,"depositPct":50};

describe("B2C pricing (PRD §6.1)", () => {
  it("T1 1 Tote → Dhaka city", () => {
    expect(quoteB2C({"lines":[{"variantId":"P01-natural","qty":1}],"bundles":[],"coupon":null,"zone":"dhaka_city"}, db)).toMatchObject({"subtotal":450,"discount":0,"delivery":70,"total":520});
  });
  it("T2 2 Tote + 1 Basket M → Dhaka city", () => {
    expect(quoteB2C({"lines":[{"variantId":"P01-natural","qty":2},{"variantId":"P05-M","qty":1}],"bundles":[],"coupon":null,"zone":"dhaka_city"}, db)).toMatchObject({"subtotal":1550,"discount":0,"delivery":70,"total":1620});
  });
  it("T3 3 Tote + Rug 2×3 → Dhaka (free ≥ ৳2,500)", () => {
    expect(quoteB2C({"lines":[{"variantId":"P01-dyed","qty":3},{"variantId":"P06-2x3","qty":1}],"bundles":[],"coupon":null,"zone":"dhaka_city"}, db)).toMatchObject({"subtotal":2550,"discount":0,"delivery":0,"total":2550});
  });
  it("T4 1 Cushion cover → outside Dhaka", () => {
    expect(quoteB2C({"lines":[{"variantId":"P07-std","qty":1}],"bundles":[],"coupon":null,"zone":"outside"}, db)).toMatchObject({"subtotal":350,"discount":0,"delivery":130,"total":480});
  });
  it("T5 T2 cart + coupon JUTE10", () => {
    expect(quoteB2C({"lines":[{"variantId":"P01-natural","qty":2},{"variantId":"P05-M","qty":1}],"bundles":[],"coupon":"JUTE10","zone":"dhaka_city"}, db)).toMatchObject({"subtotal":1550,"discount":155,"delivery":70,"total":1465});
  });
  it("T6 Bundle 'Eco Home Starter' → outside Dhaka", () => {
    expect(quoteB2C({"lines":[],"bundles":[{"bundleId":"BN1","qty":1}],"coupon":null,"zone":"outside"}, db)).toMatchObject({"subtotal":1350,"discount":0,"delivery":130,"total":1480});
  });
  it("T7 Laptop bag + Rug 3×5 → Dhaka suburbs", () => {
    expect(quoteB2C({"lines":[{"variantId":"P02-std","qty":1},{"variantId":"P06-3x5","qty":1}],"bundles":[],"coupon":null,"zone":"dhaka_sub"}, db)).toMatchObject({"subtotal":3850,"discount":0,"delivery":0,"total":3850});
  });
  it("T8 Rug 2×3 + Handbag + Cushion = exactly ৳2,500 → free", () => {
    expect(quoteB2C({"lines":[{"variantId":"P06-2x3","qty":1},{"variantId":"P03-std","qty":1},{"variantId":"P07-std","qty":1}],"bundles":[],"coupon":null,"zone":"outside"}, db)).toMatchObject({"subtotal":2500,"discount":0,"delivery":0,"total":2500});
  });
  it("T9 T8 cart + JUTE10 → drops below threshold, pays delivery", () => {
    expect(quoteB2C({"lines":[{"variantId":"P06-2x3","qty":1},{"variantId":"P03-std","qty":1},{"variantId":"P07-std","qty":1}],"bundles":[],"coupon":"JUTE10","zone":"dhaka_city"}, db)).toMatchObject({"subtotal":2500,"discount":250,"delivery":70,"total":2320});
  });
});

describe("B2B pricing (PRD §6.2)", () => {
  it("Q1 100 promo bags, no logo", () => {
    expect(quoteB2B(100, false, cfg)).toMatchObject({"unit":180,"total":18000,"deposit":9000});
  });
  it("Q2 300 bags with logo", () => {
    expect(quoteB2B(300, true, cfg)).toMatchObject({"unit":185,"total":57000,"deposit":28500});
  });
  it("Q3 600 bags with logo", () => {
    expect(quoteB2B(600, true, cfg)).toMatchObject({"unit":165,"total":100500,"deposit":50250});
  });
  it("Q4 199 bags, no logo (tier edge)", () => {
    expect(quoteB2B(199, false, cfg)).toMatchObject({"unit":180,"total":35820,"deposit":17910});
  });
  it("Q5 200 bags, no logo (next tier – cheaper than 199! show nudge)", () => {
    expect(quoteB2B(200, false, cfg)).toMatchObject({"unit":160,"total":32000,"deposit":16000});
  });
  it("Q6 40 bags → below MOQ 50", () => {
    expect(() => quoteB2B(40, false, cfg)).toThrow("BELOW_MOQ");
  });
});
