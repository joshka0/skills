---
name: cloudflare-operations
description: "Mint least-privilege Cloudflare child tokens through the Keychain-backed factory, and run Email Routing cutovers with rollback. Use for a Cloudflare token, Email Routing, an MX conflict, or a forwarding rule."
disable-model-invocation: true
---

# Cloudflare operations

- Token work: `references/token-factory.md`. Email Routing: `references/email-routing.md`. If no child token has the needed scope, mint one first.
- Declared Terraform/OpenTofu/Alchemy state goes through the repo's IaC and `terraform-guard`. Generic secret injection goes to `local-dev`.
- Verify endpoints and permission names from the installed SDK/provider types or Cloudflare's docs. Never from memory.
- Before any mutation: snapshot every live object the change can replace, and state the rollback. Afterward: read back from Cloudflare and test the consumer (the token's endpoints, or public DNS plus the rule).

## Never

- Print, copy, or persist a bootstrap token, child token, or secret-bearing URL. Keep opaque account/zone/record IDs out of spoken output.
- Use the bootstrap token for anything except creating, verifying, or revoking child tokens.
- Silently switch to a user-owned token. Account-owned is the default for automation.
- Put a generated token in Terraform/Alchemy state unless the user accepts that boundary.
- Infer a forwarding inbox. The user states it literally.
- Continue past an interactive login, MFA, or a credential prompt. Name the exact user action.
