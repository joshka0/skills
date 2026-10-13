# X experiment, 2026-10-14 to 2026-11-15

Owner ask 2026-10-13: post the Praize video series on X (joshka0) regularly and learn which format gets more eyeballs. Buffer only; Metricool stays with the Praize brand.

## Design

- One video a day at 19:00 Tallinn, 2026-10-14 to 2026-10-30: videos 2 to 18 (1 skipped: translation angle dropped; 0 skipped: shipathon). A batch-2 video never posts on X before its Praize debut.
- Caption arms rotate A, B, C so each arm gets a mix of videos:
  - `video-short`: one line, no hashtags, no link.
  - `video-long`: 400 to 800 characters in the written register.
  - `video-builder`: frames the clip for builders (SRE, AI agents, Herdr). V06 is the call for Christian builders, with the one `#FaithTech` tag.
- Text arms: two Prayer Lock contrast posts (short 2026-10-17, long 2026-10-24) and two full essays as X long posts (2026-10-18, 2026-10-25).
- Builder text posts keep their weekday morning slots.
- No @-tags of other Christian builders in scheduled posts. Engage by hand in their threads.
- Video media are Drive links in the shared folder `Praize Social 1080p`. Buffer fetches them at publish time: keep the folder shared until 2026-10-31. Video 10 uses `PR praize 10 (X 139s).mp4` (Buffer caps X video at 2:20).

## Read the results

- 72 hours after each post, read `posts(...){ edges { node { id dueAt metrics { ... } } } }` for channel `6ace2144778b240e2ff69ae9`. Compare impressions, engagement rate, and video views per arm.
- Judge arms on medians, not on one hit. 5 to 6 videos per arm is a hint, not proof; video quality differs.
- After 2026-10-30, keep the winning arm and test the next variable (time of day, then link in a reply versus no link).

## Posts

| Date (UTC) | Arm | Key | Buffer id | Chars | Video |
| --- | --- | --- | --- | --- | --- |
| 2026-10-14 | video-short | V01-v2-A | `6ace536a05447a55936dcd38` | 65 | yes |
| 2026-10-15 | builder-text | B-v4 · X · Build · Limits in config | `6ace54660b1619ab6565fa57` | 256 | no |
| 2026-10-15 | video-long | V02-v8-B | `6ace5402a582dbdae83088e5` | 499 | yes |
| 2026-10-16 | builder-text | B-v2 · X · Build · Transcript fillers | `6ace547d05447a55936dfe3e` | 252 | no |
| 2026-10-16 | video-builder | V03-v6-C | `6ace540611032ccdb8be23dd` | 267 | yes |
| 2026-10-17 | text-contrarian-short | T-prayerlock-short | `6ace5464d718c7e2826b61f1` | 271 | no |
| 2026-10-17 | video-short | V04-v12-A | `6ace5409d9d45db80a03eac1` | 29 | yes |
| 2026-10-18 | essay-full | E-demo | `6ace5465d9d45db80a03fe88` | 4231 | no |
| 2026-10-18 | video-long | V05-v9-B | `6ace540ca582dbdae8308a09` | 439 | yes |
| 2026-10-19 | builder-text | B-v2 · X · Build · App Store rejection | `6ace546705447a55936dfa80` | 265 | no |
| 2026-10-19 | video-builder | V06-v11-C | `6ace540e11032ccdb8be24c8` | 244 | yes |
| 2026-10-20 | video-short | V07-v13-A | `6ace5412a582dbdae8308ac3` | 77 | yes |
| 2026-10-21 | video-long | V08-v14-B | `6ace5415d9d45db80a03ec04` | 470 | yes |
| 2026-10-22 | builder-text | B-v4 · X · Build · Agents can't grade themselves | `6ace5468a582dbdae8309892` | 188 | no |
| 2026-10-22 | video-builder | V09-v5-C | `6ace541811032ccdb8be283c` | 224 | yes |
| 2026-10-23 | builder-text | B-v4 · X · Build · Proof first | `6ace5469d718c7e2826b63d6` | 289 | no |
| 2026-10-23 | video-short | V10-v3-A | `6ace541b11032ccdb8be2893` | 58 | yes |
| 2026-10-24 | text-contrarian-long | T-prayerlock-long | `6ace5465a582dbdae83097c0` | 848 | no |
| 2026-10-24 | video-long | V11-v15-B | `6ace541f0b1619ab6565f024` | 379 | yes |
| 2026-10-25 | essay-full | E-busstop | `6ace546505447a55936dfa1b` | 13126 | no |
| 2026-10-25 | video-builder | V12-v7-C | `6ace542211032ccdb8be2939` | 265 | yes |
| 2026-10-26 | video-short | V13-v16-A | `6ace542511032ccdb8be29a0` | 41 | yes |
| 2026-10-27 | video-long | V14-v4-B | `6ace5428a582dbdae830903e` | 259 | yes |
| 2026-10-28 | builder-text | B-v3 · X · Tools · herdr-cacher | `6ace546ba582dbdae8309946` | 304 | no |
| 2026-10-28 | video-builder | V15-v17-C | `6ace542a05447a55936df10e` | 195 | yes |
| 2026-10-29 | builder-text | B-v3 · X · Tools · remind-me | `6ace546b0b1619ab6565fbae` | 280 | no |
| 2026-10-29 | video-short | V16-v10-A | `6ace5461d9d45db80a03fcbf` | 42 | yes |
| 2026-10-30 | video-long | V17-v18-B | `6ace5464d718c7e2826b61be` | 231 | yes |
| 2026-11-02 | builder-text | B-v4 · X · Contribution · herdr-radar session isolation | `6ace546c11032ccdb8be338c` | 263 | no |
| 2026-11-03 | builder-text | B-v3 · X · Fleet · Builder can't edit the test | `6ace546c0b1619ab6565fc26` | 301 | no |
| 2026-11-04 | builder-text | B-v3 · X · Fleet · Sandboxing an untrusted model | `6ace546dd718c7e2826b6471` | 245 | no |
| 2026-11-05 | builder-text | B-v4 · X · Fleet · Status tables that say what's not done | `6ace546e0b1619ab6565fc6f` | 237 | no |
| 2026-11-06 | builder-text | B-v3 · X · History · Blackboard systems | `6ace546ed9d45db80a04014f` | 335 | no |
| 2026-11-09 | builder-text | B-v5 · X · Contribution · herdr-gpui drag selection | `6ace546f0b1619ab6565fca5` | 317 | no |
| 2026-11-10 | builder-text | B-v5 · X · Contribution · herdr-gpui shortcuts | `6ace546fd9d45db80a04019d` | 318 | no |
| 2026-11-11 | builder-text | B-v5 · X · Tools · herdr-cacher handoff | `6ace547005447a55936dfc3c` | 220 | no |
| 2026-11-12 | builder-text | B-v5b · X · Post-mortem · herdr-loom | `6ace54700b1619ab6565fd77` | 336 | no |
| 2026-11-13 | builder-text | B-v5 · X · Build · Shepr proofs | `6ace5471a582dbdae8309a40` | 298 | no |
| 2026-11-14 | builder-text | B-v5 · X · History · foxctl | `6ace547205447a55936dfc86` | 302 | no |
| 2026-11-15 | builder-text | B-v5b · X · Tools · herdr-beads-board | `6ace5473a582dbdae8309ac0` | 284 | no |
