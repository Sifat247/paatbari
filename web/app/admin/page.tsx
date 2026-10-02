"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, toBanglaNumber } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Building2,
  Tag,
  Settings,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Printer,
  Edit,
  RefreshCw,
  Search,
  Filter,
  UserCheck,
  Shield,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  DollarSign,
  LogOut,
} from "lucide-react";

type Role = "owner" | "order_manager" | "packer" | "b2b_sales";

export default function AdminPage() {
  const [role, setRole] = useState<Role>("owner");
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "packing" | "quotes" | "products" | "settings">("dashboard");

  // State data
  const [orders, setOrders] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters & selection
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [quoteStatusFilter, setQuoteStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [courierInput, setCourierInput] = useState({ courierName: "Steadfast Courier", trackingId: "" });
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<any | null>(null);

  // Tote price test state
  const [totePriceInput, setTotePriceInput] = useState<number>(450);
  const [freeThresholdInput, setFreeThresholdInput] = useState<number>(2500);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Fetch all admin data
  const loadData = async () => {
    setLoading(true);
    try {
      const [resOrders, resQuotes, resProducts, resSettings] = await Promise.all([
        fetch("/api/v1/admin/orders").then((r) => r.json()),
        fetch("/api/v1/b2b/quote").then((r) => r.json()),
        fetch("/api/v1/admin/products").then((r) => r.json()),
        fetch("/api/v1/admin/settings").then((r) => r.json()),
      ]);

      if (resOrders.orders) setOrders(resOrders.orders);
      if (resQuotes.quotes) setQuotes(resQuotes.quotes);
      if (resProducts.products) {
        setProducts(resProducts.products);
        const tote = resProducts.products.find((p: any) => p.id === "P01");
        if (tote && tote.variants[0]) {
          setTotePriceInput(tote.variants[0].price);
        }
      }
      if (resSettings.settings) {
        setSettings(resSettings.settings);
        setFreeThresholdInput(resSettings.settings.freeThreshold);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Flash status message
  const flash = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/v1/admin/login", { method: "DELETE" });
    } finally {
      window.location.reload();
    }
  };

  // Order status update handler
  const handleUpdateOrderStatus = async (
    orderNumber: string,
    status: string,
    eventTitle?: string,
    eventDesc?: string,
    extra?: { courierName?: string; trackingId?: string }
  ) => {
    try {
      const res = await fetch("/api/v1/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          status,
          eventTitle,
          eventDesc,
          ...extra,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o.orderNumber === orderNumber ? data.order : o)));
        if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
          setSelectedOrder(data.order);
        }
        flash(`অর্ডার ${orderNumber} এর স্ট্যাটাস '${status}' এ পরিবর্তিত হয়েছে`);
      }
    } catch {
      alert("স্ট্যাটাস আপডেটে সমস্যা হয়েছে");
    }
  };

  // B2B quote status update handler
  const handleUpdateQuoteStatus = async (token: string, status: string, note: string) => {
    try {
      const res = await fetch("/api/v1/b2b/quote", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, status, statusNote: note }),
      });
      const data = await res.json();
      if (data.success) {
        setQuotes((prev) => prev.map((q) => (q.token === token ? data.quote : q)));
        flash(`কোটেশন ${token} এর স্ট্যাটাস আপডেট হয়েছে`);
      }
    } catch {
      alert("কোটেশন আপডেটে সমস্যা হয়েছে");
    }
  };

  // Price update handler (Tote price test)
  const handleUpdateProductPrice = async (productId: string, variantKey: string, price: number) => {
    try {
      const res = await fetch("/api/v1/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, variantKey, price }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        flash(`পণ্যের মূল্য ৳${price} এ আপডেট করা হয়েছে!`);
      }
    } catch {
      alert("মূল্য আপডেটে ব্যর্থ");
    }
  };

  // Settings update handler (Free delivery threshold test)
  const handleUpdateSettings = async (updates: any) => {
    try {
      const res = await fetch("/api/v1/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        flash("সেটিংস সফলভাবে সংরক্ষিত হয়েছে!");
      }
    } catch {
      alert("সেটিংস সংরক্ষণে ব্যর্থ");
    }
  };

  // Restrict tabs if role is packer
  const effectiveTab = role === "packer" ? "packing" : activeTab;

  // Filtered orders with search query
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    const q = orderSearchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;
    const matchesQuery =
      (o.orderNumber && o.orderNumber.toLowerCase().includes(q)) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customerPhone && o.customerPhone.includes(q)) ||
      (o.district && o.district.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  // Packing queue = confirmed orders
  const packingQueue = orders.filter((o) => o.status === "confirmed" || o.status === "packing");

  // Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const confirmedCount = orders.filter((o) => o.status === "confirmed").length;
  const quoteCount = quotes.length;

  return (
    <div className="min-h-screen bg-[#F7F1E3]/40 text-ink pb-20">
      {/* Top Admin Bar */}
      <header className="bg-forest text-white border-b border-forest/80 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl font-bn-display text-jute">পাটবাড়ি</span>
            <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded text-sand border border-white/20">
              অ্যাডমিন পোর্টাল
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View live site button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs hover:bg-white/20 border border-white/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sand" />
              <span>সাইট দেখুন</span>
            </a>

            {/* Refresh button */}
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs hover:bg-white/20 border border-white/20 transition-colors disabled:opacity-50"
              title="নতুন অর্ডার ও ডেটা রিফ্রেশ করুন"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-jute" : "text-sand"}`} />
              <span className="hidden sm:inline">রিফ্রেশ</span>
            </button>

            {/* Role Switcher */}
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-jute hidden sm:block" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="bg-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:ring-1 focus:ring-jute cursor-pointer"
              >
                <option value="owner" className="text-ink">মালিক (Owner)</option>
                <option value="order_manager" className="text-ink">অর্ডার ম্যানেজার</option>
                <option value="packer" className="text-ink">প্যাকার</option>
                <option value="b2b_sales" className="text-ink">কর্পোরেট সেলস</option>
              </select>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold border border-red-500/40 transition-colors cursor-pointer"
              title="অ্যাডমিন প্যানেল থেকে লগআউট করুন"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Status Alert Notification */}
      {statusMessage && (
        <div className="bg-leaf text-white px-4 py-2.5 text-center text-xs font-semibold shadow-md animate-fade-in flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-jute" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation Tabs (Hidden for Packer) */}
        {role !== "packer" && (
          <div className="flex flex-wrap gap-2 border-b border-sand pb-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                effectiveTab === "dashboard"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-white text-ink/80 hover:bg-cream border border-sand"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>ড্যাশবোর্ড</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                effectiveTab === "orders"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-white text-ink/80 hover:bg-cream border border-sand"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>অর্ডার ব্যবস্থাপনা</span>
              {pendingCount > 0 && (
                <span className="bg-clay text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("packing")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                effectiveTab === "packing"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-white text-ink/80 hover:bg-cream border border-sand"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>প্যাকিং কিউ</span>
              {packingQueue.length > 0 && (
                <span className="bg-leaf text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {packingQueue.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("quotes")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                effectiveTab === "quotes"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-white text-ink/80 hover:bg-cream border border-sand"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>কর্পোরেট কোটেশন</span>
              <span className="bg-sand/60 text-ink text-[10px] px-1.5 py-0.5 rounded-full">
                {quoteCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                effectiveTab === "products"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-white text-ink/80 hover:bg-cream border border-sand"
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>পণ্য ও মূল্য</span>
            </button>

            {role === "owner" && (
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  effectiveTab === "settings"
                    ? "bg-forest text-white shadow-sm"
                    : "bg-white text-ink/80 hover:bg-cream border border-sand"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>স্টোর সেটিংস</span>
              </button>
            )}
          </div>
        )}

        {/* ================= TAB 1: DASHBOARD ================= */}
        {effectiveTab === "dashboard" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-sand shadow-card space-y-2">
                <span className="text-xs text-ink/60 font-semibold block">মোট বিক্রি (Revenue)</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-bn-display text-forest">
                    ৳{totalRevenue.toLocaleString()}
                  </span>
                  <span className="text-xs text-leaf font-bold">{orders.length}টি অর্ডার</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-sand shadow-card space-y-2">
                <span className="text-xs text-clay font-semibold block">ফোন কনফার্মেশনের অপেক্ষায়</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-bn-display text-clay">
                    {pendingCount} টি
                  </span>
                  <button
                    onClick={() => {
                      setActiveTab("orders");
                      setOrderStatusFilter("pending");
                    }}
                    className="text-xs text-leaf font-bold hover:underline"
                  >
                    তালিকা দেখুন →
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-sand shadow-card space-y-2">
                <span className="text-xs text-jute-deep font-semibold block">প্যাকিং কিউতে প্রস্তুত</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-bn-display text-forest">
                    {packingQueue.length} টি
                  </span>
                  <button
                    onClick={() => setActiveTab("packing")}
                    className="text-xs text-leaf font-bold hover:underline"
                  >
                    প্যাক করুন →
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-sand shadow-card space-y-2">
                <span className="text-xs text-ink/60 font-semibold block">কর্পোরেট কোটেশন অনুরোধ</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-bn-display text-forest">
                    {quoteCount} টি
                  </span>
                  <button
                    onClick={() => setActiveTab("quotes")}
                    className="text-xs text-leaf font-bold hover:underline"
                  >
                    বোর্ড দেখুন →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Pending COD Queue */}
            <div className="bg-white p-6 rounded-2xl border border-sand shadow-card space-y-4">
              <div className="flex justify-between items-center border-b border-sand pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-clay" />
                  <h3 className="font-bold text-forest text-sm">
                    অবিলম্বে কল করার জন্য অপেক্ষমাণ ক্যাশ অন ডেলিভারি (COD) অর্ডার
                  </h3>
                </div>
                <Badge variant="sale">জরুরি কিউ</Badge>
              </div>

              {orders.filter((o) => o.status === "pending").length === 0 ? (
                <p className="text-xs text-ink/60 py-4 text-center">
                  কোনো অপেক্ষমাণ অর্ডার নেই। সব কনফার্ম করা হয়েছে!
                </p>
              ) : (
                <div className="divide-y divide-sand/40">
                  {orders
                    .filter((o) => o.status === "pending")
                    .map((ord) => (
                      <div key={ord.orderNumber} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-forest text-sm">{ord.orderNumber}</span>
                            <span className="text-xs text-ink/70">· {ord.customerName}</span>
                            <span className="text-[11px] bg-sand/40 px-2 py-0.5 rounded text-ink/80">
                              {ord.district}
                            </span>
                          </div>
                          <div className="text-xs text-ink/60">
                            পণ্য: {ord.items.map((i: any) => `${i.productName} (${i.qty}টি)`).join(", ")}
                          </div>
                          <div className="text-xs font-bold text-forest">
                            সর্বমোট: ৳{ord.total} (ক্যাশ অন ডেলিভারি)
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${ord.customerPhone}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-sand bg-cream text-ink text-xs font-bold hover:border-leaf"
                          >
                            <Phone className="w-3.5 h-3.5 text-leaf" />
                            <span>কল করুন ({ord.customerPhone})</span>
                          </a>

                          <a
                            href={`https://wa.me/88${ord.customerPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-sand bg-cream text-leaf hover:bg-leaf/10"
                            title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleUpdateOrderStatus(
                                ord.orderNumber,
                                "confirmed",
                                "অর্ডার নিশ্চিত (Confirmed)",
                                "ফোন কলের মাধ্যমে অর্ডার কনফার্ম করা হয়েছে।"
                              )
                            }
                          >
                            কনফার্ম করুন
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: ORDERS MANAGEMENT ================= */}
        {effectiveTab === "orders" && (
          <div className="space-y-6">
            {/* Controls: Search & Status Filter Tabs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
              <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-xl border border-sand text-xs flex-1">
                {[
                  { key: "all", label: "সব অর্ডার", count: orders.length },
                  { key: "pending", label: "অপেক্ষমাণ", count: orders.filter((o) => o.status === "pending").length },
                  { key: "confirmed", label: "কনফার্মড", count: orders.filter((o) => o.status === "confirmed").length },
                  { key: "packing", label: "প্যাকিং", count: orders.filter((o) => o.status === "packing").length },
                  { key: "shipped", label: "কুরিয়ারে", count: orders.filter((o) => o.status === "shipped").length },
                  { key: "delivered", label: "ডেলিভারড", count: orders.filter((o) => o.status === "delivered").length },
                  { key: "cancelled", label: "বাতিল", count: orders.filter((o) => o.status === "cancelled").length },
                ].map((st) => (
                  <button
                    key={st.key}
                    onClick={() => setOrderStatusFilter(st.key)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      orderStatusFilter === st.key
                        ? "bg-forest text-white"
                        : "text-ink/70 hover:bg-cream"
                    }`}
                  >
                    {st.label} ({st.count})
                  </button>
                ))}
              </div>

              {/* Order Search Box */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="অর্ডার #, নাম বা ফোন নম্বর..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-sand bg-white text-ink focus:outline-none focus:ring-1 focus:ring-forest shadow-xs"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-sand shadow-card overflow-hidden text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-sand/30 font-bold text-forest border-b border-sand">
                    <tr>
                      <th className="p-3.5">অর্ডার নম্বর</th>
                      <th className="p-3.5">গ্রাহক ও ফোন</th>
                      <th className="p-3.5">জেলা / জোন</th>
                      <th className="p-3.5">পণ্য</th>
                      <th className="p-3.5">মোট মূল্য</th>
                      <th className="p-3.5">পেমেন্ট</th>
                      <th className="p-3.5">স্ট্যাটাস</th>
                      <th className="p-3.5 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand/40">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-ink/60">
                          {orderSearchQuery ? `"${orderSearchQuery}" দিয়ে কোনো অর্ডার পাওয়া যায়নি` : "কোনো অর্ডার পাওয়া যায়নি"}
                        </td>
                      </tr>
                    ) : filteredOrders.map((ord) => (
                      <tr key={ord.orderNumber} className="hover:bg-cream/40 transition-colors">
                        <td className="p-3.5 font-bold font-mono text-leaf">{ord.orderNumber}</td>
                        <td className="p-3.5">
                          <span className="font-bold text-forest block">{ord.customerName}</span>
                          <span className="text-[11px] text-ink/60">{ord.customerPhone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold block">{ord.district}</span>
                          <span className="text-[10px] text-ink/50 uppercase">{ord.zone}</span>
                        </td>
                        <td className="p-3.5 max-w-[200px] truncate">
                          {ord.items.map((i: any) => `${i.productName} (${i.qty})`).join(", ")}
                        </td>
                        <td className="p-3.5 font-bold text-forest">৳{ord.total}</td>
                        <td className="p-3.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sand/30 uppercase">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ord.status === "confirmed"
                                ? "bg-leaf/10 text-leaf"
                                : ord.status === "pending"
                                ? "bg-clay/10 text-clay"
                                : ord.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-sand text-ink"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-2.5 py-1 rounded bg-cream border border-sand text-leaf font-bold hover:border-leaf"
                          >
                            বিস্তারিত
                          </button>

                          <button
                            onClick={() => setInvoiceModalOrder(ord)}
                            className="px-2.5 py-1 rounded bg-sand/30 text-ink/80 hover:bg-sand"
                            title="চালানপত্র প্রিন্ট করুন"
                          >
                            <Printer className="w-3.5 h-3.5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PACKING QUEUE (PACKER VIEW) ================= */}
        {effectiveTab === "packing" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-sand shadow-card flex justify-between items-center">
              <div>
                <h2 className="font-bold text-forest text-base flex items-center gap-2">
                  <Package className="w-5 h-5 text-leaf" />
                  <span>ওয়্যারহাউজ প্যাকিং কিউ</span>
                </h2>
                <p className="text-xs text-ink/60">
                  শুধুমাত্র কনফার্ম করা অর্ডারগুলো এখানে প্রদর্শিত হচ্ছে। বক্সিং শেষে কুরিয়ার আইডি বসিয়ে শিপ করুন।
                </p>
              </div>
              <Badge variant="eco">{packingQueue.length} টি প্রস্তুত করার বাকি</Badge>
            </div>

            {packingQueue.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-sand text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-leaf mx-auto" />
                <h3 className="font-bold text-forest">সব অর্ডার প্যাক করা হয়েছে!</h3>
                <p className="text-xs text-ink/60">নতুন কোনো কনফার্মড অর্ডার আপাতত নেই।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packingQueue.map((ord) => (
                  <div key={ord.orderNumber} className="bg-white border-2 border-sand rounded-2xl p-5 shadow-card space-y-4">
                    <div className="flex justify-between items-start border-b border-sand pb-3">
                      <div>
                        <span className="font-bold font-mono text-leaf text-base">{ord.orderNumber}</span>
                        <div className="text-xs font-bold text-forest mt-0.5">{ord.customerName}</div>
                        <div className="text-[11px] text-ink/60">{ord.addressLine}, {ord.district}</div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-cream font-bold text-forest border border-sand">
                        ক্যাশ অন ডেলিভারি ৳{ord.total}
                      </span>
                    </div>

                    {/* Packing Items Checklist */}
                    <div className="space-y-2">
                      <span className="font-bold text-xs text-forest block">আইটেম চেকলিস্ট:</span>
                      <div className="space-y-1.5">
                        {ord.items.map((i: any, idx: number) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-cream/50 border border-sand flex justify-between items-center text-xs">
                            <div>
                              <span className="font-bold text-ink block">{i.productName}</span>
                              <span className="text-[11px] text-ink/60">ভ্যারিয়েন্ট: {i.variantName}</span>
                            </div>
                            <span className="font-bold font-mono text-sm bg-sand px-2 py-0.5 rounded text-forest">
                              × {i.qty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-sand flex items-center justify-between gap-2">
                      <button
                        onClick={() => setInvoiceModalOrder(ord)}
                        className="px-3 py-1.5 rounded-lg border border-sand bg-cream text-xs font-bold text-ink flex items-center gap-1.5 hover:border-leaf"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>প্যাকিং স্লিপ প্রিন্ট</span>
                      </button>

                      {ord.status === "confirmed" ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              ord.orderNumber,
                              "packing",
                              "প্যাকিং প্রক্রিয়াধীন",
                              "প্যাকার প্রোডাক্ট সংগ্রহ করছে।"
                            )
                          }
                        >
                          প্যাকিং শুরু করুন
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Steadfast ট্র্যাকিং ID"
                            value={courierInput.trackingId}
                            onChange={(e) => setCourierInput({ ...courierInput, trackingId: e.target.value })}
                            className="px-2.5 py-1 text-xs rounded border border-sand bg-cream w-36 focus:outline-none focus:ring-1 focus:ring-jute"
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleUpdateOrderStatus(
                                ord.orderNumber,
                                "shipped",
                                "কুরিয়ারে হস্তান্তর",
                                `Steadfast Courier ট্র্যাকিং ID: ${courierInput.trackingId || "SF-991201"}`,
                                { courierName: "Steadfast Courier", trackingId: courierInput.trackingId || "SF-991201" }
                              )
                            }
                          >
                            শিপ করুন
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: B2B QUOTES BOARD ================= */}
        {effectiveTab === "quotes" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-sand shadow-card">
              <div>
                <h2 className="font-bold text-forest text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-leaf" />
                  <span>কর্পোরেট কোটেশন ও কাস্টম অর্ডার বোর্ড</span>
                </h2>
                <p className="text-xs text-ink/60">
                  বাল্ক অর্ডার, লোগো প্রিন্টিং প্রপোজাল ও অগ্রিম ডিপোজিট মনিটরিং
                </p>
              </div>
              <Badge variant="sale">{quotes.length} টি কোটেশন</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {quotes.map((q) => (
                <div key={q.token} className="bg-white rounded-2xl border border-sand p-5 shadow-card space-y-4 text-xs">
                  <div className="flex justify-between items-start border-b border-sand pb-3">
                    <div>
                      <span className="font-mono text-leaf font-bold block">{q.token}</span>
                      <h3 className="font-bold text-forest text-sm mt-0.5">{q.companyName}</h3>
                      <span className="text-[11px] text-ink/60">{q.contactName} ({q.phone})</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sand/40 text-forest">
                      {q.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-ink/80">
                    <div>পণ্য: <strong>{q.productName}</strong></div>
                    <div>পরিমাণ: <strong>{q.qty} পিস</strong> {q.includeLogo && "(লোগো সহ)"}</div>
                    <div className="flex justify-between pt-1 font-semibold text-forest">
                      <span>মোট দর: ৳{q.totalPrice.toLocaleString()}</span>
                      <span className="text-clay">৫০% অগ্রিম: ৳{q.depositAmount.toLocaleString()}</span>
                    </div>
                    {q.deadline && (
                      <div className="text-[11px] text-clay">ডেলিভারি ডেডলাইন: {q.deadline}</div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-sand flex items-center justify-between gap-2">
                    <Link
                      href={`/quote/${q.token}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-leaf font-bold hover:underline"
                    >
                      <span>কোট পেজ</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    {q.status === "quote_requested" && (
                      <button
                        onClick={() => handleUpdateQuoteStatus(q.token, "quoted", "কোটেশন অনুমোদিত ও ক্লায়েন্টকে পাঠানো হয়েছে।")}
                        className="px-3 py-1 bg-leaf text-white font-bold rounded hover:bg-forest"
                      >
                        কোট পাঠান
                      </button>
                    )}

                    {q.status === "quoted" && (
                      <button
                        onClick={() => handleUpdateQuoteStatus(q.token, "deposit_paid", "৫০% অগ্রিম পেমেন্ট ভেরিফাইড")}
                        className="px-3 py-1 bg-forest text-white font-bold rounded"
                      >
                        ডিপোজিট ভেরিফাই
                      </button>
                    )}

                    {q.status === "deposit_paid" && (
                      <button
                        onClick={() => handleUpdateQuoteStatus(q.token, "in_production", "কারখানায় উৎপাদন প্রক্রিয়া চলছে")}
                        className="px-3 py-1 bg-jute text-forest font-bold rounded"
                      >
                        কারখানায় পাঠান
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: PRODUCTS & PRICING ================= */}
        {effectiveTab === "products" && (
          <div className="space-y-6">
            {/* PRD Test Simulation Box */}
            <div className="bg-jute/15 border-2 border-jute/40 rounded-2xl p-5 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-forest font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-jute-deep" />
                <span>PRD §14 টেস্ট রিকোয়ারমেন্ট: মূল্য পরিবর্তন ও ভেরিফিকেশন</span>
              </div>
              <p className="text-xs text-ink/80 leading-relaxed">
                এখানে ক্লাসিক পাটের টোট ব্যাগের মূল্য পরিবর্তন করে <strong>৳৫০০</strong> করুন এবং টেস্ট করুন।
                ওয়েবসাইটে লাইভ প্রাইস আপডেট হবে, কিন্তু ইতিমধ্যে তৈরি হওয়া পুরাতন অর্ডারের মূল্য অপরিবর্তিত থাকবে।
                টেস্ট শেষে পুনরায় <strong>৳৪৫০</strong> এ রিভার্ট করুন।
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">টোট ব্যাগের মূল্য: ৳</span>
                  <input
                    type="number"
                    value={totePriceInput}
                    onChange={(e) => setTotePriceInput(Number(e.target.value))}
                    className="w-24 px-2 py-1 border border-sand rounded bg-white text-xs font-bold"
                  />
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateProductPrice("P01", "natural", totePriceInput)}
                >
                  মূল্য সংরক্ষণ করুন
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setTotePriceInput(450);
                    handleUpdateProductPrice("P01", "natural", 450);
                  }}
                >
                  ডিফল্ট ৳৪৫০ এ রিভার্ট করুন
                </Button>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-sand shadow-card overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-sand/30 font-bold text-forest border-b border-sand">
                  <tr>
                    <th className="p-3.5">কোড</th>
                    <th className="p-3.5">পণ্যের নাম</th>
                    <th className="p-3.5">ক্যাটাগরি</th>
                    <th className="p-3.5">ভ্যারিয়েন্ট ও বর্তমান মূল্য</th>
                    <th className="p-3.5">স্টক অবস্থা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/40">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-cream/40">
                      <td className="p-3.5 font-bold font-mono text-leaf">{p.id}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-forest block">{p.bn}</span>
                        <span className="text-[11px] text-ink/60">{p.en}</span>
                      </td>
                      <td className="p-3.5 text-ink/70 capitalize">{p.cat}</td>
                      <td className="p-3.5">
                        <div className="space-y-1">
                          {p.variants.map((v: any) => (
                            <span key={v.k} className="inline-block bg-sand/30 px-2 py-0.5 rounded text-[11px] font-semibold text-forest mr-2">
                              {v.bn}: ৳{v.price}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-leaf/10 text-leaf">
                          স্টকে আছে (Active)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 6: SETTINGS ================= */}
        {effectiveTab === "settings" && role === "owner" && (
          <div className="space-y-6">
            {/* PRD Test Free Threshold Box */}
            <div className="bg-jute/15 border-2 border-jute/40 rounded-2xl p-5 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-forest font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-jute-deep" />
                <span>PRD §14 টেস্ট রিকোয়ারমেন্ট: ফ্রি ডেলিভারি থ্রেশহোল্ড পরিবর্তন</span>
              </div>
              <p className="text-xs text-ink/80 leading-relaxed">
                ফ্রি ডেলিভারির ন্যূনতম সীমা পরিবর্তন করে <strong>৳৩,০০০</strong> করুন এবং চেকআউটে টেস্ট করুন।
                আগে যেখানে ৳২,৫৫০ এর অর্ডারে ডেলিভারি ফ্রি ছিল, তখন ৳৭০ চার্জ হবে। টেস্ট শেষে পুনরায় <strong>৳২,৫০০</strong> এ ফিরিয়ে আনুন।
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">ফ্রি ডেলিভারি সীমা: ৳</span>
                  <input
                    type="number"
                    value={freeThresholdInput}
                    onChange={(e) => setFreeThresholdInput(Number(e.target.value))}
                    className="w-28 px-2 py-1 border border-sand rounded bg-white text-xs font-bold"
                  />
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateSettings({ freeThreshold: freeThresholdInput })}
                >
                  সংরক্ষণ করুন
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setFreeThresholdInput(2500);
                    handleUpdateSettings({ freeThreshold: 2500 });
                  }}
                >
                  ডিফল্ট ৳২,৫০০ এ রিভার্ট করুন
                </Button>
              </div>
            </div>

            {/* General Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Zone Fees */}
              <div className="bg-white p-6 rounded-2xl border border-sand shadow-card space-y-4 text-xs">
                <h3 className="font-bold text-forest text-sm">ডেলিভারি জোন চার্জ</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>ঢাকা সিটি (Dhaka City):</span>
                    <span className="font-bold">৳{settings?.zones?.dhaka_city || 70}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ঢাকার আশেপাশে (গাজীপুর, সাভার, ইত্যাদি):</span>
                    <span className="font-bold">৳{settings?.zones?.dhaka_sub || 100}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ঢাকার বাইরে (অন্যান্য জেলা):</span>
                    <span className="font-bold">৳{settings?.zones?.outside || 130}</span>
                  </div>
                </div>
              </div>

              {/* Payment Limits */}
              <div className="bg-white p-6 rounded-2xl border border-sand shadow-card space-y-4 text-xs">
                <h3 className="font-bold text-forest text-sm">ক্যাশ অন ডেলিভারি (COD) পলিসি</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>সর্বোচ্চ COD অর্ডার সীমা:</span>
                    <span className="font-bold">৳{settings?.codLimit?.toLocaleString() || "১০,০০০"}</span>
                  </div>
                  <p className="text-[11px] text-ink/60">
                    ৳১০,০০০ এর বেশি অর্ডারে অগ্রিম অনলাইন পেমেন্ট বাধ্যতামূলক করা হয়েছে।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal / Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-sand max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-pop">
            <div className="flex justify-between items-center border-b border-sand pb-3">
              <div>
                <span className="font-mono text-leaf font-bold">{selectedOrder.orderNumber}</span>
                <h3 className="font-bold text-forest text-base">{selectedOrder.customerName}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 rounded hover:bg-cream">
                <XCircle className="w-5 h-5 text-ink/50" />
              </button>
            </div>

            <div className="text-xs space-y-2">
              <div>ফোন: <strong>{selectedOrder.customerPhone}</strong></div>
              <div>ঠিকানা: <strong>{selectedOrder.addressLine}, {selectedOrder.area}, {selectedOrder.district}</strong></div>
              <div>জোন: <strong>{selectedOrder.zone}</strong></div>
              <div>পেমেন্ট: <strong>{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</strong></div>
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-forest block">অর্ডার করা আইটেমসমূহ:</span>
              <div className="border border-sand rounded-xl divide-y divide-sand/40">
                {selectedOrder.items.map((i: any, idx: number) => (
                  <div key={idx} className="p-2.5 flex justify-between items-center">
                    <div>
                      <span className="font-bold">{i.productName}</span>
                      <span className="text-[11px] text-ink/60 block">{i.variantName} × {i.qty}</span>
                    </div>
                    <span className="font-bold">৳{i.totalPrice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-forest block">অর্ডার ইভেন্ট টাইমলাইন:</span>
              <div className="space-y-1.5 bg-cream/40 p-3 rounded-xl border border-sand">
                {selectedOrder.events?.map((ev: any, idx: number) => (
                  <div key={idx} className="text-[11px]">
                    <span className="font-bold text-leaf">{ev.time}</span> - <span className="font-semibold">{ev.title}</span> ({ev.desc})
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-sand">
              <Button variant="secondary" size="sm" onClick={() => setSelectedOrder(null)}>
                বন্ধ করুন
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {invoiceModalOrder && (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 space-y-6 shadow-pop text-xs text-ink print:m-0 print:p-0">
            <div className="flex justify-between items-start border-b border-sand pb-4">
              <div>
                <h2 className="font-bold font-bn-display text-2xl text-forest">পাটবাড়ি</h2>
                <p className="text-[11px] text-jute-deep">সোনালি আঁশের বাড়ি — Home of the golden fibre</p>
                <p className="text-[10px] text-ink/60">ধানমন্ডি, ঢাকা | support@paatbari.com</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-sm block">{invoiceModalOrder.orderNumber}</span>
                <span className="text-[10px] text-ink/60">{new Date(invoiceModalOrder.createdAt).toLocaleDateString("bn-BD")}</span>
              </div>
            </div>

            <div className="bg-cream/40 p-3.5 rounded-xl border border-sand space-y-1">
              <div className="font-bold text-forest">গ্রাহকের তথ্য:</div>
              <div>নাম: {invoiceModalOrder.customerName}</div>
              <div>ফোন: {invoiceModalOrder.customerPhone}</div>
              <div>ঠিকানা: {invoiceModalOrder.addressLine}, {invoiceModalOrder.district}</div>
            </div>

            <div className="border border-sand rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-sand/30 font-bold">
                  <tr>
                    <th className="p-2.5">পণ্য</th>
                    <th className="p-2.5 text-center">পরিমাণ</th>
                    <th className="p-2.5 text-right">মূল্য</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/40">
                  {invoiceModalOrder.items.map((i: any, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-semibold">{i.productName} ({i.variantName})</td>
                      <td className="p-2.5 text-center">{i.qty}</td>
                      <td className="p-2.5 text-right">৳{i.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 bg-sand/20 space-y-1 border-t border-sand">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span>৳{invoiceModalOrder.subtotal}</span>
                </div>
                {invoiceModalOrder.discount > 0 && (
                  <div className="flex justify-between text-clay">
                    <span>কুপন ছাড়:</span>
                    <span>-৳{invoiceModalOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>৳{invoiceModalOrder.deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-forest border-t border-sand/50 pt-1">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span>৳{invoiceModalOrder.total} ({invoiceModalOrder.paymentMethod.toUpperCase()})</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-sand print:hidden">
              <Button variant="secondary" size="sm" onClick={() => setInvoiceModalOrder(null)}>
                বন্ধ করুন
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.print()}
                className="flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট করুন</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
