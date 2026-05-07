# Modules

## Structure

- Keep root modules thin and environment-specific
- Push reusable logic into modules only when reuse is real
- Make ownership and boundaries obvious
- Prefer explicit inputs and outputs over hidden coupling

## Good Module Hygiene

- Name variables semantically
- Mark sensitive values appropriately
- Keep outputs intentional and minimal
- Avoid modules that are so generic they obscure the platform

## Review Questions

- Is this the right abstraction boundary?
- Would a reader understand what owns this resource?
- Are dependencies obvious from inputs rather than accidental references?
