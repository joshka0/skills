---
name: release-bundles
description: "Route Apple App Store and Android Google Play release work to maintained checklist bodies. Use when a task names TestFlight, a Play testing track, store submission, release metadata, or release automation."
---

# Release Bundles

Select one proven platform checklist body for a mobile release risk.

## Route

1. Identify Apple, Android, or both.
2. Identify one surface: binary, testing, metadata, privacy/safety, subscriptions, accessibility/age rating, submission, automation, or a regulated category.
3. Read only the matching target in `references/skill-map.md`. Its paths are repo-relative imported bodies under `mirrors/foxctl/external`.
4. For Expo/EAS workflow context, hand off to `product-platform` only when the build workflow—not store release readiness—is the open decision.

## Shared workflow

1. Resolve version-sensitive store rules from repository configuration, then live store or CLI output, then current primary documentation.
2. Keep release findings evidence-driven and tied to the selected target.
3. Mark uncertainty rather than guessing when current sources are unavailable.

## Hard rules

- Do not substitute a neighboring checklist when the requested platform/risk target is absent.
- Do not copy volatile store rules or checklist content into this router.
- Keep app-secret handling under `local-secrets`; never include values in release evidence.

## Stop conditions

- Stop and report the missing target when the map cannot resolve one exact platform/risk body.
- Ask for direction when Apple and Android release decisions require different target bodies and the user did not request both.

## Output

Return the selected target, release evidence, current-source checks, and any missing-target or cross-family handoff.
