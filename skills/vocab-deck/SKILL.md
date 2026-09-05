---
name: vocab-deck
description: "Build source-grounded Anki vocabulary decks. Use when requesting flashcards or an Anki deck for terminology, recognition, or visual vocabulary."
---

# Vocabulary deck

Use the requested source and scope; infer routine choices from the task.
Ask about missing choices only when they materially change the deck.

| Need | Read |
| --- | --- |
| Card schema, types, anti-leak design, and pruning | [card-types](references/card-types.md) |
| Source records and clean visuals | [sourcing](references/sourcing.md) |
| Build and inspect the .apkg | [pipeline](references/pipeline.md) |

Preserve source provenance and stable item IDs. Balance recall and understanding;
use discrimination cards for confusable concepts and remove redundant cards.

A recall prompt must not reveal its answer, including labels inside an image.
Use clean source visuals, accurate authored graphics, or text-only cards as the
requested deck allows. Do not silently replace a required visual with an
unrelated or answer-leaking image.

Build one reproducible `.apkg` with stable deck/model IDs, deterministic note
GUIDs, and embedded media. Render actual cards to check image visibility and
answer leakage; structural checks alone do not prove card quality.

Delegate only when independent generation or review earns the coordination
cost. A separate author, packager, or model family is not required.

Keep browser capture within the authorized visible surface. Use the existing
build environment or an isolated local environment within the task's authority.
Deliver the deck, source/build files, counts, import instructions, and caveats.
