import { useHead } from '@unhead/vue';
import { pageHead, jsonLd } from '@/utils/seo';

/**
 * Set the document head for a page from `pageHead` options, plus optional
 * JSON-LD structured-data blocks.
 *
 * Both arguments may be plain values or getter functions; pass getters when the
 * head depends on reactive state (e.g. a route param) so it stays in sync.
 *
 * @param {object | (() => object)} options - Arguments forwarded to `pageHead`.
 * @param {object[] | (() => object[])} [structuredData] - JSON-LD objects.
 */
export function usePageHead(options, structuredData) {
  useHead(() => {
    const opts = typeof options === 'function' ? options() : options;
    const head = pageHead(opts);
    const data =
      typeof structuredData === 'function' ? structuredData() : structuredData;
    if (data && data.length) {
      head.script = data.map((entry) => jsonLd(entry));
    }
    return head;
  });
}
