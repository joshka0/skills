# YouTube Transcript skill acceptance

## Decision

- Canonical owner: `skills/youtube-transcript`
- Archetype: leaf
- Selected contract surfaces: existence and ownership, package and routing,
  evidence and safety, validation and acceptance
- Pre-create git ref: `5758ddb44758878ab833e4677061491dba2628e2`
- Package verdict: **PACKAGE-CONFORMS**
- Catalog verdict: **DEFERRED** — composition performs symlink removals and
  cannot run under the active durable destructive-action policy.

The non-default delta is one deterministic, no-clobber operation that accepts a
YouTube URL or ID, selects caption languages, and emits text or timed formats
with explicit retrieval failures.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| YouTube transcript | `youtube-transcript` | generic web retrieval | Caption-track retrieval wins; page reading and browsing stay generic. |
| YouTube captions or subtitles | `youtube-transcript` | generic media work | Existing timed-text extraction wins; audio transcription stays outside this skill. |
| YouTube URL or video ID plus transcript intent | `youtube-transcript` | `local-http-browser-use` | Direct public-caption retrieval wins; authorized interactive browser work stays with the browser skill. |
| SRT or WebVTT from YouTube | `youtube-transcript` | generic file conversion | Fetching the source caption track wins; conversion of an existing local file stays generic. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | URL parsing, caption-track selection, four stable outputs, and no-clobber writes exceed generic agent behavior. |
| A02 | PASS | Transcript retrieval from shared YouTube references is a repeatable research and content-processing operation. |
| A03 | PASS | The collision matrix separates caption retrieval from browsing, audio transcription, and local conversion. |
| A04 | PASS | Exactly one archetype: leaf. |
| A05 | PASS | `skills/youtube-transcript` matches the unique `name: youtube-transcript`. |
| A06 | PASS | Frontmatter contains only the matching name and one-line description. |
| A07 | PASS | Description is one physical line, two sentences, and 174 characters. |
| A08 | PASS | It begins with a concrete fetch capability and ends with observable URL/ID and transcript signals. |
| A09 | PASS | The collision matrix establishes one first owner per claimed trigger. |
| A10 | PASS | No greedy trigger, persona, or generic media claim appears. |
| A11 | PASS | `SKILL.md` is 55 lines and 2,311 bytes, within leaf limits. |
| A12 | PASS | Active prose is limited to preflight, workflow, hard rules, stops, and output. |
| A13 | N/A | The package has no references. |
| A14 | PASS | The package is 188 lines and 6,599 bytes, within package limits. |
| A15 | DEFERRED | Package prose is non-duplicative; provider/catalog reachability awaits composition. |
| A16 | N/A | Not a mode suite. |
| A17 | N/A | Not a mode suite. |
| A18 | N/A | Not a router. |
| A19 | DEFERRED | Not a router; provider overlay exposure still awaits composition. |
| A20 | PASS | The script declares its dependency and the live smoke resolved the installed API before use; the skill does not mirror upstream API documentation. |
| A21 | PASS | No copied manual, API matrix, or YouTube tutorial is present. |
| A22 | PASS | No volatile package version or provider capability is pinned. |
| A23 | PASS | Secret-term scan found no credential values or secret-bearing URLs. |
| A24 | PASS | Inputs and errors reveal only the supplied reference, caption metadata, and provider failure text. |
| A25 | PASS | All paths are skill-relative or caller-selected; no literal personal-home path appears. |
| A26 | PASS | `uv` is verified live and missing runtime or retrieval capability fails clearly. |
| A27 | PASS | The sole script is referenced, deterministic, no-clobber, and passed help, invalid-input, live text, JSON, SRT, and existing-output smoke runs. |
| A28 | N/A | The package has no assets or provider metadata. |
| A29 | PASS | Rules protect transcript fidelity, provenance limits, access boundaries, and honest failure reporting. |
| A30 | DEFERRED | Canonical-provider parity and unique exposure await safe composition. |
| A31 | DEFERRED | Local paths and no-symlink checks pass; installed views remain absent until safe composition. |
| A32 | PASS | Shape matches the compact retained leaf pattern: a command brain plus one deterministic support script. |
| A33 | N/A | New package; no consolidation or shrink claim. |
| A34 | PASS | The preservation ledger records every qualifying delta and neighboring boundary. |
| A35 | PASS | The skill did not exist at pre-create ref `5758ddb44758878ab833e4677061491dba2628e2`. |

## Preservation ledger

| Delta | Disposition | Owner/path |
| --- | --- | --- |
| YouTube URL and 11-character ID normalization | Kept | `scripts/fetch_transcript.py` |
| Manual-first default track selection and explicit language priority | Kept | `SKILL.md`, `scripts/fetch_transcript.py` |
| Text, JSON, SRT, and WebVTT output | Kept | `scripts/fetch_transcript.py` |
| Existing-output refusal | Kept | `SKILL.md`, `scripts/fetch_transcript.py` |
| Caption provenance and access-boundary rules | Kept | `SKILL.md` |
| Browser-authenticated access and restriction bypass | Excluded | Browser owner or user action; outside public-caption retrieval |
| Audio transcription when captions are missing | Excluded | Distinct speech-to-text capability |
| YouTube API and formatter manual | Dropped | Live installed dependency and primary project documentation are authoritative |

## Validation evidence

```text
PASS: skills/youtube-transcript (leaf)
validate_status=0 skill_smoke_status=0 diff_status=0
fetch_status=0
json_status=0 snippets=6
srt_status=0 lines=26 clobber_status=1
```

The canonical package conforms. Catalog composition remains deferred rather
than conflicting with the safety policy or editing provider farms by hand.
