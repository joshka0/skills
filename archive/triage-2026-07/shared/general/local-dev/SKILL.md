---
name: local-dev
description: Local development environment setup — portless URLs, worktrees, GitLab CI/CD, smolvm sandbox isolation, dev proxies, and local secrets. Use when setting up dev environments, needing VM isolation, managing local credentials, or configuring dev proxies.
args:
  - name: mode
    description: setup | sandbox | secrets | proxy
    required: false
---

# Local Dev

## Modes

- `setup`: portless .localhost URLs, worktrees, GitLab CI/CD parity, private repos. Read `references/portless.md`.
- `sandbox`: smolvm microVMs for isolated dev, disposable execution, persistent state. Read `references/sandbox.md`.
- `secrets`: local secrets without exposing values, Infisical, Agent Vault, .env files. Read `references/secrets.md`.
- `proxy`: Tailscale/local-hop dev proxy, HTTPS remote browsers, SOCKS proxy. Read `references/proxy.md`.

## Hard Rules

- New repos default private and GitLab CI/CD-aware.
- Prefer worktrees for parallel work; VMs when isolation matters.
- Do not expose host secrets to VMs without explicit approval.
- Do not delete or prune VMs/worktrees without confirmation.

## Output

Report: mode, setup steps taken, verification result, any host-facing URLs.
