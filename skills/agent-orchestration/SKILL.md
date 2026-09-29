---
name: agent-orchestration
description: "Rules for spreading work across other models and harnesses (Codex, Cursor, Herdr panes). Use when the user asks for other agents or models, or a rate limit forces a switch."
---

# Agent orchestration

Cross-agent work is optional. Use it when the user asks for it, names other
models or agents, or reports a rate limit on one of them. Otherwise suggest it
and let the user decide.

- Rate limits differ per harness and account. If one agent is rate-limited,
  move the task to another permitted route with the same capability, and tell
  the user. Distinguish a rate limit from an auth or entitlement failure first.

## Codex models

- Default: `gpt-6-astra` for planning, coding, UI, debugging, and review. `gpt-5.6-sol` is an alternative when selected.
- `gpt-5.6-luna` at `max` only when all of these are true: a stronger model wrote an exact plan, the task is simple and low risk, and the brief tells Luna to report gaps. Luna must not plan, improvise, or sub-delegate.
- Never Terra. Use `ultra` only with user approval. Keep the chosen effort. Keep workflow pins (such as the `herdr-goal` Luna verifier).
- Verify model IDs and effort in the live CLI before you switch. Model prompting guide: https://developers.openai.com/api/docs/guides/latest-model

## Vendor boundaries (Foxway)

- Never use grok/xAI, droid/Factory, or devin/Cognition for Foxway work or data. This includes reviews and one-shot queries, whatever model they route.
- Cursor is approved: Foxway-bound Kimi goes through `cursor-agent`. Hermes is unapproved for Foxway until the owner rules on it.
- Restate all three bans in every Foxway brief.

## Harnesses

| Harness | Rule |
| --- | --- |
| Codex | `codex -m <model> -c model_reasoning_effort=<effort>`. Set the model at launch; the in-session picker can change shared config. |
| Hermes | Personal GPT/Kimi work when `command -v hermes` succeeds and live help confirms the model. Not for workflows that need Codex session identity. |
| Claude Code | Sonnet 5.5 (`sonnet`): the default for execution, fan-out, search, and tests. Opus 5.5 at `medium` effort: adversarial review, deep reasoning, and security. Fable: planning, when a brief names it. Never Haiku. Never an OpenAI ID in a Claude model field. |
| claudex | Only for an explicitly selected final adversarial pass. Verify the actual proxied model. Forbid subagents. |
| Grok | Personal review only. Discover models with `grok models`. |
| Cursor | `cursor-agent`, IDs from `--list-models`, quote parameterized IDs. The `agent` alias is not necessarily Cursor. Do not overwrite local audit wrappers. |
| Devin | Personal Kimi work when the CLI accepts the slug; otherwise Cursor. The catalog can be ahead of the validator. |
| Droid | DeepSeek and Qwen roles only. Resolve custom IDs from safe metadata; never dump settings (they hold keys). `droid exec -m <custom-id>`; interactive launch uses its own picker. For long runs use an interactive pane, because `droid exec` buffers output and a long run looks wedged. |

## Reviews

- Pick the reviewer from a different model family than the executor. Astra, Sol, and Luna are all OpenAI.
- If no other family is available, use a fresh-context reviewer and report the limit.
- Reviewer brief: ground-truth artifacts first (spec, originals, raw traces), never only your digest. Give no author, stakes, or hoped-for verdict. Allow a clean verdict and ask for its coverage. Every finding needs path/line/repro. Every pass needs the check that proved it.
- Never brief "make the tests pass". Give an observable outcome, a planted
  failing case, and a line on what a pass does not prove. A clean verdict names
  what it checked, in proportion to the scope. Agents that share one source or premise
  count as one confirmation.

## Delegation

- One level only: each agent owns a complete task and must not sub-delegate.
- Serialize shared interfaces, migrations, and overlapping writes. Give parallel writers isolated worktrees.
- Keep Git, publishing, and external side effects with the supervisor unless delegated.
- A wait timeout means keep waiting. Intervene only on a crash, a stall, or a block for input.
- If a model is unavailable, report it. Astra can fall back to Sol. Moving off one agent's rate limit is fine; cycling models to evade an account-wide quota or a policy denial is not.
- Record the model, effort, harness, and any substitution that actually ran.
- Before you accept an implementer's "done", re-run its cited commands at
  HEAD and diff for touched tests or gates, new mocks, and regenerated
  goldens. For a search or research report, spot-check the cited paths.
- Pane transport: `herdr`. Durable callbacks and joins: `herdr-watcher`.
