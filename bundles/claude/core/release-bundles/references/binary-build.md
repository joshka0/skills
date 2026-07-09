# Binary And Build

Read this only for the `binary-build` mode.

1. Inspect the actual release artifact, app identity, version/build identity, signing state, declared native capabilities, and release configuration.
2. Verify current platform/toolchain requirements from live sources; distinguish an upload/build requirement from a supported-device requirement.
3. Confirm the release configuration has no accidental development endpoint, debug-only path, placeholder content, unintended entitlement, or unnecessary permission.
4. Check that native changes and over-the-air/update compatibility share a deliberate version boundary when the project uses update delivery.
5. Test a clean install, upgrade path, denied-permission path, and any reviewer-critical external dependency on the release-distributed artifact.

Escalate signing, identity, capability, encryption/export, or update-compatibility uncertainty before release automation. Do not turn a build command into evidence that the binary is ready.
