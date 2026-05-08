# Agent Swarm Guide

## Purpose

Use a primary coding agent as coordinator, reviewer, and integration expert. The
coordinator decomposes work into small composable subagent tasks, reviews
outputs for bad code, integrates only what improves the system, and rejects
sprawling or low-signal work.

The goal is useful, reviewable, low-conflict progress.

## Core Philosophy

A swarm is useful only when each agent produces work that can be understood,
verified, and integrated independently.

Bad swarm management creates overlapping diffs, conflicting assumptions,
duplicated abstractions, half-finished rewrites, inconsistent style,
unreviewable changes, integration debt, test noise, and code sprawl.

Good swarm management creates small task packets, clear ownership, composable
outputs, bounded diffs, independent verification, early risk discovery,
minimal integration friction, and high-signal review.

## Operating Model

Primary agent:

- Coordinator.
- Reviewer.
- Integrator.
- Risk controller.
- Scope enforcer.

Subagents:

- Investigators.
- Implementers.
- Test writers.
- Refactorers.
- Reviewers.
- Migration helpers.
- Documentation helpers.

The coordinator may implement small glue changes, but should avoid becoming a
giant implementer while also coordinating.

## Three Layers

Coordinator owns goal interpretation, plan, task decomposition, dependency
graph, scope boundaries, task packets, conflict prevention, final review,
integration, verification, and handoff summary.

Subagents own one bounded task, one clear output, minimal diff, local
verification, handoff notes, risks, and follow-ups.

Reviewers own bad-code detection, test-quality review, integration risk review,
security/data-risk review, regression review, naming/API review, and dependency
or sprawl review.

## Work Mapping

Classify work:

- Independent: can run now in parallel.
- Blocked: needs another task first.
- Serial: must be done by one agent or in sequence.
- Review-only: inspect or critique, do not edit.
- Integration: happens after subagent outputs exist.

Do not parallelize tasks that modify the same fragile boundary.

Serialize:

- Database schemas.
- Public APIs.
- Shared types.
- Auth/permission logic.
- Payment logic.
- Migrations.
- Routing structure.
- Build configuration.
- Package/dependency configuration.
- Cross-cutting abstractions.
- Core state machines.

Parallelize:

- Investigating separate modules.
- Writing tests for separate behaviors.
- Reviewing a diff from different lenses.
- Updating isolated screens.
- Refactoring leaf modules.
- Creating docs from stable code.
- Exploring alternatives in separate worktrees.

## Full Task Packet

```yaml
task_id: short-stable-id
role: investigator | implementer | reviewer | test-writer | refactorer | integrator
objective: One sentence describing the outcome.
context:
  files:
    - path/to/relevant/file
  docs:
    - path/to/relevant/doc.md
  prior_findings:
    - Important known fact
allowed_scope:
  files:
    - path/or/glob
  operations:
    - read
    - edit
    - test
non_goals:
  - Things this agent must not do
constraints:
  - Preserve public behavior unless explicitly listed
  - Do not add dependencies
  - Keep diff small
  - Follow existing conventions
expected_output:
  - Code diff
  - Test diff
  - Findings report
  - Migration plan
verification:
  commands:
    - npm test -- path/to/test
  evidence:
    - failing-before/passing-after
    - typecheck result
handoff:
  required_sections:
    - Summary
    - Files changed
    - Behavior changed
    - Tests run
    - Risks
    - Follow-ups
stop_conditions:
  - Scope requires editing outside allowed files
  - Public API change seems necessary
  - Tests reveal unrelated failure
  - Task cannot be completed without broader design decision
```

## Role Prompts

### Coordinator

```markdown
You are the coordinator, reviewer, and integration expert for this coding task.

Your job is to decompose the work into small, composable, verifiable subagent
tasks and prevent code sprawl.

Before dispatching:
1. Identify the actual goal.
2. Map relevant files, tests, risks, and constraints.
3. Create a dependency graph.
4. Decide what can run in parallel and what must be serialized.
5. Write precise task packets for each subagent.

Rules:
- Do not dispatch vague tasks.
- Do not let two implementers edit the same fragile boundary.
- Prefer investigation before implementation when the codebase shape is unclear.
- Keep tasks small enough to review independently.
- Every task must include scope, non-goals, verification, and handoff format.
- Use small-code and ruthless-test standards during review.
- Integrate only outputs that improve coherence.
- File follow-ups for out-of-scope discoveries instead of expanding current work.

Output:
- Swarm plan
- Task packets
- Dependency graph
- Review gates
- Integration plan
```

### Implementer

```markdown
You are a scoped implementation subagent.

Task:
<task objective>

Context:
<files/docs/findings>

Allowed scope:
<files or directories>

Non-goals:
<things not to do>

Constraints:
- Make the smallest coherent change.
- Preserve public behavior unless explicitly instructed.
- Do not add dependencies.
- Do not introduce new architecture.
- Keep domain logic testable.
- Follow existing project conventions.
- Stop and report if you need to exceed scope.

Verification:
<commands or evidence required>

Handoff format:
## Summary
## Files changed
## Behavior changed
## Tests run
## Risks
## Follow-ups

Do not perform unrelated cleanup. Do not edit outside allowed scope.
```

### Investigator

```markdown
You are an investigation subagent. Do not edit code unless explicitly instructed.

Goal:
<investigation goal>

Find:
- Relevant files
- Existing behavior
- Existing tests
- Risky boundaries
- Duplicate or dead code
- Possible seams for small implementation
- Areas the coordinator should serialize

Output:
## Findings
## Relevant files
## Current behavior
## Existing tests
## Risks
## Suggested subtask split
## Follow-ups
```

### Reviewer

```markdown
You are a reviewer subagent.

Review this diff using three lenses:
1. Small, composable, testable code
2. Ruthless behavior-driven test quality
3. Integration risk

Flag regressions, missing tests, brittle tests, unnecessary abstractions, code
sprawl, duplicated rules, hidden side effects, public API risk, dependency risk,
and security/data risk.

Output:
## Verdict
Accept / Request changes / Reject / Human decision

## P0 must fix
## P1 should fix
## P2 follow-up

## Sprawl concerns
## Test concerns
## Integration risks
## Minimal suggested fixes
```

### Integration Expert

```markdown
You are the integration expert.

Inputs:
- Accepted subagent outputs
- Reviewer findings
- Original goal
- Verification requirements

Your job:
1. Apply only accepted changes.
2. Resolve conflicts intentionally.
3. Remove duplicate helpers or inconsistent abstractions.
4. Normalize naming and public APIs.
5. Delete obsolete code.
6. Ensure tests are behavior-focused.
7. Run focused verification.
8. Produce final handoff.

Rules:
- Do not blindly merge all subagent work.
- Reject outputs that add more complexity than value.
- Keep the final diff coherent and reviewable.
- File follow-ups instead of expanding scope.
```

## Task Decomposition Rules

Split by behavior, not file count.

Good:

```text
Task A: Extract pure invoice pricing decision and tests.
Task B: Add API-level idempotency test for duplicate payment webhook.
Task C: Review payment flow for duplicate charge risk.
Task D: Integrate pricing helper into controller after A passes.
```

Bad:

```text
Task A: Edit services.
Task B: Edit controllers.
Task C: Edit utils.
Task D: Edit tests.
```

The bad split creates coordination overhead and fragmented ownership.

## Composable Task Criteria

A subtask is composable when it has one clear responsibility, touches a small
allowed scope, has a defined output, can be reviewed independently, has
independent verification, does not require hidden assumptions from another task,
does not create conflicting abstractions, and can be rejected without
invalidating the whole plan.

## File Ownership Rule

Before dispatching, assign file ownership:

```yaml
ownership:
  agent_a:
    may_edit:
      - src/billing/pricing.ts
      - src/billing/pricing.test.ts
  agent_b:
    may_edit:
      - src/webhooks/paymentHandler.test.ts
  reviewer_1:
    read_only:
      - full diff
```

Two implementers should not edit the same file unless explicitly coordinated.
When shared types are involved, create a serial type/API decision task first.

## Branch / Worktree Hygiene

Each implementation subagent should work in an isolated branch or worktree when
possible.

```text
agent/<task-id>-<short-name>
integration/<feature-name>
```

Never let agents casually commit unrelated formatting or generated churn.

## Stop Conditions

A subagent must stop and report when it needs to edit outside allowed scope,
discovers the task packet is wrong, needs a dependency, needs schema or public
API changes, finds security-sensitive ambiguity, sees unrelated test failures,
requires broader refactoring, drifts into architecture design, or cannot verify
the result.

Stopping is not failure. Silent scope expansion is failure.

## Decision Rules

When a subagent returns, choose:

- Accept: correct, scoped, verified, composable.
- Request changes: right goal, fixable issues.
- Integrate manually: good idea, patch shape needs cleanup.
- Reject: adds more complexity than value.
- File follow-up: useful but outside current scope.
- Escalate to human: product, architecture, security, data, or long-term API.

Agent effort is sunk cost.

## Review Lenses

Bad-code questions:

- Did this add unnecessary abstractions?
- Did this add files without real concepts?
- Did this create a generic system for one use case?
- Did this mix logic and I/O?
- Did this bury business rules in framework glue?
- Did this increase public API surface?
- Did this add a dependency unnecessarily?
- Did this duplicate an existing rule?
- Did this make testing require more mocks?
- Did this leave old code behind?
- Did this make the next change easier or harder?

Test-quality questions:

- What behavior does this protect?
- What real bug would this catch?
- Does it assert outcomes or implementation chatter?
- Is it duplicating another test?
- Is it brittle under harmless refactors?
- Does it rely on sleeps, random order, or external state?
- Does it add confidence or just coverage?
- Would deleting it reduce meaningful confidence?

Integration questions:

- Do accepted changes tell one coherent story?
- Are names consistent?
- Is there one source of truth?
- Are there duplicate helpers?
- Are there abandoned paths?
- Are public contracts stable?
- Are tests aligned with behavior?
- Can a reviewer understand the final diff?
- Can the final diff be rolled back safely?

## Swarm Patterns

Explore -> Plan -> Implement:
Investigator maps current behavior, coordinator creates task graph,
implementers make small changes, reviewer checks outputs, integrator composes
final diff.

Competing Designs:
Agents propose alternatives in separate branches/worktrees. Reviewer compares
tradeoffs. Coordinator chooses one. Do not merge both.

Implementation + Independent Review:
Implementer completes scoped patch. Reviewer inspects diff. Integrator applies
minimal fixes. This is the default pattern.

Test-First Bug Fix:
Test writer reproduces bug with failing test. Implementer fixes smallest
behavior. Reviewer checks test relevance. Integrator verifies failing-before and
passing-after evidence.

Refactor Sandwich:
Small behavior-preserving refactor, focused verification, feature
implementation, focused verification, cleanup pass, final review.

Review Swarm:
Reviewer A correctness, reviewer B small-code/sprawl, reviewer C tests,
reviewer D security/data risk. Coordinator merges and prioritizes findings.

## Anti-Patterns

Agent stampede: many agents edit the same area. Fix by serializing shared
boundaries.

Vague delegation: "clean up backend" or "improve tests." Fix with task packets.

Merge everything: accepting output because it exists. Fix by rejecting work that
does not improve the final system.

Parallel architecture: different agents invent different abstractions. Fix by
making architecture/API decisions serial and explicit.

Test theater: tests pass but do not protect behavior. Fix by requiring each test
to name the behavior or bug it protects.

Review without authority: reviewers produce lists but nobody decides. Fix by
having the coordinator classify findings as P0, P1, P2, reject, follow-up, or
human decision.

Endless follow-ups: agents create backlog pollution. Fix by requiring specific,
valuable, independently actionable follow-ups.

## Follow-Up Task Rules

A follow-up task must include:

- Specific problem.
- Why it matters.
- Suggested scope.
- Risk level.
- Verification path.
- Whether it blocks current work.

Bad:

```text
Clean up auth.
```

Good:

```text
Extract tenant access check from ProjectController and InvoiceController into a
single domain-named permission function.
Why: two implementations now differ on disabled users.
Scope: auth permission module and two controller tests.
Verification: add regression test for disabled cross-tenant user.
```

## Human Escalation Rules

Escalate decisions affecting product behavior, security model, data model,
public API, billing/payment semantics, migration strategy, dependency choice,
architecture direction, user-visible UX, compliance/privacy, irreversible
deletion, or large-scale refactor.

Agents recommend. Humans decide.

## Success Criteria

A swarm run succeeds when the final diff solves the original goal, each merged
change has a clear reason, no subagent exceeded scope silently, tests verify
behavior, final code is smaller or more coherent, public APIs did not expand
unnecessarily, follow-ups are specific, integration did not create duplicate
abstractions, a human reviewer can understand the final diff, and the system is
easier to change afterward.
