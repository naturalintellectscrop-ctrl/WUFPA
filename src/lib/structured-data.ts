/**
 * STRUCTURED DATA — JSON-LD builders, one per schema.org type.
 *
 * THE GOVERNING RULE (docs/16 section 4.3):
 *
 *   Structured data must match visible content.
 *
 * Marking up an event that is not on the page, or a rating that does not
 * exist, is a manual-action risk and a lie. Every builder below therefore
 * takes its values from the same frontmatter that renders the visible page —
 * never from a separate hand-maintained list that can drift.
 *
 * Consequences encoded here:
 *   - No `Review`, `AggregateRating` or `Offer` builders exist. WUFPA has no
 *     reviews and no products, so there is no function to misuse.
 *   - `undef()` strips every null/undefined property before serialisation, so
 *     an unanswered client question produces silence rather than `""`.
 *   - Entities are linked by `@id` rather than duplicated, so the Organization
 *     is described once and referenced everywhere.
 *
 * Source: docs/16 section 4 · docs/14 section 4.
 */

import { site } from './site-config';

/* ─────────────────────────────────────────────────────────────────────────
   PRIMITIVES
   ───────────────────────────────────────────────────────────────────────── */

/** A JSON-LD node. Loose by necessity — schema.org is open-world. */
export type JsonLd = Record<string, unknown>;

/**
 * Recursively remove null/undefined/empty-array properties.
 *
 * This is the mechanism that turns "we don't know WUFPA's phone number" into
 * an absent property instead of a false one. Applied at serialisation so no
 * individual builder has to remember it.
 */
function undef<T>(value: T): T {
  if (Array.isArray(value)) {
    const cleaned = value.map(undef).filter((v) => v !== undefined && v !== null);
    return cleaned as unknown as T;
  }
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === null || v === undefined) continue;
      if (Array.isArray(v) && v.length === 0) continue;
      if (typeof v === 'string' && v.trim() === '') continue;
      out[k] = undef(v);
    }
    return out as unknown as T;
  }
  return value;
}

/** Dates go into JSON-LD as ISO 8601. Undated content emits nothing. */
function isoDate(d: Date | string | undefined): string | undefined {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

/** Stable identifiers, so every page refers to one Organization node. */
export const ids = {
  organization: (base: URL | string) => `${new URL('/', base).href}#organization`,
  website: (base: URL | string) => `${new URL('/', base).href}#website`,
  webpage: (url: string) => `${url}#webpage`,
};

/* ─────────────────────────────────────────────────────────────────────────
   SITE-WIDE — Organization and WebSite
   ───────────────────────────────────────────────────────────────────────── */

/**
 * The NGO node. docs/16 section 4.1.
 *
 * `@type: NGO` rather than the generic Organization: WUFPA is a non-profit
 * company limited by guarantee [P1] [P4], and NGO is the precise subtype.
 *
 * Every property here traces to docs/02 section 13 (facts approved for
 * publication). `email`, `telephone` and `sameAs` resolve to null/[] while
 * ⟦Q3⟧ and ⟦Q9⟧ are open, and `undef()` removes them.
 */
export function organizationSchema(base: URL | string): JsonLd {
  const home = new URL('/', base).href;

  return undef({
    '@type': 'NGO',
    '@id': ids.organization(base),
    name: site.legalName,
    alternateName: [site.shortName, site.name],
    url: home,
    // Emitted only once the SVG exists (WUFPA-013) — a logo 404 degrades the
    // knowledge-panel result rather than improving it.
    logo: site.hasIcons ? new URL(site.logo, base).href : undefined,
    description: `${site.legalName} unites film production houses across the six sub-regions of ${site.regionName}, providing training, copyright advocacy, distribution and finance for filmmakers.`,
    slogan: site.strapline,
    foundingDate: site.foundingDate,
    nonprofitStatus: 'NonprofitANBI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressCountry: site.address.countryCode,
    },
    // The local-SEO backbone: the region as a whole, plus each named
    // sub-region as an AdministrativeArea.
    areaServed: [
      { '@type': 'Place', name: `${site.regionName}, Uganda` },
      ...site.subRegions.map((r) => ({
        '@type': 'AdministrativeArea',
        name: r.name,
      })),
    ],
    email: site.email ?? undefined,
    telephone: site.telephone ?? undefined,
    // ⟦Q3⟧ A ContactPoint with no contact method is meaningless, so the whole
    // node is withheld until at least one channel is confirmed.
    contactPoint:
      site.email || site.telephone
        ? {
            '@type': 'ContactPoint',
            contactType: 'general enquiries',
            email: site.email ?? undefined,
            telephone: site.telephone ?? undefined,
            areaServed: 'UG',
            availableLanguage: ['en'],
          }
        : undefined,
    sameAs: site.sameAs.length ? [...site.sameAs] : undefined,
  });
}

/**
 * The WebSite node.
 *
 * docs/16 section 4.1 specifies a `SearchAction` pointing at `/search/`.
 * That route is WUFPA-053 and does not exist yet — and a SearchAction naming
 * a 404 is a broken promise to the crawler, so it is gated on `hasSearch`.
 */
export function websiteSchema(base: URL | string, hasSearch = false): JsonLd {
  const home = new URL('/', base).href;

  return undef({
    '@type': 'WebSite',
    '@id': ids.website(base),
    url: home,
    name: site.name,
    alternateName: site.shortName,
    inLanguage: site.lang,
    publisher: { '@id': ids.organization(base) },
    potentialAction: hasSearch
      ? {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${home}search/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        }
      : undefined,
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   PER-PAGE
   ───────────────────────────────────────────────────────────────────────── */

/** The WebPage subtypes this site uses. Exported so Seo.astro and any page
 *  can name the type without restating the union. */
export type PageType =
  | 'WebPage'
  | 'AboutPage'
  | 'CollectionPage'
  | 'ContactPage'
  | 'ProfilePage';

export interface WebPageInput {
  url: string;
  title: string;
  description: string;
  base: URL | string;
  datePublished?: Date | string | undefined;
  dateModified?: Date | string | undefined;
  /** Set on the homepage so it is typed CollectionPage/WebPage correctly. */
  type?: PageType | undefined;
  breadcrumbId?: string | undefined;
}

/** The page itself, tied back to the site and organisation. */
export function webPageSchema(input: WebPageInput): JsonLd {
  return undef({
    '@type': input.type ?? 'WebPage',
    '@id': ids.webpage(input.url),
    url: input.url,
    name: input.title,
    description: input.description,
    inLanguage: site.lang,
    isPartOf: { '@id': ids.website(input.base) },
    about: { '@id': ids.organization(input.base) },
    datePublished: isoDate(input.datePublished),
    dateModified: isoDate(input.dateModified),
    breadcrumb: input.breadcrumbId ? { '@id': input.breadcrumbId } : undefined,
  });
}

export interface CrumbInput {
  label: string;
  href?: string | undefined;
}

/**
 * BreadcrumbList — required on any page below root (docs/16 section 4.2).
 *
 * The final crumb deliberately carries no `item`: it is the current page, and
 * Google's guidance is that the trailing element may omit the URL.
 */
export function breadcrumbSchema(crumbs: CrumbInput[], base: URL | string, pageUrl: string): JsonLd {
  return undef({
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href && i < crumbs.length - 1 ? new URL(c.href, base).href : undefined,
    })),
  });
}

export interface ArticleInput {
  url: string;
  base: URL | string;
  headline: string;
  description: string;
  datePublished: Date | string;
  dateModified?: Date | string | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
  section?: string | undefined;
}

/**
 * NewsArticle for /news/ items.
 *
 * `author` is the organisation, not a person: WUFPA publishes institutionally
 * and the roster is gated on ⟦Q1/Q4⟧ consent. Attributing an article to a
 * named individual without their confirmation is exactly the personal-data
 * exposure docs/11 section 6 exists to prevent.
 */
export function newsArticleSchema(input: ArticleInput): JsonLd {
  return undef({
    '@type': 'NewsArticle',
    '@id': `${input.url}#article`,
    headline: input.headline.slice(0, 110),
    description: input.description,
    url: input.url,
    datePublished: isoDate(input.datePublished),
    dateModified: isoDate(input.dateModified ?? input.datePublished),
    inLanguage: site.lang,
    articleSection: input.section,
    author: { '@id': ids.organization(input.base) },
    publisher: { '@id': ids.organization(input.base) },
    mainEntityOfPage: { '@id': ids.webpage(input.url) },
    image: input.image
      ? {
          '@type': 'ImageObject',
          url: new URL(input.image, input.base).href,
          ...(input.imageAlt ? { caption: input.imageAlt } : {}),
        }
      : undefined,
  });
}

export interface EventInput {
  url: string;
  base: URL | string;
  name: string;
  description?: string | undefined;
  startDate?: Date | string | undefined;
  endDate?: Date | string | undefined;
  venue?: string | undefined;
  district?: string | undefined;
  /** Derived from date at build; never hand-set. See content.config.ts. */
  status: 'scheduled' | 'postponed' | 'cancelled';
  image?: string | undefined;
  registrationUrl?: string | undefined;
}

/**
 * Event schema.
 *
 * `eventStatus` mirrors the same date-derived logic that drives the visible
 * page (docs/09 section 9.2) — the two cannot disagree, because they read the
 * same field. An event whose page says "past" while its markup says
 * "EventScheduled" is the single most common structured-data penalty.
 *
 * An undated event (`dateUncertain`) emits NO Event schema: `startDate` is
 * required by Google, and inventing one to satisfy the validator would be
 * inventing a fact.
 */
export function eventSchema(input: EventInput): JsonLd | null {
  const start = isoDate(input.startDate);
  if (!start) return null;

  const statusMap = {
    scheduled: 'https://schema.org/EventScheduled',
    postponed: 'https://schema.org/EventPostponed',
    cancelled: 'https://schema.org/EventCancelled',
  } as const;

  // Location falls back to the head office only when the event has no venue of
  // its own — never a guessed venue.
  const place = input.venue
    ? {
        '@type': 'Place',
        name: input.venue,
        address: undef({
          '@type': 'PostalAddress',
          addressLocality: input.district ?? site.address.locality,
          addressRegion: site.regionName,
          addressCountry: site.address.countryCode,
        }),
      }
    : undefined;

  return undef({
    '@type': 'Event',
    '@id': `${input.url}#event`,
    name: input.name,
    description: input.description,
    url: input.url,
    startDate: start,
    endDate: isoDate(input.endDate),
    eventStatus: statusMap[input.status],
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    inLanguage: site.lang,
    organizer: { '@id': ids.organization(input.base) },
    location: place,
    image: input.image ? new URL(input.image, input.base).href : undefined,
    // No `offers`: WUFPA sells nothing (docs/16 section 4.3). A registration
    // link is an Action, not a commercial Offer.
    potentialAction: input.registrationUrl
      ? { '@type': 'RegisterAction', target: input.registrationUrl }
      : undefined,
  });
}

export interface PersonInput {
  url: string;
  base: URL | string;
  name: string;
  honorific?: string | undefined;
  jobTitle?: string | undefined;
  image?: string | undefined;
  /** Gate: ⟦Q1⟧ spelling confirmed AND ⟦Q4⟧ consent granted. */
  nameConfirmed: boolean;
  consent: 'granted' | 'pending' | 'refused';
}

/**
 * Person schema for leadership profiles.
 *
 * Returns null unless the name is confirmed AND consent is granted. This is
 * the same gate the visible PersonCard applies (docs/11 section 6): structured
 * data is published data, and publishing a name in JSON-LD that the visible
 * page withholds would defeat the entire consent mechanism.
 *
 * Note there is no `telephone` or `email` property, mirroring the deliberate
 * omission in the content schema.
 */
export function personSchema(input: PersonInput): JsonLd | null {
  if (!input.nameConfirmed || input.consent !== 'granted') return null;

  return undef({
    '@type': 'Person',
    '@id': `${input.url}#person`,
    name: input.name,
    honorificPrefix: input.honorific,
    jobTitle: input.jobTitle,
    url: input.url,
    worksFor: { '@id': ids.organization(input.base) },
    affiliation: { '@id': ids.organization(input.base) },
    image: input.image ? new URL(input.image, input.base).href : undefined,
  });
}

export interface ServiceInput {
  url: string;
  base: URL | string;
  name: string;
  description: string;
  /** Sub-region display names this programme has actually run in. */
  areas?: string[] | undefined;
}

/** Programme pages — `Service`, per docs/16 section 4.2. */
export function serviceSchema(input: ServiceInput): JsonLd {
  return undef({
    '@type': 'Service',
    '@id': `${input.url}#service`,
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { '@id': ids.organization(input.base) },
    serviceType: 'Film industry development',
    areaServed: (input.areas?.length ? input.areas : [`${site.regionName}, Uganda`]).map((a) => ({
      '@type': 'AdministrativeArea',
      name: a,
    })),
  });
}

export interface PlaceInput {
  url: string;
  base: URL | string;
  name: string;
  description: string;
  districts?: string[] | undefined;
}

/**
 * Region pages — `Place` contained in Western Uganda (docs/16 section 4.2).
 *
 * The district list is the long-tail asset: it is how a search for
 * "film producers Fort Portal" reaches the Rwenzori page.
 */
export function placeSchema(input: PlaceInput): JsonLd {
  return undef({
    '@type': 'Place',
    '@id': `${input.url}#place`,
    name: input.name,
    description: input.description,
    url: input.url,
    containedInPlace: {
      '@type': 'Place',
      name: `${site.regionName}, Uganda`,
    },
    containsPlace: input.districts?.map((d) => ({
      '@type': 'AdministrativeArea',
      name: d,
    })),
  });
}

export interface ImageObjectInput {
  base: URL | string;
  url: string;
  caption: string;
  credit?: string | undefined;
  date?: Date | string | undefined;
  width?: number | undefined;
  height?: number | undefined;
}

/** Gallery photographs (docs/16 section 4.2). `caption` is the alt text. */
export function imageObjectSchema(input: ImageObjectInput): JsonLd {
  return undef({
    '@type': 'ImageObject',
    contentUrl: new URL(input.url, input.base).href,
    caption: input.caption,
    width: input.width,
    height: input.height,
    // Absent date is a legitimate state — never invent precision.
    dateCreated: isoDate(input.date),
    creditText: input.credit,
    copyrightHolder: { '@id': ids.organization(input.base) },
  });
}

export interface FaqInput {
  url: string;
  questions: { question: string; answer: string }[];
}

/**
 * FAQPage — ONLY where genuine Q&A content is visible on the page
 * (docs/16 section 4.2). Returns null for an empty set rather than an empty
 * FAQPage node.
 */
export function faqSchema(input: FaqInput): JsonLd | null {
  if (!input.questions.length) return null;

  return undef({
    '@type': 'FAQPage',
    '@id': `${input.url}#faq`,
    mainEntity: input.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   SERIALISATION
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Combine nodes into one `@graph` document.
 *
 * A single graph rather than several <script> blocks: it lets nodes reference
 * each other by `@id` (the Article's publisher IS the Organization node, not a
 * copy of it), which is both smaller and unambiguous for the crawler.
 *
 * Nulls are filtered, so a builder that declined to emit — an unconsented
 * Person, an undated Event — simply drops out.
 */
export function graph(nodes: (JsonLd | null | undefined)[]): string {
  const present = nodes.filter((n): n is JsonLd => Boolean(n));
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': present.map(undef),
  });
}
