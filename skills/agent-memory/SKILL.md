---
name: agent-memory
description: "Find prior work and preserve useful session context. Use for project history, resumed investigations, handoffs, or requested memory updates; not application memory features."
---

# Agent memory

## Retrieve prior work

- Start with the current repository, task, and exact build, issue, or artifact
  name. Use the runner's supplied memory index before you search transcripts.
- In Codex, search `$HOME/.codex/memories/MEMORY.md` with `rg`. Read only the
  relevant referenced summaries. If you need an exact claim or command, use
  the summary's `rollout_path` to inspect the original exchange.
- For prior work across agents and sessions, use the fleet memory. If your
  context holds a `<fleet-memory>` block, read it first; otherwise run
  `mem view`. Run `mem topics` for every topic, `mem topic <name>` for a
  topic's state and history, and `mem find <words>` to search memo items
  and recent lines. A line is a pointer: run `mem zoom <id>+1` to read the
  whole message. Run `mem date <id>` for its time. Add `--scope <path>` for another folder.
  Keep project artifacts and live source as the authority for the current
  task.
- Recheck build numbers, source revisions, endpoints, deployed services, and
  device state before you act on an old note. Label facts taken only from
  memory as unverified; say when they may be stale.
- Keep a prior hypothesis separate from an observed result. A successful
  simulator run does not establish that a phone build works.
- If the current request changes the task, retain the earlier objective and
  unfinished work unless the user cancels or replaces it.

## Preserve useful context

- Record the active objective, authorized scope, user corrections, exact
  source/build identity, confirmed results, unresolved hypotheses, artifact
  paths, commands and exit codes, and the next useful check.
- Put task-specific evidence in the project's established report or handoff.
  Include enough detail for a fresh agent to continue without repeating a
  completed check. Name the limits of each result.
- The fleet memory logs your replies. End a reply with one memo line of at
  most 400 bytes when the turn settled a decision, verified a result, found
  a failure and its cause, or opened or closed an item someone must return
  to. Other turns get none. Use only the labels that apply and one to three
  `[[topic]]` links:

  ```
  memo: decided context cap returns for Pi because the subscription has no reliable cache; done cap in Compactor.ts (verified by a 15-node run, 2,713 input tokens per call); failed Luna backlog run: 1% cache, ~58k tokens per call; open restart with the cap; ids commit 40fef98 [[memoryd-compactor-cost]] [[memoryd-context-cap]]
  ```

  Write each item so that a later `mem find` with two or three keywords
  finds it. Name the thing in plain words: the component, feature, file
  or symptom ("ensure-service from a shell fails silently"). Pane labels,
  draft numbers and question codes (`w55:p2A`, `pC`, `DQ4`) go in `ids`
  or after the words, never in place of them. To carry an open item
  forward, keep it with `open <id>+1`; a restatement in new words adds a
  duplicate to every search.

  Put it as the last paragraph of the reply. Write `done` only for verified
  work; otherwise `running`, `planned` or `blocked`. When a topic is
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
  lists unsettled items, write the memo again that way.
  Name a topic after the lasting thing the work changes (a component,
  feature, contract or decision area) as `<scope>-<thing>` in lowercase
  kebab. The scope is the project (`[[yada-room-kernel]]`), or `fleet`
  for a thing that reaches outside one repository: operator preferences
  (`[[fleet-operator-preferences]]`, split into `fleet-operator-<area>`
  only when it grows), agent rules (`[[fleet-agent-rules]]`) or shared
  tools (`[[fleet-tooling]]`). Link a fleet topic beside the project
  topic when a project turn settles something general. Session indexes
  show only their own repository: read a fleet topic with
  `mem topic fleet-<thing> --scope ~/repos`, and put a standing rule into
  `CLAUDE.md`/`AGENTS.md`, not only into memory. Never use a date,
  ticket number, branch name or activity word. Before
  you make a new topic, run `mem topics --like <two or three words>`
  (add `--scope ~/repos` for `fleet-*`); reuse a listed topic about the
  same thing, else extend the closest parent's name by one part, else
  start a new `<scope>-<thing>`. `mem topics --tree` shows the families.
  Keep one subject per memo: when a turn settles two, link the main one
  and write the other in its own memo. To rename a topic, write
  `retired renamed to <new>` linking only the old name, then use the new
  name. When the operator answers a question prompt,
  restate the choice: "Operator chose <X> (reason: <why>)". When a decision
  changes a contract, schema, architecture or cost model, also write an ADR
  (`docs/adr/NNNN-<title>.md`) that names its topic, and cite it as
  `ids adr-NNNN`. Keep temporary
  process and pane state in the handoff.
- When you type into another agent's pane, start the text with
  `[agent <your pane label>]`, so the memory does not record it as the
  operator's words.
- Do not write harness-private memory (Claude Code `MEMORY.md` files, Codex
  memories). Other harnesses cannot read it. Put standing rules in the global
  `CLAUDE.md` or `AGENTS.md`.
- Keep secrets and personal content out of memory and handoffs. Save
  references and operational evidence, not credential values or journal text.
- Follow the runner's memory citation rules when you use its memory files.

