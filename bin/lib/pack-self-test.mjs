import fs from "node:fs"
import path from "node:path"
import { ROOT, atomicExchange, buildProviderTree, temporaryRoot, trash } from "./pack-common.mjs"

function packageAt(directory, name) {
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, "SKILL.md"), `---\nname: ${name}\ndescription: "Fixture ${name}. Use when the pack safety gate runs."\n---\n\n# ${name}\n`)
}

function writeCatalog(fixture, mutate = () => {}) {
  const catalog = {
    schema_version: 1,
    providers: ["droid", "codex"],
    profiles: ["core"],
    skills: [{
      name: "new-skill", path: "shared/general/new-skill", profiles: { droid: ["core"], codex: ["core"] }
    }],
    provider_native_exceptions: [],
    consumed_roots: {}
  }
  mutate(catalog)
  fs.mkdirSync(path.join(fixture, "catalog"), { recursive: true })
  fs.writeFileSync(path.join(fixture, "catalog/pack.json"), `${JSON.stringify(catalog, null, 2)}\n`)
}

function expectFailure(action, pattern) {
  try { action() } catch (error) {
    if (pattern.test(error.message)) return
    throw new Error(`safety fixture failed with the wrong error: ${error.message}`)
  }
  throw new Error(`safety fixture unexpectedly passed: ${pattern}`)
}

export function runSafetySelfTest(report) {
  const work = temporaryRoot("skills-pack-safety-")
  try {
    const fixture = path.join(work, "repo")
    writeCatalog(fixture)
    packageAt(path.join(fixture, "providers/droid/old-skill"), "old-skill")
    packageAt(path.join(fixture, "shared/general/new-skill"), "new-skill")

    const rendered = buildProviderTree(path.join(work, "render"), ["droid"], ["core"], fixture)
    if (!fs.existsSync(path.join(rendered, "droid/new-skill/SKILL.md"))) throw new Error("fixture render omitted its new package")
    if (fs.existsSync(path.join(rendered, "droid/old-skill"))) throw new Error("fixture render retained a removed package")

    packageAt(path.join(fixture, "native/droid/new-skill"), "new-skill")
    writeCatalog(fixture, (catalog) => catalog.provider_native_exceptions.push({
      provider: "droid", name: "new-skill", source: "native/droid/new-skill", kind: "skill", profiles: ["core"]
    }))
    expectFailure(
      () => buildProviderTree(path.join(work, "collision"), ["droid"], "full", fixture),
      /composition collision/
    )

    const external = path.join(work, "external-aliases")
    packageAt(external, "new-skill")
    fs.symlinkSync(external, path.join(fixture, "shared/general/escaped-skill"), "dir")
    writeCatalog(fixture, (catalog) => { catalog.skills[0].path = "shared/general/escaped-skill" })
    expectFailure(
      () => buildProviderTree(path.join(work, "symlink"), ["droid"], ["core"], fixture),
      /symlinked composition ancestor/
    )

    packageAt(path.join(fixture, "providers/codex/old-skill"), "old-skill")
    fs.mkdirSync(path.join(fixture, "native/codex/.system"), { recursive: true })
    writeCatalog(fixture, (catalog) => catalog.provider_native_exceptions.push({
      provider: "codex", name: ".system", source: "native/codex/.system", kind: "system-tree", profiles: ["core"]
    }))
    expectFailure(
      () => buildProviderTree(path.join(work, "native"), ["codex"], ["core"], fixture),
      /marker is missing or malformed/
    )

    const left = path.join(work, "exchange-left")
    const right = path.join(work, "exchange-right")
    fs.mkdirSync(left)
    fs.mkdirSync(right)
    fs.writeFileSync(path.join(left, "left"), "left")
    fs.writeFileSync(path.join(right, "right"), "right")
    atomicExchange(left, right, ROOT)
    if (!fs.existsSync(path.join(left, "right")) || !fs.existsSync(path.join(right, "left"))) {
      throw new Error("atomic exchange did not swap directory identities")
    }
    expectFailure(() => atomicExchange(left, path.join(work, "missing"), ROOT), /atomic provider exchange failed/)
    report.pass("safe composer fixture: confinement, collision, native shape, atomic success/failure")
  } catch (error) {
    report.error("composer-self-test", error.message)
  } finally {
    trash(work)
  }
}
