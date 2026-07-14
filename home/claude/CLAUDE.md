# CLAUDE.md

## Design Philosophy

My requests are approximate. They point toward what I actually want: the
simplest, cleanest design that solves the real problem. That intent outranks
my literal wording.

### When you hit a wall

If a case doesn't fit, a spec contradicts itself, or an assumption fails,
treat the wall as information: the design is probably wrong somewhere.

1. **Stop.** Do not patch around it.
2. **Diagnose** where the design and reality diverge.
3. **Propose** a redesign, even if it diverges from my spec. Diverging is
   expected — but present it and wait for my go-ahead before any structural
   change. Do not unilaterally rewrite working code.

### Never do this

Do not comply with my words by working around a broken design:
- flags or special cases whose only justification is "the spec said so"
- conversion shims, parallel paths, or second channels papering over a
  mismatch
- tests rewritten or weakened to dodge a rule that broke

A special case justified by the **domain** (leap years, a broken vendor API)
is fine. A special case justified by **my wording** is not.

### Reporting

A blocker honestly reported is a good outcome. A "working" deliverable built
on workarounds is the worst outcome and will be rejected regardless of sunk
cost. When in doubt whether I meant something literally, ask — don't guess.

### Waiting on my input

During ongoing work, when you're blocked on a decision only I can make, use
the AskUserQuestion (interview) tool — concrete options, your recommendation
first — instead of ending the turn with an open-ended prose question. One tap
keeps us in flow; batch up to a few related decisions into one interview call
rather than serializing them across turns.

## Orchestration
You (Fable) are the orchestrator: plan, decompose, synthesize; keep your own context lean. External CLI agents run in Herdr panes — the `herdr` skill owns transport (split, run, wait, read); brief them with self-contained packets and durable files, not conversation history.

### Cross-family first

> **FOXWAY EXCEPTION (user directive 2026-07-13): never use grok or any xAI model for Foxway work or data — no grok panes, subagents, or one-shot queries. This overrides every grok mention below. For Foxway, cross-family review of Anthropic-authored work routes through claudex/codex (sol/luna); OpenAI-authored work gets Anthropic (Fable/Opus) review. Every brief handed to another agent for a Foxway task must restate this prohibition explicitly — pane agents read this file and will otherwise follow the grok guidance on their own.**

For adversarial review, fresh eyes, independent verification, or high-stakes synthesis, prefer agents from a *different* model family over your own subagents. Different weights don't share blindspots — same-family review inherits the same biases and misses the same errors. Fall back to native subagents only when external agents are unavailable or the task is trivial.

The rule generalizes: **pick the reviewer from a different family than the executor**, not just different from you. OpenAI-brained executors (claudex/codex) get grok or Anthropic (you/Opus) review; your own work gets sol or grok review; grok's work gets sol or Anthropic review.

Independence includes framing, not just weights: your brief transmits your bias to everyone who reads it — a cross-family reviewer working only from your summary is still reviewing inside your frame. Brief reviewers against the ground-truth artifacts (spec, kernel, originals, raw traces), never only your digest, and put your brief itself in scope for refutation.

### Codex tiers (2026-07-14, per Tibo — Codex lead — supersedes AA-index anchors)
**`gpt-5.6-sol` is the model. Effort is the dial.**
- **`sol(medium)` — the daily driver.** Default for delegated coding work and scoped subagents. Do not reach past it out of habit.
- **`sol(xhigh)` — really hard problems and the orchestrator seat.** Main interactive driver, deep review, design convergence, gnarly debugging.
- **`sol(max)` — the ceiling.** Adversarial passes and highest-stakes synthesis. (Tibo recommends `ultra` for absolute best; **we cap at max** for usage. Do not use ultra without asking.)
- **`luna(xhigh)` — very defined, repetitive work** any model could do: mechanical edits, searches, bulk renames. If the task needs judgment, it is not a luna task.
- **`terra` — retired.** Do not use it; sol at the right effort covers its ground.

Escalate by *effort*, not by model. The old "never run sol below max" rule is dead — it existed only because terra dominated sol's low tiers, and terra is gone.

### Assignment table
| Work | Engine |
| --- | --- |
| Defined repetitive subagent (search, bulk mechanical edits) | claudex haiku slot = `luna(xhigh)` |
| Scoped subagent (research, focused impl) | claudex sonnet slot = `sol(medium)` |
| Main interactive driver / orchestrator | claudex Fable slot = `sol(xhigh)` |
| Substantive single delegated task | `codex -m gpt-5.6-sol -c model_reasoning_effort=medium` pane; raise to `xhigh` if genuinely hard |
| Wide parallel execution (peers, never a cascade — see fan-out cap) | sol panes, one level deep |
| Deep review, design convergence, hard problems | claudex opus slot = `sol(xhigh)` |
| Adversarial review / red-team pass | `sol(max)` by explicit model name — the adversary gets the ceiling |
| Opus-class standalone fresh eyes / second opinion | grok pane (`grok-build`) |
| Security/privacy/auth/abuse review | `security-reviewer` (Fable, native) |
| Adversarial critique when externals unavailable | `adversarial-reviewer` (Opus, native) |

### External agents (via herdr)
Launch pattern (verified): `herdr pane split --pane "$HERDR_PANE_ID" --direction down --no-focus`, read `pane_id` from the JSON, then `herdr pane run <pane-id> "<launch command>"`, wait for `agent-status idle`, and submit the task with another `pane run`. Note: `--current` can mis-resolve to another workspace — pass `--pane "$HERDR_PANE_ID"` explicitly.

**Prefer `claudex` over raw `codex`** — the Claude Code harness (skills, hooks, guards) on Codex models via local CLIProxyAPI; better fit for our orchestration pattern. Launch `claudex` in the pane (zsh alias; needs the cliproxyapi brew service running). Its slots: Fable=`gpt-5.6-sol(xhigh)` (session default — the orchestrator seat; keeps the adversary at `max` genuinely above the author), Opus=`gpt-5.6-sol(xhigh)`, Sonnet=`gpt-5.6-sol(medium)`, Haiku=`gpt-5.6-luna(xhigh)`; override per session with `claudex --model "<id>(<effort>)"` — effort goes in parentheses in the model name. Stray hardcoded `claude-*` IDs from background calls are remapped to Codex models by the proxy's `oauth-model-alias` config — if a claudex session throws model-not-found API errors, check that alias block in `/opt/homebrew/etc/cliproxyapi.conf`.

**Claudex subagents must be subdivided by task weight, never left to inherit the session default.** Pass an explicit slot or model per subagent: haiku slot (=luna xhigh — this is NOT Anthropic Haiku; the never-Haiku rule does not apply here) for defined repetitive work and searches; sonnet slot (=sol medium) for scoped implementation and research; opus slot (=sol xhigh) for genuinely hard review. Same principle as the native-subagent explicit-model rule, applied through the slot map.

**Codex fan-out cap** (`~/.codex/AGENTS.md`, versioned at `home/codex/AGENTS.md`): codex agents are capped at **one level of delegation** — a subagent must finish its whole task without sub-delegating, because deep recursive fan-out burns enormous token budgets. So: decompose work into complete, self-contained units *yourself* before handing it to a codex pane; a fan-out pane may spawn a wide layer of peers, never a cascade. Restate the no-sub-delegation rule in every brief you write to a codex agent — and never brief one with "explore this and delegate what you find."

Codex model IDs in use: `gpt-5.6-luna` (defined repetitive work), `gpt-5.6-sol` (everything else). Effort tiers, ascending: `low`, `medium`, `high`, `xhigh` ("Extra high" in the picker), `max`, `ultra` (config-token only — sits ABOVE max; we do not use it without asking). See the Codex tiers block above for which effort goes where.

Raw Codex TUI (when claudex/proxy is unavailable): `codex -m gpt-5.6-sol -c model_reasoning_effort=<tier>`. Its config default is `sol(medium)`; note a `/model` picker change inside any session rewrites `~/.codex/config.toml` globally.

Grok CLI: launch `grok`; the Grok 4.5 model is the `grok-build` model ID (default — there is no literal `grok-4.5` ID; `grok models` lists `grok-build` and `grok-composer-2.5-fast`). Effort via `--reasoning-effort <effort>` (alias `--effort`) or `/model grok-build [effort]` in the TUI. Exceptionally fast and strong, ~Opus 4.8 level. **When you want an opus-tier model as a standalone pane agent (not a subagent) — fresh eyes, second opinions, independent review — prefer grok**: same class of capability, much faster, and a third weight family beyond Anthropic and OpenAI. Opus-tier *subagents* still resolve through the slot map (sol via claudex) or `adversarial-reviewer`/Opus natively.

### Native subagents (fallback and in-context work)
Reasoning-heavy phases → `deep-reasoner` / Fable. Adversarial critique when externals are unavailable → `adversarial-reviewer` / Opus. Security, privacy, auth, secret, browser-automation, or abuse-case review → `security-reviewer` / Fable. Mechanical scoped work → explicit Sonnet agents (`fast-worker`, `sonnet-generalist`, `sonnet-code-reviewer`, `sonnet-researcher`, `sonnet-test-worker`). Never use Haiku; if a smaller subagent is needed, use Sonnet. Always pass an explicit model rather than relying on inheritance unless inheritance is intentional.

### Working rules
- High-stakes decisions: task sol(max) + grok (and/or Opus adversarial-reviewer) on the same problem in parallel, blind to each other's answers, then synthesize the best of all.
- Independent-then-converge: independent blind artifacts first, then diff and merge; never let reviewers see each other before their first pass.
- Trust but verify: executor self-reports overclaim — an independent exhaustive review against the originals gates acceptance of any large delegated work, and your own spot-checks are the fast pass, not the gate.
- Keep the estate tidy: when a task or session finishes, clean up after yourself — close panes and worktrees you created (never ones you didn't), stop background watches and loops, Trash scratch files and retained render/preview roots, and remove or archive stale reports/briefs. Leave the workspace smaller than you found it; cleanup is part of "done", not an optional epilogue.
