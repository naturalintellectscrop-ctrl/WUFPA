# 16 — SEO and Accessibility

*Being findable, and being usable by everyone. Treated together because they are largely the
same work.*

---

## 1. Why these share a document

Almost everything that makes this site findable also makes it accessible: real headings,
descriptive link text, meaningful alt text, semantic structure, fast loading, and content that
exists in the HTML rather than being assembled by JavaScript.

The prototype fails both simultaneously and for the same reasons: no metadata, no structured
data, a single URL for the whole site, generic alt text, and content hidden until JavaScript
runs (X20, X26, X30, X37).

---

# PART ONE — SEO

## 2. What WUFPA is competing for

WUFPA is not competing with global sites. It is competing for a small number of specific,
low-volume, high-intent searches — and it currently ranks for none of them because it has no
site.

**The realistic target is to be the unambiguous first result for anything containing "WUFPA"
or "Western Uganda film", and to appear for regional film-industry queries.** That is
achievable within months, because the competition is thin and WUFPA has genuine authority on
the subject.

### 2.1 Primary keywords

| Keyword | Intent | Target page |
|---|---|---|
| WUFPA | Navigational | `/` |
| Western Uganda Film Producers Association | Navigational | `/` |
| film producers association Uganda | Informational | `/` |
| film association Mbarara | Local | `/` |
| join film association Uganda | **Transactional — highest value** | `/membership/` |
| film training Uganda | Transactional | `/programmes/training/` |
| film workshops Western Uganda | Transactional | `/programmes/training/` |
| film industry Western Uganda | Informational | `/about/` |
| Uganda film copyright piracy | Informational | `/programmes/advocacy/` |
| UCC regional film competition | Informational | `/programmes/competitions/` |
| filmmakers SACCO Uganda | Informational | `/sacco/` |
| Kibanda cinema Uganda | Informational | `/programmes/kibanda/` |

### 2.2 Regional and craft long-tail

The sub-region and guild pages are the site's long-tail engine, and they exist because WUFPA
is genuinely organised that way ([05 § 1](05_INFORMATION_ARCHITECTURE.md#1-the-organising-principle))
— not because someone wanted landing pages.

- `film producers Mbarara` · `Kabale` · `Fort Portal` · `Kasese` · `Hoima` · `Masindi` · `Bushenyi`
- `filmmakers Ankole` · `Kigezi` · `Rwenzori` · `Tooro` · `Bunyoro`
- `cinematographers Uganda` · `film editors Uganda` · `screenwriters Uganda` ·
  `actors guild Uganda` · `sound recordists Uganda`

### 2.3 Institutional queries

Terms a programme officer would use: `film sector Uganda regional` · `creative industries
Western Uganda` · `Ugandan film association partners` · `film NGO Uganda registered`.
These are served by `/about/legal/`, `/leadership/`, `/partners/` and `/programmes/`.

### 2.4 What not to do

- **No keyword stuffing.** "Film producers association Western Uganda film producers" reads as
  spam to a human and adds nothing for a search engine.
- **No pages built solely to rank.** Every page in the sitemap has a job for a real visitor
  ([06 § 4](06_WEBSITE_STRATEGY.md#4-why-each-page-exists)).
- **No thin location pages.** Six region pages are justified by six real coordination teams.
  Twenty-five district pages would not be.
- **No invented content for SEO.** This should not need saying, and it is exactly the pressure
  that produced eight fictional film titles in the prototype.

---

## 3. On-page fundamentals

| Element | Rule |
|---|---|
| `<title>` | Unique, ≤ 60 characters, primary term first, ` — WUFPA` suffix. All specified in [04 § 2](04_CONTENT_BIBLE.md#2-seo-metadata--all-pages) |
| Meta description | Unique, 140–155 characters, written for a human deciding whether to click |
| `<h1>` | Exactly one per page, containing the page's primary term naturally |
| Heading hierarchy | No skipped levels. Headings describe content, never style |
| URLs | Lowercase, hyphenated, shallow, stable ([05 § 2.1](05_INFORMATION_ARCHITECTURE.md#21-url-rules)) |
| Internal links | Descriptive anchor text. Never "click here" or a bare URL |
| Images | Meaningful `alt`, descriptive filenames, `srcset`, explicit dimensions |
| Canonical | Absolute canonical on every page |
| `lang` | `<html lang="en-UG">` |

**The single biggest SEO improvement over the prototype is structural:** the prototype is one
URL with anchor-linked sections (X37), so nothing is separately indexable, linkable or
shareable. Twenty-plus real pages, each answering a distinct query, is the change that matters
more than any tag.

---

## 4. Structured data

JSON-LD, generated from content frontmatter rather than hand-written.

### 4.1 Site-wide

`Organization` (or `NGO`) on every page:

```
@type            NGO
name             Western Uganda Film Producers Association Limited
alternateName    WUFPA
url              {domain}
logo             {domain}/brand/wufpa-logo.svg
foundingDate     2017-09-04                          [P1]
description      …                                   [P1]
address          PostalAddress — Mbaguta Street, Mbarara Shopping Market,
                 Mbarara City, UG                    [P1]
areaServed       Ankole, Kigezi, Rwenzori, Tooro, Bunyoro, Greater Bushenyi   [P1]
email            ⟦Q3⟧
telephone        ⟦Q3⟧
sameAs           ⟦Q9 — social URLs⟧
memberOf / member  ⟦partner relationships, where permission exists⟧
```

`WebSite` with `SearchAction` pointing at `/search/`.

### 4.2 Per page type

| Page type | Schema | Key properties |
|---|---|---|
| News article | `Article` / `NewsArticle` | headline, datePublished, image, author, publisher |
| Event | `Event` | name, startDate, location, organizer, eventStatus, eventAttendanceMode |
| Leadership profile | `Person` | name, jobTitle, worksFor, image, affiliation |
| Programme | `Service` or `Article` | name, provider, areaServed |
| Region | `Place` + `Organization` sub-unit | name, containedInPlace |
| Gallery photograph | `ImageObject` | contentUrl, caption, creator |
| Any page below root | `BreadcrumbList` | |
| Membership / Contact FAQs | `FAQPage` | Only where genuine Q&A content exists |

### 4.3 Rules

- **Structured data must match visible content.** Marking up an event that is not on the page,
  or a rating that does not exist, is a manual-action risk and a lie.
- `eventStatus` reflects reality: `EventScheduled`, `EventPostponed`, `EventCancelled` — driven
  by the same date logic as the visible page
  ([09 § 9.2](09_PROGRAMMES_AND_EVENTS.md#92-status-handling--the-part-that-matters)).
- **No `Review`, `AggregateRating` or `Offer` markup.** WUFPA has no reviews and no products.
- Validate every type in the Rich Results Test before launch.

---

## 5. Local and international considerations

| Item | Approach |
|---|---|
| Google Business Profile | Strongly recommended for WUFPA — a physical office in Mbarara City. Free, and it is how local searchers find organisations. Needs Q14 (precise location) and Q3 (contact) |
| NAP consistency | Name, address and phone identical on the site, the Business Profile, Facebook and the profile PDF. Inconsistency actively harms local ranking |
| `PostalAddress` markup | On `/contact/` and in the footer |
| `hreflang` | Not needed for a single-language site. Locale routing is configured so it can be added without restructuring (constraint C7) |
| Search Console + Bing Webmaster | Both verified at launch; sitemap submitted (Phase 9) |

---

## 6. Content and search behaviour

- **Depth beats frequency.** WUFPA cannot publish weekly (constraint C4), but it can publish
  substantial, accurate pages that stay true for years. That is a better fit for these queries
  than a blog cadence.
- **The programme and region pages are the ranking assets.** They are specific, they answer
  real questions, and nobody else has the material.
- **Publish the evidence, not summaries of it.** A page listing the actual training partners,
  actual competition ceremonies and actual march is more useful — and more rankable — than a
  page describing WUFPA as active.
- **Answer the questions people actually type:** "how do I join a film association in Uganda",
  "who funds film training in Uganda", "is film piracy illegal in Uganda". These map directly
  to existing pages and should shape the copy inside them.

---

# PART TWO — ACCESSIBILITY

## 7. Standard and commitment

**Target: WCAG 2.2 Level AA, verified manually.**

This is a requirement (FR-90), not an aspiration. Three reasons specific to this project:

1. **The audience.** Many members are on small screens in bright daylight over poor
   connections. Accessibility work — contrast, target size, keyboard operability, working
   without JavaScript — is the same work as making the site usable in those conditions.
2. **The funders.** WUFPA seeks support from UNESCO's national commission, diplomatic missions
   and development partners. Accessibility is a stated requirement for many of them.
3. **It is the right thing.** An organisation whose mission includes inclusion of
   underrepresented groups `[P3]` cannot publish a site that excludes disabled people.

---

## 8. Conformance by principle

### 8.1 Perceivable

| Criterion | Implementation |
|---|---|
| **1.1.1 Non-text Content** | Every image has considered `alt`. Decorative images `alt=""` deliberately. Icons `aria-hidden` unless meaningful. Alt writing rules: [12 § 6](12_MEDIA_LIBRARY.md#6-alt-text) |
| **1.2.x Time-based Media** | No media at launch (Q12). When video arrives: captions, transcript, audio description where needed. **Do not publish video without captions** |
| **1.3.1 Info and Relationships** | Semantic HTML throughout. Real tables with `<th scope>`. Labels associated. Role and name programmatically linked on PersonCard (X29) |
| **1.3.2 Meaningful Sequence** | DOM order matches visual order. No CSS reordering that breaks reading order |
| **1.3.3 Sensory Characteristics** | No instruction depends on shape, colour or position alone |
| **1.3.4 Orientation** | Works in portrait and landscape. No lock |
| **1.3.5 Identify Input Purpose** | `autocomplete` on every applicable field |
| **1.4.1 Use of Colour** | Never colour alone: current nav item has a rule; errors have icon and text; links are underlined in body copy |
| **1.4.3 Contrast (Minimum)** | 4.5:1 body, 3:1 large. **Brand red `#ED1B24` is 4.39:1 on white — `red-700` `#B31419` is used for any red text below 24px** ([03 § 5.2](03_BRAND_GUIDELINES.md#52-the-working-palette)) |
| **1.4.4 Resize Text** | 200% zoom without loss of content or function |
| **1.4.5 Images of Text** | None, except the logo. The roster scans are transcribed to real tables, never published as images |
| **1.4.10 Reflow** | No horizontal scroll at 320px, except designated table containers |
| **1.4.11 Non-text Contrast** | UI components, borders conveying state and focus rings all ≥3:1 |
| **1.4.12 Text Spacing** | Layout survives user-applied spacing overrides |
| **1.4.13 Content on Hover or Focus** | Nav panels are dismissable, hoverable and persistent |

### 8.2 Operable

| Criterion | Implementation |
|---|---|
| **2.1.1 Keyboard** | Everything operable by keyboard. No `onmouseover`-only behaviour (X28); no `<div onclick>` (X25) |
| **2.1.2 No Keyboard Trap** | Modal and mobile menu trap deliberately, release on `Escape`, return focus |
| **2.1.4 Character Key Shortcuts** | None |
| **2.2.1 Timing Adjustable** | No time limits |
| **2.2.2 Pause, Stop, Hide** | **No autoplaying carousel** (X18). No looping ambient animation (the prototype's `grain` and `pulse`) |
| **2.3.1 Three Flashes** | Nothing flashes |
| **2.3.3 Animation from Interactions** | `prefers-reduced-motion` honoured globally (X19) |
| **2.4.1 Bypass Blocks** | Skip link (X24); landmarks |
| **2.4.2 Page Titled** | Unique, descriptive title per page |
| **2.4.3 Focus Order** | DOM order; no positive `tabindex`; collapsed disclosures use `hidden`, not `max-height: 0` (X27) |
| **2.4.4 Link Purpose** | Descriptive link text everywhere |
| **2.4.5 Multiple Ways** | Navigation, footer, breadcrumbs, search, sitemap |
| **2.4.6 Headings and Labels** | Descriptive, hierarchical |
| **2.4.7 Focus Visible** | 3px `#ED1B24` ring with 2px offset (X23) |
| **2.4.11 Focus Not Obscured** | Sticky header offset so focused elements are never hidden beneath it |
| **2.5.1 Pointer Gestures** | Lightbox swipe has button equivalents |
| **2.5.2 Pointer Cancellation** | Activation on `pointerup` |
| **2.5.3 Label in Name** | Visible label text is contained in the accessible name |
| **2.5.4 Motion Actuation** | No motion-triggered functionality |
| **2.5.8 Target Size (Minimum)** | ≥24×24 required; **≥44×44 adopted**, with ≥8px separation |

### 8.3 Understandable

| Criterion | Implementation |
|---|---|
| **3.1.1 Language of Page** | `lang="en-UG"` |
| **3.1.2 Language of Parts** | `lang` on any non-English text — e.g. *Obukama bwa Tooro*, *kibanda* |
| **3.2.1 On Focus** | No context change on focus |
| **3.2.2 On Input** | No auto-submit, no surprise navigation |
| **3.2.3 / 3.2.4 Consistent Navigation and Identification** | Same nav, same order, same component names throughout |
| **3.2.6 Consistent Help** | Contact route in the same footer position on every page |
| **3.3.1 Error Identification** | Errors in text, with an icon, associated with their field |
| **3.3.2 Labels or Instructions** | Persistent visible labels. Never placeholder-as-label |
| **3.3.3 Error Suggestion** | Errors say how to fix, not just what failed |
| **3.3.4 Error Prevention** | Review before submit on the membership form |
| **3.3.7 Redundant Entry** | Nothing asked twice |
| **3.3.8 Accessible Authentication** | **No CAPTCHA** (FR-58). No cognitive-function test |

### 8.4 Robust

| Criterion | Implementation |
|---|---|
| **4.1.2 Name, Role, Value** | Every custom control has correct role, name and state. `aria-expanded` on all disclosures and menu triggers (X21, X22) |
| **4.1.3 Status Messages** | Form results, search counts and lightbox position announced via live regions without moving focus unexpectedly |

---

## 9. Beyond AA — adopted anyway

Not required, adopted because they cost little and matter for this audience.

| Item | Standard | Why |
|---|---|---|
| 44×44px targets | AAA (2.5.5) | Phone use, often one-handed, often outdoors |
| Body text ≥17px | — | Long-form content, bright conditions, older readers |
| Prose measure 68ch | — | Readability |
| Content works without JavaScript | — | Poor connections, aggressive data savers |
| Contrast well above minimum for body text | AAA-adjacent | `#3A3436` on white is 11.4:1 |
| Plain language | AAA (3.1.5) | English is a second or third language for much of the audience |

---

## 10. Testing

| Type | Tool / method | When |
|---|---|---|
| Automated | axe-core in CI, every PR | Continuous |
| Automated | Lighthouse accessibility, every PR | Continuous |
| Manual | Keyboard-only traverse | Every component, every page |
| Manual | NVDA + Firefox (Windows) | Phase 8 |
| Manual | VoiceOver + Safari (macOS/iOS) | Phase 8 |
| Manual | **TalkBack + Chrome (Android)** | Phase 8 — the audience's actual platform |
| Manual | 200% and 400% zoom | Phase 8 |
| Manual | Windows High Contrast / forced-colors | Phase 8 |
| Manual | `prefers-reduced-motion` enabled | Phase 8 |
| Manual | JavaScript disabled | Phase 8 |
| Manual | Colour contrast, measured per pair | Phase 3 and Phase 8 |

> **Automated tools catch roughly a third of accessibility issues.** They will not tell you
> that alt text is unhelpful, that focus order is confusing, or that a disclosure's label makes
> no sense out of context. The manual passes are where conformance is actually established.

---

## 11. Accessibility statement

Published at `/legal/accessibility/`, linked from every page footer. Contents:

1. WUFPA's commitment
2. Conformance status: "WCAG 2.2 Level AA, fully conformant" — or "partially conformant" with
   each exception named. **State this honestly.** A false claim is worse than a candid one
3. Known limitations, with plain explanations and timelines
4. How to report an accessibility problem ⟦Q3⟧, and the response commitment
5. Assessment method and date
6. Date of last review

**Review annually**, and after any significant change.

---

## 12. Combined pre-launch checklist

Full QA: [17_QA_CHECKLIST.md](17_QA_CHECKLIST.md).

**SEO**

- [ ] Unique title and description on every page
- [ ] One `<h1>` per page; no skipped heading levels
- [ ] All structured data validates
- [ ] `sitemap.xml` generated and submitted; `robots.txt` correct
- [ ] Canonical on every page
- [ ] Open Graph verified in Facebook's debugger **and a real WhatsApp preview**
- [ ] No broken internal links
- [ ] `lang="en-UG"`
- [ ] Search Console and Bing Webmaster verified
- [ ] Google Business Profile created (pending Q14)

**Accessibility**

- [ ] axe-core: zero critical or serious violations across all routes
- [ ] Full keyboard traverse of every page
- [ ] Screen-reader pass on NVDA, VoiceOver and TalkBack
- [ ] Every image has considered alt text
- [ ] All contrast pairs measured and passing
- [ ] All targets ≥44×44px
- [ ] `prefers-reduced-motion` verified
- [ ] 200% zoom, and 320px width, verified
- [ ] Forms fully accessible: labels, errors, focus management
- [ ] Content available with JavaScript disabled
- [ ] Accessibility statement published and accurate

---

*Document 16 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
