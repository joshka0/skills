---
name: buffer-publishing
description: "Schedule posts and create Ideas on Josh's personal LinkedIn, X and TikTok through the Buffer GraphQL API. Use when posting to Buffer, drafting founder posts, or reposting Praize videos to personal accounts."
---

# Buffer publishing

- `references/api.md`: endpoint, auth, the queries and mutations that work, limits.
- `references/founder-plan.md`: channels, cadence, content pillars, approval rules, and what is scheduled.
- `references/x-experiment-2026-10.md`: the running X format experiment, its arms, and the Buffer post ids to measure.
- `references/voice.md`: Josh's voice (style card). Read it and the samples in `references/voice/` before you draft any post.
- Praize brand posts go through Metricool (`metricool-social-scheduling`). Buffer owns only the personal accounts.

## Drafting with Echo (optional)

- Echo (Fulcrum) imitates a named writer: `https://echo.fulcrum.inc/api/v1/chat/completions`, model `echo`, `persona` = a person's name. Key `ECHO_KEY` in Infisical `/shared/vendors/echo`.
- `scripts/echo_draft.py <brief> <persona> <out>` sends Josh's samples in `<post>` tags plus a brief. Run it with `infisical run --silent --env dev --path /shared/vendors/echo -- ...`.
- A brief gives the premise, the allowed facts, the limits, and the effect. Never send an existing draft; Echo then only rewrites it. Examples: `references/voice/briefs/`.
- Echo invents facts. Check every claim against the brief's allowed facts before a draft becomes an Idea.
- On 2026-10-13 Echo returned 503 `maintenance`. The script retries 429 and 503 four times.

## Secret

- `BUFFER_API_KEY` lives in Infisical `/shared/vendors/buffer` and is imported into `/repos/personal/praze`.
- Run from the Praize repo: `infisical run --silent --env dev --path /repos/personal/praze -- <script>`.
- Put the request in a script file. Never pass the key in argv, and never print it.

## Rules

- Get the user's approval of the plan before the first write of a batch. Inside an approved batch, schedule directly; the user edits in the Buffer queue.
- Put new drafts in Buffer **Ideas** (`createIdea`), one per post, with `services` and a target `date`.
- Before a post states a fact about Praize, check it against the repo or fleet memory. State plans as plans. Do not claim work that is only on a branch.
- Never post user data or a real prayer request without that person's consent.
- Tag every clickable link to `praize.faith` so PostHog can tell where visits come from: `?utm_source=<x|linkedin>&utm_campaign=founder`, with the trailing slash on paths (`praize.faith/beta/?utm_source=x&utm_campaign=founder`). TikTok captions do not make links clickable, so write the bare domain there. The Praize brand accounts use `utm_campaign=brand`.
- Read back each write: the response must show `PostActionSuccess` with `status: scheduled`, or an Idea `id`.

## Pipeline

1. Read the queue and the Ideas (`references/api.md`).
2. Pick the week's content from the pillars and the week's real work (merged MRs, fleet memory, Metricool analytics).
3. Create Ideas for the drafts. Schedule approved posts with `mode: customScheduled` and a UTC `dueAt`, or `addToQueue`.
4. For a Praize video repost, use the video's `static.metricool.com` URL from Metricool `getScheduledPosts`. Repost 7 days after the Praize post.
5. Record what you scheduled in `references/founder-plan.md`.
