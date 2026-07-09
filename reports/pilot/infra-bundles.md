# Pilot acceptance — infra-bundles

## Result

- Canonical home: `shared/general/infra-bundles`
- Archetype: `router` with four one-hop risk surfaces.
- Active instructions: 43 lines / 2,824 bytes; package: 86 text lines / 6,609 bytes.
- Replaced source packages: old `infra-bundles` plus `k8s-op`, `kubernetes-platform`, `terraform-op`, and `terraform-platform` totaled 1,184 text lines. New package: 86 lines (1,098-line reduction).
- Archive moves: all five historical directories are under `archive/triage-2026-07/` at their original relative paths; the retained router was recreated at `shared/general/infra-bundles`.
- Validator: `PASS: shared/general/infra-bundles (router)`
- Composition status: intentionally deferred by pilot scope; `bundles/` and `providers/` were not edited or composed.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The delta is a risk router for high-stakes Kubernetes and IaC operations, preserving evidence, rollback, ownership, and least-blast-radius rules. |
| A02 | PASS | Cluster and declared-infrastructure requests recur and benefit from a stable safety/evidence posture. |
| A03 | PASS | Five overlapping old packages were merged into four selected risk surfaces instead of competing trigger slots. |
| A04 | PASS | Classified as a router. |
| A05 | PASS | `shared/general/infra-bundles` matches unique `name: infra-bundles`; the validator confirmed uniqueness. |
| A06 | PASS | Frontmatter contains only name and one-line description. |
| A07 | PASS | The two-sentence description is one physical line and passed the router 320-character gate. |
| A08 | PASS | It states Kubernetes/IaC routing and ends with concrete Kubernetes, OpenTofu, Terraform, cluster, state, plan, drift, and recovery signals. |
| A09 | PASS | The four targets distinguish operations from platform decisions and Kubernetes from IaC. |
| A10 | PASS | The router has no greedy claim, persona activation, or unsupported macro. |
| A11 | PASS | Validator passed the 43-line / 2,824-byte router body. |
| A12 | PASS | The active body contains routing, shared evidence workflow, durable rules, stops, and output only. |
| A13 | PASS | Each route has a single explicit reference file and default single-target selection; all four files resolve. |
| A14 | PASS | Every reference is 10–12 lines and the full 86-line package is below router/package hard caps. |
| A15 | PASS | Platform and operation detail is selected-only; no active copy of the former five package bodies remains. |
| A16 | N/A | This package is a router, not a mode suite. |
| A17 | N/A | This package is a router, not a mode suite. |
| A18 | PASS | Four substantial risk surfaces justify selective loading and fit the 3–8 router target rule. |
| A19 | PASS | Each target resolves in one hop to a reference with no cycle; overlay exposure review is deferred to composition. |
| A20 | PASS | The workflow requires repository state, installed-tool detection, live output, then current primary docs for volatile behavior. |
| A21 | PASS | Kubernetes/IaC manuals, API catalogs, and static tool guidance were cut; only house safety and decision posture remains. |
| A22 | N/A | No volatile fact is pinned as a pack constraint. |
| A23 | PASS | The active package prohibits plaintext secrets and contains no credential-shaped value. |
| A24 | PASS | It requires evidence and blocks secret committing; no secret discovery or value output is prescribed. |
| A25 | PASS | The package has no literal user-home path. |
| A26 | PASS | Environment, ownership, access, and rollback facts are discovered before mutation; missing facts stop clearly. |
| A27 | PASS | No active scripts exist. |
| A28 | PASS | No active assets or provider metadata exist. |
| A29 | PASS | Audit-before-mutate, declarative durable state, blast-radius, rollback, identity/network, plan/state, and uncertainty rules are concrete and proportionate. |
| A30 | DEFERRED | Bundle/provider parity and retired-child exposure cannot be changed while the task explicitly forbids composition edits. |
| A31 | DEFERRED | Local links and validator no-internal-symlink checks pass; compose dry runs and installed-view checks await the permitted phase. |
| A32 | PASS | The router was compared against the completed private-leaf and suite golden examples and the rubric; routing was preferred over a copied manual. |
| A33 | PASS | The 86-line result is strictly smaller than 1,184 replaced lines and under the absolute package cap. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/infra-bundles router
PASS: shared/general/infra-bundles (router)
```

`teach-context` was not moved: the approved plan assigns its later consolidation to `local-dev`, not this router.
