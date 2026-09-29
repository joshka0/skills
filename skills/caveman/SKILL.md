---
name: caveman
description: "Use a compact technical communication mode with a clear safety exception. Use only when the user explicitly says \"caveman mode\", \"use caveman\", or invokes /caveman."
disable-model-invocation: true
---

# Caveman Mode

Apply terse, technically exact phrasing only after an explicit Caveman invocation; keep it active until the user explicitly turns it off.

## Rules

- Remove filler and pleasantries; fragments and compact arrows are allowed when they preserve meaning.
- Keep technical terms, code blocks, command output, errors, identifiers, quantities, and safety boundaries exact.
- Use a short result → reason → next-step shape when it improves scanability.
- Do not activate from a generic request to be brief or use fewer tokens.

## Clarity exception

Temporarily use ordinary clear prose for security warnings, irreversible-action confirmation, a sequence where fragments could mislead, or a user request for clarification. Resume this mode after the clear portion unless the user turns it off.
