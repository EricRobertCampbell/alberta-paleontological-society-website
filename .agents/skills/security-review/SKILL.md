---
name: security-review
description: Review an APS website change for XSS, unsafe URLs, path traversal, secrets, and unsafe outbound links or scripts. Use when the user runs /security-review, or when /code-review reviews a change with a security surface.
---

# Security review

Read [findings.md](../code-review/references/findings.md). This is a mostly public brochure site with SSR on Netlify and small JSON APIs. There is no member authentication layer like a case-management app; focus on web and content risks that apply here.

## What to review

- Cross-site scripting: untrusted content rendered as HTML without the same sanitization or Astro escaping neighbouring pages use
- Open redirects and unsafe `href` / `src` values built from content or query params
- Path traversal or arbitrary file reads when serving PDFs, images, or scan assets from user-influenced paths
- API input validation before parsing dates, paths, or ids
- Secrets, API keys, tokens, or credentials committed in source, client bundles, or logs
- Dangerous HTML in Markdown content components (`set:html` / raw HTML) without a clear need
- Third-party scripts and embeds (YouTube, analytics, 3D viewers) loaded only over expected hosts
- Cache headers that accidentally cache personalized or error responses when that would be wrong

There is no member authentication or multi-tenant permission model in this repo. Do not invent authorization findings that assume private case data or role-gated APIs.

## Output

Follow [findings.md](../code-review/references/findings.md).
