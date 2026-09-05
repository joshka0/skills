# Architecture

Use this mode to surface a high-leverage architecture change before implementing it.

1. Read the project's domain glossary and relevant ADRs when they exist; use their language and do not casually relitigate recorded decisions.
2. Look for a shallow module, leaky seam, scattered conditionals, duplicated ownership, or a test surface that cannot observe meaningful behavior.
3. Apply the deletion test: if deleting a module only removes indirection, remove it; if complexity would reappear across callers, deepen the owner instead.
4. Treat the interface as the test surface. Introduce a seam only when variation is real; one adapter is hypothetical, two adapters establish a real seam.
5. Present candidates with affected files, observed friction, proposed ownership, and test impact. Keep an assessment read-only; implement a selected change when the task already authorizes it.

If a candidate conflicts with an ADR, surface it only when concrete friction warrants reopening that decision.
