<template>
  <div>
    <img class="box" v-if="image" :src="image" loading="lazy" />
    <video
      class="box"
      v-if="video"
      :src="video"
      @loadeddata="handleVideoLoad($event)"
      muted
      loop
      playsinline
    ></video>
  </div>
</template>

<script>
export default {
  props: ['image', 'video'],
  methods: {
    handleVideoLoad(event) {
      const videoElement = event.target;
      videoElement.previousElementSibling.style.display = 'none';
      videoElement.style.display = 'block';
      videoElement.play();
    },
  },
};
</script>

<style scoped>
.box {
  box-shadow: var(--shadow);
}
</style>
