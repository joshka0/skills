---
name: ui-improve
description: Improve UI quality through practical modes — normalize, polish, resilience, performance, adaptation, onboarding, UX copy, or design-system extraction.
args:
  - name: mode
    description: normalize | polish | resilience | performance | adaptation | onboarding | copy | extract-system
    required: true
  - name: target
    description: Feature, screen, component, or flow to improve.
    required: false
user-invokable: true
---

Use this skill to make practical UI improvements. Each mode addresses a different quality axis.

## Context Gate

Infer audience, product purpose, brand tone, platform, and constraints from the thread and repo first. Ask only if missing context would materially change the approach. State assumptions when they affect brand, accessibility, platform behavior, or user safety.

## Workflow

1. Use the `frontend-design` skill for design principles and anti-patterns before proceeding.
2. Read only the reference file for the requested mode.
3. Execute the mode-specific workflow against the target.

## Modes

| Mode | Reference | Focus |
|---|---|---|
| `normalize` | `reference/normalize.md` | Align feature with design system — tokens, components, patterns |
| `polish` | `reference/polish.md` | Final quality pass — alignment, states, transitions, details |
| `resilience` | `reference/resilience.md` | Harden for production — overflow, i18n, errors, edge cases |
| `performance` | `reference/performance.md` | Speed and smoothness — load, render, animate, Core Web Vitals |
| `adaptation` | `reference/adaptation.md` | Adapt across screens, devices, and contexts |
| `onboarding` | `reference/onboarding.md` | Onboarding, empty states, first-run flows |
| `copy` | `reference/ux-copy.md` | Clarify UX text — errors, labels, CTAs, help |
| `extract-system` | `reference/extraction.md` | Extract reusable components and tokens into the design system |

## Shared Rules

- Do not sacrifice accessibility, focus states, readability, or performance.
- Do not create new patterns when design-system equivalents exist.
- Do not hard-code values that should use design tokens.
- State assumptions when they shape the result.
- Verify changes do not introduce regressions.
- Measure before and after when performance is involved.
- Keep rollback in view for any structural change.

## Output Format

When reporting results:

- **Mode and target** — what was worked on.
- **Assumptions** — context inferred or assumed.
- **Diagnosis** — what was found and why it matters.
- **Changes** — what was done or proposed, with file references.
- **Verification** — how correctness was confirmed.
- **Residual risks** — known gaps or follow-up work.
