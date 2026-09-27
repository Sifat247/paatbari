export function toBanglaNumber(n: number | string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
}

export function formatPrice(amount: number, locale: "bn" | "en" = "bn"): string {
  if (locale === "bn") {
    // South-Asian comma formatting for Bangla
    const formatted = amount.toLocaleString("en-IN");
    return `৳${toBanglaNumber(formatted)}`;
  }
  return `৳${amount.toLocaleString("en-US")}`;
}
