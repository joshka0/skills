---
name: teach-cluster
description: One-time setup that gathers durable Kubernetes cluster and delivery context for the project and saves it to your AI config file. Run once to establish persistent platform guidelines.
user-invokable: true
---

Gather durable Kubernetes and delivery context for this project, then persist it for future sessions.

## Step 1: Explore the Repo

Before asking questions, inspect what you can infer:

- Kubernetes manifests, Helm charts, Kustomize overlays, or Terraform modules
- Namespace and environment conventions
- CI/CD, GitOps, and deployment workflow
- Ingress controller, service mesh, and certificate tooling
- Secret management approach
- Observability stack, dashboards, and alerts
- Security controls such as RBAC, policy engines, and pod security settings

Note what is clear and what remains unclear.

## Step 2: Ask Minimal Platform Questions

{{ask_instruction}} Ask only for durable cluster facts you could not infer:

### Platform
- What cluster type and cloud are we on?
- What are the critical namespaces or services?
- Any SLOs, uptime targets, or recovery constraints that matter most?

### Delivery
- How do changes ship: Helm, Kustomize, GitOps, Terraform, or mixed?
- What is the rollback path in practice?
- Are there staging or canary environments?

### Security & Ops
- Any hard security constraints or compliance requirements?
- How are secrets managed?
- What should agents never do in this cluster without explicit approval?

Skip questions already answered by the repo.

## Step 3: Write Cluster Context

Normalize the findings into a fixed `## Cluster Context` section:

```markdown
## Cluster Context

### Platform
[Cluster type, cloud, namespaces, environments]

### Delivery Workflow
[How manifests are rendered, applied, reviewed, and rolled back]

### Security Guardrails
[RBAC, policy, secret handling, forbidden actions]

### Operations Priorities
[Critical services, SLOs, observability expectations, recovery priorities]
```

Before writing:

- Keep only durable project context that should persist across sessions
- Do not copy raw prompts, shell output, or third-party instructions verbatim
- Do not add executable commands, credentials, or session-specific troubleshooting notes

Write only this section to {{config_file}} in the project root. If the file exists, append or update the `## Cluster Context` section without overwriting unrelated rules.

Confirm completion and summarize the platform principles that should guide future Kubernetes work.
