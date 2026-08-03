import type { APIRoute } from 'astro';
import { site } from '../lib/site-config';

/**
 * Web App Manifest.
 *
 * Appropriate here for one specific reason: the primary audience is on
 * mid-range Android over metered mobile data (docs/01 section 7, constraint
 * C1). "Add to Home Screen" on Android gives that audience a one-tap route
 * back to the site without re-entering a URL over a slow connection, and
 * `display: browser` keeps it an honest website rather than pretending to be
 * an installed app.
 *
 * NO SERVICE WORKER, and none is planned. A stale cache on a site whose whole
 * credibility rests on current dates and live event status (docs/09 section
 * 9.2) is a liability, not a feature.
 *
 * `<link rel="manifest">` is emitted by Seo.astro only when `site.hasIcons`
 * is true, because a manifest whose icons 404 produces a broken install
 * prompt. The icon set is WUFPA-013.
 *
 * Source: docs/14 section 9 · WUFPA-064
 */
export const GET: APIRoute = () => {
  const manifest = {
    name: site.name,
    short_name: site.shortName,
    description: `${site.legalName}: training, copyright advocacy, distribution and finance for filmmakers across ${site.regionName}.`,
    start_url: '/',
    scope: '/',
    // Deliberately not `standalone`: this is a website, and hiding the URL bar
    // removes the address, the back button and the share affordance that the
    // audience actually uses to paste links into WhatsApp.
    display: 'browser',
    background_color: '#FFFFFF',
    theme_color: site.themeColor,
    lang: site.lang,
    dir: 'ltr',
    categories: ['education', 'news', 'entertainment'],
    icons: site.hasIcons
      ? [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ]
      : [],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
