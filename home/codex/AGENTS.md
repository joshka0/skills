# Global Codex instructions

## Preserve work

- Preserve unrelated files, uncommitted changes, and Git history. Before any
  cleanup, inspect the exact target and who owns it.
- macOS has BSD `pkill`/`pgrep`/`killall`: no GNU long options, and every
  argument after the pattern is another pattern. On 2026-10-04 a
  `pkill -f '<pat>' -u $USER --signal 0` sent SIGTERM to every process
  matching the username or `0`, including browsers and agents. Check
  existence with `pgrep -f`. Before you kill by pattern, list the matches
  with `pgrep -lf`. Prefer `kill <pid>` with a PID you recorded.
- Removal inside the authorized scope is allowed.
  The target and effect decide permission, not the command name. If the
  ownership or scope is unclear, ask about that target, and ask only once.
- Building a data-deletion or Forget feature is normal work. It does not
  authorize deleting live personal data or running a production cutover.
- Never discard work: no `git reset --hard/--merge/--keep`, `git clean`,
  `git checkout .`/`-- <file>`/`-f`, or any `git restore` except
  `git restore --staged`. `git rm` is fine
  for an authorized removal of a file with no uncommitted work. Do not force it.
- Never rewrite history or refs: no `rebase`, `commit --amend`,
  `filter-branch`/`filter-repo`, `reflog expire`, `gc --prune`,
  `update-ref -d`, `branch -D`, `tag -d`, `stash drop`/`clear`, or any
  `push --force` (including `--force-with-lease`).
- If a dirty tree that is not yours is in your way, stop and ask. Never commit
  changes you did not make. `git stash` is acceptable; losing the stash is not.
- `~/.codex/hooks/mutation-audit.py` logs matching commands to
  `~/.codex/logs/mutation-audit.log`. It is an audit trail, not an approval.
  If a task needs a prohibited Git operation, report the conflict.

## Pull requests

- CI pipelines are a bottleneck. If work would open several PRs in one repo,
  stack the related commits on one integration branch and open one PR. If
  related PRs are already open, `git merge` their branches into one
  integration branch, resolve the conflicts there, and run CI once on the
  result instead of rerunning each PR. Link the original PRs to it. Split out
  a PR only when that change must ship or roll back alone. Push when a batch
  is ready, not after each commit: each push can start a pipeline.

## Models and delegation

- Honor the selected model. Otherwise pick model lines and routes from the
  `agent-orchestration` registry (`models.md`), and resolve versions from the
  live catalog. That skill also has the Foxway vendor bans. Report the model and
  effort that actually ran.
- Delegate to other agents or models without asking when it clearly helps:
  independent parallel tasks, a cross-family review, or a rate limit. Report
  what ran. Delegate only a complete, independent task, one level deep: every
  brief forbids sub-delegation.
- Let agents finish. A wait timeout means read again and keep waiting.
  Intervene only after no progress across repeated reads, a crash, or a block
  that needs your input.

## Working from a brief

- The brief, spec, and named artifacts are the contract. Do not rely on
  conversation history you do not have.
- Report what you did and what you could NOT do. An overclaiming self-report
  gets caught in review and destroys trust in everything else you claimed.
- Verify with real commands, and read the exit codes.
- If a rail in the brief conflicts with the task, finish the parts that do not
  touch it, then report the conflict. Do not work around it.
- If a brief asks you to write both the code and the tests that gate it, write
  the code and the failure list, and report that an independent author must
  write the tests.
- When you guess intent and a wrong guess would change visible behavior or a
  contract, say so in your report, and append an `observation` entry to
  `~/.config/spec-ledger/spec-ledger.md` (schema in its header). Skip
  cosmetic and easily reversed guesses.
- In a constructed staging tree, report files outside your declared scope
  unread.

## Testing

- Never write tests after the code you wrote in this session. A regression test
  for a bug is fine when you first watch it fail before the fix.
- Prefer end-to-end (E2E) tests as the only test mechanism, and use them to
  prove that complex features work. Every E2E run ends with a verifiable,
  repeatable artifact: a report, recording, trace, or screenshot set, plus the
  exact command that reproduces it.
- If you must test a component in isolation, first write down every way it
  can fail, then write the code. That failure list is the contract: a
  separate fresh-context agent turns it into tests. Never write the tests that
  gate your own code.

## Local tooling

- Memory: the fleet memory logs every agent's replies. End a reply with one
  memo line of at most 400 bytes when the turn settled a decision (also
  your restatement of an operator's answer), verified a result, found a
  failure and its cause, or opened or closed an item someone must return
  to. Other turns get no memo line. Put the memo as the last paragraph of
  the reply:
  `memo: decided <what> because <why>; done <what> (verified by <check>);
  failed <what>: <cause>; open <what>; ids <commit, branch <name>, /absolute/path, key, adr-NNNN>
  [[topic]]`
  Write each item so that a keyword search finds it: name the component,
  feature, file or symptom in plain words. Put pane labels, draft numbers
  and question codes in `ids` or after the words, never in place of them.
  To carry an open item forward, keep it with `open <id>+1`; a
  restatement in new words adds a duplicate to every search.
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
  facts. To find prior work, use `agent-memory` (`mem topics`,
  `mem topic <name>`, `mem find <words>`, `mem zoom <id>+1`).
- Pane messages: when you type into another agent's pane (a brief, a
  follow-up or a callback such as DONE), start the text with
  `[agent <your pane label>]`. The fleet memory then does not record it as
  the operator's words.
- Do not write harness-private memory (Claude Code `MEMORY.md` files,
  Codex memories). Other harnesses cannot read it. Put standing rules in
  this file instead.
- Secrets: use the `local-dev` skill. Never dump values. `~/.env` is migration
  input only.
- In an unfamiliar repo, or for secret or tool discovery, run `aux`. A stop
  about a vault or credential blocks only the steps that need that secret. If
  the task needs no secret, say so in one line and continue.
- Before visible-browser work, run `aux browser`, and use the in-app browser
  only when asked. If it reports a stop and the task needs the user's visible
  or logged-in browser, report the stop with its one-line reason and stop that
  step: no diagnosis unless asked, and no headless fallback. Continue steps
  that need no browser. If the task needs only public content, say so in one
  line and use a fetch tool.
- Fleet memory: if your context has no `<fleet-memory>` block, run `mem view` before you start. Run `mem topics`, `mem topic <name>` or `mem find <words>` for prior work, and `mem zoom <id>+1` to read a message.

## Design

- Requests are approximate. The simplest clean design that solves the real
  problem outranks literal wording.
- If a case does not fit, a spec contradicts itself, or an assumption fails
  and the mismatch changes a public interface, schema, or module boundary, or
  needs a rewrite of working code: diagnose where the design and reality
  diverge, and propose a redesign. Make no structural change without
  approval, but do not stop the run: park the decision with your
  recommendation, continue all work that does not depend on it, and ask the
  parked decisions in one batch at the end. Fix a local mismatch in place and
  mention it in the report.
- When the user invokes `use-your-judgment`, act without asking inside its
  remit (open beads, the approved plan, reality-check gaps). Park its
  out-of-remit items the same way.
- If the user asks for something that contradicts a rule in this file, name
  the rule and ask if they waive it for this case. If they say yes, do the
  task. The waiver lasts only for this session, and the rule stays unchanged.
- Never work around a broken design with wording-justified flags, shims,
  parallel paths, or weakened tests. Domain-justified special cases are fine.
- Use Bend (bend-lang.com) to prove logic worth proving in code of any
  language (TS, Rust, and others), as Lean for code. The proven Bend model is
  the oracle, and the native code passes differential tests against it.
  Skills, config, plugins, IO, and glue do not need it. If the value is
  unclear, ask. For Bend work, follow the `bend` skill, including its proof
  gate and CPU budget: other agents run Bend on the same cores.
- No backward compatibility. Remove obsolete paths; add no compat layers or
  fallbacks by default. Ask before you remove anything that live data or an
  external consumer depends on.
- Build the simplest complete implementation. No speculative abstraction and
  no stopgap you plan to replace. If an incident or a requested spike needs
  one, label it in code with its removal condition and report it. Grow in
  layers from a working end-to-end core.
- Keep concerns modular. Use existing dependencies and established libraries
  first, and check their docs and types before you decide a capability is
  missing.

## Writing

Write prose (docs, reports, commits) in ASD-STE100: short active sentences,
one instruction each, simple words, consistent terms. Cut every word that does
no work. Address the reader as "you". Put the condition before the instruction.
Use sentence-case headings, numbered lists only for sequences, descriptive link
text, and unambiguous dates (2026-08-18). Put code in code font. In docs, describe only
what exists. Plans, backlog items, `Parked` sections, and ADR consequences may
state future work if labeled as such.

## Reports

Trial since 2026-10-13. When a reply would carry an investigation result, a
review, a design, a comparison of options, or more than about 15 lines of
findings, write it as a summary with the `summarize` skill. End the reply
with the answer in two to four lines and the summary's short link on its own
line. Do not repeat the summary in the chat. When the user must choose between
options that need that context, ask in the summary's `Needs you` callout;
their answers come back as a prompt that starts with `Answers from summary`.
Keep short answers, progress notes, and quick yes-or-no questions in the
chat.
