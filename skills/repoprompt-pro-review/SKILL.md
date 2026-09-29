---
name: repoprompt-pro-review
description: "Build a bounded RepoPrompt selection and prompt export for an external reviewer (e.g. ChatGPT Pro), without Context Builder or Oracle. Use when the user names RepoPrompt, a Pro review, or a review export."
disable-model-invocation: true
---

# RepoPrompt Pro review

Use only RepoPrompt's selection and prompt tools. Never Context Builder, Oracle, or send.

1. Fix the review question and token budget.
2. Clear the selection. Add small contract, behavior, and evidence files whole. Add only the relevant slices of large files. Check the token count after each pass. If over budget, cut context, never the question.
3. Set one prompt: goal, constraints, current evidence, scope, concrete questions.
4. Export to a path the user approves. Report the path, token count, and full files versus slices.

Leave out unrelated dirty files, logs, generated files, and secrets.
