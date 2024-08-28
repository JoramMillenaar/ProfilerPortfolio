<template>
  <teleport to="body">
    <div class="modal" :id="modalId" @click.self="closeModal" v-if="isVisible">
      <div class="modal-container">
        <div class="line-container">
          <object
            type="image/svg+xml"
            :data="background"
            class="background-line"
          ></object>
        </div>
        <div class="modal-box">
          <div class="modal-article">
            <figure class="testimonial-author">
              <img :src="image" :alt="author" loading="lazy" />
              <figcaption>
                <h3 class="h3">{{ author }}</h3>
                <p class="testimonial-author-job">{{ position }}</p>
              </figcaption>
            </figure>
            <p class="modal-text" v-for="paragraph in content" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    modalId: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
  },
  emits: ['close'],
  data() {
    return {
      background: require('@/assets/svgs/line.svg'),
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(19, 19, 19, 0.1);
}

.modal-container {
  padding-block-start: 7rem;
  margin: auto;
  justify-content: center;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  position: absolute;
  padding: 5%;
  pointer-events: none;
}

.modal-box {
  min-width: 400px;
  flex: 2;
  z-index: 4;
  align-self: center;
}

header.modal-box {
  flex: 1;
  align-self: auto;
}

.modal-article {
  background: var(--bg-color-secondary);
  padding: var(--gutter-x-small);
  border-radius: var(--gutter-nano);
  box-shadow: 0 0 10px gray;
  margin: var(--gutter-micro);
  height: fit-content;
  min-width: 250px;
  font-weight: 300;
}

header .modal-article {
  padding: 0px;
}

.modal-header-content {
  padding: var(--gutter-x-small);
}

.modal-table tr td:last-child {
  font-weight: 200;
}

.modal-table {
  border-collapse: collapse;
  padding-top: var(--gutter-micro);
}

.modal-table td {
  border-top: 1px solid rgba(88, 88, 88, 0.297);
  border-left: 1px solid rgba(88, 88, 88, 0.297);
  padding: 8px;
}

.modal-table tr:first-child td {
  border-top: none;
}

.modal-table td:first-child {
  border-left: none;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-article ul {
  padding-left: 20px;
}

.modal-panel {
  padding: var(--gutter-x-small);
  border-top: 1px solid #ddd;
}

.modal-text {
  padding: var(--gutter-micro) 0;
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.modal-img {
  border-radius: var(--gutter-nano) var(--gutter-nano) 0 0;
}

.background-line {
  position: absolute;
  top: 2vw;
  right: -270px;
  rotate: 46deg;
}

.line-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  right: 0;
  pointer-events: none;
}
</style>
