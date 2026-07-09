# Browser bridge contract

Read this only after loading the active bridge skill and needing request detail.

Use the bridge URL and bearer token supplied through the approved local-secret path. Confirm status and extension connection before a workflow. Use its advertised tool surface rather than assuming names or parameter variants.

The normal sequence is:

1. Observe visible URL, title, text, inputs, warnings, and interactable refs.
2. Choose the smallest safe action using a freshly observed ref.
3. Wait only as needed.
4. Observe again and verify page state.

Classify click, key, and submit actions. Navigation, menus, filters, and panels are ordinarily safe. Submit, buy, delete, publish, send, save, transfer, invite, remove, and unsubscribe need explicit confirmation unless already exact-authorized. Never type an unapproved secret or sensitive value.

On failure, distinguish connection, authorization, extension/tab, stale-ref, page, permission, and policy failures. Retry only a clearly transient failure; stale refs require a fresh observation. Screenshots are for visual confirmation and must not capture secrets.
