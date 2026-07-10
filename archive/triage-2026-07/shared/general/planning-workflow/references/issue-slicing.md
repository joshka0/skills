# Issue Slicing

Break a plan into independently grabbable issues using vertical slices, also called tracer bullets.

## Gather context

Work from current conversation context. If the user passes an issue reference, URL, or path, fetch it from the configured issue tracker and read its full body and comments.

If needed, explore the codebase so issue titles and descriptions use the project's domain glossary and respect ADRs.

## Draft vertical slices

Each issue is a thin vertical slice that cuts through all necessary integration layers end-to-end. Do not create horizontal tickets for one layer only.

Rules:

- Each slice delivers a narrow but complete path through the relevant layers.
- A completed slice is demoable or verifiable on its own.
- Prefer many thin slices over a few thick slices.
- Mark slices as `AFK` when an agent can complete them without human interaction.
- Mark slices as `HITL` when they require a human decision, design review, external access, or judgment call.

## Review

For more than 3 slices or any HITL/AFK ambiguity, present the proposed breakdown as a numbered list. For each slice, show:

- **Title**: short descriptive name
- **Type**: HITL / AFK
- **Blocked by**: which other slices, if any, must complete first
- **User stories covered**: which user stories this addresses if source material has them

Ask whether the granularity, dependencies, and HITL/AFK labels are right. For a small obvious plan, publish or draft directly according to the user's requested workflow.

## Issue template

```markdown
## Parent

A reference to the parent issue on the issue tracker, if the source was an existing issue. Omit this section otherwise.

## What to build

A concise description of this vertical slice. Describe end-to-end behavior, not layer-by-layer implementation.

Avoid specific file paths or code snippets. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can, inline it here and note briefly that it came from a prototype. Trim to the decision-rich parts.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Blocked by

- A reference to the blocking ticket, if any

Or "None - can start immediately" if no blockers.
```

Do not close or modify any parent issue unless explicitly instructed.
