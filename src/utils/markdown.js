/**
 * Configures and exports a single markdown renderer for blog content.
 *
 * This must live in a plain module, not a Vue <script setup> block: Vue's
 * SFC compiler runs all top-level <script setup> code inside the component's
 * setup() function, so it re-executes on every component instantiation. A
 * plain ES module's top level runs exactly once (module caching), which
 * matters here because `marked.use(...)` mutates a shared singleton — during
 * SSG's per-route render loop, calling it once per rendered page stacked up
 * duplicate extensions on the same `marked` instance, and each duplicate
 * re-escaped/re-highlighted already-processed code, causing exponential
 * output growth.
 */
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

export function renderMarkdown(content) {
  return marked.parse(content || '');
}
