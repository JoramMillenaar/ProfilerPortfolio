<template>
  <nav-bar :show-at-top="true" />
  <div class="deep-dives-page px-0 py-8">
    <main>
      <section>
        <div class="container pb-4">
          <p class="text-important mb-3 uppercase tracking-[0.35em] text-sm font-semibold">
            Diving In
          </p>
          <!-- styled to match the blog look; h1 for one main heading per page -->
          <h1
            id="deep-dives"
            class="text-h2 text-center pb-4 font-semibold font-sans"
          >
            Deep Dives
          </h1>
          <p class="intro text-text-large max-w-3xl mb-gutter-large mt-4">
            Longer-form explorations of the topics I find most interesting. Each deep dive
            takes a single subject and unpacks how it works, end to end.
          </p>
          <div class="dives-grid">
            <article
              v-for="dive in deepDives"
              :key="dive.id"
              class="dive-card"
            >
              <router-link
                :to="`/deep-dives/${dive.id}`"
                class="dive-link"
              >
                <header class="dive-header">
                  <h3 class="text-h3 font-semibold mb-2">
                    {{ dive.title }}
                  </h3>
                </header>

                <p class="dive-summary">
                  {{ dive.summary }}
                </p>
              </router-link>
            </article>
          </div>
        </div>
      </section>
      <site-footer />
    </main>
  </div>
</template>

<script>
import { useHead } from '@unhead/vue';
import SiteFooter from '@/components/SiteFooter.vue';
import NavBar from '@/components/NavBar.vue';
import { deepDives } from '@/content/deep-dives';
import { pageHead, jsonLd, siteUrl } from '@/utils/seo';

export default {
  components: {
    SiteFooter,
    NavBar,
  },
  setup() {
    const head = pageHead({
      title: 'Deep Dives',
      description:
        'Longer-form explorations that take a single subject and unpack how it works, end to end.',
      path: '/deep-dives',
    });
    head.script = [
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Deep Dives',
        url: `${siteUrl}/deep-dives`,
        hasPart: deepDives.map((d) => ({
          '@type': 'Article',
          headline: d.title,
          url: `${siteUrl}/deep-dives/${d.id}`,
        })),
      }),
    ];
    useHead(head);
  },
  data() {
    return {
      deepDives,
    };
  },
};
</script>

<style scoped>
.deep-dives-page {
  background: var(--bg-color-primary);
  min-height: 100vh;
}

.intro {
  color: var(--text-color-muted);
}

.dives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--gutter-medium);
}

.dive-card {
  background: var(--bg-color-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-small);
  padding: var(--gutter-medium);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: var(--gutter-small);
}

.dive-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dive-summary {
  color: var(--text-color-muted);
  line-height: 1.7;
}

.dive-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.dive-link:hover h3 {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .dives-grid {
    grid-template-columns: 1fr;
  }

  .dive-card {
    padding: var(--gutter-small);
  }
}
</style>
