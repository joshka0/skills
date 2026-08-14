---
name: wiki
description: "Operate the private agent wiki and route repeated AUX friction into actionable papercuts. Use when searching captured knowledge, logging a durable gotcha or decision, or seeing the same AUX issue recur."
---

# Wiki

Use the `wiki` CLI as the only read and capture interface. The librarian owns the compiled vault.

## Workflow

1. Run `wiki index` to browse or `wiki search "<terms>"` before re-deriving known facts.
2. Capture one durable item with the narrowest category:
   - `wiki gotcha "<symptom, cause, and fix>"`
   - `wiki papercut "<repeated friction and desired improvement>"`
   - `wiki note "<durable fact>"`
   - `wiki decision "<chosen boundary and reason>"`
3. Keep the item to one line. Add `--source repo|crew|article` only when the live source differs from the default session.
4. Let the CLI write to the inbox. Never edit the compiled wiki directly.

## AUX feedback

1. Treat AUX friction as repeated after the same avoidable issue occurs twice in one task or the same workaround recurs in separate contexts.
2. File an AUX request only when AUX can shorten the correct path: repository detection, tool or vault discovery, credential-mode selection, launch commands, safe stops, or owner handoffs.
3. Do not classify an intentional policy denial, missing service mapping, expired credential, provider outage, or repository defect as AUX friction. Route it to its operational owner.
4. Search `wiki search "AUX request <keywords>"` before capture. Do not duplicate an existing request unless this run adds a distinct recurrence context.
5. After the main task reaches a safe checkpoint, capture:

```sh
wiki papercut "AUX request: <desired behavior>. Repeated friction: <issue and count or contexts>. Owner fit: <why AUX should solve it>."
```

## Hard rules

- Do not interrupt the main task for a one-off preference or speculative nice-to-have.
- Do not capture a credential value, private key, secret-bearing URL, sensitive response body, or broad environment content.
- If the task forbids external writes, report the candidate request without calling `wiki`.
- Add `--foxway` when the content is Foxway-related and the current path does not make that ownership clear.
- Do not write under the compiled wiki directory. The CLI inbox is the only write path.

## Output

Report the search terms and matched pages, or the capture category and safe title. For AUX feedback, say whether the request was captured, deduplicated, or only reported because writes were forbidden.
