# 15 — Implementation Roadmap

*How the site gets built, in what order, and what has to be true before each phase starts.*

---

## 1. Principles

1. **Nothing ships that is not sourced.** Content availability, not engineering capacity, is
   the critical path ([01 § 7 C2](01_PROJECT_FOUNDATION.md#7-constraints)).
2. **Blockers are resolved before the phase they block, not during it.** The blocking
   questions in [01 § 10.1](01_PROJECT_FOUNDATION.md#101-blockers) are Phase 0 work.
3. **Every phase ends with something demonstrable**, so WUFPA sees progress and can course-
   correct early.
4. **Accessibility and performance are built in per phase, not audited at the end.** An
   accessibility pass in the final week finds problems that are structural by then.
5. **The prototype is a reference, not a foundation** ([01 § 9.6](01_PROJECT_FOUNDATION.md#96-verdict)).

**Effort is expressed in working days for one full-stack designer-developer.** Calendar
duration depends on WUFPA's response time to content requests, which is the dominant
uncertainty.

---

## 2. Phase overview

| Phase | Name | Effort | Depends on | Output |
|---|---|---|---|---|
| **0** | Discovery sign-off and unblocking | 2 d + WUFPA time | — | Answers to blocking questions; consent; approved brand decisions |
| **1** | Foundation | 5 d | Phase 0 partial | Repo, tokens, content model, CI, deployed empty shell |
| **2** | Assets | 4 d | Phase 0 (consent, vector logo) | Logo pack, processed photo archive, captions, alt text |
| **3** | Homepage | 5 d | Phases 1–2 | Homepage complete and signed off |
| **4** | Core pages | 8 d | Phase 3 | About, Leadership, Programmes, Regions, Guilds |
| **5** | Conversion pages | 5 d | Phase 4, Q8 answered | Membership, Join, SACCO, Support, Contact, Partners |
| **6** | Dynamic content | 4 d | Phase 4 | News, Events, Impact/Gallery, search |
| **7** | Optimisation | 3 d | Phase 6 | Budgets met, SEO complete, structured data |
| **8** | Testing and remediation | 4 d | Phase 7 | WCAG 2.2 AA verified, cross-device, real Android |
| **9** | Launch | 2 d | Phase 8, Q5 | Live, monitored, handed over |
| **10** | Post-launch | ongoing | — | 30-day review, content pipeline |

**Total build effort: approximately 42 working days.** Realistic calendar duration is 10–14
weeks, dominated by Phase 0 and content turnaround.

---

## 3. Phase 0 — Discovery sign-off and unblocking

**This phase is not optional and cannot be compressed by starting to build.** Seven questions
block launch; three of them (names, membership terms, the Awards Gala outcome) affect content
architecture, not just copy.

### 3.1 WUFPA must provide

| # | Item | Why it blocks |
|---|---|---|
| Q1 | Confirmed spelling of every publishable name | Publishing a real person's name wrongly |
| Q2 | Which tagline is official; whether "un Fold" is intended | Appears on every page |
| Q3 | Association email and telephone (not a personal mobile) | Contact page and footer |
| Q4 | Written consent to publish names, roles and photographs | Data protection; Leadership page |
| Q5 | Domain name | Cannot deploy |
| Q6 | Outcome of the 13 Dec 2025 Awards Gala | Cannot publish a stale future tense |
| Q7 | Current UCC competition status | Same |
| Q8 | Membership fee, eligibility and process | The primary conversion path |

### 3.2 Agency deliverables

- Full documentation set reviewed with WUFPA, section by section — particularly
  [02_ORGANISATION_PROFILE.md](02_ORGANISATION_PROFILE.md), which is the factual basis for
  everything else.
- The conflicts register ([02 § 12.1](02_ORGANISATION_PROFILE.md#121-conflicts-between-sources))
  walked through and each item resolved or explicitly deferred.
- Brand decisions confirmed: palette, typography, photography policy
  ([03](03_BRAND_GUIDELINES.md)).
- A written note to WUFPA covering three things they will not have considered: that the
  profile PDF exposes ~60 personal mobile numbers if published as a download
  ([12 § 7](12_MEDIA_LIBRARY.md#7-personal-data-in-the-media)); that the prototype's leadership
  photographs are of unrelated people (X1); and that the "10,500 creatives" figure is derived
  rather than counted (X13).

### 3.3 Exit criteria

- [ ] Q1–Q8 answered in writing
- [ ] Documentation reviewed and signed off
- [ ] Brand direction approved
- [ ] Domain registered and DNS access confirmed
- [ ] Repository and hosting accounts created, with **two named holders, one at WUFPA**

> **If Q6 or Q8 cannot be answered**, Phases 1–4 still proceed. Phase 5 cannot complete
> without Q8, and the competitions page cannot complete without Q6. Say so early rather than
> shipping a guess.

---

## 4. Phase 1 — Foundation

**Effort: 5 days.**

| # | Task |
|---|---|
| 1.1 | Repository, Astro + TypeScript strict, folder structure per [14 § 4](14_TECHNICAL_ARCHITECTURE.md#4-folder-structure) |
| 1.2 | Design tokens as CSS custom properties, both layers ([07 § 1–4](07_DESIGN_SYSTEM.md)) |
| 1.3 | Content collection schemas with Zod ([14 § 5.3](14_TECHNICAL_ARCHITECTURE.md#53-schema-requirements)) — including the required `source` field and the absence of any `phone` field |
| 1.4 | Base layouts, reset, typography, a11y and print stylesheets |
| 1.5 | Global components: SkipLink, SiteHeader, PrimaryNav, MobileNav, SiteFooter, Breadcrumb |
| 1.6 | Primitives: Button, Link, Icon, Tag |
| 1.7 | Layout primitives: Section, PageHeader, Prose, Stack/Cluster/Grid/Switcher/Frame |
| 1.8 | Self-hosted subset variable fonts with fallback metric overrides |
| 1.9 | CI: type check, build, link check, axe, Lighthouse CI, bundle budgets, and the three project-specific gates ([14 § 13](14_TECHNICAL_ARCHITECTURE.md#13-testing-and-ci)) |
| 1.10 | Deploy pipeline to a preview URL; scheduled daily rebuild configured |

**Exit criteria:** an empty but deployed site with working navigation, all tokens in place, CI
green, and a keyboard traverse of the header and footer that passes.

---

## 5. Phase 2 — Assets

**Effort: 4 days.** Runs in parallel with Phase 1 where possible.

| # | Task |
|---|---|
| 2.1 | Redraw the logo as SVG — full lockup, mono, reverse, mark-only ([03 § 8.2](03_BRAND_GUIDELINES.md#82-required-production-work)). Request the original vector first (Q13) |
| 2.2 | Favicon set, web manifest, Open Graph template |
| 2.3 | Extract all embedded photographs from the profile PDF at native resolution ([12 § 5.3](12_MEDIA_LIBRARY.md#53-extraction-from-the-pdf)) |
| 2.4 | Visually match each extracted file to its subject against [12 § 3](12_MEDIA_LIBRARY.md#3-photographic-catalogue-by-profile-page) |
| 2.5 | Rename, correct exposure/white balance only, and record metadata per asset |
| 2.6 | **Write alt text and captions for every photograph** ([12 § 6](12_MEDIA_LIBRARY.md#6-alt-text)) |
| 2.7 | Record consent status per photograph; flag any without it |
| 2.8 | Configure the image pipeline and the no-upscale build check |
| 2.9 | **Quarantine the two roster scans** (`[P6]` xref 44, `[P7]` xref 64) — never committed to the site repository ([12 § 7](12_MEDIA_LIBRARY.md#7-personal-data-in-the-media)) |
| 2.10 | Produce a redacted profile PDF for download, if WUFPA wants one published |

**Exit criteria:** every asset named, captioned, alt-texted, consent-recorded and optimised.
Two roster scans excluded. No asset can produce a derivative larger than its source.

> **Task 2.6 is the most underestimated item in the roadmap.** Roughly 70 photographs each need
> a considered alt text and caption. Budget a full day; it is the difference between an
> accessible archive and a wall of images.

---

## 6. Phase 3 — Homepage

**Effort: 5 days.**

| # | Task |
|---|---|
| 3.1 | Hero with the selected photograph ([12 § 4](12_MEDIA_LIBRARY.md#4-asset-destinations-by-page)) |
| 3.2 | StatBlock — four dated figures, no derived numbers |
| 3.3 | Who we are, What we do, Where we work bands |
| 3.4 | EvidenceStrip — six dated activity items with photographs |
| 3.5 | Partners, Membership, News/Events, Support bands |
| 3.6 | Components built to spec: Hero, StatBlock, EntityCard, EvidenceStrip, CTABanner, RegionMap |
| 3.7 | Full responsive pass, 320px → 1536px |
| 3.8 | Accessibility pass: keyboard, screen reader, contrast, reduced motion |
| 3.9 | Performance pass against the budget |

**Exit criteria:** homepage complete, signed off by WUFPA, Lighthouse ≥ 90 mobile, axe clean,
keyboard-complete, tested on a real Android device.

> **Why the homepage is its own phase.** It exercises about 60% of the component library and
> settles every open visual question. Approving it approves the system; building it late means
> rebuilding pages that were designed against assumptions it overturns.

---

## 7. Phase 4 — Core pages

**Effort: 8 days.**

| # | Pages | Notes |
|---|---|---|
| 4.1 | About, History, Governance, Legal status | Timeline component; constitutional objects in a Disclosure |
| 4.2 | Leadership index, Executive, Trustees, Founders, 4 profiles | **Gated on Q1 and Q4** |
| 4.3 | Programmes index + 6 programme pages | Kibanda gets a typographic treatment — no borrowed photography |
| 4.4 | Regions index + 6 region pages | RegionMap plus the permanent text list |
| 4.5 | Guilds index + 10 guild pages | Typographic; no craft photography exists |
| 4.6 | Components: PersonCard, PersonProfile, Disclosure, Timeline, KeyFacts, RosterTable, PartnerList, RelatedLinks |

**Exit criteria:** all core pages complete; every governance roster rendered without a
telephone column; every claim traceable to
[02 § 13](02_ORGANISATION_PROFILE.md#13-facts-approved-for-publication).

---

## 8. Phase 5 — Conversion pages

**Effort: 5 days. Gated on Q8.**

| # | Task |
|---|---|
| 5.1 | Membership page — benefits framed by problem ([10 § 3.1](10_MEMBERSHIP.md#31-how-to-present-benefits)) |
| 5.2 | Join page and the 11-field form ([10 § 5.2](10_MEMBERSHIP.md#52-specified-fields)) |
| 5.3 | Form handling, validation, error summary, success state, consent checkbox |
| 5.4 | WUFM SACCO page, with its own logo and blue |
| 5.5 | Support WUFPA page |
| 5.6 | Contact page, forms, deferred map, press block |
| 5.7 | Partners page — photography-led |
| 5.8 | Privacy notice, terms, accessibility statement |
| 5.9 | Components: Field, Fieldset, Form, FormMessage, MapEmbed, SocialLinks |

**Exit criteria:** both forms submit successfully **with JavaScript disabled**; error and
success states pass a screen-reader test; a test submission arrives at WUFPA's address with
the sub-region in the subject line.

---

## 9. Phase 6 — Dynamic content

**Effort: 4 days.**

| # | Task |
|---|---|
| 6.1 | News index, pagination, article template, RSS |
| 6.2 | **Write and publish five launch articles** from sourced facts ([04 § 13.2](04_CONTENT_BIBLE.md#132-article-template)) |
| 6.3 | Events index and detail; **date-derived status logic** (FR-31) |
| 6.4 | Impact page and eight gallery albums |
| 6.5 | Gallery and Lightbox, with the no-JS fallback |
| 6.6 | Pagefind search, loaded on interaction |
| 6.7 | Components: Gallery, Lightbox, Pagination, SearchField, EmptyState, ShareRow |

**Exit criteria:** news index not empty; an event dated in the past automatically appears as
past after a rebuild; gallery works with JavaScript disabled.

---

## 10. Phase 7 — Optimisation

**Effort: 3 days.**

| # | Task |
|---|---|
| 7.1 | Meet every budget in [14 § 9](14_TECHNICAL_ARCHITECTURE.md#9-performance-budget) |
| 7.2 | Critical CSS inlined; remainder deferred |
| 7.3 | Font loading verified — no layout shift on swap |
| 7.4 | JSON-LD for every page type; validated |
| 7.5 | Sitemap, robots, canonicals, Open Graph verified in Facebook's debugger and a real WhatsApp preview |
| 7.6 | Caching and security headers, CSP |
| 7.7 | 404 page; redirects file initialised |
| 7.8 | Cookieless analytics |

**Exit criteria:** Lighthouse ≥ 90/100/100/100 mobile on the homepage and three interior
pages; zero third-party requests on load; a shared link renders correctly in WhatsApp.

---

## 11. Phase 8 — Testing and remediation

**Effort: 4 days.** Full checklist: [17_QA_CHECKLIST.md](17_QA_CHECKLIST.md).

| # | Task |
|---|---|
| 8.1 | Full WCAG 2.2 AA manual audit — every criterion, every page type |
| 8.2 | Screen-reader passes: NVDA/Firefox, VoiceOver/Safari, TalkBack/Chrome Android |
| 8.3 | Keyboard-only traverse of every page and every component |
| 8.4 | **Real device testing on a mid-range Android phone on a throttled connection** |
| 8.5 | Cross-browser matrix ([14 § 11.5](14_TECHNICAL_ARCHITECTURE.md#115-browser-support)) |
| 8.6 | Responsive verification 320px → 1536px, and 200% zoom |
| 8.7 | **Content audit against [02 § 13](02_ORGANISATION_PROFILE.md#13-facts-approved-for-publication)** — every factual claim on the site checked against the approved list |
| 8.8 | **Personal-data scan** of the built output for Ugandan mobile-number patterns |
| 8.9 | Link check, form submission tests, print stylesheet check |
| 8.10 | Remediation |

**Exit criteria:** zero critical or serious accessibility violations; every content claim
sourced; zero personal telephone numbers in the built output; all forms confirmed working.

> **Task 8.7 is the one that protects this project's central commitment.** It is a line-by-line
> read of the live site against the approved facts list. It is tedious and it is the reason the
> site will not repeat the prototype's failures.

---

## 12. Phase 9 — Launch

**Effort: 2 days.**

| # | Task |
|---|---|
| 9.1 | DNS cutover, SSL, `www` canonicalisation |
| 9.2 | Verify analytics and form delivery in production |
| 9.3 | Submit sitemap to Google Search Console and Bing Webmaster Tools |
| 9.4 | Uptime monitoring |
| 9.5 | **Handover session with WUFPA** — the Publicity and Communications Officer ([11 § 8](11_TEAM_AND_LEADERSHIP.md#8-website-ownership-after-launch)) |
| 9.6 | Written maintenance guide ([18](18_DEPLOYMENT_AND_MAINTENANCE.md)) |
| 9.7 | Confirm two people hold repository and hosting access, one of them at WUFPA |
| 9.8 | Announce: WUFPA's Facebook and WhatsApp channels, and to named partners |

**Exit criteria:** live on the production domain; monitoring active; WUFPA trained; access
distributed; documentation updated to v1.1 recording all Phase 0 answers.

---

## 13. Phase 10 — Post-launch

| When | Activity |
|---|---|
| Week 1 | Daily check of forms, errors and analytics. Fix anything broken immediately |
| Week 2 | Review search queries and 404s for content gaps |
| **Day 30** | **First review against the Tier 1 success metrics** ([01 § 6](01_PROJECT_FOUNDATION.md#6-success-metrics)). Particularly: are enquiries arriving, and are they coming from outside Mbarara? |
| Month 2 | Publish the first WUFPA-authored news item, with support |
| Month 3 | Phase 2 CMS if WUFPA wants it; close remaining `⚠ GAP` items |
| Month 6 | Full documentation re-read; metric review; roadmap conversation ([19](19_FUTURE_ROADMAP.md)) |

---

## 14. Critical path and risks

### 14.1 The critical path

```
Q1+Q4 (names, consent) ──→ Phase 4.2 Leadership ──┐
Q8 (membership terms) ──→ Phase 5 Conversion ─────┼──→ Phase 8 ──→ Launch
Q6 (Awards Gala) ──→ Phase 4.3 Competitions ──────┘
Q5 (domain) ─────────────────────────────────────────→ Phase 9
```

**Everything on the critical path is a WUFPA answer, not an engineering task.** That should be
communicated clearly and early: the build is not the constraint.

### 14.2 Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Blocking questions go unanswered** | High | Delays launch | Raise in Phase 0 with a written deadline. Build everything not dependent on them. Be explicit that launch cannot proceed without them |
| **Consent (Q4) is refused or partial** | Medium | Leadership page reduced | Design for it: PersonCard degrades to initials; RosterTable still works with names and roles. If names cannot be published at all, the governance page becomes structural rather than personal — weaker, but honest |
| **Pressure to fill gaps with plausible content** | **High** | Repeats the prototype's failure | This is the project's defining risk. Mitigations: the required `source` field in the schema (build-enforced), Task 8.7, and [20_WUFPA_QUALITY_MANIFESTO.md](20_WUFPA_QUALITY_MANIFESTO.md) |
| **Awards Gala outcome unknown at launch** | Medium | Competitions page incomplete | Publish the UCC competition content, omit the gala section entirely rather than hedging |
| **Membership terms never confirmed** | Medium | Primary conversion weakened | Ship the enquiry form without the fee section. An enquiry route with unstated terms still converts better than no route |
| **Photography consent unclear for group shots** | Medium | Gallery reduced | Prioritise consent for the small number of hero and leadership images; group shots at public events are lower risk but still need WUFPA's position |
| **Site is not maintained after launch** | **High** | Credibility decays | Date-derived states so nothing goes visibly stale; a launch site that is true for a long time without edits ([01 § 7 C4](01_PROJECT_FOUNDATION.md#7-constraints)); a realistic maintenance ask ([11 § 8](11_TEAM_AND_LEADERSHIP.md#8-website-ownership-after-launch)) |
| **Sole custodian holds all access** | Medium | WUFPA loses its own site | Task 9.7 |
| **Scope pressure for a member portal at launch** | Medium | Delays everything | It is documented as a separate project with its own funding conversation ([19](19_FUTURE_ROADMAP.md)) |

---

## 15. What "done" means for Release 1.0

- [ ] Every page in the sitemap live and reachable
- [ ] Every factual claim traceable to an approved source
- [ ] **Zero stock photographs of people**
- [ ] **Zero personal telephone numbers**
- [ ] **Zero invented film titles, member companies or statistics**
- [ ] WCAG 2.2 AA verified manually, not only by tooling
- [ ] Lighthouse ≥ 90 mobile on Slow 4G
- [ ] Works with JavaScript disabled
- [ ] Tested on a real mid-range Android device
- [ ] Both forms delivering to WUFPA
- [ ] Analytics and monitoring live
- [ ] WUFPA trained; access held by two people
- [ ] Documentation updated to reflect every Phase 0 answer
- [ ] Remaining `⚠ GAP` items recorded, not filled

---

*Document 15 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
