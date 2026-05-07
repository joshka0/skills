---
name: plan-build-rp
description: "Build implementation plans using RepoPrompt as the drafting engine. Iterative plan-chat loop with manage_workspaces + manage_selection + chat_send until A+ quality or max 10 iterations. Use for: repoprompt plan, rp plan, plan with repoprompt, plan build rp, build plan rp, repoprompt architecture, rp implementation plan."
---

# Plan Build RP

Build high-quality implementation plans using RepoPrompt as the drafting and analysis engine. Claude acts as product owner and quality gate; RepoPrompt's chat model drafts plans with deep codebase context from selected files; the loop repeats until the plan earns an A+ grade or hits 10 iterations.

## Command

`/plan-build-rp <description>` — Build an implementation plan for the given feature/task description.

## Pipeline Overview

```
Phase 1: User understanding (AskUserQuestion)
Phase 2: Workspace + file selection (manage_workspaces + manage_selection)
Phase 3: Plan drafting loop (chat_send mode=plan, max 10 iterations)
  ├─ RepoPrompt drafts plan
  ├─ Claude grades it (A+ through F)
  ├─ A+ → accept, save, done
  └─ Below A+ → Claude writes feedback, sends follow-up chat_send
Phase 4: Finalize and save to docs/plans/
```

## Phase 1 — User Understanding

**Claude MUST ask clarifying questions before drafting.** Use AskUserQuestion to gather context:

### Question Categories

1. **Design Patterns & Architecture**
   - Architectural style? (monolith, microservices, modular monolith, event-driven)
   - Preferred design patterns? (repository, CQRS, observer, strategy, etc.)
   - State management? (Redux, Zustand, context, signals, etc.)

2. **UI/UX Preferences** (if applicable)
   - Component library or design system?
   - Responsive approach?
   - Accessibility requirements?

3. **Coding Practices & Constraints**
   - Error handling strategy?
   - Testing philosophy? (TDD, coverage targets, test types)
   - Type safety level?

4. **Scope Boundaries**
   - What is IN scope vs OUT of scope?
   - Which files/modules will be affected?
   - Existing patterns to follow?

5. **Non-Functional Requirements**
   - Performance budgets?
   - Backward compatibility?
   - Dependency constraints?
   - Security considerations?

### Questioning Rules

- **Minimum 1 round** of questions before proceeding.
- **Maximum 3 rounds** — after that, proceed with what you have.
- Adapt to the task — skip irrelevant categories.
- If the user says "just go", proceed with sensible defaults and note assumptions.

## Phase 2 — Workspace and File Selection

Set up RepoPrompt with the right codebase context for plan drafting.

### Step 1: Detect Repository

```bash
REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
REPO_NAME=$(basename "$REPO_DIR")
```

### Step 2: Ensure Workspace is Loaded

Check if the repo is already a workspace, or add it:

```
manage_workspaces(action="list")
```

If the repo isn't listed:

```
manage_workspaces(action="add_folder", folder_path=REPO_DIR)
```

### Step 3: Bind to a Tab

```
manage_workspaces(action="list_tabs")
manage_workspaces(action="select_tab", tab="<tab_id>")
```

### Step 4: Select Relevant Files

Based on the user's description and Phase 1 answers, identify the files most relevant to the plan. Use a combination of:

- Files the user mentioned explicitly
- Entry points and config files for affected modules
- Existing tests in the affected areas
- Architecture docs, CLAUDE.md, design docs

```
manage_selection(op="set", paths=[<relevant files and directories>], mode="full")
```

For large scopes, use `mode="codemap_only"` for peripheral files and `mode="full"` for core files:

```
manage_selection(op="add", paths=[<peripheral dirs>], mode="codemap_only")
```

### Step 5: Set the Planning Prompt

```
prompt(op="set", text="You are building an implementation plan for: <description>\n\nUser context:\n<all Phase 1 answers>\n\nOutput the plan using the structure below. Be specific — use exact file paths, name design patterns explicitly, include code snippets where they clarify intent.\n\n<paste plan structure template>")
```

The plan structure template (include inline):

```markdown
# Implementation Plan: <Title>

## Problem Statement
- What problem is being solved
- Why it needs to be solved now
- Expected outcome from user's perspective

## Architecture Decision
- High-level approach and WHY chosen
- Alternatives considered and why rejected
- Diagram if helpful (ASCII or mermaid)

## Design Patterns
For each: pattern name, where applied, why chosen

## File Changes
List EVERY file (new|modified), ordered by implementation sequence:
### `path/to/file.ext` (new|modified)
- Purpose, key changes, code snippet if helpful

## Testing Strategy
- Unit tests: modules, key cases, mocking strategy
- Integration tests: workflows, environment
- Edge cases: specific scenarios that MUST be tested

## Error Handling
- Strategy, expected scenarios, recovery

## Migration Notes (if applicable)
## Dependencies (if applicable)

## Implementation Order
Numbered steps, each independently testable

## Open Questions
Unresolved decisions with defaults
```

## Phase 3 — Plan Drafting Loop

This is the core loop: RepoPrompt drafts, Claude grades, iterate until A+. The goal is to produce the **most defined, unambiguous spec possible** — every decision made, every edge case covered, every file path concrete.

**Max 10 iterations.**

### Critical Rule: Ask the User When in Doubt

**At ANY point during this loop**, if Claude encounters ambiguity, a design decision with no clear winner, or a gap that only the user can fill — **stop and use AskUserQuestion immediately.** Do not guess. Do not pick a default and move on. The entire point of this skill is to produce a spec so precise that `/forge` can execute it without further human input.

Triggers for AskUserQuestion mid-loop:
- The draft proposes two valid architectural approaches and the codebase doesn't clearly favor one
- A section references behavior or requirements not mentioned in Phase 1
- The testing strategy depends on infrastructure choices (DB, queue, cache) not yet decided
- Error handling or edge cases reveal unstated business rules
- The implementation order has a dependency that could go either way
- RepoPrompt's draft surfaces an "Open Questions" section — **every open question must be resolved** via AskUserQuestion before the plan can reach A+
- File changes touch modules with unclear ownership or conventions

**An A+ plan has zero open questions.** If the draft has open questions, Claude MUST ask the user to resolve them before grading can reach A+.

### Iteration 1: Initial Draft

```
chat_send(
  new_chat=true,
  mode="plan",
  chat_name="plan-<kebab-case-name>",
  message="Build the implementation plan following the prompt instructions. Analyze the selected codebase files thoroughly before planning. Be specific with file paths, design patterns, and implementation order. Flag any open questions or ambiguities — we will resolve ALL of them.",
  git_scope="none"
)
```

Save the returned `chat_id` — all follow-ups use it.

### Grade the Draft

Claude reads the response and grades it against this rubric:

| Grade | Criteria |
|-------|----------|
| **A+** | All sections complete, specific file paths, named patterns with rationale, code snippets where helpful, testing covers edge cases, implementation order is logical, no contradictions, **zero open questions** |
| **A** | Almost there — one section could be more specific or a minor gap |
| **B** | Most sections solid but 2-3 need more specificity or rationale |
| **C** | Structural issues — vague file paths, unnamed patterns, missing testing strategy |
| **D** | Major gaps — missing sections, contradictions, no clear implementation order |
| **F** | Off-topic, misunderstood requirements, or mostly empty |

### Decision

- **A+** → Accept. Proceed to Phase 4.
- **A or below** → Resolve open questions with user, then write specific feedback and iterate.

### Resolving Open Questions

Before sending feedback to RepoPrompt, check the draft for any open questions or ambiguities. For each one:

```
AskUserQuestion(questions=[
  {
    "question": "<specific question surfaced by the draft>",
    "header": "<short label>",
    "options": [<2-4 concrete choices derived from the draft>],
    "multiSelect": false
  }
])
```

Incorporate all user answers into the next `chat_send` feedback message so the revised draft reflects resolved decisions.

### Iterations 2-10: Refinement

Send feedback as a follow-up in the same chat:

```
chat_send(
  new_chat=false,
  chat_id="<chat_id>",
  mode="plan",
  message="Current grade: <grade>.\n\nResolved decisions from user:\n<list any AskUserQuestion answers from this iteration>\n\nSpecific feedback:\n\n1. <Section>: <what's wrong, what it should say instead>\n2. <Section>: <what's missing>\n...\n\nKeep what's good. Fix only the issues listed. Output the complete revised plan with zero open questions."
)
```

After each response:
1. Check for open questions or ambiguities → AskUserQuestion if any
2. Re-grade with user answers incorporated
3. Continue until A+ or iteration 10

### If Iteration 10 Reached Without A+

Use AskUserQuestion one final time to resolve any remaining blockers, then report:
- Current grade and remaining issues
- Decisions still unresolved (if any, after asking)
- Ask whether to accept as-is, continue iterating, or abort

### Adjusting Selection Mid-Loop

If the draft reveals that more codebase context is needed (e.g., references files not in the selection):

```
manage_selection(op="add", paths=[<newly relevant files>], mode="full")
```

Then continue the chat — RepoPrompt picks up the new context automatically.

## Phase 4 — Finalize and Save

### Step 1: Extract the Final Plan

Read the last `chat_send` response — this is the A+ plan.

### Step 2: Apply Final Touches

Claude makes small improvements:
- Fix formatting inconsistencies
- Ensure all sections from the template are present
- Verify file paths are correct relative to repo root
- Add cross-references between sections if missing

### Step 3: Save the Plan

```bash
PLAN_DIR="${REPO_DIR}/docs/plans"
mkdir -p "${PLAN_DIR}"
```

Derive a kebab-case name from the description:
- `"add user authentication"` → `user-authentication.md`
- `"refactor payment processing"` → `refactor-payment-processing.md`

Write the final plan to `${PLAN_DIR}/<plan-name>.md`.

**Verify:** File exists and is non-empty.

### Step 4: Report to User

Tell the user:
- Where the plan was saved (relative path from repo root)
- How many iterations it took
- Final grade
- Summary of what the plan covers
- Suggest next steps: `/forge <plan-path>` to execute it

### Step 5: Clean Up RepoPrompt State

Optionally clear the planning prompt:

```
prompt(op="clear")
```
