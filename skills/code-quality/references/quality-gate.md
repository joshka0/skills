# Quality gate

Assess the requested change against the repository's required checks and
acceptance criteria. Use its severity and waiver policy when one exists.

Block on unmet acceptance criteria, failed required checks, or a material
correctness or safety defect. Explain the impact of advisory findings;
do not invent a universal warning count or treat missing evidence as a pass.

Return the verdict, actionable findings, check results, and unresolved limits
in the user's or downstream consumer's format. Apply fixes only when requested,
then rerun the checks affected by those fixes.
