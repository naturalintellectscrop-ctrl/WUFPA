/**
 * SITE CONFIG — every real-world fact about WUFPA in one place.
 *
 * WHY THIS FILE EXISTS
 *
 * Several facts the SEO layer needs (domain, email, telephone, social URLs) are
 * still unanswered client questions — Q3, Q5/Q6, Q9, Q14. The rule from
 * docs/README section 3 is absolute: a ⟦TOKEN⟧ is never replaced with a
 * plausible guess. Structured data repeating an invented telephone number is a
 * lie told at machine scale, and docs/16 section 4.3 treats it as a
 * manual-action risk.
 *
 * So every unresolved fact is `null` here, and every consumer OMITS the tag or
 * JSON-LD property rather than emitting an empty or placeholder one. A missing
 * `telephone` property is silence; `telephone: ""` is a false claim.
 *
 * WHEN THE ANSWERS ARRIVE: fill in the values below. Nothing else changes —
 * the meta tags, JSON-LD and footer pick them up automatically.
 *
 * Sources: docs/02 section 13 (facts approved for publication),
 *          docs/04 section 1.1 (site identity), docs/16 section 4.1.
 */

/** A fact WUFPA has not yet supplied. Never render; never guess. */
type Pending = null;

export const site = {
  /* ── Identity ─────────────────────────────────────────────────────────
     docs/04 section 1.1. */

  /** Public-facing name. */
  name: 'Western Uganda Film Producers Association',
  /** Registered name, used in legal contexts and Organization schema [P1]. */
  legalName: 'Western Uganda Film Producers Association Limited',
  shortName: 'WUFPA',
  /** Appended to every page title except the homepage. */
  titleSuffix: ' — WUFPA',
  /** Organisational strapline [P3]. NOT the logo tagline — see docs/03 section 4. */
  strapline: 'Telling our stories that transform our communities.',

  /* ── Locale ───────────────────────────────────────────────────────────
     docs/16 section 8.3, criterion 3.1.1. */

  /** BCP-47, used on <html lang>. */
  lang: 'en-UG',
  /** Underscore form, used for og:locale. */
  ogLocale: 'en_UG',

  /* ── Registration [P1] [P4] ───────────────────────────────────────────
     Approved for publication (docs/02 section 13). ISO 8601 because
     schema.org requires it; the human-facing form is "4 September 2017". */

  foundingDate: '2017-09-04',

  /* ── Head office [P1] [P3] ────────────────────────────────────────────
     Approved for publication. Q14 (precise geo coordinates) is still open, so
     there is deliberately no `geo` block — Google Business Profile integration
     needs it, but an approximate lat/long is an invented fact. */

  address: {
    street: 'Mbaguta Street, Mbarara Shopping Market',
    locality: 'Mbarara City',
    country: 'Uganda',
    /** ISO 3166-1 alpha-2, required by PostalAddress. */
    countryCode: 'UG',
    /** ⟦Q14⟧ Precise location not yet confirmed. */
    geo: null as Pending,
  },

  /* ── Contact ⟦Q3⟧ ─────────────────────────────────────────────────────
     BLOCKED. The association's own email and telephone have not been supplied.
     docs/16 section 5 requires NAP consistency across the site, the Google
     Business Profile, Facebook and the profile PDF — which is impossible to
     get right by guessing. Omitted from ContactPoint until answered. */

  email: null as Pending,
  telephone: null as Pending,

  /* ── Social ⟦Q9⟧ ──────────────────────────────────────────────────────
     BLOCKED. WUFPA's stated channels are Facebook and WhatsApp [P3], but the
     exact page URLs are unconfirmed. `sameAs` is the property that tells
     Google these accounts are the same entity, so a wrong URL actively
     misattributes another organisation's page to WUFPA. Empty array until
     answered — schema.org omits `sameAs` entirely when this is empty. */

  sameAs: [] as string[],

  /* ── Geographic focus ─────────────────────────────────────────────────
     The six sub-regions [P1], approved for publication. Drives `areaServed`
     and is the backbone of the local-SEO story (docs/16 section 2.2).
     `name` is the display form; `key` matches the content-collection enum. */

  subRegions: [
    { key: 'ankole', name: 'Ankole' },
    { key: 'kigezi', name: 'Kigezi' },
    { key: 'rwenzori', name: 'Rwenzori' },
    { key: 'tooro', name: 'Tooro' },
    { key: 'bunyoro', name: 'Bunyoro' },
    { key: 'greater-bushenyi', name: 'Greater Bushenyi' },
  ],

  /** The region as a whole — the `areaServed` umbrella and the primary
   *  local-search term (docs/16 section 2.1). */
  regionName: 'Western Uganda',

  /* ── Brand assets ─────────────────────────────────────────────────────
     WUFPA-013 (30 July 2026): WUFPA supplied its actual logo file directly
     (`public/wufpa_oficial_logo.jpeg`) — a first pass hand-redrew it as SVG
     from a lower-quality JPEG in the client archive, but once the clean
     original was available WUFPA's own direction was to use it as-is rather
     than a redrawn approximation. The favicon/manifest icon set is generated
     from this file (a tight crop of the reel-and-strip mark, composited onto
     white — see `scripts` history / IMPLEMENTATION_QUEUE.md WUFPA-013 for
     the exact pipeline). `hasIcons` gates the <link rel="icon">/manifest
     tags and the Organization.logo property, all of which now resolve to
     real files.

     `hasOgImage` stays false: the 1200×630 sharing image is ⟦WUFPA-065⟧'s to
     supply, and it does not exist on disk yet. This was previously one
     `hasAssets` flag — splitting it matters because flipping a single flag
     true would have made Seo.astro's shareImage fallback resolve to
     site.ogImage, a file that does not exist, and ship a broken og:image
     tag. Facebook and WhatsApp cache that failure past the fix. A page that
     supplies its own `image` prop (e.g. a news article's hero) is
     unaffected either way — see Seo.astro's `shareImage`. */

  hasIcons: true,
  hasOgImage: false,
  logo: '/wufpa_oficial_logo.jpeg',
  ogImage: '/og/wufpa-og.png',
  ogImageAlt:
    'The WUFPA logo over a photograph of filmmakers at a WUFPA workshop in Western Uganda',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  /** Brand red, used for browser theme colour. docs/03 section 5.2. */
  themeColor: '#ED1B24',
} as const;

/**
 * True when the configured `site` in astro.config.mjs is still the placeholder.
 *
 * `wufpa.example.org` exists so the build can generate absolute URLs before the
 * domain is registered (⟦Q5/WUFPA-006⟧). Every canonical, og:url and JSON-LD
 * @id derives from it, so shipping it to production would publish a site whose
 * canonicals all point at a domain nobody owns. `scripts/check-seo.mjs` fails
 * the build on this; the helper is exported so pages can check it too.
 */
export function isPlaceholderDomain(url: URL | string | undefined): boolean {
  if (!url) return true;
  return String(url).includes('example.org');
}

/**
 * Absolute URL for a site-relative path.
 *
 * Canonicals, og:url and JSON-LD identifiers must all be absolute (docs/16
 * section 3). Trailing slash is enforced to match `trailingSlash: 'always'` in
 * astro.config.mjs — `/about` and `/about/` resolving to the same page with
 * different canonicals is a duplicate-content signal.
 */
export function absoluteUrl(path: string, base: URL | string): string {
  const withSlash = path.endsWith('/') || path.includes('.') ? path : `${path}/`;
  return new URL(withSlash, base).href;
}
