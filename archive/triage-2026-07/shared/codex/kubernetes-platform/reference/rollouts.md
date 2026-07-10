# Rollouts

## Safe Change Pattern

1. Understand the current steady state
2. Define success and rollback criteria before changing anything
3. Roll out the smallest change that tests the hypothesis
4. Watch rollout, probes, errors, and dependency behavior
5. Stop if the system degrades beyond the agreed threshold

## Tools and Controls

- `maxSurge` and `maxUnavailable`
- PodDisruptionBudgets for voluntary disruption safety
- Progressive delivery only when the team can observe and stop it safely

## Rollback Reality

- Verify the previous version still exists and is runnable
- Config, schema, and storage changes can make “rollback” partial rather than real
- State migrations need explicit backward-compatibility or restoration plans
