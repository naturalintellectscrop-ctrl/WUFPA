# 04 — Content Bible

*Every word of the WUFPA website, ready to implement.*

> **Rules for using this document**
>
> 1. **This is the only place web copy is written.** If a page needs new copy, it is added
>    here first, then implemented. Copy invented in a template is how the prototype ended
>    up with eight fictional films.
> 2. **Every factual claim below traces to
>    [02_ORGANISATION_PROFILE.md § 13](02_ORGANISATION_PROFILE.md#13-facts-approved-for-publication).**
>    Source tags are shown where a sentence carries a hard fact.
> 3. **`⟦TOKEN⟧` marks content that cannot be written yet.** These are blocked on WUFPA
>    answers, not on writing time. Every token names its question number. A `⟦TOKEN⟧` must
>    never be replaced with a plausible guess.
> 4. **`{domain}`** is the live domain, pending question Q5.
> 5. Voice, style and forbidden vocabulary: [03 § 2–3](03_BRAND_GUIDELINES.md#2-brand-voice).

---

## 1. Global copy

### 1.1 Site identity

| Slot | Copy |
|---|---|
| Site name | Western Uganda Film Producers Association |
| Short name | WUFPA |
| Legal name | Western Uganda Film Producers Association Limited |
| Strapline (organisational) | Telling our stories that transform our communities. `[P3]` |
| Logo tagline (in the mark only) | Let the Story un Fold `[LOGO-A]` — see [03 § 4](03_BRAND_GUIDELINES.md#4-taglines-and-which-one-to-use) |
| Title-tag suffix | ` — WUFPA` |

### 1.2 Navigation labels

**Primary:** About · Programmes · Regions · Membership · News
**Primary action:** Become a Member
**Utility:** Search
**Footer:** as specified in [05 § 3.4](05_INFORMATION_ARCHITECTURE.md#34-footer)

### 1.3 Recurring UI strings

| Context | Copy |
|---|---|
| Skip link | Skip to main content |
| Search placeholder | Search WUFPA |
| Search, no results | No results for "{query}". Try a region, a programme, or a person's name. |
| Menu button (accessible name) | Open menu / Close menu |
| Breadcrumb root | Home |
| "Read more" | Read the full story *(never bare "Read more")* |
| Related links heading | Related |
| External link note | Opens on {site name} |
| Load more | Show more |
| Back to top | Back to top |
| Required field | Required |
| Form sending | Sending… |
| Photo credit prefix | Photograph: |
| Undated photo note | Date not recorded |

### 1.4 Footer copy

> **Telling our stories that transform our communities.**
>
> Western Uganda Film Producers Association Limited. Registered in Uganda on
> 4 September 2017 as a company limited by guarantee. `[P1] [P4]`
>
> Mbaguta Street, Mbarara Shopping Market, Mbarara City, Uganda `[P1]`
> ⟦Q3: association email⟧ · ⟦Q3: association telephone⟧
> ⟦Q9: social media links⟧
>
> © {current year} Western Uganda Film Producers Association Limited
> Privacy · Terms · Accessibility

### 1.5 404 page

> **H1:** This page isn't here
>
> The page you were looking for has moved or never existed. It may help to start again.
>
> - Go to the homepage
> - Find your sub-region
> - Become a member
> - Search the site

---

## 2. SEO metadata — all pages

Title tags target ≤ 60 characters; descriptions ≤ 155. Both are shown with counts so they
can be checked without a tool. Keyword strategy and structured data:
[16_SEO_ACCESSIBILITY.md](16_SEO_ACCESSIBILITY.md).

| Page | `<title>` | Meta description |
|---|---|---|
| `/` | Western Uganda Film Producers Association (WUFPA) *(53)* | WUFPA unites 300+ film production houses across the six sub-regions of Western Uganda. Training, advocacy, distribution and finance for filmmakers. *(152)* |
| `/about/` | About WUFPA — Western Uganda Film Producers Association *(54)* | Registered in 2017 as a non-profit company limited by guarantee, WUFPA represents film producers across Western Uganda. Our vision, mission and objectives. *(154)* |
| `/about/history/` | Our story: 2017 to today — WUFPA *(35)* | From 14 founding production companies in Ankole and Kigezi to 300+ production houses across six sub-regions. Eight years of Western Ugandan film. *(148)* |
| `/about/governance/` | How WUFPA is governed — WUFPA *(31)* | WUFPA's Executive Committee, Board of Trustees, Disciplinary and Supervisory Committees, sub-regional coordinators and ten film guilds. *(140)* |
| `/about/legal/` | Legal status and registration — WUFPA *(38)* | WUFPA is registered with the Uganda Registration Services Bureau as a company limited by guarantee, operating as a not-for-profit association. *(145)* |
| `/leadership/` | Leadership and governance — WUFPA *(34)* | Meet the people who lead WUFPA: the Executive Committee 2025–2030, the Board of Trustees, and the founders who registered the association in 2017. *(150)* |
| `/programmes/` | What we do — WUFPA programmes *(30)* | Training and master classes, copyright advocacy, the Kibanda Initiative, distribution, film competitions and international exposure for our members. *(151)* |
| `/programmes/training/` | Film training and master classes — WUFPA *(40)* | Screenwriting, directing, cinematography, editing and production training for filmmakers in Western Uganda, with UCC, UNESCO and international partners. *(154)* |
| `/programmes/advocacy/` | Copyright advocacy and anti-piracy — WUFPA *(43)* | WUFPA campaigns for filmmakers' rights in Western Uganda, from street sensitisation on copyright to national policy on film in the school curriculum. *(153)* |
| `/programmes/kibanda/` | The WUFPA Kibanda Initiative *(28)* | Community film screenings bringing Western Ugandan films to towns, schools and rural communities — promoting access, education and local audiences. *(148)* |
| `/programmes/distribution/` | Film distribution and market access — WUFPA *(43)* | WUFPA connects producers with distributors and broadcasters. Members' films air on TV West, Tayari West TV, GNTV, Lite TV and YoTV. *(134)* |
| `/programmes/competitions/` | Film competitions and awards — WUFPA *(37)* | WUFPA advocated for the UCC Regional Film Competition and organises the Western Uganda Film Awards Gala, celebrating filmmakers across the region. *(150)* |
| `/programmes/international/` | International exposure for our filmmakers — WUFPA *(49)* | WUFPA leads delegations to the Zanzibar International Film Festival, the Mashariki African Film Festival and the Kigali International Content Market. *(153)* |
| `/regions/` | Our six sub-regions — WUFPA *(28)* | WUFPA works across Ankole (Rwizi), Kigezi, Rwenzori, Tooro, Bunyoro and Greater Bushenyi, with coordinators in districts throughout Western Uganda. *(153)* |
| `/regions/[x]/` | Film in {Region} — WUFPA | WUFPA in the {Region} sub-region: our coordinator, the districts we cover, and the training and advocacy work we have delivered here. |
| `/guilds/` | The ten WUFPA film guilds *(27)* | Directors, producers, screenwriters, actors, sound, animation, costume, editing, cinematography and lighting — organised by craft across Western Uganda. *(154)* |
| `/guilds/[x]/` | {Guild} — WUFPA | The WUFPA {Guild} brings together {craft} working across the six sub-regions of Western Uganda. Its head and how to join. |
| `/membership/` | Membership — WUFPA *(21)* | WUFPA membership is open to filmmakers, production companies, film groups and creatives across Western Uganda. What you get and how to apply. *(147)* |
| `/membership/join/` | Become a member — WUFPA *(24)* | Apply to join the Western Uganda Film Producers Association. Tell us about your work and a coordinator in your sub-region will be in touch. *(141)* |
| `/sacco/` | WUFM SACCO — savings and credit for filmmakers *(46)* | The Western Uganda Filmmakers SACCO helps members save and access affordable credit for their productions. Small savings, big dreams. *(136)* |
| `/partners/` | Partners and supporters — WUFPA *(32)* | WUFPA works with UCC, UNATCOM for UNESCO, US Mission Uganda, Alliance Française, the Goethe-Zentrum, URSB, UFMI and regional broadcasters. *(143)* |
| `/impact/` | Impact and gallery — WUFPA *(27)* | Eight years of workshops, campaigns, competitions and community screenings across Western Uganda, in photographs. *(114)* |
| `/news/` | News — WUFPA *(15)* | The latest from the Western Uganda Film Producers Association: programmes, partnerships, competitions and member news. *(122)* |
| `/events/` | Events — WUFPA *(17)* | Workshops, screenings, competitions and meetings organised by WUFPA across the six sub-regions of Western Uganda. *(115)* |
| `/support/` | Support WUFPA *(14)* | WUFPA needs equipment, training sponsorship, SACCO seed capital and a regional film studio. Here is exactly what your support would fund. *(141)* |
| `/contact/` | Contact WUFPA *(14)* | Reach the Western Uganda Film Producers Association at our head office on Mbaguta Street, Mbarara City, or send us a message. *(127)* |

### 2.1 Open Graph copy

Defaults, overridden per page by the values above.

| Property | Value |
|---|---|
| `og:site_name` | Western Uganda Film Producers Association |
| `og:type` | `website` (`article` on news) |
| `og:locale` | `en_UG` |
| `og:title` (home) | WUFPA — the film industry of Western Uganda |
| `og:description` (home) | 300+ production houses. Six sub-regions. One association. Training, rights, distribution and finance for filmmakers in Western Uganda. |
| `og:image` (home) | `/og/wufpa-og.png` — 1200×630, wordmark on a real workshop photograph |
| `og:image:alt` | The WUFPA logo over a photograph of filmmakers at a WUFPA workshop in Western Uganda |
| `twitter:card` | `summary_large_image` |

> **Why this matters more than usual here.** WUFPA's own stated channels are Facebook and
> WhatsApp `[P3]`. Almost every share of this site will be a link pasted into one of those
> two. Open Graph *is* the first impression for most of the audience — and the prototype had
> none at all (X30).

---

## 3. Homepage

### 3.1 Hero

> **H1:** The film industry of Western Uganda has an address
>
> **Standfirst:** WUFPA unites more than 300 film production houses across Ankole, Kigezi,
> Rwenzori, Tooro, Bunyoro and Greater Bushenyi. We train filmmakers, defend their
> copyright, open markets for their work, and represent them where decisions are made.
>
> **Primary CTA:** Become a member
> **Secondary CTA:** See what we do

**Image:** `[PH-3]` (Tooro workshop at Obukama bwa Tooro, 2400×1600) or `[P11]` (UCC
awareness workshop). Alt text in [12_MEDIA_LIBRARY.md](12_MEDIA_LIBRARY.md).

*Note on the H1:* it is deliberately literal. Goal W4 is to give WUFPA a permanent address
to point at, and audience A2 arrives sceptical. A poetic headline would lose both.

### 3.2 Proof band

Four figures. Every one dated, per [03 § 3](03_BRAND_GUIDELINES.md#3-editorial-style).

| Figure | Label |
|---|---|
| **300+** | film production houses `[P1]` |
| **6** | sub-regions of Western Uganda `[P1]` |
| **10** | film guilds, from directors to gaffers `[P7]` |
| **2017** | registered with URSB as a non-profit `[P1] [P4]` |

Footnote beneath: *Membership figures as recorded in the WUFPA association profile, 2025.*

> **Do not include the "10,500 individual creatives" figure here.** It is 300 × 35, not a
> count (X13). If WUFPA wants it, it belongs in body copy phrased as an estimate: "With over
> 35 members in each production house, WUFPA's network reaches an estimated 10,000 individual
> creatives." `[P1]`

### 3.3 Who we are

> **H2:** We are the association Western Uganda's filmmakers built for themselves
>
> In 2017, fourteen production companies from Ankole and Kigezi registered an association.
> They were tired of an industry whose training, funding, buyers and policy conversations
> all happened in Kampala — and of watching their films copied and sold without permission.
> `[P1] [P4]`
>
> Eight years later WUFPA is more than 300 production houses, organised into ten craft
> guilds, with coordinators in six sub-regions and districts from Kabale to Kagadi. `[P1] [P6] [P7]`
>
> We are a non-profit company limited by guarantee. We do not make films ourselves. We make
> it possible for our members to. `[P1]`
>
> **CTA:** About WUFPA

### 3.4 What we do

> **H2:** Six ways we work for our members
>
> **Standfirst:** Training, rights, audiences, markets, money and recognition.

Six cards — copy in § 6.

**CTA:** All our programmes

### 3.5 Where we work

> **H2:** From Kabale to Kagadi
>
> WUFPA covers the six sub-regions of Western Uganda. Each has its own coordinator,
> secretary and treasurer, and district coordinators working alongside them. Find yours.
> `[P6] [P7]`

Six region cards. **CTA:** Find your sub-region

### 3.6 Evidence

> **H2:** Eight years on the record
>
> **Standfirst:** Not a summary — the work itself.

Four to six dated activity items with real photographs, drawn from
[02 § 3](02_ORGANISATION_PROFILE.md#3-history). Recommended selection:

| Item | Copy | Image |
|---|---|---|
| 2022 | Signed a memorandum of understanding with Sky TV, Mbarara City | `[P8]` |
| 2023 | Trained members with MTN YoTV on how to earn from film content | `[P15]` |
| Nov 2023 | Took a delegation to the Kigali International Content Market | `[P14]` |
| 2024 | Hosted the Matatu Film Lab with Film Possible and US Mission Uganda | `[P16]` |
| Oct 2025 | Members received the WUFM SACCO certificate in Mbarara City | `[P23]` |
| *(undated)* | Marched through Mbarara for filmmakers' copyright, with UCC, URSB and the Media Council | `[P13]` |

**CTA:** See our impact

### 3.7 Partners

> **H2:** We do not work alone
>
> WUFPA's training, competitions and campaigns are delivered with national and
> international partners — the Uganda Communications Commission, UNATCOM for UNESCO, US
> Mission Uganda and Film Possible, Alliance Française, the Goethe-Zentrum, the Uganda Film
> Network and the National Producers Guild of Uganda. `[P2]`
>
> **CTA:** Our partners

### 3.8 Membership

> **H2:** If you make films in Western Uganda, this is your association
>
> Membership is open to production companies, community film groups, guilds and individual
> creatives — writers, directors, actors, editors, camera operators, sound recordists,
> animators, costume and make-up artists, and gaffers. `[P2] [P7]`
>
> ⟦Q8: what membership costs and what the application process is⟧
>
> **Primary CTA:** Become a member
> **Secondary:** What members get

### 3.9 News and events

> **H2:** What's happening
>
> *(Latest three items. If there are no upcoming events, this band shows the three most
> recent news items and is titled "Latest news" — see constraint C4.)*
>
> **CTA:** All news

### 3.10 Support

> **H2:** Help us build the industry
>
> WUFPA needs production equipment, sponsorship for training, seed capital for our members'
> SACCO, and a regional film production studio in Western Uganda. `[P3]`
>
> **CTA:** How to support WUFPA

---

## 4. About

**H1:** About WUFPA
**Standfirst:** The Western Uganda Film Producers Association is a non-profit body
representing more than 300 film production houses across six sub-regions. This is who we
are, why we exist, and how we are held accountable.

### 4.1 Introduction

> The Western Uganda Film Producers Association Limited (WUFPA) is a legally registered,
> non-profit organisation limited by guarantee, founded on 4 September 2017. Headquartered
> on Mbaguta Street, Mbarara Shopping Market, Mbarara City, WUFPA unites film producers,
> production companies, film groups and film guilds across the six sub-regions of Western
> Uganda: Ankole (Rwizi), Kigezi, Rwenzori, Tooro, Bunyoro and Greater Bushenyi. `[P1]`
>
> The association started with 14 companies and groups. It now comprises more than 300 film
> production houses from across Western Uganda, each with over 35 members. `[P1]`

### 4.2 Vision

> **H2:** Our vision
>
> To be a leading regional force in empowering filmmakers and using film as a medium for
> social transformation, cultural preservation, and economic development in Western Uganda.
> `[P1]`

### 4.3 Mission

> **H2:** Our mission
>
> To unite, train, and support film producers and creatives in Western Uganda to create
> high-quality films that address key social issues, promote cultural heritage, and
> contribute to sustainable community development. `[P1]`
>
> We nurture filmmakers capable of writing, directing, producing and acting in socially
> impactful and culturally rooted films, using cinema as a tool for education, cultural
> tourism and community development. `[P1]`

### 4.4 Objectives

> **H2:** Our core objectives

Five items, verbatim from `[P1]` — reproduced in
[02 § 6.1](02_ORGANISATION_PROFILE.md#61-core-objectives-website-facing).

Below, an expandable block: **"Our full constitutional objects"** containing the six objects
from `[P2]` ([02 § 6.2](02_ORGANISATION_PROFILE.md#62-constitutional-objects-secondary)).

*Why expandable:* the constitutional objects are essential for audience A2 and tedious for
A1. Progressive disclosure serves both without a compromise that serves neither.

### 4.5 Values

⟦Values: five derived values are proposed in
[02 § 5.3](02_ORGANISATION_PROFILE.md#53-values) but no supplied source states WUFPA's
values. **Do not publish until WUFPA confirms.** If unconfirmed at launch, omit the section —
an About page without a values list is normal; an About page with invented values is not.⟧

### 4.6 Legal status *(`/about/legal/`)*

> **H1:** Legal status and registration
>
> WUFPA is registered as a company limited by guarantee under the laws of Uganda, operating
> as a not-for-profit association. `[P1]`
>
> The association was registered with the Uganda Registration Services Bureau (URSB) on
> 4 September 2017 by 14 founding film production companies and groups from the Ankole and
> Kigezi regions. `[P1] [P4]`
>
> | | |
> |---|---|
> | Registered name | Western Uganda Film Producers Association Limited |
> | Legal form | Company limited by guarantee |
> | Status | Not-for-profit |
> | Registrar | Uganda Registration Services Bureau (URSB) |
> | Date of registration | 4 September 2017 |
> | Registration number | ⟦Q21⟧ |
> | Registered office | Mbaguta Street, Mbarara Shopping Market, Mbarara City, Uganda |
>
> A company limited by guarantee has no shareholders and distributes no profit. WUFPA's
> members guarantee the association; its funds are applied to its objects.
>
> **CTA:** How WUFPA is governed

---

## 5. Leadership

**H1:** Leadership and governance
**Standfirst:** WUFPA is run by an elected Executive Committee, overseen by a Board of
Trustees, and supported by disciplinary and supervisory committees, sub-regional
coordinators and ten craft guilds. `[P5]`

> **H2:** How WUFPA is governed
>
> The Executive Committee is led by the President, Vice President, Treasurer and Secretary.
> Alongside it, the association has a Board of Trustees, a Disciplinary Committee, a
> Supervisory Committee, and regional and district coordinators who support the running of
> association activities and ensure the bylaws are followed. `[P5]`
>
> Sub-regional leadership committees were introduced to decentralise governance and deliver
> programmes closer to members. `[P5]`

Profiles, rosters and presentation rules:
[11_TEAM_AND_LEADERSHIP.md](11_TEAM_AND_LEADERSHIP.md). All names are blocked on question
Q1 (spelling) and Q4 (consent).

### 5.1 Founders

> **H2:** The founders
>
> In 2017, fourteen film production companies and groups from Ankole and Kigezi registered
> WUFPA with the Uganda Registration Services Bureau. Both of the association's founding
> officers remain involved today, serving on the Board of Trustees. `[P4] [P6]`

---

## 6. Programmes

**H1:** What we do
**Standfirst:** WUFPA's work falls into six areas. Together they cover the whole problem a
filmmaker in Western Uganda faces: learning the craft, keeping the rights, reaching an
audience, getting paid, getting financed, and being recognised.

### 6.1 The six programme cards

| Programme | Card copy |
|---|---|
| **Training & Capacity Building** | Workshops, master classes and mentorship in screenwriting, directing, acting, cinematography, editing and production — delivered with UCC, UNESCO's national commission, US Mission Uganda and others. `[P1] [P2]` |
| **Advocacy, Rights & Anti-Piracy** | We campaign for filmmakers' copyright, take that campaign to the streets, and press for film to be taught in Uganda's schools. `[P3] [P4] [P13]` |
| **The Kibanda Initiative** | Community film screenings that bring Western Ugandan films to towns, schools and rural communities. `[P2]` |
| **Distribution & Market Access** | We organised the region's film distributors, and members' films now air on five regional broadcasters. `[P2] [P5]` |
| **Competitions & Awards** | We persuaded the Uganda Communications Commission to create a regional film competition, and we run the Western Uganda Film Awards Gala. `[P2]` |
| **International Exposure** | Delegations to Zanzibar, Kigali and beyond, so our members meet the industry outside Uganda. `[P3] [P5]` |

### 6.2 Training & Capacity Building

> **H1:** Training and master classes
>
> **Standfirst:** Skills in screenwriting, directing, acting, cinematography, editing and
> production — taught in the sub-regions, not only in Kampala.
>
> Capacity building is WUFPA's first core objective: to develop skills among members through
> workshops, mentorships and hands-on training. `[P1]`
>
> **H2:** Who we train with
>
> WUFPA receives annual workshops and training support from national and international
> partners: `[P2]`
>
> - UCC / CineArts Academy
> - US Mission Uganda / Film Possible Uganda
> - Alliance Française and the Goethe-Zentrum
> - Uganda Film Network
> - UNATCOM — the Uganda National Commission for UNESCO
> - National Producers Guild of Uganda (PGU)
>
> **H2:** Training we have delivered
>
> - **Master classes with Kampala Film School** for the UCC Western Region Film Competition
>   Festival `[P19]`
> - **The Matatu Film Lab** with Film Possible and US Mission Uganda, led by international
>   mentor Zavaleta Janson, 2024 `[P16]`
> - **Monetising film content**, with MTN YoTV, 2023 — how members earn from the YoTV
>   channel `[P15]`
> - **Training workshop with UNATCOM for UNESCO** `[P22]`
> - **A workshop with Film Impact Movement (USA)** `[P17]`
> - **A visit from US film expert Joshua Stoone**, 2023 `[P15]`
>
> **CTA:** Become a member

### 6.3 Advocacy, Rights & Anti-Piracy

> **H1:** Advocacy and filmmakers' rights
>
> **Standfirst:** When WUFPA was founded, piracy in Western Uganda was normal. Changing that
> meant saying so publicly, repeatedly, and in the street.
>
> **H2:** Copyright
>
> WUFPA's first president led early campaigns in Mbarara City and the surrounding areas on a
> single principle: infringement on one's copyright is a crime. At the time, piracy was
> normalised — saying it out loud was a bold step. `[P4]`
>
> That work continues as the **Together Against Piracy** campaign, run jointly with the
> Uganda Communications Commission, the Uganda Registration Services Bureau, the Uganda Film
> Council, the Uganda Federation of Movie Industry and the Media Council of Uganda. `[P13]`
>
> **H2:** Representation
>
> Representing filmmakers' interests on national and regional platforms is one of WUFPA's
> five core objectives. `[P1]` WUFPA representatives have attended the Uganda Parliamentary
> Forum for Creative Industries `[P12]`, met the Uganda Registration Services Bureau's
> regional offices `[P9]`, and hosted the Uganda Federation of Movie Industry and the Uganda
> Film Association `[P17]`.
>
> **H2:** Film in the curriculum
>
> WUFPA is campaigning to have film and media production included in Uganda's national
> education curriculum, particularly in vocational and secondary schools. `[P3]`
>
> **H2:** Sensitisation across the region
>
> WUFPA's district-by-district sensitisation programme is how the association grew from 14
> companies to more than 300. Recorded meetings and workshops include Greater Bushenyi
> `[P8]`, Bunyoro `[P9]`, Tooro `[P10]`, Kigezi `[P17]`, Ntungamo and Rukungiri `[P18]`, and
> Ibanda, Kazo, Kiruhura, Kamwengye and Kitagwenda `[P11]`.

### 6.4 The Kibanda Initiative

> **H1:** The WUFPA Kibanda Initiative
>
> **Standfirst:** A community film screening project bringing local films to towns, schools
> and rural communities across Western Uganda — promoting access, education and engagement.
> `[P2]`
>
> Films made in Western Uganda should be watched in Western Uganda. The Kibanda Initiative
> takes members' films to the places where audiences already are, rather than waiting for
> audiences to find them.
>
> The initiative was launched under the association's current leadership `[P5]` and is being
> scaled up across the sub-regions `[P4]`.
>
> ⟦Screening schedule, locations and how to host a screening: no supplied source contains
> this. Ask WUFPA before writing this section.⟧

### 6.5 Distribution & Market Access

> **H1:** Distribution and market access
>
> **Standfirst:** Making a film and selling it are different problems. WUFPA works on the
> second one.
>
> **H2:** The Film Distributors Group
>
> WUFPA organised Western Uganda's film distributors and librarians to buy and promote local
> film content — a step towards a regional film economy rather than a regional film hobby.
> `[P2]` The Western Uganda Film Distributors Group connects producers directly with content
> buyers. `[P5]`
>
> **H2:** Broadcast
>
> Members' films are aired regularly on regional platforms: `[P2]`
>
> TV West · Tayari West TV · GNTV · Lite TV · YoTV (Kibanda Express Channel)
>
> In 2022, WUFPA signed a memorandum of understanding to work with Sky TV in Mbarara City.
> `[P8]`

### 6.6 Competitions & Awards

> **H1:** Film competitions and awards
>
> **H2:** The UCC Regional Film Competition
>
> WUFPA successfully advocated to the Uganda Communications Commission to launch a regional
> film competition — one of the association's first and most consequential wins. `[P2]`
>
> WUFPA has supported the competition with master classes delivered alongside Kampala Film
> School `[P19]`, and members have taken trophies, certificates and prizes at its Western
> Region ceremonies `[P20] [P21]`.
>
> ⟦Q7: current edition and whether entries are open. The profile records the 3rd edition as
> being organised, written in November 2025. Verify before publishing any edition number.⟧
>
> **H2:** The Western Uganda Film Awards Gala
>
> ⟦Q6: The first Western Uganda Film Awards Gala was scheduled for 13 December 2025 in
> Mbarara City `[P2] [P4]`. That date has passed and no supplied source records the outcome.
> **Do not publish this section in the future tense.** Once WUFPA confirms: if it took place,
> write it as history with photographs; if postponed, state the new date; if it has not
> happened, describe it as planned without a date.⟧

### 6.7 International Exposure

> **H1:** International exposure
>
> **Standfirst:** WUFPA takes its members out of the region so they come back with more than
> they left with.
>
> WUFPA has led delegations of producers to benchmark and participate in international film
> festivals — including the African Mashariki Film Festival and the Zanzibar International
> Film Festival — exposing members to global trends, networking opportunities and
> collaborative projects. `[P5]`
>
> In November 2023, a WUFPA delegation attended the Kigali International Content Market in
> Kigali, Rwanda. `[P14]`
>
> Travel support and exchange programmes for festivals, labs and residencies are among the
> association's current needs. `[P3]`
>
> **CTA:** Support this work

---

## 7. Regions

**H1:** Our six sub-regions
**Standfirst:** WUFPA covers Ankole (Rwizi), Kigezi, Rwenzori, Tooro, Bunyoro and Greater
Bushenyi. Each has a coordinator, a secretary and a treasurer, with district coordinators
working alongside them. `[P1] [P6] [P7]`

> **H2:** Why we organise by sub-region
>
> Uganda's film industry has always been concentrated in Kampala. WUFPA's answer was not to
> open one office and hope people travelled to it, but to build leadership in every
> sub-region. Sub-regional committees were introduced specifically to decentralise governance
> and deliver programmes efficiently. `[P5]`

### 7.1 Region page template

Each of the six pages follows the same structure. Rosters from
[02 § 9.4](02_ORGANISATION_PROFILE.md#94-sub-region-coordination); names blocked on Q1/Q4.

> **H1:** Film in {Region}
> **Standfirst:** WUFPA in the {Region} sub-region — who coordinates here, which districts
> we cover, and what we have delivered.
>
> **H2:** Your coordination team
> *Regional Coordinator, Secretary, Treasurer, District Coordinators — name, role, district.*
> **No personal telephone numbers** — see [01 § 7 (C5)](01_PROJECT_FOUNDATION.md#7-constraints).
>
> **H2:** Districts we cover
> **H2:** What we have done here
> *Programmes and events delivered in this sub-region, with photographs.*
> **H2:** Join WUFPA in {Region} → **CTA:** Become a member

**Per-region opening lines** *(the only region-specific prose; everything else is data)*:

| Region | Opening line |
|---|---|
| Ankole (Rwizi) | Ankole is where WUFPA began, and where its head office stands today. `[P1] [P4]` |
| Kigezi | Kigezi is one of the two sub-regions that founded WUFPA in 2017. `[P4]` |
| Rwenzori | The Rwenzori sub-region is home to WUFPA's current Vice President. `[P4] [P6]` |
| Tooro | WUFPA's Tooro sensitisation workshop was hosted at Obukama bwa Tooro. `[P10]` |
| Bunyoro | WUFPA held a sensitisation film workshop across the Bunyoro region in 2022. `[P9]` |
| Greater Bushenyi | WUFPA met film producers and actors across Greater Bushenyi in 2022. `[P8]` |

---

## 8. Guilds

**H1:** The ten WUFPA film guilds
**Standfirst:** A film is made by ten different crafts. WUFPA is organised so that each of
them has a voice, a head, and a place to belong. `[P7]`

> **H2:** Why guilds
>
> A producer's problems are not a gaffer's problems. Organising by craft as well as by place
> means that training, rates, standards and representation can be specific rather than
> general — and that a costume designer in Kakumiro has somewhere to go that is genuinely
> about their work.

### 8.1 The ten guilds

| Guild | One-line description |
|---|---|
| Directors Guild | Directors working across the six sub-regions |
| Producers Guild | The producers and production companies who carry the films |
| Screen Writers' Guild | Writers developing stories rooted in Western Uganda |
| Actors Guild | Performers on screen and stage |
| Sound and Music Guild | Sound recordists, designers and composers |
| Animators and Visual Effects Guild | Animation and VFX artists |
| Costume and Make-Up Guild | Costume, wardrobe and make-up |
| Editors Guild | Picture editors and post-production |
| Cinematography Guild | Camera operators and directors of photography |
| Gaffers and Lighting Guild | Lighting technicians and grips |

*Descriptions are craft definitions, not claims about WUFPA. Guild heads and districts:
[02 § 9.6](02_ORGANISATION_PROFILE.md#96-film-guilds), blocked on Q1/Q4.*

### 8.2 Guild page template

> **H1:** {Guild}
> **Standfirst:** {description}
> **H2:** Guild head — *name, district*
> **H2:** Training for this craft — *linked programmes*
> **H2:** Join this guild → **CTA:** Become a member
>
> ⟦Guild-specific activities, standards and rates: no supplied source. Ask WUFPA.⟧

---

## 9. Membership

**H1:** Membership
**Standfirst:** WUFPA membership is open to anyone making film in Western Uganda — from
registered production companies to community film groups to individual creatives.

Strategy, journey and form design: [10_MEMBERSHIP.md](10_MEMBERSHIP.md).

> **H2:** Who can join
>
> WUFPA brings together: `[P2]`
>
> - Independent filmmakers and film production companies
> - Community-based film groups
> - Regional film guilds and creative collectives
> - Youth, women and professionals involved in film and visual storytelling
>
> Members span the entire Western Uganda region, from Ankole (Rwizi) to Kigezi, Rwenzori,
> Tooro, Bunyoro and Greater Bushenyi. `[P2]`
>
> **H2:** What membership gives you
>
> *Every item below is evidenced by WUFPA's activity record. See
> [02 § 8.4](02_ORGANISATION_PROFILE.md#84-membership-benefits).*
>
> - **Training.** Workshops and master classes with UCC, UNESCO's national commission, US
>   Mission Uganda, Alliance Française, the Goethe-Zentrum and others `[P2]`
> - **Finance.** Access to WUFM SACCO — savings, and affordable credit for productions
>   `[P3] [P23]`
> - **Distribution.** A route to buyers through the Western Uganda Film Distributors Group,
>   and to audiences through five regional broadcasters `[P2] [P5]`
> - **Audiences.** Screenings through the WUFPA Kibanda Initiative `[P2]`
> - **Competition.** Entry routes to the UCC Regional Film Competition and the Western
>   Uganda Film Awards Gala `[P2]`
> - **International exposure.** Selection for delegations to festivals including ZIFF and the
>   African Mashariki Film Festival `[P3] [P5]`
> - **Protection.** Copyright advocacy and anti-piracy campaigning on your behalf `[P4] [P13]`
> - **Representation.** A voice on national platforms, from the regulator to Parliament
>   `[P1] [P12]`
> - **A guild.** One of ten craft guilds, and a coordinator in your own district `[P7]`
>
> **H2:** What it costs
>
> ⟦Q8 — BLOCKING. No supplied source states a membership fee, eligibility criteria or
> application process. The prototype's claim that "entry to WUFPA is free" is unsourced and
> must not be repeated. This section cannot be written until WUFPA answers.⟧
>
> **H2:** How to join
>
> ⟦Q8. Provisional structure, to be confirmed:
> 1. Tell us about yourself and your work.
> 2. A coordinator in your sub-region contacts you.
> 3. ⟦fee / documents / approval step⟧
> 4. You are registered, and receive your membership certificate.
> The certificate step is evidenced — WUFPA is photographed presenting certificates of merit
> to members `[PH-1] [PH-4] [P5] [P7]` — but the steps before it are not.⟧
>
> **CTA:** Become a member

### 9.1 Our members

> **H2:** Our members
>
> WUFPA is made up of more than 300 film production houses across Western Uganda. `[P1]`
>
> ⟦Q16 — no member register supplied. **Do not build a directory.** Show the four documented
> member companies as examples, explicitly labelled: "Four of our member production
> companies:" — Ankole City Filmz (Mbarara), Kigezi Universal Drama Actors/Artist (Kabale),
> Banyankitara Films, UPSKY Film Network. Locations for the last two are unconfirmed —
> [02 § 12.1 C-2, C-3](02_ORGANISATION_PROFILE.md#121-conflicts-between-sources).⟧

---

## 10. WUFM SACCO

**H1:** WUFM SACCO
**Standfirst:** Small savings, big dreams. The Western Uganda Filmmakers SACCO helps members
save together and borrow affordably for their productions. `[LOGO-C]`

> **H2:** Why a SACCO
>
> Film costs money before it earns money. For an emerging filmmaker in Western Uganda,
> that gap has usually meant the film does not get made.
>
> WUFPA established the Western Uganda Filmmakers SACCO to close it — to offer low-interest
> loans and grants to young and emerging filmmakers, and small grants for local film projects
> and talent development. `[P3]`
>
> Establishing a fund to support members' welfare and to invest in members' development
> activities has been one of the association's constitutional objects since 2017. `[P2]`
>
> **H2:** Where the SACCO stands
>
> On 24 October 2025, WUFPA members received the WUFM SACCO certificate, with the Mbarara
> City Commercial Officer. `[P23]`
>
> ⟦Q15: registration number, who may join, what the SACCO offers, current capitalisation.⟧
>
> **H2:** Seed capital
>
> Seed capital for the SACCO is the first item on WUFPA's list of current needs. `[P3]`
>
> **CTA:** Support the SACCO → `/support/`

*Uses the SACCO's own logo and blue, per [03 § 8.6](03_BRAND_GUIDELINES.md#86-wufm-sacco-identity).*

---

## 11. Partners

**H1:** Partners and supporters
**Standfirst:** WUFPA's training, competitions and campaigns are delivered with partners.
These are the institutions we work alongside.

> **H2:** Training and international support `[P2]`
> UCC / CineArts Academy · US Mission Uganda / Film Possible Uganda · Alliance Française ·
> Goethe-Zentrum (German Cultural Centre) · Uganda Film Network · UNATCOM, the Uganda
> National Commission for UNESCO · National Producers Guild of Uganda (PGU)
>
> **H2:** Broadcast and media `[P2] [P8]`
> TV West · Tayari West TV · GNTV · Lite TV · YoTV (Kibanda Express Channel) · Sky TV
> Mbarara · MTN YoTV
>
> **H2:** Industry and regulatory
> Uganda Communications Commission (UCC) · Uganda Registration Services Bureau (URSB)
> `[P9] [P13]` · Uganda Film Council `[P13]` · Uganda Federation of Movie Industry (UFMI)
> `[P13] [P17]` · Media Council of Uganda `[P13]` · Uganda Film Association `[P17]` · Uganda
> Film Publishers Association `[P18]` · Kampala Film School `[P19]`
>
> **H2:** Who we want to work with `[P3]`
> *Six partnership types from [02 § 10.3](02_ORGANISATION_PROFILE.md#103-partnership-types-sought).*
>
> **CTA:** Partner with WUFPA → `/contact/`

> ⚠ **Do not publish any partner logo without written permission (Q10).** Until permissions
> exist, this page is typographic and photographic — which is the stronger treatment anyway,
> per [03 § 7.3](03_BRAND_GUIDELINES.md#73-photography-by-context).

---

## 12. Impact and gallery

**H1:** Impact and gallery
**Standfirst:** Eight years of workshops, campaigns, competitions and screenings across
Western Uganda.

Albums, one per activity strand, each with real captions from
[12_MEDIA_LIBRARY.md](12_MEDIA_LIBRARY.md):

Sensitisation across the sub-regions · Training and master classes · Together Against Piracy ·
UCC Regional Film Competition · Partners and visitors · WUFM SACCO · Annual General Meetings ·
International delegations

> Every photograph on this site was taken at a WUFPA activity. Where we know the date, the
> place and the people, we say so. Where we do not, we say that too.

*That last line is worth publishing. It is a quiet, verifiable claim that most organisations
cannot make, and it is the antidote to the prototype's stock imagery.*

---

## 13. News and events

### 13.1 News index

**H1:** News
**Standfirst:** Updates from WUFPA — programmes, partnerships, competitions and members.
**Empty state:** *(Should not ship empty. See [15](15_IMPLEMENTATION_ROADMAP.md) — at least
five launch articles are written from the documented activity record before go-live.)*

### 13.2 Article template

H1 (headline) · standfirst · date · author/byline ⟦Q: does WUFPA want bylines?⟧ · hero image
with caption and credit · body · related links · CTA.

**Five launch articles**, each written entirely from sourced facts:

| # | Headline | Source |
|---|---|---|
| 1 | Members receive the WUFM SACCO certificate in Mbarara City | `[P23]` |
| 2 | WUFPA takes a delegation to the Kigali International Content Market | `[P14]` |
| 3 | The Matatu Film Lab comes to Western Uganda | `[P16]` |
| 4 | Together Against Piracy: taking copyright to the streets | `[P13]` |
| 5 | Ten guilds, six sub-regions: how WUFPA is organised | `[P6] [P7]` |

### 13.3 Events index

**H1:** Events
**Standfirst:** Workshops, screenings, competitions and meetings across the six sub-regions.
**No upcoming events:** "No events are scheduled at the moment. Past events are below, and
new events are announced in our news." *(Honest, and does not make the site look abandoned.)*

---

## 14. Support WUFPA

**H1:** Support WUFPA
**Standfirst:** WUFPA is asking for six specific things. Each one is work we have already
designed, with people ready to do it, waiting only on the means.

> **H2:** What your support would fund
>
> *Six needs, verbatim from `[P3]` — see
> [02 § 11.1](02_ORGANISATION_PROFILE.md#111-what-wufpa-is-asking-for).*
>
> **H2:** Why support WUFPA
>
> *Five reasons, verbatim from `[P3]` — see
> [02 § 11.2](02_ORGANISATION_PROFILE.md#112-why-support-wufpa-verbatim-headings).*
>
> **H2:** How to support us
>
> ⟦Q22 — no payment channel supplied. The prototype's Donate button links to a dead anchor
> (X8). Until WUFPA supplies a verified bank or mobile-money channel, this section offers:
> a partnership enquiry form, an equipment-donation enquiry, and the head office address.
> **Never publish an unverified payment detail.**⟧
>
> **CTA:** Talk to us about supporting WUFPA

---

## 15. Contact

**H1:** Contact WUFPA

> **H2:** Head office
> Mbaguta Street, Mbarara Shopping Market, Mbarara City, Uganda `[P1] [P3]`
> ⟦Q24: opening hours⟧
> *Map — Q14 for the precise pin.*
>
> **H2:** Get in touch
> ⟦Q3: association email and telephone. The profile lists wufpa2017@gmail.com and
> +256 701 927 701 `[P3]`, but the telephone number is recorded elsewhere as an individual's
> personal mobile `[P6]`. Confirm before publishing — see
> [01 § 7 (C5)](01_PROJECT_FOUNDATION.md#7-constraints).⟧
>
> **H2:** Follow us
> ⟦Q9: Facebook, WhatsApp and YouTube URLs. The profile names the channels but supplies no
> links `[P3]`.⟧
>
> **H2:** For press and researchers
> Download the WUFPA logo pack and association profile. For interviews and enquiries,
> contact ⟦Q3⟧.

### 15.1 Contact form

Fields: Name (required) · Email (required) · Sub-region (optional select) · I am writing
about… (required select: Membership / Partnership / Media and press / Supporting WUFPA /
Something else) · Message (required).

**Submit button:** Send message
**Success:** "Thank you. Your message has reached WUFPA and someone will reply to the email
address you gave us."
**Error:** "Your message could not be sent. Please try again, or email us directly at ⟦Q3⟧."

### 15.2 Membership enquiry form

Full specification in [10_MEMBERSHIP.md § 5](10_MEMBERSHIP.md).

**Submit button:** Send my application
**Success:** "Thank you. Your details have reached WUFPA. A coordinator in your sub-region
will contact you." ⟦Q8: add the expected timeframe once confirmed.⟧

---

## 16. Blocked content register

Everything above that cannot ship until WUFPA answers. Cross-referenced to
[01 § 10](01_PROJECT_FOUNDATION.md#10-open-questions-for-wufpa).

| Token location | Blocked on | Severity |
|---|---|---|
| All personal names site-wide | Q1 — spelling; Q4 — consent | **Launch blocker** |
| Footer, Contact — email and phone | Q3 | **Launch blocker** |
| Membership — fee, process, timeframe | Q8 | **Launch blocker** (primary conversion) |
| Awards Gala section | Q6 | **Launch blocker** (cannot publish a stale future tense) |
| UCC competition edition number | Q7 | High |
| Footer, Contact — social links | Q9 | High |
| Support — payment channel | Q22 | High |
| About — values | — (WUFPA confirmation of derived values) | Medium — omit if unresolved |
| Legal — URSB number | Q21 | Medium |
| SACCO — details | Q15 | Medium |
| Members — directory | Q16 | Deferred by design ([05 § 7](05_INFORMATION_ARCHITECTURE.md#7-what-is-deferred-and-what-happens-to-the-gap)) |
| Kibanda — schedule and how to host | — | Medium |
| Guild pages — activities | — | Low |
| Contact — opening hours | Q24 | Low |
| Map pin | Q14 | Low |
| News bylines | — | Low |

---

*Document 04 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
