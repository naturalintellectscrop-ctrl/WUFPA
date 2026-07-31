#!/usr/bin/env node
/**
 * BUILD GUARD — no photograph renders without recorded consent.
 *
 * Uganda's Data Protection and Privacy Act, 2019 applies to publishing
 * photographs of identifiable people. Making consent a build condition rather
 * than a review step means the rule survives schedule pressure and staff
 * turnover (docs/11 section 6.5, question Q4).
 *
 * Reads the asset manifest produced by scripts/extract-media.py and asserts
 * that nothing marked pending or refused appears in the built output.
 *
 * Usage: node scripts/check-consent.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const MANIFEST = join(ROOT, 'src', 'assets', 'photos', 'manifest.json');

if (!existsSync(MANIFEST)) {
  console.log('No asset manifest yet — nothing to check.');
  process.exit(0);
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const notConsented = new Map();
for (const asset of manifest.assets ?? []) {
  if (asset.consent !== 'granted') {
    notConsented.set(basename(asset.file), asset.consent ?? 'unknown');
  }
}

console.log(`Manifest: ${manifest.assets?.length ?? 0} asset(s)`);
console.log(`  consent granted : ${(manifest.assets?.length ?? 0) - notConsented.size}`);
console.log(`  consent pending : ${notConsented.size}`);

if (!existsSync(DIST)) {
  console.error('\n✗ dist/ missing — run `npm run build` first.');
  process.exit(1);
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

const violations = [];
for (const file of walk(DIST)) {
  const rel = relative(DIST, file).split(sep).join('/');
  const base = basename(file);

  // Emitted image assets keep a recognisable stem even after hashing.
  for (const [assetName, state] of notConsented) {
    const stem = assetName.replace(/\.[^.]+$/, '');
    if (base.includes(stem)) {
      violations.push(`dist/${rel} — consent is "${state}" for ${assetName}`);
    }
  }

  // Also catch references inside HTML.
  if (/\.html$/i.test(file)) {
    const html = readFileSync(file, 'utf8');
    for (const [assetName, state] of notConsented) {
      const stem = assetName.replace(/\.[^.]+$/, '');
      if (html.includes(stem)) {
        violations.push(`dist/${rel} references ${assetName} (consent "${state}")`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`\n✗ ${violations.length} unconsented photograph(s) in the build:\n`);
  for (const v of new Set(violations)) console.error(`   ${v}`);
  console.error('\nSee docs/11 section 6. Consent is question Q4.');
  process.exit(1);
}

console.log('\n✓ No unconsented photographs in the build output.');
