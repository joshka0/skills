---
name: mistake-proofing
description: "Change a repo so agents cannot repeat a mistake: architecture first, then types, then a lint, then a test, docs last. Use when the user corrects the same mistake a second time."
---

# Mistake-proofing

Assume each contributor is an agent that reads only the files it opened,
copies the nearest example, and takes the shortest path that compiles. Shape
the repo so that a change that looks right from one file is right for the
whole repo.

## Find the mistake classes

Read recent commits, reverts, review comments, agent instruction files, and
the comments that explain workarounds. For corrections in past sessions, use
`mem find` (`agent-memory`). Group the mistakes into classes. A class counts
after its second occurrence.

## Fix each class at the highest level that works

1. **Architecture removes it.** Give each piece of state one owner and each
   task one supported way. Hide internals so that the wrong import fails.
   Replace hand-synced lists with one source of truth. Delete the old ways
   and the dead code that an agent would copy.
2. **Types reject it.** Make the bad state impossible to write. If bad code
   still compiles, add a lint or CI check. Its error message names the file,
   type, or function to use instead. If the pattern is already common, fail
   only when a change adds more of it.
3. **A test catches the behavior** (`test-value`).
4. **A doc or agent rule states it**, only for a judgment call. Nothing fails
   when an agent skips a rule.

## Fix and prove

- Fix the most frequent classes first, one commit each.
- Prove that each new check fails on a real past mistake: restore the
  mistake, watch the check go red, then remove it.
- Run the same command locally and in CI.
- Put an exception on the offending line with a reason, an expiry date, and
  the user's approval.

## Rule table

Keep a table in the repo's agent instruction file that pairs each rule with
the thing that enforces it. When the user corrects you, fix the mistake and
add the rule. If the rule was already there and nothing enforces it, that is
a repeat: fix it at the highest level in the same change. Remove a rule when
its mistake cannot occur.

Report each class with its evidence, the level you chose, and why a higher
level did not work.

Adapted from pstack `correct` (MIT, copyright 2026 Lauren Tan).
