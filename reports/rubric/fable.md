# Skill Design Rubric — Fable draft (independent)

Date: 2026-07-09. This is the contract every retained skill must satisfy after the revamp. It is written for an executor holding zero conversation history: this document + one golden example must be sufficient to produce a conforming skill. It replaces the current `skill-authoring` content once converged.

## 1. Existence bar

A skill earns a catalog slot only if it passes ALL of:

- **Beats-defaults test**: a strong agent, unprompted, would behave materially differently without it. Restating competent-agent behavior ("write tests", "measure before optimizing") is negative value.
- **Trigger territory test**: it owns a trigger no other skill claims. If two skills could plausibly fire on the same request, they are one skill (modes) or one must die.
- **Genre ranking** (when in doubt, this ordering decides): ① private infrastructure — commands, URLs, protocols, conventions of the user's tools that no model could know; ② opinionated deltas — house choices that differ from ecosystem defaults; ③ disciplined procedures — multi-step workflows a model won't sustain unprompted (must be genuinely non-default); ④ generic domain knowledge — banned; defer to model + live docs.

## 2. Frontmatter contract

- `name`: kebab-case, equals its directory name, unique across `shared/` (enforced — terra found a `plan-build` collision).
- `description`: **single physical line** (no `>`/`>-` folded YAML — folded descriptions are invisible to frontmatter grep and render as garbage in catalogs). Two sentences max: sentence 1 = what it does; sentence 2 = "Use when …" with 3–6 concrete trigger phrases. Third person. No mode enumeration in the description — modes live in the body.
- **Negative trigger**: if the skill is adjacent to a common request it must NOT own, the description ends with "Not for …" (one clause).
- Personas/voice modes (caveman, riff-partner) must be **explicit opt-in**: trigger phrases are literal user invocations, never behavioral inference. Deterministic user macros set `disable-model-invocation: true`.

## 3. Size budget & progressive disclosure

- `SKILL.md` ≤ **120 lines** target, 200 hard cap. It contains: routing/mode table, workflow, hard rules, output shape. Nothing else.
- `references/`: everything detailed — examples, templates, checklists, per-mode guidance. Loaded on demand, **one level deep**, each file addressed from SKILL.md by name with a one-line "read when" condition. No orphan reference files; no reference read unconditionally (that's just a longer SKILL.md).
- `scripts/`: deterministic repeatable operations (validation, scaffolding, hooks). A script beats prose whenever the operation has one right answer.
- `assets/`: static templates copied into target repos, never instructions.
- Reference count budget: ≤ 12 files per skill. `userinterface-wiki`'s 155 files is the anti-pattern: a wiki is not a skill; curate or externalize.

## 4. Writing rules for the body

- Imperative, active voice. No pep talk, no "this is important because" — the model doesn't need persuading, it needs the rule.
- Decision tables and numbered workflows over prose paragraphs.
- An example earns its place only if it changes behavior (shows a non-obvious output shape or a subtle failure). Delete illustrative examples of obvious things.
- Every hard rule must be checkable: an executor should be able to answer "did I comply?" yes/no.

## 5. Modes pattern (consolidated suites)

When N skills merge into one suite (code-quality, goal-protocol, design-family):

- One SKILL.md with a **mode table**: mode name | trigger phrases | reference file. Body holds only cross-mode rules.
- Each absorbed skill becomes `references/<mode>.md`, trimmed to its non-default delta on the way in — merging is not concatenation.
- Compatibility aliases (old names users still type, e.g. `/tdd`) are allowed only as thin provider-level aliases pointing at a mode, never duplicate bodies.

## 6. Router policy

- A router exists only if it routes ≥ 3 children that remain separately exposed skills. Otherwise the suite self-routes via its own mode table.
- Routers route; they never carry content. A router body is a decision table + "read only the matching child" rule.
- **Exposure XOR**: an overlay exposes a router or its children, never both.

## 7. Volatility policy

- No fast-moving API surfaces in skill bodies: no version-pinned API matrices, model names, pricing, CLI flag dumps. Encode the durable opinion; fetch the volatile fact at run time (docs MCPs, `--help`, `list_components`).
- Litmus: "will this line be wrong within 6 months without us noticing?" If yes, replace with a fetch instruction.
- One-time migrations (nativewind→uniwind) are archived when done, not maintained.

## 8. Secrets & machine specifics

- **Never** in a skill: credentials, tokens, login values, private hostnames-with-auth. (Triage found live credentials in `local-dev` — this class of failure is a blocking review item.)
- Machine-specific absolute paths go in a machine-profile file outside the pack (e.g. `~/.config/<tool>/profile`), referenced by the skill as "read the profile". Skills must survive a new machine or a public repo unembarrassed.
- `$HOME`-relative or discovered-at-runtime paths over literal `/Users/<name>/…`.

## 9. Provider composition

- Canonical body lives in exactly one place: `shared/**` (or `mirrors/**` for intentional import patches). Bundles and overlays are build outputs — never hand-edited.
- One `name:` = one canonical body. Variants (transport, provider wording) are references or compose-time overlays, not sibling skills with the same name.
- Every shared skill declares its bundle membership in the compose inputs; a skill in `shared/` that no overlay exposes must be justified or archived.
- After any shared/ change: run compose + `sync-provider-roots.sh` parity check; overlays and `providers-current/` must not drift.

## 10. Acceptance checklist (executor self-verify, per skill)

1. [ ] Passes the beats-defaults test (state which genre ①–③ it is).
2. [ ] `name` = dir name, kebab-case, unique in `shared/`.
3. [ ] Description is one physical line, ≤ 2 sentences, has concrete trigger phrases, third person.
4. [ ] No other retained skill claims an overlapping trigger (grep the catalog and say which skills you checked).
5. [ ] SKILL.md ≤ 120 lines (≤ 200 absolute); contains only routing, workflow, hard rules, output shape.
6. [ ] Every reference file is named from SKILL.md with a read-when condition; none is mandatory-read; ≤ 12 refs.
7. [ ] No generic domain knowledge a strong model already has.
8. [ ] No volatile facts (API matrices, versions, model names, prices) — replaced with fetch instructions.
9. [ ] No secrets, no literal machine paths.
10. [ ] Personas/macros are explicit-opt-in; `disable-model-invocation` where applicable.
11. [ ] If a suite: mode table present; absorbed skills exist as trimmed mode references; no concatenation.
12. [ ] If a router: ≥ 3 separately-exposed children; zero content in the router; exposure XOR verified.
13. [ ] Canonical home is `shared/` (or `mirrors/` patch); no hand edits under `bundles/`/`providers/`.
14. [ ] Compose inputs updated; parity check run and clean.
15. [ ] Diff shows net deletion or neutral line count vs the skills it replaces (the revamp must shrink the pack, not launder it).

## Golden examples (to be written in the pilot)

- `herdr` — genre ① exemplar: private tool, precise transport semantics, gotchas, zero generic content.
- `code-quality` (post-merge) — suite exemplar: mode table, trimmed mode references, compatibility aliases.
