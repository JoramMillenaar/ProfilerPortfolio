import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readJson = (relative) =>
  JSON.parse(readFileSync(path.resolve(__dirname, relative), 'utf-8'));

const blogPosts = readJson('src/data/blogPosts.json');
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
    // Emit `route/index.html` so trailing-slash URLs resolve on GitHub Pages
    // (and the non-slash form 301-redirects to it). Canonical form = trailing slash.
    dirStyle: 'nested',
    // Expand dynamic routes into a concrete path per blog post / experience.
    includedRoutes(paths) {
      const staticPaths = paths.filter((p) => !p.includes(':'));
      return [
        ...staticPaths,
        ...blogPosts.map((post) => `/blog/${post.id}`),
        ...experience.map((exp) => `/experience/${exp.id}`),
      ];
    },
  },
});
