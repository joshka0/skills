import fs from "node:fs"
import path from "node:path"
import { ROOT, atomicExchange, buildProviderTree, temporaryRoot, trash } from "./pack-common.mjs"

function packageAt(directory, name) {
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, "SKILL.md"), `---\nname: ${name}\ndescription: "Fixture ${name}. Use when the pack safety gate runs."\n---\n\n# ${name}\n`)
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
    fs.mkdirSync(path.join(fixture, "manifests"), { recursive: true })
    fs.writeFileSync(path.join(fixture, "manifests/skills.jsonl"), `${JSON.stringify({ name: "new-skill" })}\n`)
    packageAt(path.join(fixture, "providers/droid/old-skill"), "old-skill")
    packageAt(path.join(fixture, "bundles/droid/core/new-skill"), "new-skill")

    const rendered = buildProviderTree(path.join(work, "render"), ["droid"], ["core"], fixture)
    if (!fs.existsSync(path.join(rendered, "droid/new-skill/SKILL.md"))) throw new Error("fixture render omitted its new package")
    if (fs.existsSync(path.join(rendered, "droid/old-skill"))) throw new Error("fixture render retained a removed package")

    fs.mkdirSync(path.join(fixture, "bundles/droid/release"), { recursive: true })
    fs.cpSync(path.join(fixture, "bundles/droid/core/new-skill"), path.join(fixture, "bundles/droid/release/new-skill"), { recursive: true })
    expectFailure(
      () => buildProviderTree(path.join(work, "collision"), ["droid"], "full", fixture),
      /composition collision/
    )

    const external = path.join(work, "external-aliases")
    packageAt(path.join(external, "escaped-skill"), "escaped-skill")
    fs.symlinkSync(external, path.join(fixture, "bundles/droid/aliases"), "dir")
    expectFailure(
      () => buildProviderTree(path.join(work, "symlink"), ["droid"], ["aliases"], fixture),
      /symlinked composition ancestor/
    )

    packageAt(path.join(fixture, "providers/codex/old-skill"), "old-skill")
    packageAt(path.join(fixture, "bundles/codex/core/new-skill"), "new-skill")
    fs.mkdirSync(path.join(fixture, "providers/codex/.system"), { recursive: true })
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
