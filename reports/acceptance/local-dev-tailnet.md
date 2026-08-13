# local-dev — tailnet publishing merge

## Decision

- Canonical owner: `skills/local-dev` (existing suite; **no new catalog slot**)
- Change: added `references/tailnet-publishing.md`, a selection condition in
  `references/topology.md`, and the `tailnet-reachable endpoints` trigger to the
  description and route row.
- Pre-rewrite git ref: `5758ddb44758878ab833e4677061491dba2628e2`
- Validation: `bin/validate-skill.sh skills/local-dev suite` → `PASS: skills/local-dev (suite)`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED** — no composition performed; `manifest.json`,
  `providers/` and installed views untouched, per the hard rule.

The request was for a standalone skill. The existence gate refuses it: the
delta is real, but **standalone need** fails (it fits an existing owner's mode)
and **trigger separability** fails against that owner's "development proxy, or
reachability path" claim. Decision rule for that combination is MERGE. The user
was shown the gate result and chose the merge.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| tailnet-reachable endpoint, publish to MagicDNS | `local-dev` (topology) | none | Reachability topology already belongs to this mode; the tailnet case is one reference within it. |
| development proxy, reachability path | `local-dev` (topology) | — | Unchanged; the new trigger is a narrowing of it, not a sibling. |
| port-naming proxy on this machine | `local-dev` (topology) | — | Same mode. The reference states the two are different layers and both are kept. |
| browser interaction with a served page | `local-http-browser-use` | `local-dev` | Unchanged handoff; the new reference restates it only by pointing at the existing step. |
| cluster ingress, service mesh, IaC-managed routing | `infra-bundles` | `local-dev` | Desired/live infrastructure stays with the infra router; this is a developer-machine reachability decision. |

## Acceptance

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Delta: cross-machine reachability facts a model guesses wrong — loopback-scoped suffixes cannot cross machines, prefix mounts strip server-side but break relative assets client-side, tailnet-only and public are different verbs. |
| A02 | PASS | Recurs per service published from a developer machine. |
| A03 | PASS | Merged rather than slotted; owner named. See collision matrix. |
| A04 | PASS | Suite unchanged; no archetype change. |
| A05 | PASS | Existing `skills/local-dev`, unique kebab-case name. |
| A06 | PASS | Frontmatter still `name` + `description` only. |
| A07 | PASS | One physical line, 210 chars, two sentences, within the 320 suite budget. |
| A08 | PASS | Final sentence remains a concrete `Use when ...` list; the new trigger is one item in it. |
| A09 | PASS | No neighbor claims tailnet publishing; collision matrix records first ownership. |
| A10 | PASS | Trigger is a concrete noun phrase, not a greedy topic label; no persona activation. |
| A11 | PASS | Validator budget checks pass. |
| A12 | PASS | Active file gains only a route-row clause; workflow, rules, stops, output unchanged. |
| A13 | PASS | New reference reached only through topology step 5's stated condition. |
| A14 | PASS | Reference is 38 lines; validator budget checks pass. |
| A15 | PASS | No duplication with `topology.md`; the general procedure stays there, the tailnet-specific decisions here. |
| A16–A19 | N/A | Mode count and router shape unchanged. |
| A20 | PASS | Instructs discovery from installed CLI help and live configuration, in that order. |
| A21 | PASS | No copied manual; no flag tables, no command catalog. |
| A22 | N/A | No pinned volatile value; surfaces are described by capability, not by flag name. |
| A23 | PASS | No secret-shaped value. |
| A24 | PASS | Reporting instruction limits output to the emitted URL, current mounts, and the removal command. |
| A25 | PASS | No literal home path; validator's home-path check passes. |
| A26 | PASS | Hostnames, ports and paths are discovered from live status, never named. |
| A27 | N/A | No scripts added. |
| A28 | N/A | No assets added. |
| A29 | PASS | Rules protect concrete observed failures: displaced mounts, LAN exposure, silent half-loaded page. |
| A30–A31 | DEFERRED | Composition not performed. |
| A32 | PASS | Validator run recorded above; shape follows the retained suite's existing references. |
| A33 | N/A | Not a consolidation or trim. |
| A34 | PASS | Preservation ledger below. |
| A35 | PASS | Pre-rewrite original of `local-dev` is committed at the ref above; only additive edits since. |

## Preservation ledger

| Delta | Disposition | Where |
| --- | --- | --- |
| Loopback-scoped names cannot cross machines; port-naming and tailnet naming are different layers | KEPT | `tailnet-publishing.md` § Decide the surface first |
| Three tailnet surfaces ordered by setup cost; verify support from live help | KEPT | same section |
| Tailnet-only vs public are different verbs; never substitute | KEPT | same section |
| Treat existing mounts as owned; add, never replace or reset | KEPT | § Before changing anything |
| Bind backend to loopback so the local network is not additionally exposed | KEPT | same section |
| Prefix is stripped server-side, so the app needs no base-path config — but verify | KEPT | § The prefix trap |
| Missing trailing slash resolves relative assets one level too high and fails silently | KEPT | same section |
| Fix must carry no mount point, so the document still works at root and from disk | KEPT | same section |
| Verify from the tailnet name, including a real browser load | KEPT | § Verify |
| Specific tool name, flags, hostname, ports, and the concrete `/k8s` mount | DROPPED | Machine-specific and volatile; contract forbids freezing them in canonical prose. Discovery procedure kept instead. |

## Note for composition

`manifest.json` and `providers/` were deliberately not touched. `local-dev` is
already exposed, and this change adds no new catalog entry — but if provider
views pin reference lists, `bin/link` should be re-run before the next release.
