# Six-phase design

Read only after the user explicitly requests a human-gated six-phase pass.

1. Research the affected code and present a phase plan; wait for approval.
2. Propose structures only, then stop for approval.
3. Propose interfaces and locations only, then stop for approval.
4. Place TODO anchors at every intended edit site, then stop for approval of the full blast radius.
5. Trial-implement only the approved structures, interfaces, and TODOs; run available verification; revert the trial implementation while retaining the approved planning artifacts; report every deviation or unimplementable decision.
6. Propose invariants with the property and enforcement evidence, then stop for approval.
7. Implement for real from the approved artifacts and verify again. Shipping remains a human decision.

Stay in one phase at a time. Treat human edits as authoritative, do no opportunistic work, and return to the earliest affected phase when the trial exposes a gap. If no trustworthy harness exists, record the verification gap and propose a separate testability task instead of claiming proof.
