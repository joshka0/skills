# Rebuild campaign — Phase 3 canonical content fixes

Date: 2026-07-13

## Verdict

Phase 3 is complete. Canonical skill count is 26, the Chrome leaf is preserved
in history and merged into `product-platform`, `local-dev` owns the secret-safe
handoff, all five named cleanup surfaces are Trash-only, Crew remains
standalone with its defects fixed, and the skill-authoring references are the
single normative rubric.

Live `providers/` was not written. Its content-and-mode fingerprint is unchanged
from the accepted Phase 2 state; all canonical-to-provider drift is retained in
a pure Phase 4 render preview.

## Delivered

### Chrome into Product Platform

- `shared/general/chrome-extension-builder/` was moved intact to
  `history/rebuild-2026-07/phase-3/pre-rewrite/shared/general/chrome-extension-builder/`.
- `product-platform` remains a router and now selects
  `references/browser-extension.md` directly. The reference preserves the
  former leaf's MV3 lifecycle, cross-surface state ownership, storage and
  migration, typed message validation, hostile-page UI isolation, permission
  minimization, browser adapters, verification, stop conditions, and output.
- The catalog row for `chrome-extension-builder` is gone. Its name is now a
  `reference-or-mode` alias owned by `product-platform`, whose `core` membership
  now covers all seven providers. Catalog count changed 27 to 26.
- The combined owner strictly shrank from 137 lines / 10,634 bytes / 7 files to
  119 lines / 9,704 bytes / 6 files.

### Secret-safe local handoff

- `local-dev` gained a fifth `secrets` mode and
  `references/secrets.md`. It discovers credential names and injector status,
  requires authorization for the exact injection operation, passes only names
  or paths between tools, keeps values out of arguments/files/logs/messages,
  redacts errors, and stops when no safe injector exists.
- `local-secrets` is a `reference-or-mode` compatibility alias owned by
  `local-dev`; there is no orphan package or unresolved handoff.
- `release-bundles` now hands value-free local credential injection to the
  `local-dev` secrets mode while retaining release evidence ownership and its
  prohibition on exposing credential values.

### Trash and Crew safety

`crew`, `gtr`, `herdr`, `local-dev`, and `agent-orchestration` now state the
same boundary: filesystem removals go to Trash, permanent deletion and
destructive Git remain forbidden, and confirmation/delegation does not override
that rule. Tool-specific cleanup is permitted only when current help proves the
action is Trash-backed; otherwise the skill stops and reports the unsupported
safe action.

Crew remains a standalone leaf. Its campaign protocol, cross-family review,
durable verdict files, re-gate loop, trigger chains, owner interviews, and
campaign close are preserved. The fixed model roster was replaced by live
capability discovery while retaining explicit role casting and cross-family
review. Memory writes in owner interviews and campaign close are now conditional
on an explicit user request and the active memory policy. Policy blocks now
change the approach or stop work; they are never bypassed by reassignment.

### Rubric ownership and catalog descriptions

- The four files under `shared/general/skill-authoring/references/` now identify
  themselves as one normative contract. Their composition clauses use
  `catalog/pack.json`, `bin/pack render`, atomic apply, and render-and-compare;
  retired bundle/snapshot rules are gone.
- `shared/general/skill-authoring/SKILL.md` names those four references as the
  single current contract and treats historical reports only as evidence.
- `reports/rubric/RUBRIC.md` begins with an explicit superseded/historical
  banner. Its exact pre-change version is preserved under the Phase 3 archive.
  The mechanical validator comment now points to the canonical references.
- Every catalog `use_when[0]` matches current frontmatter. The three requested
  stale rows (`code-quality`, `design-family`, `herdr`) all compare equal, as do
  the newly changed `local-dev` and `product-platform` descriptions.

## A34 preservation ledgers

### Chrome consolidation

| Former non-default delta | Disposition | New owner |
| --- | --- | --- |
| Concrete browser-extension routing signals | Kept and merged | `product-platform` frontmatter, `browser-extension` route, and `chrome-extension-builder` alias |
| Manifest/framework/browser/entrypoint inspection | Kept | `references/browser-extension.md` Workflow 1 |
| Extension page, content script, injected UI, worker, offscreen, backend ownership | Kept | Workflow 2–3 |
| Ephemeral MV3 worker and intentional offscreen use | Kept | Architecture decision 1 |
| Storage tiers, durable state, migration and recovery | Kept | Architecture decision 2 and Verification |
| Discriminated JSON-safe messages and privileged-boundary validation | Kept | Architecture decision 3 |
| Isolated, removable, idempotent hostile-page UI | Kept | Architecture decision 4 |
| Narrow permissions, no remote code, no inspectable secrets | Kept | Architecture decision 5 |
| Browser adapters and live capability evidence | Kept | Workflow 4 and Architecture decision 6 |
| Permission/storage/auth/browser-support stops and residual-risk output | Kept | Verification and stops |
| Standalone frontmatter, repeated purpose, and duplicate reference selection prose | Dropped | Fails standalone-need after owner ruling; routing now belongs to the product router |

### Local secrets and safety

| Previous behavior or defect | Disposition | New owner / rule |
| --- | --- | --- |
| `local-secrets` handoff with no active target | Replaced | `local-dev` `secrets` mode and catalog alias |
| Never expose/store/copy credential values | Kept and strengthened | `local-dev` hard rule and `references/secrets.md` |
| Exact-operation authorization | Kept | Secrets steps 2–3; authorization never permits value disclosure |
| Safe reporting | Kept and strengthened | Names/counts/paths/hashes/status only; errors redacted |
| Release credential boundary | Kept | `release-bundles` hands value-free injection to `local-dev`; release reports never expose values |
| Cleanup after user confirmation | Replaced | Trash-only; confirmation cannot authorize permanent deletion or destructive Git |
| Gtr/Herdr removal commands | Narrowed | Allowed only when live help proves Trash behavior; otherwise stop |
| Agent-orchestration delegation of destructive cleanup | Replaced | Trash-only is non-delegable; destructive Git remains forbidden |

### Crew defects

| Crew delta | Disposition | Evidence |
| --- | --- | --- |
| Long-horizon cross-family campaign owner | Kept standalone | Description, explicit Crew triggers, and `Do not use when` boundary |
| Scout/verifier/executor/adversary/orchestrator roles | Kept | Live-discovered casting paragraph |
| Fixed named model roster and permanent model prohibition | Dropped | Volatile execution-surface fact; replaced by live capability/model discovery |
| Ground-truth-first framing quarantine | Kept | Casting section |
| Durable verdict files and re-gates | Kept | Verdict-file protocol and re-gate loop |
| Trigger-chain automation | Kept | Trigger chains with external mutations supervised |
| Memory writes | Narrowed | Only explicit user request plus active memory policy |
| Workspace/branch teardown | Narrowed | Workspace files move to Trash; branch deletion and destructive Git forbidden |
| Guardrail bypass by reassignment | Dropped | Policy blocks require a safe alternative or stop |

## Acceptance evidence

### Archive and mechanical gates

Nine complete pre-rewrite packages are preserved under
`history/rebuild-2026-07/phase-3/pre-rewrite/shared/general/`:
`agent-orchestration`, `chrome-extension-builder`, `crew`, `gtr`, `herdr`,
`local-dev`, `product-platform`, `release-bundles`, and `skill-authoring`.

Literal retained-package validator results:

```text
PASS: shared/general/agent-orchestration (suite)
PASS: shared/general/crew (leaf)
PASS: shared/general/gtr (private-leaf)
PASS: shared/general/herdr (private-leaf)
PASS: shared/general/local-dev (suite)
PASS: shared/general/product-platform (router)
PASS: shared/general/release-bundles (suite)
PASS: shared/general/skill-authoring (suite)
```

The retired Chrome leaf had already passed its leaf validator before its
A35 move; its complete two-file original is the archive evidence. Current
`node scripts/validate-skills.mjs` reports 26 rows, 26 unique names, zero errors,
and only the pre-existing non-blocking Caveman routing warning. Secret scanning
reports zero findings across 206 active blobs, 101 local package links resolve,
and the repository has no internal symlinks.

### Collision matrix

| Request or artifact | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| Extension runtime, MV3 worker, content script, permission, storage, message boundary | `product-platform` browser-extension target | `design-family` | Product/runtime/security boundary wins; visual intent stays with Design Family |
| `chrome-extension-builder` legacy name | `product-platform` alias | none | Alias selects the routed reference; no standalone slot remains |
| Local credential injection or secret handoff | `local-dev` secrets mode | provider-native Agent Vault skills | Exact Agent Vault tool operation selects the native leaf; generic local handoff selects Local Dev |
| Store release credential evidence | `release-bundles` | `local-dev` secrets mode | Release owns readiness/evidence; Local Dev owns value-free injection only |
| “crew”, “full crew”, adversarial convergence | `crew` | `agent-orchestration` | Sustained campaign and explicit Crew phrase win; one bounded dispatch stays with Agent Orchestration |
| Gtr, Herdr, or local sandbox cleanup | named private/local tool skill | generic orchestration | Exact tool owns live discovery; every owner applies the same Trash-only stop |
| Skill package or catalog acceptance | `skill-authoring` | `code-quality` | Skill contract/archetype/catalog artifact wins; generic source review stays with Code Quality |

### A01–A35 disposition

- **A01–A04 PASS:** Chrome's repeatable non-default delta is retained but fails
  standalone need and is merged into the five-target `product-platform` router;
  Local Dev remains a five-mode suite; Crew remains a distinct explicit-trigger
  leaf. Every retained package has one catalog archetype.
- **A05–A10 PASS:** canonical homes/names/frontmatter are unique and portable;
  descriptions are one-line, within budget, and establish the first owners in
  the collision matrix. Chrome and `local-secrets` survive as aliases, not slots.
- **A11–A14 PASS:** all eight retained touched packages pass literal validators;
  active/reference/package hard budgets and all local links pass.
- **A15 PASS at package/catalog source:** no Chrome or secrets instruction is
  orphaned or duplicated; provider parity remains deferred until Phase 4 apply.
- **A16–A19 PASS/DEFERRED:** Local Dev has five distinct modes; Product Platform
  has five one-hop reference targets, no cycle, and no retained Chrome child.
  Live overlay exposure is correctly deferred to Phase 4.
- **A20–A29 PASS:** version-sensitive facts use installed state/live help/current
  primary docs; no manual or API matrix was added; secrets are value-free and
  redacted; paths are portable; no new scripts/assets exist; Trash and stop
  rules protect concrete failures.
- **A30–A31 DEFERRED:** catalog/render scope is complete and dry-run output is
  exact, but live providers intentionally retain Phase 2 content until Phase 4.
- **A32 PASS:** the compact private-tool and suite/router shapes remain within
  the accepted examples and the current normative contract.
- **A33 PASS:** Chrome plus Product Platform strictly shrank by 18 lines and 930
  bytes while preserving every qualifying delta.
- **A34 PASS:** the three ledgers above account for every merged, strengthened,
  narrowed, or dropped delta.
- **A35 PASS:** all nine touched skill originals are archived before rewrite;
  the historical rubric report is also preserved before its banner change.

The retained packages are **PACKAGE-CONFORMS**. Full **CATALOG-CONFORMS** is
deferred, not claimed, until Phase 4 atomically applies and verifies the
catalog-rendered provider tree.

## Render and provider rail

`bin/pack render --all --full` remains pure and reports the unchanged provider
entry counts: Agents 22, Claude 26, Codex 21, Droid 20, Factory 20, Gemini 20,
and Gemini Antigravity 22. Every one of its 130 changed paths belongs to the
explicit Phase 3 allowlist:

```text
agent-orchestration, crew, chrome-extension-builder, gtr, herdr,
local-dev, product-platform, release-bundles, skill-authoring
UNEXPECTED_DRIFT=0
```

The expected check boundary is `CHECK: FAIL` with 71 errors and one warning:
catalog/live Codex membership, pre-apply consumer-copy drift, seven render/live
diff groups, and Phase 4 governing-document/catalog-report debt. The former
Phase 3 failures are gone: there are no catalog-description, inactive
`local-secrets`, Chrome router/child, or rubric-ownership errors.

The live provider content-and-mode fingerprint before and after Phase 3 is:

```text
bf38ca33905f9c43730550ac8a11cfbf4ec0bb37e879249798dce232313172a8
```

`providers/` therefore remained untouched and byte/mode-identical throughout
this phase.

## Explicitly not done

- No Phase 4 provider apply or install reconciliation was run. The expected
  canonical drift exists only in retained render previews that were moved to
  Trash after inspection.
- `README.md`, `PACK.md`, `AGENTS.md`, `packs/joshka0/SOURCE_NOTES.md`, the
  current catalog-conformance report, and the pre-commit trigger were not
  regenerated; those are Phase 4.
- No Phase 5 mirror, old-report, loose, archive-inventory, or estate cleanup was
  started.
- No `$HOME` path or config was written. No Git command was run. No file was
  permanently deleted; all removals were moves to dated history or Trash.

PHASE 3: DONE
