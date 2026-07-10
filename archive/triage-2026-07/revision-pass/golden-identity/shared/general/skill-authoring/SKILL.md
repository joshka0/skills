---
name: skill-authoring
description: "Apply this pack's normative skill-design contract to create, consolidate, or review canonical skills. Use when authoring a SKILL.md, choosing an archetype, or running the pack acceptance gate."
---

# Skill Authoring

Use the selected rubric reference as a maintained operational split of the repository's current rubric. The repository rubric is the single normative source; repository instructions and that rubric outrank a golden example when they differ.

## Route

Select one mode first and read only its reference. Read `validation-and-acceptance.md` before declaring a package complete.

| Mode | Select when | Read |
| --- | --- | --- |
| `existence-and-ownership` | deciding whether an idea earns a slot, cut, or merge target | `references/existence-and-ownership.md` |
| `package-and-routing` | writing frontmatter, active instructions, modes, references, or a router | `references/package-and-routing.md` |
| `evidence-and-safety` | handling volatile facts, private topology, paths, secrets, scripts, or operational rules | `references/evidence-and-safety.md` |
| `validation-and-acceptance` | checking a completed package, archive, collision matrix, or composition boundary | `references/validation-and-acceptance.md` |

## Workflow

1. Read the repository instructions and establish the canonical owner before editing prose.
2. Select exactly one mode from the table; use a second mode only where its decision surface is required.
3. Archive the pre-rewrite original of every touched skill before changing it.
4. Keep `SKILL.md` to routing, shared workflow, non-default rules, stops, output, and selected-reference conditions.
5. Run `bin/validate-skill.sh <skill-dir> <archetype>` from the repository root and record its literal result.
6. Produce an acceptance report with the collision matrix, A01--A35, preservation ledger, archive evidence, and the correct package-versus-catalog verdict.

## Hard rules

- Treat the four references as one contract; they are a split form of the pack rubric, not optional advice.
- If a split reference and the current repository rubric differ, stop and reconcile the split before accepting a package; do not silently create a second normative rule set.
- Do not create a standing skill for generic knowledge, a compatibility alias, or a one-off setup note; cut it or merge its delta into the named owner.
- Verify volatile behavior from repository state, live help/status, then primary documentation; do not mirror public manuals or API matrices.
- Never put secret values, literal personal-home paths, or guessed machine facts in canonical content.
- Do not edit bundles, providers, or installed views unless the task explicitly includes composition.

## Output

Report the canonical owner, chosen archetype, selected modes or targets, archive path, validation result, acceptance evidence, and whether the result is `PACKAGE-CONFORMS`, `CATALOG-CONFORMS`, or blocked.
