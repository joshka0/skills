# Proxy

Read this only when a development proxy or remote-browser path is required.

Discover proxy configuration, reachability, and trusted endpoint from the repository or live status. Keep a proxy scoped to the requested service and verify it with a non-sensitive request before reporting it usable. Do not publish a proxy, expose an internal service, alter trust settings, or store access values without explicit authorization.

When a browser bridge is the requested surface, hand off browser interaction to `local-http-browser-use`; this mode owns the local connectivity decision, not browser automation.
