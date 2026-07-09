# References, Assets, and Scripts

## When to add reference files

Move content out of `SKILL.md` into `references/` when:

- The detail would make the active instructions harder to scan.
- The content is volatile or likely to change independently (API matrices, version tables, pricing).
- It serves a specific sub-audience (e.g., a deep troubleshooting guide that most invocations never need).
- Multiple reference topics exist; keep one file per topic.

Keep content in `SKILL.md` when:

- It is a short workflow step, hard rule, or output shape that the agent reads every invocation.
- It is the routing map that tells the agent which reference to load next.

### Naming conventions

- Use a `references/` directory — never a single `REFERENCE.md` or `REFS.md` at the skill root.
- Use kebab-case file names: `references/ci-patterns.md`, not `references/CIPatterns.md`.
- One file per topic so the agent can read only what it needs (progressive disclosure).
- Name files after what they contain, not after verbs: `references/descriptions.md`, not `references/how-to-write-descriptions.md`.

## When to add scripts

Add a `scripts/` subdirectory when:

- The skill benefits from a deterministic, repeatable operation (scaffold generation, validation, linting, CI helpers).
- The same shell or node invocation would otherwise be copy-pasted as prose into instructions.
- The script is small, self-contained, and runnable from the skill directory.

Do not add scripts for operations that are simple one-liners better expressed inline, or that depend on tools not reliably available in the target environment.

## When to add assets

Add an `assets/` subdirectory when:

- The skill needs static templates, seed files, or configuration snippets that are copied or referenced at runtime.
- Example: a starter `openapi.yaml` template, a default config file, or a prompt template.

Do not use `assets/` for documentation; that belongs in `references/`.

## When to add agents/

Add an `agents/` subdirectory when:

- A provider requires metadata files to register or configure the skill (e.g., `openai.yaml` for OpenAI-compatible agents).
- The metadata is provider-specific and should not pollute the generic `SKILL.md`.

Do not add `agents/` entries that duplicate information already in frontmatter.

## Progressive disclosure model

The active skill (`SKILL.md`) is the routing layer. It tells the agent what to do and where to find detail. References, scripts, assets, and agent metadata are loaded on demand. This keeps the skill fast to read and cheap to load while preserving full depth when needed.
