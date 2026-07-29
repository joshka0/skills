# Engine selection

Use this mode to pick the executor and reviewer engines — model family, harness, and effort — before writing any packet. Transport belongs to `herdr`; packet discipline belongs to the dispatch mode you pair this with.

## Cross-family first

Different weights do not share blindspots; same-family review inherits the same biases and misses the same errors. For adversarial review, fresh eyes, independent verification, or high-stakes synthesis, pick the reviewer from a different model family than the **executor** — not merely different from the supervisor. OpenAI-executed work gets xAI or Anthropic review; Anthropic work gets OpenAI or xAI review; xAI work gets OpenAI or Anthropic review. Fall back to same-family subagents only when external engines are unavailable or the task is trivial. Framing independence (briefing reviewers against ground truth, not the supervisor's digest) is the `collaborate` mode's contract — read it for any review dispatch.

**Foxway (standing user directive):** never use grok or any xAI model for Foxway work or data — no panes, no subagents, no one-shot queries. Cross-family review of Anthropic-authored Foxway work routes through codex; OpenAI-authored Foxway work gets Anthropic review. Restate this prohibition explicitly in every brief handed to another agent for a Foxway task — downstream agents will otherwise follow the general grok guidance on their own.

## Engine roster

Pack constraint: the model IDs and effort tiers below are house tiering decisions the CLIs cannot express; they are volatile. Before dispatch, confirm the model still exists from the live surface (`codex` model picker or config, `grok models`) rather than trusting these literals.

### Codex — `gpt-5.6-sol` is the model; effort is the dial

- `sol(medium)` — the daily driver for delegated coding work and scoped subagents. Do not reach past it out of habit.
- `sol(xhigh)` — really hard problems: deep review, design convergence, gnarly debugging.
- `sol(max)` — the ceiling: adversarial passes and highest-stakes synthesis. `ultra` sits above max and is never used without asking the user.
- `gpt-5.6-luna` — very defined, repetitive work any model could do. If the task needs judgment, it is not a luna task — move it to sol. Luna's effort is the supervisor's explicit speed-vs-intelligence trade: `low`/`medium` when the task is genuinely mechanical and a wrong answer is obvious on sight; `high`/`xhigh` when a well-defined task has a subtle edge where a silent wrong answer is expensive; default `xhigh` when unsure, and drop effort deliberately, not by accident.

Escalate by effort, not by model. Launch: `codex -m gpt-5.6-sol -c model_reasoning_effort=<tier>` in a herdr pane. Effort tiers ascending: `low`, `medium`, `high`, `xhigh`, `max`, `ultra` (config-token only). Gotcha: a `/model` picker change inside any codex session rewrites `${CODEX_HOME:-$HOME/.codex}/config.toml` globally.

**Fan-out cap.** Codex agents are capped at one level of delegation (contract in `${CODEX_HOME:-$HOME/.codex}/AGENTS.md`, versioned at `home/codex/AGENTS.md`): a subagent finishes its whole task without sub-delegating. Decompose work into complete, self-contained units before handing it to a codex pane; a fan-out pane may spawn one wide layer of peers, never a cascade. Restate the no-sub-delegation rule in every codex brief, and never brief one with "explore this and delegate what you find."

### claudex — red-team only

`claudex` runs the Claude Code harness on sol via CLIProxyAPI (requires the cliproxyapi brew service). In this harness sol over-spawns subagents on normal work, so claudex is scoped to one job: a final adversarial/refutation pass with full Claude Code tooling, cross-family to Anthropic authorship. Every claudex prompt must forbid subagents — state explicitly: "Do not spawn subagents or use the Task/Agent tool; do all analysis yourself, directly — this is a single self-contained pass." A red-team has nothing to decompose, so this costs nothing and removes the only failure mode. Default effort `sol(xhigh)`; use `sol(max)` only when the user asks — user guidance on effort takes precedence. If the proxy is down, prefer a raw `codex … max` pane for the red-team instead. All other delegation to Codex uses raw `codex` panes, never claudex.

### Grok — standalone opus-class fresh eyes

Launch `grok`; the default `grok-build` model is the current strong tier (there is no version-numbered literal ID — `grok models` lists what exists). Effort via `--reasoning-effort <tier>` (alias `--effort`) or `/model grok-build [tier]` in the TUI. Prefer grok when you want an opus-class **standalone pane agent** — fresh eyes, second opinions, independent review: comparable capability, fast, and a third weight family beyond Anthropic and OpenAI. Opus-class *subagents* resolve through a sol codex pane or native Anthropic agents instead. Subject to the Foxway prohibition above.

### Devin CLI — Cognition-hosted routing, the only Kimi path here

`devin` (installed via `curl -fsSL https://cli.devin.ai/install.sh | bash`; credentials at `~/.local/share/devin/credentials.toml`). Auth is `devin auth login` — a browser flow the user must run; use `--force-manual-token-flow` over SSH. Pick the model with `--model <MODEL>` or the `DEVIN_MODEL` env var; `/model` switches in-session (aliases `opus`, `sonnet`, `swe`, `codex`, `gemini`).

Cognition routes several vendors' models, including open-weight families such as Kimi, DeepSeek, and GLM. There is **no BYOK and no custom base URL** — the checkpoint, routing, and ACU billing are Cognition's, so a Devin-run Kimi is not the same artifact as Moonshot's published weights.

Two verified traps. `--model` accepts only **family slugs** (`kimi-k2.7`, `opus`, `glm-5.2`), not the per-effort UIDs that `devin models list` prints — passing `kimi-k3-max` errors out. Worse, the two disagree on what exists: `devin models list` advertises a `kimi-k3` family, but the CLI's own validator rejects it and omits it from the error list, so the catalog service is ahead of the compiled binary. Trust the list in the `Unknown model:` error, not the catalog, and confirm any slug by launching once.

The current account is on the **Free plan**, which selects Kimi fine but fails the actual request with `Permission denied: an internal error occurred`. Treat Devin as unusable for real Kimi work until the plan is upgraded; use the Cursor pane below instead.

Routing is not authorship. When picking a cross-family reviewer, classify a Devin task by the **model it ran**, not by "Devin" — Devin-on-Opus is Anthropic work and needs OpenAI or xAI review.

### Cursor Agent CLI — the working Kimi pane

`cursor-agent` runs Cursor's catalog, which on the Foxway team account includes Kimi: `kimi-k3-max`, `kimi-k3-low`, and `kimi-k2.7-code`. Verified live — `cursor-agent --model kimi-k3-max` launches, reports "Kimi K3 Max" in its status bar, streams Kimi-style reasoning, and self-identifies as "Kimi, developed by Moonshot AI". This is the engine to reach for when the task calls for Kimi.

`--list-models` is authoritative and takes model UIDs directly; parameterized overrides use bracket syntax (`--model 'claude-opus-4-8[context=1m,effort=high]'`). The catalog is account-gated, so an empty list means an entitlement or login problem, not a client bug — authenticate before concluding a model is missing.

Routing is still not BYOK: Cursor serves these models through its own backend, so a Cursor-run Kimi is Cursor's deployment, not your Moonshot key. Cursor's custom-API-key feature is IDE-scoped and covers five named providers; the CLI's `--api-key`/`CURSOR_API_KEY` authenticate a Cursor account, not a model provider. Do not invent a base-URL flag for it.

Two local hazards. The upstream installer's primary binary name is `agent`, but on this machine **`agent` is a wrapper pointing at grok** — letting Cursor's installer reclaim that name silently repoints grok invocations at Cursor, and would route Foxway work to a prohibited engine. The installer also hard-deletes `~/.local/bin/agent` and `~/.local/bin/cursor-agent`, destroying the local audit wrappers; back both up before any update and restore them afterward, repointing `cursor-agent.real-link` at the new version directory.

### Claude Code native subagents — fallback and in-context work

Reasoning-heavy phases → `deep-reasoner` (Fable). Adversarial critique when externals are unavailable → `adversarial-reviewer` (Opus). Security, privacy, auth, secret-handling, browser-automation, or abuse-case review → `security-reviewer` (Fable). Mechanical scoped work → the explicit Sonnet agents (`fast-worker`, `sonnet-generalist`, `sonnet-code-reviewer`, `sonnet-researcher`, `sonnet-test-worker`). Never use Haiku; the smallest acceptable subagent is Sonnet. Pass an explicit model rather than relying on inheritance unless inheritance is intentional.

## Assignment table

| Work | Engine |
| --- | --- |
| Defined repetitive subagent (search, bulk mechanical edits) | native Sonnet subagent, or a `luna(xhigh)` codex pane |
| Scoped subagent (research, focused implementation) | `sol(medium)` codex pane |
| Substantive single delegated task | `sol(medium)` codex pane; raise to `xhigh` if genuinely hard |
| Wide parallel execution (peers, never a cascade) | sol codex panes, one level deep |
| Deep review, design convergence, hard problems | `sol(xhigh)` codex pane |
| Adversarial review / red-team pass (final) | `claudex` (sol xhigh default, max on request, subagents forbidden), or a `codex … max` pane |
| Opus-class standalone fresh eyes / second opinion | grok pane (`grok-build`) — never for Foxway |
| Kimi pane (fourth weight family, open-weight lineage) | `cursor-agent --model kimi-k3-max` — verified working; never rename its binary to `agent` |
| Devin-routed open-weight pane (Kimi/DeepSeek/GLM) | `devin --model <family-slug>` — blocked on Free plan; family slugs only |
| Security/privacy/auth/abuse review | `security-reviewer` (Fable, native) |
| Adversarial critique when externals unavailable | `adversarial-reviewer` (Opus, native) |

## Working rules

- High-stakes decisions: task `sol(max)` and grok (and/or Opus `adversarial-reviewer`) on the same problem in parallel, blind to each other's answers, then synthesize the best of all.
- Trust but verify: executor self-reports overclaim. An independent exhaustive review against the originals gates acceptance of any large delegated work; the supervisor's spot-checks are the fast pass, never the gate.
- Cleanup is part of done: when a task finishes, close the panes, worktrees, watches, and scratch artifacts you created (never ones you didn't) — transport specifics are the `herdr` skill's hard rules.
