# 06 — Website Strategy

*Why the site is shaped the way it is. Read this before designing anything.*

---

## 1. The strategic problem

WUFPA has an unusual asymmetry: **it is far more credible than it appears.**

The organisation has eight years of documented delivery, roughly 60 named office-holders
across four committees and ten craft guilds, formal legal registration, memoranda of
understanding with broadcasters, working relationships with a national regulator, two
foreign missions, two European cultural institutes and UNESCO's national commission, a
registered savings cooperative, and photographic evidence of nearly all of it `[P2]`–`[P24]`.

And it has no website. Its entire public identity is a 28 MB PDF that has to be emailed, and
a Facebook page.

**The strategic problem is therefore not persuasion. It is disclosure.** WUFPA does not need
a site that argues it is credible. It needs a site that stops concealing the evidence that
it already is.

This single observation determines almost every decision in this document. It is why the
site is built around records rather than claims, why photography is the primary design
material, why dates and names appear everywhere, and why the visual language is editorial
rather than promotional.

---

## 2. The two-audience problem, and how it is resolved

The site serves two primary audiences whose needs look, at first, incompatible.

| | **A1 — Prospective member** | **A2 — Institutional funder / partner** |
|---|---|---|
| Device | Mid-range Android, metered data | Laptop, office connection |
| Time available | Curious, will browse | 90 seconds, sceptical |
| Entry point | Facebook / WhatsApp link | A link in an email or application |
| First question | "Is this for someone like me?" | "Is this organisation real?" |
| Wants | Belonging, access, a local contact | Legal status, governance, delivery record |
| Turned off by | Institutional coldness, jargon | Emotional appeal, unquantified claims |

The usual resolution is to build two doors — a "members" area and an "about/partners" area —
and split the difference. **That is the wrong answer here**, because it doubles the
maintenance burden on an organisation with no editorial staff (constraint C4) and because it
misreads what the two audiences share.

**What they share is that both are asking for proof, and the same proof satisfies both.**

- A named coordinator in Rukungiri tells a filmmaker "you are covered" *and* tells a funder
  "this is real regional infrastructure."
- A dated photograph of a UNATCOM workshop tells a filmmaker "you would get training" *and*
  tells a funder "UNESCO's national commission already works with them."
- Ten craft guilds with named heads tells a gaffer "there is a place for me" *and* tells a
  funder "this is a properly constituted trade body."

**Resolution: one site, built on evidence, with different entry paths into the same
material.** The difference between the two journeys is where they enter and what they are
shown first — not what exists. This is why the information architecture is organised by
region and craft ([05 § 1](05_INFORMATION_ARCHITECTURE.md#1-the-organising-principle)):
those axes happen to be simultaneously the member's "am I included?" and the funder's
"is this structural?"

---

## 3. The trust ladder

Trust is not established by a trust badge. It is established in a sequence, and the sequence
matters because each rung is only believable once the one below it is secure.

```
   5. ACTION           "I will join / fund / partner"
      ↑
   4. RELEVANCE        "This includes me / my priorities"
      ↑
   3. COMPETENCE       "They deliver, repeatedly, with real partners"
      ↑
   2. LEGITIMACY       "This is a properly constituted organisation"
      ↑
   1. EXISTENCE        "These are real people in a real place"
```

Almost every failed association website inverts this: it opens with the ask (rung 5) and
never establishes rung 1. The prototype does exactly this — its navigation CTA, three of its
hero buttons and its footer all say "Donate" `[SITE]`, before the visitor has been given a
single verifiable fact.

**The website's rule: never ask for something from a rung you have not yet earned.**

| Rung | How this site earns it | Where |
|---|---|---|
| 1 — Existence | Real photographs of real, identifiable people in recognisable Ugandan places | Hero, every page |
| 2 — Legitimacy | Legal form, URSB registration, founding date, named governance with terms of office | Proof band, About, Legal, Leadership |
| 3 — Competence | Dated activity record with named partners and photographic evidence | Programmes, Impact, News |
| 4 — Relevance | Six sub-regions, ~25 districts, ten guilds, named local coordinators | Regions, Guilds |
| 5 — Action | Membership, partnership, support | CTAs, always after the above |

---

## 4. Why each page exists

No page exists because a template had a slot for it. Each is here because it does a specific
job for a specific audience at a specific rung.

| Page | Job | Audience | Rung | If it did not exist |
|---|---|---|---|---|
| **Home** | Establish existence and legitimacy in one screen; route to the right journey | All | 1–2 | The visitor would have to guess where to go |
| **About** | Answer "what kind of organisation is this?" in WUFPA's own words | A2, A4 | 2 | The site would have vision and mission nowhere |
| **About → Legal status** | The single hardest credibility fact WUFPA owns, given its own page | A2 | 2 | Buried in a paragraph, where sceptical readers will not find it |
| **About → History** | Show eight years of continuity — the difference between an organisation and an initiative | A2, A4 | 2–3 | "Founded 2017" would be a date rather than a story |
| **Leadership** | Put names, faces and terms of office against the organisation | A2 | 2 | The most common funder objection — "who is actually accountable?" — would go unanswered |
| **Programmes** | The delivery record. The proof that rung 3 is real | A2, A1 | 3 | The site would describe intentions, which any organisation can do |
| **Regions** | Prove coverage is real, and let a member find their own coordinator | A1, A2 | 4 | "Western Uganda" would be an abstraction |
| **Guilds** | Show WUFPA is organised by craft, not just geography; give every discipline a home | A1, A3 | 4 | A gaffer would have no reason to believe the association is about them |
| **Membership** | Convert. The primary business goal | A1 | 5 | There would be no growth mechanism |
| **Membership → Join** | Remove every unnecessary step between intent and enquiry | A1 | 5 | Intent would leak away |
| **SACCO** | Explain a genuinely distinctive asset, and make the case for its seed capital | A1, A2 | 3–5 | WUFPA's most concrete financial-inclusion story would be a bullet point |
| **Partners** | Borrowed credibility, honestly earned | A2 | 3 | The strongest external validation would be invisible |
| **Impact / Gallery** | Let the evidence be looked at rather than read | All | 1, 3 | 70+ photographs would sit unused in a PDF |
| **News** | Prove the organisation is alive *now*, not in 2023 | A2, A3 | 3 | A dormant-looking site, which reads as a defunct organisation |
| **Events** | Give members something to act on | A3 | 4–5 | Members would have no reason to return |
| **Support** | Convert audience A2's interest into a specific, fundable ask | A2 | 5 | Interest would have nowhere to go |
| **Contact** | Close the loop; serve press | All | 5 | Enquiries would go to a personal WhatsApp |

---

## 5. Why each homepage section exists

The homepage sequence ([05 § 5.1](05_INFORMATION_ARCHITECTURE.md#51-homepage-sequence)) is
an argument. Each band exists to answer the objection raised by the one before it.

| Band | Implicit question it answers | Why it is in this position |
|---|---|---|
| **1 Hero** | "What is this?" | A real photograph does rung 1 faster than any sentence. The headline does the factual work the photograph cannot |
| **2 Proof band** | "How big, and is it real?" | Immediately after the claim, before any prose. Four numbers, all dated. This is the band that keeps a sceptical funder scrolling |
| **3 Who we are** | "What kind of organisation?" | Now that scale is established, the reader will invest in three paragraphs. Not before |
| **4 What we do** | "But what does it actually *do*?" | The natural objection to any association. Answered with six concrete programme areas, not adjectives |
| **5 Where we work** | "Does it reach *me* / is coverage real?" | The pivot from institution to individual. Serves A1's inclusion question and A2's scale question with the same content |
| **6 Evidence** | "Prove it." | Dated, photographed, named. Placed after the claims so it reads as corroboration rather than illustration |
| **7 Partners** | "Who else believes them?" | Third-party validation lands hardest after first-party evidence, not before |
| **8 Membership** | "How do I join?" | The primary CTA appears here, at rung 5 — after all four lower rungs are secured |
| **9 News & events** | "Are they still active?" | Late, because it is a reassurance rather than an argument. But essential: nothing kills institutional trust like a site whose last update was two years ago |
| **10 Support** | "How else can I help?" | Last, because it asks the most from a reader who has just been given the most |

**Deliberately not on the homepage:** a mission statement in the hero (nobody reads mission
statements from strangers), a leadership grid (belongs on its own page; a homepage grid of
faces without context is decoration), a newsletter sign-up (WUFPA has no newsletter),
and a testimonial carousel (no testimonials exist, and inventing them is exactly the failure
mode this project is correcting).

---

## 6. How storytelling should work

WUFPA's story is genuinely good and does not need embellishment. Three narrative principles:

### 6.1 The story is a movement from isolation to organisation

Not "poor filmmakers helped by an association" — that is charity framing and it is both
inaccurate and insulting to the members ([03 § 2.1](03_BRAND_GUIDELINES.md#21-the-voice-in-four-rules),
rule 3).

The true story is: **fourteen companies who were individually powerless became three hundred
who are collectively negotiating.** Every part of the site is a chapter in that:

- **Piracy** → from individual loss to a public campaign with the national regulator `[P13]`
- **Training** → from informal apprenticeship to master classes with UNESCO and Kampala Film School `[P19] [P22]`
- **Distribution** → from selling copies personally to five broadcasters and a distributors group `[P2] [P5]`
- **Finance** → from personal savings to a registered SACCO `[P23]`
- **Policy** → from absence to the Parliamentary Forum for Creative Industries `[P12]`
- **Recognition** → from invisibility to the UCC Regional Film Competition and international delegations `[P2] [P14]`

**Every programme page should be written as one of these before-and-after arcs.** It is
true, it is specific, and it makes the case for support without asking.

### 6.2 Specificity is the whole technique

The difference between a forgettable page and a convincing one is almost never the adjective.
It is the proper noun.

| Weak | Strong |
|---|---|
| "We work across the region" | "From Kabale to Kagadi" |
| "We partner with international organisations" | "UNATCOM for UNESCO. US Mission Uganda. Alliance Française. The Goethe-Zentrum." `[P2]` |
| "Our members' films reach audiences" | "TV West, Tayari West TV, GNTV, Lite TV, YoTV." `[P2]` |
| "We campaign against piracy" | "We marched through Mbarara behind a banner reading *Infringement on one's copyright is a crime*." `[P13]` |
| "Recent progress on financial inclusion" | "On 24 October 2025, our members received the WUFM SACCO certificate." `[P23]` |

WUFPA's source material is unusually rich in proper nouns. Use them. They are the reason
this site can be convincing without a single unverifiable claim.

### 6.3 The organisation speaks; individuals are named

WUFPA speaks as "we". But the credibility is carried by named individuals — the President,
the founder who registered the association, the coordinator in Kanungu.

**Do not write anonymous institutional prose.** Where a person did something, name them. The
profile does this well and the site should do it better: it was Cyril Baryabawe who led the
registration in 2017 `[P4]`; it was under Katabazi George that the association went from 14
to 300+ `[P5]`.

⟦Quotations would strengthen every page. No supplied source contains a single direct quote
from a WUFPA member or leader. **Do not invent one.** Collecting three or four real quotes —
from the President, a regional coordinator, and a member who has been through training — is
the highest-value content request that could be made of WUFPA. Recorded as a
recommendation, not a launch blocker.⟧

---

## 7. How photography should be used

Full art direction: [03 § 7](03_BRAND_GUIDELINES.md#7-photography-direction). The strategic
points:

**1. Photography is the primary design material, not decoration.** WUFPA has 70+ real
documentary photographs and almost no other visual asset — no illustration style, no video,
no film stills. A design that treats photography as accent and typography as the main event
would be leaving the strongest asset unused.

**2. The photography's imperfection is the point.** Available light, phone cameras, plastic
chairs, mixed white balance. This looks like documentation because it *is* documentation.
Polishing it into something that resembles commissioned agency work would convert an asset
into a liability — it would look like stock, and stock is what the site must be believably
free of.

**3. Group photographs do specific work.** The archive is dominated by 20–100 person group
shots. This is often treated as a weakness in web design. Here it is the message: *this many
people showed up, in this district, on this day.* Present them wide and large, not cropped
into square thumbnails.

**4. Captions are content, not metadata.** "WUFPA sensitisation film workshop in the Bunyoro
region, 2022" carries more persuasive weight than the paragraph next to it. Caption
everything, with what is known and nothing that is not.

**5. Faces establish rung 1 faster than anything else.** People looking directly at the
camera, holding certificates, shaking hands. This is why the hero must be populated, and why
the leadership portraits must be real (X1).

---

## 8. How trust is built, mechanically

Beyond the ladder in § 3, these are the concrete devices the site uses. Each is cheap and
each is a direct answer to a specific doubt.

| Device | Answers the doubt | Implementation |
|---|---|---|
| **Date every claim** | "Is this current or from 2019?" | Statistics carry their as-of year; activity items carry their date; undated items say so |
| **Name every partner** | "Are these real relationships?" | Full institutional names, no logo-only walls |
| **Name every person** | "Who is accountable?" | Role, term of office, district |
| **Show the governance structure** | "Is this one person with a logo?" | Four committees, six regional teams, ten guilds, drawn |
| **State the legal form** | "Is this registered?" | Its own page, with the URSB detail |
| **Publish what you don't know** | "What are they hiding?" | "Date not recorded." "Photographer unknown." This is disarming and almost nobody does it |
| **No stock photography** | "Is any of this real?" | Verifiable by anyone who knows the region |
| **Working links and forms** | "Is this maintained?" | A dead "Donate" link `[SITE]` signals abandonment more loudly than an old news post |
| **Fast, light pages** | "Do they know what they're doing?" | Also a real accessibility issue (constraint C1) |
| **Consistent naming** | "Is this professional?" | The house style in [02 § 12.3](02_ORGANISATION_PROFILE.md#123-house-style-decisions) exists for this |

### 8.1 The anti-patterns that destroy trust

Each of these is present in the prototype and each is prohibited:

- **Stock photographs of people** presented as members or leaders (X1, X12)
- **Invented specifics** — film titles, member companies, statistics (X2, X3, X13)
- **Dead links and placeholder destinations** (X8)
- **A future-tense event whose date has passed** (`⚠ VERIFY` — the Awards Gala)
- **Jokes at the organisation's own expense** in front of a funding audience (X6)
- **Precision without sourcing** — "10,500 individual creatives" reads as counted, is not (X13)
- **An empty section shipped with "coming soon"** — see
  [05 § 7](05_INFORMATION_ARCHITECTURE.md#7-what-is-deferred-and-what-happens-to-the-gap)

---

## 9. How credibility is communicated visually

Content is only half of it. The visual system carries the same argument.

| Decision | Credibility reasoning |
|---|---|
| **Light ground, not dark cinema** | The prototype's near-black treatment reads as *streaming service*. WUFPA is a trade body and a legal entity, not a content platform. Light editorial also makes long-form advocacy content readable, and it is what the logo is designed for ([03 § 5.1](03_BRAND_GUIDELINES.md#51-sampled-from-the-official-assets)) |
| **Restrained red** | Red at 6% of the logo, used as punctuation. A site drowning in brand colour reads as marketing; a site using it sparingly reads as considered |
| **Editorial serif for long-form** | A serif signals *record* and *report*. Sans-only signals *product marketing*. WUFPA's content is closer to the former |
| **Generous type sizes and measure** | Respect for the reader, and a practical necessity for an audience reading on phones in daylight |
| **Real, unstyled photography** | § 7.2 |
| **Structural whitespace, not decorative** | Space that organises reads as clarity; space that merely spreads reads as thinness — and WUFPA's problem is that it has *too much* to say, not too little |
| **Almost no motion** | Motion is the visual grammar of promotion. Stillness is the grammar of record ([03 § 10](03_BRAND_GUIDELINES.md#10-motion-principles)) |
| **No dashboard aesthetics** | No sparklines, no progress rings, no card-grid-everything. WUFPA is not a SaaS product and borrowing that language would make its real numbers look synthetic |
| **Visible structure** | Breadcrumbs, clear headings, consistent page skeleton. A site that is easy to navigate is read as an organisation that is easy to work with |

### 9.1 What "African, authentic, premium" means here — and what it must not mean

The brief asks for a design that feels African, authentic and premium. These words are
frequently used to justify decoration, so it is worth being explicit.

| It means | It does not mean |
|---|---|
| The photography is of Western Uganda, and it is the dominant visual element | Kente-cloth patterns, mudcloth borders, acacia-tree silhouettes, or any pan-African visual shorthand |
| Place names, languages and institutions are specific and correct | Generic "Africa" imagery or a map of the continent |
| The palette comes from WUFPA's own logo | An "African" palette of ochre, terracotta and gold invented for the occasion |
| Premium means restraint, precise typography, generous space, and everything working | Premium means gold, gradients, glassmorphism, or a dark theme |
| Authentic means nothing is invented | Authentic means rough-edged or unpolished |

**The authenticity here comes from the content being true.** WUFPA is an association of
Western Ugandan filmmakers; the site is made of their photographs, their place names, their
partners and their words. That is sufficient. Any additional "Africanness" applied on top
would be decoration applied by outsiders to something that is already the real thing.

---

## 10. What we are deliberately not doing

| Not doing | Why |
|---|---|
| A dark, cinematic "film industry" aesthetic | It fights the logo, makes real photography look like stock, hurts long-form readability, and positions a trade association as a streaming brand ([03 § 5.1](03_BRAND_GUIDELINES.md#51-sampled-from-the-official-assets)) |
| A homepage video background | No video exists (Q12); and on metered mobile data it would be an access barrier (C1) |
| A film catalogue at launch | No film data of any kind exists (Q11). Building an empty one would be worse than not building it |
| A member directory at launch | Four documented members out of 300+ (Q16). A directory showing four would undercut the "300+" claim on the same page |
| A CMS with a full editorial workflow | No evidence of editorial capacity (C4). A markdown-based content model gives the same structure at a fraction of the maintenance cost, and can be upgraded later ([14](14_TECHNICAL_ARCHITECTURE.md)) |
| A member portal at launch | Real value, but it is a project with its own funding conversation, not a feature ([19](19_FUTURE_ROADMAP.md)) |
| Donation processing at launch | No verified payment channel (Q22). Publishing an unverified one is a fraud risk |
| Multi-language at launch | No translated content exists (C7). The architecture keeps the door open |
| An interactive animated map of Uganda | Expensive in kilobytes, fragile, and a static SVG map with six linked regions does the entire job |
| Testimonials, impact-percentage graphics, "our story" video | Nothing real to build them from |

---

## 11. The strategy in one page

If everything else in this document were lost, this is what matters:

1. **WUFPA is more credible than it looks. The site's job is disclosure, not persuasion.**
2. **Two audiences, one body of evidence.** Members and funders want proof of the same
   things from different doors.
3. **Climb the trust ladder in order.** Existence → legitimacy → competence → relevance →
   action. Never ask before you have earned.
4. **Evidence over adjectives.** Dates, names, places, partners. Every time.
5. **Photography is the design.** Real, documentary, generously sized, honestly captioned.
6. **Organise by region and craft**, because that is how WUFPA actually works and it happens
   to answer both audiences' questions at once.
7. **Specificity is the technique.** The proper noun beats the adjective, always.
8. **Light, editorial, restrained.** Record, not promotion.
9. **Fast and light is an access requirement**, not a score.
10. **Nothing is invented. Ever.** A gap is documented, not filled.

---

*Document 06 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
