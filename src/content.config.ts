import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * CONTENT MODEL
 *
 * This file is the most consequential piece of code in the project.
 *
 * The earlier prototype hand-wrote member companies directly into markup.
 * Adding a fifth meant editing HTML, which made inventing four more trivially
 * easy, and four fictional production companies duly shipped. Modelling
 * entities instead means the 300th member is one file, and removing a person
 * who withdraws consent is one deletion.
 *
 * THREE RULES ARE ENFORCED HERE RATHER THAN REMEMBERED:
 *
 *   1. `source` is REQUIRED on every fact-bearing entity.
 *      This converts "never invent a fact about WUFPA" from a rule people are
 *      asked to remember into a condition the build enforces.
 *
 *   2. `people` HAS NO TELEPHONE OR PERSONAL EMAIL FIELD.
 *      The supplied roster carries ~60 personal mobile numbers. Uganda's Data
 *      Protection and Privacy Act, 2019 applies. Omitting the field entirely
 *      means no component can render one by accident.
 *
 *   3. Photographs REQUIRE meaningful `alt` and `consent: 'granted'` to render.
 *      Short or missing alt is a build error; missing consent filters the asset
 *      out at query time.
 *
 * Source: docs/14_TECHNICAL_ARCHITECTURE.md section 5
 *         docs/11_TEAM_AND_LEADERSHIP.md section 6
 */

/* ─────────────────────────────────────────────────────────────────────────
   SHARED PRIMITIVES
   ───────────────────────────────────────────────────────────────────────── */

/** The six sub-regions, exactly as named in the association profile [P1].
 *  An enum, so a typo fails the build rather than producing an orphan page. */
const subRegion = z.enum([
  'ankole',
  'kigezi',
  'rwenzori',
  'tooro',
  'bunyoro',
  'greater-bushenyi',
]);

/** The ten craft guilds [P7]. */
const guildKey = z.enum([
  'directors',
  'producers',
  'screen-writers',
  'actors',
  'sound-and-music',
  'animators-and-vfx',
  'costume-and-make-up',
  'editors',
  'cinematography',
  'gaffers-and-lighting',
]);

/**
 * Provenance. REQUIRED on every fact-bearing entity.
 * `ref` uses the citation convention in docs/README section 6: e.g. "[P5]"
 * for page 5 of the association profile, "[LOGO-A]", "[PH-3]".
 */
const source = z.object({
  ref: z.string().min(2, 'Every fact must cite a source, see docs/README section 6'),
  note: z.string().optional(),
});

/**
 * An image reference.
 *
 * `alt` must be meaningful. Where an image is genuinely decorative the author
 * sets `decorative: true` deliberately, a different and visible act from
 * forgetting.
 *
 * `caption` adds context; `alt` describes the picture. They are never the same
 * string: the prototype's alt="Workshop" beside a caption reading "UCC Film
 * Training Masterclass" is exactly backwards.
 */
const imageBase = z.object({
  src: z.string(),
  alt: z.string().min(10, 'alt text must describe the image, see docs/12 section 6'),
  caption: z.string().optional(),
  /** Absent date is a legitimate state. Never invent precision. */
  date: z.coerce.date().optional(),
  dateNote: z.string().optional(),
  credit: z.string().optional(),
  location: z.string().optional(),
  subRegion: subRegion.optional(),
  objectPosition: z.string().default('center'),
  decorative: z.boolean().default(false),
  /** Nothing renders without recorded consent (Q4). */
  consent: z.enum(['granted', 'pending', 'refused']).default('pending'),
});

const image = imageBase.refine(
  (i: z.infer<typeof imageBase>) => i.date !== undefined || i.dateNote !== undefined,
  {
    message: 'Provide either `date` or `dateNote` (e.g. "Date not recorded"). Never guess.',
    path: ['date'],
  },
);

const md = (dir: string) => glob({ pattern: '**/*.md', base: `./src/content/${dir}` });

/* ─────────────────────────────────────────────────────────────────────────
   COLLECTIONS
   ───────────────────────────────────────────────────────────────────────── */

/**
 * PEOPLE: office-holders, guild heads, coordinators.
 *
 * A person may hold MANY roles: nine documented individuals sit on both the
 * governance and craft axes (docs/02 section 12.1, C-7 and C-8).
 *
 * Note the absence of `phone` and `email`. That absence is the feature.
 */
const people = defineCollection({
  loader: md('people'),
  schema: z.object({
    name: z.string(),
    /** Honorific as WUFPA styles it: "Rev.", "Mr". Pending Q1 confirmation. */
    honorific: z.string().optional(),
    roles: z
      .array(
        z.object({
          title: z.string(),
          body: z.enum([
            'executive',
            'trustees',
            'disciplinary',
            'supervisory',
            'regional',
            'guild',
          ]),
          termStart: z.number().int().optional(),
          termEnd: z.number().int().optional(),
          guild: guildKey.optional(),
          subRegion: subRegion.optional(),
        }),
      )
      .min(1),
    district: z.string().optional(),
    subRegion: subRegion.optional(),
    company: reference('members').optional(),
    portrait: image.optional(),
    hasProfile: z.boolean().default(false),
    /** Blocks rendering until WUFPA confirms in writing (Q1 and Q4). */
    nameConfirmed: z.boolean().default(false),
    consent: z.enum(['granted', 'pending', 'refused']).default('pending'),
    order: z.number().int().default(99),
    source,
  }),
});

/** MEMBERS: production companies. Only four are documented [P4] [P5]. */
const members = defineCollection({
  loader: md('members'),
  schema: z.object({
    name: z.string(),
    /** Omitted where unconfirmed, see docs/02 conflicts C-2 and C-3. */
    district: z.string().optional(),
    subRegion: subRegion.optional(),
    focus: z.string().optional(),
    guilds: z.array(guildKey).default([]),
    source,
  }),
});

/** PROGRAMMES: the six areas WUFPA's work divides into. */
const programmes = defineCollection({
  loader: md('programmes'),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(200),
    /** Which of the five core objectives [P1] this delivers. Closes the loop
     *  between what WUFPA promised at registration and what it has done. */
    objective: z.enum([
      'capacity-building',
      'cultural-promotion',
      'advocacy-networking',
      'community-development',
      'tourism-promotion',
    ]),
    partners: z.array(reference('partners')).default([]),
    regions: z.array(subRegion).default([]),
    photos: z.array(image).default([]),
    status: z.enum(['active', 'historic']).default('active'),
    order: z.number().int().default(99),
    source,
  }),
});

/** REGIONS: the six sub-regions and their coordination teams. */
const regions = defineCollection({
  loader: md('regions'),
  schema: z.object({
    key: subRegion,
    title: z.string(),
    opening: z.string(),
    districts: z.array(z.string()).min(1),
    photos: z.array(image).default([]),
    order: z.number().int().default(99),
    source,
  }),
});

/** GUILDS: the ten craft guilds. */
const guilds = defineCollection({
  loader: md('guilds'),
  schema: z.object({
    key: guildKey,
    title: z.string(),
    /** A definition of the craft, not an unsourced claim about WUFPA. */
    description: z.string(),
    relatedProgrammes: z.array(reference('programmes')).default([]),
    order: z.number().int().default(99),
    source,
  }),
});

/** PARTNERS: never rendered as a logo without recorded written permission. */
const partners = defineCollection({
  loader: md('partners'),
  schema: z.object({
    name: z.string(),
    category: z.enum(['training', 'broadcast', 'regulatory', 'international', 'civil-society']),
    url: z.string().url().optional(),
    /** Q10. Logos do not render while this is false. */
    logoPermission: z.boolean().default(false),
    source,
  }),
});

/**
 * EVENTS: status is DERIVED FROM DATE AT BUILD, never hand-set.
 *
 * This single decision prevents the site's most likely decay mode. The Awards
 * Gala scheduled for 13 December 2025 is the live example: a page describing a
 * past date as upcoming tells every visitor that nobody maintains the site.
 *
 * `postponed` and `cancelled` are explicit because they are not derivable.
 * A cancelled event KEEPS its page: deleting it breaks inbound links.
 */
const eventBase = z.object({
  title: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  /** True where only a year, or nothing, is known. */
  dateUncertain: z.boolean().default(false),
  dateNote: z.string().optional(),
  override: z.enum(['postponed', 'cancelled']).optional(),
  venue: z.string().optional(),
  district: z.string().optional(),
  subRegion: subRegion.optional(),
  programme: reference('programmes').optional(),
  partners: z.array(reference('partners')).default([]),
  photos: z.array(image).default([]),
  registrationUrl: z.string().url().optional(),
  source,
});

const events = defineCollection({
  loader: md('events'),
  schema: eventBase.refine(
    (e: z.infer<typeof eventBase>) => e.startDate !== undefined || e.dateUncertain,
    {
      message: 'Provide `startDate`, or set `dateUncertain: true`. Never invent a date.',
      path: ['startDate'],
    },
  ),
});

/** NEWS: articles. */
const news = defineCollection({
  loader: md('news'),
  schema: z.object({
    title: z.string(),
    standfirst: z.string().max(300),
    publishDate: z.coerce.date(),
    hero: image.optional(),
    programmes: z.array(reference('programmes')).default([]),
    regions: z.array(subRegion).default([]),
    draft: z.boolean().default(false),
    source,
  }),
});

/** ALBUMS: gallery groupings on /impact/. */
const albums = defineCollection({
  loader: md('albums'),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    photos: z.array(image).min(1),
    programme: reference('programmes').optional(),
    order: z.number().int().default(99),
    source,
  }),
});

/** PAGES: standalone editorial content (About, Legal, Privacy, Terms). */
const pages = defineCollection({
  loader: md('pages'),
  schema: z.object({
    title: z.string(),
    standfirst: z.string().optional(),
    description: z.string().max(160, 'Meta descriptions must be 160 characters or fewer'),
    noindex: z.boolean().default(false),
    updated: z.coerce.date().optional(),
    source: source.optional(),
  }),
});

export const collections = {
  people,
  members,
  programmes,
  regions,
  guilds,
  partners,
  events,
  news,
  albums,
  pages,
};
