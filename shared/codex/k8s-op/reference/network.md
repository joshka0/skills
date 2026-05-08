# Network Mode

Debug or improve Kubernetes networking. Focus on {{target}} when provided.

## Review Order

1. Ready pods
2. Service selector and ports
3. Endpoints or endpoint slices
4. Ingress or Gateway routing
5. DNS resolution
6. Network policy and egress constraints

## Working Rules

- Do not widen exposure as a shortcut for a routing problem
- Do not treat "service exists" as proof that traffic is wired correctly
- Keep ingress, service, and pod ports consistent and explicit

## Output

- Fault location
- Evidence
- Smallest safe change
- Verification path from pod to edge
