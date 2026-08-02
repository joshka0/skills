# Herdr Watcher skill acceptance

## Decision

- Canonical owner: `skills/herdr-watcher`
- Archetype: private-tool leaf
- Selected contract surfaces: existence and ownership, package and routing,
  evidence and safety, validation and acceptance
- Pre-create git ref: `02938ab12b16df4e7a7990c46e396b432c202650`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED** — `bin/link` contains direct symlink deletion and
  cannot be executed under the active durable destructive-action policy.

The non-default delta is the private durable-callback contract that pins the
arming terminal, polls repeatable argv, authenticates closed-roster worker
reports, seals `all` or `any` joins, and distinguishes outcome from delivery.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| `herdr-watcher` | `herdr-watcher` | `herdr` | Watcher resources, probes, joins, and callbacks win; raw pane transport stays with `herdr`. |
| resume an agent later | `herdr-watcher` | `herdr-executive` | An origin-pinned condition callback wins; manager attention and voice queues stay with Executive. |
| poll a condition | `herdr-watcher` | generic shell work | A durable probe that outlives the turn wins; one-shot command execution stays generic. |
| join worker reports | `herdr-watcher` | `agent-orchestration` | Durable invites, reports, and join state win; worker selection and task division stay with orchestration. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Origin-pinned durable callbacks, authenticated reports, and immutable joins exceed generic agent behavior. |
| A02 | PASS | Long-running conditions and provider-worker reporting recur in Herdr agent workflows. |
| A03 | PASS | The boundary and collision matrix separate Herdr transport, orchestration strategy, and Executive queues. |
| A04 | PASS | Exactly one archetype: private-tool leaf. |
| A05 | PASS | `skills/herdr-watcher` matches the unique `name: herdr-watcher`. |
| A06 | PASS | Shared frontmatter contains only name and description; UI metadata is under `agents/`. |
| A07 | PASS | Description is one physical line, two sentences, and 201 characters. |
| A08 | PASS | It starts with a concrete operation and ends with concrete `Use when` signals. |
| A09 | PASS | Collision matrix establishes one first owner for every claimed trigger. |
| A10 | PASS | No greedy claim, compatibility alias, or implicit interaction mode appears. |
| A11 | PASS | `SKILL.md` is 94 lines and 4,678 bytes, below private-leaf limits. |
| A12 | PASS | Active content is limited to boundary, preflight, routing, workflow, hard rules, stops, and output. |
| A13 | PASS | Each of three references has one explicit selection condition and resolves locally. |
| A14 | PASS | References are 69, 76, and 63 lines; total package is 306 lines and 12,555 bytes. |
| A15 | DEFERRED | Package prose is selective and non-duplicative; provider/catalog parity awaits composition. |
| A16 | N/A | Not a mode suite. |
| A17 | N/A | Not a mode suite. |
| A18 | N/A | Not a router. |
| A19 | DEFERRED | Not a router; overlay exposure still awaits composition. |
| A20 | PASS | Preflight orders checked-in source and live command help above skill recipes. |
| A21 | PASS | No copied manual, broad API matrix, pricing table, or generic polling tutorial remains. |
| A22 | PASS | No volatile value is pinned as a pack constraint; command syntax is live-verified. |
| A23 | PASS | Secret/path scan found no credential values or private material. |
| A24 | PASS | Output is limited to safe IDs, paths, state, and evidence; capabilities and secrets are forbidden. |
| A25 | PASS | Paths are variables or placeholders; no literal personal-home path appears. |
| A26 | PASS | Executable and pane identities are discovered live; missing or ambiguous values stop clearly. |
| A27 | N/A | Package contains no scripts. |
| A28 | PASS | Generated `agents/openai.yaml` matches the capability and contains no asset dependency. |
| A29 | PASS | Rules protect exact routing, unknown write boundaries, journal integrity, report capabilities, and probe safety. |
| A30 | DEFERRED | Canonical catalog and provider exposure await composition. |
| A31 | DEFERRED | Local links and no-symlink checks pass; installed-view composition is blocked by the deletion policy. |
| A32 | PASS | Shape matches the retained `herdr` private-tool leaf: compact command brain plus selected operational references. |
| A33 | N/A | New package; no consolidation or shrink claim. |
| A34 | PASS | Preservation ledger below records every qualifying delta and sibling boundary. |
| A35 | PASS | The skill did not exist at pre-create ref `02938ab12b16df4e7a7990c46e396b432c202650`. |

## Preservation ledger

| Delta | Disposition | Owner/path |
| --- | --- | --- |
| Exact origin-terminal pinning and no focus/name fallback | Kept | `SKILL.md`, `references/lifecycle.md` |
| Immediate first probe, fixed delay, exit-code contract, error budget, and one latched callback | Kept | `references/continuations.md` |
| Direct argv, no implicit shell, repeatable read-only conditions | Kept | `SKILL.md`, `references/continuations.md` |
| Closed worker roster, private invite files, caller-terminal authentication | Kept | `SKILL.md`, `references/delegations.md` |
| `all` and `any` joins, idempotent attempts, immutable seals, late-report audit | Kept | `references/delegations.md` |
| Resource outcome versus queued, delivered, unconfirmed, and origin-lost delivery | Kept | `SKILL.md`, `references/lifecycle.md` |
| Generic pane and agent transport | Excluded | Existing `herdr` owner |
| Worker/model selection and task division | Excluded | Existing `agent-orchestration` owner |
| Manager attention, voice, and phone queues | Excluded | Existing `herdr-executive` owner |
| Exhaustive CLI catalog and mutable defaults | Dropped | Live `--help` and checked-in watcher source are authoritative |

## Forward-test evidence

An independent Sol(high) agent used the package read-only on a realistic
five-minute `grep` continuation plus a two-worker `all` join. It derived exact
preflight, arming, report, and verification sequences without changing files or
live state. The pass exposed one ambiguity: an immediate first probe can make a
new continuation terminal before `show`. The continuation reference was revised
to accept that state and require delivery inspection instead of falsely treating
it as lost registration.

## Validation evidence

```text
Skill is valid!
PASS: skills/herdr-watcher (private-leaf)
```

The canonical package conforms. Catalog composition remains deferred rather
than bypassing the Trash-only policy or editing provider symlinks by hand.
