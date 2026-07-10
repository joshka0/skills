# Output Schema

Use this JSON shape for final gate output.

```json
{
  "decision": "approved | approved-with-known-risks | needs-changes",
  "rationale": "short deterministic rationale with counts and policy triggers",
  "policy": {
    "block_on_severities": ["critical", "high"],
    "max_warn_findings": 5,
    "require_all_required_checks": true,
    "fail_on_unknown_severity": false
  },
  "summary": {
    "total_findings": 0,
    "blocking_findings": 0,
    "warning_findings": 0,
    "waived_findings": 0,
    "total_checks": 0,
    "failed_checks": 0,
    "incomplete_required_checks": 0
  },
  "blocking_findings": [],
  "failed_checks": [],
  "incomplete_required_checks": [],
  "recommendations": [],
  "gate_note": "compact single-line status suitable for TODO/PR/task systems"
}
```

## Decision Rules

- `needs-changes`:
  - Any non-waived blocker.
  - Any failed required check.
  - Any incomplete required check (if `require_all_required_checks=true`).
  - Warning count over `max_warn_findings`.
- `approved-with-known-risks`:
  - No blockers/failing required checks, but warnings or advisory issues remain.
- `approved`:
  - No blockers and no material unresolved issues.
