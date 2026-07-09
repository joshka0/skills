# Pilot acceptance — go-lang

## Result

- Canonical home: `shared/general/go-lang`
- Archetype: `suite`
- Active instructions: 42 lines / 2,689 bytes; three selected references: 19 lines each; package total: 99 lines / 6,606 bytes.
- Net shrink: 99 active package lines versus 476 lines across the seven replaced Go packages.
- Validator: `PASS: shared/general/go-lang (suite)`
- Composition status: intentionally deferred by pilot scope; `bundles/` and `providers/` were not edited or composed.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The retained delta is a compact, opinionated Go decision policy: public contracts are intentional, goroutines have owned lifetimes, and performance claims need comparable evidence. |
| A02 | PASS | Exported-contract, concurrency-lifetime, and verification decisions recur across Go changes; the merged kill list retains one conditional Go owner, though the zero-usage caveat remains a follow-up. |
| A03 | PASS | `code-quality` owns generic implementation, tests, and diagnosis; this suite owns only Go-specific contract, lifetime, and toolchain-evidence decisions. The six child skills are modes/references, not standalone owners. |
| A04 | PASS | Classified as a mode suite with three modes for one Go package/change lifecycle. |
| A05 | PASS | `shared/general/go-lang` matches `name: go-lang`; the validator confirmed unique canonical naming. |
| A06 | PASS | Frontmatter contains only `name` and a one-line `description`. |
| A07 | PASS | The description is one physical line (226 characters by the validator's measurement) and passed the suite 320-character mechanical gate. |
| A08 | PASS | It states the Go decision capability and ends with six concrete signals: exported API, error boundary, goroutine, race, benchmark, and module change. |
| A09 | PASS | The description and route separate Go API/lifetime/evidence decisions from `code-quality`'s generic code-shape, test, gate, architecture, and diagnosis modes. |
| A10 | PASS | No greedy trigger, persona, or implicit interaction activation remains. |
| A11 | PASS | `SKILL.md` is 42 lines / 2,689 bytes, below the suite 120-line / 10 KiB cap. |
| A12 | PASS | The active body contains selection, workflow, durable hard rules, stop conditions, output, and selected-reference routing only. |
| A13 | PASS | The route table gives one condition and one resolving reference for each mode, and instructs the executor to read only the selected reference. |
| A14 | PASS | Each reference is 19 lines (<250); the 99-line package is below both the 800-line standard cap and 1,200-line consolidated-owner cap. |
| A15 | PASS | The active package has no duplicated tutorial body or provider/bundle copy; replaced bodies are historical archive records, not active instructional sources. |
| A16 | PASS | The three modes share the lifecycle of making or reviewing a Go package change and fall within the two-to-eight mode range. |
| A17 | PASS | `public-contract`, `goroutine-lifetime`, and `verification-evidence` are distinct kebab-case modes with exact files; `public-contract` is the stated default. |
| A18 | N/A | This is a mode suite, not a router. |
| A19 | N/A | This is a mode suite with internal selected references, not routed child skills. |
| A20 | PASS | The active workflow requires repository state, live `go version` and installed help/docs, then primary Go documentation for version-sensitive behavior. |
| A21 | PASS | API lists, static command matrices, compatibility tables, and generic Go tutorials were removed; references retain only decision procedures. |
| A22 | N/A | No volatile version, API, pricing, or tool value is pinned as a pack constraint. |
| A23 | PASS | No credential-shaped value exists in the package; the targeted secret-pattern scan returned no matches. |
| A24 | PASS | The package does not perform secret discovery or output; it prescribes no environment dump or value-bearing diagnostic. |
| A25 | PASS | No literal user home path remains; the validator's portability check passed. |
| A26 | N/A | The package stores no machine-specific fact; installed toolchain and repository state are discovered live. |
| A27 | N/A | The package has no scripts. |
| A28 | N/A | The package has no assets or provider metadata. |
| A29 | PASS | The workflow and hard rules protect concrete Go commitments—export scope, goroutine ownership, error boundary, and measured performance—without generic coaching or filler. |
| A30 | DEFERRED | Pilot scope explicitly forbids bundle/provider edits; canonical-to-installed parity and exposure will be checked during composition. |
| A31 | DEFERRED | All three local reference paths resolve and the validator checked for repo-internal symlinks; compose dry runs and installed-view checks are deferred by scope. |
| A32 | PASS | Compared with the passing `code-quality` golden suite: one exact route table, a default mode, shared active policy, and short selected references. Rubric requirements controlled where the examples were silent. |
| A33 | PASS | The consolidation is strictly smaller than the seven replaced packages (99 < 476) and below every applicable absolute cap. |

## Archive moves

- `shared/general/go-lang` → `archive/triage-2026-07/shared/general/go-lang`
- `shared/general/go-lang-concurrency` → `archive/triage-2026-07/shared/general/go-lang-concurrency`
- `shared/general/go-lang-design` → `archive/triage-2026-07/shared/general/go-lang-design`
- `shared/general/go-lang-errors` → `archive/triage-2026-07/shared/general/go-lang-errors`
- `shared/general/go-lang-packages-api` → `archive/triage-2026-07/shared/general/go-lang-packages-api`
- `shared/general/go-lang-performance` → `archive/triage-2026-07/shared/general/go-lang-performance`
- `shared/general/go-lang-testing` → `archive/triage-2026-07/shared/general/go-lang-testing`

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/go-lang suite
PASS: shared/general/go-lang (suite)
```

## Follow-up

The triage evidence recorded no direct Go-skill invocation. Retain this deliberately narrow owner for the approved pilot, then reassess it after actual Go work or the next usage sweep; CUT remains appropriate if this policy does not recur.
