<template>
  <video class="box" muted loop playsinline autoplay loading="lazy">
    <source :src="video" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script>
export default {
  props: {
    video: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>
