<script setup>
/**
 * Renders a markdown string to HTML. Content is trusted (authored in-repo).
 */
import { computed } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  /** Markdown source. */
  content: {
    type: String,
    default: '',
  },
});

const renderedContent = computed(() => marked.parse(props.content || ''));
</script>

<template>
  <!-- eslint-disable vue/no-v-html -- content is trusted markdown authored in-repo -->
  <div
    class="markdown-body"
    v-html="renderedContent"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<style scoped>
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  padding-top: var(--gutter-medium);
  padding-bottom: var(--gutter-nano);
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
}

.markdown-body :deep(p) {
  padding-top: var(--gutter-micro);
}

.markdown-body :deep(ul) {
  list-style: none;
  margin-left: 0;
  padding-left: 1em;
}

.markdown-body :deep(ul > li):before {
  display: inline-block;
  padding-top: var(--gutter-nano);
  content: '-';
  width: 1em;
  margin-left: -1em;
}

.markdown-body :deep(img) {
  display: block;
  max-width: 90%;
  padding: var(--gutter-medium);
  margin: auto;
  height: auto;
  filter: drop-shadow(0px 0px 172px rgba(255, 255, 255, 0.1));
}

.markdown-body :deep(blockquote) {
  border-left: 3px solid var(--color-border, rgba(255, 255, 255, 0.2));
  margin: var(--gutter-micro) 0;
  padding: var(--gutter-nano) var(--gutter-small, 1rem);
  opacity: 0.75;
}

.markdown-body :deep(blockquote p) {
  padding-top: 0;
  font-style: italic;
}
</style>
