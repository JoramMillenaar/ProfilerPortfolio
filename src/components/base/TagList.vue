<script setup>
/**
 * Renders a horizontal list of tags from a string array.
 */
import BaseTag from './BaseTag.vue';

defineProps({
  /** Tag labels. */
  tags: {
    type: Array,
    default: () => [],
  },
  /** Accessible label for the list. */
  label: {
    type: String,
    default: 'Tags',
  },
});
</script>

<template>
  <ul
    v-if="tags.length"
    class="tag-list"
    :aria-label="label"
  >
    <BaseTag
      v-for="tag in tags"
      :key="tag"
    >
      {{ tag }}
    </BaseTag>
  </ul>
</template>

<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
