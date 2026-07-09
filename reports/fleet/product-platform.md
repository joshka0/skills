# Fleet acceptance — product-platform

## Verdict

**PACKAGE-CONFORMS.** The product router now selects five substantial, one-hop platform surfaces. Native data fetching is cut; browser extension work hands directly to the retained `chrome-extension-builder` leaf, whose separate acceptance report is [chrome-extension-builder.md](chrome-extension-builder.md).

## Result

- Canonical home: `shared/general/product-platform`
- Archetype: router with `mobile`, `expo-platform`, `uniwind-migration`, `terminal-ui`, and `browser-extension`.
- Final package: 92 text lines / 7,134 bytes; active body: 47 lines / 3,022 bytes.
- Replaced router-owned source total: 13,991 text lines across `product-platform`, `building-native-ui`, `expo-platform`, `react-native-platform`, `migrate-nativewind-to-uniwind`, `native-data-fetching`, `mobile-rn`, and `opentui`; net shrink: 13,899 lines.
- Retained child: `chrome-extension-builder` is separately trimmed and validated; its original is archived and it is not counted as a router replacement.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- |
| Expo/RN screen, native dependency, safe area, device behavior | `product-platform` → `mobile` | `design-family` | Mobile owns native runtime/device boundaries; hand interface intent and visual direction to `design-family`. |
| Expo SDK, dev client, DOM island, EAS workflow, deployment | `product-platform` → `expo-platform` | `local-dev` | Installed Expo/platform contract is the artifact; local runtime setup without platform change belongs to `local-dev`. |
| NativeWind-to-Uniwind migration | `product-platform` → `uniwind-migration` | `uniwind` | This router owns the compatibility/removal migration; standalone Uniwind owns current setup, token, class, and binding decisions afterward. |
| OpenTUI renderer, keyboard flow, terminal cleanup | `product-platform` → `terminal-ui` | `design-family` | Terminal lifecycle and keyboard-first behavior win; generic visual design remains with `design-family`. |
| Browser extension service worker, content script, permission, storage, message | `chrome-extension-builder` via `product-platform` → `browser-extension` | `code-quality` | The router only dispatches; the leaf owns MV3/security/surface contracts. Generic source diagnosis stays with `code-quality`. |
| Generic API/data fetching | `code-quality` or the repository's existing data owner | former `native-data-fetching` | No product-platform route: the former skill was a greedy tutorial/API catalog and is CUT. |

## Native-data-fetching disposition

**CUT.** `native-data-fetching` claimed every network request, duplicated generic fetch/cache/auth guidance, and embedded version-sensitive Expo Router loader and library manuals. It has no remaining separable house invariant; use the repository's existing data boundary and `code-quality` for generic diagnosis. Its exact original is preserved at `archive/triage-2026-07/shared/general/native-data-fetching/`.

## A34 preservation ledger

| Replaced or touched source | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| old `product-platform` router | Product-surface selection and one-target-at-a-time loading | Kept as five-target route table and shared router workflow. |
| `building-native-ui` | Start with the supported runtime before native-build churn; navigation/scroll owns safe area; native UI stays out of web-shaped elements | Kept in `references/mobile.md`; SDK/API tutorials and aesthetic catalogs dropped. |
| `react-native-platform` | Native dependencies belong in the autolinking app; text/runtime hard boundaries; dynamic list and device verification evidence | Kept in `references/mobile.md`; static component/performance rules dropped under installed-version policy. |
| `mobile-rn` | Thumb/input/dynamic-type/device-feel boundary, explicit keyboard/safe-area behavior, platform validation | Merged into `references/mobile.md`; Uniwind Pro and per-platform UI catalogs defer to installed package/current docs. |
| `expo-platform` | Installed SDK/config evidence, prebuild/dev-client boundary, small serializable DOM islands, current delivery contract | Kept in `references/expo-platform.md`; EAS/store/API route manuals dropped as volatile. |
| `migrate-nativewind-to-uniwind` | Full configuration/import/theme/compatibility inventory, deliberate removal of interop layer, final stale-reference sweep | Kept in `references/uniwind-migration.md`; API/command/rename matrix drops to installed package and current migration docs. |
| `opentui` | Keyboard-first and visible-focus interaction; renderer restoration; stdout separation; constrained-terminal recovery/verification | Kept in `references/terminal-ui.md`; component and terminal API tutorials dropped. |
| `native-data-fetching` | Generic fetch/cache/auth/offline tutorial and version-specific loader manual | CUT: fails non-default-delta and trigger-separability gates; archive retained. |
| `chrome-extension-builder` | MV3-safe persistence, schema-validated messages, hostile-page isolation, narrow permission/security boundary | Retained as direct child at `shared/general/chrome-extension-builder`; full ledger and validation are in `reports/fleet/chrome-extension-builder.md`. |
| standalone `uniwind` | Current styling/configuration convention after migration | Remains a separate leaf; its boundary and ledger are in `reports/fleet/uniwind.md`. |

## A35 archive inventory

| Original | Archive path | Archived text lines |
| --- | --- | ---: |
| `product-platform` | `archive/triage-2026-07/shared/general/product-platform` | 74 |
| `building-native-ui` | `archive/triage-2026-07/shared/general/building-native-ui` | 3,857 |
| `expo-platform` | `archive/triage-2026-07/shared/general/expo-platform` | 1,040 |
| `react-native-platform` | `archive/triage-2026-07/shared/general/react-native-platform` | 5,405 |
| `migrate-nativewind-to-uniwind` | `archive/triage-2026-07/shared/general/migrate-nativewind-to-uniwind` | 725 |
| `native-data-fetching` | `archive/triage-2026-07/shared/general/native-data-fetching` | 848 |
| `mobile-rn` | `archive/triage-2026-07/shared/codex/mobile-rn` | 1,041 |
| `opentui` | `archive/triage-2026-07/shared/codex/opentui` | 1,001 |
| `chrome-extension-builder` | `archive/triage-2026-07/shared/general/chrome-extension-builder` | 743 |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The delta is a one-hop product-platform ownership router, not a broad mobile or framework tutorial. |
| A02 | PASS | The approved consolidation keeps recurring native, Expo, migration, terminal, and extension decision surfaces selectable without sibling sprawl. |
| A03 | PASS | The collision matrix assigns first owners and explicit handoffs for all five targets and the cut data-fetching surface. |
| A04 | PASS | Exactly one router. |
| A05 | PASS | Canonical directory and unique `name: product-platform` match; validator confirms uniqueness. |
| A06 | PASS | Frontmatter is minimal: name and one-line description only. |
| A07 | PASS | The two-sentence description is one physical line and 235 bytes, below the 320-character router cap. |
| A08 | PASS | Description names all five actual target names and ends with concrete platform signals. |
| A09 | PASS | Collision matrix preserves absorbed legacy surfaces and separates standalone Uniwind and the browser-extension child. |
| A10 | PASS | No generic data-fetching claim, greedy trigger, or implicit interaction mode remains. |
| A11 | PASS | Active router is 47 lines / 3,022 bytes; validator passes router limits. |
| A12 | PASS | Active body contains only route selection, precedence, shared workflow, non-default safety, stops, and output. |
| A13 | PASS | Four targets resolve in one hop to selected local references and browser extension resolves directly to the named leaf. |
| A14 | PASS | References are 9–11 lines; full router package is 92 lines / 7,134 bytes, below package caps. |
| A15 | DEFERRED | Bundle/provider exposure and router/child duplication are outside this no-composition scope. |
| A16 | N/A | This package is a router, not a suite. |
| A17 | N/A | This package is a router, not a suite. |
| A18 | PASS | Five substantial platform targets fit the three-to-eight router rule and selective loading materially reduces context. |
| A19 | DEFERRED | One-hop resolution is verified locally; default-overlay router/child exposure awaits composition. |
| A20 | PASS | Workflow requires local config, live help/status, then primary docs for volatile platform behavior. |
| A21 | PASS | SDK/store/API, component, UI, and data-fetching manuals were removed rather than copied into references. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential-shaped content exists. |
| A24 | PASS | No secret discovery/reporting workflow exists; unavailable credentialed services block validation. |
| A25 | PASS | No literal user-home path appears; validator portability check passes. |
| A26 | PASS | Unavailable device/toolchain/configuration evidence blocks platform claims rather than permitting guesses. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Native-build, device boundary, migration, terminal restoration, and permission rules are concrete and proportionate. |
| A30 | DEFERRED | Canonical/bundle/provider parity awaits the explicitly deferred composition phase. |
| A31 | DEFERRED | Local references and no-internal-symlink checks pass; compose and installed-view checks await composition. |
| A32 | PASS | Rewritten against the full rubric, Go suite golden package/report, and infra router pilot; rubric controls shape. |
| A33 | PASS | 92 is strictly smaller than the 13,991 router-owned source lines and below every absolute cap. |
| A34 | PASS | The ledger accounts for every product source, the CUT, and both retained boundaries. |
| A35 | PASS | Exact pre-rewrite originals, including the in-place router and retained child, are listed in the archive inventory. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/product-platform router
PASS: shared/general/product-platform (router)
```
