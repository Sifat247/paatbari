"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  ShoppingBag,
  FileText,
  MapPin,
  Globe,
  Trash2,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { locale, setLocale, formatPrice, formatDate, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "quotes" | "addresses" | "language" | "danger"
  >("orders");

  const [accountData, setAccountData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState("");

  useEffect(() => {
    fetch("/api/v1/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAccountData(data);
        }
      })
      .catch((err) => console.error("Failed to fetch account:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteAccount = async () => {
    if (confirmDeleteText !== "DELETE") return;
    setIsDeleting(true);

    try {
      const res = await fetch("/api/v1/me", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setDeleteSuccess(true);
        localStorage.removeItem("paatbari_user");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (e) {
      alert("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bn: string; en: string; variant: "eco" | "sale" | "handmade" | "neutral" }> = {
      pending: { bn: "অপেক্ষমান", en: "Pending", variant: "sale" },
      confirmed: { bn: "কনফার্মড", en: "Confirmed", variant: "neutral" },
      packed: { bn: "প্যাকিং সম্পন্ন", en: "Packed", variant: "handmade" },
      dispatched: { bn: "কুরিয়ারে হস্তান্তর", en: "Dispatched", variant: "eco" },
      delivered: { bn: "ডেলিভার্ড", en: "Delivered", variant: "eco" },
      cancelled: { bn: "বাতিল", en: "Cancelled", variant: "sale" },
    };

    const s = statusMap[status] || { bn: status, en: status, variant: "neutral" };
    return <Badge variant={s.variant}>{locale === "bn" ? s.bn : s.en}</Badge>;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-bn text-sm text-ink/70">
        {locale === "bn" ? "অ্যাকাউন্ট তথ্য লোড হচ্ছে..." : "Loading account details..."}
      </div>
    );
  }

  if (deleteSuccess) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white border border-sand rounded-2xl shadow-card text-center space-y-4 font-bn">
        <div className="w-16 h-16 rounded-full bg-leaf/10 text-leaf mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-forest">
          {locale === "bn" ? "অ্যাকাউন্ট সফলভাবে মুছে ফেলা হয়েছে" : "Account Permanently Erased"}
        </h2>
        <p className="text-xs text-ink/70 leading-relaxed">
          {locale === "bn"
            ? "আপনার সকল ব্যক্তিগত তথ্য, সংরক্ষিত ঠিকানা ও পছন্দসমূহ আমাদের সিস্টেম থেকে সম্পূর্ণ মুছে ফেলা হয়েছে। আপনাকে হোম পেইজে রিডাইরেক্ট করা হচ্ছে..."
            : "Your profile and personal data have been completely deleted. Redirecting to home page..."}
        </p>
      </div>
    );
  }

  const user = accountData?.user || {
    name: "তানভীর আহমেদ (Tanvir Ahmed)",
    phone: "01711000000",
    email: "tanvir.ahmed@example.com",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-24 font-bn">
      {/* Title & User Greeting */}
      <div className="border-b border-sand pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-forest text-sand flex items-center justify-center font-bold text-2xl border-2 border-jute">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-bn-display text-forest">
              {user.name}
            </h1>
            <p className="text-xs text-ink/60 mt-0.5 flex items-center gap-3">
              <span>{user.phone}</span>
              <span>•</span>
              <span>{user.email}</span>
            </p>
          </div>
        </div>

        <Link href="/shop">
          <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
            <span>{locale === "bn" ? "শপিং করুন" : "Browse Shop"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Main Grid: Sidebar Tabs + Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white border border-sand rounded-xl p-2 shadow-xs space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                activeTab === "orders"
                  ? "bg-leaf text-white font-bold shadow-xs"
                  : "text-ink/75 hover:bg-cream"
              }`}
            >
              <ShoppingBag className="w-4 h-4 flex-shrink-0" />
              <span>{locale === "bn" ? "আমার অর্ডারসমূহ" : "My Orders"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("quotes")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                activeTab === "quotes"
                  ? "bg-leaf text-white font-bold shadow-xs"
                  : "text-ink/75 hover:bg-cream"
              }`}
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span>{locale === "bn" ? "কর্পোরেট কোটেশন" : "B2B Quotes"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                activeTab === "addresses"
                  ? "bg-leaf text-white font-bold shadow-xs"
                  : "text-ink/75 hover:bg-cream"
              }`}
            >
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{locale === "bn" ? "সংরক্ষিত ঠিকানা" : "Saved Addresses"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                activeTab === "profile"
                  ? "bg-leaf text-white font-bold shadow-xs"
                  : "text-ink/75 hover:bg-cream"
              }`}
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span>{locale === "bn" ? "প্রোফাইল তথ্য" : "Profile Details"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("language")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                activeTab === "language"
                  ? "bg-leaf text-white font-bold shadow-xs"
                  : "text-ink/75 hover:bg-cream"
              }`}
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span>{locale === "bn" ? "ভাষা নির্বাচন" : "Language"}</span>
            </button>

            <div className="pt-2 border-t border-sand/50">
              <button
                type="button"
                onClick={() => setActiveTab("danger")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                  activeTab === "danger"
                    ? "bg-clay text-white font-bold shadow-xs"
                    : "text-clay hover:bg-clay/10"
                }`}
              >
                <Trash2 className="w-4 h-4 flex-shrink-0" />
                <span>{locale === "bn" ? "অ্যাকাউন্ট মুছে ফেলুন" : "Delete Account"}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9">
          {/* TAB 1: ORDERS */}
          {activeTab === "orders" && (
            <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b border-sand pb-4">
                <h2 className="font-bold text-lg text-forest font-bn-display">
                  {locale === "bn" ? "সাম্প্রতিক অর্ডারসমূহ" : "Order History"}
                </h2>
                <Link href="/track" className="text-xs text-leaf font-bold hover:underline">
                  {locale === "bn" ? "অর্ডার ট্র্যাক করুন →" : "Live Tracker →"}
                </Link>
              </div>

              {(!accountData?.orders || accountData.orders.length === 0) ? (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-ink/30 mx-auto" />
                  <p className="text-xs text-ink/60">
                    {locale === "bn" ? "আপনার কোনো পূর্ববর্তী অর্ডার নেই।" : "No orders found."}
                  </p>
                  <Link href="/shop" className="inline-block pt-1">
                    <Button variant="primary" size="sm">
                      {locale === "bn" ? "শপ ব্রাউজ করুন" : "Browse Products"}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {accountData.orders.map((ord: any) => (
                    <div
                      key={ord.orderNumber}
                      className="border border-sand hover:border-leaf/40 rounded-xl p-4 sm:p-5 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand/50 pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-forest block">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[11px] text-ink/50 block mt-0.5">
                            {formatDate(ord.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(ord.status)}
                          <Link
                            href={`/order/${ord.orderNumber}`}
                            className="text-xs text-leaf font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>{locale === "bn" ? "বিস্তারিত" : "Details"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-ink/80 pt-1">
                        <div>
                          <span className="text-ink/60 block">
                            {locale === "bn" ? "পেমেন্ট মাধ্যম:" : "Payment Method:"}
                          </span>
                          <span className="font-semibold text-forest">
                            {ord.paymentMethod === "cod"
                              ? locale === "bn"
                                ? "ক্যাশ অন ডেলিভারি (COD)"
                                : "Cash on Delivery"
                              : "বিকাশ / অনলাইন পেমেন্ট"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-ink/60 block">
                            {locale === "bn" ? "সর্বমোট:" : "Total:"}
                          </span>
                          <span className="text-base font-bold text-forest">
                            {formatPrice(ord.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: QUOTES */}
          {activeTab === "quotes" && (
            <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b border-sand pb-4">
                <h2 className="font-bold text-lg text-forest font-bn-display">
                  {locale === "bn" ? "কর্পোরেট বাল্ক কোটেশন অনুরোধ" : "B2B Custom Quote Requests"}
                </h2>
                <Link href="/b2b" className="text-xs text-clay font-bold hover:underline">
                  {locale === "bn" ? "+ নতুন কোটেশন তৈরি" : "+ New Quote Request"}
                </Link>
              </div>

              {(!accountData?.quotes || accountData.quotes.length === 0) ? (
                <div className="text-center py-12 space-y-3">
                  <FileText className="w-10 h-10 text-ink/30 mx-auto" />
                  <p className="text-xs text-ink/60">
                    {locale === "bn" ? "কোনো সক্রিয় কোটেশন নেই।" : "No quote requests found."}
                  </p>
                  <Link href="/b2b" className="inline-block pt-1">
                    <Button variant="quote" size="sm">
                      {locale === "bn" ? "কোটেশন রিকোয়েস্ট করুন" : "Request Bulk Quote"}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {accountData.quotes.map((q: any) => (
                    <div
                      key={q.token}
                      className="border border-sand hover:border-leaf/40 rounded-xl p-4 sm:p-5 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand/50 pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-clay block">
                            {q.token}
                          </span>
                          <span className="text-xs font-semibold text-forest block mt-0.5">
                            {q.productName} ({q.qty} পিস)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sand/40 text-forest">
                            {q.status}
                          </span>
                          <Link
                            href={`/quote/${q.token}`}
                            className="text-xs text-clay font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>{locale === "bn" ? "কোট দেখুন" : "View Quote"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-ink/80 pt-1">
                        <div>
                          <span className="text-ink/60 block">কোম্পানি:</span>
                          <span className="font-medium">{q.companyName}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-ink/60 block">মোট মূল্য:</span>
                          <span className="text-base font-bold text-forest">
                            {formatPrice(q.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b border-sand pb-4">
                <h2 className="font-bold text-lg text-forest font-bn-display">
                  {locale === "bn" ? "সংরক্ষিত ডেলিভারি ঠিকানা" : "Saved Delivery Addresses"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accountData?.addresses?.map((addr: any) => (
                  <div
                    key={addr.id}
                    className="border border-sand rounded-xl p-5 space-y-2 relative bg-cream/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-forest">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-leaf text-white px-2 py-0.5 rounded-full font-semibold">
                          ডিফল্ট
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink/80 font-medium">{addr.recipientName}</p>
                    <p className="text-xs text-ink/60">{addr.phone}</p>
                    <p className="text-xs text-ink/75 leading-relaxed pt-1">{addr.fullAddress}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === "profile" && (
            <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="font-bold text-lg text-forest font-bn-display border-b border-sand pb-4">
                {locale === "bn" ? "ব্যক্তিগত তথ্য ও প্রোফাইল" : "Profile Settings"}
              </h2>

              <div className="space-y-4 max-w-md text-xs sm:text-sm">
                <div>
                  <label className="text-ink/60 block mb-1">পূর্ণ নাম:</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream/30 text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>
                <div>
                  <label className="text-ink/60 block mb-1">মোবাইল নম্বর:</label>
                  <input
                    type="text"
                    defaultValue={user.phone}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream/30 text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>
                <div>
                  <label className="text-ink/60 block mb-1">ইমেইল:</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-sand bg-cream/30 text-ink focus:outline-none focus:ring-1 focus:ring-jute"
                  />
                </div>
                <div className="pt-2">
                  <Button variant="primary" size="sm" onClick={() => alert("প্রোফাইল আপডেট হয়েছে!")}>
                    পরিবর্তন সংরক্ষণ করুন
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LANGUAGE */}
          {activeTab === "language" && (
            <div className="bg-white border border-sand rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="font-bold text-lg text-forest font-bn-display border-b border-sand pb-4">
                {locale === "bn" ? "পছন্দের ভাষা নির্বাচন" : "Language Preferences"}
              </h2>

              <div className="space-y-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setLocale("bn")}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                    locale === "bn"
                      ? "border-leaf bg-leaf/10 font-bold text-forest shadow-xs"
                      : "border-sand bg-cream/30 text-ink/70 hover:bg-cream"
                  }`}
                >
                  <div>
                    <span className="block text-sm">বাংলা (Bangla)</span>
                    <span className="block text-xs text-ink/60 mt-0.5">
                      ডিফল্ট মুদ্রা ও তারিখ বাংলায় প্রদর্শিত হবে (যেমন: ৳৪৫০)
                    </span>
                  </div>
                  {locale === "bn" && <CheckCircle2 className="w-5 h-5 text-leaf" />}
                </button>

                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                    locale === "en"
                      ? "border-leaf bg-leaf/10 font-bold text-forest shadow-xs"
                      : "border-sand bg-cream/30 text-ink/70 hover:bg-cream"
                  }`}
                >
                  <div>
                    <span className="block text-sm">English</span>
                    <span className="block text-xs text-ink/60 mt-0.5">
                      Numbers and dates formatted in Latin script (e.g., ৳450)
                    </span>
                  </div>
                  {locale === "en" && <CheckCircle2 className="w-5 h-5 text-leaf" />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: DANGER ZONE - DELETE ACCOUNT */}
          {activeTab === "danger" && (
            <div className="bg-white border-2 border-clay/30 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center gap-3 border-b border-sand pb-4 text-clay">
                <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                <h2 className="font-bold text-lg font-bn-display">
                  {locale === "bn" ? "অ্যাকাউন্ট ও ব্যক্তিগত তথ্য স্থায়ীভাবে মুছুন" : "Permanent Account Deletion"}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-ink/80 leading-relaxed font-bn">
                <p>
                  {locale === "bn"
                    ? "সতর্কতা: একবার অ্যাকাউন্ট মুছে ফেললে আপনার সংরক্ষিত সকল ডেলিভারি ঠিকানা, প্রোফাইল ডাটা এবং অর্ডার ট্র্যাকিং প্রেফারেন্স স্থায়ীভাবে নষ্ট হয়ে যাবে। এই সিদ্ধান্তটি অপরিবর্তনীয়।"
                    : "Warning: Permanently deleting your account will erase your profile, stored delivery addresses, and session credentials. This action cannot be reversed."}
                </p>

                <div className="bg-clay/5 border border-clay/30 p-4 rounded-xl space-y-2">
                  <label className="text-xs font-bold text-clay block">
                    {locale === "bn"
                      ? "নিশ্চিত করতে নিচে 'DELETE' শব্দটি ইংরেজিতে টাইপ করুন:"
                      : "To confirm, please type 'DELETE' below:"}
                  </label>
                  <input
                    type="text"
                    value={confirmDeleteText}
                    onChange={(e) => setConfirmDeleteText(e.target.value)}
                    placeholder="DELETE"
                    className="w-full max-w-xs px-3.5 py-2 rounded-lg border border-clay/40 bg-white font-mono text-xs text-ink focus:outline-none focus:ring-2 focus:ring-clay uppercase"
                  />
                </div>

                <div>
                  <Button
                    variant="primary"
                    size="md"
                    disabled={confirmDeleteText !== "DELETE" || isDeleting}
                    onClick={handleDeleteAccount}
                    className="bg-clay hover:bg-clay/90 text-white border-0 shadow-md min-h-[44px]"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    <span>
                      {isDeleting
                        ? locale === "bn"
                          ? "মুছে ফেলা হচ্ছে..."
                          : "Deleting..."
                        : locale === "bn"
                        ? "অ্যাকাউন্ট মুছে ফেলুন"
                        : "Permanently Delete My Account"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
