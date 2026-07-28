# `local-http-browser-use` package acceptance — 2026-07-15

## Decision

- Canonical owner: `shared/general/local-http-browser-use/`
- Archetype: private-tool leaf (`private-leaf` validator tier)
- Selected decision surfaces: package/routing, evidence/safety, and validation/acceptance; all four normative references were read as required by repository instructions.
- Non-default delta: the skill binds a private local bridge, its secret-safe transport, visible observe-act-verify loop, and screenshot-artifact verification boundary.
- Archive: `history/browser-capture-2026-07-15/pre-rewrite/shared/general/local-http-browser-use/`
- Mechanical validation: `PASS: shared/general/local-http-browser-use (private-leaf)`
- Verdict: **PACKAGE-CONFORMS**. Generated-provider refresh remains deferred because this request did not authorize `bin/pack apply`.

## Collision matrix

| Signal | First owner | Nearest neighbor | Discriminator and handoff |
| --- | --- | --- | --- |
| `BROWSER_BRIDGE_URL` | `local-http-browser-use` | `maestri` | Local HTTP/WebSocket bridge wins; named Maestri portals hand off to `maestri`. |
| Visible Chrome/Brave web interaction | `local-http-browser-use` | `product-platform` | Operating an authorized bridge stays here; building or redesigning an extension runtime hands off to `product-platform`. |
| Screenshot artifact from the bridge | `local-http-browser-use` | none | The private bridge contract owns loading the returned file as image input and reporting capture warnings. |

## Preservation ledger

| Delta | Disposition | Evidence |
| --- | --- | --- |
| Local-secret bridge URL/token handoff | Kept | `SKILL.md` workflow and hard rules |
| Visible observe-act-verify interaction | Kept | `SKILL.md` workflow and `references/tool-contract.md` |
| Sensitive/destructive confirmation boundary | Kept | `SKILL.md` hard rules and tool contract |
| File-backed screenshot must be loaded as image input | Added | `SKILL.md` workflow step 4 and tool contract |
| Full-page thumbnail versus element/region detail | Added | `references/tool-contract.md` |
| Screenshot secret and scroll-stitch warning boundary | Added | `SKILL.md` hard rules and tool contract |
| Existing qualifying delta | Dropped | None |

## A01–A35

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Private bridge topology and screenshot artifact handling exceed generic browser knowledge. |
| A02 | PASS | The bridge is a recurring local browser-control surface. |
| A03 | PASS | Collision matrix establishes standalone private-tool ownership. |
| A04 | PASS | Exactly one archetype: leaf. |
| A05 | PASS | Canonical home and kebab-case name match under `shared/general/`. |
| A06 | PASS | Minimal `name` and `description` frontmatter only. |
| A07 | PASS | One-line 207-character description is below the 220-character leaf cap. |
| A08 | PASS | Description names the operation and concrete environment/browser trigger. |
| A09 | PASS | Collision matrix gives each nearby signal one first owner. |
| A10 | PASS | No greedy trigger or implicit persona activation. |
| A11 | PASS | Active file is 29 lines / 1,935 bytes. |
| A12 | PASS | Active instructions contain routing, workflow, hard rules, and output only. |
| A13 | PASS | The sole reference has an explicit selection condition and resolves. |
| A14 | PASS | Reference is 20 lines / 1,951 bytes; package total is 49 lines / 3,886 bytes. |
| A15 | PASS / catalog clause DEFERRED | No duplicated or orphaned instructional prose; provider promotion is deferred. |
| A16 | N/A | Not a mode suite. |
| A17 | N/A | Not a mode suite. |
| A18 | N/A | Not a router. |
| A19 | N/A / overlay clause DEFERRED | Not a router; provider promotion is deferred. |
| A20 | PASS | Runtime capability comes from advertised tools and live bridge status. |
| A21 | PASS | No copied public manual or API matrix. |
| A22 | PASS | No pinned external volatile values. |
| A23 | PASS | No credential values or secret-bearing URLs. |
| A24 | PASS | Rules prohibit token and inline screenshot disclosure. |
| A25 | PASS | Canonical content uses environment variables and no personal-home literal. |
| A26 | PASS | Bridge URL/status and tool surface are live-verified. |
| A27 | N/A | Package contains no scripts. |
| A28 | N/A | Package contains no assets or provider metadata. |
| A29 | PASS | Rules protect concrete authorization, stale-ref, capture, and secret failures. |
| A30 | DEFERRED | Catalog membership is unchanged; provider apply was not authorized. |
| A31 | DEFERRED | Full pure render passed; installed-provider refresh remains unperformed. |
| A32 | PASS | Compact private-tool shape matches the accepted `herdr` pilot pattern. |
| A33 | N/A | This is an additive trim, not consolidation or replacement. |
| A34 | PASS | Preservation ledger accounts for every qualifying delta. |
| A35 | PASS | Exact pre-edit package is archived at the path above. |

## Verification evidence

- `bin/validate-skill.sh shared/general/local-http-browser-use private-leaf` returned `PASS`.
- `bin/pack render --all --full` rendered all seven provider views successfully.
- The render diff for `providers/codex/local-http-browser-use` contains only the intended screenshot workflow and safety additions.
- `bin/pack check` returned `CHECK: FAIL` only at the expected unapplied composition boundary: eleven consumer-union/render-live errors for the two changed `local-http-browser-use` files, plus the pre-existing `caveman` routing warning. Package validators, catalog validation, links, secret scan, catalog declarations, native exceptions, fixtures, and the render-and-compare engine all passed.
