# Metricool MCP contract

Tools exposed by the Metricool MCP:

- `getBrandSettings` — brands, ids, timezone, connected networks.
- `getBestTimeToPostByNetwork` — hourly scores per weekday for one network.
- `getAnalyticsAvailableMetrics` — field ids for a network and connector.
- `getAnalyticsDataByMetrics` — rows for a list of field ids over a date range.
- `getScheduledPosts` — scheduled (not yet published) posts.
- `createScheduledPost` — create one post for one or more networks.
- `updateScheduledPost` — replace a scheduled post's content.
- `createScheduledPostForReview`, `sendScheduledPostForReview` — approval flow.

## createScheduledPost

Arguments: `blogId`, `date` (ISO 8601 with offset), `info` (JSON string).

`info` fields:

| Field | Meaning |
| --- | --- |
| `autoPublish` | `true` publishes at the scheduled time; `false` sends a push instead. |
| `media` | Array of public URLs to image or video files. |
| `providers` | `[{"network":"instagram"}]`; valid: twitter, facebook, instagram, linkedin, pinterest, youtube, tiktok, bluesky, threads, gmb. |
| `publicationDate` | `{dateTime:"YYYY-MM-DDTHH:mm:ss", timezone:"<IANA>"}`. |
| `text` | Caption. Required except for IG/FB Stories. |
| `firstCommentText` | Optional first comment. |
| `draft`, `descendants`, `shortener`, `smartLinkData` | Set `draft:false`, `descendants:[]`, `shortener:false`, `smartLinkData:{"ids":[]}` unless needed. |
| network data | One key per network in `providers`, see below. |

Network data shapes:

- `instagramData.type` — `POST`, `REEL`, `STORY`, `TRIAL_REEL`.
- `facebookData.type` — `POST`, `REEL`, `STORY`.
- `youtubeData` — `title`, `type` (`short` or `video`), `privacy`, `madeForKids`, `tags`.
- `tiktokData` — `title` (required), `privacyOption` (`PUBLIC_TO_EVERYONE`).
- `threadsData` — `{}` is accepted.
- `twitterData.tags` is for tagging people, not hashtags.

## Quirks that cost a retry

- Providers must be objects. Strings are accepted by the API but break scheduling.
- TikTok without `tiktokData.title` returns `TikTok title is required`.
- The response `media` is the Metricool-hosted copy
  (`https://static.metricool.com/planner/...`), not the URL you sent. That copy
  is what the platforms receive.
- `updateScheduledPost` needs the full original `info` plus `id` and `uuid`. An
  update assigns a new `id`; `uuid` is stable.
- One post has one `text` and one `publicationDate`, so networks that differ in
  caption or time need separate posts.
- YouTube auto-classifies a vertical clip of 3 minutes or less as a Short. Use a
  16:9 render to publish it as a standard video.

## Reading published posts

1. `getAnalyticsAvailableMetrics` with `network` and `connector`.
2. `getAnalyticsDataByMetrics` with the returned field ids.

Connectors and useful field-id prefixes:

| Network | Connector | Date field | Content field | URL field |
| --- | --- | --- | --- | --- |
| instagram | posts | IGPO02 | IGPO03 | IGPO06 |
| instagram | reels | IGRE02 | IGRE03 | IGRE06 |
| facebook | posts | FBPO02 | FBPO03 | FBPO06 |
| tiktok | posts | TKPO02 | TKPO05 | TKPO03 |
| threads | posts | THPO02 | THPO03 | THPO06 |

## Best times

`getBestTimeToPostByNetwork` accepts `twitter`, `facebook`, `instagram`,
`linkedin`, `youtube` and `tiktok`. Threads is not accepted; treat it as an
Instagram-adjacent surface.

The response is a list per `dayOfWeek` (1 = Monday through 7 = Sunday), each with
`bestTimesByHour` and an integer `value` per hour. Pick the highest-value hour
inside the days you plan to use.
