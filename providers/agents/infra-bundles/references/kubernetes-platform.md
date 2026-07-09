# Kubernetes platform

Use this reference when the change is about workload posture, platform ownership, storage, probe design, resources, or rollout design rather than one focused operation.

Work from manifests, chart inputs, and repository conventions first. Validate rendered behavior and live assumptions before changing platform shape.

- Give each workload a clear owner, resource request, health signal, and rollout or recovery story.
- Make health signals represent real serving readiness; do not use liveness restarts to mask slow startup or dependency failure.
- Treat stateful changes as backup, restore, and disruption decisions, not only manifest edits.
- Keep ingress, services, identities, and network policy as explicit least-privilege contracts.
- Prefer a clear declarative design over a sequence of live patches or chart-value cargo culting.

Use installed tooling and current primary documentation for changing Kubernetes APIs, chart behavior, admission rules, and platform policy.
