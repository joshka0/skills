# Issue slicing

Read only when a PRD, spec, or reviewed plan needs independently grabbable issues.

1. Use current context, configured tracker records, domain vocabulary, and ADRs as needed. Do not modify a parent issue unless the user explicitly asks.
2. Slice vertically: each issue delivers a narrow end-to-end behavior that can be demonstrated or verified alone, not one horizontal layer of a larger feature.
3. Mark each slice AFK only when an agent can finish without human context or judgment; otherwise mark it HITL and name the decision or access that blocks autonomy.
4. For more than three slices or any AFK/HITL ambiguity, present title, type, dependency, and covered story before publication.
5. Give every issue an outcome-focused objective, independently testable criteria, explicit non-goals, and a clear blocker or “none”.
