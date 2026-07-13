import fs from "node:fs"
import path from "node:path"
import { spawnSync } from "node:child_process"
import {
  ROOT, parseFrontmatter, walk
} from "./pack-common.mjs"
import { checkParity } from "./pack-parity.mjs"
import { runSafetySelfTest } from "./pack-self-test.mjs"
import { runCheckBoundarySelfTest } from "./pack-check-fixture.mjs"

const ARCHETYPES = {
  "agent-orchestration": "suite", caveman: "interaction", "chrome-extension-builder": "leaf",
  "code-quality": "suite", crew: "leaf", "design-family": "suite", "effect-framework": "suite",
  "elixir-lang": "suite", "git-guardrails-claude-code": "private-leaf", "go-lang": "suite",
  "goal-protocol": "suite", "grill-me": "interaction", gtr: "private-leaf", herdr: "private-leaf",
  "infra-bundles": "router", "local-dev": "suite", "local-http-browser-use": "private-leaf",
  maestri: "suite", "peon-ping": "private-leaf", "planning-workflow": "suite",
  "product-platform": "router", prototype: "suite", "release-bundles": "suite",
  "repoprompt-pro-review": "private-leaf", "riff-partner": "interaction", "skill-authoring": "suite",
  uniwind: "leaf"
}

function readManifest(report) {
  const file = path.join(ROOT, "manifests/skills.jsonl")
  const rows = []
  for (const [index, line] of fs.readFileSync(file, "utf8").split(/\r?\n/).entries()) {
    if (!line.trim()) continue
    try { rows.push(JSON.parse(line)) }
    catch (error) { report.error("manifest-json", `manifests/skills.jsonl:${index + 1}: ${error.message}`) }
  }
  return rows
}

function discoverCanonical(report) {
  const packages = []
  const names = new Map()
  const shared = path.join(ROOT, "shared")
  for (const { absolute, entry } of walk(shared)) {
    if (!entry.isFile() || entry.name !== "SKILL.md") continue
    const skillRelative = path.relative(ROOT, absolute).split(path.sep).join("/")
    const parts = skillRelative.split("/")
    if (parts.length !== 4 || parts[0] !== "shared" || parts[3] !== "SKILL.md") {
      report.error("canonical-shape", `misplaced skill contract: ${skillRelative}`)
      continue
    }
    const fm = parseFrontmatter(fs.readFileSync(absolute, "utf8"))
    const relative = parts.slice(0, 3).join("/")
    if (!fm.name) report.error("canonical-frontmatter", `${relative} has no name`)
    else if (fm.name !== parts[2]) report.error("canonical-frontmatter", `${relative} claims name ${fm.name}`)
    else if (names.has(fm.name)) report.error("canonical-name", `${fm.name}: ${names.get(fm.name)} and ${relative}`)
    else names.set(fm.name, relative)
    packages.push({ name: fm.name, path: relative, fm })
  }
  return packages
}

function reporter() {
  const errors = []
  const warnings = []
  const passes = []
  return {
    errors, warnings, passes,
    error(code, message) { errors.push(`[${code}] ${message}`) },
    warn(code, message) { warnings.push(`[${code}] ${message}`) },
    pass(message) { passes.push(message) }
  }
}

function validatePackages(packages, report) {
  let passed = 0
  for (const pkg of packages) {
    const archetype = ARCHETYPES[pkg.name]
    if (!archetype) { report.error("archetype", `${pkg.name} has no transitional archetype`); continue }
    const result = spawnSync(path.join(ROOT, "bin/validate-skill.sh"), [pkg.path, archetype], {
      cwd: ROOT, encoding: "utf8"
    })
    if (result.status === 0) passed += 1
    else report.error("package", (result.stderr || result.stdout).trim().split("\n").at(-1))
  }
  if (passed === packages.length) report.pass(`package validators: ${passed}/${packages.length}`)
  const catalog = spawnSync(process.execPath, ["scripts/validate-skills.mjs"], { cwd: ROOT, encoding: "utf8" })
  if (catalog.status !== 0) report.error("legacy-validator", (catalog.stdout || catalog.stderr).trim())
  else report.pass("legacy manifest validator")
  for (const line of catalog.stdout.split(/\r?\n/).filter((line) => line.includes("WARN:"))) {
    report.warn("legacy-validator", line.trim())
  }
}

function checkLinks(packages, report) {
  let checked = 0
  for (const pkg of packages) {
    const packageRoot = path.join(ROOT, pkg.path)
    for (const { absolute, entry } of walk(packageRoot)) {
      if (!entry.isFile() || !absolute.endsWith(".md")) continue
      const text = fs.readFileSync(absolute, "utf8")
      const targets = []
      for (const match of text.matchAll(/\]\(([^)]+)\)/g)) targets.push(match[1].trim().split(/\s+['"]/)[0])
      for (const match of text.matchAll(/(?:^|[\s(`])((?:references|assets|scripts|agents)\/[A-Za-z0-9._/@+\-]+)/gm)) {
        targets.push({ packageRelative: match[1] })
      }
      for (const targetValue of targets) {
        const target = typeof targetValue === "string" ? targetValue : targetValue.packageRelative
        if (!target || /^(?:https?:|mailto:|#|<)/.test(target)) continue
        const clean = decodeURIComponent(target.split("#")[0].replace(/^<|>$/g, ""))
        const resolved = typeof targetValue === "string" ? path.resolve(path.dirname(absolute), clean) : path.join(packageRoot, clean)
        checked += 1
        if (!fs.existsSync(resolved)) report.error("link", `${path.relative(ROOT, absolute)} -> ${target}`)
      }
    }
  }
  report.pass(`local package links inspected: ${checked}`)
  const link = walk(ROOT).find(({ absolute, entry }) => entry.isSymbolicLink() && !absolute.includes(`${path.sep}.git${path.sep}`))
  if (link) report.error("symlink", `repo-internal symlink: ${path.relative(ROOT, link.absolute)}`)
  else report.pass("no repo-internal symlinks")
}

function checkSecrets(report) {
  const executable = spawnSync("sh", ["-c", "command -v kingfisher"], { encoding: "utf8" })
  if (executable.status !== 0) { report.error("secrets", "kingfisher is required for redacted secret scanning"); return }
  const targets = ["shared", "home", "bundles", "providers/codex/.system", "bin", "scripts", "manifests",
    "overlay-manifest.json", "README.md", "PACK.md", "AGENTS.md", "packs/joshka0"].filter((target) => fs.existsSync(path.join(ROOT, target)))
  const args = ["--no-update-check", "scan", ...targets,
    "--git-history", "none", "--commit-metadata=false", "--redact", "--no-validate",
    "--confidence", "medium", "--format", "json"]
  const scan = spawnSync(executable.stdout.trim(), args, { cwd: ROOT, encoding: "utf8" })
  if (scan.status !== 0) { report.error("secrets", "kingfisher scan failed (values suppressed)"); return }
  try {
    const result = JSON.parse(scan.stdout.trim())
    const ruleFindings = (result.findings_by_rule ?? []).reduce((total, item) => total + Number(item[1] ?? 0), 0)
    const findings = Math.max(Number(result.findings ?? 0), ruleFindings)
    if (findings) report.error("secrets", `${findings} redacted finding(s)`)
    else report.pass(`secret scan: 0 findings across ${result.blobs_scanned} blobs`)
  } catch { report.error("secrets", "kingfisher returned unreadable JSON (output suppressed)") }
}

export function runCheck() {
  const report = reporter()
  const rows = readManifest(report)
  const canonical = discoverCanonical(report)
  validatePackages(canonical, report)
  checkLinks(canonical, report)
  checkSecrets(report)
  checkParity(rows, canonical, ARCHETYPES, report)
  if (process.env.PACK_SKIP_SELF_TEST !== "1") {
    runSafetySelfTest(report)
    runCheckBoundarySelfTest(report)
  }
  console.log("PACK CHECK")
  for (const line of report.passes) console.log(`PASS ${line}`)
  for (const line of report.warnings) console.log(`WARN ${line}`)
  for (const line of report.errors) console.log(`ERROR ${line}`)
  console.log(`SUMMARY errors=${report.errors.length} warnings=${report.warnings.length}`)
  console.log(report.errors.length ? "CHECK: FAIL" : "CHECK: PASS")
  return report.errors.length ? 1 : 0
}
