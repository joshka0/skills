---
name: unslop
description: "Catalog of AI writing tells that plain-language rules miss: stock vocabulary, forced triples, metaphor nouns, feeling words, over-compression. Use when you write or edit prose for a person."
---

# Unslop

The global Writing rules own sentence form: short active sentences, simple
words, one term per thing. This catalog lists the patterns that text can
still show when it follows those rules. Write clean in the first draft. A
cleanup pass afterward misses these patterns. Keep the meaning and the tone.

## Content

- **Empty "-ing" tails**: "highlighting...", "ensuring...", "showcasing...".
  Delete the tail, or replace it with the fact and its source.
- **Vague sources**: "experts believe", "industry reports suggest". Name the
  source or delete the claim.
- **Feeling in place of mechanism**: "SQL you can read", "types that follow
  your schema". Name the mechanism or a number: "`.toSQL()` returns the exact
  string sent to the database", "a column rename fails the build". If the
  sentence could appear unchanged in another project's docs, cut it.
- **Generic endings**: "the future looks bright". State a plan or a fact, or
  stop.

## Words

- **Stock vocabulary**: additionally, crucial, delve, enhance, foster, garner,
  interplay, intricate, landscape, pivotal, showcase, tapestry, testament,
  underscore, vibrant.
- **Long forms of "is"**: "serves as", "stands as", "boasts", "features".
  Write "is" or "has".
- **Metaphor nouns**: substrate, wedge, vector, locus, nexus, primitive,
  bedrock, paradigm, north star, flywheel, endgame, and "surface",
  "harness", "scaffolding", or "ratchet" used as a figure. Write the concrete
  word.
- **Mannered prose**: aphorisms, fragments for effect, code that "holds" or
  "rides along". "A dial worth turning" becomes "a parameter worth varying".
- **Adverbs on weak verbs**: "significantly improves" becomes the measured
  change.

## Shape

- **"Not only X, but Y"**: state Y.
- **Forced triples**: use the number of items that exist.
- **False ranges**: "from X to Y" when X and Y are not on one scale. List the
  items.
- **Colon as a connector** in the middle of a sentence. A colon before a list
  or an example is correct.
- **Em dash**: write a new sentence or use a comma.
- **Bold on each name or term.** Keep bold for UI names and list lead-ins.
- **Label that repeats its line**: "**Performance:** Performance improved".
  Write prose. A lead-in that names the item and then adds new detail is
  correct.
- **Decorative emoji and curly quotes.** Remove them.

## Voice

- **Chat phrases**: "I hope this helps", "let me know if", "great question",
  "found the smoking gun". Remove them.
- **Stacked hedges**: "could potentially be argued" becomes "may".
- **Over-compression**: dropped articles, fragments without verbs, arrows,
  and invented abbreviations. "Parser rejects bad date → exit 2, no write"
  becomes "The parser rejects a bad date, exits with code 2, and writes
  nothing."

Adapted from pstack `unslop` (MIT, copyright 2026 Lauren Tan).
