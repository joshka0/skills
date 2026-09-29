#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["youtube-transcript-api"]
# ///
"""Fetch one public YouTube caption track without overwriting files."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import YouTubeTranscriptApiException
from youtube_transcript_api.formatters import (
    JSONFormatter,
    SRTFormatter,
    TextFormatter,
    WebVTTFormatter,
)

VIDEO_ID = re.compile(r"^[A-Za-z0-9_-]{11}$")


def video_id_from(reference: str) -> str:
    candidate = reference.strip()
    if VIDEO_ID.fullmatch(candidate):
        return candidate

    parsed = urlparse(candidate if "://" in candidate else f"https://{candidate}")
    host = (parsed.hostname or "").lower()
    video_id = ""
    if host in {"youtu.be", "www.youtu.be"}:
        video_id = parsed.path.strip("/").split("/", 1)[0]
    elif host == "youtube.com" or host.endswith(".youtube.com"):
        if parsed.path == "/watch":
            video_id = parse_qs(parsed.query).get("v", [""])[0]
        else:
            parts = parsed.path.strip("/").split("/")
            if len(parts) >= 2 and parts[0] in {"embed", "live", "shorts"}:
                video_id = parts[1]

    if not VIDEO_ID.fullmatch(video_id):
        raise ValueError("expected an 11-character YouTube video ID or video URL")
    return video_id


def parser() -> argparse.ArgumentParser:
    result = argparse.ArgumentParser(description=__doc__)
    result.add_argument("video", help="YouTube video URL or 11-character ID")
    result.add_argument(
        "--languages",
        help="comma-separated language codes in priority order, for example sv,en",
    )
    result.add_argument(
        "--format",
        choices=("text", "json", "srt", "vtt"),
        default="text",
        help="output format (default: text)",
    )
    result.add_argument("--output", type=Path, help="write to a new file instead of stdout")
    result.add_argument(
        "--list-languages",
        action="store_true",
        help="list available tracks without fetching one",
    )
    return result


def language_codes(value: str | None) -> list[str] | None:
    if value is None:
        return None
    codes = [code.strip() for code in value.split(",") if code.strip()]
    if not codes:
        raise ValueError("--languages must contain at least one language code")
    return codes


def write_output(content: str, output: Path | None) -> None:
    rendered = content if content.endswith("\n") else content + "\n"
    if output is None:
        sys.stdout.write(rendered)
        return
    with output.open("x", encoding="utf-8") as destination:
        destination.write(rendered)


def main() -> int:
    args = parser().parse_args()
    try:
        video_id = video_id_from(args.video)
        languages = language_codes(args.languages)
        api = YouTubeTranscriptApi()

        if args.list_languages:
            tracks = list(api.list(video_id))
            lines = [
                "\t".join(
                    (
                        track.language_code,
                        track.language,
                        "generated" if track.is_generated else "manual",
                        "translatable" if track.is_translatable else "not-translatable",
                    )
                )
                for track in tracks
            ]
            write_output("\n".join(lines), args.output)
            return 0

        transcript = (
            api.fetch(video_id, languages=languages)
            if languages
            else next(iter(api.list(video_id))).fetch()
        )
        formatters = {
            "text": TextFormatter(),
            "json": JSONFormatter(),
            "srt": SRTFormatter(),
            "vtt": WebVTTFormatter(),
        }
        write_output(formatters[args.format].format_transcript(transcript), args.output)
        return 0
    except (ValueError, StopIteration, YouTubeTranscriptApiException, OSError) as error:
        print(f"error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
