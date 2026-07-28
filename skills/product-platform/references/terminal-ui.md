# Terminal UI

Read this only for the `terminal-ui` target.

1. Treat the terminal as a keyboard-first command environment: every important action needs a discoverable keyboard path and visible focus state.
2. Restore renderer, raw-mode, and alternate-screen state on normal exit, error, and interruption; keep application output separate from the rendered UI.
3. Make layout adapt to constrained terminal dimensions and use whitespace, semantic color, and text attributes before decorative box chrome.
4. Make asynchronous, empty, error, confirmation, scroll, and log states explicit; never hide failures behind a transient status update.
5. Test Unicode width, color/theme behavior, resize, and keyboard flow in the intended terminal environments.

Do not treat mouse hover or continuous animation as required interaction. Verify cleanup and recovery before calling the interface complete.
