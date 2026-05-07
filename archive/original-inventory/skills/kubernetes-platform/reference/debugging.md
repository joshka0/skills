# Debugging

## Evidence-First Checklist

1. What is failing: pod, service, rollout, traffic, policy, storage, or dependency?
2. What changed recently: image, config, secret, chart, policy, or infrastructure?
3. What do events say?
4. Are pods scheduled, running, and ready?
5. Are services and endpoints correct?
6. Are dependencies reachable?
7. Is there a resource or quota constraint?
8. What is the smallest safe next check or fix?

## Avoid

- Restarting first
- Changing multiple variables at once
- Treating probe failures as the root cause rather than a symptom
