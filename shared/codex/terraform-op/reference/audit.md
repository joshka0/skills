# Audit Mode

Run a systematic Terraform audit. Focus on {{target}} when provided.

## Audit Dimensions

- State and backend safety
- Module structure and reviewability
- Provider and version discipline
- IAM and secret exposure
- Drift and import hygiene
- Plan/apply safety and replacement risk
- Cost and right-sizing

## Report Format

Start with findings, ordered by severity:

- **Critical**
- **High**
- **Medium**
- **Low**

For each finding include:

- Location
- Why it matters
- Evidence
- Recommended next step

End with:

- Overall verdict
- Top three risks
- Fastest high-value remediation path
