---
name: design-family
description: "Apply house design taste to production interfaces, UI critique, polish, motion, and Apple-like gestures."
---

# Design Family

Choose one production-interface decision and load only its selected guidance.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `build` | A new or redesigned production UI needs an intentional visual direction | `references/build.md` |
| `review` | The user names a UI audit or critique of an existing surface | `references/review.md` |
| `improve` | The user names UI improve/tune or one concrete quality or expressive outcome | `references/improve.md` |
| `impeccable-depth` | A real production UI needs high-craft web polish, an anti-generic visual direction, or resilient interaction-detail judgment | `references/impeccable-depth.md` |
| `motion` | A named UI animation, motion review, gesture feel, or motion-effect term needs a design decision | `references/animation.md` |
| `apple-physicality` | An explicit Apple-like, gesture-driven sheet, drawer, drag, swipe, momentum, or material-depth interaction needs a design decision | `references/apple-design.md` |

Read the reference that answers the design question. Use `build` for direction,
`improve` for a named change, and `impeccable-depth` when that deeper critique is
requested or needed. Consult the relevant part of `references/standards.md`
when interaction, accessibility, layout, or data presentation is in scope.

## Do not use when

- Use the project's platform documentation and installed APIs for implementation constraints; `uniwind` owns its styling and migration conventions.
- Handle a requested throwaway experiment directly in the project's toolchain. Do not turn it into a production-design process.

## Shared workflow

1. Inspect the target, user goal, current design system, real content, and all relevant states before proposing a direction.
2. State the selected mode, intended user outcome, and any material brand, platform, or accessibility assumption.
3. Resolve version-sensitive platform behavior from repository state, live tooling, then current primary documentation; mark uncertainty instead of guessing.
4. Verify the result through the affected user flow, including the states and input methods the selected work changes.

## Hard rules

- Build around a deliberate purpose, tone, hierarchy, and differentiator; do not ship a generic template or decorative effect without a product reason.
- Reuse established tokens and patterns. Extract a shared primitive only after real reuse proves a stable concept.
- Preserve one clear next action and reveal complexity progressively rather than making every control equally prominent.
- Motion must explain feedback, state, or spatial continuity; it must not delay work, obscure focus, or become decoration.
- A review reports evidence and priorities; it does not become an unrequested implementation pass.

## Stop conditions

- Ask for direction when the work could be either a production change or a throwaway prototype and that choice changes the artifact.
- Hand off when a platform implementation constraint, rather than an interface decision, determines the result.

## Output

Return the selected mode, target and user outcome, evidence, smallest justified change or finding, verification, and unresolved risk or handoff.
