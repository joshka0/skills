---
name: blast-radius
description: "Find what a change can break outside its diff, and prove by running code the one fact that makes it safe. Use for 'what could this break', or for a small diff you do not trust."
---

# Blast radius

A list of callers is not the result. Grep finds those. The result is the
breakage that grep does not show, and a proof of the fact that the change's
safety depends on. A written analysis reads as correct whether or not it is
true, so never hand back only the analysis.

## Confidence ladder

For each fact that the safety depends on, go as far down this ladder as is
cheap. Say where you stopped.

1. You said so. This has no value alone.
2. You pointed at the line: a real `file:line`, or the library's own source.
3. You walked the failure step by step and it cannot occur.
4. You ran it: a script or test that calls the real code and fails loudly if
   you are wrong.
5. You reproduced it in the running app (`verification-skill`).

Step 4 is usually one small script that imports the library version the app
ships and calls the exact function in question.

## Steps

1. Read the change: the diff, the symbols it adds, changes, and deletes, and
   what it now does differently that the diff does not show. Read the PR and
   the commits for intent (`why`).
2. Find the one fact that makes it safe, such as "this call only drops cache
   entries that are already dead". If that fact holds, it clears most risky
   cases together. Put your time here, not into a long list of maybes.
3. Look where grep stops:
   - the source of the library you call, at its pinned version, with any
     local patch;
   - timing: microtasks, teardown, startup order;
   - what a symbol search misses: the JSON an API returns, a database
     column, a wire format, another language that reads the same bytes, a
     feature flag, code three calls downstream.
4. Give each risk a real likelihood and a real cost. Keep the confirmed
   risks apart from the ones you checked and cleared. A search that finds
   nothing is a result. Never invent a caller or an API.
5. Prove the one fact. Write the script or test, run it, and paste the
   output.
6. For a wide change, run a bakeoff (`agent-orchestration`): different model
   families find different real bugs.

## Report

- **What it does**, including the part that is not obvious.
- **The one fact**: the statement, the ladder step you reached, and the
  proof. If you did not prove it, write "unproven".
- **Risks**: for each one, how it breaks, the `file:line`, the likelihood,
  the cost, and how to check.
- **Cleared**: what you checked and why it is safe.
- **Before you merge**: the cheapest test or repro that catches the real bug,
  with the script you wrote.

Adapted from pstack `blast-radius` (MIT, copyright 2026 Lauren Tan).
