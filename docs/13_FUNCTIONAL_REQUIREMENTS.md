# 13 — Functional Requirements

*What the website must do. Numbered, testable, and prioritised.*

---

## 1. How to read this document

| Priority | Meaning |
|---|---|
| **MUST** | Release 1.0 does not ship without it |
| **SHOULD** | Release 1.0 ships with it unless there is a stated reason not to |
| **COULD** | Included if it costs little; otherwise deferred |
| **WON'T (this release)** | Explicitly out of scope, with the reason recorded |

Every requirement has an ID (`FR-xx`), an acceptance criterion, and — where relevant — a link
to the component that implements it. Acceptance criteria are written so that a tester can
verify them without asking what was meant.

---

## 2. Content presentation

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-01 | Every page in the sitemap ([05 § 2](05_INFORMATION_ARCHITECTURE.md#2-complete-sitemap)) exists at its specified URL and returns 200 | MUST | All routes reachable; no 404s from internal links |
| FR-02 | Every page has a unique `<title>` and meta description per [04 § 2](04_CONTENT_BIBLE.md#2-seo-metadata--all-pages) | MUST | No duplicates across the site |
| FR-03 | Programmes, regions, guilds, news, events and people are content entities with defined relationships, not hard-coded markup | MUST | Adding a seventh region requires one content file and no template change |
| FR-04 | Every content image renders as AVIF/WebP/JPEG with `srcset`, explicit dimensions and lazy loading below the fold | MUST | Zero cumulative layout shift from images; correct format served per browser |
| FR-05 | Photograph captions display in the page body, not only on hover or in a lightbox | MUST | Captions readable on a touch device without interaction |
| FR-06 | Breadcrumbs on every page except the homepage | SHOULD | Present, correct, and emitting `BreadcrumbList` data |
| FR-07 | Long pages provide an in-page contents list at `--bp-lg` and above | COULD | About, History and long programme pages |

---

## 3. Navigation and wayfinding

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-10 | Primary navigation present on every page, with the current section indicated by `aria-current` **and** a visible non-colour cue | MUST | Verified on every top-level section |
| FR-11 | "Become a Member" reachable in one interaction from any page | MUST | Header on desktop; pinned in the mobile menu |
| FR-12 | Mobile menu traps focus, closes on `Escape`, returns focus to its trigger | MUST | Keyboard-only test passes |
| FR-13 | Footer navigation reproduces the full site structure | MUST | Every sitemap route reachable from the footer or one click from it |
| FR-14 | Skip link is the first focusable element and moves focus to `<main>` | MUST | Tab once from page load; link appears and works |
| FR-15 | Every page offers 2–4 contextual related links | SHOULD | Chosen by relationship, not recency ([08 § 32](08_COMPONENT_LIBRARY.md#32-relatedlinks)) |
| FR-16 | Custom 404 page with search and four recovery routes | MUST | Returns HTTP 404 with the branded page |

---

## 4. News

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-20 | News index listing articles newest first, paginated at 12 | MUST | Real paginated URLs (`/news/2/`), not infinite scroll |
| FR-21 | Article pages with headline, standfirst, date, hero image and body | MUST | Renders markdown with the Prose component |
| FR-22 | Articles carry `Article` structured data and article-type Open Graph | MUST | Validates in Google's Rich Results Test |
| FR-23 | At least five articles published at launch, all from sourced facts ([04 § 13.2](04_CONTENT_BIBLE.md#132-article-template)) | MUST | News index is not empty on day one |
| FR-24 | RSS/Atom feed at `/feed.xml` | SHOULD | Valid feed; discoverable via `<link rel="alternate">` |
| FR-25 | Articles taggable by programme, region and guild, with tag archive pages | SHOULD | Tag pages generated only for tags in use |
| FR-26 | Share row on every article, WhatsApp first | SHOULD | Plain share links, no third-party widgets ([08 § 43](08_COMPONENT_LIBRARY.md#43-sharerow)) |

---

## 5. Events

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-30 | Events index separating upcoming from past | MUST | Upcoming ascending, past descending |
| FR-31 | **Event status derives from its date at build time**, not from a manually-set field | MUST | An event whose date passes moves to "past" on the next scheduled build with no human action ([09 § 9.2](09_PROGRAMMES_AND_EVENTS.md#92-status-handling--the-part-that-matters)) |
| FR-32 | Event pages carry date, venue, district, sub-region, programme and partners | MUST | All fields render, or are omitted cleanly when absent |
| FR-33 | Events support `postponed` and `cancelled` states, displayed as badges, with the page retained | MUST | Cancelled events remain at their URL — deleting breaks inbound links |
| FR-34 | Events carry `Event` structured data | SHOULD | Validates |
| FR-35 | Events with an uncertain date render year-only or "Date not recorded" | MUST | No fabricated precision |
| FR-36 | Homepage "What's happening" band falls back to latest news when no events are upcoming, and hides entirely when neither exists | MUST | Verified in all three states ([09 § 9.3](09_PROGRAMMES_AND_EVENTS.md#93-homepage-behaviour)) |
| FR-37 | "Add to calendar" (.ics) on upcoming events | COULD | |

---

## 6. Gallery

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-40 | Gallery albums grouped by activity strand ([04 § 12](04_CONTENT_BIBLE.md#12-impact-and-gallery)) | MUST | Eight albums at launch |
| FR-41 | Every photograph carries meaningful `alt` and a visible caption | MUST | No generic alt text; no uncaptioned images |
| FR-42 | Lightbox with keyboard navigation, focus trap, `Escape` to close, position announced | MUST | Keyboard and screen-reader test passes |
| FR-43 | Gallery functions without JavaScript — thumbnails link to full images | MUST | Disable JS; images still viewable |
| FR-44 | Full-size images load only on lightbox open | MUST | Network panel shows no full-size requests on page load |
| FR-45 | Photographs without recorded consent do not render | MUST | Build-level enforcement ([12 § 5.6](12_MEDIA_LIBRARY.md#56-per-asset-metadata)) |
| FR-46 | Filtering by region, programme or year | COULD | Deferred unless album volume warrants it |

---

## 7. Forms

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-50 | Membership application form per [10 § 5.2](10_MEMBERSHIP.md#52-specified-fields) | MUST | All 11 fields, correct types, conditional field 7 |
| FR-51 | General contact form per [04 § 15.1](04_CONTENT_BIBLE.md#151-contact-form) | MUST | |
| FR-52 | Forms submit and succeed with JavaScript disabled | MUST | Native POST to the platform handler |
| FR-53 | Client-side validation enhances but never replaces server-side handling | MUST | Bypassing client validation still yields a correct server response |
| FR-54 | Failed validation produces an error summary at the top, focus moves to it, each error links to its field | MUST | Screen-reader test passes |
| FR-55 | Every field has a persistent visible label, correct `autocomplete`, `type` and `inputmode` | MUST | No placeholder-as-label anywhere |
| FR-56 | Success state names the next step and who will respond | MUST | Per [10 § 5.5](10_MEMBERSHIP.md#55-confirmation-copy) |
| FR-57 | Consent checkbox, unticked by default, with specified wording, linked to the privacy notice | MUST | Submission blocked without it |
| FR-58 | Honeypot spam protection; **no CAPTCHA** | MUST | Honeypot field hidden accessibly, not `display:none` |
| FR-59 | Submissions route to WUFPA's address with the sub-region in the subject line | MUST | ⟦Q3⟧ |
| FR-60 | Submissions are emailed, not stored in a database | MUST | No personal data at rest ([10 § 7](10_MEMBERSHIP.md#7-data-protection-and-consent)) |
| FR-61 | Rate limiting on submissions | SHOULD | Platform-level |
| FR-62 | Autosave of a partially-completed form | WON'T | Requires storing personal data client-side; low benefit on an 11-field form |

---

## 8. Search

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-65 | Site-wide search across all page types | SHOULD | Static index, client-side |
| FR-66 | Search index loads only on interaction | MUST | Zero bytes for visitors who never search (constraint C1) |
| FR-67 | Results show type, title and excerpt with the query highlighted | SHOULD | |
| FR-68 | Empty state suggests a region, a programme or a person's name | SHOULD | Announced via live region |
| FR-69 | Search works without JavaScript | COULD | Degrades to a hidden-input query against a static results page, or the field is not rendered |

---

## 9. Contact and location

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-70 | Head office address in text on the contact page and in the footer | MUST | Marked up with `PostalAddress` |
| FR-71 | Map loads only on explicit user action; static image and "Open in Maps" link shown first | MUST | No third-party request on page load ([08 § 41](08_COMPONENT_LIBRARY.md#41-mapembed)) |
| FR-72 | Association email and telephone published | MUST | ⟦Q3⟧ — **no personal mobile numbers** |
| FR-73 | Press block with logo pack and profile download | SHOULD | Profile PDF must be redacted first ([12 § 7](12_MEDIA_LIBRARY.md#7-personal-data-in-the-media)) |
| FR-74 | Opening hours | COULD | ⟦Q24⟧ |

---

## 10. Social media

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-75 | Links to WUFPA's Facebook, WhatsApp and YouTube presence in the footer and on contact | MUST | ⟦Q9⟧ |
| FR-76 | Social links render nothing when no URL is configured | MUST | No dead or placeholder icons |
| FR-77 | Every page produces a correct Open Graph card | MUST | Verified in Facebook's Sharing Debugger and a WhatsApp preview — WUFPA's two actual channels `[P3]` |
| FR-78 | No embedded social feeds or third-party widgets | MUST | Heavy, tracking-laden, and they break when a platform changes its API |

---

## 11. Membership enquiries

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-80 | Membership CTA on every page per [10 § 6](10_MEMBERSHIP.md#6-become-a-member--cta-strategy) | MUST | Placement and label verified per the table |
| FR-81 | Region pages carry a localised "Join WUFPA in {Region}" CTA | SHOULD | |
| FR-82 | Guild pages carry a localised "Join the {Guild}" CTA | SHOULD | |
| FR-83 | Enquiry volume is measurable | MUST | Success metric Tier 1 ([01 § 6](01_PROJECT_FOUNDATION.md#6-success-metrics)) |
| FR-84 | Online membership payment | WON'T | No fee structure (Q8), no payment provider decision, no reconciliation process |

---

## 12. Accessibility, performance and privacy

These are functional requirements, not qualities. They are testable and they gate release.

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-90 | WCAG 2.2 Level AA conformance | MUST | Manual audit per [17_QA_CHECKLIST.md](17_QA_CHECKLIST.md); axe-core reports zero critical or serious violations |
| FR-91 | Every interactive element keyboard-operable with a visible focus indicator | MUST | Full keyboard traverse of every page |
| FR-92 | `prefers-reduced-motion` honoured globally | MUST | No transform or scale animation under the setting |
| FR-93 | Core content and navigation function without JavaScript | MUST | JS disabled: all content readable, all links work, all forms submit |
| FR-94 | Lighthouse mobile Performance ≥ 90 under Slow 4G throttling | MUST | Homepage and three interior pages |
| FR-95 | LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms on Slow 4G | MUST | Measured, not estimated |
| FR-96 | Homepage initial weight ≤ 1.2 MB; JavaScript ≤ 100 KB compressed | MUST | Measured at the network layer |
| FR-97 | Legible and operable at 320px width and at 200% zoom | MUST | No horizontal scroll except in designated table containers |
| FR-98 | No third-party requests on initial page load | MUST | Fonts self-hosted; maps deferred; no CDN imagery (X31, X35) |
| FR-99 | Cookieless analytics; no cookie banner required | SHOULD | If a consent-requiring tool is chosen instead, a compliant banner becomes a MUST |
| FR-100 | Privacy notice, terms and accessibility statement published | MUST | Linked from every page footer |
| FR-101 | **No personal telephone number or personal email of any individual appears anywhere on the site** | MUST | Verified by search across the built output ([11 § 6](11_TEAM_AND_LEADERSHIP.md#6-privacy-and-personal-data)) |

---

## 13. Content management

| ID | Requirement | Priority | Acceptance criterion |
|---|---|---|---|
| FR-110 | Content authored in markdown with typed frontmatter, validated at build | MUST | An invalid or missing required field fails the build |
| FR-111 | Adding a news article requires creating one file and nothing else | MUST | No index to update by hand |
| FR-112 | Scheduled rebuild at least daily, so date-derived states stay correct | MUST | Supports FR-31 |
| FR-113 | A visual editing interface for non-technical staff | SHOULD | Git-based CMS ([14 § 7](14_TECHNICAL_ARCHITECTURE.md)) |
| FR-114 | Written editing guide plus a live training session for WUFPA | MUST | Handover deliverable ([18](18_DEPLOYMENT_AND_MAINTENANCE.md)) |
| FR-115 | Full CMS with roles, workflow and approvals | WON'T | Disproportionate to WUFPA's editorial capacity (constraint C4) |

---

## 14. Explicitly out of scope for Release 1.0

Repeated here as requirements so that "we should add X" has a documented answer.

| ID | Excluded | Reason |
|---|---|---|
| FR-120 | Member login / member portal | Requires authentication and a member database that does not exist digitally. First item in [19_FUTURE_ROADMAP.md](19_FUTURE_ROADMAP.md) |
| FR-121 | Member directory | Four of 300+ members documented (Q16). A four-entry directory undermines the 300+ claim ([10 § 8](10_MEMBERSHIP.md#8-our-members--the-directory-question)) |
| FR-122 | Film catalogue, streaming or VOD | No film data of any kind supplied (Q11) |
| FR-123 | Online festival or competition submission | UCC runs its own process; duplicating it would confuse entrants |
| FR-124 | Donation processing | No verified payment channel (Q22). Publishing unverified payment details is a fraud risk |
| FR-125 | E-commerce | No product, no fulfilment |
| FR-126 | Multi-language | No translated content (constraint C7). Routing keeps the door open |
| FR-127 | Newsletter | WUFPA has no newsletter and no mailing list |
| FR-128 | User comments or forums | Moderation burden WUFPA cannot carry |
| FR-129 | Live chat | No staffing |
| FR-130 | Dark mode | Deferred with reasoning at [07 § 11](07_DESIGN_SYSTEM.md#11-dark-mode-strategy) |

---

## 15. Requirements traceability

Every MUST maps back to a website goal. A requirement serving no goal is a candidate for
removal.

| Goal | Requirements |
|---|---|
| **W1** Membership legible and joinable | FR-11, FR-50 – FR-60, FR-80 – FR-83 |
| **W2** Institutional credibility fast | FR-01 – FR-06, FR-20 – FR-23, FR-40 – FR-45, FR-70 – FR-72 |
| **W3** Publish the evidence | FR-03 – FR-05, FR-30 – FR-36, FR-40 – FR-45 |
| **W4** A permanent address to point at | FR-01, FR-02, FR-16, FR-77, and the stable-URL rule ([05 § 2.1](05_INFORMATION_ARCHITECTURE.md#21-url-rules)) |
| **W5** Regions and guilds visible | FR-03, FR-10, FR-81, FR-82 |
| **W6** Explain the SACCO | FR-01, FR-03 |
| **W7** Findable | FR-02, FR-22, FR-24, FR-34, FR-65 – FR-68, FR-77 |
| **W8** Works on a mid-range phone on metered data | FR-04, FR-44, FR-66, FR-71, FR-93 – FR-98 |

---

*Document 13 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
