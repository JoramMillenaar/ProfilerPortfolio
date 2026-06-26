<script setup>
/**
 * In-page section heading: an optional uppercase eyebrow above a title.
 * Used for content sections (e.g. "On the Blog", "Reach Out").
 */
defineProps({
  /** Small uppercase label above the title. */
  eyebrow: {
    type: String,
    default: '',
  },
  /** The heading text (can also be provided via the default slot). */
  title: {
    type: String,
    default: '',
  },
  /** Heading level for correct document outline. */
  level: {
    type: [String, Number],
    default: 2,
    validator: (v) => [1, 2, 3, '1', '2', '3'].includes(v),
  },
  /** Optional id applied to the heading element (for in-page anchors). */
  headingId: {
    type: String,
    default: undefined,
  },
  /** Text alignment. */
  align: {
    type: String,
    default: 'center',
    validator: (v) => ['left', 'center'].includes(v),
  },
});
</script>

<template>
  <div
    class="section-heading"
    :class="`section-heading--${align}`"
  >
    <p
      v-if="eyebrow"
      class="eyebrow"
    >
      {{ eyebrow }}
    </p>
    <component
      :is="`h${level}`"
      :id="headingId"
      class="title"
    >
      <slot>{{ title }}</slot>
    </component>
  </div>
</template>

<style scoped>
.section-heading--center {
  text-align: center;
}
.section-heading--left {
  text-align: left;
}

.eyebrow {
  margin-bottom: var(--gutter-nano);
  color: var(--important);
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: 0.875rem;
  font-weight: 600;
}

.title {
  color: var(--important);
  font-weight: 600;
}
</style>
