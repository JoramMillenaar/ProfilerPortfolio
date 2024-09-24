<template>
  <div class="video-container" ref="videoContainer">
    <img
      v-if="!videoLoaded"
      :src="require(`@/assets/images/${thumbnail}`)"
      alt="Low quality thumbnail of the first frame of the video that's loading"
    />
    <video
      v-if="videoLoaded"
      muted
      loop
      playsinline
      autoplay
      preload="auto"
      ref="mainVideo"
    >
      <source :src="require(`@/assets/videos/${video}`)" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  props: ['video', 'thumbnail', 'blurredBackground'],
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
  /* Remove height and padding-bottom to allow dynamic sizing */
}

img {
  position: relative;
  z-index: -1;
  width: 100%;
  height: auto;
}

video {
  width: 100%;
  height: auto;
  display: block; /* Ensure the video takes the full width of its container */
}
</style>

