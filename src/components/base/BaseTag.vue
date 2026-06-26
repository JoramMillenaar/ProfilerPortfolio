<script setup>
/**
 * A single pill-shaped tag/badge. Renders as a <li> inside TagList by default,
 * but `as` can be set to "span" for standalone use.
 */
defineProps({
  /** Element to render as. */
  as: {
    type: String,
    default: 'li',
  },
});
</script>

<template>
  <component
    :is="as"
    class="tag"
  >
    <slot />
  </component>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--important);
  font-size: 0.9rem;
  letter-spacing: 0.03em;
}
</style>
