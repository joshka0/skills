---
name: regression-tests
description: Create a deterministic regression test for a fixed bug or difficult issue. Adds a new case under tests/regression/<index>-<descriptive-title>/ and wires it into CI via a stable runner script, using the repo's existing test framework when possible.
---

# Regression Tests Skill

## Goal
When a bug is fixed (or a tricky incident is resolved), create a **regression test case in its own directory** so it runs in CI/CD and prevents recurrence.

This skill should be used when:
- A bug was fixed and we need to lock in the behavior with a test.
- A "difficult issue" was resolved (race, edge case, integration break, parsing bug, tooling failure).
- The user asks for "add a regression test", "prevent this from happening again", "cover this edge case".

This skill should NOT be used for:
- New feature tests (unless the feature is specifically a bug fix behind a flag).
- Broad refactors where no specific bug/incident is being prevented.

---

## Inputs (use what's available, don't block)
Use any of the following if present (in conversation, issue text, commit diff, logs, etc.):
- Issue title or short description of the bug
- Steps to reproduce (inputs, commands, API calls)
- Expected vs actual behavior
- The fix that was made (files changed)

---

## Standard directory structure (required)
Create exactly one new folder per bug/incident:

`tests/regression/<index>-<descriptive-title>/`

Inside it:
- `README.md` (what broke, what we expect, how to run locally)
- `run.sh` (single entrypoint for this case; CI calls this)

Optional:
- `fixtures/` (golden inputs/outputs)
- `notes.md` (longer debugging context; keep README short)
- `repro.md` (if there's a manual repro path worth documenting)

Naming rules:
- `<index>`: sequential number (001, 002, etc.) - find the highest existing index and increment
- `<descriptive-title>`: kebab-case, 3–8 words describing the bug clearly
- Be specific and descriptive (include what failed and the condition)
- Avoid generic names like "fix-bug" or "crash-issue"

Examples:
- `tests/regression/001-null-pointer-on-empty-config/`
- `tests/regression/002-race-condition-in-concurrent-writes/`
- `tests/regression/003-parser-fails-on-nested-json-arrays/`

---

## One-time repo harness (create if missing)
Ensure a stable runner exists:

- `tests/regression/README.md`
- `tests/regression/run.sh`

`tests/regression/run.sh` must:
- Discover each case directory under `tests/regression/*/`
- Execute the case's `run.sh`
- Fail fast with a clear error
- Be deterministic (no network unless explicitly mocked/recorded)

If the repo already has a regression harness, reuse it (do not introduce a second system).

Templates are available in `assets/` within this skill folder.

---

## How to implement the regression test
### 1) Prefer the repo's existing test framework
Detect the existing test runner(s) by scanning for common signals:
- Python: `pytest.ini`, `pyproject.toml`, `tox.ini`
- JS/TS: `package.json` test scripts, `jest.config.*`, `vitest.config.*`
- Go: `go.mod`, `_test.go`
- Rust: `Cargo.toml`
- Java: `pom.xml`, `build.gradle`
- .NET: `*.csproj`, `*.sln`

If there is an existing framework:
- Implement the actual assertion in that framework (unit/integration as appropriate).
- Keep the test close to the bug's surface area (public API, CLI, or boundary layer).
- Then make the regression case's `run.sh` call the framework with a narrow selector (single file / single test / single package).

Example patterns:
- `pytest -q tests/regression/<case>/test_*.py`
- `npm test -- tests/regression/<case>`
- `go test ./... -run TestName` (or package-limited)
- `cargo test test_name`

### 2) Fallback: scripted regression test
If there is no usable test framework (or the bug is about a tool/script/config):
- Write `run.sh` that reproduces and asserts via exit codes and/or diffing golden output.
- Use `set -euo pipefail`.
- Prefer `diff -u` against fixtures or a small inline assertion.

---

## Determinism & quality gates (required)
Your regression test MUST be:
- **Deterministic**: fixed seeds, frozen time if needed, no randomness
- **Self-contained**: uses local fixtures; no real external services
- **Minimal**: smallest input that reproduces the bug
- **Fast**: aim < 2–5 seconds; if slower, justify in README

If the original bug was flaky (race, timing):
- Do NOT create a flaky regression test.
- Instead: structure the test to make the failure deterministic (mock time, control scheduling, use a deterministic executor, simulate boundary conditions).
- If you must loop, use bounded attempts with clear failure output, and explain why it's stable.

---

## CI/CD wiring (required)
Goal: CI should run regression tests on every PR/push.

Preferred:
- Add `tests/regression/run.sh` to the existing CI test job.

If CI config is unknown:
- Search for `.github/workflows/*`, `.gitlab-ci.yml`, `Jenkinsfile`, `azure-pipelines.yml`, etc.
- Add one step invoking: `bash tests/regression/run.sh`

If the repo already runs the full test suite and it automatically discovers regression tests, you may not need an extra step—but still keep `tests/regression/run.sh` as the stable entrypoint (helps local + CI consistency).

---

## Workflow checklist (do these in order)
1. Identify the bug's "trigger" (inputs/commands/API call)
2. Identify the "assertion" (what must be true after the fix)
3. Create the case directory under `tests/regression/`
4. Create/update the repo harness (`tests/regression/run.sh`) if missing
5. Implement the test (framework-first, otherwise scripted)
6. Verify locally:
   - The case `run.sh` passes
   - `tests/regression/run.sh` passes
7. Wire CI to call `bash tests/regression/run.sh`
8. Update PR/commit notes with:
   - What regression case was added
   - How to run it locally

---

## Output format (when you finish)
Report:
- Files added/changed
- Exact commands to run locally
- CI entrypoint used
- Any tradeoffs (fixtures, mocks, why integration vs unit)

---

## Templates
- Root harness README: `assets/root-README.template.md`
- Root harness script: `assets/root-run.template.sh`
- Case README: `assets/case-README.template.md`
- Case run.sh: `assets/case-run.template.sh`
