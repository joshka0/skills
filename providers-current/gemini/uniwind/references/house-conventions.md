# Uniwind House Conventions

Read this when the selected Uniwind change needs configuration, binding, theme, or diagnosis detail.

1. Keep the CSS entry file in the repository's supported location and make scanner/source paths explicit in monorepos.
2. Treat Metro/Vite wrappers, generated types, and platform support as installed-version facts; inspect them before repairs or upgrades.
3. Use static utilities for scanner-visible states. For conditional composition, use the repository's established merge/helper convention rather than interpolating arbitrary utility fragments.
4. Keep custom themes in CSS/token definitions with equivalent semantic coverage; scope a subtree only when it must differ from the application theme.
5. Use adapter/binding APIs only for third-party components whose actual props need them, and confirm non-style color behavior against current documentation.
6. Diagnose styling failures from configuration, CSS entry import, scanner coverage, and generated output before changing component code.

Do not retain API tables here. Use the installed package, Uniwind MCP when available, or primary documentation for hooks, component props, Pro behavior, and current integration details.
