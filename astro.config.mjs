// @ts-check
import { defineConfig } from 'astro/config';
// ChangeFreqEnum rather than the plain strings: `SitemapItem.changefreq` is
// typed as the enum, so string literals fail under `exactOptionalPropertyTypes`.
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

/**
 * WUFPA website — build configuration.
 *
 * Static output only. The primary audience is on mid-range Android over metered
 * mobile data (docs/01 section 7, constraint C1), so every kilobyte is a cost the
 * user pays. Astro ships zero JavaScript by default and hydrates only what is
 * explicitly declared interactive; that default IS the requirement here.
 *
 * See: docs/14_TECHNICAL_ARCHITECTURE.md
 */

// ⟦Q5⟧ Domain not yet registered (WUFPA-006). This placeholder is used only to
// generate absolute URLs for the sitemap and canonical tags. It MUST be replaced
// before launch — a wrong `site` silently produces wrong canonicals.
const SITE = process.env['SITE_URL'] ?? 'https://wufpa.example.org';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',

  build: {
    // Directory-style URLs: /about/ rather than /about.html.
    // URL stability is a functional requirement — links live inside grant
    // applications and printed material (goal W4, docs/05 section 2.1).
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  // Configured now even though launch is English-only. Retrofitting locale
  // routing later would mean restructuring every route (constraint C7).
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  image: {
    // Sharp drives the AVIF/WebP/JPEG derivative pipeline (WUFPA-060), wrapped
    // so each format gets its OWN quality value. Astro's <Picture> takes one
    // `quality` for the whole element and passes it unchanged to every format,
    // but the formats do not share a scale: the site's single quality={50} was
    // an AVIF number, and it left JPEG at ~27 dB PSNR — below the threshold
    // where artefacts show on faces, which is most of this archive.
    // See src/lib/image-quality.ts for the measurements.
    service: { entrypoint: './src/lib/image-service.ts' },
  },

  integrations: [
    sitemap({
      // Internal routes are excluded from the sitemap AND carry noindex.
      // `component-gallery` is an engineering artefact, not published content.
      // robots.txt and the manifest are endpoints, not pages — listing them
      // in a sitemap tells the crawler to index a text file.
      filter: (page) =>
        !page.includes('/_') &&
        !page.includes('/component-gallery') &&
        !page.endsWith('/robots.txt') &&
        !page.endsWith('/site.webmanifest'),

      changefreq: ChangeFreqEnum.MONTHLY,
      lastmod: new Date(),

      /**
       * Priority is a RELATIVE hint about this site's own hierarchy — it does
       * not raise rankings. It is set here to tell the crawler where the
       * substance is on a site whose pages are otherwise structurally
       * identical, and it mirrors docs/06 section 4 (why each page exists).
       *
       * `/membership/` is weighted with the homepage because joining is the
       * highest-value transactional intent on the site (docs/16 section 2.1).
       * Programme and region pages are the long-tail ranking assets.
       * Legal and utility pages sit at the bottom: they must be indexable and
       * reachable, but they are not what WUFPA competes on.
       */
      serialize(item) {
        const path = new URL(item.url).pathname;

        /** @type {[RegExp, number, ChangeFreqEnum][]} */
        const rules = [
          [/^\/$/, 1.0, ChangeFreqEnum.WEEKLY],
          [/^\/membership\/?/, 0.9, ChangeFreqEnum.MONTHLY],
          [/^\/(programmes|regions)\/?/, 0.8, ChangeFreqEnum.MONTHLY],
          [/^\/(about|leadership|guilds|partners|sacco)\/?/, 0.7, ChangeFreqEnum.MONTHLY],
          // News and events change most often and least predictably.
          [/^\/(news|events)\/?$/, 0.7, ChangeFreqEnum.WEEKLY],
          // An individual article or past event is written once and then
          // stays true — re-crawling it weekly wastes crawl budget.
          [/^\/(news|events)\//, 0.6, ChangeFreqEnum.YEARLY],
          [/^\/(impact|support|contact)\/?/, 0.6, ChangeFreqEnum.MONTHLY],
          [/^\/legal\//, 0.2, ChangeFreqEnum.YEARLY],
        ];

        for (const [pattern, priority, changefreq] of rules) {
          if (pattern.test(path)) {
            return { ...item, priority, changefreq };
          }
        }

        return { ...item, priority: 0.5 };
      },
    }),
  ],

  vite: {
    build: {
      // Surface budget regressions early rather than at the Phase 7 audit.
      // Budget: docs/14 section 9 — 100 KB JS on the homepage, compressed.
      chunkSizeWarningLimit: 100,
    },
  },
});
