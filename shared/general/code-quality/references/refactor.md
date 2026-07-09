# Refactor

Use this mode for behavior-preserving refactoring or an explicitly requested clean-slate pass.

1. State the intended end state before preserving the historical path.
2. Search real callers before retaining a wrapper, mode, alias, fallback, compatibility branch, or duplicate type.
3. Delete unsupported compatibility paths with evidence. Move a shared rule to its canonical owner instead of scattering checks through callers.
4. Keep a single clear flow unless distinct product concepts prove they need separate ownership.
5. Verify behavior and any navigation, permission, persistence, or contract assumption affected by deletion.

Do not create a generic framework for a one-feature refactor. When a caller still depends on legacy behavior, report the migration decision rather than silently breaking it.
