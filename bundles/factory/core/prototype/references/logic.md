# Logic prototype

Read this only when the question is state behavior or data shape.

Build a tiny interactive terminal harness around a pure reducer, state machine, or small pure-function surface. Keep terminal rendering outside the logic and keep state in memory unless persistence itself is the question. Render the full relevant state after each user action and provide one run command through the repository's existing task runner.

Use the harness to drive cases that are hard to reason about on paper. Capture the accepted or rejected model decision when finished; keep only a deliberately promoted pure logic seam, never the terminal shell by accident.
