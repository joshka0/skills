# Buffer API

Source: `https://developers.buffer.com/llms-full.txt` (read 2026-10-13).

## Request

- `POST https://api.buffer.com`, GraphQL, JSON body `{"query": ..., "variables": ...}`.
- Headers: `Content-Type: application/json`, `Authorization: Bearer $BUFFER_API_KEY`.
- Script that worked:

```sh
#!/bin/bash
# usage: bgql.sh <request.json>
[ -n "${BUFFER_API_KEY:-}" ] || { echo "BUFFER_API_KEY unset"; exit 1; }
curl -sS https://api.buffer.com -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BUFFER_API_KEY" --data-binary @"$1"
```

Build the request file with `jq -n --arg ...`, so post text is escaped correctly.

## Read

```graphql
query { account { organizations { id name } } }
query($o: OrganizationId!) { channels(input: {organizationId: $o}) { id name service timezone postingSchedule { day times } } }
query($o: OrganizationId!) { posts(first: 30, input: {organizationId: $o}) { edges { node { id status channelService dueAt text } } } }
query($c: ChannelId!) { channel(input: {id: $c}) { metadata { ... on TwitterMetadata { subscriptionType } } } }
```

## Write

Scheduled video post (TikTok):

```graphql
mutation($i: CreatePostInput!) { createPost(input: $i) {
  ... on PostActionSuccess { post { id dueAt status } }
  ... on MutationError { message } } }
```

```json
{"channelId": "...", "text": "...", "schedulingType": "automatic", "mode": "customScheduled",
 "dueAt": "2026-10-21T16:00:00.000Z",
 "assets": [{"video": {"url": "https://...mp4", "metadata": {"thumbnailOffset": 1000}}}],
 "metadata": {"tiktok": {"isAiGenerated": false}}}
```

- `dueAt` is UTC. Tallinn is +03:00 until 2026-10-25, then +02:00.
- `mode: addToQueue` uses the channel's posting slots instead.
- An X thread goes in `metadata.twitter.thread`; the top-level `text` repeats the first item.

Idea:

```graphql
mutation($i: CreateIdeaInput!) { createIdea(input: $i) {
  ... on Idea { id content { title } } ... on MutationError { message } } }
```

```json
{"organizationId": "...", "content": {"title": "LinkedIn · Build · ...", "text": "...",
 "services": ["linkedin"], "date": "2026-10-15T12:21:00.000Z", "aiAssisted": true}}
```

- An Idea belongs to the organization, not a channel.
- An Idea cannot carry a video through the public API (`type: video` is not supported).

## Media

- No upload endpoint. Pass a public, direct, stable HTTPS URL.
- Buffer fetches the file when the post publishes, so the URL must work until then.
- `static.metricool.com/planner/...` URLs qualify: a September 2026 file still served 200 in October.
- Google Drive share links do not work.

## Limits (Essentials plan)

- 100 requests per 15 minutes, 250 per day, 7,500 per 30 days.
- Each response has `RateLimit` headers with the requests left (`r`).
- X `joshka0` is on Premium: long posts are allowed.
- TikTok caption with a video: 2,200 characters.

## MCP

Buffer runs an MCP server at `https://mcp.buffer.com/mcp` (Bearer header). It is not set up. If you add it, read the key from the environment; never write it into a config file.
- `editPost(input: EditPostInput)` changes a scheduled post: pass `id`, `text`, `dueAt`, `mode`, `schedulingType`, `assets`, and `metadata` again. It returns the same id.
- `posts(first, input: {organizationId, filter: {channelIds, status, dueAt}})` lists posts with their ids; read video URLs through `assets { ... on VideoAsset { source } }`.
