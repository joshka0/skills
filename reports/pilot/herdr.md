# Pilot acceptance — herdr

## Result

- Canonical home: `shared/general/herdr`
- Archetype: `private-leaf`
- Active instructions: 51 lines / 2,616 bytes; selected command recipes: 48 lines / 1,717 bytes; package total: 99 lines / 4,333 bytes.
- Net shrink: 99 package lines versus 175 replaced lines.
- Validator: `PASS: shared/general/herdr (private-leaf)`
- Composition status: intentionally deferred by pilot scope; `bundles/` and `providers/` were not edited or composed.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The private delta is Herdr's live pane/agent transport semantics and safe target handling. |
| A02 | PASS | Workspace and agent-terminal coordination recur as a local operating capability. |
| A03 | PASS | It owns the Herdr CLI specifically; generic agent orchestration does not own its transport contract. |
| A04 | PASS | Classified as a private-tool leaf. |
| A05 | PASS | `shared/general/herdr` and `name: herdr` match; the validator confirmed unique canonical naming. |
| A06 | PASS | Frontmatter contains only `name` and one-line `description`. |
| A07 | PASS | The description is one physical line and passed the private-leaf 220-character gate. |
| A08 | PASS | It states Herdr CLI operation and ends with concrete Herdr/pane/workspace/message triggers. |
| A09 | PASS | The trigger names Herdr pane reads, literal sends, pane commands, and workspace operations, separating it from generic orchestration. |
| A10 | PASS | No greedy trigger or implicit persona activation remains. |
| A11 | PASS | `SKILL.md` is 51 lines / 2,534 bytes, below the 160-line / 12 KiB private-leaf cap. |
| A12 | PASS | The active body holds routing, live preflight, transport selection, hard rules, stops, and output only. |
| A13 | PASS | The active Route names `references/command-recipes.md` and its single selection condition; the file resolves. |
| A14 | PASS | The reference is 48 lines (<250); the 99-line package is below the 800-line hard cap. |
| A15 | PASS | Command recipes moved out of the active body; no copied provider or bundle prose was added. |
| A16 | N/A | Private leaf; it has no modes. |
| A17 | N/A | Private leaf; it has no mode table. |
| A18 | N/A | Private leaf; it is not a router. |
| A19 | N/A | Private leaf; it has no routed child skills. |
| A20 | PASS | The workflow requires live `herdr --help` before version-sensitive command use; recipes use placeholders rather than pinned tunings. |
| A21 | PASS | The package keeps only compact private command recipes, not a CLI manual or external API catalog. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | The package prohibits sending secrets and contains no credential-shaped value. |
| A24 | PASS | It directs status/target reads and forbids secret transport; no broad environment discovery is prescribed. |
| A25 | PASS | Commands use `<path>` placeholders and no literal user home path. |
| A26 | PASS | Live state and installed help are required; unresolved targets and unknown syntax stop clearly. |
| A27 | N/A | The package has no scripts. |
| A28 | N/A | The package has no assets or provider metadata. |
| A29 | PASS | Hard rules preserve concrete send/execute/submit, target, pane-close, cwd, secret, and scope boundaries. |
| A30 | DEFERRED | The task forbids bundle/provider changes until review; canonical-only semantic parity cannot be claimed yet. |
| A31 | DEFERRED | Local reference resolution and the validator's no-internal-symlink check pass; compose and installed-view checks await the permitted composition phase. |
| A32 | N/A | This is the designated first golden example, so no prior golden exists for comparison; it was checked directly against the rubric and validator. |
| A33 | PASS | This trim is strictly smaller than the replaced package (99 < 175) and below its absolute cap. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/herdr private-leaf
PASS: shared/general/herdr (private-leaf)
```

The private-leaf exception is justified because the active instructions retain non-inferable local transport semantics and safety boundaries; no generic tutorial material remains.
