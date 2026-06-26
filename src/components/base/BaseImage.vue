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

const images = import.meta.glob('/src/assets/images/**/*', { query: '?url', import: 'default' });
const cache = {};

const el = ref(null);
const currentSrc = ref(props.placeholder);
let observer = null;

async function load(fileName) {
  if (cache[fileName]) {
    currentSrc.value = cache[fileName];
    return;
  }
  const importImage = images[`/src/assets/images/${fileName}`];
  if (!importImage) {
    console.error(`Image not found: ${fileName}`);
    return;
  }
  try {
    const url = await importImage();
    cache[fileName] = url;
    currentSrc.value = url;
  } catch (error) {
    console.error(`Error loading image: ${fileName}`, error);
  }
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
  >
</template>
