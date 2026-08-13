# Agent Secret Infrastructure skill acceptance

## Decision

- Canonical owner: `skills/agent-secret-infrastructure`
- Archetype: private leaf
- Selected contract surfaces: existence and ownership, package and routing, evidence and safety, validation and acceptance
- Pre-create git ref: `d4d730a03617a047184edec750fca29d5bae244c`
- Pre-rewrite git ref: `82cca5c`
- Pre-publisher-contract git ref: `a14aadf`
- Pre-command-scope rewrite ref: `7370682`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED**. The new links resolve in every provider and in the installed Codex views. The repository-wide `bin/link` command exits 1 because it finds unrelated unmanaged real entries in existing provider farms.

The non-default delta is a private control-plane runbook that fixes the Infisical source-of-truth boundary, isolated Agent Vault topology, Herdr vault assignment policy, and correlated R2 restore gate.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| Infisical and Agent Vault private topology | `agent-secret-infrastructure` | `local-dev` | This skill owns host boundaries and recovery. `local-dev` owns local storage topology and named-secret injection. |
| One secret create or update | `local-dev` | `agent-secret-infrastructure` | No topology or recovery decision exists, so the narrow local secret owner wins. |
| Proxied third-party API request | `agent-vault` | `agent-secret-infrastructure` | The canonical broker skill owns request use. This skill owns deployment and trust boundaries only. |
| Cloudflare child-token creation or R2 product change | `cloudflare-operations` | `agent-secret-infrastructure` | Cloudflare policy and mutation stay with the Cloudflare owner. This skill owns how the resulting R2 backup is recovered. |
| Herdr pane transport | `herdr` | `agent-secret-infrastructure` | `herdr` owns pane operations. This skill owns which narrow vault identity reaches a pane. |
| Infisical or Agent Vault recovery | `agent-secret-infrastructure` | generic VPS operations | The exact complete-batch rule, isolated restore, consumer proof, and old-state preservation select this skill. |

## Preservation ledger

| Qualifying deployment decision | Disposition | Final owner |
| --- | --- | --- |
| VPS Infisical is the only secret source of truth | Kept with a live check | `references/architecture-and-policy.md` |
| The old local Infisical state stays intact during stabilization | Kept | `SKILL.md` and both references |
| Agents receive Agent Vault access, not Infisical identities | Kept | `SKILL.md` and `references/architecture-and-policy.md` |
| `ssh dev` uses the same private broker as Mac Herdr workers | Kept as the verified live topology | `references/architecture-and-policy.md` |
| The Mac loopback files stay preserved during central stabilization | Kept, with the failed sync and database-integrity state recorded | `references/architecture-and-policy.md` |
| Agent Vault identities should separate hosts or Herdr trust groups | Implemented as `local-codex` for Mac and `dev-herdr` for `dev` | `references/architecture-and-policy.md` |
| A broker on an agent-controlled Docker host is not an isolation boundary | Kept | `SKILL.md` and `references/architecture-and-policy.md` |
| `home-root` narrows to shared personal tooling and bootstrap use | Kept | `references/architecture-and-policy.md` |
| Herdr and product secrets use product or trust-boundary projects | Kept | `references/architecture-and-policy.md` |
| Shared secrets are granted only to consumers with equal trust | Kept | `references/architecture-and-policy.md` |
| A publisher may create or edit but cannot read values or delete | Kept as a fail-closed contract | `SKILL.md`, `references/architecture-and-policy.md`, and `references/publishing-and-sync.md`; no publisher is currently verified as installed. |
| Infisical Restic recovery requires matching config, environment, and database batch tags | Kept | `SKILL.md` and `references/backup-and-restore.md` |
| Agent Vault state needs a separate consistent backup and restore test | Implemented and kept as the current recovery design | `SKILL.md` and `references/backup-and-restore.md` |
| Restic recovery material needs off-host custody | Implemented in macOS Keychain and kept as a recovery gate | `SKILL.md` and `references/backup-and-restore.md` |
| Account IDs, endpoints, key values, passwords, personal paths, and private host details | Dropped | They fail the portability and secret-safety bar. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The package adds a durable private topology, assignment, and correlated-recovery contract that a generic agent cannot infer. |
| A02 | PASS | Infisical writes, Herdr agent access, rotations, backup checks, and restore drills recur across repositories and hosts. |
| A03 | PASS | The collision matrix gives first ownership to this skill, `local-dev`, Agent Vault, Cloudflare, and Herdr at their exact boundaries. |
| A04 | PASS | Exactly one archetype: private leaf. |
| A05 | PASS | `skills/agent-secret-infrastructure` matches the unique kebab-case package name. |
| A06 | PASS | Frontmatter contains only `name` and `description`. |
| A07 | PASS | The description is one physical line, two sentences, and 211 characters, below the 220-character leaf limit. |
| A08 | PASS | It names multi-host access, R2 recovery, Herdr vault assignment, and concrete check, recovery, extension, and explanation triggers. |
| A09 | PASS | Neighbor descriptions were compared and the collision matrix assigns one first owner per signal. |
| A10 | PASS | The trigger does not claim ordinary API calls, local one-key imports, Cloudflare mutations, or generic Herdr transport. |
| A11 | PASS | `SKILL.md` is 49 lines and 4,079 bytes, below the private-leaf limit. |
| A12 | PASS | The active body contains only ownership, selective loading, workflow, and hard rules. |
| A13 | PASS | All three references have explicit loading conditions and all links resolve. |
| A14 | PASS | References are 102, 100, and 34 lines. The complete package is 289 lines and 19,522 bytes, below all private-leaf and package hard limits. |
| A15 | PASS | Policy and recovery prose each have one owner. All rendered provider links resolve to the canonical package. |
| A16 | N/A | The package is not a suite. |
| A17 | N/A | The package has no modes. |
| A18 | N/A | The package is not a router. |
| A19 | N/A | The package is not a router. |
| A20 | PASS | The workflow requires live host and service evidence before the recorded baseline or current primary documentation. |
| A21 | PASS | The package contains no copied product manual, API matrix, or oversized tutorial. |
| A22 | PASS | Service names are a recorded baseline with an explicit live check. No endpoint, account ID, version, or schedule is pinned as permanent truth. |
| A23 | PASS | Kingfisher applied 913 rules across the three changed packages and found zero secrets. |
| A24 | PASS | Discovery and output are limited to safe names, status, snapshot IDs, and test results. Values stay redacted. |
| A25 | PASS | All repository and home references are portable. No literal personal-home path exists. |
| A26 | PASS | Host, Tailnet, broker, project, vault, and service facts require live discovery. Missing facts stop structural work. |
| A27 | N/A | The package has no scripts. |
| A28 | PASS | `agents/openai.yaml` uses the package name and trigger, stays portable, and duplicates no policy. |
| A29 | PASS | Rules cover agent-host inspection, secret disclosure, incomplete recovery batches, live restore damage, identity reuse, and circular recovery custody. |
| A30 | PASS | The unique canonical package is exposed once through each configured provider. |
| A31 | BLOCKED | Current target links resolve. Desired Agent Vault exposure is not composed because the linker conflicts with the Trash-only removal policy. |
| A32 | PASS | The package follows the compact `herdr` private-leaf shape and its explicit safety and live-state posture. |
| A33 | N/A | This is a new package, not a consolidation or trim. |
| A34 | PASS | The preservation ledger accounts for each durable setup decision and excludes private or volatile values. |
| A35 | PASS | The skill did not exist at pre-create ref `d4d730a03617a047184edec750fca29d5bae244c`. The first complete package was committed at `82cca5c`; later baselines are committed at `a14aadf` and `7370682`. |

## Validation evidence

```text
$ bin/validate-skill.sh skills/agent-secret-infrastructure private-leaf
PASS: skills/agent-secret-infrastructure (private-leaf)
exit_code=0

$ uv run --with pyyaml python providers/codex/.system/skill-creator/scripts/quick_validate.py skills/agent-secret-infrastructure
Skill is valid!
exit_code=0

$ kingfisher scan --git-history none --no-validate skills/agent-vault skills/herdr skills/agent-secret-infrastructure
Findings: 0
Rules applied: 913
exit_code=0
```

The canonical package conforms. Catalog conformance is blocked until provider composition can follow the Trash-only policy.
