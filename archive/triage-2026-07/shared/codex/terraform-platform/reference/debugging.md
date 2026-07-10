# Debugging

## Evidence-First Checklist

1. Is the failure in `init`, `validate`, `plan`, or `apply`?
2. Is the issue config, provider auth, state, dependency graph, or remote API behavior?
3. What changed recently: module paths, addresses, versions, credentials, backend, or cloud-side drift?
4. Does the error indicate replacement, missing dependency, or ownership mismatch?
5. What is the smallest safe next step?

## Avoid

- Applying first to “see what happens”
- Using `-target` to work around unclear dependencies without understanding the graph
- Editing state before the ownership model is clear
