---
name: mdxcn
description: "Add mdxcn figures (framed ASCII diagrams) to write-ups, and render .mdx reports in a herdr pane through mdx-view. Use for a report, PR, incident, tradeoff, or plan that a figure makes faster to scan."
---

# mdxcn

mdxcn draws figures as characters in a dashed frame with a `[ TITLE ]` label. Props, the chooser, and every official fence: `https://mdxcn.dev/llms.txt`. Fetch it once per session before you pick a figure.

## Pick the format by destination

| Destination | Write |
| --- | --- |
| Terminal reply, README, GitHub, PR, Linear, Slack | The official fenced ASCII from `llms.txt` `## MDX`. Swap the labels and keep the frame. |
| A report the user will read rendered | An `.mdx` file with the React components, shown in mdx-view. |

- Add a figure only where it beats prose. Keep few, with prose between them. No figure for a one-sentence point.
- Never invent ASCII, SVG, Mermaid, or chart code. Copy the official fence or the component API.
- Figures without a fence (Flow, Plot, Activity, Heatmap, Calendar, Timer, Countdown, Frame) work only in `.mdx`.

## Delegate conversions

- Converting a finished write-up into figures is mechanical. Delegate it to a Sonnet 5.5 subagent or Luna. Never Haiku.
- You pick the content and the figures first. The brief names each figure, its component or fence, and the source text for it. The small model only converts and reports gaps.
- Check its output with a screenshot before you show it to the user.

## mdx-view

The viewer lives in `~/repos/mdx-view`. Its README owns the setup facts.

1. Write the report as `.mdx` under `~/repos` or the session scratchpad. Use components without imports.
2. If `curl -sf https://mdx-view.localhost:1355 >/dev/null` fails, start it in the background: `pnpm -C ~/repos/mdx-view dev`.
3. Open it: `terminal-browser open "https://mdx-view.localhost:1355/?file=<abs path>" --split right`.
4. If a browser is already open in this tab, run `terminal-browser action -- open "<url>"` instead. A second `open` adds another pane.
5. Check the render: `terminal-browser action -- screenshot <scratch path>.png`, then read the image.

- Saving the file updates the page. Do not reopen it.
- Markdown lists inside a component are its data: timeline items are `- 14:02: label`, with `**bold**` for now and `*italic*` for next. Nested lists become tree levels.
- The viewer serves only `.mdx` files from `~/repos` and `/private/tmp/claude-501`. A 403 means the file is outside these folders.
- Close the browser panes you open when you finish. Leave the server running.
