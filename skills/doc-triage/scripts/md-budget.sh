#!/usr/bin/env bash
# md-budget — allowlist guard for standalone markdown. Deterministic, no LLM.
# CI mode (default): exits 1 on violation. Hook mode: MD_BUDGET_ADVISORY=1
# prints and exits 0 (pair with pre-push).
# Allowlist lives in .md-allowlist (one glob per line, # comments ok).

set -u
ADVISORY="${MD_BUDGET_ADVISORY:-0}"
LIST_FILE="${MD_ALLOWLIST:-.md-allowlist}"

# Default allowlist if none present:
DEFAULT_ALLOW='README.md
CLAUDE.md
AGENTS.md
TODO.md
docs/adr/[0-9]*-*.md
docs/archive/**
design/**
.reports/**'

ALLOW="$( [ -f "$LIST_FILE" ] && grep -v '^#' "$LIST_FILE" || printf '%s' "$DEFAULT_ALLOW" )"

VIOLATIONS=""
while IFS= read -r f; do
  ok=0
  while IFS= read -r pat; do
    [ -z "$pat" ] && continue
    case "$f" in $pat) ok=1; break ;; esac
  done <<EOF
$ALLOW
EOF
  [ "$ok" -eq 0 ] && VIOLATIONS="$VIOLATIONS$f\n"
done <<EOF2
$(git ls-files '*.md' | grep -v -E '(^|/)node_modules/')
EOF2

if [ -n "$VIOLATIONS" ]; then
  echo "md-budget: standalone markdown outside the allowlist:"
  printf "$VIOLATIONS" | sed 's/^/  /'
  echo "Convert (doc comments / ADR / archive) or add to $LIST_FILE with justification."
  [ "$ADVISORY" = "1" ] && exit 0
  exit 1
fi
exit 0
