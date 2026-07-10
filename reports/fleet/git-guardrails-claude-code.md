# Fleet acceptance — git-guardrails-claude-code

## Result

- Verdict: **PACKAGE-CONFORMS**; composition is deferred.
- Archetype: private leaf; final package 55 lines / pre-rewrite package 120 lines.
- Validator: `PASS: shared/general/git-guardrails-claude-code (private-leaf)`.
- Script smoke test: blocked sample exited 2 with a generic notice; ordinary `git status` exited 0.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| Claude PreToolUse Git blocker | `git-guardrails-claude-code` | generic Git safety | This owns the Claude hook and packaged script. |
| live Git destructive action | user/repository policy | guardrail | The hook blocks named patterns but is not a substitute for authorization. |
| generic commit/lint hook setup | repository tooling | guardrail | This package only guards destructive Git invocations. |

## A34 preservation ledger

| Original delta | Disposition |
| --- | --- |
| packaged PreToolUse blocker | Kept: `scripts/block-dangerous-git.sh`. |
| project-versus-user scope and non-overwrite settings merge | Kept: `SKILL.md` and `references/hook-shape.md`. |
| blocked-pattern verification | Kept: active workflow and smoke test. |
| verbose static settings examples and echoed command text | Dropped: version-sensitive duplication and secret-risk output. |

## A35 archive

Exact original package: `archive/triage-2026-07/shared/general/git-guardrails-claude-code/`.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Deterministic Claude hook installation and safe blocked-command contract. |
| A02 | PASS | Guardrail setup recurs across Claude projects. |
| A03 | PASS | Matrix separates this hook from generic Git policy/tooling. |
| A04 | PASS | Private leaf. |
| A05 | PASS | Unique matching canonical name. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line description within 220 characters. |
| A08 | PASS | Names Claude guardrails and destructive Git signals. |
| A09 | PASS | Collision matrix supplies precedence. |
| A10 | PASS | Narrow explicit setup trigger. |
| A11 | PASS | 27-line body within private-leaf cap. |
| A12 | PASS | Only selection, install, safety, output, reference routing. |
| A13 | PASS | Hook-shape reference has one scope-selection condition. |
| A14 | PASS | 55-line package; no hidden prose. |
| A15 | DEFERRED | Catalog clause awaits composition. |
| A16 | N/A | No modes. |
| A17 | N/A | No modes. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Existing settings and installed Claude convention are checked. |
| A21 | PASS | Long static settings tutorial removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | Script suppresses intercepted command text. |
| A24 | PASS | No secret discovery; generic output only. |
| A25 | PASS | Scope uses project/config variables, not personal literals. |
| A26 | PASS | Target settings/hook existence is verified. |
| A27 | PASS | Script is referenced, prerequisite-checked, deterministic, smoke-tested, and fails closed. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Scope, merge, failure, and verification rules are concrete. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Uses compact private-leaf active/reference/script shape. |
| A33 | PASS | 55 < 120 lines. |
| A34 | PASS | Ledger above covers original deltas. |
| A35 | PASS | Exact original archived before rebuild. |

```text
PASS: shared/general/git-guardrails-claude-code (private-leaf)
```
