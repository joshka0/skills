---
name: summarize
description: "Write the result of an investigation, debug session, or research as a Markdown summary in the shared summary store, and open it in a Herdr UI tab. Use at the end of an investigation, or when the user asks for a summary, report, or write-up."
---

# Summarize

A summary is a Markdown file in `~/vaults/wiki/summaries/`. Every agent can read
it. The user reads it in a Herdr UI browser tab or in Obsidian (`wiki` vault).
The `summ` CLI (`~/repos/personal/herdr-summarizer`) creates, lists, and opens
summaries.

## Write a summary

1. Create the file. Use the project name and a short slug:
   `summ new <project> <slug> --topic <name> --title "<title>" --status <status>`.
   It prints the path and writes the frontmatter. Status is `done`, `needs-you`,
   `blocked`, or `info`.
2. If the work touches Foxway, add `--store foxway`. The file then goes under
   `summaries/foxway/`.
3. `--topic` is required: the fleet memory finds a summary only by its
   topic. Use the fleet memory topic name from `mem topics`, the same one
   your memo lines link. Before you continue a topic, run
   `summ list --topic <name>` and `summ feedback --topic <name>`.
4. Fill in `tags` in the frontmatter, for example `tags: [herdr, debug]`.
5. Write the body in this shape. Every part is plain Markdown that Obsidian
   also renders:

   ```markdown
   > [!abstract] Answer
   > The result in one to three sentences. The index card shows this text.

   > [!question] Needs you
   > 1. One question per decision?
   >    - **Recommended option**
   >    - Other option

   **What changed** — the new fact or result. [verified]

   **Why it matters** — the effect on the user, the project, or a decision.

   **The catch** — risks, limits, and open items. Write "None" if none.

   **Next** — what happens now, and who acts.

   ## <detail section>

   - One fact per bullet, at most 20 words (see Style). [likely]

   ::graph-check{title="DONE"}

   - [x] what is done
   - [ ] what is open — why

   ::

   > [!info]- Evidence
   > - `path:line`, commands, and their output. The `-` folds it.
   ```

   - Start with the `abstract` callout. A reader who stops there must have
     the result.
   - Add the `question` callout only when you need a decision. Then set
     `--status needs-you`. Write each question as a numbered item and its
     options as sub-items; make your recommendation **bold**. The viewer shows
     option buttons and a note field. The user's answers arrive in your pane
     as a prompt that starts with `Answers from summary`, and the summary gets
     an `Answered` callout. A question with no options gets a text field only.
   - After the callouts, write the four labels in this order: **What
     changed**, **Why it matters**, **The catch**, **Next** (Smart Brevity).
     Each label gets one to three short sentences or bullets. A reader who
     stops after **Next** must know what to do.
   - Detail sections come after the labels: evidence, tables, figures.
   - End each finding with how sure you are:
     - `[verified]`: you checked it with a test, a command, or the source.
     - `[likely]`: it follows from what you read, but you did not check it.
     - `[guess]`: an inference with little evidence. Say what would check it.

     The viewer shows the marker as a badge. Do not mark labels, questions,
     or plain descriptions.
   - Put long proof, logs, and side notes in folded callouts (`> [!info]-`).
   - Other callouts: `warning`, `danger`, `success`, `todo`, `note`.
   - For a figure, use an mdxcn Comark block (`mdxcn` skill, `## Comark` in
     `https://mdxcn.dev/llms.txt`): `::graph-<name>{title="X"}`, a blank
     line, the Markdown body, a blank line, `::`. Write props only as
     `{key="value"}`, and write data as the Markdown body, not as YAML. Good
     fits: `graph-check` (done and open), `graph-spec` (key and value),
     `graph-timeline` (sequence), `steps`, `graph-compare` (option A or B).
     Use at most two figures.
   - Cite files as `path:line`, and commits, PRs, and URLs in full.
   - To refer to an earlier summary, link it as `[[<file name without .md>]]`.
6. Write every line in the style below. Then reread the body and cut.
7. Open it: `summ open <path> --viewer mdx`. This opens a Herdr UI tab without
   focus and prints a short link.
   It runs `summ check` first and refuses to open a summary with errors
   (unknown component, bad props, missing blank lines, no abstract). Fix
   them and run it again. Fix the style warnings too, unless a rule does not
   fit; then say why in the chat.
8. End your reply with the answer in two to four lines and the short link on
   its own line. Do not repeat the summary in the chat. The user clicks the
   link to open it in a Herdr tab.

## Style

Write in ASD-STE100, and prefer structure to prose.
The reader scans; a paragraph hides the point.

- One sentence states one fact. At most 20 words. Active voice, present
  tense, simple words, the same term for the same thing.
- No paragraphs in the body. A section is bullets, a table, a checklist, or
  a figure. The `abstract` callout holds at most three sentences.
- Put the result first in each bullet, then the reason: "Save refuses when
  the file changed: the agent edited it."
- Use a table to compare two or more things, and a numbered list only for
  steps in order.
- Cut words that do no work: "basically", "in order to", "it is worth noting",
  "this means that". No restating the heading. No closing summary line.
- Name things exactly: file `path:line`, command, value. "It" must have one
  clear referent.

## Revise with the user

The user can edit a summary in the viewer and comment on text. Comments are
`> [!me] "<quoted text>"` callouts. **Send back** types a prompt that starts
with `Revision from summary <name>` into your pane.

1. Run `summ feedback <name>`. It prints the user's comments and the diff
   since your last version.
2. Treat the user's edits as their intent. Keep them unless they break a
   fact; then say why in the chat.
3. Address each comment in the text. Then delete its `> [!me]` callout. The
   feedback log keeps the record.
4. If you disagree with a comment, keep it and add a `> [!note]` reply under
   it.
5. Save the file. The open tab shows the new version without a reload. End
   your reply with what you changed in two to four lines and the short link.

To start a document you want to revise together, write it as a summary with
`--status needs-you`, and ask the user to click **Edit** and comment.

## Find summaries

- `summ list [project]` prints all summaries, newest first.
- `summ feedback` lists recent answers and revisions from the user.
- `summ open` without a file opens the index page.
- Read a summary file directly; it is plain Markdown.

## Rules

- Do not write secrets or credential values into a summary.
- Do not edit another agent's summary. Write a new one and link the old one.
- The Herdr plugin `herdr-summarizer` serves the link (mdx-view and the
  Portless proxy, in the `summaries-service` workspace). If
  `curl -sfk https://mdx-view.localhost:1355/api/summaries` fails, run
  `herdr plugin action invoke ensure-service --plugin herdr-summarizer`. If it
  still fails, give the file path instead.
