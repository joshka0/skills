---
name: agent-orchestration
description: "Coordinate coding agents — swarm subagents for parallel work, delegate single tasks, run Codex CLI agents in tmux, run collaboration-protocol with Herdr, or manage persistent goal-protocol /goal objectives. Covers collaboration-protocol, agent-swarm, codex-swarm, delegate-codex, goal-protocol, and codex-goal workflows."
args:
  - name: mode
    description: "collaboration | swarm | delegate | codex-swarm | goal"
    required: true
---

# Agent Orchestration

Coordinate coding agents safely. The primary agent is always the supervisor —
launch, monitor, intervene. Never let parallelism outrank coherence.

## Modes

| Mode | Purpose | Detail Reference |
|------|---------|-----------------|
| `collaboration` | Coordinate multi-agent convergence with a ledger, explicit roles, adversarial review, and Herdr comms | `collaboration-protocol` |
| `swarm` | Coordinate multiple subagents for parallel scoped work | `references/swarm-guide.md` |
| `delegate` | Quick single-task delegation, no tmux, no layout | `references/codex-swarm.md` § Delegate |
| `codex-swarm` | Orchestrate Codex CLI agents in tmux panes with JSONL monitoring | `references/codex-swarm.md` § Codex Swarm |
| `goal` | Turn broad work into a durable goal-protocol `/goal` objective | `references/codex-goal.md` |

## Shared Hard Rules

- **One step at a time.** Execute, read output, verify success, then proceed.
- **Do not batch steps.** Do not run ahead. Do not assume a step succeeded.
- **Use worktree isolation** for each agent when doing parallel work.
- **Verify each agent's output** before integrating.
- **No overlapping file edits** without coordination.
- **Primary agent is supervisor** — launch, monitor, intervene.
- **Agents must not run git commands.** Only code changes. Version control afterward.
- **Sandbox agents cannot install packages, run dev servers, or access the network.** Route those tasks to non-sandboxed agents.
- **For collaborative convergence, keep a ledger and Herdr comms map.** Assign
  an explicit critical/adversarial reviewer before accepting the synthesis.

## Context Gate

Infer project structure, test commands, and available tools from the repo before
delegating. Ask only if missing context would materially change the
orchestration approach.

## Output

Report: mode selected, agents launched, task assignments, progress,
integration status, issues.
