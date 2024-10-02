<template>
  <div class="relative">
    <ImageContent
      v-if="!isVideoVisible || !videoSrc"
      :src="thumbnail"
      className="w-full h-auto"
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
    ></video>
  </div>
</template>

<script>
import ImageContent from './ImageContent.vue';

export default {
  props: ['video', 'thumbnail'],
  components: { ImageContent },
  data() {
    return {
      isVideoVisible: false,
      videoSrc: '',
    };
  },
  mounted() {
    const img = this.$el.querySelector('img');
    img.addEventListener('load', () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVideoVisible = true;
              this.loadVideo(this.video);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(img);
    });
  },
  methods: {
    async loadVideo(fileName) {
      try {
        const videos = import.meta.glob('/src/assets/videos/**/*', {
          as: 'url',
        });
        const importVideo = videos[`/src/assets/videos/${fileName}`];

        if (importVideo) {
          this.videoSrc = await importVideo();
        } else {
          console.error(`Video not found: ${fileName}`);
          this.videoSrc = this.placeholder;
        }
      } catch (error) {
        console.error(`Error loading image: ${fileName}`, error);
        this.videoSrc = this.placeholder;
      }
    },
  },
};
</script>

<style scoped></style>
