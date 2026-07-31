#!/usr/bin/env python3
"""
WUFPA-003 â€” Redact the association profile PDF.

Removes the CONTACT column from the governance roster tables on pages 6 and 7,
which carry the personal mobile telephone numbers of ~60 office-holders.

Those tables are RASTER SCANS, not selectable text, so redaction is performed by
destroying the underlying image pixels (fitz.PDF_REDACT_IMAGE_PIXELS) rather than
by drawing an opaque rectangle. A black box over an image leaves the data intact
underneath and is not redaction.

Reference:  docs/12_MEDIA_LIBRARY.md  section 7
            docs/11_TEAM_AND_LEADERSHIP.md  section 6
Legal basis: Uganda Data Protection and Privacy Act, 2019

Usage:  python scripts/redact-profile-pdf.py
"""
import os
import re
import sys

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("PyMuPDF required:  python -m pip install pymupdf")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "client-archive", "originals", "WUFPA PROFILE 2026.pdf")
OUT_DIR = os.path.join(ROOT, "public", "downloads")
OUT = os.path.join(OUT_DIR, "wufpa-association-profile-2026-redacted.pdf")

# Roster pages carrying personal telephone numbers.
# page_index -> xref of the embedded table scan
ROSTER_PAGES = {5: 44, 6: 64}

# CONTACT column, as a fraction of the scan's width.
# Measured from the table borders: column spans 0.6846-0.8462; the interior is
# inset slightly so the vertical rules survive and the table still reads as a table.
COL_START, COL_END = 0.688, 0.845

PHONE_RE = re.compile(r"(?:\+?256|0)\s?7\d{2}[\s-]?\d{3}[\s-]?\d{3}")


def scan_text_phones(doc, label):
    """Report telephone numbers present as selectable text (not pixels)."""
    found = []
    for i, page in enumerate(doc):
        for m in PHONE_RE.finditer(page.get_text("text")):
            found.append((i + 1, m.group(0).strip()))
    print(f"  {label}: {len(found)} telephone number(s) in selectable text")
    for pg, num in found:
        print(f"      page {pg}: {num}")
    return found


def main():
    if not os.path.exists(SRC):
        sys.exit(f"Source not found: {SRC}")

    os.makedirs(OUT_DIR, exist_ok=True)
    doc = fitz.open(SRC)

    print(f"Source: {SRC}")
    print(f"  {doc.page_count} pages, {os.path.getsize(SRC) / 1024 / 1024:.1f} MB\n")

    print("BEFORE")
    scan_text_phones(doc, "text scan")

    print("\nREDACTING RASTER ROSTER TABLES")
    for pno, xref in ROSTER_PAGES.items():
        page = doc[pno]
        rects = page.get_image_rects(xref)
        if not rects:
            sys.exit(f"  page {pno + 1}: image xref {xref} not found â€” aborting")
        r = rects[0]

        target = fitz.Rect(
            r.x0 + COL_START * r.width,
            r.y0,
            r.x0 + COL_END * r.width,
            r.y1,
        )
        page.add_redact_annot(target)
        # PDF_REDACT_IMAGE_PIXELS rewrites the image with the covered pixels removed.
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_PIXELS)
        print(f"  page {pno + 1}: cleared CONTACT column "
              f"({target.width:.1f} x {target.height:.1f} pt at x={target.x0:.1f})")

    # garbage=4 + deflate + clean rebuilds and losslessly recompresses the file.
    doc.save(OUT, garbage=4, deflate=True, clean=True)
    doc.close()

    print("\nAFTER")
    out_doc = fitz.open(OUT)
    scan_text_phones(out_doc, "text scan")
    out_doc.close()

    src_mb = os.path.getsize(SRC) / 1024 / 1024
    out_mb = os.path.getsize(OUT) / 1024 / 1024
    print(f"\nWritten: {OUT}")
    print(f"  {out_mb:.1f} MB (source {src_mb:.1f} MB, {100 * (1 - out_mb / src_mb):+.0f}%)")
    if out_mb > 8:
        print(f"  NOTE: {out_mb:.0f} MB is a heavy download on metered mobile data "
              f"(constraint C1). Consider a downsampled web edition.")


if __name__ == "__main__":
    main()

