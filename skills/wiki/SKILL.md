---
name: wiki
description: "Search and capture durable agent knowledge in the private wiki via the `wiki` CLI, including repeated AUX friction. Use to look up known facts or log a gotcha, papercut, note, or decision."
---

# Wiki

The `wiki` CLI is the only read/write path. It writes to an inbox. The librarian compiles `~/vaults/wiki`, and you never write there.

```sh
wiki index | wiki search "<terms>"                 # before you re-derive something known
wiki gotcha "<symptom, cause, fix>"
wiki papercut "<repeated friction, desired fix>"
wiki note "<durable fact>"
wiki decision "<boundary chosen, reason>"
```

- One line per item. Add `--source repo|crew|article` only when the source is not the session. Add `--foxway` for Foxway content when the path does not already show it.
- Never capture secrets, secret-bearing URLs, sensitive bodies, or env dumps. If the task forbids external writes, report the item instead.

## AUX requests

- File one only after the same avoidable AUX issue happens twice in a task, or the same workaround recurs across contexts. It must be something AUX could shorten: repo detection, tool or vault discovery, credential-mode choice, launch commands, safe stops, owner handoffs.
- Policy denials, missing mappings, expired creds, outages, and repo defects are not AUX friction. Send those to their owner.
- Dedupe first with `wiki search "AUX request <keywords>"`. Capture at a safe checkpoint:
  `wiki papercut "AUX request: <desired behavior>. Repeated friction: <issue, count/contexts>. Owner fit: <why AUX>."`
