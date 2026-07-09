---
name: collaboration-protocol
description: >
  Coordinate multi-agent collaboration with a durable ledger, explicit roles,
  adversarial review, and persistent Herdr communication. Use when agents need
  to converge on a plan, decision, review, or implementation after independent
  strict or unbiased passes.
category: orchestration
priority: default
---

# Collaboration Protocol

Use this skill when several agents need shared state, clear ownership, durable
communication, and explicit convergence.

The default aim is not consensus by averaging. The aim is a traceable decision
after independent work, critical review, preserved dissent, and evidence.

## Use When

- Multiple agents are working on the same goal, review, audit, plan, or design.
- The user wants convergence after strict, unbiased, adversarial, or independent
  passes.
- The work needs durable coordination beyond the current chat.
- Agents need to discuss through Herdr, panes, workspaces, or persistent agent
  terminals.
- It must remain clear who owns each work item, claim, dissent, and decision.

## Pair With

- Use `herdr` for persistent workspace/tab/pane communication.
- Use `goal-protocol` when the collaboration belongs to a durable goal with
  `GOAL_LEDGER.md`.
- Use `agent-orchestration` when launching, delegating to, or monitoring
  coding agents.

## Ledger

Prefer an existing `GOAL_LEDGER.md` when a goal folder exists. Otherwise create
or update:

```text
docs/collaboration/<slug>/COLLABORATION_LEDGER.md
```

The ledger must track:

- Current question, desired outcome, and convergence threshold.
- Participants, roles, Herdr targets, and owned scope.
- Work board: who is doing what, status, blocker, and report path.
- Claims and evidence: every material assertion needs a path, command output,
  artifact, or explicit uncertainty note.
- Decision log: chosen path, rationale, alternatives rejected, and confidence.
- Dissent log: objections, minority views, unresolved risks, and owner.
- Validation log: checks run, results, and follow-up.
- Handoff log: what the next agent should read and do.

Keep the top snapshot current. Treat decisions, dissent, validation, and
handoff entries as append-only.

## Roles

Assign only the roles needed:

- **Supervisor**: owns ledger, scope, Herdr routing, integration, and final
  decision synthesis.
- **Context agent**: gathers current facts and relevant code/docs.
- **Implementer**: makes scoped changes or drafts the concrete proposal.
- **Reviewer**: checks behavior, tests, maintainability, and integration risk.
- **Adversarial reviewer**: tries to disprove the emerging answer and expose
  hidden assumptions, weak evidence, bias, and accidental consensus.
- **Verifier**: runs checks and records evidence.
- **Synthesizer**: separates agreed facts, live dissent, decisions, and next
  action.

Non-trivial convergence needs at least one explicit reviewer or adversarial
reviewer who did not author the proposed answer.

## Herdr Practice

Start by discovering state:

```sh
herdr status
herdr workspace list
herdr agent list
```

Read before sending:

```sh
herdr agent read <target> --source recent --lines 80
```

Send self-contained messages:

```sh
herdr agent send <target> 'Task: ...
Context: ...
Scope: ...
Do not: ...
Return: ...'
```

Wait or poll after sending:

```sh
herdr agent wait <target> --status idle --timeout 300000
herdr agent read <target> --source recent --lines 120
```

If using panes directly, remember that `herdr pane send-text` only types text.
Submit it with:

```sh
herdr pane send-keys <pane_id> enter
```

Use `herdr pane run` only for shell commands that should execute.

## Workflow

1. Define the collaboration question, desired output, and what would count as
   convergence.
2. Create or locate the ledger, then record the current snapshot.
3. Assign roles, owners, scopes, Herdr targets, and report paths.
4. Send each agent a self-contained brief with read-first artifacts, allowed
   scope, forbidden actions, return shape, and escalation triggers.
5. Let independent agents work before synthesis. Avoid feeding one agent's
   conclusion to another unless cross-review is intentional.
6. Run the adversarial pass against the strongest current proposal.
7. Synthesize: separate agreed facts, disputed facts, decisions, risks, and next
   action.
8. Update the ledger and handoff. Do not leave decisions trapped in chat or pane
   history.

## Hard Rules

- No unledgered material decisions.
- No agent should need conversation memory to continue.
- One owner per active work item.
- Claims require evidence, or must be marked as assumptions.
- Dissent is preserved until resolved, rejected with rationale, or explicitly
  accepted as risk.
- The supervisor integrates agent outputs; do not blindly merge conclusions.
- Keep same-wave edits file-disjoint unless explicitly coordinated.
- Never send secrets through Herdr.
- Read before sending. Wait or poll after sending.

## Output

For status:

```md
## Collaboration Status
Ledger:
Question:
Participants:
Current decision:
Live dissent:
Active work:
Blockers:
Next action:
Latest validation:
```

For handoff:

```md
# Collaboration Handoff

Ledger:
Read first:
Current question:
Agreed facts:
Live dissent:
Decision status:
Assigned work:
Herdr targets:
Done criteria:
Escalation triggers:
```
