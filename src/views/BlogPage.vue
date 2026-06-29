<script setup>
import { computed } from 'vue';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { BaseSection, SectionHeading, BaseCard, TagList } from '@/components/base';
import blogPosts from '@/data/blogPosts.json';
import { usePageHead } from '@/composables/usePageHead';
import { siteUrl } from '@/utils/seo';

const sortedPosts = computed(() =>
  [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)),
);

function formattedDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

usePageHead(
  {
    title: 'Blog',
    description:
      'Stories and processes on how I build, learn, and experiment — the decisions and trade-offs behind the work.',
    path: '/blog',
  },
  [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'On the Blog',
      url: `${siteUrl}/blog`,
      blogPost: sortedPosts.value.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        datePublished: p.date,
        url: `${siteUrl}/blog/${p.id}`,
        keywords: (p.tags || []).join(', '),
      })),
    },
  ],
);
</script>

<template>
  <DefaultLayout nav-at-top>
    <main class="blog-page">
      <BaseSection spacing="small">
        <SectionHeading
          eyebrow="Stories & Processes"
          title="On the Blog"
          :level="1"
          heading-id="blog"
        />
        <p class="intro text-text-large max-w-3xl mb-gutter-large mt-4">
          I use this space to document how I build, learn, and experiment. These posts
          unpack the decisions, trade-offs, and processes behind the work.
        </p>
        <div class="posts-grid">
          <BaseCard
            v-for="post in sortedPosts"
            :key="post.id"
          >
            <router-link
              :to="`/blog/${post.id}`"
              class="post-link"
            >
              <header class="post-header">
                <p class="post-meta">
                  <time :datetime="post.date">{{ formattedDate(post.date) }}</time>
                  · {{ post.readTime }}
                </p>
                <h3 class="text-h3 font-semibold mb-2">
                  {{ post.title }}
                </h3>
              </header>
              <p class="post-summary">
                {{ post.summary }}
              </p>
            </router-link>
            <TagList
              :tags="post.tags"
              label="Post tags"
            />
          </BaseCard>
        </div>
      </BaseSection>
    </main>
  </DefaultLayout>
</template>

<style scoped>
.blog-page {
  background: var(--bg-color-primary);
  min-height: 100vh;
  padding-top: calc(60px + var(--gutter-nano) + var(--gutter-medium));
}

.intro {
  color: var(--text-color-muted);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--gutter-medium);
}

.post-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.post-meta {
  color: var(--text-color-muted);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
}

.post-summary {
  color: var(--text-color-muted);
  line-height: 1.7;
}

.post-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.post-link:hover h3 {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
