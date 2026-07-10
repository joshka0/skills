# Drift and Imports

## Drift

- Drift is a signal about ownership, not just a nuisance
- Determine whether Terraform or manual cloud changes are meant to be authoritative
- Do not silence drift with `ignore_changes` by default

## Imports

- Import only when the long-term ownership model is clear
- Match imported resources with clean source definitions
- Remove ambiguity after import rather than leaving hybrid ownership in place

## Reconciliation

- Decide whether to adopt, replace, or leave unmanaged
- Make the end state explicit
- Watch address changes during refactors
