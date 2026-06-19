import {
  siteUrl,
  siteName,
  author,
  defaultDescription,
  defaultImage,
} from '@/config/site';

// Resolve a relative path (or pass-through an absolute URL) to a full URL.
export function absoluteUrl(path = '/') {
  if (!path) return siteUrl;
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}

// Strip markdown / inline HTML so content can be reused as a plain-text description.
export function stripMarkdown(md = '') {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ') // inline svg diagrams
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/`([^`]*)`/g, '$1') // inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> link text
    .replace(/<[^>]+>/g, ' ') // remaining html tags
    .replace(/[#>*_~]/g, ' ') // markdown symbols
    .replace(/\s+/g, ' ')
    .trim();
}

// Truncate to a length suitable for a meta description, on a word boundary.
export function truncate(text = '', max = 160) {
  const t = (text || '').trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

// First image URL found in markdown content (used as a per-post social image).
export function firstContentImage(content = '') {
  const match = (content || '').match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/);
  return match ? match[1] : null;
}

// Build a complete `useHead` payload (title, canonical, OG/Twitter, robots).
export function pageHead({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  tags = [],
} = {}) {
  const url = absoluteUrl(path);
  const img = image ? absoluteUrl(image) : defaultImage;
  const desc = truncate(description || defaultDescription, 200);
  const fullTitle = title ? `${title} — ${author}` : siteName;

  const meta = [
    { name: 'description', content: desc },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: type },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: desc },
    { property: 'og:url', content: url },
    { property: 'og:image', content: img },
    { property: 'og:site_name', content: siteName },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: desc },
    { name: 'twitter:image', content: img },
  ];

  if (type === 'article') {
    if (publishedTime) {
      meta.push({ property: 'article:published_time', content: publishedTime });
    }
    meta.push({ property: 'article:author', content: author });
    for (const tag of tags) {
      meta.push({ property: 'article:tag', content: tag });
    }
  }

  return {
    title: fullTitle,
    link: [{ rel: 'canonical', href: url }],
    meta,
  };
}

// Helper to wrap a JSON-LD object as a `useHead` script entry.
export function jsonLd(data) {
  return { type: 'application/ld+json', innerHTML: JSON.stringify(data) };
}

export { siteUrl, siteName, author, defaultImage };
