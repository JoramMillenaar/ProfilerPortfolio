// Deep dives catalog.
//
// Each deep dive is a folder under `src/content/deep-dives/<slug>/` containing
// an `index.vue` that:
//   - exports a `meta` object: { title, summary }
//   - default-exports the content component (full Vue freedom — interactive,
//     SVGs, sub-components, whatever the topic needs)
//
// The folder name is the URL slug. Everything below is auto-discovered, so
// adding a deep dive means dropping in a new folder — no edits here.

// Eagerly pull only the lightweight `meta` export from every deep dive so the
// list page and SEO can render without loading the (potentially heavy) bodies.
const metas = import.meta.glob('./*/index.vue', { eager: true, import: 'meta' });

// Lazily load the full component; only fetched when a deep dive is opened.
const loaders = import.meta.glob('./*/index.vue');

// './embeddings/index.vue' -> 'embeddings'
const slugFromPath = (path) => path.split('/')[1];

export const deepDives = Object.entries(metas)
  .map(([path, meta]) => ({
    id: slugFromPath(path),
    ...meta,
    load: loaders[path],
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

export const getDeepDive = (id) =>
  deepDives.find((dive) => dive.id === id) || null;
