# joshka0 Skills Repo Pack

This directory documents the publishable `joshka0` skills pack: the set of
local, imported, mirrored, active, and archived skills managed in this repo.

The actual skill bodies remain in their canonical locations:

- `shared/` for local and curated shared skills
- `mirrors/` for imported upstream or repo-local mirrors
- `providers/` for active agent overlays
- `bundles/` for compose inputs used to rebuild overlays
- `providers-current/` for the latest active overlay snapshot

This pack is meant to be a portable repo view, not a second copy of every skill.
The symlink layout is part of the pack design.

## Included Families

| Family | Entry Point | Detailed Skills |
| --- | --- | --- |
| Product/platform | `product-platform` | Expo, React Native, Uniwind, browser extensions, OpenTUI, native data, local platform setup. |
| Design | `design-family` | Frontend design, critique, audit, polish, hardening, and focused visual/copy/motion passes. |
| Release | `release-bundles` | Apple App Store, TestFlight, Android Play, EAS, privacy, subscriptions, metadata, and submission checklists. |
| Infrastructure | `infra-bundles` | Kubernetes and Terraform audit, debug, drift, hardening, migration, policy, recovery, and shipping. |
| Core engineering | direct skills | Small composable code, ruthless tests, diagnosis, TDD, regression tests, swarm coordination, Codex goals. |
| Local operations | direct skills | Local dev, local secrets, smolvm, worktrees, Maestri, Agent Vault where provider-supported. |
| Foxctl | direct skills | Foxctl room, orchestration, code, dev, mobile, integrations, epics, and semantic commenting. |

## Active Overlays

The active pack is exposed through these provider overlays:

| Provider | Active Entries |
| --- | ---: |
| `codex` | 53 |
| `agents` | 53 |
| `claude` | 51 |
| `factory` | 50 |
| `gemini` | 50 |
| `gemini-antigravity` | 52 |
| `droid` | 30 |

## Notes

- `archive/original-inventory/` contains historical/generated inventory
  artifacts from the original consolidation pass.
- `archive/full-overlays/` contains historical full provider overlay snapshots.
  Use `shared/`, `mirrors/`, `bundles/`, `providers/`, and
  `providers-current/` as the current source of truth.
- `reports/skills-final-set-audit-2026-05-07.md` is the current pruning and
  final-set decision note.
- `overlay-manifest.json` records durable source and promotion decisions.

See `SOURCE_NOTES.md` for imported source details.
