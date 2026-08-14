# AUX acceptance

## Result

- Verdict: **PACKAGE-CONFORMS**. AUX is exposed in each provider farm. `bin/link` completed with exit 0. It preserved unrelated unmanaged real entries with warnings; this package report does not audit those entries or assert full-catalog conformance.
- Canonical owner: `skills/aux`.
- Archetype: `private-leaf`.
- Pre-rewrite ref: `632429c`. It preserves the first tested AUX package before the Herdr-trial rewrite.
- Package size: 238 text lines and 8,511 bytes. `SKILL.md` is 35 lines and 2,780 bytes. The deterministic script is 199 lines and 5,506 bytes.
- Validators: `Skill is valid!` and `PASS: skills/aux (private-leaf)`.

## Collision matrix

| Claimed signal | First owner | Nearest competitor | Discriminator or handoff |
| --- | --- | --- | --- |
| New agent asks what tools or secrets exist | `aux` | `local-dev` | AUX reports safe context. `local-dev` owns application-secret storage and injection. |
| New agent starts in an unfamiliar repository | `aux` | `herdr` | AUX orients the agent. Herdr owns pane transport and interactive model launch. |
| Agent needs an authenticated HTTP command | `agent-vault` | `aux` | AUX selects and reports the vault. Agent Vault owns the credential-bearing request. |
| Agent needs an application environment secret | `local-dev` | `aux` | AUX reports `infisical-runtime`. `local-dev` owns injection and exact-path verification. |
| Agent needs a vault, grant, service, or policy change | `agent-secret-infrastructure` | `aux` | AUX reports `control-plane` and stops. Infrastructure owns the change. |

## Preservation ledger

| Qualifying delta | Disposition | Evidence |
| --- | --- | --- |
| Zero-context repository and vault orientation | Kept | `SKILL.md:8-20`; `scripts/aux:27-71,138-162`. |
| Target-repository discovery from a packaged skill | Kept and corrected | `SKILL.md:12`; the one-command entry point is `aux` in the target repository. |
| Safe service and credential-name discovery | Kept | `SKILL.md:24-29`; `scripts/aux:102-136`. |
| Credential-injection scope versus unmatched-host egress | Kept and clarified | `SKILL.md:27`; `scripts/aux:162-164`. Discovery does not claim strict deny. |
| Exact command-scoped launch guidance | Kept | `SKILL.md:14-20`; `scripts/aux:135`. |
| Personal and employer trust-boundary separation | Kept | `SKILL.md:28`; `scripts/aux:39-71`. |
| Secret mutation, runtime injection, and Herdr transport | Handed off | `SKILL.md:14-20`; canonical owners remain `local-dev`, `agent-vault`, `agent-secret-infrastructure`, and `herdr`. |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Non-default delta: deterministic safe orientation to private local vault and tool topology. |
| A02 | PASS | Every fresh agent and unfamiliar repository needs the same recurring orientation. |
| A03 | PASS | The collision matrix preserves each operational owner and gives AUX only the orientation boundary. |
| A04 | PASS | Exactly one archetype: private-tool leaf. |
| A05 | PASS | `skills/aux` matches unique `name: aux`. |
| A06 | PASS | Shared frontmatter contains only `name` and `description`; provider UI data is in `agents/openai.yaml`. |
| A07 | PASS | Description is one physical line, two sentences, and 213 characters, below 220. |
| A08 | PASS | The description names orientation and concrete unfamiliar-workspace and secret/tool signals. |
| A09 | PASS | The collision matrix establishes one first owner for each claimed signal. |
| A10 | PASS | No greedy trigger, persona, or deterministic user macro exists. |
| A11 | PASS | The 35-line body is below the private-leaf cap. The 199-line script is below its 300-line cap. |
| A12 | PASS | The body contains workflow, handoffs, hard rules, stops, and output only. |
| A13 | N/A | No references. |
| A14 | PASS | The package is 233 lines and 7,932 bytes, below all hard limits. |
| A15 | PASS | Each instruction and support file has one canonical owner; no catalog copy exists. |
| A16 | N/A | Private leaf; no modes. |
| A17 | N/A | Private leaf; no mode table. |
| A18 | N/A | Private leaf; not a router. |
| A19 | N/A | Private leaf; no routed child overlay. |
| A20 | PASS | The script uses live path, command, launcher, broker, service, and credential-name discovery. Agent Vault 0.39.1 behavior and the current upstream README were checked before correcting unmatched-host guidance. |
| A21 | PASS | No external manual or tool catalog is copied. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | Secret-shape scan returned no match. The package contains names only. |
| A24 | PASS | The script calls `vault discover`; it never calls `credential get` or reads dotenv values. |
| A25 | PASS | Paths use `$HOME` or runtime output. No literal personal-home path exists. |
| A26 | PASS | Missing repository mappings, launchers, grants, vaults, and invalid discovery responses fail clearly. |
| A27 | PASS | `scripts/aux` is referenced, deterministic, Bash syntax-checked, and smoke-tested against skills, Foxway, portfolio, `ssh dev`, and an ungranted repository. Three fresh Herdr agents exercised the workflow. |
| A28 | PASS | `agents/openai.yaml` matches the skill and contains only UI metadata. No assets exist. |
| A29 | PASS | Rules prevent value access, dotenv fallback, trust-boundary mixing, and false usability claims. |
| A30 | PASS | AUX links exist once in all five provider farms. No AUX collision exists. |
| A31 | PASS | `bin/link` returned exit 0. Each installed AUX link resolves to `skills/aux`; unrelated provider warnings were preserved. |
| A32 | PASS | Shape was compared with the private-leaf Herdr pilot and the normative contract. |
| A33 | N/A | New package; no consolidation or trim claim. |
| A34 | PASS | The preservation ledger accounts for each qualifying delta and handoff. |
| A35 | PASS | Commit `632429c` preserves the first package before the Herdr-trial rewrite. |

## Validation evidence

```text
Skill is valid!
PASS: skills/aux (private-leaf)
```

Smoke evidence:

```text
skills context: exit 0
foxway secrets: exit 0
ungranted personal repository: exit 1 with explicit no-dotenv stop
ssh dev skills context: exit 0
Herdr Foxway trial: allowed request 200; unmatched host passed through as 200
Herdr portfolio trial: stopped because the OpenRouter service and credential mapping were absent
Herdr Foxway retest: first command was aux context; correct scope; no confusion
Final command contract: aux once, then one required brokered command; no duplicate discovery
bin/link: exit 0; AUX links verified in codex, agents, claude, gemini, and gemini-antigravity
```
