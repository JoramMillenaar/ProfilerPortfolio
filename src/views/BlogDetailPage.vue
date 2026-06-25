<template>
  <nav-bar :show-at-top="false" />
  <article class="blog-detail">
    <div class="container">
      <div
        v-if="post.seal"
        class="seal-float"
        aria-hidden="true"
      >
        <CircularSeal
          :text="post.seal"
          :size="120"
          :duration="22"
        />
      </div>
      <header
        v-if="post"
        class="hero"
      >
        <p class="eyebrow">
          Stories & Processes
        </p>
        <h1 class="title">
          {{ post.title }}
        </h1>
        <div class="meta">
          <time :datetime="post.date">{{ formattedDate(post.date) }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ post.readTime }}</span>
        </div>
        <ul
          class="tags"
          aria-label="Post tags"
        >
          <li
            v-for="tag in post.tags"
            :key="tag"
          >
            {{ tag }}
          </li>
        </ul>
      </header>

      <div
        v-if="post"
        class="pt-4"
      >
        <custom-text :content="post.content" />
      </div>

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
    <site-footer />
  </article>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import NavBar from '@/components/NavBar.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import blogPosts from '@/data/blogPosts.json';
import CustomText from "@/components/common/customText.vue";
import CircularSeal from "@/components/common/CircleSeal.vue";
import {
  pageHead,
  jsonLd,
  firstContentImage,
  stripMarkdown,
  truncate,
  absoluteUrl,
  siteUrl,
  author,
  defaultImage,
} from '@/utils/seo';

export default {
  name: 'BlogDetailPage',
  components: {CircularSeal, CustomText, NavBar, SiteFooter},
  setup() {
    const route = useRoute();
    const post = computed(
      () => blogPosts.find((entry) => entry.id === route.params.id) || null,
    );

    useHead(
      computed(() => {
        const p = post.value;
        if (!p) {
          return pageHead({
            title: 'Post not found',
            path: `/blog/${route.params.id}`,
          });
        }
        const image = firstContentImage(p.content);
        const description =
          p.summary || truncate(stripMarkdown(p.content), 160);
        const head = pageHead({
          title: p.title,
          description,
          path: `/blog/${p.id}`,
          image,
          type: 'article',
          publishedTime: p.date,
          tags: p.tags,
        });
        head.script = [
          jsonLd({
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
          }),
        ];
        return head;
      }),
    );

    const formattedDate = (dateString) =>
      new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

    return { post, formattedDate };
  },
};
</script>

<style scoped>
.blog-detail {
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

@media (max-width: 640px) {
  .hero {
    padding-right: 0;
  }

  .seal-float {
    position: relative;
    top: 0;
    right: 0;
    margin-left: auto;
    margin-bottom: var(--gutter-small);
    transform: rotate(6deg);
    width: fit-content;
  }
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

.meta {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--text-color-muted);
  font-size: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: var(--gutter-small) 0 0;
  padding: 0;
}

.tags li {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  color: var(--important);
  font-size: 0.95rem;
  letter-spacing: 0.03em;
}

.list li::before {
  content: '•';
  margin-right: 0.5rem;
  color: var(--important);
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

  .seal-float {
    display: none;
  }
}
</style>
