import crypto from "node:crypto"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { catalogEntries, consumerProviders, loadCatalog, nativeEntries } from "./pack-catalog.mjs"
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
export const CATALOG = loadCatalog(ROOT)
export const PROVIDERS = [
  "agents", "claude", "codex", "droid", "factory", "gemini", "gemini-antigravity"
]
export const PROFILES = CATALOG.profiles
export const BUNDLES = PROFILES
export const CONSUMERS = consumerProviders(CATALOG)
export const NATIVE_ENTRIES = nativeEntries(CATALOG)
export function fail(message) {
  throw new Error(message)
}
export function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) return {}
  const end = text.indexOf("\n---", 4)
  if (end < 0) return {}
  const result = {}
  for (const line of text.slice(4, end).split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!match) continue
    let value = match[2].trim()
    if (value.startsWith('"') && value.endsWith('"')) {
      try { value = JSON.parse(value) } catch { value = value.slice(1, -1) }
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1).replace(/''/g, "'")
    }
    result[match[1]] = value
  }
  return result
}
export function walk(start) {
  if (!fs.existsSync(start)) return []
  const result = []
  const stack = [start]
  while (stack.length) {
    const current = stack.pop()
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === ".git") continue
      const absolute = path.join(current, entry.name)
      result.push({ absolute, entry })
      if (entry.isDirectory() && !entry.isSymbolicLink()) stack.push(absolute)
    }
  }
  return result
}
export function assertNoSymlinks(source) {
  if (fs.lstatSync(source).isSymbolicLink()) {
    fail(`symlinked composition input is forbidden: ${path.relative(ROOT, source)}`)
  }
  if (!fs.statSync(source).isDirectory()) return
  const link = walk(source).find(({ entry }) => entry.isSymbolicLink())
  if (link) fail(`symlinked composition input is forbidden: ${path.relative(ROOT, link.absolute)}`)
}
function assertConfinedPath(root, target) {
  const relative = path.relative(root, target)
  if (!relative || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    if (!relative) assertNoSymlinks(target)
    else fail(`composition path escapes its repository root: ${target}`)
    return
  }
  let current = root
  if (fs.lstatSync(current).isSymbolicLink()) fail(`symlinked repository root is forbidden: ${root}`)
  for (const segment of relative.split(path.sep)) {
    current = path.join(current, segment)
    if (!fs.existsSync(current)) fail(`composition path is missing: ${path.relative(root, current)}`)
    if (fs.lstatSync(current).isSymbolicLink()) fail(`symlinked composition ancestor is forbidden: ${path.relative(root, current)}`)
  }
  const realRoot = fs.realpathSync(root)
  const realTarget = fs.realpathSync(target)
  if (realTarget !== realRoot && !realTarget.startsWith(`${realRoot}${path.sep}`)) {
    fail(`composition path resolves outside its repository root: ${target}`)
  }
}
export function copyTree(source, destination) {
  assertNoSymlinks(source)
  fs.cpSync(source, destination, {
    recursive: true,
    force: false,
    errorOnExist: true,
    preserveTimestamps: true,
    dereference: false
  })
  if (fs.statSync(source).isDirectory()) {
    const descendants = walk(source).sort((left, right) => right.absolute.length - left.absolute.length)
    for (const { absolute } of descendants) {
      fs.chmodSync(path.join(destination, path.relative(source, absolute)), fs.lstatSync(absolute).mode & 0o7777)
    }
  }
  fs.chmodSync(destination, fs.statSync(source).mode & 0o7777)
}
function preserveExistingModes(reference, target) {
  for (const { absolute, entry } of walk(target)) {
    const existing = path.join(reference, path.relative(target, absolute))
    if (!fs.existsSync(existing)) continue
    const prior = fs.lstatSync(existing)
    if ((entry.isDirectory() && prior.isDirectory()) || (entry.isFile() && prior.isFile())) fs.chmodSync(absolute, prior.mode & 0o7777)
  }
  fs.chmodSync(target, fs.statSync(reference).mode & 0o7777)
}
function validatePackageSource(source, entryName) {
  assertNoSymlinks(source)
  const skill = path.join(source, "SKILL.md")
  if (!fs.statSync(source).isDirectory() || !fs.existsSync(skill)) {
    fail(`bundle entry must be a skill directory with SKILL.md: ${path.relative(ROOT, source)}`)
  }
  const nested = path.join(source, entryName, "SKILL.md")
  if (fs.existsSync(nested)) fail(`nested same-name package is forbidden: ${path.relative(ROOT, nested)}`)
  const frontmatter = parseFrontmatter(fs.readFileSync(skill, "utf8"))
  if (frontmatter.name !== entryName) {
    fail(`directory/frontmatter name mismatch: ${path.relative(ROOT, source)} claims ${frontmatter.name ?? "<none>"}`)
  }
}

export function providerPackages(providerDir) {
  const packages = []
  if (!fs.existsSync(providerDir)) return packages
  for (const entry of fs.readdirSync(providerDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const base = path.join(providerDir, entry.name)
    if (entry.name === ".system") {
      for (const child of fs.readdirSync(base, { withFileTypes: true })) {
        const skill = path.join(base, child.name, "SKILL.md")
        if (child.isDirectory() && fs.existsSync(skill)) packages.push(readPackage(skill, child.name))
      }
    } else {
      const skill = path.join(base, "SKILL.md")
      if (fs.existsSync(skill)) packages.push(readPackage(skill, entry.name))
    }
  }
  return packages
}
function readPackage(skill, directoryName) {
  const fm = parseFrontmatter(fs.readFileSync(skill, "utf8"))
  return { ...fm, directoryName, skill }
}
function validateRenderedProvider(provider, destination, requiredNative) {
  for (const entry of fs.readdirSync(destination, { withFileTypes: true })) {
    if (entry.name === ".system") {
      validateCodexSystem(path.join(destination, entry.name))
      continue
    }
    if (!entry.isDirectory() || !fs.existsSync(path.join(destination, entry.name, "SKILL.md"))) {
      fail(`rendered ${provider} entry is not a skill package: ${entry.name}`)
    }
  }
  const seen = new Map()
  for (const pkg of providerPackages(destination)) {
    if (!pkg.name) fail(`rendered package has no frontmatter name: ${pkg.skill}`)
    if (pkg.name !== pkg.directoryName) fail(`rendered package ${pkg.directoryName} claims name ${pkg.name}`)
    if (seen.has(pkg.name)) fail(`rendered ${provider} name collision: ${pkg.name} in ${seen.get(pkg.name)} and ${pkg.skill}`)
    seen.set(pkg.name, pkg.skill)
  }
  for (const required of requiredNative) {
    if (!fs.existsSync(path.join(destination, required))) fail(`render would drop required ${provider} native entry: ${required}`)
  }
}
function validateCodexSystem(systemRoot) {
  if (!fs.existsSync(systemRoot) || !fs.statSync(systemRoot).isDirectory()) fail("Codex .system must be a directory")
  const marker = path.join(systemRoot, ".codex-system-skills.marker")
  if (!fs.existsSync(marker) || !fs.statSync(marker).isFile()) {
    fail("Codex .system marker is missing or malformed")
  }
  let packages = 0
  for (const entry of fs.readdirSync(systemRoot, { withFileTypes: true })) {
    if (entry.name === ".codex-system-skills.marker") continue
    const skill = path.join(systemRoot, entry.name, "SKILL.md")
    if (!entry.isDirectory() || !fs.existsSync(skill) || !fs.statSync(skill).isFile()) {
      fail(`malformed Codex .system child: ${entry.name}`)
    }
    packages += 1
  }
  if (!packages) fail("Codex .system contains no skill packages")
}
function composeProvider(provider, destination, selection, root) {
  const catalog = loadCatalog(root)
  const liveProvider = path.join(root, "providers", provider)
  fs.mkdirSync(destination, { recursive: true, mode: fs.statSync(liveProvider).mode & 0o777 })
  fs.chmodSync(destination, fs.statSync(liveProvider).mode & 0o777)
  const origins = new Map()
  const entries = catalogEntries(catalog, provider, selection)
  for (const entry of entries) {
    const source = path.join(root, entry.source)
    if (!fs.existsSync(source)) fail(`catalog composition source is missing: ${entry.source}`)
    assertConfinedPath(root, source)
    if (origins.has(entry.name)) fail(`composition collision for ${provider}/${entry.name}: ${origins.get(entry.name)} and ${entry.owner}`)
    origins.set(entry.name, entry.owner)
    if (entry.kind === "system-tree") validateCodexSystem(source)
    else validatePackageSource(source, entry.name)
    copyTree(source, path.join(destination, entry.name))
  }
  if (origins.size === 0) fail(`selected profiles produce an empty ${provider} overlay`)
  preserveExistingModes(liveProvider, destination)
  validateRenderedProvider(provider, destination, nativeEntries(catalog)[provider] ?? [])
}
export function buildProviderTree(outputRoot, selectedProviders, bundleSelection, sourceRoot = ROOT) {
  const catalog = loadCatalog(sourceRoot)
  const liveRoot = path.join(sourceRoot, "providers")
  const output = path.join(outputRoot, "providers")
  assertConfinedPath(sourceRoot, liveRoot)
  assertNoSymlinks(liveRoot)
  fs.mkdirSync(output, { recursive: true, mode: fs.statSync(liveRoot).mode & 0o777 })
  fs.chmodSync(output, fs.statSync(liveRoot).mode & 0o777)
  const selected = new Set(selectedProviders)
  for (const entry of fs.readdirSync(liveRoot, { withFileTypes: true })) {
    if (selected.has(entry.name)) continue
    copyTree(path.join(liveRoot, entry.name), path.join(output, entry.name))
  }
  for (const provider of selectedProviders) {
    if (!PROVIDERS.includes(provider) || !catalog.providers.includes(provider)) fail(`provider is not allowlisted: ${provider}`)
    if (!fs.existsSync(path.join(liveRoot, provider))) fail(`live provider root is missing: providers/${provider}`)
    composeProvider(provider, path.join(output, provider), bundleSelection, sourceRoot)
  }
  return output
}
export function treeDiff(left, right, limit = 12, includeModes = true) {
  const a = treeIndex(left, includeModes)
  const b = treeIndex(right, includeModes)
  const keys = [...new Set([...a.keys(), ...b.keys()])].sort()
  return keys.filter((key) => a.get(key) !== b.get(key)).slice(0, limit)
}
function treeIndex(root, includeModes) {
  const result = new Map()
  if (!fs.existsSync(root)) return result
  for (const { absolute, entry } of walk(root)) {
    const relative = path.relative(root, absolute).split(path.sep).join("/")
    const mode = fs.lstatSync(absolute).mode & 0o7777
    if (entry.isDirectory()) result.set(relative, includeModes ? `D:${mode}` : "D")
    else if (entry.isSymbolicLink()) result.set(relative, `L:${fs.readlinkSync(absolute)}`)
    else if (entry.isFile()) {
      const hash = crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex")
      result.set(relative, includeModes ? `F:${mode}:${hash}` : `F:${hash}`)
    }
  }
  return result
}

export function trash(target) {
  try { fs.lstatSync(target) } catch (error) {
    if (error.code === "ENOENT") return
    throw error
  }
  const result = spawnSync("/usr/bin/trash", [target], { encoding: "utf8" })
  if (result.error || result.status !== 0) fail(`could not move path to Trash: ${target}`)
}

export function temporaryRoot(prefix = "skills-pack-render-") {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix))
}

export function atomicExchange(left, right, helperRoot = ROOT) {
  const helper = path.join(helperRoot, "bin/lib/atomic-swap.py")
  const exchange = spawnSync("python3", [helper, left, right], { cwd: helperRoot, encoding: "utf8" })
  if (exchange.error || exchange.status !== 0) {
    fail(`atomic provider exchange failed before mutation: ${(exchange.stderr || exchange.stdout).trim()}`)
  }
}
