import fs from "node:fs"
import path from "node:path"
import {
  ROOT, PROVIDERS, CONSUMERS, NATIVE_ENTRIES, providerPackages
} from "./pack-common.mjs"
import { checkCatalog } from "./pack-catalog-check.mjs"

function routeRelations(canonical, archetypes) {
  const relations = []
  for (const pkg of canonical) {
    const text = fs.readFileSync(path.join(ROOT, pkg.path, "SKILL.md"), "utf8")
    if (archetypes[pkg.name] === "router") {
      for (const line of text.split(/\r?\n/).filter((value) => value.startsWith("|"))) {
        const cells = line.split("|").slice(1, -1).map((value) => value.trim())
        const match = cells.at(-1)?.match(/^`([a-z0-9]+(?:-[a-z0-9]+)*)`$/)
        if (match) relations.push({ owner: pkg.name, target: match[1], kind: "route" })
      }
    }
    for (const match of text.matchAll(/`([a-z0-9]+(?:-[a-z0-9]+)*)`\s+owns\b/gi)) {
      if (match[1] !== pkg.name) relations.push({ owner: pkg.name, target: match[1], kind: "handoff" })
    }
    for (const match of text.matchAll(/\bhand[^.\n]{0,100}\bto\s+`([a-z0-9]+(?:-[a-z0-9]+)*)`/gi)) {
      relations.push({ owner: pkg.name, target: match[1], kind: "handoff" })
    }
  }
  return relations.filter((item, index, all) => all.findIndex((other) => other.owner === item.owner && other.target === item.target && other.kind === item.kind) === index)
}

function checkRoutes(canonical, archetypes, report) {
  const active = new Set(canonical.map((pkg) => pkg.name))
  const relations = routeRelations(canonical, archetypes)
  const exposures = Object.fromEntries(Object.entries(CONSUMERS).map(([consumer, roots]) => [consumer,
    new Set(roots.flatMap((provider) => providerPackages(path.join(ROOT, "providers", provider)).map((pkg) => pkg.name)))
  ]))
  for (const relation of relations) {
    if (!active.has(relation.target)) { report.error("route", `${relation.owner} hands off to inactive ${relation.target}`); continue }
    if (relation.kind === "route" && archetypes[relation.target] === "router") report.error("route", `${relation.owner} routes to second router ${relation.target}`)
    for (const [consumer, names] of Object.entries(exposures)) {
      if (!names.has(relation.owner)) continue
      if (!names.has(relation.target)) report.error("route", `${consumer}: ${relation.owner} target ${relation.target} is unresolved`)
      else if (relation.kind === "route") report.error("route", `${consumer}: router ${relation.owner} and child ${relation.target} are co-exposed`)
    }
  }
  const routeGraph = new Map()
  for (const item of relations.filter((relation) => relation.kind === "route")) {
    if (!routeGraph.has(item.owner)) routeGraph.set(item.owner, new Set())
    routeGraph.get(item.owner).add(item.target)
  }
  const complete = new Set()
  const visit = (node, stack, start) => {
    if (stack.has(node)) { report.error("route", `route cycle begins at ${start}`); return }
    if (complete.has(node)) return
    const nextStack = new Set(stack).add(node)
    for (const target of routeGraph.get(node) ?? []) visit(target, nextStack, start)
    complete.add(node)
  }
  for (const start of routeGraph.keys()) visit(start, new Set(), start)
}

function checkDocs(canonical, report) {
  const canonicalNames = new Set(canonical.map((pkg) => pkg.name))
  const actualCounts = Object.fromEntries(PROVIDERS.map((provider) => [provider, fs.readdirSync(path.join(ROOT, "providers", provider)).length]))
  const pack = fs.readFileSync(path.join(ROOT, "PACK.md"), "utf8")
  for (const match of pack.matchAll(/^\| `?([a-z-]+)`? \| (\d+) \|/gm)) {
    if (match[1] in actualCounts && Number(match[2]) !== actualCounts[match[1]]) report.error("docs-count", `PACK.md ${match[1]} says ${match[2]}; live has ${actualCounts[match[1]]}`)
  }
  const catalogDirectory = path.join(ROOT, "reports/catalog")
  const datedReports = fs.readdirSync(catalogDirectory)
    .filter((name) => /^CATALOG-CONFORMS-\d{4}-\d{2}-\d{2}\.md$/.test(name))
    .sort()
  const currentReport = datedReports.at(-1)
  if (!currentReport) report.error("docs-report", "dated catalog conformance report is missing")
  const catalog = currentReport
    ? fs.readFileSync(path.join(catalogDirectory, currentReport), "utf8")
    : ""
  const legacyCatalog = fs.readFileSync(path.join(catalogDirectory, "CATALOG-CONFORMS.md"), "utf8")
  if (currentReport && (!/superseded/i.test(legacyCatalog) || !legacyCatalog.includes(currentReport))) {
    report.error("docs-report", `CATALOG-CONFORMS.md does not point to ${currentReport} as its superseding report`)
  }
  const slotClaim = catalog.match(/(\d+) retained canonical slots/)
  if (!slotClaim) report.error("docs-count", "current catalog report omits its retained canonical slot count")
  else if (Number(slotClaim[1]) !== canonical.length) report.error("docs-count", `current catalog report says ${slotClaim[1]} slots; source has ${canonical.length}`)
  const catalogTable = catalog.match(/## Catalog-only checklist results([\s\S]*?)### A15/)?.[1] ?? ""
  const reportedNames = new Set([...catalogTable.matchAll(/^\| `([a-z0-9-]+)` \|/gm)].map((match) => match[1]))
  for (const name of canonicalNames) if (!reportedNames.has(name)) report.error("docs-membership", `current catalog report omits ${name}`)
  for (const name of reportedNames) if (!canonicalNames.has(name)) report.error("docs-membership", `current catalog report includes retired ${name}`)
  const authoring = fs.readFileSync(path.join(ROOT, "shared/general/skill-authoring/SKILL.md"), "utf8")
  const rubric = fs.readFileSync(path.join(ROOT, "reports/rubric/RUBRIC.md"), "utf8").split(/\r?\n/).slice(0, 12).join("\n")
  if (authoring.includes("repository rubric is the single normative source") || !/historical/i.test(rubric)) report.error("docs-ownership", "skill-authoring references are not yet the sole normative contract")
  const docs = ["README.md", "PACK.md", "AGENTS.md", "packs/joshka0/SOURCE_NOTES.md"]
  const missing = new Set()
  const pathPattern = /`((?:shared|mirrors|bundles|providers|providers-current|archive|loose|reports|packs|bin|home)(?:\/[A-Za-z0-9._-]+)+\/?)`/g
  for (const doc of docs) {
    const text = fs.readFileSync(path.join(ROOT, doc), "utf8")
    for (const match of text.matchAll(/(?:\.\/)?bin\/(?:compose-codex-skills|compose-provider-skills|sync-provider-roots)\.sh/g)) missing.add(`${doc}: retired command ${match[0]}`)
    for (const match of text.matchAll(pathPattern)) {
      const claimed = match[1].replace(/\/$/, "")
      if (!fs.existsSync(path.join(ROOT, claimed))) missing.add(`${doc}: ${match[1]}`)
    }
    if (doc !== "packs/joshka0/SOURCE_NOTES.md") {
      for (const provider of PROVIDERS) {
        const rootToken = provider === "gemini-antigravity" ? ".gemini/antigravity/skills" : `.${provider}/skills`
        if (!text.includes(rootToken) || !text.includes(`providers/${provider}`)) report.error("docs-install", `${doc} omits the ${provider} install mapping`)
      }
    }
  }
  const nativeDocs = ["AGENTS.md", "PACK.md", "packs/joshka0/SOURCE_NOTES.md"]
  for (const doc of nativeDocs) {
    const text = fs.readFileSync(path.join(ROOT, doc), "utf8")
    for (const entries of Object.values(NATIVE_ENTRIES)) for (const entry of entries) {
      if (!text.includes(entry)) report.error("docs-native", `${doc} omits native entry ${entry}`)
    }
    for (const match of text.matchAll(/providers\/([a-z-]+)\/([a-z0-9.-]+)/g)) {
      if (!(NATIVE_ENTRIES[match[1]] ?? []).includes(match[2])) report.error("docs-native", `${doc} misclassifies ${match[1]}/${match[2]} as native`)
    }
    for (const line of text.split(/\r?\n/).filter((value) => /provider-native/i.test(value))) {
      for (const name of canonicalNames) if (line.toLowerCase().includes(name.toLowerCase())) report.error("docs-native", `${doc} labels canonical ${name} as native`)
    }
  }
  for (const claim of [...missing].sort()) report.error("docs-path", claim)
}

export function checkParity(catalog, canonical, archetypes, report) {
  checkCatalog(catalog, canonical, report)
  checkRoutes(canonical, archetypes, report)
  checkDocs(canonical, report)
}
