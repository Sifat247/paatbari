"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/v1/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        window.location.reload();
        return;
      }
      setError(data.message || "লগইন ব্যর্থ হয়েছে");
    } catch {
      setError("সার্ভারে সংযোগ করা যায়নি");
    }
    setBusy(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white border border-sand rounded-2xl p-8 shadow-card space-y-5">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-forest/10 text-forest mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-forest">অ্যাডমিন লগইন</h1>
          <p className="text-xs text-ink/60">পাটবাড়ি ড্যাশবোর্ডে ঢুকতে পাসওয়ার্ড দিন</p>
        </div>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full border border-sand rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="w-full bg-forest text-white font-bold rounded-xl py-3 text-sm disabled:opacity-50"
        >
          {busy ? "যাচাই হচ্ছে..." : "লগইন"}
        </button>
      </form>
    </div>
  );
}
