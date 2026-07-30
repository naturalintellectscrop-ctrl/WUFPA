# 19 — Future Roadmap

*What comes after Release 1.0, why, and in what order. Written so that nothing here leaks into
the initial build.*

---

## 1. How to read this

Everything in this document is **out of scope for Release 1.0**. It exists for three reasons:

1. So that architectural decisions taken now do not block these later
   ([05 § 8](05_INFORMATION_ARCHITECTURE.md#8-future-expansion),
   [14 § 14](14_TECHNICAL_ARCHITECTURE.md#14-future-scalability)).
2. So that when someone proposes one of these mid-build, there is a documented answer rather
   than a debate.
3. So WUFPA can see where the site is heading and fund it deliberately.

**The governing principle: extend WUFPA's mission, do not overengineer the first release.** A
member portal that nobody logs into is worse than no member portal, because it makes the
organisation look like it tried and stopped.

Each item is scored on **value** (to WUFPA's business goals) and **cost** (effort plus ongoing
burden). Cost includes maintenance, which is where most of these actually get expensive.

---

## 2. Prioritised roadmap

| # | Initiative | Value | Cost | Depends on | Phase |
|---|---|---|---|---|---|
| 1 | Member directory | High | Low | A member register (Q16) | 2 |
| 2 | Member portal | High | High | Directory + a funding decision | 3 |
| 3 | Industry resources library | High | Low | Content from WUFPA | 2 |
| 4 | Funding and opportunities board | High | Low | An owner | 2 |
| 5 | Film database | **Very high** | Medium | Film data (Q11) | 3 |
| 6 | Press kit and media centre | Medium | **Very low** | Q10, Q13 | 2 |
| 7 | Training portal | Medium | Medium | Curriculum content | 3 |
| 8 | Festival and awards management | Medium | High | Q6, an established event | 4 |
| 9 | Local-language content | High | Medium | Translation capacity | 3 |
| 10 | Volunteer management | Low | Medium | A volunteer programme | 4 |
| 11 | Video and moving image | High | Medium | Video assets (Q12) | 2 |
| 12 | Impact measurement | Medium | Medium | Data collection habits | 3 |

**Phase 2** ≈ 3–9 months post-launch · **Phase 3** ≈ 9–24 months · **Phase 4** ≈ beyond.

---

## 3. Phase 2 — the cheap, high-value additions

These need content from WUFPA far more than they need engineering. Each is days of work on
the architecture built in Release 1.0.

### 3.1 Member directory

**What:** a filterable listing of member production companies — by sub-region, district and
craft — with a page per member.

**Why it is first:** it turns "300+ production houses" from a claim into an inspectable fact,
which is the strongest possible answer to a sceptical funder. It simultaneously becomes a
discovery tool: a producer in Kampala or Kigali looking for a cinematographer in Fort Portal
would have somewhere to look, which is precisely the market failure WUFPA exists to correct
([02 § 2](02_ORGANISATION_PROFILE.md#2-why-wufpa-exists)).

**Blocked on:** a register. Minimum viable fields: company name, sub-region, district, craft,
contact route. Not personal contact details — enquiries route through WUFPA.

**Architecture:** already modelled ([14 § 5.1](14_TECHNICAL_ARCHITECTURE.md#51-entities-and-relationships));
routes reserved. Adding 300 members is 300 content files, generated from a spreadsheet.

**Risk to manage:** consent. Three hundred companies must agree to be listed. Handle it as an
opt-in on membership renewal rather than a bulk publication.

### 3.2 Industry resources library

**What:** downloadable practical documents — contract templates, actor release forms, crew
call sheets, copyright registration guidance, a plain-language explanation of URSB
registration, rate guidance.

**Why:** it directly serves the anti-piracy and rights mission `[P4] [P13]`. A filmmaker who
does not know how to register copyright cannot enforce it. This is the cheapest way to convert
WUFPA's advocacy position into a service members use.

**Cost:** low technically; the content is the work. Some of it — a URSB registration
explainer, a copyright primer — WUFPA already knows and has taught in workshops.

### 3.3 Funding and opportunities board

**What:** a listing of open calls — grants, festival deadlines, training places, competition
entries, residencies — with deadlines and links.

**Why:** it gives members a reason to return, which is the one thing a launch site with no
member area lacks. It also positions WUFPA as the channel through which opportunity reaches
Western Uganda, which is close to a definition of what the association is for.

**Architecture:** identical pattern to News. Deadline-derived status, so expired items archive
themselves ([09 § 9.2](09_PROGRAMMES_AND_EVENTS.md#92-status-handling--the-part-that-matters)).

**Requires:** a named owner. This is the one Phase 2 item with a genuine ongoing burden — an
opportunities board full of expired deadlines is worse than none.

### 3.4 Press kit and media centre

**What:** a `/press/` page with the logo pack, approved photographs with usage terms, key
facts, leadership biographies, and a press contact.

**Why:** the highest return per hour of work in this entire document. It costs almost nothing
and it means every journalist writing about Ugandan cinema has correct names, correct dates
and a usable logo — instead of guessing.

**Blocked on:** the redacted profile PDF ([12 § 7](12_MEDIA_LIBRARY.md#7-personal-data-in-the-media)),
photograph usage permissions (Q4), and a press contact (Q3).

### 3.5 Video and moving image

**What:** a small number of well-chosen videos — the President on what WUFPA is; a member on
what changed for them; a workshop in progress; a Kibanda screening.

**Why:** WUFPA is an association of filmmakers with no moving image on its website. That is
noticed, and not favourably.

**Constraints that must hold:** never autoplay · never a background video · captions are
mandatory (1.2.2) · host externally (YouTube — one of WUFPA's own channels `[P3]`) and embed
with a click-to-load facade so no third-party request occurs on page load (constraint C1).

**Cost:** low if WUFPA films it on a phone. Three minutes of honest, captioned footage beats a
polished film that never gets made.

---

## 4. Phase 3 — the substantial builds

### 4.1 Film database

**What:** a searchable catalogue of films produced by WUFPA members — title, year, producer,
director, language, sub-region, synopsis, still, where to watch.

**Why this is the highest-value item in the entire roadmap:** it is the missing infrastructure
of the regional industry. It makes Western Ugandan cinema visible as a body of work rather
than a set of individual efforts; it gives distributors, broadcasters and festival programmers
something to search; and it is the natural companion to the Distributors Group and the
broadcast partnerships WUFPA already has `[P2] [P5]`.

It is also the section the prototype tried to fake with eight invented titles (X2) — which is
a reasonable indication of how obviously the site wants it.

**Blocked on:** film data (Q11). Even a spreadsheet of titles, years and producers would start
this.

**Design note:** this is a catalogue, not a streaming service. Linking to where a film can be
watched — YoTV, TV West schedules, a distributor — serves members. Hosting video does not.

### 4.2 Member portal

**What:** authenticated member area — digital membership card with public verification, the
member register, opportunities and deadlines, resource downloads, guild spaces, and renewal.

**Why:** it converts membership from an annual transaction into an ongoing relationship, and
the digital membership card is genuinely useful — verifiable credentials matter when
approaching a broadcaster, a bank or a district office
([10 § 3.2](10_MEMBERSHIP.md#32-the-certificate-is-worth-emphasising)).

**Why it is not sooner:** it is the first thing in this document that requires a runtime,
authentication, a real member database, and ongoing administration. That is a project with its
own budget and its own operational commitment — not a feature
([01 § 8.2](01_PROJECT_FOUNDATION.md#82-out-of-scope--release-10)).

**Architecture:** build as an adjacent application at `/portal/`, sharing design tokens and
components with the public site but deployed separately, so the public site stays static and
unattackable ([14 § 14](14_TECHNICAL_ARCHITECTURE.md#14-future-scalability)).

**Prerequisites, all of them:** a maintained member register · a membership fee and renewal
process (Q8) · someone at WUFPA who will administer accounts · a funding decision covering
ongoing cost.

### 4.3 Training portal

**What:** structured learning — course listings, applications, materials, a record of
completion, and certificates.

**Why:** training is WUFPA's first core objective `[P1]` and its most frequent activity. A
portal makes it schedulable, applicable-to, and measurable — which in turn produces the
participant numbers that funders ask for and WUFPA cannot currently supply
([09 § 11](09_PROGRAMMES_AND_EVENTS.md#11-gaps-and-content-requests-ranked)).

**Start smaller:** a course listing with an application form, on the public site, is most of
the value for a fraction of the cost. Build that first and see whether it is used.

### 4.4 Local-language content

**What:** key pages in Runyankole-Rukiga and Rutooro-Runyoro at minimum.

**Why:** WUFPA's mission is built on local-language storytelling `[P3]`, and its own members
work in these languages. An English-only website is a defensible launch position and an
uncomfortable permanent one.

**Start with:** the membership pages and the region pages — the content a prospective member
actually needs. Not the whole site.

**Architecture:** locale routing is configured at launch (constraint C7,
[14 § 6](14_TECHNICAL_ARCHITECTURE.md#6-routing)), so this is content work rather than a
rebuild.

**Blocked on:** translation capacity. Machine translation is not acceptable for an
organisation whose credibility rests on cultural rootedness.

### 4.5 Impact measurement

**What:** a published record of outcomes — filmmakers trained, films produced, screenings
held, audiences reached, competitions entered — with method and date.

**Why:** it is the difference between "we ran workshops" and "we trained 340 filmmakers across
six sub-regions between 2022 and 2026". Funders ask for the second; WUFPA currently has the
first.

**The hard part is not the page.** It is WUFPA counting things at the time they happen. The
useful contribution the website can make is to give the counting somewhere to go, and to
publish it honestly — including the years where the numbers are unknown.

**Rule:** every figure published carries its method and its date. No estimate presented as a
count (X13).

---

## 5. Phase 4 — later, if the need proves real

### 5.1 Festival and awards management

Submission, judging, scheduling, results, ticketing for the Western Uganda Film Awards Gala
and the UCC Regional Film Competition.

**Why later:** the UCC competition already has its own process, and duplicating it would
confuse entrants. The Awards Gala needs to be an established annual event before it justifies
a system — and its status is currently unknown (Q6).

**Do the cheap version first:** an event page with clear submission instructions and a
downloadable entry form. If that creaks under volume, build the system.

### 5.2 Volunteer management

Roles, applications, scheduling, recognition.

**Why later:** no supplied source describes a volunteer programme. Building management for a
programme that does not exist is the definition of overengineering. If WUFPA develops one, a
simple listing and enquiry form comes first.

---

## 6. Things deliberately not on this roadmap

Recorded so that "why don't we…" has an answer.

| Not doing | Reason |
|---|---|
| **Streaming platform / VOD** | Rights clearance, hosting cost, bandwidth cost for an audience on metered data, and a market already served by YoTV and regional broadcasters `[P2]`. WUFPA's advantage is organising the industry, not competing with its distribution partners |
| **Social network for members** | Members are already on WhatsApp and Facebook, which work and cost nothing. A private network would fragment the conversation and need moderation WUFPA cannot staff |
| **Mobile app** | A fast, responsive website does everything an app would, works on every device, needs no install over metered data, and needs no app-store maintenance. An app would be a status symbol, not a service |
| **E-commerce / merchandise** | No product, no fulfilment, no evidenced demand |
| **Ticketing** | Only justified once a recurring paid event exists (§ 5.1) |
| **AI features** | No identified problem that AI solves for WUFPA's members better than a well-organised page. Adding one would be fashion, not need |
| **Blockchain credentials** | The digital membership card in § 4.2 solves verification with a URL and a database |
| **Paid membership tiers** | No evidence WUFPA wants tiered membership; it would cut against the explicit inclusion of individuals and community groups `[P2]` |

---

## 7. What must remain true, whatever gets built

Every future phase inherits these. They are not negotiable by a later brief.

1. **Nothing invented.** The sourcing rule applies to every future feature, including
   AI-assisted content, imported data and user-generated submissions.
2. **No stock photographs of people.** Ever.
3. **No personal telephone numbers or personal emails published.**
4. **WCAG 2.2 AA**, at minimum, on everything added.
5. **The performance budget holds.** New features fit within it or justify raising it
   explicitly — constraint C1 does not expire.
6. **Consent before publication**, for every name, photograph and member listing.
7. **URLs never break.** Redirects are added, never removed (goal W4).
8. **Maintenance burden is designed down**, not assumed away. Every new feature answers: who
   maintains this, and what does it look like when they stop?

---

## 8. Decision triggers

When to actually start each item, expressed as an observable condition rather than a date.

| Initiative | Start when |
|---|---|
| Member directory | WUFPA supplies a register of ≥50 members with consent |
| Resources library | WUFPA supplies three usable documents |
| Opportunities board | A named person commits to maintaining it |
| Press kit | Photograph permissions and a press contact exist |
| Video | Any usable footage exists |
| Film database | WUFPA supplies ≥20 film records |
| Member portal | A directory exists, a fee structure exists, and funding for ongoing operation is secured |
| Training portal | The simple course-listing version is being used and is straining |
| Local language | A translator is identified and funded |
| Impact measurement | WUFPA is counting participants at events |
| Festival management | The awards gala has run twice |
| Volunteer management | A volunteer programme exists |

**If a trigger has not fired, the item is not ready — regardless of how good the idea is.**
That is the discipline that keeps this roadmap a plan rather than a wish list.

---

*Document 19 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
