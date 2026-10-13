"""Cut fillers and pauses, burn word-synced captions and a hook line, normalize loudness.

usage: python3 tiktok_edit.py <video> <words.json> <out.mp4> "<hook text>" [--keep-gap 0.35] [--hook-y 300] [--captions]
--hook-y sets the top of the 300 px hook band. Keep it at 300..1140 (TikTok UI covers y<300 and y>1440)
and clear of the clip's own burned-in captions: check a frame first.
Source clips already carry burned-in captions, so extra captions are off unless --captions.
words.json: mai-transcribe verbose_json with timestamp_granularities ["word", "segment"].
"""
import json, re, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

FILLERS = {"um", "uh", "erm", "ah", "uhm", "hmm"}
FONT = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
W, H = 1080, 1920
PAD_IN, PAD_OUT = 0.06, 0.14


def norm(word):
    return re.sub(r"[^a-z']", "", word.lower())


def caption_text(word):
    return re.sub(r"\bPraise\b", "Praize", word)


def spans(words, duration, keep_gap):
    """Merge kept words into continuous spans; drop fillers and long pauses."""
    kept = [w for w in words if norm(w["word"]) not in FILLERS]
    out = []
    for w in kept:
        s, e = max(0.0, w["start"] - PAD_IN), min(duration, w["end"] + PAD_OUT)
        if out and s - out[-1][1] <= keep_gap:
            out[-1][1] = max(out[-1][1], e)
        else:
            out.append([s, e])
    return kept, out


def remap(t, segs):
    """Source time -> edited time."""
    acc = 0.0
    for s, e in segs:
        if t < s:
            return acc
        if t <= e:
            return acc + (t - s)
        acc += e - s
    return acc


def chunks(words, max_words=3, max_chars=16):
    group = []
    for w in words:
        group.append(w)
        text = " ".join(caption_text(x["word"]) for x in group)
        if len(group) >= max_words or len(text) >= max_chars or re.search(r"[.,!?]$", w["word"]):
            yield group
            group = []
    if group:
        yield group


def render(text, path, size, y_box):
    img = Image.new("RGBA", (W, y_box), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT, size)
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=font) > W - 140 and line:
            lines.append(line)
            line = word
        else:
            line = trial
    lines.append(line)
    y = (y_box - len(lines) * int(size * 1.15)) // 2
    for ln in lines:
        x = (W - draw.textlength(ln, font=font)) // 2
        draw.text((x, y), ln, font=font, fill="white", stroke_width=max(4, size // 12), stroke_fill="black")
        y += int(size * 1.15)
    img.save(path)


def main():
    video, words_path, out, hook = sys.argv[1:5]
    keep_gap = float(sys.argv[sys.argv.index("--keep-gap") + 1]) if "--keep-gap" in sys.argv else 0.35
    data = json.load(open(words_path))
    duration = float(data.get("duration") or data["words"][-1]["end"])
    kept, segs = spans(data["words"], duration, keep_gap)
    hook_y = int(sys.argv[sys.argv.index("--hook-y") + 1]) if "--hook-y" in sys.argv else 300
    if not 300 <= hook_y <= 1140:
        sys.exit("--hook-y must be 300..1140 to stay inside the TikTok safe zone")
    with tempfile.TemporaryDirectory(prefix="ttedit-") as t:
        edit(video, data, kept, segs, duration, Path(t), out, hook, hook_y)


def edit(video, data, kept, segs, duration, tmp, out, hook, hook_y):

    # Pass 1: cut, scale to 1080x1920, normalize loudness.
    parts = "".join(
        f"[0:v]trim={s:.3f}:{e:.3f},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={s:.3f}:{e:.3f},asetpts=PTS-STARTPTS[a{i}];"
        for i, (s, e) in enumerate(segs)
    )
    cat = "".join(f"[v{i}][a{i}]" for i in range(len(segs)))
    fc = (parts + f"{cat}concat=n={len(segs)}:v=1:a=1[vc][ac];"
          f"[vc]scale={W}:{H}:force_original_aspect_ratio=decrease,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1[vo];"
          "[ac]loudnorm=I=-14:TP=-1.5:LRA=11[ao]")
    cut = tmp / "cut.mp4"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", video, "-filter_complex", fc,
                    "-map", "[vo]", "-map", "[ao]", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
                    "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-ar", "48000", str(cut)], check=True)

    # Pass 2: overlay caption chunks and the hook.
    overlays = []  # (png, x, y, start, end)
    hook_png = tmp / "hook.png"
    render(hook, hook_png, 66, 300)
    # Keep text out of TikTok's UI: below the top 300 px, above the bottom 25% (y 1440).
    overlays.append((hook_png, 0, hook_y, 0.0, 2.2))
    groups = list(chunks(kept)) if "--captions" in sys.argv else []
    for i, g in enumerate(groups):
        start = remap(g[0]["start"], segs)
        end = remap(groups[i + 1][0]["start"], segs) if i + 1 < len(groups) else remap(g[-1]["end"], segs) + 0.3
        png = tmp / f"c{i:03d}.png"
        render(" ".join(caption_text(w["word"]) for w in g).upper(), png, 92, 360)
        overlays.append((png, 0, 1060, start, end))
    inputs, chain, last = [], "", "0:v"
    for i, (png, x, y, s, e) in enumerate(overlays, start=1):
        inputs += ["-i", str(png)]
        chain += f"[{last}][{i}:v]overlay={x}:{y}:enable='between(t,{s:.3f},{e:.3f})'[o{i}];"
        last = f"o{i}"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(cut), *inputs,
                    "-filter_complex", chain.rstrip(";"), "-map", f"[{last}]", "-map", "0:a",
                    "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
                    "-c:a", "copy", "-movflags", "+faststart", out], check=True)
    print(f"spans={len(segs)} kept_words={len(kept)}/{len(data['words'])} "
          f"edited={sum(e - s for s, e in segs):.1f}s source={duration:.1f}s captions={len(groups)} hook_y={hook_y}")


if __name__ == "__main__":
    main()
