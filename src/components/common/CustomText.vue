<script setup>
/**
 * Renders a markdown string to HTML. Content is trusted (authored in-repo).
 */
import { computed } from 'vue';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('python', python);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);

marked.use(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return language === 'plaintext'
        ? code
        : hljs.highlight(code, { language }).value;
    },
  }),
);

const props = defineProps({
  /** Markdown source. */
  content: {
    type: String,
    default: '',
  },
});

// Matches an Obsidian-style callout header, e.g. "> [!INFO]- Title".
// The trailing "-"/"+" marks it foldable (closed/open by default); no
// marker means a plain, always-expanded callout.
const CALLOUT_HEADER = /^ {0,3}>[ \t]?\[!(\w+)\]([-+]?)[ \t]*(.*)$/;

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// marked has no built-in support for Obsidian-style foldable callouts. This
// registers a proper block-level token so callout bodies (which may contain
// code blocks with blank lines) flow through the normal parser/renderer
// pipeline, instead of being pre-rendered to HTML and re-embedded as a
// string — splicing rendered HTML back into markdown source breaks because
// <details> is a "blank-line-terminated" HTML block per CommonMark, and
// code inside a <pre> routinely contains blank lines.
marked.use({
  extensions: [
    {
      name: 'callout',
      level: 'block',
      start(src) {
        const match = /(?:^|\n) {0,3}>[ \t]?\[!\w+\]/.exec(src);
        return match ? match.index : undefined;
      },
      tokenizer(src) {
        const lines = src.split('\n');
        const headerMatch = CALLOUT_HEADER.exec(lines[0]);
        if (!headerMatch) return undefined;

        let end = 1;
        while (end < lines.length && /^ {0,3}>/.test(lines[end])) end += 1;

        const consumedLines = lines.slice(0, end);
        const raw = consumedLines.join('\n');
        const bodyText = consumedLines
          .slice(1)
          .map((line) => line.replace(/^ {0,3}> ?/, ''))
          .join('\n');

        const [, type, fold, title] = headerMatch;
        return {
          type: 'callout',
          raw,
          calloutType: type.toLowerCase(),
          fold,
          title,
          tokens: this.lexer.blockTokens(bodyText, []),
        };
      },
      renderer(token) {
        const displayTitle = escapeHtml(token.title || token.calloutType);
        const bodyHtml = this.parser.parse(token.tokens);
        if (token.fold) {
          const openAttr = token.fold === '+' ? ' open' : '';
          return `<details class="callout callout-${token.calloutType}"${openAttr}><summary>${displayTitle}</summary><div class="callout-body">\n\n${bodyHtml}\n\n</div></details>`;
        }
        return `<div class="callout callout-${token.calloutType}"><p class="callout-title">${displayTitle}</p><div class="callout-body">\n\n${bodyHtml}\n\n</div></div>`;
      },
      childTokens: ['tokens'],
    },
  ],
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
