# Local build and startup investigation

Use the repository's run skill or build scripts. Confirm the installed Uniwind
wrapper, CSS entry, native dependencies, and actual bundle path before
attributing a startup failure to application code.

If public build-time configuration is inlined, verify it in the built artifact
without exposing secrets. Check generated dotenv files for duplicate keys when
the generator can append values. Resolve hostnames and listener behavior from
the current environment rather than a fixed Node-version rule.

Praize's known Release lane, dev-client crash history, environment traps, and
simulator host rules already live in its `.claude/skills/run-ios-sim/SKILL.md`.
Read that project file for Praize work. Other apps use their own verified lane.

Record new project-specific failures in that project's run notes. Continue
diagnosis from current evidence; do not impose a global fallback or stop after
a fixed set of checks.
