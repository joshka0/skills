# Delta Brief

Use this mode only for agents already working from stale context after a settled decision changed.

First update the durable source of truth that a fresh session would read. Identify the actual in-flight recipients; fresh sessions that load that source need no message. Send each stale recipient one bounded brief containing:

1. the change since its earlier context;
2. the concrete old-to-new difference;
3. the invariant behind the change;
4. the exact artifact or area to revisit; and
5. what explicitly remains unchanged, plus the durable source to read.

Queue the brief until the recipient is idle unless the active task explicitly
authorizes interruption. Split unrelated change events. Do not use a chat message
as a competing specification or as the only record of the decision.
