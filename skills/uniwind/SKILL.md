---
name: uniwind
description: "Apply Uniwind styling conventions and migrations. Use when changing semantic themes, class scanning, component bindings, Metro integration, or replacing NativeWind."
---

# Uniwind

Use the installed package and the project's existing styling and build setup.
Check current types or primary documentation for version-sensitive APIs.

| Need | Read |
| --- | --- |
| Tokens, themes, static classes, or component bindings | [house-conventions](references/house-conventions.md) |
| NativeWind migration | [migration](references/migration.md) |
| Local build or startup investigation | [local-dev](references/local-dev.md) |

Keep utility candidates statically discoverable and theme values semantic.
Bind third-party components at their actual style/non-style prop boundary;
do not wrap primitives already supported by the installed integration.

Verify the changed styles in the intended native runtime and themes. Follow the
repository's run instructions. A failure observed in one project's dev client
is not a universal Uniwind launch restriction.
