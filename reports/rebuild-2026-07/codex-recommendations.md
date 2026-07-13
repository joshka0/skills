# Codex recommendations — post-rebuild fresh pass

Date: 2026-07-13

## Executive recommendation

The rebuild is internally coherent, but its consumer model is not yet an
accurate model of the installed loaders. That matters more than another prose
consolidation.

| Priority | Recommendation | Effort | Rationale |
| --- | --- | ---: | --- |
| P0 | Correct and re-prove the consumer/root model | 2–3 engineer-days | Gemini demonstrably loads an undeclared second root; Droid and Factory are two catalog rows for one documented loader/root; the current Antigravity root conflicts with current Google documentation. |
| P1 | **KILL Phase 6 as a replacement for `providers/`** | 0.5 day to close the ruling | Per-skill links are technically viable for several loaders, but the proposed seven-consumer gate is based on the wrong topology, conflicts with the current atomic promotion boundary, and does not by itself make this repository an `npx skills` registry. |
| P1b | If registry distribution still matters, run a separate export-only experiment after P0 | 1–2 days | Test a generated real-file registry view or direct single-skill URLs. Do not make live home roots or `skills-lock.json` the canonical pack model. |
| P2 | Trim and narrow `local-dev`; retain topology and secret-safe handoff | 0.5–1 day | Two modes encode pack-specific value; generic sandbox/context advice does not clear the standalone-need test. |
| P3 | Trim `planning-workflow` to four top-level modes | about 1 day | The AFK brief and rejection record are subflows of issue/triage work, and the branded setup route is not a durable standalone capability. |
| P4 | Drop the proposed `code-quality` five-mode consolidation | no implementation work | Its references are already deferred, its ten triggers represent materially different intent/safety boundaries, and consolidation would save little active context. |
| P5 | Do not schedule the language-pack blinded test now; preserve it as the gate for a future actionable proposal | 2–4 days if later activated | The owner has ruled that the packs stay in `core`, and there is no specialist profile to receive them. A test now has no implementable decision on the other side. |

Effort estimates include preservation/archive evidence, catalog changes,
archetype validation, render inspection, and provider refresh where applicable.
They exclude owner decision latency.

## Evidence and proof boundary

I read the current `README.md`, `catalog/README.md`, all of
`catalog/pack.json`, the rebuild plan, the original fresh-eyes review, the Grok
gate, the relevant canonical skills, and the pack implementation. I applied the
repository's existence-and-ownership test: a retained mode should add a
non-default decision policy, be repeatable, have a separable trigger, and need
standalone packaging.

I ran `bin/pack check` from the repository root. It exited zero:

```text
PASS package validators: 26/26
PASS catalog validator
PASS local links: 101
PASS no repo-internal symlinks
PASS secret scan: 0 findings across 206 blobs
PASS declarative catalog: 26 skills, 121 aliases/external records
PASS provider-native inputs: 5
PASS consumed-root unions
PASS generated parity: 7 providers
PASS fixtures
WARN caveman weak routing
CHECK: PASS
```

That result proves catalog/schema consistency, canonical validation, fresh
render parity, and the **declared** consumer unions. It does not prove that the
declared roots are the roots current binaries load. The implementation makes
that distinction important: `checkConsumers` requires consumer keys to equal
the provider allowlist and walks the provider trees named by the catalog
(`bin/lib/pack-catalog-check.mjs:99-134`); it does not interrogate a loader.

I also ran the preview-only `bin/pack install`. All seven configured root links
were already current and it made no changes. Those root-directory links prove
that some loaders traverse a linked root; they are not seven independent
per-skill-link tests. No Git command was run.

## 1. Phase 6: kill the replacement objective

The hard recommendation is **KILL**, not merely defer. Close Phase 6 as a trial
of replacing `providers/` with links from `shared/` and `native/`. If the owner
still wants public registry consumption, create a new, narrower experiment
whose output is a registry export rather than the live pack architecture.

### Loader viability is not the blocker; the seven-consumer premise is

The plan's gate says all seven consumers must follow per-skill links
(`reports/rebuild-2026-07/PLAN.md:24`). Current ground truth does not contain
seven independent loaders:

| Catalog row | Current ground truth | Per-skill-link conclusion |
| --- | --- | --- |
| Agents | `$HOME/.agents/skills` is an interoperability root, not an executable consumer. | Not a testable consumer. It is a root consumed by other loaders. |
| Codex | The catalog correctly models both Agents and Codex roots (`catalog/pack.json:1645-1681`). An OpenAI maintainer has also confirmed skill-folder symlink support. | Viable; not a reason to replace the promotion layer. See the [Codex symlink discussion](https://github.com/openai/codex/discussions/9682). |
| Claude | The documented Claude root and the current linked root are compatible with directory traversal; `npx skills` also targets Claude with links. | Likely viable, but this read-only pass did not create a direct per-skill probe. |
| Gemini CLI | Installed documentation says user skills come from **both** `~/.gemini/skills` and the `~/.agents/skills` alias, with `.agents` winning same-tier conflicts. `gemini skills list` emitted 20 conflict warnings and selected all 20 overlaps from `.agents`; it also exposed the two Agents-native Agent Vault skills. The catalog declares only the Gemini root (`catalog/pack.json:1702-1710`). | Link traversal works, but the effective union and precedence are wrong in the catalog. This is a P0 modeling failure, not a Phase 6 pass. Installed-doc anchor: `~/.npm-global/lib/node_modules/@google/gemini-cli/bundle/docs/cli/skills.md:35-56`. |
| Droid | Current Droid is Factory's CLI. Factory documentation and the current `npx skills` matrix use `.factory/skills`; neither identifies `.droid/skills`. | Test the `.factory` root. The current `.droid` provider/root has no demonstrated loader. |
| Factory | This resolves to the same Droid loader and `.factory/skills` root, not a second independent consumer. Factory release notes explicitly mention repaired discovery of linked skill directories. | Viable at the Factory root, but duplicate with the Droid row. See [Factory skills](https://docs.factory.ai/cli/configuration/skills) and [Factory release notes](https://docs.factory.ai/changelog/release-notes). |
| Gemini Antigravity | The pack and Vercel matrix use `~/.gemini/antigravity/skills`; current Google IDE documentation names workspace `.agents/skills` and global `~/.gemini/config/skills` (the CLI has another root). The installed app is 2.0.0. | Unproven at the configured root. Reconcile the product/version/root first, then run a live discovery probe. See [Google Antigravity skills](https://antigravity.google/docs/skills?app=antigravity-ide). |

The green check masks these mismatches because schema policy couples providers
and consumers (`bin/lib/pack-catalog-check.mjs:101`) and the documentation gate
hard-codes the same roots, including the Antigravity and Droid paths
(`bin/lib/pack-parity.mjs:94-108`). Incorrect declarations can therefore make
the implementation and documentation agree with each other and still disagree
with the loaders.

### Direct links would remove a valuable release boundary

The current architecture is deliberately staged:

- `render` builds a complete preview and `apply` atomically exchanges the live
  provider tree (`README.md:38-41`).
- Composition rejects source symlinks, validates packages, and copies them into
  the candidate (`bin/lib/pack-common.mjs:53-59,81-97,181-200`).
- The provider tree itself is checked as a real-file input before composition
  (`bin/lib/pack-common.mjs:202-207`).

Linking live roots directly to `shared/` would make an in-progress canonical
edit immediately visible to agents, before package validation, full render, or
atomic apply. Rebuilding all of those safeguards around link targets is a
substantial composer rewrite, not simplification. The benefit is only about
3.8 MB and 809 generated provider files on this checkout. That is not a good
trade for losing the promotion boundary.

### The proposed layout is not `npx skills` compatible as stated

Against the current [Vercel skills README](https://github.com/vercel-labs/skills/blob/main/README.md)
and [v1.5.16 release](https://github.com/vercel-labs/skills/releases/tag/v1.5.16):

- Default registry discovery recognizes roots such as `skills/`,
  `.agents/skills/`, `.claude/skills/`, and `.factory/skills/`; it does not name
  `shared/general/` or `shared/claude/`. This repository has no top-level
  supported discovery container. It currently has 26 canonical `SKILL.md`
  files but 880 `SKILL.md` files overall because generated, native, mirror,
  archive, and history evidence is intentionally retained. A full-depth scan is
  therefore the wrong registry interface. See the current
  [discovery implementation](https://github.com/vercel-labs/skills/blob/main/src/skills.ts).
- A committed `skills/` farm made only of repository symlinks is not a robust
  GitHub registry export: the upstream scanner's directory walk expects actual
  directory entries. A generated real-file export is the compatible shape,
  which reintroduces a generated layer rather than eliminating one.
- Upstream “symlink mode” maintains a canonical installed copy and links
  agent-specific destinations to it; it is not a promise that a source
  repository can be a symlink farm. Its installer also permanently replaces
  managed destinations, which conflicts with this pack's Trash-only policy and
  is unsafe against the current home-root links into `providers/`. See
  [installer.ts](https://github.com/vercel-labs/skills/blob/main/src/installer.ts).
- `skills-lock.json` is consuming-project installation state, not the registry's
  source-of-truth catalog. It should not be added here merely to claim registry
  compatibility. See [local-lock.ts](https://github.com/vercel-labs/skills/blob/main/src/local-lock.ts).
- The Vercel matrix itself maps Droid to `.factory/skills`, has no separate
  Factory consumer, and still lists the disputed Antigravity root. Matching
  that matrix would not validate the pack's seven rows or current Google IDE
  behavior.

The useful replacement experiment, if wanted, is bounded: after P0, test direct
single-skill GitHub URLs into `shared/<owner>/<skill>`, or render a disposable
real-file `skills/` registry export from the catalog and verify `--list` plus one
install into an isolated temporary home. Keep `bin/pack` as the only home-root
reconciler. Do not use upstream removal/update operations against this pack's
live roots.

## 2. Unexecuted trim-table rows

### Do: narrow and demote `local-dev`

Current routing has five modes (`shared/general/local-dev/SKILL.md:14-20`) in a
6.9 KB package.

Retain two durable capabilities:

1. A topology mode combining Portless/routes/worktrees with the concrete proxy
   and reachability facts.
2. The secret-safe handoff mode, including the `local-secrets` compatibility
   alias and its value-free credential boundary.

Cut the generic `isolation` and `context` modes. Choosing a disposable sandbox
and recording ordinary repository conventions are default agent behavior, not
non-default local-dev expertise. Change catalog priority from `default` to a
specialist classification and tighten the description to the two retained
triggers.

Important limitation: `priority` is currently required metadata but is not read
by composition; profile membership alone selects a skill
(`bin/lib/pack-catalog.mjs:30-43`). With only `core`, “demotion” changes routing
meaning but not exposure. Do not report it as removal from defaults unless a
real specialist profile is designed.

### Do: trim `planning-workflow` to four top-level modes

Keep `prd`, `reviewed-plan`, `issues`, and `triage`. The current seven-mode route
is visible at `shared/general/planning-workflow/SKILL.md:12-20`.

- Fold `agent-brief` into the acceptance/AFK-output branch of `issues`. The
  brief remains an artifact shape, not a competing top-level trigger; live
  dispatch remains owned by `agent-orchestration`.
- Fold `out-of-scope` into the maintainer-approved outcome branch of `triage`.
  Preserve the approval requirement and durable rejection versus temporary
  deferral distinction.
- Retire the branded `/setup-matt-pocock-skills` top-level mode. Keep only the
  small missing-configuration preflight/stop rule needed by issue and triage
  work.

This removes boundary and trigger surface while preserving behavior. It should
follow the required pre-rewrite archive and preservation ledger rather than
silently deleting the three references.

### Drop: `code-quality` mode consolidation

Do not collapse ten modes to an arbitrary target of five. The 12.7 KB package
already loads only a compact 3.6 KB router before selection, and the references
are deferred. The route table (`shared/general/code-quality/SKILL.md:12-25`)
separates intent that should not be guessed or merged: diagnosis versus fixing,
read-only merge gate versus implementation, explicit TDD, explicit clean-slate
permission, regression proof, architecture work, and test-suite strategy.

There may be prose deduplication inside references, but no current trigger or
evaluation evidence shows that fewer top-level modes would improve selection.
Revisit only after observed misroutes or a paired routing evaluation, not to hit
a mode-count target.

### Defer the language-pack blinded test; do not drop the packs

The current owner ruling is explicit: Effect, Elixir, and Go remain in every
`core` profile (`reports/rebuild-2026-07/PLAN.md:5-10`,
`catalog/pack.json:24-27`). The catalog has only `core`
(`catalog/pack.json:21-23`). The three skills also clear the standalone-need
test: framework-specific service/lifecycle/failure policy, BEAM
process/supervision policy, and Go contract/goroutine/evidence policy are not
generic code-quality advice.

Keep the blinded paired-task method already recorded in
`catalog/README.md:40-47`, but activate it only when the owner is willing to
choose between concrete destinations: remain in `core`, move to an implemented
specialist profile, or cut. Budget 2–3 days for representative per-language task
sets and blinded scoring, plus about one day for a profile/catalog/provider
rollout if the result warrants it. Test one pack at a time; a combined
“language packs” result would hide language-specific value.

## 3. New findings to act on

### P0: make consumer truth independent of provider outputs

Change the schema and validator so provider views and executable consumers are
not required to have the same keys. Model loader identity, ordered roots,
precedence, and evidence/version separately. Then:

1. Add Gemini's Agents-root union and precedence, and make the effective Agent
   Vault exposure an explicit owner decision.
2. Collapse or alias Droid/Factory to the documented Droid loader and Factory
   root; remove the unsupported `.droid` claim only through the governed
   catalog/render path.
3. Re-probe Antigravity 2.0 using the current Google root(s), including the IDE
   versus CLI distinction, before changing its mapping.
4. Update install generation and documentation from the corrected consumer
   records instead of hard-coded arrays (`bin/lib/pack-cli.mjs:109-120`) and
   hard-coded documentation assertions.
5. Add runtime evidence as a separately dated check. Keep `bin/pack check`
   deterministic, but label rendered-union validation honestly rather than
   treating it as loader discovery.

This is the most important post-rebuild correction. It extends the original
Codex union insight to current Gemini and removes a schema assumption that the
approved gate did not test.

### P1: distinguish routing priority from exposure

Catalog `priority` is validated for presence but has no selection semantics;
only profiles drive composition. Any future recommendation to “demote” a skill
must say whether it means description/routing priority or actual profile
removal. Today those are different operations. This affects `local-dev` and is
also why a language-pack evaluation has no actionable destination yet.

### P1: do not expose this whole checkout as a recursive registry

The history-preservation design is valid for governance, but 880 discoverable
`SKILL.md` files make the repository root an unsafe full-depth registry source.
Registry compatibility needs an allowlisted catalog-derived export or direct
canonical skill URL, never recursive discovery across `history/`, `archive/`,
`mirrors/`, `native/`, and `providers/`.

## Prior decisions reviewed and deliberately left alone

- **Crew stays standalone.** I did not reopen the binding owner ruling or its
  completed safety fixes.
- **Browser-extension work remains a routed reference under
  `product-platform`.** I did not revive `chrome-extension-builder` as a leaf.
- **`local-secrets` remains a compatibility alias.** The retained secret-safe
  handoff is a real non-default boundary even while generic local-dev modes are
  trimmed.
- **Effect, Elixir, and Go remain in `core`.** I am deferring the future test,
  not reversing the ruling through an untested recommendation.
- **The single catalog, canonical `shared/` ownership, native exception set,
  render-and-compare parity, and atomic full-provider apply remain the pack
  model.** These are the strongest rebuild outcomes.
- **Codex's declared Agents+Codex overlap remains as approved.** The new issue
  is that the same effective-union method was not applied to Gemini and cannot
  represent shared/aliased loaders cleanly.
- **Claude-only interaction packages, Codex `.system`, and other native
  exceptions remain explicit.** Phase 6 should not disturb those boundaries.
- **Historical rubric/report ownership and Phase 1–5 estate decisions remain
  settled.** I did not turn npx registry concerns into another history cleanup.
- **The stale Codex override warning and the non-blocking Caveman routing
  warning remain report-only/previously known.** This pass did not mutate home
  configuration or re-litigate the approved gate for them.

RECOMMENDATIONS: READY
