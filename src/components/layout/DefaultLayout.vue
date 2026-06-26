<script setup>
/**
 * Standard page shell: navigation bar, page content (default slot), and footer.
 * Override the footer via the `footer` slot when a page needs custom framing.
 */
import NavBar from '@/components/NavBar.vue';
import SiteFooter from '@/components/SiteFooter.vue';

defineProps({
  /** Show the nav bar pinned at the top of the page on initial load. */
  navAtTop: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <NavBar :show-at-top="navAtTop" />
  <slot />
  <slot name="footer">
    <SiteFooter />
  </slot>
</template>
