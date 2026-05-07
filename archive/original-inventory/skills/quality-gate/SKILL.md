---
name: quality-gate
description: "Run a language-agnostic quality gate using independent reviewer findings and Definition of Done checks, then drive CodeRabbit cleanup and final application verification. Use for: second-pass review, subagent quality gate, approve or needs-changes decision, merge readiness, ship/no-ship call, design consistency gate, simplicity/elegance review."
---

# Quality Gate (Language-Agnostic)

Use this skill when you need an unbiased, repeatable quality decision that does not depend on a specific language or framework.

## When To Use

- User asks for a second look before finalizing work.
- You need a consistent `approved | approved-with-known-risks | needs-changes` outcome.
- Multiple reviewers/subagents produced findings and you need one merged decision.
- You want a simple Definition of Done (DoD) gate.

## Non-Negotiable Rules

1. Keep it stack-neutral by default.
2. Require concrete evidence for findings (file path, trace, failing test, output).
3. Separate findings from recommendations.
4. Use deterministic policy defaults unless user overrides.
5. If uncertainty is high, downgrade confidence and explain why.

## Default Policy

- Block severities: `critical`, `high`
- Max warning findings: `5`
- Required checks must pass: `true`
- Unknown severity blocks: `false` (set true in stricter environments)

## Workflow

1. Gather reviewer outputs (one or more independent reviewers/subagents).
2. Normalize findings into the schema in `references/output-schema.md`.
3. Normalize DoD checks using `references/dod-template.md`.
4. Apply policy:
   - Any blocker -> `needs-changes`
   - Any failed/incomplete required check -> `needs-changes`
   - Warnings above budget -> `needs-changes`
   - Non-blocking warnings only -> `approved-with-known-risks`
   - No material issues -> `approved`
5. If the gate is not clean, patch the issues that should be fixed before ship.
6. After the quality gate agents have completed, run a CodeRabbit prompt-only pass against the committed diff:
   - `coderabbit review --prompt-only -t committed --base <base-target> > cr_reviews.txt`
   - Expect this step to take time. A single CodeRabbit pass may take roughly 3 to 15 minutes.
   - Treat `cr_reviews.txt` as review input, not as ground truth.
   - Ignore false positives.
   - Ignore purely doc-formatting, lint-only, or styling-only issues unless they hide a real correctness, readability, or maintainability problem.
7. Patch the valid issues, commit the changes, and repeat the CodeRabbit pass until no actionable issues remain.
8. Once the review loop is clean, run the normal application checks for the repo.
   - Prefer the repo's standard verification commands, for example `pnpm` checks, `tsgo`, `mix`, and similar project-native checks.
   - Run the smallest complete set that gives a trustworthy final signal for the changed area.
9. Produce final gate output (decision, rationale, summary, recommendations, gate note).

## Operational Rules

- This skill runs after the independent quality-gate reviewers/subagents, not instead of them.
- Use a concrete base target for the CodeRabbit command.
  - Prefer the repo's normal integration branch, usually `main` or `master`.
  - If the repo uses a different trunk branch, use that instead.
  - If the change is based on another feature or release branch, use the branch the work will actually merge into.
  - When uncertain, inspect git history/remotes and choose the most likely merge target instead of guessing blindly.
  - Keep the same base target for the whole review loop unless you discover it was wrong.
- Keep the loop deterministic:
  - review
  - triage
  - patch
  - commit
  - re-review
- Do not churn on waived issues.
- Do not block ship on cosmetic documentation nits, lint-only churn, or formatting-only noise unless the user explicitly asks for that standard.
- If CodeRabbit or app checks surface real regressions, correctness issues, or missing tests, they are in scope and should be fixed before approval.

## Required Output

Always return:
- `decision`
- `rationale`
- `summary`
- `blocking_findings`
- `failed_checks`
- `recommendations`
- `gate_note`

Use the exact structure in `references/output-schema.md`.

## Reviewer Prompt

Use `references/reviewer-system-prompt.md` as the reviewer system prompt when spawning subagents.

## Notes

- Treat this as a quality gate, not a rewrite pass.
- Keep conclusions concise and actionable.
- Save CodeRabbit prompt-only output to `cr_reviews.txt` unless the user or repo conventions require another path.
