# Motion Design

Read this for a motion decision, review, or precise effect name. Resolve implementation through the project's installed animation library, native APIs, and current primary documentation.

1. Name the job before choosing an effect: feedback, state transition, continuity, navigation direction, orientation, or intentional ambient presence. If no user-facing state or relationship changes, remove the motion.
2. For a vague request, give the most useful term and at most two contrasts: origin-aware transition, continuity/shared-element transition, layout transition, direction-aware transition, stagger, rubber-banding, velocity handoff, or interruptible motion. Do not turn this reference into a glossary.
3. A reveal enhances an already visible default; content and essential controls cannot depend on a transition to become discoverable. Product UI favors task feedback over page-load choreography; a brand entrance earns its cost only when it reinforces the chosen direction.
4. Choreograph multiple changes by causal hierarchy: establish context or the triggering action before dependent content. Do not use a uniform stagger or fixed duration as a substitute for a relationship.
5. Review the complete path: initial state, trigger, in-flight interruption, reversal or retarget, exit, and reduced-motion alternative. Check the affected user flow at normal speed; use slowed or frame-level inspection when the feel is uncertain.
6. Keep motion input-responsive and non-blocking. The shared standards own user preferences, release velocity, sound boundaries, and measured-container safety; apply them rather than duplicating parameters here.

Record the motion job, chosen term, observable before/after state, input path, verification, and any platform handoff.
