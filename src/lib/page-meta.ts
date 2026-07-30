/**
 * PAGE METADATA REGISTRY — the titles and descriptions from docs/04 § 2.
 *
 * WHY A REGISTRY RATHER THAN FRONTMATTER ON EACH PAGE
 *
 * WUFPA-064 requires metadata "generated from frontmatter rather than
 * hand-written per page". For the ~25 static routes there is no frontmatter to
 * generate from — they are .astro files, not content entries. Hand-writing the
 * strings into each one would scatter the Content Bible across 25 files, where
 * nothing can check that `/news/` and `/events/` did not end up with the same
 * description.
 *
 * So the specified copy lives here, once, and a page asks for its own route's
 * metadata. Three things follow:
 *
 *   1. Duplicates are visible — they are adjacent lines in one file, and
 *      `assertUniqueMetadata()` fails the build on them regardless.
 *   2. Editing copy is a Content Bible change plus a one-line change here,
 *      rather than a hunt through the page tree.
 *   3. A page that forgets to register metadata fails loudly at build rather
 *      than silently shipping a missing description.
 *
 * COLLECTION-DRIVEN ROUTES (news articles, events, people, regions, guilds)
 * are NOT listed here. Their metadata genuinely does come from frontmatter —
 * see `fromEntry()` at the bottom.
 *
 * EVERY STRING BELOW IS COPIED VERBATIM FROM docs/04 § 2.
 * It is specified copy, not written here. Changing it means changing the
 * Content Bible first (docs/04, rule 1).
 */

export interface PageMeta {
  /** The FINAL <title>, ≤60 chars. Rendered verbatim — see the note below. */
  title: string;
  /** 140–155 chars, written for a human deciding whether to click. */
  description: string;
}

/**
 * Routes whose copy is specified in docs/04 § 2.
 *
 * Keys carry the trailing slash, matching `trailingSlash: 'always'`.
 *
 * TITLES ARE FINAL AND ARE NOT SUFFIXED AGAIN.
 *
 * docs/04 § 2 gives complete titles with the " — WUFPA" suffix already
 * applied where it is used, and deliberately NOT applied where it is not:
 * `/about/` spells the association name out in full instead, and `/sacco/`
 * ends on "filmmakers" because the page is about WUFM, a distinct entity.
 *
 * So there is no rule Seo.astro could apply that would be right in every
 * case. It renders `title` verbatim, and the suffix decision lives here with
 * the copy — applied by the helpers below for frontmatter-driven routes.
 */
export const pageMeta = {
  '/': {
    // The homepage title is the association name itself; a " — WUFPA" suffix
    // would repeat the acronym already in the parentheses.
    title: 'Western Uganda Film Producers Association (WUFPA)',
    description:
      'WUFPA unites 300+ film production houses across the six sub-regions of Western Uganda. Training, advocacy, distribution and finance for filmmakers.',
  },

  '/about/': {
    title: 'About WUFPA — Western Uganda Film Producers Association',
    description:
      'Registered in 2017 as a non-profit company limited by guarantee, WUFPA represents film producers across Western Uganda. Our vision, mission and objectives.',
  },
  '/about/history/': {
    title: 'Our story: 2017 to today — WUFPA',
    description:
      'From 14 founding production companies in Ankole and Kigezi to 300+ production houses across six sub-regions. Eight years of Western Ugandan film.',
  },
  '/about/governance/': {
    title: 'How WUFPA is governed — WUFPA',
    description:
      "WUFPA's Executive Committee, Board of Trustees, Disciplinary and Supervisory Committees, sub-regional coordinators and ten film guilds.",
  },
  '/about/legal/': {
    title: 'Legal status and registration — WUFPA',
    description:
      'WUFPA is registered with the Uganda Registration Services Bureau as a company limited by guarantee, operating as a not-for-profit association.',
  },

  '/leadership/': {
    title: 'Leadership and governance — WUFPA',
    description:
      'Meet the people who lead WUFPA: the Executive Committee 2025–2030, the Board of Trustees, and the founders who registered the association in 2017.',
  },

  '/programmes/': {
    title: 'What we do — WUFPA programmes',
    description:
      'Training and master classes, copyright advocacy, the Kibanda Initiative, distribution, film competitions and international exposure for our members.',
  },
  '/programmes/training/': {
    title: 'Film training and master classes — WUFPA',
    description:
      'Screenwriting, directing, cinematography, editing and production training for filmmakers in Western Uganda, with UCC, UNESCO and international partners.',
  },
  '/programmes/advocacy/': {
    title: 'Copyright advocacy and anti-piracy — WUFPA',
    description:
      "WUFPA campaigns for filmmakers' rights in Western Uganda, from street sensitisation on copyright to national policy on film in the school curriculum.",
  },
  '/programmes/kibanda/': {
    title: 'The WUFPA Kibanda Initiative',
    description:
      'Community film screenings bringing Western Ugandan films to towns, schools and rural communities — promoting access, education and local audiences.',
  },
  '/programmes/distribution/': {
    title: 'Film distribution and market access — WUFPA',
    description:
      "WUFPA connects producers with distributors and broadcasters. Members' films air on TV West, Tayari West TV, GNTV, Lite TV and YoTV.",
  },
  '/programmes/competitions/': {
    title: 'Film competitions and awards — WUFPA',
    description:
      'WUFPA advocated for the UCC Regional Film Competition and organises the Western Uganda Film Awards Gala, celebrating filmmakers across the region.',
  },
  '/programmes/international/': {
    title: 'International exposure for our filmmakers — WUFPA',
    description:
      'WUFPA leads delegations to the Zanzibar International Film Festival, the Mashariki African Film Festival and the Kigali International Content Market.',
  },

  '/regions/': {
    title: 'Our six sub-regions — WUFPA',
    description:
      'WUFPA works across Ankole (Rwizi), Kigezi, Rwenzori, Tooro, Bunyoro and Greater Bushenyi, with coordinators in districts throughout Western Uganda.',
  },
  '/guilds/': {
    title: 'The ten WUFPA film guilds',
    description:
      'Directors, producers, screenwriters, actors, sound, animation, costume, editing, cinematography and lighting — organised by craft across Western Uganda.',
  },

  '/membership/': {
    title: 'Membership — WUFPA',
    description:
      'WUFPA membership is open to filmmakers, production companies, film groups and creatives across Western Uganda. What you get and how to apply.',
  },
  '/membership/join/': {
    title: 'Become a member — WUFPA',
    description:
      'Apply to join the Western Uganda Film Producers Association. Tell us about your work and a coordinator in your sub-region will be in touch.',
  },

  '/sacco/': {
    title: 'WUFM SACCO — savings and credit for filmmakers',
    description:
      'The Western Uganda Filmmakers SACCO helps members save and access affordable credit for their productions. Small savings, big dreams.',
  },
  '/partners/': {
    title: 'Partners and supporters — WUFPA',
    description:
      'WUFPA works with UCC, UNATCOM for UNESCO, US Mission Uganda, Alliance Française, the Goethe-Zentrum, URSB, UFMI and regional broadcasters.',
  },
  '/impact/': {
    title: 'Impact and gallery — WUFPA',
    description:
      'Eight years of workshops, campaigns, competitions and community screenings across Western Uganda, in photographs.',
  },
  '/news/': {
    title: 'News — WUFPA',
    description:
      'The latest from the Western Uganda Film Producers Association: programmes, partnerships, competitions and member news.',
  },
  '/events/': {
    title: 'Events — WUFPA',
    description:
      'Workshops, screenings, competitions and meetings organised by WUFPA across the six sub-regions of Western Uganda.',
  },
  '/support/': {
    title: 'Support WUFPA',
    description:
      'WUFPA needs equipment, training sponsorship, SACCO seed capital and a regional film studio. Here is exactly what your support would fund.',
  },
  '/contact/': {
    title: 'Contact WUFPA',
    description:
      'Reach the Western Uganda Film Producers Association at our head office on Mbaguta Street, Mbarara City, or send us a message.',
  },
} as const satisfies Record<string, PageMeta>;

export type StaticRoute = keyof typeof pageMeta;

/**
 * Metadata for a specified route.
 *
 * Throws rather than returning a default. A page that reaches production with
 * a generic description is a page that will never be clicked from a result
 * list, and the failure is silent — so it is converted into a build error.
 */
export function meta(route: StaticRoute): PageMeta {
  const found = pageMeta[route];
  if (!found) {
    throw new Error(
      `No metadata registered for "${route}". Add it to docs/04 § 2 first, ` +
        'then to src/lib/page-meta.ts — never invent a description at the page.',
    );
  }
  return found;
}

/* ─────────────────────────────────────────────────────────────────────────
   COLLECTION-DRIVEN ROUTES
   ───────────────────────────────────────────────────────────────────────── */

/** The house title suffix, docs/04 § 1.1. Applied only by the helpers below —
 *  the registry above already carries it where docs/04 § 2 uses it. */
const SUFFIX = ' — WUFPA';

/** Append the suffix unless doing so would repeat it. */
function suffixed(title: string): string {
  return title.endsWith(SUFFIX) ? title : `${title}${SUFFIX}`;
}

/** Templates for the routes docs/04 § 2 specifies by pattern, not by page. */
export const templates = {
  /** `/regions/[key]/` */
  region: (name: string): PageMeta => ({
    title: suffixed(`Film in ${name}`),
    description: `WUFPA in the ${name} sub-region: our coordinator, the districts we cover, and the training and advocacy work we have delivered here.`,
  }),

  /** `/guilds/[key]/` */
  guild: (name: string, craft: string): PageMeta => ({
    title: suffixed(name),
    description: `The WUFPA ${name} brings together ${craft} working across the six sub-regions of Western Uganda. Its head and how to join.`,
  }),
} as const;

/**
 * Build metadata from a content entry's own frontmatter.
 *
 * News and event descriptions come from the standfirst, which is already
 * written for a human and already length-limited by the schema (300 chars).
 * Truncating at a word boundary keeps it readable in a result snippet;
 * truncating mid-word looks like a bug.
 *
 * The title is truncated BEFORE the suffix is applied, so a long headline
 * loses its own tail rather than the brand.
 */
export function fromEntry(title: string, standfirst: string): PageMeta {
  return {
    title: suffixed(truncate(title, 60 - SUFFIX.length)),
    description: truncate(standfirst, 155),
  };
}

function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '')}…`;
}

/**
 * Fail the build on duplicated or over-long specified metadata.
 *
 * `scripts/check-seo.mjs` catches duplicates in the BUILT output, which is the
 * real guarantee. This runs at module load, so the same mistake is caught the
 * moment the registry is edited — with the route names in the message, rather
 * than after a full build.
 */
function assertUniqueMetadata(): void {
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  const problems: string[] = [];

  for (const [route, m] of Object.entries(pageMeta) as [string, PageMeta][]) {
    const priorTitle = titles.get(m.title);
    if (priorTitle) problems.push(`Duplicate title on ${route} and ${priorTitle}: "${m.title}"`);
    else titles.set(m.title, route);

    const priorDesc = descriptions.get(m.description);
    if (priorDesc) problems.push(`Duplicate description on ${route} and ${priorDesc}`);
    else descriptions.set(m.description, route);

    // Titles are stored final, so the stored length IS what a search result
    // shows. No suffix is added here.
    if (m.title.length > 60) {
      problems.push(`Title on ${route} is ${m.title.length} chars (target ≤60)`);
    }
    if (m.description.length > 155) {
      problems.push(`Description on ${route} is ${m.description.length} chars (target ≤155)`);
    }
  }

  if (problems.length) {
    throw new Error(`Page metadata registry (docs/04 § 2):\n  - ${problems.join('\n  - ')}`);
  }
}

assertUniqueMetadata();
