# Kubernetes operations

Use this reference for a focused Kubernetes audit, failure, network, observability, security, delivery, recovery, or migration operation.

1. Confirm cluster, namespace, workload, service, and policy scope from repository configuration and live status.
2. Compare rendered desired state with events, rollout state, logs, probes, endpoints, and relevant policies before changing anything.
3. Diagnose a concrete cause before a restart. Stabilization may be the declared goal, but it does not replace evidence collection or a durable source change.
4. Choose the narrowest reversible action and verify workload health, dependencies, exposure, and rollback readiness.
5. For traffic, trace ready workload, Service selector and ports, endpoints, edge routing, DNS, then network policy; do not widen exposure to hide an unlocated fault.

Do not use mutable image tags, broad cluster privilege, wildcard access, plaintext secrets, casual public exposure, or a pod restart as a substitute for diagnosis. For migration or recovery, preserve backup and restore reality before proceeding.
