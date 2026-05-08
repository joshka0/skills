---
name: design-family
description: >-
  Router for design skills. Covers: frontend-design, ui-critique, ui-audit,
  ui-improve (normalize, polish, resilience, performance, adaptation, onboarding,
  copy, extract-system), ui-tune (bolder, quieter, colorize, distill, delight,
  animate), teach-context, emil-design-eng, and userinterface-wiki.
---

# Design Family

Use this as the small entrypoint for design work.

## Rule

Pick the design job first, then read only the matching skill from
`references/skill-map.md`. Do not stack multiple design skills unless the user
explicitly asks for a pass sequence.

## Routing

1. Build or redesign a surface -> use `frontend-design`.
2. Review existing UI -> use `ui-critique` or `ui-audit`.
3. Fix quality issues -> use `ui-improve` with the relevant mode.
4. Tune expressive direction -> use `ui-tune` with the relevant mode.
5. Capture design context -> use `teach-context domain=design`.
6. UI polish and animation taste -> read `references/emil-design-eng.md`.

## Pass Order

When a full design pass is requested, use this order:

1. `ui-critique`
2. `frontend-design`
3. `ui-improve mode=resilience`
4. `ui-improve mode=polish`

Use `ui-tune` modes only when the critique identifies that specific need.
