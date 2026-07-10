# Fleet acceptance — local-http-browser-use

## Result

- Verdict: **PACKAGE-CONFORMS**; catalog composition is deferred.
- Archetype: private leaf; final package 43 lines / pre-rewrite package 329 lines.
- Validator: `PASS: shared/general/local-http-browser-use (private-leaf)`.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| BROWSER_BRIDGE_URL, local bridge, visible Chrome/Brave | `local-http-browser-use` | `maestri` portal | This owns extension-backed HTTP bridge transport; Maestri owns canvas portals. |
| local proxy reachability | `local-dev` | browser bridge | Local-dev owns connectivity setup; this leaf owns browser action. |
| browser automation without local bridge | provider browser capability | this leaf | Do not select this leaf without its authorized bridge. |

## A34 preservation ledger

| Original delta | Disposition |
| --- | --- |
| visible observe-act-verify loop and consent rules | Kept: `SKILL.md`. |
| token/bridge/extension boundary | Kept: active workflow and reference. |
| stale-ref, status, and failure handling | Kept: `tool-contract.md`. |
| fixed localhost URL, tool manual, long endpoint examples | Dropped: machine-specific/volatile catalog. |

## A35 archive

Exact original package: `archive/triage-2026-07/shared/general/local-http-browser-use/`.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Private authorized browser bridge transport and consent contract. |
| A02 | PASS | Visible web-app interaction recurs. |
| A03 | PASS | Matrix separates bridge, portal, and proxy ownership. |
| A04 | PASS | Private leaf. |
| A05 | PASS | Unique matching canonical name. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line description under 220 characters. |
| A08 | PASS | Names bridge and Chrome/Brave selection signal. |
| A09 | PASS | Collision matrix supplies precedence. |
| A10 | PASS | Requires explicit environment signal. |
| A11 | PASS | 27-line body within private-leaf cap. |
| A12 | PASS | Active body is workflow/rules/output. |
| A13 | PASS | One tool-contract selection condition. |
| A14 | PASS | 43-line package. |
| A15 | DEFERRED | Catalog clause awaits composition. |
| A16 | N/A | No modes. |
| A17 | N/A | No modes. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Advertised bridge/live status governs behavior. |
| A21 | PASS | Copied endpoint catalog removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | Token/sensitive input constraints are explicit. |
| A24 | PASS | No secret values are printed or discovered. |
| A25 | PASS | No literal personal-home path. |
| A26 | PASS | Bridge/extension/page state is live-verified. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Observation, consent, and ambiguity stops protect real failures. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Private-leaf shape follows golden evidence. |
| A33 | PASS | 43 < 329 lines. |
| A34 | PASS | Ledger above covers qualifying deltas. |
| A35 | PASS | Exact original archived before rebuild. |

```text
PASS: shared/general/local-http-browser-use (private-leaf)
```
