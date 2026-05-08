---
name: product-platform
description: >-
  Router for product/platform skills. Covers: building-native-ui, expo-platform
  (SDK upgrades, API routes, dev clients, EAS workflows, deployment, DOM
  components), react-native-platform, uniwind, mobile-rn, opentui,
  migrate-nativewind-to-uniwind, native-data-fetching, chrome-extension-builder,
  design-family, and local-dev.
---

# Product Platform

Use this as the small entrypoint for product and app-platform work.

## Rule

Do not load every product/platform skill. Identify the surface first, then read
only the matching target skill from `references/skill-map.md`.

## Routing

1. Identify the surface:
   - Expo or React Native app
   - Uniwind or mobile styling
   - browser extension
   - terminal UI
   - API/data fetching
   - product platform setup
2. Read `references/skill-map.md`.
3. Load only the listed detailed skill files that match the active surface.
4. Combine with `local-dev`, `local-secrets`, or `smolvm-local-dev` only when
   the task touches local runtime, secrets, or isolation.

## Defaults

- New repos default private and GitLab CI/CD-aware.
- Prefer worktrees for parallel work.
- Prefer isolated VM setup when installing or evaluating risky tooling.
- Keep product stack guidance scoped to the current surface.
