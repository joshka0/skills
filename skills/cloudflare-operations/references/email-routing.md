# Email Routing

Credential: an `infra-token-factory` Cloudflare child scoped to one account and one zone. Resolve the current names: Account Email Routing Addresses Write; Zone Email Routing Rules Write, Zone Settings Write, DNS Write.

Inputs to confirm: the exact zone, the literal receiving address, and the exact forwarding inbox from the user. Catch-all is off unless the user asks. Never take an inbox from an unrelated app, reviewer, or test-account secret.

## Destination

List the account destinations and match the inbox in memory. Do not print other addresses. Register it only if absent (Cloudflare emails a verification link). Stop until it shows verified: an unverified destination receives nothing. Do not delete a wrong destination without authorization.

## Before cutover, read live

Routing settings and status, destination state, zone rules (including the catch-all singleton), apex MX, apex SPF TXT, and the required records from the SDK or the Email Routing DNS query. Records in a dashboard activation form are proposals, not live DNS. Check Cloudflare DNS and a public resolver.

## Replace a legacy provider

An existing non-Cloudflare MX set conflicts. Never add Cloudflare MX beside it.

1. Identify the legacy MX by target and only that provider's SPF. Keep unrelated TXT records.
2. Snapshot each record: type, name, content, TTL, priority.
3. Reconfirm the verified destination and the authorization.
4. Remove only those MX/SPF records, then call the current Email Routing DNS enable operation (verify its route from the types or docs). It installs and locks the MX and SPF. Do not keep a deprecated enable endpoint without a live check.
5. If activation fails, recreate every record from the snapshot, and report any gap at once.

## Rule

One literal matcher to one forward action to the verified inbox, enabled. If the rule exists, read it and update only its enabled state or destination. Read the collection back and match the source and destination.

## Done means

Routing enabled and ready. Live DNS has the full MX set from the DNS surface and no legacy MX. Exactly one SPF with Cloudflare's current include and no legacy include. The public resolver agrees. The rule is enabled and points only to the verified inbox. The user sends an external test and confirms delivery. Until then, report delivery as pending.

| Evidence | Fix |
| --- | --- |
| "existing non-Cloudflare MX records conflict" | Snapshot and replace the old provider's MX/SPF |
| Dashboard shows Cloudflare records, API/public DNS shows the old ones | Proposed, not applied: finish DNS activation |
| Destination not verified | Wait. No DNS or active rule yet. |
| Ready but no mail | Check public DNS and rule readback, then run the external test |
