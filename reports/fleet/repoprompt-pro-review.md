# Fleet acceptance — repoprompt-pro-review

## Result

- Verdict: **PACKAGE-CONFORMS**; catalog composition is deferred.
- Archetype: private leaf; final package 27 lines / pre-rewrite package 148 lines.
- Validator: `PASS: shared/general/repoprompt-pro-review (private-leaf)`.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| RepoPrompt export or ChatGPT Pro review context | `repoprompt-pro-review` | generic external review | This owns RepoPrompt selection/prompt constraints and bounded export. |
| ordinary in-repo review | `code-quality` | RepoPrompt export | Use this only when a context export is requested. |
| context-builder/Oracle request | user-directed tool workflow | this leaf | This leaf explicitly excludes those operations. |

## A34 preservation ledger

| Original delta | Disposition |
| --- | --- |
| selection-only, no Context Builder/Oracle/send policy | Kept: `SKILL.md`. |
| full-versus-slice choice and token reduction loop | Kept: `SKILL.md`. |
| prompt contents and export handoff evidence | Kept: `SKILL.md`. |
| copied JSON operation catalog and fixed export path | Dropped: tool-manual/host-path detail. |

## A35 archive

Exact original package: `archive/triage-2026-07/shared/general/repoprompt-pro-review/`.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Private RepoPrompt selection/export constraints. |
| A02 | PASS | External-review exports recur. |
| A03 | PASS | Matrix separates export from ordinary review. |
| A04 | PASS | Private leaf. |
| A05 | PASS | Unique matching canonical name. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line description within 220 characters. |
| A08 | PASS | Names RepoPrompt/ChatGPT Pro/review export signals. |
| A09 | PASS | Collision matrix records boundaries. |
| A10 | PASS | No greedy generic-review trigger. |
| A11 | PASS | 27-line body within cap. |
| A12 | PASS | Active workflow/rules/output only. |
| A13 | N/A | No references. |
| A14 | PASS | 27-line package. |
| A15 | DEFERRED | Catalog clause awaits composition. |
| A16 | N/A | No modes. |
| A17 | N/A | No modes. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Live tool surface is used rather than copied syntax. |
| A21 | PASS | Operation JSON catalog removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | Rules prohibit secret inclusion. |
| A24 | PASS | Safe relative paths and bounded output. |
| A25 | PASS | No literal personal-home path. |
| A26 | PASS | User-approved export path is required. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Token, dirty-worktree, and tool-scope rules protect real failures. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Compact private-leaf shape follows golden evidence standard. |
| A33 | PASS | 27 < 148 lines. |
| A34 | PASS | Ledger above accounts for qualifying deltas. |
| A35 | PASS | Exact original archived before rebuild. |

```text
PASS: shared/general/repoprompt-pro-review (private-leaf)
```
