---
name: doc-triage
description: "Triage stale or duplicated documentation into current docs, code comments, ADRs, backlog, or dated archives. Use for a requested docs cleanup."
---

# Documentation triage

Inspect documentation within the requested scope and compare its claims with
current source. Timestamps can guide inspection but do not prove staleness.
Preserve current guides that readers need; there is no fixed document quota.

Route each useful part to its owner:

- Module intent, invariants, and local tradeoffs belong in code comments.
- Cross-module decisions belong in dated ADRs. Use the project's format or
  [ADR template](assets/adr-template.md); preserve earlier rationale.
- Unbuilt work belongs in the backlog. Prepare local issue drafts unless
  tracker publication is already authorized.
- Historical design belongs in a dated archive marked as historical.
- Superseded duplicates and scratch files can be retired after their useful
  content is preserved. Use `/usr/bin/trash`; Git history does not authorize
  `git rm` or permanent removal.

Repair inbound links during conversion. Keep a review read-only and execute
conversions when requested. Ask only about contested ownership or a consequential
choice the user has retained; do not re-approve routine authorized edits.

Install automation only when requested. Available helpers are the
[Markdown allowlist check](scripts/md-budget.sh),
[advisory Claude drift hook](scripts/pre-push), and
[scheduled Claude sweep](scripts/doc-sweep.sh). Scheduling and issue publication
need their own authorization. Report conversions, retained docs, and open choices.
