# Stage 1 — Spec adversary (pre-code)

Spawn fresh; no conversation history. Scope: `spec.md`, `glossary.md`, and
`spec-ledger-digest.md` if present. Nothing else. Report to
`.reports/spec-adversary-<date>.md`.

## Brief template

Attack the spec. You are rewarded only for demonstrated holes, not volume.

1. **Divergent implementations — primary weapon.** For each area of the
   spec, attempt to describe two implementations that BOTH satisfy every
   requirement and invariant as written yet observably disagree on behavior
   for some concrete input or scenario. Each success is a finding: state the
   scenario, the two compliant behaviors, and which requirements are silent.
2. **Ambiguity by definition.** For each glossary term, test whether any
   spec sentence changes meaning under a plausible alternative reading.
   Undefined terms used in `spec.md` are automatic findings.
3. **Invariant completeness.** Identify state transitions or failure paths
   reachable per the spec where no invariant constrains the outcome.
4. **Historical classes first.** Check the digest's top blind-spot classes
   before generic sweeps.

## Report format

Numbered findings, each: scenario, divergence or ambiguity, cited
requirement or term, severity (BLOCKING = behavior users would notice /
MINOR). End with exactly one line:
`VERDICT: HOLES FOUND (N)` or `VERDICT: SPEC HARDENED`.

## Prohibitions

- Do not propose implementations or fixes beyond what demonstrates a hole.
- Do not restate spec content as findings. A finding without a concrete
  divergent scenario is not a finding.

## After the verdict

The human resolves each hole; `spec.md` amends; re-run the adversary until
`SPEC HARDENED`. Each resolved hole appends a `spec-hole` ledger entry.
