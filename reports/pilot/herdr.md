# Pilot acceptance — herdr

## Result

- Verdict: **PACKAGE-CONFORMS**. Canonical package checks pass; catalog composition remains intentionally deferred.
- Canonical home: `shared/general/herdr`
- Archetype: `private-leaf`
- Final active body: 40 lines / 2,601 bytes; selected reference: 57 lines / 1,938 bytes; package: 97 text lines / 4,539 bytes.
- Archived pre-rewrite original: `archive/triage-2026-07/shared/general/herdr/SKILL.md`, 175 lines / 5,574 bytes. It is byte-identical to the pre-rewrite `providers/codex/herdr/SKILL.md` and matching Codex core bundle source.
- Net shrink: 175 → 97 package lines (78 lines; 44.6%).
- Validator: `PASS: shared/general/herdr (private-leaf)`
- Composition status: intentionally deferred by pilot scope; `bundles/` and `providers/` were not edited or composed.

## Collision matrix

| Claimed signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| `Herdr` or Herdr CLI | `herdr` | `agent-orchestration` | `herdr` owns private CLI topology, target resolution, and transport semantics; use orchestration only for the broader agent-workflow decision. |
| Herdr pane read | `herdr` | `agent-orchestration` | The requested artifact is a Herdr pane and requires a live pane ID and Herdr command shape. |
| Literal agent send | `herdr` | `agent-orchestration` | `herdr` owns literal-message versus shell-command transport and post-send verification. |
| Pane command | `herdr` | generic shell execution | `herdr` owns pane-command submission, typing-only behavior, and unknown-pane safety. |
| Workspace or tab operation | `herdr` | `agent-orchestration` | The user is operating Herdr work surfaces, not choosing an agent-dispatch strategy. |

## A34 preservation ledger

| Pre-rewrite qualifying delta | Classification | Final evidence |
| --- | --- | --- |
| Live status discovery and no guessed workspace/tab/pane/agent IDs | Kept | `SKILL.md:16-17,24-25`; `references/command-recipes.md:5-15`. |
| Named-session restraint and work-surface topology | Kept | `SKILL.md:17,28`; `references/command-recipes.md:17-27`. |
| Exact CLI recipes for discovery, work surfaces, panes, agents, and waits | Kept as one selected reference | `references/command-recipes.md:3-57`; commands were removed from the active body. |
| Literal agent-send vs shell-running vs typing-only transport distinction | Kept | `SKILL.md:18,26-27`; `references/command-recipes.md:29-39,41-50`. |
| Read/wait after a send and explicit submission when an integration does not auto-submit | Kept | `SKILL.md:19`; `references/command-recipes.md:39,50,52-57`. |
| Self-contained agent request shape and user-approved scope boundary | Kept | `SKILL.md:20,31`. |
| Quoting, no-secrets, target ambiguity, `--cwd`, unknown-pane, and notification safety boundaries | Kept | `SKILL.md:24-31`. |
| Rename/start/focus variants, fixed line/timeout/ratio values, and the broad command catalog | Dropped with existence-bar reason | These are version-sensitive API catalog detail; installed `--help` is the source of truth under `SKILL.md:16,25`, not a durable private safety invariant. |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Non-default delta: safe use of Herdr's private live-target and transport contract, including literal send versus shell execution versus typing-only input. |
| A02 | PASS | Local workspace and agent-terminal operations recur as a durable operating capability. |
| A03 | PASS | The collision matrix assigns Herdr CLI work to this private leaf; generic agent orchestration does not own its CLI transport contract. |
| A04 | PASS | Exactly one archetype: private-tool leaf. |
| A05 | PASS | `shared/general/herdr` matches unique `name: herdr`; validator checks canonical uniqueness. |
| A06 | PASS | Frontmatter contains only `name` and the one-line description. |
| A07 | PASS | Description is one physical line, two sentences, and 196 bytes including quotes/newline (<220). |
| A08 | PASS | Description names safe Herdr CLI operation and ends with concrete Herdr/pane/send/command/workspace signals. |
| A09 | PASS | Collision matrix records a first owner, competitor, discriminator, and handoff for every claimed signal. |
| A10 | PASS | No greedy trigger, implicit persona, or deterministic macro activation. |
| A11 | PASS | `SKILL.md` is 40 lines / 2,601 bytes, below the private-leaf 160-line / 12 KiB cap. |
| A12 | PASS | Active body contains only selection, shared live preflight, transport/safety rules, stops, and conditional output. |
| A13 | PASS | Route condition covers every reference surface—discovery, workspace/tab, pane, agent, and wait—and says to load only the selected recipe. |
| A14 | PASS | Reference is 57 lines (<250); package is 97 text lines / 4,539 bytes, below all package caps; no scripts/assets/metadata hide prose. |
| A15 | DEFERRED | Canonical command syntax lives only in the selected reference; the stale bundle/provider original is intentionally not modified in this pilot, so the catalog clause is deferred. |
| A16 | N/A | Private leaf; no modes. |
| A17 | N/A | Private leaf; no mode table. |
| A18 | N/A | Private leaf; not a router. |
| A19 | N/A | Private leaf; no router targets or router exposure. |
| A20 | PASS | Installed `herdr --help` and area help are required before version-sensitive syntax; recipes use placeholders. |
| A21 | PASS | Compact selected recipes replace the former broad CLI catalog; no external manual or matrix remains. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | No credential-shaped values exist; active rules prohibit secret transport. |
| A24 | PASS | Discovery is limited to live status/target reads and reports do not expose secret values. |
| A25 | PASS | Only `<path>` placeholders appear; no literal user home path exists. |
| A26 | PASS | Live state and installed help are mandatory; ambiguous targets or unknown syntax stop clearly. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Transport, target, quoting, secret, `--cwd`, process, notification, and scope rules protect concrete failure modes; output is conditional on mutation. |
| A30 | DEFERRED | Canonical/bundle/provider parity and intended exposure await the explicitly excluded composition phase. |
| A31 | DEFERRED | Local route and no-internal-symlink checks pass; compose dry run and installed-view inspection await composition. |
| A32 | PASS | This designated private-leaf golden candidate was checked directly against the normative rubric and both independent pilot reviews; their reference-boundary, output, archive, and measurement findings are resolved here. |
| A33 | PASS | Trim is strictly smaller than its archived original (97 < 175) and below the absolute cap. |
| A34 | PASS | Preservation ledger above accounts for every qualifying pre-rewrite delta and documents catalog-only drops. |
| A35 | PASS | The exact 175-line pre-rewrite original is archived at `archive/triage-2026-07/shared/general/herdr/SKILL.md`. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/herdr private-leaf
PASS: shared/general/herdr (private-leaf)
```

The private-leaf tier is justified by non-inferable local transport semantics, live-target topology, and safety boundaries; generic command catalog material is deferred to installed help.
