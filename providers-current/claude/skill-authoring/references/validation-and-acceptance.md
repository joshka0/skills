# Validation and acceptance contract

This is a maintained operational split of the repository's current rubric, not an independent normative source. Reconcile any drift to the repository rubric before acceptance.

## Provider composition and exposure

Composition preserves one semantic source and a non-overlapping installed catalog.

1. Edit the locally owned body in `shared/`; edit `mirrors/` only for an intentional upstream patch.
2. Update bundle membership under `bundles/<provider>/<bundle>` when exposure changes.
3. Refresh bundle copies mechanically from the canonical body; do not hand-maintain semantic differences.
4. Run the relevant compose script without `--apply` first and inspect the entry list.
5. Apply composition only when the task includes overlay refresh.
6. Verify the installed provider view has intended names, descriptions, links, and hidden routing layout.

Rules:

- Every retained canonical name is globally unique under `shared/`.
- A composed provider overlay contains at most one skill with a given frontmatter name.
- Mux, model, or provider variants should become references or transport adapters, not duplicate packages.
- Provider-native exceptions may remain only where required and documented.
- Default overlays expose consolidated routers and precise leaf tools, not routers plus all routed children.
- Bundle/provider copies are byte-equivalent to canonical instructional content except documented provider-native metadata or compose-time reformatting, and the compose script performs any transform.
- A same-named skill under `mirrors/` or a provider-native exception is documented in pack notes; a composed overlay still contains at most one name.
- Do not edit `providers/` as a semantic source or update `providers-current/` without an explicit parity request.
- A canonical skill that no overlay exposes is justified in pack notes or moved to archive.
- Repo-internal symlinks are forbidden; only the root-sync helper manages home-directory symlinks.

## Mechanical validation recipe

Run this repository script from the root for every changed package:

```sh
bin/validate-skill.sh <skill-dir> <leaf|private-leaf|suite|router|interaction>
```

The script is the deterministic validation support for this skill. It fails closed on frontmatter shape, description length, body and package budgets, literal personal-home paths, banned prose, canonical-name uniqueness, and repo-internal symlinks. Quote its literal PASS or FAIL line in the acceptance report.

Also verify manually or with a pack validator:

- Description length and collision matrix.
- Every local link and routed target.
- Per-reference and package budgets.
- Support-file reachability and script smoke tests.
- Secret scanning with values redacted from logs.
- Bundle dry-run output and unique names in affected providers.
- Router-versus-child exposure after composition.

Mechanical checks do not replace the existence, overlap, or volatility judgment; they make those judgments auditable.

## Per-skill acceptance checklist

Every item is checked and reported. An unchecked item means the package is incomplete.

| Item | Required evidence |
| --- | --- |
| A01 | State the non-default delta in one sentence; it exceeds generic strong-agent behavior. |
| A02 | Show the capability recurs and merits a persistent slot. |
| A03 | Compare retained neighbors and prove standalone ownership or name its mode/reference owner. |
| A04 | Classify exactly one archetype: leaf, suite, router, or explicit interaction. |
| A05 | Show correct `shared/` home and a unique matching kebab-case name. |
| A06 | Show minimal valid frontmatter and a provider consumer for every extra key. |
| A07 | Show a one-line one/two-sentence description within its 220/320-character budget. |
| A08 | Show differentiated capability and a concrete final `Use when ...` sentence. |
| A09 | Compare neighboring descriptions and establish one first owner per claimed trigger. |
| A10 | Exclude greedy triggers, implicit persona activation, and missing explicit-only phrases. |
| A11 | Show the archetype line/byte budget passes. |
| A12 | Show active instructions contain only allowed command-brain content. |
| A13 | Show every reference has a selection condition, resolves, and is selectively loaded. |
| A14 | Show every reference and total package pass hard budgets without hidden prose. |
| A15 | Show no instructional prose is orphaned/duplicated; defer its bundle/provider clause before composition. |
| A16 | For modes, show shared lifecycle/safety and a count from two to eight (or up to ten for an eligible consolidated owner). |
| A17 | Show distinct kebab-case modes, exact files, and a default selection. |
| A18 | For routers, show three to eight targets, selective-loading value, and router budget. |
| A19 | For routers, show one-hop non-cyclic targets; defer overlay exposure before composition. |
| A20 | Show volatile facts use repository, live output, then primary-doc source order. |
| A21 | Show no copied manual, API matrix, pricing/store catalog, or oversized tutorial remains. |
| A22 | Show each pinned volatile value is a labeled pack constraint with owner, rationale, and live check. |
| A23 | Show no secret-shaped value exists anywhere in the package. |
| A24 | Show discovery/reporting reveals only safe identifiers/status and redacts values. |
| A25 | Show paths are portable and no literal personal-home path remains. |
| A26 | Show machine-specific facts are live-verified or profile-loaded and missing values fail clearly. |
| A27 | Show every script is referenced, deterministic, safe, dry-runnable where needed, and smoke-tested. |
| A28 | Show every asset/metadata file is referenced, portable, secret-free, and non-duplicative. |
| A29 | Show workflow/rules/stops/output protect concrete failures without filler. |
| A30 | Defer canonical-bundle-provider parity, unique exposure, and catalog scope before composition. |
| A31 | Defer compose dry runs and installed-view checks before composition; still check local links/targets/no symlink. |
| A32 | Compare against the golden example shape and record validation evidence. |
| A33 | For consolidation/trim, show strict shrink against replaced package totals and the absolute cap. |
| A34 | Include a preservation ledger for every qualifying non-default delta, with kept/merged/dropped disposition and path or existence-bar reason. |
| A35 | Archive the pre-rewrite original of every touched skill, including in-place owners, under the wave archive. |

## Reviewer verdict

Conformance is two-stage:

- **PACKAGE-CONFORMS** means every canonical-package item passes. Before composition, A15's bundle/provider clause, A19's overlay-exposure clause, A30, and A31 are **DEFERRED**, never PASS.
- **CATALOG-CONFORMS** additionally passes those catalog clauses across bundles, providers, and installed view after composition.

The reviewer returns one result: **CONFORMS** at catalog level, **REVISE** if the slot is justified but the contract fails, **MERGE-into-`<owner>`** for a useful wrong-boundary delta, or **CUT** when no durable non-default delta remains.

## Golden examples

The pilot outputs are shape references, not exceptions. `herdr` demonstrates a private-tool leaf: exact transport semantics, safety boundaries, and no generic content. `code-quality` demonstrates a consolidated mode suite: a mode table, trimmed mode references, shared rules, and compatibility aliases handled at provider level. The normative contract wins whenever an example differs.
