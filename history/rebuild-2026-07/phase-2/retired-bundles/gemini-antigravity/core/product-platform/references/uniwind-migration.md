# NativeWind To Uniwind Migration

Read this only for the `uniwind-migration` target.

1. Inventory existing NativeWind, compatibility-layer, Babel, Metro, CSS-entry, generated-type, theme-wrapper, and dynamic-class usage before changing dependencies.
2. Treat the installed Uniwind and Tailwind versions plus current migration documentation as the source of truth; do not copy a version-specific config from memory.
3. Remove NativeWind compatibility imports and wrappers deliberately, including interop/remapping code, before declaring the migration complete.
4. Preserve visual scale, semantic theme tokens, safe-area behavior, and third-party component bindings; resolve conflicting class construction through an existing project convention.
5. Search for stale NativeWind imports/configuration after the migration and verify styles, themes, fonts, and safe areas on the supported platforms.

Hand ordinary Uniwind configuration or styling decisions to the standalone `uniwind` skill after the migration boundary is resolved.
