---
name: bend
description: "Build Bend (bend-lang.com) code through the law-driven workflow: user intent, laws by Astra/Fable, proofs and code by another model family. Use for larger new projects, .bend files, or laws."
---

# Bend

Bend is the language for larger new projects (not skills, config, or glue).
It is a proof-checked language that compiles to native code, C, or JS and
parallelizes across CPU cores and GPUs. It is early-stage: report real bugs
rather than working around them.

## Workflow

1. **Get the user's intent.** Discuss it with the user one question at a time
   until every rule the code must obey is explicit: inputs, outputs, edge
   cases, and what must never happen. For a large spec, use `grill-me` spec
   mode. Do not write code or laws yet.
2. **Write the laws with a high-level agent.** Astra (`gpt-6-astra`) or Fable
   writes `LAWS.bend` from the agreed intent. It runs `bend guide` first, and
   states each rule as a law (an open claim). It writes no code and no proofs.
3. **Approve the laws.** Show the user each law with a one-line plain-English
   reading. The user approves `LAWS.bend` before any proof work starts.
4. **Write the proofs and code with a different family.** If Astra wrote the
   laws, a Claude model proves them. If Fable wrote them, an OpenAI model
   proves them. That agent writes the code and `PROOF.bend` together and never
   edits `LAWS.bend`. Cast and brief the agents with `agent-orchestration`,
   which also applies the Foxway bans.
5. **Gate.** `bend PROOF.bend` must print `All terms check.` before every
   commit.

## Laws and proofs

- `LAWS.bend` sits at the project root. It imports the code and states each
  law as an open claim. `PROOF.bend` imports `LAWS.bend` and proves each law
  with a def of the same name (`law sorted` is proven by `def Laws.sorted`).
- `LAWS.bend` is frozen after approval. A new, changed, or removed law goes
  back through steps 1–3. A proof agent that finds a law false or unprovable
  stops and reports it. It never edits the law.
- A failing gate means fix the code or the proof, never the law.

## Writing Bend

- Language, proofs, parallelism, and CLI: `bend2-mega-skill` (jsm). It was
  checked against an older Bend. Run `bend guide` first, and follow the guide
  when the two differ. Never write Bend from memory.
- Porting an existing app so its output stays identical: `porting-to-bend2`
  (jsm). Adding a Bend core to a JS/TS app instead: `bend2-mega-skill`,
  archetype F (Bend as a JavaScript library).
- The gate is stricter than the mega skill's: "with N unsafe annotation(s)"
  exits 0 but does not pass. Only `All terms check.` passes.
- `--publish` pushes to the public hub. Run it only on explicit request.
- `bend version` prints the version. `bend update` reinstalls via curl | sh:
  suggest it to the user, and never run it yourself. Set `BEND_NO_TELEMETRY=1`
  to stop the daily version check.
