<script setup>
/**
 * Polymorphic button. Renders a <button>, <a>, or <router-link> depending on
 * which of `to` / `href` is provided. Variants control the visual style.
 */
import { computed } from 'vue';

const props = defineProps({
  /** Visual style. */
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost'].includes(v),
  },
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
  /** Native button type, used only when rendering a <button>. */
  type: {
    type: String,
    default: 'button',
  },
  /** Disables the control (only meaningful for <button>). */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const tag = computed(() => {
  if (props.to) return 'router-link';
  if (props.href) return 'a';
  return 'button';
});
</script>

<template>
  <component
    :is="tag"
    :to="to ?? undefined"
    :href="href ?? undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    class="btn"
    :class="[`btn--${variant}`, { 'btn--disabled': disabled }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  display: inline-block;
  font-size: 1.35rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  padding: 18px 60px;
  border: 1px solid transparent;
  border-radius: var(--gutter-nano);
  transition: 0.3s all ease-in-out;
  cursor: pointer;
}

.btn--primary {
  color: var(--bg-color-primary);
  background-color: var(--important);
}

.btn--primary:hover,
.btn--primary:focus-visible {
  box-shadow: #07070733 0 0 0 var(--gutter-nano);
}

.btn--secondary {
  background: transparent;
  border-color: var(--border-dark);
  color: var(--important);
}

.btn--secondary:hover,
.btn--secondary:focus-visible {
  border-color: var(--important);
}

.btn--ghost {
  background: transparent;
  color: var(--important);
  padding-inline: var(--gutter-small);
}

.btn--ghost:hover,
.btn--ghost:focus-visible {
  background: rgba(255, 255, 255, 0.06);
}

.btn--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

@media (max-width: 700px) {
  .btn {
    padding: 16px 48px;
  }
}

@media (max-width: 485px) {
  .btn {
    font-size: 1.2rem;
    padding: 14px 38px;
  }
}
</style>
