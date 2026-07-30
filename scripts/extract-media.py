#!/usr/bin/env python3
"""
WUFPA-055 â€” Extract the photographic archive from the association profile PDF.

The profile embeds ~72 usable documentary photographs of WUFPA members at real
activities. They are extracted at NATIVE RESOLUTION (the original embedded JPEG
bytes), never by screenshotting a rendered page â€” a screenshot re-rasterises
through page scaling and loses roughly half the available pixels.

Three categories are handled distinctly:

  PHOTOGRAPHS   routed to src/assets/photos/<destination>/ per docs/12 section 3
  BACKGROUNDS   the 10 CMYK page textures â€” print decoration, excluded entirely
  QUARANTINE    the 2 roster scans (xref 44, 64) carrying ~60 personal telephone
                numbers. Written to _quarantine/, which .gitignore blocks.

Anything not explicitly mapped lands in _review/page-NN/ for visual confirmation.
docs/12 section 3 warns that where a page carries several photographs of similar
shape, xref-to-subject mapping must be confirmed visually rather than assumed.

Reference:  docs/12_MEDIA_LIBRARY.md sections 3, 5
Usage:      python scripts/extract-media.py
"""
import json
import os
import sys

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("PyMuPDF required:  python -m pip install pymupdf")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "client-archive", "originals", "WUFPA PROFILE 2026.pdf")
PHOTOS = os.path.join(ROOT, "src", "assets", "photos")
MANIFEST = os.path.join(PHOTOS, "manifest.json")

# â”€â”€ Page-background textures: print decoration, never used on the web â”€â”€â”€â”€â”€â”€â”€â”€â”€
BACKGROUNDS = {33, 369, 400, 417, 420, 440, 445, 451, 455, 459}

# â”€â”€ Roster scans carrying ~60 personal telephone numbers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
QUARANTINE = {44: "roster-scan-p6", 64: "roster-scan-p7"}

# â”€â”€ Confident xref -> (folder, slug) mappings, from docs/12 section 3 â”€â”€â”€â”€â”€â”€â”€â”€
# Only images whose subject is unambiguous are named here. Everything else is
# routed to _review/ rather than guessed at.
MAP = {
    # p4-p5 leadership portraits
    19:  ("leadership", "cyril-baryabawe-portrait"),
    21:  ("leadership", "mushana-amos-portrait"),
    23:  ("leadership", "rev-mwesigwa-portrait"),
    38:  ("leadership", "katabazi-george-portrait"),
    36:  ("history", "certificates-of-merit-presentation-crop"),
    # p7 pioneers
    405: ("history", "wufpa-pioneers-2017"),
    # p8 Greater Bushenyi + Sky TV
    100: ("regions/greater-bushenyi", "sensitisation-meeting-greater-bushenyi-2022"),
    102: ("programmes/distribution", "sky-tv-mbarara-mou-2022-group"),
    104: ("programmes/distribution", "sky-tv-mbarara-mou-2022-signing"),
    # p11 UCC awareness workshop
    165: ("programmes/training", "ucc-awareness-workshop-content-development"),
    159: ("regions/ankole", "sensitisation-ibanda-kazo-kiruhura-kamwengye-kitagwenda"),
    # p12 Parliamentary Forum
    175: ("programmes/advocacy", "parliamentary-forum-creative-industries-podium"),
    177: ("programmes/advocacy", "parliamentary-forum-wufpa-representatives"),
    # p13 Together Against Piracy
    198: ("programmes/advocacy", "together-against-piracy-banner-mbarara"),
    200: ("programmes/advocacy", "together-against-piracy-brass-band-placards"),
    194: ("programmes/advocacy", "together-against-piracy-march-street"),
    # p14 AGM + Kigali
    209: ("governance", "wufpa-agm-2023"),
    210: ("programmes/international", "kigali-content-market-2023-panel"),
    211: ("programmes/international", "mashariki-mashaRket-banner-2023"),
    214: ("programmes/international", "kigali-delegate-card-kamugisha-william"),
    216: ("programmes/international", "kigali-delegate-card-katabazi-george"),
    # p15 MTN YoTV
    226: ("programmes/training", "mtn-yotv-monetisation-workshop-2023"),
    231: ("programmes/training", "joshua-stoone-us-film-expert-2023"),
    # p16 Matatu Film Lab
    247: ("programmes/training", "matatu-film-lab-cohort-2024"),
    432: ("programmes/training", "matatu-film-lab-training-room-2024"),
    251: ("programmes/training", "matatu-film-lab-certificate-film-possible"),
    # p17 Film Impact Movement / UFMI
    435: ("programmes/training", "film-impact-movement-usa-workshop"),
    273: ("programmes/advocacy", "ufmi-uganda-film-association-visit"),
    275: ("programmes/distribution", "ufmi-ceo-arthur-mpeirwe-film-distributors"),
    # p18 Ntungamo / Rukungiri
    287: ("regions/kigezi", "sensitisation-ntungamo-rukungiri-film-publishers"),
    # p19 UCC master classes with Kampala Film School
    307: ("programmes/training", "ucc-master-class-kampala-film-school-session"),
    309: ("programmes/training", "ucc-master-class-kampala-film-school-banner"),
    311: ("programmes/training", "ucc-master-class-participants"),
    # p20-p21 UCC Regional Film Competition awards
    322: ("programmes/competitions", "ucc-regional-film-competition-trophy-winner"),
    340: ("programmes/competitions", "ucc-regional-film-competition-prize-cheque"),
    342: ("programmes/competitions", "ucc-regional-film-competition-winners-group"),
    # p22 UNATCOM for UNESCO
    352: ("programmes/training", "unatcom-unesco-training-workshop"),
    354: ("programmes/training", "unatcom-unesco-workshop-cohort"),
    # p23 WUFM SACCO
    372: ("sacco", "wufm-sacco-certificate-presentation-2025"),
    374: ("sacco", "wufm-sacco-certificate-commercial-officer-2025"),
    378: ("sacco", "wufm-sacco-logo-embedded"),
    # p24 UFMI meeting
    388: ("programmes/advocacy", "ufmi-ceo-meeting-2025-discussion"),
    390: ("programmes/advocacy", "ufmi-ceo-meeting-2025-group"),
}

# Region pages whose remaining unmapped images belong to a known sub-region.
PAGE_HINT = {
    9:  "regions/bunyoro",
    10: "regions/tooro",
    11: "regions/ankole",
    12: "programmes/advocacy",
    13: "programmes/advocacy",
    15: "programmes/training",
    16: "programmes/training",
    18: "regions/kigezi",
    20: "programmes/competitions",
    21: "programmes/competitions",
    23: "sacco",
}


def main():
    if not os.path.exists(SRC):
        sys.exit(f"Source not found: {SRC}")

    doc = fitz.open(SRC)
    seen, records = set(), []
    counts = {"photo": 0, "review": 0, "background": 0, "quarantine": 0, "duplicate": 0}

    for pno, page in enumerate(doc, start=1):
        for img in page.get_images(full=True):
            xref = img[0]
            if xref in seen:
                counts["duplicate"] += 1
                continue
            seen.add(xref)

            if xref in BACKGROUNDS:
                counts["background"] += 1
                continue

            info = doc.extract_image(xref)
            w, h, ext = info["width"], info["height"], info["ext"]

            if xref in QUARANTINE:
                folder, slug = "_quarantine", QUARANTINE[xref]
                counts["quarantine"] += 1
                category = "quarantine"
            elif xref in MAP:
                folder, slug = MAP[xref]
                counts["photo"] += 1
                category = "photo"
            else:
                folder = f"_review/page-{pno:02d}"
                slug = f"p{pno:02d}-xref{xref}"
                counts["review"] += 1
                category = "review"

            out_dir = os.path.join(PHOTOS, *folder.split("/"))
            os.makedirs(out_dir, exist_ok=True)
            path = os.path.join(out_dir, f"{slug}.{ext}")
            with open(path, "wb") as fh:
                fh.write(info["image"])

            if category == "quarantine":
                continue  # never recorded in the published manifest

            records.append({
                "file": f"{folder}/{slug}.{ext}",
                "source": f"WUFPA PROFILE 2026.pdf, p{pno}, xref {xref}",
                "sourcePage": pno,
                "xref": xref,
                "intrinsic": {"w": w, "h": h},
                "maxDisplayWidth": w,
                "bytes": len(info["image"]),
                "category": category,
                "suggestedDestination": MAP.get(xref, (PAGE_HINT.get(pno, "unassigned"),))[0],
                # Required before publication â€” see docs/12 sections 5.6 and 6
                "alt": None,
                "caption": None,
                "date": None,
                "credit": None,
                "consent": "pending",
            })

    records.sort(key=lambda r: (r["sourcePage"], r["xref"]))
    os.makedirs(PHOTOS, exist_ok=True)
    with open(MANIFEST, "w", encoding="utf-8") as fh:
        json.dump({
            "generatedBy": "scripts/extract-media.py (WUFPA-055)",
            "source": "public/originals/WUFPA PROFILE 2026.pdf",
            "note": "alt, caption, date and consent are REQUIRED before any asset renders. "
                    "See WUFPA-057 (alt text) and WUFPA-059 (consent register).",
            "assetCount": len(records),
            "assets": records,
        }, fh, indent=2)

    print(f"Source: {SRC}\n")
    print(f"  photographs mapped to destination : {counts['photo']}")
    print(f"  awaiting visual confirmation      : {counts['review']}")
    print(f"  page backgrounds excluded         : {counts['background']}")
    print(f"  roster scans quarantined          : {counts['quarantine']}")
    print(f"  repeat placements skipped         : {counts['duplicate']}")
    print(f"\n  extractable assets in manifest    : {len(records)}")
    print(f"  manifest: {MANIFEST}")

    small = [r for r in records if r["intrinsic"]["w"] < 700]
    if small:
        print(f"\n  {len(small)} asset(s) below 700px wide â€” thumbnail use only, never upscale:")
        for r in small:
            print(f"      {r['intrinsic']['w']:>5}x{r['intrinsic']['h']:<5} {r['file']}")


if __name__ == "__main__":
    main()

