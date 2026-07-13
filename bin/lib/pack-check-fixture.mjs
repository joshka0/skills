import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { spawnSync } from "node:child_process"
import { ROOT, temporaryRoot, trash } from "./pack-common.mjs"

function copyInput(relative, fixture) {
  const source = path.join(ROOT, relative)
  if (!fs.existsSync(source)) return
  const destination = path.join(fixture, relative)
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.cpSync(source, destination, { recursive: true, preserveTimestamps: true })
}

function writeSkill(directory, name) {
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, "SKILL.md"), `---\nname: ${name}\ndescription: "Fixture ${name}. Use when testing check boundaries."\n---\n`)
}

export function runCheckBoundarySelfTest(report) {
  const work = temporaryRoot("skills-pack-check-fixture-")
  try {
    const fixture = path.join(work, "repo")
    for (const input of [
      "bin", "shared", "native", "catalog", "home", "providers", "scripts",
      "packs/joshka0", "reports/catalog", "reports/rubric", "README.md", "PACK.md", "AGENTS.md"
    ]) copyInput(input, fixture)

    writeSkill(path.join(fixture, "shared/general/fixture-omitted"), "fixture-omitted")
    writeSkill(path.join(fixture, "shared/general/skill-authoring/references/misplaced"), "misplaced")

    const packPath = path.join(fixture, "catalog/pack.json")
    const pack = JSON.parse(fs.readFileSync(packPath, "utf8"))
    const agentsSkill = pack.skills.find((skill) => skill.profiles?.agents)
    delete agentsSkill.profiles.agents
    pack.consumed_roots.codex.declared_duplicate_skills = []
    fs.writeFileSync(packPath, `${JSON.stringify(pack, null, 2)}\n`)

    const catalogPath = path.join(fixture, "reports/catalog/CATALOG-CONFORMS.md")
    const catalog = fs.readFileSync(catalogPath, "utf8").replace(
      "### A15", "| `retired-fixture` | none | PASS | N/A | PASS | PASS |\n\n### A15"
    )
    fs.writeFileSync(catalogPath, catalog)

    fs.appendFileSync(path.join(fixture, "shared/general/product-platform/SKILL.md"), "\n| `fixture-cycle` | fixture only | `infra-bundles` |\n")
    fs.appendFileSync(path.join(fixture, "shared/general/infra-bundles/SKILL.md"), "\n| `fixture-cycle` | fixture only | `product-platform` |\n")

    const accessTail = crypto.randomBytes(16).toString("base64url").toUpperCase().replace(/[^A-Z0-9]/g, "").padEnd(16, "Z").slice(0, 16)
    const secretTail = crypto.randomBytes(36).toString("base64url").slice(0, 40)
    const githubTail = crypto.randomBytes(36).toString("base64url").slice(0, 36)
    fs.appendFileSync(path.join(fixture, "native/agents/agent-vault-cli/SKILL.md"),
      `\naws_access_key_id = ${"AK"}IA${accessTail}\naws_secret_access_key = ${secretTail}\nfixture_token = ghp_${githubTail}\n`)

    const result = spawnSync(path.join(fixture, "bin/pack"), ["check"], {
      cwd: fixture,
      encoding: "utf8",
      env: { ...process.env, PACK_SKIP_SELF_TEST: "1" },
      maxBuffer: 8 * 1024 * 1024
    })
    const output = `${result.stdout}\n${result.stderr}`
    const expected = [
      "[canonical-shape] misplaced skill contract", "[catalog-membership] canonical package omitted from catalog: fixture-omitted",
      "[catalog-provider] agents", "[consumer-union] codex",
      "[route] route cycle begins at", "[docs-membership] current catalog report includes retired retired-fixture", "[secrets]"
    ]
    const missing = expected.filter((needle) => !output.includes(needle))
    if (result.status === 0 || missing.length) report.error("check-self-test", `boundary fixture missed: ${missing.join(", ") || "nonzero exit"}`)
    else report.pass("check boundary fixture: canonical, secret, catalog, union, route, and docs failures detected")
  } catch (error) {
    report.error("check-self-test", error.message)
  } finally {
    trash(work)
  }
}
