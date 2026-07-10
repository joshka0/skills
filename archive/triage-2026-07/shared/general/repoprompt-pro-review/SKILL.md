---
name: repoprompt-pro-review
description: "Use when preparing a RepoPrompt context export for ChatGPT Pro or another external reviewer. Applies when the user asks for ChatGPT Pro, RepoPrompt, attach files, pass context, make a prompt, no context builder, no Oracle/send, or under 200k."
---

# RepoPrompt Pro Review

Use this skill to prepare a compact, review-ready RepoPrompt export for ChatGPT
Pro or another external reviewer.

## Rules

- Use RepoPrompt selection and prompt tools only.
- Do not use context builder.
- Do not use Oracle/send.
- Keep the export under the requested token budget.
- Prefer slices over full files for large files.
- Include results, metrics, and questions in the prompt, not as scattered context.
- Do not include unrelated dirty-worktree files just because they changed.

## Workflow

1. Clear selection:

```json
{"op":"clear"}
```

2. Add small/core files as full files:

```json
{"op":"add","mode":"full","paths":["path/to/file.go"],"strict":true}
```

3. Add large files as slices:

```json
{
  "op": "add",
  "mode": "slices",
  "slices": [
    {
      "path": "large/file.go",
      "ranges": [
        {
          "start_line": 100,
          "end_line": 220,
          "description": "provider fanout and routing"
        }
      ]
    }
  ],
  "strict": true
}
```

4. Check token count:

```json
{"include":["prompt","selection","tokens"],"path_display":"relative"}
```

5. Set the review prompt:

```json
{
  "op": "set",
  "text": "Ask the reviewer concrete questions. Include current results, constraints, and what kind of answer you want."
}
```

6. Export:

```json
{
  "op": "export",
  "path": "/tmp/repoprompt-review.txt",
  "include": ["prompt", "selection", "files", "code", "tokens"],
  "path_display": "relative"
}
```

## Selection Guidance

Include:

- The files that define the contract.
- The files that implement the behavior.
- The tests, evals, or datasets that expose the issue.
- Small supporting type files.
- Slices from large files around the relevant functions.

Avoid:

- Whole large files when slices suffice.
- Generated files.
- Full logs unless short.
- Broad docs unless the review is specifically about docs.
- Context-builder generated selections.

## Prompt Shape

Use this structure:

```text
We need an external review of <system/problem>.

Current goal:
- ...

Current results:
- ...

Important constraints:
- no hardcoded benchmark fixes
- keep generic across repos/languages
- preserve existing architecture boundaries

Files selected:
- contract files
- implementation files
- eval files

Questions:
1. Where is the architecture weak?
2. Which failures belong to provider/reducer/certifier/eval?
3. What smallest next slice would you implement?
4. What should we avoid?
```

## Token Budget Strategy

If over budget:

1. Slice the largest implementation file.
2. Demote supporting files to codemap-only.
3. Remove historical docs.
4. Keep eval data and the prompt summary.
5. Re-check tokens after every selection change.

## Final Response

Tell the user:

- export path
- token count
- files/slices included
- whether context builder or Oracle were avoided
