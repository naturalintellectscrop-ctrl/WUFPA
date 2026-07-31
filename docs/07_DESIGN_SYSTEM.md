# 07 — Design System

*Tokens, grid, type, states. The vocabulary every screen is built from.*

> **The rule this document exists to enforce:** if a value is not in here, it is not used.
> A one-off `margin-top: 37px` is how a design system dies. If a genuine need appears that
> the system cannot express, extend the system here first, then use it.

---

## 1. Token architecture

Three layers. Components reference layer 3 or layer 2, **never layer 1**.

```
PRIMITIVE          →  SEMANTIC              →  COMPONENT
--red-500: #ED1B24    --color-accent           --button-primary-bg
--ink-800: #3A3436    --color-text-body        --card-border
--space-6: 1.5rem     --space-section-gap      --card-padding
```

Why: a primitive is a fact about the palette; a semantic token is a decision about meaning.
When the decision changes ("links are now darker for contrast"), one semantic token changes
and every component follows. When a component references `--red-500` directly, that
inheritance is broken and the change has to be hunted down by hand — which is how the
prototype ended up with colours hard-coded in 40 places `[SITE]`.

---

## 2. Colour tokens

Primitives are specified in [03 § 5.2](03_BRAND_GUIDELINES.md#52-the-working-palette).
This is the semantic layer.

### 2.1 Surface

| Token | Value | Use |
|---|---|---|
| `--surface-page` | `#FFFFFF` | Default page background |
| `--surface-subtle` | `#FAF8F8` | Alternate section band |
| `--surface-muted` | `#F2EFEF` | Card fill, tinted block, table header |
| `--surface-inverse` | `#231F20` | Dark section, footer |
| `--surface-accent-subtle` | `#FDECED` | Red-tinted callout. Derived from `red-500` at 8% |
| `--surface-sacco` | `#EEEFF8` | WUFM SACCO pages only |

### 2.2 Text

| Token | Value | Contrast on page | Use |
|---|---|---|---|
| `--text-heading` | `#231F20` | 16.3:1 | All headings |
| `--text-body` | `#3A3436` | 11.4:1 | Body copy |
| `--text-secondary` | `#524A4C` | 8.0:1 | Supporting text, intros |
| `--text-muted` | `#6B6163` | 5.98:1 | Captions, metadata, form hints. **Lightest permitted text** |
| `--text-accent` | `#B31419` | 6.93:1 | Red text, inline links |
| `--text-on-inverse` | `#FFFFFF` | 16.3:1 on `--surface-inverse` | Text on dark |
| `--text-muted-on-inverse` | `#C9C3C4` | 9.9:1 on inverse | Metadata on dark |
| `--text-accent-on-inverse` | `#FF4B52` | 4.95:1 on inverse | Red on dark |

> **`--text-muted` is a floor, not a default.** If a design calls for something lighter than
> `#6B6163`, the answer is a smaller size or more space, not a paler grey. Prototype failure
> X17 was exactly this.

### 2.3 Line and border

| Token | Value | Use |
|---|---|---|
| `--line-subtle` | `#E3DFDF` | Hairlines, card borders, table rules |
| `--line-default` | `#C9C3C4` | Input borders, dividers |
| `--line-strong` | `#8A8083` | Emphasised dividers, hovered inputs. 3.8:1 — meets 1.4.11 |
| `--line-accent` | `#ED1B24` | Active/current indicators, section rules |
| `--line-inverse` | `rgba(255,255,255,0.18)` | Dividers on dark |

### 2.4 Interactive

| Token | Value | Use |
|---|---|---|
| `--action-primary-bg` | `#ED1B24` | Primary button fill |
| `--action-primary-bg-hover` | `#D4161E` | Primary button hover |
| `--action-primary-bg-active` | `#B31419` | Primary button pressed |
| `--action-primary-text` | `#FFFFFF` | 4.39:1 — passes as ≥19px bold or ≥24px. **Button labels must be ≥17px semibold**, verified per [§ 7.1](#71-buttons) |
| `--action-secondary-border` | `#231F20` | Secondary button outline |
| `--action-secondary-text` | `#231F20` | |
| `--action-secondary-bg-hover` | `#F2EFEF` | |
| `--link` | `#B31419` | Inline links |
| `--link-hover` | `#8E1014` | |
| `--link-visited` | `#7A2A6B` | Distinguishable, still ≥4.5:1 |
| `--focus-ring` | `#ED1B24` | Focus indicator |
| `--focus-ring-offset` | `#FFFFFF` | |

### 2.5 Feedback

| Token | Value |
|---|---|
| `--feedback-success` / `-bg` | `#1F6B3F` / `#EAF4EE` |
| `--feedback-warning` / `-bg` | `#8A5A00` / `#FCF3E3` |
| `--feedback-error` / `-bg` | `#B31419` / `#FDECED` |

All four pair to ≥ 4.5:1. Feedback is **never** conveyed by colour alone (1.4.1) — every
state carries an icon and a text label.

---

## 3. Spacing

A 4px base. Values are `rem` so they respect the user's root font size.

| Token | rem | px | Typical use |
|---|---|---|---|
| `--space-0` | 0 | 0 | |
| `--space-1` | 0.25 | 4 | Icon–text gap, tight inline |
| `--space-2` | 0.5 | 8 | Chip padding, small gaps |
| `--space-3` | 0.75 | 12 | Form label to input |
| `--space-4` | 1 | 16 | Default gap; paragraph spacing |
| `--space-5` | 1.5 | 24 | Card padding (mobile), list item gap |
| `--space-6` | 2 | 32 | Card padding (desktop), heading to body |
| `--space-7` | 3 | 48 | Sub-section gap |
| `--space-8` | 4 | 64 | Section gap (mobile) |
| `--space-9` | 6 | 96 | Section gap (desktop) |
| `--space-10` | 8 | 128 | Major section gap (desktop) |

### 3.1 Rhythm rules

- **Vertical section padding:** `--space-8` mobile → `--space-9` desktop. Reserve
  `--space-10` for the two or three most important breaks on a page.
  *(The prototype used a flat `120px` everywhere `[SITE]`, which on a 360px-wide phone wastes
  a third of the viewport per section.)*
- **Space belongs above.** Use `margin-block-start` on headings, not `margin-bottom` on
  everything, so the last element in a container never adds trailing space.
- **Related things sit closer than unrelated things.** A heading is closer to its paragraph
  (`--space-4`) than the paragraph is to the next heading (`--space-7`). This is the whole
  of visual grouping and it is free.
- **Never use spacing to fake hierarchy** that headings should express.

---

## 4. Typography

Typefaces and loading strategy: [03 § 6](03_BRAND_GUIDELINES.md#6-typography).

### 4.1 Families

| Token | Stack |
|---|---|
| `--font-display` | `Archivo, "Segoe UI", Roboto, system-ui, -apple-system, sans-serif` |
| `--font-body` | `"Source Serif 4", Georgia, "Times New Roman", serif` |
| `--font-ui` | same as `--font-display` |
| `--font-mono` | `ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace` |

### 4.2 Scale

Fluid between 360px and 1280px viewports. Mobile ratio 1.25, desktop 1.333 — the wider
desktop ratio gives display type the presence the brand needs without headlines swallowing a
small screen.

| Token | Fluid value | Mobile → Desktop | Use |
|---|---|---|---|
| `--text-2xs` | `0.75rem` | 12 → 12 | Micro-labels only. Never body |
| `--text-xs` | `0.8125rem` | 13 → 13 | Captions, credits, table meta |
| `--text-sm` | `0.875rem` | 14 → 14 | Metadata, form hints, breadcrumbs |
| `--text-base` | `clamp(1.0625rem, 1rem + 0.28vw, 1.125rem)` | 17 → 18 | Body copy |
| `--text-lg` | `clamp(1.1875rem, 1.09rem + 0.42vw, 1.3125rem)` | 19 → 21 | Standfirst, lead paragraph |
| `--text-xl` | `clamp(1.375rem, 1.2rem + 0.78vw, 1.75rem)` | 22 → 28 | H4, card titles |
| `--text-2xl` | `clamp(1.625rem, 1.35rem + 1.22vw, 2.3125rem)` | 26 → 37 | H3 |
| `--text-3xl` | `clamp(1.9375rem, 1.5rem + 1.94vw, 3.0625rem)` | 31 → 49 | H2 |
| `--text-4xl` | `clamp(2.3125rem, 1.65rem + 2.94vw, 4.0625rem)` | 37 → 65 | H1 |
| `--text-hero` | `clamp(2.625rem, 1.7rem + 4.1vw, 5.375rem)` | 42 → 86 | Homepage H1 only |

### 4.3 Weight, height, tracking

| Token | Value |
|---|---|
| `--weight-regular` / `-medium` / `-semibold` / `-bold` / `-black` | 400 / 500 / 600 / 700 / 900 |
| `--leading-tight` | 1.1 — hero and H1 |
| `--leading-snug` | 1.2 — H2, H3 |
| `--leading-normal` | 1.5 — UI text, cards, lists |
| `--leading-relaxed` | 1.6 — body serif |
| `--tracking-tight` | `-0.02em` — display ≥ `--text-3xl` |
| `--tracking-normal` | `0` |
| `--tracking-wide` | `0.08em` — eyebrow labels in caps |

### 4.4 Element defaults

| Element | Family | Size | Weight | Leading | Colour |
|---|---|---|---|---|---|
| `h1` | display | `--text-4xl` | 700 | tight | heading |
| `h2` | display | `--text-3xl` | 700 | snug | heading |
| `h3` | display | `--text-2xl` | 600 | snug | heading |
| `h4` | display | `--text-xl` | 600 | snug | heading |
| Standfirst | body | `--text-lg` | 400 | relaxed | secondary |
| `p` (article) | body | `--text-base` | 400 | relaxed | body |
| `p` (UI/card) | ui | `--text-base` | 400 | normal | body |
| `small`, caption | ui | `--text-xs` | 400 | normal | muted |
| Eyebrow | ui | `--text-sm` | 600 | normal | accent, caps, `--tracking-wide` |
| Button | ui | `--text-base` | 600 | 1 | per variant |
| Blockquote | body | `--text-lg` | 400 | relaxed | heading |

### 4.5 Measure

| Token | Value | Use |
|---|---|---|
| `--measure-prose` | `68ch` | Article and long-form body |
| `--measure-narrow` | `52ch` | Standfirst, pull quotes |
| `--measure-wide` | `88ch` | Introductory paragraphs at large sizes |

Enforced with `max-inline-size`. Line length is the single largest readability variable and
the one most often left to chance.

### 4.6 Typographic rules

- Sentence case for headings. Caps only for eyebrows, at `--tracking-wide`.
- Never `text-align: justify` — it produces rivers at these measures and destroys ragging
  control on mobile.
- Never centre more than three lines of text.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body, with the natural fallback.
- Curly quotes and true apostrophes in content. Real en/em dashes.
- `font-variant-numeric: tabular-nums` in tables and statistic blocks so figures align.
- Hyphenation off for display, `auto` for justified-free body at narrow viewports.

---

## 5. Grid, containers and layout

### 5.1 Breakpoints

Named for content, not device. Content-out, not device-in.

| Token | Min-width | Columns | Gutter | What changes |
|---|---|---|---|---|
| *(base)* | 0 | 4 | 16px | Single column. Everything stacks |
| `--bp-sm` | 480px | 4 | 20px | Two-up small cards |
| `--bp-md` | 768px | 8 | 24px | Two-column layouts; footer 2×2 |
| `--bp-lg` | 1024px | 12 | 32px | Desktop nav; three-up grids; sidebars |
| `--bp-xl` | 1280px | 12 | 32px | Max content width reached |
| `--bp-2xl` | 1536px | 12 | 40px | Wider gutters only |

Mobile-first. Only `min-width` queries.

### 5.2 Containers

| Token | Max-width | Use |
|---|---|---|
| `--container-prose` | 720px | Article body |
| `--container-narrow` | 960px | Forms, focused pages |
| `--container-default` | 1200px | Standard page content |
| `--container-wide` | 1440px | Photo grids, galleries |
| `--container-full` | none | Full-bleed photography and dark bands |

Inline padding: `--space-4` at base, `--space-6` from `--bp-md`, `--space-8` from `--bp-lg`.

> **`--gutter` implements this line, not § 5.1's Gutter column.** The two are different
> measurements and the shared word is a trap: § 5.1's column is the space *between grid columns*;
> this line is the container's *inline padding*, which is what the `--gutter` token carries
> (`global.css` → `.container { padding-inline: var(--gutter) }`). They legitimately differ —
> 24px between columns at `--bp-md` while the page holds 32px off each edge. Implemented in
> WUFPA-080; the middle step had been missing since WUFPA-009, so `--gutter` went 16px → 64px in
> one jump and every tablet-width viewport used a phone's edge padding.

### 5.3 Layout primitives

Six primitives cover essentially every layout on this site. Prefer them to bespoke grids.

| Primitive | Behaviour |
|---|---|
| **Stack** | Vertical flow with one gap token. The default |
| **Cluster** | Horizontal wrap with gap. Tags, meta rows, button groups |
| **Grid** | `repeat(auto-fit, minmax(<min>, 1fr))`. Column count follows available space, so it needs no breakpoints |
| **Sidebar** | Content + aside; the aside drops below at a content-driven threshold using `flex-basis` + `flex-wrap`, not a media query |
| **Switcher** | Equal columns above a threshold, stacked below. For 2–3 item rows |
| **Frame** | Fixed aspect ratio for media, with `object-fit: cover` and configurable `object-position` |

**Use CSS Grid for two-dimensional layout, Flexbox for one-dimensional.** Do not nest four
levels of flex to achieve a grid.

### 5.4 Aspect ratios

| Token | Ratio | Use |
|---|---|---|
| `--ratio-hero` | 16 / 9 desktop, 4 / 5 mobile | Hero imagery |
| `--ratio-wide` | 16 / 9 | Group photographs — the archive's dominant shape |
| `--ratio-landscape` | 3 / 2 | Card images |
| `--ratio-portrait` | 3 / 4 | Leadership portraits |
| `--ratio-square` | 1 / 1 | Avoid for group photographs — it decapitates them |

Every image element reserves its ratio before load. Layout shift budget is zero.

### 5.5 Radius, shadow, border

| Token | Value | Use |
|---|---|---|
| `--radius-none` | 0 | Full-bleed media, dark bands |
| `--radius-sm` | 2px | Tags, chips, inputs |
| `--radius-md` | 4px | Buttons, cards |
| `--radius-lg` | 8px | Modals, large panels |
| `--radius-full` | 9999px | Avatars only |

| Token | Value | Use |
|---|---|---|
| `--shadow-none` | none | Default. Most surfaces need no shadow |
| `--shadow-sm` | `0 1px 2px rgba(35,31,32,0.06), 0 1px 3px rgba(35,31,32,0.08)` | Raised card on hover |
| `--shadow-md` | `0 4px 8px rgba(35,31,32,0.06), 0 8px 24px rgba(35,31,32,0.10)` | Dropdown, popover |
| `--shadow-lg` | `0 12px 24px rgba(35,31,32,0.10), 0 24px 48px rgba(35,31,32,0.12)` | Modal |

Shadows are tinted with the brand black, not pure black — a pure-black shadow on a warm
neutral ground reads as grey dirt. **Prefer a 1px border to a shadow.** Borders are cheaper,
crisper, and hold up better against photography.

---

## 6. Elevation and z-index

A fixed ladder. No arbitrary `z-index: 9999`.

| Token | Value | Layer |
|---|---|---|
| `--z-base` | 0 | Page content |
| `--z-raised` | 10 | Hovered cards, sticky sub-nav |
| `--z-sticky` | 100 | Sticky header |
| `--z-dropdown` | 200 | Nav panels, selects |
| `--z-overlay` | 300 | Backdrop |
| `--z-modal` | 400 | Modal, mobile menu |
| `--z-toast` | 500 | Notifications |
| `--z-skiplink` | 600 | Skip link, always on top when focused |

---

## 7. Component foundations

Full specifications: [08_COMPONENT_LIBRARY.md](08_COMPONENT_LIBRARY.md). This section
defines the shared behaviour every component inherits.

### 7.1 Buttons

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| **Primary** | `--action-primary-bg` | white | none | One per page. "Become a member" |
| **Secondary** | transparent | `--text-heading` | 1.5px `--action-secondary-border` | Supporting actions |
| **Tertiary / text** | none | `--link` | none, underlined | Inline, low emphasis |
| **Inverse** | white | `--text-heading` | none | On `--surface-inverse` |

| Size | Height | Inline padding | Text |
|---|---|---|---|
| `sm` | 40px | `--space-4` | `--text-sm` |
| `md` *(default)* | 48px | `--space-5` | `--text-base` |
| `lg` | 56px | `--space-6` | `--text-base` |

**Rules:**

- Minimum target **44 × 44px** (WCAG 2.5.8 Target Size — Minimum). `sm` therefore needs
  vertical padding or spacing to reach 44px of hit area even at 40px visual height.
- **Primary button labels are ≥17px at weight 600.** White on `#ED1B24` is 4.39:1 — it
  qualifies as large text only at ≥19px bold / ≥24px regular. At 17px/600 this is
  *borderline*, so the specified treatment is 17px semibold **with the button verified in
  audit**; if any doubt, the label goes to 18px/700. This is the one place in the system
  where the brand red is doing work near its contrast limit and it must be checked, not
  assumed.
- Never a link styled as a button when it navigates, or a button when it submits. `<a>`
  navigates, `<button>` acts.
- Never disable the primary submit while a form is incomplete — show errors on submit
  instead. A disabled button gives the user nothing to act on.

### 7.2 Forms

| Property | Value |
|---|---|
| Input height | 48px minimum |
| Input padding | `--space-3` block, `--space-4` inline |
| Border | 1px `--line-default`; `--line-strong` on hover; 2px `--focus-ring` on focus |
| Radius | `--radius-sm` |
| Label | Above the field, always visible, `--text-sm`, weight 600 |
| Hint | Below label, `--text-sm`, `--text-muted` |
| Error | Below field, `--feedback-error`, with icon and text |
| Required | The word "Required" in the label — never a bare asterisk |

**Rules:**

- **Labels are never placeholders.** Placeholder-only labels disappear on input, fail for
  screen readers, and fail memory.
- Every input has a programmatically associated `<label>`.
- Errors are announced (`aria-live="polite"`), associated (`aria-describedby`), and the
  first invalid field receives focus on failed submit.
- Errors appear on blur or submit — never on every keystroke.
- `autocomplete` on every field that has a standard token (1.3.5).
- Correct `inputmode` and `type` so mobile keyboards are right — `type="email"`,
  `inputmode="tel"`.
- Font size ≥16px on inputs, or iOS zooms the page on focus.
- Group related fields in `<fieldset>` with `<legend>`.
- Never rely on colour alone for validity (1.4.1).

### 7.3 Cards

Base: `--surface-page`, 1px `--line-subtle`, `--radius-md`, padding `--space-5` → `--space-6`.

**Rules:**

- **The whole card is one link, or the card contains links — never both.** Nested
  interactive elements break keyboard navigation and screen-reader output.
- For a fully-clickable card, use the pseudo-element overlay technique on a real anchor
  around the heading, so the accessible name is the heading and the hit area is the card.
- Hover: `--shadow-sm` and a `--line-default` border. No transform, no scale — movement on a
  grid of cards causes visual noise and re-triggers hover.
- Image cards reserve their aspect ratio before load.
- A card is not a container for anything that is not a discrete, linkable entity.

### 7.4 Tables

Used for the governance rosters and any tabular data.

| Property | Value |
|---|---|
| Header | `--surface-muted`, weight 600, `--text-sm`, left-aligned |
| Cell padding | `--space-3` block, `--space-4` inline |
| Row rule | 1px `--line-subtle` |
| Numbers | `tabular-nums`, right-aligned |

**Rules:**

- Real `<table>` with `<caption>`, `<thead>`, `<th scope="col|row">`. Never a div grid.
- **Responsive strategy: horizontally scrollable container** — `overflow-x: auto`,
  `tabindex="0"`, an accessible name, and a visible scroll affordance. Do not reflow tables
  into stacked cards; the roster tables have four columns and reflow makes them harder to
  scan, not easier.
- Zebra striping only above five rows, and using `--surface-subtle` so it does not compete.

### 7.5 Navigation

Header: `--surface-page`, 1px `--line-subtle` bottom border, sticky, compact on scroll
(72px → 60px). Solid from the start — never transparent over photography.

| State | Treatment |
|---|---|
| Default | `--text-body`, weight 500 |
| Hover | `--text-heading`, 2px `--line-accent` underline |
| Current page | `--text-heading`, weight 600, 2px `--line-accent` underline, `aria-current="page"` |
| Focus | Focus ring per § 8.1 |

Dropdown panels: `--surface-page`, `--shadow-md`, opens on hover **and** on focus/click,
closes on `Escape`, returns focus to the trigger.

### 7.6 Footer

`--surface-inverse`, `--text-on-inverse`. Four columns → 2×2 at `--bp-md` → stacked at base.
Padding `--space-8` block → `--space-9`. Links `--text-muted-on-inverse`, white on hover,
always underlined on hover and focus.

---

## 8. Accessibility foundations

Full checklist: [16_SEO_ACCESSIBILITY.md](16_SEO_ACCESSIBILITY.md) and
[17_QA_CHECKLIST.md](17_QA_CHECKLIST.md). These are the system-level requirements.

### 8.1 Focus

```
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}
```

- **Never `outline: none` without an equally visible replacement.** The prototype removes
  focus styling and provides nothing (X23).
- 3px at `#ED1B24` against white is 4.39:1 — above the 3:1 required for non-text contrast
  (1.4.11).
- On `--surface-inverse`, the ring switches to `#FFFFFF`.
- `:focus-visible`, not `:focus`, so mouse users do not see rings on click — but keyboard
  users always do.
- Focus order follows DOM order. No positive `tabindex`.

### 8.2 Targets and input

- Minimum 44 × 44px for every interactive target (2.5.8), with ≥8px between adjacent targets.
- Everything operable by keyboard alone (2.1.1). No `onmouseover`-only behaviour (X28).
- No keyboard trap (2.1.2). Modals and the mobile menu trap focus deliberately and release
  it on `Escape`, returning focus to the trigger.
- Nothing depends on hover to be discoverable.

### 8.3 Contrast

| Content | Minimum |
|---|---|
| Body text | 4.5:1 |
| Large text (≥24px, or ≥19px bold) | 3:1 |
| UI components, focus rings, borders that convey state | 3:1 |
| Decorative graphics | none |

**Text over photography** is only permitted with a scrim that guarantees the ratio at the
text's actual position — measured, not assumed. Prefer placing text beside or below a
photograph rather than on it.

### 8.4 Structure

One `<h1>` per page; no skipped levels. Landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`,
`<footer>`, with `aria-label` where a type repeats. Skip link first in the DOM. `<html lang="en-UG">`.

### 8.5 Motion

Tokens in § 9. `prefers-reduced-motion: reduce` is honoured globally:

```
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This global reset is a floor, not a substitute for designing reduced-motion variants of
anything meaningful.

### 8.6 Content is never hidden pending JavaScript

Reveal animations enhance content already present and already visible. The prototype sets
`opacity: 0` on most of the page and reveals it via IntersectionObserver, so a JS failure
leaves a blank page (X20). Correct pattern: content is visible by default; a `js-enabled`
class on `<html>` opts into the animated entrance.

---

## 9. Motion tokens

Principles: [03 § 10](03_BRAND_GUIDELINES.md#10-motion-principles).

| Token | Value |
|---|---|
| `--duration-instant` | 100ms |
| `--duration-fast` | 160ms — hover, focus, small state |
| `--duration-base` | 240ms — disclosure, dropdown |
| `--duration-slow` | 360ms — entrance, modal |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` — entering |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` — exiting |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` — moving within view |
| `--reveal-distance` | 16px |
| `--stagger` | 60ms, max 5 items |

Animate `transform` and `opacity` only. Animating `height`, `width`, `top` or `max-height`
forces layout on every frame — the prototype animates `max-height` on every leadership
disclosure `[SITE]`, which is both janky and leaves collapsed content in the accessibility
tree (X27).

---

## 10. Responsive behaviour

### 10.1 Principles

1. **Mobile-first, in earnest.** The majority audience is on a mid-range Android phone
   (constraint C1). Mobile is the design, not the adaptation.
2. **Content-driven breakpoints.** A breakpoint exists where the layout breaks, not where a
   popular device is.
3. **Prefer intrinsic layout to breakpoints.** `auto-fit`/`minmax`, `clamp()`, `flex-wrap`
   and container queries remove most media queries entirely.
4. **Container queries for components.** A card in a sidebar and the same card in a
   three-up grid should respond to *their* width, not the viewport's.
5. **Never hide content on mobile.** Reorder, collapse behind a disclosure, or paginate —
   but the mobile user gets the same information. Hiding is the most common accessibility
   regression in responsive work.

### 10.2 Behaviour by pattern

| Pattern | Base | `--bp-md` | `--bp-lg` |
|---|---|---|---|
| Header nav | Hamburger + full-screen panel | Hamburger | Full horizontal nav |
| Hero | Stacked, image `4/5`, text below | Stacked, image `16/9` | Side-by-side or full-bleed with overlay text |
| Proof band | 2 × 2 | 4 across | 4 across, larger |
| Programme cards | 1 column | 2 columns | 3 columns |
| Region cards | 1 column | 2 columns | 3 columns |
| Leadership | 1 column | 2 columns | 3–4 columns |
| Roster tables | Horizontal scroll | Horizontal scroll | Full width |
| Gallery | 1 column | 2 columns | 3 columns, masonry-ish |
| Article | Single column, prose measure | Single column | Single column + right-hand contents |
| Footer | Stacked | 2 × 2 | 4 columns |
| Forms | Full width | Full width, narrow container | Two-up for short paired fields |

### 10.3 Images

- `srcset` + `sizes` on every content image, with real breakpoints.
- AVIF → WebP → JPEG fallback chain.
- `width` and `height` always set. Zero layout shift.
- `loading="lazy"` on everything below the fold; `fetchpriority="high"` on the LCP image
  only.
- `object-position` tuned per image so faces survive responsive crops
  ([12_MEDIA_LIBRARY.md](12_MEDIA_LIBRARY.md) records the value per asset).

---

## 11. Dark mode strategy

**Recommendation: do not ship dark mode in Release 1.0. Architect for it; add it in a later
phase if there is demand.**

The reasoning, since this is a decision that will be questioned:

| Against, now | Detail |
|---|---|
| The photography is daylight documentary | 70+ bright, high-key outdoor photographs against a near-black ground look like light leaks. The archive would need per-image treatment |
| The logo needs work first | Only a JPEG-on-white exists. A dark theme requires the reverse SVG, which is itself a pending deliverable ([03 § 8.2](03_BRAND_GUIDELINES.md#82-required-production-work)) |
| The brand red is worse on dark | `#ED1B24` on `#231F20` is 3.71:1 — every red element needs a second value (`red-300`), which is a parallel palette to design, test and maintain |
| It doubles the QA surface | Every contrast pair, every state, every component, tested twice — against constraint C4 (thin capacity) |
| Low audience benefit | Dark mode's strongest case is long reading sessions in dark rooms. This site's dominant session is a short daytime visit from a social link |

**What is done now instead**, so that adding it later costs days rather than a rebuild:

1. **All colour is referenced through semantic tokens** (§ 1). A dark theme is a second set
   of values for the same token names, not a new stylesheet.
2. **Tokens are declared on `:root`** and scoped so a `[data-theme="dark"]` selector can
   override the whole set in one place.
3. **`color-scheme: light` is declared**, so form controls and scrollbars render correctly
   and the browser does not apply its own auto-darkening.
4. **The inverse surface tokens already exist** (`--surface-inverse`,
   `--text-on-inverse`, `--text-accent-on-inverse`) because dark bands are used within the
   light design. That is a working, tested dark palette in miniature.
5. **No colour is hard-coded in a component.**

**When it would become worth doing:** if analytics show a majority of sessions are evening
or night; if a member portal ships (long, repeated sessions); or if WUFPA asks. At that
point the work is a token set, the reverse logo, per-image checking of the gallery, and a
QA pass — a contained piece of work rather than a redesign.

---

## 12. Print styles

Cheap, and genuinely used: audience A2 prints pages for funding files, and audience A4 prints
for reference.

- White background, black text, no dark bands.
- Hide: navigation, footer navigation, search, forms, decorative imagery, share controls.
- Expand all disclosures.
- Show link destinations after link text: `a[href^="http"]::after { content: " (" attr(href) ")" }`.
- Keep: logo, headings, body, tables, photographs with captions.
- `page-break-inside: avoid` on cards, table rows and figures.

---

## 13. Naming conventions

| Layer | Convention | Example |
|---|---|---|
| CSS custom property | `--[category]-[role]-[variant]` | `--text-accent-on-inverse` |
| Component class | BEM-ish, single hyphen for block, `__` element, `--` modifier | `.card__title`, `.button--secondary` |
| Utility | `.u-` prefix | `.u-visually-hidden` |
| State | `.is-` / `.has-` | `.is-open`, `.has-error` |
| Data attribute for JS hooks | `data-*` | `data-nav-toggle` |

**JavaScript never targets a styling class.** It targets `data-*`. This keeps refactoring
CSS from silently breaking behaviour.

---

*Document 07 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
