# Herdr Goal skill acceptance

## Decision

- Canonical owner: `skills/herdr-goal`
- Archetype: private-tool leaf
- Selected contract surfaces: existence and ownership, package and routing,
  evidence and safety, validation and acceptance
- Pre-create git ref: `02938ab12b16df4e7a7990c46e396b432c202650`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED** — `bin/link` contains direct symlink deletion and
  cannot be executed under the active durable destructive-action policy.

The non-default delta is a bounded, verifier-gated Herdr loop: a pinned main
Codex pane seals an exact epoch packet, Watcher wakes a separately pinned Luna
only after the main settles, and only the main may reconcile an authenticated
pass into completion.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| `herdr-goal` or Ralph loop | `herdr-goal` | `goal-protocol` | Runtime epochs, verifier reports, and completion latch win; authoring or revising a durable `GOAL.md` stays with `goal-protocol`. |
| verifier-gated continuation | `herdr-goal` | `herdr-watcher` | Goal convergence and sealed verification packets win; generic conditions, probes, joins, and callbacks stay with Watcher. |
| explicit Luna verifier | `herdr-goal` | `agent-orchestration` | The fixed read-only epoch verifier wins; general engine selection and task division stay with orchestration. |
| return to the arming pane | `herdr-goal` | `herdr` | Goal state and authenticated report reconciliation win; raw pane creation and agent transport stay with Herdr. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Bounded epochs, sealed packets, an independent Luna verdict, and a main-only completion latch exceed generic agent behavior. |
| A02 | PASS | Ralph-style convergence and verifier-gated continuation are recurring Herdr workflows. |
| A03 | PASS | The boundary and collision matrix separate goal authorship, watcher primitives, orchestration, and pane transport. |
| A04 | PASS | Exactly one archetype: private-tool leaf. |
| A05 | PASS | `skills/herdr-goal` matches the unique `name: herdr-goal`. |
| A06 | PASS | Shared frontmatter contains only name and description; UI metadata is under `agents/`. |
| A07 | PASS | Description is one physical line, two sentences, and 206 characters. |
| A08 | PASS | It starts with a concrete operation and ends with concrete `Use when` signals. |
| A09 | PASS | Collision matrix establishes one first owner for every claimed trigger. |
| A10 | PASS | No greedy claim, compatibility alias, or implicit interaction mode appears. |
| A11 | PASS | `SKILL.md` is 92 lines and 4,737 bytes, below private-leaf limits. |
| A12 | PASS | Active content is limited to boundary, preflight, routing, workflow, hard rules, stops, and output. |
| A13 | PASS | Each of three references has one explicit selection condition and resolves locally. |
| A14 | PASS | References are 60, 47, and 61 lines; the whole package is 331 lines and 13,647 bytes. |
| A15 | DEFERRED | Package prose is selective and non-duplicative; provider/catalog parity awaits composition. |
| A16 | N/A | Not a mode suite. |
| A17 | N/A | Not a mode suite. |
| A18 | N/A | Not a router. |
| A19 | DEFERRED | Not a router; overlay exposure still awaits composition. |
| A20 | PASS | Preflight orders live plugin state, live help, capabilities, and integration status above skill recipes. |
| A21 | PASS | No copied manual, broad API matrix, pricing table, or generic loop tutorial remains. |
| A22 | PASS | Runtime syntax is required to be live-verified; the pinned Luna identity is a product invariant. |
| A23 | PASS | Secret/path scan found no credential values or private capability material. |
| A24 | PASS | Output permits safe IDs, state, digests, and evidence while callback capabilities remain forbidden. |
| A25 | PASS | Paths are variables or placeholders; no literal personal-home path appears. |
| A26 | PASS | Plugin binaries, panes, sessions, and watcher resources are discovered live; ambiguity stops clearly. |
| A27 | N/A | Package contains no scripts. |
| A28 | PASS | Generated `agents/openai.yaml` matches the capability and contains no asset dependency. |
| A29 | PASS | Rules protect exact routing, native-session pins, sealed packets, read-only verification, finite bounds, and main-only completion. |
| A30 | DEFERRED | Canonical catalog and provider exposure await composition. |
| A31 | DEFERRED | Package checks pass; installed-view composition is blocked by the deletion policy. |
| A32 | PASS | Shape matches the retained Herdr private-tool leaves: compact command brain plus selected operational references. |
| A33 | N/A | New package; no consolidation or shrink claim. |
| A34 | PASS | Preservation ledger below records every qualifying delta and sibling boundary. |
| A35 | PASS | The skill did not exist at pre-create ref `02938ab12b16df4e7a7990c46e396b432c202650`. |

## Preservation ledger

| Delta | Disposition | Owner/path |
| --- | --- | --- |
| Explicit Codex Luna max verifier and exact-plan-only rule | Kept | `SKILL.md`, `references/start-loop.md` |
| Bounded protocol-only native-session bootstrap and fresh identity pin | Kept | `references/start-loop.md` |
| Main/verifier terminal and native-session pinning with no focus fallback | Kept | `SKILL.md`, `references/lifecycle.md` |
| Closed versioned packet, immutable seal, SHA-256 evidence, and exact report mapping | Kept | `assets/verification-packet-v1.json`, `references/checkpoint-and-report.md` |
| Watcher settle, dormant epoch callback, authenticated report, and delivery distinction | Kept | `SKILL.md`, `references/checkpoint-and-report.md`, `references/lifecycle.md` |
| Pass-required but main-only completion latch | Kept | `SKILL.md`, `references/lifecycle.md` |
| Durable goal-file authoring and plan convergence | Excluded | Existing `goal-protocol` owner |
| Generic polling, joins, and continuation callbacks | Excluded | Existing `herdr-watcher` owner |
| General model selection and worker division | Excluded | Existing `agent-orchestration` owner |
| Raw pane and agent transport | Excluded | Existing `herdr` owner |

## Forward-test evidence

An independent Sol(medium) agent first exercised the package read-only against
a realistic bounded goal. It found that prose fragments were insufficient to
construct the complete closed packet without consulting implementation source.
The package gained `assets/verification-packet-v1.json`, a transport-free,
parseable packet containing every required field.

A fresh Sol(medium) retest then found a wire/CLI spelling boundary:
`changes_requested` in JSON maps to `changes-requested` at the CLI. The report
reference now states that exact mapping. A final fresh retest passed the skill
as sufficient for start, checkpoint, Luna report, revision, pass, and main-only
completion without source inspection.

## Validation evidence

```text
Skill is valid!
PASS: skills/herdr-goal (private-leaf)
jq -e assets/verification-packet-v1.json: exit 0
git diff --check -- skills/herdr-goal: exit 0
```

The canonical package conforms. Catalog composition remains deferred rather
than bypassing the Trash-only policy or editing provider symlinks by hand.
