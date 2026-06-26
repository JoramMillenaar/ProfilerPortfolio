<script setup>
/**
 * Square icon rendered from an asset in src/assets/images. Thin wrapper around
 * BaseImage with a fixed pixel size and eager (non-lazy) intent for small UI
 * glyphs.
 */
import { computed } from 'vue';
import BaseImage from './BaseImage.vue';

const props = defineProps({
  /** Path relative to src/assets/images. */
  src: {
    type: String,
    required: true,
  },
  /** Accessible label. */
  alt: {
    type: String,
    default: '',
  },
  /** Pixel size (width & height). */
  size: {
    type: [Number, String],
    default: 24,
  },
});

const style = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: 'auto',
}));
</script>

<template>
  <BaseImage
    :src="src"
    :alt="alt"
    img-class="base-icon"
    :style="style"
  />
</template>
