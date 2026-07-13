# Diagnose

Use this mode for an explicit hard bug or performance-regression diagnosis.

1. Build a fast, trustworthy feedback loop before forming a fix hypothesis. Prefer an existing test, narrow command, fixture replay, or minimal harness.
2. Reproduce the reported symptom. For a nondeterministic failure, raise the reproduction rate enough to reason against it.
3. Write three to five ranked, falsifiable hypotheses. Probe one variable at a time and map each probe to a prediction.
4. Tag temporary instrumentation so it can be removed. For performance, establish a measurement baseline before changing code.
5. Turn the minimized reproduction into a regression test only at a seam that exercises the real bug pattern. If no such seam exists, record the architecture limitation.
6. Confirm the original feedback loop after the fix, remove instrumentation and throwaways, and report the cause and prevention follow-up.

Stop before guessing when no trustworthy feedback loop can be built. Report the access, artifact, or approved temporary instrumentation needed to continue.
