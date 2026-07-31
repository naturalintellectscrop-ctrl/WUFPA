# 14 — Technical Architecture

*The stack, the structure, the standards, and the reasoning for each.*

---

## 1. Constraints that decide the architecture

Before any technology choice, the four conditions that make it:

| # | Constraint | Architectural consequence |
|---|---|---|
| **C1** | Primary audience on mid-range Android over metered, often 3G, mobile data | JavaScript is a cost to justify per kilobyte. Static HTML, aggressive image optimisation, no third-party requests |
| **C3** | No IT staff, no server, no evidenced hosting budget | No database, no runtime, no authentication, nothing to patch. Static output on a free-tier CDN |
| **C4** | Editorial capacity unknown and probably thin | Content in version-controlled files, not a CMS database. Date-derived states so the site cannot go stale unattended |
| **C2** | Content will arrive over months, not at once | Model entities from day one so additions never require a rebuild |

**These rule out** a WordPress or Drupal installation (server, patching, plugin churn), a
headless CMS with a paid tier (cost, another account to lose access to), and a client-rendered
SPA (JavaScript cost, SEO cost, and a blank page on a poor connection).

---

## 2. Recommended stack

| Layer | Choice | Reasoning |
|---|---|---|
| **Framework** | **Astro** | Ships zero JavaScript by default and hydrates only what is declared interactive. Content Collections give typed, validated markdown — which is exactly the entity model this project needs (§ 5). Built-in image optimisation covers the 70+ photograph pipeline. First-class static output |
| **Language** | TypeScript, `strict` | Content schemas are typed and validated at build. A mistyped sub-region in a content file fails the build rather than rendering wrong |
| **Styling** | Native CSS with custom properties, plus CSS Modules or a light layer for component scoping | The design system is already expressed as custom properties ([07](07_DESIGN_SYSTEM.md)). A utility framework would add a build dependency and encourage values that bypass the token system — the failure this project is most vulnerable to |
| **Interactivity** | Vanilla TypeScript in Astro islands. Web Components where a pattern is genuinely reusable | The interactive surface is small: menu, disclosure, lightbox, search, form enhancement. A UI framework for this would cost more than it saves |
| **Content** | Markdown + YAML frontmatter in the repository | Version-controlled, diffable, reviewable, portable. No vendor, no database, no export problem |
| **Images** | Astro's image pipeline (Sharp) | Build-time AVIF/WebP/JPEG generation with `srcset`; enforces the no-upscale rule (§ 8) |
| **Search** | **Pagefind** | Builds a static index at build time; loads on interaction only. No server, no API key, no per-query cost |
| **Forms** | Host platform form handling | No backend to run or secure. Native POST, works without JavaScript |
| **Hosting** | **Cloudflare Pages** or **Netlify** | Free tier sufficient; global CDN with African edge presence, which matters materially for C1; built-in forms, redirects, headers and scheduled builds |
| **Analytics** | **Plausible** (self-hosted or paid) or **Cloudflare Web Analytics** | Cookieless, so no consent banner; lightweight; no personal data |
| **Editing UI** *(phase 2)* | **Decap CMS** or **Sveltia CMS** | Git-based: edits become commits. WUFPA gets a visual editor with no database and no hosting cost |

### 2.1 Why not the obvious alternatives

| Alternative | Why not |
|---|---|
| **WordPress** | A server to patch, a database to back up, plugins that break, and a security surface that an organisation with no IT staff cannot maintain. Its one genuine advantage — a familiar editor — is answered by a git-based CMS at a fraction of the operational cost |
| **Next.js** | Capable, but its default posture is a React runtime shipped to the client. Achieving zero-JS pages means working against the framework. Astro's default *is* the requirement here |
| **Plain hand-written HTML** | What the prototype is. It does not scale past ~10 pages, has no content model, no image pipeline, and every change is a manual edit in multiple files (X34) |
| **Tailwind CSS** | Not wrong, but it makes bypassing the token system frictionless (`mt-[37px]`), and the brief explicitly warns against generic Tailwind template aesthetics. The design system is small enough that native CSS with custom properties is simpler and more durable |
| **A headless CMS (Contentful, Sanity)** | A paid dependency, an account WUFPA can lose access to, and an export problem in five years. Markdown in git has none of these |

> **These are recommendations, not requirements.** The architecture that matters is: static
> output, typed content entities, build-time image optimisation, near-zero client JavaScript,
> no backend. Another stack meeting those conditions is acceptable. One that does not is not.

---

## 3. Rendering strategy

**Fully static (SSG). Every page pre-rendered at build.**

| Benefit | Why it matters here |
|---|---|
| Fastest possible delivery | Constraint C1 — the site is HTML from an edge cache |
| Nothing to attack at runtime | No server, no database, no injection surface |
| Nothing to patch | Constraint C3 |
| Free hosting is genuinely sufficient | Constraint C3 |
| Trivial rollback | Redeploy a previous build |

**Scheduled rebuild, daily.** This is what makes date-derived event states work (FR-31): an
event moves from "upcoming" to "past" with no human involvement
([09 § 9.2](09_PROGRAMMES_AND_EVENTS.md#92-status-handling--the-part-that-matters)). It costs
one cron trigger and removes the most common way small-organisation sites decay.

**Client-side JavaScript is used only for:** the mobile menu, disclosures, the gallery
lightbox, search, form enhancement, and scroll-reveal. Each is an island; each degrades to
working HTML without it (FR-93).

---

## 4. Folder structure

```
wufpa-website/
├── docs/                          ← this documentation set
├── client-archive/                NEVER PUBLISHED — outside the build output
│   └── originals/                 The supplied files, untouched
├── public/                        STATIC PASSTHROUGH — everything here IS published
│   ├── favicon/
│   ├── robots.txt
│   └── downloads/                 Logo pack, redacted profile PDF only
├── src/
│   ├── assets/                    Processed images (see 12 § 5.1)
│   │   ├── brand/
│   │   └── photos/
│   ├── components/
│   │   ├── global/                SkipLink, SiteHeader, PrimaryNav, MobileNav, SiteFooter
│   │   ├── layout/                Section, PageHeader, Prose, Breadcrumb
│   │   ├── primitives/            Button, Link, Icon, Tag
│   │   ├── media/                 Figure, ResponsiveImage, Gallery, Lightbox
│   │   ├── content/               Hero, StatBlock, EntityCard, PersonCard, Disclosure,
│   │   │                          Timeline, EvidenceStrip, KeyFacts, RosterTable,
│   │   │                          PartnerList, PullQuote, Callout, RegionMap,
│   │   │                          RelatedLinks, CTABanner, EmptyState
│   │   ├── forms/                 Field, Fieldset, Form, FormMessage
│   │   └── utility/               SearchField, Pagination, MapEmbed, SocialLinks, ShareRow
│   ├── content/                   ← ALL EDITORIAL CONTENT
│   │   ├── config.ts              Collection schemas (the content model, § 5)
│   │   ├── people/                *.md — one per office-holder
│   │   ├── programmes/            *.md — six
│   │   ├── regions/               *.md — six
│   │   ├── guilds/                *.md — ten
│   │   ├── partners/              *.md
│   │   ├── members/               *.md — four documented
│   │   ├── news/                  *.md
│   │   ├── events/                *.md
│   │   ├── albums/                *.md
│   │   └── pages/                 *.md — About, Legal, Privacy, Terms
│   ├── layouts/                   BaseLayout, PageLayout, ArticleLayout, EntityLayout
│   ├── pages/                     Routes (file-based)
│   ├── styles/
│   │   ├── tokens/                primitives.css, semantic.css  ← 07_DESIGN_SYSTEM
│   │   ├── base/                  reset.css, typography.css, a11y.css, print.css
│   │   └── global.css
│   ├── lib/                       Pure helpers: dates, slugs, structured data, alt-text checks
│   └── scripts/                   Client islands: menu, disclosure, lightbox, search, forms
├── scripts/                       Build-time tooling: PDF extraction, image processing,
│                                  link check, consent check, phone-number scan
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

**The principle:** an editor working in `src/content/` never needs to open any other folder,
and a developer changing a component never needs to touch content.

> ⚠ **`public/` is published verbatim — the client archive must never live inside it.**
> An earlier revision of this document placed the supplied originals at `public/originals/`.
> That is wrong and was caught by a real build: Astro copies everything under `public/` into
> `dist/`, so the **unredacted 28 MB profile PDF containing ~60 personal mobile numbers was
> present in the build output**, defeating the entire purpose of WUFPA-003.
>
> The archive now lives at **`client-archive/`**, outside any build path, and
> [`scripts/check-no-personal-data.mjs`](../scripts/check-no-personal-data.mjs) fails the build
> if that file — or any unlisted Ugandan mobile number — ever reaches `dist/`. Corrected in
> v1.0.2.

---

## 5. Content model

This is the most consequential technical decision in the project. It is what makes every
future phase an addition rather than a rebuild
([01 § 11](01_PROJECT_FOUNDATION.md#11-future-vision)).

### 5.1 Entities and relationships

```
Person ──┬── holds many ──→ Role ──→ Committee | Guild | Region
         ├── leads ────────→ Member (production company)
         └── appears in ───→ Photo

Region ──┬── has one ──────→ Coordinator (Person)
         ├── contains many ─→ District
         ├── hosts many ────→ Event
         └── shown by ──────→ Photo

Guild ───┬── headed by ────→ Person
         └── relates to ───→ Programme

Programme ┬─ delivers ─────→ Event
          ├─ with ─────────→ Partner
          ├─ in ───────────→ Region
          ├─ serves ───────→ Objective
          └─ shown by ─────→ Photo

Event ────┬─ under ────────→ Programme
          ├─ in ───────────→ Region
          ├─ with ─────────→ Partner
          └─ shown by ─────→ Photo

Member ───┬─ based in ─────→ Region
          ├─ led by ───────→ Person
          └─ works in ─────→ Guild        (Release 2)

Film ─────┬─ produced by ──→ Member       (Release 3)
          └─ made in ──────→ Region
```

### 5.2 Why model this thoroughly for four members and six programmes

Because the alternative is what the prototype did: hand-write entities into templates. That
produced four member companies typed directly into HTML, which is why adding a fifth meant
editing markup — and why inventing four more was so easy that it happened (X3).

With this model:

- Adding the 300th member is one file.
- A person appearing on their region page, their guild page, the executive page and their own
  profile is one file, referenced four ways.
- Removing a person who withdraws consent is deleting one file
  ([11 § 6.5](11_TEAM_AND_LEADERSHIP.md#65-consent--what-is-required-before-launch)).
- The film database (Release 3) attaches to entities that already exist.

The cost today is roughly a day of schema work. The cost of not doing it is paid at every
future phase.

### 5.3 Schema requirements

Defined in `src/content/config.ts` with Zod, so violations fail the build:

| Rule | Enforcement |
|---|---|
| `subRegion` is one of the six documented values | Enum. A typo fails the build |
| Every `Photo` has non-empty `alt` | Required field. Missing alt is a build error |
| Every `Photo` has `consent: granted` to render | Filtered at query time |
| **No field named `phone` exists on `Person`** | The schema makes the privacy rule structural ([11 § 6](11_TEAM_AND_LEADERSHIP.md#6-privacy-and-personal-data)) |
| Every fact-bearing entity has a `source` field | The sourcing discipline made mechanical |
| `Event.startDate` is a real date, or `dateUncertain: true` | No invented precision |
| Cross-references resolve | A programme referencing a nonexistent partner fails the build |

> **`source` as a required field is the single most important schema decision.** It converts
> "never invent a fact about WUFPA" from a rule people are asked to remember into a condition
> the build enforces.

---

## 6. Routing

File-based. Dynamic routes generated from collections:

| Route | Generated from |
|---|---|
| `/programmes/[slug]/` | `content/programmes/` |
| `/regions/[slug]/` | `content/regions/` |
| `/guilds/[slug]/` | `content/guilds/` |
| `/leadership/[slug]/` | `content/people/` where `hasProfile: true` |
| `/news/[slug]/` + `/news/[page]/` | `content/news/` |
| `/events/[slug]/` | `content/events/` |
| `/impact/gallery/[slug]/` | `content/albums/` |

**URL stability is a functional requirement** ([05 § 2.1](05_INFORMATION_ARCHITECTURE.md#21-url-rules)).
Website goal W4 depends on links inside grant applications and printed material continuing to
work. A `slug` is set once and never changed; if a page must move, a 301 is added to the
redirects file and never removed.

**Internationalisation:** routing is configured with a default locale from day one, so adding
`/rn/` later is configuration rather than restructuring (constraint C7).

---

## 7. Content editing

**Phase 1 — markdown in git.** Content is edited by whoever builds the site, from the requests
WUFPA sends. Realistic given constraint C4, and it means launch is not blocked on training.

**Phase 2 — a git-based CMS** (Decap or Sveltia). WUFPA gets a visual editor at
`/admin/`; saving writes a commit; the commit triggers a build. No database, no hosting cost,
no vendor.

Configured so that:

- Only `news`, `events` and `albums` are editable initially — the collections that genuinely
  change. Governance and programme content changes rarely and benefits from review.
- Required fields are enforced in the UI, including `alt` text on every image.
- The editor cannot create a field the schema does not allow.

**Phase 3 — evaluate.** If WUFPA is publishing regularly and finds the interface limiting,
that is a good problem and worth revisiting. If nothing has been published in six months, the
answer is not a better CMS.

---

## 8. Image pipeline

| Stage | Action |
|---|---|
| 1 — Extract | Pull embedded images from the profile PDF at native resolution. Never screenshot ([12 § 5.3](12_MEDIA_LIBRARY.md#53-extraction-from-the-pdf)) |
| 2 — Identify | Match each extracted file to its subject against [12 § 3](12_MEDIA_LIBRARY.md#3-photographic-catalogue-by-profile-page) |
| 3 — Rename | Per the convention in [12 § 5.2](12_MEDIA_LIBRARY.md#52-naming-convention) |
| 4 — Correct | Exposure and white balance only. No stylistic grading |
| 5 — Record | Write the metadata record, including `alt`, `source`, `consent`, `objectPosition` |
| 6 — Build | Astro/Sharp generates AVIF/WebP/JPEG at the specified widths |
| 7 — Verify | Build fails if any derivative would exceed the source's intrinsic width |

**The no-upscale check is a build step, not a guideline.** Several assets top out below
600px ([12 § 3](12_MEDIA_LIBRARY.md#3-photographic-catalogue-by-profile-page)); a `sizes`
attribute requesting 1280px from a 226px source produces a visibly broken page, and it is
exactly the kind of error that survives review.

---

## 9. Performance budget

Constraint C1 makes these access requirements, not scores.

| Metric | Budget | Enforcement |
|---|---|---|
| Homepage total, initial load | ≤ 1.2 MB | CI check on build output |
| Interior page total | ≤ 800 KB | CI |
| JavaScript, compressed | ≤ 100 KB homepage, ≤ 60 KB interior | CI |
| CSS, compressed | ≤ 30 KB | CI |
| Fonts | ≤ 2 files, ≤ 90 KB total | Two variable WOFF2, subset ([03 § 6.1](03_BRAND_GUIDELINES.md#61-recommendation)) |
| LCP, Slow 4G | ≤ 2.5s | Lighthouse CI |
| CLS | ≤ 0.1 | Lighthouse CI |
| INP | ≤ 200ms | Lighthouse CI |
| Third-party requests on load | **0** | Manual + CI |
| Lighthouse Performance, mobile | ≥ 90 | Lighthouse CI, blocking |

**Techniques:** static HTML from the edge · inline critical CSS, defer the rest ·
self-hosted subset variable fonts with `size-adjust` fallback metrics · `srcset` everywhere ·
lazy loading below the fold · `fetchpriority="high"` on the LCP image only · deferred map ·
deferred search index · no analytics script on first paint · `Cache-Control: immutable` on
hashed assets.

**Prohibited:** third-party font CDNs (X31) · hot-linked third-party images (X35) · unthrottled
scroll handlers (X33) · `innerHTML +=` in loops (X32) · perpetual `setInterval` animation ·
any library added to solve a problem native CSS solves.

---

## 10. SEO implementation

Strategy: [16_SEO_ACCESSIBILITY.md](16_SEO_ACCESSIBILITY.md). Implementation:

- Metadata generated from content frontmatter, never hand-written per page.
- JSON-LD emitted per page type: `Organization`/`NGO` site-wide, plus `Article`, `Event`,
  `Person`, `ImageObject`, `BreadcrumbList`, `FAQPage`, `WebSite` with `SearchAction`.
- `sitemap.xml` generated at build, `lastmod` from git.
- `robots.txt` allowing all, pointing to the sitemap.
- Canonical URL on every page.
- Open Graph and Twitter card on every page, with a per-page image where one exists.
- `<html lang="en-UG">`.
- Redirects file, append-only.

---

## 11. Coding standards

### 11.1 Non-negotiables

| Rule | Reason |
|---|---|
| **Semantic HTML first.** `<button>` for actions, `<a>` for navigation, `<table>` for tabular data, real headings | Accessibility, SEO, and it is less code. The prototype uses `<div onclick>` for slider controls (X25) |
| **No styling value outside the token system** | [07 § 1](07_DESIGN_SYSTEM.md#1-token-architecture) |
| **Every image has `alt`; empty `alt=""` must be explicit and deliberate** | Build-enforced |
| **Every interactive element is keyboard-operable with visible focus** | FR-91 |
| **JavaScript targets `data-*`, never styling classes** | Refactoring CSS must not break behaviour |
| **No component renders a personal telephone number** | [08 § 25](08_COMPONENT_LIBRARY.md#25-rostertable) |
| **TypeScript `strict`. No `any`** | |
| **No dependency without a written reason** in the PR | Every dependency is a supply-chain and maintenance liability for an organisation with no IT staff |

### 11.2 CSS

Native CSS with custom properties · logical properties (`margin-inline`, `padding-block`) so
future localisation is not blocked · `@layer` for cascade control (`reset, base, layout,
components, utilities`) · nesting one level maximum · no `!important` outside the
reduced-motion reset · no ID selectors · container queries for component-level responsiveness.

### 11.3 JavaScript

Progressive enhancement always · feature-detect, do not browser-detect · event delegation over
per-element listeners · `passive: true` on scroll and touch listeners · throttle or use
IntersectionObserver rather than raw scroll handlers (X33) · no polyfills for browsers in the
support matrix.

### 11.4 Git

| Item | Convention |
|---|---|
| Branches | `main` (production) · `feat/*` · `fix/*` · `content/*` · `docs/*` |
| Commits | Conventional Commits: `feat(regions): add Kigezi page` |
| Documentation changes | `docs(NN): summary`, where NN is the document number ([README § 8](README.md#8-versioning-strategy)) |
| PRs | Require a passing build, Lighthouse CI and axe checks |
| `main` | Protected; deploys on merge |

### 11.5 Browser support

| Browser | Version |
|---|---|
| Chrome / Edge | last 2 |
| Firefox | last 2 |
| Safari (macOS/iOS) | last 2 |
| **Chrome for Android** | **last 4** — extended deliberately; the primary audience's device updates slowly (constraint C1) |
| Samsung Internet | last 2 — significant Android share in the region |
| Opera Mini | Content must be readable. Not a full-fidelity target, but a blank page is unacceptable |

Testing on a real mid-range Android device is a release requirement, not an emulator check
([17_QA_CHECKLIST.md](17_QA_CHECKLIST.md)).

---

## 12. Security

There is no server and no database, which removes most of the attack surface. What remains:

| Control | Implementation |
|---|---|
| HTTPS | Enforced, HSTS with `preload` |
| Content Security Policy | Strict; `default-src 'self'`; no `unsafe-inline` (hash or nonce the small amount of inline CSS) |
| Other headers | `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera, microphone, geolocation |
| Form spam | Honeypot + platform filtering. No CAPTCHA (FR-58) |
| Personal data | Not stored. Submissions are emailed ([10 § 7](10_MEMBERSHIP.md#7-data-protection-and-consent)) |
| Dependencies | Automated updates, minimal surface |
| Secrets | Environment variables in the host. Never committed |
| Access | Repository and hosting access held by **at least two people**, one of them at WUFPA. Sole-custodian access is how organisations lose their own websites |

---

## 13. Testing and CI

Every pull request runs:

| Gate | Tool | Blocking |
|---|---|---|
| Type check | `tsc --noEmit` | ✔ |
| Build | `astro build` | ✔ |
| Content schema validation | Zod, at build | ✔ |
| Link check, internal | `lychee` or equivalent | ✔ |
| Accessibility | axe-core across all routes | ✔ (zero critical/serious) |
| Performance | Lighthouse CI | ✔ (Performance ≥ 90) |
| Budgets | Bundle size check | ✔ |
| **Image upscale check** | Custom script | ✔ |
| **Personal-number scan** | Regex for Ugandan mobile patterns across built HTML | ✔ |
| **Consent check** | Any photo without `consent: granted` rendering | ✔ |

The last three are project-specific and exist because they encode the three rules most likely
to be broken by someone who has not read this documentation.

Manual testing per [17_QA_CHECKLIST.md](17_QA_CHECKLIST.md), including screen-reader passes and
a real Android device — neither of which any automated tool substitutes for.

---

## 14. Future scalability

How each future phase attaches without restructuring.

| Phase | What is added | Architectural change |
|---|---|---|
| **Member directory** | `members` collection populated; `/membership/members/` and `/members/[slug]/` generated | None. Collection and routes already modelled |
| **Film database** | New `films` collection referencing `members`, `regions`, `guilds` | New schema; existing entities unchanged |
| **Member portal** | Auth layer + a members API | The **first** change requiring runtime. Recommended as an adjacent application at `/portal/`, sharing design tokens and components but with its own deployment — so the public site stays static and unattackable |
| **Resource library** | `resources` collection + protected downloads | Static until access control is needed; then it moves behind the portal |
| **Opportunities board** | `opportunities` collection, same pattern as `news` | None |
| **Second language** | `content/rn/`, locale routing | Configuration only, if i18n routing is set up at launch (§ 6) |
| **Events at scale** | Filtering, calendar view | Pagination and filtering on an existing collection |

**The one thing that would force a rebuild** is abandoning the content model for hand-written
pages. That is the single architectural rule worth defending against schedule pressure.

---

*Document 14 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
