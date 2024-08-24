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
          <a class="link" onclick="openModal('mario-modal')">Read More</a>
          <figure class="testimonial-author">
            <img
              :src="testimonial.image"
              :alt="testimonial.author"
              loading="lazy"
            />
            <figcaption>
              <h3 class="testimonial-author-name">{{ testimonial.author }}</h3>
              <p class="testimonial-author-job">{{ testimonial.position }}</p>
            </figcaption>
          </figure>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestimonialsSection',
  data() {
    return {
      testimonials: [
        {
          id: 1,
          author: 'Mario de Sousa',
          position: 'Lead Software Engineer at Therapieland',
          quote:
            'While at Therapieland, Joram was a valuable and indispensable member of our development team...',
          image: require('../assets/images/testimonials/mario.jpg'),
        },
        {
          id: 2,
          author: 'Marike de Haan',
          position: 'CFO and Creative Director at Therapieland',
          quote:
            'He has been of great value, always contributing to technical and functional discussions...',
          image: require('../assets/images/testimonials/marike.jpg'),
        },
        {
          id: 3,
          author: 'Jose Martinez',
          position: 'Senior Software Engineer at Therapieland',
          quote:
            '...his superpower [is] turning messy, vague ideas into something concrete and organized.',
          image: require('../assets/images/testimonials/jose.jpg'),
        },
      ],
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
  padding: 0;
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
