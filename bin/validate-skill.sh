#!/bin/sh
# Validate skill metadata and static local references; semantic routing is reviewed separately.
set -eu
[ "$#" -eq 1 ] || { echo "Usage: $0 <skill-directory>" >&2; exit 1; }
repo_root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)

ruby -ryaml -rpathname -ruri - "$1" "$repo_root" <<'RUBY'
def fail_check(message)
  abort "FAIL: #{message}"
end

def metadata(file)
  text = File.read(file)
  match = text.match(/\A---\r?\n(.*?)\r?\n---(?:\r?\n|\z)/m)
  fail_check("missing frontmatter: #{file}") unless match
  YAML.safe_load(match[1])
rescue Psych::Exception
  fail_check("invalid YAML frontmatter: #{file}")
end

dir = Pathname.new(ARGV[0]).expand_path
repo = Pathname.new(ARGV[1])
entry = dir.join("SKILL.md")
fail_check("missing SKILL.md: #{dir}") unless entry.file?
data = metadata(entry)
fail_check("frontmatter must be a mapping") unless data.is_a?(Hash)
name = data["name"]
unless name.is_a?(String) && name.match?(/\A[a-z0-9]+(?:-[a-z0-9]+)*\z/) &&
       name == dir.basename.to_s
  fail_check("name must match the kebab-case directory")
end
unless data["description"].is_a?(String) && !data["description"].strip.empty?
  fail_check("description must be a non-empty string")
end

Dir.glob(repo.join("{skills,native}/**/SKILL.md").to_s).each do |other|
  next if File.realpath(other) == entry.realpath.to_s
  candidate = metadata(other)
  fail_check("duplicate name: #{name}") if candidate.is_a?(Hash) && candidate["name"] == name
end

Dir.glob(dir.join("**/*").to_s, File::FNM_DOTMATCH).each do |file|
  fail_check("symlink inside package: #{file}") if File.symlink?(file)
  next unless File.file?(file) && File.extname(file) == ".md"
  text = File.read(file)
  fail_check("literal personal-home path: #{file}") if text.match?(%r{/Users/[^ /]+|/home/[^ /]+})
  links = text.scan(/\]\(([^)\n]+)\)/).flatten.map { |target| [Pathname.new(file).dirname, target] }
  links += text.scan(/^\s*\[[^\]]+\]:\s+<?([^\s>]+)>?/).flatten.map { |target| [Pathname.new(file).dirname, target] }
  links += text.scan(/`((?:references|scripts|assets)\/[^\s`<>{}]+)`/).flatten.map { |target| [dir, target] }
  links.each do |base, raw|
    target = raw.strip
    target = target[1...-1] if target.start_with?("<") && target.end_with?(">")
    next if target.match?(/\A[a-z][a-z0-9+.-]*:/i) || target.start_with?("#")
    next if target.match?(/[<>{}$*]/)
    target = URI::DEFAULT_PARSER.unescape(target.split("#", 2).first.to_s)
    next if target.empty?
    fail_check("missing local reference #{target}: #{file}") unless base.join(target).exist?
  end
end
puts "PASS: #{ARGV[0]} (description #{data["description"].length} characters)"
RUBY
