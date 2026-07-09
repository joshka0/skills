# Swarm

Use this mode when multiple bounded tasks share one live outcome but can proceed independently.

Map work before dispatching:

- Parallelize exploration, file-disjoint leaf changes, independent alternatives, reviews, and separate behavioral tests.
- Serialize shared API or data-model design, migrations, auth or security boundaries, dependency changes, core state machines, and cross-cutting renames.
- Assign one coordinator and an integration order before mutable work starts. Use isolated work surfaces where overlapping filesystem state would otherwise cause conflict.

Every task packet needs a stable identifier, role, objective, context, allowed scope, non-goals, expected artifact, verification, stop condition, and handoff. The coordinator monitors exceptions rather than narrating every step, reviews every returned artifact, and integrates only outputs that compose with the accepted system shape.

Do not dispatch vague work, overlapping owners, or independent definitions of a shared interface. File a follow-up instead of expanding a completed task mid-wave.
