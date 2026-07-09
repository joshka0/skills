# Optimize Mode

Optimize the Kubernetes setup for reliability-aware performance and cost. Focus on {{target}} when provided.

## Assess Before Changing

- Requests versus actual usage
- CPU throttling, memory pressure, and OOM history
- Replica counts versus traffic shape
- Startup time, cold path cost, and noisy sidecars or jobs

## Optimization Rules

- Measure before reducing capacity
- Fix requests before tuning HPA
- Avoid "cost savings" that hide risk in underprovisioned critical paths
- Prefer removing waste over adding cleverness

## Output

- Main waste or bottleneck
- Proposed change
- Expected tradeoff
- Verification metrics
- Rollback trigger
