---
name: go-lang-packages-api
description: >-
  Design and review Go package, module, and public API shape. Use when working
  with package layout, internal packages, cmd directories, go.mod, module
  versions, exported names, zero values, compatibility, constructors, or
  public struct fields.
---

# Go Packages And APIs

Use this skill when the task changes package boundaries, module shape, or
exported API commitments.

## Workflow

1. Start from the current `go.mod`, package names, import graph, and existing
   command layout.
2. Keep unstable helpers under `internal/` until supporting them publicly is a
   deliberate decision.
3. Use `cmd/<name>/main.go` when a repo contains multiple commands.
4. Prefer fewer coherent packages over many taxonomy packages.
5. Choose short package names that describe what callers do with the package.
6. Export only names you are willing to support.
7. Prefer additive API evolution after v1: add functions, methods, options, or
   fields with safe zero values instead of changing existing contracts.
8. If a module reaches v2 or later, use the `/vN` module path convention.
9. Keep contexts as explicit first parameters for request-scoped operations.
10. Preserve useful zero values where practical.

## Naming Defaults

- Package names should be short, lowercase, and unambiguous.
- Constructors are ordinary functions, usually `New` or `NewThing`.
- Getters normally omit `Get`, for example `Owner()` rather than `GetOwner()`.
- Interface names often describe behavior, such as `Reader`, `Writer`,
  `Store`, or `Clock`.
- Avoid `util`, `common`, `types`, `models`, and `interfaces` as package names
  unless the domain genuinely uses those words.

## Hard Rules

- Do not export a name because a nearby package wants to test it.
- Do not create package boundaries just to mirror a folder taxonomy.
- Do not put all cross-cutting helpers in a `common` dumping ground.
- Do not add fields to exported structs unless the zero value preserves old
  behavior for existing callers.
- Do not store `context.Context` in structs.
- Do not change or remove public API in a stable module without an explicit
  versioning plan.

## Review Checks

- Can the package be explained in one sentence from the caller's perspective?
- Is each exported name part of the intended support surface?
- Are internal dependencies hidden behind package boundaries that can evolve?
- Does the package name read naturally at call sites?
- Can existing callers keep compiling after this change?
