# Workloads

## Choose the Right Primitive

- `Deployment` for stateless replicated workloads
- `StatefulSet` for stable network identity or persistent storage
- `Job` or `CronJob` for bounded execution
- `DaemonSet` for one pod per node

## Baseline Expectations

- Pin images to immutable tags or digests
- Set CPU and memory requests
- Add readiness probes that reflect real serving readiness
- Add liveness probes only when restart is the right recovery action
- Set startup probes for slow boot paths
- Use `terminationGracePeriodSeconds` that matches shutdown behavior

## Rollout Hygiene

- Check `maxSurge` and `maxUnavailable`
- Watch `kubectl rollout status`
- Compare desired replicas, available replicas, and unavailable replicas
- Look at ReplicaSet history before changing more knobs

## Common Failure Modes

- Image pull failures
- Crash loops from config or dependency issues
- Unschedulable pods from resource, affinity, or taint constraints
- Readiness failures causing zero endpoints
- Startup taking longer than probe budgets

## Verification

- `describe` the workload and pods
- Review events first
- Confirm probes, resources, env, mounted config, and image identity
- Verify endpoints are populated after readiness succeeds
