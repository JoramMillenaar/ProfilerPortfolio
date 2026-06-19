<template>
  <nav-bar :showAtTop="true"/>
  <div class="blog-page px-0 py-8">
    <main>
      <section>
        <div class="container pb-4">
          <p class="text-important mb-3 uppercase tracking-[0.35em] text-sm font-semibold">
            Stories & Processes
          </p>
          <h2 id="blog">On the Blog</h2>
          <p class="intro text-text-large max-w-3xl mb-gutter-large mt-4">
            I use this space to document how I build, learn, and experiment. These posts
            unpack the decisions, trade-offs, and processes behind the work.
          </p>
          <div class="posts-grid">
            <article
                v-for="post in sortedPosts"
                :key="post.id"
                class="post-card"
                itemscope
                itemtype="https://schema.org/BlogPosting"
            >
              <router-link
                  :to="`/blog/${post.id}`"
                  class="post-link"
                  itemprop="url"
              >
                <header class="post-header">
                  <p class="post-meta">
                    <time :datetime="post.date" itemprop="datePublished">
                      {{ formattedDate(post.date) }}
                    </time>
                    · {{ post.readTime }}
                  </p>

                  <h3 class="text-h3 font-semibold mb-2" itemprop="headline">
                    {{ post.title }}
                  </h3>
                </header>

                <p class="post-summary" itemprop="description">
                  {{ post.summary }}
                </p>
              </router-link>

              <ul class="tag-list" aria-label="Post tags">
                <li
                    v-for="tag in post.tags"
                    :key="tag"
                    class="tag"
                    itemprop="keywords"
                >
                  {{ tag }}
                </li>
              </ul>
            </article>

          </div>
        </div>
      </section>
      <site-footer></site-footer>
    </main>
  </div>
</template>

<script>
import SiteFooter from '@/components/SiteFooter.vue';
import NavBar from '@/components/NavBar.vue';
import blogPosts from '@/data/blogPosts.json';

export default {
  components: {
    SiteFooter,
    NavBar,
  },
  data() {
    return {
      blogPosts,
    };
  },
  computed: {
    sortedPosts() {
      return [...this.blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
  methods: {
    formattedDate(dateString) {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
.blog-page {
  background: var(--bg-color-primary);
  min-height: 100vh;
}

.intro {
  color: var(--text-color-muted);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--gutter-medium);
}

.post-card {
  background: var(--bg-color-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-small);
  padding: var(--gutter-medium);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: var(--gutter-small);
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

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tag {
  padding: 0.35rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--important);
  font-size: 0.9rem;
  letter-spacing: 0.03em;
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

  .post-card {
    padding: var(--gutter-small);
  }
}
</style>
