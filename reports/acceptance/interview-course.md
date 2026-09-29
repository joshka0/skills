# Interview Course skill acceptance

## Decision

- Canonical owner: `skills/interview-course`
- Archetype: leaf
- Selected contract surfaces: existence and ownership, package and routing,
  evidence and safety, validation and acceptance
- Pre-create git ref: `5758ddb44758878ab833e4677061491dba2628e2`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED** — provider composition conflicts with the active
  durable safety policy.

The non-default delta is a lesson-first contract that keeps one HTML curriculum
canonical while deriving a smaller, source-identical interview deck through the
existing `vocab-deck` owner.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| HTML interview course from transcripts | `interview-course` | generic site building | Source-grounded pedagogy and paired recall win; public product websites stay with the site owner. |
| lesson-first interview preparation | `interview-course` | `vocab-deck` | HTML lessons are primary; deck-only learning stays with `vocab-deck`. |
| accompanying Anki deck | `interview-course` then `vocab-deck` | `vocab-deck` | The course owns shared concepts and rubrics; `vocab-deck` owns card and package mechanics. |
| flashcards or Anki only | `vocab-deck` | `interview-course` | Deck-only requests never activate the course workflow. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Canonical lesson/deck identity, transcript conflict handling, prompt rubrics, and currency gates exceed generic site or card generation. |
| A02 | PASS | Source-to-course interview preparation recurs across technical domains and document or transcript corpora. |
| A03 | PASS | The collision matrix preserves `vocab-deck` and public-site ownership. |
| A04 | PASS | Exactly one archetype: leaf. |
| A05 | PASS | `skills/interview-course` matches the unique frontmatter name. |
| A06 | PASS | Frontmatter contains only name and description. |
| A07 | PASS | Description is one physical line, two sentences, and 190 characters. |
| A08 | PASS | The description names an HTML interview course and concrete lesson-first/source/deck signals. |
| A09 | PASS | The collision matrix establishes first ownership and an explicit `vocab-deck` handoff. |
| A10 | PASS | No greedy trigger or implicit interaction mode appears. |
| A11 | PASS | `SKILL.md` is 70 lines and 3,409 bytes, within leaf limits. |
| A12 | PASS | Active prose contains only boundary, workflow, hard rules, stops, and output. |
| A13 | N/A | The package has no references. |
| A14 | PASS | Total package size equals the 70-line active file. |
| A15 | DEFERRED | Local prose is non-duplicative; provider/catalog reachability awaits composition. |
| A16 | N/A | Not a mode suite. |
| A17 | N/A | Not a mode suite. |
| A18 | N/A | Not a router. |
| A19 | DEFERRED | Not a router; provider exposure awaits composition. |
| A20 | PASS | Volatile claims must be checked through installed state or current primary documentation. |
| A21 | PASS | No framework manual, interview question bank, or domain tutorial is embedded. |
| A22 | PASS | No volatile value is pinned. |
| A23 | PASS | No credentials, secret-shaped values, or private URLs appear. |
| A24 | PASS | Source reporting is limited to provenance, conflicts, and safe artifact evidence. |
| A25 | PASS | All paths and artifact names are portable. |
| A26 | PASS | Dependencies and browser/publishing capability are discovered and authorized at execution time. |
| A27 | N/A | The package contains no scripts. |
| A28 | N/A | The package contains no assets or metadata. |
| A29 | PASS | Rules protect canonical explanations, provenance, version currency, answer quality, and sibling ownership. |
| A30 | DEFERRED | Catalog and provider parity await safe composition. |
| A31 | DEFERRED | Local links and no-symlink checks pass; installed views await safe composition. |
| A32 | PASS | Shape follows the compact retained leaf pattern with one exact workflow and explicit handoff. |
| A33 | N/A | New package; no consolidation or shrink claim. |
| A34 | PASS | The preservation ledger records every qualifying delta and excluded neighbor. |
| A35 | PASS | The skill did not exist at pre-create ref `5758ddb44758878ab833e4677061491dba2628e2`. |

## Preservation ledger

| Delta | Disposition | Owner/path |
| --- | --- | --- |
| Lesson-first HTML curriculum and answer-rubric contract | Kept | `skills/interview-course/SKILL.md` |
| Shared stable concept identity across lessons and deck | Kept | `skills/interview-course/SKILL.md` |
| Duplicate source identifier and transcript-quality handling | Kept | `skills/interview-course/SKILL.md` |
| Volatile-fact verification before lesson publication | Kept | `skills/interview-course/SKILL.md` |
| Card authoring, anti-leak, deterministic Anki packaging | Handed off | Existing `vocab-deck` owner |
| Public website building and hosting | Excluded | Site-specific owner |
| Generic interview or domain tutorial content | Dropped | Does not clear the existence bar |

## Validation evidence

```text
PASS: skills/interview-course (leaf)
validate_status=0 diff_status=0
```

The canonical package conforms. Catalog composition remains deferred rather
than conflicting with the safety policy or editing provider farms by hand.
