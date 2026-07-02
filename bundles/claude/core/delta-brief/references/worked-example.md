# Worked Example — a real delta brief

Source: a product session on a dating app ("Yada"). The design docs originally specified a visible, unilateral consent dialog for entering the app's exclusivity threshold — "Build with Rowan? Your other conversations will close gently." with accept/decline buttons. A later design riff replaced it with a **private mutual-signal mechanic** (each person privately places a signal; the threshold opens only when both match; nobody can ever be visibly declined). A Claude Design session was already mid-flight, iterating on screens from the *old* pasted prompt.

The user asked: *"how should I inform the other agent of our change?"*

## The routing decision

- **Fresh/future coding agents needed nothing.** The change was committed to `docs/arc.md`, a new `docs/endings.md`, and the design prompt file; the repo's CLAUDE.md already routed every new session through README → positioning → arc. Docs-as-handoff covered them.
- **The Claude Design session was the one stale context** — it worked from a pasted prompt, not the repo, so it needed an active delta.

## The delta brief (sent verbatim)

> **Design change since the prompt I gave you.** Entering the Treehouse is no longer a visible invitation ("Build with Rowan?" with accept/decline). It's now a private mutual signal: each person can privately place one "I'd build with this person" marker — invisible to the other side, movable while unmatched. The consequence is stated at placement time: "If Rowan feels the same, your other conversations will close gently." When both signals match, the threshold opens automatically — a celebration moment, not a second decision. Nobody in Yada can ever be visibly declined. Redesign screen 1 as these two moments: (a) placing the signal, which should feel like setting something down deliberately in private, and (b) the match: "Rowan feels the same. The Treehouse is open." Everything else in the prompt stands.

## The five parts, labeled

| Passage | Part |
| --- | --- |
| "Entering the Treehouse is no longer a visible invitation" | Headline the change |
| Old dialog with accept/decline → private movable signal, auto-opening match | Old → new, in the agent's working terms |
| "Nobody in Yada can ever be visibly declined." | The rule behind it |
| "Redesign screen 1 as these two moments: (a)… (b)…" | What to redo — bounded and specific |
| "Everything else in the prompt stands." | What stands |

## Why the rule line carries the weight

The design agent will face dozens of micro-decisions the brief doesn't cover — should the waiting state show "signal sent"? should a moved signal animate away visibly? Every one of them is answerable from "nobody is ever visibly declined," and none of them is answerable from the screen-1 instructions alone. Ship the rule and the agent extrapolates correctly; ship only the ruling and it guesses.
