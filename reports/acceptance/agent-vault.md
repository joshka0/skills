# Agent Vault skill acceptance

## Decision

- Canonical owner: `skills/agent-vault`
- Archetype: private leaf
- Pre-create git ref: `a14aadf`
- Pre-command-scope rewrite ref: `7370682`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **BLOCKED**. `manifest.json` replaces the two native Agent Vault imports with this canonical owner. Composition is not run because the current linker permanently removes obsolete symlinks, which conflicts with the repository's Trash-only policy.

The non-default delta is the local broker contract: wrap only the credential-bearing command, keep Infisical authoritative, enforce denied hosts, and never read raw credentials or store them through proposals.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| Authenticated API from a brokered command | `agent-vault` | `agent-secret-infrastructure` | This skill owns safe request behavior. Infrastructure owns broker policy and deployment. |
| Herdr secret-aware task | `herdr` | `agent-vault` | Herdr starts the model normally and passes safe scope metadata. This skill owns the selected command. |
| Application environment injection | `local-dev` | `agent-vault` | `local-dev` owns app runtime values. Agent Vault owns brokered HTTP requests. |
| Vault grant, service mapping, or sync | `agent-secret-infrastructure` | `agent-vault` | These are control-plane changes, not ordinary requests. |
| Public unauthenticated web request | Web or browser owner | `agent-vault` | No credential session is needed, so Agent Vault does not trigger. |

## Preservation ledger

| Imported Agent Vault delta | Disposition | Final evidence |
| --- | --- | --- |
| Discover service hosts and key names before use | Kept | `SKILL.md` preflight |
| Call the real upstream URL through transparent proxy variables | Kept | `SKILL.md` workflow |
| Deny, expired-session, and rate-limit behavior | Kept and trimmed | `SKILL.md` workflow |
| Current `AGENT_VAULT_TOKEN` session contract | Kept from installed v0.39.1 help | `SKILL.md` preflight |
| Raw credential retrieval | Dropped | It violates the local broker boundary. |
| Agent Vault proposals as secret storage | Dropped | Infisical is the only source of truth. |
| Copied auth-type matrix and public API manual | Dropped | Live product help and service policy are authoritative. |
| Native `agent-vault-cli` and `agent-vault-http` sources | Retained but unexposed in the desired manifest | Repository policy forbids permanent removal. Git history also preserves them. |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The package adds a private broker and Infisical handoff contract. |
| A02 | PASS | Authenticated agent API calls recur across repositories and hosts. |
| A03 | PASS | The collision matrix assigns one owner at each task, request, runtime, and control-plane boundary. |
| A04 | PASS | Exactly one archetype: private leaf. |
| A05 | PASS | The canonical path and unique kebab-case name match. |
| A06 | PASS | Frontmatter contains only name and description. |
| A07 | PASS | The one-line description is 153 characters, below 220. |
| A08 | PASS | The description names brokered credentials and an authenticated external API. |
| A09 | PASS | Collision rules give one first owner per signal. |
| A10 | PASS | The skill does not claim public or unauthenticated requests. |
| A11 | PASS | `SKILL.md` is 38 lines and 2,622 bytes. |
| A12 | PASS | The body contains preflight, workflow, handoffs, stops, and output only. |
| A13 | N/A | The package has no references. |
| A14 | PASS | The two-file package is 42 lines and 2,870 bytes. |
| A15 | PASS | Active policy has one canonical owner; catalog removal is deferred. |
| A16 | N/A | Not a suite. |
| A17 | N/A | No modes. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Installed CLI help defines volatile environment and command behavior. |
| A21 | PASS | No public manual or auth matrix remains. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | Kingfisher found zero secrets across all three changed packages. |
| A24 | PASS | Discovery and output use safe vault, host, key-name, and status metadata only. |
| A25 | PASS | No personal absolute path exists. |
| A26 | PASS | Session variables and live discovery fail closed. |
| A27 | N/A | No package script. |
| A28 | PASS | Provider metadata is small, linked to the skill, and secret-free. |
| A29 | PASS | Rules protect raw reads, proxy bypass, denied hosts, and split secret stores. |
| A30 | BLOCKED | Desired exposure is in `manifest.json`; provider farms are not composed. |
| A31 | BLOCKED | The linker conflicts with the Trash-only removal policy. |
| A32 | PASS | The package follows the compact private-tool shape of the Herdr pilot. |
| A33 | PASS | The canonical package is 40 lines versus 495 lines across the two retained imported manuals. |
| A34 | PASS | The preservation ledger accounts for the imported non-default deltas. |
| A35 | PASS | The package did not exist at pre-create ref `a14aadf`; its pre-command-scope form is committed at `7370682`. |

## Validation evidence

```text
$ bin/validate-skill.sh skills/agent-vault private-leaf
PASS: skills/agent-vault (private-leaf)
exit_code=0

$ uv run --with pyyaml python providers/codex/.system/skill-creator/scripts/quick_validate.py skills/agent-vault
Skill is valid!
exit_code=0
```

The package conforms. Catalog conformance waits for a Trash-safe linker change or a user-performed composition step.
