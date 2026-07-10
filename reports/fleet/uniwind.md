# Fleet acceptance — uniwind

## Verdict

**PACKAGE-CONFORMS.** Uniwind remains a distinct leaf because it is the pack's highest-observed direct trigger (32 invocations) and has a narrow, recurring configuration/styling boundary. API detail is deliberately delegated to installed package evidence, the Uniwind MCP when available, and current primary documentation.

## Result

- Canonical home: `shared/general/uniwind`
- Archetype: leaf.
- Final package: 48 text lines / 3,418 bytes; active body: 36 lines / 2,204 bytes.
- Replaced pre-rewrite package: 2,025 text lines; net shrink: 1,977 lines.
- NativeWind-to-Uniwind migration is intentionally not a Uniwind trigger: it belongs to `product-platform` → `uniwind-migration`.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator / precedence |
| --- | --- | --- | --- |
| Uniwind Metro/CSS setup, scanner/source path, className resolution | `uniwind` | `product-platform` → `mobile` | Current Uniwind configuration and style resolution belong to this leaf; mobile owns device/platform behavior. |
| Uniwind theme token, scoped theme, non-style color prop, third-party binding | `uniwind` | `design-family` | Uniwind owns installed styling binding/config contracts; `design-family` owns visual intent and interface direction. |
| NativeWind-to-Uniwind replacement | `product-platform` → `uniwind-migration` | `uniwind` | Migration removes compatibility/configuration layers before ordinary Uniwind work resumes. |
| Generic rendering/source failure without a Uniwind artifact | `code-quality` | `uniwind` | `code-quality` wins unless configuration, scanner, token, class, binding, or style resolution is concrete. |
| Browser-extension UI styling | `chrome-extension-builder` | `uniwind` | Extension runtime styling follows the extension surface contract; do not assume RN components or Uniwind APIs apply. |

## A34 preservation ledger

| Replaced source content | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| old `uniwind` entrypoint | Narrow Uniwind selection and config/style diagnostic output | Kept in `SKILL.md` workflow, precedence, and output. |
| setup and troubleshooting references | Inspect configuration/CSS entry/scanner/generated output before changing component code | Kept in `references/house-conventions.md`. |
| dynamic classname reference | Static scanner-visible utilities; use a repository composition convention rather than arbitrary interpolated class fragments | Kept in `SKILL.md` and `references/house-conventions.md`. |
| theming and safe-area references | Semantic, complete token coverage; scoped divergence only when required | Kept in `SKILL.md` and `references/house-conventions.md`. |
| classnames, component bindings, accent-color references | Bind third-party props deliberately and treat non-style color props as a separate contract | Kept in `SKILL.md` and `references/house-conventions.md`. |
| Pro, animation, integration, CSS-utility, API, and component tables | Version-sensitive APIs, pricing/licensing, component prop matrices, and tutorial material | Dropped under volatility/existence policy; consult installed package, Uniwind MCP, or primary docs. |

## A35 archive inventory

| Original | Archive path | Archived text lines |
| --- | --- | ---: |
| `uniwind` | `archive/triage-2026-07/shared/general/uniwind` | 2,025 |

The original support tree also remains preserved under `archive/triage-2026-07/shared/general/uniwind-pruned-references/`; the canonical archive path above is the exact full pre-rewrite package required by A35.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The delta is a specific Uniwind config/scanner/token/binding policy, not generic React Native styling advice. |
| A02 | PASS | Transcript evidence records 32 direct invocations, and this narrow boundary recurs independently of migration work. |
| A03 | PASS | Collision matrix separates current Uniwind work from migration, mobile platform, design intent, browser extension, and generic diagnosis. |
| A04 | PASS | Exactly one leaf. |
| A05 | PASS | Canonical directory and unique `name: uniwind` match; validator confirms uniqueness. |
| A06 | PASS | Frontmatter contains only name and one-line description. |
| A07 | PASS | The two-sentence description is one physical line and 198 bytes, below the 220-character leaf cap. |
| A08 | PASS | Description states Uniwind's differentiated policy and ends with five concrete configuration/styling signals. |
| A09 | PASS | Collision matrix assigns a first owner for setup, binding, migration, generic diagnosis, and extension UI work. |
| A10 | PASS | NativeWind migration and generic styling claims are excluded; no implicit interaction mode remains. |
| A11 | PASS | `SKILL.md` is 36 lines / 2,204 bytes and validator passes leaf limits. |
| A12 | PASS | Active body contains only workflow, non-default rules, precedence, stops, and output. |
| A13 | PASS | The single explicit reference has a selection condition and is the only deferred material. |
| A14 | PASS | Reference is 12 lines and package is 48 lines / 3,418 bytes, below hard caps. |
| A15 | DEFERRED | Bundle/provider copies and exposure are outside the permitted scope. |
| A16 | N/A | This package has no modes. |
| A17 | N/A | This package has no mode table. |
| A18 | N/A | This package is not a router. |
| A19 | N/A | This package is not a router. |
| A20 | PASS | Workflow requires installed configuration, then Uniwind MCP/live/current primary docs for version-sensitive APIs. |
| A21 | PASS | API tables, Pro pricing, component matrices, installation recipes, and tutorial content were removed. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential-shaped content exists. |
| A24 | PASS | No secret discovery or value-reporting workflow exists. |
| A25 | PASS | No literal user-home path appears; validator portability check passes. |
| A26 | PASS | Configuration/API disagreement stops a claim rather than permitting a guess. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Static scanner visibility, explicit theme coverage, third-party binding, and config-first diagnosis are concrete durable rules. |
| A30 | DEFERRED | Canonical/bundle/provider parity awaits the explicitly deferred composition phase. |
| A31 | DEFERRED | Local reference and no-internal-symlink checks pass; compose and installed-view checks await composition. |
| A32 | PASS | Rechecked against accepted pilot artifacts `reports/pilot/herdr.md` (compact leaf with non-inferable local conventions) and `reports/pilot/code-quality.md` (selected-reference discipline); volatile API detail remains deferred. |
| A33 | PASS | 48 is strictly smaller than 2,025 and below every absolute cap. |
| A34 | PASS | The preservation ledger classifies every qualifying source-family delta and each deliberate volatility cut. |
| A35 | PASS | Exact pre-rewrite package is retained at the required archive path. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/uniwind leaf
PASS: shared/general/uniwind (leaf)
```
