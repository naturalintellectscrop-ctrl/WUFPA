#!/usr/bin/env node
/**
 * BUILD GUARD — no image is displayed above its intrinsic resolution.
 *
 * Several supplied assets top out well below 700px; one is 226x299. A `sizes`
 * attribute requesting 1280px from a 226px source produces a visibly broken
 * page, and it is exactly the kind of error that survives review because it
 * looks fine on the developer's screen.
 *
 * Checks the `width` attribute declared on every <img> in the built output
 * against the intrinsic width recorded in the asset manifest.
 *
 * Source: docs/12 section 5.4, docs/14 section 8
 * Usage:  node scripts/check-no-upscale.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const MANIFEST = join(ROOT, 'src', 'assets', 'photos', 'manifest.json');

if (!existsSync(DIST)) {
  console.error('✗ dist/ missing — run `npm run build` first.');
  process.exit(1);
}

/** stem -> intrinsic width */
const intrinsic = new Map();
if (existsSync(MANIFEST)) {
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
  for (const asset of manifest.assets ?? []) {
    const stem = basename(asset.file).replace(/\.[^.]+$/, '');
    intrinsic.set(stem, asset.intrinsic?.w ?? asset.maxDisplayWidth ?? Infinity);
  }
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const IMG = /<img\b[^>]*>/gi;
const ATTR = (html, name) => html.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'))?.[1];

const violations = [];
let checked = 0;

for (const file of walk(DIST).filter((f) => /\.html$/i.test(f))) {
  const rel = relative(DIST, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');

  for (const tag of html.match(IMG) ?? []) {
    const src = ATTR(tag, 'src');
    const width = Number(ATTR(tag, 'width'));
    if (!src || !Number.isFinite(width)) continue;

    const stem = basename(src.split('?')[0]).replace(/\.[^.]+$/, '');
    // Astro appends a content hash; match on the leading stem.
    const match = [...intrinsic.keys()].find((k) => stem.startsWith(k) || k.startsWith(stem));
    if (!match) continue;

    checked += 1;
    const max = intrinsic.get(match);
    if (width > max) {
      violations.push(`dist/${rel} — ${basename(src)} declared ${width}px, intrinsic ${max}px`);
    }
  }
}

console.log(`Checked ${checked} image reference(s) against ${intrinsic.size} manifest entries`);

if (violations.length > 0) {
  console.error(`\n✗ ${violations.length} upscaled image(s):\n`);
  for (const v of new Set(violations)) console.error(`   ${v}`);
  console.error('\nUse the asset at or below its intrinsic width, or choose another.');
  process.exit(1);
}

console.log('✓ No image displayed above its intrinsic resolution.');
