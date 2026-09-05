# Structured diffs

Use JSON change tracking for fields such as price or availability. The imported
CLI requires a JSON payload via positional file or stdin; ordinary create flags
do not express the schema. Check current help before submitting the payload.

Place the format inside the target's `scrapeOptions.formats`:

```json
{
  "type": "changeTracking",
  "modes": ["json"],
  "prompt": "Extract the advertised monthly price.",
  "schema": {
    "type": "object",
    "properties": { "price": { "type": "string" } }
  }
}
```

Choose fields from the user's monitoring goal. Preserve units and billing
periods; changing the extraction schema can affect comparisons. Do not confuse
a missing field or failed extraction with a real price removal.

In JSON mode, a changed page's `diff.json` holds field paths with `previous` and
`current` values, and `snapshot.json` holds the current extraction.
`modes: ["json", "git-diff"]` returns both field diffs and `diff.text`; either
surface can mark the page changed.

For markdown-only checks, `diff.text` is the unified diff and `diff.json` is a
`parse-diff` AST with `files`, not extracted business fields; there is no
`snapshot`. Select the parser from the configured mode, not the presence of a
field named `json`. Verify the first completed check against the expected shape.
