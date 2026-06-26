<script setup>
/**
 * Accessible modal dialog rendered in a teleport to <body>. Closes on backdrop
 * click and Escape. Supply header content via the `header` slot and body via
 * the default slot.
 *
 * Controlled via `v-model:open` (or the `open` prop + `close` event).
 */
import { watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  /** Whether the modal is visible. */
  open: {
    type: Boolean,
    default: false,
  },
  /** DOM id for the dialog. */
  id: {
    type: String,
    default: undefined,
  },
  /** Accessible label for the dialog. */
  ariaLabel: {
    type: String,
    default: 'Dialog',
  },
});

const emit = defineEmits(['update:open', 'close']);

function close() {
  emit('update:open', false);
  emit('close');
}

function onKeydown(event) {
  if (event.key === 'Escape') close();
}

watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('lock-screen', isOpen);
    if (isOpen) {
      document.addEventListener('keydown', onKeydown);
    } else {
      document.removeEventListener('keydown', onKeydown);
    }
  },
);

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return;
  document.removeEventListener('keydown', onKeydown);
  document.body.classList.remove('lock-screen');
});
</script>

<template>
  <teleport to="body">
    <div
      v-if="open"
      :id="id"
      class="overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="ariaLabel"
      @click.self="close"
    >
      <div class="dialog">
        <header
          v-if="$slots.header"
          class="dialog__header"
        >
          <slot name="header" />
          <button
            type="button"
            class="dialog__close"
            aria-label="Close dialog"
            @click="close"
          >
            &times;
          </button>
        </header>
        <div class="dialog__body">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gutter-small);
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog {
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--gutter-small);
  background: var(--bg-color-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-small, 0.75rem);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.dialog__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--gutter-small);
}

.dialog__close {
  flex: none;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  color: var(--important);
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
}

.dialog__body {
  margin-top: var(--gutter-nano);
}
</style>
