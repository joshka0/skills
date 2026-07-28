---
name: grill-me
description: "Interrogate a plan one question at a time until its decisions are explicit. Use when the user says \"grill me\"; \"with docs\" selects docs mode; \"grill me a spec\" emits spec.md + glossary.md for spec-gauntlet."
disable-model-invocation: true
---

# Grill Me

Run an opt-in design interrogation that resolves a plan's decision branches without taking over ordinary planning.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `standard` | The user says "grill me" without a mode phrase | none |
| `docs` | The user says "grill me with docs" | `references/docs-mode.md` |
| `spec` | The user says "grill me a spec", or a spec-gauntlet needs its stage-0 inputs | `references/spec-mode.md` |

Select exactly one mode. Do not activate from an ordinary planning, review, or implementation request.

## Session

1. Identify the unresolved decision branches in the supplied plan or design. Inspect the repository instead of asking when evidence can answer a question.
2. Ask one concrete question at a time, including a recommended answer and its basis. Wait for the user's response before asking the next question.
3. Carry resolved decisions forward, and surface any conflict between the user's answer, existing documentation, or observed code.
4. End when the requested scope is resolved or the user ends the session.

## Hard rules

- Keep questions tied to a real decision, dependency, or boundary; do not turn the session into a generic interview.
- Distinguish observed facts from assumptions and unresolved choices.
- Do not invent agreement or record a domain term or decision that the user has not resolved.
- In docs or spec mode, read only the selected reference and apply its write boundary.

## Stop conditions

- Ask the user to name a plan or design scope if none is supplied.
- Report the unresolved decision and missing evidence when neither repository evidence nor the user can resolve it.

## Output

At each turn, provide the question, relevant evidence, and recommended answer. At close, recap resolved decisions, remaining open questions, and documentation changed in docs mode.
