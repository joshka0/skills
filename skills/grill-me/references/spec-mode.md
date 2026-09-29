# Spec mode

Goal: a spec precise enough to survive the `spec-gauntlet` spec adversary. This output is the gauntlet's input contract.

Before the first question, read `~/.config/spec-ledger/spec-ledger-digest.md` if it exists. Start with the user's historical blind-spot classes.

Cover these (extend as branches open; drop those that do not apply): eligibility/permissions; concurrency (races between notify and act); lifecycle (every state, legal transition, timeout); ordering/fairness (queue discipline, starvation, repeat actors); empty/edge (nothing available, deleted entities, filtered inputs); the north-star metric; failure semantics at each step.

Write only these two files:

- `spec.md`: requirements `R1..Rn`, each one testable sentence. Invariants `I1..In` that hold at all times. A `Parked` section says what was deferred and why. If a requirement cannot be one testable sentence, split it or park it.
- `glossary.md`: one precise definition for every domain noun and state name in `spec.md`. If a spec sentence reads differently under two reasonable definitions, the term must be here.

`contract.*` signatures are the gauntlet orchestrator's job. At the end, say the files are ready for the spec-adversary stage.
