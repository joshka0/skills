#!/bin/sh
set -eu

command -v jq >/dev/null 2>&1 || {
  echo "BLOCKED: guardrail prerequisite jq is unavailable" >&2
  exit 2
}

input=$(cat)
command=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')

case "$command" in
  *"git push"*|*"git reset --hard"*|*"git clean -f"*|*"git branch -D"*|*"git checkout ."*|*"git restore ."*|*"push --force"*)
    echo "BLOCKED: destructive Git invocation requires explicit user action" >&2
    exit 2
    ;;
esac

exit 0
