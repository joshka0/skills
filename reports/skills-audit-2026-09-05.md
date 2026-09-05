Model-reference audit — 2026-09-05

Historical audit: the model update and catalog cleanup are now applied. See
[model-routing evidence](acceptance/agent-orchestration-astra.md) and
[cleanup results](acceptance/skills-cleanup-2026-09-05.md). Everything below is
the pre-change assessment, including its counts, proposed actions, and statements
that work remains unapplied. Retired source links refer to the tree preserved at
`231434e`; this report is not current operating guidance.

The user's narrowed priority is explicit model guidance. The main direct update is to make Astra the default for open-ended Codex planning, implementation, and review, keep Sol available when selected, and preserve deliberate bounded-executor choices. This section supersedes the broader cleanup priorities below for the next implementation task. No model policy has been changed.

The scan covered all readable files under `skills/` and `native/`, including extensionless scripts; real imported packages under the shared and Claude provider views; system-owned OpenAI Docs; and versioned home instructions and agent definitions. Generated links were not counted as separate packages. Historical reports were excluded as migration targets.

| Target | Existing model reference | Recommended action |
| --- | --- | --- |
| [agent-orchestration engine selection](../skills/agent-orchestration/references/engine-selection.md) | Sol-only Codex planning, UI, difficult work, and review defaults; mandatory Sol/Luna split; dated harness/model roster | **Point default Codex work to Astra; retain Sol as an explicit alternative.** Update the Hermes paragraph at line 31, Codex section at line 35, assignment table at line 145, and working rules at line 171 together. Keep Luna's bounded exact-plan role. Keep non-OpenAI routes and vendor restrictions distinct. |
| [Global Codex model rules](../home/codex/AGENTS.md) | Lines 60–91 prescribe Sol planning and Luna execution; no Astra | **Update alongside engine selection.** Otherwise the always-loaded rule will continue to override the skill. Allow Astra or selected Sol to own a task end to end. Preserve the user's effort choice and existing delegation-depth limit. |
| [herdr-goal](../skills/herdr-goal/SKILL.md) | Five package files explicitly describe or launch the Luna verifier | **Keep the verifier pin for this update.** The main worker can be Astra. Add that clarification if useful; changing the verifier requires checking the actual Herdr Goal launcher. Do not replace a documented launched model without changing and verifying runtime behavior. |
| [doc-triage sweep](../skills/doc-triage/scripts/doc-sweep.sh) and [pre-push check](../skills/doc-triage/scripts/pre-push) | Comments set a Sonnet quality floor; both execute `claude -p`; model overrides default to empty | **No direct Astra replacement.** There is no hardcoded Sol model here. An Astra version is a Claude-to-Codex command migration, including permissions, output, and timeout behavior. Keep the current helper or make that a separate requested change. |
| System-owned [OpenAI Docs latest fallback](../providers/codex/.system/openai-docs/references/latest-model.md) | Its latest-model snapshot still lists GPT-5.6 only | **Refresh through its owning system package.** Add Astra as current guidance or point to the live latest-model page. The current repository instructions prohibit hand-editing preserved `.system` content. |
| System-owned [OpenAI Docs prompting fallback](../providers/codex/.system/openai-docs/references/prompting-guide.md) | Generic filename and fallback routing, but content is specifically GPT-5.6 | **Make the fallback model-specific.** Astra requests should use the supplied live Astra guide. Keep GPT-5.6 material only for an explicitly selected GPT-5.6 target. |
| [Claude agent definitions](../home/claude/agents) | Thirteen `model:` pins: eight Sonnet, three Opus, two Fable | **Keep valid Claude pins.** Where the orchestrator should prefer Astra, change the dispatch owner to a Codex agent. Do not insert an OpenAI ID into a Claude-native model field. |
| Imported [firecrawl-agent](../providers/agents/firecrawl-agent/SKILL.md) | `spark-1-mini` and `spark-1-pro` are service model options | **Keep.** These select Firecrawl's extraction service, not the coding agent. |

The five Herdr Goal files are `SKILL.md`, `agents/openai.yaml`, and `references/start-loop.md`, `references/checkpoint-and-report.md`, and `references/lifecycle.md`. The literal launch pin is in `SKILL.md:64` and `references/start-loop.md:30`.

The rest of the system OpenAI Docs matches are explicit older-model routes: `SKILL.md:36`, `references/model-migration.md`, `references/upgrade-guide.md`, and `references/upgrading-to-gpt-5p6-sol.md`. Preserve these routes for users who explicitly request those versions. Adding Astra must not rewrite their historical API behavior as if it applied to Astra.

The AUX script's `.gemini/skills` path is a harness discovery location, not a model selection. No explicit model-name matches were found in the four `native/` packages or the two imported transition packages. No other canonical package contained a named model policy in this scan.

The proposed short shared rule is:

> Honor the user's selected model. When selecting a default for open-ended Codex planning, implementation, or review, use gpt-6-astra. Keep gpt-5.6-sol available when selected. Use gpt-5.6-luna only for an exact, bounded, low-risk plan authored by a suitable stronger model. Preserve the chosen reasoning effort and check support when switching models.

Astra and Sol are both OpenAI models. Switching between them does not satisfy a requirement for a different model family. Preserve an independent review's intended role and permitted vendor route.

The local configuration already selects `gpt-6-astra` at `xhigh`. The immediate problem is contradictory written routing, not a missing model-setting change. Astra's official guide recommends reviewing inherited instructions and scaling testing to the change; it does not justify replacing every smaller executor or provider-specific model. [Official Astra guide](https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices).

The broader audit below is retained as background. Its retire and consolidation proposals are not part of this focused model update.

---

Skills and agent-instruction audit — 2026-09-05

The strongest cleanup is to remove stale model doctrine, reduce competing discovery entries, and narrow rules that force extra work or early stops. Keep private tool contracts, deterministic helpers, and actual safety boundaries. Most locally authored entrypoints already use progressive disclosure.

This is a review with proposed changes. It does not change skills, exposure, installed plugins, model settings, or live home configuration. The source baseline is commit `d99f4cb8a4f65d26ca5d0fc9128630a9e380213c` plus the existing working-tree edits. Those edits were included in the review and preserved.

The supplied article and `skill-creator` are the review criteria. OpenAI's current guide supports explicit completion boundaries, proportional testing, and concise writing preferences. It also describes Astra as sensitive to conflicting instructions. These support simplifying the local rules; they do not establish a benchmark ranking for every local model. [Official Astra prompting guidance](https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices), fetched 2026-09-05.

| Observed surface | Current evidence | Meaning |
| --- | --- | --- |
| Canonical packages | 40 under `skills/`; median entrypoint 49 lines; 2,122 entrypoint lines total | There is no general need to turn every short skill into a router. |
| Canonical descriptions | 8,713 decoded characters; 1,218 whitespace-separated words | Description cost remains real even when bodies are short. These are source sizes, not measured prompt tokens. |
| Shared and Codex provider views | 32 canonical links in each; all resolve | These are repeated paths to the same source, not 64 distinct packages. Do not claim twice the runtime context without loader evidence. |
| Firecrawl | 33 real directories in `providers/agents/`, outside the manifest | These entries remain installed independently of canonical exclusions. |
| Firecrawl descriptions | 32 valid YAML descriptions total 11,974 characters; one additional malformed entry | Those 32 descriptions alone exceed all 40 canonical descriptions combined. |
| Other unmanaged entries | `transitions-dev` and `transitions-polish` under `providers/claude/` | They also sit outside the declared composition model. |
| Global Codex instructions | 251 lines; 2,038 words | This is compulsory context across tasks. |
| Engine-selection reference | 175 lines; 3,326 words; 21,989 bytes | Line count hides a large, volatile model and harness catalog. |
| Local model selection | `~/.codex/config.toml` selects `gpt-6-astra`, effort `xhigh` | The selected model has already changed; the written doctrine has not. |
| Disabled-skill configuration | 26 entries; 18 paths absent; 8 paths still exist | Do not re-enable retired skills while cleaning stale records. |

The eight existing disabled paths name `design-family`, `infra-bundles`, `local-dev`, `maestri`, `product-platform`, `prototype`, `release-bundles`, and `repoprompt-pro-review`. All eight are absent from this session's supplied available-skills catalog. This audit did not reproduce loader behavior in a fresh session.

The highest-priority changes are:

1. **Replace the Sol-only role doctrine.** [Global model rules](../home/codex/AGENTS.md) prescribe Sol planning and Luna execution. [Engine selection](../skills/agent-orchestration/references/engine-selection.md) repeats that split, sends difficult work only to Sol, and has no Astra route. Its assignment table, harness preference, and final working rules must change together. Adding one Astra row would leave contradictory instructions active.

   Let the selected Astra or Sol agent own planning and implementation when one agent can complete the task. Keep Luna as an optional executor of an exact, bounded plan from a stronger model. Preserve the narrow-plan requirement and no-subdelegation rule when Luna is chosen. Preserve user model choices and the current effort unless there is a reason to change them. Treat model capability and harness availability as live facts; move historical quota failures and install observations out of the default selection reference.

   The guide also asserts that different weights do not share blind spots and that same-family review catches almost nothing. These absolute claims are not established by local evidence. Keep fresh context and raw source artifacts as review requirements when independent review is requested. Use family diversity as a possible additional check, with vendor restrictions intact.

2. **Reduce the skill-authoring process itself.** [The local contract](../skills/skill-authoring/SKILL.md) has 404 lines across five files. It mandates archetypes, exact table forms, fixed budgets, 35 acceptance items, golden-example comparisons, a preservation ledger, and a pre-edit commit. Much of this duplicates or overconstrains the supplied skill-creator guidance.

   Remove the standalone discovery slot after moving the few repository rules into the existing repository instructions: canonical edit location, provider ownership, portable paths, secret exclusion, and checks that actually apply. Keep originals recoverable. Remove compulsory acceptance reports and formatting rituals for ordinary wording edits. Preserve deterministic validation where it catches a concrete defect. Keep the existing system-owned `skill-creator` package untouched.

3. **Consolidate Firecrawl before polishing dozens of descriptions.** The broad `firecrawl`, `firecrawl-search`, `firecrawl-scrape`, and `firecrawl-workflows` descriptions compete for common requests. The build description claims generic app features even when the user never selected Firecrawl. The parse description claims ordinary local document reading. This is the article's discovery problem in the current installation.

   Retain a small set of actual capabilities and make workflow variants selected references. Proposed owners and the complete 33-entry disposition are below. Preserve authentication, cost, upload, and recurring-operation boundaries. Do not treat a request to read a local file as permission to upload it to a remote parser.

4. **Remove generic coaching slots after checking their remaining callers.** The Go, Elixir, and Effect packages mainly contain standard boundary, lifecycle, and test advice. They have no bundled execution helpers. The product-platform router joins unrelated mobile, terminal, and extension topics. Prototype mostly restates a normal prototyping request. Move any deliberate project convention to its actual project, then remove these standing slots. Do not move all of their prose into AGENTS.md.

   There are real dependencies to update: `code-quality` routes Go work to `go-lang`; design references route platform work to `product-platform`; `product-platform` owns the Uniwind migration reference. Move the useful migration checklist to `uniwind` before retiring that router. Remove obsolete handoffs in all affected entrypoints and references.

5. **Narrow global rules that manufacture work or stops.** The global test-author separation rule conflicts with ordinary implementation and the local [TDD mode](../skills/code-quality/references/tdd.md). The universal ambiguity ledger turns routine assumptions into home-directory writes. The design-wall rule stops any structural change after a failed assumption. These should remain available for explicitly governed or high-risk work, with ordinary scoped work allowed to continue.

   Preserve the user's concrete safety rules: Trash-only removal, no destructive Git, protection of dirty work, secret boundaries, browser ownership, and vendor restrictions. Keep actual product boundaries such as Praize's native-only target and project-specific simulator lane. The article is not a reason to weaken them.

6. **Remove forced agent campaigns and arbitrary pass counts.** [Vocab deck](../skills/vocab-deck/SKILL.md) requires a different model family for authoring and another agent for packaging even for a small deck. [Crew](../skills/crew/SKILL.md) adds campaign machinery beside existing orchestration and watcher owners. [Diagnosis](../skills/code-quality/references/diagnose.md) requires three to five hypotheses. [Quality gate](../skills/code-quality/references/quality-gate.md) imposes a universal five-warning budget.

   Make delegation conditional on useful independent work. Keep output checks such as anti-leak card review, deterministic IDs, and embedded media. Let the requested review scope define the number of hypotheses or passes. Keep exact verdict schemas only where an identified consumer needs them.

7. **Move local incident history out of universal instructions.** [Uniwind local development](../skills/uniwind/references/local-dev.md) states that bare Expo launch is always wrong, gives a blanket Node 24 IPv6 rule, and stops native debugging after a particular lane check. These read as general laws but contain a specific failure signature and local build history. Retain the known-good Praize lane in Praize. Keep the shared skill focused on detecting installed configuration and applying the project's own lane.

   [Secret infrastructure](../skills/agent-secret-infrastructure/SKILL.md) also demands both host discovery and a shared architecture reference for every task. Limit those reads to operations that need them. Preserve recovery, custody, and injection-versus-egress distinctions.

8. **Fix composition and validation contradictions before applying removals.** [doc-triage](../skills/doc-triage/SKILL.md) says `git rm` satisfies Trash-only rules. It does not satisfy the current user policy. [bin/link](../bin/link) uses `fs.unlinkSync` to remove obsolete symlinks. The checked-in [pre-commit hook](../bin/hooks/pre-commit) invokes that linker for staged skill, native, or manifest changes. This audit did not run either mutation path.

   The linker deliberately leaves unmanaged real directories in place. Adding Firecrawl names to the dormant group will therefore not remove those installed packages. First give retained imports a declared owner under `native/` or `skills/`, preserve their originals, and make stale-link removal comply with Trash policy. Then apply composition changes. Do not edit generated symlink targets as if they were separate source files.

A proposed replacement for the model-specific doctrine is:

> Use the active Astra or Sol model to complete the requested task. Split planning and implementation only when the split improves cost, scope control, or independent evidence.
>
> Use Luna only for an exact plan authored by Astra, Sol, or another suitable stronger model. Its task must be bounded and low risk. If that plan is incomplete or conflicts with evidence, Luna reports the gap.
>
> Delegate complete independent tasks when their benefit exceeds the coordination cost. Keep one level of delegation. Brief reviewers from the original artifacts without supplying the desired verdict. Preserve all route and vendor restrictions.
>
> Honor the user's selected model and effort. Check available model IDs and supported effort when changing either. Record the model that actually ran.

This is proposed local policy, not a measured ranking or a new runtime setting. The existing `ultra` approval rule and Terra exclusion remain owner decisions. The specific Luna verifier in `herdr-goal` is a separate protocol choice; do not replace it by global text substitution.

The related cleanup locations are:

| Location | Recommended change |
| --- | --- |
| `home/codex/AGENTS.md` | Replace Sol-only roles; shorten repeated delegation explanations; narrow global test and ambiguity-ledger requirements. |
| `home/claude/CLAUDE.md` | Keep route prohibitions; align the shared role policy and remove universal test-author separation outside named gates. |
| `skills/agent-orchestration/references/engine-selection.md` | Replace the roster doctrine, assignment table, harness override wording, and mandatory split together. Keep only necessary live discovery and route constraints. |
| `skills/herdr-goal/SKILL.md` and its three references | Retain native session identity, sealed packets, bounded epochs, and authenticated callbacks. Review the Luna pin as a distinct workflow decision. |
| `skills/vocab-deck/SKILL.md` and `references/pipeline.md` | Remove unconditional cross-family authoring and separate packaging-agent requirements. |
| `skills/crew/SKILL.md` | Merge useful campaign handoff details into the existing orchestration owner. Use watcher for supported durable joins instead of another generic polling recipe. |
| `skills/spec-gauntlet/` | Keep as a named high-assurance workflow. Do not automatically expand ordinary implementation into it. Preserve frozen test ownership when the task explicitly requires it. |
| `home/claude/agents/` | Thirteen role files still carry model pins or model-era language. Review the overlapping writer, test, and generalist roles together. Do not blindly replace Claude model IDs with Astra IDs; these are different harness surfaces. |

For writing style, retain one short preference in the global file: lead with the result, use simple concrete language, and scale detail to the user's question. Keep exact report formats only in the workflow that consumes them. Astra's tendency toward formatted, detailed prose makes this a useful preference rather than disposable generic coaching. [Official personality and writing-style guidance](https://developers.openai.com/api/docs/guides/latest-model#gpt-6-astra-personality-and-writing-style).

For completion, specify the requested end state and authorize routine local follow-through inside the task's scope. After relevant checks pass, repeat or expand them only for a new change, failure, or unresolved concern. Ask about consequential scope or permission decisions after preparing the work already authorized. These are proposed corrections to the observed broad stop rules.

The complete canonical inventory follows. **Keep** means the capability earns its own slot. **Trim** keeps the capability while changing its instructions. **Merge** removes a separate slot after preserving a named delta. **Retire** removes routine discovery after caller review. **Optional** preserves a niche package without expanding exposure. No disposition below is applied.

| Canonical skill | Disposition | Useful delta or concrete cleanup |
| --- | --- | --- |
| [agent-orchestration](../skills/agent-orchestration/SKILL.md) | Trim | Keep bounded briefs, ownership, and integration. Replace stale model doctrine and mandatory review campaigns. |
| [agent-secret-infrastructure](../skills/agent-secret-infrastructure/SKILL.md) | Trim | Keep private topology, recovery, and custody rules. Select host discovery and references by task. |
| [agent-vault](../skills/agent-vault/SKILL.md) | Keep | The command-only launcher and injection-versus-egress distinction are non-obvious local contracts. |
| [aux](../skills/aux/SKILL.md) | Keep | Live scope and credential-mode discovery saves repeated setup. Preserve the routine-task exemption. |
| [caveman](../skills/caveman/SKILL.md) | Optional | Already explicit-only and Claude-only. A named persistent interaction mode is a real preference. |
| [cloudflare-operations](../skills/cloudflare-operations/SKILL.md) | Keep | Token ownership, safe storage, destination verification, and exact DNS rollback earn detailed steps. |
| [code-quality](../skills/code-quality/SKILL.md) | Trim | Keep requested review and test-strategy decisions. Remove generic small-edit/TDD/regression recipes, hypothesis quotas, and the universal warning budget. |
| [crew](../skills/crew/SKILL.md) | Merge | Preserve useful durable reports and campaign handoffs under agent-orchestration. Remove overlapping campaign orchestration. |
| [design-family](../skills/design-family/SKILL.md) | Trim | Keep deliberate taste and interaction policy. Reduce build/improve/impeccable overlap and broad second-reference conditions. Remains disabled in current Codex configuration. |
| [doc-triage](../skills/doc-triage/SKILL.md) | Trim | Keep intent-to-comment and decision-to-ADR routing. Remove the universal five-document target, false removal claim, and assumed issue publication. |
| [effect-framework](../skills/effect-framework/SKILL.md) | Retire | Mostly standard Effect architecture advice. Preserve any chosen application Layer convention in the relevant repository. |
| [elixir-lang](../skills/elixir-lang/SKILL.md) | Retire | Generic OTP ownership and verification advice. Keep real project process contracts near the project. Audit installed Phoenix-plugin overlap separately. |
| [git-guardrails-claude-code](../skills/git-guardrails-claude-code/SKILL.md) | Optional | A concrete install helper with a scoped blocker test. Keep only for requested Claude hook setup. |
| [go-lang](../skills/go-lang/SKILL.md) | Retire | Generic Go contracts, goroutine lifetimes, and race/benchmark advice. Remove the code-quality handoff before retirement. |
| [goal-protocol](../skills/goal-protocol/SKILL.md) | Trim | Preserve durable artifacts for named governed goals. Keep human phase gates tied to explicit invocation; retire trial-then-revert choreography unless still wanted. |
| [grill-me](../skills/grill-me/SKILL.md) | Optional | Explicit question-by-question interaction with a real spec output. Preserve explicit-only activation. |
| [gtr](../skills/gtr/SKILL.md) | Keep | Private worktree configuration and hook/cleanup boundaries. Avoid an extra approval when the requested operation already supplies scope. |
| [herdr](../skills/herdr/SKILL.md) | Trim | Keep exact targeting, opaque IDs, focused-pane hazards, and transport semantics. Remove repeated generic briefing and model-selection prose. |
| [herdr-executive](../skills/herdr-executive/SKILL.md) | Trim | Keep durable queue transitions and speech delivery proof. Move detailed speech presentation into the selected delivery reference; retain the main completion boundary. |
| [herdr-goal](../skills/herdr-goal/SKILL.md) | Keep | Sealed verification epochs and identity-bound completion are distinct from ordinary planning. Review the verifier pin separately. |
| [herdr-watcher](../skills/herdr-watcher/SKILL.md) | Keep | Durable continuation, invite capability, and unknown-delivery rules cannot be inferred from generic agent advice. |
| [infra-bundles](../skills/infra-bundles/SKILL.md) | Trim | Keep the saved-plan/hash gate and desired/live ownership rules. Drop generic infrastructure checklists. Remains disabled in current Codex configuration. |
| [interview-course](../skills/interview-course/SKILL.md) | Trim | Keep the lesson/deck source contract. Remove compulsory module fields such as an asynchronous boundary when the subject does not need them. |
| [local-dev](../skills/local-dev/SKILL.md) | Keep | Portless/tailnet topology and Infisical/Keychain ownership are useful local facts. Resolve its disabled-Codex status separately from content cleanup. |
| [local-http-browser-use](../skills/local-http-browser-use/SKILL.md) | Keep | Keep the visible bridge and token boundary. Reuse a current AUX readiness result instead of requiring it twice. |
| [maestri](../skills/maestri/SKILL.md) | Optional | Private canvas and portal transport earns a skill when used. Keep current Codex disablement. |
| [monid](../skills/monid/SKILL.md) | Optional | Already dormant. Per-query billing and endpoint input placement are useful if the tool returns to use. No current discovery saving from deleting it. |
| [peon-ping](../skills/peon-ping/SKILL.md) | Optional | Small Claude-only private hook operator. No reason to turn it into a broad notifications suite. |
| [planning-workflow](../skills/planning-workflow/SKILL.md) | Trim | Keep AFK brief and tracker-specific conventions. Remove fixed rounds, unnecessary review loops, and stop rules that ignore supplied authorization. |
| [product-platform](../skills/product-platform/SKILL.md) | Merge | Move the migration delta to uniwind; remove generic mobile, terminal, and extension coaching. Repair design-family handoffs. |
| [prototype](../skills/prototype/SKILL.md) | Retire | The user's prototype request already supplies most behavior. Keep a tiny design example only if its variant pattern is useful. |
| [release-bundles](../skills/release-bundles/SKILL.md) | Trim | Keep a specifically requested store-readiness review. Move project release commands to project skills; reduce generic store checklists and redundant approval gates. |
| [repoprompt-pro-review](../skills/repoprompt-pro-review/SKILL.md) | Optional | Bounded context export and banned send operations are a real local workflow. Keep disabled until requested. |
| [riff-partner](../skills/riff-partner/SKILL.md) | Optional | Already explicit-only. Keep only if this named conversational mode remains useful. |
| [skill-authoring](../skills/skill-authoring/SKILL.md) | Merge | Move repository-specific authoring rules to AGENTS.md; use system skill-creator for authoring. Remove A01–A35 bureaucracy. |
| [spec-gauntlet](../skills/spec-gauntlet/SKILL.md) | Trim | Keep isolated derivation for explicitly governed work. Remove blanket activation, speculative calibration rules, and teardown that conflicts with Trash policy. |
| [uniwind](../skills/uniwind/SKILL.md) | Trim | Keep semantic tokens, scanner and binding decisions; absorb migration. Move incident-specific startup doctrine to project run notes. |
| [vocab-deck](../skills/vocab-deck/SKILL.md) | Trim | Keep anti-leak cards, deterministic IDs, source traceability, and media checks. Make multi-agent generation optional. |
| [wiki](../skills/wiki/SKILL.md) | Keep | The CLI-only inbox and Foxway quarantine rules are private operational contracts. |
| [youtube-transcript](../skills/youtube-transcript/SKILL.md) | Keep | A deterministic caption helper with format support, input validation, and overwrite refusal earns its slot. |

The proposed Firecrawl consolidation keeps five existing owner names because they have distinct command or lifecycle surfaces. Each owner must have a narrow Firecrawl-specific description. This removes 28 of the current 33 discovery entries without discarding their useful tool guidance.

| Proposed owner | Current entries absorbed | Preservation boundary |
| --- | --- | --- |
| `firecrawl` | `firecrawl`, `firecrawl-agent`, `firecrawl-crawl`, `firecrawl-download`, `firecrawl-interact`, `firecrawl-map`, `firecrawl-parse`, `firecrawl-scrape`, `firecrawl-search` | Keep actual CLI request, output, extraction, and authorization mechanics as selected references. Local file upload and browser actions require the task's authorization. |
| `firecrawl` | `firecrawl-workflows`, `firecrawl-company-directories`, `firecrawl-dashboard-reporting`, `firecrawl-deep-research`, `firecrawl-demo-walkthrough`, `firecrawl-knowledge-base`, `firecrawl-knowledge-ingest`, `firecrawl-lead-gen`, `firecrawl-lead-research`, `firecrawl-market-research`, `firecrawl-qa`, `firecrawl-seo-audit`, `firecrawl-shop`, `firecrawl-website-design-clone` | Retain only demonstrated tool-specific steps and useful output examples. Ordinary business writing does not need a separate skill per deliverable. |
| `firecrawl-build` | `firecrawl-build`, `firecrawl-build-onboarding`, `firecrawl-build-interact`, `firecrawl-build-scrape`, `firecrawl-build-search` | Select credential setup or endpoint details only when needed. Integrate Firecrawl when selected by the user or project; do not select the vendor from generic web-data wording. |
| `firecrawl-monitor` | `firecrawl-monitor`, `firecrawl-competitive-intel` | Retain the recurring-job lifecycle, costs, notification targets, and cancellation boundary. A repeated lookup does not automatically authorize a monitor. |
| `firecrawl-developer-index` | `firecrawl-developer-index` | Keep dedicated developer-source query mechanics. Remove the claim on every primary-source programming question. |
| `firecrawl-research-index` | `firecrawl-research-index`, `firecrawl-research-papers` | Keep paper retrieval, expansion, and source verification. Report style belongs to the user's request. |

This consolidation is a design recommendation from the metadata and selected bodies, not a behavioral certification of every imported workflow. Before implementing it, inspect each retained script/reference caller and preserve the import's attribution. Do not simply concatenate the existing bodies.

Other repository and installed surfaces:

| Surface | Recommendation |
| --- | --- |
| `native/agents/agent-vault-cli`, `agent-vault-http` | Retire or clearly archive. Neither is exposed by the manifest. Both prescribe proposal-based credential storage, which the canonical agent-vault explicitly rejects for this deployment. Their removal saves maintenance, not current discovery context. |
| `native/gemini-antigravity/heroui-react-pro` | Trim component snapshots and copied API material; keep the version-specific ownership boundary and live MCP lookup. It is Antigravity-only. |
| `native/gemini-antigravity/heroui-pro-design-taste` | Reduce the long principle catalog to chosen house taste; merge it as a reference of the HeroUI owner if no distinct invocation remains. Do not broaden its exposure. |
| `providers/claude/transitions-dev`, `transitions-polish` | Declare an import owner before changes. Preserve reusable CSS assets; merge overlapping motion/token workflows after inspecting their references. They are not in the current Codex catalog. |
| System-owned `providers/codex/.system` | Preserve. Do not edit it as part of local catalog composition. |
| Cached Phoenix, Ponytail, browser, document, and other plugins outside this repository | Separate follow-up scope. Their descriptions are visible in this session, so this repository's cleanup cannot remove all discovery competition. Their bodies and usage were not audited here. |

The runtime catalog is not the same as the repository tree. The global instructions and several active skills direct secret work to `local-dev`, yet that skill is disabled in the observed Codex configuration. Settle whether it should be available before removing any of those handoffs. Likewise, the stale disable entries for nested `code-quality/code-quality` and `planning-workflow/planning-workflow` paths do not describe their current canonical paths. Removing stale configuration must not silently change the intended enabled set.

Verification performed:

- Read the canonical entrypoints, relevant supporting references, repository instructions, manifest, linker, validator, and selected imported bodies.
- Inspected provider links, unmanaged directories, and the model/skill fields of the local Codex configuration. Did not read or report credential values.
- Ran `bin/validate-skill.sh skills/<name> <archetype>` for all 40 canonical packages. Every invocation returned exit 0 and its literal `PASS: skills/<name> (<archetype>)` line. Classified suites and private-tool leaves from their current shape; these passes do not establish semantic usefulness.
- Parsed all 40 canonical frontmatters with Ruby's standard YAML parser: valid. Python's optional PyYAML module was unavailable, so no package was installed.
- Parsed the 33 Firecrawl frontmatters: 32 valid; `firecrawl-build/SKILL.md:3` fails YAML parsing at the unquoted `app: web` sequence. The session catalog still exposes its description, so this is a portability defect, not proof that every loader rejects it.
- Checked direct Markdown links and named reference/script/asset paths in all canonical entrypoints: none missing. This is not a full reference graph or external-link crawl.
- Found no broken generated provider symlinks.
- Inspected the validator's coverage. It does not parse YAML, check reference byte limits, enforce individual script budgets, or include extensionless/Python/JavaScript scripts in package totals. Thus the 21,989-byte engine reference and 371-line IaC helper pass despite the written limits. Simplify the contract and validator together; do not grow a large validation framework to protect arbitrary prose limits.
- Did not execute operational scripts, live deployments, model benchmarks, browser flows, or agent campaigns. No skill was rewritten or accepted, so no PACKAGE-CONFORMS or CATALOG-CONFORMS verdict is claimed.

The implementation order should be:

1. Agree and apply the shorter shared model, completion, and authoring rules. Preserve all concrete safety and vendor boundaries.
2. Make composition comply with Trash policy and record ownership of unmanaged imports.
3. Consolidate Firecrawl, update all removed-skill handoffs, and apply the canonical inventory decisions.
4. Reconcile stale disable paths with the intended exposure. Inspect a fresh Codex session's skill catalog.
5. Exercise a few representative requests: a small code fix, a private tool operation, an ordinary document read, an exact Luna task, and a named high-assurance review. Check that routing, authorization, completion, and the preserved operational contracts behave as intended.

No model benchmark supports retiring Sol, replacing the bounded Luna verifier, or changing every workflow at once. The immediate need is to let Astra and Sol work under clear shared boundaries without carrying obsolete mandatory choreography.
