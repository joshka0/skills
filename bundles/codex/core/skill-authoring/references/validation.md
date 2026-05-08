# Validation Checklist

Run these checks before finalizing a new or changed skill.

## Frontmatter

- `name` is present, unique across the pack, and kebab-case.
- `description` is present, compact (1–3 sentences), and includes trigger keywords so the agent can match user intent.
- If the skill is a router, `description` lists the child skill names it covers (routing metadata is visible before reference files load).
- `args` or other custom frontmatter fields, if used, follow the agent's expected schema.

## Content quality

- No absolute user paths (`/Users/...`, `/home/...`) unless the skill is explicitly personal-scoped.
- No live credentials, tokens, or API keys in any file.
- No "Remember: You are..." pep talks or identity reinforcement; the skill should contain instructions, not motivation.
- No "MANDATORY PREPARATION" blocks; use normal heading structure and workflow steps instead.
- No duplicate full content across `shared`, `bundles`, `providers`, and `archive`.

## References and links

- All `references/...` links mentioned in `SKILL.md` resolve to existing files.
- Cross-skill references use the skill name, not an absolute path that may differ across provider overlays.
- External URLs are stable and point to public documentation.

## Directory conventions

- Reference files live under `references/`, not `REFERENCE.md`, `docs/`, or loose in the skill root.
- Scripts live under `scripts/`, assets under `assets/`, provider metadata under `agents/`.
- File names are kebab-case and topic-scoped.

## Bundle and provider implications

- After changing a canonical skill in `shared/*` or `mirrors/*`, check whether any bundle input under `bundles/<provider>/<bundle>` references it and needs updating.
- After changing a bundle, re-run the relevant compose script to refresh provider overlays.
- Verify no internal symlinks exist in the repo: `find . -type l -print` should produce no output.

## Quick validation command

```sh
# From repo root
grep -r '/Users/' shared/ mirrors/ --include='*.md' -l
grep -ri 'MANDATORY PREPARATION' shared/ mirrors/ --include='*.md' -l
grep -ri 'Remember: You are' shared/ mirrors/ --include='*.md' -l
find . -type l -print
```
