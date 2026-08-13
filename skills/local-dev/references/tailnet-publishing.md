# Tailnet publishing

Read this when a local service must be reachable from other devices on the tailnet rather than only from this machine.

## Decide the surface first

A `.localhost` route from a local port-naming proxy cannot cross machines: that suffix resolves to loopback on whichever device asks, and such proxies bind loopback. Chaining a tailnet proxy in front of one adds a hop and no naming. Local port-naming and tailnet naming solve different problems; keep both rather than substituting one for the other.

Three tailnet surfaces exist, in ascending setup cost. Confirm which the installed CLI supports from its own help rather than assuming:

1. **Path prefix on the node's existing hostname** — several services under one name, distinguished by path.
2. **A distinct port on the node's hostname** — simplest, but reintroduces the port the user is usually trying to escape.
3. **A named service with its own virtual address** — closest to per-service hostnames; normally requires tenant-side configuration before the CLI can attach to it, so verify it exists before offering it.

Tailnet-only publishing and public publishing are different verbs. Never reach for the public one to solve a reachability problem inside the tailnet, and never enable it without explicit authorization.

## Before changing anything

Read the live serve/proxy configuration and treat every existing mount as owned by someone. Add a mount; do not replace, reset, or clear one you did not create. When the wanted surface is already taken, choose a different path or port rather than displacing the incumbent.

Bind the backend to loopback and let the tailnet proxy reach it there. Binding all interfaces additionally exposes the service to the local network, which is rarely intended and is not implied by a request to reach it from another device.

## The prefix trap

When a service is mounted under a path prefix, the proxy typically strips that prefix before forwarding, so the application still believes it is serving from root and needs no base-path configuration. Verify that stripping actually happens rather than assuming it.

The failure that survives this is client-side. A page whose assets are referenced relatively must be loaded from a path ending in `/`. Requested without the trailing slash, the prefix itself is treated as the document and every relative reference resolves one level too high — landing on whatever else is mounted at the root. The proxy commonly answers both spellings, so this fails silently as a half-loaded page rather than an error.

Prefer a fix that carries no mount point in it, so the same document still works when served at the root, under a different prefix, or from the filesystem. A guard that normalises the path before any subresource is requested satisfies this; a hard-coded base URL does not.

## Verify

Confirm from the tailnet name, not from loopback:

- The document, one subresource, and one API path each return success through the prefix.
- The prefix spelled without a trailing slash reaches the same working page.
- Any pre-existing mount still serves what it served before.
- A real browser loads the page with no failed subresource requests, since a half-loaded page returns success at every individual URL.

Report the live URL the tool emitted, the mounts now present, and the exact command that removes only what was added.
