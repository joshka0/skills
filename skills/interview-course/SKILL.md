---
name: interview-course
description: "Build a source-grounded offline HTML interview course with a paired Anki deck. Use for lesson-first interview prep from transcripts or documents. For a flashcard-only request, use vocab-deck."
---

# Interview course

The HTML course is canonical. The deck only reinforces it and never becomes a second explanation source.

1. Fix the learner, interview target, corpus, depth, and horizon. Confirm the choices that change curriculum breadth or deck size.
2. Source manifest: separate primary sources from commentary, and mark auto-transcripts as error-prone. When source IDs or titles conflict, keep the conflict recorded and do not double-count.
3. Concept inventory: stable slugs, definitions, relationships, failure modes, provenance. Verify version-sensitive claims live.
4. Modules follow mental models and diagnostic decisions, not source order. Each module has an invariant, a causal flow, failure modes, and interview prompts. Every prompt has a rubric: the invariant, the async boundary, and the discriminating evidence a strong answer gives.
5. HTML: offline, accessible, responsive, keyboard-native disclosures, print styles, visible source caveats. Validate the structure, links, scripts, and assets. Render it when browser QA is authorized.
6. Deck: write a `SPEC.md` and component inventory from the same slugs, then build it with `vocab-deck`. Cross-check it: no unsupported facts, orphan concepts, trivia, or answers that contradict the rubrics.

Synthesize; never dump transcripts. Separate stable models from volatile defaults and commands. Never invent a timestamp, quote, title, or source mapping. Dependency installs, browser control, and publishing need authorization.
