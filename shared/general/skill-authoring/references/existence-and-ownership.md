# Existence and ownership contract

This is a maintained operational split of the repository's current rubric, which remains the single normative source. The words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** carry that rubric's force; reconcile any drift before accepting a package. If a golden example conflicts with the rubric, the rubric wins.

## Operating model

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

## Existence bar

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

When judging a borderline delta, prefer private tool contracts and topology, then opinionated house invariants, then disciplined procedures a model will not sustain unprompted. Generic domain knowledge never qualifies.

The following do **not** clear the bar by themselves:

- Generic requests to write clear code, test behavior, or inspect before changing.
- Beginner tutorials, API tours, pattern catalogs, or restatements of official documentation.
- A wrapper around a user instruction that already contains the full behavior, such as an explicit request to zoom out.
- A compatibility alias, provider wording variant, or mux-specific copy of an existing workflow.
- A broad subject label without a durable opinionated delta.
- High usage alone or zero usage alone; usage is evidence about trigger quality, not proof of value or uselessness.

Decision rule:

- If the non-default delta fails, **CUT**.
- If the delta passes but standalone need or trigger separability fails, **MERGE** into the owner.
- If the slot is justified but the body, trigger, or reference set violates this contract, **TRIM**.
- Only a package that passes the existence gate and every acceptance item is **RETAINED**.

An executor MUST stop and report the appropriate cut or merge target if a supposedly retained skill fails this gate; polishing it is not completion.

## Canonical package contract

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
- `description` MUST follow the package-and-routing contract.
- Additional frontmatter keys MUST have an identified provider consumer; speculative flags and duplicated provider metadata are forbidden.
- License or source metadata MAY remain when attribution requires it.
- Provider-specific registration belongs under `agents/` unless the shared frontmatter key is demonstrably supported by every target that receives it.
- A provider-specific frontmatter key in a shared body MUST be stripped by composition where unsupported or verified harmless when ignored; record that choice in pack notes.

`SKILL.md` is the command brain. It contains only purpose, selection, preflight, shared workflow, non-default hard rules, stop conditions, output shape, and exact instructions for choosing deferred material.
