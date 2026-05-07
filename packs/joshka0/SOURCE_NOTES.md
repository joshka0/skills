# joshka0 Skills Pack Source Notes

Date: 2026-05-07

This note separates local skills, imported mirrors, active defaults, and
inactive preserved sources.

## Source Categories

| Category | Path | Status | Notes |
| --- | --- | --- | --- |
| Local shared skills | `shared/general`, `shared/codex` | active or routed | Canonical home for local joshka0 skills and progressive router skills. |
| Claude-specific local skills | `shared/claude` | preserved, not active default | Kept for reference and selective promotion. |
| Foxctl pack import | `mirrors/foxctl/pack` | partially active | Imported from the local foxctl skills pack. Focused foxctl skills are active; broad aliases are inactive. |
| Foxctl external import | `mirrors/foxctl/external` | routed | Apple, Android, Uniwind, and OpenTUI skills. Exposed through `release-bundles` and `product-platform`. |
| Matt Pocock import | `mirrors/mattpocock/skills` | partially active | Mirrored from `https://github.com/mattpocock/skills` at commit `733d312884b3878a9a9cff693c5886943753a741`. |
| RepoPrompt import | `mirrors/repoprompt/agents` | archived inactive | Preserves `rp-*` workflows after removing them from active defaults. |
| Provider-native skills | `providers/*` | provider-specific | Includes Agent Vault, Maestri, Codex `.system`, and Gemini Antigravity HeroUI entries where applicable. |

## Active Matt Pocock Imports

These upstream skills are linked through `shared/general` and active in the
supported provider overlays:

The mirror is committed as ordinary files in this pack. Its nested upstream
`.git` metadata is intentionally not part of the pack repository.

```text
caveman
diagnose
git-guardrails-claude-code
grill-me
grill-with-docs
improve-codebase-architecture
migrate-to-shoehorn
prototype
scaffold-exercises
setup-matt-pocock-skills
setup-pre-commit
tdd
to-issues
to-prd
triage
write-a-skill
zoom-out
```

Inactive Matt Pocock mirror sections:

```text
skills/deprecated/*
skills/in-progress/*
skills/personal/*
```

## Foxctl Pack Imports

Active focused foxctl skills:

```text
agent-ci
foxctl-code
foxctl-context
foxctl-core
foxctl-dev
foxctl-epic-grader
foxctl-epic-pipeline
foxctl-factory-epic-creation
foxctl-integrations
foxctl-mobile
foxctl-orchestrate
foxctl-room
foxctl-room-agent
foxctl-room-agile
foxctl-room-operator
foxctl-room-view
hard-cut
semantic-commenting
```

Inactive foxctl broad or compatibility entries:

```text
foxctl-all
foxctl-tmux
tmux-bridge
```

Preserved but not currently active:

```text
pi-maestri-live
```

## Foxctl External Imports

Routed through `release-bundles`:

```text
apple-accessibility-age-rating-readiness
apple-ai-privacy-safety-readiness
apple-asc-cli-automation-bridge
apple-build-binary-readiness
apple-iap-subscription-readiness
apple-metadata-storefront-readiness
apple-production-checklist
apple-submission-packet-readiness
apple-testflight-release-readiness
android-expo-eas-build-binary-readiness
android-play-accessibility-age-rating-readiness
android-play-ai-ugc-safety-readiness
android-play-console-eas-automation-bridge
android-play-data-safety-permissions-readiness
android-play-iap-subscriptions-readiness
android-play-production-checklist
android-play-quality-prelaunch-readiness
android-play-sensitive-category-readiness
android-play-store-listing-metadata-readiness
android-play-submission-packet-readiness
android-play-testing-track-readiness
```

Routed through `product-platform`:

```text
opentui-tui-builder
uniwind-excellence-rn
uniwind-rn-android
uniwind-rn-ios
```

## RepoPrompt Imports

Archived inactive RepoPrompt skills:

```text
rp-build
rp-build-cli
rp-investigate
rp-investigate-cli
rp-optimize
rp-optimize-cli
rp-oracle-export
rp-oracle-export-cli
rp-orchestrate
rp-orchestrate-cli
rp-refactor
rp-refactor-cli
rp-reminder
rp-reminder-cli
rp-review
rp-review-cli
```

Default replacement:

```text
repoprompt-pro-review
```

## Local joshka0 Skills

Core local skills kept active by default:

```text
agent-swarm
codex-goal
gtr
local-dev
local-secrets
maestri
maestri-portal
quality-gate
regression-tests
repoprompt-pro-review
ruthless-test-strategy
small-composable-code
smolvm-local-dev
```

Progressive disclosure routers:

```text
product-platform
design-family
release-bundles
infra-bundles
```

Detailed local skills reachable through routers include the product/platform,
design, Kubernetes, and Terraform skill families under `shared/general` and
`shared/codex`.

## Provider-Native Notes

These entries are intentionally provider-native rather than normalized into
`shared/`:

```text
providers/agents/agent-vault-cli
providers/agents/agent-vault-http
providers/agents/maestri
providers/agents/maestri-portal
providers/codex/.system
providers/gemini-antigravity/heroui-react-pro
providers/gemini-antigravity/heroui-pro-design-taste
```

## Inactive But Preserved

These are preserved in the repo but removed from active defaults:

```text
shared/claude/*
shared/general/codex-swarm
shared/general/delegate-codex
shared/general/plan-build
shared/general/userinterface-wiki
shared/general/vercel-react-native-skills
shared/variants/*
mirrors/repoprompt/agents/*
mirrors/mattpocock/skills/skills/deprecated/*
mirrors/mattpocock/skills/skills/in-progress/*
mirrors/mattpocock/skills/skills/personal/*
```

The reason is context pressure: active overlays should expose compact router
skills and high-signal engineering workflows, not every niche checklist by
default.
