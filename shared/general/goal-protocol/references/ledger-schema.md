# Ledger Schema

`GOAL_LEDGER.md` is the operational memory for a goal. It is not a replacement
for `GOAL.md`, `CODE_DOSSIER.md`, `ORCHESTRATION.md`, tickets, or reports. It is
the coordination index that tells every agent what is authoritative, what
changed, why it changed, what remains open, and what to read next.

## Goal Folder Layout

Prefer:

```text
docs/goals/<goal-slug>/
  GOAL_LEDGER.md
  GOAL.md
  CODE_DOSSIER.md
  ORCHESTRATION.md
  tickets/
  reports/
  decisions/
  context/
```

Fallbacks are `goals/<goal-slug>/` or `.goal/<goal-slug>/` when the repo has no
docs convention.

## Mutable Sections

Agents may update these sections in place to keep the current state readable:

- `Current Snapshot`
- `Read This First`
- `Artifact Index`
- `Phase Gates`
- `Traceability Index`
- `Status Board`
- `Open Questions`

Keep mutable sections compact. They should point to the append-only evidence,
not duplicate the whole history.

## Append-Only Sections

Agents append to these sections and never delete old rows or entries:

- `Decision Log`
- `Assumption Log`
- `Risk Log`
- `Validation Log`
- `Handoff Log`
- `Ledger Entries`

Corrections are new entries that supersede old entries. Do not rewrite history.

## Header Metadata

Every ledger starts with:

- ledger version
- goal slug
- created date
- last updated date
- current phase
- current owner
- primary artifacts

Allowed phases:

- `intake`
- `convergence`
- `code-blueprint`
- `orchestration`
- `execution`
- `verification`
- `complete`
- `paused`
- `blocked`

## Traceability IDs

Use stable IDs:

| Prefix | Meaning |
|---|---|
| `G###` | goal |
| `M###` | metric |
| `AG###` | anti-goal |
| `C###` | constraint |
| `A###` | assumption |
| `R###` | risk |
| `D###` | decision |
| `F###` | feature |
| `NF###` | non-feature |
| `B###` | behavior |
| `S###` | structure |
| `I###` | interface |
| `T###` | test |
| `L###` | location |
| `V###` | invariant or validation item, disambiguated by table context |
| `TK###` | ticket |
| `H###` | handoff |
| `Q###` | open question |

Compatibility note: older code-council dossiers may use `D###` for data
structures. Preserve existing IDs when reading old dossiers, but prefer `S###`
for new structures so `D###` can remain decisions in the shared ledger.

## Ledger Entry Format

Every material change appends an entry:

```md
### L### - <YYYY-MM-DD HH:mm> - <short title>
Actor: <agent/user/subagent>
Phase: <phase>
Artifacts touched:
- <path>

Summary:
- <what changed>

Why:
- <reason>

Decisions:
- D###: <decision or none>

Validation:
- V###: <command/check and result or not run>

Next:
- <exact next action>

Supersedes:
- <L###/D###/A###/R### or None>
```

## Subagent Update Rules

- Every subagent must read `GOAL_LEDGER.md` first, then its assigned ticket.
- Subagents should write reports under `reports/` unless told otherwise.
- The supervisor integrates status board and ledger updates unless explicitly
  delegated.
- Subagents must not rely on conversation memory.
- Subagents stop and report if a ticket requires files, APIs, schemas, or
  decisions outside its allowed scope.

## Common Failure Modes

- Starting from `GOAL.md` while ignoring a newer ledger decision.
- Creating tickets that cite no parent IDs.
- Marking a wave done without validation evidence.
- Letting subagents update the same files in the same wave without coordination.
- Rewriting old ledger history instead of appending a superseding entry.
- Treating a failed validation as a comment instead of a ledger event.
