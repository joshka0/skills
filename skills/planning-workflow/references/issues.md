# Issue slices and AFK briefs

Each slice should deliver one end-to-end behavior that can be verified alone.
Use actual tracker vocabulary and record dependencies without inventing a
generic state machine.

An AFK brief must stand alone: current and desired behavior, acceptance criteria,
non-goals, required interfaces, allowed scope, and the evidence needed at handoff.
Mark it as requiring human input when an unresolved decision or access prevents
independent completion.

Use verified paths when they materially constrain implementation. Keep stable
behavior and interfaces authoritative rather than relying on stale line numbers
or conversation history.

Publish slices only when requested or otherwise authorized. Prepare their text
and dependency order before any required approval. Do not modify parent issues
outside the requested scope.
