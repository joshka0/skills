# Cross-mode standards

Read this only when the selected work changes or judges interaction, motion, accessibility, responsive behavior, dynamic layout, or data typography.

- Use semantic, labelled controls with visible keyboard focus and logical focus order. Verify current accessibility requirements with repository tooling and primary standards rather than frozen thresholds.
- Do not make color the only carrier of status or meaning. Test contrast and non-color cues in the actual theme and state.
- Make keyboard navigation immediate. Honor reduced-motion preferences, keep essential feedback comprehensible, and disable input on elements that are exiting.
- Give motion a feedback, state, or spatial purpose. Measure its cost; favor compositor-friendly changes when appropriate instead of layout-thrashing animation.
- Adapt content and interaction to real viewport and input constraints; do not hide core capability merely because the screen is smaller.
- Preserve one obvious next action and progressive disclosure when choices or controls would otherwise overload the task.
- Use a coherent spacing/token scale. Use tabular figures when aligned numeric columns communicate data, and use observer-based measurement rather than render-loop layout reads for dynamic containers.
