# Providers

## Versioning and Auth

- Constrain provider versions intentionally
- Make aliases explicit and understandable
- Keep auth flow deterministic across local and CI runs

## Common Failure Modes

- Expired or mismatched credentials
- Provider alias confusion
- Region/account mismatch
- Breaking changes from overly loose version constraints

## Review

- Are provider blocks consistent across modules?
- Is the intended account, project, or subscription obvious?
- Would CI and local execution resolve credentials the same way?
