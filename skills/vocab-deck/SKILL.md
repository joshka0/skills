---
name: vocab-deck
description: "Build source-grounded Anki vocabulary decks (.apkg). Use when the user asks for flashcards or an Anki deck for terminology, recognition, or visual vocabulary."
---

# Vocabulary deck

- Card schema, types, anti-leak rules, pruning, tags: `references/card-types.md`.
- Source records and clean visuals: `references/sourcing.md`.
- genanki packaging and render QA: `references/pipeline.md`.

A recall prompt must never reveal its answer, and that includes labels baked into an image. Render real cards to check for leaks and image-side visibility. Structural checks alone are not enough. Deliver the `.apkg`, the source and build files, counts by type and deck, import instructions, and caveats.
