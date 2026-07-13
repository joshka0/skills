# Implementation dossier

Read only when an approved goal needs a `CODE_DOSSIER.md` before production implementation.

1. Trace the goal through feature and non-feature, behavior (including failure paths), structure, interface, test, location, and invariant. Use existing IDs; preserve legacy dossiers that use `D###` for structures, while new shared ledgers use `S###`.
2. Inspect the codebase without editing: current patterns, reusable owners, tests, verification commands, likely files, and files that must not change.
3. At each material layer, compare real alternatives, record the selected shape and strongest dissent, and return to the earliest affected layer when a lower decision contradicts an approved one.
4. Define test evidence and exact allowed locations before implementation. TODO anchors mark approved edit sites; they are not implementation.
5. When architecture uncertainty remains, make a temporary spike from the approved baseline, verify it, revert the spike, and record every deviation before revising the dossier.
6. Run red teams on the feature contract, completed blueprint, and actual diff. Each has three substantive attacks or a reasoned none-found; the diff pass checks dossier drift, unproven tests, and out-of-map edits.

Do not write final production code until the necessary dossier gates are approved. Final implementation must update the dossier before it extends the approved contract, location map, or invariants.
