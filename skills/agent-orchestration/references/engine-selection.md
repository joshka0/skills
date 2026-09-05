# Engine selection

Honor the user's chosen model and harness. Select an engine when dispatching
work or when a switch is requested. Use `herdr` for pane transport and the
selected dispatch reference for task ownership.

## Codex models

House default: use `gpt-6-astra` for open-ended planning, coding, UI, debugging,
and review. Keep `gpt-5.6-sol` available when selected. Either model can own
planning and implementation; a separate planner is not required.

Use `gpt-5.6-luna` at `max` only when all of these hold:

- Astra, Sol, or another suitable stronger model authored an exact plan.
- The task is simple, bounded, low risk, and requires no open-ended design or diagnosis.
- The brief tells Luna to report missing, ambiguous, or conflicting steps.
  Luna must not plan, improvise, or sub-delegate.

Preserve the chosen effort. Verify model IDs and supported effort in the live
execution surface before switching. Use `ultra` only with user approval.
Do not use Terra. Preserve an explicit workflow pin, including the Luna
verifier in `herdr-goal`; that pin does not select the main worker.

For model-specific prompting, use the current
[OpenAI model guide](https://developers.openai.com/api/docs/guides/latest-model).
Keep model catalogs, pricing, and dated account-capacity observations out of
this skill.

## Independent review

Choose the reviewer relative to the executor's model family. Astra, Sol, and
Luna are all OpenAI models. For an independent or high-stakes review, prefer
another permitted family with suitable capability; family diversity alone
does not prove independence.

Use fresh context and original artifacts, without the author's desired verdict.
Read `collaborate.md` for a review dispatch. When another family is unavailable,
use a fresh native reviewer if the task permits it and report the limitation.
Do not weaken an explicitly required review boundary.

## Vendor boundaries

For Foxway work or data, all three routes are prohibited:

- grok and every xAI model;
- droid / Factory, regardless of its selected model;
- devin / Cognition, regardless of its selected model.

This includes read-only work, reviews, and one-shot queries. Cursor remains an
approved route; Foxway-bound Kimi must use `cursor-agent`. Hermes is unapproved
for Foxway pending an owner ruling. A permitted model does not authorize an
unapproved route. Restate all three prohibitions in each Foxway brief.

## Harness selection

Keep a requested harness. Otherwise use these local route constraints and
discover current syntax before launch.

| Harness | Use and constraints |
| --- | --- |
| Codex | Launch the selected OpenAI model with `codex -m <model> -c model_reasoning_effort=<effort>`. Prefer launch-local settings; an in-session model-picker change may alter shared configuration. |
| Hermes | For personal GPT or Kimi work, prefer Hermes when `command -v hermes` succeeds and live help confirms the chosen model and effort. An existing home directory is not proof of installation. If unavailable, use the applicable route below. Do not substitute it for a workflow that requires native Codex session identity. |
| Claude Code | Keep the native role definitions: Opus for orchestration/execution and adversarial review, Fable for planning and security investigation, Sonnet for bounded mechanical work. Do not use Haiku or place an OpenAI model ID in a Claude-native model field. Use Codex when the assignment calls for Astra. |
| claudex | Use only for an explicitly selected final adversarial pass. It is a Claude harness with an OpenAI proxy backend; verify the actual model and proxy service. Do not assume this policy changed its backend to Astra. Forbid subagents. If unavailable, use a native Codex review when substitution is permitted. |
| Grok | A separate model-family option for personal review. Discover current models and effort with `grok models` and live help. Never use it for Foxway. |
| Cursor | Use the named `cursor-agent` command and IDs from `--list-models`. Account authentication controls the catalog; its API key is not a model-provider key. Quote parameterized IDs. Do not assume the `agent` alias is Cursor or overwrite local audit wrappers during an update. |
| Devin | For personal Kimi work, use Devin when the installed CLI accepts the model slug and quota permits it; otherwise use Cursor. Catalog entries can be ahead of the CLI validator. Classify authorship by the actual model. Never use it for Foxway. |
| Droid | Retain only the DeepSeek and Qwen roles. Resolve their current custom IDs from safe local model metadata; never dump settings that contain provider keys. `droid exec -m` takes the custom ID; interactive launch uses its own model selection. Verify floating model tags when reproducibility matters. Never use it for Foxway. |

## Substitution and completion

- If a requested model or required route is unavailable, report the limitation.
  Substitute only when the task permits it, preserving the role, capability,
  review boundary, and vendor restrictions. A flexible Codex default may fall
  back from Astra to Sol; report the change.
- Distinguish capacity limits from authentication or entitlement failures.
  Do not cycle through models to evade an account-wide quota or policy denial.
- Keep one level of delegation. Each agent owns a complete bounded task and
  must not sub-delegate. A capable executor can work from the task's outcome
  and constraints; Luna requires the exact plan above.
- Validate returned evidence before integration. Record the actual model,
  effort, harness, and any substitution. Clean up only resources created for
  the task, under the transport owner's rules and the user's Trash policy.
