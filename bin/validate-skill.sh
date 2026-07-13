#!/bin/sh
# Usage: validate-skill.sh <skill_dir> <archetype>
# archetype: leaf | private-leaf | suite | router | interaction
# Mechanical gate from shared/general/skill-authoring/references/.
set -eu

skill_dir="${1:?skill dir}"; archetype="${2:?leaf|private-leaf|suite|router|interaction}"
skill_file="$skill_dir/SKILL.md"
fail() { echo "FAIL: $*" >&2; exit 1; }

case "$archetype" in
  leaf|suite|interaction) max_lines=120; max_bytes=10240; max_desc=220 ;;
  private-leaf)           max_lines=160; max_bytes=12288; max_desc=220 ;;
  router)                 max_lines=80;  max_bytes=6144;  max_desc=320 ;;
  *) fail "unknown archetype $archetype" ;;
esac
if [ "$archetype" = suite ]; then max_desc=320; fi

test -f "$skill_file" || fail "missing SKILL.md"

# Frontmatter shape.
rg -q '^name: [a-z0-9]+(-[a-z0-9]+)*$' "$skill_file" || fail "name not kebab-case"
rg -q '^description: .+' "$skill_file" || fail "description missing or not one physical line"
if rg -q '^description:[[:space:]]*["'\'']?[>|]' "$skill_file"; then fail "folded/literal description block"; fi
desc_len=$(sed -n 's/^description:[[:space:]]*//p' "$skill_file" | head -1 | wc -c | tr -d ' ')
[ "$desc_len" -le "$max_desc" ] || fail "description $desc_len chars > $max_desc"

# Active-file budgets.
[ "$(wc -l < "$skill_file")" -le "$max_lines" ] || fail "SKILL.md over $max_lines lines"
[ "$(wc -c < "$skill_file")" -le "$max_bytes" ] || fail "SKILL.md over $max_bytes bytes"

# Per-reference and package-total budgets (all text files, licenses excluded).
for ref in "$skill_dir"/references/*.md; do
  [ -e "$ref" ] || break
  [ "$(wc -l < "$ref")" -le 250 ] || fail "reference over 250 lines: $ref"
done
total=$(find "$skill_dir" -type f \( -name '*.md' -o -name '*.txt' -o -name '*.toml' -o -name '*.yaml' -o -name '*.yml' -o -name '*.sh' \) ! -iname 'license*' -exec cat {} + | wc -l | tr -d ' ')
[ "$total" -le 800 ] || echo "WARN: package total $total lines (>800; only a documented consolidated owner may reach 1200)" >&2
[ "$total" -le 1200 ] || fail "package total $total lines > 1200"

# Portable paths and prose smells.
if rg -q '/Users/[^ <]+|/home/[^ <]+' "$skill_dir"; then fail "literal home path"; fi
if rg -qi 'remember:?[[:space:]]+you are|mandatory[[:space:]]+preparation|you are an expert|IMPORTANT:|CRITICAL:' "$skill_dir"; then fail "banned prose construct"; fi

# Unique canonical name within shared/.
name="$(sed -n 's/^name:[[:space:]]*//p' "$skill_file" | head -1)"
[ "$(rg -l "^name: ${name}$" shared -g 'SKILL.md' | wc -l | tr -d ' ')" -eq 1 ] || fail "duplicate name in shared/"

# Repo portability.
[ -z "$(find . -type l -print -quit)" ] || fail "repo-internal symlink present"

echo "PASS: $skill_dir ($archetype)"
