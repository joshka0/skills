# Observability

## Minimum Evidence Set

- Events
- Rollout status
- Pod logs
- Restart count and recent reasons
- Resource saturation signals
- Request path and dependency signals if available

## Expectations

- Log enough context to connect requests, jobs, or resource ids
- Alert on user impact, not noise
- Dashboard the golden signals for critical services
- Distinguish symptom dashboards from root-cause dashboards

## During Incidents

- Preserve evidence before restarting or deleting
- Record exact times, targets, and changes
- Note whether the issue is app, platform, dependency, or policy driven
