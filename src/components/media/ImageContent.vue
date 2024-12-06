<template>
  <img :src="currentSrc" :class="className || 'w-full h-auto'" :alt="alt" />
</template>

<script>
export default {
  props: ['src', 'placeholder', 'alt', 'className'],
  data() {
    return {
      currentSrc: this.placeholder,
      loadedImages: {},
    };
  },
  mounted() {
    const img = this.$el;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.preloadImage(this.src);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '500px' }
    );
    observer.observe(img);
  },
  methods: {
    async preloadImage(fileName) {
      try {
        if (this.loadedImages[fileName]) {
          this.currentSrc = this.loadedImages[fileName];
          return;
        }
        
        const images = import.meta.glob('/src/assets/images/**/*', { as: 'url' });
        const importImage = images[`/src/assets/images/${fileName}`];

        if (importImage) {
          const imageUrl = await importImage();
          this.loadedImages[fileName] = imageUrl;
          this.currentSrc = imageUrl;
        } else {
          console.error(`Image not found: ${fileName}`);
        }
      } catch (error) {
        console.error(`Error loading image: ${fileName}`, error);
      }
    },
  },
};
</script>

<style scoped></style>