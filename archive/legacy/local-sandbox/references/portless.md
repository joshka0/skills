# Portless and Local Services

`portless` is the host-facing URL layer. smolvm isolates the process
environment.

## Host Services

If a service runs on the host, wrap it directly with `portless`:

```sh
portless alias my-service 5173
portless get my-service
```

## Services Inside smolvm

If a service runs inside smolvm:

1. Expose it through a smolvm port mapping.
2. Use `portless alias` or a named host wrapper for the host-facing URL.

```sh
smolvm machine create --net --image node:22-alpine deeptutor-ui
smolvm machine start --name deeptutor-ui
smolvm machine exec --name deeptutor-ui -- sh -lc "cd /workspace && npm run dev -- --host 0.0.0.0"
portless alias deeptutor-ui 5173
portless get deeptutor-ui
```

## Naming

Use unique portless names just like unique VM names. Do not assume a port-free
URL. In high-port proxy mode, use `PORTLESS_URL`, `portless get <name>`, or the
emitted URL.

## Verification

```sh
portless list
```

Verify actual smolvm port mapping behavior for the repo before documenting the
final URL.
