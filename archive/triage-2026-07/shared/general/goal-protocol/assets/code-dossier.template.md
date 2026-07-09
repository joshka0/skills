# Code Dossier - <goal name>

## Feature Contract

| ID | Feature / Non-feature | Summary | Parent | Status |
|---|---|---|---|---|
| F001 | Feature | | G001 | draft |
| NF001 | Non-feature | | G001 | draft |

## Codebase Recon

- Relevant modules:
- Existing patterns:
- Reusable helpers:
- Files likely involved:
- Files not to touch:
- Verification commands:

## Behavior Matrix

| ID | Actor | Trigger | Main path | Failure paths | Acceptance criteria | Parent |
|---|---|---|---|---|---|---|
| B001 | | | | | | F001 |

## Data Structures

| ID | Name | Purpose | Fields / lifecycle | Invariants | Parent |
|---|---|---|---|---|---|
| S001 | | | | | B001 |

## Interfaces

| ID | Name | Signature / contract | Errors | Side effects | Parent |
|---|---|---|---|---|---|
| I001 | | | | | B001/S001 |

## Tests

| ID | Type | Name | Proves | Command | Parent |
|---|---|---|---|---|---|
| T001 | | | | | B001/I001 |

## Location Map

| ID | File | Allowed change | Forbidden change | Parent |
|---|---|---|---|---|
| L001 | | | | F001/I001/T001 |

## Spike Report

- Spike required: yes/no
- Findings:
- Blueprint changes needed:
- Reverted: yes/no

## Invariants

| ID | Rule | Enforcement | Tests | Failure consequence |
|---|---|---|---|---|
| V001 | | | | |

## Traceability Matrix

| Feature | Behavior | Structure | Interface | Test | Location | Status |
|---|---|---|---|---|---|---|
| F001 | B001 | S001 | I001 | T001 | L001 | draft |

## Verification Report

- Commands run:
- Result:
- Known risks:
- Confidence:
