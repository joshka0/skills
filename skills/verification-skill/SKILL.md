---
name: verification-skill
description: "Create or audit a project-local verify-<app> skill that drives the real app as a user does and captures proof. Use when a repo has no scripted proof path, or its verify skill is stale."
---

# Verification skill

A `verify-<app>` skill is the repo's scripted way to launch the real app,
use a feature as a user does, and capture proof. Its reader is an agent in
the middle of a task that has never seen the app. Write every line for that
reader.

To audit a verify skill that exists, follow `references/maintain.md`.

## Read the repo before you ask

Answer these from the code. Ask the user only what the repo cannot show.

- **Surface.** What does a user touch: a web UI, a CLI or TUI, a desktop or
  mobile app, an API, a library? Pick the primary surface and name the others.
- **Run.** How does the app start locally? Use the repo's documented dev
  command. Record ports, env vars, seed data, and auth. `local-dev` owns
  routes and secret names.
- **Drive.** Use the repo's own harness first: Playwright or Cypress specs,
  expect scripts, PTY helpers, endpoints, a debug port. If there is none, use
  a browser over CDP for web and Electron, a PTY or tmux session for a CLI or
  TUI, and plain HTTP for a service.
- **Observe.** Which evidence can you capture: screenshots, terminal
  transcripts, response bodies, logs, exit codes, database state?
- **Isolate.** Can two instances run side by side (ports, data directories,
  browser profiles)? If they cannot, say so in the generated skill. A skill
  that refuses to drive a shared instance is correct. The user's visible
  browser and running dev servers are shared instances.

If the checkout does not build or start, fix that first or report the exact
failure. Never write a verify skill against a broken base. If a missing file
that the app does not use blocks startup, the generated skill may create it,
label it as verification scaffolding, and remove it in cleanup.

## Write the skill

Write `.agents/skills/verify-<app>/SKILL.md` and link
`.claude/skills/verify-<app>` to that directory. If the repo already has a
skill root, use that root. Give the file frontmatter: `name: verify-<app>`
and a `description` that names the app, the surface, and the trigger.

Fill each section with what you found. Leave no placeholder.

- **Launch.** The exact command that starts the app for verification, the
  sign that it is ready (a log line, a port that answers, a prompt), and the
  teardown. For a short-lived CLI or TUI, launch means build once, then start
  each drive in its own PTY or tmux session.
- **Doctor.** One read-only check that answers "is this instance safe to
  drive?": process up, expected build, port owned by this run, auth valid.
  The reader runs it first and after each surprise.
- **Drive.** The harness recipe with real selectors and commands from this
  repo. Prefer ARIA labels, data attributes, prompt strings, and route paths
  to coordinates and tab order.
- **Evidence.** What to capture and where it goes. State these standards:
  - Use the real user path, never an internal setter or a test-only endpoint.
  - Capture the action and the state that results, not only the last screen.
  - Check side effects (files, rows, messages) through a second view.
  - Mock only where production already isolates the external system.
  - If the safe path is a dry-run or test mode, observe what it skips (files,
    network, Git refs). Its name proves nothing.
  - Each run ends with an artifact and the exact command that reproduces it.
- **Cleanup.** Stop only what the run started, by recorded PID or session
  name. Never kill by process name. Cleanup removes instances and scratch
  state. It never removes the evidence.
- **Helpers.** Make each script executable and show its invocation in the
  skill body.

## Seed the feature map

Create `features/README.md` and one file for each of the top 3 to 5
user-facing features, taken from routes, commands, menus, or docs. Follow
`references/feature-map.md`. The map is the repo's maintained list of what to
verify. If the map lists several entry points, a proof through one of them is
incomplete.

## Prove the generated skill

1. Follow the generated skill from start to end: launch, doctor, drive one
   mapped feature, capture evidence, clean up.
2. After cleanup, confirm that the evidence still exists at the named
   location.
3. If a step fails, run the generated cleanup, fix the skill, and start
   again.

A generated skill that you did not run is a draft. Report it as a draft.

Adapted from pstack `create-verification-skill` and
`maintain-verification-skill` (MIT, copyright 2026 Lauren Tan).
