<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :target="target"
    ref="link"
    @click="handleClick"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'CustomLink',
  props: {
    to: {
      type: [String, Object],
      default: null
    },
    href: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: '_self'
    },
    isButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    componentType() {
      if (this.isButton) return 'button';
      if (this.to) return 'router-link';
      if (this.href) return 'a';
      return 'button'; // default fallback, adjust as needed
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>

<style scoped>
</style>
