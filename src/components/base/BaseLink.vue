<script setup>
/**
 * Polymorphic inline link with an animated underline. Renders a <router-link>
 * for internal `to` targets, an <a> for external `href` targets, and a
 * <button> when neither is given (for link-styled actions).
 */
import { computed } from 'vue';

const props = defineProps({
  /** vue-router target. When set, renders a <router-link>. */
  to: {
    type: [String, Object],
    default: null,
  },
  /** External href. When set (and no `to`), renders an <a>. */
  href: {
    type: String,
    default: null,
  },
  /** Anchor target, used only when rendering an <a>. */
  target: {
    type: String,
    default: '_self',
  },
});

const tag = computed(() => {
  if (props.to) return 'router-link';
  if (props.href) return 'a';
  return 'button';
});

const rel = computed(() =>
  props.href && props.target === '_blank' ? 'noopener noreferrer' : undefined,
);
</script>

<template>
  <component
    :is="tag"
    :to="to ?? undefined"
    :href="href ?? undefined"
    :target="tag === 'a' ? target : undefined"
    :rel="rel"
    :type="tag === 'button' ? 'button' : undefined"
    class="base-link"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-link {
  display: inline-block;
  position: relative;
  padding: var(--gutter-nano) 0;
  background: none;
  border: none;
  color: var(--important);
  font-size: var(--fs-text-small, 1.125rem);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.base-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms;
}

.base-link:hover::after,
.base-link:focus-visible::after {
  transform: scaleX(1);
}
</style>
