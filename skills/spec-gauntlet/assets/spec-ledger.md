# Spec Blind-Spot Ledger

Global, append-only record of specification failures discovered across all
projects. This file is truth; `spec-ledger-digest.md` is a derived cache.

## Rules (binding on all agents and humans)

1. **Append only.** The single permitted operation is adding a new entry at
   the end of this file. Never edit, reorder, merge, deduplicate, or "clean
   up" existing entries. History is the point.
2. **Never truncate.** Compaction produces/updates `spec-ledger-digest.md`
   alongside this file; the raw ledger is never shortened or replaced.
3. **One entry per finding.** A gauntlet run with three findings appends
   three entries.
4. **Schema is fixed.** Use the template below exactly. Unknown fields go in
   Finding prose, not new headers.
5. **Cite requirements when they exist.** If the spec had numbered
   requirements, reference them (e.g. "R7 silent on…").

## Entry template

```
## YYYY-MM-DD | <project> | <module> | <type>
- **Finding**: <one-to-three sentences: what was ambiguous/wrong and how it surfaced>
- **Class**: <short recurring-pattern tag, e.g. concurrent-access, empty-collection, timezone, ordering, idempotency, unit-mismatch, naming-drift>
- **Resolution**: <how the spec/property/impl was amended, or "unresolved">
- **Source**: <gauntlet:<step> run <id> | session-observation | grill>
```

`<type>` is one of:
- `spec-hole` — spec was silent or ambiguous (highest cross-project value)
- `property-misread` — property author misinterpreted the spec
- `impl-bug` — implementation violated a correct, clear spec
- `observation` — agent had to guess intent during ordinary work (lower
  confidence)

## Digest rules

When this file exceeds ~100 entries or on request, an agent derives
`spec-ledger-digest.md`: Class frequency ranked, weighted gauntlet-confirmed
(spec-hole, property-misread, impl-bug) above observation; top 5 classes with
one representative finding each; total entry count and date range. Briefs for
spec adversaries and grill sessions load the digest, not this file.

---

<!-- Entries below. Append only. -->
