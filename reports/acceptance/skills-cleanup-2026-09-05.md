# Skills cleanup — 2026-09-05

The catalog now uses shorter, task-specific guidance. Astra remains the default
for open-ended Codex work, Sol remains selectable, and explicit Luna verifier
and Claude-native roles remain intact. The model update is recorded separately
in `agent-orchestration-astra.md` and commit `7e6d2ce`.

## Result

| Surface | Before | After |
| --- | ---: | ---: |
| Canonical skill directories in the working tree | 40 | 33 |
| Firecrawl discovery entries | 33 | 5 |
| Shared provider skill entries | 65 | 31 |
| Firecrawl source words, including references | 22,027 | 4,898 |
| Firecrawl entrypoint words | 20,042 | 1,135 |

These are source and filesystem counts, not measured prompt tokens or model
performance. Existing user-owned packages are included in the working-tree
counts but are not part of this cleanup commit.

- Retired `skill-authoring`; its useful repository rules now live in `AGENTS.md`.
  Removed mandatory archetypes, word budgets, and the 35-item acceptance ritual.
- Retired `go-lang`, `elixir-lang`, `effect-framework`, `product-platform`, and
  `prototype`. Repaired callers and retained NativeWind migration guidance in
  `uniwind/references/migration.md`.
- Merged `crew` into the selected campaign reference of `agent-orchestration`.
  Kept durable reports, completion signals, source-based review, and safe cleanup.
- Trimmed orchestration, code quality, planning, goals, design, infrastructure,
  documentation triage, Uniwind, and vocabulary-deck guidance. Removed generic
  recipes, compulsory agent casts, repeated approval stages, and fixed counts.
- Scoped secret-infrastructure discovery and reference reads to the operation.
  Preserved credential custody, recovery proof, and the dedicated worker boundary.
- Made the spec gauntlet explicitly requested. Preserved isolated derivation and
  human reconciliation; removed speculative retry calibration and unsafe teardown.
- Kept Praize's simulator history in its existing project run skill. No Praize
  files were changed.

## Firecrawl ownership

The retained packages are `firecrawl`, `firecrawl-build`, `firecrawl-monitor`,
`firecrawl-developer-index`, and `firecrawl-research-index`. They live under
`native/agents/` and are exposed only through the shared provider. Operation and
output variants are conditional references, not separate discovery entries.

Preserved authentication, secret storage, upload consent, cost and recurring-job
boundaries, job IDs, cancellation state, browser mutations, feedback opt-outs,
source verification, and import attribution. Conflicting historical monitor
intervals now defer to installed help. No paid requests or monitors were started.

All 33 original imports, 45 files, and 165,347 bytes were preserved in commit
`231434e`. Before retiring the unmanaged provider directories, their file bytes
were compared with that commit. Other retired originals are also in Git.
Filesystem removals went through `/usr/bin/trash`.

## Composition and checks

`bin/link` now checks every provider before mutation, preserves consumer-owned
entries and unmanaged real files, and sends obsolete symlinks to macOS Trash.
Missing native packages and real-entry collisions fail before provider changes.

The validator uses standard Ruby YAML parsing and checks metadata, duplicate
names, portability, internal symlinks, and static local references. It accepts
one package path and does not impose arbitrary prose limits or fetch web links.

The independently derived check is retained as `bin/tests/check-cleanup.py`.
Both bounded contributors used Astra at xhigh; neither sub-delegated. One
consolidated Firecrawl, and one authored the helper checks independently of the
helper implementation.

Final verification:

- `python3 bin/tests/check-cleanup.py /Users/joshka/repos/skills`: exit 0;
  52 PASS, 0 FAIL, 0 BLOCKED. The checks cover Trash behavior, unchanged targets,
  preserved entries, preflight failures, YAML variants, local links, duplicate
  names, and the absence of network requests during validation.
- `bin/validate-skill.sh <directory>` across all remaining canonical and native
  packages: 42 PASS, 0 FAIL. Each invocation's exit code was collected directly.
- `node bin/link`: exit 0. Repeated composition retained correct links without
  replacing them. Claude's two unmanaged transition directories were warned
  about and preserved.
- Installed desired skills resolve: Claude 32; shared agents 31; Codex 26;
  Gemini 26; Antigravity 28. No broken provider symlinks. All five consumer home
  roots still resolve to their original provider farms.
- No active source handoffs to the seven retired skill packages remain.
  Hash comparisons confirm unrelated tracked edits are unchanged.
- `git diff --cached --check`: exit 0.

## Limits

This verifies package structure, installed link composition, and helper behavior.
It does not benchmark agent routing or execute each operational skill. The active
conversation's skill metadata may still reflect the catalog loaded at its start.

Unrelated dirty home, Herdr, and local-secret edits were preserved. Existing
untracked packages and their reports remain user-owned. Codex disable settings,
consumer-owned `.system`, unmanaged Claude transition imports, inactive Agent
Vault imports, Antigravity imports, and plugins outside this repository were
left in place. Their presence is not a claim that every imported instruction
has been rewritten.
