---
name: maestri
description: Communicate with nearby coding agents and read/write connected sticky notes in Maestri. Use when the user asks to collaborate, delegate tasks, ask another agent, get information from a connected agent, or work with shared notes. Also use when the user mentions another agent by name.
user-invocable: false
---

# Maestri Inter-Agent Communication

Maestri is a spatial workspace for nearby coding agents, sticky notes, and browser portals. Use the `maestri` CLI to coordinate with connected agents, preserve shared context in notes, and inspect or drive connected portals.

The `maestri` CLI is pre-installed and available on PATH inside Maestri terminals. If `maestri` is not found on PATH, use `"$MAESTRI_CLI"` instead; this environment variable points to the full binary path.

Always run `maestri list` first to get exact agent, note, and portal names.

## Floors

Floors are Maestri's workspace isolation layer for parallel work. The Maestri docs describe them as instant isolated copies of a workspace, optionally backed by a git branch and APFS copy-on-write clones. Use floors for another branch, PR review, risky experiment, or parallel task where the canvas, terminals, file trees, notes, and agent context should not interfere with the current floor.

Current CLI status: `maestri` does not expose floor creation or switching commands. Create, rename, switch, and land floors through the Maestri UI. Agents should not invent `maestri floor ...` commands.

Suggest a new floor when:

- the user wants to try risky work while preserving current context
- work should happen on a separate branch or isolated copy
- several agents need their own terminals, notes, portals, and file tree without crowding the current canvas
- a PR review or bug fix should not disturb the active development layout

Stay on the current floor when the task only needs a quick note, portal action, or question to a connected agent.

## Agents

- `maestri list` — list connected agents, notes, and portals
- `maestri ask "Agent Name" "your prompt"` — send a prompt to a connected agent and get the response
- `maestri check "Agent Name"` — read the agent's current terminal output on demand

Use `ask` for bounded collaboration: code review, investigation, comparison, verification, or focused implementation guidance. The response returns when the other agent finishes, not after the full timeout.

Scale command timeout to task size:

- Simple question: 30s
- Normal review or investigation: 5 min
- Long debugging or broad codebase analysis: 10 min

Use `check` when you only need to inspect what an agent is currently showing, especially after a prior request.

## Notes

- `maestri note read "Note Name"` — read the full note with line numbers
- `maestri note read "Note Name" 10 20` — read 20 lines starting from line 10
- `maestri note create "content"` — create a note and link it to this terminal
- `maestri note write "Note Name" "content"` — replace a note's content entirely
- `maestri note edit "Note Name" "old text" "new text"` — replace a substring within a note

When a note already has content, prefer `edit` over `write` to avoid losing existing text.
Changes are reflected in the Maestri canvas in real-time. Notes support markdown formatting.
Notes can be chained together. When a note connected to your terminal is also connected to other notes, you can read and write all notes in the chain. Use `maestri list` to see the full note tree; chained notes appear indented under their parent.

Important: by default, a note's name is derived from its first line. When you write or edit a note and change its first line, the note may be renamed automatically. Run `maestri list` after writing to a note to check for name changes. If the user has set a custom name for a note, the name stays stable regardless of content changes.

## Portals

Portals are browser surfaces connected to the Maestri canvas.

- `maestri portal create URL "Name"` — create a new portal and link it to this terminal
- `maestri portal edit "Portal" --url URL` — update an existing portal URL
- `maestri portal info "Portal"` — get current URL, title, and viewport
- `maestri portal snapshot "Portal"` — read accessibility tree refs such as `@e1`
- `maestri portal screenshot "Portal"` — capture a screenshot
- `maestri portal navigate "Portal" "url"` — navigate to a URL
- `maestri portal wait "Portal" @e3 5000` — wait for an element to appear
- `maestri portal click "Portal" @e3` — click by accessibility ref, CSS selector, or `x,y`
- `maestri portal fill "Portal" @e2 "text"` — clear an input and set text
- `maestri portal type "Portal" "text"` — type into the focused element
- `maestri portal key "Portal" "Enter"` — press a key
- `maestri portal scroll "Portal" down 300 @e5` — scroll the container holding a ref
- `maestri portal hover "Portal" @e3` — hover an element
- `maestri portal drag "Portal" @e3 @e7` — drag between refs or coordinates
- `maestri portal text "Portal" @e1` — get element text
- `maestri portal html "Portal"` — get page HTML
- `maestri portal evaluate "Portal" "js"` — evaluate JavaScript

Prefer `snapshot` before interaction so clicks and fills use stable refs. Prefer ref-based scroll (`@e5`) over coordinate scroll; use coordinates only for inaccessible iframes or canvas-like content. Use `wait` after navigation or actions that trigger async UI changes.

## Workflow

1. Run `maestri list`.
2. Pick the connected agent, note, or portal by exact name.
3. For agents, use `check` before interrupting with `ask` if status is unclear.
4. For notes, read before edit/write.
5. For portals, inspect with `info` or `snapshot` before acting.
6. After edits or portal navigation, re-run `maestri list`, `note read`, `portal info`, or `portal snapshot` as appropriate.

## Troubleshooting

- `maestri debug` — diagnose connection issues.
- If `maestri` is missing from PATH, use `"$MAESTRI_CLI"`.
- If a note name stops resolving, run `maestri list`; it may have been renamed from its first line.
- If a portal ref fails, run `maestri portal snapshot "Portal"` again and use the new ref.
