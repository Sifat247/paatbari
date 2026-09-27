---
name: pk-13-android-release
description: PaatKotha PROMPT 13 — Android release. Use only when the owner types /pk-13-android-release.
---

Prepare Google Play release: app icon + adaptive icon + splash in brand colours, applicationId com.paatkotha.app (PLACEHOLDER), versioning,
release signing config that reads from key.properties (I create and keep the keystore — never commit it), build AAB,
store listing text bn/en (short + full description), feature graphic spec, 8 screenshot scenes, Data safety answers, account deletion URL (/account/delete).
Write docs/PLAY-RELEASE.md with step-by-step instructions including the 12-testers × 14-days closed test.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
