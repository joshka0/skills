---
name: go-lang-design
description: >-
  Apply idiomatic Go design and maintainability patterns. Use when designing
  or reviewing Go interfaces, concrete types, composition, embedding,
  constructors, functional options, builders, decorators, adapters, strategies,
  factories, or singleton-like state.
---

# Go Language Design

Use this skill when the task is about the shape of Go code, not just syntax.

## Workflow

1. Read the existing package and call sites before choosing a pattern.
2. Keep APIs concrete until polymorphism has a real caller-side purpose.
3. Define interfaces where they are consumed, not where implementations live.
4. Return concrete types from constructors unless hiding the implementation is
   the explicit product of the package.
5. Prefer composition with explicit fields. Use embedding only when promoted
   methods are intended behavior, especially in exported structs.
6. Choose the lightest construction pattern:
   - required values as ordinary constructor parameters
   - simple optional settings as a config struct or direct fields
   - many evolving optional settings as functional options
   - staged construction with cross-field validation as a builder
   - environment or config-driven implementation selection as a factory
7. Use decorators and adapters around small behavior contracts such as
   `io.Reader`, `http.Handler`, or `http.RoundTripper`.
8. Use function types for simple strategies before inventing a one-method
   interface.
9. Avoid singleton-style globals unless the state is truly process-global,
   lazily initialized, and effectively immutable.

## Hard Rules

- Do not create producer-side interfaces solely for mocks.
- Do not return a broad interface from `New...` just to look abstract.
- Do not simulate inheritance with deep embedded base structs.
- Do not expose embedded external types in public structs casually; promoted
  methods become part of the public reasoning surface.
- Do not use functional options for required arguments.
- Do not use builders for ordinary structs that a literal or constructor can
  make clear.
- Prefer dependency injection over package-level mutable state.

## Pattern Choices

- **Consumer-side interface**: use for a narrow seam needed by a caller.
- **Composition**: default for services, dependencies, and reusable behavior.
- **Embedding**: use for deliberate method promotion, not subclassing.
- **Functional options**: use for exported constructors with several optional
  knobs and stable defaults.
- **Builder**: use for staged construction and validation-heavy values.
- **Decorator**: use for logging, tracing, metrics, retries, auth, caching, or
  validation around a small interface.
- **Adapter**: use to isolate third-party, legacy, or transport-specific APIs.
- **Strategy**: use for swappable algorithms or policies; prefer function
  values when sufficient.
- **Factory**: use to centralize implementation selection; keep switches small.
- **Singleton**: treat as a last resort; prefer explicit dependencies.

## Review Checks

- Can the main type be constructed and used without test-only abstractions?
- Is each interface smaller than the behavior actually consumed?
- Are defaults visible and safe?
- Is the zero value useful where practical?
- Can the public API evolve by adding, not changing or removing?
