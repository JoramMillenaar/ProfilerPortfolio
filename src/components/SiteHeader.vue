<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { BaseButton } from '@/components/base';
import TextSlider from '@/components/common/TextSlider.vue';
import headerData from '@/data/headerFooter.json';
import HeaderImage from '@/assets/images/profile-picture.webp'; // TODO: make this dynamic

const header = headerData;

// Guarded for build-time prerender where `window` is undefined.
const viewportWidth = ref(
  typeof window !== 'undefined' ? window.innerWidth : 1024,
);

function updateWidth() {
  viewportWidth.value = window.innerWidth;
}

onMounted(() => window.addEventListener('resize', updateWidth));
onBeforeUnmount(() => window.removeEventListener('resize', updateWidth));
</script>

<template>
  <header class="header">
    <div class="bg-fade" />
    <div class="header-textbox">
      <div
        data-aos="fade"
        data-aos-duration="500"
      >
        <TextSlider />
      </div>
      <h1 data-aos="fade-up">
        {{ header.titleLineOne }}<br>{{ header.titleLineTwo }}
      </h1>
      <p
        class="text-text-large font-normal max-w-[745px] mb-gutter-large mt-8 xl:max-w-[685px]"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {{ header.subheader }}
      </p>
      <div
        class="header-btns"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <BaseButton
          variant="primary"
          href="#contact"
        >
          Contact Me
        </BaseButton>
        <BaseButton
          variant="secondary"
          to="/blog"
        >
          Latest Stories
        </BaseButton>
      </div>
    </div>
    <img
      v-if="viewportWidth >= 600"
      :src="HeaderImage"
      class="main-img"
      fetchpriority="high"
      loading="eager"
      :alt="header.imageAlt"
    >
  </header>
</template>

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

.bg-fade {
  height: 100%;
  width: 100%;
  position: absolute;
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.3), transparent);
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
