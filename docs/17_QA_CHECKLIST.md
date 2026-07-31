# 17 — QA Checklist

*The gate between "built" and "live". Run in full before launch, and in relevant part before
every significant change.*

---

## How to use this

- **Every item is pass or fail.** "Mostly" is a fail.
- **Items marked 🔴 are launch blockers.** The site does not go live with one outstanding.
- **Sign off with a name and a date.** An unsigned checklist has not been run.
- Automated checks are marked ⚙ and run in CI ([14 § 13](14_TECHNICAL_ARCHITECTURE.md#13-testing-and-ci)).

---

## 1. Content integrity 🔴

**This section exists because of what happened in the prototype. Run it first, and run it
against the live build, not the design.**

- [ ] 🔴 **Every factual claim about WUFPA on the site appears in [02 § 13](02_ORGANISATION_PROFILE.md#13-facts-approved-for-publication)** — checked page by page, line by line
- [ ] 🔴 **Zero invented film titles.** No film content of any kind exists on the site (X2)
- [ ] 🔴 **Zero invented member companies.** Only the four documented companies appear (X3)
- [ ] 🔴 **Zero stock photographs of people** anywhere on the site (X1, X12)
- [ ] 🔴 **Zero invented statistics.** The "10,500 creatives" figure does not appear as a count (X13)
- [ ] 🔴 **Zero invented quotations.** No attributed quote appears unless WUFPA supplied it
- [ ] 🔴 Every person's name matches WUFPA's written confirmation (Q1)
- [ ] 🔴 Every published name and photograph has recorded consent (Q4)
- [ ] Every statistic carries its as-of date
- [ ] Every undated photograph says "Date not recorded" rather than showing a guessed date
- [ ] No event with a past date is described in the future tense ⚙
- [ ] No partner is named at an event they are not documented at
- [ ] House style applied throughout ([02 § 12.3](02_ORGANISATION_PROFILE.md#123-house-style-decisions))
- [ ] No `⟦TOKEN⟧` placeholder remains in any published page ⚙
- [ ] No "coming soon", "lorem ipsum", or placeholder copy ⚙
- [ ] Sub-region names match the house style in all six instances
- [ ] Acronyms expanded on first use on each page

---

## 2. Privacy and data protection 🔴

- [ ] 🔴 **No personal telephone number appears anywhere in the built output** ⚙ (regex scan for Ugandan mobile patterns)
- [ ] 🔴 **No personal email address of any individual appears**
- [ ] 🔴 The two roster scan images (`[P6]` xref 44, `[P7]` xref 64) are not in the repository or the build
- [ ] 🔴 If the profile PDF is offered as a download, it is the **redacted** version ([12 § 7](12_MEDIA_LIBRARY.md#7-personal-data-in-the-media))
- [ ] 🔴 Privacy notice published, accurate, and linked from every page
- [ ] Consent checkbox on both forms, unticked by default, with the specified wording
- [ ] Form submissions are emailed, not stored (FR-60)
- [ ] No third-party tracking scripts ⚙
- [ ] Analytics is cookieless, or a compliant consent banner is present
- [ ] A route for data deletion requests is published
- [ ] Photographs without `consent: granted` do not render ⚙

---

## 3. Design review

- [ ] Only tokens from [07_DESIGN_SYSTEM.md](07_DESIGN_SYSTEM.md) are used — no one-off values
- [ ] Colours are exactly `#ED1B24` and `#231F20` and the specified ramps. No gold, no `#e50914` (X9)
- [ ] The real logo is used; no emoji substitution (X10)
- [ ] Logo clear space and minimum sizes respected on every instance
- [ ] Reverse logo used on every dark surface
- [ ] Type scale consistent; no arbitrary font sizes
- [ ] Body text ≥17px
- [ ] Prose measure ≤68ch
- [ ] Vertical rhythm consistent across pages
- [ ] Photography is presented per [03 § 7.2](03_BRAND_GUIDELINES.md#72-what-the-real-photography-is-like-and-how-to-use-it) — no duotone, grading or grain overlay
- [ ] No photograph is displayed above its intrinsic resolution ⚙
- [ ] Group photographs are not cropped square
- [ ] Faces survive every responsive crop (`object-position` checked per image)
- [ ] One primary CTA per page
- [ ] "Become a Member" label is consistent everywhere
- [ ] No dashboard aesthetics, no decorative gradients, no glassmorphism
- [ ] SACCO blue appears only in SACCO contexts

---

## 4. Accessibility 🔴

Standard and criteria: [16 Part Two](16_SEO_ACCESSIBILITY.md#part-two--accessibility).

### 4.1 Automated

- [ ] 🔴 axe-core: zero critical or serious violations, every route ⚙
- [ ] 🔴 Lighthouse Accessibility = 100 on all page types ⚙
- [ ] HTML validates ⚙

### 4.2 Keyboard

- [ ] 🔴 Every interactive element reachable and operable by keyboard
- [ ] 🔴 Visible focus indicator on every focusable element (3px, ≥3:1)
- [ ] Focus order matches visual order; no positive `tabindex`
- [ ] Skip link is first, visible on focus, and moves focus to `<main>`
- [ ] Mobile menu traps focus, closes on `Escape`, returns focus to trigger
- [ ] Lightbox traps focus, closes on `Escape`, returns focus to thumbnail
- [ ] Nav panels open on click/Enter/Space and close on `Escape`
- [ ] Disclosures toggle with `Enter` and `Space`
- [ ] Collapsed disclosure content is not focusable ⚙
- [ ] Table containers are keyboard-scrollable
- [ ] No keyboard trap anywhere

### 4.3 Screen reader

- [ ] 🔴 NVDA + Firefox: every page type navigated end to end
- [ ] 🔴 VoiceOver + Safari (iOS): every page type
- [ ] 🔴 **TalkBack + Chrome (Android): every page type** — the audience's actual platform
- [ ] Headings form a sensible outline in isolation
- [ ] Landmarks present and labelled
- [ ] Link text makes sense out of context
- [ ] Form errors are announced and associated
- [ ] Status messages announced without stealing focus
- [ ] Alt text is genuinely useful when heard, not just present
- [ ] Names and roles read together on PersonCard, not as fragments

### 4.4 Visual

- [ ] 🔴 Every text/background pair measured: ≥4.5:1 normal, ≥3:1 large
- [ ] 🔴 Any red text below 24px uses `#B31419`, not `#ED1B24`
- [ ] UI components and state borders ≥3:1
- [ ] Text over photography meets contrast **at the text's actual position**, measured
- [ ] 200% zoom: no loss of content or function
- [ ] 400% zoom / 320px width: reflows, no horizontal scroll
- [ ] Forced-colors / High Contrast mode: usable
- [ ] Nothing relies on colour alone
- [ ] Text spacing overrides do not break layout

### 4.5 Motion and input

- [ ] 🔴 `prefers-reduced-motion: reduce` honoured on every animation
- [ ] No autoplaying carousel or looping ambient animation
- [ ] All targets ≥44×44px with ≥8px separation
- [ ] Swipe gestures have button equivalents
- [ ] Nothing depends on hover for discovery

---

## 5. Performance 🔴

Budgets: [14 § 9](14_TECHNICAL_ARCHITECTURE.md#9-performance-budget).

- [ ] 🔴 Lighthouse Performance ≥ 90, mobile, Slow 4G — homepage and three interior pages ⚙
- [ ] 🔴 LCP ≤ 2.5s on Slow 4G
- [ ] 🔴 CLS ≤ 0.1
- [ ] 🔴 INP ≤ 200ms
- [ ] 🔴 Homepage initial weight ≤ 1.2 MB ⚙
- [ ] 🔴 JavaScript ≤ 100 KB compressed (homepage) ⚙
- [ ] CSS ≤ 30 KB compressed ⚙
- [ ] Fonts: 2 files, ≤ 90 KB total, self-hosted, subset
- [ ] 🔴 **Zero third-party requests on initial page load** ⚙
- [ ] Correct image format served per browser (AVIF/WebP/JPEG)
- [ ] All images have explicit dimensions; no layout shift
- [ ] `fetchpriority="high"` on the LCP image only
- [ ] Below-fold images lazy-loaded
- [ ] Search index loads only on interaction
- [ ] Map loads only on user action
- [ ] No unthrottled scroll handlers ⚙
- [ ] Cache headers correct on hashed assets
- [ ] 🔴 **Tested on a real mid-range Android device on a throttled connection**

---

## 6. Responsive

Test at 320, 360, 390, 480, 768, 1024, 1280, 1440, 1920px, plus 200% zoom.

- [ ] 🔴 No horizontal scroll at any width except designated table containers
- [ ] Navigation correct at every breakpoint
- [ ] Mobile menu works and is complete
- [ ] All content present at every width — **nothing hidden on mobile**
- [ ] Tables scroll horizontally with a visible affordance
- [ ] Images crop sensibly; faces preserved
- [ ] Forms usable one-handed on a phone
- [ ] Footer readable and complete at every width
- [ ] Long Ugandan place and person names do not overflow or break layout
- [ ] Portrait and landscape both work
- [ ] Touch targets adequate on the smallest supported device

---

## 7. Cross-browser

Matrix: [14 § 11.5](14_TECHNICAL_ARCHITECTURE.md#115-browser-support).

- [ ] Chrome (desktop, last 2)
- [ ] Edge (last 2)
- [ ] Firefox (last 2)
- [ ] Safari macOS (last 2)
- [ ] Safari iOS (last 2)
- [ ] 🔴 **Chrome for Android (last 4)**
- [ ] 🔴 **Samsung Internet (last 2)**
- [ ] Opera Mini — content readable, no blank page
- [ ] 🔴 **JavaScript disabled: all content readable, all links work, both forms submit**
- [ ] Images blocked: layout holds, alt text visible

---

## 8. Functionality

Against [13_FUNCTIONAL_REQUIREMENTS.md](13_FUNCTIONAL_REQUIREMENTS.md).

### 8.1 Navigation and links

- [ ] 🔴 Zero broken internal links ⚙
- [ ] All external links resolve; correct `rel`
- [ ] Current-page indication correct in every section
- [ ] Breadcrumbs correct on every page
- [ ] 404 page returns HTTP 404 and offers recovery
- [ ] Redirects file works; no redirect chains

### 8.2 Forms 🔴

- [ ] 🔴 Membership form submits and arrives at WUFPA's address
- [ ] 🔴 Contact form submits and arrives
- [ ] 🔴 Both submit successfully with JavaScript disabled
- [ ] Sub-region appears in the email subject line
- [ ] Validation fires on blur and submit, not on keystroke
- [ ] Error summary appears at top; focus moves to it; each error links to its field
- [ ] Success message names the next step and who responds
- [ ] Conditional field 7 shows and hides correctly
- [ ] Honeypot catches automated submissions
- [ ] Submission without consent is blocked
- [ ] Mobile keyboards are correct per field type

### 8.3 Content features

- [ ] News index paginates with real URLs
- [ ] At least five launch articles published
- [ ] RSS feed validates
- [ ] 🔴 **An event dated in the past appears as past after a scheduled rebuild** — verified, not assumed
- [ ] Postponed and cancelled states render correctly and retain their URLs
- [ ] Homepage "What's happening" band behaves correctly in all three states
- [ ] Gallery lightbox works; works without JavaScript
- [ ] Full-size images load only on lightbox open
- [ ] Search returns sensible results and an announced empty state
- [ ] Map loads only on click; text address and Maps link always present

---

## 9. SEO

Detail: [16 Part One](16_SEO_ACCESSIBILITY.md#part-one--seo).

- [ ] 🔴 Unique title and meta description on every page ⚙
- [ ] 🔴 Exactly one `<h1>` per page; no skipped levels ⚙
- [ ] 🔴 Open Graph verified in Facebook's Sharing Debugger **and a real WhatsApp preview**
- [ ] All structured data validates in the Rich Results Test
- [ ] Structured data matches visible content
- [ ] `sitemap.xml` generated, correct, submitted
- [ ] `robots.txt` correct and not blocking the site
- [ ] Canonical on every page
- [ ] `lang="en-UG"`
- [ ] Descriptive link text throughout
- [ ] Descriptive image filenames
- [ ] Search Console and Bing Webmaster verified
- [ ] No `noindex` left on any production page ⚙

---

## 10. Print

- [ ] Pages print legibly, black on white
- [ ] Navigation, forms and decorative imagery hidden
- [ ] Disclosures expanded
- [ ] Link destinations shown after link text
- [ ] Tables and figures do not break across pages awkwardly

---

## 11. Deployment and operations

Detail: [18_DEPLOYMENT_AND_MAINTENANCE.md](18_DEPLOYMENT_AND_MAINTENANCE.md).

- [ ] 🔴 HTTPS enforced; HSTS enabled
- [ ] 🔴 Correct canonical host (`www` or apex, consistently, with a redirect)
- [ ] Security headers present: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- [ ] CSP does not break any feature
- [ ] 🔴 Scheduled daily rebuild configured and verified
- [ ] Analytics recording in production
- [ ] Uptime monitoring active
- [ ] 🔴 **Repository and hosting access held by at least two people, one at WUFPA**
- [ ] Secrets in environment variables, not committed ⚙
- [ ] Rollback tested — a previous build can be redeployed
- [ ] Domain registration and expiry recorded, with renewal reminders

---

## 12. Handover

- [ ] 🔴 Written maintenance guide delivered
- [ ] 🔴 Live training session held with the Publicity and Communications Officer ([11 § 8](11_TEAM_AND_LEADERSHIP.md#8-website-ownership-after-launch))
- [ ] WUFPA can publish a news item unaided
- [ ] WUFPA can add an event unaided
- [ ] WUFPA knows how to request help
- [ ] Documentation updated with every Phase 0 answer, version bumped
- [ ] Remaining `⚠ GAP` items recorded and handed over as content requests

---

## 13. Sign-off

| Area | Checked by | Date | Pass |
|---|---|---|---|
| Content integrity | | | ☐ |
| Privacy and data protection | | | ☐ |
| Design review | | | ☐ |
| Accessibility | | | ☐ |
| Performance | | | ☐ |
| Responsive | | | ☐ |
| Cross-browser | | | ☐ |
| Functionality | | | ☐ |
| SEO | | | ☐ |
| Deployment | | | ☐ |
| Handover | | | ☐ |

**Launch approved by:** ............................ **Date:** ....................

**WUFPA approval:** ............................ **Date:** ....................

---

## 14. Post-change regression set

For any change after launch. Ten minutes, catches most regressions.

- [ ] Changed page renders correctly at 360px and 1280px
- [ ] Keyboard traverse of the changed area
- [ ] axe on the changed page ⚙
- [ ] Lighthouse on the changed page ⚙
- [ ] Internal links still resolve ⚙
- [ ] Any new fact traces to an approved source
- [ ] Any new image has alt text and recorded consent ⚙
- [ ] No personal telephone number introduced ⚙
- [ ] Forms still submit
- [ ] Build passes; deployment succeeds

---

*Document 17 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
