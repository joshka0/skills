# Engine selection

Use this mode to pick the executor and reviewer engines — model family, harness, and effort — before writing any packet. Transport belongs to `herdr`; packet discipline belongs to the dispatch mode you pair this with.

## Cross-family first

Different weights do not share blindspots; same-family review inherits the same biases and misses the same errors. For adversarial review, fresh eyes, independent verification, or high-stakes synthesis, pick the reviewer from a different model family than the **executor** — not merely different from the supervisor. OpenAI-executed work gets xAI or Anthropic review; Anthropic work gets OpenAI or xAI review; xAI work gets OpenAI or Anthropic review. Fall back to same-family subagents only when external engines are unavailable or the task is trivial. Framing independence (briefing reviewers against ground truth, not the supervisor's digest) is the `collaborate` mode's contract — read it for any review dispatch.

**Foxway (standing user directive):** never use grok or any xAI model for Foxway work or data — no panes, no subagents, no one-shot queries. Cross-family review of Anthropic-authored Foxway work routes through codex; OpenAI-authored Foxway work gets Anthropic review. Restate this prohibition explicitly in every brief handed to another agent for a Foxway task — downstream agents will otherwise follow the general grok guidance on their own.

## Engine roster

Pack constraint: the model IDs and effort tiers below are house tiering decisions the CLIs cannot express; they are volatile. Before dispatch, confirm the model still exists from the live surface (`codex` model picker or config, `grok models`) rather than trusting these literals.

### Codex — sol plans, luna executes

A codex run is two roles, not one. `gpt-5.6-sol` authors the plan; `gpt-5.6-luna(max)` executes it. Never collapse them: luna planning for itself is the failure this split exists to prevent.

- `sol(medium)` — **the planner.** When codex is tasked to plan, this is the tier. Also the daily driver for scoped delegated work that is not worth splitting into two panes.
- `sol(high|xhigh)` — **the executor whenever UI design or frontend work is involved**, and the tier for genuinely hard problems: deep review, design convergence, gnarly debugging.
- `sol(max)` — the ceiling: adversarial passes and highest-stakes synthesis. `ultra` sits above max and is never used without asking the user.
- `luna(max)` — **the default executor for codex-based runs.** A cheap executor that performs very well given a precise, exact plan, and poorly without one.

**The luna contract (all three conditions, or do not dispatch luna):**

1. A stronger model — `sol(medium)` or better — authored the plan. Luna never plans its own work, and never receives a goal in place of a plan.
2. Luna executes *that exact plan* and nothing else. Where the plan is silent, ambiguous, or wrong, luna stops and reports rather than improvising; a deviation is a defect, not initiative. Say this explicitly in the brief.
3. The task is neither high-risk nor complex. High-risk, complex, exploratory, or judgment-dense work goes to sol at the appropriate effort — no exceptions bought with a tighter plan.

Escalate by effort, not by model — within sol. The sol↔luna choice is a role decision (planner vs plan-executor), not a rung on the effort ladder. Launch: `codex -m <gpt-5.6-sol|gpt-5.6-luna> -c model_reasoning_effort=<tier>` in a herdr pane. Effort tiers ascending: `low`, `medium`, `high`, `xhigh`, `max`, `ultra` (config-token only). Gotcha: a `/model` picker change inside any codex session rewrites `${CODEX_HOME:-$HOME/.codex}/config.toml` globally.

**Fan-out cap.** Codex agents are capped at one level of delegation (contract in `${CODEX_HOME:-$HOME/.codex}/AGENTS.md`, versioned at `home/codex/AGENTS.md`): a subagent finishes its whole task without sub-delegating. Decompose work into complete, self-contained units before handing it to a codex pane; a fan-out pane may spawn one wide layer of peers, never a cascade. Restate the no-sub-delegation rule in every codex brief, and never brief one with "explore this and delegate what you find."

### claudex — red-team only

`claudex` runs the Claude Code harness on sol via CLIProxyAPI (requires the cliproxyapi brew service). In this harness sol over-spawns subagents on normal work, so claudex is scoped to one job: a final adversarial/refutation pass with full Claude Code tooling, cross-family to Anthropic authorship. Every claudex prompt must forbid subagents — state explicitly: "Do not spawn subagents or use the Task/Agent tool; do all analysis yourself, directly — this is a single self-contained pass." A red-team has nothing to decompose, so this costs nothing and removes the only failure mode. Default effort `sol(xhigh)`; use `sol(max)` only when the user asks — user guidance on effort takes precedence. If the proxy is down, prefer a raw `codex … max` pane for the red-team instead. All other delegation to Codex uses raw `codex` panes, never claudex.

### Grok — standalone opus-class fresh eyes

Launch `grok`; the default `grok-build` model is the current strong tier (there is no version-numbered literal ID — `grok models` lists what exists). Effort via `--reasoning-effort <tier>` (alias `--effort`) or `/model grok-build [tier]` in the TUI. Prefer grok when you want an opus-class **standalone pane agent** — fresh eyes, second opinions, independent review: comparable capability, fast, and a third weight family beyond Anthropic and OpenAI. Opus-class *subagents* resolve through a sol codex pane or native Anthropic agents instead. Subject to the Foxway prohibition above.

### Devin CLI — Cognition-hosted routing, the only Kimi path here

`devin` (installed via `curl -fsSL https://cli.devin.ai/install.sh | bash`; credentials at `~/.local/share/devin/credentials.toml`). Auth is `devin auth login` — a browser flow the user must run; use `--force-manual-token-flow` over SSH. Pick the model with `--model <MODEL>` or the `DEVIN_MODEL` env var; `/model` switches in-session (aliases `opus`, `sonnet`, `swe`, `codex`, `gemini`).

Cognition routes several vendors' models, including open-weight families such as Kimi, DeepSeek, and GLM. There is **no BYOK and no custom base URL** — the checkpoint, routing, and ACU billing are Cognition's, so a Devin-run Kimi is not the same artifact as Moonshot's published weights.

Two verified traps. `--model` accepts only **family slugs** (`kimi-k2.7`, `opus`, `glm-5.2`), not the per-effort UIDs that `devin models list` prints — passing `kimi-k3-max` errors out. Worse, the two disagree on what exists: `devin models list` advertises a `kimi-k3` family, but the CLI's own validator rejects it and omits it from the error list, so the catalog service is ahead of the compiled binary. Trust the list in the `Unknown model:` error, not the catalog, and confirm any slug by launching once.

**Plan upgraded 2026-07-31** — the old Free-plan symptom (`Permission denied: an internal error occurred`) is gone. The binding limit is now a **daily usage quota**; on first use after the upgrade the request still failed, with a different and self-describing error:

```
Agent error: Your daily usage quota has been exhausted.
  "cognition.ai/errorKind": "resource_exhausted"
  "cognition.ai/retryable": true
```

That error is account-wide, not model-specific, so switching slugs does not route around it. Devin is therefore usable for real Kimi work but **capacity-gated**: probe it with one cheap prompt before building a dispatch around it, and fall back to the Cursor pane below when the quota is spent. Distinguish the two failures — `resource_exhausted` means come back later, an entitlement error means the plan regressed.

**Role: Kimi K3 Max is a reviewer and an executor.** Reach for it for review passes and for delegated execution — a fourth weight family, open-weight lineage, cross-family to both Anthropic and OpenAI authorship. Prefer Devin as the route when its validator accepts the slug and quota allows; the two documented failures above (family-slug-only validation rejecting `kimi-k3`, and account-wide `resource_exhausted`) both fall back to the verified Cursor pane below rather than to a different model. Probe with one cheap prompt before building a dispatch around Devin.

Routing is not authorship. When picking a cross-family reviewer, classify a Devin task by the **model it ran**, not by "Devin" — Devin-on-Opus is Anthropic work and needs OpenAI or xAI review.

### Cursor Agent CLI — the working Kimi pane

`cursor-agent` runs Cursor's catalog, which on the Foxway team account includes Kimi: `kimi-k3-max`, `kimi-k3-low`, and `kimi-k2.7-code`. Verified live — `cursor-agent --model kimi-k3-max` launches, reports "Kimi K3 Max" in its status bar, streams Kimi-style reasoning, and self-identifies as "Kimi, developed by Moonshot AI". This is the engine to reach for when the task calls for Kimi.

`--list-models` is authoritative and takes model UIDs directly; parameterized overrides use bracket syntax (`--model 'claude-opus-4-8[context=1m,effort=high]'`). The catalog is account-gated, so an empty list means an entitlement or login problem, not a client bug — authenticate before concluding a model is missing.

Routing is still not BYOK: Cursor serves these models through its own backend, so a Cursor-run Kimi is Cursor's deployment, not your Moonshot key. Cursor's custom-API-key feature is IDE-scoped and covers five named providers; the CLI's `--api-key`/`CURSOR_API_KEY` authenticate a Cursor account, not a model provider. Do not invent a base-URL flag for it.

Two local hazards. The upstream installer's primary binary name is `agent`, but on this machine **`agent` is a wrapper pointing at grok** — letting Cursor's installer reclaim that name silently repoints grok invocations at Cursor, and would route Foxway work to a prohibited engine. The installer also hard-deletes `~/.local/bin/agent` and `~/.local/bin/cursor-agent`, destroying the local audit wrappers; back both up before any update and restore them afterward, repointing `cursor-agent.real-link` at the new version directory.

### Anthropic — Opus orchestrates and executes, Fable plans

- **Opus 5 — general orchestration.** The supervisor seat: decomposition, casting, synthesis, integration.
- **Fable 5 (medium–high) — planning.** Plan authorship, design exploration, and reasoning-heavy phases before work is cast. `deep-reasoner` and the `Plan` agent are the native surfaces.
- **Opus 5 (xhigh) — execution.** Substantive Anthropic-side implementation runs at xhigh; do not execute serious work at the planning tier.
- Native subagents: adversarial critique when externals are unavailable → `adversarial-reviewer` (Opus); security, privacy, auth, secret-handling, browser-automation, or abuse-case review → `security-reviewer`; mechanical scoped work → the explicit Sonnet agents (`fast-worker`, `sonnet-generalist`, `sonnet-code-reviewer`, `sonnet-researcher`, `sonnet-test-worker`). Never use Haiku; the smallest acceptable subagent is Sonnet. Pass an explicit model rather than relying on inheritance unless inheritance is intentional.

## Substitution when an engine is unavailable

Quota exhaustion, an expired login, or a dead proxy is a routine event, not a blocker — but the substitute must preserve the property the original was chosen for, which is usually family decorrelation, not raw capability.

1. **Replace the crew member with an equivalent tier from another family.** A quota-blocked reviewer is replaced by a reviewer of comparable strength from a family that is still cross-family to the *executor* — never by whatever engine happens to be free. A blocked planner is replaced by another family's planner tier, not by dropping to the executor's own model.
2. **Do not silently downgrade the role.** If no equivalent tier exists, say so and let the weaker substitution be a stated decision; a plan authored at a lower tier than the doctrine requires invalidates the luna contract above.
3. **Last resort: an unbiased native subagent with clear context.** When no external family is reachable, dispatch a native subagent spawned fresh — no conversation history, briefed against the ground-truth artifacts rather than the supervisor's digest. A same-family reviewer with clean context still catches real defects; a same-family reviewer carrying the author's context catches almost nothing, because it inherits both the blindspots and the framing.
4. **Record the substitution.** Report which engine actually ran, so downstream cross-family classification stays accurate — a review that fell back to native Anthropic is Anthropic review, whatever the plan said.

Distinguish the failure kinds before substituting: a retryable capacity error (`resource_exhausted`, rate limit) means the engine returns later and the work can also be queued; an entitlement or auth error means the roster entry itself is wrong and should be fixed here rather than routed around every run.

## Assignment table

| Work | Engine |
| --- | --- |
| General orchestration (supervisor seat) | Opus 5 |
| Planning — Anthropic side | Fable 5 (medium–high); `deep-reasoner` / `Plan` natively |
| Planning — codex side | `sol(medium)` codex pane |
| Execution — Anthropic side | Opus 5 (xhigh) |
| Execution of an exact plan — codex side | `luna(max)` codex pane, plan authored by sol or better |
| Execution involving UI design or frontend | `sol(high)` or `sol(xhigh)` codex pane — never luna |
| High-risk, complex, or exploratory execution | sol at the fitting effort — never luna |
| Defined repetitive subagent (search, bulk mechanical edits) | native Sonnet subagent, or a `luna(max)` codex pane |
| Wide parallel execution (peers, never a cascade) | codex panes, one level deep, each with its own exact plan |
| Deep review, design convergence, hard problems | `sol(xhigh)` codex pane |
| Review or execution, fourth weight family | Kimi K3 Max — `devin --model <slug>` when it validates, else `cursor-agent --model kimi-k3-max` |
| Adversarial review / red-team pass (final) | `claudex` (sol xhigh default, max on request, subagents forbidden), or a `codex … max` pane |
| Opus-class standalone fresh eyes / second opinion | grok pane (`grok-build`) — never for Foxway |
| Security/privacy/auth/abuse review | `security-reviewer` (native) |
| Adversarial critique when externals unavailable | `adversarial-reviewer` (Opus, native) |

## Working rules

- **Plan and execution are separate seats.** The planner is always at least as strong as the executor, and the executor's brief carries the plan, not the goal. This is what makes a cheap executor safe; it is not a cost optimization to skip when you are in a hurry.
- A cheap executor's silence is not agreement: require it to report every point where the plan under-determined the work, and treat that report as a defect list for the plan, not for the executor.
- High-stakes decisions: task `sol(max)` and grok (and/or Opus `adversarial-reviewer`) on the same problem in parallel, blind to each other's answers, then synthesize the best of all.
- Trust but verify: executor self-reports overclaim. An independent exhaustive review against the originals gates acceptance of any large delegated work; the supervisor's spot-checks are the fast pass, never the gate.
- Cleanup is part of done: when a task finishes, close the panes, worktrees, watches, and scratch artifacts you created (never ones you didn't) — transport specifics are the `herdr` skill's hard rules.
