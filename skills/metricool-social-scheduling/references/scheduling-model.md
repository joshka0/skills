# Scheduling model

## Formats per network

| Network | Format | Field |
| --- | --- | --- |
| Instagram | Reel | `instagramData.type = "REEL"` |
| Facebook | Reel | `facebookData.type = "REEL"` |
| YouTube | Short | `youtubeData.type = "short"` |
| YouTube | Standard video | `youtubeData.type = "video"` with a 16:9 render |
| TikTok | Video | `tiktokData` with `title` |
| Threads | Video post | `threadsData = {}` |
| Instagram, Facebook | Story | `type = "STORY"`, no `text` |

A vertical clip of 3 minutes or less is always a Short on YouTube. Only a
horizontal render escapes that classification.

Do not publish the same asset twice on one platform to hit "video plus Short".
That is duplicate content. Reach multiple surfaces by cross-posting to different
networks instead.

## Choosing slots

1. Call `getBestTimeToPostByNetwork` for each network over one week.
2. Read the peak `hourOfDay` per weekday.
3. Pick shared days that score well across networks, then give each network its
   own peak hour. Do not stack one network's posts back to back.

The MCP returns one `publicationDate` per post, so networks with different peak
hours need one post each. Networks that share a time and the same text can go in
a single call.

## Cadence

Two to three posts per week per network keeps a small library flowing for about a
month. Spread days (for example Mon/Wed/Fri) so no network publishes on
consecutive days.

## Avoid duplicates

Before planning, list what each network already published
(`references/metricool-mcp-contract.md`). A new library usually starts after the
existing content. If one network is missing an earlier post, offset its sequence:
give that network the missing video first and let the rest continue.
