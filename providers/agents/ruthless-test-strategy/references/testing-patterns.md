# Testing Pattern Catalog

Use this catalog when choosing the right test style for a risk. Do not apply
every pattern by default. Pick the smallest pattern that proves the important
behavior and can run at the right feedback stage.

## Selection Order

1. Start with the protected behavior: domain rule, boundary, output, system
   contract, recovery path, or release gate.
2. Choose the narrowest useful boundary that still catches the bug that matters.
3. Add generated, adversarial, or system-level tests only when examples are not
   enough.
4. Put slow or expensive checks in the right layer: PR, nightly, pre-release, or
   manual hardening.
5. Promote any discovered failure into a deterministic regression test.

## Correctness Construction

### Table-Driven Unit Tests

Use for pure logic, validators, parsers, config, CLI flags, formatting, and
small business rules with clear inputs and outputs.

Require:

- behavior-oriented case names
- normal, boundary, invalid, and historical regression cases
- one shared assertion flow with precise failure output
- externally visible assertions, not private implementation checks

Avoid huge anonymous tables, happy-path-only tables, and table tests where
separate named tests would explain the behavior better.

### Domain and Invariant Tests

Use for business, security, trust, workflow, billing, lifecycle, authorization,
and policy rules where invalid state would be harmful.

Require:

- the domain concept and vocabulary in the test names
- positive and negative examples for each invariant
- invalid-state construction and invalid-transition checks
- assertions close to the domain layer instead of only broad end-to-end checks

Avoid testing getters/setters, allowing invalid states and hoping a later layer
catches them, or hiding critical rules only in UI tests.

### Property-Based Tests

Use when a behavior has a stable property across many possible inputs:
round-trip, idempotence, preservation, ordering, narrowing, commutativity,
monotonicity, or safety.

Require:

- a property stronger than "does not crash"
- realistic generators with useful edge-shaped data
- reproducible seeds or minimized failing cases
- conversion of meaningful minimized failures into regression fixtures

Avoid reimplementing production logic in the property, generating only trivial
inputs, and using property tests as a replacement for clear examples.

### State-Machine Tests

Use for lifecycles with allowed and forbidden transitions: jobs, review flows,
payment states, verification states, approval/rejection, retry/cancel paths, or
terminal states.

Require:

- an explicit transition table
- tests for critical allowed and forbidden transitions
- terminal-state protection
- side-effect, idempotency, retry, and audit/history assertions

Avoid loose string states, happy-path-only lifecycles, transitions from any
state to any other state, and losing history during retries or recovery.

## Boundary and Input Defense

### Fuzz Tests

Use for untrusted or complex input: parsers, decoders, archives, manifests,
lockfiles, URLs, JSON/YAML/TOML, protocol payloads, signatures, compressed or
binary data.

Require:

- small focused fuzz targets
- valid and invalid seed corpus
- panic, hang, memory, timeout, and unsafe-behavior checks
- semantic assertions for valid parsed output when possible
- saved crashing inputs as regression fixtures

Avoid fuzzing huge end-to-end flows, ignoring slow-path attacks or resource
exhaustion, and discarding discovered crashing inputs.

### Fault-Injection Tests

Use for systems that depend on networks, registries, databases, queues,
filesystems, subprocesses, caches, or external APIs.

Require:

- realistic failure modes: timeout, unavailable dependency, corrupt data,
  partial write, stale cache, permission failure, non-zero exit
- retry budget and backoff expectations
- consistency checks after partial failure
- visible logs, metrics, audit events, or error surfaces

Avoid idealized mocks that cannot express real failure modes, silent fallbacks,
infinite retries, and tests that ignore duplicate or half-applied state.

## Output Stability

### Golden File Tests

Use when generated output is large, structured, reviewed by humans, or consumed
externally: CLI output, reports, generated config, markdown, JSON snapshots,
audit logs, code generation.

Require:

- stable input fixtures
- normalization of timestamps, IDs, paths, ordering, and nondeterminism
- readable diffs
- an explicit update command or flag
- human review of golden diffs before accepting updates

Avoid blind golden updates, giant snapshots nobody reviews, unstable output, and
golden files where one precise assertion would be clearer.

## System Boundaries

### Integration Tests

Use when confidence depends on real component interaction: database behavior,
filesystem operations, subprocesses, registry flows, queues, caches, API
clients, framework routing, serialization, migrations, or dependency wiring.

Require:

- deterministic setup for real or realistic dependencies
- realistic fixtures and isolated state
- assertions through externally visible outcomes
- cleanup between tests
- separation between fast integration checks and slow environment-heavy suites

Avoid shared mutable test state, fragile local-machine assumptions, live
third-party services in PR checks, and calling every broad test an integration
test without naming the boundary.

### Contract Tests

Use when producers and consumers evolve independently: APIs, plugins, webhooks,
agent protocols, RPC boundaries, package registries, provider integrations, and
public SDK/library contracts.

Require:

- concrete consumer expectations
- request and response examples
- success, error, timeout, versioning, and compatibility cases
- provider verification before release
- consumer behavior against a contract-accurate double when useful

Avoid schema-only validation, ignoring error semantics, mocks that drift from
production, and accepting incompatible provider changes because local tests
compile.

## Test Quality and Release Gates

### Mutation Tests

Use on critical logic when coverage exists but assertion quality is uncertain:
security, policy engines, permission logic, verification logic, financial
calculations, dense conditionals, and core algorithms.

Require:

- targeted packages rather than the whole codebase by default
- review of surviving mutants
- strengthened tests for meaningful survivors
- explicit marking of equivalent or irrelevant mutants only after review
- score tracking only for critical areas

Avoid chasing 100 percent mutation score everywhere, mutating boilerplate,
ignoring survivors in critical logic, and treating line coverage as proof of
test strength.

### CI Smoke and Regression Tests

Use to keep the project releasable: PR confidence, release branches, deploy
pipelines, nightly validation, hotfix checks, and historical bug prevention.

Require:

- fast smoke checks for must-never-break flows
- regression tests tied to real bugs or plausible high-impact risks
- clear split between pre-commit, PR, nightly, and release gates
- actionable failure names and logs
- a policy for flaky tests: fix, quarantine with owner/expiry, or remove from
  gating

Avoid running every slow test on every small change, normalizing red builds,
smoke tests that prove little, and regression tests disconnected from the bug
they protect.

## Useful Agent Groupings

- **Test Designer**: table-driven tests, domain invariants, property tests.
- **Adversarial Tester**: fuzzing, mutation testing, fault injection.
- **System Validator**: integration tests, contract tests, state machines.
- **Release Confidence**: golden files, smoke checks, regression gates.

## Output For A Test Plan

When recommending patterns, include:

```markdown
Protected risk:
Chosen pattern:
Why this boundary:
Required fixtures or harness:
What failure would prove:
Feedback stage:
Patterns intentionally not used:
```
