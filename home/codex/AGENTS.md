# Global Codex instructions

## Preserve work and respect deletion scope

- Preserve unrelated files, uncommitted changes, and Git history. Inspect the
  exact target and its ownership before cleanup.
- Remove files when the requested change or cleanup includes their removal.
  Prefer `/usr/bin/trash` for recoverable local cleanup when practical.
  Permanent deletion and deletion APIs are allowed within the authorized scope;
  the operation's effect and target determine permission, not its command name.
- Implement requested application-data deletion, erasure, and Forget behavior.
  Workspace-preservation rules do not change the product's retention contract.
  Implementing a feature does not authorize deleting existing live personal data
  or running a production cutover; those actions need their own task authority.
- If ownership or deletion scope is unclear, ask about the specific target.
  Do not ask again for a removal already authorized by the user.

Git — an agent never discards work or rewrites history:
- **Uncommitted work is sacred.** No `git reset --hard/--merge/--keep`, no
  `git clean`, no `git checkout .`/`-- <file>`/`-f`, **no `git restore` at all**
  (even a single file discards changes). `git rm` is allowed for an authorized
  file removal after checking for uncommitted work; do not force it.
- **History and refs are sacred.** No `git rebase`, `commit --amend`,
  `filter-branch`/`filter-repo`, `reflog expire`, `gc --prune`, `update-ref -d`,
  `branch -D`, `tag -d`, `stash drop`/`clear`, or `push --force`
  (including `--force-with-lease`).
- If the working tree is dirty and in your way: **commit it, or stop and ask.**
  Never clear it. `git stash` (without drop/clear) is acceptable; losing the
  stash is not.

The PostToolUse hook (`~/.codex/hooks/mutation-audit.py`) records matching
commands in `~/.codex/logs/mutation-audit.log`. It is an audit trail, not an
approval gate. If a task needs a prohibited Git operation, report the conflict.

## Model and effort selection

- Honor the user's selected model. For open-ended Codex planning, coding, UI,
  debugging, or review, default to `gpt-6-astra`. Keep `gpt-5.6-sol` available
  when selected. Either model may plan and implement the task end to end.
- Use `gpt-5.6-luna` at `max` only for a simple, bounded, low-risk task with an
  exact plan from Astra, Sol, or another suitable stronger model. Luna must report
  missing, ambiguous, or conflicting steps instead of planning or improvising.
  State this constraint in its brief.
- Preserve the chosen reasoning effort. Check model and effort support before
  switching; use `ultra` only with user approval. Do not use Terra.
- Preserve explicit workflow pins, including the Luna verifier in
  `herdr-goal`. Astra and Sol are both OpenAI models; switching between them
  does not provide a different model family for review.
- Report the model and effort that actually ran. Use `agent-orchestration`
  for delegated model and harness selection.

## Delegation

- Delegate only when a complete independent task earns the coordination cost.
  Keep one level of delegation. Every brief must forbid sub-delegation and
  include the task, source artifacts, scope, constraints, and required evidence.
- Give reviewers the original artifacts and avoid supplying the desired
  verdict. Preserve review independence and vendor restrictions required by
  the task.
- Let agents finish. Do not timebox, interrupt, or send follow-up input while
  they are producing output. A wait timeout means read again and keep waiting.
  Honor bounds in an explicitly selected workflow such as `herdr-goal`.
- Intervene only after repeated reads show no progress, a crash, or a block
  awaiting your input. Report results only after an observed terminal state.

## Working with a task brief

- Treat the brief file, spec, and named ground-truth artifacts as the contract.
  Do not rely on conversation history you do not have.
- Report what you actually did, including what you could NOT do. Self-reports
  that overclaim are worse than useless: they get caught in review and destroy
  trust in everything else you claimed.
- Verify with real commands and read exit codes directly. Do not infer success.
- If a rail in the brief (scope, prohibitions, rails) conflicts with what the
  task seems to need, STOP and report the conflict. Do not work around it.

## Knowledge capture (agent wiki)

- When you hit a gotcha, paper-cut, or make a durable decision, log it with
  the `wiki` CLI: `wiki gotcha|papercut|note|decision "…"`. One line each.
  For a source URL worth keeping: `wiki article <url>`.
- Consult the compiled wiki before re-deriving known facts: `wiki index`
  lists pages; `wiki search <query>` finds them. Vault: `~/vaults/wiki`.
- Never write under `~/vaults/wiki/wiki/` directly — the librarian agent owns
  that layer. Your only write path is the CLI (it lands items in `_inbox/`).
- Foxway material: the CLI auto-tags captures from foxway paths; if you know
  the content is Foxway-related and you are outside such a path, add
  `--foxway` explicitly. Never omit it to dodge the quarantine.

## Local secret topology

- Use the `local-dev` secrets mode for Infisical ownership and Keychain-backed
  issuer storage. A provider skill owns the actual token mint when one exists.
- Check the repo `.infisical.json`, required key names, and exact repo path
  first. Treat `~/.env` as migration input only. Never dump secret values.
- Store provider-wide values once under `/shared/vendors/<provider>` or
  `/shared/tooling/<tool>`. Import them into consumer folders under `/repos/...`.
- Use the exact repo path with imports enabled. Do not use recursive injection
  as inheritance. A direct repo secret shadows an imported secret.
- Keep long-lived local issuer credentials in macOS Keychain. Store their
  scoped runtime tokens in Infisical. Verify the provider's current issuer
  mechanism. Do not assume that one PAT can create another PAT.

## Agent User Experience (AUX)

AUX means Agent User Experience. It gives a zero-context agent the smallest
safe orientation it needs. It currently covers repository and vault scope,
safe credential modes and names, installed tools, Herdr credential handoffs,
visible-browser readiness, and wiki feedback for repeated friction.

Load the `aux` skill only when the task needs this orientation:
`${CODEX_HOME:-$HOME/.codex}/skills/aux/SKILL.md`. Do not run AUX for a routine
task when the current context already supplies what the agent needs.

- Run `aux` in an unfamiliar repository or when the task needs secret, tool,
  or credential-mode discovery.
- Run `aux browser` before you select a browser surface for visible-browser
  work.
- For a remote target, run `aux browser` on that target as the first command
  after the minimum SSH connection check.
- When AUX reports `ready`, use its reported `browser-bridge` client with the
  `local-http-browser-use` skill.
- Use bundled in-app browser control only when the user explicitly asks for
  the in-app Browser surface.
- When AUX reports a browser stop, report that result and stop. Do not inspect
  browser processes, desktop sessions, services, ports, configuration, or
  bridge internals unless the user explicitly asks for diagnosis. Do not fall
  back to hidden or headless automation.

## Verification discipline

- Never author the tests that gate your own implementation. Examples and
  doctests that communicate intent are fine; invariant properties and
  acceptance gates come from a decorrelated deriver — if your brief asks you
  to write both sides, STOP and report the conflict.
- If you must guess the user's intent on an ambiguous spec, do not guess
  silently: state the guess in your report AND append an `observation` entry
  to `~/.config/spec-ledger/spec-ledger.md` (schema in its header).
- Respect isolation rails in a brief exactly: if your world is a constructed
  staging tree and you find files outside your declared scope, report them
  unread.

## Design philosophy

Requests are approximate: they point toward the simplest, cleanest design that
solves the real problem. That intent outranks literal wording.

When a case does not fit, a spec contradicts itself, or an assumption fails,
treat the wall as information — the design is probably wrong somewhere:

1. **Stop.** Do not patch around it.
2. **Diagnose** where design and reality diverge.
3. **Propose** a redesign and wait for the user's go-ahead before any structural
   change.

Never comply with the words by working around a broken design: no flags or
special cases justified only by "the spec said so", no conversion shims or
parallel paths papering over a mismatch, no tests weakened to dodge a rule that
broke. A special case justified by the **domain** is fine; one justified by
**wording** is not.

## Engineering principles

- Do not preserve backward compatibility. Remove obsolete paths instead of
  adding compatibility layers, fallbacks, or migrations.
- Choose the simplest implementation that fully meets the current requirements.
  Avoid speculative abstractions, configuration, and indirection.
- Grow the system in layers. Start from the smallest version that works end to
  end, and add each new capability on top of a product that already works.
  Never trade a working product for unfinished complexity.
- Keep components modular and concerns clearly separated.
- Prefer established, well-maintained libraries when they reduce overall
  complexity or improve reliability. Do not reimplement common functionality
  without a clear reason.
- Lean on the dependencies already in the project before writing your own
  implementation or adding packages. Do not assume a library lacks a capability
  without checking its documentation and types.
- Make architectural decisions for the long term. Do not accept a stopgap that
  only works for now and is meant to be replaced later.

Simplest is not the same as temporary: rule out speculative complexity and
known-throwaway work alike.

## Writing style

Write prose (docs, reports, commit messages, explanations) in ASD-STE100
(Simplified Technical English): short sentences, one instruction per
sentence, active voice, approved simple words, consistent terms for the
same thing.

Follow Zinsser's four principles of quality writing:

1. **Simplicity** — strip every sentence to its cleanest components.
2. **Brevity** — cut every word that does no work.
3. **Clarity** — the reader must never have to reread to understand.
4. **Humanity** — write warmly, as one person to another.

From the Google developer documentation style guide:

- Address the reader as "you".
- Put the condition before the instruction: "If X, do Y", never "Do Y if X".
- Use sentence case for titles and headings.
- Use numbered lists for sequences; use bullets for everything else.
- Make link text describe its destination; never "click here".
- Write dates unambiguously (2026-08-18 or 18 August 2026, never 3/4/25).
- Put code in code font and UI element names in bold.
- Document what exists now; never pre-announce future work.
