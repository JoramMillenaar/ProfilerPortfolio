<script setup>
/**
 * Renders a markdown string to HTML. Content is trusted (authored in-repo).
 */
import { computed } from 'vue';
import { renderMarkdown } from '@/utils/markdown';

const props = defineProps({
  /** Markdown source. */
  content: {
    type: String,
    default: '',
  },
});

const renderedContent = computed(() => renderMarkdown(props.content));
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
  max-height: 600px;
}

/* The 172px-radius drop-shadow is expensive for mobile Safari to rasterize
   per scroll tile; keep the glow on desktop only. */
@media (min-width: 1046px) {
  .markdown-body :deep(img) {
    filter: drop-shadow(0px 0px 172px rgba(255, 255, 255, 0.1));
  }
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

.markdown-body :deep(code) {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono',
    monospace;
  font-size: 0.875em;
  background: var(--bg-color-secondary);
  border-radius: 4px;
  padding: 0.15em 0.4em;
}

.markdown-body :deep(pre) {
  background: var(--bg-color-secondary);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-radius: var(--radius-small);
  padding: var(--gutter-x-small);
  margin: var(--gutter-micro) 0;
  overflow-x: auto;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre;
}

.markdown-body :deep(.hljs-comment),
.markdown-body :deep(.hljs-quote) {
  color: var(--text-color-muted);
  font-style: italic;
}

.markdown-body :deep(.hljs-keyword),
.markdown-body :deep(.hljs-selector-tag),
.markdown-body :deep(.hljs-operator) {
  color: #c792ea;
}

.markdown-body :deep(.hljs-string),
.markdown-body :deep(.hljs-regexp),
.markdown-body :deep(.hljs-attr) {
  color: #a6e3a1;
}

.markdown-body :deep(.hljs-number),
.markdown-body :deep(.hljs-literal) {
  color: #f5a97f;
}

.markdown-body :deep(.hljs-title),
.markdown-body :deep(.hljs-title.function_),
.markdown-body :deep(.hljs-built_in) {
  color: #8ab4f8;
}

.markdown-body :deep(.hljs-title.class_),
.markdown-body :deep(.hljs-class .hljs-title) {
  color: #f4bf75;
}

.markdown-body :deep(.hljs-variable),
.markdown-body :deep(.hljs-params),
.markdown-body :deep(.hljs-property) {
  color: var(--text-color-primary);
}

.markdown-body :deep(.hljs-decorator),
.markdown-body :deep(.hljs-meta),
.markdown-body :deep(.hljs-symbol) {
  color: #f28fad;
}

.markdown-body :deep(.callout) {
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-left: 3px solid var(--important);
  border-radius: var(--radius-small);
  background: var(--bg-color-secondary);
  margin: var(--gutter-micro) 0;
  padding: var(--gutter-nano) var(--gutter-x-small);
}

.markdown-body :deep(.callout-title) {
  font-weight: 600;
  padding-top: var(--gutter-nano);
}

.markdown-body :deep(.callout-body) {
  padding-bottom: var(--gutter-nano);
}

.markdown-body :deep(.callout-body pre) {
  margin-inline: 0;
}

.markdown-body :deep(details.callout) {
  padding: var(--gutter-nano) var(--gutter-x-small);
}

.markdown-body :deep(details.callout summary) {
  cursor: pointer;
  font-weight: 600;
  padding: var(--gutter-nano) 0;
  list-style: none;
}

.markdown-body :deep(details.callout summary)::-webkit-details-marker {
  display: none;
}

.markdown-body :deep(details.callout summary)::before {
  content: '▸';
  display: inline-block;
  margin-right: 0.5em;
  transition: transform 0.15s ease;
}

.markdown-body :deep(details.callout[open] summary)::before {
  transform: rotate(90deg);
}

.markdown-body :deep(details.callout .callout-body) {
  padding-top: var(--gutter-nano);
}
</style>
