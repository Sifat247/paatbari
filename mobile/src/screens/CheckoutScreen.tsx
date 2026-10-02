import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  CheckCircle,
  Truck,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  ChevronDown,
  Check,
  Search,
  MessageCircle,
  Home,
} from "lucide-react-native";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../constants/theme";
import { useLanguage, toBanglaDigits } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { BANGLADESH_DISTRICTS, District } from "../data/districts";
import { submitOrder } from "../services/api";

export const CheckoutScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { isBn, t, formatPrice } = useLanguage();
  const {
    items,
    deliveryZone,
    deliveryCharge,
    subtotal,
    grandTotal,
    clearCart,
  } = useCart();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<District>(
    BANGLADESH_DISTRICTS[0]
  );
  const [districtModalOpen, setDistrictModalOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod");

  // Loading & Submission State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const filteredDistricts = BANGLADESH_DISTRICTS.filter(
    (d) =>
      d.nameBn.includes(districtSearch) ||
      d.nameEn.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!customerName.trim()) {
      setErrorMessage(t("অনুগ্রহ করে আপনার নাম লিখুন", "Please enter your name"));
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (cleanPhone.length < 11 || (!cleanPhone.startsWith("01") && !cleanPhone.startsWith("8801"))) {
      setErrorMessage(
        t("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)", "Please enter a valid 11-digit BD mobile number")
      );
      return;
    }

    if (!address.trim()) {
      setErrorMessage(
        t("সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন", "Please provide delivery address")
      );
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        district: selectedDistrict.nameEn,
        address: address.trim(),
        note: note.trim(),
        deliveryZone,
        paymentMethod,
        items: items.map((i) => ({
          variantId: i.variant.k,
          qty: i.quantity,
        })),
      };

      const res = await submitOrder(orderPayload);
      if (res.success && res.orderNumber) {
        setConfirmedOrderId(res.orderNumber);
        clearCart();
      } else {
        setErrorMessage(res.error || t("অর্ডার ব্যর্থ হয়েছে", "Failed to place order"));
      }
    } catch (e: any) {
      setErrorMessage(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (confirmedOrderId) {
    return (
      <View style={[styles.successContainer, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={styles.successScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.successCircle}>
            <CheckCircle size={56} color={COLORS.leaf} />
          </View>

          <Text style={styles.successHeading}>
            {t("আপনার অর্ডার সফলভাবে গৃহীত হয়েছে!", "Order Placed Successfully!")}
          </Text>

          <Text style={styles.successDesc}>
            {t(
              "পাটবাড়িকে বেছে নেওয়ার জন্য আন্তরিক ধন্যবাদ। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।",
              "Thank you for choosing Paatbari. We will contact you soon for order confirmation."
            )}
          </Text>

          {/* Order ID Card */}
          <View style={styles.orderIdCard}>
            <Text style={styles.orderIdLabel}>
              {t("অর্ডার ট্র্যাকিং নম্বর:", "Order Reference No:")}
            </Text>
            <Text style={styles.orderIdVal}>{confirmedOrderId}</Text>
          </View>

          {/* Summary Box */}
          <View style={styles.successMetaBox}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t("গ্রাহক:", "Customer:")}</Text>
              <Text style={styles.metaVal}>{customerName}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t("ফোন:", "Phone:")}</Text>
              <Text style={styles.metaVal}>{customerPhone}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t("ডেলিভারি জেলা:", "District:")}</Text>
              <Text style={styles.metaVal}>
                {isBn ? selectedDistrict.nameBn : selectedDistrict.nameEn}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t("পরিশোধ পদ্ধতি:", "Payment:")}</Text>
              <Text style={styles.metaVal}>
                {paymentMethod === "cod"
                  ? t("ক্যাশ অন ডেলিভারি", "Cash on Delivery")
                  : t("বিকাশ / নগদ", "bKash / Nagad")}
              </Text>
            </View>
            <View style={[styles.metaRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.metaLabel}>{t("মোট প্রদেয়:", "Total Bill:")}</Text>
              <Text style={[styles.metaVal, { color: COLORS.forest, fontWeight: "800" }]}>
                {formatPrice(grandTotal)}
              </Text>
            </View>
          </View>

          {/* WhatsApp Helper CTA */}
          <TouchableOpacity
            style={styles.whatsappHelpBtn}
            onPress={() => {
              const msg = `হ্যালো পাটবাড়ি! আমার অর্ডার নম্বর ${confirmedOrderId}। আমি অর্ডারটি কনফার্ম করতে চাই।`;
              Linking.openURL(
                `https://wa.me/8801700000000?text=${encodeURIComponent(msg)}`
              );
            }}
            activeOpacity={0.85}
          >
            <MessageCircle size={18} color={COLORS.white} />
            <Text style={styles.whatsappHelpText}>
              {t("হোয়াটসঅ্যাপে যোগাযোগ করুন", "WhatsApp Support")}
            </Text>
          </TouchableOpacity>

          {/* Return Home Button */}
          <TouchableOpacity
            style={styles.returnHomeBtn}
            onPress={() => navigation.navigate("HomeTab")}
            activeOpacity={0.85}
          >
            <Home size={18} color={COLORS.forest} />
            <Text style={styles.returnHomeText}>
              {t("হোম পেজে ফিরে যান", "Back to Home")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={COLORS.forest} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t("চেকআউট ও ডেলিভারি", "Checkout & Delivery")}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Error message pill */}
        {errorMessage.length > 0 && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* Section 1: Customer Contact */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <User size={18} color={COLORS.forest} />
            <Text style={styles.cardTitle}>
              {t("গ্রাহকের তথ্য", "Customer Information")}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t("আপনার নাম *", "Full Name *")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t("যেমন: মোঃ আব্দুল্লাহ", "e.g. John Doe")}
              placeholderTextColor={COLORS.textLight}
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t("সচল মোবাইল নম্বর *", "Active Mobile Number *")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="01XXXXXXXXX"
              placeholderTextColor={COLORS.textLight}
              keyboardType="phone-pad"
              value={customerPhone}
              onChangeText={setCustomerPhone}
              maxLength={14}
            />
            <Text style={styles.helperText}>
              {t(
                "ডেলিভারি রাইডার এই নম্বরে কল দিয়ে পণ্য ডেলিভারি করবেন।",
                "Delivery person will contact this number before arrival."
              )}
            </Text>
          </View>
        </View>

        {/* Section 2: Delivery Location & District */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MapPin size={18} color={COLORS.forest} />
            <Text style={styles.cardTitle}>
              {t("ডেলিভারি ঠিকানা", "Delivery Address")}
            </Text>
          </View>

          {/* District Picker trigger */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t("জেলা নির্বাচন করুন *", "Select District *")}
            </Text>
            <TouchableOpacity
              style={styles.districtSelector}
              onPress={() => setDistrictModalOpen(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.districtSelectorText}>
                {isBn ? selectedDistrict.nameBn : selectedDistrict.nameEn}
              </Text>
              <ChevronDown size={18} color={COLORS.forest} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t("বাসা, রোড, থানা ও এলাকার বিস্তারিত ঠিকানা *", "Detailed Street Address *")}
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={t(
                "বাড়ি নং, রোড নং, ফ্ল্যাট, থানা ও পরিচিত ল্যান্ডমার্ক...",
                "House no, Road no, Thana, Area landmark..."
              )}
              placeholderTextColor={COLORS.textLight}
              multiline
              numberOfLines={3}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t("বিশেষ ডেলিভারি নোট (ঐচ্ছিক)", "Delivery Instructions (Optional)")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t("যেমন: বিকাল ৫টার পর ডেলিভারি দিন", "e.g. Deliver after 5 PM")}
              placeholderTextColor={COLORS.textLight}
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        {/* Section 3: Payment Method */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <CreditCard size={18} color={COLORS.forest} />
            <Text style={styles.cardTitle}>
              {t("পরিশোধের মাধ্যম", "Payment Method")}
            </Text>
          </View>

          {/* COD Option */}
          <TouchableOpacity
            style={[
              styles.payOption,
              paymentMethod === "cod" && styles.activePayOption,
            ]}
            onPress={() => setPaymentMethod("cod")}
            activeOpacity={0.8}
          >
            <View style={styles.radioOuter}>
              {paymentMethod === "cod" && <View style={styles.radioInner} />}
            </View>
            <Banknote size={20} color={COLORS.forest} />
            <View style={{ flex: 1 }}>
              <Text style={styles.payTitle}>
                {t("ক্যাশ অন ডেলিভারি (COD)", "Cash on Delivery (COD)")}
              </Text>
              <Text style={styles.paySub}>
                {t("পণ্য হাতে পেয়ে রাইডারকে মূল্য পরিশোধ করুন।", "Pay cash directly upon parcel delivery.")}
              </Text>
            </View>
          </TouchableOpacity>

          {/* bKash / Nagad Option */}
          <TouchableOpacity
            style={[
              styles.payOption,
              paymentMethod === "bkash" && styles.activePayOption,
            ]}
            onPress={() => setPaymentMethod("bkash")}
            activeOpacity={0.8}
          >
            <View style={styles.radioOuter}>
              {paymentMethod === "bkash" && <View style={styles.radioInner} />}
            </View>
            <CreditCard size={20} color={COLORS.forest} />
            <View style={{ flex: 1 }}>
              <Text style={styles.payTitle}>
                {t("বিকাশ / নগদ (bKash / Nagad)", "bKash / Nagad Transfer")}
              </Text>
              <Text style={styles.paySub}>
                {t("অর্ডার পরবর্তী ধাপে বিকাশ নম্বর পেয়ে পেমেন্ট করতে পারেন।", "Make payment via mobile wallet after placing order.")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Section 4: Final Summary Box */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t("অর্ডারের সংক্ষেপ", "Order Recap")}
          </Text>

          <View style={styles.recapRow}>
            <Text style={styles.recapLabel}>{t("মোট আইটেম:", "Items Total:")}</Text>
            <Text style={styles.recapVal}>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.recapRow}>
            <Text style={styles.recapLabel}>{t("ডেলিভারি চার্জ:", "Delivery Fee:")}</Text>
            <Text style={styles.recapVal}>
              {deliveryCharge === 0 ? t("ফ্রি", "FREE") : formatPrice(deliveryCharge)}
            </Text>
          </View>

          <View style={[styles.recapRow, styles.recapGrandRow]}>
            <Text style={styles.recapGrandLabel}>
              {t("সর্বমোট বিল:", "Total Payable:")}
            </Text>
            <Text style={styles.recapGrandVal}>{formatPrice(grandTotal)}</Text>
          </View>
        </View>

        {/* Confirm Order CTA */}
        <TouchableOpacity
          style={[styles.confirmBtn, loading && styles.btnDisabled]}
          onPress={handlePlaceOrder}
          disabled={loading}
          activeOpacity={0.88}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <>
              <Check size={20} color={COLORS.white} />
              <Text style={styles.confirmBtnText}>
                {t("অর্ডার নিশ্চিত করুন", "Confirm Order")}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* District Selection Modal */}
      <Modal
        visible={districtModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDistrictModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {t("বাংলাদেশ জেলাসমূহ (৬৪টি জেলা)", "Bangladesh Districts (64 Districts)")}
              </Text>
              <TouchableOpacity onPress={() => setDistrictModalOpen(false)}>
                <Text style={styles.modalCloseText}>{t("বন্ধ", "Close")}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalSearchBox}>
              <Search size={16} color={COLORS.textMuted} />
              <TextInput
                style={styles.modalSearchInput}
                placeholder={t("জেলা খুঁজুন...", "Search district...")}
                placeholderTextColor={COLORS.textLight}
                value={districtSearch}
                onChangeText={setDistrictSearch}
              />
            </View>

            <FlatList
              data={filteredDistricts}
              keyExtractor={(item) => item.nameEn}
              renderItem={({ item }) => {
                const isSelected = selectedDistrict.nameEn === item.nameEn;
                return (
                  <TouchableOpacity
                    style={[
                      styles.districtItem,
                      isSelected && styles.activeDistrictItem,
                    ]}
                    onPress={() => {
                      setSelectedDistrict(item);
                      setDistrictModalOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.districtItemText,
                        isSelected && styles.activeDistrictItemText,
                      ]}
                    >
                      {isBn ? item.nameBn : item.nameEn}
                    </Text>
                    {isSelected && <Check size={16} color={COLORS.leaf} />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.cream,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sand,
  },
  navBtn: {
    padding: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: "#EFE8DA",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.forest,
  },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  errorBanner: {
    backgroundColor: COLORS.dangerLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: "#F8B4B4",
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.sand,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.forest,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.forest,
  },
  input: {
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.sand,
    fontSize: 14,
    color: COLORS.text,
  },
  textArea: {
    height: 80,
    paddingTop: 10,
    textAlignVertical: "top",
  },
  helperText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  districtSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.sand,
  },
  districtSelectorText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  payOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.sand,
    gap: 12,
  },
  activePayOption: {
    borderColor: COLORS.leaf,
    backgroundColor: "#F2F9F5",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.leaf,
  },
  payTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.forest,
  },
  paySub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  recapRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  recapLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  recapVal: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  recapGrandRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.sand,
    paddingTop: 8,
    marginTop: 4,
  },
  recapGrandLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.forest,
  },
  recapGrandVal: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.forest,
  },
  confirmBtn: {
    backgroundColor: COLORS.forest,
    height: 50,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: SPACING.sm,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  confirmBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.forest,
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.leaf,
  },
  modalSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.sand,
    gap: 8,
    marginBottom: SPACING.md,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
  },
  districtItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sandLight,
  },
  activeDistrictItem: {
    backgroundColor: "#F2F9F5",
  },
  districtItemText: {
    fontSize: 14,
    color: COLORS.text,
  },
  activeDistrictItemText: {
    fontWeight: "700",
    color: COLORS.leaf,
  },
  successContainer: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  successScroll: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.leafLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },
  successHeading: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.forest,
    textAlign: "center",
    marginBottom: 8,
  },
  successDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: SPACING.xl,
  },
  orderIdCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: "100%",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.sand,
    borderStyle: "dashed",
    marginBottom: SPACING.lg,
  },
  orderIdLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: "600",
  },
  orderIdVal: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.forest,
    letterSpacing: 1,
    marginTop: 4,
  },
  successMetaBox: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.sand,
    marginBottom: SPACING.lg,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sandLight,
  },
  metaLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  metaVal: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  whatsappHelpBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#25D366",
    width: "100%",
    height: 48,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  whatsappHelpText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  returnHomeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.sand,
    width: "100%",
    height: 48,
    borderRadius: RADIUS.md,
  },
  returnHomeText: {
    color: COLORS.forest,
    fontWeight: "700",
    fontSize: 14,
  },
});
