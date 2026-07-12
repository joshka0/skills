---
name: crew
description: "Run a sustained multi-agent campaign: cross-family crew (grok scouts/watchers, codex sol adversary, codex terra executor, sonnet verifiers) coordinated through durable verdict files, re-gate loops, and background trigger chains. Use when the user says crew, full crew, adversarial convergence, or wants large work landed with independent verification end-to-end."
---

# Crew

Run a long-horizon campaign — cleanup, migration, integration, release — with a
cross-family agent crew. The orchestrator plans, casts, synthesizes, and owns
final state; agents do the reading, watching, executing, and refuting. The
campaign's memory lives in files, not conversations, so it survives context
compaction, agent death, and session restarts.

## Do not use when

- One bounded task needs one agent → `agent-orchestration` (delegate/swarm).
- The request is Herdr transport syntax → `herdr` owns pane mechanics.
- Short interactive work where you can just do it — a crew is overhead below
  roughly an hour of wall-clock or three independent workstreams.

## Casting

Different weights don't share blindspots. Same-family review inherits the same
biases; cast reviewers from a different family than the author whenever stakes
are high — this session-tested roster, cheapest first:

| Role | Agent | Cast for |
| --- | --- | --- |
| Scout / watcher | grok (`grok`, herdr pane) | Recon, CI/pipeline watches, branch/worktree forensics, infra spin-up, fast second opinions. Cheap, fast, tireless. |
| Mechanical verifier | sonnet (Agent tool, explicit model) | Scoped read-only forensics in parallel batches: staleness checks, unpushed-work detection, dirty-state audits. |
| Executor | codex terra ultra (herdr pane) | Large-scale implementation from a reviewed plan. May be blocked by its own policy hooks — see Failure modes. |
| Adversary / gate | codex sol max (herdr pane) | Plan verdicts, implementation audits, re-gates, high-stakes synthesis. Treat as a peer, not an underling. |
| Orchestrator | you | Casting, briefs, synthesis, owner interviews, destructive actions, final state. Execute personally when workers are blocked or the work needs full campaign context (e.g. merge-conflict resolution). |

Never Haiku. Always pass explicit models. Keep your own context lean: delegate
anything reading-heavy or watching-heavy; keep judgment, synthesis, and
irreversible actions.

## The verdict-file protocol

Every delegation is a self-contained brief and a durable report:

1. **Brief**: write a packet file (task, context files to read, scope,
   prohibitions, required checks with "read exit codes directly — no pipes")
   into a reports dir (e.g. `.reports/` at the work root, untracked). Point
   the agent at the file; never rely on it having conversation history.
2. **Report**: the agent writes findings to a named report file ending with
   exactly one machine-greppable verdict line:
   `VERDICT: APPROVED.` / `CI STATUS: GREEN` / `SEED STATUS: READY` — one
   enum, stated in the brief, grep-stable.
3. **Watch**: poll the file with a background loop
   (`until grep -q "VERDICT" file; do sleep 30; done`), not the agent's
   screen. The completion notification triggers your next move.
4. **Archive**: when the campaign ends, commit the reports dir to
   `docs/archive/<campaign>-<date>/` via MR before deleting the workspace.
   The adversarial history is part of the deliverable.

## The re-gate loop

Executor self-reports overclaim — always. Acceptance of any substantial change
is gated by an adversarial audit:

1. Author (agent or you) completes work with local gates green.
2. Adversary audits against the originals with required checks; writes
   REJECTED with numbered blockers, or APPROVED.
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
fire the next action on a state change:

```
watch MR state == merged
  → find the new pipeline
  → play the manual job the moment it turns playable
  → (agent watches the job, plays the follow-up job on success)
  → you act on the terminal verdict file
```

Rules: loops poll cheap read-only state; every loop has a generous timeout and
prints what it saw; anything destructive or irreversible stays with the
orchestrator; the human-facing summary reports what fired, not that a loop ran.

## Greening pipelines: peel the onion

CI campaigns fail in layers. For each red run: pull the actual trace, root-cause
the single failing layer, fix it properly (never retry-until-green, never
loosen a gate to pass), push, re-dispatch the watcher. Expect first-exercise
failures when new tooling meets CI for the first time — each fix should make
the lane permanently better (a flag, a dependency declaration, a missing
install step), and load-bearing diagnoses get your own eyes on the raw trace:
watchers mislabel (a coverage-threshold exit looks like flake to a scout).

## Owner interviews

Batch genuinely-owner decisions (product rulings, forbidden-language conflicts,
destructive scope) into a single AskUserQuestion interview with a recommended
option first. The moment rulings land, record them in the governing doc
(spec/CONTEXT/runbook) *and* memory, in the same turn — a ruling that lives
only in conversation is lost. Anything the user parks stays parked; don't
re-propose it.

## Safety rails

- **Archive before delete**: unmerged branches get `archive/<name>-<date>`
  tags pushed before deletion; superseded local WIP gets a tag before its
  worktree dies; audit trails get committed before the workspace is removed.
- **Verify before discard**: "merged" claims are checked with
  `git merge-base --is-ancestor` / `git log main..HEAD`, never trusted from a
  tool summary. Unique-local-work (a commit on no remote ref) blocks removal
  until reviewed for supersession against what actually landed.
- **Mass destructive remote actions need the user to see the named list** and
  confirm — present it and ask; don't fight the permission system.
- **Policy blocks are answers, not obstacles**: when a worker's own hooks
  forbid an action, reassign (usually to yourself) — never override or
  work around another agent's guardrails.

## Campaign close

A campaign isn't done at "merged": update memory with completion state and the
non-obvious learnings, reconcile governing docs, archive the reports, tear
down panes/worktrees/branches (verifying containment first), and end with the
estate smaller than you found it.
