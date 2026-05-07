# Cost and Sizing

## Right-Sizing Basics

- Requests drive scheduling; limits drive enforcement
- HPA is more meaningful when requests are sane
- Avoid copying arbitrary resource values between workloads

## Review Areas

- CPU throttling
- Memory pressure and OOM kills
- Over-requested idle workloads
- Replica counts that never match traffic shape
- Excessively chatty jobs or controllers

## Optimization Rule

Measure before reducing capacity. Cost wins that compromise reliability are regressions.
