<script setup>
import { BaseImage } from '@/components/base';
import LineBackground from '@/assets/images/line.svg';

defineProps({
  /** DOM id for the modal section. */
  modalId: { type: String, default: undefined },
  /** Whether the modal is shown. */
  isVisible: { type: Boolean, default: false },
  /** Testimonial author name. */
  author: { type: String, default: '' },
  /** Author role/position. */
  position: { type: String, default: '' },
  /** Author image path relative to src/assets/images/testimonials. */
  image: { type: String, default: '' },
  /** Paragraphs of the testimonial. */
  content: { type: Array, default: () => [] },
});

defineEmits(['close']);
</script>

<template>
  <teleport to="body">
    <section
      v-if="isVisible"
      :id="modalId"
      class="background"
      data-aos="fade-in"
      @click.self="$emit('close')"
    >
      <div class="modal">
        <article
          class="content"
          data-aos="zoom-in"
          @click.stop
        >
          <header>
            <figure>
              <BaseImage
                img-class="img"
                :src="'testimonials/' + image"
                :alt="`Picture of ${author}`"
              />
              <figcaption>
                <h3 class="h3">
                  {{ author }}
                </h3>
                <p>{{ position }}</p>
              </figcaption>
            </figure>
            <button
              type="button"
              class="close-btn"
              aria-label="Close"
              @click="$emit('close')"
            >
              &times;
            </button>
          </header>
          <div class="modal-text">
            <p
              v-for="paragraph in content"
              :key="paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </article>
      </div>
      <object
        type="image/svg+xml"
        :data="LineBackground"
        class="background-line"
      />
    </section>
  </teleport>
</template>

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
