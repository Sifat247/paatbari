# PaatKotha (পাটকথা) — Starter Kit

Jute products e-commerce for Bangladesh (B2C + B2B). Built with Google Antigravity (AI agent) on your computer; owned by you.

| Folder | What |
|---|---|
| `.agents/rules/` | Always-on rules for the Antigravity agent |
| `.agents/skills/pk-*` | One skill per phase — type `/pk-00-plan`, `/pk-01-foundation` … |
| `docs/SPEC.json` | Single source of truth: brand tokens, prices, pages, data, 64 districts, tests |
| `docs/PRD.docx` | Full PRD + market analysis |
| `docs/PLAYBOOK.md` | Antigravity step-by-step guide (Banglish) |
| `docs/DECISIONS.md`, `docs/CHANGELOG.md` | Keep updated every phase |
| `web/lib/pricing.ts` + `.test.ts` | Reference pricing engine + 15 passing tests (Vitest) |
| `design/brand/tokens.css` | Brand colours/fonts as CSS variables |
| `supabase/`, `app/` | Filled by the agent in Phase 4 / Phase 12 |

Start: read `docs/PLAYBOOK.md` → in Antigravity type `/pk-00-plan`.
Never commit secrets (.env, keystores, google-services.json) — see `.gitignore`.
