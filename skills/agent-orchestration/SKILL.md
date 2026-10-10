---
name: agent-orchestration
description: "Rules for spreading work across other models and harnesses (pi, Codex, opencode, Claude accounts, Herdr panes), and the model-role registry. Use for delegation, model choice, or a rate limit."
---

# Agent orchestration

## Autonomy

- You need no approval to start cross-agent work when it clearly helps:
  independent parallel tasks, a cross-family review, or a rate limit. You also
  need no approval to pick a harness, model, or effort (`ultra` included), to
  launch or close your own panes and worktrees, or to send briefs and
  follow-ups. Record what ran and report it.
- Never stop the whole run for a decision. If a decision is out of your remit
  (a structural change, an external side effect such as push, deploy, send,
  or publish, destructive Git, or removal of data that live consumers depend
  on), park it. Record the decision and your recommendation, continue all work
  that does not depend on it, and ask the parked decisions in one batch at the
  end.
- If you can answer a question from the code, live help, or `models.md`, do not
  ask it.
- Rate limits differ per harness and account. Distinguish a rate limit from an
  auth or entitlement failure first. If one route is rate-limited, move the
  task to another permitted route with the same capability.

## Model choice

- Pick the model line and route from `models.md`. It names lines (Sol, Luna,
  Kimi), never versions.
- Before you launch, run `scripts/list-models`. It is read-only and prints each
  installed harness's live catalog. Pick the newest ID of the chosen line, and
  verify the ID and effort in the live CLI.
- Never write a model version into a skill, a brief template, or a home config.
  Use a line name, a Claude alias (`sonnet`, `opus`), or the CLI default.
- If a new line appears in a catalog, or a role has no good fit, rank the
  candidates by vendor catalog order, description, and price. If the rank is
  still unclear, search with Exa (`exa` MCP; else a web search) for benchmarks
  and pricing. Propose the role change to the user; do not edit `models.md`
  alone.
- Boy scout: if you see a hardcoded model version in another skill or in a
  home config, replace it with a line name or alias and report it. Keep a workflow
  pin that its tool enforces, such as the `herdr-goal` verifier. Report, but
  never edit, a settings file that holds keys.
- Codex prompting guide: https://developers.openai.com/api/docs/guides/latest-model

## Vendor boundaries (Foxway)

- Never use grok/xAI, droid/Factory, or devin/Cognition for Foxway work or data. This includes reviews and one-shot queries, whatever model they route.
- Cursor is approved: Foxway-bound Kimi goes through `cursor-agent`. Hermes is unapproved for Foxway until the owner rules on it.
- Restate all three bans in every Foxway brief.

## Harness quirks

| Harness | Rule |
| --- | --- |
| pi | Preferred route for GPT. Set `--model openai/<id>` and `--thinking` at launch. |
| Codex | Use when a workflow needs a Codex session. Set the model at launch; the in-session picker can change shared config. |
| Claude Code | Never an OpenAI ID in a Claude model field. Choose the account with `CLAUDE_CONFIG_DIR`. |
| claudex | Only for an explicitly selected final adversarial pass. Verify the actual proxied model. Forbid subagents. |
| Hermes | Personal GPT/Kimi work when `command -v hermes` succeeds and live help confirms the model. Not for workflows that need a Codex session. |
| Cursor | Quote parameterized IDs. The `agent` alias is not necessarily Cursor. Do not overwrite local audit wrappers. |
| Devin | The catalog can be ahead of the validator. If the CLI rejects a slug, use Cursor. |
| Droid | DeepSeek and Qwen roles only. Never dump settings (they hold keys). Choose the model in its interactive picker; it has no model flag. |

## Reviews

- Pick the reviewer from a different model family than the executor. Astra, Sol, and Luna are all OpenAI.
- If no other family is available, use a fresh-context reviewer and report the limit.
- Reviewer brief: ground-truth artifacts first (spec, originals, raw traces), never only your digest. Give no author, stakes, or hoped-for verdict. Allow a clean verdict and ask for its coverage. Every finding needs path/line/repro. Every pass needs the check that proved it.
- Never brief "make the tests pass". Give an observable outcome, a planted
  failing case, and a line on what a pass does not prove. A clean verdict names
  what it checked, in proportion to the scope. Agents that share one source or premise
  count as one confirmation.
- When stakes are real, use two blind reviewers from different families.
  Keep each verdict and its notes from the other reviewer until both are in.
  On a split, a third reviewer decides, or you decide from both notes. Never
  average the verdicts. Give each reviewer its own worktree, and make sure it
  cannot read the other's notes or session transcripts.
- Accept the exact commit that was reviewed. If the branch moved after the
  review, review the new commit.
- To test whether an artifact conveys its intent without its explanations,
  use `cold-read`.

## Delegation

- One level only: each agent owns a complete task and must not sub-delegate.
- Serialize shared interfaces, migrations, and overlapping writes. Give parallel writers isolated worktrees.
- Freeze the acceptance check before you dispatch, and name it in the brief.
  An implementer never writes or changes the check that gates its own work;
  a separate agent writes it.
- Bend workers share one CPU budget. Follow the `bend` skill's caps in every Bend brief.
- Keep Git, publishing, and external side effects with the supervisor unless the brief delegates them.
- A brief grants the worker the same autonomy: it parks out-of-remit decisions in its report and keeps working.
- A wait timeout means keep waiting. Intervene only on a crash, a stall, or a block for input.
- If a model is unavailable, use its alternative in `models.md` and report the substitution. Moving off one agent's rate limit is fine; cycling models to evade an account-wide quota or a policy denial is not.
- Record the model, effort, harness, and any substitution that actually ran.
- Before you accept an implementer's "done", re-run its cited commands at
  HEAD and diff for touched tests or gates, new mocks, and regenerated
  goldens. For a search or research report, spot-check the cited paths.
- Launch each child agent as an interactive TUI in a visible Herdr pane, never headless (`herdr`, "Split, label, launch"). Durable callbacks and joins: `herdr-watcher`.
