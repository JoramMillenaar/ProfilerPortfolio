<script setup>
/**
 * Semantic <section> wrapper with consistent vertical rhythm and an optional
 * centered container. Pass `contained` to wrap the slot in a BaseContainer.
 */
import BaseContainer from './BaseContainer.vue';

defineProps({
  /** Anchor id for in-page navigation. */
  id: {
    type: String,
    default: undefined,
  },
  /** Wrap content in a centered max-width container. */
  contained: {
    type: Boolean,
    default: true,
  },
  /** Vertical spacing scale. */
  spacing: {
    type: String,
    default: 'large',
    validator: (v) => ['none', 'small', 'medium', 'large', 'huge'].includes(v),
  },
});
</script>

<template>
  <section
    :id="id"
    class="section"
    :class="`section--${spacing}`"
  >
    <BaseContainer v-if="contained">
      <slot />
    </BaseContainer>
    <slot v-else />
  </section>
</template>

<style scoped>
.section--none {
  padding-block: 0;
}
.section--small {
  padding-block: var(--gutter-small);
}
.section--medium {
  padding-block: var(--gutter-large);
}
.section--large {
  padding-block: var(--gutter-x-large);
}
.section--huge {
  padding-block: var(--gutter-huge);
}
</style>
