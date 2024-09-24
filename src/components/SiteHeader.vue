<template>
  <header class="header">
    <div class="header-textbox">
      <div data-aos="fade" data-aos-duration="500">
        <text-slider />
      </div>
      <h1 class="h1 tech" data-aos="fade-up">
        {{ header.titleLineOne }}<br />{{ header.titleLineTwo }}
      </h1>
      <p class="header-text" data-aos="fade-up" data-aos-delay="200">
        {{ header.subheader }}
      </p>
      <div class="header-btns" data-aos="fade-up" data-aos-delay="400">
        <a href="#contact" class="btn-primary">Contact Me</a>
        <external-link class="btn-secondary" to="/skills">Skill Overview</external-link>
      </div>
    </div>
    <img
      v-if="viewportWidth >= 600"
      :src="require(`@/assets/images/${header.image}`)"
      class="main-img"
      fetchpriority="high"
      loading="eager"
      :alt="header.imageAlt"
    />
  </header>
</template>

<script>
import headerData from '@/data/headerFooter.json';
import TextSlider from './common/TextSlider.vue';
import { ref } from 'vue';
import ExternalLink from './common/ExternalLink.vue';

export default {
  components: { TextSlider, ExternalLink },
  data() {
    return {
      header: headerData,
      viewportWidth: ref(window.innerWidth),
    };
  },
  methods: {
    updateWidth() {
      this.viewportWidth.value = window.innerWidth;
    },
  },
  onMounted() {
    window.addEventListener('resize', this.updateWidth);
  },
  onUnmounted() {
    window.removeEventListener('resize', this.updateWidth);
  },
};
</script>

<style scoped>
.header {
  background: linear-gradient(-45deg, #e68c3a, #e5a876, #94b6ef, #213e60);
  background-size: 400% 400%;
  animation: gradient 20s ease infinite;
  height: 100vh;
  min-block-size: calc(100vh + var(--radius));
  position: relative;
  display: flex;
  padding: 0;
  margin: 0;
  width: 100vw;
}

.header-textbox {
  --important: #f4f2ef;
  color: var(--important);
  align-self: center;
  z-index: 2;
  padding-right: 210px;
  padding-left: var(--gutter-x-large);
}

@media (max-width: 1275px) {
  .header-textbox {
    padding-left: var(--gutter-large);
  }
}

@media (max-width: 1200px) {
  .header-textbox {
    padding-left: var(--gutter-medium);
  }
}

@media (max-width: 600px) {
  .header-textbox {
    padding: var(--gutter-small);
  }
  .main-img {
    display: none;
  }
}
.main-img {
  position: absolute;
  right: 0px;
  height: 100vh;
  top: 0;
}

.header-text {
  font-size: var(--text-large);
  font-weight: 400;
  max-inline-size: 745px;
  margin-block-start: var(--gutter-micro);
  margin-block-end: var(--gutter-medium);
}

@media (max-width: 1200px) {
  .header-text {
    max-inline-size: 685px;
  }
}

@media (max-width: 845px) {
  .header-text {
    max-inline-size: 585px;
  }
}

.header-btns {
  display: inline-flex;
  gap: var(--gutter-x-small);
}

@media (max-width: 400px) {
  .header-textbox {
    left: 0;
    text-align: center;
    padding-inline: 0.6rem;
  }
  .header-btns {
    flex-direction: column;
    width: 80%;
  }
  .slider {
    margin: auto;
    width: fit-content;
  }
}
</style>
