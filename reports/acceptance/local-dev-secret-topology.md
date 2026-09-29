# local-dev — shared secret topology

## Decision

- Canonical owner: `skills/local-dev` `secrets` mode.
- Change: define lookup order, single-owner Infisical paths, explicit imports,
  Keychain-backed issuer storage, provider handoffs, and final cache checks.
- Global mirrors: `home/codex/AGENTS.md` and `home/claude/CLAUDE.md` contain the
  same short operating rule. Their live home files resolve to these sources.
- Pre-rewrite git ref: `d4d730a03617a047184edec750fca29d5bae244c`.
- Validation: `bin/validate-skill.sh skills/local-dev suite` returned
  `PASS: skills/local-dev (suite)`.
- Secret scan: Kingfisher 1.97.0 scanned six blobs with 913 rules and found
  zero findings.
- Package verdict: **PACKAGE-CONFORMS**.
- Catalog verdict: **DEFERRED**. No exposure change was required.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| Infisical shared owner, Secret Import, repo path, dotenv migration | `local-dev` `secrets` | Agent Vault provider skills | `local-dev` owns local storage topology. Agent Vault owns brokered HTTP injection. |
| Keychain issuer credential storage | `local-dev` `secrets` | provider token skills | `local-dev` owns the storage boundary. A provider skill owns mint and rotation. |
| Cloudflare child token mint | `cloudflare-operations` `token-factory` | `local-dev` `secrets` | Cloudflare policy, API mutation, and child verification stay with `cloudflare-operations`; storage handoff stays here. |
| GitHub, Azure DevOps, or GitLab provider mutation | current provider-specific owner, when present | `local-dev` `secrets` | This mode verifies the current primary issuer contract and hands off the mutation. It does not claim provider API semantics. |
| named credential injection into a local process | `local-dev` `secrets` | repository workflow skill | This mode owns safe receipt and exact-path injection. The repository skill owns application behavior. |

## Acceptance

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Delta: one shared Infisical value with explicit repo imports, shadow checks, and final plaintext-cache cleanup is a machine-specific safety contract. |
| A02 | PASS | The pattern applies to every shared vendor or work-tool credential and each consumer repo. |
| A03 | PASS | The change extends the existing `local-dev` secrets mode. The collision matrix keeps provider mutations and Agent Vault separate. |
| A04 | PASS | Existing archetype remains `suite`. |
| A05 | PASS | Canonical home and name remain `skills/local-dev`. |
| A06 | PASS | Frontmatter contains only `name` and `description`. |
| A07 | PASS | Description is one physical line and remains within the suite limit. |
| A08 | PASS | Description names exact triggers: Infisical shared imports, Keychain issuer storage, and named-secret injection. |
| A09 | PASS | Collision matrix gives one first owner for storage, provider minting, Agent Vault, and application behavior. |
| A10 | PASS | Triggers are concrete operations. No persona or broad security trigger was added. |
| A11 | PASS | Validator line and byte budget checks pass. |
| A12 | PASS | Active instructions only route the secrets mode and keep shared safety rules. |
| A13 | PASS | `references/secrets.md` is selected only by the secrets route row. All routed references resolve. |
| A14 | PASS | `secrets.md` is 55 lines. The full package is 148 lines and passes validation. |
| A15 | PASS | General topology stays in the reference. Provider API procedures are not copied into the package. Catalog clause is deferred. |
| A16 | PASS | The suite still has two distinct modes: `topology` and `secrets`. |
| A17 | PASS | Both mode names and target files are exact. Selection remains explicit. |
| A18–A19 | N/A | This package is not a router. |
| A20 | PASS | The reference requires repository evidence, live tool output, then current primary provider documentation. Official Cloudflare, GitHub, Microsoft, and GitLab contracts were checked for this rewrite. |
| A21 | PASS | No API manual, flag table, or provider tutorial was copied. |
| A22 | PASS | No token lifetime, scope, ID, Keychain item name, or other volatile value is pinned. |
| A23 | PASS | Redacted Kingfisher scan found zero secret-shaped values. |
| A24 | PASS | Discovery and output are limited to names, paths, counts, and status. Values stay out of output. |
| A25 | PASS | Paths use `$HOME` or semantic Infisical paths. No personal home path appears in the package. |
| A26 | PASS | Project, environment, repo path, provider contract, and Keychain item names must come from live sources. |
| A27–A28 | N/A | No script, asset, or metadata file was added. |
| A29 | PASS | Rules stop recursive pseudo-inheritance, direct-secret shadowing, unsupported token factories, value leakage, and cache recreation. |
| A30–A31 | DEFERRED | No catalog exposure changed. Provider composition was not run. |
| A32 | PASS | The package follows the retained suite shape and passed the suite validator. |
| A33 | N/A | This is not a consolidation or trim. |
| A34 | PASS | Preservation ledger follows. |
| A35 | PASS | The complete pre-rewrite `local-dev` package is committed at the ref above. |

## Preservation ledger

| Delta | Disposition | Where |
| --- | --- | --- |
| Check `.infisical.json`, repo requirements, local vault policy, exact Infisical paths, then dotenv migration inputs | KEPT | `references/secrets.md` lookup order |
| Store vendor and work-tool values once under `/shared/...` | KEPT | Infisical ownership table |
| Import shared values into exact `/repos/...` consumers | KEPT | Infisical ownership section |
| Direct repo values shadow imports and must be classified before removal | KEPT | Infisical ownership section |
| Keychain holds long-lived issuer material; Infisical holds scoped runtime tokens | KEPT | Keychain-backed issuers section |
| Cloudflare, GitHub, Azure DevOps, and GitLab use different issuer contracts | KEPT | Keychain-backed issuers section, with current primary docs as live authority |
| Stream one authorized key without output or temporary plaintext | KEPT | Mutation flow |
| Verify exact-path injection and exact value match without revealing the value | KEPT | Mutation flow |
| Perform the Infisical plaintext-cache check after the last CLI command | KEPT | Mutation flow |
| Machine project ID, local domain, account IDs, token lifetimes, scopes, and Keychain item names | DROPPED | Volatile or machine-specific. The reference requires live discovery. |

## Composition note

`local-dev` already has provider exposure. The change adds no skill name or
provider mapping. The provider linker was not run because composition was not
required for this package change.
