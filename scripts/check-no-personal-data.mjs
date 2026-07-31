#!/usr/bin/env node
/**
 * BUILD GUARD — personal data must never reach the published output.
 *
 * Two independent failure modes are checked, both of which have already
 * happened once during development:
 *
 *   1. The UNREDACTED association profile being published. Astro copies
 *      everything in public/ to dist/ verbatim, so placing the client archive
 *      under public/originals/ silently published a 28 MB PDF containing the
 *      personal mobile numbers of ~60 WUFPA office-holders.
 *
 *   2. A Ugandan mobile number appearing as text in any built HTML — for
 *      example if a roster component were given a telephone field.
 *
 * Uganda's Data Protection and Privacy Act, 2019 applies. This runs in CI and
 * blocks the build; it is not advisory.
 *
 * Source: docs/11 section 6, docs/12 section 7, docs/14 section 13
 * Usage:  node scripts/check-no-personal-data.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

/** Filenames that must never appear in the published output. */
const FORBIDDEN_FILES = [
  /WUFPA\s*PROFILE\s*2026\.pdf$/i, // the unredacted original
  /roster-scan/i, // the two governance table scans
];

/** Ugandan mobile formats: +2567xx xxx xxx / 07xx xxx xxx. */
const PHONE = /(?:\+?256[\s-]?|0)7\d{2}[\s-]?\d{3}[\s-]?\d{3}/g;

/** The association's own published contact, pending Q3. Allowed for now and
 *  listed explicitly so the exception is visible rather than silent. */
const ALLOWED = new Set(['+256701927701', '0701927701']);

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(DIST);
if (files.length === 0) {
  console.error('✗ dist/ is empty or missing — run `npm run build` first.');
  process.exit(1);
}

const failures = [];

for (const file of files) {
  const rel = relative(DIST, file).split(sep).join('/');

  for (const pattern of FORBIDDEN_FILES) {
    if (pattern.test(rel)) {
      failures.push(`FORBIDDEN FILE PUBLISHED: dist/${rel}`);
    }
  }

  if (!/\.(html|xml|json|txt|js|css)$/i.test(file)) continue;

  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(PHONE)) {
    const normalised = match[0].replace(/[\s-]/g, '');
    if (!ALLOWED.has(normalised)) {
      failures.push(`PERSONAL NUMBER IN OUTPUT: dist/${rel} → ${match[0]}`);
    }
  }
}

console.log(`Scanned ${files.length} file(s) in dist/`);

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} personal-data violation(s):\n`);
  for (const f of new Set(failures)) console.error(`   ${f}`);
  console.error('\nSee docs/11 section 6 and docs/12 section 7.');
  process.exit(1);
}

console.log('✓ No forbidden files. No unlisted personal telephone numbers.');
