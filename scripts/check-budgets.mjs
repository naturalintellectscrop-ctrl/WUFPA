#!/usr/bin/env node
/**
 * BUILD GUARD — performance budgets.
 *
 * The primary audience is on a mid-range Android phone over metered, often 3G,
 * mobile data. Every kilobyte is a cost the user pays, and a heavy site
 * excludes exactly the rural and semi-urban creatives WUFPA exists to reach.
 * These are access requirements, not scores.
 *
 * IMPORTANT: Astro inlines small scripts and stylesheets directly into the
 * HTML. An earlier version of this script counted only standalone .js and .css
 * files and therefore reported 0 KB of JavaScript while ~2.5 KB was actually
 * shipping. Inline <script> and <style> content is now counted too — otherwise
 * the guard silently stops guarding as soon as the bundler inlines something.
 *
 * JSON-LD is excluded from the JavaScript budget: it is structured data, not
 * executable code. It still counts toward the HTML document budget.
 *
 * Budgets: docs/14_TECHNICAL_ARCHITECTURE.md section 9
 * Usage:   node scripts/check-budgets.mjs
 */
import { gzipSync } from 'node:zlib';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

const BUDGETS = {
  htmlPage: 100 * 1024, // any single HTML document, uncompressed
  jsTotal: 100 * 1024, // all JS, compressed, incl. inline
  cssTotal: 30 * 1024, // all CSS, compressed, incl. inline
};

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

/** Inline <script> bodies, excluding JSON-LD and anything with a src. */
function inlineScripts(html) {
  const out = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const attrs = m[1] ?? '';
    if (/\bsrc=/i.test(attrs)) continue;
    if (/type=["']application\/(ld\+json|json)["']/i.test(attrs)) continue;
    out.push(m[2] ?? '');
  }
  return out;
}

function inlineStyles(html) {
  const out = [];
  const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1] ?? '');
  return out;
}

const files = walk(DIST);
if (files.length === 0) {
  console.error('✗ dist/ is empty or missing — run `npm run build` first.');
  process.exit(1);
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const failures = [];

let jsRaw = '';
let cssRaw = '';
let largestHtml = { name: '', size: 0 };
let inlineJsBytes = 0;
let inlineCssBytes = 0;

for (const file of files) {
  const rel = relative(DIST, file).split(sep).join('/');
  const ext = extname(file).toLowerCase();

  if (ext === '.js' || ext === '.mjs') {
    jsRaw += readFileSync(file, 'utf8');
    continue;
  }
  if (ext === '.css') {
    cssRaw += readFileSync(file, 'utf8');
    continue;
  }
  if (ext !== '.html') continue;

  const html = readFileSync(file, 'utf8');
  if (Buffer.byteLength(html) > largestHtml.size) {
    largestHtml = { name: rel, size: Buffer.byteLength(html) };
  }

  for (const block of inlineScripts(html)) {
    jsRaw += block;
    inlineJsBytes += Buffer.byteLength(block);
  }
  for (const block of inlineStyles(html)) {
    cssRaw += block;
    inlineCssBytes += Buffer.byteLength(block);
  }
}

const jsCompressed = jsRaw ? gzipSync(Buffer.from(jsRaw)).length : 0;
const cssCompressed = cssRaw ? gzipSync(Buffer.from(cssRaw)).length : 0;

console.log('Performance budgets\n');
console.log(
  `  JavaScript (compressed) ${kb(jsCompressed).padStart(10)}  / ${kb(BUDGETS.jsTotal)}   (${kb(inlineJsBytes)} of it inline)`,
);
console.log(
  `  CSS (compressed)        ${kb(cssCompressed).padStart(10)}  / ${kb(BUDGETS.cssTotal)}   (${kb(inlineCssBytes)} of it inline)`,
);
console.log(
  `  Largest HTML document   ${kb(largestHtml.size).padStart(10)}  / ${kb(BUDGETS.htmlPage)}   ${largestHtml.name}`,
);

if (jsCompressed > BUDGETS.jsTotal) {
  failures.push(`JavaScript ${kb(jsCompressed)} exceeds ${kb(BUDGETS.jsTotal)}`);
}
if (cssCompressed > BUDGETS.cssTotal) {
  failures.push(`CSS ${kb(cssCompressed)} exceeds ${kb(BUDGETS.cssTotal)}`);
}
if (largestHtml.size > BUDGETS.htmlPage) {
  failures.push(`${largestHtml.name} is ${kb(largestHtml.size)}, exceeding ${kb(BUDGETS.htmlPage)}`);
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} budget breach(es):\n`);
  for (const f of failures) console.error(`   ${f}`);
  console.error('\nSee docs/14 section 9. Raising a budget is a decision, not a default.');
  process.exit(1);
}

console.log('\n✓ All budgets met.');
