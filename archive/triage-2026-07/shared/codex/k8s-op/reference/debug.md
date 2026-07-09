# Debug Mode

Diagnose the Kubernetes issue systematically. Focus on {{target}} when provided.

## Gather Evidence

1. Identify the failure mode:
   - Crash loop, rollout stuck, not ready, unschedulable, traffic failing, policy blocked, storage failing
2. Compare desired state with live state:
   - Manifests, chart values, env/config, image identity, replica counts, selectors, ports
3. Read evidence in this order:
   - Events
   - Rollout status
   - Pod status and restart reasons
   - Logs
   - Service endpoints and routing
   - Resource, quota, policy, and storage signals

## Working Rules

- Do not restart or delete first unless service restoration is the explicit goal
- Do not treat readiness or liveness failure as the root cause without checking dependencies
- Change one variable at a time

## Output

- **Symptoms**: What is failing right now
- **Most likely root cause**: Evidence-backed, not speculative
- **Confidence**: High / Medium / Low
- **Smallest safe next action**: What to check or change first
- **Verification**: How to know the issue is truly fixed
- **Risks**: Rollback or blast-radius concerns
