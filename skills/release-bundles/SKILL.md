---
name: release-bundles
description: "Assess mobile-store release readiness with evidence gates for builds, quality, metadata, safety, commerce, access, and submission. Use when an App Store or Google Play release, TestFlight/Play track, release metadata, privacy/rating declaration, subscription, or submission automation needs a verdict."
---

# Release Bundles

Assess one release-risk mode at a time; Apple and Android are evidence inputs, not separate runtime targets.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `production-overview` | The user needs an overall ready/not-ready release verdict or blocker triage | `references/production-overview.md` |
| `binary-build` | A release artifact, signing, version, native capability, or update-compatibility boundary needs evidence | `references/binary-build.md` |
| `testing-quality` | Beta/track evidence, crashes, ANRs, regressions, rollout, monitoring, pause, or rollback needs review | `references/testing-quality.md` |
| `metadata` | Store copy, screenshots, localization, links, claims, or release notes need a release review | `references/metadata.md` |
| `privacy-safety-permissions` | Data declarations, permissions, AI/UGC controls, consent, deletion, or moderation need evidence | `references/privacy-safety-permissions.md` |
| `subscriptions-commerce` | Digital goods, subscriptions, entitlement recovery, paywall terms, catalog consistency, or reviewer access needs review | `references/subscriptions-commerce.md` |
| `accessibility-rating-regulated` | Accessibility, age/audience rating, minors, restricted APIs, or regulated-category evidence needs review | `references/accessibility-rating-regulated.md` |
| `submission-automation` | Reviewer access, submission packet, release forms, CLI/portal automation, or mutation approval needs a plan | `references/submission-automation.md` |

Select exactly one mode and read only its reference. Start with `production-overview` for a broad readiness request; run another mode only for a named blocker or an explicit review sequence.

## Platform input

State Apple, Android, or both before assessing a mode. When the evidence or result differs by store, keep separate rows and never let one platform's evidence stand in for the other.

## Precedence

Use the project's build and release instructions for implementation. This skill owns store-readiness evidence. Use `local-dev` for credential ownership and `code-quality` for source diagnosis.

## Workflow

1. Inspect the repository release configuration, current artifact/version evidence, declared data/permission behavior, and known release state.
2. Select one mode and its platform input. For volatile facts, inspect repository state first, then live store or tool status/help, then current primary documentation.
3. Classify each finding as blocker, launch-quality risk, operational/manual verification, or not applicable; record evidence, owner, and verification.
4. Return a verdict without mutating release state. Treat automation and submission as a separate approved action.

## Hard rules

- Do not claim approval or readiness without current evidence; say unknown when a required fact is absent.
- Keep current portal policy, store forms, CLI flags, pricing, and rollout limits out of this suite; discover them live.
- Do not submit, publish, promote, price, delete, or change public metadata without explicit user confirmation after readiness gates pass.
- Preserve manual verification and legal/product ownership when API or automation evidence cannot prove a release condition.
- Never expose credential values in release evidence or reviewer-access material.

## Stop conditions

- Ask for direction when Apple and Android require materially different release decisions or the requested platform is unknown.
- Stop automation planning when a blocker lacks a verified owner, evidence, or safe verification path.

## Output

Return platform scope, selected mode, verdict, prioritized findings with evidence/owner/verification, current-source checks, next safe action, and any approval or manual gate.
