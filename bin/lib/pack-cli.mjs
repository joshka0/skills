import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import {
  ROOT, CATALOG, PROVIDERS, PROFILES, atomicExchange, buildProviderTree, fail, temporaryRoot, trash, treeDiff
} from "./pack-common.mjs"
import { installMappings } from "./pack-catalog.mjs"
import { runCheck } from "./pack-check.mjs"

const HELP = `Usage: bin/pack <command> [options]

Commands:
  check                                  Validate packages and the effective catalog
  render [--all|--provider NAME]         Render a pure preview under a temporary root
         [--profiles core|--full]
  apply  (--all|--provider NAME)         Atomically exchange a complete providers tree
         [--profiles core|--full]
  install [--apply]                      Preview or reconcile catalog-declared home skill roots

Providers: ${PROVIDERS.join(", ")}
Selectable profiles: ${PROFILES.join(", ")}

render defaults to all providers and the core profile. --bundles remains a compatibility spelling.
apply requires an explicit scope.
install never edits a home config file; stale Codex overrides are report-only.`

function parseComposition(args, requireScope) {
  const providers = []
  let all = false
  let selection = ["core"]
  let selectionSet = false
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === "--provider") {
      const provider = args[++index]
      if (!provider || !PROVIDERS.includes(provider)) fail(`provider is not allowlisted: ${provider ?? "<missing>"}`)
      if (providers.includes(provider)) fail(`duplicate provider scope: ${provider}`)
      providers.push(provider)
    } else if (arg === "--all") {
      if (all) fail("duplicate --all scope")
      all = true
    } else if (arg === "--profiles" || arg === "--bundles") {
      if (selectionSet) fail("choose exactly one of --profiles/--bundles or --full")
      const value = args[++index]
      if (!value) fail(`${arg} requires a non-empty comma-separated list`)
      const parsed = value.split(",").map((item) => item.trim())
      if (parsed.some((item) => !item)) fail("empty bundle token is forbidden")
      for (const profile of parsed) if (!PROFILES.includes(profile)) fail(`profile is not allowlisted: ${profile}`)
      if (new Set(parsed).size !== parsed.length) fail(`profile collision in selection: ${value}`)
      selection = parsed
      selectionSet = true
    } else if (arg === "--full") {
      if (selectionSet) fail("choose exactly one of --profiles/--bundles or --full")
      selection = "full"
      selectionSet = true
    } else fail(`unknown option: ${arg}`)
  }
  if (all && providers.length) fail("choose --all or one or more --provider options")
  if (requireScope && !all && !providers.length) fail("apply requires --all or --provider NAME")
  return { providers: all || !providers.length ? PROVIDERS : providers, selection }
}

function entryCount(root, provider) {
  return fs.readdirSync(path.join(root, "providers", provider)).length
}

function render(args) {
  const scope = parseComposition(args, false)
  const output = temporaryRoot()
  try {
    buildProviderTree(output, scope.providers, scope.selection)
  } catch (error) {
    trash(output)
    throw error
  }
  console.log(`RENDER_ROOT=${output}`)
  for (const provider of scope.providers) console.log(`RENDER ${provider} entries=${entryCount(output, provider)}`)
  console.log(`Preview retained at ${output}; remove it only with /usr/bin/trash.`)
}

function apply(args) {
  const scope = parseComposition(args, true)
  fs.accessSync("/usr/bin/trash", fs.constants.X_OK)
  const stage = fs.mkdtempSync(path.join(ROOT, ".pack-stage-"))
  let swapped = false
  try {
    const candidate = buildProviderTree(stage, scope.providers, scope.selection)
    const live = path.join(ROOT, "providers")
    const differences = treeDiff(live, candidate, Number.MAX_SAFE_INTEGER)
    console.log(`APPLY scope=${scope.providers.join(",")} changed-paths=${differences.length}`)
    if (!differences.length) {
      trash(stage)
      console.log("APPLY NOOP: rendered tree already matches providers/")
      return
    }
    atomicExchange(live, candidate)
    swapped = true
    try { trash(stage) } catch {
      fail(`APPLY COMMITTED / CLEANUP BLOCKED: providers/ is updated; displaced tree remains at ${stage}`)
    }
    console.log(`APPLY DONE: exchanged providers/ atomically; displaced tree moved to Trash`)
  } catch (error) {
    if (!swapped && fs.existsSync(stage)) {
      try { trash(stage) } catch { /* preserve the recoverable stage and the original error */ }
    }
    throw error
  }
}

function installRoots() {
  const home = os.homedir()
  const codexHome = process.env.CODEX_HOME || path.join(home, ".codex")
  return installMappings(CATALOG).map(({ provider, root }) => {
    if (root === "${CODEX_HOME:-$HOME/.codex}/skills") return [provider, path.join(codexHome, "skills")]
    if (root.startsWith("$HOME/")) return [provider, path.join(home, root.slice("$HOME/".length))]
    fail(`unsupported catalog install root: ${root}`)
  })
}

function lstat(target) {
  try { return fs.lstatSync(target) } catch (error) {
    if (error.code === "ENOENT") return null
    throw error
  }
}

function displayHome(target) {
  const home = os.homedir()
  return target.startsWith(`${home}${path.sep}`) ? `$HOME/${path.relative(home, target)}` : target
}

function nextBackup(target, timestamp) {
  let candidate = `${target}.backup-${timestamp}`
  let suffix = 1
  while (lstat(candidate)) candidate = `${target}.backup-${timestamp}-${suffix++}`
  return candidate
}

function reconcileRoot(provider, target, applyChanges, timestamp) {
  const source = path.join(ROOT, "providers", provider)
  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) fail(`provider source is missing: providers/${provider}`)
  const state = lstat(target)
  if (state?.isSymbolicLink()) {
    const current = path.resolve(path.dirname(target), fs.readlinkSync(target))
    if (current === source) { console.log(`OK ${provider}: ${displayHome(target)}`); return }
  }
  const backup = state ? nextBackup(target, timestamp) : null
  console.log(`${state ? "REPOINT" : "CREATE"} ${provider}: ${displayHome(target)} -> providers/${provider}${backup ? ` (backup ${displayHome(backup)})` : ""}`)
  if (!applyChanges) return
  fs.mkdirSync(path.dirname(target), { recursive: true })
  const temporaryLink = `${target}.pack-link-${process.pid}-${timestamp}`
  if (lstat(temporaryLink)) fail(`temporary install path already exists: ${displayHome(temporaryLink)}`)
  fs.symlinkSync(source, temporaryLink, "dir")
  try {
    if (backup) fs.renameSync(target, backup)
    fs.renameSync(temporaryLink, target)
  } catch (error) {
    if (backup && !lstat(target) && lstat(backup)) fs.renameSync(backup, target)
    if (lstat(temporaryLink)) trash(temporaryLink)
    throw error
  }
}

function decodeTomlString(value) {
  try { return JSON.parse(value) } catch { return value.slice(1, -1) }
}

function overrideName(configuredPath) {
  const base = path.basename(configuredPath)
  return base === "SKILL.md" ? path.basename(path.dirname(configuredPath)) : base.replace(/\.[^.]+$/, "")
}

function reportStaleOverrides() {
  const config = path.join(process.env.CODEX_HOME || path.join(os.homedir(), ".codex"), "config.toml")
  if (!fs.existsSync(config)) { console.log("OVERRIDES SKIP: Codex config is absent"); return }
  const lines = fs.readFileSync(config, "utf8").split(/\r?\n/)
  const starts = lines.map((line, index) => line.trim() === "[[skills.config]]" ? index : -1).filter((index) => index >= 0)
  const stale = []
  for (const start of starts) {
    let end = start
    while (end + 1 < lines.length && !/^\s*\[\[?.+\]\]?\s*$/.test(lines[end + 1])) end += 1
    while (end > start && !lines[end].trim()) end -= 1
    const pathLine = lines.slice(start, end + 1).find((line) => /^path\s*=/.test(line.trim()))
    const match = pathLine?.trim().match(/^path\s*=\s*("(?:\\.|[^"])*")$/)
    if (!match) continue
    const configured = decodeTomlString(match[1]).replace(/^~(?=\/)/, os.homedir())
    if (!fs.existsSync(configured)) stale.push({ start: start + 1, end: end + 1, name: overrideName(configured) })
  }
  console.log(`OVERRIDES stale=${stale.length} total=${starts.length} action=REPORT_ONLY`)
  for (const item of stale) console.log(`WARN stale override lines ${item.start}-${item.end}: ${item.name} (path redacted)`)
}

function install(args) {
  if (args.some((arg) => arg !== "--apply") || args.filter((arg) => arg === "--apply").length > 1) {
    fail("install accepts only an optional --apply")
  }
  const applyChanges = args.includes("--apply")
  const timestamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14)
  for (const [provider, target] of installRoots()) reconcileRoot(provider, target, applyChanges, timestamp)
  reportStaleOverrides()
  console.log(applyChanges ? "INSTALL DONE: roots reconciled; no config file edited" : "INSTALL PREVIEW: no home path or config file changed")
}

export function main(argv) {
  const [command, ...args] = argv
  if (!command || command === "help" || command === "--help" || command === "-h") { console.log(HELP); return 0 }
  if (command === "check") { if (args.length) fail("check takes no options"); return runCheck() }
  if (command === "render") { render(args); return 0 }
  if (command === "apply") { apply(args); return 0 }
  if (command === "install") { install(args); return 0 }
  fail(`unknown command: ${command}`)
}
