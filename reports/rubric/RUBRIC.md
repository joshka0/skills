> Living contract: `shared/general/skill-authoring/references/` as of 2026-07-10.

# Skill Design Rubric — Executor Contract

Status: **converged canonical rubric** for the post-triage `joshka0` skills pack. Produced from two independent blind drafts (`sol.md` as skeleton, amendments from `fable.md`), pending adversarial review and pilot validation. On execution this becomes the new `skill-authoring` content.

This is the normative contract for creating, consolidating, or reviewing a retained skill. An executor with only this rubric, the repository instructions, and one golden example must be able to produce a conforming package without conversation history.

The words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are normative. If a golden example conflicts with this rubric, the rubric wins; the example demonstrates shape and tone, not exceptions.

## 1. Operating model

A skill is loaded policy, not a topic encyclopedia.

- Its `description` is an always-visible routing cost that competes with every other skill description.
- Its `SKILL.md` is active context paid on every invocation.
- Its references are deferred context paid only when selected.
- Its scripts and assets are implementation support, not places to hide prose.

A retained skill MUST fit exactly one archetype:

1. **Leaf skill** — performs one distinct task or operates one distinct private tool.
2. **Mode suite** — owns one capability family with several mutually exclusive or deliberately sequenced modes.
3. **Router** — selects among independently maintained skills or substantial surfaces while contributing almost no domain tutorial itself.
4. **Explicit interaction mode** — changes conversational behavior only after a narrow user phrase such as “grill me” or “caveman mode.”

If the package does not clearly fit one archetype, it is probably an accidental umbrella and MUST be merged, split, or cut.

## 2. Existence bar

Run this gate before editing prose. A standalone skill earns a catalog slot only when all five tests pass.

| Test | Pass condition |
| --- | --- |
| Non-default delta | It changes what a strong agent would otherwise do, know, or verify. |
| Repeatability | The capability is expected to recur; it is not a one-off answer or setup note. |
| Trigger separability | A short, concrete user intent can select it without colliding with a sibling. |
| Standalone need | Its useful delta cannot fit cleanly as a mode or reference in an existing owner. |
| Maintenance value | Its durable value exceeds its description tax, load cost, and freshness burden. |

Qualifying non-default deltas include:

- Private tool contracts, local topology, aliases, safety boundaries, or operating facts that a model cannot infer.
- A deterministic repeatable operation better implemented as a script or exact workflow.
- An opinionated house invariant that intentionally differs from generic best practice.
- A high-stakes evidence, gate, or handoff contract with an exact downstream consumer.
- A named, explicitly invoked interaction contract whose persistence or turn shape is not implied by the request alone.

When judging a borderline delta, prefer in this order: private tool contracts and topology, then opinionated house invariants, then disciplined procedures a model will not sustain unprompted. Generic domain knowledge never qualifies at any position.

The following do **not** clear the bar by themselves:

- “Write clear code,” “test behavior,” “inspect before changing,” or other strong-model defaults.
- Beginner tutorials, API tours, pattern catalogs, or restatements of official documentation.
- A wrapper around a user instruction that already contains the full behavior, such as “zoom out.”
- A compatibility alias, provider wording variant, or mux-specific copy of an existing workflow.
- A broad subject label such as “Go,” “networking,” or “frontend” without a durable opinionated delta.
- High usage alone or zero usage alone; usage is evidence about trigger quality, not proof of value or uselessness.

Decision rule:

- If the non-default delta fails, **CUT**.
- If the delta passes but standalone need or trigger separability fails, **MERGE** into the owning suite.
- If the slot is justified but the body, trigger, or reference set violates this contract, **TRIM**.
- Only a package that passes the existence gate and every acceptance item is **RETAINED**.

An executor MUST stop and report the appropriate cut or merge target if a supposedly retained skill fails this gate; polishing it is not completion.

## 3. Canonical package contract

Locally owned skills have exactly one canonical home under `shared/`:

```text
shared/<scope>/<skill-name>/
├── SKILL.md
├── references/        # optional, deferred instructional detail
├── scripts/           # optional, deterministic operations
├── assets/            # optional, static templates or fixtures
└── agents/            # optional, provider registration metadata
```

Imported upstream bodies remain under `mirrors/`; patch them only as an intentional import decision. `bundles/` composes installed sets, `providers/` is generated installed output, and `providers-current/` is an explicit parity snapshot rather than a source.

Every `SKILL.md` MUST begin with minimal YAML frontmatter:

```yaml
---
name: example-skill
description: "Perform a differentiated capability. Use when the user names a concrete intent or artifact."
---
```

Rules:

- `name` MUST be unquoted kebab-case, match the canonical directory name, and be unique among retained canonical skills.
- `description` MUST satisfy Section 4.
- Additional frontmatter keys MUST have an identified provider consumer; speculative flags and duplicated provider metadata are forbidden.
- License or source metadata MAY be retained when attribution requires it.
- Provider-specific registration belongs under `agents/` unless the shared frontmatter key is demonstrably supported by every target that receives it.
- A provider-specific frontmatter key in a shared body (e.g. `disable-model-invocation`) MUST be either stripped by the compose script for providers that do not consume it or verified harmless-when-ignored; the choice is recorded per key in the pack notes.

A normal active body uses this shape and omits sections it does not need:

```markdown
# Skill title

<One-sentence operational contract.>

## Route
<Mode or target table, only for suites and routers.>

## Workflow
1. <Required action.>

## Hard rules
- <Non-default invariant.>

## Output
<Only the result shape a user or downstream tool actually needs.>
```

`SKILL.md` is the command brain. It contains only purpose, selection, preflight, shared workflow, non-default hard rules, stop conditions, output shape, and exact instructions for choosing deferred material.

## 4. Description and trigger contract

The description is the primary routing interface and MUST be optimized for precision, not discoverability by keyword stuffing.

### Format

- It MUST be one physical YAML line using a plain or quoted scalar.
- Folded or literal YAML blocks such as `>`, `>-`, `|`, or `|-` are forbidden. Many existing pack skills use folded descriptions; **flattening them to one physical line is a required mechanical migration step of the revamp**, expected on nearly every touched file.
- It MUST contain one or two sentences.
- A leaf or interaction skill MUST be at most **220 characters** including spaces.
- A router or mode suite MUST be at most **320 characters** including spaces.
- The first sentence states the differentiated capability with a concrete verb and object.
- The final sentence starts with `Use when ...` and names concrete selection signals.

### Trigger precision

- Use at most six trigger phrases or artifact names.
- Prefer observable nouns and user language: a tool name, file type, command, artifact, failure class, or explicit quoted phrase.
- A trigger MUST identify why this skill wins over its nearest sibling.
- Generic words such as `code`, `test`, `review`, `frontend`, `network`, `plan`, or `debug` are insufficient without a discriminator.
- `any`, `all`, `whenever`, “for every coding task,” and similar greedy claims are forbidden.
- Persona, tone, and human-gated workflows MUST trigger only from explicit invocation phrases; “be brief,” “what do you think,” or ordinary implementation requests MUST NOT silently activate a persistent mode.
- A deterministic user macro that a model should never self-select MUST set `disable-model-invocation: true` in frontmatter (its provider consumer is Claude Code).
- Negative routing guidance belongs in a compact `Do not use when` body section when a real neighboring collision remains; do not stuff exclusions into metadata. Exception: when the collision is with a *frequent* request class, a single short trailing `Not for ...` clause is allowed in the description and counts toward its character budget — a mis-route happens before the body is ever read, and the description is the only pre-routing surface.

### Collision test

Before acceptance, compare the description with every retained skill in the same trigger neighborhood, and record the comparison as a **collision matrix artifact** in the acceptance report: each claimed phrase or artifact, its first owner, nearest competitor, the discriminator, and any precedence or handoff rule. For a consolidated suite, additionally show that important absorbed legacy invocations (skill names and phrases users are known to type) remain selectable from metadata — an internal mode table is invisible until after routing.

- Each common request MUST have one obvious first owner.
- If two skills claim the same request, merge them as modes or make the discriminator explicit.
- A router and its routed children MUST NOT all advertise the same trigger in one default overlay.
- Compatibility aliases and provider wording variants do not receive descriptions or slots; preserve useful differences as references.

For a true router that targets separately retained skills, the description MUST name those child skills because metadata is visible before routing. If that list cannot fit within 320 characters or eight targets, the router is too broad. A mode suite names its user-facing surfaces, not every reference file.

## 5. Size budgets and progressive disclosure

Hard budgets are pass/fail limits, not targets to fill.

| Artifact | Target | Hard limit | If over limit |
| --- | --- | --- | --- |
| Leaf or mode-suite `SKILL.md` | 40–80 lines | 120 lines and 10 KiB | Move selectable detail to references or delete default behavior. |
| Private-tool leaf `SKILL.md` (see exception below) | 40–100 lines | 160 lines and 12 KiB | Move gotchas/recipes to references; never delete safety boundaries to fit. |
| Router `SKILL.md` | 25–60 lines | 80 lines and 6 KiB | Remove tutorial content or split an incoherent family. |
| One reference file | 40–150 lines | 250 lines and 20 KiB | Split by selection condition or defer to live docs. |
| Package total (all text files) | As small as useful | 800 lines and 64 KiB | Delete mirrored documentation or split a genuinely distinct capability. |
| Package total, consolidated owner absorbing ≥4 skills | ≤800 lines | 1,200 lines and 96 KiB | Trim absorbed content to deltas; consolidation is not concatenation. |
| One script | 30–150 lines | 300 lines and 24 KiB | Promote it to a tested tool or simplify the operation. |

Package total means **every text file in the package regardless of extension** — `SKILL.md`, `references/`, plus any prose in `scripts/`, `assets/`, and `agents/`; only license and attribution notices are excluded. Relocating prose into scripts, assets, heredocs, or provider metadata to evade a Markdown budget is a budget violation, not a workaround.

**Private-tool leaf exception:** a leaf whose body is predominantly non-inferable private operating facts (tool contracts, transport semantics, safety boundaries) MAY use the 160-line tier. The executor MUST record the justification in the acceptance report; the exception never applies to generic content.

There are no other executor-granted budget exceptions: exceeding a hard limit fails acceptance and requires redesign or explicit human revision of this rubric. Where the net-shrink rule (A33) and an absolute cap both apply, **the absolute cap dominates** — shrinking relative to the replaced skills does not excuse exceeding a hard limit.

### `SKILL.md`

Keep only instructions needed on every invocation or needed to select the next file. The body MUST NOT contain:

- A full tutorial, API catalog, compatibility matrix, pricing table, or SDK manual.
- Long motivational framing, simulated personas, or repeated “be careful” prose.
- Several complete workflows when one mode table can route to them.
- Large code samples, copied command references, or exhaustive checklists.
- Details duplicated in a reference, script, sibling skill, provider overlay, or official documentation.

### `references/`

- Use the directory name `references/` and kebab-case topic names.
- Every reference MUST have one explicit selection condition in `SKILL.md`.
- The skill MUST say to read only the selected reference, not the entire directory.
- One file covers one mode, decision surface, or stable topic.
- References MAY contain deeper rationale, examples, checklists, schemas, troubleshooting, or private non-secret operating detail.
- References are not an exemption from volatility, secret, path, duplication, or size rules.
- Orphan references and duplicate prose MUST be removed.

### `scripts/`

Use a script when correctness depends on a repeatable transform, scaffold, audit, or validation sequence. Prefer invoking a small tested script over teaching an agent to re-create it from prose.

### `assets/`

Use assets only for static templates, fixtures, or files copied by the workflow. Documentation disguised as an asset belongs in `references/`.

### `agents/`

Use this directory only for provider registration or display metadata. It MUST NOT contain a second version of the skill contract.

## 6. Mode-suite pattern

Consolidated families such as code quality, durable goals, design, and product platforms SHOULD use modes when all of these are true:

- The modes operate on the same kind of object or lifecycle.
- They share preflight, safety rules, vocabulary, and output conventions.
- A user normally needs one mode at a time or an explicit ordered pass sequence.
- Moving between modes does not require a different provider capability or security boundary.

A suite MUST have between **two and eight modes**; a consolidated owner absorbing four or more former skills MAY have up to **ten**. More than that indicates an umbrella that needs stronger grouping or a separate skill.

The active file MUST contain a routing table with exactly these semantics:

| Mode | Select when | Read |
| --- | --- | --- |
| `<kebab-case-name>` | Observable user intent or artifact | `references/<topic>.md` or `none` |

Rules:

- Mode names MUST be short, stable, kebab-case, and mutually distinguishable.
- Shared preflight and hard rules stay in `SKILL.md`; mode-only steps live in the selected reference.
- Select exactly one mode by default.
- Run multiple modes only when the user requests a pass sequence or the suite defines one explicit sequence.
- If context identifies one mode, infer it without asking; ask only when different modes would materially change the work.
- Natural-language routing MUST work even if a provider-specific `args` field is absent.
- Do not use modes to hide unrelated tools or tasks under an umbrella name.

When a former standalone skill becomes a mode, remove its `SKILL.md` frontmatter and default-overlay entry; preserve only the differentiated instructions in the owning package.

## 7. Router policy

A router earns a slot only when selective loading materially reduces context and it routes between **three and eight** substantial targets.

A conforming router:

- Contains a decision tree or table, shared safety rules, and nothing resembling a framework tutorial.
- Selects one target by default and explicitly says to read only that target.
- Routes in one hop to a leaf, mode suite, or reference; router-to-router auto-loading and cycles are forbidden.
- MAY name a cross-family handoff, but MUST NOT automatically chain-load another router.
- Lists separately retained child skill names in its description and routing table.
- Keeps routed references or hidden child packages out of the same default provider exposure.
- Defines when multiple targets may be combined rather than casually stacking skills.

Overlay rule: a provider exposes the router **or** its independently triggerable children for a family, never both in the same bundle result. A full bundle may substitute children for the router, but it still MUST NOT double-expose the family.

If the targets share one lifecycle and safety contract, use a mode suite instead of a router.

## 8. Volatility and source-of-truth policy

Treat a fact as volatile when there is a meaningful chance it changes within twelve months or across installed versions. This includes package APIs, SDK behavior, CLI flags, event schemas, provider capabilities, model names, prices, store rules, compliance requirements, compatibility matrices, and release procedures.

For volatile facts, the source order is:

1. The repository’s installed version, lockfile, generated types, configuration, and existing conventions.
2. Live tool output such as `--version`, `--help`, schema inspection, or provider status.
3. An official docs MCP or current primary documentation.
4. The skill, which supplies only durable house decisions, selection rules, and verification posture.

Requirements:

- A skill MUST NOT mirror an external manual or `llms-full.txt` into `SKILL.md` or references.
- A framework skill MUST instruct the executor to detect the installed version before applying version-sensitive advice.
- API matrices, exhaustive component tables, copied store checklists, pinned model recommendations, and “current” pricing are forbidden.
- External technical links MUST point to primary documentation and SHOULD use stable roots rather than fragile deep anchors.
- If current sources are unavailable, the skill MUST tell the agent to mark uncertainty rather than guess.
- Code examples SHOULD be under 40 lines and demonstrate a pack-specific invariant, not basic library usage.

A volatile value MAY appear only when it is an intentional pack constraint rather than a claim about the latest recommendation. Label it as a **Pack constraint**, explain what local decision owns it, and include a live availability or compatibility check.

Moving volatile prose from `SKILL.md` into `references/` does not solve volatility; replace it with a lookup and decision procedure.

## 9. Secrets, private infrastructure, and machine paths

Private operational knowledge is high-value, but secrets and non-portable literals are not acceptable storage formats.

### Secrets

- Credentials, passwords, tokens, API keys, private keys, recovery codes, session values, and secret-bearing URLs MUST NOT appear in Markdown, scripts, assets, examples, or provider copies.
- Development defaults and read-only credentials are still secrets.
- Examples MUST use unmistakable placeholders such as `<token>` or environment variable names.
- A skill MAY name secret keys, vault paths, or required variables, but MUST NOT print, summarize, or retrieve values unless the user explicitly authorizes that exact operation.
- Discovery commands MUST prefer key names, paths, counts, hashes, and status; blanket `env`, `printenv`, vault dumps, and dotenv output are forbidden defaults.
- Outputs and error reports MUST redact secret values.

### Paths and machine-specific facts

- Canonical pack content MUST use repo-relative paths, `$HOME`, or tool-specific variables such as `${CODEX_HOME:-$HOME/.codex}`.
- Literal home paths such as `/Users/<name>/...` and `/home/<name>/...` are forbidden.
- Stable aliases and service names MAY remain when they are the skill’s non-default value, but the workflow MUST verify them live before acting.
- Hostnames, IP addresses, ports, local URLs, device names, and filesystem locations SHOULD be discovered from config or status output rather than frozen in the pack.
- When a machine-specific value cannot be discovered, store it in an ignored local machine profile or environment variable; check in only a schema or `.example` asset with placeholders.
- A missing machine profile is a clear preflight failure, not permission to guess.

Private-infrastructure skills SHOULD retain topology, ownership, safe-operation rules, discovery commands, and failure handling. They SHOULD NOT become generic tutorials merely to appear portable.

## 10. Scripts, assets, and operational safety

Every support file MUST be referenced by the active skill or a selected reference.

Scripts MUST:

- Perform one deterministic operation with explicit inputs and observable exit status.
- Be idempotent where practical and fail closed on missing prerequisites.
- Avoid printing secrets or broad environment state.
- Provide a preview or dry-run path before destructive, publishing, permission-changing, or broad rewrite actions.
- Never auto-commit, push, publish, delete, or modify external state unless that action is the user’s explicit request and the skill’s named purpose.
- Use a runtime reasonably available to the target providers and avoid undeclared dependencies.
- Be smoke-tested from the skill directory.

Assets MUST be static, portable, secret-free, and copied or consumed by a named workflow step. Large binaries and generated documentation do not belong in a skill package.

Provider metadata MUST be derived from the same capability and trigger contract; it may adapt presentation but MUST NOT fork behavior.

## 11. Workflow, hard-rule, and output discipline

- Workflows MUST contain only steps that change execution; delete advice a strong agent already follows.
- Hard rules MUST protect a real invariant, user preference, security boundary, or known failure mode.
- Avoid identity reinforcement, all-caps warnings, repeated cautions, and performative roleplay. Banned constructs include (non-exhaustive): "You are an expert …" framing, "IMPORTANT/CRITICAL/NEVER FORGET" emphasis blocks, restating the same caution in multiple sections, motivational preambles about why quality matters, and apology/permission boilerplate. Reviewers judge borderline prose; when in doubt, delete it.
- Stop conditions MUST be concrete and proportionate; ordinary uncertainty is not a reason to stop.
- An exact output schema is justified only when a downstream tool, review gate, or user contract consumes it.
- Otherwise, specify the result and verification evidence without forcing a verbose report template.
- Commands MUST be portable to the declared environment and MUST not contradict repository instructions.

The final skill should make the correct action more likely while adding as little compulsory prose as possible.

## 12. Provider composition and exposure

Composition MUST preserve a single semantic source and a non-overlapping installed catalog.

1. Edit the locally owned body in `shared/`; edit `mirrors/` only for an intentional upstream patch.
2. Update bundle membership under `bundles/<provider>/<bundle>` when exposure changes.
3. Refresh any bundle copies mechanically from the canonical body; do not maintain semantic differences by hand.
4. Run the relevant compose script without `--apply` first and inspect the resulting entry list.
5. Apply the composition only when the requested task includes overlay refresh.
6. Verify the installed provider view has the intended names, descriptions, links, and hidden routing layout.

Rules:

- Every retained canonical skill name MUST be globally unique under `shared/`.
- Every composed provider overlay MUST contain at most one skill with a given frontmatter name.
- Mux, model, or provider variants SHOULD be references or transport adapters, not duplicate skill packages.
- Provider-native exceptions MAY remain under `providers/<provider>` only when the provider requires them and the exception is documented.
- Default overlays expose consolidated routers and precise leaf tools, not routers plus all routed children.
- Bundle and provider copies MUST be byte-equivalent to canonical instructional content except for documented provider-native metadata and documented compose-time reformatting; any such transform MUST be performed by the compose script, never by hand.
- Name uniqueness is enforced within `shared/` by design; a same-named skill under `mirrors/` or a provider-native exception MUST be documented in the pack notes, and a composed overlay MUST still contain at most one skill per name.
- Do not edit `providers/` as the source of a semantic change.
- Do not update `providers-current/` unless a parity snapshot is explicitly requested.
- A canonical skill under `shared/` that no overlay exposes MUST be justified in the pack notes or moved to `archive/`; unexposed live skills are latent drift.
- Repo-internal symlinks are forbidden; home-directory install symlinks are managed only by `bin/sync-provider-roots.sh`.

## 13. Mechanical validation recipe

Run from the repository root with the target directory substituted:

```sh
#!/bin/sh
# Usage: validate-skill.sh <skill_dir> <archetype>
# archetype: leaf | private-leaf | suite | router | interaction
set -eu

skill_dir="${1:?skill dir}"; archetype="${2:?leaf|private-leaf|suite|router}"
skill_file="$skill_dir/SKILL.md"
fail() { echo "FAIL: $*" >&2; exit 1; }

case "$archetype" in
  leaf|suite|interaction) max_lines=120; max_bytes=10240; max_desc=220 ;;
  private-leaf)           max_lines=160; max_bytes=12288; max_desc=220 ;;
  router)                 max_lines=80;  max_bytes=6144;  max_desc=320 ;;
  *) fail "unknown archetype $archetype" ;;
esac
if [ "$archetype" = suite ]; then max_desc=320; fi

test -f "$skill_file" || fail "missing SKILL.md"

# Frontmatter shape.
rg -q '^name: [a-z0-9]+(-[a-z0-9]+)*$' "$skill_file" || fail "name not kebab-case"
rg -q '^description: .+' "$skill_file" || fail "description missing or not one physical line"
if rg -q '^description:[[:space:]]*["'\'']?[>|]' "$skill_file"; then fail "folded/literal description block"; fi
desc_len=$(sed -n 's/^description:[[:space:]]*//p' "$skill_file" | head -1 | wc -c | tr -d ' ')
[ "$desc_len" -le "$max_desc" ] || fail "description $desc_len chars > $max_desc"

# Active-file budgets.
[ "$(wc -l < "$skill_file")" -le "$max_lines" ] || fail "SKILL.md over $max_lines lines"
[ "$(wc -c < "$skill_file")" -le "$max_bytes" ] || fail "SKILL.md over $max_bytes bytes"

# Per-reference and package-total budgets (all text files, licenses excluded).
for ref in "$skill_dir"/references/*.md; do
  [ -e "$ref" ] || break
  [ "$(wc -l < "$ref")" -le 250 ] || fail "reference over 250 lines: $ref"
done
total=$(find "$skill_dir" -type f \( -name '*.md' -o -name '*.txt' -o -name '*.toml' -o -name '*.yaml' -o -name '*.yml' -o -name '*.sh' \) ! -iname 'license*' -exec cat {} + | wc -l | tr -d ' ')
[ "$total" -le 800 ] || echo "WARN: package total $total lines (>800; only a documented consolidated owner may reach 1200)" >&2
[ "$total" -le 1200 ] || fail "package total $total lines > 1200"

# Portable paths and prose smells.
if rg -q '/Users/[^ <]+|/home/[^ <]+' "$skill_dir"; then fail "literal home path"; fi
if rg -qi 'remember:?[[:space:]]+you are|mandatory[[:space:]]+preparation|you are an expert|IMPORTANT:|CRITICAL:' "$skill_dir"; then fail "banned prose construct"; fi

# Unique canonical name within shared/.
name="$(sed -n 's/^name:[[:space:]]*//p' "$skill_file" | head -1)"
[ "$(rg -l "^name: ${name}$" shared -g 'SKILL.md' | wc -l | tr -d ' ')" -eq 1 ] || fail "duplicate name in shared/"

# Repo portability.
[ -z "$(find . -type l -print -quit)" ] || fail "repo-internal symlink present"

echo "PASS: $skill_dir ($archetype)"
```

This script MUST live at `bin/validate-skill.sh` and be run per skill; executors quote its PASS/FAIL line in the acceptance report. Every budget and pattern check fails closed via explicit `|| fail` / `if … then fail` — none is advisory.

Also verify manually or with a pack validator:

- The description character budget and collision test.
- Every local link and every routed target.
- Per-reference and package-total budgets.
- Support-file reachability and script smoke tests.
- Secret scanning with values redacted from logs.
- Bundle dry-run output and unique names in every affected provider.
- Router-versus-child exposure after composition.

Mechanical checks do not replace the existence, overlap, or volatility judgments; they make those judgments auditable.

## 14. Per-skill acceptance checklist

An executor MUST check every item and provide the result to the reviewer. Any unchecked item means the skill is not complete.

- [ ] A01 — I can state the non-default delta in one sentence, and it is more than generic good-agent behavior.
- [ ] A02 — The capability is repeatable and worth a persistent catalog slot rather than a one-off note.
- [ ] A03 — I compared the nearest retained owners and proved this belongs standalone or named the mode or reference that owns it.
- [ ] A04 — I classified the package as exactly one of leaf, mode suite, router, or explicit interaction mode.
- [ ] A05 — The canonical directory is under the correct `shared/` scope, and its kebab-case directory and `name` match uniquely.
- [ ] A06 — Frontmatter is valid and minimal, and every additional key has a known provider consumer.
- [ ] A07 — The description is one physical line, one or two sentences, and within the 220-character or 320-character budget.
- [ ] A08 — The description states the differentiated capability and ends with a concrete `Use when ...` sentence.
- [ ] A09 — I compared neighboring descriptions and found one obvious owner for every claimed trigger.
- [ ] A10 — Greedy triggers and implicit persona activation are absent, with explicit-only phrases used where required.
- [ ] A11 — `SKILL.md` passes the line and byte budget for its archetype.
- [ ] A12 — `SKILL.md` contains only selection, shared workflow, non-default rules, stop conditions, output, and reference routing.
- [ ] A13 — Every reference has one explicit selection condition, every link resolves, and only the selected reference is loaded.
- [ ] A14 — Each reference and the package total (all text files, any extension, licenses excluded) pass their hard budgets, with no prose relocated into scripts, assets, or metadata to evade them.
- [ ] A15 — No instructional prose is orphaned or duplicated across the active file, references, siblings, bundles, or providers.
- [ ] A16 — If modes exist, they share one lifecycle and safety contract and number between two and eight.
- [ ] A17 — The mode table uses distinct kebab-case modes, routes to exact files, and selects one mode by default.
- [ ] A18 — If this is a router, selective loading justifies the slot, it has three to eight targets, and it passes the router budget.
- [ ] A19 — Router targets resolve in one hop with no cycle, and the default overlay does not expose both router and children.
- [ ] A20 — Version-sensitive facts follow repo state, live tool output, and current primary docs in that order.
- [ ] A21 — No copied API manual, compatibility matrix, current pricing, store-policy catalog, model recommendation, or 500-line tutorial remains.
- [ ] A22 — Any pinned volatile value is labeled as a pack constraint with an owner, rationale, and live compatibility check.
- [ ] A23 — No credential, password, token, key, recovery value, secret URL, or real login value exists anywhere in the package.
- [ ] A24 — Secret discovery and reporting expose only names, paths, counts, hashes, or status and redact values.
- [ ] A25 — Paths are repo-relative, `$HOME`-relative, or tool-variable-based, with no literal user home path.
- [ ] A26 — Machine-specific non-secret facts are verified live or loaded from an ignored profile, and missing values fail clearly rather than being guessed.
- [ ] A27 — Every script is referenced, deterministic, prerequisite-checked, secret-safe, appropriately dry-runnable, within budget, and smoke-tested.
- [ ] A28 — Every asset and provider metadata file is referenced, portable, secret-free, and does not duplicate the skill contract.
- [ ] A29 — Workflow, hard rules, stop conditions, and output requirements are non-default, proportionate, and free of performative filler.
- [ ] A30 — Canonical, bundle, and provider copies are semantically identical, names are unique, and exposure matches the intended bundle policy.
- [ ] A31 — Local links, routed targets, compose dry runs, installed-view checks, and the no-internal-symlink check all pass.
- [ ] A32 — I compared the result with the golden example for shape, resolved every rubric difference in favor of this contract, and recorded validation evidence.
- [ ] A33 — For a consolidation or trim, the package total (all text files) is strictly smaller than the sum of the skills it replaces AND within its absolute cap; the revamp shrinks the pack rather than laundering it into references, scripts, or assets.
- [ ] A34 — **Preservation ledger**: for a consolidation or trim, the acceptance report inventories every qualifying non-default delta of each replaced or absorbed skill and classifies it as kept at `<path>`, merged into `<mode/reference>`, or dropped with an existence-bar reason. A reviewer MUST reject any unaccounted qualifying delta even when all budgets pass; net shrink proves nothing about preservation.
- [ ] A35 — The pre-rewrite original of every touched skill — including in-place rewrites, not only replaced siblings — exists under the wave's `archive/` directory.

## 15. Reviewer verdict

Conformance is two-stage:

- **PACKAGE-CONFORMS** — every acceptance item that can be judged from the canonical package alone passes (all items except A15's bundle/provider clause, A19's overlay-exposure clause, A30, and A31). This is the gate a rewrite can reach before composition; deferred catalog items MUST be marked DEFERRED, never PASS.
- **CATALOG-CONFORMS** — additionally, A15, A19, A30, and A31 pass across bundles, providers, and the installed view after composition.

Reviewers return exactly one result:

- **CONFORMS** — all 35 acceptance items pass at catalog level and the existence bar still holds.
- **REVISE** — the slot is justified, but one or more contract items fail.
- **MERGE-into-`<owner>`** — useful delta, wrong standalone boundary.
- **CUT** — no durable non-default delta remains.

A polished tutorial with a vague trigger is not close to conforming; it fails at the existence and routing layers before prose quality is considered.

## 16. Golden examples

The golden examples are **outputs of the pilot phase, not the current repo copies**. The current `herdr` (175 lines, folded description) and `code-quality` (487-char description, 1,343-line package) are non-conforming pre-rubric inputs — the pilot's first job is to rewrite them into conformance. No fleet execution may start until both pilot rewrites pass `bin/validate-skill.sh` and the full checklist. The rubric wins over the example wherever they differ.

- **Leaf / private tool** (`private-leaf` tier): `herdr` — exact transport semantics, gotchas, safety boundaries, zero generic content.
- **Mode suite** (consolidated-owner tier): post-merge `code-quality` — mode table, trimmed mode references, shared hard rules, compatibility aliases handled at provider level.
