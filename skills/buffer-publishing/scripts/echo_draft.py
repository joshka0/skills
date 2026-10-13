"""Build an Echo request from voice samples plus a brief, call Echo, print the text.

usage: python3 -I echo_draft.py <brief.txt> <persona> <out.txt>
Needs ECHO_KEY in the environment (never printed).
"""
import json, os, pathlib, sys, urllib.request

V = pathlib.Path.home() / "repos/skills/skills/buffer-publishing/references/voice"
brief, persona, out = pathlib.Path(sys.argv[1]).read_text(), sys.argv[2], sys.argv[3]


def body(p):
    return "\n".join(l for l in p.read_text().splitlines()[3:])  # drop the file header lines


samples = [body(V / "essay-demo.md"), body(V / "essay-bus-stop.md").split("3. The barbell")[0], body(V / "transcripts.md")]
content = (
    "Here are some of my posts and video transcripts, so you know how I write and talk:\n"
    + "".join(f"<post>\n{s}\n</post>\n" for s in samples)
    + "\nNow write a new post. Do not reuse sentences from the samples.\n\n"
    + brief
)
req = {"model": "echo", "persona": persona, "reasoning_effort": "medium", "max_tokens": 6000,
       "messages": [{"role": "user", "content": content}]}
r = urllib.request.Request("https://echo.fulcrum.inc/api/v1/chat/completions", data=json.dumps(req).encode(),
                           headers={"Content-Type": "application/json", "Authorization": "Bearer " + os.environ["ECHO_KEY"]})
import time, urllib.error
for attempt in range(4):
    try:
        with urllib.request.urlopen(r, timeout=300) as resp:
            text = json.loads(resp.read())["choices"][0]["message"]["content"]
        break
    except urllib.error.HTTPError as e:
        print(f"{persona}: HTTP {e.code} {e.read()[:300]!r}", file=sys.stderr)
        if e.code not in (429, 503) or attempt == 3:
            sys.exit(1)
        time.sleep(20 * (attempt + 1))
pathlib.Path(out).write_text(text.strip() + "\n")
print(f"== {persona} -> {out}\n{text.strip()}\n")
