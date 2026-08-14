---
name: local-http-browser-use
description: "Operate the authorized visible Chrome or Brave through the private local HTTP bridge. Use after AUX reports the bridge ready for visible-browser work."
---

# Local HTTP Browser Use

Operate the connected visible browser through its authorized bridge; observed page state and advertised bridge tools are the source of truth.

## Workflow

1. Run `aux browser` first. On a remote target, make it the first target command after the minimum connection check. Use its reported `browser-bridge` client and require both controller and visible-browser extension status to be ready.
2. Do not repeat the status check. Run `browser-bridge call browser_observe '{"maxElements":80}'` before meaningful action. The client reads the protected local token without printing or exporting it.
3. Take one smallest action against an observed ref, wait briefly, observe again, and verify the intended result.
4. For a visual question, use the advertised screenshot capability after observing; when it returns an artifact path, load that file as image input before making a visual claim.
5. Read `references/tool-contract.md` only when request shape, error handling, or bridge capability needs detail.

## Hard rules

- Keep browser actions visible; do not use hidden, stealth, internal-page, CAPTCHA, access-control, credential, or bulk-scraping paths.
- Do not guess refs, element IDs, selectors, page state, endpoint names, or bridge configuration.
- Ask before a sensitive or destructive submission unless the user already authorized that exact action.
- Do not enter passwords, MFA codes, payment data, private keys, tokens, or sensitive personal data without exact authorization.
- Do not bypass the client by reading, printing, or exporting the bridge token. Use the token file only through `browser-bridge`.
- Do not print inline screenshot data or capture a page that visibly contains an unapproved secret.
- Treat an AUX browser stop as final. Do not inspect browser processes, desktop sessions, services, ports, configuration, or bridge internals unless the user asks for diagnosis.
- Stop on ambiguous page state, missing bridge/extension status, failed authorization, or an unverified state change.

## Output

Report observed starting state, actions, verified result, and any consent or bridge-status boundary without exposing sensitive values.
