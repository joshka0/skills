#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROVIDER=""
APPLY=0
BUNDLES="core"

usage() {
  cat <<EOF
Usage: $(basename "$0") --provider <name> [--bundles core,release] [--full] [--apply]

Compose a live provider overlay from bundle directories:
  bundles/<provider>/<bundle>

Examples:
  $(basename "$0") --provider claude --bundles core
  $(basename "$0") --provider gemini --full --apply
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --provider)
      PROVIDER="${2:-}"
      shift 2
      ;;
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

if [[ -z "$PROVIDER" ]]; then
  usage >&2
  exit 2
fi

TARGET="$ROOT/providers/$PROVIDER"
if [[ ! -d "$TARGET" ]]; then
  echo "ERROR: provider overlay missing: $TARGET" >&2
  exit 1
fi

if [[ "$BUNDLES" == "full" ]]; then
  known_bundles=(core release infra aliases)
  BUNDLES=""
  for bundle in "${known_bundles[@]}"; do
    if [[ -d "$ROOT/bundles/${PROVIDER}/${bundle}" ]]; then
      [[ -n "$BUNDLES" ]] && BUNDLES+=","
      BUNDLES+="$bundle"
    fi
  done
fi

IFS=',' read -r -a bundle_list <<<"$BUNDLES"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

declare -A seen=()
for bundle in "${bundle_list[@]}"; do
  bundle="${bundle// /}"
  [[ -n "$bundle" ]] || continue
  bundle_dir="$ROOT/bundles/${PROVIDER}/${bundle}"
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
    if [[ -L "$path" ]]; then
      ln -s "$(readlink "$path")" "$tmpdir/$name"
    else
      cp -a "$path" "$tmpdir/$name"
    fi
  done < <(find "$bundle_dir" -mindepth 1 -maxdepth 1 -print0 | sort -z)
done

count="$(find "$tmpdir" -mindepth 1 -maxdepth 1 | wc -l | tr -d ' ')"
echo "Provider: $PROVIDER"
echo "Bundles: $BUNDLES"
echo "Resulting entries: $count"
find "$tmpdir" -mindepth 1 -maxdepth 1 -exec basename {} \; | sort

if [[ "$APPLY" != "1" ]]; then
  echo
  echo "Dry run only. Re-run with --apply to rewrite $TARGET."
  exit 0
fi

find "$TARGET" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
while IFS= read -r -d '' path; do
  name="$(basename "$path")"
  mv "$path" "$TARGET/$name"
done < <(find "$tmpdir" -mindepth 1 -maxdepth 1 -print0)

echo
echo "Updated $TARGET"
