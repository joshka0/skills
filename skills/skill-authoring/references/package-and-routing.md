# Package and routing contract

This file is one part of the single normative contract in this directory, not an independent rule set. Reconcile disagreement between these references before acceptance; historical rubric reports are evidence only.

## Description and trigger contract

The description is the primary routing interface and MUST be optimized for precision, not keyword stuffing.

### Format

- It MUST be one physical YAML line using a plain or quoted scalar.
- Folded or literal YAML blocks are forbidden; flatten them during a rewrite.
- It MUST contain one or two sentences.
- A leaf or interaction skill MUST be at most **220 characters** including spaces.
- A router or mode suite MUST be at most **320 characters** including spaces.
- The first sentence states the differentiated capability with a concrete verb and object.
- The final sentence starts with `Use when ...` and names concrete selection signals.

### Trigger precision

- Use at most six trigger phrases or artifact names.
- Prefer observable nouns and user language: a tool name, file type, command, artifact, failure class, or explicit quoted phrase.
- A trigger MUST identify why this skill wins over its nearest sibling.
- Generic words such as code, test, review, frontend, network, plan, or debug are insufficient without a discriminator.
- Greedy claims such as any, all, whenever, or every coding task are forbidden.
- Persona, tone, and human-gated workflows MUST trigger only from explicit invocation phrases; ordinary requests for brevity or an opinion MUST NOT silently activate a persistent mode.
- A deterministic user macro that a model should never self-select MUST set `disable-model-invocation: true` in frontmatter when Claude Code is a consumer.
- Put real collision exclusions in a compact `Do not use when` section. A short trailing `Not for ...` clause is allowed only for a frequent pre-routing collision.

### Collision test

Before acceptance, compare the description with every retained skill in its trigger neighborhood. Record a collision matrix in the acceptance report: each claimed phrase or artifact, first owner, nearest competitor, discriminator, and precedence or handoff rule. A consolidated suite also shows how important absorbed legacy names or phrases remain selectable from metadata.

- Each common request MUST have one obvious first owner.
- If two skills claim the same request, merge them as modes or make the discriminator explicit.
- A router and its routed children MUST NOT all advertise the same trigger in one default overlay.
- Compatibility aliases and provider wording variants do not receive descriptions or slots; preserve useful differences as references.

A true router names separately retained child skills in its description because metadata is visible before routing. If the list cannot fit within 320 characters or eight targets, the router is too broad. A mode suite names user-facing surfaces, not every reference file.

## Size budgets and progressive disclosure

Hard budgets are pass/fail limits, not targets to fill.

| Artifact | Target | Hard limit | If over limit |
| --- | --- | --- | --- |
| Leaf or mode-suite `SKILL.md` | 40–80 lines | 120 lines and 10 KiB | Move selectable detail to references or delete default behavior. |
| Private-tool leaf `SKILL.md` | 40–100 lines | 160 lines and 12 KiB | Move recipes to references; never delete safety boundaries to fit. |
| Router `SKILL.md` | 25–60 lines | 80 lines and 6 KiB | Remove tutorial content or split an incoherent family. |
| One reference file | 40–150 lines | 250 lines and 20 KiB | Split by selection condition or defer to live docs. |
| Package total | As small as useful | 800 lines and 64 KiB | Delete mirrored documentation or split a distinct capability. |
| Consolidated owner absorbing four or more skills | ≤800 lines | 1,200 lines and 96 KiB | Trim to deltas; consolidation is not concatenation. |
| One script | 30–150 lines | 300 lines and 24 KiB | Promote it to a tested tool or simplify it. |

Package total means every text file, including prose in scripts, assets, and metadata; only license and attribution notices are excluded. Relocating prose to evade a budget is a violation. A private-tool leaf may use the 160-line tier only for predominantly non-inferable private operating facts, and its report must justify that exception. No other executor-granted budget exception exists; the absolute cap dominates a net-shrink claim.

### `SKILL.md`

Keep only instructions needed on every invocation or to select the next file. Do not include a full tutorial, API catalog, compatibility matrix, pricing table, SDK manual, motivational framing, simulated persona, repeated caution, several complete workflows, large code sample, copied command reference, or exhaustive checklist. Do not duplicate a reference, script, sibling, provider overlay, or official documentation.

### `references/`

- Use `references/` with kebab-case topic names.
- Every reference MUST have one explicit selection condition in `SKILL.md`.
- Say to read only the selected reference, not the whole directory.
- One file covers one mode, decision surface, or stable topic.
- References may hold deeper rationale, examples, checklists, schemas, troubleshooting, or private non-secret operating detail.
- References are not exempt from volatility, secret, path, duplication, or size rules.
- Remove orphan references and duplicate prose.

### Support files

Use a script only for a repeatable transform, scaffold, audit, or validation sequence. Use assets only for static templates, fixtures, or copied files; documentation disguised as an asset belongs in references. Use `agents/` only for provider registration or display metadata, never a second skill contract.

## Mode-suite pattern

Use modes when a capability family shares object/lifecycle, preflight, safety rules, vocabulary, and output conventions; users normally need one mode or an explicit sequence; and movement between modes does not change provider capability or security boundary.

A suite MUST have two to eight modes. A consolidated owner absorbing four or more former skills may have up to ten. The active file MUST contain this table shape:

| Mode | Select when | Read |
| --- | --- | --- |
| `<kebab-case-name>` | Observable user intent or artifact | `references/<topic>.md` or `none` |

Mode names are short, stable, kebab-case, and distinguishable. Keep shared preflight and hard rules in `SKILL.md`; keep mode-only steps in the selected reference. Select exactly one mode by default; combine modes only for a user-requested or suite-defined sequence. Infer a clear mode without asking; ask only if modes materially change work. Natural-language routing works without provider-specific arguments. Do not hide unrelated tasks under an umbrella. When a former standalone becomes a mode, remove its frontmatter and default exposure while preserving its differentiated instructions in the owner.

## Router policy

A router earns a slot only when selective loading materially reduces context and it routes between three and eight substantial targets. It has a decision table, shared safety rules, and no framework tutorial; selects one target by default and says to read only it; routes one hop to a leaf, suite, or reference without cycles; may name a cross-family handoff but never auto-load another router; lists separately retained child names in description and table; and defines when targets can combine.

In a provider result, expose the router **or** independently triggerable children for that family, never both. A full profile may substitute children for the router but must not double expose it. If targets share a lifecycle and safety contract, use a mode suite instead.
