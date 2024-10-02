<template>
  <teleport to="body">
    <section
      class="background"
      :id="modalId"
      @click.self="closeModal"
      v-if="isVisible"
      data-aos="fade-in"
    >
      <div class="modal">
        <article class="content" data-aos="zoom-in" @click.stop>
          <header>
            <figure>
              <ImageContent
                className="img"
                :src="'testimonials/' + image"
                :alt="`Picture of ${author}`"
              />
              <figcaption>
                <h3 class="h3">{{ author }}</h3>
                <p>{{ position }}</p>
              </figcaption>
            </figure>
            <button class="close-btn" @click="closeModal">X</button>
          </header>
          <div class="modal-text">
            <p v-for="paragraph in content" :key="paragraph">{{ paragraph }}</p>
          </div>
        </article>
      </div>
      <object
        type="image/svg+xml"
        :data="LineBackground"
        class="background-line"
      ></object>
    </section>
  </teleport>
</template>

<script>
import ImageContent from './media/ImageContent.vue';
import LineBackground  from '@/assets/images/line.svg';

export default {
  props: {
    modalId: String,
    isVisible: Boolean,
    author: String,
    position: String,
    image: String,
    content: Array,
  },
  components: { ImageContent },
  emits: ['close'],
  data() {
    return {
      LineBackground
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
.background {
  position: fixed;
  padding-top: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--bg-color-secondary);
  padding: var(--gutter-small);
  border-radius: 10px;
  box-shadow: 0 0 10px gray;
}

.content {
  pointer-events: auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

figure {
  display: flex;
  align-items: center;
  gap: 10px;
}

figcaption h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  width: 46px;
  cursor: pointer;
  color: var(--important);
}

.background-line {
  position: absolute;
  top: 2vw;
  right: -270px;
  transform: rotate(46deg);
  z-index: -1;
}

.img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: var(--bg-color-secondary);
}

figcaption p {
  font-size: medium;
}

.modal-text p {
  padding: var(--gutter-micro) 0;
}
</style>
