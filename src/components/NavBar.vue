<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { BaseLink } from '@/components/base';

const props = defineProps({
  /** Pin the nav bar at the top of the page on initial load. */
  showAtTop: {
    type: Boolean,
    default: true,
  },
});

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  ...(import.meta.env.VITE_ENABLE_DEEP_DIVES === 'true'
    ? [{ label: 'Deep Dives', to: '/deep-dives' }]
    : []),
  { label: 'Contact', to: '/#contact' },
];

const isVisible = ref(false);
let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.scrollY;
  if (currentScroll <= 100) {
    isVisible.value = props.showAtTop;
  } else if (currentScroll > lastScroll) {
    isVisible.value = false;
  } else if (currentScroll < lastScroll) {
    isVisible.value = true;
  }
  lastScroll = currentScroll;
}

function showNavBar() {
  isVisible.value = true;
}

function beforeEnter(el) {
  el.style.transform = 'translateY(-100%)';
}

function enter(el, done) {
  el.offsetHeight; // trigger reflow
  el.style.transition = 'transform 0.3s ease-in-out';
  el.style.transform = 'translateY(0)';
  done();
}

function leave(el, done) {
  el.style.transition = 'transform 0.3s ease-in-out';
  el.style.transform = 'translateY(-100%)';
  setTimeout(() => done(), 300); // match transition duration
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  lastScroll = window.scrollY;
  isVisible.value = window.scrollY <= 100 ? props.showAtTop : false;
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <transition
    name="slide"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <nav
      v-show="isVisible"
      class="navbar"
    >
      <router-link
        :to="{ name: 'Home' }"
        class="font-tech text-h3 text-important"
      >
        JM
      </router-link>
      <div class="nav-links">
        <BaseLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
        >
          {{ link.label }}
        </BaseLink>
      </div>
    </nav>
  </transition>
  <div
    v-if="!isVisible"
    class="navbar-handle"
    @mouseover="showNavBar"
    @click="showNavBar"
  >
    <div class="navbar-handle-bar" />
  </div>
</template>

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
}

.navbar-handle {
  position: fixed;
  top: 0;
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999;
}

.navbar-handle-bar {
  width: 70px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 2px;
}

.nav-links {
  display: flex;
  gap: var(--gutter-large);
}

a {
  padding: 0;
}
</style>
