<template>
  <span class="tooltip" :data-title="name">
    <img v-lazy="skillImage" :alt="name" class="skills-img" />
  </span>
</template>

<script>
const imageContext = require.context('@/assets/images/skills', false, /\.(svg|webp)$/);

const skillImages = {
  Python: 'python.svg',
  Django: 'django.webp',
  SQL: 'sql.webp',
  pytest: 'pytest.svg',
  Git: 'git.webp',
  JavaScript: 'js.webp',
  Shell: 'shell.webp',
  'HTML/CSS': 'css.webp',
  Kubernetes: 'kubernetes.svg',
  'Google Cloud': 'googlecloud.svg',
  WordPress: 'wordpress.webp',
  VueJS: 'vuejs.svg',
};

export default {
  props: ['name'],
  computed: {
    skillImage() {
      return imageContext('./' + skillImages[this.name]);
    },
  },
};
</script>

<style>
.skills-imgs {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: var(--gutter-small);
  padding-block: var(--gutter-small);
}

.skills-img {
  block-size: 45px;
  inline-size: 45px;
  background: transparent;
  transition: 0.2s ease-in-out transform, 0.2s ease-in-out filter;
}

.skills-img:hover {
  transform: translate3d(0px, -6px, 0px) rotateX(0deg) rotateZ(0deg);
  filter: drop-shadow(5px 8px 3px rgba(255, 255, 255, 0.1));
}

@media (max-width: 1100px) {
  .skills-img {
    block-size: 40px;
    inline-size: 40px;
  }
}

@media (max-width: 810px) {
  .skills-img {
    block-size: 35px;
    inline-size: 35px;
  }
}

@media (max-width: 675px) {
  .skills-imgs {
    gap: var(--gutter-large);
  }
  .skills-img {
    block-size: 25px;
    inline-size: 25px;
  }
}

@media (max-width: 340px) {
  .skills-img {
    block-size: 20px;
    inline-size: 20px;
  }
}

.tooltip {
  position: relative;
}

.tooltip:before,
.tooltip:after {
  display: block;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transform: translate3d(0, -10px, 0);
  transition: all 0.15s ease-in-out;
}

.tooltip:after {
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgba(255, 255, 255, 0.2);;
  border-left: 6px solid transparent;
  content: '';
  height: 0;
  top: 44px;
  left: 20px;
  width: 0;
}
.tooltip:before {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  color: #fff;
  content: attr(data-title);
  font-size: 14px;
  padding: 6px 10px;
  top: 50px;
  white-space: nowrap;
}

.tooltip:hover:after,
.tooltip:hover:before {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>
