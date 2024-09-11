<template>
  <div class="video-container" ref="videoContainer">
    <video v-if="videoLoaded" class="box" muted loop playsinline autoplay>
      <source :src="video" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      videoLoaded: false,
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.videoLoaded) {
            this.videoLoaded = true;
            observer.unobserve(this.$refs.videoContainer);
          }
        });
      },
      {
        rootMargin: '150px',
        threshold: 0.1,
      }
    );

    observer.observe(this.$refs.videoContainer);
  },
};
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
</style>

