---
name: observe-k8s
description: Improve Kubernetes observability with better events, logs, metrics, dashboards, alerting, and service-level checks.
args:
  - name: target
    description: The workload, namespace, or operational area to make more observable (optional)
    required: false
user-invokable: true
---

Improve observability for {{target}} when provided.

**First**: Use the kubernetes-platform skill when available. Read `reference/observability.md` and any workload or networking references tied to the service path.

## Assess Observability Gaps

- Can you quickly see rollout health?
- Can you connect logs to a specific request, job, or resource id?
- Do metrics expose user-impacting behavior or only infrastructure noise?
- Are alerts actionable and tied to clear ownership?

## Improve Systematically

- Prefer a small number of high-signal dashboards over sprawling, low-signal panels
- Alert on user impact, saturation, and broken delivery paths
- Preserve enough context in logs to debug across services
- Expose probe, rollout, and dependency health clearly

## Output

- Current blind spots
- Recommended metrics, dashboards, or alerts
- Logging improvements
- Verification steps showing how the new observability closes the gap
