# Fleet acceptance — peon-ping

## Result

- Verdict: **PACKAGE-CONFORMS**; catalog composition is deferred.
- Archetype: private leaf; final package 26 lines / pre-rewrite package 57 lines.
- Validator: `PASS: shared/claude/peon-ping (private-leaf)`.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| peon-ping, sound mute/resume, sound pack | `peon-ping` | generic Claude settings | This owns the installed peon-ping hook only. |
| Claude notification behavior outside hook | provider configuration | peon-ping | Do not claim general provider settings. |
| full config inspection | user-approved local operation | peon-ping | Read only the requested field; do not dump config. |

## A34 preservation ledger

| Original delta | Disposition |
| --- | --- |
| installed hook/config location and toggle action | Kept: `SKILL.md`. |
| pack/category/settings operation | Kept as live-help/field-update workflow. |
| static pack list and full configuration schema | Dropped: volatile schema/catalog and unrelated config disclosure. |

## A35 archive

Exact original: `archive/triage-2026-07/shared/claude/peon-ping/`.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Private installed notification-hook control contract. |
| A02 | PASS | Sound configuration can recur. |
| A03 | PASS | Matrix separates hook-specific control from generic Claude settings. |
| A04 | PASS | Private leaf. |
| A05 | PASS | Unique matching name under `shared/claude`. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line description within 220 characters. |
| A08 | PASS | Names peon-ping/sound controls. |
| A09 | PASS | Collision matrix supplies ownership. |
| A10 | PASS | Narrow named-hook trigger. |
| A11 | PASS | 26-line body within cap. |
| A12 | PASS | Active body has only workflow/rules/output. |
| A13 | N/A | No references. |
| A14 | PASS | 26-line package. |
| A15 | DEFERRED | Catalog clause awaits composition. |
| A16 | N/A | No modes. |
| A17 | N/A | No modes. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Installed hook help/config is authoritative. |
| A21 | PASS | Static schema and pack catalog removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | Full configuration dump prohibited. |
| A24 | PASS | Only requested field/status is reported. |
| A25 | PASS | Uses `$HOME`/configuration variable, no literal personal path. |
| A26 | PASS | Hook/config existence and live options are verified. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Field-scoped update and unsupported-value stop are concrete. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Private-leaf shape follows golden evidence. |
| A33 | PASS | 26 < 57 lines. |
| A34 | PASS | Ledger covers qualifying delta. |
| A35 | PASS | Exact original archived before rebuild. |

```text
PASS: shared/claude/peon-ping (private-leaf)
```
