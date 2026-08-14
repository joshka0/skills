# Local HTTP browser use acceptance

## Result

- Verdict: **PACKAGE-CONFORMS**. The package validates, its links resolve, global Codex and Claude rules route visible-browser readiness through AUX, and the final fresh-agent wave used the bridge or stopped at the AUX boundary as required.
- Canonical owner: `skills/local-http-browser-use` owns visible-browser bridge operation. `skills/aux` owns readiness orientation only.
- Archetype: `interaction`.
- Selected authoring modes: `package-and-routing` and `validation-and-acceptance`.
- Pre-rewrite refs: `f171623` preserves the package before the token-safe client; `467938e` preserves the first client routing contract before blind-agent correction.
- Package size: 180 text lines and 8,500 bytes. `SKILL.md` is 31 lines and 2,386 bytes. The reference is 31 lines and 2,460 bytes. The client is 118 lines and 3,654 bytes.
- Validators: `PASS: skills/local-http-browser-use (interaction)` and zero Kingfisher findings.

## Collision matrix

| Claimed signal | First owner | Nearest competitor | Discriminator or handoff |
| --- | --- | --- | --- |
| Check whether visible-browser automation can be used | `aux` | `local-http-browser-use`; bundled in-app browser control | AUX runs first and reports the usable surface. |
| Operate the authorized visible Chrome or Brave | `local-http-browser-use` | bundled in-app browser control | This skill wins after AUX reports the private bridge ready. In-app control requires an explicit in-app Browser request. |
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
| Visible-browser trigger and in-app collision | Kept and clarified | Frontmatter, `SKILL.md:12`, and the live global rules make AUX readiness precede browser action. |
| Controller and extension readiness | Kept and exposed to AUX | `SKILL.md:12-13`; `scripts/browser-bridge:63-89`. |
| Tool request details | Kept selectively | `SKILL.md:16`; `references/tool-contract.md` gives the common observe, new-tab, wait, and tab-observe calls. |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Non-default delta: operate a private visible-browser bridge with authenticated local transport and sensitive-action consent. |
| A02 | PASS | Browser interaction and its token-safe handoff recur across repositories and agents. |
| A03 | PASS | The collision matrix gives readiness to AUX and visible-browser action to this package. |
| A04 | PASS | Exactly one archetype: interaction. |
| A05 | PASS | `skills/local-http-browser-use` matches its unique kebab-case name. |
| A06 | PASS | Frontmatter contains only `name` and `description`. |
| A07 | PASS | The one-line, two-sentence description is below the interaction limit. |
| A08 | PASS | It names authorized visible Chrome or Brave, the private bridge, and AUX readiness for visible-browser work. |
| A09 | PASS | Live `AGENTS.md` and `CLAUDE.md` rules give AUX first ownership. Fresh Codex and Claude sessions followed that route without task-level hints. |
| A10 | PASS | The trigger is bridge-specific and does not activate for generic web work. |
| A11 | PASS | The 31-line body and 180-line package pass interaction budgets. |
| A12 | PASS | Active prose contains only workflow, safety rules, stops, and output. |
| A13 | PASS | `references/tool-contract.md` resolves and loads only when request or failure detail is needed. |
| A14 | PASS | The 31-line reference and 8,500-byte package pass hard budgets. |
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
| A35 | PASS | Commits `f171623` and `467938e` preserve both pre-rewrite package states. |

## Validation evidence

```text
PASS: skills/local-http-browser-use (interaction)
Bash syntax checks: exit 0
Local status: controller ready; extension connected; exit 0
Local authenticated browser_status call: ok true; extension connected; exit 0
Remote service status: controller ready; extension disconnected
Non-loopback URL gate: exit 64 before token use
Blind Codex wave 1: bundled in-app browser selected; AUX not called
Blind Claude wave 1: AUX called only after ad hoc host discovery
Blind Codex wave 2 after description correction: bundled in-app browser still selected; AUX not called
Blind Claude wave 2 after description correction: AUX called before bridge action; extra diagnosis remained
Blind Codex wave 3 after global routing rule: AUX selected first and browser task completed; common new-tab discovery still required source search
Blind Claude wave 3 after global routing rule: AUX selected first; unrequested host diagnosis remained
Blind Codex wave 4 after common-call recipe: AUX, observe, new tab, observe; Example Domain verified; no source search
Blind Claude wave 4 after explicit terminal-stop rule: minimum SSH check, aux browser, terminal stop; no extra diagnosis
Kingfisher findings: 0
bin/link: exit 0; links resolve in codex, agents, claude, gemini, and gemini-antigravity; unrelated real entries were reported and preserved
```
