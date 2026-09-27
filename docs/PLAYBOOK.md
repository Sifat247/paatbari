# PaatKotha — Google Antigravity Playbook (Banglish)

> Antigravity apnar computer-e code likhbe, chalabe, browser diye test korbe. Apni plan approve korben, test korben, commit korben.
> v1.0 · 27 Sep 2026 · Kit: `PaatKotha_Antigravity_Kit.zip`

---

## 1. Kon file Antigravity-te diben?

**Shudhu `PaatKotha_Antigravity_Kit.zip`** — unzip kore oi folder-tai Antigravity-te open korben. Er vitore sob ache:

| Kit-e | Kaj |
|---|---|
| `.agents/rules/` (3ta) | Always-on niyom — Antigravity nije theke porbe |
| `.agents/skills/pk-00 … pk-14` | Protiti phase-er prompt — chat-e `/pk-00-plan` likhlei cholbe |
| `docs/SPEC.json` | Dam, rong, page, 64 district — agent eta follow korbe |
| `docs/PRD.docx` | Full plan (apnar reference) |
| `web/lib/pricing.ts` | Dam hisab-er code + 15ta test (pass kora) |

Perplexity Prompt Pack ar alada SPEC.json Antigravity-te **lagbe na** — kit-e already ache.

---

## 2. Install (ekbar)

| Tool | Keno | Kothay |
|---|---|---|
| Google Antigravity | AI IDE | antigravity.google |
| Node.js LTS | Next.js chalate | nodejs.org |
| Git | Version save | git-scm.com |
| GitHub account | Code backup (private repo) | github.com |
| Supabase account | Database | supabase.com (region: Singapore) |
| Vercel account | Live website | vercel.com |
| Flutter + Android Studio | Phase 12 theke | flutter.dev |

---

## 3. Setup (Phase 0)

1. Zip unzip korun, e.g. `Documents/paatkotha`.
2. Antigravity → **Open Folder** → `paatkotha`.
3. Antigravity-r terminal-e (Mac + Windows same):
   ```
   git init
   git add .
   git commit -m "starter kit"
   ```
4. GitHub-e **private** repo `paatkotha` banan, tarpor:
   ```
   git remote add origin https://github.com/<your-username>/paatkotha.git
   git branch -M main
   git push -u origin main
   ```
5. Check: Antigravity-r **Customizations** panel-e 3ta rule ar `pk-…` skill gulo dekha jacche? Chat-e `/` likhle `pk-00-plan` ashe?
6. Supabase-e project banan. Keys (URL, anon key, service role key) **nije** `web/.env.local` file-e boshaben (agent Phase 4-e bolbe kon nam). Ei file git-e jay na.

---

## 4. Antigravity use korar niyom

- **Ek phase = ek notun conversation.** Protibar notun chat khule `/pk-XX-…` likhun.
- Mode: **Planning** (Fast na). Agent age **Implementation Plan** dibe → porun → comment din ba "Approved" likhun.
- Terminal command auto-run setting: shurute **"Request review"** rakhun, jate agent kono command chalanor age apnake jiggesh kore.
- Protiti phase sheshe agent **Walkthrough** + screenshot dibe. Nije o `npm run dev` chaliye `http://localhost:3000` dekhun.
- Bhalo hole commit:
  ```
  git add .
  git commit -m "phase X done"
  git push
  ```
- Bhul hole: `/pk-fix` likhe shomossha bolun. Din sheshe `/pk-checkpoint`.
- Password/API key **chat-e diben na** — shudhu `.env.local` ba Vercel settings-e.

---

## 5. Phase list

| Phase | Chat-e likhun | Shomoy (anuman) |
|---|---|---|
| Plan | `/pk-00-plan` | ½ din |
| Design system | `/pk-01-foundation` | 1–2 din |
| Home | `/pk-02-home` | 1 din |
| Shop + product | `/pk-03-shop` | 1–2 din |
| Database + checkout (COD) | `/pk-04-checkout` | 2–3 din |
| B2B | `/pk-05-b2b` | 1–2 din |
| Admin | `/pk-06-admin` | 2–3 din |
| SSLCommerz + SMS | `/pk-07-payments` | 2 din |
| Bangla/EN, SEO, legal | `/pk-08-i18n-seo` | 1–2 din |
| QA + handoff | `/pk-09-qa-handoff` | 1–2 din |
| Go live | `/pk-10-go-live` | 1 din |
| Android app | `/pk-11-app-setup` → `/pk-12-app-screens` → `/pk-13-android-release` | 2–3 shoptaho + 14 din test |
| iOS | `/pk-14-ios-release` | 1–2 shoptaho |

---

## 6. Protiti phase-er test

### Phase 2 — Design system (`/pk-01-foundation`)
| Test | Kivabe | Thik hole |
|---|---|---|
| Rong | /styleguide page khulun | Green button, cream background, gold accent |
| Bangla font | Heading ar body dekhun | Bangla shundor, line gulo ghesha na |
| Mobile | Browser-e F12 → mobile view (360px), ba phone-e same WiFi-te `http://<PC-IP>:3000` | Niche bottom nav, upore hamburger |
| Pricing test | Terminal-e `cd web` tarpor `npm test` | Green tick (15 test pass) |

### Phase 3 — Home (`/pk-02-home`)
- Phone-e scroll kore dekhun: hero → category → bestseller → why jute → B2B banner.
- **Fake review thakle** bolun: *"Remove all fake reviews, show empty state."*

### Phase 4 — Shop & product (`/pk-03-shop`)
| Test | Thik hole |
|---|---|
| Tote 2ta cart-e | Mini-cart-e "২ × ৳৪৫০ = ৳৯০০" |
| Basket size S/M/L | Dam 450/650/850 bodlay |
| Filter mobile-e | Niche theke sheet khule |

### Phase 5 — Cart + checkout COD (`/pk-04-checkout`)
Ei 5ta order kore dekhun — total **exactly** mile jete hobe:

| # | Cart | Zone | Total |
|---|---|---|---|
| T1 | 1 Tote | Dhaka city | **৳520** |
| T2 | 2 Tote + Basket M | Dhaka city | **৳1,620** |
| T5 | T2 + coupon JUTE10 | Dhaka city | **৳1,465** |
| T3 | 3 Tote + Rug 2×3 | Dhaka city | **৳2,550** (free delivery) |
| T4 | 1 Cushion cover | Dhakar baire | **৳480** |

- District dropdown-e 64ta district ache? Gazipur dile delivery ৳100 hoy?
- Order dile "অপেক্ষমাণ" status + /track page-e dekha jay?

### Phase 6 — B2B (`/pk-05-b2b`)
| Qty | Logo | Expected |
|---|---|---|
| 40 | — | "সর্বনিম্ন অর্ডার ৫০ পিস" |
| 100 | na | ৳18,000 · advance ৳9,000 |
| 300 | ha | ৳57,000 · advance ৳28,500 |
| 195 | na | Nudge: "আর ৫টি যোগ করলে প্রতি পিস ৳১৬০" |

### Phase 7 — Admin (`/pk-06-admin`)
- Admin-e Tote-er dam 500 korun → site-e 500 dekhay? Purono order-e 450-i ache? Tarpor 450-e ferot din.
- Settings-e free delivery 3000 korun → T3 cart ekhon ৳70 delivery ney? Ferot 2500.
- Packer account diye login → shudhu packing queue dekhe, settings dekhe na.

### Phase 8 — Payment + SMS (`/pk-07-payments`)
- SSLCommerz **sandbox**-e success / fail / cancel — shudhu success hole order "কনফার্মড".
- Checkout-e shudhu 2ta option: **ক্যাশ অন ডেলিভারি** ar **বিকাশ / নগদ / রকেট / কার্ড**.
- Nijer number-e SMS ashe?

### Phase 9 — Language, SEO (`/pk-08-i18n-seo`)
- বাংলা | EN toggle — sob text bodlay? Bangla-te dam "৳৪৫০", English-e "৳450".
- Legal page-e ⟨PLACEHOLDER⟩ ache — asol phone/address/trade licence boshate bolun.

### Phase 10 — QA (`/pk-09-qa-handoff`)
- docs/QA-REPORT.md-e sob "PASS" ache? Na thakle fix korte bolun.


---

## 7. Live kora (Vercel)

1. Code GitHub-e push kora thakte hobe.
2. vercel.com → Add New Project → `paatkotha` repo → **Root Directory: `web`** → Deploy.
3. Vercel → Settings → Environment Variables: `.env.example`-er sob nam, value nije boshan (Supabase, SSLCommerz, SMS…). Tarpor **Redeploy**.
4. Domain: Vercel → Domains → add → DNS record domain seller-er panel-e.
5. Antigravity-te `/pk-10-go-live` — agent checklist dhore verify korbe.
6. ৳10 real payment + refund, 10 jon bondhu diye real order.

---

## 8. Mobile app

- Flutter + Android Studio install korun; `flutter doctor` sob green kina dekhun.
- `/pk-11-app-setup` → emulator-e app chalabe (dev flavor → local ba live API).
- Firebase `google-services.json` nije download kore `app/android/app/`-e rakhun (git-ignored).
- Keystore nije banan (agent command dibe), 2 jaygay backup. Harale app update kora jabe na.
- Play Console personal account: 12 tester × 14 din closed test.
- iOS: Mac na thakle Codemagic (`/pk-14-ios-release`).

---

## 9. Troubleshooting

| Shomossha | Shomadhan |
|---|---|
| `/pk-…` skill dekhay na | Folder-er root-e `.agents/skills` ache kina check (hidden folder — Mac-e Cmd+Shift+. , Windows-e View → Hidden items); Antigravity restart |
| `npm` / `node` not found | Node.js LTS install kore Antigravity restart |
| Agent onek boro change korche | Plan-e comment din: "Only do step 1–3 now" |
| Dam bhul | `/pk-fix` + "Run web/lib/pricing.test.ts and show /api/v1/cart/quote output for: …" |
| Supabase error | `web/.env.local` key check; dev server restart |
| Bangla bhanga | "Use Hind Siliguri via next/font, line-height 1.6, no letter-spacing on Bangla." |
| Quota/limit shesh | Kichukkhon opekkha; ba choto task e bhag korun |
| Workflow deprecate warning | Kit already **Skills** use kore (Workflows Nov 2026-e bondho hocche) — kichu korte hobe na |

---

## 10. Apnar nijer kaj (same as before)

Trade licence, TIN, bank · SSLCommerz apply · brand name + logo + domain · supplier costing → asol dam · product photo · courier + SMS account · 12 Android tester · protiti phase test + approve.
