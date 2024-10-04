<template>
  <div id="app" class="overflow-x-clip">
    <router-view />
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'App',
  mounted() {
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
