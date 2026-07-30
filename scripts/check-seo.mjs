#!/usr/bin/env node
/**
 * BUILD GUARD — SEO, metadata, heading hierarchy and structured data.
 *
 * WHY A SCRIPT RATHER THAN A CHECKLIST
 *
 * docs/16 section 12 lists the pre-launch SEO checks as tick-boxes. Tick-boxes
 * are verified once, by whoever remembers, and then rot. Every item below that
 * CAN be checked mechanically is checked here instead, on every build, so the
 * twenty-fifth page cannot ship with a duplicated description or a skipped
 * heading level.
 *
 * What this deliberately does NOT check, because a machine cannot:
 *   - whether alt text is USEFUL (only that it exists and is not filename-ish)
 *   - whether a description would make a human click
 *   - whether a structured-data claim is TRUE
 * Those stay manual, per docs/16 section 10.
 *
 * Source: docs/16 section 12 · WUFPA-064, 065, 066
 * Usage:  node scripts/check-seo.mjs
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 155;

/** Structured-data types WUFPA must never emit: no reviews, no products.
 *  docs/16 section 4.3. */
const FORBIDDEN_SCHEMA_TYPES = ['Review', 'AggregateRating', 'Offer'];

const errors = [];
const warnings = [];

const fail = (page, msg) => errors.push(`${page}\n      → ${msg}`);
const warn = (page, msg) => warnings.push(`${page}\n      → ${msg}`);

/* ── Helpers ────────────────────────────────────────────────────────────── */

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

/** Strip <script>, <style> and comments before structural analysis, so a
 *  heading inside a JS string is never mistaken for a real one. */
function stripNonMarkup(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? (m[2] ?? m[3]) : null;
}

function metaContent(html, key, kind = 'name') {
  const re = new RegExp(`<meta\\b[^>]*\\b${kind}\\s*=\\s*["']${key}["'][^>]*>`, 'i');
  const tag = html.match(re);
  return tag ? attr(tag[0], 'content') : null;
}

/** Decode the few entities that appear in metadata, so length checks measure
 *  what a human sees rather than the encoded form. */
function decode(s) {
  return s
    ? s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#8212;|&mdash;/g, '—')
    : s;
}

/* ── Collect pages ──────────────────────────────────────────────────────── */

if (!existsSync(DIST)) {
  console.error('✗ dist/ is missing — run `npm run build` first.');
  process.exit(1);
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.error('✗ No HTML in dist/ — run `npm run build` first.');
  process.exit(1);
}

/** Route path for a built file: dist/about/index.html → /about/ */
function routeOf(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  return '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
}

const titles = new Map();
const descriptions = new Map();
const knownRoutes = new Set(htmlFiles.map(routeOf));

let indexablePages = 0;

/* ── The metadata registry ──────────────────────────────────────────────────
   Loaded here rather than at the end because the link checker below needs it.

   src/lib/page-meta.ts self-checks on import. Until the ~25 real pages exist
   (WUFPA-023 to 054) nothing else imports it, so that check would never run
   and a duplicate description could sit unnoticed for weeks.

   Its keys also serve as the manifest of INTENDED routes, which is what lets
   the link checker tell "planned but not built yet" apart from "typo".

   `.ts` imports directly: Node 24 (.nvmrc) strips types natively. */

let plannedRoutes = new Set();

try {
  const registry = await import('../src/lib/page-meta.ts');
  plannedRoutes = new Set(Object.keys(registry.pageMeta));
  console.log(`Metadata registry: ${plannedRoutes.size} specified route(s), no duplicates.`);
} catch (e) {
  errors.push(`src/lib/page-meta.ts\n      → ${e.message}`);
}

/* ── Per-page checks ────────────────────────────────────────────────────── */

for (const file of htmlFiles) {
  const route = routeOf(file);
  const raw = readFileSync(file, 'utf8');
  const html = stripNonMarkup(raw);

  const robots = metaContent(raw, 'robots') ?? '';
  const isNoindex = /noindex/i.test(robots);
  if (!isNoindex) indexablePages++;

  /* -- Language ------------------------------------------------------- */
  const htmlTag = raw.match(/<html\b[^>]*>/i);
  const lang = htmlTag ? attr(htmlTag[0], 'lang') : null;
  if (lang !== 'en-UG') {
    fail(route, `<html lang> is "${lang ?? 'missing'}", expected "en-UG" (docs/16 § 3)`);
  }

  /* -- Title ---------------------------------------------------------- */
  const titleMatch = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decode(titleMatch[1].trim()) : null;

  if (!title) {
    fail(route, 'No <title>');
  } else {
    if (title.length > MAX_TITLE) {
      // A warning, not an error: an over-long title is truncated in results
      // but is not broken, and a few specified titles sit near the bound.
      warn(route, `Title is ${title.length} chars, over the ${MAX_TITLE} target — "${title}"`);
    }
    if (!isNoindex) {
      if (titles.has(title)) {
        fail(route, `Duplicate <title> — also used by ${titles.get(title)}`);
      } else {
        titles.set(title, route);
      }

      // The house suffix is applied in src/lib/page-meta.ts, not by the
      // layout, so a page that hand-writes its title can silently lose the
      // brand. A result list without "WUFPA" in it is much harder to
      // recognise for the navigational searches this site mainly serves.
      // Warned, not failed: /sacco/ legitimately reads "WUFM SACCO — …".
      if (!/WUFPA|WUFM/i.test(title)) {
        warn(route, `Title carries no brand term — "${title}". Use meta() from src/lib/page-meta.ts`);
      }
    }
  }

  /* -- Description ---------------------------------------------------- */
  const description = decode(metaContent(raw, 'description'));

  if (!description) {
    fail(route, 'No meta description');
  } else {
    if (description.length > MAX_DESCRIPTION) {
      warn(
        route,
        `Description is ${description.length} chars, over the ${MAX_DESCRIPTION} target`,
      );
    }
    if (description.length < 50 && !isNoindex) {
      warn(route, `Description is only ${description.length} chars — likely too thin to earn a click`);
    }
    if (!isNoindex) {
      if (descriptions.has(description)) {
        fail(route, `Duplicate meta description — also used by ${descriptions.get(description)}`);
      } else {
        descriptions.set(description, route);
      }
    }
  }

  /* -- Canonical ------------------------------------------------------ */
  const canonicalTag = raw.match(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/i);
  const canonical = canonicalTag ? attr(canonicalTag[0], 'href') : null;

  if (!canonical) {
    fail(route, 'No canonical link');
  } else {
    if (!/^https?:\/\//i.test(canonical)) {
      fail(route, `Canonical must be absolute, got "${canonical}" (docs/16 § 3)`);
    }
    // The canonical must name THIS page. A page canonicalising to another URL
    // removes itself from the index — silently, and usually by accident.
    try {
      const path = new URL(canonical).pathname;
      if (path !== route) {
        fail(route, `Canonical points at "${path}" rather than its own route`);
      }
    } catch {
      fail(route, `Canonical is not a valid URL: "${canonical}"`);
    }
  }

  /* -- Robots --------------------------------------------------------- */
  if (!robots) fail(route, 'No robots meta tag');

  /* -- Open Graph ----------------------------------------------------- */
  for (const [prop, label] of [
    ['og:title', 'og:title'],
    ['og:description', 'og:description'],
    ['og:url', 'og:url'],
    ['og:type', 'og:type'],
    ['og:site_name', 'og:site_name'],
    ['og:locale', 'og:locale'],
  ]) {
    if (!metaContent(raw, prop, 'property')) fail(route, `Missing ${label}`);
  }

  const ogLocale = metaContent(raw, 'og:locale', 'property');
  if (ogLocale && ogLocale !== 'en_UG') {
    fail(route, `og:locale is "${ogLocale}", expected "en_UG" (docs/04 § 2.1)`);
  }

  // og:image is optional while the asset does not exist (WUFPA-065) — but if
  // one IS emitted it must be absolute and carry alt text.
  const ogImage = metaContent(raw, 'og:image', 'property');
  if (ogImage) {
    if (!/^https?:\/\//i.test(ogImage)) {
      fail(route, `og:image must be an absolute URL, got "${ogImage}"`);
    }
    if (!metaContent(raw, 'og:image:alt', 'property')) {
      fail(route, 'og:image without og:image:alt (docs/16 § 12)');
    }
  }

  if (!metaContent(raw, 'twitter:card')) fail(route, 'Missing twitter:card');

  /* -- Heading hierarchy ---------------------------------------------- */
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
  }));

  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) fail(route, 'No <h1> (docs/16 § 3)');
  if (h1s.length > 1) {
    fail(route, `${h1s.length} <h1> elements — exactly one required: ${h1s.map((h) => `"${h.text}"`).join(', ')}`);
  }

  let previous = 0;
  for (const h of headings) {
    if (previous && h.level > previous + 1) {
      fail(route, `Heading level skips h${previous} → h${h.level} at "${h.text}" (docs/16 § 3)`);
    }
    previous = h.level;
  }

  for (const h of headings) {
    if (!h.text) fail(route, `Empty h${h.level} — a heading with no text breaks the outline`);
  }

  /* -- Images --------------------------------------------------------- */
  for (const tag of raw.match(/<img\b[^>]*>/gi) ?? []) {
    const alt = attr(tag, 'alt');
    const src = attr(tag, 'src') ?? '(no src)';

    if (alt === null) {
      fail(route, `<img> with no alt attribute: ${src} — use alt="" if truly decorative`);
    }
    // Explicit dimensions are a CLS requirement, not a nicety: without them
    // the browser cannot reserve space and the layout jumps on slow
    // connections, which is this audience's normal condition.
    if (!attr(tag, 'width') || !attr(tag, 'height')) {
      fail(route, `<img> without width/height — causes layout shift: ${src}`);
    }
    if (alt && /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(alt.trim())) {
      fail(route, `alt text is a filename, not a description: "${alt}"`);
    }
    if (alt && /^(image|photo|picture|img|graphic)$/i.test(alt.trim())) {
      fail(route, `alt text "${alt}" describes nothing (docs/12 § 6)`);
    }
  }

  /* -- Structured data ------------------------------------------------ */
  const ldBlocks = [
    ...raw.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];

  if (ldBlocks.length === 0 && !isNoindex) {
    fail(route, 'No JSON-LD structured data (docs/16 § 4)');
  }

  const seenBreadcrumbLists = [];

  for (const block of ldBlocks) {
    let parsed;
    try {
      parsed = JSON.parse(block[1]);
    } catch (e) {
      fail(route, `JSON-LD does not parse: ${e.message}`);
      continue;
    }

    const serialised = JSON.stringify(parsed);

    for (const forbidden of FORBIDDEN_SCHEMA_TYPES) {
      if (new RegExp(`"@type"\\s*:\\s*"${forbidden}"`).test(serialised)) {
        fail(
          route,
          `Forbidden schema type "${forbidden}" — WUFPA has no reviews and no products (docs/16 § 4.3)`,
        );
      }
    }

    if (/"@type"\s*:\s*"BreadcrumbList"/.test(serialised)) seenBreadcrumbLists.push(block);

    // An empty string in structured data asserts "this property is blank",
    // which is a claim. Unknown values must be absent instead.
    if (/:\s*""/.test(serialised)) {
      fail(route, 'JSON-LD contains an empty-string value — omit unknown properties instead');
    }

    if (/example\.org|example\.com|TODO|PLACEHOLDER|lorem ipsum/i.test(serialised)) {
      warn(route, 'JSON-LD contains a placeholder value — must not reach production');
    }
  }

  if (seenBreadcrumbLists.length > 1) {
    fail(
      route,
      `${seenBreadcrumbLists.length} BreadcrumbList blocks — emit exactly one (the copies can disagree)`,
    );
  }

  /* -- Internal links ------------------------------------------------- */
  for (const tag of raw.match(/<a\b[^>]*>/gi) ?? []) {
    const href = attr(tag, 'href');
    if (!href) continue;
    if (!href.startsWith('/')) continue;
    if (href.startsWith('//')) continue;

    const path = href.split('#')[0].split('?')[0];
    if (!path || path === '/') continue;

    // Only routes are checked, not asset paths; assets are hashed by the build
    // and verified by Astro itself.
    if (/\.[a-z0-9]{2,5}$/i.test(path)) continue;

    const normalised = path.endsWith('/') ? path : `${path}/`;
    if (knownRoutes.has(normalised)) continue;

    // A link to a route that IS in the metadata registry is a page scheduled
    // to exist (WUFPA-023 to 054) — a warning while the site is mid-build, and
    // it clears itself when the page lands. A link to a route nobody has
    // planned is a typo or a deleted page, and that is an error either way.
    if (plannedRoutes.has(normalised)) {
      warn(route, `Link to ${href} — planned route, not built yet (WUFPA-023 to 054)`);
    } else {
      fail(route, `Internal link to a route that was not built and is not planned: ${href}`);
    }
  }

  /* -- Link text ------------------------------------------------------ */
  for (const m of raw.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (/^(click here|here|read more|more|link|this)$/i.test(text)) {
      fail(route, `Non-descriptive link text "${text}" (docs/16 § 3, criterion 2.4.4)`);
    }
  }
}

/* ── Site-wide artefacts ────────────────────────────────────────────────── */

const robotsTxt = join(DIST, 'robots.txt');
if (!existsSync(robotsTxt)) {
  fail('/robots.txt', 'Not generated');
} else {
  const body = readFileSync(robotsTxt, 'utf8');
  const blocksEverything = /^\s*Disallow:\s*\/\s*$/m.test(body);
  if (!blocksEverything && !/^\s*Sitemap:\s*https?:\/\//m.test(body)) {
    fail('/robots.txt', 'No absolute Sitemap: directive');
  }
}

if (!existsSync(join(DIST, 'sitemap-index.xml'))) {
  fail('/sitemap-index.xml', 'Not generated — check the sitemap integration');
}

/* -- The placeholder domain ------------------------------------------- */

const siteUrl = process.env['SITE_URL'] ?? '';
const isProductionBuild = siteUrl && !siteUrl.includes('example.org');

/**
 * Unresolved ⟦TOKEN⟧ markers.
 *
 * docs/README § 3: `⟦TOKEN⟧` marks content that cannot be written yet, and
 * "must never be replaced with a plausible guess". The corollary is that it
 * must never be PUBLISHED either — a visitor reading "⟦Q3: WUFPA to supply the
 * association email⟧" in a privacy notice is worse than a missing page.
 *
 * The legal pages carry several of these deliberately, because the answers are
 * genuine open questions. This guard makes them impossible to forget: they are
 * listed on every pre-launch build and they block a production one.
 */
const tokenPages = [];
for (const file of htmlFiles) {
  if (/⟦/.test(readFileSync(file, 'utf8'))) tokenPages.push(routeOf(file));
}

if (isProductionBuild) {
  // In a production build, a surviving placeholder means every canonical
  // points at a domain nobody owns. This is the single most damaging thing
  // that can ship, so it is an error, not a warning.
  for (const file of htmlFiles) {
    if (readFileSync(file, 'utf8').includes('example.org')) {
      fail(routeOf(file), 'Placeholder domain "example.org" in a production build');
    }
  }

  for (const route of tokenPages) {
    fail(route, 'Unresolved ⟦TOKEN⟧ in published content — answer it or remove the page');
  }
} else {
  if (tokenPages.length) {
    warnings.push(
      `UNRESOLVED ⟦TOKEN⟧ on ${tokenPages.length} page(s)\n      → ${tokenPages.join(', ')}\n` +
        '        These block a production build. Each one names a decision WUFPA must make.',
    );
  }

  warnings.push(
    'PRE-LAUNCH\n      → SITE_URL is unset or still the placeholder, so canonicals, og:url and\n' +
      '        the sitemap all resolve against https://wufpa.example.org. robots.txt is\n' +
      '        emitting Disallow: / to stop this build being indexed. Resolve ⟦Q5/WUFPA-006⟧\n' +
      '        and set SITE_URL before launch.',
  );
}

/* ── Report ─────────────────────────────────────────────────────────────── */

console.log(
  `Checked ${htmlFiles.length} page(s) — ${indexablePages} indexable, ` +
    `${htmlFiles.length - indexablePages} noindex.`,
);

if (warnings.length) {
  console.warn(`\n⚠ ${warnings.length} warning(s):\n`);
  for (const w of warnings) console.warn(`   ${w}`);
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} SEO error(s):\n`);
  for (const e of errors) console.error(`   ${e}`);
  console.error('\nSee docs/16_SEO_ACCESSIBILITY.md § 12.');
  process.exit(1);
}

console.log('\n✓ Metadata unique. Canonicals self-referential. Headings well-formed.');
console.log('✓ Open Graph complete. Structured data parses. No forbidden schema types.');
console.log('✓ No broken internal links. No non-descriptive link text.');
