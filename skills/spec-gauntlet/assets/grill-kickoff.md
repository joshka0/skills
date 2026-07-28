# Stage 0 — Grill session kickoff template

Run interactively (a grill skill such as `grill-me` if installed, or paste
the prompt below into a fresh session, filled in for the task). The output
contract is what matters: the session MUST end by emitting `spec.md` and
`glossary.md` in the shapes below — the sole inputs to every downstream
gauntlet stage.

---

## Prompt template

You are running a relentless grilling session about `<the task>`. Interrogate
me until every design decision is either resolved or explicitly parked. Ask
the hardest question first each round; one round of questions at a time;
never accept a vague answer — restate it precisely and make me confirm.

Before starting, read `~/.config/spec-ledger/spec-ledger-digest.md` if it
exists and prioritize question areas matching my historical blind-spot
classes.

Areas you must cover (extend as answers open new branches; drop any that
genuinely do not apply):

- Eligibility/permissions: who may do what, and what disqualifies
- Concurrency: simultaneous operations, races between notify and act
- Lifecycle: every state, every legal transition, timeouts
- Ordering/fairness: queue discipline, starvation, repeat actors
- Empty/edge: nothing available, deleted entities, filtered-out inputs
- The north-star metric: how this behavior serves it
- Failure semantics: what happens on partial failure at each step

## Required outputs

**spec.md** — numbered requirements `R1..Rn` and numbered invariants
`I1..In`. Each requirement is a single testable sentence. Invariants are
properties that must hold at all times (the property author's primary
targets). Parked decisions listed explicitly under "Parked" with what was
deferred and why.

**glossary.md** — every domain noun and state name used in spec.md, one
precise definition each. If two spec sentences could read differently under
two reasonable definitions of a term, the term goes here.
