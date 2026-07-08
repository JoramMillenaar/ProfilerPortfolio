<script setup>
import { reactive } from 'vue';
import { BaseLink, BaseImage } from '@/components/base';
import QuoteModal from './QuoteModal.vue';
import testimonialData from '@/data/testimonials.json';

const testimonials = reactive(
  testimonialData.testimonials.map((t) => ({ ...t, isVisible: false })),
);

function openModal(modalId) {
  document.body.style.overflow = 'hidden';
  testimonials.forEach((t) => {
    t.isVisible = t.id === modalId;
  });
}

function closeModal() {
  document.body.style.overflow = '';
  testimonials.forEach((t) => {
    t.isVisible = false;
  });
}
</script>

<template>
  <section>
    <h2 id="testimonials">
      Testimonials
    </h2>
    <div class="container">
      <ol class="testimonials">
        <li
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="testimonial"
          data-aos="flip-right"
        >
          <blockquote class="text-text-small mb-6 flex flex-col justify-between">
            {{ testimonial.quote }}
          </blockquote>

          <BaseLink
            class="ml-auto order-2"
            @click="openModal(testimonial.id)"
          >
            Read More
          </BaseLink>
          <figure class="testimonial-author">
            <BaseImage
              img-class="size-14 rounded-[50%] bg-secondary"
              :src="'testimonials/' + testimonial.image"
              :alt="`Picture of ${testimonial.author}'s face`"
            />
            <figcaption>
              <h3 class="testimonial-author-name">
                {{ testimonial.author }}
              </h3>
              <p class="testimonial-author-job">
                {{ testimonial.position }}
              </p>
            </figcaption>
          </figure>
        </li>
      </ol>
      <QuoteModal
        v-for="testimony in testimonials"
        :key="testimony.id"
        :modal-id="testimony.id"
        :is-visible="testimony.isVisible"
        :author="testimony.author"
        :position="testimony.position"
        :image="testimony.image"
        :content="testimony.content.split('\n')"
        @close="closeModal(testimony.id)"
      />
    </div>
  </section>
</template>

<style>
.testimonials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin-block-start: var(--gutter-x-large);
  list-style-type: none;
  background-image: linear-gradient(
      rgba(88, 88, 88, 0.297),
      rgba(214, 214, 214, 0.082)
  );
}

@media (max-width: 1100px) {
  .testimonials {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 645px) {
  .testimonials {
    grid-template-columns: 1fr;
  }
}

.testimonial {
  display: flex;
  flex-direction: column;
  padding: var(--gutter-small);
  background-color: var(--bg-color-primary);
}

.testimonial-author {
  margin-block-start: auto;
  display: flex;
  align-items: center;
  gap: var(--gutter-micro);
}

.testimonial-author-name {
  margin-block-end: 0.3rem;
}

.testimonial-author-name,
.testimonial-author-job {
  font-size: initial;
}
</style>
