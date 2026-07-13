import fs from "node:fs"
import path from "node:path"

export function loadCatalog(root) {
  const file = path.join(root, "catalog/pack.json")
  if (!fs.existsSync(file)) throw new Error("composition catalog is missing: catalog/pack.json")
  let catalog
  try { catalog = JSON.parse(fs.readFileSync(file, "utf8")) }
  catch (error) { throw new Error(`invalid composition catalog: ${error.message}`) }
  if (catalog.schema_version !== 1) throw new Error(`unsupported catalog schema: ${catalog.schema_version ?? "<missing>"}`)
  if (!Array.isArray(catalog.providers) || !catalog.providers.length) throw new Error("catalog providers must be a non-empty array")
  if (!Array.isArray(catalog.profiles) || !catalog.profiles.length) throw new Error("catalog profiles must be a non-empty array")
  if (!Array.isArray(catalog.skills)) throw new Error("catalog skills must be an array")
  if (!Array.isArray(catalog.provider_native_exceptions)) throw new Error("catalog provider_native_exceptions must be an array")
  return catalog
}

export function profilesForSelection(catalog, selection) {
  return selection === "full" ? catalog.profiles : selection
}

export function catalogEntries(catalog, provider, selection) {
  const selected = new Set(profilesForSelection(catalog, selection))
  const entries = []
  for (const skill of catalog.skills) {
    if ((skill.profiles?.[provider] ?? []).some((profile) => selected.has(profile))) {
      entries.push({ name: skill.name, source: skill.path, kind: "skill", owner: `catalog skill ${skill.name}` })
    }
  }
  for (const native of catalog.provider_native_exceptions) {
    if (native.provider === provider && native.profiles.some((profile) => selected.has(profile))) {
      entries.push({ ...native, owner: `native exception ${native.provider}/${native.name}` })
    }
  }
  return entries.sort((left, right) => left.name.localeCompare(right.name))
}

export function consumerProviders(catalog) {
  return Object.fromEntries(Object.entries(catalog.consumed_roots ?? {}).map(([consumer, model]) => [
    consumer, model.roots?.map((root) => root.provider) ?? []
  ]))
}

export function nativeEntries(catalog) {
  const result = {}
  for (const native of catalog.provider_native_exceptions) (result[native.provider] ??= []).push(native.name)
  for (const entries of Object.values(result)) entries.sort()
  return result
}
