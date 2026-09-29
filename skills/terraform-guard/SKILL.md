---
name: terraform-guard
description: "Gate an agent-run Terraform/OpenTofu apply behind an exact saved-plan action contract. Use before any AI-run plan or apply."
---

# terraform-guard

`terraform-guard` (on `PATH`; source `scripts/terraform-guard`) is the only apply path for an agent.

1. `terraform-guard plan --tool <tofu|terraform> --environment <env> --workspace <ws> --plan <path> --expect-create N --expect-update N --expect-replace N --expect-delete N --expect-forget N`
   - Writes the saved plan and a hash-bound `<plan>.gate.json` receipt only when the actual actions match every count.
   - A replace or delete needs `--allow-destructive`. A state forget needs `--allow-state-forget`.
2. `terraform-guard apply --plan <path>`: rechecks the hash, counts, cwd, and workspace, then applies that exact plan.
3. Run a fresh gated plan and require zero changes.
4. `terraform-guard dispose --plan <path>`: moves the sensitive plan artifacts to Trash.

Never: a bare `terraform apply`, state edits as a first fix, `-target` as routine delivery, or secrets in variables or outputs.
