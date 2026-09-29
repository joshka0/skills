---
name: grill-me
description: "Interrogate a plan one question at a time until every decision is explicit. Use when the user says \"grill me\"; \"with docs\" selects docs mode; \"grill me a spec\" emits spec.md + glossary.md for spec-gauntlet."
disable-model-invocation: true
---

# Grill me

Modes: `standard` ("grill me"), `docs` ("grill me with docs": `references/docs-mode.md`), `spec` ("grill me a spec": `references/spec-mode.md`).

- Ask one question per turn, hardest first, with your recommended answer and its basis. Wait for the reply.
- Never accept a vague answer: restate it precisely and ask the user to confirm.
- If the repo can answer a question, look instead of asking.
- Surface conflicts between the user's answers, the docs, and the code. Never record a term or decision the user has not resolved.
- End when the scope is resolved or the user stops. Recap the resolved decisions, the open questions, and the docs changed.
