// Generates sitemap.xml and rss.xml into dist/ after the SSG build.
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.resolve(root, 'dist');

const SITE_URL = 'https://jorammillenaar.com';
const SITE_TITLE = "Joram Millenaar's Portfolio";
const SITE_DESCRIPTION =
  'Writing on software engineering, local-first AI, and building products by Joram Millenaar.';

const readJson = (rel) =>
  JSON.parse(readFileSync(path.resolve(root, rel), 'utf-8'));

const blogPosts = readJson('src/data/blogPosts.json');
const experience = readJson('src/data/experience.json');

const xmlEscape = (s = '') =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);
const latestPostDate = sortedPosts.length ? sortedPosts[0].date : null;
const today = new Date().toISOString().slice(0, 10);

// ---- sitemap.xml ----
const urls = [
  { loc: '/', lastmod: latestPostDate || today, priority: '1.0' },
  { loc: '/blog', lastmod: latestPostDate || today, priority: '0.9' },
  ...sortedPosts.map((p) => ({
    loc: `/blog/${p.id}`,
    lastmod: p.date,
    priority: '0.8',
  })),
  ...experience.map((e) => ({
    loc: `/experience/${e.id}`,
    lastmod: today,
    priority: '0.6',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(path.resolve(dist, 'sitemap.xml'), sitemap);

// ---- rss.xml ----
const items = sortedPosts
  .map(
    (p) => `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${SITE_URL}/blog/${p.id}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.id}</guid>
      <description>${xmlEscape(p.summary || '')}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
${(p.tags || [])
  .map((t) => `      <category>${xmlEscape(t)}</category>`)
  .join('\n')}
    </item>`,
  )
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${xmlEscape(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${latestPostDate ? `    <lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;

writeFileSync(path.resolve(dist, 'rss.xml'), rss);

console.log(
  `[generate-seo] wrote sitemap.xml (${urls.length} urls) and rss.xml (${sortedPosts.length} items)`,
);
