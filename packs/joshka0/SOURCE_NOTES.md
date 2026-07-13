# joshka0 Skills Pack Source Notes

Date: 2026-07-13

This note is derived from `catalog/pack.json`. It records active canonical
ownership, imported evidence, aliases, native inputs, core membership, and
the current delivery boundary.

## Source categories

| Category | Source | Composition status |
| --- | --- | --- |
| Locally owned canonical packages | `shared/general` | Active according to catalog `core` membership. |
| Claude-specific canonical package | `shared/claude/peon-ping` | Active only for Claude. |
| Imported sources | `mirrors/` | Evidence or curated input; never implicitly composed. |
| Provider-owned inputs | `native/` | Active only when declared as a native exception. |
| Generated delivery | `providers/` | Current live real-file views; never an authored source. |
| Retired campaign inputs | `history/rebuild-2026-07` | Historical evidence only. |

Phase 6 was killed because direct links would erase the render/apply promotion
boundary and the proposed consumer topology conflated provider views with
loaders. Registry distribution, if revisited, is a separate export-only
experiment.

## Canonical membership

Twenty packages are in every default provider profile:

```text
agent-orchestration
code-quality
design-family
effect-framework
elixir-lang
go-lang
goal-protocol
gtr
herdr
infra-bundles
local-dev
local-http-browser-use
maestri
planning-workflow
product-platform
prototype
release-bundles
repoprompt-pro-review
skill-authoring
uniwind
```

Six additional canonical packages are Claude-only:

```text
caveman
crew
git-guardrails-claude-code
grill-me
peon-ping
riff-partner
```

This yields 26 canonical packages. The archetype split is 13 suites, two
routers, two leaves, six private leaves, and three explicit interactions.

## Alias and consolidation decisions

The catalog retains 115 aliases owned by canonical packages plus six external
records. Aliases are selectable compatibility records, not extra packages.

Important consolidation outcomes:

- `chrome-extension-builder` routes to the `product-platform`
  browser-extension reference.
- `local-secrets` routes to the `local-dev` secrets mode.
- `maestri-portal` routes to the `maestri` portal mode.
- Goal, quality, design, language, planning, release, infrastructure, and
  orchestration legacy names route to their declared suite or router owner.
- Imported RepoPrompt workflows remain preserved under `mirrors/repoprompt`;
  active review work routes through `repoprompt-pro-review`.

The six external records cover two vendor-source ledgers, three archive-only
cuts, and the Codex system-installed surface. They are not canonical slots.

## Imported evidence

- `mirrors/mattpocock/skills` preserves the pinned Matt Pocock upstream import.
  Retained deltas were consolidated into catalog owners; the mirror is not a
  live profile.
- `mirrors/impeccable` retains its pin, license, and only the source files cited
  by the `design-family` preservation ledger; the rest is recoverable from the
  pinned upstream commit. `mirrors/emilkowalski` preserves the separate motion
  and Apple-physicality evidence used by the same canonical owner.
- `mirrors/repoprompt/agents` preserves inactive RepoPrompt workflows; it is not
  a generated provider input.
- The catalog also preserves the absent Foxctl vendor ledger as an external
  historical record rather than treating it as a filesystem source.

## Provider membership and native inputs

| Provider | Canonical | Native | Total |
| --- | ---: | ---: | ---: |
| `agents` | 20 | 2 | 22 |
| `claude` | 26 | 0 | 26 |
| `codex` | 20 | 1 | 21 |
| `droid` | 20 | 0 | 20 |
| `factory` | 20 | 0 | 20 |
| `gemini` | 20 | 0 | 20 |
| `gemini-antigravity` | 20 | 2 | 22 |

The complete native exception set is:

- `providers/agents/agent-vault-cli` from `native/agents/agent-vault-cli`
- `providers/agents/agent-vault-http` from `native/agents/agent-vault-http`
- `providers/codex/.system` from `native/codex/.system`
- `providers/gemini-antigravity/heroui-pro-design-taste` from
  `native/gemini-antigravity/heroui-pro-design-taste`
- `providers/gemini-antigravity/heroui-react-pro` from
  `native/gemini-antigravity/heroui-react-pro`

No canonical package is provider-native.

## Executable consumers and install mappings

| Executable consumer / view | Ordered install root | Generated source |
| --- | --- | --- |
| Shared root for Codex and Gemini CLI | `$HOME/.agents/skills` | `providers/agents` |
| Claude Code | `$HOME/.claude/skills` | `providers/claude` |
| Codex-specific | `${CODEX_HOME:-$HOME/.codex}/skills` | `providers/codex` |
| Droid | `$HOME/.factory/skills` | `providers/factory` |
| Gemini-specific | `$HOME/.gemini/skills` | `providers/gemini` |
| Google Antigravity IDE | `$HOME/.gemini/config/skills` | `providers/gemini-antigravity` |

Codex co-loads Agents and Codex, so its 20 canonical overlaps must stay
byte-identical. Gemini loads Gemini and then the higher-precedence Agents root;
its same 20 overlaps must also remain identical. That union currently exposes
`agent-vault-cli` and `agent-vault-http` to Gemini, pending an owner decision.
The legacy `providers/droid` view remains generated but is not a supported
install root; Droid uses the Factory view and root.

## Language profile ruling

`effect-framework`, `elixir-lang`, and `go-lang` remain in every default
profile. The next triage must run representative tasks in blinded paired
conditions with and without the candidate package, score both conditions
against the same correctness/decision rubric, and record the task set and
results before proposing membership changes. Usage counts alone are not
evidence for removal.

## Current acceptance

`bin/pack render --all --full` derives every current provider view from the
catalog, `shared/`, and `native/`. `bin/pack check` compares that render to live
content and modes. The dated result is
`reports/catalog/CATALOG-CONFORMS-2026-07-13.md`; the undated report is
superseded historical evidence.
