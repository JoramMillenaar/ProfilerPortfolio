<script setup>
/**
 * Multiline text input with v-model support. Inherits remaining attributes
 * (id, name, required, placeholder, rows, …) onto the underlying <textarea>.
 */
defineProps({
  /** Bound value. */
  modelValue: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <textarea
    class="base-textarea"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
.base-textarea {
  width: 100%;
  min-height: 6rem;
  padding: var(--gutter-nano);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  color: var(--important);
  font-size: var(--fs-text-small, 1.125rem);
  font-family: inherit;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.base-textarea:focus {
  border-bottom-color: #888;
}
</style>
