# Model registry

This file names model lines and roles, not versions. At launch, resolve each
line to its newest ID in the live catalog (`SKILL.md`, "Model choice").

## Preferred models by role

| Role | First choice | Alternative |
| --- | --- | --- |
| Default GPT work: coding, debugging, UI, review | Sol at `medium` | Sol at `high` |
| Hardest planning, specs, architecture | Sol at `high` | `opus` at `high` |
| Mechanical work from an exact plan | Luna at `max` | Sol at `low` |
| Claude execution, fan-out, search, tests | `sonnet` | none |
| Claude adversarial review, deep reasoning, security | `opus` at `medium` | `opus` at `high` |
| Claude planning | `opus` at `high` | none |
| Open-weight work | Kimi, DeepSeek pro, GLM, Qwen max | DeepSeek flash (cheap) |
| Personal review (non-Foxway) | Grok | none |

- Luna rule: use Luna only when a stronger model wrote an exact plan, the task
  is simple and low risk, and the brief tells Luna to report gaps. Luna must
  not plan, improvise, or sub-delegate.
- Claude aliases (`sonnet`, `opus`) resolve to the newest version. Use them
  instead of full Claude IDs.
- Never: Terra.

## Tiers

Each line belongs to one tier. Cost rises with the tier. On a subscription
(the Claude accounts, the OpenAI account) cost means quota: a frontier model
uses up the shared weekly window faster, for every agent on that account.

| Tier | OpenAI | Claude | Other families |
| --- | --- | --- | --- |
| Frontier: best and most expensive | Astra | Fable | none |
| Strong: hard reasoning, planning, review | Sol | Opus | Gemini pro |
| Workhorse: default execution | Sol | Sonnet | Kimi, DeepSeek pro, GLM, Qwen max |
| Fast: cheap, simple and exact work | Luna | Haiku | Gemini flash, DeepSeek flash, GLM flash |

- Start at the lowest tier that can do the task. Sol covers both strong and
  workhorse work. Set its effort to match the task.
- Use the frontier tier only for one of these:
  - A decision that is costly to reverse: architecture, a contract or
    schema, or the security of auth, payments, or secrets.
  - The final adversarial review when stakes are real.
  - A task that a strong-tier model failed twice with a good brief.
- Use a frontier model for the hardest single step, then hand the work
  down: the frontier model plans or specifies, a workhorse implements, and
  a fast model does the mechanical steps.
- Never use the frontier tier for fan-out, search, loops, or mechanical
  edits. The cost multiplies with each agent and each turn.
- Use a frontier line only when its newest version is at least as new as
  the newest version of its strong line. Otherwise use the strong line. For
  example, use `opus` while the newest Fable is older than the newest Opus.
- Before a long frontier session, run `scripts/router quota`. If the account
  has less than 30% of its weekly window left and the reset is more than
  two days away, use the strong tier.
- If a line is not in this table, classify it before you use it (`SKILL.md`,
  "Model choice"). Then record the tier with `scripts/router note`, and
  propose the new row to the user.

## Harnesses

`scripts/router harnesses` scans the machine and lists each harness with its
class, last use, and binary update date. It marks a harness that is not in
this table as `NEW: unclassified`. Never route work to an unclassified
harness: propose a class to the user. If you find a harness that the scan
missed, record it with `scripts/router harness add <command> "<what it is>"`.

| Harness | Class | Use |
| --- | --- | --- |
| `claude` | primary | Claude family. The default for most work. |
| `codex` | primary | GPT family. |
| `opencode` | secondary | Open-weight models. |
| `cursor-agent` | secondary | Kimi for Foxway. |
| `devin` | secondary | Kimi, personal only. |
| `droid` | specialist | DeepSeek and Qwen, personal only. |
| `grok` | specialist | Personal review only. |
| `pi-vm-agent` | specialist | GLM uncensored, personal only. |
| `claudex` | specialist | A selected final adversarial pass only. |
| `hermes` | specialist | Personal GPT or Kimi work. |
| `pi`, `gemini`, `amp`, `kimi`, `agy` | not routed | Installed, but no role. Use only when the user asks for it. |

- Use a primary harness unless the role table or a route names another one.
- A harness that `router harnesses` marks `IDLE` (no use in 30 days) or
  `GONE` is a candidate for removal from this table. Propose it to the user.

## Routes

Each launch starts the interactive TUI in a Herdr pane. Send the brief with
`pane run` after it is ready (`herdr`).

| Family | Route | Launch |
| --- | --- | --- |
| GPT | `codex` | `codex -m <id> -c model_reasoning_effort=<effort>` |
| Claude | `claude` under an account | `CLAUDE_CONFIG_DIR="$HOME/<dir>" claude --model <alias>` |
| Open-weight | `opencode` | `opencode -m opencode-go/<id>` |
| DeepSeek, Qwen | `droid` | `droid`, then its model picker (IDs from `scripts/router models --harness droid`) |
| Kimi for Foxway | `cursor-agent` | IDs from `cursor-agent --list-models` |
| Kimi, personal | `devin` | `devin --model <id>` |
| Grok, personal review | `grok` | IDs from `grok models` |

- Claude accounts are zsh aliases that set `CLAUDE_CONFIG_DIR`: `claude`
  (`.claude`), `claude-work` (`.claude-work`), `claude-personal`
  (`.claude-personal`), `claude-personal-2` (`.claude-personal-2`). The
  aliases do not exist in a non-interactive shell, so set the variable
  directly. `.claude` and `.claude-personal` sign in to the same account.
  Choose the account with `scripts/router pick claude`.
- `claude-personal-2` is a zsh function that loads the MCP servers of
  `~/.claude.json` at each launch. If you launch that account directly, add
  `--mcp-config=<file>` with `jq '{mcpServers}' ~/.claude.json` written to a
  `mktemp` file. Never use a JSON string: the env and headers hold secrets
  that `ps` shows.
- `cursor-agent --list-models` needs `agent login` or a Cursor key. Until a
  probe succeeds, treat its catalog as unknown.
