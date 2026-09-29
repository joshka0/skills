# Cloudflare Operations skill acceptance

## Decision

- Canonical owner: `skills/cloudflare-operations`
- Archetype: mode suite with `token-factory` and `email-routing`
- Selected contract surfaces: existence and ownership, package and routing, evidence and safety, validation and acceptance
- Pre-create git ref: `d4d730a03617a047184edec750fca29d5bae244c`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED**. The active safety policy forbids the symlink-removal operation in `bin/link`, and repository rules forbid editing provider farms by hand.

The non-default delta is an approval-gated Cloudflare token-ownership and Email Routing cutover contract with direct vault handoff, rollback, and control-plane plus public verification.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| Cloudflare token factory | `cloudflare-operations` → `token-factory` | `local-dev` | This skill owns Cloudflare token ownership, policy, verification, and rollback. `local-dev` owns generic named-secret injection. |
| Cloudflare Email Routing | `cloudflare-operations` → `email-routing` | `infra-bundles` | This skill owns destination, MX/SPF, rule, and public-DNS safety. Declared Terraform, OpenTofu, or Alchemy delivery stays with `infra-bundles`. |
| Existing non-Cloudflare MX conflict | `cloudflare-operations` → `email-routing` | generic DNS or IaC work | The exact legacy mail-provider snapshot, bounded replacement, restore-on-failure, and routing readback select this skill. |
| Cloudflare forwarding rule | `cloudflare-operations` → `email-routing` | generic DNS work | The account destination verification and literal Email Routing matcher/action distinguish the request. |
| Named secret injection only | `local-dev` | `cloudflare-operations` | No Cloudflare policy or product operation exists, so the generic secret owner wins. |
| Agent Vault operation | `agent-vault-cli` or `agent-vault-http` | `cloudflare-operations` | An explicit Agent Vault request uses its provider skill. This package applies only as a Cloudflare policy boundary when needed. |

## Preservation ledger

| Qualifying delta from the live operation | Disposition | Final owner |
| --- | --- | --- |
| Account-owned versus user-owned token distinction | Kept | `references/token-factory.md` under `Choose the ownership class` |
| Custom-token permissions do not grant the special user-token factory capability | Kept | `references/token-factory.md` under `Choose the ownership class` and `Diagnose failures` |
| User permission-group listing can reject an active bearer token | Kept with live-source requirement | `references/token-factory.md` under `Resolve permission groups` |
| Account token creation and account verification must use the same ownership family | Kept | `references/token-factory.md` under `Mint into Infisical` and `Diagnose failures` |
| Bootstrap credential stays behind explicit local approval and a stable broker | Kept | `SKILL.md` under `Hard rules`; `references/token-factory.md` under `Protect the bootstrap credential` |
| One app-neutral Keychain locator prevents product-scoped factory copies | Kept as a pack constraint with a live check | `references/token-factory.md` under `Pack constraint: Keychain locator` |
| A missing or under-scoped child token triggers an approval-gated mint into an explicit Infisical destination | Kept as the suite prerequisite and handoff contract | `SKILL.md` under `Route` and `Shared workflow`; `references/token-factory.md` under `Decide whether to mint` and `Pack constraint: Infisical handoff` |
| Child token goes directly to the vault and is revoked on handoff failure | Kept | `SKILL.md` under `Hard rules`; `references/token-factory.md` under `Mint into Infisical` |
| Email Routing child uses separate account and zone permissions | Kept as names with live resolution | `references/token-factory.md` under `Resolve permission groups` |
| Forwarding destination must be stated by the user, not inferred from another app secret | Kept | `SKILL.md` under `Hard rules`; `references/email-routing.md` under `Establish the target` |
| Destination verification gates DNS and rule changes | Kept | `SKILL.md` under `Hard rules` and `Stop conditions`; `references/email-routing.md` under `Register and verify the destination` |
| Dashboard-proposed MX/SPF records are not live evidence | Kept | `SKILL.md` under `Hard rules`; `references/email-routing.md` under `Inspect live state` |
| Legacy MX and SPF need an exact snapshot and automatic restoration on activation failure | Kept | `SKILL.md` under `Hard rules`; `references/email-routing.md` under `Replace a legacy forwarding provider` |
| Literal rule, no implicit catch-all, rule readback, public DNS, and external delivery test | Kept | `references/email-routing.md` under `Create a forwarding rule` and `Verify the cutover` |
| Literal account IDs, zone IDs, permission IDs, token values, personal paths, and personal email addresses | Dropped | Machine-specific or secret/private values fail the portability and safety bar. |
| Host-local Swift broker source and pinned permission catalog | Not copied | The package preserves its security and workflow contract. Installed tools and current provider types remain the volatile source of truth. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The package adds Cloudflare ownership-class, approval, rollback, and mail-cutover rules that generic agents do not sustain reliably. |
| A02 | PASS | Cloudflare tokens, DNS, Email Routing, and forwarding rules recur across domains and applications. |
| A03 | PASS | The collision matrix separates Cloudflare operations from generic secret injection, Agent Vault, and declared IaC delivery. |
| A04 | PASS | Exactly one archetype: a two-mode suite. |
| A05 | PASS | `skills/cloudflare-operations` matches the unique `name: cloudflare-operations`. |
| A06 | PASS | Frontmatter contains only `name` and `description`. |
| A07 | PASS | The description is one physical line, two sentences, and 204 characters, below the 320-character suite limit. |
| A08 | PASS | It names account-token and Email Routing operations and ends with four concrete selection signals. |
| A09 | PASS | The collision matrix establishes one first owner and an explicit handoff for each neighboring signal. |
| A10 | PASS | The description has no greedy trigger or implicit interaction mode. |
| A11 | PASS | `SKILL.md` is 59 lines and 4,290 bytes, below the suite limit. |
| A12 | PASS | The active body contains only routing, precedence, shared workflow, hard rules, stops, and output. |
| A13 | PASS | Both references have exact mode rows and the active body says to load only the selected reference. |
| A14 | PASS | References are 83 and 121 lines; the package is 267 text lines and 17,134 bytes, below all limits. |
| A15 | DEFERRED | Local prose is not duplicated. Provider catalog reachability awaits composition. |
| A16 | PASS | Two modes share one Cloudflare identity, authorization, mutation, rollback, and verification lifecycle. |
| A17 | PASS | `token-factory` and `email-routing` are distinct kebab-case modes with exact reference files and one-mode default selection. |
| A18 | N/A | The package is not a router. |
| A19 | N/A | The package is not a router. |
| A20 | PASS | Workflow order is repository state, installed types or live state, then current primary documentation. |
| A21 | PASS | No copied Cloudflare manual, endpoint catalog, or provider tutorial remains. |
| A22 | PASS | No volatile identifier or endpoint is pinned as a package constraint; current operations require live verification. |
| A23 | PASS | Secret scan found no credential-shaped values, private key, personal email, token value, or secret-bearing URL. |
| A24 | PASS | Discovery is limited to safe names, availability, status, and redacted error codes. |
| A25 | PASS | No literal personal-home path or machine-specific filesystem path exists. |
| A26 | PASS | Account, zone, broker, vault, provider version, and API behavior must be discovered live; ambiguity stops the operation. |
| A27 | N/A | The package has no scripts. |
| A28 | PASS | `agents/openai.yaml` derives from the same package name and trigger, uses no asset, and contains no secret or duplicate contract. |
| A29 | PASS | Rules protect real token leakage, ownership mismatch, wrong inbox, mail outage, rollback, and false readiness failures. |
| A30 | DEFERRED | Canonical provider exposure awaits a safe composition path. |
| A31 | DEFERRED | Local links resolve and no package symlink exists. Provider farms were not changed by hand. |
| A32 | PASS | The package follows the compact `code-quality` suite shape and the `herdr` private-operation safety posture. |
| A33 | N/A | This is a new package, not a consolidation or trim. |
| A34 | PASS | The preservation ledger accounts for every durable delta and excluded volatile or private value. |
| A35 | PASS | The skill did not exist at pre-create ref `d4d730a03617a047184edec750fca29d5bae244c`. |

## Validation evidence

```text
$ bin/validate-skill.sh skills/cloudflare-operations suite
PASS: skills/cloudflare-operations (suite)
exit_code=0

$ uv run --with pyyaml python providers/codex/.system/skill-creator/scripts/quick_validate.py skills/cloudflare-operations
Skill is valid!
exit_code=0
```

The canonical package conforms. Catalog exposure remains deferred until `bin/link` can run without violating the active no-symlink-removal policy.
