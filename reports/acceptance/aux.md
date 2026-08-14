# AUX acceptance

## Result

- Verdict: **PACKAGE-CONFORMS**. AUX validates, its links resolve, global Codex and Claude rules give it first ownership of visible-browser readiness, and the final fresh-agent wave followed that route without prompting.
- Canonical owner: `skills/aux`.
- Archetype: `private-leaf`.
- Selected authoring modes: `package-and-routing` and `validation-and-acceptance`.
- Pre-rewrite refs: `632429c` preserves the first tested package; `343e588` preserves the package before the Wiki feedback handoff; `f171623` preserves the package before browser-bridge orientation; `467938e` preserves the first browser-routing attempt before blind-agent correction.
- Package size: 317 text lines and 11,538 bytes. `SKILL.md` is 38 lines and 3,570 bytes. The deterministic script is 275 lines and 7,743 bytes.
- Validators: `Skill is valid!` and `PASS: skills/aux (private-leaf)`.

## Collision matrix

| Claimed signal | First owner | Nearest competitor | Discriminator or handoff |
| --- | --- | --- | --- |
| New agent asks what tools or secrets exist | `aux` | `local-dev` | AUX reports safe context. `local-dev` owns application-secret storage and injection. |
| New agent starts in an unfamiliar repository | `aux` | `herdr` | AUX orients the agent. Herdr owns pane transport and interactive model launch. |
| Agent needs an authenticated HTTP command | `agent-vault` | `aux` | AUX selects and reports the vault. Agent Vault owns the credential-bearing request. |
| Agent needs an application environment secret | `local-dev` | `aux` | AUX reports `infisical-runtime`. `local-dev` owns injection and exact-path verification. |
| Agent needs a vault, grant, service, or policy change | `agent-secret-infrastructure` | `aux` | AUX reports `control-plane` and stops. Infrastructure owns the change. |
| Agent asks for visible-browser automation | `aux` | `local-http-browser-use`; bundled in-app browser control | AUX is the first readiness owner. The local browser skill acts after ready status; in-app control wins only for an explicitly requested in-app surface. |
| Agent repeatedly hits AUX-owned friction | `wiki` | `aux` | AUX detects recurrence and hands off. Wiki owns deduplication and the feature-request record. |

## Preservation ledger

| Qualifying delta | Disposition | Evidence |
| --- | --- | --- |
| Zero-context repository and vault orientation | Kept | `SKILL.md:8-20`; `scripts/aux:27-71,138-162`. |
| Target-repository discovery from a packaged skill | Kept and corrected | `SKILL.md:12`; the one-command entry point is `aux` in the target repository. |
| Safe service and credential-name discovery | Kept | `SKILL.md:24-29`; `scripts/aux:102-136`. |
| Credential-injection scope versus unmatched-host egress | Kept and clarified | `SKILL.md:27`; `scripts/aux:162-164`. Discovery does not claim strict deny. |
| Repeated agent-UX feedback loop | Kept as handoff | `SKILL.md:21`; `wiki` owns threshold, deduplication, and capture. |
| Exact command-scoped launch guidance | Kept | `SKILL.md:14-20`; `scripts/aux:135`. |
| Personal and employer trust-boundary separation | Kept | `SKILL.md:28`; `scripts/aux:39-71`. |
| Browser controller, extension, client, safe token-path orientation, and common next calls | Kept and corrected | `SKILL.md:20,33`; `scripts/aux:176-264`. AUX now reports observe and new-tab calls when ready. |
| Secret mutation, runtime injection, and Herdr transport | Handed off | `SKILL.md:14-20`; canonical owners remain `local-dev`, `agent-vault`, `agent-secret-infrastructure`, and `herdr`. |
| Browser interaction and consent | Handed off | `SKILL.md:20`; `local-http-browser-use` remains the action owner. |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Non-default delta: deterministic safe orientation to private local vault and tool topology. |
| A02 | PASS | Every fresh agent and unfamiliar repository needs the same recurring orientation. |
| A03 | PASS | The collision matrix preserves each operational owner and gives AUX only repository, credential, tool, and browser-readiness orientation. |
| A04 | PASS | Exactly one archetype: private-tool leaf. |
| A05 | PASS | `skills/aux` matches unique `name: aux`. |
| A06 | PASS | Shared frontmatter contains only `name` and `description`; provider UI data is in `agents/openai.yaml`. |
| A07 | PASS | Description is one physical line, two sentences, and below 220 characters. |
| A08 | PASS | The description names repository orientation, safe secret/tool discovery, and visible-browser readiness with concrete unfamiliar-workspace and browser signals. |
| A09 | PASS | Live `AGENTS.md` and `CLAUDE.md` rules assign AUX first ownership. Fresh Codex and Claude sessions followed the route without AUX or bridge hints in the task prompts. |
| A10 | PASS | No greedy trigger, persona, or deterministic user macro exists. |
| A11 | PASS | The 38-line body is below the private-leaf cap. The 275-line script is below its 300-line cap. |
| A12 | PASS | The body contains workflow, handoffs, hard rules, stops, and output only. |
| A13 | N/A | No references. |
| A14 | PASS | The package is 317 lines and 11,538 bytes, below all hard limits. |
| A15 | PASS | Each instruction and support file has one canonical owner; no catalog copy exists. |
| A16 | N/A | Private leaf; no modes. |
| A17 | N/A | Private leaf; no mode table. |
| A18 | N/A | Private leaf; not a router. |
| A19 | N/A | Private leaf; no routed child overlay. |
| A20 | PASS | The script uses live path, command, launcher, broker, service, credential-name, browser-controller, and browser-extension discovery. |
| A21 | PASS | No external manual or tool catalog is copied. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | Secret-shape scan returned no match. The package contains names only. |
| A24 | PASS | The script calls `vault discover` and the normalized browser status client. It never calls `credential get`, reads dotenv values, or reads the browser token. |
| A25 | PASS | Paths use `$HOME` or runtime output. No literal personal-home path exists. |
| A26 | PASS | Missing repository mappings, launchers, grants, vaults, browser clients, controllers, tokens, extensions, and invalid responses fail clearly. |
| A27 | PASS | `scripts/aux` is referenced, deterministic, Bash syntax-checked, and smoke-tested for local browser readiness. The remote controller and disconnected-extension state were also verified directly. |
| A28 | PASS | `agents/openai.yaml` matches the skill and contains only UI metadata. No assets exist. |
| A29 | PASS | Rules prevent value access, dotenv fallback, trust-boundary mixing, false usability claims, and headless browser fallback. |
| A30 | PASS | AUX links exist once in all five provider farms. No AUX collision exists. |
| A31 | PASS | `bin/link` returns exit 0. Each AUX link resolves to `skills/aux`; unrelated plugin-managed real entries remain in place with warnings. |
| A32 | PASS | Shape was compared with the private-leaf Herdr pilot and the normative contract. |
| A33 | N/A | New package; no consolidation or trim claim. |
| A34 | PASS | The preservation ledger accounts for each qualifying delta and browser-action handoff. |
| A35 | PASS | Commits `632429c`, `343e588`, `f171623`, and `467938e` preserve the package states before each rewrite. |

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
Local browser bridge: aux browser exit 0; controller ready; extension connected; token value not printed
Remote browser bridge service: controller ready; extension disconnected
Blind wave 3: Codex selected AUX first and completed the browser task; Claude selected AUX but continued with unrequested host diagnosis
Blind wave 4: Codex used AUX, observe, new tab, observe, and reported Example Domain; Claude used a minimum SSH check plus aux browser, then accepted the stop without extra diagnosis
bin/link: exit 0; AUX links resolve in codex, agents, claude, gemini, and gemini-antigravity; unrelated real entries were reported and preserved
```
