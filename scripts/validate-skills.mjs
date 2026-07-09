#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const manifestPath = "manifests/skills.jsonl"
const aliasesPath = "manifests/aliases.json"
const allowedPriorities = new Set(["default", "specialist", "user-invocable-only"])
const allowedStatuses = new Set(["active-source", "specialist-source", "user-invocable-only"])
const allowedAliasStatuses = new Set([
  "canonical",
  "alias",
  "reference-or-mode",
  "merged-or-legacy",
  "archive-only",
  "vendor-source",
  "generated-output",
  "system-installed",
  "needs-human-review"
])
const excludedRootPrefixes = [
  "archive/",
  "bundles/",
  "providers/",
  "providers-current/",
  "mirrors/",
  "loose/",
  "packs/",
  "reports/"
]
const absolutePathAllowlist = new Set([
  "shared/general/local-dev/references/proxy.md",
  "shared/general/local-dev/references/secrets.md",
  "shared/general/skill-authoring/references/validation.md"
])

const errors = []
const warnings = []

function rel(p) {
  return path.relative(ROOT, p).split(path.sep).join("/")
}

function exists(p) {
  return fs.existsSync(path.join(ROOT, p))
}

function walk(dir, predicate = () => true) {
  const rootPath = path.join(ROOT, dir)
  if (!fs.existsSync(rootPath)) return []
  const out = []
  const stack = [rootPath]
  while (stack.length > 0) {
    const current = stack.pop()
    for (const ent of fs.readdirSync(current, { withFileTypes: true })) {
      const p = path.join(current, ent.name)
      if (rel(p).startsWith(".git/")) continue
      if (ent.isSymbolicLink()) {
        if (predicate(p, ent)) out.push(p)
        continue
      }
      if (ent.isDirectory()) stack.push(p)
      if (predicate(p, ent)) out.push(p)
    }
  }
  return out
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {}
  const end = text.indexOf("\n---", 3)
  if (end === -1) return {}
  const lines = text.slice(3, end).split(/\r?\n/)
  const out = {}
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!match) continue
    const key = match[1]
    let value = match[2].trim()
    if ([">-", ">", "|-", "|"].includes(value)) {
      const parts = []
      while (i + 1 < lines.length && /^(\s+|$)/.test(lines[i + 1])) {
        i += 1
        parts.push(lines[i].trim())
      }
      value = parts.join(" ").replace(/\s+/g, " ").trim()
    } else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
  }
  return out
}

function readJsonl(file) {
  if (!exists(file)) {
    errors.push(`missing manifest: ${file}`)
    return []
  }
  return fs.readFileSync(path.join(ROOT, file), "utf8")
    .split(/\r?\n/)
    .map((line, index) => ({ line, index: index + 1 }))
    .filter(({ line }) => line.trim().length > 0)
    .map(({ line, index }) => {
      try {
        return JSON.parse(line)
      } catch (err) {
        errors.push(`${file}:${index} invalid JSON: ${err.message}`)
        return null
      }
    })
    .filter(Boolean)
}

function isExcludedPath(p) {
  return excludedRootPrefixes.some((prefix) => p.startsWith(prefix)) ||
    p.includes("/.routed/") ||
    p.includes("/.system/")
}

function checkManifestRows(rows) {
  const required = ["name", "path", "category", "priority", "status", "use_when", "do_not_use_when"]
  const names = new Map()
  const hashes = new Map()

  for (const row of rows) {
    for (const key of required) {
      if (!(key in row)) errors.push(`${row.name ?? "<unknown>"} missing required field: ${key}`)
    }
    if (typeof row.name !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.name)) {
      errors.push(`${row.name ?? "<unknown>"} has non-kebab-case name`)
    }
    if (!allowedPriorities.has(row.priority)) errors.push(`${row.name} invalid priority: ${row.priority}`)
    if (!allowedStatuses.has(row.status)) errors.push(`${row.name} invalid status: ${row.status}`)
    if (!Array.isArray(row.use_when) || row.use_when.length === 0) errors.push(`${row.name} needs non-empty use_when`)
    if (!Array.isArray(row.do_not_use_when) || row.do_not_use_when.length === 0) {
      errors.push(`${row.name} needs non-empty do_not_use_when`)
    }
    if (names.has(row.name)) {
      errors.push(`duplicate active skill name: ${row.name} (${names.get(row.name)} and ${row.path})`)
    }
    names.set(row.name, row.path)
    if (typeof row.path !== "string" || !exists(row.path)) {
      errors.push(`${row.name} path missing: ${row.path}`)
      continue
    }
    if (isExcludedPath(row.path)) errors.push(`${row.name} active manifest path is excluded: ${row.path}`)
    const skillFile = path.join(row.path, "SKILL.md")
    if (!exists(skillFile)) {
      errors.push(`${row.name} missing SKILL.md at ${skillFile}`)
      continue
    }
    const text = fs.readFileSync(path.join(ROOT, skillFile), "utf8")
    const fm = parseFrontmatter(text)
    if (fm.name && fm.name !== row.name) {
      errors.push(`${row.name} manifest name does not match frontmatter name ${fm.name}`)
    }
    if (!fm.description || fm.description.trim().length === 0) {
      errors.push(`${row.name} missing description frontmatter`)
    } else if (fm.description.length > 520) {
      warnings.push(`${row.name} description is long (${fm.description.length} chars)`)
    }
    if (!/\b(use when|when to use|use this skill|modes|workflow)\b/i.test(text)) {
      warnings.push(`${row.name} has weak routing clarity in SKILL.md`)
    }
    checkLocalReferences(row.path, text, row.name)
    const digest = hashDirectory(row.path)
    const prior = hashes.get(digest)
    if (prior && prior.name !== row.name) {
      errors.push(`duplicate full active source content: ${prior.path} and ${row.path}`)
    }
    hashes.set(digest, { name: row.name, path: row.path })
  }
}

function checkLocalReferences(skillDir, text, name) {
  const rx = /(?:^|[\s(`])((?:references?|assets|scripts|agents)\/[A-Za-z0-9._/@+\-]+)(?=[\s`).,;:]|$)/g
  let match
  while ((match = rx.exec(text))) {
    const target = match[1].replace(/[)>.,;:]+$/g, "")
    const abs = path.join(ROOT, skillDir, target)
    if (!fs.existsSync(abs)) errors.push(`${name} has broken local reference: ${target}`)
  }
}

function hashDirectory(dir) {
  const base = path.join(ROOT, dir)
  const files = []
  const stack = [base]
  while (stack.length > 0) {
    const current = stack.pop()
    for (const ent of fs.readdirSync(current, { withFileTypes: true })) {
      const p = path.join(current, ent.name)
      if (ent.isSymbolicLink()) continue
      if (ent.isDirectory()) stack.push(p)
      if (ent.isFile()) files.push(p)
    }
  }
  const hash = crypto.createHash("sha256")
  for (const file of files.sort()) {
    hash.update(rel(file))
    hash.update("\0")
    hash.update(fs.readFileSync(file))
    hash.update("\0")
  }
  return hash.digest("hex")
}

function checkAliases(rows) {
  if (!exists(aliasesPath)) {
    errors.push(`missing aliases file: ${aliasesPath}`)
    return
  }
  let aliases
  try {
    aliases = JSON.parse(fs.readFileSync(path.join(ROOT, aliasesPath), "utf8"))
  } catch (err) {
    errors.push(`${aliasesPath} invalid JSON: ${err.message}`)
    return
  }
  const activeNames = new Set(rows.map((row) => row.name))
  for (const [alias, entry] of Object.entries(aliases)) {
    if (!entry || typeof entry !== "object") {
      errors.push(`alias ${alias} must map to an object`)
      continue
    }
    if (!allowedAliasStatuses.has(entry.status)) errors.push(`alias ${alias} invalid status: ${entry.status}`)
    if (entry.canonical && !activeNames.has(entry.canonical)) {
      warnings.push(`alias ${alias} points outside active manifest: ${entry.canonical}`)
    }
    if (!entry.reason) warnings.push(`alias ${alias} should include a reason`)
  }
}

function checkSharedMarkdown() {
  for (const file of walk("shared", (p, ent) => ent.isFile?.() && p.endsWith(".md"))) {
    const fileRel = rel(file)
    const text = fs.readFileSync(file, "utf8")
    if (/\/Users\/|\/home\//.test(text)) {
      if (absolutePathAllowlist.has(fileRel)) {
        warnings.push(`allowlisted absolute local path references: ${fileRel}`)
      } else {
        errors.push(`absolute local path reference in shared markdown: ${fileRel}`)
      }
    }
    if (/MANDATORY PREPARATION/i.test(text)) errors.push(`banned phrase MANDATORY PREPARATION in ${fileRel}`)
    if (/Remember:\s+You are/i.test(text)) errors.push(`banned phrase Remember: You are in ${fileRel}`)
    if (/(?:sk-[A-Za-z0-9]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|AKIA[0-9A-Z]{16})/.test(text)) {
      errors.push(`possible live secret token in ${fileRel}`)
    }
  }
}

function checkSymlinks() {
  const links = walk(".", (p, ent) => ent.isSymbolicLink?.())
  for (const link of links) errors.push(`repo-internal symlink found: ${rel(link)}`)
}

function checkNestedGeneratedCopies() {
  for (const root of ["bundles", "providers", "providers-current"]) {
    for (const dir of walk(root, (p, ent) => ent.isDirectory?.())) {
      const parent = path.basename(path.dirname(dir))
      const name = path.basename(dir)
      if (name !== parent) continue
      if (fs.existsSync(path.join(dir, "SKILL.md")) && fs.existsSync(path.join(path.dirname(dir), "SKILL.md"))) {
        errors.push(`nested same-name generated copy: ${rel(dir)}`)
      }
    }
  }
}

const rows = readJsonl(manifestPath)
checkManifestRows(rows)
checkAliases(rows)
checkSharedMarkdown()
checkSymlinks()
checkNestedGeneratedCopies()

console.log("Skills validation")
console.log(`- manifest rows: ${rows.length}`)
console.log(`- active skill names: ${new Set(rows.map((row) => row.name)).size}`)
console.log(`- errors: ${errors.length}`)
for (const error of errors) console.log(`  - ERROR: ${error}`)
console.log(`- warnings: ${warnings.length}`)
for (const warning of warnings) console.log(`  - WARN: ${warning}`)

process.exit(errors.length === 0 ? 0 : 1)
