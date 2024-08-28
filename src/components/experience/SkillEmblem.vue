<template>
  <span class="tooltip" :data-title="name">
    <img :src="skillImage" :alt="name" class="skills-img" loading="lazy" />
  </span>
</template>

<script>
const skillImages = {
  Python: require('@/assets/images/skills/python.svg'),
  Django: require('@/assets/images/skills/django.png'),
  SQL: require('@/assets/images/skills/sql.png'),
  pytest: require('@/assets/images/skills/pytest.svg'),
  Git: require('@/assets/images/skills/git.webp'),
  JavaScript: require('@/assets/images/skills/js.webp'),
  Shell: require('@/assets/images/skills/shell.webp'),
  'HTML/CSS': require('@/assets/images/skills/css.webp'),
  Kubernetes: require('@/assets/images/skills/kubernetes.svg'),
  'Google Cloud': require('@/assets/images/skills/googlecloud.svg'),
  WordPress: require('@/assets/images/skills/wordpress.png'),
};

export default {
  props: ['name'],
  computed: {
    skillImage() {
      return skillImages[this.name] || '';
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
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.6));
  block-size: 50px;
  inline-size: 50px;
  background: transparent;
  transform: rotateX(20deg) rotateZ(2deg);
  transform-style: preserve-3d;
  transition: 0.2s ease-in-out transform, 0.2s ease-in-out filter;
}

.skills-img:hover {
  transform: translate3d(0px, -6px, 0px) rotateX(0deg) rotateZ(0deg);
  filter: drop-shadow(5px 8px 3px rgba(0, 0, 0, 0.4));
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
  border-bottom: 6px solid rgba(0, 0, 0, 0.5);
  border-left: 6px solid transparent;
  content: '';
  height: 0;
  top: 44px;
  left: 20px;
  width: 0;
}
.tooltip:before {
  background: rgba(0, 0, 0, 0.5);
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
