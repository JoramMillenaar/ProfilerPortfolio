<template>
  <section>
    <h2 class="h2" id="testimonials">Testimonials</h2>
    <div class="container">
      <ol class="testimonials">
        <li
          class="testimonial"
          v-for="testimonial in testimonials"
          :key="testimonial.id"
        >
          <blockquote class="testimonial-text">
            {{ testimonial.quote }}
          </blockquote>
          <external-link
            contents="Read More"
            @click.enter="openModal(testimonial.id)"
          />
          <figure class="testimonial-author">
            <img
              v-lazy="
                require(`@/assets/images/testimonials/${testimonial.image}`)
              "
              :alt="`Picture of ${testimonial.author}'s face`"
              loading="lazy"
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
import QuoteModal from './QuoteModal.vue';
import testimonialData from '@/data/testimonials.json';

export default {
  components: {
    QuoteModal,
    ExternalLink,
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

<style scoped>
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

.testimonial-text {
  font-size: var(--text-small);
  margin-block-end: var(--gutter-x-small);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonial-text .link {
  margin-left: auto;
  order: 2;
  padding-bottom: 0;
}

.testimonial-author {
  margin-block-start: 8px;
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

.testimonial .link {
  margin-block-start: auto;
  margin-left: auto;
  font-weight: 500;
  font-size: initial;
}

.testimonial-author > img {
  block-size: 52px;
  inline-size: 52px;
  border-radius: 50%;
  background-color: var(--bg-color-secondary);
}
</style>
