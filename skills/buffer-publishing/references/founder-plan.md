# Founder plan

Owner rulings, 2026-10-13. Summary: `2026-10-13-1527-praze-founder-presence-buffer`.

## Accounts

| Channel | Name | Buffer id | Cadence |
| --- | --- | --- | --- |
| LinkedIn | joshua-katigbak | `6ace20e1778b240e2ff696ca` | 3 per week (Tue, Thu, Sat slots) |
| X | joshka0 | `6ace2144778b240e2ff69ae9` | 5 per week (Mon–Fri slots) |
| TikTok | joshka061 | `6ace21e7778b240e2ff6a178` | 3 per week |

Organization: `6ace20b052b382718c1a1950`. All channels use Europe/Tallinn.

## Rulings

- Buffer owns the personal accounts. The Metricool "Self" brand is to be deleted.
- TikTok `joshka061` reposts each Praize video 7 days after the Praize post, plus founder clips.
- Drafts go to Buffer Ideas. The agent schedules directly; the user edits in the queue.
- LinkedIn: about one post in three is faith or the Praize story. The rest is build and engineering.

## Builder authority (LinkedIn and X), owner rulings 2026-10-13

- Positioning: "SRE turned solo founder, building with AI agents". LinkedIn keeps about one faith post in three; the 6 v2 faith Ideas stay.
- Pillars: how I run the fleet, tools I built, post-mortems, frameworks tried, old ideas behind new agents.
- Tag Herdr as `@herdrdev` on X in plugin posts and link the plugin.
- Josh's work (may be posted): Shepr (tryshepr.com, repo herdr-executive-bend), foxctl (foxctl.com, open source), Praize, Turtlr Coach, Kubernetes Beyond YAML, herdr-coordinator, herdr-summarizer, herdr-cacher, herdr-goal, herdr-engine, herdr-loom, herdr-lessons, herdr-beads-board, herdr-blackboard (retired), memoryd, dreamd, remind-me, pi-vm. Source of truth for products: `https://katig.dev/llms.txt`.
- Not Josh's: Herdr itself (Ogulcan Celik, @herdrdev), herdr-radar (hhdebb; Josh has 3 of 130 commits: session isolation, the `$cache` cell), herdr-handsfree (RanolP). Write "I contributed to" or "I use", never "I built".
- Never post Foxway work, data, hosts, or screenshots that show them, even inside a postable repo.
- Facts per repo: `git log --all --format=%ae | sort | uniq -c` for ownership, `git rev-list --count HEAD` for counts, README and ADRs for decisions.

## Positioning and pillars

"The engineer building a voice prayer app in public."

| Pillar | Share |
| --- | --- |
| Build log (how) | 40% |
| Why voice (thesis: a voice is proof someone stopped and cared) | 20% |
| Founder story (Estonia, the "pearls" call) | 15% |
| Prayer asks ("What can I pray for you about?") | 15% |
| Host invite (small-group leaders to pilot Praize) | 10% |

Words to avoid in copy: testimony, spiritual, journey. Brand is "Praize", never "Praise".

## Grok Bot

Owner rulings 2026-10-13: Grok Bot runs the social and blog routines. Its routines live in `praze/praze-landing` under `ops/grok-bot/` (`social.md`, `blog-publishing.md`), so the Bot reads them from the repo. It gets its own Buffer API key and its own GitLab user (Developer on praze-landing only). It may merge its own blog posts when CI passes; `bot-scope` limits its changes to `src/content/blog/` and `static/blog/`. Metricool comments stay with Claude until Metricool gives the Bot a seat. Call to action everywhere: `Join the beta: praize.faith/beta`.

## Scheduled and drafted

2026-10-13 (Bend and pstack): 4 X posts (2026-10-21, 10-26, 10-27, 10-30) and 2 LinkedIn posts (2026-11-05, 11-07). Bend posts tag `@VictorTaelin` and cite only verified fixes: N1 and N9 (prayed-for notices across a block, commits a731b496c, 984b520f7) and quiet-hours B4, B6, B11, B12, B13 (18dce248a). pstack posts credit `@poteto` (Lauren Tan) for the five adapted skills. Never post the unfixed findings (lifecycle B1, NP6) or the anonymous-read bug-hunt result.

2026-10-13 (posts): 52 scheduled posts, 40 on X and 12 on LinkedIn, 2026-10-14 to 2026-11-15. X carries the Praize video series daily at 19:00 Tallinn as a format experiment (`x-experiment-2026-10.md`), two Prayer Lock contrast posts, and both essays as long posts. Not scheduled: `Week recap` and `Shepr` (still `[fill]`), and the TikTok clip `Comment for prayer` (not filmed).

2026-10-13 (tools batch): 8 "v5" and 4 "v5b" Ideas on herdr-gpui PRs (#285, #417, #442), herdr-cacher, Shepr proofs, foxctl, herdr-loom (post-mortem), and herdr-beads-board. Owner ruling: feature herdr-loom and the beads board, not herdr-summarizer. Delete in the web app: `v5 · X · Tools · herdr-summarizer` and `v5 · LinkedIn · History · From foxctl to small plugins` (replaced by v5b). herdr-summarizer stays private: its history still names Foxway.

2026-10-13 (ratings): GPT Sol and Sonnet rated 29 Ideas as target readers. Owner rulings: cut the 7 weakest, drop the "caught real production bugs" claim, and add one "v4" Idea per rewritten post. 7 v4 Ideas exist. Delete these Ideas in the web app (the API cannot):

- Cut: `v2 · X · Why · Rule one`, `v2 · X · Ask · Pray for you`, `v2 · X · Why · Text is free`, `v2 · X · Ask · Android beta`, `v2 · TikTok · Founder clip · Day in Tallinn`, `v3 · LinkedIn · Story (faith) · Everything is a protocol`, `v3 · X · Fleet · Verifier gates done`.
- Replaced by v4 (same title, prefix `v2`/`v3`): Proof before code, Proof first, Solo founder agent team, Agents can't grade themselves, Limits in config, herdr-radar session isolation, Status tables that say what's not done.

2026-10-13 (second batch): 20 "v2" Ideas in Josh's voice (6 LinkedIn, 12 X including the two essays, 2 TikTok). The 18 older Ideas without "v2" are to be deleted in the web app; the API cannot delete Ideas.

2026-10-13:

- TikTok reposts of Praize videos PR 12–18, 8 posts, 2026-10-21 to 2026-11-06, 19:00 Tallinn.
- 18 Ideas: 6 LinkedIn (2026-10-15 to 10-27), 10 X (2026-10-14 to 10-27), 2 TikTok founder clips (2026-10-18, 10-25). Titles start with the channel and pillar.

## Competitors and investors (owner notes, 2026-10-13)

- Prayer Lock: criticize the design (prayer as a gate in front of the feed, prayed alone, AI-written prayers, paid). Do not claim Apple removed it: the only source is a Grok reply on X, and several apps share the name.
- Faith-app investors to know (from owner notes, unverified): Uncork (Jeff Clavier; Hallow seed to C), Susa and Contrary (Hallow seed), True Ventures (Bible Chat), Goodwater (Hallow C), a16z Connie Chan (Glorify), Sovereign's Capital, Cornerstone VC. Pitch line: "a Hallow-sized habit without the dark patterns", backed by retention, not revenue screenshots.
