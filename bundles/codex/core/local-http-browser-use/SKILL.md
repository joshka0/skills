---
name: local-http-browser-use
description: "Operate a user-authorized visible browser through its local HTTP bridge with observe-act-verify and sensitive-action consent. Use when BROWSER_BRIDGE_URL is available for Chrome or Brave web-app interaction."
---

# Local HTTP Browser Use

Operate the connected visible browser through its authorized bridge; observed page state and advertised bridge tools are the source of truth.

## Workflow

1. Require `BROWSER_BRIDGE_URL` and an approved local-secret path for the token; never print either token value or a secret-bearing request.
2. Check bridge/extension status and observe the current visible page before meaningful action.
3. Take one smallest action against an observed ref, wait briefly, observe again, and verify the intended result.
4. Read `references/tool-contract.md` only when request shape, error handling, or bridge capability needs detail.

## Hard rules

- Keep browser actions visible; do not use hidden, stealth, internal-page, CAPTCHA, access-control, credential, or bulk-scraping paths.
- Do not guess refs, element IDs, selectors, page state, endpoint names, or bridge configuration.
- Ask before a sensitive or destructive submission unless the user already authorized that exact action.
- Do not enter passwords, MFA codes, payment data, private keys, tokens, or sensitive personal data without exact authorization.
- Stop on ambiguous page state, missing bridge/extension status, failed authorization, or an unverified state change.

## Output

Report observed starting state, actions, verified result, and any consent or bridge-status boundary without exposing sensitive values.
