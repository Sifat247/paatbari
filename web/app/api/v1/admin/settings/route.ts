import { NextRequest, NextResponse } from "next/server";
import { settingsStore } from "@/lib/settings-store";
import { isAdmin, unauthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await settingsStore.get();
  return NextResponse.json({ success: true, settings });
}

export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const body = await req.json();
    const { reset, ...updates } = body;

    if (reset) {
      const defaultSet = await settingsStore.reset();
      return NextResponse.json({
        success: true,
        message: "সেটিংস রিসেট সম্পন্ন হয়েছে",
        settings: defaultSet,
      });
    }

    const updated = await settingsStore.update(updates);
    return NextResponse.json({
      success: true,
      message: "সেটিংস সফলভাবে সংরক্ষিত হয়েছে",
      settings: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "SERVER_ERROR", message: err.message }, { status: 500 });
  }
}
