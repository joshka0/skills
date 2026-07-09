---
name: skill-authoring
description: Author or refactor agent skills with compact active instructions, progressive references, scripts, assets, and provider metadata. Use when creating a new skill, splitting an oversized SKILL.md, improving skill descriptions, or aligning skills with this repo's pack architecture.
---

# Skill Authoring

Use this skill to author or refactor skills in this pack.

## Workflow

1. Identify whether the request needs a new skill, a mode in an existing family, or a reference file.
2. Gather the task/domain, triggers, use cases, and any deterministic operations.
3. Write `SKILL.md` as routing, workflow, hard rules, and output shape only.
4. Put detailed guidance, examples, templates, checklists, volatile facts, and API matrices under `references/`.
5. Add `scripts/`, `assets/`, or `agents/` only when they have a clear purpose.
6. Validate frontmatter, description triggers, links, and bundle/provider implications.

## House Rules

- Do not create a new skill when a mode or reference in an existing family would do.
- Keep `SKILL.md` short; it is the command brain, not an encyclopedia.
- Use `references/` for detailed docs and examples.
- Use scripts for deterministic repeatable operations.
- Use assets for static templates or support files.
- Use `agents/` for provider metadata only.
- Do not duplicate full content across `shared`, `bundles`, `providers`, and `archive`.
- Edit canonical sources in `shared/*` or the relevant `mirrors/*` source, not generated provider overlays.

## References

Read only what the task needs:

- `references/structure.md` for repo layout and skill directory shape.
- `references/descriptions.md` for frontmatter description requirements.
- `references/references-assets-scripts.md` for when to split files or add support resources.
- `references/validation.md` for review checklist and validation expectations.

## Output

When proposing or changing a skill, report:

- **Canonical home**: where the source skill lives.
- **Active instructions**: what stays in `SKILL.md`.
- **References**: what moves under `references/`.
- **Bundle impact**: which bundle/provider inputs need syncing.
- **Validation**: checks performed or still needed.
