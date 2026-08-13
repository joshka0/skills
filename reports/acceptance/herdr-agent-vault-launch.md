# Herdr Agent Vault launch acceptance

## Decision

- Canonical owner: `skills/herdr`
- Archetype: private leaf
- Pre-rewrite git ref: `a14aadf`
- Pre-command-scope rewrite ref: `7370682`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **BLOCKED** by the provider-linker policy conflict recorded in `agent-vault.md`.

The added delta classifies credential mode before the prompt, preserves Herdr's interactive model sequence, and limits Agent Vault to the credential-bearing command.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| Launch an interactive Herdr model | `herdr` | `agent-orchestration` | Herdr owns pane transport and the start-wait-prompt sequence. |
| Give a Herdr task brokered API access | `herdr` | `agent-vault` | Herdr starts the model normally and passes safe scope metadata. Agent Vault owns the selected command. |
| Add or rotate a secret | `agent-secret-infrastructure` | `herdr` | This is a publisher and sync flow, not pane launch. |
| Inject an application runtime value | `local-dev` | `herdr` | The app process receives it; the coding agent stays unwrapped. |

## Preservation ledger

| Launch delta | Disposition | Final evidence |
| --- | --- | --- |
| Models open interactively before prompts | Kept and made explicit | `SKILL.md` workflow and `command-recipes.md` |
| No prompt in model arguments | Kept and made explicit | Both launch references |
| Model TUI stays outside Agent Vault | Added | `agent-vault-launch.md` classification and interactive launch |
| One named vault for each authenticated API command | Added | `agent-vault-launch.md` preflight and command rule |
| Project and shared access use separate commands | Added | `agent-vault-launch.md` preflight |
| MCP and browser tools keep their normal network path | Added | `agent-vault-launch.md` classification |
| Vault scope is not an OS sandbox | Added | `agent-vault-launch.md` boundary note |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The private launch and pane transport sequence is not inferable from generic shell use. |
| A02 | PASS | Herdr launches agents repeatedly on Mac and `dev`. |
| A03 | PASS | The collision matrix separates launch, request, publish, and runtime injection. |
| A04 | PASS | Exactly one archetype: private leaf. |
| A05 | PASS | `skills/herdr` matches the unique name. |
| A06 | PASS | Frontmatter is minimal. |
| A07 | PASS | Description is one line and 212 characters, below 220. |
| A08 | PASS | The description names Herdr workspace, pane, and transport signals. |
| A09 | PASS | Neighbor collisions have explicit handoffs. |
| A10 | PASS | No greedy external-API trigger was added to the Herdr description. |
| A11 | PASS | `SKILL.md` is 57 lines and 5,962 bytes. |
| A12 | PASS | The active body contains route, workflow, safety, stops, and output only. |
| A13 | PASS | Each of three references has an explicit selection condition and resolves. |
| A14 | PASS | References are 53, 101, and 22 lines; package total is 233 lines and 16,363 bytes. |
| A15 | PASS | Interactive launch has one recipe owner; Agent Vault detail is selected only for credential-bearing commands. |
| A16 | N/A | Not a suite. |
| A17 | N/A | No modes. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Installed Herdr and Agent Vault help must confirm volatile syntax. |
| A21 | PASS | No copied CLI manual remains. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | Kingfisher found zero secrets across changed packages. |
| A24 | PASS | Task briefs contain only credential mode, vault name, and host names. |
| A25 | PASS | All paths and command names are portable. |
| A26 | PASS | Missing launcher, grant, host, or broker fails closed. |
| A27 | N/A | The package relies on a host-local launcher because client authentication is machine-private. |
| A28 | N/A | No new asset or provider metadata. |
| A29 | PASS | Rules block prompt arguments, secret transport, raw-token fallback, and late environment mutation. |
| A30 | BLOCKED | Current provider links already expose Herdr. New Agent Vault exposure is not composed. |
| A31 | BLOCKED | Provider composition conflicts with the Trash-only policy. |
| A32 | PASS | The package remains the private-tool golden shape. |
| A33 | N/A | This is an additive private-policy update, not a consolidation. |
| A34 | PASS | The preservation ledger accounts for each launch delta. |
| A35 | PASS | The pre-edit Herdr package is committed at `a14aadf`; its pre-command-scope form is committed at `7370682`. |

## Validation evidence

```text
$ bin/validate-skill.sh skills/herdr private-leaf
PASS: skills/herdr (private-leaf)
exit_code=0

$ uv run --with pyyaml python providers/codex/.system/skill-creator/scripts/quick_validate.py skills/herdr
Skill is valid!
exit_code=0
```
