---
name: use-your-judgment
description: "Close the highest-value gaps toward a project's stated goals on your own judgment, inside the approved plan and beads. Use when the user says \"use your judgment\" or runs it after a reality check."
disable-model-invocation: true
---

# Use your judgment

The user's invocation is the go-ahead for all in-remit work. Do not ask inside the remit.

## Remit

- In remit: open beads, an approved plan or spec, and gaps that the latest reality check tied to a stated goal. This covers wiring finished code into its intended caller, finishing a stub whose intent the spec or callers make clear, fixing bugs you find on the way, and deleting code your own change made obsolete.
- Out of remit: new or changed public interfaces, schemas, or module boundaries; new dependencies; migrations; rewriting working code; deleting features; editing a plan, spec, or acceptance criterion; pushes, deploys, sends, and other external side effects; anything the plan parks or leaves undecided.
- If a question is about facts, look it up and act. If it is about values or tradeoffs the user owns, or the change is hard to reverse, it is out of remit.
- Create beads for in-remit gaps without asking. Put out-of-remit ideas only in the final report, never in the tracker.
- At the boundary, keep going. Comment the bead with the exact decision and your recommendation, mark it blocked, and take the next ready item.

## Pick work

1. If this session has no reality check, make one. List each stated goal (README, plan, spec) as WORKING, PARTIAL, STUB, UNPROVEN, NOT_STARTED, or NO_BEAD, with evidence. Code shows where you are; docs show what was promised.
2. Rank by benefit per unit of work: finished-but-unwired code, critical-path blockers, unproven code, partial work, new work, polish. Take the highest-value ready item, not the most comfortable one.
3. Before you build on a load-bearing assumption, run the cheapest check that could prove it false.
4. Run beads in `bv --robot-plan --db "$(br where --json | jq -r .jsonl_path)"` order. Never point `bv` at `beads.db` while agents write: it can corrupt the br database. Claim with `br update <id> --claim`. Check open beads before you create one. Without beads, use the plan and the task list.
5. Put every subtask you discover on the task list or in the report. Never drop one silently.

## Evidence before done

- A bead's status is a claim. Close only with evidence you re-ran at HEAD this session: the command, its exit code, and the observable it proves.
- A test counts only if it exists, runs (zero tests run is a failure), and asserts against the production path. Mocks, fixtures, and test-only branches are not live proof.
- Before you close work others will rely on, have a fresh-context subagent check it against the original acceptance criteria. Say what was not independently verified.
- An unmet in-scope acceptance condition keeps the bead open. Never close it by filing a follow-up.
- A guard, refusal, or error path alone never closes a bead that asks for a capability.
- At every stop, leave a bead comment a fresh agent can resume from: done, next, evidence.

## Never

- Get green by weakening a gate: skipped or edited tests, regenerated goldens, widened tolerances or timeouts, suppression pragmas, `--no-verify`, `[skip ci]`. Put a justified gate change in its own commit.
- Build a process artifact (ledger, dashboard, certificate, matrix, report) that no running code reads, unless you can name its reader, the feature it gates, the defect that justified it, and when it gets deleted.
- Start a second round of process work while the deliverable count is flat.
- Claim a command you did not run, or cite output with stderr discarded.
- Report an alarming count before you hand-check the five worst cases.
- Treat a timeout or a missing tool as absence. Call it unknown.

## Stop

- Stop when no in-remit ready work remains. An empty `br ready` is not done: separate blocked, stale-claimed, and truly empty.
- Lead the report with what a user can now see or do. Then list closed beads with evidence, blocked beads with the decision each needs, and what was not verified. Replace "should work" or "robust" with evidence or "unverified".
- Name the moment you would most want to explain if the user replayed the session.
- State a failed approach that a future agent would likely retry in your report, with the condition that would reopen it: "<approach> failed: <why>; retry if <condition>". The fleet memory keeps it.
- Ask the batched out-of-remit decisions in one AskUserQuestion, your recommendation first.
