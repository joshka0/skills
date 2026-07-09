# Independent canonical skill triage

Scored against the question “does this beat a strong agent’s unprompted default behavior?” with extra weight for private operational knowledge, trigger precision, progressive disclosure, and resistance to documentation drift.

Counts: **85 total — KEEP 11, TRIM 16, MERGE 55, CUT 3**.

## Per-skill verdicts

- `shared/claude/peon-ping/SKILL.md` — KEEP — Its exact Claude hook path, script commands, and config keys are private operational knowledge a model cannot infer.
- `shared/codex/frontend-design/SKILL.md` — TRIM — Its anti-slop taste and demand for an intentional aesthetic beat defaults, but universal bans and the large design manual should shrink to a short set of durable principles.
- `shared/codex/k8s-op/SKILL.md` — MERGE-into-infra-bundles — Its mode table repeats kubernetes-platform and generic safety practice, so the operations should become modes of the single infrastructure router.
- `shared/codex/kubernetes-platform/SKILL.md` — MERGE-into-infra-bundles — The body is standard Kubernetes posture plus a public-doc index, so only pack-specific risk rules should survive inside infra-bundles.
- `shared/codex/mobile-rn/SKILL.md` — MERGE-into-product-platform — It competes with building-native-ui, react-native-platform, and uniwind for the same request, so its native-feel deltas belong in product-platform’s mobile section.
- `shared/codex/opentui/SKILL.md` — MERGE-into-product-platform — Its terminal-specific lifecycle and focus rules are useful, but they do not justify another visible trigger beside the product router.
- `shared/codex/quality-gate/SKILL.md` — MERGE-into-code-quality — The deterministic decision schema is worth preserving, but it fits a code-quality gate mode and the CodeRabbit and subagent mechanics should not own a separate skill.
- `shared/codex/teach-context/SKILL.md` — MERGE-into-local-dev — One-time durable context capture is project setup, so it belongs as a context mode in local-dev rather than a design, Kubernetes, or Terraform trigger.
- `shared/codex/terraform-op/SKILL.md` — MERGE-into-infra-bundles — Its workflow and safety rules duplicate terraform-platform, while its operation names fit naturally as modes on the infrastructure router.
- `shared/codex/terraform-platform/SKILL.md` — MERGE-into-infra-bundles — The generic plan, state, and rollback posture is already strong-agent behavior, so retain only house risk deltas in infra-bundles.
- `shared/codex/ui-audit/SKILL.md` — MERGE-into-design-family — Audit is a design-family review mode, and this separate trigger repeats frontend-design while prescribing a noisy report template.
- `shared/codex/ui-critique/SKILL.md` — MERGE-into-design-family — Critique is the qualitative half of the same design review surface and should share one routing decision with audit.
- `shared/codex/ui-improve/SKILL.md` — MERGE-into-design-family — Its eight micro-modes are useful reference sections but create unnecessary trigger competition as a standalone skill.
- `shared/codex/ui-tune/SKILL.md` — MERGE-into-design-family — Bolder, quieter, colorize, distill, delight, and animate are parameters of one design improvement workflow rather than separate skill territory.
- `shared/general/agent-orchestration/SKILL.md` — TRIM — The private Herdr and worktree routing plus supervision policy earn a slot, but duplicated goal guidance, stale model names, and mux manuals should collapse into short transport references.
- `shared/general/building-native-ui/SKILL.md` — MERGE-into-product-platform — This is a 3,000-plus-line mirror of fast-moving Expo guidance whose useful house choices should be a small docs-verified mobile reference under product-platform.
- `shared/general/caveman/SKILL.md` — TRIM — The named persistent voice mode is useful only when explicitly invoked, and its rules can be reduced to a few lines.
- `shared/general/chrome-extension-builder/SKILL.md` — TRIM — The WXT, Effect, and InstantDB stack is an opinionated house choice that beats defaults, but versioned API detail and exhaustive examples should defer to current docs.
- `shared/general/code-council/SKILL.md` — MERGE-into-goal-protocol — It is a compatibility entrypoint for the same dossiers, gates, IDs, and phases already owned by goal-protocol, while its broad trigger collides with ordinary implementation work.
- `shared/general/code-quality/SKILL.md` — TRIM — It is the right consolidation host, but its current description claims nearly every coding task and much of the body restates competent-agent behavior.
- `shared/general/codex-goal/SKILL.md` — MERGE-into-goal-protocol — Codex goal-file creation and monitoring are already a goal-protocol mode and reference, making this compatibility skill duplicate both trigger and content.
- `shared/general/collaboration-protocol/SKILL.md` — MERGE-into-agent-orchestration — Ledgered adversarial collaboration is an orchestration mode, not a second top-level trigger alongside agent-orchestration.
- `shared/general/delta-brief/SKILL.md` — MERGE-into-agent-orchestration — The durable-docs versus in-flight-delta distinction is valuable, but it is a handoff mode within agent-orchestration rather than an independent skill.
- `shared/general/design-family/SKILL.md` — TRIM — One design router is useful, but it should expose only build, review, and improve routing and stop enumerating every micro-mode in standing metadata.
- `shared/general/diagnose/SKILL.md` — MERGE-into-code-quality — The feedback-loop-first discipline is worth keeping, but as code-quality’s diagnose mode it gains trigger precision without duplicating a general engineering workflow.
- `shared/general/effect-framework-architecture/SKILL.md` — MERGE-into-effect-framework — The execution-boundary opinions are useful, but the general layering recipe and volatile v4 API names should become one docs-checked architecture reference under effect-framework.
- `shared/general/effect-framework-concurrency-streams/SKILL.md` — MERGE-into-effect-framework — Its ownership and backpressure decision table is useful, but rapidly changing Effect concurrency APIs belong behind the one Effect router.
- `shared/general/effect-framework-errors/SKILL.md` — MERGE-into-effect-framework — Typed-error boundary rules are a useful Effect delta, but they are one routed topic rather than a separately advertised capability.
- `shared/general/effect-framework-migration/SKILL.md` — MERGE-into-effect-framework — Migration advice is the most version-sensitive content in the family and should be a live-doc-backed mode of effect-framework.
- `shared/general/effect-framework-runtime-resources/SKILL.md` — MERGE-into-effect-framework — Resource ownership and run-boundary rules should survive as one lifecycle reference without another standing trigger.
- `shared/general/effect-framework-services-layers/SKILL.md` — MERGE-into-effect-framework — Service and layer composition is core Effect guidance that the router can select from one concise reference.
- `shared/general/effect-framework-testing/SKILL.md` — MERGE-into-effect-framework — Test layers and deterministic time are useful deltas, but they fit a testing section under the single Effect entrypoint.
- `shared/general/effect-framework/SKILL.md` — TRIM — Retain one Effect entrypoint, but trim it to version detection, a few house invariants, and routing to current official docs rather than repeating every child.
- `shared/general/elixir-lang-concurrency-pipelines/SKILL.md` — MERGE-into-elixir-lang — Task, Broadway, and PubSub selection is ordinary framework guidance and should be a concise concurrency section behind elixir-lang.
- `shared/general/elixir-lang-fault-observability/SKILL.md` — MERGE-into-elixir-lang — The let-it-crash and telemetry rules are useful deltas, but they do not warrant a separate visible trigger.
- `shared/general/elixir-lang-otp-design/SKILL.md` — MERGE-into-elixir-lang — Its plain-function-versus-process decision is the durable delta, so fold it into the Elixir router and drop the generic architecture tutorial.
- `shared/general/elixir-lang-performance-interop/SKILL.md` — MERGE-into-elixir-lang — The measurement, ETS, and NIF cautions fit one performance reference under the router and otherwise duplicate public BEAM guidance.
- `shared/general/elixir-lang-supervision-processes/SKILL.md` — MERGE-into-elixir-lang — Supervision choices are core Elixir knowledge best loaded as a routed section rather than advertised as another skill.
- `shared/general/elixir-lang-testing/SKILL.md` — MERGE-into-elixir-lang — The ExUnit and Mox advice mostly matches strong-agent defaults and should be a compact testing section under elixir-lang.
- `shared/general/elixir-lang/SKILL.md` — TRIM — Keep one Elixir entrypoint, but reduce it to the non-obvious process-ownership, mailbox, and supervision opinions while current docs supply APIs.
- `shared/general/expo-platform/SKILL.md` — MERGE-into-product-platform — Expo upgrades, dev clients, routes, workflows, and deployment are modes of the existing product router and must be verified against current Expo docs.
- `shared/general/git-guardrails-claude-code/SKILL.md` — KEEP — The bundled blocking script, Claude hook shape, merge-safe settings edit, and verification probe provide a deterministic capability beyond model defaults.
- `shared/general/go-lang-concurrency/SKILL.md` — MERGE-into-go-lang — Goroutine ownership and cancellation cautions are useful, but they should be one routed reference instead of another Go trigger.
- `shared/general/go-lang-design/SKILL.md` — MERGE-into-go-lang — Consumer-side interfaces and concrete-return preferences are the opinionated delta and fit directly in the Go router’s design section.
- `shared/general/go-lang-errors/SKILL.md` — MERGE-into-go-lang — Error wrapping and inspection are standard Go knowledge that belongs in a concise reference selected by go-lang.
- `shared/general/go-lang-packages-api/SKILL.md` — MERGE-into-go-lang — Package and public-API conventions are one Go surface, not a capability that benefits from separate standing metadata.
- `shared/general/go-lang-performance/SKILL.md` — MERGE-into-go-lang — Measurement-first optimization is useful but generic, so keep only Go-specific tool and ownership deltas under the router.
- `shared/general/go-lang-testing/SKILL.md` — MERGE-into-go-lang — Table tests, fakes, race checks, and fuzzing are standard Go guidance best loaded as a routed section.
- `shared/general/go-lang/SKILL.md` — TRIM — Keep one Go entrypoint, but reduce it to the few house opinions that beat idiomatic defaults and use the installed toolchain plus current docs for details.
- `shared/general/goal-council/SKILL.md` — MERGE-into-goal-protocol — The council persona, goal lifecycle, and red-team gates are already modes and references in goal-protocol, so this compatibility skill only multiplies triggers.
- `shared/general/goal-orchestrator/SKILL.md` — MERGE-into-goal-protocol — Ticket decomposition and waves are a goal-protocol phase, and a second durable-artifact owner invites divergence.
- `shared/general/goal-protocol/SKILL.md` — TRIM — The durable ledger, traceability, resume semantics, and escalation rules are genuinely non-default, but the active file should be a shorter lifecycle router over its existing templates and references.
- `shared/general/grill-me/SKILL.md` — KEEP — Ten lines encode an explicit one-question-at-a-time interview contract with repo exploration and recommendations, which is precise and cheap.
- `shared/general/grill-with-docs/SKILL.md` — MERGE-into-grill-me — Domain glossary and ADR updates are a docs-aware mode of grill-me rather than a separate interviewing trigger.
- `shared/general/gtr/SKILL.md` — TRIM — The user’s central worktree path and safety policy are private value, while the long command catalog and tool-version facts should come from git gtr help.
- `shared/general/herdr/SKILL.md` — KEEP — The workspace model, exact CLI transport semantics, and send-versus-run gotchas are private tool knowledge the model cannot reconstruct.
- `shared/general/improve-codebase-architecture/SKILL.md` — MERGE-into-code-quality — Its deep-module vocabulary and deletion test are useful review modes, but the trigger overlaps code-quality, zero-tech-debt, and thermonuclear review.
- `shared/general/infra-bundles/SKILL.md` — TRIM — Retain one high-stakes infrastructure router, but make it select domain and risk mode while consulting current Kubernetes and infrastructure-as-code docs instead of loading generic checklists.
- `shared/general/local-dev/SKILL.md` — TRIM — The Portless, smolvm, Tailscale, Infisical, and GitLab topology is highest-value private knowledge, but absolute host paths, volatile inventory, and embedded login credentials must move out of the portable skill.
- `shared/general/local-http-browser-use/SKILL.md` — KEEP — The bridge URL and token contract, visible-action loop, selector discipline, and sensitive-action limits encode a private browser surface no model could guess.
- `shared/general/maestri-portal/SKILL.md` — KEEP — Portal discovery, accessibility refs, popup naming, and exact Maestri commands are private integration facts with clear trigger boundaries.
- `shared/general/maestri/SKILL.md` — KEEP — Exact-text transport semantics, shell-versus-agent behavior, note operations, and timeout handling are unique local-tool knowledge.
- `shared/general/migrate-nativewind-to-uniwind/SKILL.md` — MERGE-into-product-platform — The migration checklist has real edge cases, but its 700-plus lines are volatile Uniwind documentation and should be a docs-verified product-platform mode.
- `shared/general/native-data-fetching/SKILL.md` — CUT — The blanket mandatory trigger, beginner fetch examples, and brittle library claims add context tax and can be less correct than repo conventions plus current docs.
- `shared/general/plan-build/SKILL.md` — MERGE-into-planning-workflow — The useful outcome is a reviewed implementation-plan artifact, while hundreds of lines of tmux, model, and keystroke automation belong neither in a skill nor in a second planning trigger.
- `shared/general/planning-workflow/SKILL.md` — KEEP — Its configured issue-tracker dependency, AI disclosure rule, vertical-slice issue flow, and durable out-of-scope memory are pack-specific behavior.
- `shared/general/product-platform/SKILL.md` — TRIM — One product router is warranted, but it should name a few surfaces and load consolidated references instead of advertising a dozen competing child skills.
- `shared/general/prototype/SKILL.md` — KEEP — The question-first split between a state-machine terminal app and switchable UI variants is a concrete non-default prototyping technique with strong throwaway constraints.
- `shared/general/react-native-platform/SKILL.md` — MERGE-into-product-platform — Its public-framework rules overlap building-native-ui and mobile-rn, so preserve only measured-performance and native-boundary deltas in the product router.
- `shared/general/release-bundles/SKILL.md` — TRIM — A single release router is valuable for high-stakes evidence gathering, but its enormous child list and any store rules should be replaced by platform and surface routing plus live verification.
- `shared/general/repoprompt-pro-review/SKILL.md` — KEEP — The no-builder and no-Oracle constraints, selection API workflow, slicing policy, and token-budget handoff are private tool behavior the model needs explicitly.
- `shared/general/riff-partner/SKILL.md` — TRIM — The commit-then-attack and one-door stance is a useful opt-in voice, but the broad what-do-you-think trigger and eight-step ritual would overfire against model defaults.
- `shared/general/ruthless-test-strategy/SKILL.md` — MERGE-into-code-quality — Confidence-per-test and pruning are valuable modes, but the broad testing trigger directly competes with code-quality’s existing test-strategy mode.
- `shared/general/setup-matt-pocock-skills/SKILL.md` — MERGE-into-planning-workflow — This is setup for planning-workflow’s issue and domain conventions, so make it a deterministic setup mode and remove a branded one-time trigger.
- `shared/general/setup-pre-commit/SKILL.md` — CUT — A strong agent can infer the repo’s existing hook stack, while hard-coding Husky, Prettier defaults, full tests, and an automatic commit is often wrong.
- `shared/general/six-phase-dev/SKILL.md` — MERGE-into-goal-protocol — Its human-gated structs, interfaces, TODOs, spike, and invariant sequence is a valuable goal-protocol blueprint mode, but the current any-nontrivial-change trigger competes with code-council.
- `shared/general/skill-authoring/SKILL.md` — KEEP — It encodes this pack’s canonical-source, progressive-disclosure, and provider-composition rules in a compact form no general model knows.
- `shared/general/thermo-nuclear-code-quality-review/SKILL.md` — MERGE-into-code-quality — The harsh review posture is a named code-quality mode, and the repeated giant-file and spaghetti rules do not need another skill body.
- `shared/general/uniwind/SKILL.md` — MERGE-into-product-platform — Its few house rules should survive in product-platform, while the long API matrix is exactly the kind of fast-moving framework content current docs serve better.
- `shared/general/userinterface-wiki/SKILL.md` — MERGE-into-design-family — Its 152-rule catalog overlaps frontend-design and the design modes, contains brittle absolutes, and should be mined only for a small high-signal design reference.
- `shared/general/zero-tech-debt/SKILL.md` — MERGE-into-code-quality — Hard-cut cleanup is a useful code-quality mode, but this body repeats the same deletion, type, and spaghetti guidance as three neighboring skills.
- `shared/general/zoom-out/SKILL.md` — CUT — An explicit request to zoom out already tells a strong agent exactly what to do, so this seven-line prompt adds only trigger tax.
- `shared/variants/legacy/delegate-codex-zellij-wording/SKILL.md` — MERGE-into-agent-orchestration — Single-agent delegation is already an agent-orchestration mode, and this legacy copy hard-codes stale models, sandbox assumptions, and worktree mechanics.
- `shared/variants/zellij/codex-swarm/SKILL.md` — MERGE-into-agent-orchestration — Preserve Zellij-specific transport details only as an optional agent-orchestration reference because the full skill duplicates dispatch policy and embeds stale operational assumptions.
- `shared/variants/zellij/plan-build/SKILL.md` — MERGE-into-planning-workflow — The mux variant differs only in brittle keystroke and session mechanics, so its planning outcome should merge into planning-workflow and the transport recipe should disappear or become a tiny optional reference.

## Proposed consolidated designs

### 1. Code engineering: one `code-quality` router

Expose one compact skill with explicit modes: `implement-small`, `refactor`, `diagnose`, `test-strategy`, `architecture`, `zero-debt`, `thermonuclear`, and `gate`. Move the distinctive feedback-loop discipline, deletion test, confidence-per-test filter, hard-cut posture, and deterministic gate schema into mode-specific references; delete duplicated pep talks, generic “write tests” advice, fixed file-size dogma, and CodeRabbit orchestration. `setup-pre-commit` and `zoom-out` contribute no reference content worth carrying forward.

### 2. Durable goals, one-shot planning, and live orchestration: three non-overlapping owners

- `goal-protocol` owns persistent multi-session work: convergence, blueprinting, human-gated six-phase design, traceability, tickets, waves, execution review, and handoff.
- `planning-workflow` owns one-shot artifacts: PRDs, implementation plans, issue slicing, triage, AFK briefs, out-of-scope records, and initial issue/domain setup.
- `agent-orchestration` owns live dispatch and communication: delegate, swarm, adversarial collaboration, delta propagation, supervision, integration, and transport selection.

Put native subagents, Herdr, tmux, and Zellij behind transport references selected from current capability checks; remove pinned model names, simulated terminal keystrokes, duplicate goal-file templates, and any rule that assumes every sandbox has the same limits. The selection rule should be simple: durable lifecycle goes to `goal-protocol`, a planning artifact goes to `planning-workflow`, and already-defined parallel execution goes to `agent-orchestration`.

### 3. Design: one visible `design-family` router plus one opinionated source

Keep `design-family` visible with only three jobs: `build`, `review`, and `improve`; keep a trimmed `frontend-design` as the routed opinionated source for intentional aesthetics and anti-slop taste. Fold audit, critique, resilience, performance, adaptation, onboarding, copy, expressive tuning, and the best standards-backed rules from userinterface-wiki into references selected by those jobs. Do not expose each mode as a skill, and remove universal stylistic bans or magic numeric thresholds unless accessibility, platform behavior, or measured performance supports them.

### 4. Product platforms: one router with docs-backed surfaces

Make `product-platform` route among `mobile`, `expo-platform`, `uniwind-migration`, `terminal-ui`, and `browser-extension`, with current package versions and official docs checked before API advice. Collapse building-native-ui, mobile-rn, react-native-platform, expo-platform, uniwind, migrate-nativewind-to-uniwind, and opentui into small opinionated references; cut native-data-fetching and follow the repo’s actual client, cache, auth, and error conventions instead. Retain a trimmed chrome-extension-builder as an opt-in routed child because its WXT, Effect, Shadow DOM, storage-tier, and InstantDB choices are genuine pack opinions rather than generic framework facts.

### 5. Language and framework families: one entrypoint each

Retain only `effect-framework`, `elixir-lang`, and `go-lang` as visible entries, each with a short surface router and a handful of durable opinions. Convert every current sibling into a reference section, verify installed versions first, and let official docs provide syntax and changing APIs. The retained deltas should be narrow: Effect execution and resource ownership, Elixir process and supervision ownership, and Go consumer-side interfaces plus goroutine and error ownership.

### 6. Infrastructure and release: risk routers, not copied manuals

Make `infra-bundles` select Kubernetes or infrastructure-as-code, then operation and risk level, while merging the platform and operation twins into references. Make `release-bundles` select platform and surface without listing every checklist child in standing metadata. Both routers should require current official rules and live tool output for volatile facts, preserving only house safety invariants, evidence shape, rollback expectations, and scope boundaries; move teach-context into local-dev’s project-context setup.

### 7. Private infrastructure: preserve precision and remove secrets

Keep peon-ping, Herdr, Maestri, Maestri Portal, the local HTTP browser bridge, RepoPrompt export, and Claude git guardrails as separate precise skills because their commands and contracts are not model knowledge. Trim gtr to the user’s worktree location, safety rules, and a pointer to live help. Keep local-dev as the personal setup router for Portless, sandboxing, proxying, and secret discovery, but use `$HOME` or a local machine-profile file instead of absolute user paths and remove all credentials, tokens, and login values from the pack.

### 8. Interaction modes: explicit opt-in only

Keep grill-me and add a `docs` mode that absorbs grill-with-docs, while keeping prototype separate because its two executable experiment shapes are materially different from ordinary planning. Reduce caveman and riff-partner to tiny user-invoked contracts with narrow trigger phrases, so ordinary requests for brevity or an opinion do not silently activate a persistent persona or an eight-step conversation ritual.

### 9. Overlay exposure policy

Default provider overlays should expose the consolidated routers and the small set of precise private-tool skills, not both routers and all of their children. Merged children should become ordinary reference files without independent frontmatter, mux differences should be transport references rather than duplicate skills, and descriptions should stay to one or two trigger-specific sentences. This leaves **27 retained slots** after consolidation: 11 unchanged and 16 substantially trimmed.
