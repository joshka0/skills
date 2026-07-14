#!/usr/bin/env python3
"""PostToolUse audit trail for Codex.

PreToolUse (deletion-guard.py) is the enforcement layer; this is the detection
layer. It cannot block — it records every state-mutating command an agent ran so
a later "what destroyed my work?" question has an answer.

Log: ~/.codex/logs/mutation-audit.log (append-only, one JSON line per event).
Never writes command output (may contain secrets) — only the command itself,
tool name, cwd, and timestamp.
"""
import json
import os
import re
import sys
import time

LOG_DIR = os.path.expanduser("~/.codex/logs")
LOG = os.path.join(LOG_DIR, "mutation-audit.log")

try:
    payload = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool_name = str(payload.get("tool_name", ""))
tool_input = payload.get("tool_input", {})


def strings_of(v):
    if isinstance(v, str):
        yield v
    elif isinstance(v, list):
        for x in v:
            yield from strings_of(x)
    elif isinstance(v, dict):
        for x in v.values():
            yield from strings_of(x)


text = "\n".join(strings_of(tool_input))

# Anything that changes state: git mutations, file writes/moves, package ops.
MUTATING = re.compile(
    r"(?i)\bgit\b\s+(reset|checkout|restore|clean|rm|stash|branch|tag|push|merge|rebase|commit|"
    r"cherry-pick|revert|worktree|filter-branch|filter-repo|reflog|gc|update-ref|submodule)\b"
    r"|\b(rm|mv|cp|truncate|dd|shred|chmod|chown|trash)\b"
    r"|\b(npm|pnpm|yarn|brew|pip3?|cargo)\b\s+(uninstall|remove|prune)\b"
    r"|\bdocker\b\s+(rm|rmi|prune|system)\b"
)

if not MUTATING.search(text):
    sys.exit(0)

record = {
    "ts": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
    "tool": tool_name,
    "cwd": payload.get("cwd") or os.getcwd(),
    "command": text[:800],
    "session": payload.get("session_id", ""),
}

try:
    os.makedirs(LOG_DIR, exist_ok=True)
    with open(LOG, "a") as fh:
        fh.write(json.dumps(record) + "\n")
except Exception:
    pass

sys.exit(0)
