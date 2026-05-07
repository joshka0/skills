# Skills Inventory

Generated: 2026-04-23T08:08:30.886Z

## Summary

- Source skill entries scanned: 360
- Unique skill contents copied: 126
- Loose file entries scanned: 13
- Unique loose files copied: 13

## Source Kind Counts

- agents-local: 51
- claude-local: 16
- codex-local: 52
- foxctl-external: 121
- foxctl-pack: 120

## External Mirrors

- `mirrors/foxctl/pack` and `mirrors/foxctl/external` are foxctl-owned skill
  sources.
- `mirrors/mattpocock/skills` mirrors
  `https://github.com/mattpocock/skills`.
- Active Matt Pocock imports are symlinked through `shared/general` and provider
  overlays. Deprecated, in-progress, and personal upstream skills stay mirrored
  but inactive unless promoted after review.
- `mirrors/repoprompt/agents` preserves inactive RepoPrompt `rp-*` skills.

## Progressive Routers

The active provider overlays use small router skills instead of exposing every
stack-specific checklist by default:

- `product-platform`
- `design-family`
- `release-bundles`
- `infra-bundles`

These router skills point to detailed skills in `shared/*` and `mirrors/*` only
when the current task needs them.

## Provider Counts

- agents: 66
- claude: 76
- codex: 93
- factory: 48
- gemini: 45
- gemini-antigravity: 32

## Name Conflicts (Same Name, Different Content)

- codex-swarm: 2 versions across agents, claude (88d972470291, 5039f6844763)
- delegate-codex: 2 versions across agents, claude (962b7cd8db3f, 0b4c5533f87b)
- plan-build: 2 versions across agents, claude (34973576afc9, db1e49ed4bcf)

## Exact Duplicate Names

- agent-ci: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-all: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-code: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-context: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-core: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-dev: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-epic-grader: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-epic-pipeline: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-factory-epic-creation: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-integrations: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-mobile: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-orchestrate: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-room: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-room-agent: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-room-agile: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-room-operator: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-room-view: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- foxctl-tmux: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- hard-cut: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- tmux-bridge: 6 sources across agents, claude, codex, factory, gemini, gemini-antigravity
- android-expo-eas-build-binary-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-accessibility-age-rating-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-ai-ugc-safety-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-console-eas-automation-bridge: 5 sources across agents, claude, codex, factory, gemini
- android-play-data-safety-permissions-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-iap-subscriptions-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-production-checklist: 5 sources across agents, claude, codex, factory, gemini
- android-play-quality-prelaunch-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-sensitive-category-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-store-listing-metadata-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-submission-packet-readiness: 5 sources across agents, claude, codex, factory, gemini
- android-play-testing-track-readiness: 5 sources across agents, claude, codex, factory, gemini
- apple-accessibility-age-rating-readiness: 5 sources across agents, claude, codex, factory, gemini
- apple-ai-privacy-safety-readiness: 5 sources across agents, claude, codex, factory, gemini
- apple-asc-cli-automation-bridge: 5 sources across agents, claude, codex, factory, gemini
- apple-build-binary-readiness: 5 sources across agents, claude, codex, factory, gemini
- apple-iap-subscription-readiness: 5 sources across agents, claude, codex, factory, gemini
- apple-metadata-storefront-readiness: 5 sources across agents, claude, codex, factory, gemini
- apple-production-checklist: 5 sources across agents, claude, codex, factory, gemini
- apple-submission-packet-readiness: 5 sources across agents, claude, codex, factory, gemini
- apple-testflight-release-readiness: 5 sources across agents, claude, codex, factory, gemini
- opentui-tui-builder: 5 sources across agents, claude, codex, factory, gemini
- uniwind-excellence-rn: 5 sources across agents, claude, codex, factory, gemini
- uniwind-rn-android: 5 sources across agents, claude, codex, factory, gemini
- uniwind-rn-ios: 5 sources across agents, claude, codex, factory, gemini
- building-native-ui: 3 sources across agents, claude, gemini-antigravity
- emil-design-eng: 3 sources across agents, claude, gemini-antigravity
- expo-api-routes: 3 sources across agents, claude, gemini-antigravity
- expo-cicd-workflows: 3 sources across agents, claude, gemini-antigravity
- expo-deployment: 3 sources across agents, claude, gemini-antigravity
- expo-dev-client: 3 sources across agents, claude, gemini-antigravity
- expo-tailwind-setup: 3 sources across agents, claude, gemini-antigravity
- migrate-nativewind-to-uniwind: 3 sources across agents, claude, factory
- native-data-fetching: 3 sources across agents, claude, gemini-antigravity
- opentui: 3 sources across agents, claude, factory
- uniwind: 3 sources across agents, claude, factory
- upgrading-expo: 3 sources across agents, claude, gemini-antigravity
- use-dom: 3 sources across agents, claude, gemini-antigravity
- userinterface-wiki: 3 sources across agents, claude, gemini-antigravity
- vercel-react-native-skills: 3 sources across agents, claude, gemini-antigravity
- gtr: 2 sources across claude, codex
- maestri: 2 sources across agents, claude
- maestri-portal: 2 sources across agents, claude
- regression-tests: 2 sources across agents, claude

## Canonicalization Notes

- `skills/` is deduped by full directory content hash and contains dereferenced copies, not symlinks.
- `inventory.json` maps each canonical copy back to every active provider source.
- `loose/` preserves non-SKILL.md files found in active skill roots.
