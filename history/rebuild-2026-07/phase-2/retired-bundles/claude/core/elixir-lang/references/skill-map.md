# Elixir OTP Shape

Read this only for the `otp-shape` mode.

1. Start with the runtime property: shared state, concurrency, timer, failure isolation, naming, or backpressure.
2. Keep transformations, validation, formatting, and stateless rules as plain functions when no runtime property requires a process.
3. Make the application tree an operational map of ownership; do not use startup callbacks as a business-workflow container.
4. Choose process boundaries by state ownership and failure domain, not by the nouns in a domain model.
5. Use event history, CQRS, or separate OTP applications only when durable replay, auditability, independent lifecycle, or ownership makes that cost necessary.

Verify the smallest relevant subtree can start and its boundary can be tested without booting the whole release.
