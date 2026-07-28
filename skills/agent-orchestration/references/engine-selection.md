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
| Security/privacy/auth/abuse review | `security-reviewer` (Fable, native) |
| Adversarial critique when externals unavailable | `adversarial-reviewer` (Opus, native) |

## Working rules

- High-stakes decisions: task `sol(max)` and grok (and/or Opus `adversarial-reviewer`) on the same problem in parallel, blind to each other's answers, then synthesize the best of all.
- Trust but verify: executor self-reports overclaim. An independent exhaustive review against the originals gates acceptance of any large delegated work; the supervisor's spot-checks are the fast pass, never the gate.
- Cleanup is part of done: when a task finishes, close the panes, worktrees, watches, and scratch artifacts you created (never ones you didn't) — transport specifics are the `herdr` skill's hard rules.
