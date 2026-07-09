# Migrate ShoeHorn

Use this mode only for test code that must replace `as` assertions with `@total-typescript/shoehorn` conventions.

1. Inspect the installed package, lockfile, local types, and current primary documentation before choosing its migration API.
2. Keep ordinary partial fixtures distinct from intentionally malformed input used to exercise validation paths.
3. Change only the named test files and imports; do not introduce ShoeHorn into production code or install a dependency without user approval.
4. Run the repository's type and focused test checks.

Report the files migrated, the installed-version evidence, the preserved invalid-input cases, and verification results.
