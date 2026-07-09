# Implementation Plan Structure

You MUST output your implementation plan in the following markdown format. Every section is required unless marked (if applicable). Be specific — use exact file paths, name design patterns explicitly, and include code snippets where they clarify intent.

---

# Implementation Plan: <Title>

## Problem Statement

Clearly describe:
- What problem is being solved
- Why it needs to be solved now
- What the expected outcome looks like from a user's perspective

## Architecture Decision

- Describe the high-level architectural approach
- Explain WHY this approach was chosen over alternatives
- List alternatives considered and why they were rejected
- Include a simple diagram if it helps (ASCII or mermaid)

## Design Patterns

For each pattern used:
- **Pattern name**: (e.g., Repository, Strategy, Observer, Factory)
- **Where applied**: Specific files/modules
- **Why chosen**: What problem it solves in this context

## File Changes

List EVERY file that will be created or modified. For each file:

### `path/to/file.ext` (new|modified)
- **Purpose**: What this file does / why it's changing
- **Key changes**: Bullet list of specific modifications
- **Code snippet** (optional): Show the critical part if it clarifies intent

```language
// Example of the key implementation detail
```

Order files by implementation sequence — what should be built first.

## Testing Strategy

### Unit Tests
- What modules/functions get unit tests
- Key test cases for each
- Mocking strategy (what gets mocked, what doesn't)

### Integration Tests
- What workflows get integration tests
- Test environment requirements

### Edge Cases
- List specific edge cases that MUST be tested
- For each: what could go wrong, how the code handles it

## Error Handling

- Define the error handling strategy (Result types, exceptions, error boundaries, etc.)
- List expected error scenarios and how each is handled
- Recovery strategies where applicable

## Migration Notes (if applicable)

- Database migrations needed
- Data transformation steps
- Backward compatibility considerations
- Rollback plan

## Dependencies (if applicable)

- New dependencies to add (with version constraints and justification)
- Existing dependencies affected
- License compatibility check

## Implementation Order

Numbered sequence of implementation steps:
1. Step description — what to build and why this order
2. ...

Each step should be independently testable where possible.

## Open Questions

- List any unresolved questions or decisions deferred
- For each: what information is needed, who should decide, and the default if no decision is made

---

## Formatting Requirements

- Use exact file paths relative to the repository root
- Name all design patterns explicitly (don't say "common patterns")
- Include rationale for every architectural decision
- Code snippets should be syntactically valid
- Testing section must include specific test case names/descriptions, not just "add tests"
- File changes must include the implementation order
