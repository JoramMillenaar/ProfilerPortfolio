<template>
  <transition
    name="slide"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <nav class="navbar" v-show="isVisible">
      <router-link :to="{ name: 'Home' }" class="nav-logo tech">JM</router-link>
      <div class="nav-links">
        <external-link to="/">Home</external-link>
        <external-link to="/#contact">Contact</external-link>
      </div>
    </nav>
  </transition>
</template>

<script>
import ExternalLink from './common/ExternalLink.vue';
export default {
  components: { ExternalLink },
  name: 'NavBar',
  data() {
    return {
      lastScroll: 0,
      isVisible: false,
    };
  },
  methods: {
    handleScroll() {
      const currentScroll = window.scrollY;
      if (
        this.isVisible &&
        currentScroll > this.lastScroll &&
        currentScroll > 100
      ) {
        this.isVisible = false;
      } else if (
        !this.isVisible &&
        currentScroll < this.lastScroll &&
        currentScroll > 100
      ) {
        this.isVisible = true;
      }
      this.lastScroll = currentScroll;
    },
    beforeEnter(el) {
      el.style.transform = 'translateY(-100%)';
    },
    enter(el, done) {
      el.offsetHeight; // trigger reflow
      el.style.transition = 'transform 0.3s ease-in-out';
      el.style.transform = 'translateY(0)';
      done();
    },
    leave(el, done) {
      el.style.transition = 'transform 0.3s ease-in-out';
      el.style.transform = 'translateY(-100%)';
      setTimeout(() => done(), 300); // match transition duration
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gutter-medium);
  background-color: rgba(27, 27, 27, 0.5);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  height: 30px;
  width: calc(100vw - 2 * var(--gutter-micro));
  z-index: 1000;
  border-radius: 10px;
  margin: var(--gutter-micro);
  /* border-bottom: 1px solid var(--important); */
}

.nav-logo {
  font-size: var(--h3);
  text-decoration: none;
  color: var(--important);
}

.nav-links {
  display: flex;
  gap: var(--gutter-large);
}

.nav-item {
  text-decoration: none;
  padding: var(--gutter-small);
  font-weight: 500;
  color: var(--important);
  transition: color 0.3s;
}

.nav-item:hover {
  color: #555;
}

a {
  padding: 0;
}
</style>
