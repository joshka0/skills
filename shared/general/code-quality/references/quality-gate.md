# Quality gate

Use this mode for an evidence-backed readiness decision after implementation or independent review.

1. Gather findings and required checks from the requested scope. Keep each finding tied to a path, trace, or check result.
2. Separate observed findings from recommendations and waived risks.
3. Decide `needs-changes` when a non-waived blocker, failed required check, or incomplete required check remains.
4. Decide `approved-with-known-risks` when no blocker remains but material advisory risk is documented; otherwise decide `approved`.
5. Patch only when the user asked for a fix loop. Re-run only the checks needed to confirm the changed finding.

Return the decision, rationale, blocking findings, failed or incomplete required checks, recommendations, and gate note. Do not turn an absent fix request into an implementation loop.
