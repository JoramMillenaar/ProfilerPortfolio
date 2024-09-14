<template>
  <button v-if="!link" @click="handleClick" class="link">{{ contents }}</button>
  <a v-else :href="link" class="link" target="_blank" rel="noopener noreferrer">{{ contents }}</a>
</template>

<script>
export default {
  props: {
    contents: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleClick() {
      if (this.onClick) {
        this.onClick();
      }
    }
  }
};
</script>

<style>
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
