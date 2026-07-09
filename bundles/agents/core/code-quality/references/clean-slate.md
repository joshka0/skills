# Clean slate

Use this mode only after the user explicitly invokes a clean-slate, zero-tech-debt, or hard-cut pass. Do not enter it from an ordinary refactor request.

Rework the change as if the intended product and architecture existed from day one. State that end state first, then search real callers before preserving a wrapper, mode, alias, fallback, compatibility branch, or duplicate type.

Delete unsupported compatibility cruft with caller evidence, consolidate rules at their canonical owner, and verify affected navigation, permission, persistence, and public contracts. If a live caller still needs legacy behavior, present the migration choice instead of silently breaking it.
