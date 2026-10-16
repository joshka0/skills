---
name: worktrees
description: "Create, track, and remove Git worktrees for Herdr agents with `wt`, and clean up your own before you report done. Use when you need an isolated checkout or finish work in one."
---

# Worktrees

`wt` (`scripts/wt`, linked at `~/.local/bin/wt`) wraps `herdr worktree` and
`git worktree`. It records which pane created each worktree in
`~/.local/state/wt/owners.tsv`.

## Create

- `wt new <repo> <branch> [--base REF] [--label TEXT]` creates the worktree
  under `~/.herdr/worktrees/<repo>/<branch>`, opens a Herdr workspace on it
  without focus, and registers your pane (`HERDR_PANE_ID`) as the owner. It
  prints JSON with `path` and `workspace`. Launch the agent in that
  workspace (`herdr` skill).
- Never use `git worktree add` or a bare `herdr worktree create` for agent
  work: then `wt mine` cannot find the worktree.

## Clean up before you report done

1. Run `wt mine`. It lists your worktrees and their states.
2. If a worktree is `merged`, run `wt done <path>`. It closes the Herdr
   workspace when no agent there is working or blocked, removes the
   worktree, and deletes the merged branch.
3. If `wt done` keeps a worktree (`unpushed`, `pushed`, `dirty`, untracked
   files, or a live process), report its path, branch, and state in your
   final report. Never delete that work.

- A worktree that a subagent or child pane made is yours: clean it up after
  you merge its result.
- Never pass `--force` to `git worktree remove`, and never `rm -rf` a
  worktree. Never remove a worktree that another pane owns.

## States

- `missing`: the directory is gone. `wt` prunes the Git entry and keeps the branch.
- `merged`: the base branch (`origin/HEAD`, else `main` or `master`)
  contains the commit, or merging it would change nothing (a squash merge).
- `pushed`: equal to its upstream, not merged. Often an open PR.
- `unpushed`, `dirty` (tracked changes), `in-use` (a process cwd or an open
  Herdr workspace).

Only `missing` and `merged` are safe to remove. The audit skips the
untracked-file scan, which takes about 30 seconds per worktree on this Mac.
`wt done` and `git worktree remove` still refuse untracked files.

## Operator sweeps

- `wt audit [root]` lists every linked worktree under `root` (default
  `~/repos`), with state, last commit date, open workspace, and owner pane.
  A full run over `~/repos` takes minutes.
- `wt sweep [root]` prints what it would remove. It keeps a safe worktree
  with Git activity in the last 24 hours (a fresh branch with no commits
  counts as merged), or whose owner pane still exists.
- In the repository you work in, run `wt sweep <repo> --apply` as a scout
  step. Run it on a wider root only when the operator asks.
- The 24-hour clock reads the worktree's `HEAD` and its reflog: creation,
  commits, and checkouts reset it.
- A repository's `.git` copied from the dev box lists the dev box's
  worktrees as `missing` on the Mac. Pruning them on the Mac does not touch
  the dev box.
