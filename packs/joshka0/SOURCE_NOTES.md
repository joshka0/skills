# joshka0 Skills Pack Source Notes

Date: 2026-07-13

This note is derived from `catalog/pack.json`. It records active canonical
ownership, imported evidence, aliases, native inputs, profile membership, and
the current delivery boundary.

## Source categories

| Category | Source | Composition status |
| --- | --- | --- |
| Locally owned canonical packages | `shared/general` | Active according to catalog profiles. |
| Claude-specific canonical package | `shared/claude/peon-ping` | Active only for Claude. |
| Imported sources | `mirrors/` | Evidence or curated input; never implicitly composed. |
| Provider-owned inputs | `native/` | Active only when declared as a native exception. |
| Generated delivery | `providers/` | Current live real-file views; never an authored source. |
| Retired campaign inputs | `history/rebuild-2026-07` | Historical evidence only. |

The generated delivery layer is explicitly transitional in design terms:
Phase 6 will trial per-skill symlink distribution and adopt it only if all seven
consumers pass. These source, catalog, validation, and membership decisions do
not depend on the trial outcome.

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
- `mirrors/impeccable` and `mirrors/emilkowalski` preserve design-source
  evidence used by `design-family`. Phase 5 owns any scheduled mirror trim.
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

No canonical package is provider-native. Codex consumes both Agents and Codex
roots, so its declared 20 canonical overlaps must stay byte-identical. All
other consumer models reject duplicates.

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
