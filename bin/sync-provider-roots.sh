#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APPLY=0
TIMESTAMP="$(date +%Y%m%d%H%M%S)"

usage() {
  cat <<EOF
Usage: $(basename "$0") [--apply]

Repoint active skill roots to /Users/joshka/repos/skills provider overlays.

Default mode is dry-run. Use --apply to make changes.
OpenCode is intentionally excluded until its canonical root is decided.
EOF
}

case "${1:-}" in
  --apply)
    APPLY=1
    ;;
  -h|--help)
    usage
    exit 0
    ;;
  "")
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac

providers=(
  "codex:$HOME/.codex/skills:$ROOT/providers/codex"
  "agents:$HOME/.agents/skills:$ROOT/providers/agents"
  "factory:$HOME/.factory/skills:$ROOT/providers/factory"
  "claude:$HOME/.claude/skills:$ROOT/providers/claude"
  "gemini:$HOME/.gemini/skills:$ROOT/providers/gemini"
  "gemini-antigravity:$HOME/.gemini/antigravity/skills:$ROOT/providers/gemini-antigravity"
)

for spec in "${providers[@]}"; do
  IFS=: read -r name target source <<<"$spec"

  if [[ ! -d "$source" ]]; then
    echo "ERROR: provider overlay missing for $name: $source" >&2
    exit 1
  fi

  if [[ -L "$target" ]]; then
    current="$(readlink "$target")"
    if [[ "$current" == "$source" ]]; then
      echo "OK $name: $target already points to $source"
      continue
    fi
    backup="${target}.backup-${TIMESTAMP}"
    echo "REPOINT $name: symlink $target -> $current will move to $backup, then point to $source"
  elif [[ -e "$target" ]]; then
    backup="${target}.backup-${TIMESTAMP}"
    echo "REPOINT $name: existing path $target will move to $backup, then point to $source"
  else
    backup=""
    echo "CREATE $name: $target -> $source"
  fi

  if [[ "$APPLY" != "1" ]]; then
    continue
  fi

  mkdir -p "$(dirname "$target")"
  if [[ -n "$backup" ]]; then
    mv "$target" "$backup"
  fi
  ln -s "$source" "$target"
done

if [[ "$APPLY" != "1" ]]; then
  echo
  echo "Dry run only. Re-run with --apply to make these changes."
fi
