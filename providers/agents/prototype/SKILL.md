---
name: prototype
description: "Build a throwaway executable prototype that answers one design question through a state-model harness or competing UI variants. Use when the user explicitly asks to prototype a state machine, data model, interaction, or alternative UI."
---

# Prototype

Create a disposable experiment around one answerable question; its result, not its prototype code, is the durable output.

## Route

Read only the selected branch.

| Mode | Select when | Read |
| --- | --- | --- |
| `logic` | the question is state transition, data shape, API feel, or business behavior | `references/logic.md` |
| `ui` | the question is visual hierarchy, interaction, or competing layout | `references/ui.md` |

## Workflow

1. State the one question and select a mode; ask only if the mode changes the experiment materially.
2. Build the smallest runnable artifact in the repository's existing toolchain and conventions.
3. Surface the relevant state or variation so the user can judge it directly.
4. Capture the answer and remove or deliberately absorb the prototype when the question is settled.

## Hard rules

- Mark the artifact as a prototype and keep it close to the evaluated code/route.
- No production persistence, broad abstraction, production rollout, or real destructive mutation by default.
- Do not add tests or production error-handling to a throwaway experiment unless they are the question being tested.
- Never leave a prototype route, switcher, or temporary harness as accidental product behavior.

## Output

Report the question, selected shape, run path, observed learning, and cleanup/absorption decision.
