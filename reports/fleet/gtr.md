# Fleet acceptance — gtr

## Result

- Verdict: **PACKAGE-CONFORMS**; catalog composition is deferred.
- Archetype: private leaf; final package 54 lines / pre-rewrite package 586 lines.
- Validator: `PASS: shared/general/gtr (private-leaf)`.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| `git gtr`, gtr worktree, gtr workspace | `gtr` | `agent-orchestration` | gtr owns the installed worktree-runner lifecycle and configuration; orchestration owns dispatch policy. |
| Git worktree without gtr | repository Git workflow | `gtr` | Use gtr only when its tool is explicitly named or installed workflow is selected. |
| destructive worktree cleanup | `gtr` | generic shell | gtr requires resolved target and user confirmation. |

## A34 preservation ledger

| Original delta | Disposition |
| --- | --- |
| configured worktree topology and gtr-first lifecycle | Kept: `SKILL.md` and `references/operations.md`. |
| destructive `rm`/`clean` confirmation | Kept: `SKILL.md`. |
| parallel-agent isolation | Kept: `SKILL.md` and reference. |
| install recipes, adapter catalog, fixed paths, and static command manual | Dropped: volatile/current-help material or machine facts. |

## A35 archive

Exact original package: `archive/triage-2026-07/shared/general/gtr/`.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Private gtr topology and destructive lifecycle guardrails. |
| A02 | PASS | Isolated parallel worktrees recur. |
| A03 | PASS | Matrix separates gtr tool operation from dispatch. |
| A04 | PASS | Private leaf. |
| A05 | PASS | Unique matching canonical name. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line two-sentence description under 220 characters. |
| A08 | PASS | Names gtr/worktree signals. |
| A09 | PASS | Collision matrix records owners/handoffs. |
| A10 | PASS | No greedy trigger. |
| A11 | PASS | 28-line active body is within private-leaf cap. |
| A12 | PASS | Active file is routing, workflow, rules, output. |
| A13 | PASS | One explicit operations-reference condition. |
| A14 | PASS | 54-line package; 22-line reference. |
| A15 | DEFERRED | Bundle/provider duplication clause awaits composition. |
| A16 | N/A | No modes. |
| A17 | N/A | No modes. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Configuration and installed help are authoritative. |
| A21 | PASS | Static command/API catalog removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | No credentials or secret copying. |
| A24 | PASS | No secret discovery/output. |
| A25 | PASS | No literal personal-home path. |
| A26 | PASS | Topology is live-discovered. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Target/confirmation/ownership stops protect real failure modes. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Matches private-leaf golden shape. |
| A33 | PASS | 54 < 586 lines. |
| A34 | PASS | Ledger above accounts for qualifying deltas. |
| A35 | PASS | Exact package archived before rebuild. |

```text
PASS: shared/general/gtr (private-leaf)
```
