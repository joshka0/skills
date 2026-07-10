# Terraform Domain Reference

## Step 1: Exploration Cues

Inspect what you can infer from the codebase:

- Terraform roots, modules, backends, workspaces, and environment conventions
- Provider mix and version constraints
- CI/CD, GitOps, plan/apply workflow, and who owns applies
- Secret handling, remote state, locking, and policy tooling
- Tagging, naming, and account/project structure

## Step 2: Question Sets

### Platform
- Which cloud or providers matter here?
- What are the critical environments or accounts?
- What infrastructure is most sensitive to downtime or replacement risk?

### Delivery
- How are plans reviewed and applies performed?
- What is the real rollback path?
- Are imports, manual edits, or drift common?

### Safety
- How is state stored and locked?
- How are secrets handled?
- What should agents never do without explicit approval?

## Step 3: Section Template

Write a `## Infra Context` section with these subsections:

```markdown
## Infra Context

### Platform
[Providers, environments, accounts, critical systems]

### Delivery Workflow
[How plans are generated, reviewed, applied, and rolled back]

### State and Safety
[Backend, locking, secrets, policy, forbidden actions]

### Operational Priorities
[Downtime sensitivity, replacement risk, observability or compliance constraints]
```
