# Security

## Least Privilege Defaults

- Use dedicated service accounts for non-trivial workloads
- Scope RBAC to namespace and resource verbs actually needed
- Avoid wildcards in `resources` and `verbs` unless there is a hard requirement

## Pod Security Baseline

- Run as non-root when possible
- Drop unnecessary capabilities
- Prefer read-only root filesystem where practical
- Set seccomp and avoid privileged containers by default

## Secrets

- Never commit secret values directly
- Prefer managed secret injection or sealed/encrypted secret workflows
- Limit which pods and namespaces can access which secrets

## Admission and Policy

- Make policy failures actionable, not mysterious
- Prefer guardrails that block dangerous defaults early
- Distinguish platform policy from app-specific behavior
