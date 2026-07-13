# Rebuild campaign plan — 2026-07-12

Ground truth: `fresh-eyes-review.md` (independent audit, spot-verified). This plan converts it plus the owner's rulings into phased work. Executor: codex sol ultra pane. Orchestrator (Fable) commits per phase; executor never runs git.

## Owner rulings (2026-07-12, binding)

1. **crew stays standalone** — do NOT merge into agent-orchestration. Fix its defects: Trash-only cleanup language, memory writes made conditional, no instruction may imply confirmation legalizes destructive git.
2. **chrome-extension-builder merges into product-platform** as a routed reference (preservation ledger required; original archived; catalog 27→26).
3. **Language packs (effect/elixir/go) stay** in default profiles. Record the blinded with/without-task evaluation as the method for the next triage (note in the new catalog docs).
4. **Full structural rebuild green-lit** per the review's target structure and order.

## Phases (stop after each; write reports/rebuild-2026-07/phase-<n>.md ending `PHASE <n>: DONE` or `PHASE <n>: BLOCKED <reason>`)

**Phase 1 — safe composer core.** Build `bin/pack` (single entrypoint): `check` (package validation incl. effective consumer-root unions, links, secrets, manifest/doc parity), `render` (pure preview to a temp dir, no live writes), `apply` (allowlisted provider names, collision-failing, atomic swap — build complete tree then rename; never clear a live overlay before its replacement exists; removals go to Trash), `install` (reconcile symlinks; REPORT stale host overrides — never edit ~/.codex/config.toml or any $HOME config; propose diffs in the phase report instead). Old composers move to history/ (do not delete).

**Phase 2 — declarative catalog.** `catalog/pack.json`: per-skill archetype, aliases, per-provider profile membership, provider-native exceptions (absorb manifests/skills.jsonl, manifests/aliases.json, overlay-manifest.json), consumed-roots model (which $HOME roots load which overlays — the agents/codex union duplication from review §2 must be representable and validated). Bundle body copies and providers-current/ are replaced: bundles/ dirs retire to history/, parity becomes a render-and-compare check in `bin/pack check`. providers/ remains the only generated layer and must stay byte-identical to current state until Phase 4 apply.

**Phase 3 — content fixes** (canonical only, with preservation ledgers in the phase report): chrome→product-platform merge per ruling 2; local-secrets orphan resolved (either a real secrets reference under local-dev owning the handoff, or reworded handoffs — pick the one that preserves the no-credential-exposure behavior); Trash-only cleanup language sweep across crew, gtr, herdr, local-dev, agent-orchestration; crew defect fixes per ruling 1; circular rubric ownership fixed (skill-authoring references are the single normative source; reports/rubric/RUBRIC.md becomes clearly historical); stale manifest descriptions synced from frontmatter.

**Phase 4 — regenerate and apply.** `bin/pack render` + diff against live providers/; expected deltas only (chrome merge, description syncs); `apply` with the new atomic path; update docs: README.md mental model, PACK.md, AGENTS.md, packs/joshka0/SOURCE_NOTES.md regenerated from the catalog (counts, structure, no retired-skill references); new CATALOG-CONFORMS report dated, superseding reports/catalog/CATALOG-CONFORMS.md; pre-commit gate widened (any change under shared/, catalog/, or docs triggers `bin/pack check`).

**Phase 5 — history and estate.** Dated history/ area: old reports (triage/pilot/fleet/rubric stay but gain a dated index labeling them historical), loose/, archive/original-inventory pointers, retired composers, retired bundles; mirrors/impeccable trimmed to UPSTREAM.md + license + the files design-family's ledger cites (rest to Trash — it is import evidence, recoverable from upstream at the pinned commit); final estate report with before/after tracked-file counts.

**Phase 6 — KILLED 2026-07-13 (owner ruling, per codex-recommendations.md P1).** Per-skill links would erase the render/apply promotion boundary; the seven-consumer gate premise was wrong topology; npx compatibility requires a generated export, not a symlink-farm source. Registry distribution, if wanted later, is a separate export-only experiment after Wave 2. Original spike text (historical): After Phase 5: trial replacing the generated providers/ layer with per-skill symlinks from shared/ (+ native/) directly into agent roots, npx-skills-compatible layout (github.com/vercel-labs/skills conventions: repo-as-registry, skills-lock.json). Gate: adopt repo-wide only if all seven consumers demonstrably follow per-skill symlinks (test each; codex .system and native exceptions need explicit homes). Governance layer (catalog, validator, rubric, membership) is unaffected either way.

## Rails

- Deletion policy: repo removals via `git`-tracked moves to history/ or Trash (`/usr/bin/trash`); NEVER rm/unlink. No git commands — the orchestrator reviews and commits each phase.
- providers/ is live (symlinked into agent roots): no interim states; changes land only via Phase 4's atomic apply.
- Do not touch $HOME configs, mirrors other than impeccable's trim, or .claude/.codex state; propose such changes in phase reports.
- Every consolidation carries an A34-style preservation ledger; every phase report states what was NOT done.
- The rubric (shared/general/skill-authoring/references/) governs all skill-content edits; run bin/validate-skill.sh (or its bin/pack check successor) per touched skill.

## Wave 2 (added 2026-07-13, owner ruling: full wave per codex-recommendations.md)

**W2-P0 — consumer-model correction.** Decouple executable consumers from provider views in catalog schema + validators (loader identity, ordered roots, precedence, evidence). Declare Gemini CLI's real union (~/.agents/skills overrides ~/.gemini/skills — verified live); collapse Droid/Factory to the one documented loader at .factory/skills through the governed catalog/render path; re-probe Antigravity 2.0 roots per current Google docs before changing its mapping; generate install + docs from consumer records, not hard-coded arrays; runtime-evidence stays a separately-dated check. Agent Vault exposure via .agents to Gemini: declare current reality, flag as an open owner decision.
**W2-P2 — local-dev trim** to topology + secret-handoff modes (archive + ledger; report priority-vs-exposure honestly).
**W2-P3 — planning-workflow trim** to prd/reviewed-plan/issues/triage (agent-brief folds into issues, out-of-scope into triage, branded setup mode retired keeping the preflight rule; archive + ledger).
Gate: grok refutation pass at wave end. Same rails.
