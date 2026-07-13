# Delegate

Use this mode for one bounded task whose result can be reviewed by one supervisor.

Write a packet before dispatching. It names the objective, current context to read, allowed paths or operations, explicit non-goals, expected artifact, verification evidence, stop condition, and handoff shape. A packet without those boundaries is not ready to send.

Give the agent only the context needed to act. Ask it to stop and report rather than widen scope, change a public contract, make an external side effect, or guess missing repository facts. Keep version control and publication with the supervisor unless explicitly delegated.

On return, compare the evidence with the packet, choose accept, request changes, reject, or integrate manually, and record the smallest useful follow-up. If the packet came from a durable goal, return the evidence and status to its `GOAL_LEDGER.md` owner.
