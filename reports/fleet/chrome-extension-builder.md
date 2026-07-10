# Fleet acceptance — chrome-extension-builder

## Verdict

**PACKAGE-CONFORMS.** Chrome Extension Builder remains a separate leaf because MV3 worker lifecycle, cross-context privilege boundaries, hostile-page isolation, and extension permission exposure are a narrow, recurring security contract. `product-platform` routes to it directly and does not absorb its behavior.

## Result

- Canonical home: `shared/general/chrome-extension-builder`
- Archetype: leaf.
- Final package: 45 text lines / 3,500 bytes; active body: 33 lines / 2,151 bytes.
- Replaced pre-rewrite package: 743 text lines; net shrink: 698 lines.
- Router relationship: `product-platform` → `browser-extension` hands directly to this leaf; no router chain is introduced.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator / precedence |
| --- | --- | --- | --- |
| MV3 service worker, content script, popup/sidepanel surface | `chrome-extension-builder` | `product-platform` | Router dispatches this request; the leaf owns actual extension lifecycle and surface design. |
| Extension storage, worker restart, message schema | `chrome-extension-builder` | `code-quality` | Cross-context privilege/persistence contract is extension-specific; generic source diagnosis stays with `code-quality`. |
| Manifest/host permission, remote code, hostile page bridge | `chrome-extension-builder` | `local-secrets` | Extension exposure and page privilege boundary belong here; local secret storage/hygiene stays with `local-secrets`. |
| Effect service/layer design outside an extension surface | `effect-framework` | `chrome-extension-builder` | Effect framework policy wins when an extension boundary is not concrete. |
| Generic browser UI design without extension lifecycle/security | `design-family` | `chrome-extension-builder` | Design intent remains with `design-family`; this leaf owns isolated extension surfaces and permissions. |

## A34 preservation ledger

| Replaced source content | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| old `chrome-extension-builder` entrypoint | Cross-browser extension selection and explicit product-engineering handoff | Kept in `SKILL.md` workflow and selected reference. |
| platform/surface model | Isolated extension apps sharing a core; MV3 worker is ephemeral and should orchestrate rather than own durable state | Kept in `SKILL.md` rules and `references/product-engineering.md`. |
| architecture/message sections | Browser APIs behind adapters, one JSON-safe schema-validated boundary, privileged ingress validation | Kept in `SKILL.md` and `references/product-engineering.md`; API code samples dropped. |
| UI/content sections | Host-page isolation, removable/idempotent injected UI, styling containment, no page privilege leak | Kept in both active rules and reference. |
| storage/worker sections | Explicit state tier, migration/recovery, small settings versus heavy cache/account authority | Kept in `references/product-engineering.md`; storage/API quotas and vendor selections dropped as volatile. |
| cross-browser/security sections | Narrow permissions, no remote executable code/secrets, hostile-page sanitization, capability evidence per browser | Kept in `SKILL.md` and reference. |
| default stack, package list, InstantDB/auth options, framework/API manuals | Version-sensitive stack/pinning and copied platform documentation | Dropped under volatility policy; resolve from installed project, live platform evidence, and primary docs. |

## A35 archive inventory

| Original | Archive path | Archived text lines |
| --- | --- | ---: |
| `chrome-extension-builder` | `archive/triage-2026-07/shared/general/chrome-extension-builder` | 743 |

The original 651-line support reference also remains under `archive/triage-2026-07/shared/general/chrome-extension-builder-pruned-references/`; the canonical archive path above is the exact full pre-rewrite package required by A35.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The delta is a security/lifecycle policy for MV3 extensions, not generic web or React advice. |
| A02 | PASS | Browser extensions recur as a distinct product surface and the narrow contract has a separate, concrete trigger. |
| A03 | PASS | Collision matrix separates router dispatch, generic diagnosis, secret hygiene, Effect architecture, and visual design. |
| A04 | PASS | Exactly one leaf. |
| A05 | PASS | Canonical directory and unique `name: chrome-extension-builder` match; validator confirms uniqueness. |
| A06 | PASS | Frontmatter contains only name and one-line description. |
| A07 | PASS | The two-sentence description is one physical line and 211 bytes, below the 220-character leaf cap. |
| A08 | PASS | Description states extension boundary capability and ends with five concrete surface/artifact signals. |
| A09 | PASS | Collision matrix gives one first owner for extension, generic, security, Effect, and design requests. |
| A10 | PASS | No stack-wide web claim, greedy trigger, or implicit interaction behavior remains. |
| A11 | PASS | `SKILL.md` is 33 lines / 2,151 bytes and validator passes leaf limits. |
| A12 | PASS | Active body contains only shared workflow, security/lifecycle rules, stops, output, and one selected reference. |
| A13 | PASS | The reference is explicitly selected only for cross-surface/storage/message/hostile-page detail. |
| A14 | PASS | Reference is 10 lines and package is 45 lines / 3,500 bytes, below hard caps. |
| A15 | DEFERRED | Bundle/provider copies and router/child exposure are outside the permitted scope. |
| A16 | N/A | This package has no modes. |
| A17 | N/A | This package has no mode table. |
| A18 | N/A | This package is not a router. |
| A19 | N/A | This package is not a router. |
| A20 | PASS | Workflow requires manifest/installed framework/target-browser evidence, then live platform documentation for volatile facts. |
| A21 | PASS | Stack pins, package lists, API samples, storage quotas, auth options, and manuals were removed. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential-shaped content exists; active rules prohibit secrets in extension source. |
| A24 | PASS | The workflow validates input and reports security risk without secret discovery or value output. |
| A25 | PASS | No literal user-home path appears; validator portability check passes. |
| A26 | PASS | Missing target-browser/lifecycle evidence blocks validation rather than allowing a compatibility guess. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | MV3 persistence, privileged message validation, hostile-page isolation, and least-privilege rules are concrete security invariants. |
| A30 | DEFERRED | Canonical/bundle/provider parity awaits the explicitly deferred composition phase. |
| A31 | DEFERRED | Local reference and no-internal-symlink checks pass; compose and installed-view checks await composition. |
| A32 | PASS | Rechecked against the accepted pilot artifacts `reports/pilot/herdr.md` (compact safety-first leaf) and `reports/pilot/code-quality.md` (selected-reference routing); the leaf keeps MV3/privilege invariants active and defers volatile platform detail. |
| A33 | PASS | 45 is strictly smaller than 743 and below every absolute cap. |
| A34 | PASS | The preservation ledger classifies each qualifying extension safety boundary and deliberate volatility cut. |
| A35 | PASS | Exact pre-rewrite package is retained at the required archive path. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/chrome-extension-builder leaf
PASS: shared/general/chrome-extension-builder (leaf)
```
