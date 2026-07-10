# Skills Refactor Handoff

## Summary

Created a manifest-first source model for the skills repo and added validation
around the main failure modes: broad tree scans, generated/provider duplicates,
system-skill leakage, repo-internal symlinks, nested generated copies, broken
local references, bad frontmatter, and common instruction-quality smells.

Also imported the current `~/Downloads/skills-claude` council skills into the
shared source and Codex/Claude exposure paths before this refactor pass:
`code-council`, `goal-council`, and `goal-orchestrator`. A later update added
`goal-protocol` as the canonical lifecycle skill over those four focused
entrypoints.

## Source Roots

| Root | Role | Active? |
|---|---|---:|
| `shared/general` | Canonical provider-neutral authored skills and routers | yes |
| `shared/codex` | Canonical Codex-oriented authored skills | yes |
| `shared/claude` | Canonical Claude-specific authored skills | yes |
| `shared/variants` | Alternate source variants | no |
| `mirrors` | Vendor/upstream imported sources | no |
| `bundles` | Generated/bundle output | no |
| `providers` | Generated provider overlay and system-installed skills | no |
| `providers-current` | Snapshot/parity output | no |
| `archive` | Historical material | no |

## Active Manifest

- Rows: 75
- Core skills: 9
- Specialist skills: 61
- User-invocable-only skills: 5

Core rows:

- `agent-orchestration`
- `code-quality`
- `delta-brief`
- `diagnose`
- `goal-protocol`
- `local-dev`
- `quality-gate`
- `skill-authoring`
- `zero-tech-debt`

User-invocable-only rows:

- `caveman`
- `grill-me`
- `grill-with-docs`
- `peon-ping`
- `riff-partner`

## Major Classifications

| Path/family | Classification | Reason |
|---|---|---|
| `shared/general/go-lang*` | specialist-source | Language router and detailed Go subskills. |
| `shared/general/effect-framework*` | specialist-source | Effect router and detailed v4 subskills. |
| `shared/general/elixir-lang*` | specialist-source | Elixir router and detailed OTP subskills. |
| `code-quality` cluster aliases | reference-or-mode | `tdd`, `small-composable-code`, `regression-tests`, and `migrate-to-shoehorn` route through code-quality. |
| `agent-orchestration` aliases | reference-or-mode | `agent-swarm`, `codex-swarm`, and `delegate-codex` are orchestration modes. |
| `shared/variants` | needs-human-review | Real source variants, but duplicate active names. |
| `mirrors/foxctl` | vendor-source | Useful imported workflows, excluded from active manifest unless explicitly promoted. |
| `providers/codex/.system` | system-installed | Provider/system skills, not authored source. |

## Generator / Provider Output

| Finding | Fixed? | Notes |
|---|---:|---|
| `.routed` symlinks under provider overlays | yes | Removed current symlinks and removed preservation from compose scripts. |
| Nested generated copies under `bundles/codex/core` | yes | Removed five known duplicate directories. |
| Nested generated copies under `providers/codex` | yes | Removed five known duplicate directories. |
| Compose scripts propagating nested copies | yes | Temp output now strips `skill-name/skill-name` copies. |
| Provider snapshots under `providers-current` | no | Left as snapshots; not regenerated during this pass. |

## Files Changed

- `manifests/skills.jsonl`
- `manifests/aliases.json`
- `manifests/excluded-roots.md`
- `scripts/validate-skills.mjs`
- `bin/compose-codex-skills.sh`
- `bin/compose-provider-skills.sh`
- `shared/general/goal-protocol/`
- `shared/general/agent-orchestration/SKILL.md`
- `shared/general/agent-orchestration/references/codex-goal.md`
- `shared/general/codex-goal/SKILL.md`
- `shared/general/goal-council/SKILL.md`
- `shared/general/code-council/SKILL.md`
- `shared/general/goal-orchestrator/SKILL.md`
- `shared/general/skill-authoring/references/validation.md`
- `reports/skills-refactor-inventory.md`
- `reports/provider-generation-fix-report.md`
- `reports/skills-refactor-handoff.md`

Generated-output cleanup:

- removed provider `.routed` symlinks
- removed ten nested duplicate generated directories

## Validation

Commands run:

- `node scripts/validate-skills.mjs`
- `bash -n bin/compose-codex-skills.sh bin/compose-provider-skills.sh bin/sync-provider-roots.sh`
- `./bin/compose-codex-skills.sh --bundles core`
- `./bin/compose-provider-skills.sh --provider claude --bundles core`
- `find . -type l -print`
- `find bundles providers providers-current -type d ...`

Results:

- `node scripts/validate-skills.mjs` exits 0.
- Manifest rows: 75.
- Active skill names: 75.
- Errors: 0.
- Warnings: 16.
- `find . -type l -print` returns no output.
- Known nested generated copies return no output.

Warning categories:

- long descriptions for a few newly imported or router skills
- weak routing-clarity warnings for a few skills whose routing is still implicit
- allowlisted machine-local absolute paths in `local-dev` references

## Known Risks

- The manifest intentionally excludes `mirrors/*`, including foxctl workflows
  currently present in provider overlays. Follow-up should decide which mirrored
  skills deserve explicit manifest rows.
- `semantic-commenting`, `agent-ci`, `hard-cut`, and `tdd` appear in provider
  overlays without active `shared/*` canonical rows in this manifest.
- `providers-current` was not refreshed.
- Local-dev secret guidance still contains allowlisted machine-local paths and
  should be reviewed separately for portability.
- During the earlier pre-objective portion of this conversation, git inspection
  commands had already been run. After reading the goal objective, no git
  commands were run.

## Follow-up Goals

1. Promote or explicitly classify selected `mirrors/foxctl` skills in the
   manifest, rather than relying on provider overlay discovery.
2. Decide whether provider-only `semantic-commenting`, `agent-ci`, `hard-cut`,
   and `tdd` should get canonical `shared/*` homes or remain aliases/modes.
3. Tighten long descriptions for `release-bundles` and `six-phase-dev`.
4. Add stronger `Use when` / `Do not use when` sections to warning-only skills.
5. Add a variant-aware manifest if `shared/variants` should become routable.
6. Refresh `providers-current` after provider generation policy is accepted.

## Self-review

- What would fail in code review: the manifest excludes mirrored foxctl skills
  even though provider overlays still expose them; this is intentional but needs
  a follow-up decision.
- Residual risks: provider snapshots are stale relative to live overlays, and
  local-dev path allowlisting is a portability compromise.
- Confidence: high for manifest validity and validation mechanics; medium for
  final active/inactive taxonomy because mirror promotion needs human policy.
