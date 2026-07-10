# Fleet acceptance — maestri

## Result

- Verdict: **PACKAGE-CONFORMS**; catalog composition is deferred.
- Archetype: mode suite; final package 55 lines / replaced packages 179 lines.
- Validator: `PASS: shared/general/maestri (suite)`.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| Maestri participant, canvas note, portal | `maestri` | `herdr` / local browser bridge | Maestri owns canvas CLI targets; Herdr owns Herdr panes; bridge owns extension transport. |
| shell command through a connected target | `maestri` → participant | generic agent dispatch | Literal target transport is the discriminator. |
| embedded portal UI | `maestri` → portal | local-http-browser-use | Canvas portal with accessibility refs wins. |

## A34 preservation ledger

| Original delta | Disposition |
| --- | --- |
| exact agent versus shell transport and timeout recovery | Kept: `participant-transport.md`. |
| note edit/name-change semantics | Kept: `notes.md`. |
| portal snapshot/ref/popup behavior | Merged: `portal.md`. |
| exhaustive CLI/selector manual and fixed timeout catalog | Dropped: current-help/public-manual detail. |

## A35 archive

Exact originals: `archive/triage-2026-07/shared/general/maestri/` and `archive/triage-2026-07/shared/general/maestri-portal/`.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Private canvas target/transport, notes, and portal semantics. |
| A02 | PASS | Maestri operation recurs in its workspace. |
| A03 | PASS | Matrix separates Maestri from Herdr/bridge/dispatch. |
| A04 | PASS | Three-mode suite. |
| A05 | PASS | Unique matching canonical name. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line suite description under 320 characters. |
| A08 | PASS | Names Maestri/canvas/note/portal signals. |
| A09 | PASS | Collision matrix resolves owners. |
| A10 | PASS | Narrow tool-specific trigger. |
| A11 | PASS | 36-line body within suite cap. |
| A12 | PASS | Active body routes shared transport/safety/output only. |
| A13 | PASS | Three exact selected-reference conditions. |
| A14 | PASS | 55-line package. |
| A15 | DEFERRED | Catalog clause awaits composition. |
| A16 | PASS | Modes share canvas discovery and safety lifecycle. |
| A17 | PASS | Kebab-case table and one-mode default. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Live list/help and snapshots govern syntax/state. |
| A21 | PASS | CLI and selector manual removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | Secret/PIN transport prohibited. |
| A24 | PASS | Discovery reports names/status, not values. |
| A25 | PASS | No literal personal-home path. |
| A26 | PASS | Targets/refs are live-discovered. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Literal transport, note preservation, consent, timeout stops are concrete. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Suite/references mirror golden shape. |
| A33 | PASS | 55 < 179 lines. |
| A34 | PASS | Ledger accounts for both packages. |
| A35 | PASS | Both exact originals archived before rebuild. |

```text
PASS: shared/general/maestri (suite)
```
