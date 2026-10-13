# Craft sources

Digest of `tiktok-claude-video-paper.md` (Grok Bot, 2026-10-13): 35 X posts, May to October 2026. Reviewed 2026-10-13. Three quotes were checked against the archived text and matched.

## How far to trust it

- The sample is English X posts with 50 to 300+ likes. It over-represents app marketers and slideshow farms and has no faith creators and no founder-on-camera accounts.
- No TikTok documentation. Every algorithm claim is a practitioner belief.
- Strongest: own-campaign reports with numbers, @jurree (app launch, 7M+ views) and @carlmonkft (30M-view UGC campaign). @sulfurscales gives the most complete mechanism but no data.
- Weak: relayed vendor email (@hiokleo, "followers first"), monetisation thresholds, star counts in tool threads.

## Claims kept in SKILL.md

| Claim | Source |
| --- | --- |
| First 1 to 2 s decide reach; front-load the payoff | @sulfurscales, @jurree, @Fumez |
| Completion, rewatches, shares over likes; each video tested alone | @sulfurscales, @jurree |
| Surge lasts 1 to 2 h after posting | @RanQueenofCups |
| On-screen title in the first 3 to 5 s | @RanQueenofCups |
| About 15 s, visual hook plus payload | @carlmonkft |
| 1 s retention and AVD targets of 70% | @Fumez (Shorts) |
| Safe zone: below 300 px, above the bottom 25% | @MaxHirsch13 |
| One niche per account | @carlmonkft, @hiokleo |
| 90% of posts die under 5,000 views; post often | @sulfurscales |

## Dropped

- Posting 1 to 3 times a day and multi-account setups: conflicts with one weekly batch, and multi-account is a terms-of-service grey zone.
- Faceless slideshow factories, AI UGC, "app flash" comment bait: wrong format for a founder talking to camera.
- Extreme hooks (@yevrah) and the @affprinter playbook (comment seeding, metadata spoofing, fake testimonials): deceptive.
- Monetisation thresholds: not a goal here.
- 16:9 to 9:16 reframing: the clips are filmed vertical.

## Tools named

- `video-use` (Browser Use team): transcript-first cuts, the same pattern as `scripts/tiktok_edit.py`. Needs an ElevenLabs key.
- `claude-video` (`/watch`): yt-dlp captions plus scene-change frames, for teardowns of other creators' videos and for a viewer-eye review of a cut. Third-party plugin.
- Remotion, HyperFrames, Manim: code-rendered motion graphics. Use only where a graphic explains something.
