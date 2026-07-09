# Quality gate

Use this mode for an evidence-backed readiness decision after implementation or independent review.

## Fixed policy

- Block severities: `critical`, `high`.
- Warning budget: 5.
- Required checks must be complete and passing.
- Unknown severity does not block by itself; record it as uncertainty.

| Condition | Decision |
| --- | --- |
| Non-waived blocker, failed required check, incomplete required check, or warnings over budget | `needs-changes` |
| No blocker but material warnings or advisory risk | `approved-with-known-risks` |
| No material unresolved issue | `approved` |

## Result schema

```yaml
decision: approved | approved-with-known-risks | needs-changes
rationale: <policy trigger and counts>
policy: { block_on: [critical, high], warning_budget: 5, require_checks: true, unknown_blocks: false }
summary: { findings: <n>, blockers: <n>, warnings: <n>, waived: <n>, checks: <n>, failed_checks: <n>, incomplete_required_checks: <n> }
blocking_findings: []
failed_checks: []
incomplete_required_checks: []
recommendations: []
gate_note: <one-line status>
```

Gather findings and required checks from the requested scope, with each tied to a path, trace, or check result. Separate observed findings from recommendations and waived risks. Patch only when the user requested a fix loop, then rerun only the checks needed to confirm that finding.
