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
   `summ new <project> <slug> --title "<title>" --status <status>`. It prints
   the path and writes the frontmatter. Status is `done`, `needs-you`,
   `blocked`, or `info`.
2. If the work touches Foxway, add `--foxway`. The file then goes under
   `summaries/foxway/`.
3. Fill in `tags` in the frontmatter, for example `tags: [herdr, debug]`.
4. Write the body in this shape. Every part is plain Markdown that Obsidian
   also renders:

   ```markdown
   > [!abstract] Answer
   > The result in one to three sentences. The index card shows this text.

   > [!question] Needs you
   > 1. One question per decision?
   >    - **Recommended option**
   >    - Other option

   ## <first finding>

   Short prose. One idea per section.

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
5. Open it: `summ open <path> --viewer mdx`. This opens a Herdr UI tab without
   focus and prints a short link.
6. End your reply with the answer in two to four lines and the short link on
   its own line. Do not repeat the summary in the chat. The user clicks the
   link to open it in a Herdr tab.

## Find summaries

- `summ list [project]` prints all summaries, newest first.
- `summ open` without a file opens the index page.
- Read a summary file directly; it is plain Markdown.

## Rules

- Do not write secrets or credential values into a summary.
- Do not edit another agent's summary. Write a new one and link the old one.
- The Herdr plugin `joshka.summaries` serves the link (mdx-view and the
  Portless proxy, in the `summaries-service` workspace). If
  `curl -sfk https://mdx-view.localhost:1355/api/summaries` fails, run
  `herdr plugin action invoke ensure-service --plugin joshka.summaries`. If it
  still fails, give the file path instead.
