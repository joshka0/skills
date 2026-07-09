# Fleet acceptance — skill-authoring

## Result

- Verdict: **PACKAGE-CONFORMS**. This is a contract migration, not a consolidation or trim; catalog composition is out of scope.
- Canonical home: `shared/general/skill-authoring`
- Archetype: mode suite
- Final package: 402 text lines / 28,734 bytes; active body: 40 lines / 2,689 bytes; four selected references: 75–102 lines each.
- Pre-rewrite package: 213 text lines / 9,240 bytes, archived in place.
- Validator: `PASS: shared/general/skill-authoring (suite)`
- Deterministic validator: `bin/validate-skill.sh` is named in the active workflow and was run for this package.

## Collision matrix

| Claimed signal or artifact | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| `SKILL.md` authoring, consolidation, or rubric acceptance | `skill-authoring` | `planning-workflow` | This suite owns pack-skill contract and acceptance evidence; planning owns one-shot product/issue artifacts. |
| new Codex plugin or marketplace manifest | `plugin-creator` | `skill-authoring` | Use plugin-creator for plugin scaffold/manifest; use this suite for the skill body and rubric gate. |
| skill selection / archetype / collision matrix | `skill-authoring` | `design-family` or domain routers | This suite owns pack metadata and catalog boundary, not the domain decision itself. |
| `validate-skill.sh` package gate | `skill-authoring` | generic shell validation | This suite owns required archetype choice, archive evidence, and the acceptance interpretation around the command. |

## A34 preservation ledger

| Pre-rewrite qualifying delta | Classification | Final evidence |
| --- | --- | --- |
| Canonical-source and no-duplicate-content rule | Kept and expanded | `references/existence-and-ownership.md` and `references/validation-and-acceptance.md`. |
| Compact active body plus progressive reference split | Kept | `SKILL.md:7-15`; `references/package-and-routing.md`. |
| Reference/script/asset/metadata placement rules | Kept | `references/package-and-routing.md`; `references/evidence-and-safety.md`. |
| Description trigger and frontmatter guidance | Kept and made normative | `references/package-and-routing.md`. |
| Validation checklist and provider implications | Kept and replaced with the full normative acceptance contract | `references/validation-and-acceptance.md`. |
| Human handoff fields (canonical home, active instructions, references, bundle impact, validation) | Kept as outcome, not a forced template | `SKILL.md:34-40`; output is proportional unless a reviewer contract needs A01–A35. |

## A35 archive-in-place originals

The exact pre-rewrite package is archived at `archive/triage-2026-07/shared/general/skill-authoring/`: `SKILL.md` plus the four prior references (213 lines / 9,240 bytes). The active directory was recreated only after the archive move.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is this pack's normative canonical-source, routing, safety, and acceptance contract. |
| A02 | PASS | Every retained skill creation, rewrite, and review needs the same repeatable contract. |
| A03 | PASS | Plugin scaffolding belongs to `plugin-creator`; one-shot plans to `planning-workflow`; the matrix above reserves pack-skill governance here. |
| A04 | PASS | Exactly one archetype: four-mode suite. |
| A05 | PASS | `shared/general/skill-authoring` uniquely matches `name: skill-authoring`. |
| A06 | PASS | Frontmatter has only name and one-line description. |
| A07 | PASS | Description is one physical line, two sentences, and within the 320-character suite budget. |
| A08 | PASS | The description names the contract, authoring, archetype, and acceptance gate. |
| A09 | PASS | Collision matrix defines first owners and handoffs for all claimed signals. |
| A10 | PASS | No greedy trigger or implicit persona activation appears. |
| A11 | PASS | Active body is 40 lines / 2,689 bytes, below suite limits. |
| A12 | PASS | Active body has only route, workflow, hard rules, output, and validation invocation. |
| A13 | PASS | The four route rows give one condition and exact existing file; it instructs selected-only reading. |
| A14 | PASS | References are 75–102 lines; package is 402 lines / 28,734 bytes; no hidden prose support files exist. |
| A15 | DEFERRED | Canonical package has no active duplicate; bundle/provider parity is excluded from this wave. |
| A16 | PASS | Four modes share the skill-authoring lifecycle and safety contract. |
| A17 | PASS | The mode table uses distinct kebab-case names, exact reference paths, and selected-first routing. |
| A18 | N/A | This is a suite, not a router. |
| A19 | N/A | This suite has modes rather than routed retained children. |
| A20 | PASS | The evidence reference requires repository state, live output, then primary docs for volatile facts. |
| A21 | PASS | The package contains the pack's own contract, not a copied external API manual or current matrix. |
| A22 | PASS | Pack constraints must name owner, rationale, and live compatibility check. |
| A23 | PASS | No secret-shaped values exist; secret constraints are explicit. |
| A24 | PASS | Discovery and reporting rules restrict output to safe identifiers/status and redaction. |
| A25 | PASS | Active package has no literal personal-home path; portable `$HOME`/tool-variable policy is retained. |
| A26 | PASS | Machine facts must be live-verified/profile-loaded and missing profiles fail clearly. |
| A27 | PASS | `bin/validate-skill.sh` is explicitly referenced and smoke-tested by this recorded invocation; no package-local script exists. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Archive-before-edit, precise routing, scope boundary, and validation evidence protect concrete pack failures without filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity and exposure are excluded from this wave. |
| A31 | DEFERRED | Composition dry runs and installed-view checks await the composition phase; local validation passed. |
| A32 | PASS | Compared against `herdr` and `code-quality`: compact command brain, selected references, archive evidence, and report artifacts match the golden shape. |
| A33 | N/A | This mandated contract migration replaces a 213-line overview with the full normative rubric; it is neither a consolidation nor a trim. |
| A34 | PASS | Preservation ledger above accounts for every pre-rewrite qualifying delta. |
| A35 | PASS | Exact original package exists under `archive/triage-2026-07/shared/general/skill-authoring/`. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/skill-authoring suite
PASS: shared/general/skill-authoring (suite)
```
