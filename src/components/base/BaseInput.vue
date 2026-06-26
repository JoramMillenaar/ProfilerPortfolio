<script setup>
/**
 * Text input with v-model support. Inherits remaining attributes (id, name,
 * required, placeholder, type, …) onto the underlying <input>.
 */
defineProps({
  /** Bound value. */
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <input
    class="base-input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<style scoped>
.base-input {
  width: 100%;
  padding: var(--gutter-nano);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  color: var(--important);
  font-size: var(--fs-text-small, 1.125rem);
  outline: none;
  transition: border-color 0.2s ease;
}

.base-input:focus {
  border-bottom-color: #888;
}
</style>
