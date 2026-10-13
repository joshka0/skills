---
name: short-video
description: "Cut, overlay, and review short vertical videos (TikTok, Reels, Shorts) transcript-first with ffmpeg. Use when editing a clip or planning what to film."
---

# Short video

Scheduling and hosting belong to `metricool-social-scheduling` (brands) and `buffer-publishing` (personal accounts). This skill makes the file.

## Edit a clip

1. Extract audio: `ffmpeg -nostdin -i <clip> -vn -ac 1 -ar 16000 -c:a pcm_s16le <clip>.wav`.
2. `scripts/tx_words.sh <wav> <words.json>` transcribes with word timestamps (mai-transcribe on OpenRouter). It reads `PRAZE_OPENROUTER_API_KEY` or `OPENROUTER_API_KEY`, so run it under `infisical run`.
3. Grab a frame at 1 s and mid-clip. Note where the clip's own burned-in captions sit.
4. `scripts/tiktok_edit.py <clip> <words.json> <out.mp4> "<hook>" [--hook-y 300] [--keep-gap 0.35] [--captions]`. It cuts fillers and pauses over 0.35 s, scales to 1080x1920, normalizes to -14 LUFS, and shows the hook for 2.2 s in a 300 px band starting at `--hook-y`.
5. Check frames of the output and look at them before you hand it over. Write next to the source, never over it.

- Keep text between y 300 and y 1440 of 1080x1920. TikTok's tabs cover the top and its caption and buttons cover the bottom 25%. `--hook-y` accepts only 300..1140.
- Place the hook where the clip has no burned-in caption. Over the torso (`--hook-y 1100`) works for a seated talking head.
- Add `--captions` only for a raw clip. Clips with burned-in captions get doubled text.
- Hook text has no emoji: Arial Black renders it as a box.
- This ffmpeg has no libass or drawtext. Overlays are Pillow PNGs.

## What to film and cut

Practitioner beliefs from X, not TikTok documentation. Sources and their credibility: `references/craft-sources.md`.

- The first 1 to 2 seconds decide reach. Open on the payoff or the line that lands. No intro, no "hey guys". Put the hook on screen as text in the first 3 seconds.
- Completion, rewatches, and shares count more than likes. Aim for about 15 s; cut until every second earns its place.
- TikTok tests each video on its own, mostly in the first 1 to 2 hours. Followers only get you shown first.
- Most posts die under 5,000 views. Volume is the lever: film in one weekly batch, post one a day. Repeat a winning format with a new hook.
- One niche per account. Builder and agent content goes to X and LinkedIn, not the faith TikTok.
- Build for the share: a line someone sends to a friend.
- Measure 1-second retention (target 70% or more) and average view duration (target 70% or more) per video, then fix where viewers drop.

## Never

- Risky or false claims as hooks, comment seeding from spare accounts, bought or aged accounts, metadata spoofing to repost, or synthetic "customers" without a label.
- Install a third-party video plugin (`video-use`, `claude-video`) without reading its code first. `video-use` needs an ElevenLabs key; the scripts here cover the same transcript-first cut.
