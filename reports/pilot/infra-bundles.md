# Pilot acceptance — infra-bundles

## Verdict

**PACKAGE-CONFORMS.** All package-judgable acceptance items pass. The bundle/provider portions of A15 and A19, plus A30 and A31, are explicitly **DEFERRED** because this pilot scope forbids composition work.

## Result

- Canonical home: `shared/general/infra-bundles`
- Archetype: `router` with four one-hop risk surfaces.
- Active instructions: 49 lines / 3,332 bytes; package: 94 text lines / 7,636 bytes.
- Replaced source packages: old `infra-bundles`, `k8s-op`, `kubernetes-platform`, `terraform-op`, and `terraform-platform` total 1,184 text lines. The retained package is 94 lines, a 1,090-line reduction.
- Owner decision: the user explicitly chose to retain one infra router and archive the other in-scope packages despite zero direct observed usage. This is a retained high-stakes safety boundary, not an inference from usage.
- Composition status: intentionally deferred by pilot scope; `bundles/` and `providers/` were not edited or composed.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is a high-stakes Kubernetes/IaC router that requires desired/live comparison, evidence before mutation or restart, explicit ownership, semantic plan review, and real rollback limits. |
| A02 | PASS | The user made the owner decision to retain this one router and archive the rest despite zero observed invocations; repeatability is now an explicit pack decision rather than an unsupported usage claim. |
| A03 | PASS | `code-quality` owns source-code diagnosis, `planning-workflow` owns product/implementation planning, and this router owns Kubernetes/IaC declared-versus-live work. The four archived operational/platform packages survive only as selected-reference deltas, not sibling packages. |
| A04 | PASS | Classified as a router with four independently selectable, substantial risk surfaces. |
| A05 | PASS | `shared/general/infra-bundles` matches unique `name: infra-bundles`; the validator checks canonical uniqueness. |
| A06 | PASS | Frontmatter contains only `name` and the required one-line description. |
| A07 | PASS | The two-sentence description is one physical line and below the router 320-character limit. |
| A08 | PASS | The description names its four surfaces and ends with six concrete signals: Kubernetes cluster, Terraform/OpenTofu state, Terraform/OpenTofu plan, IaC drift, infrastructure recovery, and Kubernetes rollout. |
| A09 | PASS | The collision matrix below assigns a first owner and discriminator for every claimed signal and records explicit diagnosis/planning precedence. |
| A10 | PASS | The description has no bare `state` or `plan`, no greedy trigger, and no implicit interaction activation. |
| A11 | PASS | `SKILL.md` is 49 lines / 3,332 bytes, below the router 80-line / 6 KiB cap; the mechanical validator passes. |
| A12 | PASS | The active body contains only routing, neighbor precedence, shared workflow, durable safety rules, stop conditions, and output. |
| A13 | PASS | Each of the four route rows has one observable selection condition and one resolving local reference; the active body requires reading only the selected reference. |
| A14 | PASS | References are 10–13 lines each and the 94-line / 7,636-byte package is below all hard caps, with no support-file prose. |
| A15 | DEFERRED (bundle/provider clause) | The canonical active body and selected references do not duplicate a former active package. Bundle/provider parity and stale installed copies are out of scope and are not claimed as passing. |
| A16 | N/A | This package is a router, not a mode suite. |
| A17 | N/A | This package is a router, not a mode suite. |
| A18 | PASS | Four substantial surfaces—Kubernetes operations, Kubernetes platform, IaC operations, and IaC platform—justify selective loading and fit the three-to-eight router rule. |
| A19 | DEFERRED (overlay-exposure clause) | Each target resolves in one hop to a reference and has no cycle; the default-overlay no-router-plus-children condition awaits the composition phase. |
| A20 | PASS | The workflow resolves volatile facts from repository state, installed tool/live output, then current primary documentation. |
| A21 | PASS | Copied Kubernetes/Terraform manuals, API matrices, version tables, and static command catalogs were cut; only durable operational decisions remain. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | The package contains no credential-shaped value and prohibits plaintext secret handling. |
| A24 | PASS | It does not prescribe secret discovery or value output; evidence gathering is target-scoped and reporting is status/risk based. |
| A25 | PASS | No literal user-home path appears; the validator portability check passes. |
| A26 | PASS | Environment, ownership, access, and rollback facts are discovered before risky mutation; missing facts stop the action rather than being guessed. |
| A27 | N/A | The package has no scripts. |
| A28 | N/A | The package has no assets or provider metadata. |
| A29 | PASS | Audit-before-mutate, declarative convergence, scoped exposure, semantic plan review, state safety, and rollback reality are concrete high-stakes rules without tutorial filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity and final exposure cannot be checked without the composition work this pilot forbids. |
| A31 | DEFERRED | Local reference resolution and the validator's no-internal-symlink check pass; compose dry runs and installed-view inspection await the permitted phase. |
| A32 | PASS | The router uses the golden compact shape: one route table, one selected target, shared safety, and short references. The converged reviews required qualified metadata and explicit owner precedence, which this revision applies. |
| A33 | PASS | The 94-line active package is strictly smaller than the 1,184-line replaced set and below every absolute cap. |
| A34 | PASS | The preservation ledger below accounts for each qualifying non-default delta of every archived in-scope original. |
| A35 | PASS | The archive inventory below proves that the original of every touched in-scope skill, including the in-place `infra-bundles` rewrite, exists under this wave's archive path. |

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| Kubernetes cluster | `infra-bundles` | `code-quality` | Use this router when declared manifests/chart inputs must be compared with live cluster evidence; hand source-code root causes to `code-quality`. |
| Terraform/OpenTofu state | `infra-bundles` | `planning-workflow` | State is an IaC ownership artifact; product or implementation planning without declared/live IaC behavior stays with its planning owner. |
| Terraform/OpenTofu plan | `infra-bundles` | `planning-workflow` | A Terraform/OpenTofu plan is a semantic infrastructure review artifact, not a product or implementation plan. |
| IaC drift | `infra-bundles` | `code-quality` | Drift is a configuration/state/provider ownership mismatch; application-source diagnosis remains with `code-quality`. |
| Infrastructure recovery | `infra-bundles` | `code-quality` | Select this router for cluster/provider stabilization, evidence, blast-radius, rollback, or repair; hand code-only failures to `code-quality`. |
| Kubernetes rollout | `infra-bundles` | `planning-workflow` | Select this router for live/declarative rollout safety; planning an implementation without a Kubernetes desired/live decision belongs to its planning owner. |
| Source-code diagnosis | `code-quality` | `infra-bundles` | `code-quality` wins unless cluster/provider declared/live state is the decision surface. |
| Product or implementation planning | `planning-workflow` | `infra-bundles` | The planning owner wins until a Kubernetes/IaC desired or live behavior is the concrete decision. |

## Preservation ledger

| Archived original | Qualifying non-default delta | Classification |
| --- | --- | --- |
| `shared/general/infra-bundles` | Domain-first, risk-surface routing rather than a broad infrastructure tutorial | Kept at `shared/general/infra-bundles/SKILL.md` Route. |
| `shared/general/infra-bundles` | Audit before mutation, reviewed evidence before application, rollback and secret boundaries | Merged into `SKILL.md` Workflow/Hard rules and `references/iac-operations.md`. |
| `shared/codex/k8s-op` | Desired/live evidence before restart, concrete hypothesis, narrow reversible action, and verified recovery | Kept at `references/kubernetes-operations.md` steps 1–4 and `SKILL.md` Hard rules. |
| `shared/codex/k8s-op` | Traffic evidence must trace workload, Service, endpoints, edge routing, DNS, then policy; do not widen exposure as a shortcut | Kept at `references/kubernetes-operations.md` step 5. |
| `shared/codex/k8s-op` | Immutable image, least-privilege, secret, resource/probe, exposure, and backup/restore boundaries | Merged into `SKILL.md` Hard rules and `references/kubernetes-platform.md`. |
| `shared/codex/kubernetes-platform` | Declarative desired state, smallest blast radius, evidence before restart/rollback, and source-controlled durable outcomes | Kept at `SKILL.md` Workflow and Hard rules. |
| `shared/codex/kubernetes-platform` | Real-serving readiness, stateful backup/restore, resource ownership, and explicit ingress/identity/network contracts | Kept at `references/kubernetes-platform.md`. |
| `shared/codex/kubernetes-platform` | Workload-kind/API catalogs and controller-specific command guidance | Dropped: volatile external manual material; inspect installed tooling and current primary docs instead. |
| `shared/codex/terraform-op` | Configuration/state/provider ownership, drift evidence, and semantic replacement/downtime/rollback review | Kept at `references/iac-operations.md` steps 2–4. |
| `shared/codex/terraform-op` | No blind apply, routine targeting, premature state surgery, secret exposure, or casual identity widening | Kept at `SKILL.md` Hard rules and `references/iac-operations.md`. |
| `shared/codex/terraform-op` | Cost reduction that changes reliability or retention needs an owner/product decision | Kept at `references/iac-operations.md` final rule. |
| `shared/codex/terraform-platform` | Declarative source-first delivery, plan semantics, no-destroy skepticism, and high-risk state/import/backend/replacement handling | Kept at `SKILL.md` Workflow/Hard rules and `references/iac-operations.md`. |
| `shared/codex/terraform-platform` | Intentional provider/module constraints, explicit aliases/auth, locks, migration/source cleanup, least privilege, and CI/GitOps ownership | Kept at `references/iac-platform.md`. |
| `shared/codex/terraform-platform` | Drift is an ownership signal and must not be suppressed to hide ambiguity | Kept at `references/iac-operations.md` step 2 and final rule. |
| All five sources | Mode catalogs, generic audit/output templates, and version-sensitive provider/Kubernetes API or CLI manuals | Dropped: they do not clear the non-default-delta bar without an exact downstream consumer and must defer to repository state, live help, or primary documentation. |

The old `infra-bundles` map's `teach-context` referral was a cross-family handoff, not a sixth source owned by this consolidation. It remains out of this router and no unlisted archive source was needed.

## Archive inventory

| Original | Archive path | Archived text lines |
| --- | --- | ---: |
| `infra-bundles` | `archive/triage-2026-07/shared/general/infra-bundles` | 64 |
| `k8s-op` | `archive/triage-2026-07/shared/codex/k8s-op` | 324 |
| `kubernetes-platform` | `archive/triage-2026-07/shared/codex/kubernetes-platform` | 263 |
| `terraform-op` | `archive/triage-2026-07/shared/codex/terraform-op` | 311 |
| `terraform-platform` | `archive/triage-2026-07/shared/codex/terraform-platform` | 222 |
| **Total** |  | **1,184** |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/infra-bundles router
PASS: shared/general/infra-bundles (router)
```
