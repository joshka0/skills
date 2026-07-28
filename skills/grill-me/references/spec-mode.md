# Spec mode

Run the standard session shape (one question per turn, hardest first,
recommended answer with basis, never accept a vague answer — restate it
precisely and make the user confirm), but drive toward one goal: a spec
precise enough to survive the spec-gauntlet's adversary. This mode's output
contract is the gauntlet's input contract.

## Priming

Before the first question, read `~/.config/spec-ledger/spec-ledger-digest.md`
if it exists and prioritize question areas matching the user's historical
blind-spot classes.

## Coverage areas

Extend as answers open new branches; drop any that genuinely do not apply:

- Eligibility/permissions: who may do what, and what disqualifies
- Concurrency: simultaneous operations, races between notify and act
- Lifecycle: every state, every legal transition, timeouts
- Ordering/fairness: queue discipline, starvation, repeat actors
- Empty/edge: nothing available, deleted entities, filtered-out inputs
- The north-star metric: how this behavior serves it
- Failure semantics: what happens on partial failure at each step

## Required outputs (the mode is not done without both files)

**spec.md** — numbered requirements `R1..Rn` and numbered invariants
`I1..In`. Each requirement is a single testable sentence. Invariants are
properties that must hold at all times — the gauntlet property author's
primary targets. Parked decisions listed explicitly under "Parked" with what
was deferred and why.

**glossary.md** — every domain noun and state name used in spec.md, one
precise definition each. If two spec sentences could read differently under
two reasonable definitions of a term, the term goes in the glossary.

## Boundaries

- Write only `spec.md` and `glossary.md`; the shared contract signatures
  (`contract.*`) are the gauntlet orchestrator's job, after hardening.
- A parked decision is a legitimate outcome; an ambiguous requirement is not.
  If a requirement cannot be made a single testable sentence, split it or
  park it explicitly.
- Close by telling the user the files are ready for the `spec-gauntlet`
  skill's spec-adversary stage.
