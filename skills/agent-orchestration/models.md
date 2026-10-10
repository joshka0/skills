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
- Premium lines (Astra over Sol, Fable over Opus) cost more. Use one only
  when its newest version is at least as new as the newest version of its
  workhorse line. Otherwise use the workhorse. For example, use `opus` while
  the newest Fable is older than the newest Opus.
- Never: Terra.

## Routes

Each launch starts the interactive TUI in a Herdr pane. Send the brief with
`pane run` after it is ready (`herdr`).

| Family | Route | Launch |
| --- | --- | --- |
| GPT | `pi` (preferred) | `pi --model openai/<id> --thinking <effort>` |
| GPT, when a workflow needs a Codex session (`herdr-goal`, Codex integrations) | `codex` | `codex -m <id> -c model_reasoning_effort=<effort>` |
| Claude | `claude` under an account | `CLAUDE_CONFIG_DIR="$HOME/<dir>" claude --model <alias>` |
| Open-weight | `opencode` | `opencode -m opencode-go/<id>` |
| DeepSeek, Qwen | `droid` | `droid`, then its model picker (IDs from `scripts/list-models`) |
| Kimi for Foxway | `cursor-agent` | IDs from `cursor-agent --list-models` |
| Kimi, personal | `devin` | `devin --model <id>` |
| Grok, personal review | `grok` | IDs from `grok models` |

- Claude accounts are zsh aliases that set `CLAUDE_CONFIG_DIR`: `claude`
  (`.claude`), `claude-work` (`.claude-work`), `claude-personal`
  (`.claude-personal`), `claude-personal-2` (`.claude-personal-2`). The
  aliases do not exist in a non-interactive shell, so set the variable
  directly. If one account is rate-limited, move to another.
- `claude-personal-2` is a zsh function that loads the MCP servers of
  `~/.claude.json` at each launch. If you launch that account directly, add
  `--mcp-config=<file>` with `jq '{mcpServers}' ~/.claude.json` written to a
  `mktemp` file. Never use a JSON string: the env and headers hold secrets
  that `ps` shows.
- `cursor-agent --list-models` needs `agent login` or a Cursor key. Until a
  probe succeeds, treat its catalog as unknown.
