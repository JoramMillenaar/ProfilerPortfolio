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
    // Flat output (`route.html`) so the no-trailing-slash URL is the canonical
    // served form. Trailing-slash URLs are normalized client-side via 404.html.
    dirStyle: 'flat',
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
