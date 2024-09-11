<template>
  <header class="header">
    <div class="header-textbox">
      <text-slider></text-slider>
      <h1 class="h1 tech slide-up">{{ header.titleLineOne }}<br>{{ header.titleLineTwo }}</h1>
      <p class="header-text slide-up">
        {{ header.subheader }}
      </p>
      <div class="header-btns">
        <button-secondary :actionCallLink="header.actionCallLink" :actionCallText="header.actionCallText" />
      </div>
    </div>
    <img :src="require(`@/assets/images/${this.header.image}`)" class="main-img" fetchpriority="high" loading="eager">
  </header>
</template>

<script>
import headerData from '@/data/headerFooter.json';
import ButtonSecondary from './common/ButtonSecondary.vue';
import TextSlider from './common/TextSlider.vue';

export default {
  components: {
    TextSlider,
    ButtonSecondary,
  },
  data() {
    return {
      header: headerData
    }
  }
};
</script>

<style scoped>
.tech {
  font-family: 'Tech', 'Mona Sans', sans-serif;
}

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

@keyframes slideUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.slide-up {
    animation: slideUp 0.6s ease-out forwards;
}
</style>
