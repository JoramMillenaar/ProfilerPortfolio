import { ViteSSG } from 'vite-ssg';
import App from './App.vue';
import { routes, scrollBehavior } from './router';
import './index.css';

export const createApp = ViteSSG(App, {
  routes,
  scrollBehavior,
});

// Route chunks are content-hashed and deleted from the server on every
// deploy. A browser tab left open across a deploy still holds import() calls
// pointing at the old hashes, so a client-side navigation 404s. Vite fires
// this event when that happens — reload so the tab picks up the current
// build instead of leaving the user stuck on a broken navigation.
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', () => {
    window.location.reload();
  });
}
