---
name: network-k8s
description: Diagnose and improve Kubernetes networking across Services, Ingress, DNS, endpoint selection, traffic routing, and network policy behavior.
args:
  - name: target
    description: The service path, ingress route, namespace, or network problem area (optional)
    required: false
user-invokable: true
---

Debug or improve Kubernetes networking. Focus on {{target}} when provided.

**First**: Use the kubernetes-platform skill when available. Read `reference/networking.md` before changing routes, exposure, or policies.

## Review Order

1. Ready pods
2. Service selector and ports
3. Endpoints or endpoint slices
4. Ingress or Gateway routing
5. DNS resolution
6. Network policy and egress constraints

## Working Rules

- Do not widen exposure as a shortcut for a routing problem
- Do not treat “service exists” as proof that traffic is wired correctly
- Keep ingress, service, and pod ports consistent and explicit

## Output

- Fault location
- Evidence
- Smallest safe change
- Verification path from pod to edge
