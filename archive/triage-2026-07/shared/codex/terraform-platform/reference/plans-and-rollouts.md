# Plans and Rollouts

## Plan Discipline

- Review the semantic meaning of a plan, not just the counts
- Replacement risk matters more than “few changes”
- Read for downtime, dependency order, policy effects, and hidden exposure

## Rollout Questions

- Does this change force replacement?
- Is the replacement safe in-place, or is sequencing required?
- Can rollback actually restore the prior state?
- Are there out-of-band dependencies not visible in the plan?

## Rules

- Do not normalize `-target`
- Separate risky refactors from routine changes
- Prefer smaller plans when the blast radius is non-trivial
