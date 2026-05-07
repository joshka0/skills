# Storage

## Stateful Risk

- Storage changes are higher risk than stateless rollout changes
- Verify storage class behavior, reclaim policy, and access mode
- Do not assume resize, snapshot, or clone support exists

## Before Changing Stateful Workloads

- Identify what data is critical
- Confirm backup and restore paths
- Confirm whether the app tolerates concurrent access or reattachment
- Plan migration and rollback explicitly

## Common Issues

- PVC pending due to class or topology mismatch
- StatefulSet rollout blocked by volume attachment or init logic
- Performance issues from wrong class or request size
