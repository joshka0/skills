# CLAUDE.md

## Intent

- My requests are approximate. The simplest clean design that solves the real
  problem outranks my literal wording. If you are unsure whether I meant
  something literally, ask.
- If a mismatch changes a public interface, schema, or module boundary, or
  needs a rewrite of working code, diagnose it and propose a redesign. Make no
  structural change without my go-ahead, but do not stop the run: park the
  decision with your recommendation, continue all work that does not depend
  on it, and ask the parked decisions in one batch at the end. Fix a local
  mismatch in place and mention it in the report.
- When I invoke `use-your-judgment`, act without asking inside its remit
  (open beads, the approved plan, reality-check gaps). Park its out-of-remit
  items the same way.
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

- Use Bend to prove logic worth proving in code of any language (TS, Rust,
  and others), as Lean for code. The proven Bend model is the oracle, and the
  native code passes differential tests against it. Skills, config, plugins,
  IO, and glue do not need it. If the value is unclear, ask. For Bend work,
  follow the `bend` skill, including its CPU budget: other agents run Bend on
  the same cores.
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
- CI pipelines are a bottleneck. If work would open several PRs in one repo,
  stack the related commits on one integration branch and open one PR. If
  related PRs are already open, `git merge` their branches into one
  integration branch, resolve the conflicts there, and run CI once on the
  result instead of rerunning each PR. Link the original PRs to it. Split out
  a PR only when that change must ship or roll back alone. Push when a batch
  is ready, not after each commit: each push can start a pipeline.

## Writing

Write prose (docs, reports, commits, explanations) in ASD-STE100: short active
sentences, one instruction each, simple words, consistent terms. Address the
reader as "you". Put the condition before the instruction. Use sentence-case
headings, numbered lists only for sequences, descriptive link text, and
unambiguous dates (2026-08-18). Put code in code font and UI names in bold.
In docs, describe only what exists. Plans, backlog items, `Parked` sections,
and ADR consequences may state future work if labeled as such.

## Reports

Trial since 2026-10-13. When a reply would carry an investigation result, a
review, a design, a comparison of options, or more than about 15 lines of
findings, write it as a summary with the `summarize` skill. End the reply
with the answer in two to four lines and the summary's short link on its own
line. Do not repeat the summary in the chat. When I must choose between
options that need that context, ask in the summary's `Needs you` callout;
my answers come back as a prompt that starts with `Answers from summary`.
Keep short answers, progress notes, and quick yes-or-no questions in the
chat.

## Orchestration

- Do the work yourself or with native subagents by default. Use
  cross-agent orchestration (Herdr panes, other harnesses) without asking
  when it clearly helps: parallel independent tasks, a cross-family review,
  or a rate limit. Load `agent-orchestration` for it; its `models.md` is the
  model registry.
- Foxway: never use grok/xAI, droid/Factory, or devin/Cognition for Foxway work
  or data. This includes reviews and one-shot queries, whatever model they
  route. Foxway Kimi goes through `cursor-agent`. Restate all three bans in
  every Foxway brief.
- Default subagents to `sonnet`, including fan-out and search. Use `opus`
  at medium effort for hard work: adversarial review, deep reasoning, and
  security. Pick the agent whose pinned model fits the task, or pass `model`
  for one call.
- "Done" includes cleanup. Close the panes, worktrees, watches, and scratch
  files you created, and never ones you did not create. Keep a worktree or
  branch with unmerged or unpushed commits and report it instead of deleting
  it. Keep anything I asked for.
- Memory: the fleet memory logs every agent's replies. End a reply with one
  memo line of at most 400 bytes when the turn settled a decision (also
  your restatement of an operator's answer), verified a result, found a
  failure and its cause, or opened or closed an item someone must return
  to. Other turns get no memo line. Put the memo as the last paragraph of
  the reply:
  `memo: decided <what> because <why>; done <what> (verified by <check>);
  failed <what>: <cause>; open <what>; ids <commit, branch <name>, /absolute/path, key, adr-NNNN>
  [[topic]]`
  Use only the labels that apply. Write `done` only for verified work;
  otherwise write `running`, `planned` or `blocked`. When a topic is
  superseded, write `retired <why>` with a link to that topic only. When
  your decision replaces an earlier memo item, add `supersedes <id>+1
  because <why>`, where `<id>+1` is the earlier memo's message address; when
  an item no longer applies, add `stale <id>+1: <why>`. Either one drops
  every decided and open item of that memo, so restate any that still
  hold. Close a finished item with `done` or `failed` and the same words,
  or with `done <id>+1`. When your turn settles an item that another
  session opened, close it too: find it with `mem topic <name>`, and write
  `done <id>+1` only if you settled every open item of that message, else
  `done` and its words. A memo here does not close an item of another
  repository; name that item in your reply. To keep the still-open items of an earlier message
  without restating them, write `open <id>+1`. A keep cannot reopen a
  closed item: restate that item in words. End your items with
  `closed rest` to close every other open item of this session, on every
  topic. A subagent report never holds `closed rest`. Write the memo in
  your final reply, after your last tool call. When the turn-end hook
  lists unsettled items, write the memo again that way. Add one to three
  `[[topic]]` links. Name a topic after the lasting thing the work
  changes (a component, feature, contract or decision area) as
  `<scope>-<thing>` in lowercase kebab. The scope is the project
  (`[[yada-room-kernel]]`, `[[praze-terms-consent]]`), or `fleet` for a
  thing that reaches outside one repository: the operator's preferences
  (`[[fleet-operator-preferences]]`; split into
  `fleet-operator-<area>` only when it grows), agent rules
  (`[[fleet-agent-rules]]`) or shared tools (`[[fleet-tooling]]`). Link
  a fleet topic beside the project topic when a project turn settles
  something general. Session indexes show only their own repository, so
  read a fleet topic with `mem topic fleet-<thing> --scope ~/repos`, and
  put a standing rule into this file, not only into memory. Never use a
  date, ticket number, branch name or activity word
  (`readiness-2026-10`, `fix-login`). Before you
  make a new topic, run `mem topics --like <two or three words>`
  (add `--scope ~/repos` for `fleet-*`); reuse a listed topic about the
  same thing, else extend the closest parent's name by one part
  (`fleet-operator` to `fleet-operator-git`), else start a new
  `<scope>-<thing>`. `mem topics --tree` shows the families. Keep
  one subject per memo: when a turn settles two, link the main one and
  write the other in its own memo. When a thing is finished or replaced,
  write `retired <why>` linking only that topic. To rename a topic,
  write `retired renamed to <new>` linking only the old name, then use
  the new name. When the operator answers a
  question prompt, restate the choice: "Operator chose <X> (reason:
  <why>)". When a decision changes a contract, schema, architecture or
  cost model, also record it as an ADR (`docs/adr/NNNN-<title>.md`:
  context, options, choice, consequences) that names its topic, and cite
  it in the memo as `adr-NNNN`. Skip one-off errors and session-local
  facts. To find prior work, run `mem topics`, `mem topic <name>` and
  `mem find <words>`, then `mem zoom <id>+1` to read a message.
  Tell pane agents to do the same.
- Pane messages: when you type into another agent's pane (a brief, a
  follow-up or a callback such as DONE), start the text with
  `[agent <your pane label>]`. The fleet memory then does not record it as
  the operator's words.
- Do not write harness-private memory (Claude Code `MEMORY.md` files,
  Codex memories). Other harnesses cannot read it. Put standing rules in
  this file instead.

## Local tooling

- macOS has BSD `pkill`/`pgrep`/`killall`: no GNU long options, and every
  argument after the pattern is another pattern. On 2026-10-04 a
  `pkill -f '<pat>' -u $USER --signal 0` sent SIGTERM to every process
  matching the username or `0`, including browsers and agents. Check
  existence with `pgrep -f`. Before you kill by pattern, list the matches
  with `pgrep -lf`. Prefer `kill <pid>` with a PID you recorded.
- Secrets: use the `local-dev` skill. Never dump values. `~/.env` is migration
  input only.
- In an unfamiliar repo, or for secret or tool discovery, run `aux`. A vault or
  credential stop blocks only the steps that need that secret.
- Before visible-browser work, run `aux browser`. If it reports a stop and the
  task needs my visible or logged-in browser, report the stop and stop that
  step: no diagnosis unless I ask, and no headless fallback. Use the in-app
  browser only when I ask for it.
- Fleet memory: if your context has no `<fleet-memory>` block, run `mem view` before you start. Run `mem topics`, `mem topic <name>` or `mem find <words>` for prior work, and `mem zoom <id>+1` to read a message.

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
