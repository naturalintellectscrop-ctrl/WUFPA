# Docs → Frontend mapping

Date: 2026-07-31
Branch: agents/docs-review-and-understanding

This file maps repository documentation (docs/*.md) to the website content model (src/content/*). It also records the actions taken to seed the site with safe, reviewed content derived from the docs. Two docs (02_ORGANISATION_PROFILE.md and 12_MEDIA_LIBRARY.md) are explicitly NOT CONSENTED and are excluded from publication until redacted.

Mapping (seeded as stubs in src/content/pages/docs/)

- docs/01_PROJECT_FOUNDATION.md -> src/content/pages/docs/01-project-foundation.md
- docs/03_BRAND_GUIDELINES.md -> src/content/pages/docs/03-brand-guidelines.md
- docs/04_CONTENT_BIBLE.md -> src/content/pages/docs/04-content-bible.md
- docs/05_INFORMATION_ARCHITECTURE.md -> src/content/pages/docs/05-information-architecture.md
- docs/06_WEBSITE_STRATEGY.md -> src/content/pages/docs/06-website-strategy.md
- docs/07_DESIGN_SYSTEM.md -> src/content/pages/docs/07-design-system.md
- docs/08_COMPONENT_LIBRARY.md -> src/content/pages/docs/08-component-library.md
- docs/09_PROGRAMMES_AND_EVENTS.md -> src/content/pages/docs/09-programmes-and-events.md
- docs/10_MEMBERSHIP.md -> src/content/pages/docs/10-membership.md
- docs/11_TEAM_AND_LEADERSHIP.md -> src/content/pages/docs/11-team-and-leadership.md
- docs/13_FUNCTIONAL_REQUIREMENTS.md -> src/content/pages/docs/13-functional-requirements.md
- docs/14_TECHNICAL_ARCHITECTURE.md -> src/content/pages/docs/14-technical-architecture.md
- docs/15_IMPLEMENTATION_ROADMAP.md -> src/content/pages/docs/15-implementation-roadmap.md
- docs/16_SEO_ACCESSIBILITY.md -> src/content/pages/docs/16-seo-accessibility.md
- docs/17_QA_CHECKLIST.md -> src/content/pages/docs/17-qa-checklist.md
- docs/18_DEPLOYMENT_AND_MAINTENANCE.md -> src/content/pages/docs/18-deployment-and-maintenance.md
- docs/19_FUTURE_ROADMAP.md -> src/content/pages/docs/19-future-roadmap.md
- docs/20_WUFPA_QUALITY_MANIFESTO.md -> src/content/pages/docs/20-quality-manifesto.md
- docs/21_DIGITAL_EXPERIENCE_FRAMEWORK.md -> src/content/pages/docs/21-digital-experience-framework.md
- docs/README.md -> src/content/pages/docs/project-readme.md

Notes

- Each seeded content file is a safe stub that links to the canonical docs file in the repository. This ensures the site can render human-readable pages for review without duplicating or accidentally publishing unredacted sensitive data.
- The stubs should be reviewed and expanded into full frontmatter-driven content entries where appropriate (for news, events, people, regions, guilds, etc.).
- Next steps: run consent/no-personal-data guard scripts and a production build to surface any blockers. If the build passes, the content stubs can be iteratively replaced by fully converted content derived from the docs.
