# Fleet acceptance — peon-ping

## Result

- Verdict: **PACKAGE-CONFORMS**; catalog composition is deferred.
- Archetype: private leaf; final package 32 lines / 1,687 bytes; fleet pre-revision body was 26 lines / 1,358 bytes; original package was 57 lines.
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
| portable hook/config topology | Kept: `SKILL.md` Hook topology names `${CLAUDE_CONFIG_DIR:-$HOME/.claude}/hooks/peon-ping/config.json` and the sibling `peon.sh`. |
| mute/resume and available-pack entrypoints | Kept: `SKILL.md` workflow invokes `peon.sh toggle` and `peon.sh packs list`; other command syntax remains live-help discovered. |
| field-scoped settings operation | Kept as live-help/field-update workflow. |
| static pack list and full configuration schema | Dropped: volatile schema/catalog and unrelated config disclosure. |

## A35 archive

Exact original: `archive/triage-2026-07/shared/claude/peon-ping/`. The prior fleet body is preserved before this correction at `archive/triage-2026-07/revision-pass/shared/claude/peon-ping/`.

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
| A11 | PASS | 32-line / 1,687-byte body is within the private-leaf cap. |
| A12 | PASS | Active body has only workflow/rules/output. |
| A13 | N/A | No references. |
| A14 | PASS | 32-line package; no hidden prose support files. |
| A15 | DEFERRED | Catalog clause awaits composition. |
| A16 | N/A | No modes. |
| A17 | N/A | No modes. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | The durable topology and two entrypoints are explicit; installed hook help/config remains authoritative for changing command/schema behavior. |
| A21 | PASS | Static schema and pack catalog removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | Full configuration dump prohibited. |
| A24 | PASS | Only requested field/status is reported. |
| A25 | PASS | Uses `$HOME`/configuration variable, no literal personal path. |
| A26 | PASS | The exact portable config/entrypoint paths are verified before action and live options are discovered. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Field-scoped update and unsupported-value stop are concrete. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Compared with accepted pilot artifact `reports/pilot/herdr.md`: both keep non-inferable local topology and safety in a compact active body while moving changing command detail to live help. |
| A33 | PASS | 32 < 57 lines. |
| A34 | PASS | Ledger covers qualifying delta. |
| A35 | PASS | Exact original is archived and the pre-correction fleet package is preserved in `revision-pass`. |

```text
PASS: shared/claude/peon-ping (private-leaf)
```
