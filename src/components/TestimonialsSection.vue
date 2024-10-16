<template>
  <section>
    <h2 id="testimonials">Testimonials</h2>
    <div class="container">
      <ol class="testimonials">
        <li
          class="testimonial"
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          data-aos="flip-right"
          :data-aos-offset="300 + 100 * index"
        >
          <blockquote class="text-text-small mb-6 flex flex-col justify-between">
            {{ testimonial.quote }}
          </blockquote>
          <!-- .testimonial .link {
  margin-block-start: auto;
  margin-left: auto;
  font-weight: 500;
  font-size: initial;
} -->
          <external-link class="link ml-auto order-2 pb-0 font-medium text-text-small" isButton @click="openModal(testimonial.id)">Read More</external-link>
          <figure class="testimonial-author">
            <ImageContent
              className="size-14 rounded-[50%] bg-secondary"
              :src="'testimonials/' + testimonial.image"
              :alt="`Picture of ${testimonial.author}'s face`"
            />
            <figcaption>
              <h3 class="testimonial-author-name">{{ testimonial.author }}</h3>
              <p class="testimonial-author-job">{{ testimonial.position }}</p>
            </figcaption>
          </figure>
        </li>
      </ol>
      <quote-modal
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

<script>
import ExternalLink from './common/ExternalLink.vue';
import ImageContent from './media/ImageContent.vue';
import QuoteModal from './QuoteModal.vue';
import testimonialData from '@/data/testimonials.json';

export default {
  components: {
    QuoteModal,
    ExternalLink,
    ImageContent,
  },
  methods: {
    openModal(modalId) {
      this.testimonials.forEach((testimonial) => {
        document.body.style.overflow = 'hidden';
        testimonial.isVisible = testimonial.id === modalId ? true : false;
      });
    },
    closeModal() {
      this.testimonials.forEach((testimonial) => {
        document.body.style.overflow = '';
        testimonial.isVisible = false;
      });
    },
  },
  data() {
    return {
      testimonials: testimonialData.testimonials,
    };
  },
};
</script>

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
