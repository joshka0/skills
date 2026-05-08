---
name: expo-platform
description: Expo SDK platform skills — SDK upgrades, DOM components, API routes, dev clients, EAS workflows, and deployment. Use when upgrading Expo, using DOM components, creating API routes, building dev clients, writing EAS workflow YAML, or deploying to stores.
args:
  - name: mode
    description: upgrade | dom | api-routes | dev-client | cicd | deploy
    required: true
---

# expo-platform

Expo SDK platform skill. Load the matching reference for the requested mode.

## Modes

| Mode | Topic | Reference |
| ---- | ----- | --------- |
| `upgrade` | SDK upgrade workflow, deprecated packages, cache/prebuild | `references/upgrade-process.md` |
| `dom` | DOM components (WebView-based web React in native) | `references/dom-components.md` |
| `api-routes` | API routes with Expo Router and EAS Hosting | `references/api-routes.md` |
| `dev-client` | Build and distribute development clients | `references/dev-client.md` |
| `cicd` | EAS workflow YAML files | `references/cicd-workflows.md` |
| `deploy` | Deploy to iOS App Store, Android Play Store, web hosting | `references/deployment.md` |

## Hard Rules

- For SDK-version-specific facts, verify against official Expo docs before editing code.
- Do not run `npx expo prebuild` unless native changes require it.
- Keep DOM islands small; pass only serializable props.
- Keep navigation chrome native; do not route through DOM components.

## Output

Report: **mode**, **target**, **changes made**, and **verification steps** completed.
