# Audit a verify skill

A feature map goes stale when the app changes. This pass checks each feature
file against the source and drives each feature live. The unit of rigor is
the feature, not each sentence.

## Outcomes

End with exactly one outcome and name it.

- `clean`: each feature has source and live coverage, and nothing needs a
  change. No branch, no PR.
- `changed`: one PR ships corrections that you proved.
- `blocked`: coverage did not finish, or a proven fix cannot ship safely.
  State the exact blocker.

## Edit scope

Edit only the verify skill's directory: its `SKILL.md`, `features/`, and the
scripts it owns. Never edit product code in this pass. If the app no longer
does what the map says, decide which one is wrong. Wrong map: fix the map.
Wrong app: report a product regression and leave the map as it is.

## Pass

1. Find the target: the project-local skill with launch and drive sections
   and a feature map. If there are several, ask which one. If there is none,
   stop and create one with the parent skill.
2. Read the map index and list the sibling files. Fix missing, extra,
   duplicate, and dead entries.
3. Start one read-only subagent per feature file, all at the same time. Each
   one explains how the feature works from the source, cites likely drift,
   and returns one live recipe. Subagents never drive the app and never edit
   files.
4. Reconcile. Each feature file must have a returned summary. Merge recipes
   that overlap into as few app states as you can. Spot-check the cited
   drift. Search recent commits for user-facing surfaces that the map does
   not list, and require a source path for each one.
5. Drive each feature live at least once, even when the source looks clean.
   You own all driving. The verify skill's Launch section decides the model:
   one long-lived instance driven in sequence, or a new session per drive.
   Hold the three rules below for the whole pass.
6. Triage each finding.
   - The map describes the feature wrongly or not at all: fix the map.
   - The app works but the harness cannot drive it: fix the harness, then
     drive it live again before you ship the fix.
   - The app is broken: record it for the user and keep it out of the PR.
7. For `changed`, read each changed file again, then open one PR. For `clean`
   or `blocked`, open no PR and report the coverage as it is.

Keep short run notes (features covered, unreachable prerequisites, confirmed
drift, outcome) in a scratch location. Never commit them.

## Rules for the live pass

- Never drive an instance that you have not checked since its last surprise.
  Run doctor before the first drive, on each new session, and after each
  failed drive. If doctor cannot see the failure (a stuck UI on a healthy
  process), reset to a known state or start again.
- Evidence survives each cleanup. Check it at its named location.
- Nothing that a drive started stays alive after the drive stops being
  useful. On a shared instance, remove the residue and leave the instance.

If doctor fails because the skill is stale, that is drift. Fix it inside the
edit scope, restart only what the fix made invalid, and try one more time
before you report `blocked`.

Mark a feature `verified-unreachable` only with the concrete prerequisite
(auth, entitlement, OS, external state) and the route you tried. If the map
does not list that prerequisite, that is drift.

Tear down after the last drive of the run, re-proofs included.
