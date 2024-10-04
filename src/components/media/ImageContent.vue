<template>
  <img :src="currentSrc" :class="className || 'w-full h-auto'" :alt="alt" />
</template>

<script>
export default {
  props: ['src', 'placeholder', 'alt', 'className'],
  data() {
    return {
      currentSrc: this.placeholder,
    };
  },
  mounted() {
    const img = this.$el;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage(this.src);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(img);
  },
  methods: {
    async loadImage(fileName) {
      try {
        const images = import.meta.glob('/src/assets/images/**/*', { as: 'url' });
        const importImage = images[`/src/assets/images/${fileName}`];

        if (importImage) {
          const imageUrl = await importImage();
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