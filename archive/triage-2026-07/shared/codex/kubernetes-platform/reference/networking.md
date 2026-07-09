# Networking

## Debugging Order

1. Confirm the pod is ready
2. Confirm the Service selector matches ready pods
3. Confirm endpoints or endpoint slices exist
4. Confirm Ingress or Gateway routing points to the correct Service and port
5. Confirm DNS resolution and network policy behavior

## Service Checks

- `ClusterIP` is default for in-cluster traffic
- `NodePort` and `LoadBalancer` increase exposure; justify them explicitly
- Match named ports consistently between pod, service, and ingress
- Avoid assuming the target port is correct because the service exists

## Ingress and Edge

- Verify host, path, TLS, timeouts, and body limits
- Check controller-specific annotations before copying them
- Distinguish controller health issues from application health issues

## Network Policy

- Default deny is safer, but incomplete allow rules create opaque failures
- Check ingress and egress separately
- Confirm DNS egress when policies are present
- Keep policies readable and scoped; avoid broad namespace exemptions by habit
