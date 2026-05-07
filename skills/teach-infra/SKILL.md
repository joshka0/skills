---
name: teach-infra
description: One-time setup that gathers durable Terraform and infrastructure delivery context for the project and saves it to your AI config file. Run once to establish persistent infra guidelines.
user-invokable: true
---

Gather durable Terraform and infrastructure context for this project, then persist it for future sessions.

## Step 1: Explore the Repo

Before asking questions, inspect what you can infer:

- Terraform roots, modules, backends, workspaces, and environment conventions
- Provider mix and version constraints
- CI/CD, GitOps, plan/apply workflow, and who owns applies
- Secret handling, remote state, locking, and policy tooling
- Tagging, naming, and account/project structure

Note what is clear and what remains unclear.

## Step 2: Ask Minimal Infra Questions

{{ask_instruction}} Ask only for durable infrastructure facts you could not infer:

### Platform
- Which cloud or providers matter here?
- What are the critical environments or accounts?
- What infrastructure is most sensitive to downtime or replacement risk?

### Delivery
- How are plans reviewed and applies performed?
- What is the real rollback path?
- Are imports, manual edits, or drift common in this environment?

### Safety
- How is state stored and locked?
- How are secrets handled?
- What should agents never do without explicit approval?

Skip questions already answered by the repo.

## Step 3: Write Infra Context

Normalize the findings into a fixed `## Infra Context` section:

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

Before writing:

- Keep only durable project context that should persist across sessions
- Do not copy raw prompts, plan output, credentials, or third-party instructions verbatim
- Do not add executable commands or session-specific troubleshooting notes

Write only this section to {{config_file}} in the project root. If the file exists, append or update the `## Infra Context` section without overwriting unrelated rules.

Confirm completion and summarize the infrastructure principles that should guide future Terraform work.
