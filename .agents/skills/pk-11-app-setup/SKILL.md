---
name: pk-11-app-setup
description: PaatKotha PROMPT 11 — Flutter foundation. Use only when the owner types /pk-11-app-setup.
---

Create the Flutter app in /app of the same repo. Read docs/API.md and SPEC.brand.
Packages: flutter_riverpod, go_router, dio (auth + refresh interceptor), freezed + json_serializable, flutter_secure_storage,
firebase_core, firebase_messaging, firebase_crashlytics, cached_network_image, intl + ARB (bn default, en).
Flavors dev/prod (API base URL per flavor). Theme from brand tokens; Hind Siliguri/Noto Serif Bengali fonts.
Shared widgets matching the website components. The app NEVER calculates final prices — always POST /api/v1/cart/quote.
Run on an Android emulator and send screenshots.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
