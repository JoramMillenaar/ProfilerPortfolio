<script setup>
/**
 * Page-top hero for detail pages: eyebrow + large title, with optional `meta`
 * and `tags` slots, separated from the body by a bottom border.
 */
defineProps({
  /** Small uppercase label above the title. */
  eyebrow: {
    type: String,
    default: '',
  },
  /** Main page title (rendered as <h1>). */
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header class="hero">
    <p
      v-if="eyebrow"
      class="eyebrow"
    >
      {{ eyebrow }}
    </p>
    <h1 class="title">
      {{ title }}
    </h1>
    <div
      v-if="$slots.meta"
      class="meta"
    >
      <slot name="meta" />
    </div>
    <div
      v-if="$slots.tags"
      class="tags"
    >
      <slot name="tags" />
    </div>
  </header>
</template>

<style scoped>
.hero {
  padding-bottom: var(--gutter-large);
  border-bottom: 1px solid var(--border);
}

.eyebrow {
  margin-bottom: var(--gutter-nano);
  color: var(--text-color-muted, #8c8c8c);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 0.9rem;
}

.title {
  margin-bottom: var(--gutter-small);
  font-size: clamp(2.25rem, 4vw, 3rem);
}

.meta {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--text-color-muted, #8c8c8c);
  font-size: 1rem;
}

.tags {
  margin-top: var(--gutter-small);
}

@media (max-width: 640px) {
  .title {
    font-size: clamp(2rem, 6vw, 2.5rem);
  }
}
</style>
