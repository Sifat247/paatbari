import { db } from "@/lib/supabase-server";

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
    phone: "+8801793648214",
    whatsapp: "+8801793648214",
    email: "sifatphychee@gmail.com",
    address: "মানিকগঞ্জ সদর, মানিকগঞ্জ ১৮০০, বাংলাদেশ",
  },
  announcement: {
    active: true,
    text: "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি · ৳২,৫০০+ অর্ডারে ফ্রি ডেলিভারি",
  },
};

// ------------------------------------------------------------
// Settings are stored in Supabase (table: public.app_settings, row id = 1).
// Falls back to defaults if the row doesn't exist yet.
// ------------------------------------------------------------
function merge(base: AppSettings, partial: Partial<AppSettings>): AppSettings {
  const out = JSON.parse(JSON.stringify(base)) as AppSettings;
  for (const [k, v] of Object.entries(partial || {})) {
    const key = k as keyof AppSettings;
    if (!(key in out)) continue;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      (out as any)[key] = { ...(out as any)[key], ...(v as object) };
    } else if (v !== undefined) {
      (out as any)[key] = v;
    }
  }
  return out;
}

export const DEFAULT_SETTINGS = defaultSettings;

export const settingsStore = {
  get: async (): Promise<AppSettings> => {
    try {
      const { data, error } = await db().from("app_settings").select("data").eq("id", 1).maybeSingle();
      if (error || !data) return JSON.parse(JSON.stringify(defaultSettings));
      return merge(defaultSettings, data.data as Partial<AppSettings>);
    } catch {
      return JSON.parse(JSON.stringify(defaultSettings));
    }
  },
  update: async (partial: Partial<AppSettings>): Promise<AppSettings> => {
    const current = await settingsStore.get();
    const next = merge(current, partial);
    const { error } = await db().from("app_settings").upsert({ id: 1, data: next, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return next;
  },
  reset: async (): Promise<AppSettings> => {
    const fresh = JSON.parse(JSON.stringify(defaultSettings));
    const { error } = await db().from("app_settings").upsert({ id: 1, data: fresh, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return fresh;
  },
};
