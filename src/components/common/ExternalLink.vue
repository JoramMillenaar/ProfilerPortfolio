<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :target="target"
    ref="link"
    class="link"
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
.link {
  display: inline-block;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: var(--text-small);
  padding: var(--gutter-nano) 0;
  text-decoration: none;
  color: var(--important);
  position: relative;
}

.link::after,
.link::before {
  content: '';
  width: 100%;
  height: 1px;
  margin-block-start: var(--gutter-nano);
  position: absolute;
  bottom: -1px;
  left: 0;
  transition: 300ms;
}

body .link::before {
  background-color: lightgray;
}

body .link::after {
  background-color: black;
}

.link::after {
  background-color: white;
  transform-origin: left;
  transform: scaleX(0);
}

.link:hover::after,
.link:focus::after {
  transform: scaleX(1);
}
</style>
