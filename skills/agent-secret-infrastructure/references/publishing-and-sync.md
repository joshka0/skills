# Secret publishing and Agent Vault sync

Read this for a secret create, update, rotation, or Agent Vault sync request.

## Publisher gate

Use only an approved write-only Infisical publisher. The publisher must:

- accept the secret value through standard input or a protected credential channel;
- allow only approved projects, environments, paths, and key names;
- create or update one named value;
- return safe metadata and status only;
- have no secret-read, delete, identity, role, or policy-administration rights; and
- keep the value out of arguments, files, logs, prompts, and output.

Verify the installed command and its live capability before use. The expected command name is `infisical-secret-publish`. If it is missing or its policy cannot be proved, stop. Do not fall back to `infisical secrets set KEY=value`, a dotenv import helper, Agent Vault proposals, or a temporary plaintext file.

## Mutation flow

1. Confirm that the task authorizes the exact project, environment, path, key name, and create or update action.
2. Confirm that the destination follows the project and path boundary in `architecture-and-policy.md`.
3. Pass one value through the publisher's protected input. Do not inspect or echo it.
4. Verify only the publisher result metadata.
5. Wait for the related Agent Vault store to report sync status `ok`. Discover the live poll interval and timeout.
6. Run `agent-vault vault discover --json` through the target vault. Confirm the safe service host and credential key name.
7. Test one real allowed request and one deliberate deny case. Do not print the injected value.

A value sync does not create a service mapping or vault grant. Route those control-plane changes through a human administrator and verify them separately.

## Rotation order

Create or rotate the upstream credential first. Publish the new value. Wait for sync. Test the real consumer. Revoke the old credential last. Stop before revoke if the new path has not passed.

Report the publisher command state, project, environment, path, key name, sync state, request result, and deny result. Never report a value.
