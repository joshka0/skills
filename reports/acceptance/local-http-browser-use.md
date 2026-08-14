# Local HTTP browser use acceptance

## Result

- Verdict: **PACKAGE-CONFORMS**. The package validates and its links resolve. `bin/link` returns exit 0 while reporting and preserving unrelated plugin-managed real entries.
- Canonical owner: `skills/local-http-browser-use` owns visible-browser bridge operation. `skills/aux` owns readiness orientation only.
- Archetype: `interaction`.
- Selected authoring modes: `evidence-and-safety` and `validation-and-acceptance`.
- Pre-rewrite ref: `f171623`.
- Package size: 168 text lines and 7,795 bytes. `SKILL.md` is 30 lines and 2,190 bytes. The reference is 20 lines and 1,951 bytes. The client is 118 lines and 3,654 bytes.
- Validators: `PASS: skills/local-http-browser-use (interaction)` and zero Kingfisher findings.

## Collision matrix

| Claimed signal | First owner | Nearest competitor | Discriminator or handoff |
| --- | --- | --- | --- |
| Check whether the private bridge can be used | `aux` | `local-http-browser-use` | AUX reports controller and extension readiness. This skill acts only after ready status. |
| Operate the authorized visible browser bridge | `local-http-browser-use` | generic browser automation | This skill requires the visible extension, observed state, and consent for sensitive actions. |
| Send one authenticated bridge request | `local-http-browser-use` | `agent-vault` | The local client reads its owner-only local token. Agent Vault remains for mapped external HTTP services. |
| Manage bridge installation or token lifecycle | host operations | `local-http-browser-use` | This package operates an existing bridge. It does not install, rotate, or disclose credentials. |

## Preservation ledger

| Qualifying delta | Disposition | Evidence |
| --- | --- | --- |
| Visible browser only | Kept | `SKILL.md:12,20`. |
| Observe-act-verify sequence | Kept | `SKILL.md:13-16`; `references/tool-contract.md`. |
| Sensitive-action consent | Kept | `SKILL.md:20-26`; `references/tool-contract.md`. |
| Screenshot verification boundary | Kept | `SKILL.md:15,25`; `references/tool-contract.md`. |
| Local token handoff through shell exports | Replaced | `SKILL.md:12-13,24`; `scripts/browser-bridge` reads the managed token internally. |
| Controller and extension readiness | Kept and exposed to AUX | `SKILL.md:12-13`; `scripts/browser-bridge:63-89`. |
| Tool request details | Kept selectively | `SKILL.md:16`; `references/tool-contract.md`. |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Non-default delta: operate a private visible-browser bridge with authenticated local transport and sensitive-action consent. |
| A02 | PASS | Browser interaction and its token-safe handoff recur across repositories and agents. |
| A03 | PASS | The collision matrix gives readiness to AUX and visible-browser action to this package. |
| A04 | PASS | Exactly one archetype: interaction. |
| A05 | PASS | `skills/local-http-browser-use` matches its unique kebab-case name. |
| A06 | PASS | Frontmatter contains only `name` and `description`. |
| A07 | PASS | The one-line description is below the interaction limit. |
| A08 | PASS | It names the visible HTTP bridge, observe-act-verify, consent, and a concrete `Use when` trigger. |
| A09 | PASS | AUX owns orientation; this package owns bridge interaction. |
| A10 | PASS | The trigger is bridge-specific and does not activate for generic web work. |
| A11 | PASS | The 30-line body and 168-line package pass interaction budgets. |
| A12 | PASS | Active prose contains only workflow, safety rules, stops, and output. |
| A13 | PASS | `references/tool-contract.md` resolves and loads only when request or failure detail is needed. |
| A14 | PASS | The 20-line reference and 7,795-byte package pass hard budgets. |
| A15 | PASS | One canonical body owns the workflow. Provider entries are links. |
| A16 | N/A | No modes. |
| A17 | N/A | No mode table. |
| A18 | N/A | Not a router. |
| A19 | N/A | No routed child overlay. |
| A20 | PASS | The client verifies the live controller response and reports its current URL, version, and extension state. |
| A21 | PASS | The package does not copy the installed bridge manual or API matrix. |
| A22 | N/A | No unverified pinned provider value. The loopback default is checked before token use and confirmed by live status. |
| A23 | PASS | Kingfisher found zero secrets. |
| A24 | PASS | Status output contains safe state only. The client never prints or exports the token. |
| A25 | PASS | Paths use `$HOME`; no literal personal-home path exists. |
| A26 | PASS | The client rejects non-loopback URLs, insecure or missing token files, missing tools, invalid JSON, invalid tool names, and bad status responses. |
| A27 | PASS | `scripts/browser-bridge` is referenced, executable, deterministic, Bash syntax-checked, and smoke-tested against the live local controller. The remote service state was verified directly. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Workflow and stops protect visible-state, stale-ref, consent, screenshot, secret, controller, and extension failures. |
| A30 | PASS | One canonical link exists in each affected provider farm. |
| A31 | PASS | `bin/link` returns exit 0. All five links resolve to `skills/local-http-browser-use`; unrelated plugin-managed real entries remain in place with warnings. |
| A32 | PASS | The package keeps the Herdr pilot's compact private-transport shape while using the explicit interaction archetype. |
| A33 | N/A | No consolidation or trim claim. |
| A34 | PASS | The preservation ledger accounts for each prior non-default browser delta. |
| A35 | PASS | Commit `f171623` preserves the pre-rewrite package. |

## Validation evidence

```text
PASS: skills/local-http-browser-use (interaction)
Bash syntax checks: exit 0
Local status: controller ready; extension connected; exit 0
Local authenticated browser_status call: ok true; extension connected; exit 0
Remote service status: controller ready; extension disconnected
Non-loopback URL gate: exit 64 before token use
Kingfisher findings: 0
bin/link: exit 0; links resolve in codex, agents, claude, gemini, and gemini-antigravity; unrelated real entries were reported and preserved
```
