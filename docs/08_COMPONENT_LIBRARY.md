# 08 — Component Library

*Every reusable component: what it is for, its variants, its accessibility contract, its
responsive behaviour, and how it extends.*

> **Scope.** This document specifies behaviour and contracts, not implementation. It is
> framework-agnostic — the same specification holds whether a component is an Astro
> component, a Svelte island or a server-rendered partial. Tokens referenced here are
> defined in [07_DESIGN_SYSTEM.md](07_DESIGN_SYSTEM.md).
>
> **Rules for adding a component.** A new component must (1) be used in at least two places,
> or be genuinely complex; (2) be specified here before it is built; (3) compose from
> existing primitives rather than duplicating them. A component that exists in one place and
> is simple is not a component — it is markup.

---

## 0. Component inventory

| # | Component | Category | Release |
|---|---|---|---|
| 1 | SkipLink | Global | 1.0 |
| 2 | SiteHeader | Global | 1.0 |
| 3 | PrimaryNav | Global | 1.0 |
| 4 | MobileNav | Global | 1.0 |
| 5 | SiteFooter | Global | 1.0 |
| 6 | Breadcrumb | Global | 1.0 |
| 7 | Section | Layout | 1.0 |
| 8 | PageHeader | Layout | 1.0 |
| 9 | Prose | Layout | 1.0 |
| 10 | Button | Primitive | 1.0 |
| 11 | Link | Primitive | 1.0 |
| 12 | Icon | Primitive | 1.0 |
| 13 | Tag | Primitive | 1.0 |
| 14 | Figure | Media | 1.0 |
| 15 | ResponsiveImage | Media | 1.0 |
| 16 | Hero | Content | 1.0 |
| 17 | StatBlock | Content | 1.0 |
| 18 | EntityCard | Content | 1.0 |
| 19 | PersonCard | Content | 1.0 |
| 20 | PersonProfile | Content | 1.0 |
| 21 | Disclosure | Content | 1.0 |
| 22 | Timeline | Content | 1.0 |
| 23 | EvidenceStrip | Content | 1.0 |
| 24 | KeyFacts | Content | 1.0 |
| 25 | RosterTable | Content | 1.0 |
| 26 | PartnerList | Content | 1.0 |
| 27 | Gallery | Content | 1.0 |
| 28 | Lightbox | Content | 1.0 |
| 29 | PullQuote | Content | 1.0 |
| 30 | Callout | Content | 1.0 |
| 31 | RegionMap | Content | 1.0 |
| 32 | RelatedLinks | Content | 1.0 |
| 33 | CTABanner | Content | 1.0 |
| 34 | EmptyState | Content | 1.0 |
| 35 | Field | Forms | 1.0 |
| 36 | Fieldset | Forms | 1.0 |
| 37 | Form | Forms | 1.0 |
| 38 | FormMessage | Forms | 1.0 |
| 39 | SearchField | Utility | 1.0 |
| 40 | Pagination | Utility | 1.0 |
| 41 | MapEmbed | Utility | 1.0 |
| 42 | SocialLinks | Utility | 1.0 |
| 43 | ShareRow | Utility | 1.0 |

---

## 1. SkipLink

**Purpose.** Lets a keyboard or screen-reader user bypass the header and reach the page
content. First focusable element in the DOM.

**Variants.** None.

**Accessibility.** Visually hidden until focused, then visible at `--z-skiplink` with the
standard focus ring. Target `#main-content`, which carries `tabindex="-1"` so focus lands
reliably. Text: "Skip to main content".

**Responsive.** Identical at all widths.

**Extensibility.** If a page gains a persistent sub-navigation, add a second skip target
rather than lengthening the first link.

> Absent from the prototype (X24).

---

## 2. SiteHeader

**Purpose.** Persistent identity and navigation. Carries the primary CTA.

**Anatomy.** Logo (link to `/`) · PrimaryNav · SearchField trigger · "Become a Member"
button · MobileNav trigger.

**Variants.**

| Variant | Use |
|---|---|
| `default` | All pages |
| `compact` | Applied on scroll past 80px — height 72px → 60px, logo scales down |

**Accessibility.** `<header>` landmark containing `<nav aria-label="Primary">`. Logo link's
accessible name is "WUFPA — home". The scroll-compact transition animates `height` on a
fixed element only; it must not reflow page content, so the header reserves its maximum
height in the document flow.

**Responsive.** Below `--bp-lg`: logo + search icon + hamburger. At `--bp-lg` and above: full
horizontal nav with the CTA button.

**Rules.**

- **Solid background at all scroll positions.** Never transparent over the hero. WUFPA's
  photography is bright and high-key; the prototype's dark-gradient-over-image header would
  leave nav text unreadable (X17 in a different form).
- Sticky, not fixed-with-overlap. Content is offset by `scroll-margin-top` so in-page anchors
  are not hidden beneath it.
- The header is one of only two places the logo appears at full lockup size; the other is the
  footer.

**Extensibility.** A member-portal login link (Release 2) slots into the utility area beside
search without structural change.

---

## 3. PrimaryNav

**Purpose.** Top-level navigation: About · Programmes · Regions · Membership · News.

**Variants.**

| Variant | Behaviour |
|---|---|
| `simple` | Direct link (Membership, News) |
| `panel` | Opens a mega-panel listing children (About, Programmes, Regions) |

**Accessibility.**

- Real `<ul>`/`<li>`/`<a>`. Panel triggers are `<button aria-expanded aria-controls>`.
- Opens on click/Enter/Space **and** on hover for pointer users; hover-open must never be the
  only route (X28 class of failure).
- `Escape` closes and returns focus to the trigger. Focus moving outside the panel closes it.
- Current page: `aria-current="page"` plus a visible 2px `--line-accent` underline — colour is
  never the sole indicator (1.4.1).
- Panel contents are a real list, tab-navigable in DOM order.

**Responsive.** Hidden below `--bp-lg`; MobileNav takes over.

**Extensibility.** The panel component accepts an arbitrary child list, so adding
`/programmes/resources/` is a content change, not a component change. Five top-level items is
the ceiling — a sixth means something belongs one level down
([05 § 3.1](05_INFORMATION_ARCHITECTURE.md#31-primary-navigation)).

---

## 4. MobileNav

**Purpose.** Full navigation on small screens.

**Anatomy.** Trigger button → full-screen panel → accordion sections → pinned CTA.

**Accessibility.**

- Trigger: `<button>` with accessible name "Open menu" / "Close menu" (not a bare `☰` glyph —
  X22), `aria-expanded`, `aria-controls`.
- Panel: `role="dialog"` `aria-modal="true"` with an `aria-label`. **Focus is trapped** while
  open; `Escape` closes; focus returns to the trigger.
- Background scroll locked while open, without layout shift from scrollbar removal.
- Accordion sections use the Disclosure contract (§ 21).

**Responsive.** Below `--bp-lg` only.

**Rules.** "Become a Member" is pinned as a full-width button at the panel's bottom edge,
always reachable without scrolling the menu. No nested drawers — one level of accordion.

---

## 5. SiteFooter

**Purpose.** Secondary navigation, legal identity, contact, social.

**Anatomy.** Four link columns · identity block (logo, strapline, legal line) · base row
(copyright, legal links).

**Accessibility.** `<footer>` landmark. Link columns are `<nav aria-label="Footer">` with
`<h2>` column headings (visually styled small, semantically real). Contrast on
`--surface-inverse` verified per [07 § 2.2](07_DESIGN_SYSTEM.md#22-text).

**Responsive.** 4 columns at `--bp-lg` → 2×2 at `--bp-md` → stacked.

**Rules.** The legal line — "Registered in Uganda on 4 September 2017 as a company limited by
guarantee" — appears on every page via the footer. It is one of WUFPA's strongest trust
signals and costs nothing to repeat
([06 § 8](06_WEBSITE_STRATEGY.md#8-how-trust-is-built-mechanically)).

**Extensibility.** Columns are data-driven from the navigation config, so IA changes
propagate to header and footer together.

---

## 6. Breadcrumb

**Purpose.** Location within the hierarchy, and a one-click route up. Matters here because
many visitors arrive on a deep page from search or a shared link
([05 § 4](05_INFORMATION_ARCHITECTURE.md#4-visitor-journeys)).

**Accessibility.** `<nav aria-label="Breadcrumb">` → `<ol>` → last item is plain text with
`aria-current="page"`, not a link. Separators are CSS pseudo-elements, not text nodes, so
they are not announced.

**Responsive.** Truncates from the left below `--bp-md`, always keeping Home and the parent.

**Extensibility.** Emits `BreadcrumbList` structured data
([16 § 4](16_SEO_ACCESSIBILITY.md)).

---

## 7. Section

**Purpose.** The horizontal band that every page is composed from. Handles background,
vertical rhythm and container width in one place.

**Variants.**

| Variant | Background | Use |
|---|---|---|
| `default` | `--surface-page` | Standard |
| `subtle` | `--surface-subtle` | Alternate band for rhythm |
| `muted` | `--surface-muted` | Grouped content |
| `inverse` | `--surface-inverse` | Emphasis band, max 2 per page |
| `accent` | `--surface-accent-subtle` | Callout band, max 1 per page |
| `bleed` | none | Full-bleed photography |

**Props.** `variant`, `container` (prose / narrow / default / wide / full), `spacing`
(compact / default / loose), `as` (`section` / `div`).

**Accessibility.** Renders `<section aria-labelledby>` pointing at its heading when it has
one; a plain `<div>` when it does not — a `<section>` without an accessible name is noise in
the landmark list.

**Responsive.** Vertical padding `--space-8` → `--space-9` at `--bp-lg`.

**Rules.** No two `inverse` sections adjacent. No page ends on `inverse` except the footer.

---

## 8. PageHeader

**Purpose.** The standard opening of every page except Home: breadcrumb, H1, standfirst,
optional key facts, optional lead image.

**Variants.** `default` · `with-image` · `compact` (index pages).

**Accessibility.** Contains the page's single `<h1>`. Standfirst is a `<p>`, not a heading.

**Responsive.** Image below text at base; beside text from `--bp-lg` in `with-image`.

---

## 9. Prose

**Purpose.** Applies typographic defaults to editor-authored content (markdown output).

**Accessibility.** Sets `--measure-prose`; ensures headings inside start at `<h2>`; styles
lists, blockquotes, tables, figures and code without requiring classes in content.

**Rules.** Content authors write markdown. They never write HTML with classes. Anything a
content author needs that markdown cannot express becomes a documented shortcode/component,
not raw HTML — otherwise the design system leaks into the content and both rot.

---

## 10. Button

Full token spec: [07 § 7.1](07_DESIGN_SYSTEM.md#71-buttons).

**Variants.** `primary` · `secondary` · `tertiary` · `inverse`.
**Sizes.** `sm` (40px) · `md` (48px, default) · `lg` (56px).
**States.** default · hover · active · focus-visible · loading · disabled.

**Accessibility.**

- Renders `<a>` when `href` is present, `<button>` otherwise. Never a `<div>` with a click
  handler (X25 class of failure).
- Minimum 44×44px hit area at every size.
- `loading` sets `aria-busy="true"` and keeps the accessible name stable; it does not swap
  the label for a spinner alone.
- `disabled` is avoided on form submits — see [07 § 7.1](07_DESIGN_SYSTEM.md#71-buttons).
- Icon-only buttons require `aria-label`; the icon is `aria-hidden`.

**Responsive.** Full-width below `--bp-sm` when it is a page's primary action; auto-width
otherwise. Button groups wrap via Cluster, never overflow.

**Extensibility.** New variants are added to the token table, not invented at call sites.

---

## 11. Link

**Purpose.** Inline navigation within text.

**Variants.** `inline` (underlined, `--link`) · `standalone` (with chevron icon) ·
`inverse` · `quiet` (nav and footer, underline on hover/focus only).

**Accessibility.**

- Underlined in body text at rest. Removing underlines from inline links leaves colour as the
  only signal, which fails 1.4.1.
- Link text is descriptive standalone — never "click here" or a bare URL (2.4.4).
- External links: `rel="noopener"`, and a visually-hidden suffix naming the destination.
  No `target="_blank"` except for documents and maps, where it is announced.
- Visited state distinguished and still ≥4.5:1.

---

## 12. Icon

**Purpose.** Wraps a Lucide SVG with consistent sizing and accessibility handling.

**Props.** `name`, `size` (`1em` default), `label` (optional).

**Accessibility.** Without `label`: `aria-hidden="true"` and `focusable="false"`. With
`label`: `role="img"` and `aria-label`. `currentColor` fill/stroke, `stroke-width: 2`.

**Rules.** One icon family only. No emoji as interface elements
([03 § 9](03_BRAND_GUIDELINES.md#9-iconography)). Icons never replace text labels.

**Extensibility.** Icons are imported individually so only used icons ship.

---

## 13. Tag

**Purpose.** A small metadata label: sub-region, guild, programme, year.

**Variants.** `neutral` (default) · `accent` · `sacco` · `outline`.
**Interactive variant** renders as a link to the filtered index.

**Accessibility.** Non-interactive tags are `<span>`, not `<button>`. Interactive tags are
`<a>` with a full accessible name ("Filter by Kigezi", not "Kigezi"). Never colour-only
meaning.

**Responsive.** Wraps within a Cluster.

---

## 14. Figure

**Purpose.** An image with its caption and credit. **The most important content component on
this site** — WUFPA's argument is carried by captioned photographs
([06 § 7](06_WEBSITE_STRATEGY.md#7-how-photography-should-be-used)).

**Anatomy.** ResponsiveImage · `<figcaption>` (caption · place · date · credit).

**Variants.** `inline` (prose width) · `wide` (breaks the measure) · `bleed` (full width) ·
`grid-item`.

**Accessibility.**

- Real `<figure>`/`<figcaption>`.
- **`alt` describes the image; the caption adds context. They are never the same string.**
  The prototype's `alt="Workshop"` beside a caption of "UCC Film Training Masterclass" is
  backwards (X26).
- If the caption fully describes the image, `alt=""` is correct — but this is rare here.
- Credit uses the prefix "Photograph:" and is inside the `<figcaption>`.

**Responsive.** Aspect ratio switches per [07 § 5.4](07_DESIGN_SYSTEM.md#54-aspect-ratios);
`object-position` per asset ([12_MEDIA_LIBRARY.md](12_MEDIA_LIBRARY.md)).

**Rules.** Where a date is unknown, the caption says "Date not recorded" rather than omitting
the field silently or inventing one
([06 § 8](06_WEBSITE_STRATEGY.md#8-how-trust-is-built-mechanically)).

---

## 15. ResponsiveImage

**Purpose.** Every content image on the site. Handles formats, sizes, priority and layout
stability.

**Props.** `src`, `alt`, `sizes`, `ratio`, `priority`, `objectPosition`.

**Accessibility.** `alt` is required by the API — a missing `alt` is a build error, an empty
`alt=""` must be explicit and intentional.

**Behaviour.**

- Emits AVIF → WebP → JPEG in a `<picture>`.
- `width`/`height` always present; ratio reserved by CSS. Zero CLS.
- `loading="lazy"` + `decoding="async"` by default; `priority` sets
  `fetchpriority="high"` and eager loading for the LCP image only.
- Never upscales beyond the source's intrinsic size — a build-time check fails if a variant
  would exceed it ([12 § 5](12_MEDIA_LIBRARY.md)).

**Rules.** No hot-linking to third-party image hosts. Every image is local and version-
controlled (X35).

---

## 16. Hero

**Purpose.** The opening statement of a page. Establishes rung 1 of the trust ladder
([06 § 3](06_WEBSITE_STRATEGY.md#3-the-trust-ladder)).

**Variants.**

| Variant | Use |
|---|---|
| `home` | Full-bleed photograph, `--text-hero` H1, two CTAs |
| `section` | Programme/region index: image beside text |
| `page` | Text only, tinted background |

**Accessibility.**

- Text over image requires a measured scrim guaranteeing ≥4.5:1 at the text's actual
  position — verified, not assumed ([07 § 8.3](07_DESIGN_SYSTEM.md#83-contrast)).
- Preferred: text beside or below the image rather than over it. It is more readable, more
  responsive, and does not require the photograph to have a dead zone.
- The hero image is decorative only if the H1 fully conveys it — which it does not here, so
  `alt` is always meaningful.

**Responsive.** Base: image `4/5` above, text below. `--bp-lg`: side-by-side or full-bleed
with overlay.

**Rules.** No video background (Q12, constraint C1). No parallax. No animated text entrance
that delays the LCP element.

---

## 17. StatBlock

**Purpose.** The homepage proof band and any grouped figures.

**Anatomy.** Figure · label · optional source note.

**Accessibility.**

- Each stat is a `<div>` containing the number and its label, associated so a screen reader
  reads "300 plus — film production houses", not "300 plus" then "film production houses" as
  unrelated fragments. Implement with a visually-hidden joining pattern or an accessible
  name on the group.
- `tabular-nums`.
- Not a `<table>` — these are not tabular data.

**Responsive.** 2×2 at base, 4-across from `--bp-md`.

**Rules.**

- **Every stat carries its as-of date**, in the block or in a shared footnote
  ([03 § 3](03_BRAND_GUIDELINES.md#3-editorial-style)).
- **No derived figure presented as counted.** The "10,500 individual creatives" number is
  prohibited here (X13).
- No count-up animation. It delays the number, breaks under reduced motion, and reads as
  marketing.

---

## 18. EntityCard

**Purpose.** The single card component behind programmes, regions, guilds, news, events and
albums. One component, six configurations — because they share a shape and diverging them
would produce six near-identical components that drift apart.

**Anatomy.** Optional image · eyebrow (type/date) · heading · description · optional
tags · optional metadata row.

**Variants.**

| Variant | Used for | Distinctive element |
|---|---|---|
| `programme` | Programme cards | Icon or photograph, one-line description |
| `region` | Region cards | Coordinator name, district count |
| `guild` | Guild cards | Craft description, guild head |
| `article` | News | Date, standfirst |
| `event` | Events | Date block, location, status |
| `album` | Gallery albums | Photo count |

**Accessibility.**

- The heading contains the anchor; a pseudo-element extends the hit area over the card. This
  gives the correct accessible name and a large target without nesting interactive elements
  ([07 § 7.3](07_DESIGN_SYSTEM.md#73-cards)).
- If the card carries a secondary link (e.g. a tag), the pseudo-element overlay is not used;
  the card becomes non-clickable and only its explicit links are interactive. **Never both.**
- Card images are `alt=""` when the heading conveys the content; meaningful `alt` when the
  photograph is itself the content.

**Responsive.** 1 → 2 → 3 columns via `auto-fit`/`minmax`, so column count needs no media
queries. Container queries adjust internal layout when the card sits in a narrow context.

**Extensibility.** A `member` variant (Release 2) and a `film` variant (Release 3) are
additions to the variant table, not new components
([05 § 8](05_INFORMATION_ARCHITECTURE.md#8-future-expansion)).

---

## 19. PersonCard

**Purpose.** A person in a grid: leadership, coordinators, guild heads.

**Anatomy.** Portrait or initials fallback · name · role · sub-region/district · optional
production company · optional link to profile.

**Accessibility.**

- Name and role are programmatically associated — the role is inside the heading's labelled
  region, not a loose `<span>` after it (X29).
- Initials fallback is `aria-hidden` with the name providing the accessible content.
- Portrait `alt`: "{Name}, {role}".

**Responsive.** 1 → 2 → 3–4 columns.

**Rules.**

- **Never a stock photograph.** Where no portrait exists, use the typographic initials
  fallback — never a photograph of a different person (X1).
- **Never a personal telephone number**
  ([01 § 7 C5](01_PROJECT_FOUNDATION.md#7-constraints)).
- Only renders once consent is recorded (Q4) and spelling confirmed (Q1).

---

## 20. PersonProfile

**Purpose.** A full leadership biography page.

**Anatomy.** Portrait · name · role and term · production company · biography · roles held
(committee, guild, region) · related links.

**Accessibility.** Single `<h1>` (the name). Term of office in a `<time>`-annotated key-facts
list. Related roles are links, not plain text.

**Responsive.** Portrait above at base; beside from `--bp-lg`.

**Extensibility.** A person may hold several roles — the model supports many-to-many, which
is required by the eight documented dual-role holders
([02 § 12.1 C-7, C-8](02_ORGANISATION_PROFILE.md#121-conflicts-between-sources)).

---

## 21. Disclosure

**Purpose.** Progressive disclosure: leadership biographies, constitutional objects, FAQ,
mobile nav sections. Preserves the prototype's good instinct
([01 § 9.1](01_PROJECT_FOUNDATION.md#91-what-is-good-and-is-being-preserved)) with a correct
implementation.

**Variants.** `standalone` · `accordion` (grouped; multiple may be open — an accordion that
force-closes siblings loses the user's place and is rarely what they want).

**Accessibility.**

- `<button aria-expanded="true|false" aria-controls="panel-id">`; panel has `id` and
  `role="region"` with `aria-labelledby` pointing at the button.
- **Collapsed content uses `hidden` (or `content-visibility` with `display:none`), not
  `max-height: 0`** — collapsed `max-height` leaves content focusable and in the
  accessibility tree (X27).
- State conveyed by `aria-expanded` and an icon that rotates; never by a glyph swap alone
  (X21).
- Keyboard: `Enter`/`Space` toggle. No arrow-key hijacking.

**Responsive.** Identical at all widths. Consider expanding by default on desktop where the
content is short.

**Rules.** Print styles expand all disclosures
([07 § 12](07_DESIGN_SYSTEM.md#12-print-styles)).

---

## 22. Timeline

**Purpose.** The history page and any dated sequence.

**Anatomy.** Year/date · event title · description · optional photograph · optional partner
tags.

**Accessibility.** An ordered list (`<ol>`), because chronology is meaningful order. Dates in
`<time datetime>`. Undated entries are grouped in a clearly-labelled "Date not recorded"
section rather than being interleaved with a guessed position.

**Responsive.** Single column with a left rule at base; alternating two-column from
`--bp-lg` **only if** the DOM order remains correct — visual alternation must not require
reordering the source.

**Rules.** Populated from [02 § 3](02_ORGANISATION_PROFILE.md#3-history). Every entry carries
a source; entries without a date say so.

---

## 23. EvidenceStrip

**Purpose.** The homepage "Eight years on the record" band — a short, dated, photographic
sequence.

**Anatomy.** 4–6 Figure items, each with date, one-line description and photograph.

**Accessibility.** A list. **Not a carousel** — no autoplay, no hidden slides (X18). On
mobile it becomes a horizontally scrollable list with `scroll-snap`, keyboard-scrollable,
with all items reachable by tab.

**Responsive.** Horizontal scroll at base; grid from `--bp-lg`.

**Rules.** Never more than six items — this is a taste of the record, and the link to
`/impact/` carries the rest.

---

## 24. KeyFacts

**Purpose.** A compact definition list for hard data: legal status, region details, event
details, SACCO facts.

**Accessibility.** Real `<dl>`/`<dt>`/`<dd>`. Not a table — these are name/value pairs, not a
grid.

**Responsive.** Stacked at base; two-column (`grid-template-columns: auto 1fr`) from
`--bp-md`.

**Rules.** Unknown values render the field with an explicit "Not recorded" rather than
omitting the row, when the field's absence is itself informative (e.g. registration number
pending Q21). Where the field would be meaningless, omit it.

---

## 25. RosterTable

**Purpose.** The governance rosters — Executive Committee, Trustees, sub-region teams,
guild heads.

**Anatomy.** Columns: Name · Role · District. **No telephone column.**

**Accessibility.**

- Real `<table>` with `<caption>`, `<thead>`, `<th scope="col">`.
- Wrapper has `overflow-x: auto`, `tabindex="0"`, `role="region"` and an `aria-label`, so
  keyboard users can scroll it.
- Sortable columns, if added later, use `aria-sort` and real buttons in the headers.

**Responsive.** Horizontal scroll, not card reflow
([07 § 7.4](07_DESIGN_SYSTEM.md#74-tables)).

**Rules.** **Personal mobile numbers are never rendered by this component**, regardless of
what the data contains. The contract is enforced in the component, not left to the content
author ([01 § 7 C5](01_PROJECT_FOUNDATION.md#7-constraints)). Renders only after Q1 and Q4.

---

## 26. PartnerList

**Purpose.** Presenting partner institutions.

**Variants.**

| Variant | Use | Availability |
|---|---|---|
| `named` | Typographic list, grouped by relationship type | **Release 1.0 default** |
| `logos` | Logo grid | Only once files and written permission exist (Q10) |
| `evidence` | Partner name + a photograph of the joint activity | Preferred on programme pages |

**Accessibility.** A list. Logos, when available, carry the institution name as `alt`, are
constrained to a consistent optical size (not a bounding box), and sit on white regardless of
section background — partner brand guidelines almost always require it.

**Responsive.** 2 → 3 → 4 columns for logos; single list for `named`.

**Rules.** No partner logo without written permission. Several partners are government bodies
and diplomatic missions with strict identity rules
([02 § 10](02_ORGANISATION_PROFILE.md#10-partnerships)).

---

## 27. Gallery

**Purpose.** Photo albums on `/impact/` and photograph groups on programme and region pages.

**Anatomy.** Grid of Figure items → optional Lightbox.

**Accessibility.**

- A list of figures. Each thumbnail is a `<button>` opening the Lightbox, with an accessible
  name of "View photograph: {caption}".
- Works without JavaScript: thumbnails link to the full image; the Lightbox is a progressive
  enhancement.
- Captions are visible in the grid, not only in the Lightbox — captions are content, not a
  hover reward. The prototype hides its captions behind hover (`transform: translateY(100%)`),
  which makes them invisible to touch and keyboard users.

**Responsive.** 1 → 2 → 3 columns. Group photographs keep a wide ratio and are allowed to
span two columns rather than being cropped square
([03 § 7.2](03_BRAND_GUIDELINES.md#72-what-the-real-photography-is-like-and-how-to-use-it)).

**Extensibility.** Filtering by region/programme/year attaches to the same grid.

---

## 28. Lightbox

**Purpose.** Full-size viewing of a gallery photograph.

**Accessibility.**

- `role="dialog"` `aria-modal="true"`, labelled by the photograph's caption.
- Focus trapped; `Escape` closes; focus returns to the originating thumbnail.
- Previous/Next are real `<button>`s with accessible names; arrow keys also work.
- Position announced ("Photograph 3 of 12") in a live region.
- Body scroll locked without layout shift.

**Responsive.** Full-screen on mobile with swipe support **in addition to** buttons, never
instead of them.

**Rules.** Loads the full-size image only on open. No preloading of the whole album.

---

## 29. PullQuote

**Purpose.** Emphasis within long-form content.

**Variants.** `quote` (attributed) · `statement` (unattributed emphasis, e.g. a line from the
mission).

**Accessibility.** `<figure>` + `<blockquote>` + `<figcaption>` for attribution. Attribution
is never inside the `<blockquote>`.

**Rules.** **No invented quotations, ever.** No supplied source contains a direct quote from
any WUFPA member or leader ([06 § 6.3](06_WEBSITE_STRATEGY.md#63-the-organisation-speaks-individuals-are-named)).
Until real quotes are collected, only the `statement` variant is used, drawing on WUFPA's own
published vision, mission and objectives.

---

## 30. Callout

**Purpose.** Set-apart information within prose: a note, a requirement, a related fact.

**Variants.** `note` · `important` · `sacco`.

**Accessibility.** Not `role="alert"` — these are static content, and an alert role would
interrupt screen-reader users. A visible heading conveys the type; the icon is decorative.

---

## 31. RegionMap

**Purpose.** Showing the six sub-regions and letting a visitor select their own — journey J1,
step 3.

**Accessibility.**

- **A static SVG with real `<a>` elements**, each with an accessible name ("Kigezi
  sub-region"). Keyboard-navigable in a sensible order.
- **A visible text list of the six regions accompanies the map at all times** — not a
  fallback, a permanent equal alternative. Many users will find the list faster, and it works
  where the map does not.
- Region shapes carry ≥3:1 contrast against their background and are distinguished by more
  than colour (label + border).

**Responsive.** Map hidden below `--bp-md`, list only. A six-region map at 360px is
unreadable and costs kilobytes for nothing (constraint C1).

**Rules.** Inline SVG, no mapping library, no tiles, no external requests. This is a
diagram of six areas, not cartography.

---

## 32. RelatedLinks

**Purpose.** The contextual exit at the foot of every page
([05 § 6](05_INFORMATION_ARCHITECTURE.md#6-internal-linking-model)).

**Accessibility.** `<nav aria-label="Related">` containing a list. Two to four items.

**Rules.** Chosen by relationship, not recency. Never auto-populated with "latest" content —
that produces the same three links on every page and teaches users to ignore the region.

---

## 33. CTABanner

**Purpose.** The page-level conversion prompt.

**Variants.** `membership` (primary, most pages) · `partnership` · `support` · `contact`.

**Accessibility.** A `<section>` with a real heading. The button follows the Button contract.

**Responsive.** Stacked at base; heading and button side-by-side from `--bp-md`.

**Rules.** **One primary CTA per page.** If a page seems to need two, one of them is
secondary. The prototype presents three competing CTAs in the hero alone `[SITE]`, which
means it has none.

---

## 34. EmptyState

**Purpose.** What a collection shows when it has no items — search results, events,
filtered views.

**Anatomy.** Short honest sentence · 2–3 suggested routes onward.

**Accessibility.** Announced via `aria-live="polite"` when it appears as the result of a
user action (e.g. search).

**Rules.**

- **Honest, never "coming soon".** "No events are scheduled at the moment" is true and fine.
  "Exciting events coming soon!" is a promise nobody authorised
  ([04 § 13.3](04_CONTENT_BIBLE.md#133-events-index)).
- Always offers a route onward. An empty state with no exit is a dead end.
- Sections that would be permanently empty are not built at all
  ([05 § 7](05_INFORMATION_ARCHITECTURE.md#7-what-is-deferred-and-what-happens-to-the-gap)).

---

## 35. Field

**Purpose.** One form input with its label, hint and error. All input types.

**Variants.** `text` · `email` · `tel` · `textarea` · `select` · `checkbox` · `radio`.

**Accessibility.** Full contract in [07 § 7.2](07_DESIGN_SYSTEM.md#72-forms). Summary:

- Persistent visible `<label>`, programmatically associated. Never placeholder-as-label.
- Hint via `aria-describedby`.
- Error via `aria-describedby` + `aria-invalid="true"`, with icon and text.
- "Required" as a word in the label.
- `autocomplete`, `type` and `inputmode` correct for the data (1.3.5).
- ≥16px font size to prevent iOS zoom; ≥48px height.

**Responsive.** Full width at base; paired short fields side-by-side from `--bp-lg`.

---

## 36. Fieldset

**Purpose.** Grouping related fields — radio groups, checkbox groups, address blocks.

**Accessibility.** `<fieldset>` with `<legend>`. The legend is the group's accessible name;
individual labels are not sufficient for a radio group.

---

## 37. Form

**Purpose.** The wrapper: submission, validation orchestration, status messaging.

**Accessibility.**

- Native `<form>` with a real `action`, so it works without JavaScript. Enhanced submission
  is progressive.
- On failed submit: focus moves to a summary of errors at the top, which lists each error as
  a link to its field. This is the pattern that works best for screen-reader and
  cognitive-accessibility users.
- Status region is `aria-live="polite"`, `role="status"`.
- Honeypot field for spam, visually hidden with `aria-hidden` and `tabindex="-1"` — never
  `display:none` on a real input that a legitimate autofill might populate.

**Rules.** No CAPTCHA at launch. CAPTCHAs are an accessibility barrier and a conversion
tax; honeypot plus platform-level spam filtering is sufficient at WUFPA's volume
([13_FUNCTIONAL_REQUIREMENTS.md](13_FUNCTIONAL_REQUIREMENTS.md)).

---

## 38. FormMessage

**Purpose.** Success, error and info messaging for forms.

**Variants.** `success` · `error` · `info`.

**Accessibility.** `role="status"` for success/info, `role="alert"` for errors. Icon plus
text, never colour alone. Focus moves to the message on submit completion.

**Rules.** Success copy states what happens next and who will respond
([04 § 15.2](04_CONTENT_BIBLE.md#152-membership-enquiry-form)).

---

## 39. SearchField

**Purpose.** Site search entry.

**Accessibility.** `<form role="search">`, `<label>` (visually hidden in the header,
visible on `/search/`), `type="search"`. Results count announced in a live region.

**Responsive.** Icon trigger expanding to a full-width field below `--bp-lg`; inline field at
`--bp-lg`.

**Rules.** Client-side static index (Pagefind or equivalent), loaded only on interaction —
zero cost to visitors who never search (constraint C1).

---

## 40. Pagination

**Purpose.** Paging news, events and gallery indexes.

**Accessibility.** `<nav aria-label="Pagination">`, current page marked with
`aria-current="page"`, Previous/Next with accessible names that include context ("Previous
page of news").

**Responsive.** Previous/Next plus current position at base; numbered pages from `--bp-md`.

**Rules.** Real paginated URLs (`/news/2/`), not infinite scroll. Infinite scroll breaks
linking, breaks the footer, and breaks back-button return — all of which matter for goal W4.

---

## 41. MapEmbed

**Purpose.** The head office location on `/contact/`.

**Accessibility.**

- **Not loaded on page load.** A static map image with a "Show interactive map" button; the
  iframe loads on click. This avoids third-party JavaScript and cookies for every visitor
  (constraint C1, and privacy).
- The `<iframe>` carries a `title`.
- **The address in text and a direct "Open in Maps" link are always present**, independent of
  the embed. The text address is the accessible primary; the map is the enhancement.

**Rules.** Precise pin pending Q14.

---

## 42. SocialLinks

**Purpose.** Links to WUFPA's Facebook, WhatsApp and YouTube presence.

**Accessibility.** Icon + accessible name ("WUFPA on Facebook"). Never icon-only without a
name.

**Rules.** Renders nothing if no URL is configured — no dead icons. Blocked on Q9.

---

## 43. ShareRow

**Purpose.** Sharing an article or event.

**Accessibility.** Real links to share endpoints, or the Web Share API where available with a
link fallback. Each control has an accessible name.

**Rules.** **No third-party share widgets.** They are heavy, tracking-laden and slow. Plain
links to share URLs cost nothing. WhatsApp is included first — it is one of WUFPA's own two
stated channels `[P3]` and is how most of this audience actually shares.

---

## 44. Component quality gate

Before any component is considered done:

- [ ] Specified in this document before being built
- [ ] Keyboard-operable end to end; visible focus at every step
- [ ] Tested with a screen reader (NVDA or VoiceOver) — not just axe
- [ ] All text ≥4.5:1; UI/borders ≥3:1
- [ ] Targets ≥44×44px with ≥8px separation
- [ ] Works with JavaScript disabled, or degrades to something usable
- [ ] No layout shift; media reserves its ratio
- [ ] Honours `prefers-reduced-motion`
- [ ] Uses only tokens from [07_DESIGN_SYSTEM.md](07_DESIGN_SYSTEM.md)
- [ ] Renders correctly at 320px width and at 200% zoom
- [ ] Content overflow tested with long Ugandan place and person names
- [ ] No personal telephone number can be rendered by it
- [ ] No stock photography of people can be passed to it

---

*Document 08 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
