<script setup>
/**
 * Surface card with a subtle border and elevation. Optional `to`/`href` makes
 * the whole card a link.
 */
import { computed } from 'vue';

const props = defineProps({
  /** vue-router target — makes the card a <router-link>. */
  to: {
    type: [String, Object],
    default: null,
  },
  /** External href — makes the card an <a>. */
  href: {
    type: String,
    default: null,
  },
  /** Add a hover lift/affordance (defaults on when the card is a link). */
  interactive: {
    type: Boolean,
    default: null,
  },
});

const tag = computed(() => {
  if (props.to) return 'router-link';
  if (props.href) return 'a';
  return 'article';
});

const isInteractive = computed(() =>
  props.interactive === null ? tag.value !== 'article' : props.interactive,
);
</script>

<template>
  <component
    :is="tag"
    :to="to ?? undefined"
    :href="href ?? undefined"
    class="card"
    :class="{ 'card--interactive': isInteractive }"
  >
    <slot />
  </component>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: var(--gutter-small);
  padding: var(--gutter-medium);
  background: var(--bg-color-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-small, 0.75rem);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.25);
  color: inherit;
  text-decoration: none;
}

.card--interactive {
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card--interactive:hover,
.card--interactive:focus-visible {
  transform: translateY(-2px);
  border-color: var(--border-dark);
}

@media (max-width: 640px) {
  .card {
    padding: var(--gutter-small);
  }
}
</style>
