---
name: six-phase-dev
description: >-
  A gated, human-in-the-loop workflow for building features or making
  significant code changes in phases: structs, interfaces, TODOs,
  implement-then-revert verification, invariants, then final implementation.
  Use this skill whenever the user asks to build a feature, make a non-trivial
  change to a codebase, or explicitly mentions "six-phase", "phased
  development", "plan first", or wants to review and approve work step by step
  before code is written. Also use it when the user complains that AI-generated
  code "does too much" or goes off the rails; this workflow exists precisely to
  prevent that.
---

# Six-Phase Development

A phased workflow for LLM-assisted programming where the human remains the designer and reviewer at every step. The core idea: never let the agent run ahead of the human's understanding. Each phase produces a small, reviewable artifact, and the human explicitly approves it before the next phase begins.

The guiding principle, stated by its author: "I'm the one that still determines exactly when code is ready to go to the next step. If the data structure does not look correct, we do not go forward. If the interface does not look correct, do not go forward. If the TODOs do not look correct, do not go forward."

This is a precision instrument, not spray-and-pray. Do exactly what was asked in the current phase: nothing more.

## The Phases

### Phase 0: Research & Plan

Before touching anything, research the relevant parts of the codebase and produce a plan for how phases 1-6 will be carried out for this specific change. Present the plan and wait for approval. Acknowledge the workflow explicitly at the start ("ready to begin phase 0") so the user knows the process is engaged.

### Phase 1: Structs (Data Structures)

Define ONLY the data structures the change requires: new types, fields added to existing types, enums, constants. No functions, no logic, no wiring.

Then stop. The user will review and give corrections ("this field is wrong", "don't use a dynamic array here, use a fixed-size array with a count", "we don't need this type"). Apply corrections and re-present. Repeat until the user says the structures are correct.

Gate: do not proceed to phase 2 until the user approves the data structures.

### Phase 2: Interfaces

Define the functions that need to be created or changed: signatures, parameters, return types, and where they live. Stubs only; no implementations. This is where the API shape of the change gets designed.

Expect and welcome direct pushback ("don't add that function, inline it into update", "that's ridiculous, remove it"). The user may also edit the code by hand between prompts; treat their hand edits as authoritative design decisions, never revert or "fix" them.

Gate: do not proceed until the user approves the interfaces.

### Phase 3: TODOs

Go through the codebase and place a TODO comment at every single location where code will need to change, describing what will change there. This makes the full blast radius of the change visible before any implementation happens, and proves the plan is grounded in the real code.

The user reviews the TODOs in place: "you need a couple more here", "remove that one", "you missed this spot". Add, move, and remove TODOs as directed.

Gate: do not proceed until the user approves the complete TODO set.

### Phase 4: Implement, Verify, then Revert

This is the feedback phase. Do a full trial implementation:

1. Implement the change following ONLY the approved structs, interfaces, and TODOs.
2. Run the project's automated verification (see "Verification harness" below) and confirm the change actually works end to end.
3. Revert all implementation changes, keeping the structs/interfaces/TODOs from phases 1-3.
4. Report precisely where you had to break from the plan: every place you had to edit code outside a TODO, deviate from an interface, or add something not in the structs, and why. For example, "I had to make an edit in X because the plan didn't cover Y; we should address this" or "I couldn't implement Z as specified; can you figure out this part?"

The point is information: the trial run surfaces every gap in the plan while the code is still cheap to change. The user then updates the plan, possibly looping back through phases 1-3 for the gaps, before committing to a real implementation. If the implementation could NOT be completed within the approved TODOs, structs, and interfaces, the plan is broken; go back and fix the plan rather than improvising.

### Phase 5: Invariants

Add invariants: assertions and checks that encode the properties the new code must always satisfy, such as array bounds, state-machine legality, or "dead enemies are never removed, only marked".

Warning from experience: models are notoriously bad at this phase. Propose invariants conservatively, explain the property each one protects, and expect the user to rewrite or supply most of them. Do not pad this phase with trivial or tautological assertions.

Gate: user approves the invariants.

### Phase 6: Implement

Now implement for real, guided by the approved structs, interfaces, TODOs, invariants, and everything learned in phase 4. Run verification again. This phase should be almost mechanical; all design decisions were already made.

Phase 7 is shipping the actual product. Not your job; that one belongs to the human.

## Verification Harness

Phase 4 only works if the program can be exercised without a human at the screen. If the project has a headless/scriptable mode, such as a `--json` flag, a CLI driver, or a test harness that can send events and record outputs, use it: drive the program through a realistic session, record the output to a file, and inspect it.

If no such harness exists, propose building one as its own small project using this same workflow. A good harness:

- Runs the real program logic, just with I/O replaced by structured input/output, such as JSON events in and JSON state out.
- Can inject inputs (clicks, commands, events) and record every output for replay.
- Runs fast, with no real-time sleeps; step the clock with a fixed delta so thousands of iterations are cheap.

This is generally more robust than bolting on an MCP server for the same purpose. Plain stdin/stdout event streams are simpler to drive, replay, and diff.

## Rules of Conduct

- Never do more than the current phase asks. No opportunistic refactors, no bonus features, no "while I was in there". Unrequested additions are how a codebase turns to slop.
- One phase at a time, gate every phase. Even if confident, stop and present. The human's review IS the product of each phase.
- Human hand edits are law. The user will often edit code directly between your turns because describing a change in English is slower than typing it. Detect their edits, incorporate them, never overwrite them.
- Recommend hand-coding when English fails. Some changes are miserable to specify in prose but trivial to type. If the user has rejected your attempt at the same change more than twice, say plainly: "this one may be faster for you to write by hand - want me to leave a TODO and move on?"
- Prefer plain reporting over confidence. In phase 4, a report full of "here's where the plan broke" is a success, not a failure. Never paper over deviations.
- Keep artifacts reviewable from a phone. Phase outputs such as plans, struct definitions, TODO lists, and deviation reports should be short, plainly formatted, and skimmable. This workflow is often driven remotely with spotty connectivity.

## Example Phase-4 Deviation Report

```text
Implemented and verified: game runs in JSON mode, tower placed, wave completes.
All changes reverted. Deviations from the plan:

1. BROKE FROM TODO - enemy.odin:142: had to also update draw_enemy() to skip
   entries where finished == true; no TODO covered the draw loop.
2. INTERFACE GAP - spawn_wave() needed the wave index to clear previous
   projectiles; current signature doesn't take it.
3. COULD NOT IMPLEMENT - the death animation timing: the plan doesn't say
   where died_at gets compared against the animation length. Needs a decision.

Suggest: add TODO for the draw loop, amend spawn_wave signature, and decide
on item 3 before phase 5.
```
