# Ship Mode

Plan and deliver the Kubernetes change safely. Focus on {{target}} when provided.

## Plan the Change

- Define what is changing and what should remain stable
- Identify dependencies: config, secrets, services, ingress, storage, policies
- Define rollout success, failure, and rollback conditions before changing anything

## Ship Carefully

- Prefer declarative source changes over manual live edits
- Keep the change set narrow and reviewable
- Verify probes, selectors, ports, and resource settings match the intended behavior
- Avoid combining unrelated refactors with operational changes

## Verify

- Rollout reaches readiness
- Services and endpoints behave as expected
- Edge routing and certificates still work if touched
- Errors, latency, and saturation stay within acceptable bounds

## Output

- Change summary
- Rollout plan
- Rollback plan
- Verification checklist
- Known risks
