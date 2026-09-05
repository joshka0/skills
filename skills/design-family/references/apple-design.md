# Apple Physicality

Read this only for the `apple-physicality` mode: an explicit Apple-like or direct-manipulation interaction needs a portable design decision. This is not an Apple HIG, SwiftUI, UIKit, or browser implementation manual.

1. Treat the request as a behavior and hierarchy question, not a skin. Apply the shared standards for continuous direct manipulation; use this mode to decide what the feedback communicates and which task layer it changes, rather than treating an end-only swipe as physical interaction.
2. Let motion reveal intent. Gesture bounds resist progressively, and a release commits or reverses according to direction and momentum rather than an arbitrary position-only snap. The shared standards own live state and velocity continuity.
3. Apply the shared source/return-path rule to the actual relationship: menus, popovers, sheets, and expanded objects should remain visibly connected to their trigger instead of appearing from an unrelated center.
4. Use depth to distinguish task layers, not to decorate every surface. A focused modal task separates background context; a parallel non-blocking panel preserves the surrounding flow. Do not stack translucent foreground layers without legibility evidence.
5. Multimodal feedback is causal, synchronized, and reserved for meaningful commit, success, error, or snap states. It reinforces visible state and remains optional; the shared standards prohibit decorative or high-frequency sound.
6. A reduced-preference alternative keeps the state change comprehensible without vestibular motion or an interaction dead end. Adapt the task to device/input context instead of simply scaling controls.
7. Verify source-to-layer relationship, direct-manipulation response, boundary/reversal behavior, dismissal or return path, and preference variant. Resolve platform APIs, physics values, materials, and haptics from the project's installed framework and current primary guidance.
