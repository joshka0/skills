---
name: bend
description: "Build Bend (bend-lang.com) code law-first: user intent, a spec (definitions + theorems) by Astra/Fable, independent review, proofs by another family. Use for larger new projects, .bend files, or laws."
---

# Bend

Bend is the language for larger new projects (not skills, config, or glue).
It is a proof-checked language that compiles to native code, C, or JS and
parallelizes across CPU cores and GPUs. It is early-stage: report real bugs
rather than working around them.

## Workflow

1. **Get the user's intent.** Ask one question at a time until every rule is
   explicit: inputs, outputs, edge cases, what must never happen. Record the
   agreed rules, dated, in `INTENT.md`. Later answers go in new sections, and
   the newest section wins. For a large spec, use `grill-me` spec mode. Do
   not write code or laws yet.
2. **Write the spec with a high-level agent.** Astra (`gpt-6-astra`) or Fable
   writes three files from `INTENT.md`, after running `bend guide`:
   - `Kernel.bend`: reference definitions, real Bend code written for
     clarity.
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
5. **Prove with a different family.** If Astra wrote the spec, a Claude model
   proves it. If Fable wrote it, an OpenAI model proves it. The prover writes
   `PROOF.bend` and helper files in `proof/`, and never edits a frozen file.
   Cast and brief agents with `agent-orchestration`, which also applies the
   Foxway bans.
6. **Gate.** `bend PROOF.bend` must print `All terms check.` before every
   commit. Do not commit a partial proof.

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
- A failing gate means fix the proof, never the spec.
- For a long proof, the prover keeps `proof/PROGRESS.md`, stops at a clean
  checkpoint (open TODOs only, no errors), and a fresh agent continues from
  it. The TODO count only goes down.
- Before you accept the gate, check it yourself: the exact output; the count
  and names of `law` in `LAWS.bend` match the `def Laws.*` in `PROOF.bend`;
  the git blob of `LAWS.bend` equals the frozen tag's; no `@unsafe`, `?TODO`,
  `?hole`, or `trust` in `PROOF.bend` or `proof/`; no `law` in proof files.
  Then commit and tag `kernel-proven-<n>`.

## Writing Bend

- Language, proofs, parallelism, and CLI: `bend2-mega-skill` (jsm). It was
  checked against an older Bend. Run `bend guide` first, and follow the guide
  when the two differ. Never write Bend from memory.
- Porting an existing app so its output stays identical: `porting-to-bend2`
  (jsm). Adding a Bend core to a JS/TS app instead: `bend2-mega-skill`,
  archetype F (Bend as a JavaScript library).
- The gate is stricter than the mega skill's: "with N unsafe annotation(s)"
  exits 0 but does not pass. Only `All terms check.` passes. A trailing
  "bend X is available" line is the update notice, not a verdict.
- A conjunction declared `is Data` (for example `type And is Data`) can be
  reused with `+` in proofs. A plain `A & B` bundle cannot.
- `--publish` pushes to the public hub. Run it only on explicit request.
- `bend version` prints the version. `bend update` reinstalls via curl | sh:
  suggest it to the user, and never run it yourself. Set `BEND_NO_TELEMETRY=1`
  to stop the daily version check.
