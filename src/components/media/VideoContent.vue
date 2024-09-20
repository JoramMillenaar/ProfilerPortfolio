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
      preload="auto"
      ref="mainVideo"
    >
      <source :src="require(`@/assets/videos/${video}`)" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <video
      v-if="blurredBackground && videoLoaded"
      muted
      loop
      playsinline
      preload="auto"
      ref="backgroundVideo"
      class="background"
    >
      <source :src="require(`@/assets/videos/${blurredBackground}`)" type="video/mp4" />
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
      mainVideoReady: false,
      backgroundVideoReady: false,
    };
  },
  methods: {
    initVideos() {
      const mainVideo = this.$refs.mainVideo;
      mainVideo.oncanplaythrough = () => {
        this.mainVideoReady = true;
        this.checkVideosReady();
      };

      if (this.blurredBackground) {
        const backgroundVideo = this.$refs.backgroundVideo;
        backgroundVideo.oncanplaythrough = () => {
          this.backgroundVideoReady = true;
          this.checkVideosReady();
        };
      } else {
        this.backgroundVideoReady = true;
        this.checkVideosReady();
      }
    },
    checkVideosReady() {
      if (this.$refs.mainVideo && this.mainVideoReady && this.backgroundVideoReady) {
        this.$refs.mainVideo.play();
        if (this.blurredBackground) {
          this.$refs.backgroundVideo.play();
        }
      }
    },
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.videoLoaded) {
            this.videoLoaded = true;
            observer.unobserve(this.$refs.videoContainer);

            // Wait for DOM update before accessing refs
            this.$nextTick(() => {
              this.initVideos();
            });
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

.background {
  filter: blur(30px);
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover; /* Ensure the background video covers the container */
  opacity: 0.7;
}
</style>

