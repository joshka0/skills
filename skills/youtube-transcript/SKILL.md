---
name: youtube-transcript
description: "Fetch an existing YouTube caption track as text, JSON, SRT, or WebVTT. Use when the user gives a YouTube URL or video ID and wants its transcript, captions, or subtitles."
---

# YouTube transcript

From this skill's directory (requires `uv`):

```sh
uv run scripts/fetch_transcript.py '<url-or-id>'                 # plain text, first available track
uv run scripts/fetch_transcript.py '<url-or-id>' --list-languages
uv run scripts/fetch_transcript.py '<url-or-id>' --languages sv,en --format json|srt|vtt --output <new-path>
```

- The script fetches existing captions. It does not transcribe audio. No captions does not mean no speech.
- `--output` refuses to overwrite a file. Quote the URL as one argument.
- Return the fetched wording unchanged unless the user asks for cleanup or a summary. Note that auto-generated captions can contain errors.
- If a language is missing, run `--list-languages` and offer the available ones. Disabled captions, a restricted video, or a YouTube block are terminal. Report the error, and never try to get around the restriction.
