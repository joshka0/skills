# Consumer runtime evidence — 2026-07-13

This is the separately dated evidence record for the executable-consumer model
in catalog schema v2. It distinguishes provider views from loaders and records
what was observed live versus established only by installed or primary
documentation. No `$HOME` path was written during this probe.

## Installed versions

```text
Claude Code 2.1.207
Codex CLI 0.144.3
Droid 0.164.0
Gemini CLI 0.49.0
Google Antigravity 2.0.0
```

## Consumer evidence

| Executable consumer | Ordered global roots, low to high precedence | Evidence and conclusion |
| --- | --- | --- |
| Claude Code | `$HOME/.claude/skills` | Installed version and existing approved root mapping. The current root is a directory link to `providers/claude`. |
| Codex | `$HOME/.agents/skills`, then `${CODEX_HOME:-$HOME/.codex}/skills` | Both roots are present in the current Codex session. Their 20 catalog-declared canonical overlaps remain byte-identical, so the pack does not depend on an observed winner. |
| Droid | `$HOME/.factory/skills` | Droid is the Factory CLI; current [Factory skill documentation](https://docs.factory.ai/cli/configuration/skills) identifies the project and user Factory roots, and current [Factory release notes](https://docs.factory.ai/changelog/release-notes) explicitly cover linked skill-directory discovery. There is no second Factory executable consumer and no current documentation for `$HOME/.droid/skills`. |
| Gemini CLI | `$HOME/.gemini/skills`, then `$HOME/.agents/skills` | Installed Gemini documentation names both user roots and states that the Agents alias wins within the tier (`$HOME/.npm-global/lib/node_modules/@google/gemini-cli/bundle/docs/cli/skills.md:35-56`). Live `gemini skills list` emitted 20 conflicts, selected 22 skills from the Agents root, and included both Agent Vault packages. |
| Google Antigravity IDE | `$HOME/.gemini/config/skills` | Installed app version is 2.0.0. Current [Google Antigravity documentation](https://antigravity.google/docs/skills?app=antigravity-ide) identifies workspace `.agents/skills` and global `$HOME/.gemini/config/skills`; current [Google codelab evidence](https://codelabs.developers.google.com/getting-started-with-antigravity-skills) agrees. The global directory exists locally and is empty, but is not the pack link. This root is primary-docs verified, not UI-discovery verified. |

`$HOME/.agents/skills` is an interoperability root consumed by Codex and Gemini
CLI; it is not itself an executable consumer. The seven generated provider
views also do not imply seven loaders. The legacy `providers/droid` view and
existing `$HOME/.droid/skills` link remain untouched because this wave forbids
home writes; the supported Droid consumer maps only to `providers/factory`.

## Gemini Agent Vault exposure — open owner decision

Current reality is explicit: Gemini CLI loads the Agents root at higher
precedence than its Gemini-specific root. That exposes
`agent-vault-cli` and `agent-vault-http` to Gemini as unique Agents-root
packages, in addition to the 20 byte-identical overlaps. Wave 2 declares and
validates that effective union; it does not decide whether the exposure should
remain. Partitioning or retaining those two packages is an open owner decision.

## Proof boundary and install state

- Current home roots were inspected only. No link, configuration, application
  state, or credential state was changed.
- The Antigravity mapping is changed in catalog/install intent because two
  current Google primary sources agree. The old
  `$HOME/.gemini/antigravity/skills` path is no longer a supported mapping.
- Because `$HOME/.gemini/config/skills` is not currently the pack link and home
  writes are forbidden, provider apply alone does not install the pack into the
  corrected Antigravity root. `bin/pack install` may preview that reconciliation
  but this wave must not apply it.
- The current legacy `$HOME/.droid/skills` link is likewise not changed. It is
  outside the supported executable-consumer mapping after Wave 2.
