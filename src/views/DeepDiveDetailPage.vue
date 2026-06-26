<script setup>
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { PageHero } from '@/components/base';
import { getDeepDive } from '@/content/deep-dives';
import { usePageHead } from '@/composables/usePageHead';
import { truncate, siteUrl, author, defaultImage } from '@/utils/seo';

const route = useRoute();
const dive = computed(() => getDeepDive(route.params.id));

// The platform renders the shared chrome (nav, hero, footer, SEO); the deep
// dive's own component owns the body. Resolved lazily.
const content = computed(() =>
  dive.value ? defineAsyncComponent(dive.value.load) : null,
);

usePageHead(
  () => {
    const d = dive.value;
    if (!d) {
      return {
        title: 'Deep dive not found',
        path: `/deep-dives/${route.params.id}`,
      };
    }
    return {
      title: d.title,
      description: truncate(d.summary || '', 160),
      path: `/deep-dives/${d.id}`,
      type: 'article',
    };
  },
  () => {
    const d = dive.value;
    if (!d) return [];
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: d.title,
        description: truncate(d.summary || '', 160),
        image: [defaultImage],
        author: { '@type': 'Person', name: author, url: siteUrl },
        publisher: { '@type': 'Person', name: author, url: siteUrl },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/deep-dives/${d.id}`,
        },
      },
    ];
  },
);
</script>

<template>
  <DefaultLayout>
    <article class="deep-dive-detail">
      <div class="detail-container">
        <template v-if="dive">
          <PageHero
            eyebrow="Deep Dive"
            :title="dive.title"
          />
          <div class="pt-4">
            <component :is="content" />
          </div>
        </template>

        <section
          v-else
          class="not-found"
        >
          <h2>Deep dive not found</h2>
          <p>The deep dive you are looking for does not exist.</p>
          <router-link
            class="back-link"
            to="/deep-dives"
          >
            Back to deep dives
          </router-link>
        </section>
      </div>
    </article>
  </DefaultLayout>
</template>

<style scoped>
.deep-dive-detail {
  background: var(--bg-color-primary);
  min-height: 100vh;
  color: var(--text-color-primary);
}

.detail-container {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--gutter-x-large) var(--gutter-medium);
  position: relative;
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
  .detail-container {
    padding-inline: var(--gutter-small);
  }
}
</style>
