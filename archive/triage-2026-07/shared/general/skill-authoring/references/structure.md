# Skill Structure

Use this directory shape for skills in this pack:

```text
skill-name/
├── SKILL.md           # Main instructions: triggers, workflow, hard rules, output shape
├── references/        # Detailed docs, examples, checklists, volatile facts
│   └── guide.md
├── assets/            # Static support files or templates, if needed
├── scripts/           # Deterministic helper scripts, if needed
│   └── helper.js
└── agents/            # Provider metadata only, if needed
    └── openai.yaml
```

## Source of truth

Edit canonical skill bodies in `shared/*` or the relevant `mirrors/*` source. Bundle and provider directories are compose outputs or installed views unless a task explicitly says to update those inputs.

Do not duplicate full skill content across `shared`, `bundles`, `providers`, and `archive`. Keep provider-specific variants generated or isolated in provider overlay inputs.

## What belongs in SKILL.md

`SKILL.md` is for:

- Trigger-worthy purpose and scope
- Mode routing
- Workflow steps
- Hard rules
- Output shape
- Which reference to read next

It is not for full tutorials, API matrices, pricing, SDK version facts, or long examples.
