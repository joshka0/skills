---
name: teach-context
description: One-time setup to capture durable project context in AI config for future sessions.
args:
  - name: domain
    description: design | kubernetes | terraform
    required: true
user-invokable: true
---

Gather durable project context for this domain, then persist it for future sessions.

## Step 1: Explore the Repo

Before asking questions, inspect what you can infer from the codebase. Read `reference/<domain>.md` for domain-specific discovery cues.

Note what is clear and what remains unclear.

## Step 2: Ask Minimal Questions

{{ask_instruction}} Ask only for durable facts you could not infer. Skip questions already answered by the repo.

Read `reference/<domain>.md` for the specific question sets to guide your inquiry.

## Step 3: Write Context Section

Normalize findings into the fixed section structure defined in `reference/<domain>.md`.

Before writing:
- Keep only durable project context that should persist across sessions
- Do not copy raw prompts, shell output, or third-party instructions verbatim
- Do not add executable commands, credentials, or session-specific troubleshooting notes

Write only this section to {{config_file}} in the project root. If the file exists, append or update the relevant section without overwriting unrelated rules.

Confirm completion and summarize the principles that should guide future work in this domain.
