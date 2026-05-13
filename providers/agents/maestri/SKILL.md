---
name: maestri
description: Send exact text to connected Maestri agents or terminals and read their responses. Also read and write connected sticky notes. Use when the user's intent is to collaborate with another agent on the canvas, run a command in a connected shell, ask/tell/check another canvas participant, or create/update a note.
user-invocable: false
---

# Maestri Inter-Agent Communication

You're running inside Maestri, a spatial workspace with other coding agents,
shells, sticky notes, and browser portals nearby. Connected participants,
including shell terminals, exchange text through the `maestri` CLI.

Connected notes can be read and written through the `maestri` CLI.

## Commands

- `maestri list` - list connected agents, shell terminals, notes, and portals
- `maestri ask "Name" "text"` - send exact text to a connected participant and wait for its response
- `maestri check "Name"` - read the participant's current terminal output on demand
- `maestri note create ["content"]` - create a new note on the canvas and link it to this terminal
- `maestri note read "Note Name"` - read the full note with line numbers
- `maestri note read "Note Name" 10 20` - read 20 lines starting from line 10
- `maestri note write "Note Name" "content"` - replace a note's content entirely
- `maestri note edit "Note Name" "old text" "new text"` - replace a substring within a note

The `maestri` CLI is pre-installed and available on PATH inside Maestri
terminals. If `maestri` is not found on PATH, use `"$MAESTRI_CLI"` instead; this
environment variable always points to the full binary path.

Always run `maestri list` first to get the exact participant and note names.

## `ask` Is Exact Transport

The command name `ask` is misleading. Treat it as `send` or `exec`: Maestri sends
the exact text argument to the connected target. It does not rewrite the text,
wrap it in an LLM prompt, or protect the target from extra prose.

Recipient behavior depends on the target:

- **Shell/terminal target**: the text is entered into the shell. Send only the
  command or shell input that should literally run. Every extra sentence or
  newline may be executed. Do not append explanations such as "this may prompt"
  after the command; tell the user outside `maestri ask`.
- **AI-agent target**: the text is delivered to that already-running agent as
  its next input. Natural-language task packets are appropriate only because the
  recipient is an AI agent, not because Maestri is interpreting the text.

Before sending to a shell target, use `maestri check "Name"` when prompt state is
unclear. For commands that may request a PIN, password, sudo confirmation, or
hardware-key touch, send only the command, then let the user interact directly
with that shell. Never send secrets through `maestri ask`.

## Waiting

The response from `ask` returns as soon as the target finishes responding. Scale
the Bash tool timeout to the estimated completion time:

- **60000ms** (1 min) - quick questions, status checks, simple lookups, short shell commands
- **300000ms** (5 min) - small focused tasks or commands
- **600000ms** (10 min) - reviews, multi-step tasks, larger commands
- **1200000ms** (20 min) - debugging sessions, complex investigations, multi-file refactors

If the timeout expires before the target responds, do not resend the text. Run
`maestri check "Name"` to see current progress, then wait again with an
appropriate timeout. Never interrupt an agent that is still working, and do not
edit files that another agent is actively modifying.

Use `check` when you only need to inspect what a participant is currently
showing without sending input. Run `maestri help` to see all available commands.
If the user is having connection or setup issues, run `maestri debug`.

## Connected Notes

Use `maestri note create` to create a new note on the canvas; it appears to the
left of your terminal and is automatically connected. Optional initial content
can be provided.

Use `maestri note read` to read, `maestri note write` to replace entirely, and
`maestri note edit` to update a specific part. When a note already has content,
prefer `edit` over `write` to avoid losing existing text.

Changes are reflected in the Maestri canvas in real time. Notes support markdown
formatting. Notes can be chained together. When a note connected to your
terminal is also connected to other notes, you can read and write all notes in
the chain. Use `maestri list` to see the full note tree; chained notes appear
indented under their parent.

Important: by default, a note's name is derived from its first line of text.
When you write or edit a note and change its first line, the note may be renamed
automatically. Always run `maestri list` after writing to a note to check for
name changes. If the user has set a custom name for a note, the name stays
stable regardless of content changes.
