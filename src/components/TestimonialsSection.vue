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
          <a class="link" @click="openModal(testimonial.id)">
            Read More
          </a>
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
import QuoteModal from './QuoteModal.vue';

export default {
  components: {
    QuoteModal,
  },
  data() {
    return {
      testimonials: [
        {
          id: 'mario',
          author: 'Mario de Sousa',
          position: 'Lead Software Engineer at Therapieland',
          quote:
            "Joram's ability to acquire new skills, and effectively apply them to his work, is outstanding. He is intelligent, naturally curious, hard-working, and constantly striving to improve himself as a developer [...]. He has an infectious personality and a sharp wit, and always added his positive energy to the team.",
          content: "While at Therapieland, Joram was a valuable and indispensable member of our development team. He was integral to the successful implementation and deployment of our new patient treatment and management platform. His work on critical systems and tools ensured that our existing users could be migrated effortlessly (from our legacy platform) with no disruption in the delivery of services. Through his drive and initiative, Joram built a remarkable data visualisation tool, that gave us vital insights into our current user-base and the interdependencies between various domain entities, allowing us to make informed decisions about our migration path going forward, and allowed us to identify any potential risks involved.\nJoram's ability to acquire new skills, and effectively apply them to his work, is outstanding. He is intelligent, naturally curious, hard-working, and constantly striving to improve himself as a developer: traits that were highly valued and appreciated within our team during our demanding development roadmap. He has an infectious personality and a sharp wit, and always added his positive energy to the team.\nIt was an absolute pleasure working with Joram. I would gladly have him on my team again and any team would be fortunate to have him.",
          image: require('../assets/images/testimonials/mario.webp'),
          isVisible: false,
        },
        {
          id: 'marike',
          author: 'Marike de Haan',
          position: 'CFO and Creative Director at Therapieland',
          quote:
            'We immediately saw how dedicated and eager to learn he was. We saw him growing almost every day. He has been of great value, always contributing to technical and functional discussions.',
          content: "Joram has worked in the Product Development Team that I was PO of for more than 3 years. When he started, he was a junior developer, and we immediately saw how dedicated and eager to learn he was. We saw him growing almost every day. He has been off great value, always contributing to technical ánd functional discussions. He was one of the first in our team to start working with co-pilot, pioneering for us and getting the other team-members up to speed after he investigated it thoroughly. He has proactively build features that turned out to be of great value for our company, and has always shown great dedication and commitment. And besides his great development-skills, he is also a great guy and a pleasure to work with!",
          image: require('../assets/images/testimonials/marike.webp'),
          isVisible: false,
        },
        {
          id: 'jose',
          author: 'Jose Martinez',
          position: 'Senior Software Engineer at Therapieland',
          quote:
            "The go-to guy for bouncing around ideas – he's always up for a chat and has this knack for pushing us towards the best solutions. One of the cool things about him is his superpower of turning messy, vague ideas into something concrete and organized.",
          content: "After three awesome years working with Joram, I just want to give a big shout-out to him. It's been a blast on both the professional and personal fronts. He is the go-to guy for bouncing around ideas – he's always up for a chat and has this knack for pushing us towards the best solutions.\nOne of the cool things about him is his superpower of turning messy, vague ideas into something concrete and organized.\nHope our paths cross again down the road. Can't wait for more adventures with Joram in the future!",
          image: require('../assets/images/testimonials/jose.webp'),
          isVisible: false,
        },
      ],
    };
  },
  methods: {
    openModal(modalId) {
      this.testimonials.forEach((testimonial) => {
        testimonial.isVisible = testimonial.id === modalId ? true : false;
      });
    },
    closeModal() {
      this.testimonials.forEach((testimonial) => {
        testimonial.isVisible = false;
      });
    },
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
