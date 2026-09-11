---
name: agent-orchestration
description: "Coordinate agent dispatch and model selection. Use for /delegate-codex, /swarm, crew campaigns, independent collaboration, or delta briefs."
---

# Agent orchestration

Delegate complete independent tasks only when they justify the coordination
cost. One supervisor owns shared decisions, accepted evidence, and integration.

| Need | Read |
| --- | --- |
| Model, harness, or effort choice | [engine selection](references/engine-selection.md) |
| One bounded assignment | [delegate](references/delegate.md) |
| Parallel tasks with one outcome | [swarm](references/swarm.md) |
| Independent decision or adversarial review | [collaborate](references/collaborate.md) |
| Sustained crew campaign and durable reports | [campaigns](references/campaigns.md) |
| A settled change to an agent's context | [delta brief](references/delta-brief.md) |
| Explicit terminal-mux transport | [mux adapter](references/mux-adapter.md) |

Load the references the assignment needs. `planning-workflow` owns plan artifacts;
`goal-protocol` owns durable goal contracts and their actual gates. Use `herdr`
or `maestri` for private transport syntax and `herdr-watcher` for supported
durable continuations and joins.

Each brief names its objective, ground-truth artifacts, allowed scope, expected
evidence, completion boundary, and handoff. State that the agent must finish
without sub-delegating. Serialize shared interfaces and overlapping writes;
use file-disjoint tasks or coordinated isolated workspaces.

Let agents finish. A wait timeout means keep waiting; intervene only on evidence
of stalled progress, a crash, or a block awaiting input. Honor bounds in an
explicit workflow such as `herdr-goal`. Accept results only after a terminal
state and verification against the assignment.

Keep Git, publication, and external effects with the supervisor unless explicitly
delegated. Preserve the user's cleanup scope, work, vendor restrictions, and secret
boundaries. Never reassign a blocked action merely to bypass another agent's rails.
Report actual model/effort, returned evidence, integration, and remaining work.
