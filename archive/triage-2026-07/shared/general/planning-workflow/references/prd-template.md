# PRD Template

Use current conversation context and codebase understanding to produce a PRD. Do not run a broad interview. Ask only for a missing decision that would materially change the PRD or issue tracker output.

## Process

1. Explore the repo to understand current state if needed. Use the project's domain glossary vocabulary and respect ADRs in the area you are touching.
2. Sketch major modules or interfaces that may need to change. Look for deep modules that can be tested in isolation.
3. For non-trivial module or testing decisions, check with the user that the boundaries match their expectations.
4. Write the PRD, then publish it to the issue tracker according to the repo's configured workflow. Apply the `ready-for-agent` triage role unless instructed otherwise.

## Template

```markdown
## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

Enough user stories to cover distinct actors, outcomes, and edge cases without padding.

1. As an <actor>, I want a <feature>, so that <benefit>

## Implementation Decisions

A list of implementation decisions that were made. This can include:

- The modules that will be built or modified
- The interfaces of those modules that will be modified
- Technical clarifications from the developer
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

Do not include specific file paths or code snippets. They may become outdated quickly.

Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can, inline it within the relevant decision and note briefly that it came from a prototype. Trim to the decision-rich parts.

## Testing Decisions

Include:

- What makes a good test for this feature
- Which modules or behaviors should be tested
- Prior art for similar tests in the codebase

## Out of Scope

Things explicitly out of scope for this PRD.

## Further Notes

Any further notes about the feature.
```
