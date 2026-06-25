<template>
  <div
    id="app"
    class="overflow-x-clip"
  >
    <router-view />
  </div>
</template>

<script>
import 'aos/dist/aos.css';

export default {
  name: 'App',
  async mounted() {
    // Loaded client-side only so the build-time prerender never touches AOS.
    const { default: AOS } = await import('aos');
    AOS.init({
      offset: 120,
      delay: 100,
      duration: 400,
      easing: 'ease',
      once: false,
      anchorPlacement: 'top-bottom',
    });
  },
};
</script>

<style>
</style>
