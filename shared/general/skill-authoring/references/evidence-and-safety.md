# Evidence and safety contract

This is a maintained operational split of the repository's current rubric, not an independent normative source. Reconcile any drift to the repository rubric before acceptance.

## Volatility and source of truth

Treat a fact as volatile when it can meaningfully change within twelve months or across installed versions. This includes package APIs, SDK behavior, CLI flags, event schemas, provider capabilities, model names, prices, store rules, compliance requirements, compatibility matrices, and release procedures.

Use this source order:

1. Repository installed version, lockfile, generated types, configuration, and existing conventions.
2. Live tool output such as `--version`, `--help`, schema inspection, or provider status.
3. Official documentation through a current primary source.
4. The skill only for durable house decisions, selection rules, and verification posture.

Requirements:

- Do not mirror an external manual or large public export into active instructions or references.
- A framework skill tells the executor to detect the installed version before applying version-sensitive advice.
- Do not retain API matrices, exhaustive component tables, copied store checklists, pinned model recommendations, or current pricing.
- External technical links point to primary documentation and should use stable roots rather than fragile deep anchors.
- If current sources are unavailable, tell the executor to mark uncertainty rather than guess.
- Code examples should be under 40 lines and demonstrate a pack-specific invariant, not basic library use.

A volatile value may appear only as an intentional **Pack constraint**. Name the local owner and rationale, and include a live availability or compatibility check. Moving volatile prose into references does not solve volatility; replace it with a lookup and decision procedure.

## Secrets, private infrastructure, and machine paths

Private operational knowledge is high-value, but secrets and non-portable literals are not acceptable storage formats.

### Secrets

- Credentials, passwords, tokens, API keys, private keys, recovery codes, session values, and secret-bearing URLs MUST NOT appear in Markdown, scripts, assets, examples, or provider copies.
- Development defaults and read-only credentials are still secrets.
- Examples use unmistakable placeholders such as `<token>` or environment-variable names.
- A skill may name required variables, key names, or vault paths, but may not print, summarize, or retrieve values without user authorization for that exact operation.
- Discovery commands prefer names, paths, counts, hashes, and status; broad environment or dotenv dumps are forbidden defaults.
- Outputs and errors redact secret values.

### Paths and machine-specific facts

- Canonical pack content uses repo-relative paths, `$HOME`, or tool-specific variables such as `${CODEX_HOME:-$HOME/.codex}`.
- Literal personal-home paths are forbidden.
- Stable aliases and service names may remain as non-default value only when the workflow verifies them live before action.
- Discover hostnames, IP addresses, ports, local URLs, device names, and filesystem locations from config or status rather than freezing them in the pack.
- When a machine value cannot be discovered, put it in an ignored local profile or environment variable; check in only a schema or `.example` asset with placeholders.
- A missing machine profile is a clear preflight failure, not permission to guess.

Private-infrastructure skills should preserve topology, ownership, safe-operation rules, discovery commands, and failure handling. They should not become generic tutorials merely to appear portable.

## Scripts, assets, and operational safety

Every support file is referenced by the active skill or a selected reference.

Scripts:

- Perform one deterministic operation with explicit inputs and observable exit status.
- Are idempotent where practical and fail closed on missing prerequisites.
- Do not print secrets or broad environment state.
- Provide preview or dry-run before destructive, publishing, permission-changing, or broad rewrite actions.
- Do not auto-commit, push, publish, delete, or modify external state unless the user explicitly requests that action and it is the skill's named purpose.
- Use a runtime reasonably available to target providers and no undeclared dependency.
- Are smoke-tested from the skill directory.

Assets are static, portable, secret-free, and copied or consumed by a named workflow step. Large binaries and generated documentation do not belong in a skill package. Provider metadata derives from the same capability and trigger contract; it may adapt presentation but must not fork behavior.

## Workflow, hard-rule, and output discipline

- Workflows contain only steps that change execution; delete advice a strong agent already follows.
- Hard rules protect a real invariant, user preference, security boundary, or known failure mode.
- Avoid identity reinforcement, emphasis blocks, repeated cautions, and performative roleplay. When in doubt, delete filler.
- Stop conditions are concrete and proportionate; ordinary uncertainty is not a reason to stop.
- Use an exact output schema only when a downstream tool, review gate, or user contract consumes it.
- Otherwise specify the result and verification evidence without forcing a verbose report template.
- Commands are portable to the declared environment and do not contradict repository instructions.

The final skill should make the correct action more likely while adding as little compulsory prose as possible.
