#!/usr/bin/env bash
# doc-sweep — weekly full drift + archaeology sweep across living docs.
# Run via cron/launchd/systemd-timer or scheduled CI, per repo:
#   doc-sweep.sh /path/to/repo
# Dead-man's-switch: writes a status line even on failure; wire your morning
# surface (or a second cron) to alert if STATUS file is stale > 8 days.

set -u

REPO="${1:?usage: doc-sweep.sh <repo-path>}"
cd "$REPO" || exit 1

# SWEEP_MODEL empty = the CLI's default model. This is a judgment task:
# never a Sonnet- or Haiku-tier model (house rule: Opus by default).
SWEEP_MODEL="${SWEEP_MODEL:-}"
SWEEP_TIMEOUT="${SWEEP_TIMEOUT:-600}"
OUT_DIR="${SWEEP_OUT_DIR:-$HOME/.config/doc-sweep}"
REPO_NAME="$(basename "$REPO")"
STAMP="$(date +%Y-%m-%d)"
REPORT="$OUT_DIR/$REPO_NAME-$STAMP.md"
STATUS="$OUT_DIR/$REPO_NAME.status"
mkdir -p "$OUT_DIR"

fail() { echo "$STAMP FAIL: $1" > "$STATUS"; echo "doc-sweep FAIL: $1" >&2; exit 1; }

command -v claude >/dev/null 2>&1 || fail "claude CLI not found"
git -C "$REPO" rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "not a git repo"

LIVING="$(ls README.md 2>/dev/null; ls docs/adr/*.md 2>/dev/null; ls docs/*.md 2>/dev/null | grep -v '^docs/archive' || true)"
DESIGN="$(ls design/*.md 2>/dev/null || true)"

timeout "$SWEEP_TIMEOUT" claude -p "$(cat <<EOF
Full documentation sweep for this repository. Two tasks; be concrete, cite
files; no praise, no summaries of what is fine.

TASK 1 — DRIFT. Living docs claimed current:
${LIVING:-<none>}
For each, check its claims against the current code (read the modules it
references; compare signatures, concept names, described behavior). Report
each contradiction as:
  DRIFT | <doc> | <claim> | contradicted by <source file/symbol>

TASK 2 — ARCHAEOLOGY LEAK. Design-phase docs (non-authoritative):
${DESIGN:-<none>}
For each, determine whether it describes something that has since shipped
(the code it sketches now exists in src). If so:
  CONVERT | <design doc> | ships as <module(s)> | route: adr|doc-comments|archive

End with exactly one line:
  SWEEP: CLEAN
or
  SWEEP: N findings
EOF
)" --allowedTools "Read,Grep,Glob" ${SWEEP_MODEL:+--model "$SWEEP_MODEL"} > "$REPORT" 2>/dev/null \
  || fail "claude run failed or timed out"

grep -qE '^SWEEP: ' "$REPORT" || fail "no verdict line in report"

VERDICT="$(grep -E '^SWEEP: ' "$REPORT" | tail -1)"
echo "$STAMP OK: $VERDICT" > "$STATUS"

# Surface findings where you'll see them:
if ! grep -q '^SWEEP: CLEAN' "$REPORT"; then
  if command -v gh >/dev/null 2>&1 && [ "${SWEEP_FILE_ISSUE:-0}" = "1" ]; then
    gh issue create --title "doc-sweep $STAMP: $VERDICT" \
      --body-file "$REPORT" --label documentation 2>/dev/null || true
  fi
  echo "doc-sweep: $VERDICT — $REPORT"
else
  echo "doc-sweep: clean ($REPO_NAME)"
fi
