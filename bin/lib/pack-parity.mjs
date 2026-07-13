import fs from "node:fs"
import path from "node:path"
import {
  ROOT, PROVIDERS, CONSUMERS, NATIVE_ENTRIES, buildProviderTree, parseFrontmatter,
  providerPackages, temporaryRoot, trash, treeDiff
} from "./pack-common.mjs"

const same = (left, right) => JSON.stringify([...left].sort()) === JSON.stringify([...right].sort())

function providerNames(provider, canonicalNames) {
  return new Set(providerPackages(path.join(ROOT, "providers", provider)).map((pkg) => pkg.name).filter((name) => canonicalNames.has(name)))
}

function checkOverlaySemantics(overlay, canonical, report) {
  const canonicalNames = new Set(canonical.map((pkg) => pkg.name))
  if (overlay.catalog?.canonicalSlots !== canonical.length) {
    report.error("overlay-count", `overlay manifest says ${overlay.catalog?.canonicalSlots}; canonical source has ${canonical.length}`)
  }
  const actualProviders = Object.keys(overlay.providers ?? {})
  if (!same(actualProviders, PROVIDERS)) report.error("overlay-providers", `provider keys differ: ${actualProviders.join(",")}`)
  for (const provider of PROVIDERS) {
    const declared = overlay.providers?.[provider]
    if (declared?.bundle !== "core") report.error("overlay-bundle", `${provider}: declared bundle must be core`)
    const hasSnapshot = fs.existsSync(path.join(ROOT, "providers-current", provider))
    if (declared?.snapshot !== hasSnapshot) report.error("overlay-snapshot", `${provider}: snapshot declaration differs from repository state`)
  }
  const memberships = Object.fromEntries(PROVIDERS.map((provider) => [provider, providerNames(provider, canonicalNames)]))
  const common = [...canonicalNames].filter((name) => PROVIDERS.every((provider) => memberships[provider].has(name)))
  if (!same(overlay.catalog?.commonCanonical ?? [], common)) report.error("overlay-common", "commonCanonical differs from live provider membership")
  const exposure = new Map([...canonicalNames].map((name) => [name, PROVIDERS.filter((provider) => memberships[provider].has(name))]))
  const claudeOnly = [...exposure].filter(([, providers]) => providers.length === 1 && providers[0] === "claude").map(([name]) => name)
  if (!same(overlay.catalog?.profileDecisions?.claudeOnly ?? [], claudeOnly)) report.error("overlay-profile", "claudeOnly differs from live provider membership")
  const declaredNative = overlay.providerNativeExceptions ?? {}
  for (const provider of PROVIDERS) {
    const declared = declaredNative[provider]?.entries ?? []
    const expected = NATIVE_ENTRIES[provider] ?? []
    if (!same(declared, expected)) report.error("overlay-native", `${provider}: declared native entries differ from composer policy`)
  }
  for (const provider of Object.keys(declaredNative).filter((key) => key !== "retiredDocumentation")) {
    if (!PROVIDERS.includes(provider)) report.error("overlay-native", `unsupported native provider key: ${provider}`)
  }
  const scopes = [...new Set(canonical.map((pkg) => pkg.path.split("/").slice(0, 2).join("/")))]
  if (!same(overlay.roots?.shared ?? [], scopes)) report.error("overlay-roots", "shared roots differ from discovered canonical roots")
  for (const [key, expected] of [["bundles", "bundles/"], ["providers", "providers/"], ["providersCurrent", "providers-current/"]]) {
    if (overlay.roots?.[key] !== expected) report.error("overlay-roots", `${key} must be ${expected}`)
  }
}

function checkProvider(provider, canonicalNames, overlay, report) {
  const root = path.join(ROOT, "providers", provider)
  const entries = fs.readdirSync(root)
  const declared = overlay.providers?.[provider]?.entries
  if (declared !== entries.length) report.error("provider-count", `${provider}: overlay says ${declared}; live has ${entries.length}`)
  const seen = new Set()
  for (const pkg of providerPackages(root)) {
    if (seen.has(pkg.name)) report.error("provider-name", `${provider}: duplicate ${pkg.name}`)
    seen.add(pkg.name)
    const top = path.relative(root, pkg.skill).split(path.sep)[0]
    if (!canonicalNames.has(pkg.name) && !(NATIVE_ENTRIES[provider] ?? []).includes(top)) {
      report.error("provider-native", `${provider}: undeclared non-canonical package ${pkg.name}`)
    }
  }
  for (const expected of NATIVE_ENTRIES[provider] ?? []) {
    if (!entries.includes(expected)) report.error("provider-native", `${provider}: missing ${expected}`)
  }
}

function checkConsumerUnions(report) {
  for (const [consumer, roots] of Object.entries(CONSUMERS)) {
    const names = new Map()
    for (const provider of roots) {
      for (const pkg of providerPackages(path.join(ROOT, "providers", provider))) {
        if (names.has(pkg.name)) report.error("consumer-union", `${consumer}: ${pkg.name} exposed by ${names.get(pkg.name)} and ${provider}`)
        else names.set(pkg.name, provider)
      }
    }
  }
}

function checkCompositionParity(canonical, report) {
  const byName = new Map(canonical.map((pkg) => [pkg.name, pkg]))
  for (const provider of PROVIDERS) {
    const bundle = path.join(ROOT, "bundles", provider, "core")
    for (const entry of fs.readdirSync(bundle, { withFileTypes: true })) {
      if (!entry.isDirectory()) { report.error("bundle-shape", `${provider}/core/${entry.name} is not a package directory`); continue }
      const skill = path.join(bundle, entry.name, "SKILL.md")
      if (!fs.existsSync(skill)) { report.error("bundle-shape", `${provider}/core/${entry.name} lacks SKILL.md`); continue }
      const fm = parseFrontmatter(fs.readFileSync(skill, "utf8"))
      if (!byName.has(fm.name)) continue
      const differences = treeDiff(path.join(ROOT, byName.get(fm.name).path), path.join(bundle, entry.name), 12, false)
      if (differences.length) report.error("canonical-bundle", `${provider}/${entry.name}: ${differences.join(", ")}`)
    }
  }
  const preview = temporaryRoot("skills-pack-check-")
  try {
    const rendered = buildProviderTree(preview, PROVIDERS, ["core"])
    for (const provider of PROVIDERS) {
      const differences = treeDiff(path.join(ROOT, "providers", provider), path.join(rendered, provider))
      if (differences.length) report.error("render-live", `${provider}: ${differences.join(", ")}`)
      const snapshotDiff = treeDiff(path.join(ROOT, "providers", provider), path.join(ROOT, "providers-current", provider), 12, false)
      if (snapshotDiff.length) report.error("snapshot", `${provider}: ${snapshotDiff.join(", ")}`)
    }
  } catch (error) {
    report.error("render", error.message)
  } finally { trash(preview) }
}

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

function checkDocs(canonical, overlay, report) {
  const canonicalNames = new Set(canonical.map((pkg) => pkg.name))
  const actualCounts = Object.fromEntries(PROVIDERS.map((provider) => [provider, fs.readdirSync(path.join(ROOT, "providers", provider)).length]))
  const pack = fs.readFileSync(path.join(ROOT, "PACK.md"), "utf8")
  for (const match of pack.matchAll(/^\| `?([a-z-]+)`? \| (\d+) \|/gm)) {
    if (match[1] in actualCounts && Number(match[2]) !== actualCounts[match[1]]) report.error("docs-count", `PACK.md ${match[1]} says ${match[2]}; live has ${actualCounts[match[1]]}`)
  }
  const catalog = fs.readFileSync(path.join(ROOT, "reports/catalog/CATALOG-CONFORMS.md"), "utf8")
  const slotClaim = catalog.match(/(\d+) retained canonical slots/)
  if (slotClaim && Number(slotClaim[1]) !== canonical.length) report.error("docs-count", `current catalog report says ${slotClaim[1]} slots; source has ${canonical.length}`)
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

export function checkParity(rows, canonical, archetypes, report) {
  const byName = new Map(canonical.map((pkg) => [pkg.name, pkg]))
  const rowsByName = new Map(rows.map((row) => [row.name, row]))
  for (const pkg of canonical) {
    const row = rowsByName.get(pkg.name)
    if (!row) report.error("manifest-membership", `canonical package omitted from manifest: ${pkg.name}`)
    else {
      if (row.path !== pkg.path) report.error("manifest-path", `${pkg.name}: manifest path ${row.path} differs from ${pkg.path}`)
      if (row.use_when?.[0] !== pkg.fm.description) report.error("manifest-description", `${pkg.name} differs from canonical frontmatter`)
    }
  }
  for (const row of rows) if (!byName.has(row.name)) report.error("manifest-membership", `manifest row has no canonical package: ${row.name}`)
  let overlay = {}
  try { overlay = JSON.parse(fs.readFileSync(path.join(ROOT, "overlay-manifest.json"), "utf8")) }
  catch (error) { report.error("overlay-json", error.message) }
  checkOverlaySemantics(overlay, canonical, report)
  const names = new Set(byName.keys())
  for (const provider of PROVIDERS) checkProvider(provider, names, overlay, report)
  checkConsumerUnions(report)
  checkCompositionParity(canonical, report)
  checkRoutes(canonical, archetypes, report)
  checkDocs(canonical, overlay, report)
}
