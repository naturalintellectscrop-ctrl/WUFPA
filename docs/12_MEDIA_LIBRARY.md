# 12 — Media Library

*Every supplied asset, where it belongs, how to process it, and what is missing.*

---

## 1. Summary of what exists

| Asset type | Count | Location | Condition |
|---|---|---|---|
| Logos | 3 files (2 WUFPA variants + 1 SACCO) | `public/` | Raster JPEG only. Vector required |
| Standalone photographs | 4 | `public/` | Good. All duplicate PDF content at higher resolution |
| Photographs embedded in the profile PDF | ~72 | `WUFPA PROFILE 2026.pdf` | Not extracted. Mixed resolution |
| Document scans embedded in the PDF | 2 | pages 6–7 | Governance roster tables, as images |
| Page-background textures | 10 | throughout PDF | Print decoration. **Not for web use** |
| Video | **0** | — | `⚠ GAP` Q12 |
| Partner logo files | **0** | — | `⚠ GAP` Q10 |
| Film stills / posters | **0** | — | `⚠ GAP` Q11 |

**Total unique embedded images in the PDF: 84**, of which 10 are decorative page backgrounds
and 2 are scanned document tables, leaving **~72 usable photographic and logo assets**.

This is a genuinely strong archive for an organisation of this size. It is also entirely
unused today — the prototype uses 19 stock images from a third-party CDN and none of WUFPA's
own (X12, X35).

---

## 2. The supplied files

### 2.1 Logos

| Ref | File | Pixels | Content | Verdict |
|---|---|---|---|---|
| `[LOGO-A]` | `WUFPA  LOGO 2023.jpg.jpeg` | 1515 × 1529 | Full lockup: reel + red film strip, "WUFPA" wordmark, "Let the Story un Fold" | **The colour and form reference.** `#ED1B24` / `#231F20` on white |
| `[LOGO-B]` | `WhatsApp Image 2026-07-25 at 00.10.53.jpeg` | 1280 × 1221 | Same lockup, recompressed | Red shifts to `#D12028` from WhatsApp recompression. **Do not use as a colour reference** |
| `[LOGO-C]` | `WhatsApp Image 2026-07-25 at 00.10.53 (1).jpeg` | 1229 × 984 | WUFM SACCO: reel + blue/red ribbon, "WUFM SACCO", "Small Savings, Big Dreams" | `#2E3192` / `#ED1B24` on white. SACCO contexts only |

**Additional logo variants observed but not supplied as files:**

| Variant | Where seen | Status |
|---|---|---|
| Circular badge with black/yellow/red arc (Uganda flag colours) | `[P1]` cover | `⚠ GAP` — not supplied standalone |
| Icon-only (reel + strip, no wordmark) | `[P8] [P10] [P12] [P13] [P18]` as photo watermark | `⚠ GAP` — extractable from the PDF |

> Note the double file extensions (`.jpg.jpeg`) and WhatsApp default filenames. These are
> client originals and are **not renamed** — see [README § 5](README.md#5-folder-structure).
> Renaming applies to derived working copies only.

### 2.2 Standalone photographs

| Ref | File | Pixels | Subject | Also in PDF |
|---|---|---|---|---|
| `[PH-1]` | `IMG-20210304-WA0096.jpg.jpeg` | 1080 × 810 | Four men holding WUFPA "Certificate of Merit" certificates, outdoors | `[P5]`, cropped wider and at lower resolution |
| `[PH-2]` | `IMG-20230711-WA0206.jpg.jpeg` | 1080 × 810 | Large group (~50) with a "WUFPA Bunyoro Region" banner, outside brick buildings | `[P9]` |
| `[PH-3]` | `IMG_9788.JPG.jpeg` | **2400 × 1600** | ~25 people outside a wall painted "OBUKAMA BWA TOORO", Tooro Kingdom | `[P10]`, at 2190 × 1513 |
| `[PH-4]` | `WUFPA MEMBERSHIP CERTIFICATE (1).jpg.jpeg` | 1080 × 810 | ~12 people holding certificates beside a marquee — the "WUFPA Pioneers 2017" photograph | `[P7]`, at 1986 × 1200 |

**Three findings from this table:**

1. **`[PH-3]` is the highest-resolution asset supplied** and is the strongest homepage hero
   candidate ([03 § 7.3](03_BRAND_GUIDELINES.md#73-photography-by-context)).
2. **`[PH-1]` is materially better than the PDF version.** The embedded version on `[P5]` is
   567 × 282 — a severe wide crop. Always prefer the standalone.
3. **`[PH-4]` is misnamed.** It is not a membership certificate; it is the 2017 pioneers group
   photograph, captioned as such at `[P7]`. Anyone searching this folder for a certificate
   template will be misled.

---

## 3. Photographic catalogue, by profile page

Subjects are as captioned in the document or as visible in the photograph. Pixel dimensions
are the true embedded resolution, which is what determines usable display size.

> **On xref numbers.** The `xref` column is the PDF object identifier, given so an extraction
> script can pull a specific image. Where a page carries several photographs of similar shape,
> the mapping from xref to subject must be confirmed visually after extraction rather than
> assumed from this table.

### Page 4 — Founder and leadership portraits

| xref | Pixels | Subject | Destination |
|---|---|---|---|
| 19 | 793 × 871 | Portrait: Cyril Baryabawe | `/leadership/founders/`, PersonCard |
| 21 | 316 × 409 | Portrait: Mushana Amos | PersonCard only — too small for a profile hero |
| 23 | 370 × 434 | Portrait: Rev. Mwesigwa | PersonCard only |

### Page 5 — President and certificates

| xref | Pixels | Subject | Destination |
|---|---|---|---|
| 38 | 932 × 1122 | **Portrait: Katabazi George.** Best leadership portrait supplied | `/leadership/`, profile hero |
| 36 | 567 × 282 | Four men with certificates of merit — cropped wide | Use `[PH-1]` instead |

### Pages 6–7 — Governance roster (document scans)

| xref | Pixels | Content | Destination |
|---|---|---|---|
| 44 | 2210 × 3208 | Scanned table: Executive Committee, Trustees, Rwizi/Ankole, Rwenzori, Kigezi, Bunyoro coordinators | **Not published as an image.** Source data for the RosterTable component. Contains personal phone numbers — see § 7 |
| 64 | 2209 × 1868 | Scanned table: Tooro, Greater Bushenyi, Disciplinary Committee, Film Guild Heads | Same |
| 405 | 1986 × 1200 | **"WUFPA Pioneers 2017"** group photograph | `/about/history/`, `/membership/` |

### Page 8 — Greater Bushenyi and Sky TV

| xref | Pixels | Subject | Destination |
|---|---|---|---|
| 100 | 3000 × 1713 | **Sensitisation meeting with film producers and actors, Greater Bushenyi, 2022.** Highest-resolution photograph in the archive | `/regions/greater-bushenyi/`, `/programmes/advocacy/` |
| 102 | 989 × 1024 | Three people before Sky TV branding | `/programmes/distribution/`, `/partners/` |
| 104 | 1188 × 1024 | Handshake and document exchange, Sky TV MoU signing, 2022 | `/programmes/distribution/` — the best "formal agreement" image in the archive |

### Page 9 — Bunyoro and URSB

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 124, 126, 128 | 900×395, 2185×960, 1298×776 | Sensitisation film workshop, Bunyoro region, 2022 (large group, green chairs) · Group with WUFPA Bunyoro Region banner · Meeting with URSB regional offices, 2023 (four people) | `/regions/bunyoro/` · `/programmes/advocacy/` · `/partners/` |

Prefer `[PH-2]` for the banner photograph.

### Page 10 — Tooro

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 141 | 2190 × 1513 | Sensitisation workshop, Tooro, at Obukama bwa Tooro | Prefer `[PH-3]` (2400 × 1600) |
| 143, 145, 147 | 989×1544, 1171×751, 1171×781 | Workshop indoors on a wooden platform · Participants standing among craft displays · Three men seated on rocks | `/regions/tooro/` |

### Page 11 — Ankole districts and UCC

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 159 | 1800 × 1131 | Sensitisation, Ibanda/Kazo/Kiruhura/Kamwengye/Kitagwenda — participants in a linked-arm line outdoors | `/regions/ankole/` |
| 161, 163 | 1091 × 679 each | Seated discussion groups indoors | `/programmes/advocacy/` |
| 165 | 2185 × 1245 | **UCC "Western Uganda Film Makers" awareness workshop** on the Content Development Support Programme and Uganda Film Festival. ~100 people, UCC and Uganda Film Festival banners | `/programmes/training/`, `/partners/`. **Second-strongest hero candidate** |

### Page 12 — Uganda Parliamentary Forum for Creative Industries

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 175 | 2592 × 1458 | Speaker at the Uganda Parliamentary Forum for Creative Industries podium; panel seated | `/programmes/advocacy/` |
| 177 | 2181 × 762 | **"WUFPA Representatives"** — delegates seated at the forum with lanyards | `/programmes/advocacy/` |
| 178, 180, 182 | 680×378, 742×772, 533×657 | Forum auditorium and two podium speakers | Supporting images |

### Page 13 — Together Against Piracy

The most kinetic material in the archive.

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 198 | 2181 × 1392 | **"TOGETHER AGAINST PIRACY — Infringement on one's Copyright is A Crime!!"** banner carried in the street, with UCC, URSB, UFC, UFMI and Media Council logos | `/programmes/advocacy/` — **hero of that page** |
| 192, 194, 196 | 792×935, 1558×988, 1246×788 | Marchers with placards · March along a Mbarara street · Wide street view of the march | `/programmes/advocacy/` |
| 200 | 988 × 993 | Brass band marching; hand-lettered placards reading "PIRATING IS BAD" | `/programmes/advocacy/`, `/impact/` |

### Page 14 — AGM 2023 and Kigali

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 209 | 1600 × 885 | **WUFPA 2023 AGM** — ~100 members assembled outside a building | `/about/governance/`, `/impact/` |
| 210, 211, 212 | 864×548, 1040×513, 587×585 | Kigali International Content Market panel session · MashaRket / Mashariki African Film Festival banner ("Nov 25th – Dec 1st") · Delegate selfie | `/programmes/international/` |
| 214, 216 | 426 × 532 each | Festival delegate cards for Kamugisha William and Katabazi George | `/programmes/international/` — verifiable accreditation evidence |

### Page 15 — MTN YoTV and Joshua Stoone

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 226 | 1600 × 879 | **Sensitisation workshop with MTN YoTV, 2023** — "How to monetize film contents with YoTV channel". Large group under a marquee with WUFPA, MTN and YoTV banners | `/programmes/training/`, `/programmes/distribution/` |
| 225, 227 | 1600×827, 1024×598 | Group before a YoTV backdrop · Outdoor session with laptops | `/programmes/training/` |
| 229, 231 | 567×359, 226×299 | Outdoor circle session, 2023 · Portrait of Joshua Stoone, US film expert | `/programmes/training/`. **xref 231 at 226 × 299 is the smallest asset in the archive** — thumbnail use only |

### Page 16 — Matatu Film Lab / Film Possible

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 432 | 2185 × 1017 | Indoor training room, Matatu Film Lab, 2024 — participants in branded shirts, camera on tripod, projector | `/programmes/training/` |
| 247 | 2181 × 1208 | **Matatu Film Lab cohort** — 40+ participants in branded shirts, US Mission Uganda and Film Possible banners | `/programmes/training/` — **best "training at scale" image** |
| 249, 251 | 1324×998, 1100×998 | Outdoor group with equipment · Certificate presentation before a Film Possible backdrop | `/programmes/training/`, `/partners/` |

### Page 17 — Film Impact Movement, UFMI, Uganda Film Association

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 435 | 1462 × 898 | Group before a "Film Impact Movement" banner | `/programmes/training/`, `/partners/` |
| 273 | 599 × 300 | WUFPA receiving visitors from UFMI and the Uganda Film Association | `/partners/` |
| 275 | 709 × 319 | Meeting with UFMI CEO Arthur Mpeirwe and C/M Film Distributors | `/programmes/distribution/`, `/partners/` |

Both `[P17]` group photographs are low resolution relative to their page placement — use at
card size, not full width.

### Page 18 — Ntungamo, Rukungiri, Healing Together Uganda

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 287 | 2183 × 1137 | Sensitisation in Ntungamo and Rukungiri with the Uganda Film Publishers Association | `/regions/ankole/`, `/regions/kigezi/`, `/partners/` |
| 289, 291 | 464×359, 434×359 | Certificate of achievement being presented, two frames | `/impact/` |
| 293, 295 | 638×332, 630×385 | Workshop circle with raised joined hands, Healing Together Uganda · Group photograph | `/partners/`, `/impact/` |

### Page 19 — UCC competition master classes with Kampala Film School

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 307 | 1600 × 781 | Master class in session, two facilitators presenting | `/programmes/training/` |
| 309 | 1600 × 803 | Kampala Film School banner, flip chart, UCC 25 and Regional Film Competitions branding | `/programmes/training/`, `/partners/` |
| 311 | 1600 × 878 | Seated participants at a master class | `/programmes/training/` |

### Pages 20–21 — UCC Regional Film Competition awards

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 322 | 2176 × 1920 | Award winner holding a trophy and framed certificate with a cultural leader, UCC 25 backdrop | `/programmes/competitions/` — **hero of that page** |
| 321, 326, 328 | 1051×720, 1060×662, 1060×777 | Group of winners with trophies and certificates outdoors · Winners against the Regional Film Competitions backdrop · Further award group | `/programmes/competitions/` |
| 330 | 1867 × 942 | Wide award group | `/programmes/competitions/` |
| 324 | 391 × 536 | Vertical detail | Thumbnail only |
| 340 | 899 × 675 | **Prize cheque presentation** — oversized UCC cheque held by winners on a lit stage | `/programmes/competitions/`, `/impact/` |
| 342 | 1181 × 839 | Large winners' group with trophies against UCC 25 backdrop | `/programmes/competitions/` |

### Page 22 — UNATCOM for UNESCO

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 352 | 1502 × 688 | **Training workshop with UNATCOM for UNESCO** — facilitator addressing participants at blue-clothed tables | `/programmes/training/`, `/partners/` |
| 354 | 1200 × 644 | Group photograph of the UNATCOM workshop cohort indoors | `/programmes/training/` |

### Page 23 — WUFM SACCO certification

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 378 | 719 × 435 | **WUFM SACCO logo** — "Small Savings, Big Dreams" | Use `[LOGO-C]` instead (higher resolution) |
| 372 | 1793 × 1013 | Three men presenting the WUFM SACCO certificate, 24 October 2025 | `/sacco/` — **hero of that page** |
| 374, 376 | 765×1013, 368×506 | Certificate handshake with the Mbarara City Commercial Officer · Vertical detail | `/sacco/` |

### Page 24 — UFMI meeting, October 2025

| xrefs | Pixels | Subjects | Destination |
|---|---|---|---|
| 388 | 1800 × 1012 | Meeting with the UFMI CEO, 26 October 2025 — discussion around a table | `/programmes/advocacy/`, `/partners/` |
| 390 | 1512 × 941 | Group photograph after the meeting | `/programmes/advocacy/` |

### Excluded: page-background textures

xrefs 33, 369, 400, 417, 420, 440, 445, 451, 455, 459 — CMYK gradient/paper textures used as
print page backgrounds, typically 385 × 1026px stretched across a full A4 page.

**Do not use these on the website.** They are print decoration, they are low resolution
stretched to full-page size, and the web design does not use textured backgrounds
([07 § 2.1](07_DESIGN_SYSTEM.md#21-surface)).

---

## 4. Asset destinations, by page

The reverse view: what each website page needs, and what is available.

| Page | Primary image | Supporting | Status |
|---|---|---|---|
| `/` hero | `[PH-3]` Tooro workshop, 2400 × 1600 | `[P11]` xref 165 as alternate | ✔ Strong |
| `/` evidence strip | `[P8]` MoU · `[P15]` YoTV · `[P14]` Kigali · `[P16]` Matatu · `[P23]` SACCO · `[P13]` march | | ✔ Strong |
| `/about/` | `[P14]` AGM 2023 | `[P7]` Pioneers 2017 | ✔ |
| `/about/history/` | `[P7]` Pioneers 2017 | Timeline images throughout | ✔ |
| `/about/governance/` | `[P14]` AGM 2023 | | ✔ |
| `/leadership/` | `[P5]` Katabazi portrait | `[P4]` three portraits | ✔ Adequate; Q18 would improve |
| `/programmes/training/` | `[P16]` Matatu cohort | `[P19] [P22] [P15]` | ✔ Strong |
| `/programmes/advocacy/` | `[P13]` piracy banner | `[P13]` march set, `[P12]` forum, `[P18]` | ✔ Strong |
| `/programmes/kibanda/` | **None** | — | ⚠ **No Kibanda photograph exists.** Typographic treatment ([03 § 7.5](03_BRAND_GUIDELINES.md#75-when-there-is-no-photograph)). Do not borrow from another programme |
| `/programmes/distribution/` | `[P8]` Sky TV MoU | `[P15]` YoTV, `[P17]` distributors | ✔ |
| `/programmes/competitions/` | `[P20]` xref 322 trophy | `[P20] [P21]` award set, `[P21]` cheque | ✔ Strong |
| `/programmes/international/` | `[P14]` Kigali panel | Delegate cards | ✔ Adequate — nothing from ZIFF or Mashariki itself |
| `/regions/ankole/` | `[P11]` xref 159 | `[P18]` | ✔ |
| `/regions/kigezi/` | `[P17]` Kigezi sensitisation | `[P18]` | ⚠ Low resolution |
| `/regions/rwenzori/` | **None identified** | — | ⚠ **Gap.** No photograph is captioned as Rwenzori |
| `/regions/tooro/` | `[PH-3]` | `[P10]` set | ✔ Strong |
| `/regions/bunyoro/` | `[PH-2]` | `[P9]` set | ✔ |
| `/regions/greater-bushenyi/` | `[P8]` xref 100, 3000 × 1713 | | ✔ Strong |
| `/guilds/*` | **None** | — | ⚠ **No craft-specific photography.** Typographic treatment |
| `/membership/` | `[PH-4]` Pioneers, `[PH-1]` certificates | `[P18]` certificate presentation | ✔ |
| `/sacco/` | `[P23]` certification | `[LOGO-C]` | ✔ |
| `/partners/` | `[P16] [P22] [P17] [P8]` joint activity | | ✔ — photography-led, no logos needed (Q10) |
| `/impact/` | All albums | | ✔ Strong |
| `/contact/` | Static map | | ⚠ Q14 |

**Two structural gaps stand out:** the Kibanda Initiative and the Rwenzori sub-region have no
photography at all, and the ten guilds have no craft-specific imagery. All three are recorded
as collection priorities in § 8.

---

## 5. Processing specification

### 5.1 Folder structure

```
public/                          Client originals — READ ONLY, never modified
src/assets/
├── brand/
│   ├── wufpa-logo.svg           Redrawn vector, full lockup
│   ├── wufpa-logo-mono.svg
│   ├── wufpa-logo-reverse.svg
│   ├── wufpa-mark.svg           Reel + strip only
│   ├── wufm-sacco-logo.svg
│   └── favicon/                 favicon.svg, 32/180/192/512 PNG, site.webmanifest
├── photos/
│   ├── leadership/
│   ├── programmes/
│   │   ├── training/
│   │   ├── advocacy/
│   │   ├── distribution/
│   │   ├── competitions/
│   │   └── international/
│   ├── regions/
│   │   ├── ankole/ kigezi/ rwenzori/ tooro/ bunyoro/ greater-bushenyi/
│   ├── governance/
│   ├── sacco/
│   └── history/
└── og/                          Social sharing images
```

### 5.2 Naming convention

```
{subject}-{location}-{year}-{sequence}.{ext}
```

Lowercase, hyphenated, no spaces, no double extensions.

| Original | Working name |
|---|---|
| `IMG_9788.JPG.jpeg` | `sensitisation-workshop-tooro-obukama.jpg` |
| `IMG-20230711-WA0206.jpg.jpeg` | `sensitisation-workshop-bunyoro-2022-banner.jpg` |
| `WUFPA MEMBERSHIP CERTIFICATE (1).jpg.jpeg` | `pioneers-2017-certificates.jpg` |
| `IMG-20210304-WA0096.jpg.jpeg` | `certificates-of-merit-presentation.jpg` |
| PDF p13 xref 198 | `together-against-piracy-banner-mbarara.jpg` |
| PDF p5 xref 38 | `katabazi-george-portrait.jpg` |

Where a year is not known, omit it rather than guessing. Undated is a legitimate state
([09 § 12](09_PROGRAMMES_AND_EVENTS.md#12-rules-for-this-section-of-the-site)).

### 5.3 Extraction from the PDF

The photographs are embedded at their true resolution and can be extracted losslessly. **Do
not screenshot the pages** — a screenshot re-rasterises through the page's scaling and
loses roughly half the available pixels.

Extraction produces the original embedded JPEG bytes. Each extracted image must then be
visually matched to its subject against § 3 before renaming.

### 5.4 Derivative sizes

| Purpose | Widths | Format |
|---|---|---|
| Hero | 640, 960, 1280, 1920, 2400 | AVIF + WebP + JPEG |
| Card | 320, 480, 640, 960 | AVIF + WebP + JPEG |
| Portrait | 240, 400, 600, 900 | AVIF + WebP + JPEG |
| Gallery thumbnail | 320, 480, 640 | AVIF + WebP |
| Lightbox full | up to source width | AVIF + WebP + JPEG |
| Open Graph | 1200 × 630 | PNG or JPEG |

**Hard rule: never generate a derivative wider than the source.** The build must fail rather
than upscale. Several assets — xref 231 at 226 × 299, xref 376 at 368 × 506 — cannot produce
anything above thumbnail size, and stretching them would be visible
([03 § 7.4](03_BRAND_GUIDELINES.md#74-technical-and-ethical-standards)).

### 5.5 Quality and weight budget

| Format | Quality | Target weight |
|---|---|---|
| AVIF | ~50 | Hero ≤ 120 KB, card ≤ 40 KB |
| WebP | ~78 | Hero ≤ 180 KB, card ≤ 60 KB |
| JPEG fallback | ~80, progressive | Hero ≤ 250 KB |

Strip all EXIF except copyright, after recording orientation. Correct exposure and white
balance only — no stylistic grading
([03 § 7.2](03_BRAND_GUIDELINES.md#72-what-the-real-photography-is-like-and-how-to-use-it)).

### 5.6 Per-asset metadata

Every processed photograph carries a record:

```yaml
file:            together-against-piracy-banner-mbarara.jpg
source:          "WUFPA PROFILE 2026.pdf, p13, xref 198"
intrinsic:       { w: 2181, h: 1392 }
maxDisplayWidth: 2181
alt:             "Members of WUFPA carry a banner reading 'Together Against Piracy —
                  Infringement on one's Copyright is A Crime' through a street in Mbarara."
caption:         "The Together Against Piracy campaign, Mbarara."
date:            null              # not recorded
dateNote:        "Date not recorded"
location:        "Mbarara"
subRegion:       ankole
programme:       advocacy
partners:        [ucc, ursb, ufc, ufmi, media-council]
objectPosition:  "center 40%"
credit:          null              # Q19
consent:         pending           # Q4
```

`consent: pending` is enforced at build: an image without recorded consent does not render.
That makes the privacy rule structural rather than a matter of anyone remembering
([11 § 6](11_TEAM_AND_LEADERSHIP.md#6-privacy-and-personal-data)).

---

## 6. Alt text

### 6.1 Rules

- **Describe what is in the photograph**, not what the page is about.
- **The caption adds context; `alt` describes.** They are never the same string (X26).
- 100–160 characters. Long enough to convey the scene, short enough to be heard.
- No "image of", "photo of", "picture showing".
- Name people only where identified and consented.
- Where a banner or sign carries text that matters, **quote it** — it is often the most
  informative thing in the frame.

### 6.2 Worked examples

| Asset | `alt` | Caption |
|---|---|---|
| `[PH-3]` | "About twenty-five WUFPA members stand and sit together on grass in front of a wall painted 'Obukama bwa Tooro'." | "Sensitisation film workshop in the Tooro sub-region, hosted at Obukama bwa Tooro. Date not recorded." |
| `[P13]` xref 198 | "Members carry a wide banner reading 'Together Against Piracy — Infringement on one's Copyright is A Crime' along a street, with a second banner behind." | "The Together Against Piracy campaign, Mbarara. Date not recorded." |
| `[P5]` xref 38 | "Katabazi George, wearing a white Ankole City Filmz polo shirt, photographed outdoors." | "Katabazi George, President of WUFPA." |
| `[P23]` xref 372 | "Three men hold a WUFM SACCO certificate between them beside a table set with documents." | "WUFPA members receive the WUFM SACCO certificate with the Mbarara City Commercial Officer, 24 October 2025." |
| `[P16]` xref 247 | "More than forty participants in blue Matatu Film Lab shirts sit and kneel in rows on grass, with US Mission Uganda and Film Possible banners behind." | "The Matatu Film Lab cohort, delivered with Film Possible and US Mission Uganda, 2024." |
| `[P21]` xref 340 | "A group on a lit stage holds an oversized Uganda Communications Commission cheque, with trophies and a framed certificate." | "Prize presentation at the UCC Regional Film Competition. Date not recorded." |
| `[PH-4]` | "About twelve people stand in a line on grass beside a marquee, each holding a WUFPA certificate." | "WUFPA pioneers, 2017." |
| Decorative texture | `alt=""` | — |

---

## 7. Personal data in the media

Two of the embedded images — the roster scans at `[P6]` xref 44 and `[P7]` xref 64 — contain
approximately **60 personal mobile telephone numbers**.

**Rules:**

1. **These two images are never published on the website**, in any size, in any gallery, or
   as a downloadable document.
2. **The extracted images are not committed** to the website repository. Their data is
   transcribed into the roster content model, minus the telephone column.
3. **The RosterTable component cannot render a telephone column**, by design
   ([08 § 25](08_COMPONENT_LIBRARY.md#25-rostertable)).
4. If WUFPA wishes to publish the profile PDF as a download
   ([04 § 15](04_CONTENT_BIBLE.md#15-contact)), **a redacted version must be produced first** —
   the original file exposes those 60 numbers to anyone who downloads it. This is easy to miss
   and worth flagging explicitly at handover.

### 7.1 Redaction — completed *(WUFPA-003, 26 July 2026)*

| | |
|---|---|
| **Script** | [`scripts/redact-profile-pdf.py`](../scripts/redact-profile-pdf.py) — reproducible, re-runnable |
| **Source** | `client-archive/originals/WUFPA PROFILE 2026.pdf` — preserved unmodified |
| **Output** | `public/downloads/wufpa-association-profile-2026-redacted.pdf` |
| **Method** | `fitz.PDF_REDACT_IMAGE_PIXELS` — the covered pixels are **destroyed and the image rewritten**, not hidden behind a rectangle |
| **Region** | CONTACT column, x-fraction 0.688–0.845 of the scan width, full table height, pages 6 and 7 |
| **Verification** | Dark-pixel count in the CONTACT band: **31,570 → 0** (p6) and **18,341 → 0** (p7). Pages rendered and read to confirm names, roles and districts remain fully legible |

**Why pixel destruction rather than a black box.** The roster tables are raster scans, so the
telephone numbers are image data. A filled rectangle drawn over an image leaves the original
pixels in the file, recoverable by anyone who extracts the embedded image. That is the single
most common redaction failure and it would have left the data fully exposed.

> ⚠ **One telephone number remains, deliberately.** Page 3 carries `+256701927701` as selectable
> text — WUFPA's own published head-office contact. Per `[P6]` this is the President's personal
> mobile ([01 § 9.2 X7](01_PROJECT_FOUNDATION.md#92-critical--must-not-ship)). It is **not**
> removed, because it is the contact WUFPA chose to publish in its own profile and stripping it
> would leave the document with no contact route at all. **Resolution is question Q3.** If WUFPA
> confirms an association line, re-run the script with page 3 added to the redaction set.

> ⚠ **File size.** The redacted edition is 27.6 MB. On metered mobile data
> ([01 § 7 C1](01_PROJECT_FOUNDATION.md#7-constraints)) that is a punitive download and
> arguably an access barrier. **Recommendation:** before publishing it as a press or partner
> download, produce a downsampled web edition (target ≤5 MB) alongside the full-resolution
> archive copy. Raised as a follow-up, not completed under WUFPA-003.

Full reasoning: [11 § 6](11_TEAM_AND_LEADERSHIP.md#6-privacy-and-personal-data).

---

## 8. Missing assets

### 8.1 Blocking or high impact

| # | Missing | Impact | Q |
|---|---|---|---|
| M1 | **Vector logo** (AI/EPS/CDR/SVG) | The logo must be redrawn from JPEG. Reverse and mono variants cannot be produced faithfully without it | Q13 |
| M2 | **Consent records** for photographed individuals | No photograph of an identifiable person can be published without it | Q4 |
| M3 | **Partner logo files and permissions** | Partners page is photography-only | Q10 |
| M4 | **Any video** | No moving image, for an association of filmmakers | Q12 |
| M5 | **Any film still, poster or title** | No film content of any kind can exist on the site | Q11 |
| M6 | **Kibanda Initiative photography** | The most distinctive programme has no imagery | — |
| M7 | **Rwenzori sub-region photography** | One of six regions has no photograph | — |
| M8 | **Photographer credits and dates** | Roughly half the archive is undatable and uncredited | Q19 |

### 8.2 Would materially improve the site

| # | Missing | Impact |
|---|---|---|
| M9 | Higher-resolution leadership portraits (Q18) | Two of four are card-size only |
| M10 | Portraits of the remaining Executive Committee | Leadership page is four faces and 56 names |
| M11 | Photographs of the head office | No image of WUFPA's own premises exists |
| M12 | The membership certificate itself | Referenced as a benefit; the artefact is only visible in members' hands |
| M13 | Guild-specific photography — camera, sound, edit, costume | Ten guild pages with no craft imagery |
| M14 | Names of individuals in group photographs (Q20) | Weaker alt text and captions |
| M15 | Awards Gala photography | Depends on Q6 |
| M16 | ZIFF and Mashariki delegation photography | Only Kigali is documented |

---

## 9. Future media collection

A standing brief for WUFPA, so the archive improves without a photographer being hired.

### 9.1 At every activity, capture

1. **A wide establishing shot** with the banner or venue visible — this is what dates and
   locates the event later.
2. **Three or four working shots** — people doing the thing, not posing.
3. **The group photograph** — WUFPA already does this consistently and it is the right
   instinct.
4. **One or two portraits** of participants, with permission.
5. **The artefact** — certificate, trophy, signed document, equipment.

### 9.2 Record with every photograph

Date · district and sub-region · programme · partner organisations present · names of
identifiable people, with consent · photographer.

**A photograph without a date loses most of its value on a website.** Ten seconds of
note-taking at the time is worth more than any amount of processing later.

### 9.3 Practical guidance

- **Shoot horizontally for the website**, vertically for social. Both, where possible.
- **Highest resolution the phone allows.** Storage is cheaper than a missed hero image.
- **Send originals, not WhatsApp forwards.** Three of the four standalone files supplied have
  been through WhatsApp compression; `[LOGO-B]` visibly shifted colour as a result.
- **One folder per activity**, named `YYYY-MM-DD-place-activity`.

### 9.4 Priority list

If WUFPA can only do a few things:

1. A Kibanda screening, photographed properly (M6)
2. Any activity in the Rwenzori sub-region (M7)
3. Portraits of the Executive Committee, consistently shot (M10)
4. The head office exterior and interior (M11)
5. A short video — even three minutes on a phone: the President on what WUFPA is, a member on
   what it changed, a workshop in progress (M4)

---

*Document 12 of 20 · Version 1.0 · 25 July 2026 · Initial release.*
