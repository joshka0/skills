# Testing And Quality

Read this only for the `testing-quality` mode.

1. Use release-distributed builds and the relevant test channel/track, not only local or development-runtime evidence.
2. Test the core journey plus relevant upgrade, authentication, permission, network, purchase, account-data, AI/UGC, and accessibility paths.
3. Triage crashes, hangs, ANRs, startup failures, feedback, and device-specific defects by affected release and user journey; decide fix, accepted risk, or defer explicitly.
4. Define rollout scope, monitoring window, stop/pause conditions, rollback or hotfix path, and an accountable release owner before wider exposure.
5. Treat tester-count rules, test-track eligibility, crash thresholds, and platform diagnostics as current facts to verify live.

Block a wider release for a known core-journey crash, unowned rollout response, or missing evidence that the intended release artifact works on its supported paths.
