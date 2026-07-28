# Sourcing — structured records and clean visuals

Produce two artifacts: `components.json` (one record per item) and `media/` (one
clean visual per item). Everything downstream references these.

## Structured records

Prefer a reference that is a catalog/dictionary of the vocabulary. Extract per
item, from server-rendered HTML or an API where possible (cheaper and cleaner
than driving a browser for text):

- `slug`, `group`/`platform` (subdeck bucket), source `url`
- `name` (the headword), `aliases` / "also called"
- `keywords` — especially plain-language **"describe-the-thing"** phrases; these
  are gold for `plain_phrase_to_name` cards
- a tight `definition`
- `screenshot` — the deterministic media path `media/<group>__<slug>.<ext>`

Parse structural markup (a consistent headword/definition layout), not stripped
text, so fields stay clean. Verify a few records by eye before trusting the
parser across the whole set.

## Clean visuals

The visual is the flashcard's prompt; it must be clean and answer-free.

- **Prefer the catalog/grid thumbnail over the detail view.** Detail pages often
  overlay teaching annotations (numbered hotspots, callouts) and render the name.
  Grid thumbnails are usually uniform, unannotated, and label-light. Capture the
  card's demo sub-element by a precise selector (e.g.
  `a[href='/…/<slug>'] .<demo-class>`), not the whole page.
- Drive the browser only through the authorized bridge (→ `local-http-browser-use`),
  in a new tab, and return the browser to how you found it. Capture the demo
  element (`scope: element`, `padding: 0`) so page chrome, annotations, and
  sibling labels stay out.
- Save each capture to the deterministic `screenshot` path so card `image` fields
  resolve without a mapping step.
- Do only as many browser navigations as needed; batch failures are usually a
  transient extension disconnect — retry with spacing, not a redesign.

## When a clean capture is impossible

Some concepts can't be captured cleanly: the source renders them too small to
enlarge without blur, they only appear on interaction (hover/click), or the demo
bakes the answer label onto the image. **Do not ship a blurry or leaking crop.**

- If the concept is a simple, universal control, author a crisp minimal **SVG**
  icon instead — label-free, sharp at any size, tiny to embed. Generic renderings
  are fine when the goal is recognizing the *type*, not one product's styling.
- Name SVG assets distinctly (e.g. `media/atom_<name>.svg`) so packaging can tell
  them apart from source screenshots.
- Otherwise drop the visual and keep the term verbal (the plain-phrase and
  discrimination cards still teach it). Tell the user what you dropped and why.

QA the visuals as a set (render them together) before authoring cards: confirm
each is recognizable, answer-free, and distinct from its siblings.
