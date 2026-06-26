<script setup>
/**
 * Minimal accessible loading spinner.
 */
defineProps({
  /** Pixel diameter. */
  size: {
    type: Number,
    default: 20,
  },
  /** Accessible label. */
  label: {
    type: String,
    default: 'Loading',
  },
});
</script>

<template>
  <span
    class="spinner"
    role="status"
    :aria-label="label"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style scoped>
.spinner {
  display: inline-block;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: 1.5s;
  }
}
</style>
