---
name: release-bundles
description: >-
  Router for mobile release skills. Covers: apple-production-checklist,
  apple-build-binary-readiness, apple-testflight-release-readiness,
  apple-metadata-storefront-readiness, apple-iap-subscription-readiness,
  apple-ai-privacy-safety-readiness, apple-accessibility-age-rating-readiness,
  apple-submission-packet-readiness, apple-asc-cli-automation-bridge,
  android-play-production-checklist, android-expo-eas-build-binary-readiness,
  android-play-quality-prelaunch-readiness,
  android-play-store-listing-metadata-readiness,
  android-play-data-safety-permissions-readiness,
  android-play-iap-subscriptions-readiness, android-play-ai-ugc-safety-readiness,
  android-play-accessibility-age-rating-readiness,
  android-play-testing-track-readiness, android-play-submission-packet-readiness,
  android-play-console-eas-automation-bridge, and
  android-play-sensitive-category-readiness.
---

# Release Bundles

Use this as the small entrypoint for mobile release readiness.

## Rule

Select the platform and release risk, then read only the matching section in
`references/skill-map.md`. Do not load the full Apple and Android checklist set
unless the user asks for a complete release audit.

## Routing

1. Identify platform: Apple, Android, or both.
2. Identify surface: binary, metadata, privacy, subscriptions, testing, or
   submission packet.
3. Read the matching skill path from `references/skill-map.md`.
4. For Expo/EAS commands, route through `product-platform` if build workflow
   context is needed.

## Defaults

- Use current store rules and current CLI output as source of truth.
- Keep release checks evidence-driven.
- Keep app secrets under `local-secrets`.
