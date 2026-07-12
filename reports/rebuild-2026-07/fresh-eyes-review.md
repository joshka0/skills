# Fresh-eyes repo review (external, 2026-07-12, against HEAD 6aae7f8)

Ground-truth artifact for the rebuild campaign. Received verbatim from an
independent reviewer with no involvement in the revamp; treat as a
possibly-imperfect but independently-framed audit. Five load-bearing claims
were spot-verified by the orchestrator before acceptance (overlay-manifest
staleness, circular rubric ownership, chrome routing break in both directions,
local-secrets orphan, composer risk pattern).

## What works well

- The canonical skills are compact and generally well routed: 27 packages, with only 39% of package bytes loaded as active SKILL.md context and the rest deferred to references.
- All 27 packages pass the mechanical validator with their correct archetypes. node scripts/validate-skills.mjs also reports 27 names, zero errors, and one non-blocking warning.
- Private-tool skills are the strongest material: Herdr, Maestri, Gtr, the browser bridge, RepoPrompt, and peon-ping encode topology and safety behavior a model cannot infer.
- goal-protocol, agent-orchestration, and planning-workflow now have much clearer durable-goal versus live-dispatch versus one-shot-artifact boundaries.
- Bundle copies currently match canonical sources, bundles match live providers, provider-local names are unique, and there are no repo-internal symlinks.
- The installed-version → live-help → primary-documentation rule is consistently good. It keeps volatile framework and store knowledge out of the skills.

## What does not work

1. The composers violate the durable deletion policy and are non-atomic. Both bin/compose-provider-skills.sh:74 and bin/compose-codex-skills.sh:59 permanently clear temporary and live paths, including during dry-run cleanup. Apply clears the active overlay before replacing it, so interruption can leave an incomplete installed catalog. The generic composer also fails to allowlist --provider; path traversal can redirect its destructive target. Duplicate entries silently use "first wins" rather than failing.
2. The effective installed catalog is duplicated. bin/sync-provider-roots.sh:35 installs both ~/.agents/skills and provider-specific roots. The Agents and Codex roots physically overlap on 19 identical names. Host overrides reduce this to 12 duplicate descriptions in this Codex session, while leaving 18 stale missing-path records in ~/.codex/config.toml:335. Validation checks each provider directory independently, not the union that a consumer actually loads. That is the wrong conformance boundary.
3. The product-platform/Chrome routing split is broken. shared/general/product-platform/SKILL.md:12 routes browser-extension work to chrome-extension-builder, but six profiles expose the router without that child; Codex exposes the child without the router's other four product modes. The dated catalog report incorrectly treats a skill living in another provider profile as a valid one-hop target.
4. Green validation does not mean the catalog is current. Current state is 27 canonical skills and 26 Claude entries, while overlay-manifest.json:13 says 26 and 25. reports/catalog/CATALOG-CONFORMS.md:5 still asserts the previous catalog. Three manifest descriptions are stale relative to their skill frontmatter: code-quality, design-family, and herdr. The validator does not read the overlay manifest or validate provider/snapshot parity. The pre-commit gate only triggers for changed shared/**/SKILL.md, not references, manifests, bundles, providers, or documentation.
5. There are too many physical copies of too little information. The active source is 27 SKILL.md files, but bundles/, providers/, and providers-current/ contain 460 generated copies. A common skill is replicated into 21 directories. providers-current/ is especially weak: Git already provides history, yet the snapshot has 791 tracked files and is presently drifting from Codex .system.
6. The governing documentation is materially stale. PACK.md:39 still advertises 30–53 entries per provider. AGENTS.md:56 and packs/joshka0/SOURCE_NOTES.md:8 describe removed shared/codex, shared/variants, and mirrors/foxctl structures and numerous retired skills. There is also circular rubric ownership: reports/rubric/RUBRIC.md:1 points at the split skill references as the living contract, while shared/general/skill-authoring/SKILL.md says the report rubric is normative. The report still contains pre-pilot golden-example text.
7. Live skill boundary defects: crew duplicates collaboration/briefing/dispatch content and carries volatile roster/memory/deletion instructions; local-dev and release-bundles hand secret work to a `local-secrets` skill that is not active; cleanup language in Crew, Gtr, Herdr, Local Dev, and Agent Orchestration must say Trash-only and must not imply confirmation makes destructive Git legal; code-quality has consolidation candidates; planning-workflow duplicates agent-packet ownership.

## Trim table (reviewer's recommendations)

crew → merge into agent-orchestration/campaign. chrome-extension-builder → merge into product-platform as reference (alt: expose leaf everywhere). code-quality → ~5 modes. planning-workflow → keep PRD/reviewed-plan/issues/triage. local-dev → retain Portless/topology facts, demote generic advice. Effect/Elixir/Go → out of default profiles pending blinded with/without tasks. providers-current → replace with hashes or render-and-compare. Bundle bodies → declarative provider membership. mirrors/impeccable → keep URL+pin+license+selected evidence only. Old reports/loose inventory → dated history area.

## Simpler target structure

shared/ (canonical) · native/<provider>/ (provider-owned exceptions) · catalog/pack.json (archetypes, aliases, profiles, consumed roots) · providers/ (the only generated real-file layer) · history/ (dated reports, archives, old inventories).

One bin/pack command: check (packages, effective consumer-root unions, links, secrets, manifests, docs) · render (pure preview) · apply (allowlisted, collision-failing, Trash-safe, atomic) · install (reconcile symlinks, warn on stale host overrides).

Recommended order: 1 composers, 2 consumer-root unions/dedupe, 3 chrome + orphan secret handoff, 4 declarative catalog replacing bundle copies + providers-current, 5 merge/trim clear overlaps, 6 regenerate docs, then reduce mirrors/history.

Core insight: another large prose rewrite is not needed. The skill content is mostly good; the repo needs one catalog, one generated layer, one validator, and fewer competing claims of current truth.
