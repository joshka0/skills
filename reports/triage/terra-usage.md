# Terra: local skill usage evidence

Generated 2026-07-09 from a read-only sweep of the provider transcript roots named in the task. Counts are **direct structured evidence**, matched conservatively by declared skill name; they are not proof that the current shared source body or its exact version was loaded.

## Summary

- Inventory: 85 `shared/**/SKILL.md` source bodies, with 84 distinct `name:` values. `plan-build` has two source variants that declare the same name.
- Direct evidence matched 13 source bodies / 13 distinct names, for 58 observed matching invocations. The remaining 72 source bodies (71 distinct names) have no direct matching evidence in the inspected histories.
- `uniwind` is highest at 32 observed calls (31 Factory + 1 Claude). The next are `maestri` (6), `caveman` and `riff-partner` (3 each), then a five-way tie at 2.

## Highest observed counts

| Rank | Shared name | Total | Provider breakdown |
| --- | --- | ---: | --- |
| 1 | `uniwind` | 32 | Factory 31; Claude 1 |
| 2 | `maestri`† | 6 | Factory 6 |
| 3= | `caveman` | 3 | Factory 3 |
| 3= | `riff-partner` | 3 | Claude 3 |
| 5= | `improve-codebase-architecture` | 2 | Codex 2 |
| 5= | `migrate-nativewind-to-uniwind` | 2 | Factory 2 |
| 5= | `ruthless-test-strategy` | 2 | Codex 2 |
| 5= | `thermo-nuclear-code-quality-review` | 2 | Codex 2 |
| 5= | `zero-tech-debt` | 2 | Codex 2 |

The fifth position is a five-way tie; all tied entries are shown rather than arbitrarily breaking it.

## Per-shared-skill evidence

`0` means no matching direct record in that provider’s inspected readable history. `n/a` means no Droid session files existed, so it is not evidence of non-use. Gemini’s `0` is limited to its readable JSON/JSONL transcripts.

| Shared source body | Declared name | Claude | Codex | Factory | Gemini (readable) | Droid (no files) | Approx. last direct use |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `shared/claude/peon-ping` | `peon-ping` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/frontend-design` | `frontend-design` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/k8s-op` | `k8s-op` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/kubernetes-platform` | `kubernetes-platform` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/mobile-rn` | `mobile-rn` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/opentui` | `opentui` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/quality-gate` | `quality-gate` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/teach-context` | `teach-context` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/terraform-op` | `terraform-op` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/terraform-platform` | `terraform-platform` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/ui-audit` | `ui-audit` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/ui-critique` | `ui-critique` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/ui-improve` | `ui-improve` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/codex/ui-tune` | `ui-tune` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/agent-orchestration` | `agent-orchestration` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/building-native-ui` | `building-native-ui` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/caveman` | `caveman` | 0 | 0 | 3 | 0 | n/a | 2026-05-14 |
| `shared/general/chrome-extension-builder` | `chrome-extension-builder` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/code-council` | `code-council` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/code-quality` | `code-quality` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/codex-goal` | `codex-goal` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/collaboration-protocol` | `collaboration-protocol` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/delta-brief` | `delta-brief` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/design-family` | `design-family` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/diagnose` | `diagnose` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/effect-framework` | `effect-framework` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/effect-framework-architecture` | `effect-framework-architecture` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/effect-framework-concurrency-streams` | `effect-framework-concurrency-streams` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/effect-framework-errors` | `effect-framework-errors` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/effect-framework-migration` | `effect-framework-migration` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/effect-framework-runtime-resources` | `effect-framework-runtime-resources` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/effect-framework-services-layers` | `effect-framework-services-layers` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/effect-framework-testing` | `effect-framework-testing` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/elixir-lang` | `elixir-lang` | 1 | 0 | 0 | 0 | n/a | 2026-07-02 |
| `shared/general/elixir-lang-concurrency-pipelines` | `elixir-lang-concurrency-pipelines` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/elixir-lang-fault-observability` | `elixir-lang-fault-observability` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/elixir-lang-otp-design` | `elixir-lang-otp-design` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/elixir-lang-performance-interop` | `elixir-lang-performance-interop` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/elixir-lang-supervision-processes` | `elixir-lang-supervision-processes` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/elixir-lang-testing` | `elixir-lang-testing` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/expo-platform` | `expo-platform` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/git-guardrails-claude-code` | `git-guardrails-claude-code` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/go-lang` | `go-lang` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/go-lang-concurrency` | `go-lang-concurrency` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/go-lang-design` | `go-lang-design` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/go-lang-errors` | `go-lang-errors` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/go-lang-packages-api` | `go-lang-packages-api` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/go-lang-performance` | `go-lang-performance` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/go-lang-testing` | `go-lang-testing` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/goal-council` | `goal-council` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/goal-orchestrator` | `goal-orchestrator` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/goal-protocol` | `goal-protocol` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/grill-me` | `grill-me` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/grill-with-docs` | `grill-with-docs` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/gtr` | `gtr` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/herdr` | `herdr` | 1 | 0 | 0 | 0 | n/a | 2026-07-09 |
| `shared/general/improve-codebase-architecture` | `improve-codebase-architecture` | 0 | 2 | 0 | 0 | n/a | 2026-05-26 |
| `shared/general/infra-bundles` | `infra-bundles` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/local-dev` | `local-dev` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/local-http-browser-use` | `local-http-browser-use` | 1 | 0 | 0 | 0 | n/a | 2026-07-06 |
| `shared/general/maestri`† | `maestri` | 0 | 0 | 6 | 0 | n/a | 2026-05-04 |
| `shared/general/maestri-portal` | `maestri-portal` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/migrate-nativewind-to-uniwind` | `migrate-nativewind-to-uniwind` | 0 | 0 | 2 | 0 | n/a | 2026-04-22 |
| `shared/general/native-data-fetching` | `native-data-fetching` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/plan-build` | `plan-build` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/planning-workflow` | `planning-workflow` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/product-platform` | `product-platform` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/prototype` | `prototype` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/react-native-platform` | `react-native-platform` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/release-bundles` | `release-bundles` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/repoprompt-pro-review` | `repoprompt-pro-review` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/riff-partner` | `riff-partner` | 3 | 0 | 0 | 0 | n/a | 2026-07-09 |
| `shared/general/ruthless-test-strategy` | `ruthless-test-strategy` | 0 | 2 | 0 | 0 | n/a | 2026-05-26 |
| `shared/general/setup-matt-pocock-skills` | `setup-matt-pocock-skills` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/setup-pre-commit` | `setup-pre-commit` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/six-phase-dev` | `six-phase-dev` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/skill-authoring` | `skill-authoring` | 1 | 0 | 0 | 0 | n/a | 2026-07-02 |
| `shared/general/thermo-nuclear-code-quality-review` | `thermo-nuclear-code-quality-review` | 0 | 2 | 0 | 0 | n/a | 2026-05-26 |
| `shared/general/uniwind` | `uniwind` | 1 | 0 | 31 | 0 | n/a | 2026-07-03 |
| `shared/general/userinterface-wiki` | `userinterface-wiki` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/general/zero-tech-debt` | `zero-tech-debt` | 0 | 2 | 0 | 0 | n/a | 2026-05-26 |
| `shared/general/zoom-out` | `zoom-out` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/variants/legacy/delegate-codex-zellij-wording` | `delegate-codex` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/variants/zellij/codex-swarm` | `codex-swarm` | 0 | 0 | 0 | 0 | n/a | — |
| `shared/variants/zellij/plan-build` | `plan-build` | 0 | 0 | 0 | 0 | n/a | — |

† `maestri` is also a documented provider-native exception under `providers/agents`; the Factory record proves name-level invocation, not which same-named source body/version supplied it.

## Direct evidence and matching rules

### Claude Code

- Scanned `~/.claude/projects/**/*.jsonl`: 393 files, 71,087 valid JSON lines, timestamp range 2026-01-05 through 2026-07-09.
- Counted assistant `message.content[]` entries with `type: "tool_use"`, `name: "Skill"`, and nonempty `input.skill`. Stable `tool_use.id` deduplicated cloned/branched transcript copies: 18 literal records became 13 unique calls; the matching shared names account for 8 calls.
- Positive examples: `riff-partner` at `~/.claude/projects/-Users-joshka-repos-skills/5aa37f18-8956-4923-89c5-69b761ed72a9.jsonl:16`; `herdr` at the same file `:60`; `local-http-browser-use` at `~/.claude/projects/-Users-joshka-repos-personal-praze/4a97e4c3-6c8d-4ee3-8999-b22a8185f956.jsonl:602`.

### Codex

- Scanned `~/.codex/sessions/**/*.jsonl`: 2,582 files, 5,463,880 lines, file dates 2026-02-04 through 2026-07-09. There were no native `Skill` calls, `input.skill` objects, or attribution fields.
- Parsed all 9,945 structured `spawn_agent` call arguments. Counted only successful calls whose `items[]` contained `{ "type": "skill", "name": ..., "path": .../SKILL.md }`. Two successful calls attached each of four matching shared names, hence 2 each. Evidence: `~/.codex/sessions/2026/05/22/rollout-2026-05-22T11-44-40-019e4edb-acc0-78e2-88c3-ae7b6332d595.jsonl:123946` and `:123950` (successful outputs `:123948` and `:123952`).
- These structured attachments point at the `providers/agents` overlay despite appearing in a Codex rollout, so they are Codex-session evidence at name level, not proof of a Codex-overlay load.

### Factory

- Scanned `~/.factory/sessions/**/*.jsonl`: 1,375 files, message dates 2026-03-31 through 2026-07-03. Counted `message.content[]` `Skill` tool uses with a string `input.skill`, deduplicated by stable tool-use ID.
- There were 1,158 literal direct-Skill records and 1,146 unique IDs; the 12 replayed records affect only non-shared names. The four matching shared names are unaffected: `uniwind` 31, `maestri` 6, `caveman` 3, and `migrate-nativewind-to-uniwind` 2.
- Positive examples: `maestri` at `~/.factory/sessions/-Users-joshka/79f82c32-1583-4b6d-ae57-abd59eaaf167.jsonl:35`; `caveman` at `~/.factory/sessions/-Users-joshka-repos-personal-foxctl/f3f5b9c7-fef5-4739-ba6e-8c47002a2efd.jsonl:39`; `uniwind` at `~/.factory/sessions/-Users-joshka-repos-personal-heartwood/1c81d9f4-e0d3-499e-b367-cc12f9ac8b56.jsonl:13`; and `migrate-nativewind-to-uniwind` at `~/.factory/sessions/-Users-joshka-repos-personal-heartwood/d8234cf0-1b0e-421f-aa12-02cbff82f7b1.jsonl:42`.

### Gemini and Droid

- Gemini: inspected 44 readable temporary chat sessions plus 2 primary Antigravity `transcript.jsonl` logs (and alternate full transcripts only for duplicate detection), dated 2026-04-01 through 2026-07-02. No direct `Skill` / `input.skill` / `<command-name>` evidence matched any shared name. SQLite and protobuf conversation stores were not parsed.
- Droid: `~/.droid` existed but contained zero files. This is no coverage, not a zero-use result.

## Command-tag and unmatched evidence

- Claude had 104 literal `<command-name>…</command-name>` tags. Twenty were external command-form skill loads (`codex-cli-runtime` 10; `gpt-5-4-prompting` 10); the other 84 were ordinary slash commands. None exactly matches a current shared name, so none is counted above.
- Claude direct names excluded from the table: `deep-research` (3), `artifact-design` (1), and qualified `product-platform:uniwind` (1). The qualified form was deliberately not silently assigned to either `product-platform` or `uniwind`.
- Codex structured attachments excluded from the table: `hard-cut` (2) and `small-composable-code` (2), neither of which is a current `shared/` declared name.
- Factory had 1,116 unique-ID invocations across 45 raw names that do not exactly match a current shared name. They are not attribution evidence for a shared body.

## Caveats

- A zero is **no explicit structured evidence found**, not “never used.” Skills may fire implicitly, be read manually, be injected by provider-native mechanisms, or be represented only in unparsed/binary stores.
- Matching is by current `name:` only, not by body hash, provider overlay version, historical installation, or source path. Same-name provider-native skills and imported mirrors can therefore make a positive record weaker than source-provenance evidence.
- Claude coverage intentionally follows the requested `~/.claude/projects` root and excludes separate profile roots such as `~/.claude-work` and `~/.claude-personal`.
- Last-used values are UTC-derived dates truncated to a day; active local transcript files can change after this sweep.

