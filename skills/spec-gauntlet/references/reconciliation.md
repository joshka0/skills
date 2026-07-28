# Stage 3 — Reconciliation (orchestrator + human)

1. **Verify isolation first**: the orphan branch's initial commit contains
   only spec, glossary, contract, harness; the property report predates any
   implementation contact with the staging dir.
2. Copy the properties into the main tree; wire them against the
   implementation; run.
3. **Triage every failure into exactly one bucket:**
   - **impl-bug** → implementer fixes, re-run; no arguing blockers down
     without evidence.
   - **property-misread** → correct the property; note which spec sentence
     misled — that sentence is itself a weak spec-hole signal.
   - **spec-hole** → amend `spec.md`, then BOTH sides re-derive the affected
     part from the amended spec — never from the triage discussion, which is
     a correlation side-channel.
4. **Cross-check the silent guesses** even when everything is green:
   implementer's "Interpretive choices" vs property author's
   "Unpropertyable" list. Overlap = confirmed spec-hole despite green tests.
   Divergent silent guesses that happened to agree = near-miss, still
   ledger-worthy.
5. **Every triage outcome appends a ledger entry** (schema in the ledger
   header), citing R/I numbers. Non-negotiable — the ledger is the
   compounding asset.
6. Final triage judgment is human. The judgment call per disagreement is the
   highest-value attention in the whole run; do not delegate it.

Loop until properties are green. Escalate to a fresh grill if the same
requirement produces holes twice. ⚖
