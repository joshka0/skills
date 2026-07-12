---
name: crew
description: "Run a sustained multi-agent campaign with a cross-family crew, durable verdict files, re-gate loops, and trigger chains. Use when the user says crew, full crew, or adversarial convergence."
---

# Crew

Run a long-horizon campaign — cleanup, migration, integration, release — with
a cross-family crew. The orchestrator plans, casts, synthesizes, and owns final
state; agents read, watch, execute, and refute. Campaign memory lives in files.

## Do not use when

- One bounded task needs one agent → `agent-orchestration` (delegate/swarm).
- The request is Herdr transport syntax → `herdr` owns pane mechanics.
- Short interactive work — a crew is overhead below ~an hour or three workstreams.

## Casting

Different weights don't share blindspots. Same-family review inherits the same
biases; cast reviewers from a different family than the author whenever stakes
are high. Session-tested roster, cheapest first (model tiers per the CLAUDE.md
assignment table, including any temporary demotion in force):

| Role | Agent | Cast for |
| --- | --- | --- |
| Scout / watcher | grok (herdr pane) | Recon, CI/pipeline watches, branch/worktree forensics, infra spin-up, fast second opinions. Cheap, fast, tireless. |
| Mechanical verifier | sonnet (Agent tool, explicit model) | Scoped read-only forensics in parallel batches: staleness checks, unpushed-work detection, dirty-state audits. |
| Executor | codex terra (herdr pane) | Large-scale implementation from a reviewed plan. May be blocked by its own policy hooks — see Safety rails. |
| Adversary / gate | codex sol (herdr pane) | Plan verdicts, implementation audits, re-gates, high-stakes synthesis. Treat as a peer, not an underling. |
| Orchestrator | you | Casting, briefs, synthesis, owner interviews, destructive actions, final state. Execute personally when workers are blocked or the work needs full campaign context. |

Never Haiku. Always pass explicit models. Delegate reading- and watching-heavy
work; keep judgment, synthesis, and irreversible actions.

**Quarantine your own framing.** Your brief transmits your bias to everyone who
reads it — a cross-family reviewer working only from your summary is still
reviewing inside your frame. Brief independent reviewers against the
ground-truth artifacts (spec, kernel, originals, raw traces), never only your
digest of them, and name your brief as a possibly-biased artifact in scope for
refutation.

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
   `docs/archive/<campaign>-<date>/` before deleting the workspace. The
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
they saw; anything destructive stays with the orchestrator; summaries report
what fired, not that a loop ran.

## Greening pipelines: peel the onion

CI campaigns fail in layers. For each red run: pull the actual trace,
root-cause the single failing layer, fix it properly (never retry-until-green,
never loosen a gate to pass), push, re-dispatch the watcher. Load-bearing
diagnoses get your own eyes on the raw trace — watchers mislabel.

## Owner interviews

Batch genuinely-owner decisions (product rulings, forbidden-language conflicts,
destructive scope) into a single AskUserQuestion interview with a recommended
option first. The moment rulings land, record them in the governing doc *and*
memory, in the same turn. Anything the user parks stays parked.

## Safety rails

- **Archive before delete**: unmerged branches get `archive/<name>-<date>` tags
  pushed before deletion; superseded WIP gets a tag before its worktree dies.
- **Verify before discard**: "merged" claims are checked with
  `git merge-base --is-ancestor` / `git log main..HEAD`, never trusted from a
  tool summary. Unique local work blocks removal until reviewed.
- **Mass destructive remote actions need the user to see the named list.**
- **Policy blocks are answers, not obstacles**: when a worker's hooks forbid an
  action, reassign (usually to yourself) — never work around its guardrails.

## Campaign close

Update memory with completion state and non-obvious learnings, reconcile
governing docs, archive the reports, tear down panes/worktrees/branches after
verifying containment, and end with the estate smaller than you found it.
