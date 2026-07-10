# Fleet disposition — setup-pre-commit

## Result

**CUT.** No active package remains, so a skill validator result and package-conformance verdict do not apply.

## Collision matrix

| Former signal | First owner | Nearest competitor | Disposition |
| --- | --- | --- | --- |
| Husky/lint-staged/Prettier pre-commit setup | repository convention and user request | `code-quality` | No durable private delta: stack, package manager, commands, and hooks are repository-specific. |

## A34 preservation ledger

| Original material | Disposition |
| --- | --- |
| package-manager detection and hook installation | Dropped: generic setup inferred from repository conventions. |
| Husky/lint-staged/Prettier defaults and auto-commit | Dropped: volatile stack assumptions and unsafe automatic commit. |
| typecheck/test hook suggestion | Dropped: must follow the repository's actual validation contract. |

## A35 archive

Exact original package: `archive/triage-2026-07/shared/general/setup-pre-commit/`.

## Checklist disposition

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | CUT | The source contains generic setup defaults, not a non-default pack delta. |
| A02 | CUT | Package-manager/hook choices must be repository-specific. |
| A03 | CUT | No named owner is needed because no qualifying delta survives. |
| A04 | N/A | No retained package. |
| A05 | N/A | No retained package. |
| A06 | N/A | No retained package. |
| A07 | N/A | No retained package. |
| A08 | N/A | No retained package. |
| A09 | PASS | Collision matrix identifies the repository as first owner. |
| A10 | PASS | Greedy setup trigger is removed with the package. |
| A11 | N/A | No active body. |
| A12 | N/A | No active body. |
| A13 | N/A | No active references. |
| A14 | N/A | No active package. |
| A15 | N/A | No active package. |
| A16 | N/A | No modes. |
| A17 | N/A | No modes. |
| A18 | N/A | No router. |
| A19 | N/A | No router. |
| A20 | PASS | Volatile stack details were removed. |
| A21 | PASS | Copied setup manual is archived, not retained. |
| A22 | N/A | No retained pinned value. |
| A23 | PASS | Auto-commit behavior is removed. |
| A24 | N/A | No active discovery workflow. |
| A25 | PASS | Archived source is not active canonical content. |
| A26 | N/A | No active machine fact. |
| A27 | N/A | No active script. |
| A28 | N/A | No active asset/metadata. |
| A29 | PASS | Existence-bar cut avoids unsafe automatic commit behavior. |
| A30 | N/A | No retained catalog entry. |
| A31 | N/A | No retained catalog entry. |
| A32 | PASS | Cut follows the rubric existence bar, not a cosmetic trim. |
| A33 | N/A | No replacement package. |
| A34 | PASS | Ledger accounts for all source material and the existence-bar reason. |
| A35 | PASS | Exact original is archived. |
