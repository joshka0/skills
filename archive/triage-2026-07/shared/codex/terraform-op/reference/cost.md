# Cost Mode

Review Terraform for cost discipline. Focus on {{target}} when provided.

## Review Areas

- Oversized compute, storage, or database defaults
- Idle always-on resources
- Missing schedules, tiering, or lifecycle controls
- Replication, retention, or logging that is expensive without clear intent

## Rules

- Do not optimize cost by hiding reliability risk
- Prefer removing waste over adding complexity
- Call out when cost is a product decision rather than an infra mistake

## Output

- Main sources of waste
- Recommended reductions
- Tradeoffs
- Verification and guardrails
