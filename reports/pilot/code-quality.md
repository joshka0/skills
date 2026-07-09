# Pilot acceptance — code-quality

## Result

- Canonical home: `shared/general/code-quality`
- Archetype: `suite` with 10 modes, permitted because it absorbs six former standalone skills.
- Active instructions: 49 lines / 3,308 bytes; package: 160 text lines / 11,579 bytes; longest reference: 13 lines.
- Replaced source packages: 3,093 text lines. New package: 160 lines (2,933-line / 94.8% reduction).
- Archive moves: old `code-quality`, `ruthless-test-strategy`, `thermo-nuclear-code-quality-review`, `quality-gate`, `improve-codebase-architecture`, `zero-tech-debt`, and `diagnose` now live under `archive/triage-2026-07/` at their original relative paths.
- Validator: `PASS: shared/general/code-quality (suite)`
- Composition status: intentionally deferred by pilot scope; `bundles/` and `providers/` were not edited or composed.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default owner delta is opt-in evidence-driven passes for code shape, test confidence, readiness, architecture, clean-slate refactoring, and diagnosis. |
| A02 | PASS | Each retained pass recurs through code change, review, and failure-resolution work. |
| A03 | PASS | Six overlapping owners were absorbed as named modes; their former trigger slots no longer remain under `shared/`. |
| A04 | PASS | Classified as one consolidated mode suite. |
| A05 | PASS | `shared/general/code-quality` matches unique `name: code-quality`; the validator confirmed uniqueness. |
| A06 | PASS | Frontmatter has only the canonical name and one-line description. |
| A07 | PASS | The two-sentence description is one physical line and 218 bytes, below the suite 320-character gate. |
| A08 | PASS | It states evidence-based quality modes and ends with six concrete selection signals. |
| A09 | PASS | The mode table gives one owner for sprawl, TDD, test strategy, regression, ShoeHorn migration, gate, architecture, and diagnosis requests. |
| A10 | PASS | No greedy default-coding claim or implicit harsh-review persona remains; harsh review requires an explicit request. |
| A11 | PASS | Validator passed the 49-line / 3,308-byte active suite body. |
| A12 | PASS | The active body contains route selection, shared workflow, hard rules, stops, and output only. |
| A13 | PASS | All 10 references are routed by exact table entry, resolve, and are selected one at a time. |
| A14 | PASS | The 160-line package and every 10–13-line reference are within their hard limits. |
| A15 | PASS | Mode-only guidance is in selected references; no script, asset, metadata, bundle, or provider copy was added. |
| A16 | PASS | The 10 modes share a code-change/review lifecycle and are allowed by the >=4-absorbed-skill exception. |
| A17 | PASS | The table uses distinct kebab-case names, exact files, and default single-mode selection. |
| A18 | N/A | This package is a suite, not a router. |
| A19 | N/A | This package is a suite, not a router. |
| A20 | PASS | Version-sensitive ShoeHorn guidance starts from installed package/lockfile/types and current primary docs. |
| A21 | PASS | Generic tutorials, tool catalogs, CodeRabbit mechanics, and copied API manuals were cut rather than retained. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | The active package contains no secrets or credential-oriented content. |
| A24 | PASS | Evidence requests are paths, check results, or reproduction signals; no secret discovery or output is prescribed. |
| A25 | PASS | No literal user-home path occurs in the active package. |
| A26 | PASS | Tool and repository facts are discovered from installed state, current code, and live help; missing evidence is reported. |
| A27 | PASS | No active scripts exist; the unsafe legacy diagnosis HITL template remains archived rather than copied. |
| A28 | PASS | No active assets or provider metadata exist. |
| A29 | PASS | Shared rules preserve concrete scope, evidence, public-behavior, mock-boundary, and no-unrequested-fix-loop constraints without persona filler. |
| A30 | DEFERRED | Canonical semantic parity is ready, but bundle/provider parity cannot be claimed while the task forbids composition changes. |
| A31 | DEFERRED | Local route resolution and validator no-internal-symlink checks pass; compose dry runs and installed-view checks wait for the permitted composition phase. |
| A32 | PASS | This is the designated mode-suite golden example; it was independently reviewed against the normative rubric with no in-scope finding. |
| A33 | PASS | The new 160-line owner is strictly smaller than 3,093 replaced source lines and below the 1,200-line consolidated-owner cap. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/code-quality suite
PASS: shared/general/code-quality (suite)
```

Independent canonical/archive review found no in-scope revision item. The later composition pass must remove obsolete child exposure and establish bundle/provider parity before A30/A31 can close.
