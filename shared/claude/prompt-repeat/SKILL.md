---
name: prompt-repeat
description: "Apply prompt repetition to a task for improved accuracy (arxiv:2512.14982). Repeats the original task at the end of context before answering to anchor the model. Use for: prompt repeat, repeat prompt, anchor task, prompt repetition, improve accuracy, non-reasoning boost."
---

# prompt-repeat

Implements **Prompt Repetition** from arxiv:2512.14982: repeating the input prompt improves performance for non-reasoning LLMs without increasing generated tokens or latency.

## Command

`/prompt-repeat <task>` — Execute a task with prompt repetition anchoring.

## How It Works

The paper finding: appending the original prompt at the end of itself (before generation) significantly improves accuracy on non-reasoning models. This skill applies that technique by:

1. Acknowledging the original task
2. Working through it fully
3. **Re-anchoring to the original task verbatim** before producing the final answer

## Execution

When this skill is invoked with `<task>`:

### Step 1: Echo the task (first repetition)
State the task clearly at the top:
> **Task:** `<task>`

### Step 2: Work
Execute the task — use whatever tools, reasoning, or code are appropriate.

### Step 3: Re-anchor (second repetition — the key step)
Before writing the final answer, restate the original task verbatim:
> **Re-anchoring to original task:** `<task>`

Then produce the final answer with the original task freshly in context.

### Step 4: Deliver
Output the final answer, ensuring it fully satisfies the original task as re-stated.

## Example

`/prompt-repeat List all .ts files in src/ that import from utils`

```
Task: List all .ts files in src/ that import from utils

[... search and investigation ...]

Re-anchoring to original task: List all .ts files in src/ that import from utils

Files found:
- src/auth/login.ts (line 3: import { format } from '../utils')
- src/api/client.ts (line 1: import { retry } from '../utils')
```

## When to Use

Particularly effective for tasks where the model might drift from the original intent:
- Complex multi-step tasks
- Tasks with many sub-questions
- Precise technical lookups where exact scope matters
- Anything where a previous attempt gave a partial or off-target answer
