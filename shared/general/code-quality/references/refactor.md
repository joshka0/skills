# Refactor

Use this mode for behavior-preserving refactoring only.

1. State the behavior that must remain unchanged and inspect its callers, tests, and current owner.
2. Simplify local structure, move a shared rule to its canonical owner, and keep distinct product concepts separate.
3. Preserve supported compatibility paths; if their removal is needed, stop and route the user to `clean-slate` with explicit authorization.
4. Verify the preserved behavior through its public surface.

Do not create a generic framework for a one-feature refactor. Report a migration decision rather than silently breaking a caller.
