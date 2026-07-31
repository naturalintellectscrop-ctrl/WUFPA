import type { APIRoute } from 'astro';
import { isPlaceholderDomain } from '../lib/site-config';

/**
 * robots.txt — generated, not static.
 *
 * Generated because the `Sitemap:` directive must carry an ABSOLUTE URL, and
 * the domain is not yet registered (⟦Q5 / WUFPA-006⟧). A hand-written
 * `public/robots.txt` would hard-code today's placeholder and quietly keep
 * pointing at it after the real domain goes live.
 *
 * THE DISALLOW-ALL BEHAVIOUR IS DELIBERATE.
 *
 * While `site` is still `wufpa.example.org`, this build is a preview, not
 * production. Letting a preview deployment be crawled creates duplicate
 * content competing with the real site and can get the preview host indexed
 * for WUFPA's own brand terms — the exact opposite of the goal. So a
 * placeholder domain emits `Disallow: /`, and the file becomes permissive
 * automatically the moment `SITE_URL` is set to the real domain.
 *
 * `scripts/check-seo.mjs` fails the build if a production build somehow still
 * carries the placeholder, so this cannot silently suppress the live site.
 *
 * Source: docs/16 section 12 · WUFPA-064
 */
export const GET: APIRoute = ({ site }) => {
  const isPreview = isPlaceholderDomain(site);

  const body = isPreview
    ? [
        '# Preview build — the production domain is not yet configured.',
        '# Crawling is blocked so this deployment cannot compete with the',
        '# live site for WUFPA\'s own brand terms. Set SITE_URL to the real',
        '# domain and this file becomes permissive automatically.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n')
    : [
        '# Western Uganda Film Producers Association',
        '# https://schema.org/NGO — see /sitemap-index.xml',
        '',
        'User-agent: *',
        'Allow: /',
        '',
        '# Engineering artefact, not published content. Also carries noindex',
        '# and is excluded from the sitemap, so the signals agree.',
        'Disallow: /component-gallery/',
        '',
        '# Astro build output — no indexable content, and crawling it wastes',
        '# crawl budget on hashed asset filenames.',
        'Disallow: /_astro/',
        '',
        `Sitemap: ${new URL('/sitemap-index.xml', site).href}`,
        '',
      ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
