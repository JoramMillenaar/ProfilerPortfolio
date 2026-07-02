<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';
import { BaseImage } from '@/components/base';

const props = defineProps({
  /** Video filename relative to src/assets/videos. */
  video: {
    type: String,
    required: true,
  },
  /** Thumbnail path relative to src/assets/images, shown until the video loads. */
  thumbnail: {
    type: String,
    required: true,
  },
});

// Eager: resolves video URLs at build time, avoiding a JS-module round-trip
// before the video request itself (same waterfall fix as BaseImage).
const videos = import.meta.glob('/src/assets/videos/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const root = useTemplateRef('root');
const isVideoVisible = ref(false);
const videoSrc = ref('');

function loadVideo(fileName) {
  const url = videos[`/src/assets/videos/${fileName}`];
  if (!url) {
    console.error(`Video not found: ${fileName}`);
    return;
  }
  videoSrc.value = url;
}

onMounted(() => {
  const img = root.value?.querySelector('img');
  if (!img) return;
  img.addEventListener('load', () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVideoVisible.value = true;
            loadVideo(props.video);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(img);
  });
});
</script>

<template>
  <div
    ref="root"
    class="relative"
  >
    <BaseImage
      v-if="!isVideoVisible || !videoSrc"
      :src="thumbnail"
      img-class="w-full h-auto"
      alt="Thumbnail"
    />
    <video
      v-else
      :src="videoSrc"
      autoplay
      muted
      loop
      playsinline
      class="w-full h-auto"
    />
  </div>
</template>
