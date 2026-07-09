# Cross-mode standards

Read this only when the selected work changes or judges interaction, motion, accessibility, responsive behavior, dynamic layout, input-aware prefetching, or data typography.

- Use semantic, labelled controls with visible keyboard focus and logical focus order. Verify current accessibility requirements with repository tooling and primary standards rather than frozen thresholds.
- Do not make color the only carrier of status or meaning. Test contrast and non-color cues in the actual theme and state.
- Keep keyboard and high-frequency interaction immediate. Honor reduced-motion preferences, keep essential feedback comprehensible, and disable input on elements that are exiting.
- Give motion a feedback, state, or spatial purpose. Measure its cost; favor compositor-friendly changes when appropriate instead of layout-thrashing animation. For user-driven or interruptible motion, preserve the current state and release velocity when present rather than restarting a fixed-duration timeline.
- If sound feedback is used, pair it with equivalent visual state, provide a clear sound-off control, and never attach it to typing, keyboard navigation, or decorative/high-frequency events.
- Adapt content and interaction to real viewport and input constraints; do not hide core capability merely because the screen is smaller.
- Add intent prefetching only when latency evidence justifies it. When it is used, support keyboard-focus and touch-safe signals rather than pointer-only or hover-only prediction.
- Preserve one obvious next action and progressive disclosure when choices or controls would otherwise overload the task.
- Use a coherent spacing/token scale. Use tabular figures when aligned numeric columns communicate data. For a measured animated container, do not animate an initial zero or unknown measurement; use natural size until it is valid, then observe changes rather than read layout in a render loop.
