---
name: bend
description: "Prove code in any language (TS, Rust, …) with Bend (bend-lang.com): a frozen spec, proofs by another family, native code diff-tested against the proven model. Use for logic worth proving."
---

# Bend

Bend proves a reference model of logic you ship in another language (TS,
Rust, …). The model also runs, so it is the oracle: the native code passes
differential tests against it. Model only decision logic worth proving
(state machines, invariants, parsers, schedulers). Leave IO, UI, and glue
native.

Bend is early-stage: report real bugs rather than working around them.

## Workflow

1. **Get the user's intent.** Ask one question at a time until every rule is
   explicit: inputs, outputs, edge cases, what must never happen. Record the
   agreed rules, dated, in `INTENT.md`. Also record the native module that
   the model covers and its public interface. Later answers go in new
   sections, and the newest section wins. For a large spec, use `grill-me` spec mode. Do
   not write code or laws yet.
2. **Write the spec with a high-level agent.** The spec model from
   `agent-orchestration` (`models.md`) writes three files from `INTENT.md`,
   after running `bend guide`:
   - `Kernel.bend`: reference definitions, real Bend code written for
     clarity, with the same inputs and outputs as the native interface.
   - `LAWS.bend`: theorems about those definitions (open claims).
   - `LAWS-READING.md`: a plain reading of each definition and law, a map
     from each intent rule to what enforces it, and a "Questions" section.
   It writes no proofs. It lists ambiguous rules under "Questions" and never
   guesses. Brief it through a file. Start a fresh session for a restructure.
3. **Review before approval.** A fresh reviewer from a different family than
   the spec author checks the three files against `INTENT.md`. Brief it to
   execute the closed laws against the definitions, and to hunt for:
   - a degenerate kernel that satisfies every law (rejects everything, never
     makes progress);
   - a command that changes records it does not name;
   - a law whose premise can never hold, or that rests on a helper only a
     comment defines;
   - laws that contradict each other, including on malformed input;
   - readings that say more or less than their law;
   - intent the spec does not decide.
   Ask the user each open choice, record it in `INTENT.md`, and send the fixes
   back to the author. Repeat until the verdict is approve.
4. **Approve and freeze.** The user approves the definitions and laws
   together, from the readings. Commit them, tag `spec-frozen-<n>`, and keep
   the closed-law evaluator in the repo (`scripts/`).
5. **Prove with a different family.** A model from a different family than
   the spec author proves it. The prover writes
   `PROOF.bend` and helper files in `proof/`, and never edits a frozen file.
   Cast and brief agents with `agent-orchestration`, which also applies the
   Foxway bans.
6. **Gate the proof.** Pass the gate in "Laws and proofs" before every
   commit. Do not commit a partial proof.
7. **Bind the native code.** Write or change the native code against the
   frozen interface. A differential harness feeds the same cases to the
   native code and to the frozen `Kernel.bend` and requires equal outputs.
   Use generated cases plus recorded real ones. A separate agent writes the
   case generator, never the native implementer (`delegated-roles`). This
   gate runs in the native project's CI.
   - A mismatch is a native bug. If the counterexample shows that the spec
     is wrong instead, go back through steps 1–4. Never change the oracle
     to match the native code.
   - Run the oracle from JS as `bend2-mega-skill` archetype F describes.
     An `Array` argument is updated in place, so pass a copy.
   - For a non-JS host, the harness calls the native code through its
     public API, CLI, or bindings, with the same serialized cases.

## Spec design

- Model a stateful kernel as an event log: the state is the append-only list
  of accepted commands with their actors, `apply` rejects a command or
  appends exactly that one, and every view is a function of the log. Side
  effects are then impossible, and no per-command frame laws are needed.
- Give every theorem over states a valid or reachable-state premise. A law
  quantified over all states can contradict itself on states `apply` never
  produces.
- Compute each view in one structural pass, from the prefix where each
  entity was created. Never define a view as a fixed point.
- Get acyclicity by construction: a dependency names an existing entry or an
  earlier one in the same batch. This removes a costly cycle-search proof.
- Keep concrete progress laws, so that a kernel that rejects every command
  fails. Do not restate a definition as a law, and add no accessor laws.
- If the law count grows with each review round, the model has the wrong
  shape. Restructure it; do not patch it.

## Laws and proofs

- `LAWS.bend` imports `Kernel.bend`. `PROOF.bend` imports both and proves
  each law with a def of the same name (`law sorted` is proven by
  `def Laws.sorted`).
- The definitions and laws are frozen after approval. A change goes back
  through steps 1–4. A prover that finds a law false or unprovable stops and
  reports a concrete counterexample. It never edits or weakens the law.
- The gate: `bend PROOF.bend` prints `All terms check.`. Output "with N
  unsafe annotation(s)" exits 0 but fails. A trailing "bend X is available"
  line is the update notice, not a verdict. A failing gate means fix the
  proof, never the spec.
- For a long proof, the prover keeps `proof/PROGRESS.md`, stops at a clean
  checkpoint (open TODOs only, no errors), and a fresh agent continues from
  it. The TODO count only goes down.
- Before you accept the gate, check it yourself: the exact output; the count
  and names of `law` in `LAWS.bend` match the `def Laws.*` in `PROOF.bend`;
  the git blob of `LAWS.bend` equals the frozen tag's; no `@unsafe`, `?TODO`,
  `?hole`, or `trust` in `PROOF.bend` or `proof/`; no `law` in proof files.
  Then commit and tag `kernel-proven-<n>`.
- Each `def Laws.*` takes its type from the frozen `LAWS.bend`, and the
  checker checks every helper. New lemmas in `proof/` therefore cannot change
  what is proven, and need no statement review.

## Patching a frozen kernel

A change to a law goes back through steps 1–4. A change to definitions only
(for example, a speed fix) takes this shorter path:

1. The user unfreezes the named definitions.
2. The patch changes only those definitions. `LAWS.bend` stays
   byte-identical to the frozen tag.
3. An independent reviewer compares old and new definitions on concrete
   states (empty, no match, first and last match, duplicates), and the old
   and new built binaries on real inputs, byte for byte.
4. The proofs break, because they unfold definitions by their exact text. A
   prover repairs `PROOF.bend` and `proof/` and runs the gate.
5. The user approves. Tag `spec-frozen-<n+1>` and `kernel-proven-<n+1>`.

## Where to run

Run Bend proof, review, and fan-out work on the dev box, not on this Mac.
On the Mac, `bend`, its `clang` builds, and the run-directory churn (which
Defender and `fseventsd` then scan) take most of the CPU from other agents.

- Start the Bend agent in a remote Herdr pane on the dev box (`herdr`
  skill, remote machines). Give it a clone or worktree under
  `~/repos` on the dev box, and move results back through git.
- The dev box has no `bend` and no `clang` yet. Before the first run, check
  `command -v bend clang` there. If either is missing, report it to the user
  and stop the remote step. Never install either one yourself.
- On the Mac, run only a single small check that a task needs right now, and
  check `local-procs load` first.
- A benchmark is valid only for the machine that ran it. The dev box is
  x86_64 and the Mac is arm64. Record the host with every timing, and never
  compare timings across hosts.

## CPU budget

Several agents run Bend on the same machine at the same time, and every
`bend` check and every built binary competes for the same cores (16 logical
on the Mac and on the dev box).

- Run at most 4 Bend processes at a time per agent. Set a runner's `--jobs`
  to 4 or less. Never set it to the CPU count.
- Pass `--threads 4` to a built binary. The default takes every logical CPU.
- Before a fan-out, count the live checks: `pgrep -x bend | wc -l`. If 8 or
  more run, use 2 jobs, or wait.
- Your Bend workers share your budget of 4. Put each worker's `--jobs` and
  `--threads` caps in its brief.
- Time a benchmark only on a quiet machine: no other `bend` process, and at
  least 200% free CPU per benchmark thread (800% for `--threads 4`). On the
  Mac, read free CPU from `local-procs load`, not the load average: the Mac's
  load average stays far above the core count even when cores are free. On
  the dev box, read it from `top -bn1`. Otherwise record the measurement with
  the result and mark it contended.

## Writing Bend

- Language, proofs, parallelism, and CLI: `bend2-mega-skill` (jsm). It was
  checked against an older Bend. Run `bend guide` first, and follow the guide
  when the two differ. Never write Bend from memory.
- Modeling an existing native module from its current behavior (goldens,
  spec twins): `porting-to-bend2` (jsm). Calling Bend from JS/TS:
  `bend2-mega-skill`, archetype F (Bend as a JavaScript library).
- `Bool.pick` evaluates both value arguments. A lookup written
  `pick(found, x, find(rest))` scans the whole list after a match. Thunk the
  branches to stop early: `Bool.pick(Unit -> T, c, u => a, u => b)(Unit{})`.
  Never pass the same recursive call to both: bind it once (`+r = f(rest)`).
- Time a reference definition on a realistic input before freezing it, with
  a built binary (`bend X.bend -o x`). The interpreter (`bend X.bend`) runs
  eager and lazy forms at the same speed and hides the difference.
- A conjunction declared `is Data` (for example `type And is Data`) can be
  reused with `+` in proofs. A plain `A & B` bundle cannot.
- `--publish` pushes to the public hub. Run it only on explicit request.
- `bend version` prints the version. `bend update` reinstalls via curl | sh:
  suggest it to the user, and never run it yourself. Set `BEND_NO_TELEMETRY=1`
  to stop the daily version check.
