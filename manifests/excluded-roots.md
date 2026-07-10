# Excluded Roots

This repository has many skill-shaped directories. Active authored-source routing
must not scan the whole tree.

## Active Source Roots

| Root | Role | Active source? |
|---|---|---:|
| `shared/general` | Provider-neutral authored skills and routers | yes |
| `shared/codex` | Codex-oriented authored skills | yes |
| `shared/claude` | Claude-specific authored skills | yes |
| `shared/variants` | Explicit alternate source variants | no by default |

`shared/variants` is source material, but it intentionally preserves alternate
names and wording. Keep it out of the active manifest until variant-aware routing
exists.

## Excluded Roots

| Root | Classification | Reason |
|---|---|---|
| `archive/` | archive-only | Historical inventory and old exports. |
| `bundles/` | generated-output | Bundle inputs are copied/generated exposure surfaces, not canonical source. |
| `providers/` | generated-output | Live provider overlays are installed views. |
| `providers-current/` | generated-output | Snapshot/parity material only. |
| `providers/*/.system/` | system-installed | Provider-owned skills; preserve but exclude from authored-source validation. |
| `providers/*/.routed/` | generated-output | Routed output should not be active source and should not be represented as repo-internal symlinks. |
| `mirrors/` | vendor-source | Upstream/imported material; selected imports should be copied or explicitly manifested. |
| `loose/` | reference-only | Historical prompts/templates, not invocable skill directories. |
| `packs/` | reference-only | Pack notes and audit metadata. |
| `reports/` | reference-only | Generated or hand-authored audit reports. |
| `.git/` | excluded | Version-control internals. |

## Generated Output Policy

- Edit canonical skill bodies in `shared/*` or the relevant upstream mirror.
- Use `bundles/*` and `providers/*` as generated or installed views.
- Do not put provider overlays back into source discovery.
- Do not preserve repo-internal symlinks in generated outputs.
- Do not allow `skill-name/skill-name/SKILL.md` nested copies in generated outputs.

## Validation

Run this from the repository root:

```sh
node scripts/validate-skills.mjs
```

The validator checks the active manifest, excluded roots, frontmatter, local
links, symlinks, nested generated copies, and common instruction-quality smells.
