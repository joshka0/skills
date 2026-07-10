# Review sprawl

Use this mode for a requested maintainability or sprawl review. Apply the harsh pass only when the user explicitly asks for it.

Inspect the requested diff or surface first. Seek high-conviction structural findings rather than cosmetic nits:

- A code-judo move that deletes branches, wrappers, modes, or layers instead of polishing them.
- New scattered conditionals, fallback paths, nullable modes, casts, or stringly contracts that signal a missing model.
- Thin abstractions, pass-through modules, duplicate helpers, or logic placed outside its canonical owner.
- A large or coupled module whose behavior would become clearer through a smaller owned flow or an explicit seam.
- Sequential or half-applied orchestration when a simpler atomic or independent structure is available.

For each finding, give the evidence, the structural payoff, and whether it blocks the requested quality bar. Prefer a few findings that simplify the shape over a long list of style comments.
