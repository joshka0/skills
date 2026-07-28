# Wave 2 campaign report — 2026-07-13

Binding scope: `reports/rebuild-2026-07/PLAN.md` Wave 2, with
`reports/rebuild-2026-07/codex-recommendations.md` as the recommendation spec.
This wave executed W2-P0, W2-P2, and W2-P3. It used no Git command, wrote no
`$HOME` path, and changed `providers/` only through `bin/pack apply --all
--full`.

## Result

| Work item | Result | Proof boundary |
| --- | --- | --- |
| W2-P0 consumer model | Complete | Catalog schema v2 now separates five executable consumers from seven generated provider views and records loader, ordered roots, precedence, and dated evidence. |
| W2-P2 `local-dev` trim | Complete | Two active modes remain, the complete pre-rewrite package is archived, and the preservation ledger below accounts for every prior mode and reference. |
| W2-P3 `planning-workflow` trim | Complete | Four active modes remain, the complete pre-rewrite package is archived, and the preservation ledger below accounts for every prior mode and reference. |
| Provider refresh | Complete | A pure render exposed only the expected 84 paths; the authorized atomic apply completed; a fresh render and `bin/pack check` pass. |
| Independent refutation | Complete — `Status: ACK` | The first Grok pass found only the then-missing campaign report/A34 ledger and priority-versus-exposure disclosure. Both were supplied here, and the closure pass found no remaining substantive defect. |

## W2-P0 — executable consumers, not provider views

`catalog/pack.json` is schema version 2. Provider composition remains seven
generated views, while the new `consumers` records describe the five real
loaders:

| Executable consumer | Ordered global roots, low to high precedence | Catalog policy | Generated source/install conclusion |
| --- | --- | --- | --- |
| Claude Code | `$HOME/.claude/skills` | `single-root` | `providers/claude` |
| Codex | `$HOME/.agents/skills`, then `${CODEX_HOME:-$HOME/.codex}/skills` | `co-loaded-identical`; 20 declared byte-identical overlaps | `providers/agents` and `providers/codex` |
| Droid | `$HOME/.factory/skills` | `single-root` | `providers/factory`; the retained `providers/droid` view is legacy generated compatibility data, not an install mapping or a second loader |
| Gemini CLI | `$HOME/.gemini/skills`, then `$HOME/.agents/skills` | `ordered-last-wins`; 20 declared byte-identical overlaps | `providers/gemini` followed by `providers/agents` |
| Google Antigravity IDE | `$HOME/.gemini/config/skills` | `single-root` | `providers/gemini-antigravity`; primary-docs verified, not UI-discovery verified |

The Agents root is an interoperability root consumed by Codex and Gemini, not
an eighth provider or sixth executable. Factory is the product behind the
Droid CLI, not a second executable consumer. Keeping all seven generated views
preserves the current live `$HOME/.droid/skills` link while this no-home-write
wave corrects the supported install model to the single Factory root.

### Catalog-derived behavior

- `bin/lib/pack-catalog.mjs` derives consumer/provider unions and unique install
  mappings from catalog records. Shared roots are deduplicated; conflicting
  provider claims for one root are rejected.
- `bin/lib/pack-cli.mjs` uses those mappings for `bin/pack install`; its root
  list is no longer a hard-coded seven-row provider table.
- `bin/lib/pack-catalog-check.mjs` validates consumer identity, ordered roots,
  precedence, evidence date/path/basis, declared overlaps, and effective
  consumer unions without requiring consumer keys to equal provider keys.
- `bin/lib/pack-parity.mjs` checks all governing install documentation against
  the catalog-derived mappings.
- Composer self-tests now cover shared-root deduplication and reject a
  same-root/different-provider declaration. The boundary fixture proves that a
  bad consumer record and missing runtime evidence both fail the gate.
- `README.md`, `AGENTS.md`, `PACK.md`, `packs/joshka0/README.md`,
  `packs/joshka0/SOURCE_NOTES.md`, and `catalog/README.md` now describe five
  consumers, seven provider views, and the catalog-derived install mappings.

The separately dated runtime record is
`reports/rebuild-2026-07/runtime-evidence-2026-07-13.md`. It records installed
versions, distinguishes live CLI observations from documentation-only proof,
and records that no home path was changed. Current Google Antigravity 2.0
documentation and the current Google codelab both name
`$HOME/.gemini/config/skills`; the previous Antigravity mapping is therefore no
longer supported. Because that directory is currently an ordinary empty
directory, the preview reports a required repoint, but this wave did not apply
it.

### Gemini Agent Vault exposure — open owner decision

Current reality is deliberately declared, not changed: Gemini CLI loads
`$HOME/.agents/skills` after `$HOME/.gemini/skills`. The effective union
therefore exposes the Agents-native `agent-vault-cli` and `agent-vault-http`
packages to Gemini in addition to the 20 byte-identical canonical overlaps.
Whether those two unique packages should remain exposed to Gemini is an **open
owner decision**. Wave 2 neither partitions them nor treats exposure as an
implicit policy approval.

## W2-P2 — `local-dev` preservation ledger

The complete original package was copied before editing to:

`history/rebuild-2026-07/wave-2/pre-rewrite/shared/general/local-dev/`

The archive contains the original `SKILL.md` and all five references. It was
compared with the canonical package before the rewrite. Only after that archive
existed were retired active references moved to Trash.

| Pre-rewrite surface | Disposition | Preserved behavior or explicit cut |
| --- | --- | --- |
| Router/frontmatter | Rewritten | Description and routing now name only local topology and secret-safe handoff. Explicit handoffs separate Agent Vault operations, browser interaction, and generic sandbox/context work. |
| `routes-and-worktrees` | Merged into `topology` | Preserves live tool/config inspection, emitted route values, task-derived worktree route names, existing-registration inspection, worktree status, Trash-only cleanup, destructive-Git prohibition, and shared-route ownership stop. Generic new-repository visibility and CI advice was cut as unrelated default behavior. |
| `proxy` | Merged into `topology` | Preserves live configuration/reachability discovery, service scoping, non-sensitive verification, publication/trust/value safety, and browser-operation handoff. |
| `secrets` | Retained byte-for-byte | Continues the value-free named-credential boundary. The `local-secrets` compatibility alias remains `reference-or-mode`. |
| `isolation` | Dropped from active package; complete original archived | Generic disposable-versus-persistent sandbox selection did not clear the standalone existence bar. No isolation provider operation was reassigned to this skill. |
| `project-context` | Dropped from active package; complete original archived | Generic context-file writing did not clear the standalone existence bar. `teach-context` is now explicitly `archive-only`. |
| Four retired reference filenames | Moved to Trash after archive | `routes-and-worktrees.md`, `proxy.md`, `isolation.md`, and `project-context.md` are absent from the active package; recoverability is through the dated complete archive. |

The package shrank from 6,863 to 5,074 bytes: **1,789 bytes smaller**.

Priority and exposure are intentionally different facts. Catalog priority and
status changed from `default`/`active` to `specialist`/`specialist-source`, which
narrows routing intent. `local-dev` is still a member of `core` for all seven
provider profiles because this catalog has no implemented specialist-only
profile. Composition selects profiles, not `priority`; therefore Wave 2 did
**not** remove the skill from default exposure and does not claim that it did.

Literal archetype validation:

```text
PASS: shared/general/local-dev (suite)
```

## W2-P3 — `planning-workflow` preservation ledger

The complete original package was copied before editing to:

`history/rebuild-2026-07/wave-2/pre-rewrite/shared/general/planning-workflow/`

The archive contains the original `SKILL.md` and all seven references. It was
compared with the canonical package before the rewrite. Only after that archive
existed were retired active references moved to Trash.

| Pre-rewrite surface | Disposition | Preserved behavior or explicit cut |
| --- | --- | --- |
| `prd` | Retained byte-for-byte | Remains a top-level mode. |
| `reviewed-plan` | Retained byte-for-byte | Remains a top-level mode. The `plan-build` compatibility alias remains. |
| `issues` | Retained and expanded | Remains a top-level mode and now owns AFK-ready issue briefs. |
| `agent-brief` | Merged into `issues`; original archived | Preserves the brief as durable authority; category; current and desired behavior; errors/edges; durable interfaces/config shapes; independently verifiable criteria; non-goals; behavior-over-procedure; no stale paths; HITL boundary; configured publication and preview. It is no longer a competing route, and live dispatch remains with `agent-orchestration`. |
| `triage` | Retained and expanded | Remains a top-level mode and now owns approved durable out-of-scope outcomes. |
| `out-of-scope` | Merged into `triage`; original archived | Preserves maintainer approval, one-concept records, durable rejection versus capacity deferral, linked requests, later-match confirmation, preview, and supersede/update rather than silent erasure. |
| `setup` | Branded top-level mode retired; original archived | Keeps only the missing tracker/label/domain-configuration preflight and explicit authorization stop in `SKILL.md`. The `/setup-matt-pocock-skills` trigger, prescribed AI-file choice, and branded configuration-writing flow were cut. Its alias is now `archive-only`. |
| Three retired reference filenames | Moved to Trash after archive | `agent-brief.md`, `out-of-scope.md`, and `setup.md` are absent from the active package; recoverability is through the dated complete archive. |

The package shrank from 10,321 to 8,976 bytes: **1,345 bytes smaller**.

Literal archetype validation:

```text
PASS: shared/general/planning-workflow (suite)
```

## Collision and ownership check

| Trigger/artifact | Owner | Nearest competitor | Discriminator/handoff |
| --- | --- | --- | --- |
| Portless route, worktree route, proxy, local reachability | `local-dev` topology | `gtr`, `local-http-browser-use` | Exact Gtr operation selects Gtr; browser interaction selects Local HTTP Browser Use; topology/reachability stays local-dev. |
| Value-free local credential handoff | `local-dev` secrets | Agents-native Agent Vault tools | A named injector or Agent Vault operation selects its provider-native skill; generic safe handoff selects local-dev. |
| PRD, reviewed plan, issue slice, triage, AFK-ready brief | `planning-workflow` | `goal-protocol`, `agent-orchestration` | One-shot governed artifact selects planning-workflow; durable goal lifecycle and live dispatch keep their owners. |
| Codex/Gemini duplicate canonical packages | Catalog consumer-union policy | Provider composition | Only the declared 20 byte-identical overlaps are accepted; Gemini additionally exposes two unique Agent Vault packages as an open policy decision. |
| Droid/Factory naming | `droid` consumer with Factory loader/root | Legacy `providers/droid` output | Only `$HOME/.factory/skills` is an executable install mapping; the Droid provider view is compatibility data pending a separately authorized home reconciliation. |

No new standalone child skill, router-child co-exposure, or ambiguous alias was
created.

## A01–A35 acceptance record

- **A01–A04 PASS:** each retained mode has a recurring non-default delta and
  each touched package remains exactly one `suite` archetype. Retired behavior
  is either owner-bound to a retained mode or explicitly cut and archived.
- **A05–A10 PASS:** canonical names/homes, frontmatter, description budgets,
  trigger ownership, negative routing, and interaction boundaries pass. The
  collision matrix above records the nearest competitors.
- **A11–A14 PASS:** both literal suite validators pass; the integrated check
  validates all 26 packages, 95 local package links, and package/reference
  limits.
- **A15 PASS:** catalog ownership, aliases, profiles, native exceptions, and
  generated exposure remain complete and non-overlapping.
- **A16–A19 PASS:** the two suites have valid route counts, selected references,
  one-hop routing, and no separately exposed router children.
- **A20–A29 PASS:** source-of-truth order, portable paths, value-free secret
  handling, reachable support files, concrete safety rules, Trash-only cleanup,
  and volatile-fact boundaries pass. The secret scan reports zero findings.
- **A30–A31 PASS:** catalog semantics, executable consumer unions, native
  inputs, full renders, and all seven live provider views pass after atomic
  apply.
- **A32 PASS:** the executor read all four normative references under
  `shared/general/skill-authoring/references/` before editing and applied their
  existence, ownership, routing, safety, preservation, and acceptance rules.
- **A33 PASS:** `local-dev` is 1,789 bytes smaller and `planning-workflow` is
  1,345 bytes smaller than their archived originals while retaining the
  approved deltas.
- **A34 PASS:** the two complete preservation ledgers above account for every
  retained, merged, and dropped pre-rewrite mode/reference.
- **A35 PASS:** both complete pre-rewrite packages are preserved under
  `history/rebuild-2026-07/wave-2/pre-rewrite/shared/general/` before the active
  edits; no archive or active retirement used permanent deletion.

Catalog verdict: **CATALOG-CONFORMS** for Wave 2.

## Render, apply, and install evidence

The pre-apply provider fingerprint was:

```text
24709b4529cb25806608ed0846dc6b3689233a754150ff1801dae3b74af265cc
```

A pure full render produced the same provider package counts as before and an
84-path delta: 12 expected paths in each of the seven provider views, split
between the two trimmed canonical packages. There was no unexpected top-level
package. The rendered `droid` and `factory` views were byte-identical.

The only provider mutation was the authorized command:

```text
$ bin/pack apply --all --full
APPLY scope=agents,claude,codex,droid,factory,gemini,gemini-antigravity changed-paths=84
APPLY DONE: exchanged providers/ atomically; displaced tree moved to Trash
```

The displaced tree went to Trash. A fresh full render then had zero delta
against `providers/`; both touched packages byte-match canonical content in all
seven views. The post-apply provider fingerprint is:

```text
9e0e8a99d0839941f23e0d49eb9329c0ad1dd967047387355363ee8d79d1adff
```

`bin/pack install` was run only in preview mode. Existing Agents, Claude,
Codex, Factory, and Gemini mappings were current. It reported the corrected
Antigravity root as a repoint requiring a backup and reported 18 stale Codex
overrides without changing them. The legacy `$HOME/.droid/skills` link was not
altered. No install apply or configuration edit occurred.

## Validation evidence

Final integrated check after the report and Grok closure (exit 0):

```text
PACK CHECK
PASS package validators: 26/26
PASS catalog validator
PASS local package links inspected: 95
PASS no repo-internal symlinks
PASS secret scan: 0 findings across 200 blobs
PASS declarative catalog: 26 skills, 121 aliases/external records
PASS provider-native exceptions: 5
PASS executable consumer unions validated: 5; declared overlaps: codex, gemini-cli
PASS render-and-compare parity: 7 live providers
PASS safe composer fixture: consumer installs, confinement, collision, native shape, atomic success/failure
PASS check boundary fixture: canonical, secret, catalog, union, route, and docs failures detected
WARN [catalog-validator] - WARN: caveman has weak routing clarity in SKILL.md
SUMMARY errors=0 warnings=1
CHECK: PASS
```

The Caveman routing warning is the pre-existing non-blocking catalog warning;
it is outside Wave 2 scope.

## Independent Grok refutation

The first bounded read-only Grok pass reached `Status: CHANGE` with two
findings: the campaign report/A34 ledger did not yet exist, and the
`local-dev` priority-versus-exposure limitation was not yet stated in a
governing artifact. Those were sequencing findings, not implementation
failures. This report supplies both requirements. The closure run is performed
against this artifact with write, Git, web, memory, and sub-agent access
disabled.

The closure pass verified the schema-v2 five-consumer model, Droid/Factory
loader collapse, Gemini ordered union and open Agent Vault decision,
Antigravity root, both active trims and complete archives, both preservation
ledgers, the priority/exposure distinction, and the coherence of the 84-path
atomic apply evidence. It found no substantive non-compliance with W2-P0,
W2-P2, W2-P3, or the Wave 2 rails.

Closure result: **`Status: ACK`**.

## Explicitly not done

- Phase 6 remains killed. No per-skill symlink distribution, registry export,
  `skills-lock.json`, or direct-link experiment was implemented.
- The dropped `code-quality` consolidation was not performed.
- The language-pack blinded test remains deferred; Effect, Elixir, and Go
  remain in `core`.
- The open Gemini Agent Vault exposure decision was not silently resolved.
- No `$HOME` root, config, credential, Antigravity directory, Droid link, or
  Codex override was changed.
- No Git command was run. No mirror, native package, unrelated canonical skill,
  or unrelated provider content was edited.
- No repository content was permanently deleted. Retired canonical references,
  render previews, temporary Grok state, and the displaced provider tree went
  to Trash where applicable.

WAVE 2: DONE
