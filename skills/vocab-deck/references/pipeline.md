# Packaging and delivery

Keep source records, card schema, stable IDs, and deck structure in one written
contract when work spans separate steps or agents. A supplied `SPEC.md` remains
authoritative; a small deck does not require a separate campaign.

Use genanki in the existing environment or a task-local virtual environment.
The builder reads card records and media, then produces one `.apkg`.

- Route Basic and Cloze cards from the card type. Keep image visibility tied to
  the intended question or answer side.
- Use stable deck/model IDs and derive note GUIDs from stable card IDs so
  re-import updates notes instead of duplicating them.
- Embed every referenced media file by basename. Fail with the missing filename
  if an expected asset is absent; do not silently drop it.
- Apply the chosen tags and deck grouping. Make templates legible in supported
  themes, and report note counts by type and deck.

Render real templates with their actual card content and media. Check recall
fronts for answer leakage and confirm that answer-side images stay hidden on
the question side. Compare the result with source records.

Deliver the deck with instructions to import into Anki and sync through the
user's chosen client. Keep the source records, media, and builder reproducible.
Prefer Trash for discarded scratch artifacts; preserve requested previews.
