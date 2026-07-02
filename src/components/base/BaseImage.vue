<script setup>
/**
 * Lazy-loaded image. Shows `placeholder` until the element nears the viewport,
 * then resolves the real asset from src/assets/images via Vite's glob import.
 *
 * `src` is a path relative to src/assets/images (e.g. "github.svg",
 * "work/therapieland.webp").
 */
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  /** Path relative to src/assets/images. */
  src: {
    type: String,
    required: true,
  },
  /** Low-quality / placeholder source shown before load. */
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

// Eager: every image resolves to its final URL string at build time, so
// showing an image costs one request (the image itself) instead of a tiny
// JS-module fetch followed by the image fetch — a two-round-trip waterfall
// that made sections visibly late on high-latency mobile connections.
const images = import.meta.glob('/src/assets/images/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const el = ref(null);
const currentSrc = ref(props.placeholder);
let observer = null;

function load(fileName) {
  const url = images[`/src/assets/images/${fileName}`];
  if (!url) {
    console.error(`Image not found: ${fileName}`);
    return;
  }
  currentSrc.value = url;
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          load(props.src);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '500px' },
  );
  observer.observe(el.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <img
    ref="el"
    :src="currentSrc"
    :alt="alt"
    :class="imgClass"
    decoding="async"
  >
</template>
