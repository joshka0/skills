# Card design — types, schema, anti-leak, pruning

The pedagogy of the deck. A learner should be able to (a) see a thing and recall
its name, (b) read a plain description and name it, (c) explain what it is / when
to use it, and (d) distinguish confusable siblings. Serve both **recall** and
**understanding**.

## Card schema

Author a flat JSON array of self-contained cards. One shape, routed to a note
model at package time:

```json
{
  "id": "<slug>::<type>",          // STABLE + globally unique → Anki GUID
  "component": "<source-slug>",     // for tagging + subdeck routing
  "platform": "<group>",            // subdeck bucket (e.g. domain/section)
  "type": "image_to_name",          // enum below
  "front": "…HTML/text…",           // cloze: the {{c1::…}} text lives here
  "back": "…HTML/text…",
  "image": "media/<file>",          // or null; must be an existing file
  "image_side": "front",            // front | back | both | none
  "tags": ["<group>", "recall", "visual"]
}
```

Rules: `front`/`back` render as HTML (`<code>`, `<br>`, `<ul>`). Rewrite source
prose into tight, ~5-second back copy — never paste whole paragraphs. Add a
one-line mnemonic (prefix `💡`) where it helps. IDs must be stable so re-imports
update rather than duplicate.

## Type enum (the diversity budget)

| type | prompt → answer | mode |
| --- | --- | --- |
| `image_to_name` | see it → name it | recall (visual) |
| `plain_phrase_to_name` | "describe-the-thing" phrase → real name | recall |
| `definition_to_name` | definition with the name blanked → name | recall |
| `name_to_definition` | name → what it is / when to use it | understanding |
| `image_to_definition` | see it → explain it | understanding |
| `discrimination` | "X vs Y — when each?" | understanding |
| `cloze` | fill-in-the-blank fact | recall |
| `name_to_api` / `api_to_name` | name ↔ technical token | recall (code) |

Pick per learner goal. A vocabulary/communication deck leans on
`image_to_name`, `plain_phrase_to_name`, `name_to_definition`,
`image_to_definition`, and `discrimination`; it demotes code cards
(`name_to_api`, `api_to_name`, code `cloze`) to at most a small back-of-card
reference. A technical deck keeps them.

## Anti-leak (non-negotiable)

- Never put the answer term in a recall prompt face.
- **Watch images**: a captured demo often bakes labels onto the visual (a
  comparison view labels each variant with its exact name). That leaks the
  answer. Either capture a label-free version, reframe the card, or drop it.
- The plain-phrase game is *not* a leak: "the frosted card look" → *Glassmorphism*
  is the intended skill even though the phrase is descriptive.

## Pruning (quality over count)

Cut cards that don't earn their place. Common redundancy:

- Several name-recall cards that restate the same definition (`definition_to_name`
  + `cloze` + `name_to_definition` all circling one sentence) — keep the strongest.
- Comparison-page single-item recall when a `discrimination` card already teaches
  the set and carries the shared image on its back.
- Rote technical-token cards in a concept-first deck.

Target a lean set per item (often 3–5) with full type diversity across the deck,
not every type on every item. Confirm prune depth with the user when it changes
the deck's size class.

## Tagging

Every card's `tags` include: the subdeck group, a cognitive mode
(`recall` | `understanding`), and format markers (`visual`, `discrimination`,
`cloze`, `code`) so a learner can study or exclude any slice.
