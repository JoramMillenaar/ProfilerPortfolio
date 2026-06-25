<template>
  <nav-bar :showAtTop="false"/>
  <article class="deep-dive-detail">
    <div class="container">
      <template v-if="dive">
        <header class="hero">
          <p class="eyebrow">Deep Dive</p>
          <h1 class="title">{{ dive.title }}</h1>
        </header>

        <div class="pt-4">
          <component :is="content"/>
        </div>
      </template>

      <section v-else class="not-found">
        <h2>Deep dive not found</h2>
        <p>The deep dive you are looking for does not exist.</p>
        <router-link class="back-link" to="/deep-dives">Back to deep dives</router-link>
      </section>
    </div>
    <site-footer/>
  </article>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import NavBar from '@/components/NavBar.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import { getDeepDive } from '@/content/deep-dives';
import {
  pageHead,
  jsonLd,
  truncate,
  siteUrl,
  author,
  defaultImage,
} from '@/utils/seo';

export default {
  name: 'DeepDiveDetailPage',
  components: { NavBar, SiteFooter },
  setup() {
    const route = useRoute();
    const dive = computed(() => getDeepDive(route.params.id));

    // Resolve the deep dive's own Vue component lazily. The platform renders the
    // shared chrome (nav, hero, footer, SEO); the content component owns the body.
    const content = computed(() =>
      dive.value ? defineAsyncComponent(dive.value.load) : null,
    );

    useHead(
      computed(() => {
        const d = dive.value;
        if (!d) {
          return pageHead({
            title: 'Deep dive not found',
            path: `/deep-dives/${route.params.id}`,
          });
        }
        const description = truncate(d.summary || '', 160);
        const head = pageHead({
          title: d.title,
          description,
          path: `/deep-dives/${d.id}`,
          type: 'article',
        });
        head.script = [
          jsonLd({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: d.title,
            description,
            image: [defaultImage],
            author: { '@type': 'Person', name: author, url: siteUrl },
            publisher: { '@type': 'Person', name: author, url: siteUrl },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${siteUrl}/deep-dives/${d.id}`,
            },
          }),
        ];
        return head;
      }),
    );

    return { dive, content };
  },
};
</script>

<style scoped>
.deep-dive-detail {
  background: var(--bg-color-primary);
  min-height: 100vh;
  color: var(--text-color-primary);
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--gutter-x-large) var(--gutter-medium);
  position: relative;
}

.hero {
  padding-bottom: var(--gutter-large);
  border-bottom: 1px solid var(--border);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 0.9rem;
  color: var(--text-color-muted);
  margin-bottom: var(--gutter-nano);
}

.title {
  font-size: clamp(2.25rem, 4vw, 3rem);
  margin-bottom: var(--gutter-small);
}

.not-found {
  text-align: center;
  padding: var(--gutter-large) 0;
}

.back-link {
  display: inline-block;
  margin-top: var(--gutter-small);
  color: var(--important);
  text-decoration: underline;
}

@media (max-width: 640px) {
  .container {
    padding-inline: var(--gutter-small);
  }

  .title {
    font-size: clamp(2rem, 6vw, 2.5rem);
  }
}
</style>
