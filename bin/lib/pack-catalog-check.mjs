import fs from "node:fs"
import path from "node:path"
import {
  ROOT, PROVIDERS, buildProviderTree, providerPackages, temporaryRoot, trash, treeDiff
} from "./pack-common.mjs"
import { catalogEntries } from "./pack-catalog.mjs"

const ARCHETYPES = new Set(["leaf", "private-leaf", "suite", "router", "interaction"])
const ALIAS_STATUSES = new Set([
  "canonical", "alias", "reference-or-mode", "merged-or-legacy", "archive-only",
  "vendor-source", "generated-output", "system-installed", "needs-human-review"
])
const same = (left, right) => JSON.stringify([...left].sort()) === JSON.stringify([...right].sort())
const kebab = (value) => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)

function checkSkills(catalog, canonical, report) {
  const discovered = new Map(canonical.map((pkg) => [pkg.name, pkg]))
  const catalogNames = new Map()
  const aliasNames = new Set()
  for (const skill of catalog.skills) {
    if (!kebab(skill.name)) report.error("catalog-name", `invalid skill name: ${skill.name ?? "<missing>"}`)
    if (catalogNames.has(skill.name)) report.error("catalog-name", `duplicate catalog skill: ${skill.name}`)
    catalogNames.set(skill.name, skill)
    const source = discovered.get(skill.name)
    if (!source) report.error("catalog-membership", `catalog skill has no canonical package: ${skill.name}`)
    else {
      if (skill.path !== source.path) report.error("catalog-path", `${skill.name}: ${skill.path} differs from ${source.path}`)
      if (skill.use_when?.[0] !== source.fm.description) report.error("catalog-description", `${skill.name} differs from canonical frontmatter`)
    }
    if (!ARCHETYPES.has(skill.archetype)) report.error("catalog-archetype", `${skill.name}: invalid ${skill.archetype}`)
    if (!skill.category || !skill.priority || !skill.status) report.error("catalog-metadata", `${skill.name}: category, priority, and status are required`)
    if (!Array.isArray(skill.use_when) || !skill.use_when.length || !Array.isArray(skill.do_not_use_when) || !skill.do_not_use_when.length) {
      report.error("catalog-routing", `${skill.name}: use_when and do_not_use_when must be non-empty arrays`)
    }
    if (!Array.isArray(skill.aliases)) report.error("catalog-alias", `${skill.name}: aliases must be an array`)
    for (const alias of skill.aliases ?? []) {
      if (!alias.name || aliasNames.has(alias.name) || catalogNames.has(alias.name)) report.error("catalog-alias", `${skill.name}: duplicate or invalid alias ${alias.name}`)
      aliasNames.add(alias.name)
      if (!ALIAS_STATUSES.has(alias.status) || !alias.reason) report.error("catalog-alias", `${alias.name}: status and reason are required`)
    }
    const memberships = Object.entries(skill.profiles ?? {})
    if (!memberships.length) report.error("catalog-profile", `${skill.name}: no provider profile membership`)
    for (const [provider, profiles] of memberships) {
      if (!PROVIDERS.includes(provider)) report.error("catalog-profile", `${skill.name}: unsupported provider ${provider}`)
      if (!Array.isArray(profiles) || !profiles.length || new Set(profiles).size !== profiles.length) report.error("catalog-profile", `${skill.name}/${provider}: profiles must be unique and non-empty`)
      for (const profile of profiles ?? []) if (!catalog.profiles.includes(profile)) report.error("catalog-profile", `${skill.name}/${provider}: unknown profile ${profile}`)
    }
  }
  for (const pkg of canonical) if (!catalogNames.has(pkg.name)) report.error("catalog-membership", `canonical package omitted from catalog: ${pkg.name}`)
  for (const external of catalog.external_records ?? []) {
    if (!external.name || aliasNames.has(external.name) || !ALIAS_STATUSES.has(external.status) || !external.reason) {
      report.error("catalog-external", `invalid or duplicate external record: ${external.name ?? "<missing>"}`)
    }
    aliasNames.add(external.name)
  }
  report.pass(`declarative catalog: ${catalog.skills.length} skills, ${aliasNames.size} aliases/external records`)
}

function checkShape(catalog, canonical, report) {
  if (!same(catalog.providers, PROVIDERS)) report.error("catalog-providers", `provider allowlist differs: ${catalog.providers.join(",")}`)
  if (new Set(catalog.profiles).size !== catalog.profiles.length || catalog.profiles.some((profile) => !kebab(profile))) {
    report.error("catalog-profiles", "profile names must be unique kebab-case tokens")
  }
  const scopes = [...new Set(canonical.map((pkg) => pkg.path.split("/").slice(0, 2).join("/")))]
  if (!same(catalog.roots?.canonical ?? [], scopes) || catalog.roots?.native !== "native" || catalog.roots?.providers !== "providers") {
    report.error("catalog-roots", "catalog roots differ from canonical/native/generated repository roots")
  }
  if (!fs.existsSync(path.join(ROOT, "catalog/README.md"))) report.error("catalog-docs", "catalog/README.md is missing")
}

function checkNative(catalog, report) {
  const seen = new Set()
  for (const entry of catalog.provider_native_exceptions) {
    const key = `${entry.provider}/${entry.name}`
    if (seen.has(key)) report.error("catalog-native", `duplicate native exception: ${key}`)
    seen.add(key)
    if (!PROVIDERS.includes(entry.provider) || !["skill", "system-tree"].includes(entry.kind)) report.error("catalog-native", `${key}: invalid provider or kind`)
    if (entry.source !== `native/${entry.provider}/${entry.name}`) report.error("catalog-native", `${key}: source must be native/<provider>/<name>`)
    if (!fs.existsSync(path.join(ROOT, entry.source))) report.error("catalog-native", `${key}: source is missing`)
    if (!Array.isArray(entry.profiles) || !entry.profiles.length) report.error("catalog-native", `${key}: profiles are required`)
    for (const profile of entry.profiles ?? []) if (!catalog.profiles.includes(profile)) report.error("catalog-native", `${key}: unknown profile ${profile}`)
  }
  report.pass(`provider-native exceptions: ${seen.size}`)
}

function checkProviderMembership(catalog, report) {
  for (const provider of PROVIDERS) {
    const declared = catalogEntries(catalog, provider, "full").map((entry) => entry.name)
    const live = fs.readdirSync(path.join(ROOT, "providers", provider))
    if (!same(declared, live)) report.error("catalog-provider", `${provider}: catalog membership differs from live overlay`)
  }
}

function checkConsumers(catalog, canonical, report) {
  const canonicalByName = new Map(canonical.map((pkg) => [pkg.name, pkg]))
  if (!same(Object.keys(catalog.consumed_roots ?? {}), PROVIDERS)) report.error("consumer-model", "consumer keys differ from supported providers")
  for (const [consumer, model] of Object.entries(catalog.consumed_roots ?? {})) {
    if (!Array.isArray(model.roots) || !model.roots.length) { report.error("consumer-model", `${consumer}: roots must be non-empty`); continue }
    const seenRoots = new Set()
    const names = new Map()
    const duplicates = new Map()
    for (const root of model.roots) {
      if (root.consumer !== consumer || !PROVIDERS.includes(root.provider) || !/^\$HOME\/|^\$\{CODEX_HOME:-\$HOME\//.test(root.root ?? "")) {
        report.error("consumer-model", `${consumer}: invalid consumed root`)
      }
      if (seenRoots.has(root.root)) report.error("consumer-model", `${consumer}: duplicate root ${root.root}`)
      seenRoots.add(root.root)
      for (const pkg of providerPackages(path.join(ROOT, "providers", root.provider))) {
        if (names.has(pkg.name)) (duplicates.get(pkg.name) ?? duplicates.set(pkg.name, [names.get(pkg.name)]).get(pkg.name)).push({ provider: root.provider, pkg })
        else names.set(pkg.name, { provider: root.provider, pkg })
      }
    }
    const actual = [...duplicates.keys()].sort()
    const declared = model.declared_duplicate_skills ?? []
    if (model.duplicate_policy === "reject" && actual.length) report.error("consumer-union", `${consumer}: duplicate names ${actual.join(", ")}`)
    else if (model.duplicate_policy === "allow-declared-identical-canonical") {
      if (!same(actual, declared)) report.error("consumer-union", `${consumer}: declared overlap differs from actual overlap`)
      for (const name of actual) {
        const canonicalPkg = canonicalByName.get(name)
        if (!canonicalPkg) { report.error("consumer-union", `${consumer}: ${name} is not canonical`); continue }
        for (const item of duplicates.get(name)) {
          const packageRoot = path.dirname(item.pkg.skill)
          const differences = treeDiff(path.join(ROOT, canonicalPkg.path), packageRoot, 1, false)
          if (differences.length) report.error("consumer-union", `${consumer}: ${name} differs in ${item.provider}`)
        }
      }
    } else if (model.duplicate_policy !== "reject") report.error("consumer-model", `${consumer}: unknown duplicate policy ${model.duplicate_policy}`)
  }
  report.pass("consumed-root unions validated, including declared Codex Agents+Codex overlap")
}

function checkRender(catalog, report) {
  const preview = temporaryRoot("skills-pack-check-")
  try {
    const rendered = buildProviderTree(preview, PROVIDERS, "full")
    for (const provider of PROVIDERS) {
      const differences = treeDiff(path.join(ROOT, "providers", provider), path.join(rendered, provider))
      if (differences.length) report.error("render-live", `${provider}: ${differences.join(", ")}`)
    }
    report.pass("render-and-compare parity: 7 live providers")
  } catch (error) { report.error("render", error.message) }
  finally { trash(preview) }
}

export function checkCatalog(catalog, canonical, report) {
  checkShape(catalog, canonical, report)
  checkSkills(catalog, canonical, report)
  checkNative(catalog, report)
  checkProviderMembership(catalog, report)
  checkConsumers(catalog, canonical, report)
  checkRender(catalog, report)
}
