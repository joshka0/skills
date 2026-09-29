# Docs mode

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

## Fallback document shapes

Use these only when the target repository has no local documentation convention. Existing local files and documented project conventions always win.

Create a root `CONTEXT.md` lazily only when there is no context map or local context layout and a term is resolved:

Use domain-specific terms, one-sentence definitions, and meaningful aliases; group terms or add a short example dialogue only when it clarifies a real boundary.

```md
# <Context>
<One-sentence purpose.>

## Language
**<Term>**: <What it is>. Avoid: <aliases>.

## Relationships
- <Term> <relationship> <Term>.

## Flagged ambiguities
- <Ambiguous term>: <resolution>.
```

For a first ADR, create `docs/adr/0001-<slug>.md` lazily; otherwise follow existing naming and numbering:

```md
# <Decision>

<Context, decision, and rationale in one to three sentences.>
```

Add status, options, or consequences only when they preserve a non-obvious trade-off.
