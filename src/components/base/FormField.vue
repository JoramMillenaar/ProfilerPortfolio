<script setup>
/**
 * Labelled form field wrapper. Pairs a <label> with a control passed via the
 * default slot, plus optional hint and error text. Use the slot prop `id` to
 * wire the control's id to the label's `for`.
 */
import { useId } from 'vue';

const props = defineProps({
  /** Visible field label. */
  label: {
    type: String,
    required: true,
  },
  /** Optional explicit id; otherwise an auto-generated one is used. */
  id: {
    type: String,
    default: '',
  },
  /** Helper text shown below the control. */
  hint: {
    type: String,
    default: '',
  },
  /** Error text shown below the control (overrides hint visually). */
  error: {
    type: String,
    default: '',
  },
});

const fieldId = props.id || useId();
</script>

<template>
  <div class="form-field">
    <label
      :for="fieldId"
      class="form-field__label"
    >{{ label }}</label>
    <slot :id="fieldId" />
    <p
      v-if="error"
      class="form-field__error"
      role="alert"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="form-field__hint"
    >
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
}

.form-field__label {
  margin-block: var(--gutter-nano);
  color: var(--important);
  font-size: var(--fs-text-small, 1.125rem);
}

.form-field__hint {
  margin-top: var(--gutter-nano);
  color: var(--text-color-muted, #8c8c8c);
  font-size: 0.85rem;
}

.form-field__error {
  margin-top: var(--gutter-nano);
  color: #ff6b6b;
  font-size: 0.85rem;
}
</style>
