---
name: ui-tune
description: Tune an interface's expressive direction — bolder, quieter, colorize, distill, delight, or animate.
args:
  - name: mode
    description: bolder | quieter | colorize | distill | delight | animate
    required: true
  - name: target
    description: Feature, screen, component, or flow to tune.
    required: false
user-invokable: true
---

Use this skill to change the expressive quality of an interface without losing usability, accessibility, or product intent.

First, use `frontend-design` as the foundation. Read only the reference for the requested mode.

## Context Gate

Infer audience, product purpose, brand tone, platform, and constraints from the thread and repo first. Ask only if missing context would materially change the design direction.

## Modes

- `bolder`: increase contrast, scale, memorability, and point of view.
- `quieter`: reduce visual intensity while preserving hierarchy.
- `colorize`: add purposeful color and semantic palette structure.
- `distill`: remove clutter, choices, redundancy, and decorative noise.
- `delight`: add tasteful low-friction moments of personality.
- `animate`: add purposeful motion for feedback, continuity, or emphasis.

## Rules

- Do not use effects as decoration.
- Do not create generic AI-gradient/glass/card-grid aesthetics.
- Do not sacrifice accessibility, focus states, readability, or performance.
- Do not tune everything equally; pick the few highest-leverage moments.
- State assumptions when they shape the result.

## Output

- Mode and target
- Diagnosis
- Proposed changes or changes made
- Accessibility/performance considerations
- Verification checklist
