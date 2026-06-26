<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { PageHero, TagList } from '@/components/base';
import CustomText from '@/components/common/CustomText.vue';
import CircleSeal from '@/components/common/CircleSeal.vue';
import blogPosts from '@/data/blogPosts.json';
import { usePageHead } from '@/composables/usePageHead';
import {
  firstContentImage,
  stripMarkdown,
  truncate,
  absoluteUrl,
  siteUrl,
  author,
  defaultImage,
} from '@/utils/seo';

const route = useRoute();
const post = computed(
  () => blogPosts.find((entry) => entry.id === route.params.id) || null,
);

function formattedDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

usePageHead(
  () => {
    const p = post.value;
    if (!p) {
      return { title: 'Post not found', path: `/blog/${route.params.id}` };
    }
    return {
      title: p.title,
      description: p.summary || truncate(stripMarkdown(p.content), 160),
      path: `/blog/${p.id}`,
      image: firstContentImage(p.content),
      type: 'article',
      publishedTime: p.date,
      tags: p.tags,
    };
  },
  () => {
    const p = post.value;
    if (!p) return [];
    const image = firstContentImage(p.content);
    const description = p.summary || truncate(stripMarkdown(p.content), 160);
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description,
        datePublished: p.date,
        dateModified: p.date,
        image: image ? [absoluteUrl(image)] : [defaultImage],
        keywords: (p.tags || []).join(', '),
        author: { '@type': 'Person', name: author, url: siteUrl },
        publisher: { '@type': 'Person', name: author, url: siteUrl },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${p.id}`,
        },
      },
    ];
  },
);
</script>

<template>
  <DefaultLayout>
    <article class="blog-detail">
      <div class="detail-container">
        <div
          v-if="post && post.seal"
          class="seal-float"
          aria-hidden="true"
        >
          <CircleSeal
            :text="post.seal"
            :size="120"
            :duration="22"
          />
        </div>

        <template v-if="post">
          <PageHero
            class="hero-pad"
            eyebrow="Stories & Processes"
            :title="post.title"
          >
            <template #meta>
              <time :datetime="post.date">{{ formattedDate(post.date) }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ post.readTime }}</span>
            </template>
            <template #tags>
              <TagList
                :tags="post.tags"
                label="Post tags"
              />
            </template>
          </PageHero>

          <div class="pt-4">
            <CustomText :content="post.content" />
          </div>
        </template>

        <section
          v-else
          class="not-found"
        >
          <h2>Post not found</h2>
          <p>The blog post you are looking for does not exist.</p>
          <router-link
            class="back-link"
            to="/blog"
          >
            Back to blog
          </router-link>
        </section>
      </div>
    </article>
  </DefaultLayout>
</template>

<style scoped>
.blog-detail {
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

.hero-pad {
  padding-right: clamp(110px, 16vw, 170px);
}

.seal-float {
  position: absolute;
  top: 18vh;
  right: 0;
  transform: rotate(8deg);
  pointer-events: none;
  z-index: 2;
  opacity: 0.9;
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

  .hero-pad {
    padding-right: 0;
  }

  .seal-float {
    display: none;
  }
}
</style>
