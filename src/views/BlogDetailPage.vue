<template>
  <nav-bar :showAtTop="false"/>
  <article class="blog-detail">
    <div class="container">
      <header class="hero" v-if="post">
        <p class="eyebrow">Stories & Processes</p>
        <h1 class="title">{{ post.title }}</h1>
        <div class="meta">
          <time :datetime="post.date">{{ formattedDate(post.date) }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ post.readTime }}</span>
        </div>
        <ul class="tags" aria-label="Post tags">
          <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
        </ul>
      </header>

      <div v-if="post" class="pt-4">
        <custom-text :content="post.content"/>
      </div>

      <section v-else class="not-found">
        <h2>Post not found</h2>
        <p>The blog post you are looking for does not exist.</p>
        <router-link class="back-link" to="/blog">Back to blog</router-link>
      </section>
    </div>
    <site-footer/>
  </article>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import blogPosts from '@/data/blogPosts.json';
import CustomText from "@/components/common/customText.vue";

export default {
  name: 'BlogDetailPage',
  components: {CustomText, NavBar, SiteFooter},
  data() {
    return {
      post: null,
    };
  },
  created() {
    this.loadPost();
  },
  watch: {
    '$route.params.id': 'loadPost',
  },
  methods: {
    loadPost() {
      const postId = this.$route.params.id;
      this.post = blogPosts.find((entry) => entry.id === postId) || null;
    },
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
.blog-detail {
  background: var(--bg-color-primary);
  min-height: 100vh;
  color: var(--text-color-primary);
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--gutter-x-large) var(--gutter-medium);
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
}
</style>
