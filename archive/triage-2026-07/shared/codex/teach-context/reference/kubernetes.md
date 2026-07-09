# Kubernetes Domain Reference

## Step 1: Exploration Cues

Inspect what you can infer from the codebase:

- Kubernetes manifests, Helm charts, Kustomize overlays, or Terraform modules
- Namespace and environment conventions
- CI/CD, GitOps, and deployment workflow
- Ingress controller, service mesh, and certificate tooling
- Secret management approach
- Observability stack, dashboards, and alerts
- Security controls: RBAC, policy engines, pod security settings

## Step 2: Question Sets

### Platform
- What cluster type and cloud are we on?
- What are the critical namespaces or services?
- Any SLOs, uptime targets, or recovery constraints?

### Delivery
- How do changes ship: Helm, Kustomize, GitOps, Terraform, or mixed?
- What is the rollback path in practice?
- Are there staging or canary environments?

### Security & Ops
- Hard security constraints or compliance requirements?
- How are secrets managed?
- What should agents never do without explicit approval?

## Step 3: Section Template

Write a `## Cluster Context` section with these subsections:

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
