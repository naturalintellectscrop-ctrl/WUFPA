import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../lib/site-config';

/**
 * RSS 2.0 feed for /news/.
 *
 * Hand-built rather than pulling in @astrojs/rss: the dependency exists to
 * escape XML and format dates, which is ~20 lines here, and every added
 * dependency is weight in a build whose whole point is restraint (docs/14 § 9).
 *
 * WHY A FEED AT ALL, for an association that cannot publish weekly (C4):
 * feeds are how aggregators, journalists and partner organisations follow a
 * body of work without checking a site. For a sector body seeking visibility
 * with funders and press, that is the audience that matters most — and it
 * costs one route.
 *
 * Discoverability is the other half: a feed nothing links to is a feed nobody
 * finds. `<link rel="alternate">` is emitted in Seo.astro.
 *
 * Source: WUFPA-050
 */

/** Escape the five XML predefined entities. Applied to every interpolated
 *  value — an unescaped ampersand in a headline breaks the whole document. */
function xml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site: siteUrl }) => {
  const base = siteUrl ?? new URL('https://wufpa.example.org');

  const articles = (await getCollection('news', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  const items = articles
    .map((article) => {
      const url = new URL(`/news/${article.id}/`, base).href;
      return [
        '    <item>',
        `      <title>${xml(article.data.title)}</title>`,
        `      <link>${xml(url)}</link>`,
        // isPermaLink="true" because the URL IS the identifier — these routes
        // are stable by design (goal W4).
        `      <guid isPermaLink="true">${xml(url)}</guid>`,
        `      <description>${xml(article.data.standfirst)}</description>`,
        `      <pubDate>${article.data.publishDate.toUTCString()}</pubDate>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${xml(`${site.name} — News`)}</title>`,
    `    <link>${xml(new URL('/news/', base).href)}</link>`,
    `    <description>${xml('Updates from WUFPA — programmes, partnerships, competitions and members.')}</description>`,
    `    <language>${site.lang}</language>`,
    `    <atom:link href="${xml(new URL('/feed.xml', base).href)}" rel="self" type="application/rss+xml" />`,
    // Only present when there is something to date. An empty feed with a
    // lastBuildDate of "now" claims freshness it does not have.
    ...(articles[0] ? [`    <lastBuildDate>${articles[0].data.publishDate.toUTCString()}</lastBuildDate>`] : []),
    items,
    '  </channel>',
    '</rss>',
    '',
  ]
    .filter((line) => line !== '')
    .join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
