# Fleet acceptance — local-dev

## Result

- Verdict: **PACKAGE-CONFORMS**; catalog composition is deferred.
- Archetype: mode suite; final package 67 lines / replaced sources exceed 576 lines plus `teach-context`.
- Validator: `PASS: shared/general/local-dev (suite)`.

## Collision matrix

| Signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| local route, Portless, worktree, sandbox, proxy | `local-dev` | `gtr` / `local-http-browser-use` | This suite owns local topology selection; gtr owns gtr commands and browser skill owns visible interaction. |
| credentials or local secret retrieval | `local-secrets` | `local-dev` | Local-dev explicitly hands off all secret work. |
| durable repository context setup | `local-dev` → `context` | `planning-workflow` | This mode captures non-secret project conventions; planning owns one-shot artifacts. |

## A34 preservation ledger

| Original delta | Disposition |
| --- | --- |
| Portless route ownership and no-force/no-clean safety | Kept: `routes-and-worktrees.md`. |
| worktree/isolation choice and no destructive cleanup | Kept: `SKILL.md` plus `isolation.md`. |
| scoped proxy/reachability policy | Kept: `proxy.md`. |
| teach-context repo-first durable-context capture | Merged: `project-context.md`. |
| credentials, literal hosts/ports, fixed commands, CI/catalog prose | Dropped: secret, machine-specific, or volatile material. |

## A35 archive

Exact originals: `archive/triage-2026-07/shared/general/local-dev/` and `archive/triage-2026-07/shared/codex/teach-context/`.

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Local topology, isolation, proxy, and durable-context contract exceeds generic setup advice. |
| A02 | PASS | Local environment work recurs. |
| A03 | PASS | Matrix names gtr, browser, secrets, and planning handoffs. |
| A04 | PASS | Four-mode suite. |
| A05 | PASS | Unique matching canonical name. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line suite description under 320 characters. |
| A08 | PASS | Names route, isolation, proxy, and context signals. |
| A09 | PASS | Collision matrix has first owners. |
| A10 | PASS | No greedy credentials or generic-dev trigger. |
| A11 | PASS | 37-line body within suite cap. |
| A12 | PASS | Active body is route/workflow/rules/output. |
| A13 | PASS | Four exact selected-reference conditions. |
| A14 | PASS | 67-line package; each reference is compact. |
| A15 | DEFERRED | Catalog clause awaits composition. |
| A16 | PASS | Four modes share local topology/safety lifecycle. |
| A17 | PASS | Kebab-case table, exact files, one-mode default. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Repository/tool/live status precedes volatile advice. |
| A21 | PASS | Machine/API manuals and CI catalog removed. |
| A22 | N/A | No pinned volatile value. |
| A23 | PASS | Credentials are prohibited and handed off. |
| A24 | PASS | Status/config discovery is safe; no value output. |
| A25 | PASS | No literal personal-home path. |
| A26 | PASS | Hosts/routes/tool state are discovered live. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets/metadata. |
| A29 | PASS | Secret, cleanup, force, and context boundaries are concrete. |
| A30 | DEFERRED | Catalog parity excluded. |
| A31 | DEFERRED | Composition/installed checks excluded. |
| A32 | PASS | Compact suite/reference shape follows golden examples. |
| A33 | PASS | 67 lines is below all replaced package totals. |
| A34 | PASS | Ledger covers local-dev and teach-context deltas. |
| A35 | PASS | Both exact originals archived before rebuild. |

```text
PASS: shared/general/local-dev (suite)
```
