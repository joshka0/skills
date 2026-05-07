# Skills Centralization Plan

Generated from the active provider roots after retiring agentctl skill references.

## Current Canonical Sources

- Foxctl first-party pack: `/Users/joshka/repos/personal/foxctl/configs/skills-pack`
- Foxctl external pack: `/Users/joshka/repos/personal/foxctl/configs/skills-external`
- Central snapshot and inventory: `/Users/joshka/repos/skills`

The central snapshot is a dereferenced copy, not a live source of truth yet. It exists to make overlap visible and preserve the full active skill set in one place.

## Recommended Ownership Model

1. Keep foxctl-owned skills in the foxctl repo.
   - Continue syncing `configs/skills-pack` into every provider as symlinks.
   - Continue syncing `configs/skills-external` into provider roots that use external readiness/UI skills.

2. Use `/Users/joshka/repos/skills` as the future home for non-foxctl unique skills.
   - Move npx/third-party/local skills there after case-by-case review.
   - Replace provider-local copies with symlinks back to this repo.
   - Keep provider-specific variants only when the content truly needs to differ.

3. Treat `~/.agents/skills` as the current de facto source for many npx-style skills until they are promoted.
   - Claude, Factory, and Gemini Antigravity already symlink several entries from `~/.agents/skills`.
   - That pattern should eventually point at `/Users/joshka/repos/skills/skills/<name>` instead.

## Same-Name Content Conflicts

These names currently have multiple real versions:

- `codex-swarm`
  - Agents version: older Zellij-oriented workflow.
  - Claude version: tmux-oriented workflow with stricter step-by-step verification.
  - Recommendation: prefer the Claude/tmux version as canonical unless Zellij support is still needed.

- `delegate-codex`
  - Agents version: older wording and less verification.
  - Claude version: tmux/no-layout wording plus stricter step-by-step verification.
  - Recommendation: prefer the Claude version as canonical.

- `plan-build`
  - Agents version: Zellij persistent-session workflow.
  - Claude version: tmux persistent-session workflow with explicit verification gates.
  - Recommendation: prefer the Claude/tmux version as canonical.

## Exact Duplicate Overlap

The expected exact duplicates are healthy:

- 20 foxctl-pack skills repeated across Codex, Agents, Factory, Claude, Gemini, and Gemini Antigravity.
- 25 foxctl-external skills repeated across the main provider roots.
- Several npx-style skills repeated through symlinks from `~/.agents/skills`.

These should remain symlinked rather than copied.

## Remaining Cleanup Candidates

- `~/.codex/skills` still contains local copies of `uniwind-*` and `opentui-tui-builder` that are content-equivalent to foxctl external skills. Convert those to symlinks or remove them after confirming Codex loads the foxctl external entries correctly.
- `~/.codex/skills/external-uniwind-*` and `~/.codex/skills/external-opentui-tui-builder` are separate older variants with different content. Review before deleting.
- `~/.agents/skills/*.md` loose files were copied into `/Users/joshka/repos/skills/loose/agents`. Decide whether these are real skills, prompt templates, or stale artifacts before centralizing them.

## Proposed Next Pass

1. Promote the 21 `~/.agents/skills` unique skill directories into `/Users/joshka/repos/skills/skills`.
2. Replace `~/.agents/skills/<name>` with symlinks to `/Users/joshka/repos/skills/skills/<name>`.
3. Replace Claude/Factory/Gemini Antigravity symlinks that currently point to `~/.agents/skills` with direct symlinks to `/Users/joshka/repos/skills`.
4. Resolve the three same-name conflicts by selecting a canonical version and archiving the other.
5. Review Codex-only design/infra skills separately; many look intentionally Codex-specific and should not be collapsed blindly.
