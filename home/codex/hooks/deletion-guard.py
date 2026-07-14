#!/usr/bin/env python3
"""PreToolUse destructive-action guard for Codex.

Hard-denies permanent deletion AND destructive/irreversible git per the policy
in ~/.codex/AGENTS.md. Removals go to Trash (/usr/bin/trash). Git history,
branches, stashes, and uncommitted work are never destroyed by an agent.

Explicit user override for one invocation: RM_GUARD_ALLOW=1 in the environment
(user action only; agents must not set it).

Deny protocol: prints Claude-compatible hook JSON AND exits 2 so either
convention blocks. Fail-open only on malformed input (never on a match).
"""
import json
import os
import re
import sys

if os.environ.get("RM_GUARD_ALLOW") == "1":
    sys.exit(0)

try:
    payload = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool_name = str(payload.get("tool_name", ""))
tool_input = payload.get("tool_input", {})

# --- MCP filesystem-style delete tools: deny by tool name ---------------------
MCP_DELETE = re.compile(
    r"(?i)(delete|remove|erase|destroy)[-_]?(file|dir|directory|folder|path|item|note|doc|branch)"
    r"|(file|dir|directory|folder|path|item)[-_]?(delete|remove)"
)
if MCP_DELETE.search(tool_name):
    reason = (
        f"BLOCKED by safety policy: tool '{tool_name}' permanently deletes. "
        "All removals must go to Trash (/usr/bin/trash). See ~/.codex/AGENTS.md."
    )
    print(json.dumps({"hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": reason}}))
    print(reason, file=sys.stderr)
    sys.exit(2)


def strings_of(v):
    if isinstance(v, str):
        yield v
    elif isinstance(v, list):
        for x in v:
            yield from strings_of(x)
    elif isinstance(v, dict):
        for x in v.values():
            yield from strings_of(x)


all_text = "\n".join(strings_of(tool_input))

SHELLISH = re.compile(r"(?i)(shell|bash|exec|terminal|command|run|apply_patch|repl)")
is_shellish = bool(SHELLISH.search(tool_name))

PATCH_DELETE = re.compile(r"\*\*\*\s*Delete File\s*:")

G = r"\bgit\b(?:\s+-[^\s]+)*\s+"          # git, tolerating global flags
NOSEP = r"[^\n;|&]*"                      # stay inside one command

PATTERNS = [
    # ---- permanent file deletion -------------------------------------------
    (r"(^|[\s;&|`(])rm\s", "rm"),
    (r"(^|[\s;&|`(])/bin/rm\b", "/bin/rm"),
    (r"\bunlink\b", "unlink"),
    (r"\brmdir\b", "rmdir"),
    (r"\bshred\b", "shred"),
    (r"\btruncate\b" + NOSEP + r"-s\b", "truncate"),
    (r"\bdd\b" + NOSEP + r"\bof=", "dd of="),
    (r"\bfind\b" + NOSEP + r"\s-delete\b", "find -delete"),
    (r"\bfind\b" + NOSEP + r"-exec\s+rm\b", "find -exec rm"),
    (r"\brsync\b[^\n]*--delete", "rsync --delete"),
    (r"\bmv\b" + NOSEP + r"\s/dev/null\b", "mv to /dev/null"),
    (r"\bchmod\b" + NOSEP + r"-R" + NOSEP + r"\b0{3}\b", "chmod -R 000"),
    # ---- destructive git: working tree --------------------------------------
    (G + r"reset\b" + NOSEP + r"(--hard|--merge|--keep)", "git reset --hard/--merge/--keep"),
    (G + r"clean\b", "git clean"),
    (G + r"checkout\b" + NOSEP + r"(-f\b|--force|\s--\s|\s\.\s*$|\s\.\s|\s\*)", "destructive git checkout"),
    (G + r"restore\b", "git restore (discards working-tree changes)"),
    (G + r"rm\b", "git rm"),
    # ---- destructive git: history, branches, stashes, remotes ---------------
    (G + r"push\b" + NOSEP + r"(--force\b|--force-with-lease\b|\s-f\b)", "git push --force"),
    (G + r"branch\b" + NOSEP + r"(-D\b|-d\b" + NOSEP + r"--force)", "git branch -D"),
    (G + r"tag\b" + NOSEP + r"-d\b", "git tag -d"),
    (G + r"stash\b" + NOSEP + r"(drop|clear)\b", "git stash drop/clear"),
    (G + r"reflog\b" + NOSEP + r"(expire|delete)\b", "git reflog expire/delete"),
    (G + r"gc\b" + NOSEP + r"--prune", "git gc --prune"),
    (G + r"(filter-branch|filter-repo)\b", "git history rewrite"),
    (G + r"rebase\b", "git rebase (history rewrite)"),
    (G + r"commit\b" + NOSEP + r"--amend", "git commit --amend"),
    (G + r"update-ref\b" + NOSEP + r"\s-d\b", "git update-ref -d"),
    (G + r"worktree\b" + NOSEP + r"remove\b" + NOSEP + r"(--force|\s-f\b)", "git worktree remove --force"),
    (G + r"submodule\b" + NOSEP + r"deinit\b" + NOSEP + r"(--force|\s-f\b)", "git submodule deinit -f"),
    # ---- script-language deletion APIs --------------------------------------
    (r"os\.(remove|unlink|rmdir|removedirs)\s*\(", "Python os deletion"),
    (r"shutil\.rmtree", "shutil.rmtree"),
    (r"\.unlink\s*\(", "pathlib/Perl-style unlink()"),
    (r"\.rmdir\s*\(", "rmdir()"),
    (r"\bfs(Promises)?\.(promises\.)?(rm|rmSync|rmdir|rmdirSync|unlink|unlinkSync)\b", "Node fs deletion"),
    (r"\brimraf\b", "rimraf"),
    (r"FileUtils\.(rm\w*|remove\w*)\b", "Ruby FileUtils deletion"),
    (r"File\.delete\b", "Ruby File.delete"),
    # ---- infrastructure blast radius ----------------------------------------
    (r"\bdocker\b" + NOSEP + r"\b(system\s+prune|volume\s+rm)\b", "docker prune/volume rm"),
]

hit = None
if PATCH_DELETE.search(all_text):
    hit = "apply_patch Delete File"
elif is_shellish:
    for pat, label in PATTERNS:
        if re.search(pat, all_text):
            hit = label
            break

if hit:
    reason = (
        f"BLOCKED by safety policy ({hit}). Permanent deletion and destructive/"
        "irreversible git are forbidden for agents. Move removals to Trash with "
        "/usr/bin/trash <path>. Never discard uncommitted work, rewrite history, "
        "delete branches/stashes/tags, or force-push. If this operation is truly "
        "required, STOP and ask the user — only the user may perform it or change "
        "the policy in ~/.codex/AGENTS.md. Do not attempt to work around this."
    )
    print(json.dumps({"hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": reason}}))
    print(reason, file=sys.stderr)
    sys.exit(2)

sys.exit(0)
