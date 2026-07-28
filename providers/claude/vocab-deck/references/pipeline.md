# Pipeline — cross-family generation and packaging

Two parallel tracks against one written contract: an author (card content) and a
packager (the `.apkg` builder). Keep them decoupled so they run at once.

## The SPEC contract

Write a `SPEC.md` first — the single source of truth both tracks build against.
It defines the input record schema, the card schema and `type` enum
(→ `card-types.md`), per-item guidance (how many cards, which types, discrimination
sets), tagging, the deck tree, and the packager requirements below. Point every
agent at the file; never rely on conversation history.

## Cross-family delegation

Card authoring is the creative bulk — delegate it to a **different model family**
than the orchestrator (fresh weights, different blind spots), and have a
**separate** agent build the packager. Use the crew verdict-file protocol
(→ `crew`, `agent-orchestration`, `herdr` for transport):

- Each delegation is a self-contained brief pointing at `SPEC.md` + the source
  records, with an explicit no-sub-delegation rule and a required verdict line.
- Each agent writes a report ending in one greppable verdict
  (`CARDS STATUS: READY` / `PACKAGER STATUS: READY`).
- Watch verdict files, not screens. Verify the output against the source records,
  not the author's self-report.

The author does not need the image bytes — only the deterministic filenames — so
authoring and visual capture run in parallel.

## Packaging (genanki)

`build_deck.py` reads the cards + `media/` and emits one `.apkg`. Requirements:

- **Models**: a rich Basic model with fields `Front, Back, Image, ImageSide,
  Extra` and one template that renders the image only on the side `ImageSide`
  names (drive it with CSS: hide `.media` by default; reveal it per
  `.question`/`.answer-side` × `data-side`). A Cloze model for cloze cards. Route
  cards to a model by `type`.
- **Deterministic IDs**: hardcode model and deck IDs; derive each note GUID from
  the card `id` (`genanki.guid_for`). Never use time/random IDs — re-import must
  update in place, not duplicate.
- **Deck tree**: one parent deck with subdecks by group, routed on `platform`.
- **Media**: attach every referenced file; reference images by basename
  (`<img src="basename.ext">`, Anki flattens media). Validate that every non-null
  image exists and **fail loudly** listing any missing file — never silently drop.
  Allow standalone assets (e.g. `atom_*`) to differ from a source screenshot.
- **Styling + tags**: one clean, dark-mode-friendly CSS; apply each card's tags.
- Print a summary: total notes, per-model and per-deck counts, warnings.

Anki renders SVG in `<img>`, so hand-authored SVG icons embed and stay crisp with
no rasterization step.

## Build, QA, deliver

- Install genanki in a **project-local venv** (`python3 -m venv .venv`), with the
  user's OK; run the packager from it.
- **Render real cards to verify** end-to-end: build a preview from the actual
  template + CSS + media and view it. Confirm recall fronts show no answer, and
  that back-side images stay hidden on the front. This catches template/leak bugs
  a structural check misses.
- Deliver the `.apkg` with import steps: Anki desktop (free) → import → create a
  free AnkiWeb account → Sync; iPhone via AnkiMobile (paid) or ankiuser.net in
  Safari (free), same account. Re-importing an updated deck updates in place.
- Clean up: close panes and browser tabs you opened, trash scratch/preview files,
  and leave the work directory holding only the reproducible deliverables.
