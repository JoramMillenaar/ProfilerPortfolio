import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, readdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readJson = (relative) =>
  JSON.parse(readFileSync(path.resolve(__dirname, relative), 'utf-8'));

// Deep dives are Vue components, one folder per dive under src/content/deep-dives.
// The folder name is the URL slug — discover them so SSG can pre-render each.
const readDeepDiveSlugs = () =>
  readdirSync(path.resolve(__dirname, 'src/content/deep-dives'), {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

const blogPosts = readJson('src/data/blogPosts.json');
const deepDiveSlugs = readDeepDiveSlugs();
const experience = readJson('src/data/experience.json');

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Consumed by vite-ssg (`vite-ssg build`).
  ssgOptions: {
    formatting: 'minify',
    // Flat output (`route.html`) so the no-trailing-slash URL is the canonical
    // served form. Trailing-slash URLs are normalized client-side via 404.html.
    dirStyle: 'flat',
    // Expand dynamic routes into a concrete path per blog post / deep dive / experience.
    includedRoutes(paths) {
      const staticPaths = paths.filter((p) => !p.includes(':'));
      return [
        ...staticPaths,
        ...blogPosts.map((post) => `/blog/${post.id}`),
        ...deepDiveSlugs.map((slug) => `/deep-dives/${slug}`),
        ...experience.map((exp) => `/experience/${exp.id}`),
      ];
    },
  },
});
