# Herdr Executive skill acceptance

## Decision

- Canonical owner: `skills/herdr-executive`
- Archetype: private-tool leaf
- Selected contract surfaces: existence and ownership, package and routing,
  evidence and safety, validation and acceptance
- Pre-create git ref: `cf3672dd451c7026db4978a4376e6620c9982689`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED** — `bin/link` contains direct symlink deletion and
  cannot be executed under the active durable destructive-action policy.

The non-default delta is the private coordinator contract that separates
durable drafts, manager events, clarifications, outbound submission, speech,
phone acknowledgement, and the uniquely named Executive route.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| `Executive` | `herdr-executive` | `herdr` | Coordinator and EA queues win; hand pane resolution and transport to `herdr`. |
| `Shepr` | `herdr-executive` | none | Native phone client and gateway are part of the Executive lifecycle. |
| handsfree reply | `herdr-executive` | `herdr` | Speech queue and phone acknowledgement win; `herdr` owns only the named pane. |
| manager blocker/question | `herdr-executive` | `agent-orchestration` | Durable attention and reviewed response win; delegation strategy stays with `agent-orchestration`. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Private coordinator state and transition semantics exceed generic agent behavior. |
| A02 | PASS | Voice turns, manager attention, queue diagnosis, Shepr, and releases recur in the maintained product. |
| A03 | PASS | Boundary and collision matrix separate `herdr` transport and `agent-orchestration` delegation. |
| A04 | PASS | Exactly one archetype: private-tool leaf. |
| A05 | PASS | `skills/herdr-executive` matches unique `name: herdr-executive`. |
| A06 | PASS | Shared frontmatter has only name and description; provider UI metadata is under `agents/`. |
| A07 | PASS | Description is one physical line, two sentences, and 206 characters. |
| A08 | PASS | It begins with a concrete operation and ends with concrete `Use when` signals. |
| A09 | PASS | Collision matrix establishes one first owner for every trigger. |
| A10 | PASS | No greedy claim or implicit persona trigger appears. |
| A11 | PASS | `SKILL.md` is 94 lines/4,786 bytes; package is 278 lines/12,135 bytes. |
| A12 | PASS | Active body contains boundary, preflight, routing, workflow, hard rules, stops, and output only. |
| A13 | PASS | Both references are named by explicit selection conditions and resolve locally. |
| A14 | PASS | References are 87 and 93 lines; total package is below all private-leaf limits. |
| A15 | DEFERRED | Package has no duplicated or orphaned prose; provider/catalog parity awaits composition. |
| A16 | N/A | Not a mode suite. |
| A17 | N/A | Not a mode suite. |
| A18 | N/A | Not a router. |
| A19 | DEFERRED | Not a router; overlay exposure still awaits composition. |
| A20 | PASS | Preflight orders checked-in source and live `--help` above skill recipes. |
| A21 | PASS | No copied CLI/API manual, price table, or broad tutorial is present. |
| A22 | PASS | No volatile value is pinned as a pack constraint. |
| A23 | PASS | Secret/path scan found no credential-shaped value. |
| A24 | PASS | Discovery exposes IDs, status, counts, and correlations; secret values are explicitly forbidden. |
| A25 | PASS | No literal personal-home path appears; commands use current repo, `$PWD`, or variables. |
| A26 | PASS | Executable, service owner, gateway, and agent route are discovered live and fail clearly. |
| A27 | N/A | Package contains no scripts. |
| A28 | PASS | `agents/openai.yaml` is generated metadata matching the skill; no assets exist. |
| A29 | PASS | Rules protect journal integrity, reviewed routing, queue meaning, unique naming, and secret boundaries. |
| A30 | DEFERRED | Canonical catalog and provider exposure await composition. |
| A31 | DEFERRED | Local links pass; `bin/link` and installed-view checks are blocked by the deletion policy. |
| A32 | PASS | Shape matches the retained `herdr` private-tool leaf: compact brain plus selective operational references. |
| A33 | N/A | New package; no consolidation or trim claim. |
| A34 | PASS | Preservation ledger below records every qualifying delta and excluded sibling concern. |
| A35 | PASS | The skill did not exist at pre-create ref `cf3672dd451c7026db4978a4376e6620c9982689`. |

## Preservation ledger

| Delta | Disposition | Owner/path |
| --- | --- | --- |
| Durable draft, attention, clarification, outbound, and speech distinctions | Kept | `SKILL.md`, `references/operations.md` |
| End-to-end correlation diagnosis and phone acknowledgement boundary | Kept | `references/delivery-and-shepr.md` |
| Claude-to-Codex pane swap can preserve label while losing agent route | Kept | `SKILL.md`, `references/delivery-and-shepr.md` |
| Journal immutability and secret-safe gateway/release handling | Kept | `SKILL.md`, both references |
| Generic pane/workspace/agent transport | Excluded | Existing `herdr` owner |
| Agent selection and delegation strategy | Excluded | Existing `agent-orchestration` owner |

## Validation evidence

```text
Skill is valid!
PASS: skills/herdr-executive (private-leaf)
```

The package is complete at canonical-package level. Catalog composition remains
deferred rather than being bypassed through manual provider edits.
