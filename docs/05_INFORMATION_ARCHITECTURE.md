# 05 — Information Architecture

*The complete sitemap, navigation, journeys and linking model.*

---

## 1. The organising principle

Most association websites are organised around **document types** — About, News, Gallery,
Contact. That structure is easy to build and tells the visitor nothing.

WUFPA is not shaped like that. It is shaped by two axes that appear everywhere in its own
governance: **where you are** (six sub-regions, ~25 districts) and **what you do** (ten
craft guilds) `[P6] [P7]`.

**The site is therefore organised around how WUFPA actually works:**

```
                        WUFPA
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   WHO WE ARE        WHAT WE DO        WHO BELONGS
   About             Programmes        Membership
   Leadership        Events            Regions  ← where you are
   Partners          Impact            Guilds   ← what you do
   SACCO             News
```

This matters for three reasons:

1. **It answers the member's real question.** A camera operator in Rukungiri does not want
   "Our Programmes". They want to know there is a Cinematography Guild and a Kigezi
   coordinator, and that both include them.
2. **It is defensible to funders.** A structure that mirrors the constitution demonstrates
   that the governance is real and not a diagram drawn for a grant application.
3. **It scales without redesign.** New districts, new guilds, new programmes are new
   entries in existing collections, not new sections.

---

## 2. Complete sitemap

Release 1.0. Depth is capped at three levels; nothing important is more than two clicks from
the homepage.

```
/                                        Home
│
├── /about/                              About WUFPA
│   ├── /about/history/                  Our story: 2017 to today
│   ├── /about/governance/               How WUFPA is governed
│   └── /about/legal/                    Legal status & registration
│
├── /leadership/                         Leadership & Governance
│   ├── /leadership/executive/           Executive Committee 2025–2030
│   ├── /leadership/trustees/            Board of Trustees
│   ├── /leadership/founders/            Founders
│   └── /leadership/[person]/            Individual profile (Release 1.0: 4 profiles)
│
├── /programmes/                         What We Do — index
│   ├── /programmes/training/            Training & Capacity Building
│   ├── /programmes/advocacy/            Advocacy, Rights & Anti-Piracy
│   ├── /programmes/kibanda/             The WUFPA Kibanda Initiative
│   ├── /programmes/distribution/        Distribution & Market Access
│   ├── /programmes/competitions/        Film Competitions & Awards
│   └── /programmes/international/       International Exposure
│
├── /regions/                            Six Sub-Regions — index + map
│   ├── /regions/ankole/                 Ankole (Rwizi)
│   ├── /regions/kigezi/                 Kigezi
│   ├── /regions/rwenzori/               Rwenzori
│   ├── /regions/tooro/                  Tooro
│   ├── /regions/bunyoro/                Bunyoro
│   └── /regions/greater-bushenyi/       Greater Bushenyi
│
├── /guilds/                             The Ten Film Guilds — index
│   └── /guilds/[guild]/                 Individual guild (10)
│
├── /membership/                         Membership — why and what
│   ├── /membership/join/                Become a Member (form)
│   └── /membership/members/             Our Members  ⚠ deferred — see §7
│
├── /sacco/                              WUFM SACCO
│
├── /partners/                           Partners & Supporters
│
├── /impact/                             Impact & Gallery
│   └── /impact/gallery/[album]/         Photo albums by activity
│
├── /news/                               News — index
│   └── /news/[slug]/                    Article
│
├── /events/                             Events — index (upcoming + past)
│   └── /events/[slug]/                  Event detail
│
├── /support/                            Support WUFPA
│
├── /contact/                            Contact
│
├── /search/                             Search results
│
└── /legal/
    ├── /legal/privacy/                  Privacy notice
    ├── /legal/terms/                    Terms of use
    └── /legal/accessibility/            Accessibility statement
```

**Utility routes:** `/404`, `/sitemap.xml`, `/robots.txt`, `/site.webmanifest`, `/feed.xml`
(news RSS).

### 2.1 URL rules

| Rule | Reason |
|---|---|
| Lowercase, hyphen-separated, no trailing file extension | Conventional, readable, no case-sensitivity bugs |
| Trailing slash on directory-style routes, consistently | Prevents duplicate-content pairs |
| No dates in news URLs (`/news/wufm-sacco-certified/`) | Articles stay linkable when re-dated; dates live in metadata |
| Never change a published URL. If a page moves, 301 | Goal W4 depends on links in grant applications staying alive |
| `/regions/greater-bushenyi/` not `/regions/bushenyi/` | Matches the sub-region's actual name `[P1]` |

---

## 3. Navigation

### 3.1 Primary navigation

Five items plus one action. Five is the limit — a seventh item is a signal that something
belongs one level down.

```
[WUFPA logo]   About   Programmes   Regions   Membership   News        [Search]  [Become a Member]
```

| Item | Destination | Why it earned a top-level slot |
|---|---|---|
| **About** | `/about/` | Audience A2's first stop. Contains the legal status and governance that establish legitimacy |
| **Programmes** | `/programmes/` | The evidence. What WUFPA actually does |
| **Regions** | `/regions/` | The organising insight of the whole site (§ 1). Also how A1 finds their local coordinator |
| **Membership** | `/membership/` | The primary business goal (B1). Must be reachable in one click from everywhere |
| **News** | `/news/` | Proof of life. An association with no recent activity looks defunct — this is the page that says otherwise |
| **Become a Member** *(button)* | `/membership/join/` | The single primary action, per [03 § 11.2](03_BRAND_GUIDELINES.md#112-calls-to-action) |

**Deliberately not in the primary nav:** Leadership (inside About), Guilds (inside
Regions/Membership context), Partners (inside About and footer), SACCO (inside Membership
and footer), Events (inside News, and surfaced on the homepage), Contact (footer + header
utility), Support (footer + contextual CTAs).

**Dropdowns:** About, Programmes and Regions each get a mega-panel on desktop showing their
children, because their children are the substance and burying them costs a click for no
benefit. Membership and News go straight to their page.

### 3.2 Mobile navigation

- Logo + search icon + hamburger.
- Full-screen panel, focus-trapped, `Escape` closes, focus returns to the trigger.
- Accordion for the three sections with children — no nested drawers.
- **"Become a Member" is pinned as a full-width button at the bottom of the panel**, always
  visible without scrolling the menu.
- `aria-expanded`, `aria-controls`, and a real accessible name on the trigger. All four were
  missing from the prototype (X22).

### 3.3 Header behaviour

- Sticky, but **compact on scroll**, not full-height. A 75px fixed header
  costs 12% of a small phone's viewport permanently.
- Solid background from the start. The prototype's transparent-over-hero gradient makes the
  logo and nav text unreadable against light photography, and WUFPA's photography is light.
- Skip link as the first focusable element (X24).

### 3.4 Footer

Four columns on desktop, stacked on mobile. The footer is a real navigation surface — for
many visitors on a long page it is closer than the header.

| Column 1 — WUFPA | Column 2 — What we do | Column 3 — Get involved | Column 4 — Contact |
|---|---|---|---|
| About | Programmes | Become a member | Head office address |
| Our story | Training | Membership | Association email |
| Leadership | Advocacy | WUFM SACCO | Association phone `⚠ GAP` Q3 |
| Governance | Kibanda Initiative | Partner with us | Map link |
| Legal status | Distribution | Support WUFPA | Social links `⚠ GAP` Q9 |
| Partners | Competitions | Guilds | |
| | International | Regions | |

**Footer base row:** logo · "Telling our stories that transform our communities." ·
© {current year} Western Uganda Film Producers Association Ltd · Registered in Uganda as a
company limited by guarantee · Privacy · Terms · Accessibility.

---

## 4. Visitor journeys

The five journeys the site must serve well. Each is written as the visitor's real sequence,
not an idealised funnel.

### J1 — Prospective member (audience A1) · **primary**

> *Entry: Facebook or WhatsApp link, on a phone.*

| Step | Page | What must happen | Failure mode to avoid |
|---|---|---|---|
| 1 | `/` | Within one screen: what WUFPA is, that it is real, that it covers their region | A hero that says something poetic and nothing factual |
| 2 | `/` scroll | See people who look like them in places they recognise | Stock imagery — instant disqualification |
| 3 | `/regions/[theirs]/` or `/membership/` | Confirm their district is covered, or read the offer | Being unable to find their own region |
| 4 | `/membership/` | Understand what they get, whether they qualify, what it costs `⚠ GAP` Q8 | Vague benefits; hidden cost |
| 5 | `/membership/join/` | Short form, clear next step | A 20-field form asking for a company registration number |
| 6 | Confirmation | Told what happens next and when | "Thank you for your submission." |

**Design consequences:** "Become a Member" must be reachable from every page; regions must
be findable from the homepage; the form must be short and mobile-first; the site must be
fast on a metered connection.

### J2 — Institutional funder or partner (audience A2) · **primary**

> *Entry: a link in an email or a grant application, on a laptop, with 90 seconds.*

| Step | Page | What must happen |
|---|---|---|
| 1 | `/` | Legal form, founding year, scale and coverage visible without scrolling far |
| 2 | `/about/` → `/about/legal/` | Company limited by guarantee, URSB, 4 September 2017 `[P1] [P4]` |
| 3 | `/leadership/` | Named, photographed, accountable people with defined roles and terms |
| 4 | `/programmes/` | Dated delivery record, not a list of intentions |
| 5 | `/partners/` | Existing institutional relationships — the strongest single credibility signal |
| 6 | `/support/` or `/contact/` | A specific ask and a named route to a person |

**Design consequences:** legal status is a page, not a footnote; every programme page carries
dates and partner names; the leadership page is photographic and specific.

### J3 — Existing member (audience A3)

> *Entry: direct or search, looking for something specific.*

Homepage → News/Events → the opportunity → the deadline and how to enter. Requires: news
and events working from day one; obvious dates; and a route back to a human.

**Design consequence:** the homepage must carry a live "What's happening" band that is
genuinely current. If WUFPA cannot keep it current, it is better to design the band to
degrade into recent activity than to show a stale "upcoming" event (constraint C4).

### J4 — Journalist / researcher (audience A4)

Search → About or Leadership → needs correct names, dates, downloadable logo, the profile
PDF, and a contact. **Design consequence:** a press block on `/contact/` with the logo pack
and profile download. Low cost, high reputational return.

### J5 — Audience member / diaspora (audience A5)

Arrives from a shared link or social. Wants the story, the photographs, and possibly a way
to help. Lands on `/impact/` or a news article. **Design consequence:** every article and
gallery page needs good Open Graph metadata, because this journey is entirely
share-driven — and the prototype had none (X30).

---

## 5. Content hierarchy

### 5.1 Homepage sequence

The order is an argument, not a layout. Each band answers the question the previous one
raises.

| # | Band | The question it answers | Primary asset |
|---|---|---|---|
| 1 | Hero | "What is this?" | Wide real photograph `[PH-3]` / `[P11]` |
| 2 | Proof band | "Is it real and how big?" | Four sourced figures with dates |
| 3 | Who we are | "What kind of organisation?" | Short prose + link to About |
| 4 | What we do | "What does it actually do?" | Six programme cards |
| 5 | Where we work | "Does it reach me?" | Six sub-regions, mapped/listed |
| 6 | Evidence | "Prove it." | Dated activity strip with real photographs |
| 7 | Partners | "Who else takes them seriously?" | Named institutions |
| 8 | Membership | "How do I join?" | The primary CTA, in full |
| 9 | News & events | "Are they still active?" | Latest three |
| 10 | Support | "How else can I help?" | Secondary CTA |

The prototype's sequence (identity → leadership → films → members → gallery) is preserved in
bands 1–6 with credit ([01 § 9.1](01_PROJECT_FOUNDATION.md#91-what-is-good-and-is-being-preserved));
what changes is that the fabricated Films band is removed and Partners, Membership and
News are added — the three things a trade association's homepage cannot do without.

### 5.2 Page-level hierarchy

Every page follows the same skeleton, so the site is learnable:

```
Breadcrumb (except home)
H1  — one per page, matching the nav label's intent
Standfirst — ≤ 40 words
[Key facts block — where the page has hard data]
H2 sections, each with a purpose
[Evidence: photographs, dates, names]
Related links — 2 to 4, contextual
Page CTA — one primary
```

### 5.3 Heading discipline

One `<h1>`. No level skipped. Headings describe content, never style. This is how
screen-reader users navigate a page and how search engines parse it — see
[16_SEO_ACCESSIBILITY.md](16_SEO_ACCESSIBILITY.md).

---

## 6. Internal linking model

Internal links here are structural, not decorative. Three rules:

**1. Every entity links to its relations.** The content model
([14 § 5](14_TECHNICAL_ARCHITECTURE.md)) makes these automatic rather than hand-maintained.

```
Person ─┬─→ their Committee
        ├─→ their Guild
        ├─→ their Region
        └─→ their Production Company

Region ─┬─→ its Coordinator (Person)
        ├─→ its Districts
        ├─→ Programmes delivered there
        └─→ Photographs taken there

Guild  ─┬─→ its Head (Person)
        ├─→ its craft's relevant Programmes
        └─→ Members in that guild  (deferred, §7)

Programme ─┬─→ Partners involved
           ├─→ Regions delivered in
           ├─→ Events under it
           └─→ Photographs
```

**2. Every page has an exit that is not the navigation.** Two to four contextual "related"
links at the foot, chosen by relationship rather than recency.

**3. Cross-links are earned, not sprinkled.** A link inside body copy must be the thing the
reader would want next. Linking every mention of "Mbarara" to the Ankole page is noise.

### 6.1 Key link paths that must exist

| From | To | Why |
|---|---|---|
| Every page | `/membership/join/` | Primary conversion (B1) |
| Homepage | `/about/legal/` within two clicks | Journey J2 step 2 |
| Every programme | its partners | Credibility transfers both ways |
| Every region | its coordinator and its districts | Journey J1 step 3 |
| Every leadership profile | their production company, guild and region | Makes the governance legible as a network |
| Every gallery album | the programme it documents | Photographs without context are decoration |
| `/sacco/` | `/membership/` and back | The SACCO is a reason to join |
| 404 | Search, homepage, membership | Recovery |

---

## 7. What is deferred, and what happens to the gap

Three planned areas cannot be built truthfully at launch. Each has an honest interim state —
**never an empty shell and never invented filler.**

| Area | Why deferred | Interim state at launch |
|---|---|---|
| `/membership/members/` — the member directory | Only four member companies are documented `[P4] [P5]`; a "300+ members" page showing four entries is worse than no page. `⚠ GAP` Q16 | No directory. `/membership/` states the scale in prose and shows the four documented companies as examples, clearly labelled as such. Route reserved |
| Films / catalogue | No film title exists in any source. `⚠ GAP` Q11 | **No films section at all.** The prototype's version was entirely fabricated (X2). Route reserved at `/films/` for when a catalogue exists |
| Video | None supplied. `⚠ GAP` Q12 | No video. Photography carries the site |

**The rule these three share:** a section that cannot be filled with truth is not built. It
is not built with placeholders, not built with "coming soon", and not built with borrowed
content. The IA reserves the route so that adding it later is an addition, not a
restructure.

---

## 8. Future expansion

How the structure absorbs the [19_FUTURE_ROADMAP.md](19_FUTURE_ROADMAP.md) items without
being redesigned.

| Future addition | Where it attaches | Structural change needed |
|---|---|---|
| Member directory | `/membership/members/` + `/members/[slug]/` | None — route reserved |
| Film database | `/films/` + `/films/[slug]/`, cross-linked from members, guilds, regions | None — the entity model already anticipates it |
| Member portal | `/portal/` behind auth, linked from the header utility area | New auth layer; public IA unchanged |
| Training portal / resources | `/resources/` under Programmes | New top-level child |
| Funding opportunities board | `/opportunities/` under Membership | New collection, same pattern as News |
| Awards | `/programmes/competitions/awards/` and `/events/` | None |
| Press kit | `/press/` linked from Contact | New leaf |
| Volunteer management | `/support/volunteer/` | New leaf |
| Second language | `/rn/` locale prefix, same tree | Requires routing set up for it from day one — see [14](14_TECHNICAL_ARCHITECTURE.md) |

**The one architectural commitment that makes all of this cheap:** entities are modelled as
content collections with relationships from Release 1.0, even where a collection has four
items. Adding the 300th member then costs nothing; hand-writing the fourth into a template
would have cost a rebuild.

---

*Document 05 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
