# WUFPA Website — Documentation Repository

**Western Uganda Film Producers Association Ltd (WUFPA)**
Official website documentation and source of truth.

| | |
|---|---|
| **Client** | Western Uganda Film Producers Association Ltd (WUFPA) |
| **Head office** | Mbaguta Street, Mbarara Shopping Market, Mbarara City, Uganda |
| **Documentation version** | 1.1 |
| **Date created** | 25 July 2026 |
| **Status** | Discovery and specification complete. Implementation not started. |
| **Prepared from** | `WUFPA PROFILE 2026.pdf` (24pp), 3 logo files, 4 photographs, existing `index.html` prototype |

---

## 1. What this repository is

This is the **planning and specification layer** for the WUFPA website. It contains no
application code. Every strategic, editorial, visual and engineering decision for the
website is recorded here, with the reasoning behind it and a citation to the source
material it came from.

It exists so that:

- Implementation can begin immediately, without a further planning phase.
- A developer or designer joining in six months can understand the whole project from
  these files alone.
- Decisions are not silently reversed later because nobody remembered why they were made.
- WUFPA can verify that the site says only what WUFPA actually said.

## 2. What this repository is not

- It is **not** the website. The website source will live alongside it (see
  [14_TECHNICAL_ARCHITECTURE.md](14_TECHNICAL_ARCHITECTURE.md)).
- It is **not** a proposal or pitch document. It assumes the project is going ahead.
- It is **not** a substitute for WUFPA's own governance documents. Where this repository
  and WUFPA's constitution, URSB filings or board minutes disagree, WUFPA's documents win.

---

## 3. Project status at a glance

An earlier prototype exists at [index.html](../index.html) — a single-file static page,
approximately 530 lines, dark cinema styling, six sections. It is **not** production
ready and is **not** the baseline for the new build, but it is not being discarded either.

**What the prototype got right and we are keeping:** the underlying section sequence
(who we are → leadership → work → members → evidence), the decision to lead with
leadership credibility, the decision to show scale numerically, and the instinct that the
site should feel like it belongs to a film organisation rather than an NGO.

**What must change before launch:** the prototype contains a significant quantity of
invented content — eight film titles, four member production companies, and every
photograph on the page (all stock imagery from Unsplash, including four stock portraits
presented as named WUFPA leaders). It also uses a brand palette that does not match the
official logo. Full audit in
[01_PROJECT_FOUNDATION.md § 9](01_PROJECT_FOUNDATION.md#9-audit-of-the-existing-prototype).

**This is the single most important thing to understand about this project:** WUFPA's
credibility is its entire product. A trade association that publishes invented member
companies and stock photographs of strangers as its leadership has destroyed the exact
asset the website exists to build. Nothing ships that is not sourced.

---

## 4. Reading order

Read in this order the first time. After that, use it as a reference.

### Tier 1 — Understand the organisation (read before touching anything)

| # | Document | Why you need it |
|---|---|---|
| 01 | [PROJECT_FOUNDATION](01_PROJECT_FOUNDATION.md) | Goals, audiences, scope, constraints, prototype audit |
| 02 | [ORGANISATION_PROFILE](02_ORGANISATION_PROFILE.md) | Who WUFPA is. The unified, de-duplicated source of truth |

### Tier 2 — Understand the intent

| # | Document | Why you need it |
|---|---|---|
| 06 | [WEBSITE_STRATEGY](06_WEBSITE_STRATEGY.md) | Why the site is shaped the way it is |
| 03 | [BRAND_GUIDELINES](03_BRAND_GUIDELINES.md) | Voice, colour, type, photography, logo rules |
| 05 | [INFORMATION_ARCHITECTURE](05_INFORMATION_ARCHITECTURE.md) | Sitemap, navigation, journeys |

### Tier 3 — Build from these

| # | Document | Why you need it |
|---|---|---|
| 04 | [CONTENT_BIBLE](04_CONTENT_BIBLE.md) | Every word of web copy, ready to paste |
| 07 | [DESIGN_SYSTEM](07_DESIGN_SYSTEM.md) | Tokens, grid, type scale, states |
| 08 | [COMPONENT_LIBRARY](08_COMPONENT_LIBRARY.md) | Every reusable component spec |
| 12 | [MEDIA_LIBRARY](12_MEDIA_LIBRARY.md) | Every asset, where it goes, what is missing |
| 13 | [FUNCTIONAL_REQUIREMENTS](13_FUNCTIONAL_REQUIREMENTS.md) | What the site must do |
| 14 | [TECHNICAL_ARCHITECTURE](14_TECHNICAL_ARCHITECTURE.md) | Stack, structure, standards |

### Tier 4 — Subject-matter detail (reference as needed)

| # | Document |
|---|---|
| 09 | [PROGRAMMES_AND_EVENTS](09_PROGRAMMES_AND_EVENTS.md) |
| 10 | [MEMBERSHIP](10_MEMBERSHIP.md) |
| 11 | [TEAM_AND_LEADERSHIP](11_TEAM_AND_LEADERSHIP.md) |

### Tier 5 — Ship and sustain

| # | Document |
|---|---|
| 15 | [IMPLEMENTATION_ROADMAP](15_IMPLEMENTATION_ROADMAP.md) |
| 16 | [SEO_ACCESSIBILITY](16_SEO_ACCESSIBILITY.md) |
| 17 | [QA_CHECKLIST](17_QA_CHECKLIST.md) |
| 18 | [DEPLOYMENT_AND_MAINTENANCE](18_DEPLOYMENT_AND_MAINTENANCE.md) |
| 19 | [FUTURE_ROADMAP](19_FUTURE_ROADMAP.md) |

### Tier 6 — The standard everything is held to

| # | Document | Why you need it |
|---|---|---|
| 20 | [WUFPA_QUALITY_MANIFESTO](20_WUFPA_QUALITY_MANIFESTO.md) | What is true, and what is never invented |
| 21 | [DIGITAL_EXPERIENCE_FRAMEWORK](21_DIGITAL_EXPERIENCE_FRAMEWORK.md) | How the true thing is presented — craft standard, experience intent, guardrails |

**If you read only two documents**, read `02_ORGANISATION_PROFILE.md` and
`20_WUFPA_QUALITY_MANIFESTO.md`. The first tells you what is true; the second tells you
what "good" means here.

**Before designing or building any page**, read
[21_DIGITAL_EXPERIENCE_FRAMEWORK.md](21_DIGITAL_EXPERIENCE_FRAMEWORK.md) as well. Its
Four-Part Experience Formula (§ 2) must be answerable for the page *before* implementation
starts, and its per-page experience intent (§ 2.3) is an acceptance criterion, not a mood
note. Where 20 and 21 appear to conflict, 20 wins — 20 governs truth, 21 governs craft.

---

## 5. Folder structure

Current state of the repository:

```
WUFPA/
├── index.html                  Legacy prototype. Superseded — see §3.
├── docs/                       ← THIS DOCUMENTATION SET
├── client-archive/originals/   Client-supplied raw assets. NEVER PUBLISHED.
│   ├── WUFPA PROFILE 2026.pdf              Primary source, 24pp, 28 MB — UNREDACTED
│   ├── WUFPA  LOGO 2023.jpg.jpeg           Primary logo, 1515×1529
│   ├── WhatsApp Image … 00.10.53.jpeg      Logo variant, 1280×1221
│   ├── WhatsApp Image … 00.10.53 (1).jpeg  WUFM SACCO logo, 1229×984
│   ├── IMG_9788.JPG.jpeg                   Tooro workshop, 2400×1600
│   ├── IMG-20210304-WA0096.jpg.jpeg        Certificate presentation, 1080×810
│   ├── IMG-20230711-WA0206.jpg.jpeg        Bunyoro workshop, 1080×810
│   └── WUFPA MEMBERSHIP CERTIFICATE (1).jpg.jpeg  Pioneers 2017 (see note below)
├── public/                     STATIC PASSTHROUGH — everything here IS published
│   └── downloads/              Redacted profile PDF only
├── scripts/                    Reproducible media and guard tooling
└── src/                        Website source — see 14 § 4
```

Full target structure: [14_TECHNICAL_ARCHITECTURE.md § 4](14_TECHNICAL_ARCHITECTURE.md#4-folder-structure).

> **`client-archive/` is deliberately outside `public/`.** Astro publishes everything under
> `public/` verbatim, so an earlier placement of the originals there put the **unredacted**
> profile PDF — carrying ~60 personal mobile numbers — straight into the build output.
> [`scripts/check-no-personal-data.mjs`](../scripts/check-no-personal-data.mjs) now fails the
> build if it ever recurs.
>
> Treat these files as a read-only archive. Filenames are inconsistent (double extensions,
> WhatsApp defaults) and one is misleading: `WUFPA MEMBERSHIP CERTIFICATE (1).jpg.jpeg` is not
> a certificate template, it is the 2017 pioneers group photograph. Do **not** rename the
> originals — the renaming convention in [12_MEDIA_LIBRARY.md](12_MEDIA_LIBRARY.md) applies to
> derived working copies only, so the chain back to what the client actually sent is never
> broken.

---

## 6. Source citation convention

Every factual claim in this documentation carries a source tag. If a statement about WUFPA
has no tag, it is an interpretation, and it will say so.

| Tag | Source |
|---|---|
| `[P1]` … `[P24]` | `WUFPA PROFILE 2026.pdf`, page number |
| `[LOGO-A]` | `WUFPA  LOGO 2023.jpg.jpeg` — primary logo |
| `[LOGO-B]` | `WhatsApp Image 2026-07-25 at 00.10.53.jpeg` — logo variant |
| `[LOGO-C]` | `WhatsApp Image 2026-07-25 at 00.10.53 (1).jpeg` — WUFM SACCO logo |
| `[PH-1]` | `IMG-20210304-WA0096.jpg.jpeg` |
| `[PH-2]` | `IMG-20230711-WA0206.jpg.jpeg` |
| `[PH-3]` | `IMG_9788.JPG.jpeg` |
| `[PH-4]` | `WUFPA MEMBERSHIP CERTIFICATE (1).jpg.jpeg` |
| `[SITE]` | The existing `index.html` prototype |
| *(untagged)* | Agency recommendation or interpretation, not client-supplied fact |

Three markers are used throughout:

- **`⚠ GAP`** — information the website needs that no supplied file contains. Never fill
  these by guessing. They are collected in
  [01_PROJECT_FOUNDATION.md § 10](01_PROJECT_FOUNDATION.md#10-open-questions-for-wufpa).
- **`⚠ CONFLICT`** — two supplied sources disagree. Resolution is proposed but needs WUFPA
  sign-off.
- **`⚠ VERIFY`** — a fact that was true when the source was written but may have expired
  (typically dated events now in the past).

---

## 7. How to use this documentation

**If you are writing copy** — everything you need is in `04_CONTENT_BIBLE.md`. Do not
write new copy from scratch; extend the Content Bible and keep the two in sync.

**If you are designing a screen** — start with `06_WEBSITE_STRATEGY.md` to understand what
the page is *for*, then `05_INFORMATION_ARCHITECTURE.md` for its place in the whole, then
`07_DESIGN_SYSTEM.md` for the tokens. Do not invent a new spacing value or colour.

**If you are writing code** — `14_TECHNICAL_ARCHITECTURE.md` for structure and standards,
`08_COMPONENT_LIBRARY.md` for what to build, `13_FUNCTIONAL_REQUIREMENTS.md` for
behaviour, `16_SEO_ACCESSIBILITY.md` for the non-negotiables.

**If you are about to add a fact about WUFPA to the site** — it must already exist in
`02_ORGANISATION_PROFILE.md` with a source tag. If it does not, stop and ask WUFPA. This
rule has no exceptions and is the reason the prototype has to be rebuilt.

---

## 8. Versioning strategy

**Documentation versioning is semantic and independent of the website's release version.**

| Change | Bump | Example |
|---|---|---|
| **Major** (`2.0`) | A decision recorded here is reversed, or the site's purpose/IA changes structurally | Dropping the member portal from the roadmap; changing the primary audience |
| **Minor** (`1.1`) | New section, new page specified, new programme documented, a `⚠ GAP` closed with real information | WUFPA supplies the film catalogue; Awards Gala outcome confirmed |
| **Patch** (`1.0.1`) | Typos, clarifications, broken links, formatting | Fixing a mis-stated hex value |

Rules:

1. **Every document carries a version footer** with version, date, and what changed.
   The version in this README is the version of the set as a whole.
2. **Changes are made by editing, not appending.** Do not leave superseded guidance in
   place with a note saying it is superseded — delete it and record the change in the
   footer. Stale documentation is worse than no documentation because it is trusted.
3. **`⚠ GAP` and `⚠ CONFLICT` markers are removed only when WUFPA confirms the answer in
   writing**, and the confirmation date is recorded next to the fact.
4. **Git history is the changelog.** Commit messages reference the document number, e.g.
   `docs(04): rewrite membership CTA after WUFPA fee confirmation`.
5. **Review cadence:** the full set is re-read at the end of every implementation phase
   defined in `15_IMPLEMENTATION_ROADMAP.md`, and at minimum every six months after
   launch. A document that has not been read in a year is not a source of truth, it is an
   archive.

---

## 9. Ground rules for anyone working on this project

These are expanded in [20_WUFPA_QUALITY_MANIFESTO.md](20_WUFPA_QUALITY_MANIFESTO.md).
In short:

1. **Never invent a fact about WUFPA.** Not a film title, not a member company, not a
   date, not a statistic. If it is not sourced, it does not ship.
2. **Never use a stock photograph of a person.** More than 70 real photographs of real
   WUFPA members are recoverable from the supplied profile PDF. Using a stock portrait of a
   stranger to represent a Ugandan filmmaker is the single worst thing this website could
   do.
3. **Every recommendation has a reason.** If you cannot state why, do not change it.
4. **Accessibility is a requirement, not a phase.** WCAG 2.2 AA.
5. **Assume a mid-range Android phone on a metered 3G connection.** That is the actual
   member. Performance is an access issue here, not a score.

---

*Document 00 of 21 · Version 1.1 · 31 July 2026*

*v1.1 — Minor. Added [21_DIGITAL_EXPERIENCE_FRAMEWORK.md](21_DIGITAL_EXPERIENCE_FRAMEWORK.md),
the craft and experience standard supplied by WUFPA on 31 July 2026, and added it to the reading
order as Tier 6 alongside document 20. Precedence recorded: 20 governs truth, 21 governs craft,
20 wins on conflict. One conflict between the framework's own prose and the
[03 § 3](03_BRAND_GUIDELINES.md) banned-words list resolved in 21 § 16.3 with no change to
either rule. One new `⚠ GAP`: the reference images named in the supplied brief were not
attached (21 § 2.2). Also corrected this footer's version, which read 1.0.1 while the header
table read 1.0.2 — 1.0.2 was the accurate figure and is superseded by this bump.*

*v1.0.1 — Patch. Corrected finding X17 in
[01_PROJECT_FOUNDATION.md § 9.4](01_PROJECT_FOUNDATION.md#94-major--accessibility): the claim
that `--muted #888` fails contrast was incorrect (measured 5.75:1, a pass) and has been replaced
with the two genuine failures. No other document affected.*
