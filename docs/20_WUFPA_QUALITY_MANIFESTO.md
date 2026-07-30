# 20 — The WUFPA Quality Manifesto

*The standard every decision on this project is held to.*

> If you read one document in this repository, read this one. It governs the other nineteen.
> Where any other document conflicts with this one, this one wins.

---

## Why this exists

An earlier attempt at this website contained eight film titles that do not exist, four member
production companies that do not exist, a comedy section joking that WUFPA films are made on a
UGX 50,000 budget, and four photographs of strangers presented as named Ugandan filmmakers.

None of that was written maliciously. It was written to fill a layout.

**That is the failure this document exists to prevent.** Not bad taste, not weak code — the
quiet, well-intentioned substitution of something plausible for something true, because a
section looked empty and a deadline was close.

WUFPA is a real organisation of roughly ten thousand real people. Its entire value to its
members is that it is credible enough to negotiate on their behalf. A website that invents
its members is not a design problem. It is a betrayal of the only thing the organisation has.

---

## The Ten Principles

### 1. Nothing is invented. Ever.

Every fact about WUFPA on this website traces to a supplied source. Not a film title, not a
member company, not a date, not a statistic, not a quotation, not a photograph caption.

If it is not in
[02 § 13](02_ORGANISATION_PROFILE.md#13-facts-approved-for-publication), it does not ship.

**A gap is documented, not filled.** "We don't have that yet" is a professional answer. A
plausible invention is not.

*This is not one principle among ten. It is the one the other nine serve.*

---

### 2. A layout is never a reason.

An empty section does not justify inventing content. It means the section is wrong.

When there is nothing true to put somewhere, the options are: use different true content, use
typography instead of an image, make the section smaller, or delete the section. Filling it is
not on the list.

The same applies to photography, statistics, testimonials and case studies. **The design
serves the content. When they conflict, the content wins and the design changes.**

---

### 3. Every person on this site is real.

No stock photograph of a person appears anywhere, in any context, for any duration, however
temporary.

More than seventy photographs of actual WUFPA members exist
([12_MEDIA_LIBRARY.md](12_MEDIA_LIBRARY.md)). Where none is available, the answer is a
typographic treatment — never a photograph of a different human being.

This matters most where it is most tempting: leadership portraits. Putting a stock photograph
of a stranger under the name of a named Ugandan filmmaker is the single worst thing this
website could do, and it is what the prototype did four times.

---

### 4. Evidence, not adjectives.

WUFPA does not need to be described as credible. It needs to be shown.

> "In 2022 we signed a memorandum of understanding with Sky TV Mbarara. Members' films air on
> TV West, Tayari West TV, GNTV, Lite TV and YoTV."

That sentence does more than any paragraph of adjectives, and every word of it is sourced.

**Dates. Names. Places. Partners. Every time.** The proper noun beats the adjective, always.

---

### 5. Members are colleagues, not beneficiaries.

WUFPA's members own production companies. They write, direct, shoot, edit and sell films. They
are not people being helped.

No "empowering". No "beneficiaries". No "underprivileged creatives". No photographs framed to
evoke pity.

WUFPA's funding case legitimately describes opening opportunities for underrepresented groups
`[P3]` — that is a true statement made to funders about outcomes. It is not how the website
speaks to or about the people it represents.

---

### 6. Accessibility is a requirement, not a phase.

WCAG 2.2 AA. Verified manually, not just by tooling.

Every interactive element keyboard-operable. Every image with considered alt text. Every
contrast pair measured. Every animation reduced-motion-safe. Nothing hidden until JavaScript
runs.

This is not compliance. WUFPA's mission includes people who are excluded by default, and an
inaccessible website is an act of exclusion performed by the organisation that exists to end
it.

---

### 7. Fast is an access issue, not a score.

The person this site is built for is on a mid-range Android phone, on a metered connection,
in daylight, in a district a long way from Kampala.

Every kilobyte is a cost they pay. A heavy site does not merely load slowly — it excludes the
exact rural and semi-urban creatives WUFPA exists to reach.

**Budget: 1.2 MB, 100 KB of JavaScript, LCP under 2.5s on Slow 4G, zero third-party requests.**
These are not targets to approach. They are the definition of the site working.

And the site must work without JavaScript at all, because sometimes it will have to.

---

### 8. Protect people's data as if you knew them.

No personal telephone number. No personal email address. Not for the President, not for a
district coordinator, not anywhere.

The source document contains sixty personal mobile numbers. Publishing them would expose sixty
volunteers to fraud and harassment, and expose WUFPA to liability, in exchange for nothing that
a contact form does not do better.

Consent before publication — for every name, every photograph, every listing. And a design in
which withdrawing consent means deleting one file, not unpicking a template.

---

### 9. Build for the WUFPA that exists.

Not for a WUFPA with a communications department, a content calendar and a full-time editor.

**Design the maintenance burden down until a volunteer officer can carry it.** Event states
that update themselves. Statistics that carry their date. A homepage that degrades gracefully
when nothing is scheduled. Copyright years generated at build.

**The test: is this site still accurate and still credible after twenty-four months with no
edits?** If not, something in it is wrong.

An abandoned website is worse for WUFPA than no website. It says the organisation started
something and stopped.

---

### 10. Every decision has a reason, and the reason is written down.

No change because it looks better. No redesign because the current one is a year old. No
library because it is popular. No section because other organisations have one.

If you cannot state why in a sentence, do not do it. If you can, write it in the relevant
document so the next person does not undo it.

**Preserve good decisions.** The prototype got several things right — the trust sequence, the
leadership disclosure pattern, naming the six sub-regions — and those are carried forward with
credit ([01 § 9.1](01_PROJECT_FOUNDATION.md#91-what-is-good-and-is-being-preserved)). Rebuilding
what already works is as much a failure as keeping what does not.

---

## The tests

Four questions. Any decision on this project should pass all four.

### The Truth Test
**Can I point to the source?**
If not, it does not ship. No exceptions, no "just for now", no "we'll replace it later".

### The Member Test
**Would a filmmaker in Kanungu recognise this as their association?**
Would they see their district? Their craft? People who look like them, in places they know?
Would they feel represented, or described?

### The Funder Test
**Would a programme officer with ninety seconds conclude that this organisation is real,
governed, and still active?**
Can they find the legal status, the named leadership, and a dated delivery record without
hunting?

### The Two-Year Test
**If nobody touches this site for twenty-four months, is it still true?**
Does any page describe a past event as upcoming? Does any statistic silently claim to be
current? Does the copyright year still read correctly?

---

## What "premium" means here

The brief asked for a site that feels premium, editorial, African and authentic. Those words
are used to justify a great deal of decoration, so it is worth being exact.

| Premium is | Premium is not |
|---|---|
| Restraint | Gold |
| Precise typography | Gradients |
| Generous space | Dark mode as a style choice |
| Photography treated with respect | Photography treated with filters |
| Everything working, everywhere, for everyone | Animation |
| Nothing invented | Anything that looks expensive |

**Authenticity here comes from the content being true.** This is an association of Western
Ugandan filmmakers; the site is built from their photographs, their place names, their
partners and their words. That is sufficient. Applied "Africanness" — kente borders, acacia
silhouettes, an ochre palette invented for the occasion — would be decoration added by
outsiders to something that is already the real thing.

---

## Consistency

One typeface family for display, one for reading. One accent colour. One icon set. One spacing
scale. One button label for the primary action, everywhere.

Every value comes from [07_DESIGN_SYSTEM.md](07_DESIGN_SYSTEM.md). A one-off `margin-top: 37px`
is where a design system starts dying, and it never dies all at once.

If the system genuinely cannot express something, extend the system in the document first,
then use it.

---

## Maintainability

Content is modelled as entities with relationships, not written into templates — even where a
collection has four items. That is what makes the 300th member a file instead of a rebuild, and
what makes removing someone who withdraws consent a deletion instead of a search-and-replace.

Content in version control. No database. No server to patch. No vendor that can revoke access.
No dependency without a written reason.

**The next developer is the user of this codebase.** Everything in these twenty documents
exists so that they can arrive in six months and understand not just what was built, but why.

---

## What we will be judged on

Not the visual design. Not the Lighthouse score, though it should be excellent. Not the
technology.

**On whether a filmmaker in Kabale found the association, understood it, and joined.**

**On whether a programme officer in Kampala or Berlin read the site and decided WUFPA was
worth funding.**

**On whether, in three years, the site is still true.**

Everything else in this repository is in service of those three sentences.

---

## The one-line version

> **Show what is real, clearly, to everyone, and never make anything up.**

---

*Document 20 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
