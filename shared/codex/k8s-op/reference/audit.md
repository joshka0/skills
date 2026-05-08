# Audit Mode

Run a systematic Kubernetes audit. Focus on {{target}} when provided.

## Audit Dimensions

- Reliability: probes, resources, disruption, rollout safety
- Security: RBAC, service accounts, pod security, secret handling
- Networking: service exposure, ingress correctness, policy clarity
- Storage: stateful risk, backup/restore posture, PVC hygiene
- Observability: logs, metrics, alerts, evidence quality
- Delivery: declarative ownership, rollback realism, environment consistency

## Report Format

Start with findings, ordered by severity:

- **Critical**: user-impacting or high-blast-radius risk
- **High**: likely incident source or serious security gap
- **Medium**: meaningful reliability or operability issue
- **Low**: hygiene or maintainability issue

For each finding include:

- Location
- Why it matters
- Evidence
- Recommended next step

End with:

- Overall verdict
- Top three risks
- Fastest high-value remediation path
