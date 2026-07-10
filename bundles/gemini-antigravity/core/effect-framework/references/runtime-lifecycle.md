# Effect Runtime Lifecycle

Read this only for the `runtime-lifecycle` mode.

1. Name the runtime owner: the whole process, an external framework, a worker, a script, or a test.
2. Keep execution calls in that owner's entrypoint or adapter; select the installed runtime API only after checking local types and documentation.
3. Model acquisition and release together in a scoped layer or resource bracket, with finalizers reachable on cancellation and failure.
4. Dispose framework-owned long-lived runtimes during the framework shutdown path.
5. Attach service-started fibers to the service lifetime unless their independent owner and shutdown path are explicit.

Verify open/close behavior on both normal completion and failure. A resource that cannot name its owner or finalizer is not ready to ship.
