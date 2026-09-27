---
name: pk-09-qa-handoff
description: PaatKotha PROMPT 9 — QA + handoff. Use only when the owner types /pk-09-qa-handoff.
---

Phase 9. Run SPEC.qa_checklist and PRD §19 QA1–QA14. Produce docs/QA-REPORT.md with a pass/fail table and screenshots (360/768/1280, bn/en).
Fix all failures. Then write docs/HANDOFF.md (how to run locally, env vars, deploy, how to add products, how staff process orders, backup/restore) and docs/API.md (every /api/v1 endpoint with request/response JSON for the Flutter developer).
Tag release v1.0.0.

Workflow: Planning mode → implementation plan → wait for approval → build → run tests → browser-agent check (360/768/1280, bn+en) → walkthrough → update docs/CHANGELOG.md + docs/DECISIONS.md → give me the git commit command.
