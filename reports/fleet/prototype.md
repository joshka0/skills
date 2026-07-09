# Fleet acceptance — prototype

## Result

- Verdict: **PACKAGE-CONFORMS**; catalog composition is deferred.
- Archetype: mode suite; final package 49 lines / pre-rewrite package 221 lines.
- Validator: `PASS: shared/general/prototype (suite)`.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| explicit prototype, state machine/data-model experiment | `prototype` → `logic` | `code-quality` | This owns throwaway executable learning, not production implementation. |
| explicit prototype, competing UI variations | `prototype` → `ui` | `design-family` | This owns temporary variant experiment; design-family owns durable UI work. |
| implementation plan/design decision without executable experiment | planning/design owner | prototype | Do not select prototype without a question to test. |

## A34 preservation ledger

| Original delta | Disposition |
| --- | --- |
| question-first, throwaway code, one run command | Kept: `SKILL.md`. |
| pure-state terminal harness and state visibility | Kept: `logic.md`. |
| structurally distinct UI variants, query switcher, cleanup | Kept: `ui.md`. |
| framework pseudo-code, visual specifics, fixed variation count | Dropped: generic/volatile tutorial detail. |

## A35 archive

Exact original package: `archive/triage-2026-07/shared/general/prototype/`.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Throwaway experiment shapes are a non-default decision technique. |
| A02 | PASS | Prototype questions recur. |
| A03 | PASS | Matrix separates experiment from production code/design. |
| A04 | PASS | Two-mode suite. |
| A05 | PASS | Unique matching canonical name. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line suite description under 320 characters. |
| A08 | PASS | Names prototype/state/UI signals. |
| A09 | PASS | Collision matrix defines first owners. |
| A10 | PASS | Explicit prototype request required. |
| A11 | PASS | 35-line body within suite cap. |
| A12 | PASS | Active file routes and sets shared prototype rules. |
| A13 | PASS | Two exact selected-reference conditions. |
| A14 | PASS | 49-line package. |
| A15 | DEFERRED | Catalog clause awaits composition. |
| A16 | PASS | Logic/UI modes share one disposable-experiment lifecycle. |
| A17 | PASS | Kebab-case table and one-mode default. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Existing repository toolchain is selected first. |
| A21 | PASS | Long framework/UI tutorial removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | No credentials; destructive mutation prohibited by default. |
| A24 | PASS | No secret discovery/reporting. |
| A25 | PASS | No literal personal-home path. |
| A26 | PASS | Repository conventions determine run/route details. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Throwaway marking, no persistence, and cleanup protect real failures. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Selected-reference suite follows golden shape. |
| A33 | PASS | 49 < 221 lines. |
| A34 | PASS | Ledger accounts for logic and UI deltas. |
| A35 | PASS | Exact original archived before rebuild. |

```text
PASS: shared/general/prototype (suite)
```
