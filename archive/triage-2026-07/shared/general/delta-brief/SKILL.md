---
name: delta-brief
description: Propagate a decision, design, or spec change to other agents and sessions — durable docs are the handoff for fresh sessions, and a structured delta brief (change, rule behind it, what stands) updates mid-flight ones. Use when the user asks how to inform another agent, session, or tool (Codex, Claude Design, a subagent, a teammate's session) about a change, or when a decision just invalidated context other agents were briefed with.
---

A change has two audiences, and they need different vehicles: **future sessions** (fresh context — they need durable artifacts) and **in-flight sessions** (stale context — they need a message). Most propagation failures come from mixing these up: re-pasting a full brief at a mid-flight agent, or relaying decisions by chat that never land in the repo.

## Workflow

1. **Land the change in the durable source of truth first.** Docs, specs, CLAUDE.md/AGENTS.md routing, README tables — whatever fresh sessions actually read. The repo is the handoff artifact; a chat message is not. Test: could a brand-new session reconstruct the current state with zero human relay? Until yes, step 2 is premature.
2. **Identify who is actually stale.** Only agents already mid-flight on the old context need an active push — typically sessions working from a pasted prompt (design tools), long-running peers, or background tasks launched before the change. Fresh and future sessions pick up the docs automatically; send them nothing.
3. **Send a delta, not a re-paste.** Re-sending the whole brief forces the agent to diff it mentally against what it has, invites it to re-decide settled questions, and buries the one thing that changed. The delta brief has five parts, in order:
   1. **Headline the change** — one sentence: what is different since the brief you have.
   2. **Old → new** — the concrete before and after, in the agent's working terms (screens, endpoints, sections), not abstractions.
   3. **The rule behind it** — the invariant or principle the change serves. This is the highest-leverage line: the surface change covers the cases you thought of; the rule lets the agent make consistent micro-decisions in cases you didn't specify.
   4. **What to redo** — name the specific artifacts to revisit (screen 1, the auth module, section 3). Bounded and explicit.
   5. **What stands** — say explicitly that everything else is unchanged. A delta without this boundary reads as license to redesign the rest.
4. **Point the delta at the durable docs.** End the brief with where the source of truth now lives, so the message is a pointer with a summary — not a second, competing spec.

## Hard rules

- **Never let the chat message be the only record.** If the delta brief says something the committed docs don't, the docs are wrong or the brief is — fix that before sending.
- **State the rule, not just the ruling.** "Use paired buttons here" ages worse than "nobody is ever visibly declined"; agents extrapolate from rules, not from instances.
- **Bound the blast radius.** "Everything else in the prompt stands" (or its equivalent) is mandatory, not politeness.
- **One delta per change-event.** If you're batching three unrelated changes, that's three headlines — or a re-brief, honestly labeled as one.

## Output shape

When asked "how do I tell the other agent": first verify (or make) the durable-doc update, state which sessions need nothing because routing covers them, then produce a **paste-ready delta brief** in a quote block the user can send verbatim. Read `references/worked-example.md` for the register — a real delta brief sent to a mid-flight design session after a consent mechanic changed.
