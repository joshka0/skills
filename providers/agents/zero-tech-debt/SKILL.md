---
name: zero-tech-debt
description: Rework a change as if the intended UX and architecture existed from day one, deleting compatibility cruft and accidental complexity.
user-invocable: true
---

# Zero Tech Debt

Rework the change from the intended end state, not from the historical path that
produced the current patch.

## Steps

1. State the intended end state in one or two sentences.

2. Search for real callers before preserving compatibility.
   If a mode, prop, wrapper, route alias, or fallback has no current caller,
   delete it.

3. Reshape around the final product surface.
   Prefer one clear component or flow over mode flags. Split only when it
   creates an obvious boundary such as state, layout, controls, or domain
   commands.

4. Move shared rules to one place.
   Feature flags, permissions, route gating, URL state, and command naming
   should not be duplicated across pages or hidden in view components.

5. Verify the intended flow.
   Test the new behavior and any deleted assumptions that affect navigation,
   permissions, or persisted state.

## Broad Cleanup Lanes

For broad codebase cleanup, split work into independent lanes. Each lane should
search first, prove current usage, make the smallest coherent deletion or
consolidation, and verify behavior after.

1. Deduplicate and consolidate code where DRY reduces complexity.
   Do not merge code that only looks similar if the product concepts are
   different.

2. Consolidate shared type definitions.
   Find duplicate or near-duplicate types and move only stable shared contracts
   to shared locations.

3. Remove unused code with evidence.
   Use tools such as `knip`, compiler diagnostics, repo search, and import graph
   checks. Delete only after confirming there are no live references.

4. Untangle circular dependencies.
   Use tools such as `madge` or language-native dependency graph tooling, then
   move ownership boundaries rather than adding pass-through files.

5. Replace weak types.
   Remove `any`, `unknown`, stringly-typed payloads, and language equivalents
   when a stronger domain type can be proven from call sites, schemas, package
   APIs, or persisted data.

6. Remove defensive error hiding.
   Delete broad `try` / `catch`, fallback, rescue, or defaulting patterns unless
   they handle unknown input, unsanitized external data, boundary failures, or a
   documented recovery path.

7. Delete deprecated, legacy, and fallback paths.
   Keep code paths singular. Prefer one canonical behavior over old aliases,
   compatibility branches, and runtime migrations.

8. Remove AI slop, stubs, larp, and stale narration.
   Delete placeholder code, fake completeness, unnecessary comments, and
   comments about in-progress replacement work. Keep only concise comments that
   help a new maintainer understand durable behavior.

## Thermonuclear Cleanup Pressure

When the codebase needs a harsher cleanup pass, look for code-judo moves:
behavior-preserving restructurings that make the implementation dramatically
simpler by deleting whole categories of complexity.

- Do not preserve incidental complexity just because it already exists.
- Treat files crossing 1000 lines as decomposition pressure.
- Treat scattered conditionals, mode flags, nullable switches, and fallback
  branches as signs that the model may be wrong.
- Delete thin wrappers, identity helpers, and generic machinery that do not make
  the final product surface clearer.
- Move feature logic to the canonical layer instead of spreading checks through
  shared paths.
- Replace casts, `any`, `unknown`, stringly payloads, and vague optionality with
  explicit contracts when call sites reveal the real shape.
- Prefer atomic state changes and clear orchestration over half-applied updates
  or needless sequential flows.

## Rules

- Optimize for the code that should exist, not the smallest diff from the old
  shape.
- Delete dead compatibility paths instead of making them better.
- Do not invent a generic framework for one feature.
- Keep the refactor scoped to what makes the final shape coherent.
- Prefer names that describe product intent over implementation history.
- Prefer deletion and consolidation backed by caller evidence over broad
  speculative rewrites.
