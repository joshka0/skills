# Infrastructure Bundles AI apply gate acceptance

## Decision

- Canonical owner: `skills/infra-bundles`
- Archetype: router with four selected infrastructure risk surfaces
- Selected contract surfaces: existence and ownership, evidence and safety,
  validation and acceptance
- Pre-rewrite git ref: `1094b00f6fa9bdad35be37a7efedb911f028a7f0`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED**. The change does not alter skill exposure, and
  no provider composition was run.

The non-default delta is a fail-closed AI apply contract. It binds exact action
counts, environment, workspace, tool, working directory, and plan hash before
Terraform or OpenTofu can apply a saved plan. State forgets have their own
expected count and explicit permission.

The existence decision is **MERGE into `infra-bundles`**. A separate apply-gate
skill would collide with the existing `iac-operations` route and add no useful
trigger boundary.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| Terraform/OpenTofu plan or apply | `infra-bundles` to `iac-operations` | `code-quality` | Declared infrastructure state, provider effects, and apply safety stay with `infra-bundles`; application-source diagnosis stays with `code-quality`. |
| Terraform/OpenTofu ownership design | `infra-bundles` to `iac-platform` | `iac-operations` | Module, backend, provider, state, IAM, or ownership design selects `iac-platform`; delivery of an accepted design selects `iac-operations`. |
| AI-run IaC apply | `infra-bundles` to `iac-operations` | generic shell execution | The saved-plan expectation and hash contract wins before a tool apply command can run. |
| local worktree or secret handoff | `local-dev` | `infra-bundles` | Worktree routing and named-secret injection stay with `local-dev`; infrastructure plan and provider actions stay with `infra-bundles`. |
| IaC implementation plan | `planning-workflow` | `infra-bundles` | A requested planning artifact stays with `planning-workflow` until desired or live infrastructure behavior becomes the decision. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Exact provider and state-action expectations, a hash-bound receipt, and same-plan apply exceed generic strong-agent behavior. |
| A02 | PASS | Terraform and OpenTofu applies recur across infrastructure repositories and environments. |
| A03 | PASS | The collision matrix assigns the delta to the existing `iac-operations` owner instead of creating a sibling. |
| A04 | PASS | The retained package remains exactly one router. |
| A05 | PASS | `skills/infra-bundles` matches the unique `name: infra-bundles`. |
| A06 | PASS | Frontmatter remains the existing minimal name and description pair. |
| A07 | PASS | The existing one-line router description remains within its 320-character budget. |
| A08 | PASS | The description names the routed capability and concrete Kubernetes and IaC triggers. |
| A09 | PASS | The collision matrix records a first owner and handoff for each related trigger. |
| A10 | PASS | No new greedy trigger, alias, or implicit interaction mode was added. |
| A11 | PASS | `SKILL.md` is 49 lines and 3,371 bytes, below router limits. |
| A12 | PASS | The active router remains limited to route, precedence, workflow, rules, stops, and output. |
| A13 | PASS | The existing `iac-operations` route selects the reference that names the wrapper. |
| A14 | PASS | All references remain below 250 lines; the package is 467 text lines. |
| A15 | DEFERRED | Package prose is non-duplicative: the invariant exists once in `iac-operations`, and executable detail exists only in the script. Catalog and provider parity await composition. |
| A16 | N/A | Not a mode suite. |
| A17 | N/A | Not a mode suite. |
| A18 | PASS | The router keeps four distinct infrastructure targets and selective loading. |
| A19 | DEFERRED | All four targets are one-hop local references with no cycle. Overlay exposure awaits composition. |
| A20 | PASS | The workflow detects the installed tool; plan JSON is read from that installed tool. |
| A21 | PASS | No external manual, provider matrix, or generic IaC tutorial was added. |
| A22 | N/A | No version, provider behavior, or other volatile pack constraint is pinned. |
| A23 | PASS | Redacted `gitleaks` scan found no leaks. The receipt excludes plan arguments and values. |
| A24 | PASS | Standard output contains resource addresses, action counts, hashes, status, and protected artifact paths only. |
| A25 | PASS | Canonical content has no literal personal-home path. Runtime paths are discovered from inputs and `$PWD`. |
| A26 | PASS | Missing tools, plan directories, workspaces, receipts, and hashes fail clearly. |
| A27 | PASS | `scripts/iac-apply-gate` is referenced, deterministic, fail-closed, executable, and smoke-tested with OpenTofu and Terraform. |
| A28 | N/A | No asset or provider metadata was added. |
| A29 | PASS | Exact counts, unknown-action rejection, separate destructive and state-forget opt-ins, no-overwrite behavior, same-directory check, same-workspace check, and plan hashing protect concrete failures. |
| A30 | DEFERRED | Canonical catalog and provider exposure were unchanged and were not recomposed. |
| A31 | DEFERRED | Local references and the no-symlink check pass; installed-view composition was not required for this package-only change. |
| A32 | PASS | The package keeps the compact `infra-bundles` router shape and follows the pilot pattern of active routing plus deferred operational detail. |
| A33 | N/A | This is an additive safety extension, not a consolidation or trim. |
| A34 | PASS | The preservation ledger accounts for the requested and excluded deltas. |
| A35 | PASS | The complete pre-rewrite package exists at git ref `1094b00f6fa9bdad35be37a7efedb911f028a7f0`. |

## Preservation ledger

| Delta | Disposition | Owner or path |
| --- | --- | --- |
| Exact create, update, replace, and delete expectations | Kept | `scripts/iac-apply-gate` |
| Explicit environment and workspace checks | Kept | `scripts/iac-apply-gate` |
| Saved-plan hash receipt and same-plan apply | Kept | `scripts/iac-apply-gate` |
| Destructive replace/delete opt-in | Kept | `scripts/iac-apply-gate` |
| State-forget count and separate opt-in | Kept | `scripts/iac-apply-gate` |
| Compact safe audit records | Kept | `scripts/iac-apply-gate` standard output |
| Protected plan and apply logs | Kept | Runtime artifacts with mode `0600` |
| Fresh zero-change verification after apply | Kept | `references/iac-operations.md` |
| Recoverable artifact disposal | Kept | `scripts/iac-apply-gate dispose` using macOS Trash |
| New standalone skill and trigger | Merged | Existing `infra-bundles` to `iac-operations` owner |
| State surgery and targeted delivery | Excluded | Existing `iac-operations` hard rules |
| Environment credential selection | Excluded | Repository instructions remain authoritative |

## Validation evidence

```text
$ bin/validate-skill.sh skills/infra-bundles router
PASS: skills/infra-bundles (router)

$ bash -n skills/infra-bundles/scripts/iac-apply-gate
exit 0

$ shellcheck skills/infra-bundles/scripts/iac-apply-gate
exit 0

$ gitleaks detect --no-git --source skills/infra-bundles --redact --no-banner
no leaks found
```

OpenTofu 1.12.1 smoke evidence:

- A wrong expected create count returned nonzero and wrote no receipt.
- A zero-change plan wrote a receipt, applied the same plan, and produced a
  fresh zero-change verification plan.
- A one-create plan listed `terraform_data.smoke` and matched the expected
  count.
- A no-destroy `removed` block reported one state forget. The wrapper rejected
  it without `--allow-state-forget`, accepted it with the flag, applied the
  hash-bound plan, and then produced a zero-change verification plan.
- Every generated plan artifact moved to Trash.

Terraform 1.12.2 smoke evidence:

- A one-create plan wrote a hash-bound receipt and applied the same plan.
- The next plan reported zero mutations and one no-op resource.
- Every generated plan artifact moved to Trash.

The canonical package conforms. Catalog composition remains deferred because
the change does not alter exposure.
