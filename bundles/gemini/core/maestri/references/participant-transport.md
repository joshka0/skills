# Participant transport

Read this only when targeting a connected agent or terminal.

List targets first, then inspect a target if prompt state is unclear. `ask`-style transport sends the exact argument. Send a self-contained natural-language packet only to an agent. Send only literal shell input to a terminal; do not append prose that could execute. For a command that may request credentials or physical confirmation, send only the command and let the user interact directly.

Scale the wait to the expected work. After timeout, inspect current output and wait again; never resend a task merely because it is still running. Use live help/debug for unknown command shape or connection failure.
