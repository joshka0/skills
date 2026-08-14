# Wiki acceptance

## Result

- Verdict: **PACKAGE-CONFORMS**. The canonical package passes and its installed links resolve in all five provider farms. This report does not assert full-catalog conformance for unrelated provider entries.
- Canonical owner: `skills/wiki`.
- Archetype: `private-leaf`.
- Existence decision: retain. The private CLI, single-librarian boundary, capture taxonomy, and repeated-AUX-friction threshold are non-default and recurring.
- Pre-rewrite ref: N/A. This is a new canonical package.
- Package size: 47 text lines and 2,721 bytes. `SKILL.md` is 43 lines and 2,525 bytes.
- Validators: `Skill is valid!` and `PASS: skills/wiki (private-leaf)`.

## Collision matrix

| Claimed signal | First owner | Nearest competitor | Discriminator or handoff |
| --- | --- | --- | --- |
| Search or capture the private agent wiki | `wiki` | generic filesystem search | Wiki owns the private CLI, inbox, and librarian boundary. |
| Log a durable gotcha, papercut, note, or decision | `wiki` | `doc-triage` | Wiki captures one-line operational knowledge. Doc triage converts repository Markdown artifacts. |
| Repeated AUX friction | `wiki` | `aux` | AUX detects and hands off. Wiki owns recurrence, deduplication, and capture format. |
| One-off AUX preference | none | `wiki` | It stays out of the wiki until recurrence clears the threshold. |

## Preservation ledger

| Qualifying delta | Disposition | Evidence |
| --- | --- | --- |
| CLI-only access to the private wiki | Kept | `SKILL.md:8-19`. |
| Librarian-owned compiled layer | Kept | `SKILL.md:8,19,39`. |
| Durable capture taxonomy | Kept | `SKILL.md:12-18`. |
| Repeated AUX-friction threshold | Kept | `SKILL.md:23-31`. |
| One-line, deduplicated AUX request | Kept | `SKILL.md:26-31`. |
| One-off preferences and operational failures | Excluded | `SKILL.md:24-25,35`. |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Non-default delta: operate the private CLI and convert repeated AUX friction into deduplicated papercuts. |
| A02 | PASS | Wiki queries, durable captures, and agent UX friction recur across repositories and agents. |
| A03 | PASS | The collision matrix gives the CLI and capture lifecycle one owner and keeps AUX as a handoff source. |
| A04 | PASS | Exactly one archetype: private-tool leaf. |
| A05 | PASS | `skills/wiki` matches unique `name: wiki`. |
| A06 | PASS | Shared frontmatter contains only `name` and `description`; UI data is in `agents/openai.yaml`. |
| A07 | PASS | The description is one line, two sentences, and 202 characters. |
| A08 | PASS | It names the private wiki operation and concrete search, capture, decision, and repeated-AUX signals. |
| A09 | PASS | The collision matrix establishes one first owner for each claimed signal. |
| A10 | PASS | The trigger excludes generic memory use and one-off preferences. |
| A11 | PASS | The 43-line body is below the private-leaf cap. |
| A12 | PASS | The body contains only CLI workflow, AUX routing, hard rules, and output. |
| A13 | N/A | No references. |
| A14 | PASS | The 47-line package is below all hard limits. |
| A15 | PASS | One canonical body owns the wiki workflow; provider copies are links. |
| A16 | N/A | Private leaf; no modes. |
| A17 | N/A | Private leaf; no mode table. |
| A18 | N/A | Private leaf; not a router. |
| A19 | N/A | Private leaf; no routed children. |
| A20 | PASS | Command names and flags were verified from live `wiki --help`. |
| A21 | PASS | No manual, API matrix, or tutorial was copied. |
| A22 | N/A | No pinned volatile constraint. |
| A23 | PASS | Kingfisher reported zero findings. |
| A24 | PASS | Captures are one-line safe knowledge; rules exclude secrets and sensitive responses. |
| A25 | PASS | No literal personal-home path appears. |
| A26 | PASS | The live CLI and current path determine command behavior and Foxway ownership. |
| A27 | N/A | No scripts. |
| A28 | PASS | `agents/openai.yaml` is referenced provider metadata and contains no hidden instructions. |
| A29 | PASS | Recurrence, deduplication, owner routing, read-only scope, and secret rules protect concrete failures. |
| A30 | PASS | One Wiki link exists in each affected provider farm. |
| A31 | PASS | `bin/link` returned exit 0 and all five installed links resolve to `skills/wiki`. |
| A32 | PASS | Shape was compared with the private-tool Herdr pilot and the normative contract. |
| A33 | N/A | New package; no consolidation claim. |
| A34 | PASS | The preservation ledger accounts for all non-default deltas. |
| A35 | N/A | New package; no pre-rewrite original existed. |

## Validation evidence

```text
Skill is valid!
PASS: skills/wiki (private-leaf)
wiki search "AUX request" --fast: exit 0
bin/link: exit 0; wiki links verified in codex, agents, claude, gemini, and gemini-antigravity
Kingfisher findings: 0
```
