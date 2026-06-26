<script setup>
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { BaseSection, SectionHeading, BaseCard } from '@/components/base';
import { deepDives } from '@/content/deep-dives';
import { usePageHead } from '@/composables/usePageHead';
import { siteUrl } from '@/utils/seo';

usePageHead(
  {
    title: 'Deep Dives',
    description:
      'Longer-form explorations that take a single subject and unpack how it works, end to end.',
    path: '/deep-dives',
  },
  [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Deep Dives',
      url: `${siteUrl}/deep-dives`,
      hasPart: deepDives.map((d) => ({
        '@type': 'Article',
        headline: d.title,
        url: `${siteUrl}/deep-dives/${d.id}`,
      })),
    },
  ],
);
</script>

<template>
  <DefaultLayout nav-at-top>
    <main class="deep-dives-page">
      <BaseSection spacing="small">
        <SectionHeading
          eyebrow="Diving In"
          title="Deep Dives"
          :level="1"
          heading-id="deep-dives"
        />
        <p class="intro text-text-large max-w-3xl mb-gutter-large mt-4">
          Longer-form explorations of the topics I find most interesting. Each deep dive
          takes a single subject and unpacks how it works, end to end.
        </p>
        <div class="dives-grid">
          <BaseCard
            v-for="dive in deepDives"
            :key="dive.id"
            :to="`/deep-dives/${dive.id}`"
            class="dive-card"
          >
            <h3 class="text-h3 font-semibold mb-2">
              {{ dive.title }}
            </h3>
            <p class="dive-summary">
              {{ dive.summary }}
            </p>
          </BaseCard>
        </div>
      </BaseSection>
    </main>
  </DefaultLayout>
</template>

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

.dive-card:hover h3 {
  text-decoration: underline;
}

.dive-summary {
  color: var(--text-color-muted);
  line-height: 1.7;
}

@media (max-width: 640px) {
  .dives-grid {
    grid-template-columns: 1fr;
  }
}
</style>
