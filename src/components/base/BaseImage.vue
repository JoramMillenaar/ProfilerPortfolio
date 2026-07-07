<script setup>
/**
 * Image whose source is resolved from src/assets/images at build time, then
 * lazy-loaded by the browser natively.
 *
 * The URL is known at build time (eager glob), so it's baked into the
 * pre-rendered HTML and the image appears without waiting on JS. Native
 * `loading="lazy"` + `decoding="async"` defer the fetch and decode of
 * off-screen images off the main thread. This replaces an earlier
 * IntersectionObserver that left `src=""` until hydration fired — a
 * JS-gated reveal that delayed images on slow connections.
 *
 * `src` is a path relative to src/assets/images (e.g. "github.svg",
 * "work/therapieland.webp").
 */
import { computed } from 'vue';

const props = defineProps({
  /** Path relative to src/assets/images. */
  src: {
    type: String,
    required: true,
  },
  /** Fallback source used only if `src` can't be resolved. */
  placeholder: {
    type: String,
    default: '',
  },
  /** Alt text. */
  alt: {
    type: String,
    default: '',
  },
  /** Extra classes applied to the <img>. */
  imgClass: {
    type: [String, Array, Object],
    default: 'w-full h-auto',
  },
});

const images = import.meta.glob('/src/assets/images/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const resolvedSrc = computed(() => {
  const url = images[`/src/assets/images/${props.src}`];
  if (!url) {
    console.error(`Image not found: ${props.src}`);
    return props.placeholder;
  }
  return url;
});
</script>

<template>
  <img
    :src="resolvedSrc"
    :alt="alt"
    :class="imgClass"
    loading="lazy"
    decoding="async"
  >
</template>
