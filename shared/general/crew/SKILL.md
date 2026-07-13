---
name: crew
description: "Run a sustained multi-agent campaign with a cross-family crew, durable verdict files, re-gate loops, and trigger chains. Use when the user says crew, full crew, or adversarial convergence."
---

# Crew

Run a long-horizon campaign — cleanup, migration, integration, release — with
a cross-family crew. The orchestrator plans, casts, synthesizes, and owns final
state; agents read, watch, execute, and refute. Campaign memory lives in files.
Write agent memory only when the user explicitly requests it and the active
memory policy permits it.

## Do not use when

- One bounded task needs one agent → `agent-orchestration` (delegate/swarm).
- The request is Herdr transport syntax → `herdr` owns pane mechanics.
- Short interactive work — a crew is overhead below ~an hour or three workstreams.

## Casting

Discover the current roster and model capabilities from the execution surface;
pass an explicit model where supported. Cast scout/watch, mechanical verifier,
executor, independent adversary, and orchestrator roles by current capability
and cost. Use a different model family for high-stakes review when available,
and keep final synthesis and authorized external mutations with the orchestrator.

**Quarantine your own framing.** Your brief transmits your bias to everyone who
reads it — a cross-family reviewer working only from your summary is still
reviewing inside your frame. Brief reviewers against the ground-truth artifacts
(spec, kernel, originals, raw traces), never only your digest; name your brief
as a possibly-biased artifact in scope for refutation; and build the critical
lens per the fresh-eyes recipe in agent-orchestration's collaborate reference.

## The verdict-file protocol

Every delegation is a self-contained brief and a durable report:

1. **Brief**: write a packet file (task, context files to read, scope,
   prohibitions, required checks with "read exit codes directly — no pipes")
   into a reports dir (e.g. `.reports/` at the work root, untracked). Point
   the agent at the file; never rely on it having conversation history.
2. **Report**: the agent writes findings to a named report file ending with
   exactly one machine-greppable verdict line, one enum stated in the brief:
   `VERDICT: APPROVED.` / `CI STATUS: GREEN` / `SEED STATUS: READY`.
3. **Watch**: poll the file with a background loop
   (`until grep -q "VERDICT" file; do sleep 30; done`), not the agent's screen.
4. **Archive**: when the campaign ends, commit the reports dir to
   `docs/archive/<campaign>-<date>/` before moving the workspace to Trash. The
   adversarial history is part of the deliverable.

## The re-gate loop

Executor self-reports overclaim — always. Acceptance of any substantial change
is gated by an adversarial audit:

1. Author (agent or you) completes work with local gates green.
2. Adversary audits against the originals and ground-truth artifacts with the
   required checks — never against the author's or orchestrator's brief alone —
   and writes REJECTED with numbered blockers, or APPROVED.
3. On REJECTED: fix every blocker, state what changed, re-gate. Repeat until
   APPROVED. Never argue a blocker down without evidence; never skip re-gate
   because the fix "was obvious".
4. Your own work goes through the same gate. The adversary catching a design
   flaw in code you restored is the system working.

For decisions rather than diffs: run independent blind passes (two agents, or
two *axes* — e.g. content-relevance vs. mechanical-staleness on the same
targets), then synthesize. Never let reviewers see each other's output before
their first pass.

## Trigger chains

Automate the boring middle of multi-stage pipelines with background loops that
fire the next action on a state change — e.g. watch MR merged → find the new
pipeline → play the manual job the moment it is playable → agent watches it and
plays the follow-up on success → you act on the terminal verdict file.

Rules: loops poll cheap read-only state with generous timeouts and print what
they saw; authorized external mutations stay with the orchestrator, filesystem
cleanup stays Trash-only, and destructive Git stays forbidden; summaries
report what fired, not that a loop ran.

## Greening pipelines: peel the onion

CI campaigns fail in layers. For each red run: pull the actual trace,
root-cause the single failing layer, fix it properly (never retry-until-green,
never loosen a gate to pass), push, re-dispatch the watcher. Load-bearing
diagnoses get your own eyes on the raw trace — watchers mislabel.

## Owner interviews

Batch genuinely-owner decisions (product rulings, forbidden-language conflicts,
destructive scope) into a single AskUserQuestion interview with a recommended
option first. The moment rulings land, record them in the governing doc; update
agent memory only when the user explicitly requests it and memory policy permits
the write. Anything the user parks stays parked.

## Safety rails

- **Preserve before Trash**: archive campaign reports and record the branch or
  revision that owns unique work before moving a filesystem workspace to Trash.
- **Verify before cleanup**: "merged" claims are checked against repository
  evidence, never trusted from a tool summary. Unique local work blocks even a
  reversible Trash move until reviewed.
- **Trash only, never destructive Git**: move filesystem removals with
  `/usr/bin/trash <path>`. Confirmation, delegation, or an archive tag never
  authorizes permanent deletion, Git clean/reset, bulk discard, or branch
  deletion.
- **Mass destructive remote actions need the user to see the named list.**
- **Policy blocks are answers, not obstacles**: when a worker's hooks forbid an
  action, change the approach or stop — never reassign merely to bypass its
  guardrails.

## Campaign close

Reconcile governing docs, archive the reports, and close panes after verifying
containment. Move requested filesystem cleanup to Trash; do not delete branches
or use destructive Git. Update agent memory only when explicitly requested and
permitted, and end with the estate smaller than you found it.
