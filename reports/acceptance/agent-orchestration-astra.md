Astra model routing update — 2026-09-05

PACKAGE-CONFORMS for the scoped agent-orchestration update. Catalog-wide conformance was not reassessed.

Canonical owner: `skills/agent-orchestration` (suite). Selected surface: engine selection, with matching global Codex rules and a shorter discovery description. Pre-edit state: `70b7177`; this commit also preserves the existing edits to the global Codex instructions.

Astra now owns the default for open-ended Codex work. Sol remains selectable. Luna retains its exact-plan role and the Herdr Goal verifier pin. Existing edits to the Claude home instructions and the Herdr/local-dev packages were preserved.

| Measure | Before | After |
| --- | --- | --- |
| Engine-selection words | 3,326 | 878 |
| Engine-selection bytes | 21,989 | 5,697 |
| Global Codex instruction words | 2,038 | 1,619 |
| Orchestration description characters | 301 | 185 |
| Complete orchestration package bytes | 34,765 | 18,066 |

Preservation and removal decisions:

| Delta | Disposition |
| --- | --- |
| Astra default, selected Sol, exact-plan Luna | Aligned in the global rules and engine reference. |
| Luna ambiguity stop and one-level delegation | Kept. Capable executors may plan and implement end to end. |
| Explicit verifier and native-harness model pins | Kept; no runtime model configuration was changed. |
| Foxway vendor prohibitions and Cursor-only Kimi route | Kept, including downstream-brief propagation. |
| Hermes installation check and Foxway approval boundary | Kept; explicit native-session workflows cannot be rerouted. |
| Claudex's restricted role and no-subagent rule | Kept; actual proxy model must be verified. |
| Cursor alias/wrapper and catalog hazards | Kept in the harness table. |
| Devin slug/catalog mismatch and quota handling | Kept; dated entitlement history removed. |
| Droid custom-ID, interactive-launch, secret, and floating-tag boundaries | Kept; obsolete concrete model IDs removed. |
| Claude native roles and no-Haiku rule | Kept. |
| Cross-family review and original-artifact evidence | Kept; unsupported claims that model families guarantee independence removed. |
| Fixed Sol-only assignment table and mandatory planner/executor split | Replaced by the user's Astra default and bounded Luna exception. |
| Repeated agent-wait explanations | Shortened; terminal-state proof and explicit workflow bounds retained. |
| System-owned OpenAI Docs and historical model guides | Not modified; current official guidance is linked from the engine reference. |

Routing check:

| Intent | First owner | Nearby owner and distinction |
| --- | --- | --- |
| /delegate-codex, /swarm | agent-orchestration | Herdr owns transport syntax. |
| collaboration-protocol | agent-orchestration | code-quality owns the source review; this suite coordinates reviewers. |
| Delta brief | agent-orchestration | planning-workflow owns initial durable briefs. |
| Delegated model or harness selection | agent-orchestration | Global rules state the default; this reference supplies route constraints. |
| Sealed goal verification | herdr-goal | Its Luna pin does not choose the main worker. |

| Item | Result and evidence |
| --- | --- |
| A01 | PASS: local model roles and permitted vendor routes change dispatch decisions. |
| A02 | PASS: the global Codex and Claude rules route recurring delegation here. |
| A03 | PASS: routing distinctions listed above. |
| A04 | PASS: existing six-mode suite retained. |
| A05 | PASS: canonical name, directory, and uniqueness check passed. |
| A06 | PASS: only name and description in frontmatter. |
| A07 | PASS: one-line, two-sentence description; 185 characters. |
| A08 | PASS: capability and concrete Use when signals retained. |
| A09 | PASS: model/dispatch triggers do not claim ordinary source review. |
| A10 | PASS: no greedy trigger or implicit persona added. |
| A11 | PASS: entrypoint is 57 lines and 4,988 bytes. |
| A12 | PASS: entrypoint remains a route and shared operating contract. |
| A13 | PASS: all six references remain selectively routed; package links resolve. |
| A14 | PASS: package is 208 lines and 18,066 bytes; each reference is below its line/byte limits. |
| A15 | DEFERRED: local support files remain reachable; catalog clauses not reassessed. |
| A16 | PASS: six dispatch/coordination modes, unchanged. |
| A17 | PASS: kebab-case modes and selection rules retained. |
| A18 | N/A: this is a suite, not a router. |
| A19 | N/A: no router composition changed. |
| A20 | PASS: model and harness support must be checked live; official model guidance linked. |
| A21 | PASS: model catalog snapshots and dated quota narratives removed. |
| A22 | PASS: Astra is the user-approved house default; live support checks and selected-model precedence are explicit. |
| A23 | PASS: changed prose contains no credentials or secret-shaped values. |
| A24 | PASS: safe model metadata only; settings dumps remain forbidden. |
| A25 | PASS: no literal personal-home path in the package. |
| A26 | PASS: installation, model IDs, and route support require live evidence. |
| A27 | N/A: package contains no scripts. |
| A28 | N/A: package contains no assets or provider metadata. |
| A29 | PASS: model choice, waiting, substitution, and stops retain concrete boundaries. |
| A30 | DEFERRED: no catalog-wide acceptance claimed. |
| A31 | DEFERRED: local links and installed view verified; full composition gate not claimed. |
| A32 | PASS: retained the pilot code-quality suite's selective-reference shape; historical paths are not copied. |
| A33 | PASS: package shrank from 34,765 to 18,066 bytes and stays under absolute limits. |
| A34 | PASS: preservation decisions listed above. |
| A35 | PASS: all edited source has a pre-rewrite original at 70b7177. |

Verification: `git diff --check` exited 0. The validator returned `PASS: skills/agent-orchestration (suite)`, exit 0. Ruby parsed the frontmatter. Live Codex help confirmed the model/config flags. The home, Codex, shared, and Claude symlink views resolve to the updated source. A read-only manifest comparison found zero links to create, remove, or retarget before the pre-commit hook.

No model session, API benchmark, or external harness was launched. These checks validate instruction consistency and installed content, not comparative model performance.
