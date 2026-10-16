# Feature map shape

The map lives in `features/` inside the verify skill: one `README.md` index
and one file per user-facing feature. Keep implementation details out. Name
only user paths, stable handles, required state, commands, and observable
proof.

## Index (`features/README.md`)

The index has four parts.

- **Baseline preconditions.** The launch URL or command, a disposable data
  directory keyed by run ID, the seed data, the doctor command and what it
  must report. End with: never drive an instance that this run did not start.
- **Driving conventions.** Each recipe starts from the baseline. Commands are
  literal. Restore seeded data after a mutation.
- **Proof and skip reporting.**
  - UI proof: an ARIA snapshot and a screenshot that shows the app identity.
  - CLI proof: the command, stdout, stderr, and the exit code.
  - Mutation proof: a read-only second view of the stored value.
  - Record the feature ID and the entry point with each artifact.
  - Report an unreachable path with the command you tried and the unmet
    precondition. Never report a skipped entry point as verified through
    another path.
- **Features.** One link per feature file with a one-line scope.

## Feature file

Start with an H1 title and one paragraph that describes the user-visible
behavior. Then use exactly these four H2 sections, in this order.

1. `Sub-features`: short IDs, one line of behavior each.
2. `How to get to it (user POV)`: every user entry point.
3. `Driving it with <harness>`: starts with `Preconditions:`, then labeled
   bullets. Each bullet pairs a user action with the exact command and the
   observable result.
4. `Gotchas`: traps that waste or invalidate a run.

## Example

```markdown
# Create a note

Create note lets a user save a titled note from the browser or the CLI,
cancel a draft, and confirm the saved note from a second view.

## Sub-features

- `create-save` persists a title and a body.
- `create-cancel` discards an unfinished browser draft.
- `create-cli` creates the same note shape from the terminal.

## How to get to it (user POV)

- Choose the `New note` button in the browser toolbar.
- Press `n` in the browser while focus is outside an editable field.
- Run `notes create --title <title> --body <body>` in a terminal.

## Driving it with control-notes

Preconditions:

- Notes is healthy at `http://127.0.0.1:4173`.
- No note is titled `Release checklist`.

- **Save note.** Choose `Save note`. Run
  `control-notes browser click --role button --name "Save note"`. A status
  named `Note saved` appears and the heading reads `Release checklist`.
- **Confirm persistence.** Reopen the note from `All notes`. The editor
  shows both saved values.
- **CLI entry.** Run `control-notes cli -- notes create --title "CLI note"
  --body "Created from terminal" --format json`. Exit code `0`, and stdout
  contains the new note ID and title.
- **Proof.** Run `control-notes browser snapshot --aria --path
  artifacts/create-note/list.aria.txt`. The artifact shows both notes.

## Gotchas

- Pressing `n` while a textbox has focus types the character.
- Titles are trimmed on save. Assert the rendered title, not the input value.
- A save status alone is not proof. Reopen the note from the list.
- Cleanup removes both notes and keeps their proof artifacts.
```
