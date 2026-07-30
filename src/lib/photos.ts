/**
 * Photo manifest loader — bridges the flat file archive in src/assets/photos/
 * to Astro's typed image pipeline.
 *
 * `import.meta.glob` resolves every photograph to an ImageMetadata at build
 * time, keyed by its path relative to src/assets/photos/. getPhoto() looks
 * that image up by the same `file` field the manifest and every metadata
 * record already use, so a caller never needs a raw import path.
 *
 * `_quarantine/**` IS EXCLUDED, NOT INCIDENTALLY. It holds the two roster-scan
 * images redacted under WUFPA-003 (~60 personal mobile numbers,
 * docs/12 section 7) — they must never be readable by any build tool, let
 * alone processed into `dist/`. A first version of this glob was
 * unqualified and Vite's eager import pulled both files into the module
 * graph regardless of whether any component referenced them, which was
 * enough for Astro's image pipeline to emit optimised copies into
 * `dist/_astro/` — caught by `scripts/check-no-personal-data.mjs` before
 * shipping, not by inspection. The exclusion here is the actual fix; the
 * guard is what proved it was needed and stays as the second line of
 * defence, not the first.
 */
import type { ImageMetadata } from 'astro';
import manifest from '../assets/photos/manifest.json';

const images = import.meta.glob<{ default: ImageMetadata }>(
  ['/src/assets/photos/**/*.{jpeg,jpg,png}', '!/src/assets/photos/_quarantine/**'],
  { eager: true },
);

export interface PhotoRecord {
  image: ImageMetadata;
  alt: string;
  caption: string | null;
  date: string | null;
  dateNote: string | null;
  credit: string | null;
  consent: 'granted' | 'pending' | 'refused';
  maxDisplayWidth: number;
}

const byFile = new Map<string, PhotoRecord>();
for (const asset of manifest.assets) {
  const match = Object.entries(images).find(([path]) => path.endsWith(`/${asset.file}`));
  if (!match) continue; // no derivative can be built without the source file
  byFile.set(asset.file, {
    image: match[1].default,
    alt: asset.alt,
    caption: asset.caption,
    date: asset.date,
    dateNote: asset.dateNote,
    credit: asset.credit,
    consent: asset.consent as PhotoRecord['consent'],
    maxDisplayWidth: asset.maxDisplayWidth,
  });
}

/**
 * Look up a processed photograph by its manifest `file` path, e.g.
 * "leadership/katabazi-george-portrait.jpeg".
 *
 * Throws at build time rather than returning undefined — a missing photo is
 * a broken page, and failing the build surfaces that immediately instead of
 * shipping a blank frame.
 */
export function getPhoto(file: string): PhotoRecord {
  const record = byFile.get(file);
  if (!record) {
    throw new Error(`getPhoto: no manifest entry (or source file) for "${file}"`);
  }
  return record;
}
