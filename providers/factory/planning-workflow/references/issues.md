# Issue slicing and AFK briefs

Read only when a PRD, spec, or reviewed plan needs independently grabbable issues, or when a ready issue needs a self-contained AFK execution contract.

1. Use current context, configured tracker records, domain vocabulary, and ADRs as needed. Do not modify a parent issue unless the user explicitly asks.
2. Slice vertically: each issue delivers a narrow end-to-end behavior that can be demonstrated or verified alone, not one horizontal layer of a larger feature.
3. Mark each slice AFK only when an agent can finish without human context or judgment; otherwise mark it HITL and name the decision or access that blocks autonomy.
4. For more than three slices or any AFK/HITL ambiguity, present title, type, dependency, and covered story before publication.
5. Give every issue an outcome-focused objective, independently testable criteria, explicit non-goals, and a clear blocker or “none”.
6. For an AFK-ready issue, make the issue or attached brief the authority rather than a pointer to discussion or conversation memory. Include category, current behavior, desired behavior with errors and edge cases, durable interfaces or configuration shapes, acceptance criteria, and non-goals.
7. Describe behavior rather than implementation choreography. Do not freeze stale file paths or line numbers; name an interface or contract only when it changes the work boundary.
8. Keep every AFK criterion independently verifiable and every scope exclusion explicit. If the issue remains HITL, state the human decision or access that prevents safe AFK execution.

Publish or save slices and briefs only through the configured workflow and after any required maintainer preview.
