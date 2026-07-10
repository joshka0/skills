# IAM and Secrets

## Least Privilege

- Prefer narrow permissions over convenience
- Scope roles and bindings to the resources actually needed
- Avoid catch-all admin roles as shortcuts

## Sensitive Data

- Do not commit secrets in vars, tfvars, outputs, or examples
- Mark sensitive outputs as sensitive, but remember that state still matters
- Prefer managed secret systems over plain Terraform variables where possible

## Review Questions

- Who can read state?
- Who can apply changes?
- Are credentials or identifiers exposed more broadly than required?
