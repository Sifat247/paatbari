"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import bnMessages from "@/messages/bn.json";
import enMessages from "@/messages/en.json";
import { formatPrice as formatPriceUtil, toBanglaNumber } from "@/lib/utils";

export type Locale = "bn" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (keyPath: string, fallback?: string) => string;
  formatPrice: (amount: number) => string;
  formatDate: (date: string | Date) => string;
  toLocaleDigits: (num: number | string) => string;
}

const messagesMap = {
  bn: bnMessages,
  en: enMessages,
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "bn",
  setLocale: () => {},
  toggleLocale: () => {},
  t: (k) => k,
  formatPrice: (a) => `৳${a}`,
  formatDate: (d) => String(d),
  toLocaleDigits: (n) => String(n),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");

  useEffect(() => {
    // Check saved cookie or localStorage
    const saved = localStorage.getItem("paatbari_lang") as Locale | null;
    if (saved === "en" || saved === "bn") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("paatbari_lang", newLocale);
    document.cookie = `paatbari_lang=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = newLocale;
  };

  const toggleLocale = () => {
    setLocale(locale === "bn" ? "en" : "bn");
  };

  const t = (keyPath: string, fallback?: string): string => {
    const keys = keyPath.split(".");
    let current: any = messagesMap[locale];
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return fallback || keyPath;
      }
    }
    return typeof current === "string" ? current : fallback || keyPath;
  };

  const formatPrice = (amount: number) => {
    return formatPriceUtil(amount, locale);
  };

  const formatDate = (dateInput: string | Date): string => {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return String(dateInput);

    if (locale === "bn") {
      const day = toBanglaNumber(date.getDate());
      const monthsBn = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
      ];
      const month = monthsBn[date.getMonth()];
      const year = toBanglaNumber(date.getFullYear());
      return `${day} ${month} ${year}`;
    }

    const monthsEn = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${monthsEn[date.getMonth()]} ${date.getFullYear()}`;
  };

  const toLocaleDigits = (num: number | string): string => {
    return locale === "bn" ? toBanglaNumber(num) : String(num);
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t,
        formatPrice,
        formatDate,
        toLocaleDigits,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
