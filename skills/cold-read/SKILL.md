---
name: cold-read
description: "Test whether an artifact carries its own intent: strip its explanations, have a context-free agent reconstruct the intent, fix the gaps. Use for UI, APIs, CLIs, errors, diffs, docs, briefs."
---

# Cold read

A reader without your context shows what the artifact itself says. Each
wrong guess is a defect in the artifact, not in the reader.

## Protocol

1. Seal the intent. Before the read, write 3–7 concrete claims a reader must
   get: what this is, what it wants from them, what happens next. Keep the
   claims from the reader.
2. Strip the self-explanation: text that explains the artifact instead of
   being it (see the table). Keep what a real user sees at that moment.
3. Read cold. Launch a fresh agent, from another family than the author when
   one is available, with no repo, history, author, stakes, or intent. Give it
   only a reader role ("you are a first-time user of …") and the stripped
   artifact. Ask: what is this, what does it want from me, what would I do
   next, what do I expect to happen, what is unclear. Ask for a confidence
   per answer. Do not tell it that this is a test of the author.
4. Diff each sealed claim against the reconstruction: match, miss, or wrong.
5. Fix the artifact, not the reader: rename, restructure, change the
   affordance or the order. Do not re-add a stripped hint to cover a miss.
6. Read again with a new agent. A reader that saw any earlier version is
   spent. Never reuse it, and never show a reader the intent or earlier
   rounds.
7. Stop when the reconstruction matches every claim. If a miss can only be
   closed by explanation, restore that one hint and record why.

- When stakes are real, use two readers from different families. Two
  readers with the same wrong guess is a strong signal.
- Record each round: sealed claims, stripped artifact, reconstructions,
  fixes. The record is the artifact of the check.

## What to strip, per artifact

| Artifact | Strip | Reader gets | Reader produces | A miss points at |
| --- | --- | --- | --- | --- |
| UI screen | Captions, hints, tooltips, onboarding and placeholder help | Screenshot or rendered page | Purpose, main action, result of each control | Layout, affordance, labels |
| API or types | Doc comments, README, examples | Signatures, types, names | A usage example and the contract: errors, ownership, order | Naming, shape |
| CLI | Help descriptions | Command and flag names, or a recorded session | What each command does; the command for a stated goal | Naming, grouping |
| Error message | Docs, source | The message as shown | The cause and the user's next action | Message content |
| Code | Comments, docstrings, commit text | The body; for a naming test, also hide the name | Purpose and invariants, or a proposed name | Structure, naming |
| Diff | PR text, commit message, branch name | The diff | The PR description: purpose, scope, risk | Unfocused or hidden scope |
| Tests | Implementation, spec | Test names, then bodies | The spec they imply and what they leave out | Weak names, gaps |
| Spec or laws | The prose reading | The formal statements | A plain-language reading | Ambiguous or wrong formalization |
| Brief | Your context | The brief only | The task, the done condition, the first steps, open questions | An ambiguous brief: fix it before dispatch |
| Doc section | The surrounding docs | One section | The action the reader would take | An unclear instruction |
| Schema | Docs | The schema | What one record means; states the reader thinks are valid | A modeling gap |

The brief row is a brief-back. It is cheap, so run it before every
high-stakes dispatch.
