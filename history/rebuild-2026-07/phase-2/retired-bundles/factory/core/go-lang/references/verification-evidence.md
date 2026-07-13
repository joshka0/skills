# Verification evidence

Read only when Go tests, race safety, benchmarks, profiles, allocations, or a performance regression need proof.

## Decision procedure

1. Start with the repository's existing package commands, fixtures, and test conventions; use live tool help for flags or behavior that depends on the installed toolchain.
2. Test observable package behavior and deterministic lifecycle outcomes. Do not make private choreography or elapsed sleeps the primary proof.
3. Run a race-oriented check when the change affects shared mutation, synchronization, cancellation, or goroutine exit.
4. For a performance claim, capture a baseline on the same representative workload before changing code; profile before pursuing allocations, escape behavior, pooling, or atomics.
5. Re-run the same focused evidence after the change and report the metric, comparison basis, and correctness check together.

## Review questions

- What user-visible behavior or invariant does this check prove?
- Is the test deterministic under load and cancellation?
- Is the race risk exercised rather than merely assumed absent?
- Is the claimed improvement measured against a comparable baseline?
- Did the optimization add complexity that the measured result justifies?
