export interface AppSettings {
  freeThreshold: number;
  codLimit: number;
  zones: {
    dhaka_city: number;
    dhaka_sub: number;
    outside: number;
  };
  b2b: {
    moq: number;
    tiers: { min: number; max: number | null; unit: number }[];
    logoFee: number;
    setupFee: number;
    depositPct: number;
  };
  contacts: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  announcement: {
    active: boolean;
    text: string;
  };
}

const defaultSettings: AppSettings = {
  freeThreshold: 2500,
  codLimit: 10000,
  zones: {
    dhaka_city: 70,
    dhaka_sub: 100,
    outside: 130,
  },
  b2b: {
    moq: 50,
    tiers: [
      { min: 50, max: 199, unit: 180 },
      { min: 200, max: 499, unit: 160 },
      { min: 500, max: null, unit: 140 },
    ],
    logoFee: 25,
    setupFee: 1500,
    depositPct: 50,
  },
  contacts: {
    phone: "+8801700000000",
    whatsapp: "+8801700000000",
    email: "support@paatbari.com",
    address: "বাড়ি #১২, রোড #৪, ধানমন্ডি, ঢাকা-১২০৫",
  },
  announcement: {
    active: true,
    text: "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি · ৳২,৫০০+ অর্ডারে ফ্রি ডেলিভারি",
  },
};

declare global {
  var __paatbari_settings: AppSettings | undefined;
}

if (!globalThis.__paatbari_settings) {
  globalThis.__paatbari_settings = JSON.parse(JSON.stringify(defaultSettings));
}

export const settingsStore = {
  get: (): AppSettings => globalThis.__paatbari_settings || defaultSettings,
  update: (partial: Partial<AppSettings>): AppSettings => {
    const current = globalThis.__paatbari_settings || JSON.parse(JSON.stringify(defaultSettings));
    Object.assign(current, partial);
    globalThis.__paatbari_settings = current;
    return current;
  },
  reset: (): AppSettings => {
    const fresh = JSON.parse(JSON.stringify(defaultSettings));
    globalThis.__paatbari_settings = fresh;
    return fresh;
  },
};
