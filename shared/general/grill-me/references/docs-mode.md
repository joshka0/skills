# Docs Mode

Use this reference only after the user says "grill me with docs".

## Preflight

1. Locate the relevant `CONTEXT.md`, `CONTEXT-MAP.md`, and existing ADRs before challenging terminology or a decision.
2. Read only the context and decision records relevant to the plan; use a context map to choose the applicable context.
3. Compare the user's terms and claimed behavior with those records and the code when the question is evidence-resolvable.

## During the session

- Surface conflicting, vague, or overloaded terms immediately and ask for one canonical meaning.
- Use concrete scenarios to test domain boundaries and relationships.
- When the user resolves a domain term, update the relevant context record inline. Keep definitions concise, record meaningful relationships, and note a real ambiguity only when it remains useful.
- When the user resolves a significant decision, record it inline only if it is hard to reverse, surprising without context, and the result of a real trade-off.

## Write boundary

- Create a context record or ADR only when there is resolved content to record; do not create empty scaffolding.
- Record the decision and its rationale, not implementation detail or a transcript of the discussion.
- If the repository already has an ADR convention, follow it and derive any sequence number from the existing records.
- Do not infer a glossary term or decision from code alone.
