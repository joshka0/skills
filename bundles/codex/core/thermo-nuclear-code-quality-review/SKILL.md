---
name: thermo-nuclear-code-quality-review
description: Run an extremely strict maintainability review for abstraction quality, giant files, and spaghetti-condition growth. Use for a thermo-nuclear code quality review, thermonuclear review, deep code quality audit, or especially harsh maintainability review.
disable-model-invocation: true
---

# Thermo-Nuclear Code Quality Review

Use this skill for an unusually strict review focused on implementation quality,
maintainability, abstraction quality, and codebase health.

Push hard for ambitious structural simplification. Do not stop at local cleanup
when there is a clear "code judo" move: a behavior-preserving restructuring
that makes the implementation dramatically simpler, smaller, more direct, and
more inevitable in hindsight.

## Core Prompt

Start from this baseline:

> Perform a deep code quality audit of the current branch's changes.
> Rethink how to structure / implement the changes to meaningfully improve code
> quality without impacting behavior.
> Work to improve abstractions, modularity, reduce spaghetti code, improve
> succinctness and legibility.
> Be ambitious. If there is a clear path to improving the implementation that
> involves restructuring some of the codebase, go for it.
> Be extremely thorough and rigorous. Measure twice, cut once.

## Review Standards

Apply these rules aggressively:

1. Search for code-judo moves.
   Look for a reframing that deletes whole branches, helpers, modes,
   conditionals, or layers instead of polishing them.

2. Treat file-size jumps as design pressure.
   Do not let a PR push a file from under 1000 lines to over 1000 lines without
   a strong structural reason. Ask whether decomposition should happen first.

3. Stop spaghetti growth.
   New ad hoc conditionals, scattered special cases, mode flags, nullable
   switches, and feature checks in unrelated flows are design problems.

4. Prefer direct, boring code.
   Flag hacky, magical, generic, thin, identity, or pass-through abstractions
   that add indirection without reducing the concepts a reader must hold.

5. Push on type and boundary cleanliness.
   Question casts, `any`, `unknown`, unnecessary optionality, stringly payloads,
   and silent fallbacks when an explicit typed model or boundary would make the
   invariant clearer.

6. Keep logic in the canonical layer.
   Call out feature logic leaking into shared paths, implementation details
   leaking through APIs, and bespoke helpers where the codebase already has a
   canonical utility.

7. Treat brittle orchestration as a design smell.
   If independent work is serialized for no good reason, or related updates can
   leave state half-applied, ask whether a cleaner parallel or atomic structure
   would be simpler to reason about.

## Primary Questions

- Is there a code-judo move that would make this dramatically simpler?
- Can the change be reframed so fewer concepts, branches, or helper layers are
  needed?
- Did this improve or worsen the local architecture?
- Did the diff add branching complexity where a better model should exist?
- Did a cohesive module become more coupled, more stateful, or harder to scan?
- Is this logic in the right file, package, module, and layer?
- Did this change push a file or component past a healthy size boundary?
- Are repeated conditionals signaling a missing model or helper?
- Is the implementation direct, or does it rely on special cases and incidental
  control flow?
- Is this abstraction earning its keep, or is it just a wrapper?
- Did casts, optionality, or ad hoc shapes obscure the real invariant?
- Is orchestration more sequential or less atomic than it needs to be?

## What To Flag Aggressively

- A complicated implementation where a cleaner reframing could delete whole
  categories of complexity.
- Refactors that move code around but do not reduce the number of concepts.
- Files crossing 1000 lines due to the diff without a strong reason.
- New conditionals bolted onto unrelated paths.
- One-off booleans, nullable modes, fallback flags, or compatibility branches.
- Feature-specific logic leaking into general-purpose modules.
- Magic handling that hides simple structure.
- Thin wrappers and identity abstractions.
- Cast-heavy contracts, `any`, `unknown`, or unnecessary optional params.
- Copy-pasted logic instead of a canonical helper.
- Narrow edge-case handling in already busy functions.
- Temporary branching likely to become permanent debt.
- Sequential async flow or partial updates where a cleaner structure is obvious.

## Preferred Remedies

- Delete a layer of indirection instead of polishing it.
- Reframe the state model so conditionals disappear.
- Move ownership so the feature becomes a natural extension of an existing
  abstraction.
- Turn special cases into a simpler default flow with fewer exceptions.
- Extract a helper or pure function when it genuinely improves locality.
- Split a large file into focused modules.
- Replace condition chains with a typed model or explicit dispatcher.
- Separate orchestration from business logic.
- Collapse duplicate branches into one clearer flow.
- Delete wrappers that do not clarify the API.
- Reuse the canonical helper.
- Make type boundaries explicit so control flow gets simpler.
- Move logic to the package, module, or layer that already owns the concept.
- Parallelize independent work when that also simplifies orchestration.
- Make related updates atomic when partial state is harder to reason about.

## Output Expectations

Prioritize findings in this order:

1. Structural code-quality regressions.
2. Missed opportunities for dramatic simplification.
3. Spaghetti or branching complexity increases.
4. Boundary, abstraction, and type-contract problems.
5. File-size and decomposition concerns.
6. Modularity and abstraction issues.
7. Legibility and maintainability concerns.

Prefer a smaller number of high-conviction comments over a long list of
cosmetic notes.

## Approval Bar

Do not approve merely because behavior seems correct. Treat these as
presumptive blockers unless clearly justified:

- Preserving incidental complexity when a plausible code-judo move would delete
  it.
- Pushing a file from below 1000 lines to above 1000 lines.
- Adding ad hoc branching that tangles an existing flow.
- Scattering feature checks across shared code.
- Adding unnecessary wrappers, abstractions, casts, or optionality churn.
- Duplicating an existing helper or putting logic in the wrong layer.

Be direct, serious, and demanding about quality. Do not be rude, but do not
soften major maintainability issues into mild suggestions.
