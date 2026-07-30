# WUFPA Website — Implementation Audit

**Audit date:** 26 July 2026
**Auditor role:** Principal Product Architect · Principal Software Architect · UX/UI Audit · Lead Frontend Engineer · QA Lead
**Audited artefact:** [`index.html`](index.html) — 32,719 bytes, 534 lines, single file
**Audited against:** the 21-document specification in [`docs/`](docs/) — 78,000 words
**Status:** Definitive engineering blueprint. No code to be written before this is accepted.

---

## 0. Scope note — read this first

The audit brief asks for a review of "every page, every component, every route, every
configuration, every dependency, every design token, every utility, every stylesheet, every
API, every reusable component."

A full-tree scan of the repository (excluding `.git`) returns **30 files in 2 directories**.
The measured reality of the implementation is:

| Brief asked me to audit | Actually present | Evidence |
|---|---|---|
| Every page | **1** (`index.html`, six anchor sections on one URL) | `<section id>` × 6 |
| Every route | **0** routes; 6 in-page anchors | No router, no second URL |
| Every component | **0** componentised; ~9 patterns inline | No component system exists |
| Every configuration | **0** | No `package.json`, `astro.config`, `tsconfig`, `netlify.toml`, `.nvmrc`, `.gitignore` |
| Every dependency | **0** | No manifest, no lockfile, no `node_modules` |
| Every design token | **10** CSS custom properties, all colour | `--bg --bg2 --card --gold --gold2 --red --cyan --text --muted --line` |
| Every stylesheet | **1**, inline `<style>`, 12,122 bytes | No external CSS |
| Every utility | **0** | No `lib/`, no helpers |
| Every API | **0** | No forms, no endpoints, no data layer |

**This is not a criticism of the work done — it is the single most important finding in the
audit, and it changes what "audit" and "backlog" mean for this project.** The brief's framing
implies a substantial application requiring evaluation and correction. What exists is a
single-file visual prototype representing, by route count, roughly **1.5% of the documented
Release 1.0 scope** (1 of ~65 specified routes) and, by component count, **0%**.

Everything below is therefore written to be useful in that reality: the audit sections
document what exists honestly, and the backlog (§ 11) and phases (§ 12) become the build plan
rather than a remediation plan.

### 0.1 On "do not rebuild from scratch"

The instruction is honoured, and I want to be precise about what it can and cannot mean here,
because the distinction affects every estimate below.

**What is genuinely preserved and carried forward** — these are real, they were good decisions,
and they are already credited in
[`docs/01 § 9.1`](docs/01_PROJECT_FOUNDATION.md#91-what-is-good-and-is-being-preserved):

1. The trust sequence: identity → leadership → work → members → evidence
2. Leading with scale as numeric proof
3. Leadership presented with progressive-disclosure biographies
4. Naming the six sub-regions explicitly rather than saying "Western Uganda"
5. Showing member production houses at all
6. A single visible primary action in the navigation
7. Restraint — scroll-reveal over carousel-heavy layout

**What cannot be incrementally migrated, as a matter of fact rather than preference:**

- There are no components to refactor into components.
- There are no routes to split into routes.
- There is no build to extend.
- There are no semantic tokens to rename — the 10 properties are raw colour literals, and
  7 of the 10 encode a palette that is factually wrong
  ([`docs/03 § 5.1`](docs/03_BRAND_GUIDELINES.md#51-sampled-from-the-official-assets)).
- **Approximately 40% of the file's body content must be deleted regardless of approach**,
  because it is fabricated (§ 7.1). Preserving the implementation would mean preserving mostly
  content that has to go.

Creating a `package.json` where none exists is not "rebuilding from scratch." It is the first
commit of any implementation. The strategy is preserved; the 534 lines are a reference
document, not a foundation. A line-by-line salvage map is at § 9.7 so this claim can be
checked rather than taken on trust.

---

# SECTION 1 — Executive Summary

## 1.1 Overall health

**The project is in excellent documentary health and pre-alpha implementation health.**

The specification is complete, sourced and internally validated (321 cross-references resolve;
all reference IDs defined; all 24 source pages cited). The implementation is a design
sketch that predates the specification, contradicts it on brand, content and architecture, and
contains content that cannot ship.

**The critical path is not engineering.** It is the eight blocking client answers in
[`docs/01 § 10.1`](docs/01_PROJECT_FOUNDATION.md#101-blockers). Building faster does not
shorten it.

## 1.2 Category ratings

| # | Category | Rating | Evidence |
|---|---|---|---|
| 1 | **Architecture** | **Critical** | No build system, no dependencies, no routing, no content model. 534-line single file. Every documented architectural decision ([`docs/14`](docs/14_TECHNICAL_ARCHITECTURE.md)) is unimplemented |
| 2 | **Design** | **Needs Improvement** | Competent visual craft — the layout, spacing rhythm and disclosure pattern are well executed. But the direction contradicts the spec: dark cinema treatment on a brand whose logo is 83% white, and which the strategy explicitly rejects ([`docs/06 § 9`](docs/06_WEBSITE_STRATEGY.md#9-how-credibility-is-communicated-visually)) |
| 3 | **Content** | **Critical** | 8 fabricated film titles, 4 fabricated member companies, a fabricated comedy section, 1 unsourced claim ("entry is free"), 1 derived statistic presented as counted. Roughly 40% of body content is unsourced |
| 4 | **Brand consistency** | **Critical** | Official logo never used (replaced by 🎬 emoji). 7 of 10 colour tokens invented — `--gold #d4af37` and `--red #e50914` (Netflix's red) against an actual palette of `#ED1B24`/`#231F20`. Official tagline "Let the Story un Fold" absent |
| 5 | **Responsiveness** | **Needs Improvement** | Works, and degrades sensibly. But only 2 breakpoints (900px, 600px), flat 120px section padding on all viewports, and untested below 360px. No container queries, no intrinsic layout |
| 6 | **Accessibility** | **Critical** | 0 `aria-*` attributes, 0 `role` attributes, 0 focus styles, 0 `prefers-reduced-motion`, no skip link, no `<main>`, no `<header>`. 21 elements set to `opacity:0` pending JavaScript. Slider controls are `<div onclick>` |
| 7 | **Performance** | **Needs Improvement** | Small HTML (32KB) but **23 external requests across 4 hosts**, 3 Google Font families at 10 weights, 19 hot-linked Unsplash images, unthrottled scroll handler, perpetual 5s `setInterval`, two `innerHTML +=` loops |
| 8 | **Code quality** | **Needs Improvement** | Readable, consistently formatted, sensibly organised for a single file — genuinely competent prototype code. But 20 hard-coded hex values bypass the tokens, 13 inline `style=` attributes, 8 inline event handlers, and no separation of concerns |
| 9 | **Scalability** | **Critical** | Adding a seventh region, a fifth member or a news article requires hand-editing markup. There is no content model. This is the specific failure that produced the fabricated member list |
| 10 | **Maintainability** | **Critical** | Single file, no version-controlled content, no CMS path, hard-coded `© 2025`. WUFPA cannot update anything without a developer |
| 11 | **SEO readiness** | **Critical** | No meta description, no Open Graph, no Twitter card, no canonical, no favicon, no JSON-LD, no sitemap, no robots.txt. **One URL for the entire site** — nothing is separately indexable. Shares to Facebook/WhatsApp — WUFPA's two actual channels — render a blank card |
| 12 | **Media handling** | **Critical** | **0 of 8 supplied client assets referenced.** All 19 images are third-party stock, including 4 portraits of strangers presented as named WUFPA leaders. No `srcset`, no dimensions, no lazy loading, no modern formats |
| 13 | **Overall production readiness** | **Critical** | Not shippable. Beyond the technical gaps, publishing fabricated members and stock portraits of strangers would damage the credibility the site exists to build |

**Scorecard: 0 Excellent · 0 Good · 5 Needs Improvement · 8 Critical.**

## 1.3 The three findings that matter most

**1. Fabricated content is the defining risk.** Not because the prototype's author acted in bad
faith — it was written to fill a layout — but because WUFPA's entire value to its ~10,000
members is being credible enough to negotiate on their behalf. A trade association publishing
invented member companies and stock photographs of strangers as its leadership has destroyed
the one asset the website exists to build.

**2. Zero of the supplied media is used.** WUFPA supplied a logo, 4 photographs and a 24-page
profile containing ~72 extractable documentary photographs of real members at real events. The
implementation uses none of it and hot-links 19 stock images instead. This is simultaneously
the largest quality gap and the cheapest to close.

**3. The blockers are client-side, not engineering-side.** Eight questions gate launch. Names
and consent gate the Leadership pages; membership terms gate the primary conversion path; the
Awards Gala outcome gates the competitions page. Engineering capacity is not the constraint and
should not be resourced as though it were.

---

# SECTION 2 — Documentation Coverage

Each specification document assessed against the implementation.

| Doc | Status | Assessment |
|---|---|---|
| [README](docs/README.md) | **Missing** | Specifies `docs/` structure and versioning. Repository has no root README, no `.gitignore`, no versioning in practice |
| [01 Project Foundation](docs/01_PROJECT_FOUNDATION.md) | **Partially implemented** | Goals W1–W8 defined; implementation serves W3 partially (evidence shown, but stock). W1 fails (no join path), W2 fails (no legal status/governance), W4 fails (one URL), W5 fails (no regions), W6 fails (no SACCO), W7 fails (no SEO), W8 fails (23 external requests) |
| [02 Organisation Profile](docs/02_ORGANISATION_PROFILE.md) | **Conflicting** | The implementation states facts that contradict the sourced profile: Banyankitara Films in Hoima (source: Rukungiri), UPSKY in Fort Portal (source: Kasese), President's term 2022–2030 (source: two terms), plus 12 unsourced entities. House style (§ 12.3) not applied |
| [03 Brand Guidelines](docs/03_BRAND_GUIDELINES.md) | **Conflicting** | Directly contradicted on palette, typography, logo usage, photography policy and motion. See § 6 |
| [04 Content Bible](docs/04_CONTENT_BIBLE.md) | **Missing** | Zero specified copy implemented. The Content Bible postdates the prototype; no page's copy matches. See § 7 |
| [05 Information Architecture](docs/05_INFORMATION_ARCHITECTURE.md) | **Missing** | ~65 specified routes; 1 exists. Primary nav should be About/Programmes/Regions/Membership/News + "Become a Member"; actual is Home/About/Leaders/Films/Members/Gallery + "Donate" |
| [06 Website Strategy](docs/06_WEBSITE_STRATEGY.md) | **Partially implemented** | The trust-ladder sequence (rungs 1–3) is genuinely present in the section order — the prototype's strongest asset. Rungs 4 (relevance) and 5 (action) absent. Visual credibility principles (§ 9) contradicted |
| [07 Design System](docs/07_DESIGN_SYSTEM.md) | **Missing** | 10 colour-only properties vs a specified 3-layer token architecture covering colour, space, type, radius, shadow, z-index, motion. No spacing scale, no type scale, no semantic layer |
| [08 Component Library](docs/08_COMPONENT_LIBRARY.md) | **Missing** | 43 components specified, 0 implemented as components. ~9 exist as inline patterns. See § 4 |
| [09 Programmes & Events](docs/09_PROGRAMMES_AND_EVENTS.md) | **Missing** | 6 programme areas specified; none present. No events capability. The date-derived status logic (FR-31) that prevents staleness does not exist |
| [10 Membership](docs/10_MEMBERSHIP.md) | **Missing** | The primary business goal has no implementation: no membership page, no form, no CTA. Nav CTA is "Donate" pointing at `#` |
| [11 Team & Leadership](docs/11_TEAM_AND_LEADERSHIP.md) | **Conflicting** | 4 profiles exist with broadly accurate sourced biography text — but illustrated with stock photographs of unrelated people, and publishing a personal mobile as the office number |
| [12 Media Library](docs/12_MEDIA_LIBRARY.md) | **Missing** | 0 of 8 supplied assets referenced; 0 of ~72 PDF photographs extracted. See § 5 |
| [13 Functional Requirements](docs/13_FUNCTIONAL_REQUIREMENTS.md) | **Missing** | Of 97 requirements, ~4 are met (FR-10 partial, FR-16 no, FR-40 partial, FR-42 no). No forms, no search, no news, no events, no maps |
| [14 Technical Architecture](docs/14_TECHNICAL_ARCHITECTURE.md) | **Missing** | No stack, no build, no content model, no CI, no image pipeline, no budgets |
| [15 Implementation Roadmap](docs/15_IMPLEMENTATION_ROADMAP.md) | **Not started** | Phase 0 (unblocking) not begun. Phase 1 (foundation) not begun |
| [16 SEO & Accessibility](docs/16_SEO_ACCESSIBILITY.md) | **Missing** | Neither half implemented. Full detail § 1.2 rows 6 and 11 |
| [17 QA Checklist](docs/17_QA_CHECKLIST.md) | **Not started** | No evidence of any QA pass |
| [18 Deployment & Maintenance](docs/18_DEPLOYMENT_AND_MAINTENANCE.md) | **Missing** | No hosting, no domain, no CI/CD, no analytics, no monitoring, no backups |
| [19 Future Roadmap](docs/19_FUTURE_ROADMAP.md) | **N/A** | Correctly not implemented — all items are explicitly post-launch |
| [20 Quality Manifesto](docs/20_WUFPA_QUALITY_MANIFESTO.md) | **Conflicting** | Principles 1, 2, 3, 6, 7 and 8 are each violated by the current implementation |

**Coverage: 0 fully implemented · 3 partially · 12 missing · 4 conflicting · 1 N/A · 1 not started.**

## 2.1 Documentation defect found during this audit

**One error in my own earlier documentation requires correction.**

[`docs/01 § 9.4`](docs/01_PROJECT_FOUNDATION.md#94-major--accessibility) finding **X17** states
that `--muted #888` on `--bg #050505` fails WCAG AA at "≈ 4.1:1". Computed from the actual
values, the ratio is **5.75:1 — it passes.** The same claim about `.stat-label`,
`.section-header p`, `.footer-col p` and `.member-info p` is therefore also wrong.

The measured contrast failures are narrower but real:

| Element | Pair | Ratio | Verdict |
|---|---|---|---|
| `.copyright` | `#444` on `#000` | **2.16:1** | Fails AA and AAA |
| `.section-tag` (12px) | `--red #e50914` on `#050505` | **4.25:1** | Fails AA for body text; passes for large/UI |
| `--muted` on all three backgrounds | `#888` on `#050505`/`#0a0a0a`/`#141414` | 5.75 / 5.58 / 5.20:1 | **Passes** |
| `--gold` on `--bg` | `#d4af37` on `#050505` | 9.69:1 | Passes |
| `--cyan` on `--card` | `#00d4ff` on `#141414` | 10.41:1 | Passes |
| White on `--red` (buttons) | `#fff` on `#e50914` | 4.79:1 | Passes |

**Action:** X17 must be rewritten in `docs/01` to the two genuine failures above, and the
documentation version bumped to 1.0.1. Recorded as backlog item **P0-7**.

The correction does not change the overall accessibility rating — 0 focus styles, 0 ARIA and
content hidden pending JavaScript are each independently disqualifying — but the audit must be
accurate about which findings are real.

---

# SECTION 3 — Page Audit

## 3.1 What exists: `index.html`, six anchor sections

### 3.1.1 `#home` — Hero

| | |
|---|---|
| **Purpose** | Establish existence and legitimacy (trust ladder rung 1–2) |
| **Status** | Implemented, wrong content |
| **Correct** | Badge with founding year and city; scale claim in the subheading; three-CTA structure recognises multiple audiences |
| **Incorrect** | Background is an Unsplash stock image; H1 set entirely in caps at `clamp(2.5rem,6vw,5.5rem)`; no logo |
| **Weak UX** | **Three competing CTAs** ("Watch Our Films" / "Discover WUFPA" / "Support Us") means no primary action. "Watch Our Films" leads to fabricated content |
| **Hierarchy** | Sound — badge, H1, subhead, actions |
| **A11y** | Text over image with no measured scrim; nav overlays hero with a transparent gradient header |
| **SEO** | H1 is three `<br/>`-separated lines; no structured data |
| **Perf** | LCP element is a hot-linked external image with no dimensions, no `srcset`, no `fetchpriority` |
| **Assets** | Needs `[PH-3]` (2400×1600, the highest-resolution supplied asset) |
| **Fix** | Replace image, single primary CTA "Become a Member", real headline from [`docs/04 § 3.1`](docs/04_CONTENT_BIBLE.md#31-hero) |
| **Priority** | **P0** |

### 3.1.2 `#about` — About / Stats / BTS

| | |
|---|---|
| **Purpose** | Explain the organisation; prove scale |
| **Status** | Partially correct; contains fabricated content |
| **Correct** | Stat band is a genuinely good pattern; the two paragraphs of body copy are accurate and sourced; the 5-item activity list is sourced |
| **Incorrect** | "10,500+ Individual Creatives" is 300 × 35 presented as a headcount; stats carry no as-of date |
| **Critical** | The **"Behind The Scenes (The Real Truth)"** panel — 4 invented jokes including one stating a WUFPA feature film costs UGX 50,000. Entirely fabricated, and positioned directly beside the funding narrative |
| **Missing** | Legal status, URSB registration, founding date, vision, mission, objectives — the entire credibility payload for audience A2 |
| **Weak UX** | Comedy adjacent to a funding ask actively undermines rung 2 of the trust ladder |
| **A11y** | `.stat-num`/`.stat-label` are unassociated spans — screen readers read "300+" and "Production Houses" as unrelated fragments |
| **Fix** | Delete BTS panel; label the derived figure; add legal status; date the stats |
| **Priority** | **P0** (deletion) / **P1** (additions) |

### 3.1.3 `#executives` — Leadership

| | |
|---|---|
| **Purpose** | Named, accountable people — the strongest credibility signal WUFPA owns |
| **Status** | **Best-executed section, most damaging defect** |
| **Correct** | Biography text is accurate and traceable to `[P4]`/`[P5]`. The disclosure pattern is the right interaction. Roles and terms shown |
| **Critical** | **All four portraits are Unsplash photographs of unrelated people** presented as Katabazi George, Rev. Mwesigwa, Cyril Baryabawe and Mushana Amos. Real portraits exist at `[P4]`/`[P5]` |
| **Incorrect** | Katabazi's term shown as "2022–2030"; source records two terms (2022–2025, 2025–2030) |
| **Missing** | Board of Trustees, Disciplinary Committee, Supervisory Committee, 6 sub-region teams, 10 guild heads — ~56 of ~60 office-holders |
| **A11y** | Disclosure buttons have no `aria-expanded`/`aria-controls`; state signalled only by a `▼`/`▲` glyph. `max-height:0` leaves collapsed content focusable and in the accessibility tree. `.exec-role` unassociated with the name |
| **Fix** | Replace portraits, correct term, add `aria-expanded`, switch to `hidden` |
| **Priority** | **P0** |

### 3.1.4 `#movies` — Film slider

| | |
|---|---|
| **Purpose** | Showcase member films |
| **Status** | **Entirely fabricated — must be deleted** |
| **Critical** | 8 invented titles with invented genres and stock poster art. No supplied source contains a single film title |
| **A11y** | Auto-advances every 5s with no pause/stop/hide (WCAG 2.2.2). Dots are `<div onclick>` — not focusable, no role, no name |
| **Perf** | 8 hot-linked images built via `innerHTML +=` in a loop; `setInterval` + `querySelectorAll` runs forever |
| **Fix** | **Delete the section.** Do not replace until WUFPA supplies a catalogue (Q11). Reserve `/films/` |
| **Priority** | **P0** |

### 3.1.5 `#members` — Members grid

| | |
|---|---|
| **Purpose** | Show the membership |
| **Status** | Half fabricated |
| **Correct** | 4 real companies present: Ankole City Filmz, UPSKY Film Network, Kigezi Universal Drama, Banyankitara Films. Avatar-initials pattern is a sound no-photo fallback |
| **Critical** | 4 invented: Rwenzori Cinematic Arts, Kitanga Cultural Troupe, Bunyoro Hollywood Studios, Tooro Warrior Films |
| **Incorrect** | Banyankitara Films → Hoima (source: Rukungiri; the name denotes Ankole–Kigezi peoples). UPSKY → Fort Portal (source: Kasese) |
| **Weak** | "+ 292 More Production Houses" card invites the reader to notice that 292 are absent |
| **A11y** | `<h4>` follows `<h2>` — **heading level skipped** (confirmed in document order) |
| **Fix** | Remove 4 fabrications, correct 2 locations, relabel as "Four of our member production companies", fix heading levels |
| **Priority** | **P0** |

### 3.1.6 `#gallery` — Photo gallery

| | |
|---|---|
| **Purpose** | Visual evidence |
| **Status** | Right idea, wrong images |
| **Critical** | All 6 images are Unsplash stock with WUFPA captions attached — e.g. a stock cinema photo captioned "WUFPA Kibanda Initiative Screening", and a stock red-carpet photo captioned "Western Uganda Film Awards Gala", an event whose occurrence is unconfirmed |
| **A11y** | Alt text is generic ("Workshop", "Filming", "Meeting") while a real caption sits directly beneath in the DOM. **Captions are hidden behind hover** (`translateY(100%)`) — invisible to touch and keyboard users |
| **Fix** | Replace with real photographs from `[P8]`–`[P24]`; captions always visible; real alt text |
| **Priority** | **P0** |

### 3.1.7 `<footer>` — Donate / info

| | |
|---|---|
| **Correct** | Address, email, partner list are accurate and sourced |
| **Critical** | **Primary CTA is "Donate to WUFPA Now" linking to `#`** — a dead anchor, repeated in nav and hero. **The published phone `+256 701 927 701` is the President's personal mobile** |
| **Incorrect** | Hard-coded `© 2025` |
| **A11y** | Footer links use inline `onmouseover`/`onmouseout` colour changes with no keyboard equivalent. `<h4>` follows `<h2>` — heading skip |
| **Fix** | "Become a Member" as primary; association contact only; generated year; remove inline handlers |
| **Priority** | **P0** |

## 3.2 Documented pages that do not exist

All **Missing**, all **P1** unless noted. Purpose and priority per
[`docs/06 § 4`](docs/06_WEBSITE_STRATEGY.md#4-why-each-page-exists).

| Route | Purpose | Priority | Blocked by |
|---|---|---|---|
| `/about/` + history, governance, **legal** | Rung-2 credibility for funders | **P1** (legal: **P0**) | — |
| `/leadership/` + executive, trustees, founders, 4 profiles | Named accountability | **P1** | Q1, Q4 |
| `/programmes/` + 6 pages | The delivery record — rung 3 | **P1** | Q6, Q7 for competitions |
| `/regions/` + 6 pages | Coverage + local coordinator (rung 4) | **P1** | Q1, Q4 |
| `/guilds/` + 10 pages | Craft belonging (rung 4) | **P2** | Q1, Q4 |
| `/membership/` + `/join/` | **Primary business goal** | **P0** | Q8 |
| `/sacco/` | Distinctive financial-inclusion asset | **P2** | Q15 |
| `/partners/` | Borrowed credibility | **P1** | Q10 for logos only |
| `/impact/` + 8 albums | The photographic evidence | **P1** | Q4 |
| `/news/` + 5 launch articles | Proof of life | **P1** | — |
| `/events/` | Member actionability | **P2** | — |
| `/support/` | Converts funder interest | **P2** | Q22 |
| `/contact/` | Closes the loop; press | **P0** | Q3 |
| `/search/` | Findability | **P3** | — |
| `/legal/` × 3 | Privacy is a legal requirement | **P0** (privacy) | — |
| `/404` | Recovery | **P2** | — |

---

# SECTION 4 — Component Audit

43 components are specified in [`docs/08`](docs/08_COMPONENT_LIBRARY.md). **0 exist as
components.** Nine exist as inline patterns and are assessed on whether the pattern is
salvageable as a specification reference.

| # | Component | Pattern present? | Assessment |
|---|---|---|---|
| 1 | SkipLink | ✗ | Absent. WCAG 2.4.1 |
| 2 | SiteHeader | Partial | Fixed 75px, transparent-gradient over hero. Spec requires solid, compact-on-scroll. Transparent header over WUFPA's bright photography is unreadable |
| 3 | PrimaryNav | Partial | 6 links + CTA. No `aria-current`, no panels, no keyboard-accessible dropdowns |
| 4 | MobileNav | Partial | Slide-in panel works. **No accessible name** (bare `☰`), no `aria-expanded`, no `aria-controls`, no focus trap, no `Escape`, no focus return |
| 5 | SiteFooter | Partial | 3 columns. Inline hover handlers; heading skip; dead CTA |
| 6 | Breadcrumb | ✗ | Absent (single page — not applicable yet) |
| 7 | Section | Partial | Flat `padding:120px 20px` at every viewport — wastes ~⅓ of a 360px screen per section |
| 8 | PageHeader | ✗ | Absent |
| 9 | Prose | ✗ | Absent |
| 10 | **Button** | **Partial — salvageable** | 4 variants (`gold`, `ghost`, `red`, `donate-nav`) with sensible sizing. Palette wrong; no focus style; `<a>`/`<button>` used inconsistently |
| 11 | Link | ✗ | No link styling system; body links not underlined |
| 12 | Icon | ✗ | **Emoji used as UI**: 🎬 as the logo, ❤ on donate, ▶ on a link, 🎬 as a list bullet. Announced verbosely by screen readers, unstylable |
| 13 | Tag | Partial | `.section-tag` eyebrow only. 12px red = 4.25:1, fails AA |
| 14 | Figure | ✗ | No `<figure>`/`<figcaption>` anywhere |
| 15 | ResponsiveImage | ✗ | No `srcset`, no dimensions, no lazy loading, no modern formats, all external |
| 16 | Hero | Partial | See § 3.1.1 |
| 17 | **StatBlock** | **Partial — salvageable** | Good visual pattern. Needs semantic association, dates, and removal of the derived figure |
| 18 | EntityCard | ✗ | Three unrelated card treatments exist (`.exec-card`, `.member-card`, `.gallery-item`) with no shared abstraction |
| 19 | PersonCard | Partial | Layout good; **stock portraits**; no initials fallback; role/name unassociated |
| 20 | PersonProfile | ✗ | Absent |
| 21 | **Disclosure** | **Partial — salvageable pattern** | Correct interaction choice. Implementation fails: no `aria-expanded`/`aria-controls`, `max-height:0` keeps content focusable, force-closes siblings, animates `max-height` (layout thrash) |
| 22 | Timeline | ✗ | Absent |
| 23 | EvidenceStrip | ✗ | Absent — the `#movies` slider occupies its slot with fabricated content |
| 24 | KeyFacts | ✗ | Absent. No `<dl>` anywhere |
| 25 | RosterTable | ✗ | Absent. No `<table>` anywhere |
| 26 | PartnerList | Partial | Footer text list of 4 partners — accurate. Spec wants grouping and evidence photography |
| 27 | Gallery | Partial | Grid works. Hover-hidden captions; stock images; generic alt |
| 28 | Lightbox | ✗ | Absent |
| 29 | PullQuote | ✗ | Absent |
| 30 | Callout | Partial | `.bts-box` is the only instance and its content must be deleted |
| 31 | RegionMap | ✗ | Absent — regions mentioned in one sentence of prose |
| 32 | RelatedLinks | ✗ | Absent |
| 33 | CTABanner | Partial | Footer donate block. Dead link |
| 34 | EmptyState | ✗ | Absent |
| 35–38 | **Field, Fieldset, Form, FormMessage** | ✗ | **No `<form>`, no `<label>`, no `<input>` exists anywhere on the site.** The primary business goal has no mechanism |
| 39 | SearchField | ✗ | Absent |
| 40 | Pagination | ✗ | Absent |
| 41 | MapEmbed | ✗ | Absent |
| 42 | SocialLinks | ✗ | Absent — despite Facebook/WhatsApp being WUFPA's two stated channels |
| 43 | ShareRow | ✗ | Absent |

## 4.1 Cross-cutting component findings

**Animations.** Three `@keyframes`: `pulse` (infinite, on the emoji logo), `grain` (infinite
8-step film-grain overlay), `fadeIn` (slider). Two run forever, consuming CPU and battery on
the mid-range Android devices that are the primary audience. Scroll-reveal uses 40px translate
over 800ms — spec calls for ≤16px over 320–400ms. **`prefers-reduced-motion` is entirely
absent.**

**Responsive behaviour.** 2 breakpoints. No container queries. No intrinsic layout — the grids
use `auto-fit`/`minmax` in three places, which is correct and worth keeping. Untested below
360px.

**Accessibility.** Aggregate: **0** `aria-*`, **0** `role`, **0** `:focus`/`:focus-visible`,
**0** `prefers-reduced-motion`, **0** `tabindex`, **0** `<main>`, **0** `<header>`,
**0** `<label>`, **8** inline event handlers, **1** `<div onclick>` (×8 at runtime),
**21** elements at `opacity:0` pending JavaScript.

**Consistency.** 20 hard-coded hex values bypass the 10 tokens; 13 inline `style=` attributes;
14 distinct `rgba()` literals; 31 distinct pixel values with no scale.

---

# SECTION 5 — Media Audit

## 5.1 Supplied vs integrated

| Asset | Supplied | Integrated | Status |
|---|---|---|---|
| `WUFPA  LOGO 2023.jpg.jpeg` (1515×1529) | ✔ | ✗ | **Missing** — replaced by 🎬 emoji |
| WUFPA logo variant (1280×1221) | ✔ | ✗ | **Missing** |
| WUFM SACCO logo (1229×984) | ✔ | ✗ | **Missing** |
| `IMG_9788` Tooro workshop (2400×1600) | ✔ | ✗ | **Missing** — the best hero candidate supplied |
| `IMG-20230711` Bunyoro workshop | ✔ | ✗ | **Missing** |
| `IMG-20210304` certificates | ✔ | ✗ | **Missing** |
| `WUFPA MEMBERSHIP CERTIFICATE (1)` (pioneers 2017) | ✔ | ✗ | **Missing** |
| `WUFPA PROFILE 2026.pdf` (~72 photos) | ✔ | ✗ | **Missing** — nothing extracted |

**Verified: 0 local asset references of any kind in `index.html`.** The `public/` directory is
entirely unreferenced by the implementation.

## 5.2 What is used instead

| Category | Count | Source | Verdict |
|---|---|---|---|
| Hero background | 1 | Unsplash | **Needs replacement** |
| Leadership portraits | 4 | Unsplash | **Critical — must be replaced.** Real people misrepresented |
| Film posters | 8 | Unsplash | **Delete** — the section is fabricated |
| Gallery | 6 | Unsplash | **Needs replacement** |
| **Total** | **19** | 1 third-party host | Not WUFPA's to publish |

## 5.3 Media handling quality

| Aspect | Status |
|---|---|
| Modern formats (AVIF/WebP) | **Missing** |
| `srcset` / `sizes` | **Missing** |
| Explicit `width`/`height` | **Missing** — every image is a layout-shift source |
| `loading="lazy"` | **Missing** |
| `fetchpriority` on LCP | **Missing** |
| Meaningful alt text | **Needs replacement** — 6 generic strings, 1 template literal |
| Captions | Present but hover-hidden |
| Local hosting | **Missing** — all external |
| Video | **Missing** — none supplied (Q12) |
| Partner logos | **Missing** — none supplied (Q10) |
| Social links | **Missing** — none supplied (Q9) |

**Assessment: Critical.** The cheapest, highest-impact work available on this project is
extracting and integrating the ~72 real photographs that already exist.

---

# SECTION 6 — Brand Audit

| Dimension | Specified | Implemented | Verdict |
|---|---|---|---|
| **Logo** | SVG lockup, 4 variants, min sizes, clear space | 🎬 emoji | **Critical** |
| **Primary red** | `#ED1B24` (sampled, 6.35% of logo) | `#e50914` (Netflix red) | **Critical** |
| **Black** | `#231F20` (sampled, warm) | `#050505`/`#0a0a0a`/`#141414` | **Critical** |
| **Ground** | White — the logo is 83% white | Near-black | **Critical** |
| **Gold** | Does not exist in the brand | `--gold #d4af37`, `--gold2 #f3e5ab` | **Critical — invented** |
| **Cyan** | Does not exist | `--cyan #00d4ff` | **Critical — invented** |
| **Display type** | Archivo (grotesque, variable) | Cinzel (Roman inscriptional capitals) | **Needs Improvement** — wrong register: classical antiquity/luxury goods |
| **Body type** | Source Serif 4 for long-form | Inter | **Needs Improvement** |
| **Font loading** | 2 self-hosted subset variable WOFF2, ≤90KB | 3 Google families, 10 weights, render-blocking third-party | **Critical** |
| **Type case** | Sentence case; caps for eyebrows only | Hero H1 fully capitalised at up to 5.5rem | **Needs Improvement** |
| **Spacing** | 11-step rem scale | 31 ad-hoc pixel values | **Needs Improvement** |
| **Motion** | ≤400ms, 16px, reduced-motion honoured | 800ms/40px, 2 infinite loops, no reduced-motion | **Critical** |
| **Photography** | Real, documentary, minimally processed | 19 stock, plus a `brightness(0.3)` filter and animated grain overlay | **Critical** |
| **Voice** | Evidence not adjectives; members as colleagues | Largely sound where sourced — but "The WUFPA Army" and the BTS comedy break register | **Needs Improvement** |
| **Tagline** | "Let the Story un Fold" (logo) + "Telling our stories…" (strapline) | Strapline only | **Needs Improvement** |

## 6.1 Does the implementation communicate the required qualities?

| Quality | Verdict | Reasoning |
|---|---|---|
| **Professionalism** | **No** | Emoji logo; a comedy section joking about UGX 50,000 budgets adjacent to a funding appeal; dead primary CTA |
| **Trust** | **No** | Stock portraits of strangers under real names is the single most trust-destroying decision available. Fabricated members compound it |
| **Industry leadership** | **Partially** | The 300+/6-region framing lands. Undercut by an unspecified "Army" register and no governance, legal status or partners section |
| **Community** | **Partially** | Member grid and leadership focus are right instincts. But no real member faces, no regions, no guilds, no join path |
| **Authenticity** | **No** | The one dimension where the implementation fails hardest. Nothing on the page is WUFPA's own — not the logo, not the photographs, not half the content |
| **Premium quality** | **No** | Per [`docs/20`](docs/20_WUFPA_QUALITY_MANIFESTO.md), premium is restraint and everything working. Dark-and-gold is the visual language of luxury pastiche, and it fights a red-and-white mark |

---

# SECTION 7 — Content Audit

## 7.1 Fabricated content inventory

| Content | Location | Source check |
|---|---|---|
| 8 film titles + genres | `#movies` (JS) | **No supplied source contains any film title** |
| Rwenzori Cinematic Arts, Kasese | `#members` | **Not in any source** |
| Kitanga Cultural Troupe, Mbarara | `#members` | **Not in any source** |
| Bunyoro Hollywood Studios, Masindi | `#members` | **Not in any source** |
| Tooro Warrior Films, Fort Portal | `#members` | **Not in any source** |
| 4 "Behind The Scenes" jokes | `#about` | **Invented** |
| "entry to WUFPA is free" | footer | **Unsourced** — no supplied source states any fee position |
| "10,500+ Individual Creatives" | `#about` | **Derived** (300 × 35), presented as counted |
| Banyankitara Films → Hoima | `#members` | **Contradicts** `[P6]` (Rukungiri) |
| UPSKY Film Network → Fort Portal | `#members` | **Contradicts** `[P4]`/`[P6]` (Kasese/Rwenzori) |
| President's term "2022–2030" | `#executives` | **Contradicts** `[P5]` (two terms) |
| 4 leadership portraits | `#executives` | **Stock photographs of unrelated people** |
| 6 gallery captions on stock images | `#gallery` | Real captions attached to unreal photographs |

**Measured: ~40% of body content is unsourced, fabricated or contradicts the source.**

## 7.2 Content quality assessment

| Criterion | Finding |
|---|---|
| **Missing copy** | Legal status, vision, mission, objectives, governance, membership offer, join process, programmes, regions, guilds, SACCO, partners detail, news, events, contact form. Zero of the Content Bible's specified copy is present |
| **Weak copy** | "The WUFPA Army" — militaristic register, inconsistent with a trade association. "Now Showing" applied to fabricated films |
| **Duplicated copy** | Minor: the strapline appears twice; three CTAs point at the same dead anchor |
| **Placeholder copy** | `href="#"` on the primary donate CTA (3 instances); HTML comment `<!-- Replace '#' with your actual PayPal/GoFundMe/Mobile Money link -->` — a placeholder shipped in the markup |
| **Generic AI wording** | Largely absent, to the prototype's credit. The sourced prose is specific and concrete. The failure mode here is fabrication, not blandness |
| **Marketing clichés** | "Pure talent, zero CGI, 100% hustle"; "Every dollar funds a dream"; "cinematic magic" |
| **Missing CTAs** | **No membership CTA anywhere.** No partnership CTA, no contact route, no form. The only CTA is dead |
| **Weak storytelling** | The isolation→organisation arc ([`docs/06 § 6.1`](docs/06_WEBSITE_STRATEGY.md#61-the-story-is-a-movement-from-isolation-to-organisation)) is absent. No dates, no partner names in body copy, no before/after |

## 7.3 What the copy gets right

Worth recording so it is not discarded: the About section's two body paragraphs, the 5-item
activity list, all four leadership biographies, the footer address/email, and the partner list
are **accurate, specific and traceable to the source PDF**. That is roughly 60% of the body
copy and it is genuinely good work. The problem is the other 40% and the fact that none of it
is in a content model.

---

# SECTION 8 — Functional Audit

| Feature | Status | Detail |
|---|---|---|
| **Navigation — desktop** | **Partially working** | Anchors scroll correctly. No `aria-current`, no focus styles, wrong IA |
| **Navigation — mobile** | **Partially working** | Panel opens/closes. No accessible name, no `aria-expanded`, no focus trap, no `Escape`, no focus return |
| **Navigation — keyboard** | **Needs redesign** | No focus indicator anywhere; menu unusable by keyboard |
| **Forms** | **Missing** | **No form exists.** Zero `<form>`, `<label>`, `<input>` |
| **Membership enquiry** | **Missing** | Primary business goal has no mechanism |
| **Contact** | **Missing** | No contact page, no form. A `mailto:`-less email string only |
| **Gallery** | **Partially working** | Grid renders. No lightbox, hover-only captions, stock images |
| **Lightbox** | **Missing** | — |
| **Search** | **Missing** | — |
| **Social media** | **Missing** | No links anywhere, despite Facebook/WhatsApp being the primary channels |
| **Maps** | **Missing** | — |
| **News** | **Missing** | — |
| **Events** | **Missing** | — |
| **Donate / Support** | **Needs redesign** | CTA exists ×3, all → `#`. Dead |
| **Film slider** | **Needs redesign** | Works mechanically; content fabricated; fails WCAG 2.2.2 |
| **Leadership disclosure** | **Partially working** | Works with mouse; fails ARIA and focus management |
| **Scroll reveal** | **Needs redesign** | Works, but hides 21 elements pre-JS and ignores reduced-motion |
| **Media playback** | **Missing** | No video |
| **Accessibility** | **Needs redesign** | See § 1.2 row 6 |
| **Performance** | **Partially working** | Light HTML; 23 external requests undermine it |
| **SEO** | **Missing** | Nothing present beyond `<title>` and viewport |
| **Analytics** | **Missing** | — |
| **Future extensibility** | **Missing** | No content model, no build, no routing |

**Tally: 0 fully working · 7 partially working · 12 missing · 5 need redesign.**

---

# SECTION 9 — Engineering Audit

| Dimension | Finding |
|---|---|
| **Folder structure** | 2 directories. No `src/`, no `components/`, no `content/`, no `styles/`, no `scripts/`, no `assets/`. Spec defines a 9-directory `src/` tree |
| **Naming conventions** | Internally consistent kebab-case classes — credit where due. No BEM, no `data-*` hooks; JS targets styling classes, so any CSS refactor silently breaks behaviour |
| **Component architecture** | None. Three unrelated card treatments; nav/footer/hero markup inline and unreusable |
| **Code duplication** | 4 near-identical `.exec-card` blocks (~15 lines each) differing only in data — the exact duplication a content model eliminates. 9 near-identical `.member-card` blocks. 6 near-identical `.gallery-item` blocks |
| **Technical debt** | 13 inline `style=` attributes; 8 inline event handlers; 20 hard-coded hex values; a shipped placeholder comment; `© 2025` hard-coded |
| **Reusable patterns** | 3 uses of `repeat(auto-fit, minmax())` — correct intrinsic layout, worth keeping as a reference |
| **Performance** | 23 external requests / 4 hosts. 3 font families × 10 weights, render-blocking. 19 hot-linked images. Unthrottled `scroll` listener. Perpetual `setInterval` at 5s calling `querySelectorAll` ×4. Two `innerHTML +=` loops re-parsing the subtree per iteration. Two infinite CSS animations |
| **Image optimisation** | None. No formats, sizes, dimensions, lazy loading or local hosting |
| **Video optimisation** | N/A — no video |
| **Accessibility** | See § 4.1 aggregate |
| **Responsive** | 2 breakpoints; flat 120px section padding; no container queries; untested <360px |
| **SEO** | 7 of 8 head requirements absent; single URL |
| **Metadata** | `<title>` and `viewport` only |
| **Bundle size** | 32.7KB HTML — but ~1.5–2.5MB effective first load once fonts and 19 unoptimised external images resolve. Spec budget: **1.2MB total, 100KB JS** |
| **Maintainability** | WUFPA cannot change anything without a developer editing markup |

## 9.1 Salvage map — what literally carries forward

Offered so § 0.1 can be verified rather than trusted.

| From `index.html` | To | Value |
|---|---|---|
| Section order (lines 189–407) | Homepage band sequence, [`docs/05 § 5.1`](docs/05_INFORMATION_ARCHITECTURE.md#51-homepage-sequence) | **High** — the trust ladder |
| About body copy (lines 222–230) | `/about/` + `/programmes/` | **High** — sourced and accurate |
| 4 leadership biographies (lines 276–327) | `/leadership/[person]/` | **High** — sourced |
| Footer address/email/partners (lines 421–439) | `/contact/`, `/partners/` | **High** — sourced |
| Stat band pattern (lines 213–218) | StatBlock component | **Medium** — pattern only |
| Disclosure interaction (lines 462–477) | Disclosure component | **Medium** — concept only; implementation replaced |
| `auto-fit`/`minmax` grids | Layout primitives | **Medium** |
| Button sizing/scale | Button component | **Low** — geometry only; palette replaced |
| Everything else (~70% of lines) | — | **None** — fabricated, stock-dependent, or superseded |

**Roughly 25–30% of the file has downstream value, almost all of it as content and
specification rather than as code.**

---

# SECTION 10 — Risk Assessment

| # | Risk | Category | Level | Mitigation |
|---|---|---|---|---|
| R1 | Publishing stock portraits as named Ugandan leaders | Brand / Legal / Ethical | **Critical** | Replace from `[P4]`/`[P5]`; initials fallback otherwise; CI consent gate |
| R2 | Publishing fabricated member companies and films | Content / Reputational | **Critical** | Delete; required `source` field in content schema |
| R3 | Publishing an individual's personal mobile as the office number | Privacy / Legal (DPPA 2019) | **Critical** | Association contact only (Q3); CI phone-number scan |
| R4 | Profile PDF exposes ~60 personal mobile numbers if offered as a download | Privacy / Legal | **Critical** | Redact before publishing; never commit the two roster scans |
| R5 | Schedule pressure reproducing fabricated content | Content / Process | **Critical** | Build-enforced `source` field; QA task 8.7; [`docs/20`](docs/20_WUFPA_QUALITY_MANIFESTO.md) |
| R6 | Third-party images not WUFPA's to publish | Legal / Brand | **High** | Replace all 19 with owned assets |
| R7 | Eight blocking questions unanswered → launch slips | Process | **High** | Phase 0 with a written deadline; build everything not dependent |
| R8 | Consent (Q4) refused or partial | Content / Legal | **High** | PersonCard degrades to initials; RosterTable works name+role only |
| R9 | Accessibility exposure — no focus, no ARIA, content hidden pre-JS | Accessibility / Legal | **High** | WCAG 2.2 AA gate in CI; manual audit Phase 8 |
| R10 | 23 external requests on a metered 3G audience | Performance / Access | **High** | Self-host fonts, local images, zero third-party on load |
| R11 | No content model → every change needs a developer | Maintainability | **High** | Content collections from day one |
| R12 | Site not maintained post-launch → visible decay | Process | **High** | Date-derived states; daily rebuild; realistic maintenance ask |
| R13 | Awards Gala date passed, outcome unknown | Content | **High** | Omit section entirely until Q6 |
| R14 | Sole custodian holds domain/repo access | Deployment | **High** | Two named holders, one at WUFPA |
| R15 | No domain registered | Deployment | **High** | Q5, Phase 0 |
| R16 | Membership terms unknown → primary goal weakened | Content / Business | **Medium** | Ship enquiry form without the fee section |
| R17 | Brand palette change may surprise the client | Design / Stakeholder | **Medium** | Present sampled evidence from `[LOGO-A]` before Phase 3 |
| R18 | Only 4 of 300+ members documented | Content | **Medium** | No directory; label the four as examples |
| R19 | Two of four portraits are card-size only (316×409, 370×434) | Media | **Medium** | Use small; request Q18 |
| R20 | Kibanda Initiative and Rwenzori have zero photography | Media | **Medium** | Typographic treatment; never borrow from another programme |
| R21 | No vector logo — SVG must be redrawn from JPEG | Design | **Medium** | Request original (Q13); redraw, do not auto-trace |
| R22 | 3 Google Font families, render-blocking third-party | Performance / Privacy | **Medium** | Self-host 2 subset variable fonts |
| R23 | Name spellings unconfirmed (Q1) | Content / Ethical | **Medium** | No name published until confirmed |
| R24 | No analytics → success metrics unmeasurable | Process | **Medium** | Cookieless analytics Phase 7 |
| R25 | Documentation error X17 (§ 2.1) | Process | **Low** | Correct to v1.0.1 |
| R26 | Untested below 360px | Responsive | **Low** | 320px in QA matrix |
| R27 | Heading levels skipped (h2→h4, ×2) | A11y / SEO | **Low** | Fixed by rebuild |
| R28 | Hard-coded `© 2025` | Maintainability | **Low** | Generate at build |

**5 Critical · 9 High · 10 Medium · 4 Low.**

---

# SECTION 11 — Implementation Backlog

Complexity: **S** ≤ ½ day · **M** ½–2 days · **L** 2–5 days · **XL** > 5 days.

## Priority 0 — Critical blockers

| ID | Task | Reason | Files | Depends on | Cx | Impact |
|---|---|---|---|---|---|---|
| P0-1 | Obtain the 8 blocking answers (Q1–Q8) | Every other P0 depends on them; they are the critical path | — | WUFPA | M | **Unblocks everything** |
| P0-2 | Delete `#movies` section entirely | 8 fabricated titles + stock art. WCAG 2.2.2 | `index.html` 334–347, 480–518 | — | S | Removes the largest fabrication |
| P0-3 | Delete 4 fabricated member companies + "+292" card | Invented entities | `index.html` 362–367 | — | S | Restores content integrity |
| P0-4 | Delete the BTS comedy panel | Fabricated; undermines funder trust | `index.html` 234–252 | — | S | Restores register |
| P0-5 | Replace 4 leadership portraits with real ones | Stock strangers under real names — R1 | `#executives`, `[P4]`/`[P5]` | P0-1 (Q4), P1-3 | M | **Highest single credibility gain** |
| P0-6 | Remove the personal mobile; publish association contact | DPPA 2019 — R3 | footer | P0-1 (Q3) | S | Legal exposure closed |
| P0-7 | Correct documentation defect X17 | Audit accuracy — § 2.1 | `docs/01`, `docs/README` | — | S | Documentation integrity |
| P0-8 | Correct Banyankitara + UPSKY locations; correct President's term | Contradicts source | `#members`, `#executives` | P0-1 (Q1) | S | Factual accuracy |
| P0-9 | Replace "Donate → `#`" with "Become a Member" | Dead primary CTA; wrong goal | nav, hero, footer | P0-1 (Q8) | S | Primary conversion exists |
| P0-10 | Label or remove "10,500+" | Derived figure as counted | `#about` | — | S | Statistical honesty |
| P0-11 | Remove "entry to WUFPA is free" | Unsourced | footer | P0-1 (Q8) | S | Removes unsourced claim |
| P0-12 | Scaffold the project: repo, Astro+TS, tokens, schemas, CI | Nothing can be built without it | new `src/`, configs | P0-1 (Q5) | **XL** | Enables all subsequent work |
| P0-13 | Privacy notice + consent checkbox | Legal requirement before any form | `/legal/privacy/` | P0-12 | M | Legal compliance |
| P0-14 | Redact the profile PDF before any download offer | R4 | `public/downloads/` | — | S | Protects ~60 people |

## Priority 1 — Core user experience

| ID | Task | Reason | Files | Depends on | Cx | Impact |
|---|---|---|---|---|---|---|
| P1-1 | Extract ~72 photographs from the PDF at native resolution | Unlocks all real imagery | `scripts/`, `src/assets/photos/` | P0-12 | M | **Highest media impact** |
| P1-2 | Write alt text + captions for every photograph | A11y + evidence value | asset metadata | P1-1 | **L** | Most underestimated task |
| P1-3 | Redraw logo as SVG (4 variants) + favicon set | Emoji logo is unshippable | `src/assets/brand/` | Q13 | M | Brand identity restored |
| P1-4 | Implement the real design token system | 10 colour literals → 3-layer system | `src/styles/tokens/` | P0-12 | M | Consistency foundation |
| P1-5 | Self-host 2 subset variable fonts | Removes render-blocking third party | `src/assets/fonts/` | P1-4 | M | Perf + privacy |
| P1-6 | Build global components (SkipLink, Header, Nav, MobileNav, Footer, Breadcrumb) | Every page needs them | `src/components/global/` | P1-4 | **L** | Site shell |
| P1-7 | Build primitives + layout (Button, Link, Icon, Tag, Section, PageHeader, Prose) | Everything composes from these | `src/components/` | P1-4 | **L** | Build velocity |
| P1-8 | Rebuild homepage to the 10-band spec | Rungs 4–5 absent today | `src/pages/index.astro` | P1-6, P1-7, P1-2 | **L** | Primary entry point |
| P1-9 | Membership + Join pages with the 11-field form | **Primary business goal** | `/membership/`, `/join/` | P0-1 (Q8), P0-13 | **L** | **Highest business impact** |
| P1-10 | About + History + Governance + **Legal status** | Rung-2 credibility for funders | `/about/*` | P1-6 | **L** | Funder conversion |
| P1-11 | Leadership index + 4 profiles + rosters | Named accountability | `/leadership/*` | P0-1 (Q1,Q4), P0-5 | **L** | Governance visible |
| P1-12 | 6 programme pages | The delivery record | `/programmes/*` | P1-2 | **XL** | Evidence base |
| P1-13 | Regions index + 6 pages + RegionMap | Coverage + local coordinator | `/regions/*` | P0-1 (Q1,Q4) | **L** | Rung 4 |
| P1-14 | Contact page + form + deferred map | No contact route exists | `/contact/` | P0-1 (Q3), P0-13 | M | Enquiries possible |
| P1-15 | Impact + 8 gallery albums + Lightbox | The photographic evidence | `/impact/*` | P1-2 | **L** | Rung 1 + 3 |
| P1-16 | Partners page (photography-led) | Borrowed credibility | `/partners/` | P1-2 | M | Funder trust |
| P1-17 | Accessibility foundations: focus, ARIA, reduced-motion, no-JS | R9 | all components | P1-7 | **L** | Legal + ethical |

## Priority 2 — Content

| ID | Task | Reason | Depends on | Cx |
|---|---|---|---|---|
| P2-1 | News index + article template + 5 launch articles | Proof of life | P1-6 | **L** |
| P2-2 | Events with **date-derived status** | Prevents the Awards Gala failure recurring | P1-6 | M |
| P2-3 | Guilds index + 10 pages | Craft belonging | P0-1 (Q1) | M |
| P2-4 | WUFM SACCO page | Distinctive asset | Q15 | M |
| P2-5 | Support WUFPA page | Converts funder interest | Q22 | M |
| P2-6 | Terms + accessibility statement | Completeness | — | S |
| P2-7 | 404 page | Recovery | P1-6 | S |
| P2-8 | Apply house style site-wide | Consistency | all content | M |

## Priority 3 — Enhancements

| ID | Task | Depends on | Cx |
|---|---|---|---|
| P3-1 | Pagefind search, interaction-loaded | P2-1 | M |
| P3-2 | Structured data (all types) | P1-8..P1-16 | M |
| P3-3 | Open Graph + social cards, WhatsApp-verified | P1-3 | S |
| P3-4 | RSS feed | P2-1 | S |
| P3-5 | Share row, WhatsApp first | P2-1 | S |
| P3-6 | Print stylesheet | P1-7 | S |
| P3-7 | Cookieless analytics | P0-12 | S |
| P3-8 | Git-based CMS for news/events/albums | P2-1, P2-2 | **L** |

## Priority 4 — Future

Per [`docs/19`](docs/19_FUTURE_ROADMAP.md), each gated by a stated trigger: member directory ·
resources library · opportunities board · press kit · video · film database · member portal ·
training portal · local-language content · impact measurement.

---

# SECTION 12 — Implementation Phases

Effort in working days for one full-stack designer-developer. Aligned to
[`docs/15`](docs/15_IMPLEMENTATION_ROADMAP.md), adjusted for audit findings.

| Phase | Name | Effort | Contents | Exit criteria |
|---|---|---|---|---|
| **0** | Unblocking | 2 d + client | P0-1, P0-7, P0-14; brand decisions; domain; two access holders | Q1–Q8 answered in writing; docs at v1.0.1 |
| **1** | Critical fixes & foundation | 6 d | P0-2..P0-4, P0-8..P0-12 (delete fabrications first, then scaffold) | Zero fabricated content remains; CI green; empty site deployed |
| **2** | Homepage | 5 d | P1-4..P1-8 | Homepage signed off; Lighthouse ≥90 mobile; axe clean; real Android tested |
| **3** | Content integration | 9 d | P1-10..P1-14, P1-16, P2-8 | All core pages live; every claim sourced; rosters render without phone columns |
| **4** | Media integration | 5 d | P1-1, P1-2, P1-3, P1-15, P0-5 | Every asset named, captioned, alt-texted, consent-recorded; **zero stock images** |
| **5** | Brand refinement | 3 d | Palette, typography, motion, photography treatment applied site-wide | Zero deviation from `docs/03`; no `#d4af37`, no `#e50914` |
| **6** | Performance | 3 d | P3-7 + budgets, critical CSS, image pipeline, font strategy | ≤1.2MB, ≤100KB JS, **0 third-party requests**, LCP ≤2.5s Slow 4G |
| **7** | Accessibility | 4 d | P1-17 completion + remediation | WCAG 2.2 AA manually verified; NVDA + VoiceOver + **TalkBack** passes |
| **8** | SEO | 3 d | P3-2..P3-4, sitemap, robots, canonicals | All structured data validates; WhatsApp preview correct |
| **9** | Testing | 4 d | Full [`docs/17`](docs/17_QA_CHECKLIST.md); content audit vs approved facts; personal-data scan | Every 🔴 item passes; sign-off complete |
| **10** | Deployment | 2 d | DNS, monitoring, handover, training | Live; two access holders; WUFPA trained; docs at v1.1 |

**Total: ~46 working days.** Realistic calendar: **11–15 weeks**, dominated by Phase 0 and
content turnaround — not engineering.

**Sequencing note:** deletions (P0-2..P0-4) precede scaffolding deliberately. If the project
stalls at any point after Phase 1, what remains is a smaller but *honest* artefact rather than
a larger fabricated one.

---

# SECTION 13 — Definition of Done

Release 1.0 is complete when **every** statement below is verified true.

## 13.1 Non-negotiable gates

- [ ] **Zero fabricated content.** Every factual claim traces to [`docs/02 § 13`](docs/02_ORGANISATION_PROFILE.md#13-facts-approved-for-publication) — verified line by line against the live site
- [ ] **Zero stock photographs of people**
- [ ] **Zero personal telephone numbers or personal emails** — verified by regex scan of built output
- [ ] **Every published name confirmed by WUFPA in writing** (Q1) with recorded consent (Q4)
- [ ] **No event with a past date described in the future tense** — enforced structurally
- [ ] **Privacy notice published**; consent checkbox on every form

## 13.2 Represents WUFPA professionally

- [ ] Official logo (SVG, 4 variants) used throughout; no emoji as UI
- [ ] Sampled palette only: `#ED1B24`, `#231F20`, specified ramps. No gold, no `#e50914`
- [ ] Legal status, governance and partners reachable within one click of the homepage
- [ ] Members addressed as colleagues, never beneficiaries

## 13.3 Reflects the documentation accurately

- [ ] All ~65 specified routes live and reachable
- [ ] House style applied site-wide
- [ ] Every remaining `⚠ GAP` documented, not filled
- [ ] Documentation updated to v1.1 recording every Phase 0 answer

## 13.4 Handcrafted, not generated

- [ ] Every photograph is a real WUFPA member at a real WUFPA activity, captioned with what is known
- [ ] Where a date is unknown, the site says "Date not recorded"
- [ ] Copy is specific: dates, place names, named partners — not adjectives
- [ ] No section exists that could not be filled with truth

## 13.5 Premium

- [ ] Restraint: one accent colour, two typefaces, one icon set, one spacing scale
- [ ] No value outside the token system
- [ ] Photography presented without grading, duotone or grain overlay
- [ ] Motion ≤400ms, ≤16px, reduced-motion honoured; **zero infinite animations**

## 13.6 Fast

- [ ] Lighthouse Performance ≥90 mobile, Slow 4G, on homepage + 3 interior pages
- [ ] LCP ≤2.5s · CLS ≤0.1 · INP ≤200ms
- [ ] Homepage ≤1.2MB · JS ≤100KB compressed · CSS ≤30KB
- [ ] **Zero third-party requests on initial load**
- [ ] Verified on a **real mid-range Android device** on a throttled connection

## 13.7 Responsive

- [ ] No horizontal scroll 320px → 1536px, except designated table containers
- [ ] Usable at 200% and 400% zoom
- [ ] **Nothing hidden on mobile** — reorder or collapse, never remove
- [ ] Long Ugandan place and person names do not break layout

## 13.8 Accessible

- [ ] WCAG 2.2 AA, **manually verified** — axe zero critical/serious is necessary, not sufficient
- [ ] Full keyboard traverse; visible focus everywhere
- [ ] NVDA, VoiceOver and **TalkBack** passes
- [ ] All targets ≥44×44px
- [ ] **All content readable and all forms functional with JavaScript disabled**
- [ ] Accessibility statement published and honest

## 13.9 SEO ready

- [ ] Unique title + description per page; one `<h1>`; no skipped levels
- [ ] Structured data validates and matches visible content
- [ ] Sitemap + robots + canonicals correct
- [ ] **Open Graph verified in a real WhatsApp preview** — WUFPA's actual sharing channel

## 13.10 Maintainable & scalable

- [ ] All content in version-controlled markdown with typed, validated schemas
- [ ] **A required `source` field on every fact-bearing entity**
- [ ] Adding a member, region or article is one file
- [ ] Removing a person who withdraws consent is one deletion
- [ ] Daily scheduled rebuild keeps date-derived states correct
- [ ] WUFPA can publish a news item and add an event unaided
- [ ] Two people hold every credential, one at WUFPA

## 13.11 Production ready

- [ ] HTTPS + HSTS + CSP + security headers
- [ ] Forms delivering, verified by test submission
- [ ] Analytics and uptime monitoring live
- [ ] Rollback tested
- [ ] Every 🔴 item in [`docs/17`](docs/17_QA_CHECKLIST.md) signed off with a name and date

## 13.12 The four tests

From [`docs/20`](docs/20_WUFPA_QUALITY_MANIFESTO.md). All four must pass:

- [ ] **Truth Test** — every claim has a source that can be pointed to
- [ ] **Member Test** — a filmmaker in Kanungu recognises this as their association
- [ ] **Funder Test** — a programme officer with 90 seconds concludes WUFPA is real, governed and active
- [ ] **Two-Year Test** — untouched for 24 months, the site is still true

---

# Self-review

Applied to this audit before delivery.

**Claims corrected during review.** One finding in my own prior documentation (X17, contrast
of `--muted`) was asserted from visual inspection and is **wrong** — computed values show
5.75:1, a pass. It is corrected in § 2.1 with the two genuine failures substituted, and
logged as backlog item P0-7. I have not left the original claim standing anywhere in this
audit.

**Subjective opinions removed.** Earlier drafts described the dark aesthetic as "dated" and
the Cinzel choice as "inappropriate". Both were replaced with falsifiable statements: the
palette contradicts the sampled logo values, and Cinzel is a Roman inscriptional face whose
register is documented in `docs/03`. Where I retain a judgement — that the comedy section
undermines funder trust — it is tied to the stated audience model in `docs/01 § 5`, not to
taste.

**Evidence base.** Every quantitative claim is measured, not estimated: file metrics, 23
external URLs across 4 hosts, 10 tokens, 20 non-token hex values, 19 Unsplash URLs, 0 local
asset references, 0 ARIA/role/focus/reduced-motion, 21 pre-JS-hidden elements, heading
sequence with 2 confirmed skips, and 11 computed contrast pairs. Ratings in § 1.2 follow from
those counts.

**Where I have pushed back on the brief, and why.** The brief states the project has an
existing implementation and instructs me not to rebuild. I have honoured the intent —
§ 0.1 and § 9.1 identify precisely what carries forward and why — but I have not adopted the
premise that a substantial application exists, because the file system does not support it.
Reporting otherwise would make the backlog and phase estimates wrong by roughly an order of
magnitude, which would be a disservice. This remains WUFPA's and your call: § 9.1 gives the
salvage map so the decision can be made on evidence.

**Known limits of this audit.** It is a static analysis. No browser was run, no Lighthouse
executed, no screen reader used, no real device tested. Performance figures in § 1.2 and § 9
are derived from request counts and asset characteristics, not measured. Contrast is computed
from source values, which is exact for the pairs listed but does not cover text over
photography, which requires rendering. **A live-browser verification pass should precede
Phase 1** and may add findings, though it is unlikely to remove any listed here.

---

*Implementation Audit v1.0 · 26 July 2026 · Audited against docs/ v1.0*
*Supersedes no prior audit. Corrects docs/01 finding X17 — see § 2.1.*
