<template>
  <div class="video-container" ref="videoContainer">
    <img
      :src="thumbnail"
      alt="Low quality thumbnail of the first frame of the video that's loading"
    />
    <video v-if="videoLoaded" muted loop playsinline autoplay>
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
        rootMargin: '50px',
        threshold: 0,
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

img {
  position: relative;
  z-index: -1;
}

video {
  position: absolute;
  top: 0;
}
</style>
