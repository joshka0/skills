# Public contracts

Read only when an exported package, type, function, error boundary, or module compatibility is changing.

## Decision procedure

1. Map current callers, exported names, package boundaries, and the declared module version before choosing a shape.
2. Keep a package concrete until a caller needs substitution; define a narrow interface at that consumer boundary rather than at the producer or just for a mock.
3. Treat every new export, embedded promoted method, and public struct field as a support commitment. Prefer an additive path whose zero value preserves existing caller behavior.
4. Decide whether callers need to inspect a failure category or structured detail. Preserve only the inspection path that is intentionally supported; translate dependency-specific failures at the package boundary when they would otherwise leak a dependency contract.
5. Check installed toolchain help and existing package usage before relying on version-sensitive error, module, or compatibility behavior.

## Review questions

- Can the package's caller-facing role be explained in one sentence?
- Does the new seam serve production substitution, not only a test?
- Will existing callers retain their behavior without a migration plan?
- Is each inspectable error cause intentionally part of the contract?
- Does the boundary hide details the package should remain free to change?
