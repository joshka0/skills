---
name: vocab-deck
description: "Build an Anki flashcard deck teaching a domain's vocabulary so a learner names and describes things precisely. Use when asked for flashcards or an Anki deck to learn terminology or visual vocabulary from a reference."
---

# Vocab Deck

Turn a rich reference source into a spaced-repetition deck that builds precise
recognition-and-naming vocabulary — the exact words a learner needs to describe
things, including when prompting an AI.

## Route

Read only the reference for the phase you are in.

| Need | Read |
| --- | --- |
| Design the cards — types, schema, anti-leak, pruning, tagging | `references/card-types.md` |
| Source content and capture clean visuals from the reference | `references/sourcing.md` |
| Orchestrate generation and package the `.apkg` | `references/pipeline.md` |

## Workflow

1. **Scope** with the user before building: the source, breadth (how many items),
   concept-vs-code emphasis, and rough size. Batch choices that materially change
   the deck into one interview; infer the rest.
2. **Source** — extract one structured record per item (term, aliases,
   plain-language "describe-the-thing" phrases, a tight definition) and capture
   one clean visual each. → `sourcing.md`
3. **Author** a diverse card set that balances recall and understanding, with
   discrimination cards for confusable siblings. Delegate the generation to a
   different model family than the orchestrator. → `card-types.md`
4. **Package** to a single `.apkg` with genanki in an isolated venv:
   deterministic GUIDs, subdecks, embedded media, loud validation. → `pipeline.md`
5. **QA and deliver** — render real cards to confirm no answer leaks and every
   image resolves, prune redundant cards, then deliver with import steps and a
   short "what's in / what was cut and why" note.

## Hard rules

- A recall card tests one cue → the term. Never expose the answer in the prompt —
  including a term label baked into a captured image.
- Cover recall AND understanding; always include discrimination cards for
  confusable sets. Cut redundant and near-duplicate cards — quality over count.
- Generate card content with a different model family than the orchestrator, and
  package with a separate agent; verify output against the source, not the brief.
  (→ `crew`, `agent-orchestration`)
- Prefer uniform catalog/grid thumbnails over annotated detail captures. If the
  source renders a concept too small or too interactive to capture cleanly,
  author a crisp SVG icon rather than shipping a blurry crop.
- Package as one `.apkg` via genanki in a project-local venv; derive GUIDs
  deterministically so re-import updates in place; embed all media; fail loudly
  on any missing file. Never hardcode time- or random-based deck/model IDs.
- Get the user's OK before installing packages or driving their browser; keep
  capture visible through the authorized bridge (→ `local-http-browser-use`).

## Stops

- Scope that changes deck composition is ambiguous → ask (batched interview),
  don't guess.
- Clean visuals are unobtainable for some items → stop and offer options (author
  an SVG, skip the visual, or keep the term verbal-only). Never ship blurry or
  answer-leaking images.

## Output

Report the deck path, import steps (Anki desktop + AnkiWeb sync + AnkiMobile),
per-deck/per-type counts, and what was included, cut, and why. Keep the source
records, media, and build script reproducible in the work directory.
