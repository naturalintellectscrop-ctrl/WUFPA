# 22 — Experience Formulas

*One section per route. Working rule **R11**: no page is built before its formula is stated.*

> **This is a register, not a plan.** It records the four-part formula
> ([`21 § 2`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md)) for each route, plus a fifth part —
> recomposition — that turns the framework's intent into something a reviewer can fail a page on.
> Routes are keyed to `src/lib/page-meta.ts` so `scripts/check-framework.mjs` (WUFPA-084, guard
> #1) can assert that every route ships with one.
>
> **Identity entries must name a mechanism.** "Trustworthy" is not an entry. "Trustworthy — via
> the registration date in the first screen, not via an adjective" is.
>
> **One reference institution per page, for one attribute.** [`21 § 2.2`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md)
> forbids blending the four named references; naming exactly one is the enforcement.

---

## `/about/`

**Task:** WUFPA-034 · **Formula stated:** 31 July 2026 · **Copy source:** [`04 § 4`](04_CONTENT_BIBLE.md)

### Identity

- **Trustworthy** — via the registration fact ("registered on 4 September 2017 as a company
  limited by guarantee") appearing in the first screen as a sourced KeyFacts entry, not as prose
  the reader is asked to take on faith.
- **Editorial** — via Prose at `--measure-prose` (68ch) with vision and mission set as verbatim
  pull-quotes, distinct in weight from the narrative around them. Hierarchy before colour
  ([`21 § 10`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md)).
- **Authentic** — via the five core objectives being WUFPA's own words from `[P1]`.
  **Corollary: there is no values section.** [`02 § 5.3`](02_ORGANISATION_PROFILE.md)'s five
  values are the agency's derivation, not WUFPA's statement, and [`04 § 4.5`](04_CONTENT_BIBLE.md)
  says omit until confirmed. Their absence *is* the identity claim.
- **Timeless** — via carrying no figure that ages. No "since X years", no member count that
  needs a curator. Passes [`21 § 14`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md)'s five-year test.

### Reference

**British Film Institute — institutional credibility only.** Specifically: an About page that
leads with constitutional and legal fact rather than mission language, and treats governing
documents as first-class content instead of footer links.

*Not* the Academy Museum: this page carries no photograph and must not be composed as though it
does.

### Experience intent

[`21 § 2.3`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md): **"Who WUFPA is · Why it exists · Why it
matters."**

**Falsifiable test.** Three people with no prior knowledge read the page for 60 seconds, then
answer without scrolling back: (a) what kind of legal entity is WUFPA? (b) name two things it
exists to do. (c) who benefits? **Pass = 3/3 on (a) and (b), 2/3 on (c).** Record answers, names
and date in Evidence below. A fail means the page is refined — this is an acceptance criterion,
not a mood note.

### Guardrails — this page's specific risks

- **"Never fill space with decorative components."** This page has no photograph, which leaves a
  column that will feel empty on a wide screen. The temptation is a decorative band or a three-up
  card grid. Refused: white space is the correct answer ([`21 § 11`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md)),
  and an empty card grid is [`21 § 2.4`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md)'s "oversized cards
  simply to occupy space".
- **"Never invent statistics."** "300+ production houses" and "over 35 members each" ship only
  because `[P1]` states them. The derived "10,500 creatives" figure is barred (WUFPA-004).
- **"Never use placeholder content."** The six constitutional objects sit in a Disclosure because
  they are *complete and secondary*, not because they are pending.

### Recomposition ([`21 § 12`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md))

- **360** — single column. KeyFacts as a definition list, one pair per row. Objectives as a
  numbered Stack. Disclosure closed.
- **768** — KeyFacts recomposes to two columns: a *different structure*, not a wider list.
  Objectives to a two-column Grid. Measure stays 68ch — **the column does not grow, the margin
  does**. That is the § 11 white-space claim made concrete.
- **1280** — Sidebar promotes KeyFacts to a persistent rail beside the narrative. This is the
  recomposition, not a reflow: the same facts move from *interrupting* the argument to
  *accompanying* it. The Sidebar collapses on a content-driven `flex-basis` threshold, so it stays
  correct inside any container.

### Evidence *(completed at sign-off)*

- Authenticity checklist [`21 § 14`](21_DIGITAL_EXPERIENCE_FRAMEWORK.md): ⟦8 answers, signed⟧
- Intent test: ⟦three readers, answers, date⟧
- Screenshots 360 / 768 / 1280: ⟦attached⟧

---

## Routes awaiting a formula

R11 blocks each of these from being built until its section is written. Listed so the register is
complete in structure before it is complete in content — and so `pageMeta` and this file can be
diffed.

| Route | Task | Photography |
|---|---|---|
| `/` | 023–030 | Evidence-led · **built** — formula owed retrospectively |
| `/about/history/` | 035 | Evidence-led |
| `/about/governance/` | 036 | Evidence-led |
| `/about/legal/` | 037 | Text-led |
| `/leadership/` · `/executive/` · `/trustees/` · `/founders/` | 038 | Evidence-led |
| `/leadership/[slug]/` | 039 | Evidence-led |
| `/programmes/` + six children | 040 | Evidence-led |
| `/regions/` + six children | 041 | Evidence-led |
| `/guilds/` + ten children | 042 | Typographic — no photography exists |
| `/membership/` · `/membership/join/` | 044, 045 | Text-led |
| `/contact/` | 046 | Text-led |
| `/partners/` | 047 | Evidence-led |
| `/sacco/` | 048 | Text-led |
| `/support/` | 049 | Text-led |
| `/news/` · `/events/` | 050, 052 | Mixed |
| `/impact/` | 053 | Evidence-led |
| `/search/` | 073 | None |

---

*Document 22 of 22 · Version 1.0 · 31 July 2026*
*v1.0 — New document. Creates the R11 artifact. `/about/` written in full alongside WUFPA-034;
remaining routes listed but unwritten, each blocking its own page task until stated.*
