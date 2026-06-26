<script setup>
/**
 * Centered, max-width content container. Reuses the global `.container` styles
 * (max-inline-size + responsive horizontal padding) defined in index.css.
 */
defineProps({
  /** Element/component to render as. */
  as: {
    type: String,
    default: 'div',
  },
});
</script>

<template>
  <component
    :is="as"
    class="container"
  >
    <slot />
  </component>
</template>
