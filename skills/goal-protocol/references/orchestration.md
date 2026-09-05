# Goal orchestration

Prepare self-contained, verifiable tickets from the governing goal and dossier.
Preserve existing parent IDs and approved scope. Do not dispatch work that
contradicts a required parent gate.

Prefer vertical behavior slices. Record real dependencies and serialize shared
interfaces or state; use parallel waves only when tasks can proceed independently.

Each packet identifies its authoritative artifacts, allowed scope, acceptance
evidence, stop conditions, and report destination. Hand live dispatch and
integration to `agent-orchestration`, then record returned evidence through
the ledger. Replan the affected work when a conflict appears; continue unrelated
authorized work where possible.
