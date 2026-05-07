# Skills Final Set Audit

Date: 2026-05-07

Purpose: editable working list for deciding the final local skills set. The
current decision is applied to active provider overlays: `keep` stays visible,
`bundle` is exposed through a progressive router, and `drop` is removed from
default provider surfaces while source bodies are preserved where useful.

## Current Import Decision

Matt Pocock's skills are now part of the wanted set.

- Mirror: `mirrors/mattpocock/skills`
- Commit: `733d312884b3878a9a9cff693c5886943753a741`
- Active import: non-deprecated, non-in-progress, non-personal skills.
- Not active: `skills/deprecated`, `skills/in-progress`, `skills/personal`.

## Progressive Disclosure Routers

| Status | Skill | Description | Notes |
| --- | --- | --- | --- |
| keep | `product-platform` | Routes Expo/RN, Uniwind, browser extension, OpenTUI, native data, and product platform work to one detailed skill at a time. | Replaces always-on product/platform micro-skill exposure. |
| keep | `design-family` | Routes UI/UX build, critique, audit, hardening, polish, and focused design moves. | Replaces always-on design micro-skill exposure. |
| keep | `release-bundles` | Routes Apple and Android release readiness to the matching checklist only. | Replaces always-on release checklist exposure. |
| keep | `infra-bundles` | Routes Kubernetes and Terraform work to the matching infra guide only. | Replaces always-on infra checklist exposure. |

## Proposed Default Core

| Status | Skill | Description | Notes |
| --- | --- | --- | --- |
| keep | `small-composable-code` | Keep code small, coherent, testable, composable, and easy to change. | Our main anti-sprawl coding standard. |
| keep | `ruthless-test-strategy` | Write, review, improve, and prune behavior-focused tests. | Broader than TDD; keep as test review doctrine. |
| keep | `diagnose` | Matt Pocock disciplined debugging loop: reproduce, minimize, hypothesize, instrument, fix, regression-test. | New import; complements our debugging habits. |
| keep | `tdd` | Matt Pocock red-green-refactor workflow for feature and bug work. | New import; use when the user explicitly wants test-first. |
| keep | `regression-tests` | Create deterministic regression tests for fixed bugs or difficult issues. | Keep if we want a small focused bug-test trigger beside `tdd`. |
| keep | `improve-codebase-architecture` | Matt Pocock architecture/deep-module review informed by domain docs and ADRs. | New import; overlaps with `small-composable-code` but useful for review mode. |
| keep | `codex-goal` | Create and manage file-first Codex `/goal` workflows. | Keep; user explicitly requested file-first goals. |
| keep | `agent-swarm` | Coordinate scoped subagents and integrate outputs without sprawl. | Keep; user explicitly requested swarm process. |
| keep | `local-dev` | Local dev environments with Portless, worktrees, private repos, and GitLab CI/CD defaults. | Keep. |
| keep | `smolvm-local-dev` | Isolated local dev using smolvm microVMs. | Keep; referenced by `local-dev`. |
| keep | `local-secrets` | Machine-local secret handling with Infisical, Agent Vault, and encrypted vault files. | Keep. |
| keep | `gtr` | Worktree management for isolated parallel agent development. | Keep. |
| keep | `maestri` | Communicate with agents and shared notes in Maestri. | Keep. |
| keep | `maestri-portal` | Browser portal automation through Maestri. | Keep if portal workflows remain active. |
| keep | `repoprompt-pro-review` | Prepare RepoPrompt exports for external review without context builder or Oracle/send. | Keep. |
| bundle | `chrome-extension-builder` | Product-grade WXT/React/HeroUI/Tailwind/Effect extension engineering. | Routed through `product-platform`. |
| keep | `quality-gate` | Language-agnostic quality gate before merge or handoff. | Keep if it remains distinct from review process. |

## Matt Pocock Skills Imported

| Status | Skill | Description | Notes |
| --- | --- | --- | --- |
| keep | `diagnose` | Disciplined diagnosis loop for hard bugs and performance regressions. | Active in all supported provider overlays. |
| keep | `grill-with-docs` | Stress-test a plan against project language and docs, updating `CONTEXT.md` and ADRs. | Use when planning needs domain-language alignment. |
| keep | `improve-codebase-architecture` | Find deepening opportunities and reduce architectural mud. | Good review/audit complement to our small-code skill. |
| keep | `prototype` | Build throwaway logic or UI prototypes to answer design questions. | Keep; avoid productionizing prototype code. |
| keep | `setup-matt-pocock-skills` | Configure per-repo issue tracker, triage labels, and domain doc layout. | Keep because other Matt skills assume it. |
| keep | `tdd` | Red-green-refactor development through public behavior tests. | Keep. |
| keep | `to-issues` | Break a plan into vertical-slice issues. | Keep; useful with GitLab/GitHub/local issue trackers after setup. |
| keep | `to-prd` | Turn current conversation context into a PRD on the issue tracker. | Maybe overlaps with our planning docs, but useful. |
| keep | `triage` | Triage issues through a small state machine of roles. | Keep if we adopt its labels; otherwise revisit. |
| keep | `zoom-out` | Ask for a higher-level module/caller map. | Keep; low-cost orientation trigger. |
| keep | `caveman` | Ultra-compressed communication mode. | Keep but invoke intentionally; it persists once triggered. |
| keep | `grill-me` | Interview the user deeply about a plan or design. | Keep; no docs side effects. |
| keep | `write-a-skill` | Create skills with structure, references, and scripts. | Maybe merge mentally with Codex `skill-creator`, but keep upstream import for now. |
| keep | `git-guardrails-claude-code` | Install Claude hooks to block dangerous git commands. | Claude-specific; provider-limit later if desired. |
| keep | `migrate-to-shoehorn` | Migrate TS test files from `as` assertions to `@total-typescript/shoehorn`. | Niche; useful for TS-heavy tests. |
| keep | `scaffold-exercises` | Create exercise structures with problems, solutions, and explainers. | Niche/course-specific; drop later if unused. |
| keep | `setup-pre-commit` | Set up Husky, lint-staged, Prettier, typecheck, and tests. | Keep if we want repo bootstrap helpers. |

## Product And Platform Skills

| Status | Skill/Group | Description | Notes |
| --- | --- | --- | --- |
| bundle | `building-native-ui` | Expo Router native UI guidance. | Routed through `product-platform`. |
| bundle | `expo-*` group | Expo API routes, CI/CD workflows, deployment, dev clients, Tailwind setup. | Routed through `product-platform`. |
| bundle | `uniwind` and `uniwind-*` | React Native/Expo Uniwind and Uniwind Pro UI guidance. | Routed through `product-platform`. |
| bundle | `native-data-fetching` | Network request and data fetching guidance for native apps. | Routed through `product-platform`. |
| bundle | `use-dom` | Expo DOM component guidance. | Routed through `product-platform`. |
| drop | `vercel-react-native-skills` | General React Native/Expo practices. | Dropped from active default; overlaps Expo/Uniwind/Product Platform. |
| bundle | `opentui` and `opentui-tui-builder` | Terminal UI construction/review with OpenTUI. | Routed through `product-platform`. |
| bundle | `emil-design-eng` | Emil Kowalski UI polish/design taste. | Routed through `product-platform` or `design-family`. |
| drop | `userinterface-wiki` | General UI/UX best practices. | Dropped from active default; too broad for default context. |

## Design Skill Family

| Status | Skill | Description | Notes |
| --- | --- | --- | --- |
| bundle | `frontend-design` | Build distinctive production-grade frontends. | Routed through `design-family`. |
| bundle | `audit` | Audit interface quality across accessibility, performance, theming, and responsiveness. | Routed through `design-family`. |
| bundle | `critique` | Critique UX and visual design with concrete feedback. | Routed through `design-family`. |
| bundle | `polish` | Final UI polish pass. | Routed through `design-family`. |
| bundle | `harden` | Real-use UI hardening for error states, overflow, i18n, and edge cases. | Routed through `design-family`. |
| drop | `adapt`, `animate`, `bolder`, `clarify`, `colorize`, `delight`, `distill`, `extract`, `normalize`, `onboard`, `optimize`, `quieter`, `teach-impeccable` | Focused micro-skills for specific UI moves. | Dropped from active default; still reachable from `design-family` references if explicitly needed. |

## Foxctl Skills

| Status | Skill/Group | Description | Notes |
| --- | --- | --- | --- |
| keep | `foxctl-core`, `foxctl-dev`, `foxctl-code`, `foxctl-context` | Core foxctl workflows for safe file work, tests, code search, and context. | Keep. |
| keep | `foxctl-integrations`, `foxctl-mobile` | MCP/provider glue and mobile automation. | Keep. |
| keep | `foxctl-room`, `foxctl-orchestrate`, `foxctl-room-agent`, `foxctl-room-operator`, `foxctl-room-agile`, `foxctl-room-view` | Durable multi-agent room operations. | Keep while room workflows remain active. |
| drop | `foxctl-all` | Broad umbrella entrypoint for foxctl. | Dropped from active default; use focused foxctl skills. |
| drop | `foxctl-tmux`, `tmux-bridge` | Compatibility aliases for room viewer guidance. | Dropped from active default; use `foxctl-room-view`. |
| keep | `foxctl-epic-grader`, `foxctl-epic-pipeline`, `foxctl-factory-epic-creation` | Epic planning and Factory mission normalization. | Keep if room-agile planning stays active. |
| keep | `semantic-commenting` | Semantic code comments and retrieval anchors. | Keep. |
| keep | `hard-cut` | Replace legacy contracts with one canonical shape. | Keep. |

## Release And Infra Bundles

| Status | Skill/Group | Description | Notes |
| --- | --- | --- | --- |
| bundle | Apple release readiness pack | App Store build, metadata, privacy, IAP, TestFlight, and submission readiness. | Keep as release bundle, not default. |
| bundle | Android release readiness pack | Play build, quality, permissions, subscriptions, listings, testing, and submission readiness. | Keep as release bundle, not default. |
| bundle | Kubernetes infra pack | Audit/debug/harden/migrate/network/observe/optimize/policy/recover/ship K8s work. | Keep as infra bundle, not default. |
| bundle | Terraform infra pack | Audit/debug/drift/harden/migrate/plan/policy/recover/ship Terraform work. | Keep as infra bundle, not default. |
| keep | `kubernetes-platform`, `terraform-platform`, `teach-cluster`, `teach-infra` | Foundational platform context and one-time durable setup skills. | Keep in infra bundle. |

## Provider-Specific And Optional Skills

| Status | Skill/Group | Description | Notes |
| --- | --- | --- | --- |
| keep | `agent-vault-cli`, `agent-vault-http` | Agent Vault credential broker skills. | Providers/agents-specific; keep where supported. |
| drop | RepoPrompt `rp-*` skills | RepoPrompt build/investigate/refactor/review/oracle workflows. | Moved out of active Agents overlay to `mirrors/repoprompt/agents`; use `repoprompt-pro-review` by default. |
| drop | Claude-only skills: `forge`, `gitbutler`, `peon-*`, `ralph-*`, `review-rp`, `plan-build-rp`, `prompt-repeat` | Claude-specific helpers and workflows. | Dropped from active default; sources remain under `shared/claude`. |
| drop | `codex-swarm`, `delegate-codex`, `plan-build` | Zellij/tmux Codex delegation and planning variants. | Dropped from active default; use `agent-swarm` and `codex-goal`. |

## Drop Or Keep Inactive

| Status | Skill/Group | Description | Notes |
| --- | --- | --- | --- |
| drop | Matt Pocock `skills/deprecated/*` | Deprecated upstream skills. | Mirrored but inactive. |
| drop | Matt Pocock `skills/in-progress/*` | Upstream unfinished skills. | Mirrored but inactive. |
| drop | Matt Pocock `skills/personal/*` | Upstream personal article/Obsidian workflows. | Mirrored but inactive. |
| drop | OpenCode `agentctl-*` remnants | Retired agentctl-era entries. | Only mentioned in docs as pending OpenCode cleanup; not in active managed providers. |

## Resolved Decisions

1. Matt Pocock non-deprecated skills stay in the wanted set and are active by default.
2. Prior tentative rows are now `drop` from active defaults.
3. Product/platform, design, release, and infra families are now progressive router skills.
4. `foxctl-tmux` and `tmux-bridge` are removed from active defaults in favor of `foxctl-room-view`.
5. RepoPrompt `rp-*` skills are archived under `mirrors/repoprompt/agents`; use `repoprompt-pro-review` by default.
6. `regression-tests` is promoted into active defaults alongside `tdd` and `ruthless-test-strategy`.
7. Router skill descriptions enumerate the child skill names they cover, so
   agents can discover detailed skills from metadata without loading every
   child skill body.

## Verification Notes

- No broken symlinks found under `providers`, `shared`, or `mirrors`.
- Matt Pocock imported skills are present in `codex`, `agents`, `factory`,
  `claude`, `gemini`, `gemini-antigravity`, and `droid`.
- Progressive router skills are present in the active supported provider overlays:
  `product-platform`, `design-family`, `release-bundles`, `infra-bundles`.
- Router skill frontmatter parses as YAML after adding compact covered-skill
  lists to each description.
- `providers-current/*` was refreshed from the active `providers/*` overlays
  after pruning.
- Active `agentctl` matches found only in documentation/pending OpenCode notes,
  not live managed provider skills.
