<script setup>
import { onMounted } from 'vue';
import 'aos/dist/aos.css';

onMounted(async () => {
  // Loaded client-side only so the build-time prerender never touches AOS.
  const { default: AOS } = await import('aos');
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 400,
    easing: 'ease',
    // Animate once and stay visible: re-hiding content on every scroll
    // direction change made pages feel like they were re-loading on mobile.
    once: true,
    anchorPlacement: 'top-bottom',
  });
});
</script>

<template>
  <div
    id="app"
    class="overflow-x-clip"
  >
    <router-view />
  </div>
</template>
