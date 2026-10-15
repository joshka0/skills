---
name: cloudflare-operations
description: "Run Cloudflare Email Routing cutovers with snapshot and rollback. Use for Email Routing, an MX conflict, or a forwarding rule."
---

# Cloudflare operations

- Email Routing: `references/email-routing.md`. Credentials come from `infra-token-factory`.
- Declared Terraform/OpenTofu/Alchemy state goes through the repo's IaC and `terraform-guard`.
- Verify endpoints and permission names from the installed SDK/provider types or Cloudflare's docs. Never from memory.
- Before any mutation: snapshot every live object the change can replace, and state the rollback. Afterward: read back from Cloudflare and test the consumer (public DNS plus the rule).

## Never

- Keep opaque account/zone/record IDs out of spoken output.
- Infer a forwarding inbox. The user states it literally.
- Continue past an interactive login, MFA, or a credential prompt. Name the exact user action.
