---
name: metricool-social-scheduling
description: "Plan and create Metricool schedules for short vertical videos across Instagram, TikTok, YouTube, Facebook, Threads. Use when scheduling Reels/Shorts/TikToks."
disable-model-invocation: true
---

# Metricool scheduling

- `references/metricool-mcp-contract.md`: MCP tools, the `info` payload, and quirks. Read it before any create or update call.
- `references/media-and-transcripts.md`: Drive hosting, ffmpeg renders, transcripts.
- `references/scheduling-model.md`: formats, slot selection, cadence, and de-duplication.
- `references/inbox-replies.md`: read and answer comments in the Metricool inbox through the browser bridge.
- For the Praize brand (brand ID, handles, folders, hashtags), read the `praze-social-scheduling` skill in the Praize repo.

## Pipeline

1. `getBrandSettings`: `blogId`, timezone, networks. Never assume the timezone. Every `publicationDate` and the `date` argument must use it.
2. Find what is already published on each network via analytics (`getScheduledPosts` shows only future posts). Do not re-post a live video to the same network unless the user asks.
3. Dedupe the source clips by size or checksum. Near-duplicates often differ only by container.
4. Transcribe, then write captions. Fix misheard product names. Tag each clickable link to your own site with `utm_source=<network>` and `utm_campaign=<account group>`; the instance skill names the values. Instagram and TikTok captions and YouTube Shorts descriptions do not make links clickable: write the bare domain there.
5. Render 1080x1920 H.264. Add a 16:9 blurred-background cut only for a non-Short YouTube placement.
6. Host at a public URL and verify it without credentials. Metricool copies the file at create time, so the link can be revoked afterward.
7. Choose slots per network from `getBestTimeToPostByNetwork`.
8. Present the formats, drop table, and captions. **Wait for approval.**
9. Create the posts, grouping only networks that share text and time. Every response must show `PENDING`. Verify with `getScheduledPosts` over the range and count the posts. Delete scratch renders.
10. Answer comments in the inbox (`references/inbox-replies.md`). Get approval of the exact reply text first.

## Editing clips

Cut, overlay, and check clips with the `short-video` skill before you host them.

## Limits of the MCP

- It cannot connect social accounts to a brand. The user does that in the web app.
- It cannot read or reply to comments or messages.
- It cannot upload a local file. Media must be a public URL at create time.
- Media at a public URL is copied to `static.metricool.com` at create time. To schedule the same video on a second brand, pass that Metricool URL.
