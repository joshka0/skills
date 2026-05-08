#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="$ROOT/providers/codex"
DEFAULT_BUNDLES="core"
APPLY=0
BUNDLES="$DEFAULT_BUNDLES"

usage() {
  cat <<EOF
Usage: $(basename "$0") [--bundles core,infra,release,aliases] [--full] [--apply]

Compose the live Codex skills overlay at:
  $TARGET

Available bundles:
  core     Default day-to-day skills
  infra    Kubernetes and Terraform family
  release  Apple/Android readiness packs
  aliases  Compatibility alias names and broad umbrella skills
  full     Shorthand for core,infra,release,aliases

Default mode is dry-run. Use --apply to rewrite providers/codex.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --bundles)
      BUNDLES="${2:-}"
      shift 2
      ;;
    --full)
      BUNDLES="full"
      shift
      ;;
    --apply)
      APPLY=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage >&2
      exit 2
      ;;
  esac
done

if [[ "$BUNDLES" == "full" ]]; then
  BUNDLES="core,infra,release,aliases"
fi

IFS=',' read -r -a bundle_list <<<"$BUNDLES"

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

copy_entry() {
  local src="$1"
  local dst="$2"

  if [[ -d "$src" ]]; then
    mkdir -p "$dst"
    cp -R -L "$src"/. "$dst"/
  else
    cp -L "$src" "$dst"
  fi
}

copy_entry "$TARGET/.system" "$tmpdir/.system"

# Preserve .routed symlink if it exists (points to ../codex-routed).
if [[ -L "$TARGET/.routed" ]]; then
  cp -a "$TARGET/.routed" "$tmpdir/.routed"
fi

declare -A seen=()
for bundle in "${bundle_list[@]}"; do
  bundle="${bundle// /}"
  [[ -n "$bundle" ]] || continue
  bundle_dir="$ROOT/bundles/codex/$bundle"
  if [[ ! -d "$bundle_dir" ]]; then
    echo "ERROR: missing bundle directory: $bundle_dir" >&2
    exit 1
  fi
  while IFS= read -r -d '' path; do
    name="$(basename "$path")"
    if [[ -n "${seen[$name]:-}" ]]; then
      continue
    fi
    seen["$name"]=1
    copy_entry "$path" "$tmpdir/$name"
  done < <(find "$bundle_dir" -mindepth 1 -maxdepth 1 ! -name '.system' -print0 | sort -z)
done

count="$(find "$tmpdir" -mindepth 1 -maxdepth 1 | wc -l | tr -d ' ')"
echo "Bundles: $BUNDLES"
echo "Resulting Codex overlay entries: $count"
find "$tmpdir" -mindepth 1 -maxdepth 1 -exec basename {} \; | sort

if [[ "$APPLY" != "1" ]]; then
  echo
  echo "Dry run only. Re-run with --apply to rewrite $TARGET."
  exit 0
fi

find "$TARGET" -mindepth 1 -maxdepth 1 ! -name '.system' ! -name '.routed' -exec rm -rf {} +
while IFS= read -r -d '' path; do
  name="$(basename "$path")"
  if [[ "$name" == ".system" || "$name" == ".routed" ]]; then
    continue
  fi
  mv "$path" "$TARGET/$name"
done < <(find "$tmpdir" -mindepth 1 -maxdepth 1 ! -name '.system' ! -name '.routed' -print0)

echo
echo "Updated $TARGET"
