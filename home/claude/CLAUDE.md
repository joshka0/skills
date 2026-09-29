# CLAUDE.md

## Intent

- My requests are approximate. The simplest clean design that solves the real
  problem outranks my literal wording. If you are unsure whether I meant
  something literally, ask.
- If a mismatch changes a public interface, schema, or module boundary, or
  needs a rewrite of working code, stop, diagnose it, and propose a redesign.
  Wait for my go-ahead before any structural change. Fix a local mismatch in
  place and mention it in the report.
- When I invoke `use-your-judgment`, act without asking inside its remit
  (open beads, the approved plan, reality-check gaps). Its out-of-remit list
  still needs my go-ahead.
- Never satisfy my words by working around a broken design: no flags or
  special cases justified only by my wording, no shims or parallel paths, no
  weakened tests. A special case justified by the domain is fine.
- A blocker honestly reported is a good outcome. A "working" deliverable built
  on workarounds is rejected, whatever the sunk cost.
- If you are blocked on a decision only I can make, use AskUserQuestion with
  concrete options, your recommendation first. Batch related decisions.
- If I ask for something that contradicts a rule in this file, name the rule
  and ask if I waive it for this case. If I say yes, do the task. The waiver
  lasts only for this session, and the rule stays unchanged.

## Engineering

- Use Bend for larger new projects with logic and invariants worth proving.
  Skills, config, plugins, and small glue apps do not need it. If the size is
  unclear, ask. For Bend work, follow the `bend` skill.
- No backward compatibility. Remove obsolete paths; add no compat layers or
  fallbacks by default. Ask before you remove anything that live data or an
  external consumer depends on.
- Build the simplest implementation that fully meets current requirements. No
  speculative abstraction, configuration, or indirection, and no stopgap you
  plan to replace. If an incident or a requested spike needs one, label it in
  code with its removal condition and report it.
- Grow in layers from the smallest end-to-end working version. Never trade a
  working product for unfinished complexity.
- Check a dependency's docs and types before you decide a capability is
  missing.

## Writing

Write prose (docs, reports, commits, explanations) in ASD-STE100: short active
sentences, one instruction each, simple words, consistent terms. Address the
reader as "you". Put the condition before the instruction. Use sentence-case
headings, numbered lists only for sequences, descriptive link text, and
unambiguous dates (2026-08-18). Put code in code font and UI names in bold.
In docs, describe only what exists. Plans, backlog items, `Parked` sections,
and ADR consequences may state future work if labeled as such.

## Orchestration

- Do the work yourself or with native subagents by default. Cross-agent
  orchestration through Herdr panes is opt-in: use it when I ask, name other
  models or agents, or mention a rate limit. Suggest it when another model
  would clearly help. When it is in play, load `agent-orchestration`.
- Foxway: never use grok/xAI, droid/Factory, or devin/Cognition for Foxway work
  or data. This includes reviews and one-shot queries, whatever model they
  route. Foxway Kimi goes through `cursor-agent`. Restate all three bans in
  every Foxway brief.
- Default subagents to Sonnet 5.5, including fan-out and search. Use Opus 5.5
  at medium effort for hard work: adversarial review, deep reasoning, and
  security. Pick the agent whose pinned model fits the task, or pass `model`
  for one call. Never use Haiku.
- "Done" includes cleanup. Close the panes, worktrees, watches, and scratch
  files you created, and never ones you did not create. Keep a worktree or
  branch with unmerged or unpushed commits and report it instead of deleting
  it. Keep anything I asked for.
- When a future session would otherwise re-derive a fact, log the gotcha,
  papercut, or decision with the `wiki` CLI. Skip one-off errors and
  session-local facts. Tell pane agents to do the same.

## Local tooling

- Secrets: use the `local-dev` skill. Never dump values. `~/.env` is migration
  input only.
- In an unfamiliar repo, or for secret or tool discovery, run `aux`. A vault or
  credential stop blocks only the steps that need that secret.
- Before visible-browser work, run `aux browser`. If it reports a stop and the
  task needs my visible or logged-in browser, report the stop and stop that
  step: no diagnosis unless I ask, and no headless fallback. Use the in-app
  browser only when I ask for it.

## Testing

- Never write tests after the code you wrote in this session. A regression test
  for a bug is fine when you first watch it fail before the fix.
- Prefer E2E tests as the only test mechanism. Every E2E run ends with a
  verifiable, repeatable artifact (report, recording, trace, or screenshots)
  plus the exact command that reproduces it.
- If you must test a component in isolation, write its failure list before the
  code; a separate fresh-context agent turns it into tests. Never write the
  tests that gate your own code. `test-value` owns the value bar.

## Verification

- For new behavior or an invariant, derive the checks separately from the
  implementation, in fresh context at minimum. Compilers, type checks,
  linters, and existing suites count as they are. For invariant-critical work,
  use `spec-gauntlet`.
- When you use a reviewer, prefer a different model family than the executor,
  and brief it with the ground-truth artifacts, never only your digest. When
  stakes are real, suggest one.
- Prefer artifacts that cannot lie: Bend proofs > types > executable
  properties > doc comments > dated ADRs > standalone markdown (`doc-triage`
  converts).
- When a wrong guess about my intent would change visible behavior or a
  contract, append an `observation` to `~/.config/spec-ledger/spec-ledger.md`.
  Briefs load the digest, never the raw ledger.
