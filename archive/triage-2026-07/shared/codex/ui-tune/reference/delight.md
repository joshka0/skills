# Delight

Delight should enhance usability, never obscure it. If users notice the delight more than accomplishing their goal, you've gone too far.

## Principles

- Delight moments should be quick (< 1 second)
- Never delay core functionality for delight
- Make delight skippable or subtle
- Respect user's time and task focus
- Hide delightful details for users to discover — reward exploration
- Match delight to emotional moment — celebrate success, empathize with errors

## Micro-interactions & animation moments

**Button delight:**
```css
.button {
  transition: transform 0.1s, box-shadow 0.1s;
}
.button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.button:hover {
  transform: translateY(-2px);
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}
```

**Success animations**: Checkmark draw, confetti burst for major achievements, gentle scale + fade.
**Hover surprises**: Icons that animate, color shifts, tooltip reveals with personality.
**Toggle switches**: Smooth slide with spring physics, color transition, haptic feedback on mobile.

## Personality in copy

**CRITICAL**: Do not use humor in error messages by default. Use warmth, clarity, and recovery. Playful error copy requires an explicitly playful brand and low-stakes context.

**Warm but clear errors:**
```
"Connection failed"
"Couldn't reach the server. Your changes are saved locally — retry when you're back online."
```

**Encouraging empty states:**
```
"No projects yet"
"Your canvas awaits. Create something amazing."

"No messages"
"Inbox zero — nicely done."
```

Match copy personality to brand. Banks shouldn't be wacky, but they can be warm.

## Illustrations & visual personality

- **Empty state illustrations**: Not stock icons — custom characters or scenes
- **Error state illustrations**: Friendly monsters, quirky characters
- **Icon personality**: Custom icon set matching brand, animated icons on hover/click
- **Background effects**: Subtle particles, gradient mesh, geometric patterns, time-of-day themes

## Satisfying interactions

- **Drag and drop**: Lift effect on drag, snap animation on drop, undo toast
- **Progress & achievements**: Streak counters with milestones, progress bars that celebrate at 100%
- **Form interactions**: Input fields that animate on focus, checkboxes that bounce when checked

## Loading & waiting states

Make waiting useful first, delightful second:
- Interesting loading messages that rotate
- Progress bars with personality
- Helpful tips or concise status updates during long waits
- Time estimates or next-step guidance when appropriate
- Only add playful extras in intentionally whimsical consumer products, never at the expense of clarity or performance

## Celebration moments

**Success celebrations**: Confetti for major milestones, animated checkmarks, progress bar celebrations, personalized messages ("You published your 10th article!").
**Milestone recognition**: First-time actions get special treatment, streak tracking, progress toward goals.

## Sound

Subtle audio cues when appropriate — distinctive notifications, satisfying success sounds. Always respect system sound settings. Provide mute option. Keep volumes subtle. Don't play on every interaction (sound fatigue is real).

## Easter eggs

- Konami code unlocks, hidden keyboard shortcuts, hover reveals on logos
- Seasonal touches (subtle, tasteful), time-based changes (dark at night)
- Console messages for developers
- Randomized variations — not the same response every time

## What not to do

- Delay core functionality for delight
- Force users through delightful moments (make skippable)
- Use delight to hide poor UX
- Overdo it — less is more
- Ignore accessibility — animate responsibly, provide alternatives
- Make every interaction delightful — special moments should be special
- Sacrifice performance for delight
- Be inappropriate for context — read the room

## Verification

- Doesn't annoy after 100th time?
- Doesn't block — can users opt out?
- No jank or slowdown?
- Matches brand and context?
- Works with reduced motion and screen readers?
