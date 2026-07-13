---
name: repoprompt-pro-review
description: "Prepare a bounded RepoPrompt context export for an external reviewer without Context Builder or Oracle/send. Use when the user names RepoPrompt, ChatGPT Pro review, selected files, or a review export."
---

# RepoPrompt Pro Review

Build a compact, reviewable selection and prompt through RepoPrompt's selection and prompt tools only.

## Workflow

1. Establish the review question, requested token limit, and files that define contract, behavior, and evidence.
2. Clear the existing selection, then add small essential files whole and only relevant ranges from large files.
3. Check selection and token count after each reduction pass.
4. Set one review prompt containing goal, constraints, current evidence, selected scope, and concrete questions.
5. Export to a user-approved path and report what was selected.

## Hard rules

- Do not use Context Builder, Oracle, or send operations.
- Do not add unrelated dirty-worktree files, broad logs, generated files, or whole large files when slices suffice.
- Preserve repository-relative paths and requested token budget; if over budget, reduce context before reducing the review question.
- Do not include secrets, access tokens, or private credentials in selection or prompt.

## Output

Report export path, token count, full files versus slices, review questions, and confirmation that Context Builder and Oracle/send were avoided.
