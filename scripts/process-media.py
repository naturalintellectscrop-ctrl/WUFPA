#!/usr/bin/env python3
"""
WUFPA-056 — Process, route and record the extracted photographic archive.

Three jobs:

  1. ROUTE     Move the 29 visually-confirmed assets out of _review/ into their
               destination folders with descriptive names, then remove _review/.
  2. MEASURE   Report exposure and white-balance statistics for every asset so
               correction is applied on evidence rather than by blanket filter.
               docs/03 section 7.2 is explicit: correct exposure and white balance
               ONLY. Documentary photography that is "fixed" into looking like
               commissioned agency work stops reading as authentic.
  3. RECORD    Rewrite manifest.json with final paths and measurements.

Reference:  docs/12_MEDIA_LIBRARY.md sections 5.2, 5.5, 5.6
            docs/03_BRAND_GUIDELINES.md section 7.2
Usage:      python scripts/process-media.py [--apply-corrections]
"""
import json
import os
import shutil
import sys

try:
    from PIL import Image, ImageStat
except ImportError:
    sys.exit("Pillow required:  python -m pip install pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS = os.path.join(ROOT, "src", "assets", "photos")
REVIEW = os.path.join(PHOTOS, "_review")
MANIFEST = os.path.join(PHOTOS, "manifest.json")

# ── Visually confirmed 26 July 2026 from contact sheets ──────────────────────
# xref -> (destination folder, slug)
ROUTES = {
    124: ("regions/bunyoro", "sensitisation-workshop-bunyoro-2022-banner"),
    126: ("regions/bunyoro", "sensitisation-film-workshop-bunyoro-2022"),
    128: ("programmes/advocacy", "ursb-regional-offices-meeting-2023"),
    141: ("regions/tooro", "sensitisation-workshop-tooro-obukama-bwa-tooro"),
    143: ("regions/tooro", "sensitisation-tooro-participants-outdoor"),
    145: ("regions/tooro", "sensitisation-workshop-tooro-craft-display"),
    147: ("regions/tooro", "sensitisation-workshop-tooro-session"),
    161: ("regions/ankole", "sensitisation-ankole-districts-discussion"),
    163: ("regions/ankole", "sensitisation-ankole-districts-facilitator"),
    178: ("programmes/advocacy", "parliamentary-forum-creative-industries-hall"),
    180: ("programmes/advocacy", "parliamentary-forum-speaker-podium-1"),
    182: ("programmes/advocacy", "parliamentary-forum-speaker-podium-2"),
    192: ("programmes/advocacy", "together-against-piracy-ankole-city-actors-banner"),
    196: ("programmes/advocacy", "together-against-piracy-march-mbarara-street"),
    212: ("programmes/international", "mashariki-film-festival-banner-2023"),
    225: ("programmes/training", "mtn-yotv-workshop-2023-session"),
    227: ("programmes/training", "mtn-yotv-workshop-2023-group-backdrop"),
    229: ("programmes/training", "joshua-stoone-visit-2023-outdoor-circle"),
    249: ("programmes/training", "matatu-film-lab-2024-outdoor-session"),
    289: ("programmes/advocacy", "certificate-of-achievement-presentation-1"),
    291: ("programmes/advocacy", "certificate-of-achievement-presentation-2"),
    293: ("programmes/advocacy", "healing-together-uganda-workshop-circle"),
    295: ("programmes/advocacy", "healing-together-uganda-group"),
    321: ("programmes/competitions", "ucc-regional-competition-ceremony-stage"),
    324: ("programmes/competitions", "uganda-film-festival-banner"),
    326: ("programmes/competitions", "ucc-regional-competition-winners-outdoor"),
    328: ("programmes/competitions", "ucc-regional-competition-trophy-cultural-leader"),
    330: ("programmes/competitions", "ucc-regional-competition-winners-backdrop"),
    376: ("sacco", "wufm-sacco-certificate-handover-2025"),
}

# Correction thresholds. Deliberately wide — documentary photography is
# supposed to look like documentary photography.
DARK, BRIGHT = 68, 202          # mean luminance outside this band = exposure outlier
CAST = 0.14                     # channel deviation from grey-world beyond this = colour cast


def measure(path):
    with Image.open(path) as im:
        rgb = im.convert("RGB")
        st = ImageStat.Stat(rgb)
        r, g, b = st.mean
        lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
        avg = (r + g + b) / 3 or 1
        cast = max(abs(r - avg), abs(g - avg), abs(b - avg)) / avg
        return {
            "meanLuminance": round(lum, 1),
            "channelMeans": [round(r, 1), round(g, 1), round(b, 1)],
            "colourCast": round(cast, 3),
            "exposureFlag": "dark" if lum < DARK else ("bright" if lum > BRIGHT else None),
            "castFlag": bool(cast > CAST),
        }


def route():
    if not os.path.isdir(REVIEW):
        print("  _review/ already cleared")
        return {}
    moved = {}
    for dp, _, fn in os.walk(REVIEW):
        for f in fn:
            src = os.path.join(dp, f)
            base, ext = os.path.splitext(f)
            try:
                xref = int(base.split("xref")[1])
            except (IndexError, ValueError):
                print(f"  ! unparsable name, left in place: {f}")
                continue
            if xref not in ROUTES:
                print(f"  ! xref {xref} unrouted, left in place: {f}")
                continue
            folder, slug = ROUTES[xref]
            dest_dir = os.path.join(PHOTOS, *folder.split("/"))
            os.makedirs(dest_dir, exist_ok=True)
            dest = os.path.join(dest_dir, f"{slug}{ext}")
            shutil.move(src, dest)
            moved[xref] = f"{folder}/{slug}{ext}"
            print(f"  {xref:>4} -> {folder}/{slug}{ext}")
    remaining = [f for _, _, fn in os.walk(REVIEW) for f in fn]
    if not remaining:
        shutil.rmtree(REVIEW)
        print("  _review/ removed")
    else:
        print(f"  _review/ retained — {len(remaining)} file(s) still unrouted")
    return moved


def main():
    print("ROUTING CONFIRMED ASSETS")
    moved = route()

    print(f"\n  {len(moved)} asset(s) routed\n")

    with open(MANIFEST, encoding="utf-8") as fh:
        data = json.load(fh)

    print("MEASURING EXPOSURE AND WHITE BALANCE")
    flagged = []
    for rec in data["assets"]:
        if rec["xref"] in moved:
            rec["file"] = moved[rec["xref"]]
            rec["category"] = "photo"
            rec["suggestedDestination"] = os.path.dirname(moved[rec["xref"]])
            rec["visuallyConfirmed"] = True
        elif rec["category"] == "photo":
            rec["visuallyConfirmed"] = True

        path = os.path.join(PHOTOS, *rec["file"].split("/"))
        if not os.path.exists(path):
            print(f"  ! missing on disk: {rec['file']}")
            continue
        rec["measurements"] = measure(path)
        if rec["measurements"]["exposureFlag"] or rec["measurements"]["castFlag"]:
            flagged.append(rec)

    data["assetCount"] = len(data["assets"])
    data["reviewComplete"] = True
    with open(MANIFEST, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2)

    total = len(data["assets"])
    print(f"  {total} assets measured")
    print(f"  {total - len(flagged)} within normal exposure and colour range "
          f"({100 * (total - len(flagged)) / total:.0f}%)")
    print(f"  {len(flagged)} flagged for review:\n")
    for r in sorted(flagged, key=lambda x: x["measurements"]["meanLuminance"]):
        m = r["measurements"]
        reasons = []
        if m["exposureFlag"]:
            reasons.append(f"{m['exposureFlag']} (lum {m['meanLuminance']})")
        if m["castFlag"]:
            reasons.append(f"cast {m['colourCast']:.2f} RGB{tuple(m['channelMeans'])}")
        print(f"    {r['file']}")
        print(f"        {', '.join(reasons)}")

    print(f"\n  manifest updated: {MANIFEST}")
    print("\n  No pixels were altered. Corrections, if any, are applied only to the")
    print("  flagged assets above and only after per-image judgement — never in bulk.")


if __name__ == "__main__":
    main()
