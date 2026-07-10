# Ship Mode

Prepare the Terraform change for safe delivery. Focus on {{target}} when provided.

## Plan the Delivery

- Define the exact change and environment boundaries
- Identify prerequisites: credentials, locks, remote state access, policy checks, dependencies
- Verify whether the plan contains replacement, downtime, or ordering risk

## Ship Carefully

- Prefer narrow, reviewable changes
- Avoid bundling unrelated cleanups into the same apply path
- Keep module, variable, and backend intent explicit
- Treat the plan as an approval artifact, not just an execution prelude

## Verify

- Config is formatted and validated
- The plan matches the intended semantic change
- Post-apply checks are defined
- Rollback or forward-fix path is realistic
