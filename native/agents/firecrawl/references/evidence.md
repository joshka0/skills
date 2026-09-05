# Evidence formats

Use these capture details when the requested artifact needs them. They do not
impose a report template or an extra deliverable.

- **Design extraction:** `branding` contains structured tokens and curated assets
  such as logo, favicon, and `ogImage`. It does not contain all page imagery.
  Request `branding,images` for hero, product, and section images, and a full-page
  screenshot for layout evidence. Check current format support. If the service
  returns a temporary screenshot URL, save the image locally when a durable
  artifact needs it; do not commit signed URLs. Label measured and inferred
  values separately. Source assets do not imply permission to reuse them.
- **SEO:** preserve metadata, headings, links, and relevant HTML. Main-content
  filtering can hide the navigation, canonical tags, or image attributes being
  checked. Markdown alone cannot prove visual, accessibility, or performance
  behavior.
- **Metrics and pricing:** retain period, currency, unit, billing interval,
  applied filters, and source URL. Do not convert chart labels into exact values
  or guess contact-sales prices. Distinguish actual observations from inference.
- **Directories and leads:** retain profile/source URLs and applied filters;
  deduplicate records and report pagination coverage. Leave masked or unavailable
  fields unknown. Access to a listing does not authorize bypassing access controls
  or contacting the listed people.
- **Corpora:** preserve source URLs, capture dates, code blocks, tables, and
  failed/restricted pages. Generate chunks, training data, or manifests only
  when the requested consumer needs them. Do not claim a complete mirror from
  a limited crawl.
