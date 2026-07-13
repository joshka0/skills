# AGENTS.md — joshka0 Skills Pack

This repository is the governed source for the `joshka0` local skills pack.
Keep paths portable: use repository-relative paths, `$HOME`, or a tool-specific
home variable; never hardcode a personal absolute path.

## Safety rules

- Never permanently delete repository content. Move retired material to a dated
  `history/` location or use `/usr/bin/trash`.
- Never use destructive Git operations that discard work.
- Treat unrelated changes as user-owned and preserve them.
- Never write a credential value, secret-bearing URL, or private key into pack
  content, scripts, reports, examples, or generated providers.
- Do not write `$HOME` configuration while maintaining the pack. `bin/pack install`
  is preview-only unless the user explicitly requests `--apply`; even
  apply mode does not edit configuration files.

## Current pack model

```text
shared/             canonical locally owned skill packages
mirrors/            imported upstream sources and evidence
catalog/pack.json   all composition and consumer declarations
native/<provider>/  provider-owned exception inputs
providers/          current generated live views
history/            retired inputs and dated evidence
bin/pack             sole active pack command
```

`providers/` is generated and live today. Phase 6 was killed because direct
links would remove the render/apply promotion boundary and its consumer model
was invalid. A future registry proposal is export-only and separately gated;
ordinary maintenance continues to use catalog render-and-compare.

## Editing rules

1. Establish the canonical owner in `catalog/pack.json`.
2. Edit a locally owned body only below `shared/`; patch `mirrors/` only as an
   intentional import decision.
3. Edit provider-owned exception content only below `native/`.
4. Never edit `providers/` as semantic source.
5. For any skill-content edit, follow all four normative references below
   `shared/general/skill-authoring/references/`, archive the pre-rewrite package,
   and run its declared archetype validator.
6. Update catalog core membership, aliases, exceptions, and consumer declarations when
   exposure changes.
7. Render and inspect before applying. Apply only when the requested scope
   explicitly authorizes refreshing the live provider tree.
8. Keep governing docs derived from catalog data and current paths.

## Pack commands

```sh
bin/pack check
bin/pack render --all --full
bin/pack apply --all --full
bin/pack install
bin/pack install --apply
```

`check` validates all 26 canonical packages, local links, secrets, catalog
membership, native inputs, executable-consumer unions, generated parity, governing
docs, and fixtures. `render` is pure. `apply` builds and validates a complete
candidate before atomically exchanging the whole provider tree; displaced data
goes to Trash.

## Catalog install mappings

| Installed view | Install root | Current generated source | Executable consumers |
| --- | --- | --- | --- |
| Shared Agents root | `$HOME/.agents/skills` | `providers/agents` | Codex, Gemini CLI |
| Claude Code | `$HOME/.claude/skills` | `providers/claude` | Claude Code |
| Codex-specific | `${CODEX_HOME:-$HOME/.codex}/skills` (fallback `$HOME/.codex/skills`) | `providers/codex` | Codex |
| Droid | `$HOME/.factory/skills` | `providers/factory` | Droid |
| Gemini-specific | `$HOME/.gemini/skills` | `providers/gemini` | Gemini CLI |
| Google Antigravity IDE | `$HOME/.gemini/config/skills` | `providers/gemini-antigravity` | Antigravity IDE |

Codex co-loads Agents and Codex with 20 byte-identical canonical overlaps.
Gemini loads its specific root and then the higher-precedence Agents root with
the same 20 overlaps; Agent Vault exposure through Agents remains an open owner
decision. The legacy `providers/droid` view is not an install mapping.

## Provider-native boundary

The complete exception set is:

- `providers/agents/agent-vault-cli` from `native/agents/agent-vault-cli`
- `providers/agents/agent-vault-http` from `native/agents/agent-vault-http`
- `providers/codex/.system` from `native/codex/.system`
- `providers/gemini-antigravity/heroui-pro-design-taste` from
  `native/gemini-antigravity/heroui-pro-design-taste`
- `providers/gemini-antigravity/heroui-react-pro` from
  `native/gemini-antigravity/heroui-react-pro`

Everything else in a supported provider view must resolve to one canonical
catalog package. A fresh full render is the parity authority; no provider
snapshot is maintained.

## Routing and catalog policy

- Default provider views expose compact owners and avoid router/child duplication.
- `product-platform` owns browser-extension work through a selected reference;
  `chrome-extension-builder` remains only a compatibility alias.
- `local-dev` owns secret-safe local handoffs; `local-secrets` remains only a
  compatibility alias.
- `crew` remains a standalone Claude package.
- `effect-framework`, `elixir-lang`, and `go-lang` remain default packages. A
  future removal proposal requires blinded paired-task evidence.
- The four skill-authoring references are the only normative skill rubric.
  Reports under `reports/rubric` are historical evidence.

The current catalog acceptance record is
`reports/catalog/CATALOG-CONFORMS-2026-07-13.md`.
