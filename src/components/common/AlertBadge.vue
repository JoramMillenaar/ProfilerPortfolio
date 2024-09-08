<template>
  <strong href="#" class="hire-alert">
    <span class="indicator"></span>
    {{ contents }}
  </strong>
</template>

<script>
export default {
  props: ['contents'],
};
</script>

<style>
.hire-alert {
  display: inline-flex;
  align-items: center;
  gap: var(--gutter-nano);
  font-size: initial;
  padding: var(--gutter-nano) var(--gutter-micro);
  border-radius: var(--gutter-small);
  position: relative;
  z-index: 1;
  margin-block-end: var(--gutter-small);
  color: var(--important);
}

.hire-alert::before,
.hire-alert::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.hire-alert::after {
  background-image: var(--gradient-border);
  z-index: -2;
}

.hire-alert::before {
  background-color: var(--bg-color-primary);
  inset: 1px;
  z-index: -1;
}

.indicator {
  display: inline-block;
  block-size: var(--gutter-nano);
  inline-size: var(--gutter-nano);
  border-radius: 50%;
  background-color: red;
  animation: blink 550ms alternate infinite var(--easing);
}

@keyframes blink {
  100% {
    opacity: 0;
  }
}
</style>
